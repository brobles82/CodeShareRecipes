App.IframeView = Ember.View.extend({
  tagName: 'iframe',
  classNames: ['span12', 'iframepreview'],
  attributeBindings: ['src','frameborder'],
  frameborder: 0
});


/*

classNameBindings: ['color', 'piece'],

on the template
{{view App.CellView
colorBinding=colour
pieceBinding=piece}}
*/