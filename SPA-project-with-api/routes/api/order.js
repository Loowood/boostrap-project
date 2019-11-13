const Model = require('../../model')
var order = {}

order.getUserOrder = function(req, res) {
	Model.getUserOrder(req.params.uid)
		.then((order) => {
			res.json(order)
		}).catch((error) => {
			console.error(error);
			res.status(500).json(errror)
		})
	}