// A javascript utility library. It is commonly identified/declared using '_'
const _ = require('lodash')

const sum = _.random(2, 20)
console.log(sum)

// loading a function not more than once, lodash can be used to achieve that
const callOnce = _.once( () => {
    console.log('called once');
})
callOnce();
callOnce();