
//the namespace to store all ContactsApp class defs and events

ContactsMgmt = {
	Models: {},
	Collections: {},
	Views: {},
}

// ***** Class Definitions  ********
// *******  Models , Collections, Views 

// 1. Models - Contact Model
ContactsMgmt.Models.Contact = Backbone.Model.extend({

});

// 2. Collections - Contacts Collection
ContactsMgmt.Collections.Contacts = Backbone.Collection.extend({
	model: ContactsMgmt.Models.Contact,
	url : "assets/vendors.json",
	// #FIXME Access-control origin issues with server
	//url: "https://candidate-test.herokuapp.com/contacts.json"
});


// 3. Views
// 3a. ContactListLayout

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

		// Show Contacts View on region
		var contactsView = new ContactsMgmt.Views.ContactsView({
			collection: collection
		})

		this.contentRegion.show(contactsView)
	}
});
 
// 3b.  Contact View 

ContactsMgmt.Views.Contact =  Backbone.Marionette.ItemView.extend({
	template:"#vendor-template",

	tagName:'div',
	
	className:'contact-item col-md-3 col-sm-4 col-xs-6',

});

// 3c.  Empty View for the Contacts Composite View
ContactsMgmt.Views.EmptyContacts = Backbone.Marionette.ItemView.extend({
	template: "#empty-contacts-view"
});

// 3d.  Contacts Composite View
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


