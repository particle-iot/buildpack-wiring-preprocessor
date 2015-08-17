/**
 *
 * This library is a basic attempt at identifying arduino-compatible source files, and providing the functions
 * necessary to translate them into firmware compilable C code.
 */


var utilities = require('./utilities.js');

//identify function declarations
// c language requires functions to be declared before they are used, but arduino-y languages do not.

//identify functions
// once we've identified functions without declarations, we can add the missing sections

//identify header includes
// we must add any missing header includes, but also keep any user supplied headers.


var that;
module.exports = that = {
	matchAll: function(expr, str) {
		var m, matches = [];

		while ((m = expr.exec(str)) != null) {
			matches.push(m);
		}
		return matches;
	},

	functions: {
		declarations: function(str) {
			//since these don't handle comments those need to be removed separately.
			var declrRegex = new RegExp("[\\w\\[\\]\\*]+\\s+[&\\[\\]\\*\\w\\s]+\\([&,\\[\\]\\*\\w\\s]*\\)(?=\\s*\\;);", "gm");
			return that.matchAll(declrRegex, str);
		},
		definitions: function(str) {
			var fnRegex = new RegExp("[\\w\\[\\]\\*]+\\s+[&\\[\\]\\*\\w\\s]+\\([&,\\[\\]\\*\\w\\s]*\\)(?=\\s*\\{)", "gm");
			return that.matchAll(fnRegex, str);
		}
	},

	includes: {
		findAll: function(str) {
			var fnRegex = new RegExp("#include ((<[^>]+>)|(\"[^\"]+\"))", "gm");
			return that.matchAll(fnRegex, str);
		}
	},


	describe: {

		parseGitTag: function(tag) {
			var prefix = "spark_";
			if (!tag || (tag.indexOf(prefix) != 0 )) {
				//empty or doesn't start with spark_ ?  not our tag!
				return null;
			}

			try {
				//chop off the leading prefix.
				//spark_0-45-g48a6ef7
				//gives us: 0-45-g48a6ef7
				tag = tag.substring(prefix.length);
				var chunks = tag.split("-");

				// ["0", "45", "g48a6ef7" ]
				if (chunks.length >= 2) {

					var result = [
						parseInt(chunks[0]),
						parseInt(chunks[1])
					];

					if (!isNaN(result[0]) && !isNaN(result[1])) {
						return result;
					}
				}
			}
			catch (ex) {
				console.error("error parsing tag - not a number ", tag);
			}

			return null;
		}
	},

	removePreprocessorDirectives: function(contents) {

		var directives = new RegExp("(#(?:\\\\\\n|.)*)", "gi");    //notice no "m" here
		return contents.replace(directives, " ");
	},

	stripText: function(contents) {

		/**
		 * Strip out anything the function definition code doesn't deal with well.
		 * Essentially anything that couldn't possibly contain a function def.
		 */

		var cruft = new RegExp(
				"('.')" +
				"|(\"(?:[^\"\\\\]|\\\\.)*\")" +
				"|(//.[^\n]*)" +
				"|(/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/)" +
				"|(^\\s*#.*?$)"
			, "mgi");

		return contents.replace(cruft, "");
	},


	removeComments: function(contents) {
		//http://stackoverflow.com/questions/462843/improving-fixing-a-regex-for-c-style-block-comments
		//var multiline = new RegExp("/\\*.*?\\*/", "mgi");
		//var singleline = new RegExp("//.[^\n]*", "gi");

		//this one should catch all comments not inside quotes  (?=(?:[^"']|["|'][^"']*")*$)(/\\*.*?\\*/)+

		//prefer single line comments

		var multiline = new RegExp("(?=(?:[^\"']|[\"|'][^\"']*\")*$)((//.[^\n]*)|(/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/))", "mgi");

		//prefer multi-line comments
		//var multiline = new RegExp("(?=(?:[^\"']|[\"|'][^\"']*\")*$)((/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/)|(//.[^\n]*))", "mgi");

		return contents.replace(multiline, " ");
	},

	extractIncludes: function(contents) {
		var includesRegex = new RegExp("^(#include).+$", "mi");

		//look for lines that start with #include
		//#include "awesome.h"
		//#include <unstdio.h>
		//etc.

		var results = includesRegex.exec(contents);
		console.log('found ', results.length, ' includes ');
		return results;
	},

	getMissingDeclarations: function(contents) {
		//all the ones that don't need extra declarations
		var found = that.functions.declarations(contents);
		found = that.flattenRegexResults(found);

		//all the functions we have
		var defined = that.functions.definitions(contents);
		defined = that.flattenRegexResults(defined);
		for(var i = 0; i < defined.length; i++) {
			defined[i] = defined[i] + ";";
		}

		//all the ones we're missing
		return utilities.setComplement(defined, found);
	},

	/**
	 * just the strings please.
	 * @param results
	 */
	flattenRegexResults: function(results) {
		if (results) {
			for(var i = 0; i < results.length; i++) {
				results[i] = results[i][0];
			}
		}
		return results;
	},


	getMissingIncludes: function(contents, required) {
		//var cleanText = that.removeComments(contents);

		//TODO: be smarter about matching whitespace inside include statements, etc.

		//prepend the "#include" part...
		for(var i = 0; i < required.length; i++) {
			var line = required[i];
			if (line.indexOf("#include") < 0) {
				required[i] = "#include " + line;
			}
		}

		var found = that.flattenRegexResults(that.includes.findAll(contents));
		return utilities.setComplement(required, found);
	},


	/**
	 *
	 * @param contents
	 */
	getIdxAfterIncludes: function(contents) {
		var allIncludes = that.includes.findAll(contents);
		if (allIncludes && (allIncludes.length > 0)) {
			var last = allIncludes[allIncludes.length - 1];
			return last.index + last[0].length;
		}

		return 0;
	},

	getIdxBeforeIncludes: function(contents) {
		var allIncludes = that.includes.findAll(contents);
		if (allIncludes && (allIncludes.length > 0)) {
			return allIncludes[0].index;
		}

		return 0;
	},

	//return the line number of the first statement in the code
	getFirstStatement: function(contents) {

		//find the first thing that isn't these.
		var nonStatement = [
			//whitespace
			"\\s+",

			//comments
			"|(/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/)|(//.*?$)",

			//pre-processor
			"|(#(?:\\\\\\n|.)*)"
		];

		var pat = new RegExp(nonStatement.join(""), "mgi");
		var lastMatch = 0;

		var match = pat.exec(contents);
		while (match) {
			if (match.index != lastMatch) {
				break;
			}
			lastMatch = match[0].length + match.index;
		}

		return lastMatch;
	},


	foo: null
};
