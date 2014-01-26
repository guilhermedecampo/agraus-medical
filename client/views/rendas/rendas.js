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
    listTipoRendas = TipoRenda.find().fetch();
    return listTipoRendas;
  },
  allOrders: function() {
    rendasTotal = Rendas.find({}).fetch();
    if (rendasTotal) {
    if (rendasTotal.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  list: function() {
    if (Session.get("search_keywords") !== undefined) {
      keywords = Session.get("search_keywords");
      rendas = Rendas.find().fetch().filter(function (doc) {
        var stringified = JSON.stringify(doc);
        return _.all(keywords, function (keyword) {
          return stringified.match(new RegExp(keyword, 'i'));
        });
      });
      return rendas;
    }
  },
  listSelecteds: function () {
    if (Session.get('rendasSelect') !== undefined) {
       return Session.get('rendasSelect').rendas;
    }
  }

});

x = 10;

Template.rendas.events({
  'click .search': function (event, template) {
    var $periodo1    = $('#periodo1').val();
    var arrayP1      = $periodo1.split('/');
    console.log(arrayP1);
    var dateP1       = new Date(arrayP1[2],arrayP1[1]-1,arrayP1[0]);
    console.log(dateP1);
    var $periodo2    = $('#periodo2').val();
    var arrayP2      = $periodo2.split('/');
    var dateP2       = new Date(arrayP2[2],arrayP2[1]-1,arrayP2[0]);
    var rangeDates   = getDates(dateP1,dateP2);
    console.log(rangeDates);

    Session.set("search_keywords", rangeDates);
  },
  'click #more': function () {
    x = x + 5;
    Session.set('slice', x);
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
  },

});










