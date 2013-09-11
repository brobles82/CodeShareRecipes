App.AppIndexController = Ember.ArrayController.extend({
  itemController: 'recipes_recipe',
  needs:['appLogin']
});