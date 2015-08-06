

connect = require('connect');
serveStatic = require('serve-static');
	


function startme(connect,serveStatic){
	
connect().use(serveStatic(__dirname)).listen(2015);

};



module.exports.startme = startme;
