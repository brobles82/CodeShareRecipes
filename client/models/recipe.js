App.Recipe = DS.Model.extend({
  title:   DS.attr('string'),
  body:    DS.attr('string'),
  date:    DS.attr("number"),
  userid:  DS.attr("number"),
  userName: DS.attr('string'),
  preview: DS.attr('string')
});