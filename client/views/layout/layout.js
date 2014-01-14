Template.layout.helpers({
  userAdmin: function () {
    var user = Meteor.user();
    var emailAdmin = (user.emails && user.emails[0] && user.emails[0].address);
    if (isAdmin(emailAdmin)) {
      return true;
    } else {
      return false;
    }
  },
  adminNivel: function(){
    if (Meteor.user().profile.nivel === 'administrador') {
      return true;
    } else {
      return false;
    }
  }
});

Template.layout.events({
  'click .goOut': function (event, template) {
    NProgress.start();
    Meteor.logout();
    NProgress.done();
    location.reload();
    Router.go('/');
    return true;
  },
  'click #menu-mobile': function (event, template) {
   if ( $("#top-navigation ul").is(":visible") ) {
         $("#top-navigation ul").slideUp(500);
         $('#menu-mobile').removeClass('active');
     } else {
         $("#top-navigation ul").slideDown(500);
         $('#menu-mobile').addClass('active');
     }
  },
  'click .Inscription': function (event, template) {
    var pathArray = window.location.pathname.split( '/' );
    if (pathArray[1] === 'signin') {
      Router.go('/');
    }else{
    // 'catTopPosition' is the amount of pixels #cat
          // is from the top of the document
            var catTopPosition = $('.inscription').offset().top;
          // When #scroll is clicked
          // Scroll down to 'catTopPosition'
              $('html, body').animate({scrollTop:catTopPosition}, 'easeInOutExpo');
          // Stop the link from acting like a normal anchor link
        }
        event.preventDefault();
  },
});
