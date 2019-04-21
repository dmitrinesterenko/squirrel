const squirrel = require('../index')

test('finds the median price by neighborhood', () => {
	params = {Borough: 'test'}
	debugger
	expect(squirrel.filter(params).median()).toBe(750000)
});

test('filters data by neighborhood', () => {
	params = {Borough: 'brooklyn'}
	expect(squirrel.filter(params).data.length).toBe(23075)
});

test('gets expected fields', () => {
	params = {Borough: 'brooklyn'}
	expected = {
		Neighborhood: "BATH BEACH",
		Price: 750000,
		Address: "8645 15TH AVENUE",
		ZipCode: 11228,
		TotalUnits: 1,
		SaleDate: "5/18/18",
		SqFeet: 1428
	}
	expect(squirrel.filter(params).data[0]).toEqual(expected)
});
