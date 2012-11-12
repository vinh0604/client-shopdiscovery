//Application Window Component Constructor
function ApplicationWindow(_args) {
	//load component dependencies
	var _ = require('lib/underscore'),
		theme = require('helpers/theme'),
		SearchView = require('ui/common/SearchView');
		
	//create component instance
	var self = Ti.UI.createWindow(_.extend(theme.styles.Window, {
		backgroundColor:'#ffffff'
	}));
		
	//construct UI
	var searchView = new SearchView();
	self.add(searchView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
