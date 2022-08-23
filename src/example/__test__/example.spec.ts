import { add } from '../example';

describe('Example test suite', () => {
	const a = 5;
	const b = 3;
	it('Should add 2 numbers', () => {
		const r = add(5, 3);
		expect(r).toEqual(a + b);
	});
});
