App.RecipesIndexController = Ember.ArrayController.extend({
  itemController: 'recipes_recipe',

  searchTerm: '',

  filteredContent: function() {
		var recipe = this.get('content');
		var search = this.get('searchTerm').toLowerCase();
			if('' === search) {
				return recipe;
			} else {
				return recipe.filter(function(recipe) {
					return recipe.get('title').toLowerCase().indexOf(search) !== -1;
        });
			}
	}.property('content', 'searchTerm')
});