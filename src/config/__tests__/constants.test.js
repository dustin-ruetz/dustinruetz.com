const {DOMAIN, NAME} = require("../constants.js");

test("constants", () => {
	// verify that all of the constant values are correct
	expect(DOMAIN).toEqual("dustinruetz.com");
	expect(NAME).toEqual("Dustin Ruetz");

	// verify that all of the constants are of the correct type
	expect(typeof DOMAIN).toEqual("string");
	expect(typeof NAME).toEqual("string");
});
