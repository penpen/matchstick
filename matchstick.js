// Cosntructor
var Matchstick = function( pattern, mode, modifiers ) {

	// Validate the pattern
	if( typeof pattern != 'string' ) throwErr("The 'pattern' property must be a string");

	// Validate the mode
	var validModes = [
		'strict',   // Exact match
		'static',   // Static match with modifiers
		'wildcard', // Asterisks match any character
		'regex'     // Convert into a regex
	];
	if( validModes.indexOf(mode) < 0 ) throwErr("The 'mode' property must be one of " + validModes.join(', ') );

	// Validate the modifier string	
	var validModifiers = [
		'i', // Case insensitive
		'g', // Global match
		'm'  // Multiline matching
	];
	if( mode == 'strict' && modifiers != null) throwErr("Modifiers cannot be used for an exact match");
	if( modifiers ) {
		for(i in modifiers.split('')) {
			var mod = modifiers[i];
			if( validModifiers.indexOf(mod) >= 0 ) {
				validModifiers.splice(validModifiers.indexOf(mod), 1);
			} else {
				throwErr("Invalid modifier character '" + mod + "'");
			}
		}
	}

	// Process the pattern according to the mode
	switch( mode ) {
		case 'strict':
			pattern = escapeRegExp(pattern);
			this.regex = RegExp('^' + pattern + '$');
			break;
		case 'static':
			pattern = escapeRegExp(pattern);
			this.regex = RegExp('^' + pattern + '$', modifiers);
			break;
		case 'wildcard':
			pattern = escapeRegExp(pattern, false);
			pattern = pattern.replace(/[\*]/g, "(.*)");
			this.regex = RegExp('^' + pattern + '$', modifiers);
			break;
		case 'regex':
			this.regex = RegExp(pattern, modifiers);
			break;
	}

	// Helper function to escape a regex string
	function escapeRegExp(str, asterisks) {
		var regexp = (asterisks) ? /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g : /[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g;
		return str.replace(regexp, "\\$&");
	}

	// Helper function to throw a labeled error
	function throwErr( message ) {
		throw new Error("[Matchstick] " + message);
	}

	// Return the object for chaining
	return this;
};

// Public method to test the regex
Matchstick.prototype.test = function( str ) {
	return this.regex.test(str);
};


// Export the constructor
module.exports = function( pattern, mode, modifiers ) {
	return new Matchstick(pattern, mode, modifiers);
};