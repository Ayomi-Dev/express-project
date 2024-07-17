// node provides the ability to interact with files in a computer
// importing the core file system module
const fs = require('fs')
// console.log(fs)

// reading files
// fs.readFile('./path/file.txt', (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data.toString())
// }) 

// writing files
// writing in a file which exist in a specified file path
// fs.writeFile('./path/file.txt', 'The text has been changed', () => {
//     console.log('new text written')
// });

// writing file in a file that does not exist in the specified path
// fs.writeFile('./path/file2.txt', 'This is new text in a new file', () => {
//     console.log('new file created')
// });

// directories
// if(!fs.existsSync('./newFolder')){ //checking if folder already existed in the current directory
//     fs.mkdir('./newFolder', (err) => {
//         if(err){
//             console.log(err)
//         }
//         console.log('folder created')
//     });
// }
// else{
//     fs.rmdir('./newFolder', (err) => {
//         if(err){
//             console.log(err)
//         }
//         console.log('folder created has beenc removed')
//     });
// }

// deleting files
if(fs.existsSync('./path/note2.txt')){
    fs.unlink('./path/note2.txt', (err) => {
        if(err){
            console.log(err)
        }
        console.log('file deleted')
    })
}