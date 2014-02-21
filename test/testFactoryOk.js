var test = require('tap').test
var Stripe = require('../stripe.js')

test('id is a string and correct', function(t) {
	var stripe = new Stripe()

	t.equal(typeof stripe.id, 'string')
	t.equal(stripe.id, 'stripe')

	t.end()
})

test('The charge function is a reasonable facsimile of a real charge function', function(t) {
	var stripe = new Stripe()

	t.plan(4)

	t.equal(typeof stripe.charge, 'function', 'has a charge function')

	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, function callback(err, success, id) {
		t.notOk(err, 'no error given to callback')
		t.ok(success, 'transaction was successful')
		t.equal(typeof id, 'string', 'id is a string')

		t.end()
	})
})

test("A different id comes back for multiple calls", function(t) {
	var stripe = new Stripe()

	t.plan(5)

	var ids = {}

	function callback(err, success, id) {
		t.equal(typeof ids[id], 'undefined', 'The id does not exist on the object yet')
		ids[id] = true
	}

	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
	stripe.charge("This is a test", 13.13, { nothing: 'whatever' }, callback)
})

