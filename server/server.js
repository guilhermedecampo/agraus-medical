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

Meteor.publish('laudos', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  var filial = user.profile.filial;
  if (isAdmin(email)) {
    return Laudos.find({});
  } else {
    return Laudos.find({pertenceFilial: filial});
  }
  } else {
    this.ready();
  }
});

Meteor.publish('filiais', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  if (isAdmin(email)) {
    return Filiais.find({});
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
               nivel: 'administrador'
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
    this.ready();
  }
  } else {
    this.ready();
  }
});

Meteor.publish('changeEmail', function () {
  if (this.userId) {
  return Meteor.users.find({},{fields:{profile:false}});
  }
});

Meteor.users.allow({

  update: function (userId) {
    // can only change your own info
        return true;
  },

  remove:function() {
    // can only delete your own info
        return true;
    },
});


//Permissions//
Laudos.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
        return true;
  },

  update: function (userId, doc, fields, modifier) {
      return true;
  },

  remove: function (userId, doc) {
      // can only remove your own documents
         return true;
  }


});

Filiais.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
        return true;
  },

  update: function (userId, doc, fields, modifier) {
      return true;
  },

  remove: function (userId, doc) {
      // can only remove your own documents
         return true;
  }


});


//Methods//

Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      sendEmailChangeStatus: function(email, subject, html) {
        Email.send({
          to: email,
          from: "Cleanio Order System "+"order@getcleanio.com",
          subject: subject,
          html: html
        });
      },
      emailTest: function(val) {
        if (this.userId) {
            var emailVal = Meteor.users.findOne({'emails.address': {$regex:val,$options:'i'}});
            if ( emailVal === undefined) {
              return true;
            } else {
              return false;
            }
        }
      },
       createUserStartup: function(email, nome, filial, nivel) {
        if (this.userId) {
        var UserId = Accounts.createUser({email:email, password: "password", profile: { nome: nome , filial: filial, nivel: nivel }});
        Accounts.sendEnrollmentEmail(UserId);
      }
      },


    });
  });

Meteor.startup(function () {

  process.env.MAIL_URL='smtp://email-noreply%40sedimently.com:allegu09@smtp.zoho.com:465/';

  Accounts.emailTemplates.siteName = "Ambiental";
  Accounts.emailTemplates.from = "Ambiental email system <email-noreply@sedimently.com>";
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
      return "Bem vindo ao aplicativo da Ambiental!";
  };
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
     return "Olá " + user.profile.nome + '!\n\n' + " Você foi selecionado para utilizar o novo aplicativo da Ambiental.\n\n" + "Acesse o link abaixo e crie uma senha\n" + url + "\n\n" + "Obrigado\n"+"Ambiental" ;
  };
  Accounts.emailTemplates.resetPassword.subject = function (user) {
      return "Você pediu uma nova senha!";
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     return "Olá " + user.profile.nome + ".\n\n" + "Para modificar sua senha acesse o link abaixo:\n\n" + url + "\n\n" + "Obrigado\n"+"Ambiental" ;
  };

  });
