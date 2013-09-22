Template.postDetails.helpers({
	editing: function() {
		return Session.get('isEditing') || false;	
	}
});