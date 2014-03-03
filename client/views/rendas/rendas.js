Template.rendas.created = function () {
Session.set("limit", 2);
};

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

//Choose renda collection
chooseRendas = new Meteor.Collection(null);
if (Session.get('rendas') === undefined) {
  chooseRendas.insert( {rendas: [] });
}else {
  chooseRendas.insert( {rendas: Session.get('rendas').rendas});
}

///////////////////////////////////////////

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



Template.rendas.helpers({
  displayName: function () {
      var user = Meteor.user();
      var nome = user.profile.nome;
      return nome;
    },

  listTipoRendas: function () {
    var listTipoRendas = TipoRenda.find().fetch();
    return listTipoRendas;
  },

  allOrders: function() {
    var rendasTotal = Rendas.find({}).fetch();
    if (rendasTotal) {
    if (rendasTotal.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  list: function() {
    if (Session.get("search_keywords") === undefined) {
      rendaInicial = Rendas.find({}, { limit : Session.get("limit") });
      return rendaInicial;
    }else {
      var datas = Session.get("search_keywords");
      var rendas = Session.get('rendasSelect').rendas;
      rendas = Rendas.find({ $and: [
        { data: {$in: datas} },
        { nomeRenda: {$in: rendas} },

      ]});
      return rendas;
    }
  },
  listSelecteds: function () {
    if (Session.get('rendasSelect') !== undefined) {
       return Session.get('rendasSelect').rendas;
    }
  },
  isMore: function () {
    var rendaTotal = Rendas.find({});
    if (rendaInicial.count() == rendaTotal.count()) {
      return false;
    } else {
      return true;
    }
  }

});

Template.rendas.events({
  'click .search': function (event, template) {
    var $periodo1    = $('#periodo1').val();
    var arrayP1      = $periodo1.split('/');
    var dateP1       = new Date(arrayP1[2],arrayP1[1]-1,arrayP1[0]);
    var $periodo2    = $('#periodo2').val();
    var arrayP2      = $periodo2.split('/');
    var dateP2       = new Date(arrayP2[2],arrayP2[1]-1,arrayP2[0]);
    var rangeDates   = getDates(dateP1,dateP2);
    var rendaChoosed = template.find('#rendaChoose').value;

    if (threeIsNotEmpty($periodo1,$periodo2,rendaChoosed)) {
      Session.set("search_keywords", rangeDates);
    }

  },
  'change #rendaChoose': function (event, template) {
    var rendaChoosed = template.find('#rendaChoose').value;
    var rendasList = chooseRendas.findOne();
    if (rendaChoosed !== '') {
      chooseRendas.update(rendasList._id, {$addToSet: {rendas: rendaChoosed }});
      Session.set('rendasSelect', chooseRendas.findOne() );
    }
  },
  'click .deleteRenda': function (event, template) {
    $('#periodo1').val('');
    $('#periodo2').val('');
    $('#rendaChoose').val('');
    var list = chooseRendas.findOne();
    var renda = this.renda;
    var id  = list._id;
    chooseRendas.update({_id: id }, {rendas: []});
    Session.set('rendasSelect', chooseRendas.findOne());
    Session.set("search_keywords", undefined);
  },
  'click .goOrder': function (event, template) {
    Router.go('/inserir');
  },

  'click .more': function (event, template) {
    var now  = Session.get("limit");
    now += 5;
    Session.set("limit", now);
  }

});










