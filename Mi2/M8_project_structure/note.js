 
/*
    typescript Short note:
    
    - Typescript extends javascript based on OOP
    Types in JS         Types in TS
        Number              Interface
        String              Void
        Boolean             Array
        Null                Tuple
        Undefined           Enum
        Object              Union
        Symbol              
    
    Advantage Vs Disadvantage
        Older Browser               Type Complexity
        Type Safty                  all npm library doesn't support
        Productivity increase       Over engineering
        Less Bug & Testing          Migration challange

    (x) = means ts error;
    void:               void can have undefined or null as value but don't accept never type.  let varName:void = null; varName = undefined;    (x) varName = never;
    unknown:            I don't know the type of the variable now, but in future when we will use this variable to assign a value, we will set that type to this variable. it means I know some value will be placed here but do not know it's type now. const makeDouble =(value:unknown)=>{if(typeof value === "string"){ return parseFloat(value)*2}}
    never:              The never type represent that the variable will not have any value. you can not assign any value to this variable even not null, undefined,string,tuple etc nothing. eg, const tthrowError = (message:string):never => throw new Error(message); here it is confirm that this function will never return any value.
    null:               null is a value that can be explicitly assigned by developer to a variable to indicate the absence of any meaningful object. Eg, setUser(null); Here we know the user object {id,email,token} but since the object is fetched and not present in frontend now, we can initially set it null.
    undefined:          undefined represent the absence of an expected value. eg, from the user object if we want to access user.role, it will return undefined. Here we were expecting a value 'admin','normal user','super admin'. but since the property role is not exist on user it will return undefined.
    Tuple:              special type of array which tell the type for every index of an array
                        const student:[string,number,boolean,number] = ['Danial',14,true, 87];  // here tuple tells which element will be which type for [name,role,isPass, marks]
    union(OR |):        it is actually OR type and defne as | in type. eg, const roll:number | string. Here role can be string r number type
    intersection(and &):It is actually AND type ans define as & in type. eg, type front_developer={skill:"Frontend"}; type back_developer={skill:"Backend"}; type FullstackDeveloper = front_developer & back_developer
    extends:            Intersection and extends are same. intersection(&) is used only for type alliag, where extends is use only for interface. eg, interface User{name: string}; interface Student extends User {roll:number,class:string}
    literal type:       use a hard coded value as type of the variable. eg const address:{road:"abc road",post:number} ={road:"abc Road",post:30}; here road type is hadcoded and it is calle dliteral type
    
    readonly:           it is a access modifier of the property. if we user readonly for any property of type declaration, then the assign value of that property can't be changed later
    type alias:         re-using the same type declariation. type alias ususlly done by define type of object using type or interface.
    type alias of function: declare the type with the same structure of the function and use it with the function name.
                        interface TAddFn { (param1:number,param2:number): number[]; }; const addNumberFn:TAddFn = (num1,num2) => [num1,num2];
                        type TAddFn = (param1:number,param2:number) => number[]; const addNumberFn:TAddFn = (num1,num2) => [num1,num2];

    type assertion/type narrowing: forcefully tell typescript to act as a specific type. eg, let varName:any; (varName as number).toFixed(2); here the variable is acting as number. this is assertion
    type allias vs type interface: for every premititive data, we will use type alias, eg, type roll = number; and for non-premititive data(array,object), we will use type interface, eg interface student {name:String};
    
   
    null cloalescing vs nulish coalescing
    null cloakescing:   check if first condition statement is true, then return first block value, if wrong then return last block value. const adult = age > 18 ? "Yes" : "No"; 
    nullish coalescing: check if first condition statement is null or undefined, then set a default value. if it is not null or undefined then use that value. const studentAge = age ?? 5;  if age has any value then set studentAge = value of age else set studentAge = as default 5;
   
    write an array of number in both way: type allias and interface 
        type allias:        type TRoll = string[]; const stRoll:TRoll= ['14','25','13'];                      Here, 0 index = '14', 1 index = '25' and so on.
        interface alias:    interface TRoll {[index:number]:string}; const stRoll:TRoll= ['14','25','13'];    Here, the array[] will contain index which is number type , and the element will be string type. final string type array string[]

    constraints: It tells generic type parameter must have the following criteria or property. eg, type TUser = {id:string,email:string}; function makeStudent<T extends TUser>(studentInfo:T){}; Here, the generic type T must have all the property of TUser

    purpose of keyof in generic: type TVehicle = {bike:string,car:string,ship:string}; type TVehicleName = keyof TVehicle;  // Here, TVehicleName is any of the key of TVehicle type
    conditional typing: based on condition it assign type. type TUser = {bike:string,car:string}; type TCheckVehicle<T> = T extends keyof TUser ? true : false;   // Here, TCheckVehicle conditionally chekc if the generic type is any property of TUser or not.
    mapped type: type TField = {width:number,height:number}; type TArea = {[key in keyof TField]: number}; // Here TField and TArea are same. because TArea has mapped on TField and created property for each key of the TField.
                type TField<T> = {[key in keyof T]: typeof T[key]}; It will take the generic type T object and will make map on it's each property to create type's property, and then it will assign the type's value by accessing the T object's value as T[key] and the get its type using typeof.

    Utilities in type:
    Pick:       take a list of properties from an existing type to create a new type. type TPerson = {name:string,age:number,email?:string}; type TName = Pick<TPerson,"age"|"email">;      // It will make {age:number,email:string};
    Omit:       take a list of properties from an existing type tocreate a new type without the properties included in the list. type TPerson = {name:string,age:number,email?:string}; type TName = Omit<TPerson,"age"|"email">;  // It will make {name:string};
    Required:   take a type and make all of it's property mandatory. eg. type TMainUser = Required<TUser>;
    Partial:    take a type and make all of it's property optional. eg. type TOptionalUser = Partial<TUser>;
    Readonly:   take a type and make all of it's property fixed and un-editable. eg. type TOptionalUser = Readonly<TUser>;      // You can not re-assign any property's value of the object
    Record:     take two generic value where first one is for keyName and secondOne is the value type. So we can add new property and value always. eg, type TEmptyObj = Record<string,unknown>; It means, the object will take the property in string type and the value of the property is unknown type
    
    >Utils Monomic< : Record porimane Readonly Required. Partial vabe Omit ke Pick koro.
    _________________________________________________________________________________________________






    **** OOP Short note:
    - OOP access modifiers:
    .) readonly         : can not change the value from anywhere either public or private 
        .) public       : can access from anywhere
        .) private      : can't access outside of this instance, but can only indise it's own methods. for private properties, use "underscore" naming convention like readonly public _id, readonly private _password, protected _balance
        .) protected    : can't access publicly, but can access only from itself own and it's instances. but not from public.
        .) static       : memory doesn't change of the property. DOes,'t matter how many instance are you creating but the static property value will always be same for all the instance. you can't use 'this' to call static property or static methods. have to use the className to access the static property(for both outside & inside). 
    parameter properties in OOP constructor: Don't need to declare the variable, the use of modifiers in constructor with paramerer nam will do it. class Animal {constroctor(public age:number){}} 
    inheritance: create a new child class by extending a parent class. class catOne extends Animal{constroctor(){super()}} 
   
    Type Gaurds:
    typeof          : to check the type of a variable
    in              : chak if a propertu exist in a object. TUser = {name:string}; TAdmin = {name:string,role:['admin']}, const isAdmin=(data:YUser|TAdmin)=>{if('role' in data){return true}}
    instanceof      : check if any property of object is an instance of any class or not. class Animalclass{public age:number; constructor(){}} const getAge =(cat) =>{if(cat instance of Animalclass){}}
    is              : to specify a new value which type it will use. const isCat =(data:Animalclass):data is Catclass=>{if(data instanceof Animalclass)}
    
    Getters and Setters:
    get             : use get before a method will allow to set the value by custom modify and also allow to access the it like a property not method. class Animal{private _balance:number; constructor(){}; get seeBalance(){return this._balance}  now you can access like console.log(AnimalInstance.seeBalance);
    set             : set addBalance(amount:number){this._balance += amount;}};  add amount use as property, AnimalInstance.addBalance = 50;

    polimorphism    : use same methodName in multiple inheritance classes but with diferent logic. during calling the method name will be same but based on the call, the result will different. chass Shape{area:number;constroctor(){}}; class Triangle extends Shape{constroctor(){} calculateArea(width,height){return 1/2*width*height}}; class Rectangle extends Shape{constroctor(){} calculateArea(width,height){return width*height}}; // Here calculateArea() will work like polimorhism. the same method name will work differently on different istance
    encapsulation   : It is the use of 'private' & 'protected' so that outside of the class and childs, the property/methods are not accessiable
    abstruction     : In short, class er type declaration. 2 ways for abstruction. (i) using interface implements, (ii) using abstruct keyword. Keep complex logic inside the method and allow user to provide only params value. 
                        (i) interface implements: inteface VehicleInterface {startEngineFn():void,model:string}; class CarClass implements  VehicleInterface{model:string; constructor(){} startEngineFn(){console.log("details to start the engine")}}; // Here startEngineFn hold the complex logic of start the car but from interface type, you can get idea what would be the result(start engine), but don't know the full logic of it(which will be described in class, not interface). Here interface works as a Type of the cass to implement, but the class can also take more property outside of the interface. 
                        (ii) abstruct class: It is the Leader/Ideal class that the rest of the class should follow this abstruct class. Similar as Type. abstruct class can NOT create any instance but you can extends the class. eg, abstruct class Vehicle{constructor(){} abstruct startEngine():void}; class Car extends Vehicle{constructor(){super();} startEngine(){console.log('comples logic to start engine in this extends class. The abstruct class only contain the method name..')}} 

                        
    **** mongoDB Short note:
    .insertOne       :        
    .insertMany      :     
    .create          :     
    .find            :
    .findOne         :
    .projection      :
    .sort            :   .sort({decedingFieldName:-1})  //accending = 1, deceeding = -1
    .limit           :
    .select          :
    .deleteOne       :
    .deleteMany      :
    .createCollection: to create a collection db.createCollection('students')
    .drop            : to delete a collection db.students.drop({writeConcern:1})
    
    Operators:
    $eq              :  
    $neq             :  
    $gt              :  
    $lt              :  
    $gte             :  
    $lte             : 
    $in             : 
    $nin             : 
    $ne             : 
    $and            : .find({$and:[{property1:""},{property2:""}]}) 
    $or            : .find({$or:[{property1:""},{property2:""}]}) 
    $exists         : .find({age:{$exist:true}}) // return only if age property present on the doc
    $type           : .find({age:{$type:'date'}}) // return only if age value is a date type 
    $size           : .find({friends:{$size: 5}}) // return the docs if friends array list has total 5 elements 
    $all            : .find({friends:{$all:['element 1','element 2',....]}})  // return the doc if friends array has the following all elemnts
    $elemMatch      : find({skills:{$elemMatch:[{lavel:"intermideate"},{experience:"3 year"},....]}}); // return if any of the element of skills array match with the lavel and experience property
    $set            : [update premititive]: suitable for premititive data like number,string,boolean. for non-premititive data like array,object etc use $addToSet
    $unset          : [remove a field]: findByIdAndUpdate(_id,{$unset:{fieldName:1}})
    $addToSet       : [update array non-premititive]: only add unique values to the array. It is alternative of $push with unique value findByIdAndUpdate(_id,{$addToSet({fieldname:{$each:['elem1','elem2']}})})
    $push           : [update array premititive + non-premititive]: never check unique values and add to the array. It is alternative of $addToSet but don't check unique value. findByIdAndUpdate(_id,{$push({fieldname:{$each:['elem1','elem2']}})})
    $pop            : [update array, remove last element]: findByIdAndUpdate(_id,{$pop:{friends:1}}); it removes the last element from the "friends" array. if give -1, then remove the first element
    $pull           : [update array, remove selected element]: findByIdAndUpdate(_id,{$pull:{friends:"firendValue"}}); it removes the matched single element from the "friends" array.  
    $pullAll        : [update array, remove selected elements]: findByIdAndUpdate(_id,{$pull:{friends:["firendValue1","firendValue2",..]}}); it removes the matched all elements from the "friends" array. 
    array_positional($): [update an element based on the position]: updateOne({_id:"","friends.roll":10},{$set:{"friends.$.blood":"AB-"}});   // it will update to friends:[{blood: "AB-",roll:10}] by matching roll 10
    $inc            : [update to increase value]: findByIdAndUpdate(_id,{$inc:{balance: -300,checkBook.page: 1}}); // reduce the balance 300 amount

    aggregation:
    $match
    $sort
    $limit
    $lookup
    $addToFields
    $unwind
    $group
    $project
    $out            : create a new collection into database from aggregation pipeline stage 
    $merge          : similar as $out but insted of creating a new collection, it merge the pipeline docs with current collection
    $group          : {$group:{_id:"$targetField",newPropertesName:"",totalDocsInCollection:{$sum:1},totalDocsInGroup:{$count:1},maxValue:{$max:"$age"},minValue:{$min:"$age"},avgValue:{$avg:"$age"},countryList:{$push:"$address.country"},fullDocList:{$push:"$$ROOT"},}}
                      group operators:
                        _id: null //null means take all docs in a single group
                        $sum
                        $count
                        $max
                        $min
                        $avg
                        $push
                        $$ROOT
    $project        : {$project:{fieldName1: 1,fieldName2:"$referField",}}
    $subtract       : {totalPay:{$subtract:[{$add:["$price","$fee"]},"$discount.price"]}}
    $add            :
    $bucket         : [take boundaries and create groups based on the boundaries]
        {
            $bucket:{
                groupBy:"$age",
                boundaries:[10,18,30],
                default:"largerThanThirty",
                output:{
                    total: {$sum:1},
                    name: {$push:"$name"},
                    docList: {$push:"$$ROOT"},
                }
            }
        }
    $facet          : [multiple pipeline]: return separate output in a objectwith the given pipeline name. If there are 3 pipeline inside $facet, then in the return result array, there will be 3 output element.
        {
            $facet:{
                "northCountriesOutput": [ //pipeline1 ],
                "southCountriesOutput": [ //pipeline2 ],
                "eastCountriesOutput": [ //pipeline3 ],
                ...........
            }
        }
    $lookup         : {$lookup:{from:"schemaNameInDbNotMongoose",localField:"localPropertyName",foreighField:"foreignPropertyName",as:"newPropertyName"}} // return an array. we can make object by taking 1st element by using {$addFields:{newPropertyName:{$elemAt["$newPropertyName",0]}}}

    // embeding vs referencing: keep the full doc repeatedly in every collection called embedding. Keep a reference value like _id/email/slug etc so that we can populate called referencing
    indexing:
    coll_Scan: read page by page and find the answer.  Check for every doc and all property.
    index_Scan: read index list find pageNumber and go to that page to find the answer. check only the doc_id or email on which it is indexed.
    .explain("executionStats"):   after any query, this executionStats explain withh return the queryinfo like hoy many milliseconds it took to complete the query
    IDHACK - it is a special type of index_scan. mongoDB give by default it on _id. and if we can to create index on any property, then this will be applied
    COLLSCAN -if we do a query on a field which is not indexed.
    compund_index: userSchema.index({ email: 1, name: 1 }); // Create a compound index on the 'email' and 'name' fields
    text_index: userSchema.index({ username: 'text', email: 'text' });  // Create a text index on the 'username' and 'email' fields


    - Replication & sharding: scaling DB for performance





    
    **** Node.js Short note:
    nodejs - a javascript runtime built on Chrome's V8 engine
    built-in-modules: OS(operating system), fs(file system), http, path, url,utils etc 
    pros: run both client+server side, highly scaleable, single thread, event driven, non-blocking I?O operations, data intensive, streaming
    cons: Highly CPU intensive, 
    dependencies: V8 engine, Libuv
    v8 engine: A engine written in (C++ & javascript) to understand javascript code. It is a runtime.
    Libuv: A opensource library written in C++ to perform asynchronous I/O operation and gives Node.js to access Computer OS, File System, Networking etc.
    Libuv => Event Loop & Thread Pool
    Event Loop: execute callback fn and network I/O
    Thread Pool: CPU intensive task, File access, File Compession, Cryptography etc.
    Modeule: Isolated and reuseable block of code that has it's own scope
    commonJS vs ESM: require/impoer, module.export/export default, .js/.mjs
    type of module: local module, built-in module, third-party module 
    path module: path.join() // join two paths. ususlly path.join(__dirname,"newFolder/file.txt")
                    .parse()  // format a path into path object
                    .resolve() // resolve the specified path into absolute path  
            path.resolve('/a', 'b', 'c');     //    C:\a\b\c
            path.resolve('/a', '/b', 'c');    //    C:\b\c
            path.resolve('/a', '/b', '/c');   //    C:\c
            path.join('/a', '/b', '/c');   //   \a\b\c
            path.join('/a', '/b', 'c');    //   \a\b\c
            path.join('/a', 'b', 'c');     //   \a\b\c
            path.join('a', 'b', 'c');      //   a\b\c
    fs.readFileSync()       // synchronously will block the main thread
        .readFile()         // asynchronous will NOT block the main thread (recommended to use)|| await fs.readFile("/path/file.txt","utf-8");
        .writeFileSync()    // synchronously will block the main thread
        .writeFile()        // asynchronous will NOT block the main thread (recommended to use) || await fs.writeFile("/path/file.txt","new text data","utf8");
        .createReadStream().on('data',(bufferChunk)=>{res.write(bufferChunk)}).on('end',cb).on('error',cb)    // continuously send buffer chunk to user to improve user experience
        .createWriteStream()   
    new EventEmitter().on('eventName',(paramBodyData)=>{}).emmit('eventName',bodyData).off('eventName')
    Stream:send small amount of data(chunk) from a large data continuously 
    Buffer: during streaming if small data chunk
        - better user experience,
        - short memory consumption on server since doen't load the full file at once
    Type of streams: 
        - Readable Stream: only read data (ex. http req, fs.readStream)
        - Writeable Stream:  only write data (ex. http res, fs.writeStream)
        - Duplex Stream: for both read and write (ex. socket)
        - Transform Stream: reshape the stream data or change the data during stream (ex. Stream.Transform({transform(chunk,encoding,cb){this.push(modifiedChunk);cb();}}))




    **** Redux Short note:
    **** RDBMS Short note:
    **** Prisma Short note:
    **** Next.js Short note:
    **** Docker Short note:
    **** React Native Short note:
    **** React Native Short note:
    

   
    


*/
