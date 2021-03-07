"use strict";

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
module.exports = app; // for testing

var config = {
	appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
	if (err) {
		throw err;
	}

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);

	const dateRightNow = new Date();
	let fullDateText = `${dateRightNow.getFullYear()}-${
		dateRightNow.getMonth() + 1 > 10
			? dateRightNow.getMonth() + 1
			: "0" + (dateRightNow.getMonth() + 1)
	}-${
		dateRightNow.getDate() > 10
			? dateRightNow.getDate()
			: "0" + dateRightNow.getDate()
	}`;

	if (swaggerExpress.runner.swagger.paths["/events"]) {
		console.log(
			"try this:\ncurl http://127.0.0.1:" +
				port +
				`/api/v1/events?date=${fullDateText}`
		);
	}
});
