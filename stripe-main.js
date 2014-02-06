// Joseph Dykstra
// 2014-02-03

//Constructor
module.exports = function(apiKey) {
	var stripe = require("stripe")(apiKey)
	
	this.chargeCreate = function(moneyInCents, currency, card) {
		return stripe.charges.create({
			amount: moneyInCents,
			currency: currency,
			card: card
		})
	}

	this.chargeCapture = function(INid, INfunc) {
		stripe.charges.capture(INid, INfunc)
	} //INfunc needs args [err], [charge]

	this.chargeDetails = function(INid) {
		return stripe.charges.retrieve({id: INid})
	}
}