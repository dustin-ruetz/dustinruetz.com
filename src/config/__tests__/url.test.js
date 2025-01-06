const {getURL, URL} = require("../url.js");

test("getURL function", () => {
	// verify that it returns the correct local development URL
	expect(getURL("local")).toEqual("https://development.dustinruetz.com:4444");

	// verify that it returns the correct network development URL
	const networkURL = getURL("network");
	// TODO: figure out how to mock Node.js os.networkInterfaces module
	// expect(networkURL).toEqual('http://a.valid.IPv4.address:5555')
	expect(networkURL).toContain("http://");
	expect(networkURL).toContain(":5555");

	// verify that it returns the correct production URL
	expect(getURL("production")).toEqual("https://www.dustinruetz.com");

	// verify that it throws an error when passed a non-existent environment
	expect(() => getURL("invalidEnvironmentArg")).toThrow(
		"getURL(environment) requires one of [local,network,production] as an argument; received 'invalidEnvironmentArg'.",
	);

	// verify that it throws an error when passed nothing
	expect(getURL).toThrow(
		"getURL(environment) requires one of [local,network,production] as an argument; received undefined.",
	);

	// verify that it is of the correct type
	expect(typeof getURL).toEqual("function");
});

test("URL configuration", () => {
	// verify the connection protocols
	expect(URL.protocol.local).toEqual("https");
	expect(URL.protocol.network).toEqual("http");
	expect(URL.protocol.production).toEqual("https");

	// verify that the subdomains are correct
	expect(URL.subdomain.local).toEqual("development");
	expect(URL.subdomain.network).toEqual(null);
	expect(URL.subdomain.production).toEqual("www");

	// verify that the domains are correct
	expect(URL.domain.local).toEqual("dustinruetz.com");
	// TODO: figure out how to mock Node.js os.networkInterfaces module
	// expect(URL.domain.network).toEqual('a.valid.IPv4.address')
	expect(URL.domain.production).toEqual("dustinruetz.com");

	// verify that the ports are correct
	expect(URL.port.local).toEqual(4444);
	expect(URL.port.network).toEqual(5555);
	expect(URL.port.production).toEqual(null);

	/**
	 * NOTE: can't assert that `typeof variable === 'null'` due to
	 * an error in the original JavaScript language specification
	 * https://stackoverflow.com/questions/18808226/why-is-typeof-null-object
	 */

	// verify that all of URL configuration variables are of the correct type
	expect(typeof URL).toEqual("object");

	expect(typeof URL.protocol).toEqual("object");
	expect(typeof URL.protocol.local).toEqual("string");
	expect(typeof URL.protocol.network).toEqual("string");
	expect(typeof URL.protocol.production).toEqual("string");

	expect(typeof URL.subdomain).toEqual("object");
	expect(typeof URL.subdomain.local).toEqual("string");
	expect(typeof URL.subdomain.production).toEqual("string");

	expect(typeof URL.domain).toEqual("object");
	expect(typeof URL.domain.local).toEqual("string");
	expect(typeof URL.domain.network).toEqual("string");
	expect(typeof URL.domain.production).toEqual("string");

	expect(typeof URL.port).toEqual("object");
	expect(typeof URL.port.local).toEqual("number");
	expect(typeof URL.port.network).toEqual("number");
});
