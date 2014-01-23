Template.relatorios.helpers({
  displayName: function () {
    var user = Meteor.user();
    var nome = user.profile.nome;
    return nome;
  },
  listTipoRendas: function () {
    listTipoRendas = TipoRenda.find().fetch();
    return listTipoRendas;
  },
});

Template.relatorios.events({
  'click .calendar': function (event, template) {
    },
});


Template.relatorios.rendered = function () {
  xisto = new Date();
  $('#relatorioPeriodo1').appendDtpicker({
                "locale": "br",
                "calendarMouseScroll": false,
                "futureOnly": false,
                "closeOnSelected": true,
                "timelistScroll":false,
                "firstDayOfWeek": 1,
                "todayButton": false,
                "dateFormat": "DD/MM/YYYY",


          });
  $('#relatorioPeriodo2').appendDtpicker({
              "locale": "br",
              "calendarMouseScroll": false,
              "futureOnly": false,
              "closeOnSelected": true,
              "timelistScroll":false,
              "firstDayOfWeek": 1,
              "todayButton": false,
              "dateFormat": "DD/MM/YYYY",


          });
  // ...
  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  console.log(ctx);
  var x = TipoRenda.find().fetch();
  var data = {
    labels : _.map(x || [], function (TipoRenda) { return TipoRenda.nomeRenda;}),
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : _.map(x || [], function (TipoRenda) { return TipoRenda.valorRenda;})
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
      }
    ]
  };
  new Chart(ctx).Line(data);
  //Get the context of the canvas element we want to select
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  console.log(ctx2);
  var data2 = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];
  new Chart(ctx2).Pie(data2);
};
