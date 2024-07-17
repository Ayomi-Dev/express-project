const letters = ['a', 'b', 'c', 'd']
const nums = [1,2,3]


// exporting multiple datas to other files
module.exports = {
    letters, nums
}

// importing data from other file within another folder in the same directory
const findPath = require('../first-project/path/path')
// console.log(findPath)