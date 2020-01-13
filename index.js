// var {k} = require('./module')
// var _ = require('lodash');
// console.log(_.concat([2,3],[5,6]))
var file = require('file-system');
// var data = require('./data.json');
// file.readFile('./data.json', 'utf-8', (a,b) => console.log(b))

file.readdir('c:/Users/shivam/Desktop/Coding/NodeJs/', (err, data) => console.log(data))

// let userdata = {
//     "name": "shivam kumar",
//     "age": 24,
//     "country": "india"
// }
// file.writeFile('userdata.json', JSON.stringify(userdata), err => console.log('file created!', err))