App.EditRecipeView = Ember.TextField.extend({
  classNames: ['edit'],

  willClearRender: function () {
    this.get('controller').endEdit();
 },

  didInsertElement: function () {
    this.$().focus();
  }
});
