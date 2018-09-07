var db = require('./db');
module.exports = {
	validateUser: function(UserName, Password, callback){
		var sql = "SELECT * FROM user_info WHERE UserName=? AND Password=?";
		var sqlParam = [UserName, Password];
		db.executeQuery(sql, sqlParam, function(result){
			if(!result)
			{
				callback(false);
			}
			else
			{
				callback(result);
			}
		});
	}
};
