var fs = require('fs');

module.exports = {
	getFilenameExt: function(filename) {
		if (!filename || (filename.length === 0)) {
			return filename;
		}

		var idx = filename.lastIndexOf('.');
		if (idx >= 0) {
			return filename.substr(idx);
		} else {
			return filename;
		}
	},

	getFilenameNoExt: function(filename) {
		if (!filename || (filename.length === 0)) {
			return filename;
		}

		var idx = filename.lastIndexOf('.');
		if (idx >= 0) {
			return filename.substr(0, idx);
		} else {
			return filename;
		}
	},

	/**
	 * apparently this isn't already baked in?
	 * @param str
	 * @param idx
	 * @param val
	 */
	stringInsert: function(str, idx, val) {
		return str.substring(0, idx) + val + str.substring(idx);
	},

	/**
	 * Give the set of items in required that aren't in found
	 * @param required
	 * @param found
	 */
	setComplement: function(required, found) {
		var hash = {};
		for (var i = 0; i < found.length; i++) {
			hash[found[i]] = true;
		}

		var results = [];
		for (var i = 0; i < required.length; i++) {
			var item = required[i];
			if (hash[item]) {
				continue;
			}
			results.push(item);
		}
		return results;
	},

	isDirectory: function(filePath) {
		try {
			var stat = fs.statSync(filePath);
			return stat.isDirectory();
		} catch (ex) {
		}
		return false;
	},

	_: null
};
