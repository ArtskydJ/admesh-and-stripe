var secret = require("../../admesh-and-stripe_sensitive-info/sensitiveInfo.js")
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var Main = require("../main.js")

var test = require('tap').test

test("blah blah blah", function test(t) {
	t.equal(1,1) //tests NOTHING!!!
	t.end()
})