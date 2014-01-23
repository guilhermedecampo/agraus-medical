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
  Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
  };
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

var $test = $('#periodo1').val();
Template.rendas.helpers({
  rendaList: function () {
      if ($test !== '' && undefined) {
      // create a extension for Dates like this
      // create the array
      var dates = [];

      // define the interval of your dates
      var periodoInitial = $('#periodo1').val().split('/');
      var currentDate = new Date(periodo1[2],periodo1[0],periodo1[1]);
      var endDate = new Date(2014, 07, 07);

      // create a loop between the interval
      while (currentDate <= endDate)
      {
       // add one day
       currentDate = currentDate.addDays(1);

       // add on array
       dates.push(currentDate);

      }
      console.log(dates);
    }

    //var periodo1 = $('#periodo1').val().split('/').reduce(function(prev, cur) {return prev + cur});
    //var periodo2 = $('#periodo2').val().split('/').reduce(function(prev, cur) {return prev + cur});
    //var range    = periodo2 - periodo1;
    if ( Session.get('rendasSelect') !== undefined) {
      Session.set("keySearch",Session.get('rendasSelect').rendas);
    } else {
      Session.set("keySearch",'');
    }
    keywords = Session.get("keySearch").trim().split(' ');
    //console.log(keywords);
    //sedis = Sedis.find({$and: [ { toDo: false }],$or:[{title:keywords},{description:keywords},{content:keywords},{tags:keywords},{links:keywords},{comments:keywords}]}, {sort: {SortCreated: -1}}).fetch();
    console.log(keywords);
    rendas = Rendas.find()
      .fetch().filter(function (doc) {
        var stringified = JSON.stringify(doc);
        return _.all(keywords, function (keyword) {
          return stringified.match(new RegExp(keyword, 'i'));
        });
      });

    rendasSorted = rendas.sort({data: -1});
    return rendasSorted;
  },
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
    if (rendasTotal.length > 0) {
      if (rendasTotal.length === rendasSorted.length){
        return false;
      } else {
        return true;
      }
    } else {
      this.stop();
    }
  },
  listSelecteds: function () {
    if (Session.get('rendasSelect') !== undefined) {
    var listMan = Session.get('rendasSelect');
    return _.map(listMan.rendas || [], function (renda) {
       return {renda: renda};
     });
    }
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
  'change #rendaChoose': function (event, template) {
    var rendaChoosed = template.find('#rendaChoose').value;
    console.log(rendaChoosed);
    var rendasList = chooseRendas.findOne();
    if (rendaChoosed !== '') {
      chooseRendas.update(rendasList._id, {$addToSet: {rendas: rendaChoosed }});
      Session.set('rendasSelect', chooseRendas.findOne() );
    }
  },
  'click .deleteRenda': function (event, template) {
    var list = chooseRendas.findOne();
    var renda = this.renda;
    var id  = list._id;
    chooseRendas.update({_id: id }, {$pull: {rendas: renda}});
    Session.set('rendasSelect', chooseRendas.findOne() );
  },

});










