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
  'click #submitRenda': function (event, template) {

    var nomeRenda         = template.find('#nomeRenda').value;
    var valorRenda        = TipoRenda.findOne({nomeRenda: nomeRenda}).valorRenda,
        data              = template.find('#data').value,
        paciente          = template.find('#paciente').value,
        comentarios       = template.find('#comentarios').value,
        criador           = Meteor.user().profile.nome,
        criadoEmPuro      = new Date(),
        idCommon          = Meteor.user().profile.idCommon;

    NProgress.start();
      Rendas.insert({
        nomeRenda: nomeRenda,
        valorRenda: valorRenda,
        data: data,
        paciente: paciente,
        comentarios: comentarios,
        criador: criador,
        criadoEmPuro: criadoEmPuro,
        idCommon: idCommon,
      });
      NProgress.done();
      humane.log('Renda adicionada com sucesso.');
      $('#formInserir')[0].reset();
      document.body.scrollTop = 0;
  },

  'click #submitNewPaciente': function (event, template) {
    var newPaciente = template.find('#newPaciente').value;
    NProgress.start();
      Pacientes.insert({
        paciente: newPaciente,
        idCommon: Meteor.user().profile.idCommon,
      });
      NProgress.done();
      humane.log('Paciente adicionado com sucesso.');
    },

});

Template.inserir.helpers({
 displayName: function () {
     var user = Meteor.user();
     var nome = user.profile.nome;
     return nome;
   },
   listTipoRendas: function () {
     listTipoRendas = TipoRenda.find().fetch();
     return listTipoRendas;
   },
   listPacientes: function () {
     listPacientes = Pacientes.find().fetch();
     return listPacientes;
   },
});