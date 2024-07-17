// // Global object - an equaivalent of a browser's window object
// console.log(global)
global.setTimeout(() => {
    console.log('global')
    clearInterval(inter)
}, 3000);

const inter = setInterval(() => {
    console.log('global') 
}, 1000)

// file and directory name
console.log(__dirname) //absolute path/directory of the current file
console.log(__filename) //file name of the current file