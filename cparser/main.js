/*
 *  Copyright 2015 Particle ( https://particle.io )
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var cparser = require('./processor');
var utilities = require('./utilities');

var userFolder = process.argv[2];

var files = glob.sync('**/*.{ino,pde}', {
	cwd: userFolder,
	ignore: 'lib/*'
});

for (var i = 0; i < files.length; i++) {
	var filename = files[i];
	var fullFilename = path.join(userFolder, filename);

	var outFilename = fullFilename;
	if (utilities.getFilenameExt(filename).toLowerCase() == '.ino') {
		outFilename = utilities.getFilenameNoExt(outFilename) + '.cpp';
	}

	// TODO: need to pass the errors back to the user nicely
	// TODO: need to reject the deferred nicely
	cparser.processFile(fullFilename, outFilename);
}
