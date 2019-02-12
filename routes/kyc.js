'use strict';

const express = require('express');
const router = express.Router();
const conn = require('./../models/kyc');
const uniqid = require('uniqid');

router.post('/payment', function(req, res, next) {
	let criteria = {
		idt: req.body.idt,
		wa: req.body.wa
	}

	conn.findById(criteria, function(err, result) {
		if (err) return res.status(500).send({ 'data': null, 'message': err });

		let isValid = (result.opid === req.body.opid) ? true : false;
		res.status(200).send({ 'data': isValid, 'message': null });
	});
});

router.post('/', function(req, res, next) {
	let criteria = {
		idt: req.body.idt,
		wa: req.body.wa
	}

	let body = JSON.parse(JSON.stringify(criteria));
	body.opid = uniqid();

	conn.addOrUpdateInfo(criteria, body, function(err, result) {
		if (err) return res.status(500).send({ 'data': null, 'message': err });

		res.status(200).send({ 'data': body.opid, 'message': null });
	});
});

module.exports = router;
