App.AppIndexController = Ember.ArrayController.extend({
  itemController: 'recipes_recipe',
  needs:['appLogin'],
  lastRecipes: function() {
		var recipes = this.get('content');
		var counter = 0;
      return recipes.filter(function(recipe) {
        if(counter < 5) {
					counter ++;
					return recipe;
				}
			});

	}.property('content.@each')
});