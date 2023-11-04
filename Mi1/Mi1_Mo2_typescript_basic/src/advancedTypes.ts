// Type assertion 
let anything:any;

anything = 245;
(anything as number).toFixed(3);

anything = 'david Bekham';
(anything as string).includes('a')

const kgToGm = (value:string|number): string | number | undefined =>{
    if (typeof value  === 'string') {
        return `The Converted value = ${parseFloat(value) * 1000}`;
    }else if (typeof value === 'number') {
        return value * 1000;
    }
}

const resultGm1 = kgToGm(1000) as number;
const resultGm2 = kgToGm('1000') as string;

// usages of assertion 
type CustomError = {
    message: string
}
try {
    
} catch (error) {
    console.log((error as CustomError).message);
}


// interface in typescript
    // : by type
type User1Type = {
    name: string,
    age: number
}
type UserWithRole1 = User1Type & {roll: string} // intersect type

const user1: UserWithRole1 = {
    name: "David",
    age: 45,
    roll: '78',
}

    // : by interface
interface User2Type {
    name: string,
    age: number
}

interface UserWithRole2 extends User2Type {
    roll: string
}

const user2: UserWithRole2 = {
    name: "David",
    age: 45,
    roll: '78',
}

    // : by interface to declare array index
type RollNumberType = number[];
let rolls:RollNumberType = [1,5,6];

interface RollNumber2Type {
    [index: number]: number     // index of array will be number, value of the element will be number
}
let rolls2:RollNumber2Type = [1,5,6];

    // by interface in function
type AddType = (num1:number,num2:number) => number;
const AddFn: AddType = (num1,num2) => num1 + num2;

interface AddFnType {
    (num1:number, num2:number): number
}
const AddFn2: AddFnType = (num1,num2) => num1 + num2;


// generic type (dynamic type)
// type GenericArrayType<customType> = customType[];
type GenericArrayType<T> = Array<T>;

// const numbers: number[] = [45,2,5];
const numbers: GenericArrayType<number> = [45,2,5];
const mentors: GenericArrayType<string> = ['adi','lidi','luchi'];
const presents: GenericArrayType<boolean> = [true,false,true];

interface UserType {
    name: string,
    age: number,
    isMarried: boolean,
}
const users: GenericArrayType<UserType> = [
    {
        name: "david",
        age: 45,
        isMarried: false,
    }
]

// generic tuple
type GenericTuple<T1,T2,T3> = [T1,T2,T3]
const customers: GenericTuple<string,string,string> = ['Mr.X', 'Mr.Y', 'Mrs.S'];
interface address{
    home: string,
    roadNo: number
}
const customerWithAddress: GenericTuple<number,address, boolean> = [14,{home:"Lass vegas",roadNo:55}, true];


// generic interface
interface DeveloperType<T,B = undefined> {  // default value undefined
    name: string,
    smartWatch: T,
    bike?: B,
    compuiter: {
        brand: string,
        model: string,
        releaseYear: number
    }
}
interface WatchType {
    brand: 'Emilab',
    model:"HRP-74",
    display: 'LED',
    waterproof: boolean
}
const poorDeveloper: DeveloperType<WatchType,null> = {
    name: 'david',
    smartWatch: {
        brand: 'Emilab',
        model:"HRP-74",
        display: 'LED',
        waterproof: true
    },
    compuiter: {
        brand: 'HP',
        model: 'GK-475',
        releaseYear: 2023
    }

}


// function with generic parameter
const createArray = <T>(param: T):T[] =>{
    return [param];
}

const result1 = createArray<string>('europe')
const result2 = createArray<boolean>(true)

const createArrayWithTuple = <T,Q>(param1: T, param2:Q):[T,Q] =>{
    return [param1,param2];
}
const result3 = createArrayWithTuple<boolean,string>(true,'europe');

// constraints
interface studentPrimeType{
    id: number,
    name: string
}
const addCourseToStudent = <T extends studentPrimeType>(student:T)=>{
    const course = 'abc course';
    return{
        ...student,
        course
    }
}
interface StudentType extends studentPrimeType {
    email: string;
}

const student1 = addCourseToStudent<StudentType>({
    id: 1,
    name: "David",
    email: 'david@mail.com'
})
const student2 = addCourseToStudent<StudentType>({
    id: 2,
    name: "Moring",
    email: 'Moring@mail.com'
})

// generic constraint with keyof operator
type VichleType = {
    bike: string,
    car: string,
    ship: string
}

type Owner1Type = 'bike' | 'car' | 'ship';      // manully typing
type Owner2Type =  keyof VichleType;            // using keyof operator
const person1: Owner1Type =  'car'; 
const person2: Owner2Type =  'ship';


const getPropertyValue = <T,Q extends keyof T>(obj:T,key:Q) =>{
    return obj[key];
}

const user = {
    name: 'David',
    age: 47,
    address: 'mung'
}

const userRes = getPropertyValue(user,'name');


// asyncronous typescript : Promise
type motorType = {
    rotor: string,
}
const createPromise = (): Promise<motorType> =>{
    return new Promise<motorType>((resolve,reject)=>{
        const data = {
            rotor: '5M torque',
        };
        if (data) {
            resolve(data)
        }else{
            reject('faill to fetch data');
        }
    })
}

const showData = async(): Promise<motorType>=>{
    const rest = await  createPromise();
    console.log(rest);
    return rest;
}


// conditional type
type a1 = null;
type b1 = undefined;

type x = a1 extends null ? true : false;
type y = a1 extends null 
        ? true 
        : b1 extends undefined
        ? undefined
        : any;


type SheikhType = {
    bike: string,
    car: string,
    ship: string
}

type CheckVehicleType<T> = T extends keyof SheikhType ? true : false;
type hasBike = CheckVehicleType<'car'>


// mapped type 
type AreaNumberType = {
    height: number,
    width: number
}

type AreaStringType <T> = {                         // take every key from AreaNumberType and make them string type
    [key in keyof T] : T[key]
}
type HeightType = AreaNumberType['height'];     // lookup type

const area1: AreaStringType<{height:number,width:string}> = {
    height: 45,
    width: '74',
}


// utility types
//  -Pick
type PersonType = {
    name: string,
    age: number,
    email?: string,
    contactNo: string
}

type NameType = Pick<PersonType,'name'>;                
type NameAgeType = Pick<PersonType,'name' | 'age'>;         // take name & age

//  -Omit
type ContactInfoType = Omit<PersonType, 'name' | 'age'>     // take all without name & age

// - Require
type PersonRequireType = Required<PersonType>               // removed optional sign
// - Partial
type PersonPartialType = Partial<PersonType>               // add optional sign
// - Readonly
type PersonReadOnly = Readonly<PersonType>
const personInfo: PersonReadOnly = {
    name: "David",
    age: 45,
    contactNo: '5454'
}
// personInfo.name = 'Chang Ung';          // not allowed only readonly

// - Record type
type MyObjType = {
    a: string,
    b: string
}
type MyObjWithRecordType = Record<string,string>    // Record<key type, valueType> of the object

const obj1: MyObjWithRecordType = {
    a: 'test str',
    b: 'practical str',
    c: 'Cc str',
    // now add dynamic property here
}

const EmptyObjectType: Record<string,unknown> = {};