"use strict"

let token = require('jwt-simple')
let timestmp = require('moment')
let secret = require('../secret').CODE

exports.authentication = function(req, res, next) {
	if(!req.headers.authorization || req.headers.authorization == null) {
		return res.status(403).send("Unauthorized")
	} else {
		let tokenReceived = req.headers.authorization.replace(/['"]+/g, '')
		try {
			var loadToken = token.decode(tokenReceived, secret)
			if(loadToken.exp <= timestmp().unix()) {
				return res.status(403).send("Token expired")
			}
		} catch(exception) {
			return res.status(500).send("Internal Server Error")
		}
		req.userToken = loadToken
		next()
	}
}