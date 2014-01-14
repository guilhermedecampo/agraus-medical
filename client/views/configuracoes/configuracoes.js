Template.configuracoes.events({
  'click #submitFilial': function (event, template) {
    var nomeFilial = template.find('#nomeFilial').value;
    if (isNotEmpty(nomeFilial)) {
      NProgress.start();
      Filiais.insert({
        nomeFilial: nomeFilial,
      });
      NProgress.done();
      template.find('#nomeFilial').value = '';
    }
  },
  'click .deleteFilial': function(event, template) {
        var id  = this._id;
        NProgress.start();
    Filiais.remove({_id:id});
        NProgress.done();
  },
  'click #submitUsuario': function (event, template) {
      var nome = template.find('#nomeUsuario').value,
          filial = template.find('#filialEscolha').value,
          nivel = template.find('#nivelEscolha').value,
          email = trimInput(template.find("#emailUsuario").value.toLowerCase());
      if (isNotEmpty(nome)&&isNotEmpty(filial)&&isNotEmpty(email)&& isEmail(email)&& isNotTheSameMan(email)) {
        Meteor.call('createUserStartup', email, nome, filial, nivel, function (err, email,nome,filial,nivel ) { } );
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
  listFiliais: function () {
    listFiliais = Filiais.find().fetch();
    return listFiliais;
  },
  listUsuarios: function () {

    var listUsuarios = Meteor.users.find({});
    return listUsuarios.map(function(user) { return {email: user.emails[0].address}; });
  },
});