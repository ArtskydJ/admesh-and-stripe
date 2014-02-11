var secret = require("..\\..\\stripe-and-dwolla_sensitive-info\\stripe.js")
var test = require('tap').test
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var StripeWrapper = require("..\\stripe-main.js")
var stripeTransfer = new StripeWrapper(secret.apiKey)


var cbDetailsGood  = function(obj) {
	test("Make sure charge gives error", function test(t) {
		t.equal(typeof obj, 'object')
		t.end()
	})
}
var cbDetailsError = function(err) {
	test("Make sure charge gives error", function test(t) {
		t.equal(err.param, 'INid')
		t.end()
	})
}
var cbChargeGood = function(id) {
	test("Make sure charge is successful", function test(t) {
		t.equal(typeof id, 'string')
		t.notEqual(id, "")
		stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
		t.end()
	})
}
var cbChargeError = function(err) {
	test("Make sure charge gives error", function test(t) {
		t.equal(typeof err, 'object')
		stripeTransfer.details(17, cbDetailsGood, cbDetailsError)
		t.end()
	})
}
var cbChargeNeutralPass = function(suc, id) {
	test("Make sure charge passes", function test(t) {
		t.ok(suc)
		t.ok(id)
		stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
		t.end()
	})
}
var cbChargeNeutralFail = function(suc, id) {
	test("Make sure charge fails", function test(t) {
		t.notOk(suc)
		t.notOk(id)
		stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
		t.end()
	})
}


test("Test charging fake credit card", function test(t) {
	stripeTransfer.charge("", 50, {card:testCard}, cbChargeGood, cbChargeError) //Good
	stripeTransfer.charge("", 20, {card:testCard}, cbChargeGood, cbChargeError) //Error
	stripeTransfer.charge("", 50, {card:testCard}, cbChargeNeutralPass) //Good
	stripeTransfer.charge("", 20, {card:testCard}, cbChargeNeutralFail) //Error
	setTimeout(function() {
		t.end()
	}, 5000)
})
