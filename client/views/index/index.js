Template.index.rendered = function () {

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

});

Template.index.helpers({
  forgotIt: function () {
    return Session.get('forgotIt');
  },
  resetPassword: function() {
    return Session.get('resetPassword');
  }
});

//Token---------------------------------------------

  if (Accounts._resetPasswordToken) {
      Session.set('resetPassword', Accounts._resetPasswordToken);
    }
