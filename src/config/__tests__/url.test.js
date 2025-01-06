const {getURL, URL} = require("../url.js");

test("getURL function", () => {
	// verify that it returns the correct local development URL
	expect(getURL("local")).toBe("https://development.dustinruetz.com:4444");

	// verify that it returns the correct network development URL
	const networkURL = getURL("network");
	// TODO: figure out how to mock Node.js os.networkInterfaces module
	// expect(networkURL).toEqual('http://a.valid.IPv4.address:5555')
	expect(networkURL).toContain("http://");
	expect(networkURL).toContain(":5555");

	// verify that it returns the correct production URL
	expect(getURL("production")).toBe("https://www.dustinruetz.com");

	// verify that it throws an error when passed a non-existent environment
	expect(() => getURL("invalidEnvironmentArg")).toThrow(
		"getURL(environment) requires one of [local,network,production] as an argument; received 'invalidEnvironmentArg'.",
	);

	// verify that it throws an error when passed nothing
	expect(getURL).toThrow(
		"getURL(environment) requires one of [local,network,production] as an argument; received undefined.",
	);

	// verify that it is of the correct type
	expect(typeof getURL).toBe("function");
});

test("URL configuration", () => {
	// verify the connection protocols
	expect(URL.protocol.local).toBe("https");
	expect(URL.protocol.network).toBe("http");
	expect(URL.protocol.production).toBe("https");

	// verify that the subdomains are correct
	expect(URL.subdomain.local).toBe("development");
	expect(URL.subdomain.network).toBeNull();
	expect(URL.subdomain.production).toBe("www");

	// verify that the domains are correct
	expect(URL.domain.local).toBe("dustinruetz.com");
	// TODO: figure out how to mock Node.js os.networkInterfaces module
	// expect(URL.domain.network).toEqual('a.valid.IPv4.address')
	expect(URL.domain.production).toBe("dustinruetz.com");

	// verify that the ports are correct
	expect(URL.port.local).toBe(4444);
	expect(URL.port.network).toBe(5555);
	expect(URL.port.production).toBeNull();

	/**
	 * NOTE: can't assert that `typeof variable === 'null'` due to
	 * an error in the original JavaScript language specification
	 * https://stackoverflow.com/questions/18808226/why-is-typeof-null-object
	 */

	// verify that all of URL configuration variables are of the correct type
	expect(typeof URL).toBe("object");

	expect(typeof URL.protocol).toBe("object");
	expect(typeof URL.protocol.local).toBe("string");
	expect(typeof URL.protocol.network).toBe("string");
	expect(typeof URL.protocol.production).toBe("string");

	expect(typeof URL.subdomain).toBe("object");
	expect(typeof URL.subdomain.local).toBe("string");
	expect(typeof URL.subdomain.production).toBe("string");

	expect(typeof URL.domain).toBe("object");
	expect(typeof URL.domain.local).toBe("string");
	expect(typeof URL.domain.network).toBe("string");
	expect(typeof URL.domain.production).toBe("string");

	expect(typeof URL.port).toBe("object");
	expect(typeof URL.port.local).toBe("number");
	expect(typeof URL.port.network).toBe("number");
});
