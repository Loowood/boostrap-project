const Model = require('../../model')
var product = {}
product.getProducts = function(req, res) {
	Model.getProducts()
		.then((products) => {
			res.json(products)
		}).catch((error) => {
			console.error(error);
			res.status(500).json(error);
		})
}

product.getProduct = function(req, res) {
	Model.getProduct(req.params.pid)
		.then((product) => {
			if (product == undefined) {
				res.status(400).send({"error":"no product with this ID"})
			}
			res.json(product)
		}).catch((eror) => {
			console.error(error);
			res.status(500).json(error);
		})
}

module.exports = product