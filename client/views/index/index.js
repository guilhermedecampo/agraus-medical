Template.index.created = function () {
  Session.set('signUp', false);
};


// Information of login.js file

function onLogin(err){
  if (err) {
    humane.log('Erro - ' + err.reason);
    return false;
  } else {
    Router.go('/inserir');
  }
}

Template.index.events({

  'click #submitSignIn': function (event, template) {
    event.preventDefault();
      var userEmail     = trimInput(template.find('#emailSignIn').value.toLowerCase()),
          userPassword  = template.find('#passwordSignIn').value;
      if (isNotEmpty(userEmail, 'loginError')&& isNotEmpty(userPassword, 'loginError'))
      {
        NProgress.start();
      Meteor.loginWithPassword(userEmail, userPassword, function (err) {
          onLogin(err);
        NProgress.done();
      });
      }
    return false;
  },
  'click .home': function (event, template)  {
    Router.go('/');
    location.reload();
  },
  'click #submitForgot': function (event, template)  {
    Session.set('forgotIt', true);
  },
  'click #cancelEmail': function (event, template)  {
    Session.set('forgotIt', false);
  },
  'click #sendForgotten': function (event, template) {
    var emailForgot = trimInput(template.find('#emailForgot').value);
    Accounts.forgotPassword({email: emailForgot}, function(err) {
      if (err) {
        console.log('Password Reset Error - ' + err.reason);
      } else {
        Session.set("forgotIt", false);
        humane.log("Um link para recuperação de senha foi mandando para seu e-mail!");
      }
    });
    },
    'click #reset': function (event, template) {
      var password = template.find('#passwordReset').value;
            if (isNotEmpty(password) && isValidPassword(password)) {
              Accounts.resetPassword(Session.get('resetPassword'), password, function(err){
                if (err)
                  console.log('Password Reset Error - '+ err.reason);
                else {
                  Session.set("forgotIt", false);
                  Session.set('resetPassword', false);
                  Router.go('/orders');
                  console.log('Password reseted thanks!');
                }
              });
            }
          return false;
    },
    'click #signUp': function (event, template) {
      Session.set('signUp', true);
    },
    'click #submitSignUp': function (event, template) {
      event.preventDefault();
        var
        userNameUp      = template.find('#nameSignUp').value,
        userEmailUp     = trimInput(template.find('#emailSignUp').value.toLowerCase()),
        userPasswordUp  = template.find('#passwordSignUp').value;
        if (isNotEmpty(userEmailUp)&& isNotEmpty(userPasswordUp)&& isNotEmpty(userNameUp))
        {
            NProgress.start();
            Accounts.createUser({
              email:    userEmailUp,
              password: userPasswordUp,
              profile: {
                nome:userNameUp,
                nivel: 'administrador',
                idCommon: Random.id(),
              }}, function (err) {
                if (err && err.error === 403) {
                  console.log(err.reason);
                  if (err.reason === "Email already exists.") {
                    humane.log('Descupe, esse email já existe!');
                  }
                  } else {
                  var subject = 'Bem vindo a Agraus!';
                  var html = "<p>Olá " + userNameUp + ",</br></p>" +"<p>Agradecemos por utilizar nosso serviço de gerenciamento de rendas médicas!</p>" + "<p>Sabemos o quanto é complicado saber exatamente quando e de onde vem a renda. Consultas particulares, convênios, cirurgias...</p>" + "<p>Nós da Agraus sentimos essa necessidade e desenvolvemos esse produto.</p>"+"<p>Adicione sua secretária com nível de acesso para somente inserir dados e veja relatórios, gráficos em tempo real. </p>" + "<p>Um abraço,</br>Equipe Agraus.</p>";
                  Meteor.apply('sendEmail', [userEmailUp, subject, html]);
                  Router.go('/inserir');
                  document.body.scrollTop = 0;
                  mixpanel.identify(Random.id());
                  mixpanel.people.set({
                      "Signup date": moment().format("MMM Do YY - h:mm a"),
                      "$email": userEmailUp,
                      "Nome": userNameUp,
                  });
                  mixpanel.track("Clicou em cadastrar", {
                    "user": userEmailUp,
                  });

                  }
              });
            NProgress.done();
          }
        },


});

Template.index.helpers({
  forgotIt: function () {
    return Session.get('forgotIt');
  },
  signUp: function () {
    return Session.get('signUp');
  },
  resetPassword: function() {
    return Session.get('resetPassword');
  }
});

//Token---------------------------------------------

  if (Accounts._resetPasswordToken) {
      Session.set('resetPassword', Accounts._resetPasswordToken);
    }
