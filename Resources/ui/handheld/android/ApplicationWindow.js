//Application Window Component Constructor
function ApplicationWindow(_args) {
	//load component dependencies
	var $$ = require('helpers/utility'),
		theme = require('helpers/theme'),
		SearchView = require('ui/common/SearchView');
		
	//create component instance
	var opts = $$.combine(theme.styles.Window, {
		backgroundColor:'#ffffff',
		exitOnClose:true
	});
	var self = Ti.UI.createWindow(opts),
		controller = _args.controller;
		
	//construct UI
	var searchView = new SearchView({controller: controller});
	self.add(searchView);

	self.addEventListener('open', function (e) {
		controller.register(self);
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
