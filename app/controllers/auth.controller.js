const Account = require('../models/account.models.js');
const _ = require('lodash');
require('dotenv').config();
const jwt = require('jsonwebtoken');

function createAccessToken(data){
	return jwt.sign({
		id_user: data.id,
		iss: process.env.issuer,
		exp: Math.floor(Date.now()/1000)+(60*60), // han su dung expirydate
		alg: 'HS256',
		typ: "JWT",
	},process.env.TOKEN_SECRET)
}
exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Register Fail - Not empty !!!',
		});
	}
  const account = new Account(req.body);
  account.id = Math.floor(Math.random(1000000000)*1000000000)
	Account.create(account, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err || ' Register Fail !!!',
			});
		} else {
      req.session.username = account.username;
			res.header().status(200).send(
				{"Access-token:":createAccessToken(data)}
			);
		}
	});
	return;
};

exports.authLogin = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Not empty !',
		});
	}
	const account = new Account(req.body);
	Account.authLogin(account, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err || 'Wrong username or password ! !!!',
			});
		} else {
      req.session.username = account.username;
			res.header().status(200).send(
				{"Access-token:":createAccessToken(data)}
			);
		}
	});
	return;
};
