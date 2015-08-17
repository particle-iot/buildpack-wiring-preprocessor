var fs = require("fs");
var path = require("path");
var cparser = require("./processor");
var utilities = require("./utilities");

var userFolder = process.argv[2];
var files = fs.readdirSync(userFolder);
for(var i = 0; i < files.length; i++) {
	var filename = files[i];
	var fullFilename = path.join(userFolder, filename);

	var outFilename = fullFilename;
	if (utilities.getFilenameExt(filename).toLowerCase() == ".ino") {
		outFilename = utilities.getFilenameNoExt(outFilename) + ".cpp";
	}

	//TODO: want to scan files for security issues, but I don't want to open the file more than once
	//TODO: need to pass the errors back to the user nicely
	//TODO: need to reject the deferred nicely
	cparser.processFile(fullFilename, outFilename);
}
