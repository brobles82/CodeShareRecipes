App.RecipeController = Ember.ObjectController.extend({

    isEditing: false,
    
    scrollTop: function() {
      window.scrollTo(0, 0);
    },
    
    endEdit: function() {
        this.set('isEditing', false);
    },

    editTodo: function () {
        this.set('isEditing', true);
    },
    
    removeTodo: function () {
        var recipe = this.get('model');
        recipe.deleteRecord();
        recipe.save();
        this.transitionToRoute('recipes');
    },
    
    acceptChanges: function () {
      if (!this.get('title').trim() || !this.get('body').trim()) {

        alert('Cant be blank');
        return;
      }
      
      if(!this.get('preview').match(/^http:\/\/(?:.*?)\.?jsbin\.com\/.+$/)) {
        this.set('preview', "");
      }

        this.set('isEditing', false);
        this.scrollTop();
        this.get('model').save();
    },

    discartChanges: function() {
        this.get('transaction').rollback();
        this.set('isEditing', false);
        this.scrollTop();

    }

});