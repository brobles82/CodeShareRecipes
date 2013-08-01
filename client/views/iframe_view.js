App.IframeView = Ember.View.extend({
  tagName: 'iframe',
  classNames: ['large-12' ,'columns', 'iframepreview'],
  attributeBindings: ['src','frameborder'],
  frameborder: 0,

  didInsertElement: function() {}
});


/*

classNameBindings: ['color', 'piece'],

on the template
{{view App.CellView
colorBinding=colour
pieceBinding=piece}}
*/