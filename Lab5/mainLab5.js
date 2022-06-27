// Use Array Methods: filter, map, reduce, etc to implement functions below:
/*1. Create a function using function declaration named sum with one parameter of Array type, the
returned result is the sum of all elements which are greater than 20.
2. Create a function using function expression named getNewArray with one parameter of String
Array, return a new array which contains all string, length is greater than and equal to 5, and
contains letter ‘a’.*/
console.log("question one opption one!");
var numbers2 = [1, 2, 3, 4, 5, 63, 25, 50, 100];

const a = numbers2.filter(function (elm, i, array) {
    return elm > 20;
})
    .reduce(function (sum, current, i, array) {
        return sum + current;
    }, 0);

console.log(a);

console.log("question one opption two!");
const avg = numbers2
    .filter(elm => elm > 20
    )
    .reduce((sum, current, i, array) => {
        return sum + current;
    }, 0);

console.log(avg);
console.log("question num two");


var array1 = ['rediet', 'woldemariam', 'today', 'whatisyourname'];

const getNewArray = (strArray) => {



    if (Array.isArray(strArray)) {

        var newArray = strArray
        .filter(v => v.includes('a') && v.length >= 5);

        return newArray;

    } else {

        console.log("Invalid input")

    }

}
console.log(getNewArray(['rediet', 'woldemariam', 'today', 'whatisyourname', 'ueue']));

