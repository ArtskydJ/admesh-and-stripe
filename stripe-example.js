var secret = require("../stripe-and-dwolla_sensitive-info/stripe.js")
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var Main = require("./main.js")

var stripeTransfer = new Main(secret.apiKey)
//console.dir(stripeTransfer)
var success = stripeTransfer.chargeCreate(500, "usd", testCard)
if (success) {
	//um
} else { //error
	console.log("Error: "+err+"\n" + err.message);
}
