var secret = require("..\\stripe-and-dwolla_sensitive-info/stripe.js")
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var StripeWrapper = require("./stripe-main.js")
var stripeTransfer = new StripeWrapper(secret.apiKey)

var cbDetailsGood = function(obj) { console.log("Retrieval Success: "+obj) }
var cbDetailsError = function(err)  { console.log("Retrieval Error: "+err.message) }

var cbChargeGood = function(id) {
	console.log("Successful Charge ID: "+id)
	stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
}
var cbChargeError = function(err) {
	console.log("Charge Error: "+err.message)
	stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
	//Yes, it looks up the details of a failed charge.
}
var cbChargeNeutral = function(suc, id) {
	console.log("Charge Success: "+suc+"\nCharge ID: "+id)
	stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
}


//Asynchronous
stripeTransfer.charge("", 50, {card:testCard}, cbChargeGood, cbChargeError) //Good
stripeTransfer.charge("", 20, {card:testCard}, cbChargeGood, cbChargeError) //Error
stripeTransfer.charge("", 50, {card:testCard}, cbChargeNeutral) //Good
stripeTransfer.charge("", 20, {card:testCard}, cbChargeNeutral) //Error
