Template.rendas.rendered = function () {
  $('td').popover('hide');
  xisto = new Date();
  $('#periodo1').appendDtpicker({
              "locale": "br",
              "calendarMouseScroll": false,
              "futureOnly": false,
              "closeOnSelected": true,
              "timelistScroll":false,
              "firstDayOfWeek": 1,
              "todayButton": false,
              "dateFormat": "DD/MM/YYYY",


          });
  $('#periodo2').appendDtpicker({
              "locale": "br",
              "calendarMouseScroll": false,
              "futureOnly": false,
              "closeOnSelected": true,
              "timelistScroll":false,
              "firstDayOfWeek": 1,
              "todayButton": false,
              "dateFormat": "DD/MM/YYYY",


          });
};


Handlebars.registerHelper('ifAny', function(data, options) {
  if (!data || (_.isArray(data) && !data.length) || (_.isFunction(data.fetch) && !data.count()))
    return options.inverse(this);
  else
    return options.fn(this);
});

Handlebars.registerHelper('dot', function(str) {
  if (str) {
  if (str.length > 20)
    return str.substring(0,20) + '...';
  return str;
}
});



Session.set('slice', 10);

Template.rendas.helpers({
  rendaList: function () {
    rendasLimit = Rendas.find({},{limit:Session.get('slice')}).fetch();
    return rendasLimit;
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
  allOrders: function() {
    rendasTotal = Rendas.find({}).fetch();
    if (rendasTotal.length > 0) {
      if (rendasTotal.length == rendasLimit.length){
        return false;
      } else {
        return true;
      }
    } else {
      this.stop();
    }
  },
  listSelecteds: function () {
    return Session.get('rendasSelect');
  }

});

x = 10;

Template.rendas.events({
  'click .goOrder': function (event, template) {
    Router.go('/inserir');
  },
  'click .calendar': function (event, template) {

  },
  'click .deletarRenda': function (event, template) {
    var id = this._id;
    NProgress.start();
    Rendas.remove({_id:id});
    NProgress.done();
  },
    'click #more': function () {
      x = x + 5;
      Session.set('slice', x);
    },
});


//Rendas selecionadas
Session.set("rendasSelect", []);




