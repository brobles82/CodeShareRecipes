Template.postDetails.created = function() {
return reactiveVariable = new ReactiveVariable();

};


Template.postDetails.helpers({
  editing: function() {
  return reactiveVariable.getState() === ReactiveVariable.ORDER_STATE;  
}
});
