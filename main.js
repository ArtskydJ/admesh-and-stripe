var stripe = require("stripe")(INSERT_API_KEY_HERE)

//INerrFunc needs args [err]
function chargeCreate(INmoneyInCents, INcard, INerrFunc) {
	var temp = stripe.charges.create({
		amount: INmoneyInCents,
		currency: "usd",
		card: INcard,
		description: "Buying 3D-printed objects"
	})
	if (typeof temp !== "object")
		INerrFunc(temp)
	else
	
}

//INfunc needs args [err], [charge]
function chargeCapture(INid, INfunc) {
	stripe.charges.capture(INid, INfunc)
}

function chargeDetails(INid) {
	return stripe.charges.retrieve({id: INid})
}