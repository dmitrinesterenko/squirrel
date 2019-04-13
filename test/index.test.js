const squirrel = require('../index')

test('finds the median price by neighborhood', () => {
	nabe = 'test'
	expect(squirrel.filter(nabe).median()).toBe(100)
});

test('filters data by neighborhood', () => {
	nabe = 'brooklyn'
	expect(squirrel.filter(nabe).data.length).toBe(1000)
});
