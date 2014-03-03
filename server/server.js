isAdmin = function (email) {
  if (email === 'guilherme.decampo@gmail.com' ||
      email === 'marcoshobby@hotmail.com' ||
      email === 'guilhermex2@gmail.com'

        ) {
      return true;
    } else {
      return false;
    }
};

Meteor.publish('rendas', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  var idCommon = user.profile.idCommon;
  if (isAdmin(email)) {
    return Rendas.find({});
  } else {
    return Rendas.find({idCommon: idCommon});
  }
  } else {
    this.ready();
  }
});

Meteor.publish('tipoRenda', function () {
 if (this.userId) {
   var user = Meteor.users.findOne(this.userId);
   var email = (user.emails && user.emails[0] && user.emails[0].address);
   var idCommon = user.profile.idCommon;
   if (isAdmin(email)) {
     return TipoRenda.find({});
   } else {
     return TipoRenda.find({idCommon: idCommon});
   }
   } else {
     this.ready();
   }
});

Meteor.publish('pacientes', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  var idCommon = user.profile.idCommon;
  if (isAdmin(email)) {
    return Pacientes.find({});
  } else {
    return Pacientes.find({idCommon: idCommon});
  }
  } else {
    this.ready();
  }
});


//How allow only startups members appear for the admin
//without result in problems with logging.

if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    email:    'guilherme.decampo@gmail.com',
    password: '123456',
    profile: { nome:'Guilherme',
               nivel: 'administrador',
               idCommon: Random.id()
            }
  });
}

//Publish users from only them startup//

Meteor.publish('admin', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  if (isAdmin(email)) {
    return Meteor.users.find({});
  } else {
    return [];
  }
  } else {
    return [];
  }
});

Meteor.publish('changeEmail', function () {
  if (this.userId) {
  return Meteor.users.find({},{fields:{profile:false}});
  }
});

Meteor.users.allow({

  update: function (userId, user) {
    // can only change your own info
        return user._id === userId;
  },

  remove:function() {
    // can only delete your own info
        return user._id === userId;
    },
});


//Permissions//
Rendas.allow({
  insert: function (userId, doc) {
   var user = Meteor.users.findOne(userId);
         // can only remove your own documents
         return user.profile.idCommon === doc.idCommon;
  },

  update: function (userId, doc, fields, modifier) {
    var user = Meteor.users.findOne(userId);
          // can only remove your own documents
          return user.profile.idCommon === doc.idCommon;
  },

  remove: function (userId, doc) {
   var user = Meteor.users.findOne(userId);
         // can only remove your own documents
         return user.profile.idCommon === doc.idCommon;
  }


});

TipoRenda.allow({
  insert: function (userId, doc) {
   var user = Meteor.users.findOne(userId);
   console.log(user.profile.idCommon);
   console.log(doc.idCommon);
         // can only remove your own documents
         return user.profile.idCommon === doc.idCommon;
  },

  update: function (userId, doc, fields, modifier) {
      var user = Meteor.users.findOne(userId);
            // can only remove your own documents
            return user.profile.idCommon === doc.idCommon;
  },

  remove: function (userId, doc) {
     var user = Meteor.users.findOne(userId);
           // can only remove your own documents
           return user.profile.idCommon === doc.idCommon;
  }


});

Pacientes.allow({
  insert: function (userId, doc) {
   var user = Meteor.users.findOne(userId);
         // can only remove your own documents
         return user.profile.idCommon === doc.idCommon;
  },

  update: function (userId, doc, fields, modifier) {
      var user = Meteor.users.findOne(userId);
            // can only remove your own documents
            return user.idCommon === doc.idCommon;
  },

  remove: function (userId, doc) {
    var user = Meteor.users.findOne(userId);
      // can only remove your own documents
      return user.profile.idCommon === doc.idCommon;
  }


});


//Methods//

Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      sendEmail: function(email, subject, html) {
        Email.send({
          to: email,
          from: "Agraus Boas Vindas "+"hello@agraus.com",
          subject: subject,
          html: html
        });
      },
       createUserStartup: function(email, nome, idCommon, nivel) {
        if (this.userId) {
        var UserId = Accounts.createUser({email:email, password: "password", profile: { nome: nome, idCommon: idCommon, nivel: nivel }});
        Accounts.sendEnrollmentEmail(UserId);
      }
      },
      removeEverything: function() {
        if (this.userId) {
        var user = Meteor.users.findOne(this.userId);
        var Id = user._id;
        var Common = user.profile.idCommon;
        Rendas.remove({idCommon:Common});
        TipoRenda.remove({idCommon:Common});
        Pacientes.remove({idCommon:Common});
        Meteor.users.remove({"profile.idCommon":Common});
      }
      }


    });
  });

Meteor.startup(function () {

  process.env.MAIL_URL='smtp://email-noreply%40sedimently.com:allegu09@smtp.zoho.com:465/';

  Accounts.emailTemplates.siteName = "Agraus";
  Accounts.emailTemplates.from = "Agraus email system <email-noreply@sedimently.com>";
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
      return "Bem vindo ao aplicativo Agraus!";
  };
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
     return "Olá " + user.profile.nome + '!\n\n' + " Você foi selecionado para utilizar o novo aplicativo Agraus.\n\n" + "Acesse o link abaixo e crie uma senha\n" + url + "\n\n" + "Obrigado\n"+"Agraus" ;
  };
  Accounts.emailTemplates.resetPassword.subject = function (user) {
      return "Você pediu uma nova senha!";
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     return "Olá " + user.profile.nome + ".\n\n" + "Para modificar sua senha acesse o link abaixo:\n\n" + url + "\n\n" + "Obrigado\n"+"Agraus" ;
  };

  });
