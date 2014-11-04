//the namespace to store all ContactsApp class defs and events

ContactsMgmt = {
	Models: {},
	Collections: {},
	Views: {},
}

// the Contacts Marionette Application
ContactsApp = new Backbone.Marionette.Application();

ContactsApp.addRegions({
	mainRegion:"#content"
});

// Class Definitions

// Contact Model
ContactsMgmt.Models.Contact = Backbone.Model.extend({

});

// Contacts Collection
ContactsMgmt.Collections.Contacts = Backbone.Collection.extend({
	model: ContactsMgmt.Models.Contact,
	url : "assets/vendors.json"
	//url: "https://candidate-test.herokuapp.com/contacts.json"
});


// Views
// **ContactListLayout
ContactsMgmt.Views.ContactsLayout = Backbone.Marionette.Layout.extend({
	
	template: "#contacts-layout",

	regions: {
		contentRegion: ".content-region"
	},

	onRender: function(){
		
		// Fetch Collection and show the views
		var collection = new ContactsMgmt.Collections.Contacts()
		collection.fetch({
			success: function(collection, response, options){
				console.log(response)
			},
			error: function(collection, response, options){
				console.error(response)
			}
		})
		// Send to Contacts View
		var contactsView = new ContactsMgmt.Views.ContactsView({
			collection: collection
		})

		this.contentRegion.show(contactsView)
	}
});

// ** Contact View 

ContactsMgmt.Views.Contact =  Backbone.Marionette.ItemView.extend({
	template:"#vendor-template",
	tagName:'div',
	className:'contact-item col-md-3 col-sm-4 col-xs-6',

	initialize: function(){
		
	},

	

});

// Empty View for the Contacts
ContactsMgmt.Views.EmptyContacts = Backbone.Marionette.ItemView.extend({
	template: "#empty-contacts-view"
});

// ** Contacts View
ContactsMgmt.Views.ContactsView = Backbone.Marionette.CompositeView.extend({
	template: "#contacts-view",

	itemView: ContactsMgmt.Views.Contact,

	itemViewContainer: ".contacts-container",

	// For the empty Collection
	emptyView: ContactsMgmt.Views.EmptyContacts,

	// Distinguish between an empty collection and a loading collection
	collectionEvents: {
		'request': 'showLoading',
    	'sync': 'hideLoading'
	},

	showLoading: function(){
		
		this.$(".loading").show()
	},

	hideLoading: function(){
		
		this.$(".loading").hide()

	}


});


// Marionette Initializer to show content
// Triggered when the App is started
ContactsApp.addInitializer(function(options){
	var contactView = new ContactsMgmt.Views.ContactsLayout()
	ContactsApp.mainRegion.show(contactView);
});

// When document is ready, start the App and trigger the initializer
$(document).ready(function(){
	
	ContactsApp.start();
});