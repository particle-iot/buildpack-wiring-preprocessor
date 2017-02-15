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

/*eslint quotes:0*/
'use strict';
var fs = require('fs');
var regexParser = require('./regexParser.js');
var utilities = require('./utilities.js');

var that;
module.exports = that = {
	processFile: function processFile(inputFile, outputFile) {
		console.log('Processing ', inputFile);
		try {
			outputFile = outputFile || inputFile;

			if (utilities.isDirectory(inputFile)) {
				console.log('Skipping directory ' + inputFile);
				return true;
			}

			var fileBuffer = fs.readFileSync(inputFile).toString();
			var ext = utilities.getFilenameExt(inputFile).toLowerCase();

			var unsafeError = this.checkForUnsafeContent(fileBuffer);
			if (unsafeError) {
				console.log('Found unsafe content ' + unsafeError);
				return false;
			}

			if ((fileBuffer.indexOf('#pragma SPARK_NO_PREPROCESSOR') >= 0) ||
				(fileBuffer.indexOf('#pragma PARTICLE_NO_PREPROCESSOR') >= 0) ||
				(ext !== '.ino')) {
				console.log('Skipping ' + ext + ' file ');
				fs.writeFileSync(outputFile, fileBuffer, {flag: 'w'});
				return true;
			}

			var insertIdx = regexParser.getFirstStatement(fileBuffer);

			var includeStr = '#include "Particle.h"';
			var appDotHInclude = fileBuffer.indexOf(includeStr);
			if (appDotHInclude > insertIdx) {
				// Don't inject function declr's before application.h...
				insertIdx = fileBuffer.indexOf(
					"\n",
					appDotHInclude + includeStr.length
				) + 1;
			}

			var linesBeforeInjection = fileBuffer.substring(
				0,
				insertIdx
			).split('\n').length;

			var cleanText = regexParser.stripText(fileBuffer);
			var missingFuncs = regexParser.getMissingDeclarations(cleanText);


			var addedContent = "\n"
				+ includeStr + "\n"
				+ missingFuncs.join("\n") + "\n"
				+ '#line ' + linesBeforeInjection + "\n";
			fileBuffer = utilities.stringInsert(
				fileBuffer,
				insertIdx,
				addedContent
			);

			fs.writeFileSync(outputFile, fileBuffer, {flag: 'w'});
			return true;
		} catch (ex) {
			console.error('preProcessFile error ' + ex);
		}

		return false;
	},

	checkForUnsafeContent: function checkForUnsafeContent(fileBuffer) {
		var issues = null;
		if (!fileBuffer) {
			return issues;
		}

		// RELATIVE INCLUDES ONLY!  NO ABSOLUTE INCLUDES!!!
		// NO POPPING UP MORE THAN 2 parent directories!
		var unsafeChunks = [
			'#include "/',
			'#include </',
			'#include "../../../',
			'#include <../../../'
		];

		for (var i = 0; i < unsafeChunks.length; i++) {
			var chunk = unsafeChunks[i];

			if (fileBuffer.indexOf(chunk) >= 0) {
				issues = 'Found: ' + chunk;
				break;
			}
		}

		return issues;
	},

	foo: null
};

module.exports = that;
