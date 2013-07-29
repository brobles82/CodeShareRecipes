App.Recipe = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  preview: DS.attr('string')
});