// clouser example

// function outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     console.log(count);
//   };

// }


//scopped fix by let

// function MyFun() {
//   for (var i = 0; i < 3; i++) {
//     setTimeout(() => console.log(i), 1000);
//   }
// }

// MyFun();


//Objct Destructring

// let person = {
//   name: "suhail",
//   age: "34",
//   position: "Software Developer"
// }

// let { name, age, position} = person;
// console.log("my name is: " + name);
// console.log("my age is: " + age);
// console.log("Position is: " + position);


// Arrary Destructring
// const fruits = ["Apple", "banana", "Oranage", "Mango"]
// const [fruits1, furuits2] = fruits;
// console.log('First Fruit is: ' + fruits1 + "Second is :" + furuits2);


// this is the hoisting
// console.log(a); // undefined
// var a = 5;

//reversed sting in words
// let str = "hello world react";
// let reversedStr = str.split(" ").reverse().join(" ");
// console.log(reversedStr);

// let str1 = ["h", "e", "l", "l", "o"];
// let reversedStr1 = str1.reverse()
// console.log(reversedStr1);



// const debounce = (fn, delay) => {
//   // your code
// };


console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");


import React from 'react'

export class Test extends Component {
    consttructor(props) {
        super(props)
    }


    FetchData = () => {
        let res = fetch('https://localhost:5000/api/login')
            .then(() => {
                let resp = JSON.stringify(res)
                if (resp.status == 200) {
                    console.log('Successfully!');
                } else {
                    console.log('API Calling Failded!');
                }
            }).catch((error) => {
                console.log(error);

            })

        return (
            <div>

            </div>
        )

    }


    render() {
        return (
            <div>Test</div>
        )
    }
}

export default Test






