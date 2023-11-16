/**
 * 
    Aggregation
    Model.aggregate([
        {},             // stage 1: pipeline 1
        {},             // stage 1: pipeline 1
        {},             // stage 1: pipeline 1
        ........
    ])
    Collection => stage 1 => stage 2 => stage 3 => -------- final output
    Model.aggregate([
        // filter out the docs which has hasExam != true
        { $match: {hasExam: {$ne: true }} },

        // filter out the docs which has budget >= 500
        { $match: {budget: {$gte: 500 }} },
        
        // filter out the docs which has isSick === false
        { $match: {isSick: false} },

        // sort by age
        { $sort: {age: -1} },

        // limit by 2
        { $limit: 2 },

        // calculate the budget
        {
            $group:{
                _id: "null",
                totalBudget:{ $sum: "$budget"},
                cousins:{ $push: "$name"},

            }
        },
    ])

    // sample Doc
    {
        name: "abc",
        name: {
            firstName: "ab Name",
            lastName: "def Name",
        },
        email: "ab@mail.com",
        phone: "4556425",
        age: 40,
        gender: "male",
        address: {
            city: "",
            country:"",
        },
        salary: 500,
        friends: ["as","bg","df"],
        interests: ['reading', 'playing','travelling'],
        education: [
            {
                degree:"",
                major: "",
                year: 2025
            },
        ],
    }



    $match,  $project, $addFields,
    $match:     filter the docs, 
    $addFields: add a new field to the doc, 
    $project:
    $out:       create a new collection with the resulted docs
    $merge:     don't create new collection, insted merge or add the listed resulted docs into the existing collection(update the collection)
    $group: , 
    $sum:       after group, it count how many doc are in that group, 
    $push:      make a new array and push necessary properties there, 
    $count: ,
    $max: ,
    $min: ,
    $avg: ,
    $substruct: take an array of two elements, and return the substruct value of it, {$substruct: ["$maxReference", "$minReference]"},
    $unwind:    can't make group on array. before group array elements, we need an earlier $unwind of the array property which convert the array elements to access like object, each element of the array make separate object doc
    $bucket: ,
    $sort: ,
    $limit: ,
    $bucket: make groups based on different range ,
    $facet: multiple pipeline array, [{},{},..pipeline 1...],[{},{},..pipeline 2...],  when create multiple result/summary/report on same data set, then use $facet
    $lookup: populate docs from foreign collection,
    $round: make a decimal value to round
    $toInt:     convert a double type number to integer

    explain():      // get the query status including time, index etc
    indexing: 




    Model.aggregate([
        // stage 0: unwind array first
        { $unwind: "$friends" },

        // stage 1: match docs
        { $match: {gender: "Male", age:{$lt: 30}} },

        // stage 2: add a new field to each doc
        { $addFields:{ course: "level-2", eduTech: "Programming School" } }

        // stage : project
        { $project:{ name: 1, age: 1, gender:1 } },

        // stage: create a new collection with added fields by $addFields
        { $out: "newCourseCollection"},

        // stage: update by merge to the collection(it will modify the original DB data)
        { $merge: "existingCollectionName"},
    ])

    // aggregate grouping
    Model.aggregate([
        { $group: { _id: "$referencePropertyName"}},           // if we need to group all doc in a single group, use _id=null, 
    ])
    Model.aggregate([
        { $group: {_id: "$gender"}},                // make a group based on gender property, gender will create 2 groups: male & female,
    ])
    Model.aggregate([
        // stage 1: unwind array first
        { $unwind: "$interests" },

        // stage 2
        { 
            $group: {
                _id: "$address.country", 
                newEmailList: { $push: "$email"},               // return list of email of that country group 
                newDocList: {$push: "$$ROOT"},                  // "$$ROOT" push the full doc to the array, not a single property
                countDoc: { $sum:1 },                           // count the number of doc
                totalSalary: { $sum: "$salary",},               // sum the salary property values
                maxSalary: { $max: "$salary"},                  // return  highest salary value, not doc
                avgSalary: { $avg: { $toInt:"$salary"}},        // return the average salary value
                interestPerCountry: { $push: "$interests"},     // it will push the unwinded interest element
            }
        },

        // stage 3
        { 
            $project: {
                _id:1, 
                groupName: "$_id",
                newEmailList: 1,
                "newDocList.name": 1, 
                "newDocList.email": 1, 
                "newDocList.phone": 1, 
                countDoc:1,
                totalSalary: 1,
                maximumSalary: "$maxSalary",
                averageSalary: { $round: ["$avgSalary", 3]},
                salaryRangeMaxMin: { $substruct: ["$maxSalary","$minSalary"]},
                
            }
        }
    ])



    // $bucket: It keep doc bsed on limit
    {
        $bucket: {
            groupBy: "",
            boundaries: ["lowerLimit1","lowerLimit2","lowerLimit3",...],    // limit to keep in each bucket
            default:"",
            output: {
                propertyName1: value,
                propertyName2: value,
            },
        }
    }

    bucket group: 0-19, 20-39, 40+ age group create
    Model.aggregate([
        // stage 1: bucket
        {
            $bucket: {
                groupBy: "$age",                    // make the bucket group on age field
                boundaries: [20,40,60,80],
                default: "automatically goes to more than 80",
                output:{
                    count: {$sum: 1,},
                    nameList:{ $push: "$name"},
                    docList: {$push: "$$ROOT"},
                },
            },
        },

        // stage 2: sorting
        { $sort:{ count: -1}, },

        // stage 3: limitting docs
        { $limit: 2},

        // stage 4: projecting to output
        { $project: { count: 1} },
    ])


    $facet: create multiple pipeline array,
    Model.aggregate([
        {
            $facet:{
                [{},{}],    // pipeline 1
                [{},{}],    // pipeline 2
                [{},{}],    // pipeline 3
                .................
            }
        },
    ])

    make report on two property griends and education. use multiple pipeline so two report works separately independently paralaly
    Model.aggregate([
        {
            $facet:{
                // pipeline 1: friends pipeline
                "friendsPipeline":[
                    { $unwind: "friends"},                          // stage 1
                    { $group: { _id: "friends", count: {$sum:1}}},  // stage 2
                ],  

                // pipeline 2: education pipeline 
                "educationPipeline":[
                    { $unwind: "$education"},
                    { $group: { _id: "$education", count:{$sum:1} }},
                ],   
            }
        },
    ])


    // $lookup
    Mode.aggregate([
        {
            $lookup:{
                from: "orderCollection",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $unwind: "$products"
        },
        {
            $lookup:{
                from: "products",
                localField: "products.product_id",
                foreignField: "_id",
                as: "user",
            }
        },
    ])


    indexing, execution status, compund index, text index
    Model.find({}).explain("executionStats")

    queryPlan.stage = "IXSCAN"           // this field is indexed, scan by index
    queryPlan.stage = "COLLSCAN"         // this field is not indexed, regular scan to read all docs
    executionStages.stage = "IDHACK"     // default _id index name

    // create index on a property
    Model.createIndex({email: -1})      // decending vs accending order
    Model.dropIndex({email: 1})         // delete an index

    compund indexing:
    we have to decide which order should we index, index on gender: "male" vs "female";
    decide on which value we do query most time here suppose on "male". so to keep the "male" at first serian than female, we need to do the indexing on 'decending order' so 'm' comes first of 'f' => zyx...m...f..cba
    Model.createIndex({         // create compound index on 'email' & 'age'
        email: -1,              // first: decending order on email
        age: 1,                 // second: after email index, accending order on age
    })

    search or text indexing
    Model.createIndex({productDescription: "text"});    // typing 'text' will create search/text index on that property
    Model.find({$text:{$search: "search value"}});      // query on textIndex: text index use $text and $search operator to query


    Theory:
    - what is aggregation?


*/