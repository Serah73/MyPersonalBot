
"use strict"

let secret = require('../secret').CODE

let token = require('jwt-simple')
let timestmp = require('moment')

exports.createToken = function(user) {
	let loadToken = {
		id: user._id,
		name: user.name,
		now: timestmp().unix(),
		exp: timestmp().add(30, "days").unix()
	}
	return token.encode(loadToken, secret)
}