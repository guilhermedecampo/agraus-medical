Template.inserir.rendered = function () {
  xisto = new Date();
  $('#data').appendDtpicker({
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

Template.inserir.events({
  'click #submitLaudo': function (event, template) {
    var nomeEmpresa       = template.find('#empresa').value,

        nomeFuncionario   = template.find('#nomeFuncionario').value,
        funcaoFuncionario = template.find('#funcaoFuncionario').value,
        tipoExame         = template.find('#tipoExame').value,
        exame            = template.find('#exame').value,
        nomePrestador    = template.find('#nomePrestador').value,
        criadoEmPuro     = new Date(),
        criadoEmMoment   = moment().format("DD/MM/YYYY"),
        nomeReceita      = template.find('#receita').value;

    NProgress.start();
      Laudos.insert({
        nomeEmpresa: nomeEmpresa,
        nomeFuncionario: nomeFuncionario,
        funcaoFuncionario: funcaoFuncionario,
        tipoExame: tipoExame,
        exame: exame,
        nomePrestador: nomePrestador,
        criadoEmPuro: criadoEmPuro,
        criadoEmMoment: criadoEmMoment,
        nomeReceita: nomeReceita,
      });
      NProgress.done();
      humane.log('Laudo adicionado com sucesso.');
      $('#formInserir')[0].reset();
      document.body.scrollTop = 0;
  }
});

Template.inserir.helpers({
 displayName: function () {
     var user = Meteor.user();
     var nome = user.profile.nome;
     return nome;
   },
   listFiliais: function () {
     listFiliais = Filiais.find().fetch();
     return listFiliais;
   },
});