var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db');

var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');

var adminModel = require.main.require('./models/admin-model');

router.get('/', function(req, res){
	if(!req.session.user)
	{
		res.redirect('/login');
		return;
	}
	
	res.render('admin/index', {name: req.session.user.name});
});
//git function
router.get('/changepassword', function(req, res){
	if(!req.session.user)
	{
		res.redirect('/login');
		return;
	}
	
	res.render('admin/changepassword',{error : ""});
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
		res.render('admin/changepassword', {error : error});
	}
	
});

router.get('/adduser', function(req, res){
	if(!req.session.user)
	{
		res.redirect('/login');
		return;
	}
	
	res.render('admin/adduser',{error : ""});
});


router.post('/adduser', function(req, res){
    var rules = validationRules.user.create;

    var data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        designation: req.body.designation,
        userType: req.body.designation,
        status: req.body.Status
    };

     adminModel.insert(data, function(obj){
        res.redirect('/admin/alluser');
        return;
     });

    // var validator = new asyncValidator(rules);
    // validator.validate(data, function(errors, fields){
    //     if(!errors)
    //     {
    //         adminModel.insert(data, function(obj){
    //             res.redirect('/alluser');
    //         });
    //     }
    //     else
    //     {
    //         res.render('admin/adduser', {errs: errors});
    //     }
    // });


});

router.get('/details/:id', function(req, res){
	var id = req.params.id;
	adminModel.getUser(id, function(obj){
		res.render('admin/details', obj);
	});
});

router.get('/edit/:Id', function(req, res){
	var Id = req.params.Id;
	adminModel.getUser(Id, function(obj){
		res.render('admin/edit', obj);
	});
});

router.get('/delete/:Id', function(req, res){
	var Id = req.params.Id;
	adminModel.getUser(Id, function(obj){
		res.render('admin/delete', obj);
	});
});

router.post('/delete/:Id', function(req, res){

	var data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        designation: req.body.designation,
        userType: req.body.designation,
        status: req.body.Status
    };

     adminModel.delete(data, function(obj){
        res.redirect('/admin/alluser');
        return;
     });
});

router.post('/edit/:Id', function(req, res){
    var rules = validationRules.user.create;

    var data = {
        name: req.body.name,
        dob: req.body.dob,
        designation: req.body.designation,
        status: req.body.status,
        id : req.body.id
    };

     adminModel.update(data, function(obj){
        res.redirect('/admin/alluser');
        return;
     });
});


router.get('/alluser', function(req, res){
	adminModel.getAll(function(result){
		// console.log(result);
		res.render('admin/alluser', {alluser: result});
	});
});

module.exports = router;

