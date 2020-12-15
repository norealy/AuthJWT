const { USER } = require('../config/db.config.js');
const Account = require('../models/account.models.js');
const _ = require('lodash');
require('dotenv').config();
const jwt = require('jsonwebtoken');

function createIdToken(data){
	// omit : phuwong thuc bo qua, pick la su dung
	return jwt.sign(_.omit(data, 'password'), process.env.TOKEN_SECRET, { expiresIn: 86400 });
}
function createAccessToken(data){
	return jwt.sign({
		id_user: data.username,
		iss: process.env.issuer,
		exp: Math.floor(Date.now()/1000)+(60*60), // han su dung expirydate
		alg: 'HS256',
		typ: "JWT",
	},process.env.TOKEN_SECRET)
}
exports.create = async function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: 'Register Fail - Not empty !!!',
		});
	}
	const account = new Account(req.body);
	Account.create(account, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err || ' Register Fail !!!',
			});
		} else {
			res.header('Access-token').status(200).send(
				createAccessToken(data),
			);
		}
	});
	return;
};

exports.authLogin = async (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Not empty !',
		});
	}
	const account = new Account(req.body);
	await Account.authLogin(account, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err || 'Wrong username or password ! !!!',
			});
		} else {
			res.header('Access-token').status(200).send(
				createAccessToken(data),
			);
		}
	});
	return;
};
