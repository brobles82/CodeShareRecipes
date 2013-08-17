App.Recipe = DS.Model.extend({
  title:   DS.attr('string'),
  body:    DS.attr('string'),
  date:    DS.attr("number"),
  userid:  DS.attr("number"),
  preview: DS.attr('string')
});