/**

    inheritence
    polymorphism
    abstraction
    encapsulation


*/

// oop class 
class Animal{
    public name: String;
    public species: String;
    public sound: String;

    constructor(name:String, species: string, sound: string){
        this.name = name;
        this.species = species;
        this.sound = sound;
    }

    makeSound(){
        console.log(`The ${this.name} says ${this.sound}`);
    }
}

// objecty instance from class
const dog = new Animal('German Shaperd','dog','Gheu Gheu');
const cat = new Animal('Minue cat','cat','Miau');
cat.makeSound();


// inharientance
class Parent {
    name: string;
    age: number;
    address: string;

    constructor(name: string, age: number, address: string){
        this.name = name;
        this.age = age;
        this.address = address;
    }

    getSleep(numOfHour:number){
        console.log(`${this.name} sleeps ${numOfHour} hours`);
        
    }
}

class Student extends Parent {
    
    constructor(name: string, age: number, address: string){
       super(name,age,address);
    }
}

const student1 = new Student('Mr. X',12, 'Sydny');
console.log(student1);
const speep1 = student1.getSleep(5)

class Teacher extends Parent {
    public designation: string;
    constructor(name: string, age: number, address: string, designation:string){
       super(name,age,address);
       this.designation = designation
    }

    getDesignation(){
        console.log(`${this.name}'s designation is ${this.designation}`);
    }
}

const teacher1 = new Teacher('Mr. TT',50, 'David','Principal');
teacher1.getDesignation();
console.log(teacher1);


// type guards:: typeof, in, instanceof 
// (i) typeof --> type gauard
type AlphaNumericT = string | number;
const add = (param1: AlphaNumericT, param2: AlphaNumericT): AlphaNumericT =>{
    if (typeof param1 === 'number' && typeof param2 === "number") {
        return param1 + param2;
    }else{
        return param1.toString() + param2.toString();
    }
}
const resN = add(2,4);
const re1sN = add('2','4');
console.log({re1sN,resN});

// (ii) in --> in gauard
type NormalUserT = {
    name: string,
}
type AdminUserT = {
    name: string,
    role: 'admin'
}
const getUser = (user:NormalUserT|AdminUserT) => {
    if ('role' in user) {
        console.log(user.role);
        
    }else{
        console.log(user.name);
        
    }
}
const normaluser: NormalUserT = {
    name: "normal name"
}
const adminUser: AdminUserT = {
    name: "Admin name",
    role: "admin"
}
getUser(adminUser)
getUser(normaluser)


// (ii) instanceof --> instanceof gauard
class ZooAnimal {
    public name: string;
    public species: string;

    constructor(name:string, species:string){
        this.name = name;
        this.species = species;
    }

    makeSound(){
        console.log("I am making osund");
        
    }
}

class ZooDog extends ZooAnimal {
    constructor(name:string, species:string){
        super(name,species);
    }
    makeBark(){
        console.log("I am barking");
    }
}
class ZooCat extends ZooAnimal {
    constructor(name:string, species:string){
        super(name,species);
    }
    makeMeaw(){
        console.log("I am meawing");
    }
}

// type guard narrow down: smart way to check instance of type
const isDogInstance = (animal: ZooAnimal): animal is ZooDog =>{
    return animal instanceof ZooDog;
}
const isCatInstance = (animal: ZooAnimal): animal is ZooCat =>{
    return animal instanceof ZooCat;
}
const getAnimal = (animal: ZooAnimal) =>{
    if (isDogInstance(animal)) {
        animal.makeBark()
    }else if (animal instanceof ZooCat) {
        animal.makeMeaw();
        
    }
} 
const ZooDogObj = new ZooDog('Dog Bhai','dog');
const ZooCatObj = new ZooCat('cat Bhai','cat');
getAnimal(ZooDogObj)



// Access modifier 
class BankAccount {
    // properties:: public/private/readonly/protected  
    public readonly id: number;
    public name: string;
    protected _balance: number;         // accessible only inside class and its child class
    private _registrationID = Math.floor(Math.random()*100); // accessiable only inside this class, not in extended child
    // static: the memory location dosen't change

    // constructor + super
    constructor(id:number,name:string,balance:number){
        this.id =id;
        this.name =name;
        this._balance =balance;
    }
    // getter: call like a property
    get currentBalanceGetter(){
        return this._balance;
    }
    // setter
    set newDepositeSetter(newAmount:number){
        this._balance += newAmount;
    }

    // methods
    public addDeposite(amount:number){
        this._balance += amount;
    }
    public getBalance(){
        return this._balance;
    }
}

class StudentAccount extends BankAccount {
    test(){
        
    }
}
const poorPeople = new BankAccount(1,'PoorMan',20);
poorPeople.addDeposite(15);
poorPeople.newDepositeSetter = 12



console.log({poorPeople,balance:poorPeople.getBalance(),crtBalance:poorPeople.currentBalanceGetter});



// static:: memory location doesn't change 
class Counter {
    static count :number = 0;   // keep the memory same location for all instances
    increment(){
        // return this.count += 1;  // this won't work for static
        return Counter.count += 1;
    }
    static incrementStatic(){
        return Counter.count += 1;
    }
    decrement(){
        // return this.count -= 1;
        return Counter.count -= 1;
    }
}
const counter1 = new Counter();
Counter.incrementStatic();
console.log(counter1.increment());  // output 1

const counter2 = new Counter(); 
console.log(counter2.increment()); // output 1
// note: the two instance are located in two different memory 


// polimorphism in OOP
class Person{
    getSleep(){
        console.log('I ma sleeping 8 hours per day');
    }
}

class ChildStudent extends Person{
    getSleep() { // polimorphism: overwrite the parent's method
        console.log('I am sleeping 7 hours per day');  // student has study so 1 hour less sleep
    }
}
class WebDeveloper extends Person{
    getSleep() {// polimorphism: overwrite the parent's method
        console.log('I am sleeping 5 hours per day');  // Fixing bug so 3 hour less sleep
    }
}
const getSleepingHours = (personParam: Person) =>{
    personParam.getSleep();
}
const person1 = new Person();
const person2 = new ChildStudent();
const person3 = new WebDeveloper();
getSleepingHours(person1);
getSleepingHours(person2);
getSleepingHours(person3);


class Shape {
    getArea():number{
        return 0;
    }
}
class Circle extends Shape {
    private _radius: number = 0;
    constructor(radius:number){
        super();
        this._radius = radius;
    }
    getArea():number{
        return Math.PI * Math.pow(this._radius,2);
    }
}
class Rectangle extends Shape{
    private _height:number = 0;
    private _width:number = 0;
    constructor(height:number,width:number){
        super();
        this._height = height;
        this._width = width;
    }
    getArea():number{
        return this._height * this._width;
    }
}

const getShapeArea = (param: Shape) =>{
    console.log(param.getArea());
}
const shape1 = new Shape();
const shape2 = new Circle(5);
const shape3 = new Rectangle(2,7);
getShapeArea(shape1);
getShapeArea(shape2);
getShapeArea(shape3);


// abstraction in OOP: complex logic will be written inside the method, so user can only call the method, they don't need to understand the details logic, only call methods
// two ways: (i) interface (ii) abstract
// (i) using interface
interface Vehicle1_interface {
    name: string
    model: number
    // idea of methods what could be
    startEngine(): void
    stopEngine(): void
    move():void
}
const vehicle1: Vehicle1_interface = {      // object create: by following the interface structure
    name: 'Tyotya',
    model: 2000,
    startEngine: function(){},
    stopEngine: function(){},
    move: function(){},
}
class Car implements Vehicle1_interface{    // class create: by following the interface structure
    // real implementation of complex methods
    name: string = "ABC engine";
    model: number = 4564;
    
    startEngine(): void {
        console.log(`${this.name} Engine is starrted`); 
    }
    stopEngine(): void {
        console.log(`${this.name} Engine is Stopped`); 
    }
    move(): void {
        console.log(`${this.name} Engine is moving..`); 
    }
    extraMethod2(){
        console.log("You can write more extra methods which are not exist in interface structure");        
    }
}

const toyotaCar = new Car();
toyotaCar.startEngine();

// (ii) using abstract
// similarly instance, we can create a type for class using abstruct. in one word, interface is use directly structure the Object, where abstruct is used to directly structure the class
abstract class Car2 {  // idea
    name: string = "ABC engine";
    model: number = 4564;
    
    abstract startEngine(): void 
    abstract stopEngine(): void 
    abstract move(): void
    extramethods(){
        console.log('it is extra non abstruct method');
    }
} 

// const hundaCar = new Car2();  // can not create instance from abstruct class, it is actually the type of the class 
class HundaCar extends Car2{  // real emplementation
    startEngine(): void {
        console.log("starting complex hunda engine");
    }
    stopEngine(): void {
        console.log("Stopping complex hunda engine");
    }
    move(): void {
        console.log("Movingg complex hunda engine");
    }
    moreExtraMethods(){
        console.log('it is more extra method which are ntot in abstruct structure');
    }
}

const abstructHunda = new HundaCar();
abstructHunda.startEngine()
abstructHunda.move()
abstructHunda.stopEngine()

// encapsulation: make hide of some property, private property in class 
// use of private/protected during declaring the property in a class is known as encpsulation so that the properties can not be accessible from outside of the class 
