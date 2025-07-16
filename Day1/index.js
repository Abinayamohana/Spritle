// "Day 1: - JS basics: let, const, arrow functions, template literals - Modern ES: destructuring, spread/rest, optional chaining, nullish coalescing - Git basics
// Array Methods(map, filter, forEach), conditional statement, loops"
// 1) let, const 

function basicProgram(){
    let a = 5;
    a = 4;   // we can re assigned in the same scope
    // let a = 3; we can't declare the same variable in the same block
    let b = 4;
    let c = a + b;
    console.log(c)
}
// console.log(c) // let is block scope scoped, we can't access the variable outside the block
basicProgram()

// It does not define a constant value. It defines a constant reference to a value.

// Because of this you can NOT:

// Reassign a constant value
// Reassign a constant array
// Reassign a constant object

// But you CAN:

// Change the elements of constant array
// Change the properties of constant object
// Create an Array:

const cars = ["Honda", "Volvo", "BMW"];

// Change an element:
cars[0] = "Toyota";

// Add an element:
cars.push("Audi");
console.log(cars)

// 3) Arrow function

// This is normal function
function multiply(a,b){
    return a*b;
}
console.log(multiply(3,2));

// In Arrow function - shorter syntax, No function keyword

const multiplication = (a,b) => a*b
console.log(multiplication(3,2))

// 4) Template literals - Use back ticks(``)
// ----> Quotes Inside Strings
let text = `She's often called "Abinaya" `;
console.log(text)

// ---->Multiline String
let text1 = `Hello
world`
console.log(text1)

// ---->Interpolation
let firstName = "Abinaya"
let lastName = "mohana"
let fullName = `I'm ${firstName}${lastName}`
console.log(fullName)

// ---->Use Expressions
console.log(`${2 + 2}`);

// 5) Destructuring - Extract values from arrays or objects. Unpack object properties into variable
// Doesn't change the original array
const person = {
    user : "Abinaya",
    age : 22
};
let {user, age} = person
console.log(user)

// String Destructuring
let color = "Orange"
let [a1, a2, a3, a4] = color
console.log(a2)

// Object property alises name
const items = {
    fruitsName : "Mango",
    Color : "Yellow"
}
let {fruitsName : fruit} = items; // give alises name
console.log(fruit)

// Array Destructuring

const numbers = [10, 20, 30, 40];
const [a, b, , d] = numbers; // ---->Skip items

console.log(a,b,d);

//Swapping
let num1 = 1, num2 = 2;
[num1, num2] = [num2,num1];
console.log(num1); // 2
console.log(num2); // 1

// 6)Spread operator
const numbers1 = [23,55,21,87,56];
let minValue = Math.min(...numbers1);  //The ... operator can pass arguments to a function
console.log(minValue)

// ---->join arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3)

//Rest operator
// The rest operator (...) is used to collect multiple values into a single array or object.
function sum(...nums) {  //--> gather all arguments into an array
  return nums.reduce((a, b) => a + b);
}
console.log(sum(1, 2, 3)); // 6

// In Array Destructuring:

const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest);  // [20, 30, 40]

// In Object Destructuring
const userDetails = { userName: "Abi", age: 22, city: "Coimbatore" };
const { userName, ...details } = userDetails;
console.log(userName);  //Abi 
console.log(details);  // { age: 22, city: 'Coimbatore'}

// 7) Optional Chaining - Allows you to safely access deeply nested object properties without causing errors if a property doesn't exist.
const users = {
  profile: {
    email: "user@example.com"
  }
};

const email = users?.profile?.email;
console.log(email); 

// ----> With function
const obj = {
  greet: () => "Hello"
};

console.log(obj.greet?.()); // "Hello"
console.log(obj.sayHi?.()); // undefined (no error)

// 8) Nullish Coalescing Operator - The nullish coalescing operator (??) returns the right-hand value only if the left-hand value is null or undefined
function getName(name) {
  return name ?? "Anonymous";
}

console.log(getName("Abi"));   // "Abi"
console.log(getName(null)); // "Anonymous"

// 9) Array Methods map, filter, for Each

const employees = [
  { name: 'Abinaya', dept: 'IT', age: 21, salary: 40000, yearsOfExp: 2},
  { name: 'Mohana', dept: 'HR', age: 22, salary: 50000, yearsOfExp: 4},
  { name: 'Priya', dept: 'Finance', age: 24, salary: 40000, yearsOfExp: 1},
  { name: 'Dharshini', dept: 'IT', age: 22, salary: 60000, yearsOfExp: 5}
]

//forEach
employees.forEach(emp => {
  console.log(emp.name);
})

//filter
const filterAge = employees.filter(emp => emp.age >= 22)
console.log(filterAge);

//map 
const updatedSalaries = employees.map(emp => {
  if (emp.dept === "IT") {
    return { ...emp, salary: emp.salary * 1.10 }; // 10% bonus
  }
  return emp;
});

console.log(updatedSalaries);

// Conditional 
employees.forEach( emp => {
  if(emp.yearsOfExp >= 5){
    console.log(`${emp.name} is senior`)
  }
  else if(emp.yearsOfExp >=2) {
    console.log(`${emp.name} is Mid - level`)
  }
  else{
    console.log(`${emp.name} is junior`)
  }
})

//Loop
let totalSalary = 0;
for( let i =0; i < employees.length; i++){
  totalSalary += employees[i].salary;
}
console.log(`Total salary : ${totalSalary}`);
