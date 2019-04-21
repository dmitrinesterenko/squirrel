// Manual testing scratch pad
// primarily helps with debugging
const squirrel = require('../index')
var params = { Borough: 'test' }
console.log(squirrel.filter(params).median() === 750000)
// results = squirrel.filter({Borough: 'brooklyn', ZipCode: '11222'})
// results.filtered.map(r => console.log(r))
