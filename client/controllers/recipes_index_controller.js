App.RecipesIndexController = Ember.ArrayController.extend({
	itemController: 'recipes_recipe',
	searchTerm: '',

	sortProperties: ['date'],
	sortAscending: false,

	sortedContent: (function() {
    var content;
    content = this.get("content") || [];
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: content.toArray(),
      sortProperties: this.get('sortProperties'),
      sortAscending: this.get('sortAscending')
    });
  }).property("content.@each", 'sortProperties', 'sortAscending'),

	filteredContent: function() {
		var content = this.get('content');
		var search = this.get('searchTerm').toLowerCase();

		if('' === search) {
			return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
				content: content.toArray(),
				sortProperties: this.get('sortProperties'),
				sortAscending: this.get('sortAscending')
			});
		} else {
			return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
				content: content.filter(function(recipe) {
					return recipe.get('title').toLowerCase().indexOf(search) !== -1;
				}),
					sortProperties: this.get('sortProperties'),
					sortAscending: this.get('sortAscending')
    	});
		}
	}.property('content', 'searchTerm',"content.@each", 'sortProperties', 'sortAscending')
});