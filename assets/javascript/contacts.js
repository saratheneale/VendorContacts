
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
  // The server gives us all the info for the model fetch for this app
  // We could easily parse the data or do other actions the server wants to know
  // eg- saving, favoriting, editing, etc.
});

// 2. Collections - Contacts Collection
ContactsMgmt.Collections.Contacts = Backbone.Collection.extend({
  model: ContactsMgmt.Models.Contact,
  url : "assets/vendors.json",
  // #FIXME Access-control origin issues with server
  //url: "https://*****candida*****te-test.he****rokuapp.com/contac*****ts.json"
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
        //console.log(response)
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

  //className:'contact-item col-md-3 col-sm-4 col-xs-6',
  // Its easier to leave out className here and put it in the template
  // This makes it easier for UI/UX to understand how the templates are styled

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


