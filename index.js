
module.exports = function SimpleStripeWrapper(apiKey) {
	var stripe = require("stripe")(apiKey)
	
	function charge(description, amount, obj, cb) {
			obj.description = description
			obj.currency = "usd"
			obj.amount = amount
				stripe.charges.create(obj).then(
					function (goodObj) { cb(false, true, goodObj.id) },
					function (err)     { cb(true, false, "") }
				)
			}
	
	return {
		id: "stripe",
		charge: charge
	}
}
