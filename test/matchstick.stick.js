// External dependancies
var assert = require('assert'),
	should = require('should'),
	matchstick = require('../matchstick.js');


// Test the stick() method
describe('matchstick.stick(obj)', function() {

	/* *
	 * Template
	 */

	// Simple replacement
	it("should return '/project/123/task/abc' given the pattern '/project/{pid}/task/{tid}' and {pid:'123', tid:'abc'} data", function() {
		var ms = matchstick('/project/{pid}/task/{tid}', 'template');
		var obj = {
			pid : '123',
			tid : 'abc'
		};
		assert.equal(ms.stick(obj), '/project/123/task/abc');
	});

	// Unused tokens
	it("should return '/project/123/task/abc/action/' given the pattern '/project/{pid}/task/{tid}/action/{aid}' and {pid:'123', tid:'abc'} data", function() {
		var ms = matchstick('/project/{pid}/task/{tid}/action/{aid}', 'template');
		var obj = {
			pid : '123',
			tid : 'abc'
		};
		assert.equal(ms.stick(obj), '/project/123/task/abc/action/');
	});

	/* *
	 * Colon
	 */

	// Simple replacement
	it("should return '/project/123/task/abc' given the pattern '/project/:pid/task/:tid' and {pid:'123', tid:'abc'} data", function() {
		var ms = matchstick('/project/:pid/task/:tid', 'symbolic');
		var obj = {
			pid : '123',
			tid : 'abc'
		};
		assert.equal(ms.stick(obj), '/project/123/task/abc');
	});

	// Unused tokens
	it("should return '/project/123/task/abc/action/' given the pattern '/project/:pid/task/:tid/action/:aid' and {pid:'123', tid:'abc'} data", function() {
		var ms = matchstick('/project/:pid/task/:tid/action/:aid', 'symbolic');
		var obj = {
			pid : '123',
			tid : 'abc'
		};
		assert.equal(ms.stick(obj), '/project/123/task/abc/action/');
	});

});