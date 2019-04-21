const squirrel = require('../index')
// eslint-disable-next-line no-undef
test('finds the median price by neighborhood', () => {
  var params = { Borough: 'test' }
  // eslint-disable-next-line no-undef
  expect(squirrel.filter(params).median()).toBe(750000)
})

// eslint-disable-next-line no-undef
test('filters data by neighborhood', () => {
  var params = { Borough: 'brooklyn' }
  // eslint-disable-next-line no-undef
  expect(squirrel.filter(params).data.length).toBe(23075)
})

// eslint-disable-next-line no-undef
test('gets expected fields', () => {
  var params = { Borough: 'brooklyn' }
  var expected = {
    Neighborhood: 'BATH BEACH',
    Price: 750000,
    Address: '8645 15TH AVENUE',
    ZipCode: 11228,
    TotalUnits: 1,
    SaleDate: '5/18/18',
    SqFeet: 1428
  }
  // eslint-disable-next-line no-undef
  expect(squirrel.filter(params).data[0]).toEqual(expected)
})
