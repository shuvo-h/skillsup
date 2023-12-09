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
        Symbol              Interface
    
    Advantage Vs Disadvantage
        Older Browser               Type Complexity
        Type Safty                  all npm library doesn't support
        Productivity increase       Over engineering
        Less Bug & Testing          Migration challange
    
    (x) = means ts error;
    void:               void can have undefined or null as value but don't accept never type.  let varName:void = null; varName = undefined;    (x) varName = never;
    unknown:            I don't know the type of the variabl enow, but in future when we will use this variable to assign a value, we will set that type to this variable. it means I know some value will be placed here but do not know it's type now. const makeDouble =(value:unknown)=>{if(typeof value === "string"){ return parseFloat(value)*2}}
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





    **** OOP Short note:
    **** Node.js Short note:
    **** mongoDB Short note:
    **** Redux Short note:
    **** RDBMS Short note:
    **** Prisma Short note:
    **** Next.js Short note:
    **** Docker Short note:
    **** React Native Short note:
    **** React Native Short note:
    

   
    


*/