Template.configuracoes.events({
  'click #submitRenda': function (event, template) {
    var nomeRenda = template.find('#nomeRenda').value;
    var valorRenda = template.find('#valorRenda').value;
    if (isNotEmpty(nomeRenda)&&isNotEmpty(valorRenda)) {
      NProgress.start();
      TipoRenda.insert({
        nomeRenda:nomeRenda,
        valorRenda:valorRenda,
        idCommon: Meteor.user().profile.idCommon,
      });
      NProgress.done();
      template.find('#nomeRenda').value = '';
      template.find('#valorRenda').value = '';
    }
  },
  'click .deleteFilial': function(event, template) {
        var id  = this._id;
        NProgress.start();
    TipoRenda.remove({_id:id});
        NProgress.done();
  },
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
  }
});

Template.configuracoes.helpers({
  listTipoRendas: function () {
    listTipoRendas = TipoRenda.find().fetch();
    return listTipoRendas;
  },
  listUsuarios: function () {
    var listUsuarios = Meteor.users.find({});
    return listUsuarios.map(function(user) { return {email: user.emails[0].address}; });
  },
});