Template.postDetails.created = function() {
return creditPurchase = new CreditPurchase();

};


Template.postDetails.helpers({
  editing: function() {
  return creditPurchase.getState() === CreditPurchase.ORDER_STATE;  
}
});
