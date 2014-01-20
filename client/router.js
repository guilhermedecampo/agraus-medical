Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {


  this.route('index', {path: '/',
    before: function () {
      document.body.scrollTop = 0;
      if (Meteor.user()) {
        this.redirect('/inserir');
      }
    }
  });


  this.route('inserir', {path: '/inserir',
    after: function () {
      document.body.scrollTop = 0;

    },
    before: function () {
          if (!Meteor.user()) {
            // render the login template but keep the url in the browser the same
            this.redirect('/');
          }
        },
});

  this.route('rendas', {path: '/rendas',
      after: function () {
        document.body.scrollTop = 0;

      },
      before: function () {
            if (!Meteor.user()) {
              // render the login template but keep the url in the browser the same
              this.redirect('/');
            }
          },
  });

  this.route('configuracoes', {path: '/configuracoes',
    after: function () {
      document.body.scrollTop = 0;
    },
    before: function () {
      if (Meteor.user()) {
      var user = Meteor.user();
      var nivel = user.profile.nivel;
      if (nivel === "administrador") {
      } else {
        this.redirect('/inserir');
      }
      }
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        this.redirect('/');
      }
    },
});

  this.route('relatorios', {path: '/relatorios',

    before: function () {
      if (Meteor.user()) {
      var user = Meteor.user();
      var nivel = user.profile.nivel;
      if (nivel === "administrador") {
      } else {
        this.redirect('/inserir');
      }
      }
      document.body.scrollTop = 0;
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        this.redirect('/');
      }
      }
  });

  this.route('index', {path: '/*',
    before: function () {
      if (Meteor.user()) {
        this.redirect('/inserir');
      }
    }
});
});


