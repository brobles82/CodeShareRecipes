newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

if (Meteor.isClient) {

  ReactiveVariable = {};

  ReactiveVariable = (function() {

  ReactiveVariable.ORDER_STATE = 0;

  ReactiveVariable.prototype._deps = {};

  ReactiveVariable.prototype.state = 1;

  function ReactiveVariable() {
    this._deps['state'] = new Deps.Dependency;
  }

  //Set Getter and setter for State
  ReactiveVariable.prototype.getState = function() {
    this._deps['state'].depend();
    return this.state;
  };

  ReactiveVariable.prototype.setState = function(value) {
    if (value === this.state) {
      return;
    }
    this.state = value;
    return this._deps['state'].changed();
  };

  return ReactiveVariable;

})();

  reactiveVariable = null;
}
