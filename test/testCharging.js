var secret = require("..\\..\\#sensitive-info\\stripe.js")
var test = require('tap').test
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var StripeWrapper = require("..\\stripe-main.js")
var stripeTransfer = new StripeWrapper(secret.apiKey)

var cbDetailsError = function(err) {
	test("Make sure charge gives error", function test(t) {
		t.equal(err.param, 'INid')
		t.end()
	})
}
var cbChargeNeutralPass = function(err, suc, id) {
	test("Make sure charge passes", function test(t) {
		t.notOk(err, "No error")
		t.ok(suc, "Success")
		t.ok(id, "ID given")
		t.end()
	})
}
var cbChargeNeutralFail = function(err, suc, id) {
	test("Make sure charge fails", function test(t) {
		t.ok(err, "Error thrown")
		t.notOk(suc, "Unsuccessful")
		t.notOk(id, "No ID given")
		t.end()
	})
}


test("Test charging fake credit card", function test(t) {
	stripeTransfer.charge("", 50, {card:testCard}, cbChargeNeutralPass) //Good
	stripeTransfer.charge("", 20, {card:testCard}, cbChargeNeutralFail) //Error
	setTimeout(function() {
		t.end()
	}, 5000)
})
