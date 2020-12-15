const { USER } = require('../config/db.config.js');
const Account = require('../models/account.models.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.create = async function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: 'Add Fail - Not empty !!!',
		});
	}
	const account = new Account(req.body);
	Account.create(account, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err || ' INsert Fail !!!',
			});
		} else {
			
			const token = jwt.sign({ id: data.username }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
			res.status(200).send({token});
		}
	});
};

exports.authLogin = async (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Not empty !',
		});
	}
	const account = new Account(req.body);
	await Account.authLogin(account, (err, result) => {
		if (err) {
			res.status(500).send({
				message: message || 'Wrong username or password ! !!!',
			});
		} else {
		}
	});
	return;
};
