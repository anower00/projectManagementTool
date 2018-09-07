var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db');

var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');

var projectmanagerModel = require.main.require('./models/projectmanager-model');

router.get('/', function(req, res){
	if(!req.session.user)
	{
		res.redirect('/login');
		return;
	}
	
	res.render('projectmanager/index', {name: ""});
});

/*router.get('/changepassword', function(req, res){
	if(!req.session.user)
	{
		res.redirect('/login');
		return;
	}
	
	res.render('projectmanager/changepassword',{error : ""});
});

router.post('/changepassword', function(req, res){
	var pass = req.body.newPass;
	var repass = req.body.reNewPass;
	if(pass == repass){
		var sql = "UPDATE `user_info` SET `Password`=? WHERE `Id` =?";
		var sqlParam = [pass, req.session.user.Id];
		db.executeQuery(sql, sqlParam, function(result){
			var sucess = "Password changed";
			//console.log('1');
			res.redirect('/admin');
		});
	}else{
		var error = "Password doesn't match";
		res.render('projectmanager/changepassword', {error : error});
	}
	
});
*/

router.get('/allproject', function(req, res){
	projectmanagerModel.getAll(function(result){
		// console.log(result);
		res.render('projectmanager/allproject', {allproject: result});
	});
});

module.exports = router;

