Template.configuracoes.events({
  'click #submitUsuario': function (event, template) {
      var nome      = template.find('#nomeUsuario').value,
          nivel     = template.find('#nivelEscolha').value,
          email     = trimInput(template.find("#emailUsuario").value.toLowerCase()),
          idCommon  = Meteor.user().profile.idCommon;
      if (isNotEmpty(nome)&&isNotEmpty(email)&& isEmail(email)&& isNotTheSameMan(email)) {
        Meteor.call('createUserStartup', email, nome, idCommon, nivel, function (err, email,nome, idCommon, nivel ) { } );
        humane.log('Usuário criado com sucesso!');
        template.find('#nomeUsuario').value = '';
        template.find("#emailUsuario").value = '';
      }
    },

  'click .deleteUsuario': function (event, template) {
    var email = this.email;
    var user = Meteor.users.findOne({"emails.address": email});
    Meteor.users.remove({_id: user._id});
  },
  'click .deletarConta': function (event, template) {
    Meteor.call('removeEverything');
  }
});

Template.configuracoes.helpers({
  listUsuarios: function () {
    var user = Meteor.user();
    var email = (user.emails && user.emails[0] && user.emails[0].address);
    var listUsuarios = Meteor.users.find({ "emails.address": { $nin: [ email ] } });
    return listUsuarios.map(function(user) { return {email: user.emails[0].address}; });
  },
});