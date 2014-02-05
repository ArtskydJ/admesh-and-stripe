var secret = require("../admesh-and-stripe_sensitive-info/sensitiveInfo.js")
var testCard = {
	number: "4242424242424242", // Fake number, too bad for you. ;)
	exp_month: 12,
	exp_year: 2014
}
var Main = require("./main.js")

var stripeTransfer = new Main(secret.apiKey)
//console.dir(stripeTransfer)
var success = stripeTransfer.chargeCreate(500, "usd", testCard)

console.log("oh yes")