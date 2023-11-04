// basic data type 

// premititive data type 
// string
let firstName: string = "David";

// number 
let roll: number = 12;

// boolean
let isAdmin: boolean = true;

// undefined
let x: undefined = undefined;

// null 
let y: null = null;

// any  (can store any type data)
let d;



// non-premititive data type 
// array 
let friends: string[] = ["domingo","russo"];
friends.push('an')

let rolls: number[] = [1,5]
rolls.push(45)


// tuple:  is a type of array where it maintain the order of type in each index of the array elements
let coordinates: [number,number] = [1,6];
let co_ordinates: [number,string] = [1,'6'];
let student: [string,number,boolean] = ['david',33,true];

// union
// 


// reference type --> object 
type userType = {
    company: "BBL inc",                     // literal type or fixed value
    readonly age: number,                   // this property value is not allowed to edit or update
    firstName: string,
    middleName?: string | undefined,        // optional property type
    lastName: string,
    isMarried: boolean
}
const usr: userType = {
    company: "BBL inc",
    firstName: "David",
    lastName: "Barham",
    isMarried: false
} 



// Normal function
function add(num1:number, num2:number = 10):number {
    return num1 + num2;
}
add(3,4)

// Arrow function
const addArrow = (num1:number, num2:number): number=>{
    return num1 + num2;
}
addArrow(6,1)

// method: when a function is written inside a object, it is called method
const poorUser = {
    name: "david",
    balance: 10,
    addBalance(depositeBalance: number):string{
        return `My balance is ${this.balance + depositeBalance}`;
    },
}


const nums: number[] = [5,6,9,7,];
const squireNums: number[] = nums.map((el:number):number=>el*el);


// spread operator
const names: string[] = ['litya','seujec'];
const secondNames: string[] = ['laimorca','cikorenja',]
names.push(...secondNames);

const profile = {
    name: "Tilsan",
    skill: "HTML"
}
const address = {
    home: "175 ad road",
    city: "Haksaki"
}
const employee = {
    ...profile,
    ...address
}

// rest operator
const greetFriends = (name1:string, ...friends:string[]):void => {
    console.log(name1, friends.join(' '));
    friends.forEach(fr=>{
        console.log(`Hi ${fr}`);
        
    })
}

greetFriends('arshi yang','ekriya ung');


// destructuring  Object
const usrInfo = {
    id: 454,
    allName:{
        firstName: "altoni",
        lastName: "young"
    },
    contactNo: '245641',
    address: "china"
}

const {id,allName:{firstName:fName,lastName},} = usrInfo;


// destructuring array 
const myFriends = ['chang','david', 'adiaxka','rahul'];
const [cninaName, englishName,  ,indianName, ...rest] = myFriends;


// type alias
type studentType = {
    name: string,
    age: number,
    contactNo?: string,
    gender: string,
    address: string,
}
type IsAdminType = boolean

const student1: studentType = {
    name: 'mekrix',
    age: 26,
    contactNo: '1231313',
    gender: 'male',
    address: 'jiyang jing',
}
const student1Admin: IsAdminType = true;
const student2: studentType = {
    name: 'david',
    age: 29,
    gender: 'male',
    address: 'New Zeland',
}
const student2Admin: IsAdminType = false;

// function type alias
type AddFnType = (num1: number, num2:number) => number;
const addFn: AddFnType = (num1,num2) => num1 + num2;


// union type 
type FrontendDevType = 'junior'  | 'intern' | 'trainee';
type FullstackDevType = 'senior' | 'retired';
type DeveloperType = FrontendDevType | FullstackDevType;
const newDeveloper: FrontendDevType = 'junior';

type EployeeType = {
    name: string,
    email: string,
    gender: 'male' | 'female',
    bloodGroup: 'O+' | 'A+' | 'AB-'
}
const newEmployee: EployeeType = {
    name: "Jyni thoung",
    email: "jyni@sample",
    gender: "female",
    bloodGroup: 'O+'
}



// intersection type : marged multiple types into a single type
type FrontendDeveloperType = {
    skills: string[],
    designation1: 'Frontend Developer'
}
type BackendDeveloperType = {
    skills: string[],
    designation2: 'Backend Developer'
}
type FullstackDeveloperType = FrontendDeveloperType & BackendDeveloperType;

const fullstackEmployee: FullstackDeveloperType = {
    skills: ['Html', 'css'],
    designation1: "Frontend Developer",
    designation2: "Backend Developer"
}


// ternary operator ?:
// optional chaining ?
// nulish coalescing operator  ??           // only works for null/undefined value
const isAuthenticated = null;
const result1 = isAuthenticated ?? "Guest";         // if isAuthenticated = null/undefined, then set default value "Guest"


// never, unknown and nullable type 
// nullable type 
const searchName = (value:string | null) =>{
    if (value) {
        console.log("searching");
        
    }else{
        console.log('nothing to search');
        
    }
}
searchName('rishan')
searchName(null)            // null type

// unknown type         - don't know the type but find the type using typeof during running the code
const getSpeedInMeterPerSecond = (value:unknown) =>{
    if (typeof value === 'number') {
        return (value * 1000) / 3600;
    }else if (value === 'string') {
        const [valueInNumber,unit] = value.split(' ');
        return (parseFloat(valueInNumber[0]) * 1000) / 3600;
    }else{
        console.log('wrong input value');
        
    }
}

getSpeedInMeterPerSecond(5454);
getSpeedInMeterPerSecond('1054 kmh^-1');

// never type 
function throwError(message:string):never {
    // this function forever will not return anything so return type is 'never'
    throw new Error(message);
}
throwError('custom error throw check')