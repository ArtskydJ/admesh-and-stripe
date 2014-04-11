var secret = require("..\\#sensitive-info\\stripe.js")
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var StripeWrapper = require("./stripe-main.js")
var stripeTransfer = new StripeWrapper(secret.apiKey)

var cbDetailsGood = function(obj) {
	console.log("Retrieval Success: "+obj)
}
var cbDetailsError = function(err) {
	console.log("Retrieval Error: "+err.message)
}

var cbChargeNeutral = function(suc, id) {
	console.log("Charge Success: "+suc+"\nCharge ID: "+id)
	stripeTransfer.details(id, cbDetailsGood, cbDetailsError)
}


//Asynchronous
stripeTransfer.charge("", 50, {card:testCard}, cbChargeNeutral) //Good
stripeTransfer.charge("", 20, {card:testCard}, cbChargeNeutral) //Error
