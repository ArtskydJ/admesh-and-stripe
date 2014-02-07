// Joseph Dykstra
// 2014-02-03

//Constructor
module.exports = function SimpleStripeWrapper(apiKey) {
	var stripe = require("stripe")(apiKey)
	
	this.chargeCreate = function(neccessaryInformation) {
		return stripe.charges.create(neccessaryInformation)
	}

	this.chargeDetails = function(INid) {
		return stripe.charges.retrieve({id: INid})
	}
}