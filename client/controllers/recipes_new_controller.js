App.RecipesNewController = Ember.ObjectController.extend({

submit: function () {
    
    // Get the todo title set by the "New Todo" text field
    var title = this.get('title');
      if (!title.trim()) { return; }
      
    var body = this.get('body');
      if (!body.trim()) { return; }
      
    var preview = this.get('preview');
    if(!preview.match(/^http:\/\/(?:.*?)\.?jsbin\.com\/.+$/)) {
      preview = "";
    }

    // Create the new Todo model
    var recipe = App.Recipe.createRecord({
      title: title,
      body: body,
      preview: preview
    });

    // Clear the "New Todo" text field
    this.set('title', '');
    this.set('body', '');
    this.set('preview', '');

    // Save the new model
    recipe.save();
    this.transitionToRoute('recipes.recipe', recipe);
  }
});