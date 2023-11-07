/**

    inheritence
    polymorphism
    abstraction
    encapsulation


*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// oop class 
var Animal = /** @class */ (function () {
    function Animal(name, species, sound) {
        this.name = name;
        this.species = species;
        this.sound = sound;
    }
    Animal.prototype.makeSound = function () {
        console.log("The ".concat(this.name, " says ").concat(this.sound));
    };
    return Animal;
}());
// objecty instance from class
var dog = new Animal('German Shaperd', 'dog', 'Gheu Gheu');
var cat = new Animal('Minue cat', 'cat', 'Miau');
cat.makeSound();
// inharientance
var Parent = /** @class */ (function () {
    function Parent(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    Parent.prototype.getSleep = function (numOfHour) {
        console.log("".concat(this.name, " sleeps ").concat(numOfHour, " hours"));
    };
    return Parent;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, address) {
        return _super.call(this, name, age, address) || this;
    }
    return Student;
}(Parent));
var student1 = new Student('Mr. X', 12, 'Sydny');
console.log(student1);
var speep1 = student1.getSleep(5);
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name, age, address, designation) {
        var _this = _super.call(this, name, age, address) || this;
        _this.designation = designation;
        return _this;
    }
    Teacher.prototype.getDesignation = function () {
        console.log("".concat(this.name, "'s designation is ").concat(this.designation));
    };
    return Teacher;
}(Parent));
var teacher1 = new Teacher('Mr. TT', 50, 'David', 'Principal');
teacher1.getDesignation();
console.log(teacher1);
var add = function (param1, param2) {
    if (typeof param1 === 'number' && typeof param2 === "number") {
        return param1 + param2;
    }
    else {
        return param1.toString() + param2.toString();
    }
};
var resN = add(2, 4);
var re1sN = add('2', '4');
console.log({ re1sN: re1sN, resN: resN });
var getUser = function (user) {
    if ('role' in user) {
        console.log(user.role);
    }
    else {
        console.log(user.name);
    }
};
var normaluser = {
    name: "normal name"
};
var adminUser = {
    name: "Admin name",
    role: "admin"
};
getUser(adminUser);
getUser(normaluser);
// (ii) instanceof --> instanceof gauard
var ZooAnimal = /** @class */ (function () {
    function ZooAnimal(name, species) {
        this.name = name;
        this.species = species;
    }
    ZooAnimal.prototype.makeSound = function () {
        console.log("I am making osund");
    };
    return ZooAnimal;
}());
var ZooDog = /** @class */ (function (_super) {
    __extends(ZooDog, _super);
    function ZooDog(name, species) {
        return _super.call(this, name, species) || this;
    }
    ZooDog.prototype.makeBark = function () {
        console.log("I am barking");
    };
    return ZooDog;
}(ZooAnimal));
var ZooCat = /** @class */ (function (_super) {
    __extends(ZooCat, _super);
    function ZooCat(name, species) {
        return _super.call(this, name, species) || this;
    }
    ZooCat.prototype.makeMeaw = function () {
        console.log("I am meawing");
    };
    return ZooCat;
}(ZooAnimal));
// type guard narrow down: smart way to check instance of type
var isDogInstance = function (animal) {
    return animal instanceof ZooDog;
};
var isCatInstance = function (animal) {
    return animal instanceof ZooCat;
};
var getAnimal = function (animal) {
    if (isDogInstance(animal)) {
        animal.makeBark();
    }
    else if (animal instanceof ZooCat) {
        animal.makeMeaw();
    }
};
var ZooDogObj = new ZooDog('Dog Bhai', 'dog');
var ZooCatObj = new ZooCat('cat Bhai', 'cat');
getAnimal(ZooDogObj);
// Access modifier 
var BankAccount = /** @class */ (function () {
    // static: the memory location dosen't change
    // constructor + super
    function BankAccount(id, name, balance) {
        this._registrationID = Math.floor(Math.random() * 100); // accessiable only inside this class, not in extended child
        this.id = id;
        this.name = name;
        this._balance = balance;
    }
    Object.defineProperty(BankAccount.prototype, "currentBalanceGetter", {
        // getter: call like a property
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "newDepositeSetter", {
        // setter
        set: function (newAmount) {
            this._balance += newAmount;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    BankAccount.prototype.addDeposite = function (amount) {
        this._balance += amount;
    };
    BankAccount.prototype.getBalance = function () {
        return this._balance;
    };
    return BankAccount;
}());
var StudentAccount = /** @class */ (function (_super) {
    __extends(StudentAccount, _super);
    function StudentAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StudentAccount.prototype.test = function () {
    };
    return StudentAccount;
}(BankAccount));
var poorPeople = new BankAccount(1, 'PoorMan', 20);
poorPeople.addDeposite(15);
poorPeople.newDepositeSetter = 12;
console.log({ poorPeople: poorPeople, balance: poorPeople.getBalance(), crtBalance: poorPeople.currentBalanceGetter });
// static:: memory location doesn't change 
var Counter = /** @class */ (function () {
    function Counter() {
    }
    Counter.prototype.increment = function () {
        // return this.count += 1;  // this won't work for static
        return Counter.count += 1;
    };
    Counter.incrementStatic = function () {
        return Counter.count += 1;
    };
    Counter.prototype.decrement = function () {
        // return this.count -= 1;
        return Counter.count -= 1;
    };
    Counter.count = 0; // keep the memory same location for all instances
    return Counter;
}());
var counter1 = new Counter();
Counter.incrementStatic();
console.log(counter1.increment()); // output 1
var counter2 = new Counter();
console.log(counter2.increment()); // output 1
// note: the two instance are located in two different memory 
// polimorphism in OOP
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getSleep = function () {
        console.log('I ma sleeping 8 hours per day');
    };
    return Person;
}());
var ChildStudent = /** @class */ (function (_super) {
    __extends(ChildStudent, _super);
    function ChildStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildStudent.prototype.getSleep = function () {
        console.log('I am sleeping 7 hours per day'); // student has study so 1 hour less sleep
    };
    return ChildStudent;
}(Person));
var WebDeveloper = /** @class */ (function (_super) {
    __extends(WebDeveloper, _super);
    function WebDeveloper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebDeveloper.prototype.getSleep = function () {
        console.log('I am sleeping 5 hours per day'); // Fixing bug so 3 hour less sleep
    };
    return WebDeveloper;
}(Person));
var getSleepingHours = function (personParam) {
    personParam.getSleep();
};
var person1 = new Person();
var person2 = new ChildStudent();
var person3 = new WebDeveloper();
getSleepingHours(person1);
getSleepingHours(person2);
getSleepingHours(person3);
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.getArea = function () {
        return 0;
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this) || this;
        _this._radius = 0;
        _this._radius = radius;
        return _this;
    }
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this._radius, 2);
    };
    return Circle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(height, width) {
        var _this = _super.call(this) || this;
        _this._height = 0;
        _this._width = 0;
        _this._height = height;
        _this._width = width;
        return _this;
    }
    Rectangle.prototype.getArea = function () {
        return this._height * this._width;
    };
    return Rectangle;
}(Shape));
var getShapeArea = function (param) {
    console.log(param.getArea());
};
var shape1 = new Shape();
var shape2 = new Circle(5);
var shape3 = new Rectangle(2, 7);
getShapeArea(shape1);
getShapeArea(shape2);
getShapeArea(shape3);
var vehicle1 = {
    name: 'Tyotya',
    model: 2000,
    startEngine: function () { },
    stopEngine: function () { },
    move: function () { },
};
var Car = /** @class */ (function () {
    function Car() {
        // real implementation of complex methods
        this.name = "ABC engine";
        this.model = 4564;
    }
    Car.prototype.startEngine = function () {
        console.log("".concat(this.name, " Engine is starrted"));
    };
    Car.prototype.stopEngine = function () {
        console.log("".concat(this.name, " Engine is Stopped"));
    };
    Car.prototype.move = function () {
        console.log("".concat(this.name, " Engine is moving.."));
    };
    Car.prototype.extraMethod2 = function () {
        console.log("You can write more extra methods which are not exist in interface structure");
    };
    return Car;
}());
var toyotaCar = new Car();
toyotaCar.startEngine();
// (ii) using abstract
// similarly instance, we can create a type for class using abstruct. in one word, interface is use directly structure the Object, where abstruct is used to directly structure the class
var Car2 = /** @class */ (function () {
    function Car2() {
        this.name = "ABC engine";
        this.model = 4564;
    }
    return Car2;
}());
// const hundaCar = new Car2();  // can not create instance from abstruct class, it is actually the type of the class 
var HundaCar = /** @class */ (function (_super) {
    __extends(HundaCar, _super);
    function HundaCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundaCar.prototype.startEngine = function () {
        console.log("starting complex hunda engine");
    };
    HundaCar.prototype.stopEngine = function () {
        console.log("Stopping complex hunda engine");
    };
    HundaCar.prototype.move = function () {
        console.log("Movingg complex hunda engine");
    };
    return HundaCar;
}(Car2));
var abstructHunda = new HundaCar();
abstructHunda.startEngine();
abstructHunda.move();
abstructHunda.stopEngine();
