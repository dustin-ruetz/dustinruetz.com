const {DOMAIN, NAME} = require("../constants.js");

test("constants", () => {
	// verify that all of the constant values are correct
	expect(DOMAIN).toBe("dustinruetz.com");
	expect(NAME).toBe("Dustin Ruetz");

	// verify that all of the constants are of the correct type
	expect(typeof DOMAIN).toBe("string");
	expect(typeof NAME).toBe("string");
});
