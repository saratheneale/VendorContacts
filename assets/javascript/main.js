
// ***** The Contacts App  ********
ContactsApp = new Backbone.Marionette.Application();

ContactsApp.addRegions({
  mainRegion:"#content"
});

// Triggered when the App is started
ContactsApp.addInitializer(function(options){

  var contactView = new ContactsMgmt.Views.ContactsLayout()
  ContactsApp.mainRegion.show(contactView);

});

// Start the App and trigger the initializer
$(document).ready(function(){

  ContactsApp.start();
});