var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
router.get('/', function(req, res){
	res.render('login/index' , {error : ""});
	//res.send('Hello');
});

router.post('/', function(req, res){
	var un = req.body.UserName;
	var ps = req.body.Password;
	userModel.validateUser(un, ps, function(user){
		if(user.length != 0)
		{

			req.session.user = user[0];

			//console.log(user[0].userType);

			if(user[0].userType == 'admin'){
				res.redirect('/admin');
			}
			else if(user[0].userType == 'Project Manager'){
				res.redirect('/projectmanager');
			}
			else{
			}
		}
		else
		{
			res.render('login/index' , {error : "UserName or Paasword not valid"});
		}
	});
	
});

module.exports = router;