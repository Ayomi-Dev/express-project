// importing data from other file
const arr = require('./people')

// accessing value of imported data
const {letters, nums}= require('./people') //destructuring
// const {nums} = arr //by destructuring the data

const xyz = arr.nums //selecting property of the returned data(object)
console.log(letters, nums, xyz, arr)

//importing the OS module
// const os = require('os')
// console.log(os.platform(), os.homedir())