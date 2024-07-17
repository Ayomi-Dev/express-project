const fs = require('fs') 

const readStream = fs.createReadStream('./path/note1.txt', {encoding: 'utf8'})//reading larger data files

const writeStream = fs.createWriteStream('./path/note2.txt') //writing data read from a stream into a new file


// readStream.on('data', (chunk) => {
//     console.log('---------NEW BUFFER------')
//     console.log(chunk)

//     writeStream.write('\nNEW BUFFER\n')
//     writeStream.write(chunk)
// })


// piping -- writing and reading streams in a more concise way
readStream.pipe(writeStream);