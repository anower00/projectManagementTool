var db = require('./db');
	module.exports = {

		getAll: function(callback){
			var sql = "SELECT * FROM user_info";
			db.executeQuery(sql, null, function(result){
				callback(result);
			});
		},

		getUser: function(Id, callback){
			var sql = "SELECT * FROM user_info WHERE Id=?";
			db.executeQuery(sql, [Id], function(result){
				callback(result[0]);
			});
		},

		/*get: function(id, callback){
		var sql = "SELECT * FROM user_info WHERE id=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	}*/
		/**/
	    insert: function(user, callback){
	        var sql = "INSERT INTO user_info VALUES (null, ?, ? , ? , ? , ? , ? , ? , ? , ?, 1 )";
	        var params =  [user.name, user.email, user.username, user.password, user.userType, user.dob, user.designation, user.status, user.gender];

	        db.executeQuery(sql,params, function(result){
	            callback(result);
	        });
	    },

	    update: function(user, callback){
	        var sql = "UPDATE user_info SET Name=?, Designation=? , DoB = ? ,Status = ?  WHERE Id="+user.id;
	        var params =  [user.name, user.designation,user.dob, user.status];

	        db.executeQuery(sql,params, function(result){
	            callback(result);
	        });
	    },

	    delete: function(user, callback){
	        var params =  [user.name, user.email, user.username, user.password, user.userType, user.dob, user.designation, user.status, user.gender];
	        var sql = "DELETE from user_info WHERE Id="+user.Id;
	        db.executeQuery(sql,params, function(result){
	            callback(result);
	        });
	    }

	    /**/
};