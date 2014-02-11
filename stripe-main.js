// Joseph Dykstra
// 2014-02-03

//Constructor
module.exports = function SimpleStripeWrapper(apiKey) {
	var stripe = require("stripe")(apiKey)
	return {
		charge: function charge(desc, amount, object, cbGood, cbErr) { //takes 4 or 5 args
			object.description = desc
			object.currency = "usd"
			object.amount = amount
			if (typeof cbErr === "function") {		//TEST MODE (append cbErr)
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

		details: function details(INid, cbGood, cbError) { //must take all 3
			if (typeof INid !== 'undefined' && INid !== "") {
				stripe.charges.retrieve(INid).then(
					cbGood,
					cbError
				)
			} else {
				cbError({
					type: 'StripeInvalidRequest_details',
					param: 'INid',
					message: 'ID must be valid'
				})
			}
		},
		
		id: "stripe"
	}
}
