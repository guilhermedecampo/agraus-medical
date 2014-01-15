Template.laudos.rendered = function () {
  $('td').popover('hide');
};

Handlebars.registerHelper('ifAny', function(data, options) {
  if (!data || (_.isArray(data) && !data.length) || (_.isFunction(data.fetch) && !data.count()))
    return options.inverse(this);
  else
    return options.fn(this);
});

Handlebars.registerHelper('dot', function(str) {
  if (str) {
  if (str.length > 30)
    return str.substring(0,30) + '...';
  return str;
}
});



Session.set('slice', 3);

Template.laudos.helpers({
  orderList: function () {
    rendas = Rendas.find().fetch();
    return rendas;
  },
  displayName: function () {
      var user = Meteor.user();
      var nome = user.profile.nome;
      return nome;
    },
  ifIntermediario: function() {
    if (Meteor.user().profile.nivel === 'intermediario' || Meteor.user().profile.nivel === 'administrador') {
      return true;
    } else {
      return false;
    }
  },
  listTipoRendas: function () {
    listTipoRendas = TipoRenda.find().fetch();
    return listTipoRendas;
  },

});


Template.laudos.events({
  'click .goOrder': function (event, template) {
    Router.go('/inserir');
  },
  'click #calendar': function (event, template) {
    xisto = new Date();
    $('#calendar').appendDtpicker({
                "locale": "br",
                "calendarMouseScroll": false,
                "futureOnly": false,
                "closeOnSelected": true,
                "timelistScroll":false,
                "firstDayOfWeek": 1,
                "todayButton": false,
                "dateFormat": "DD/MM/YYYY",


            });
  },
  'click .deletarLaudo': function (event, template) {
    var id = this._id;
    NProgress.start();
    Rendas.remove({_id:id});
    NProgress.done();
  }

});