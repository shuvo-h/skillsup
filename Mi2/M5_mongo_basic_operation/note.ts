/**
 * 
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



    insertOne:      Model.insertOne({}),
    insertMany:     Model.insertMany([{},{}]),
    findOne:        findOne doesn't support project chaining, use second stage to select fields. eg. Model.findOne({...query},{...project}),
    project:        project onyly works with 'find', eg. Model.find({...query}).project({}),
    $eq:
    $neq:
    $gt:
    $gte:
    $lt:
    $lte:
    $in:            return the doc if any of the element match within the given array
    $nin:
    $and:           take an array of condition
    $or:            take an array of condition
    $exist:         matches docs that contain or do not contain  a specified field on the doc 
    $type:          
    $size:          return the doc which array length match with the given value
    $all:           return the doc if the elements exist in any position of the array list
    $elemMatch:     it take an element(it can be object or premititive data), and then match the element parts with the list if match any of the element portion, return the full docs
    
    // field update operators
    $currentDate:
    $inc:
    $min:
    $max:
    $mul:
    $rename:
    $unset:         alternative of $addToSet, it remove/delete the property from the object doc
    $set:           enteirly replace the property's value to the new value, even if it is an array, it replace the full array and keeep the new value
    .$.             positional - update array of object which match on any index position then update the first matched element. It works with $set 
    
    // array update operators
    $addToSet:      Uniquily push a new element to the existing aray list, but keep the elements unique, not like $push. But it take only one element, it can also add a new property on the doc
    $each:          (with $addToSet) when adding multiple elements using $addToSet, use $each to add each element 
    $pop:           remove or delete the last element of the array
    $push:          Push a new element to existing array list but don't check duplicate like $addToSet
    $pull:          remove and get an specific element from an array based on index
    $pullAll:
    $each:
    $position:
    $slice:
    $sort:
    .derop('collectionName')




    Model.find({
        role: { $gte: 20, $lte: 50 },
        gender:{ $eq: "male"},
        age: { $nin: [25,36,41]},
        interests: { $in: ['cooking','gamming','travelling]},
        "skills.name": { $in: ['HTML','CSS','REACT]},
    })
    .sort({email: -1, age: 1})
    .limit(2)
    .project({_id: 0, email:1, name:1});


    // Explicit $and, $or
    Model.find({
        $and: [
            {age: {$ne: 18}},
            {age: {$gte: 30}},
            {gender: {$eq: 'female'}},
        ],
        $or: [
            { "skills.name": "JAVASCRIPT" }
            { "skills.name": "HTML" }
            { email: { $eq: "abc@mail.com"}},
            { interests: { $in: ['travelling', 'swimming']} },
        ],
    })

    // $exist, $type, $size
    Model.find({age: { $exist: true}});         // return list of docs  if age property has on the objec
    Model.find({age: { $exist: false}});        // return list of docs  if age property not present on the objec
    Model.find({age: { $type: 'string'}});      // return the docs which age and value type is string
    Model.find({company: { $type: "null"}});    // return the docs which  company  value type is null. remember to give the null in string
    Model.find({friends: { $size: 4}});         // return the docs which friends array length is = 4

    
    // array, array of elements, array of object
    Model.find({interests: { $all: ["Travelling","Cooking","Swimming"]}})
    Model.find({ 
        "skills.name" = "javascript",
        "skills.level" = "intermediate",
    })
    Model.find({ 
        skills: { $elemMatch: { name: "javascript", level:"intermediate"}}              // return the doc if the skills arrayof object match any element of the given object. no need to match the full doc
    })

    
    $set, $addToSet, $push
    Model.updateOne(
        {_id:"","address.road":"5A",},                      // if compound indexing
        {
            $unset:{                                        // $unset remove/delete the birthDay & joinYear property from the doc object
                birthDay: 1,
                joinYear:1,
            },
            $set:{                                          // $set suitable for permititive data, non-premititive such as object, array, arrayOfObject are not suitable 
                "education.$.major": "CSE",                 // .$. match the elements from education array, then update the 'major' field of the 1st matched element
                age: 80,
                "address.city": "Melborn",
            },
            $addToSet:{                                                         // add unique value with duplicate check
                interests: { $each: ['gamming','running','busketing']}
            },
            $push:{                                                             // no unique value, no duplicate check, direct push
                interests: { $each: ['gamming','running','busketing']}
            },
            $pop:{                                                             // remove the last element from the interests array. value 1 means last element, value -1 means first element
                friends: -1,
            },
            $pull:{                                                            // remove an specific element from an array, remove 'david' from the friend list
                friends: 'david makccau',
            },
            $pullAll:{                                                         // remove multiple elements from an array, remove 'david' & 'Herty from the friend list
                friends: ['david makccau', 'Herty Janson'],
            },
            $inc:{                                                             // increase the age value by age += 5;
                age: 5,
            },
        },
        { new: true }
    )



    delete document
    Model.deleteOne({email:"deleted@mail.com"});
    db.createCollection("collectionName")
    db.collectionname.drop({writeConcern:{w:1}});
    mongoose.connection.db.dropCollection('collectionName',(err,result)=>{})
*/