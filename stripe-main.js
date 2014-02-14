// Joseph Dykstra
// 2014-02-03

//Constructor
module.exports = function SimpleStripeWrapper(apiKey) {
	var stripe = require("stripe")(apiKey)
<<<<<<< HEAD
	return {
		charge: function charge(desc, amount, object, cbGood, cbErr) { //takes 4 or 5 args
			object.description = desc
			object.currency = "usd"
			object.amount = amount
			if (typeof cbErr === "function") {		//TEST MODE (include cbErr)
				stripe.charges.create(object).then(
					function(goodObj) { cbGood(goodObj.id) },
					cbErr
				)
			} else {								//REAL MODE (omit cbErr)
				stripe.charges.create(object).then(
					function (goodObj) { cbGood(true,  goodObj.id) },
					function (err)     { cbGood(false, "") }
				)
			}
		}, // cbErr(err)   cbGood(uniqueId)

		details: function details(INid, cb) { //must take all 3
			if (typeof INid !== 'undefined' && INid !== "") {
				stripe.charges.retrieve(INid).then(cb, cb)
			} else {
				cbError({
					type: 'StripeInvalidRequest_details',
					param: 'INid',
					message: 'ID must be valid'
				})
			}
		},
		
		id: "stripe"
=======
	
	this.chargeCreate = function(neccessaryInformation) {
		return stripe.charges.create(neccessaryInformation)
	}

	this.chargeDetails = function(INid) {
		return stripe.charges.retrieve({id: INid})
>>>>>>> 2f0c45f3169555045414e9fa5df202de4016be85
	}
}
