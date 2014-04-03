Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

var filters = {

  nProgressHook: function () {
    if (this.ready()) {
      NProgress.done(); 
    } else {
      NProgress.start();
     this.stop();
   }
  },

  clearErrors: function() {
    Errors.remove({seen: true});
  },

  resetScroll: function () {
    Meteor.subscribe('notifications')
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  },
  
  isLoggedIn : function(pause) {
    if (! Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loading);
      else
        this.render('login');
      
      pause();
    }
  },

  isLoggedOut: function() {
    if(Meteor.user()){
      this.render('already_logged_in');
      this.stop();
    }
  }
}

if(Meteor.isClient){
  Router.onBeforeAction (filters.nProgressHook, {except:[]});
  Router.onBeforeAction (filters.isLoggedIn, {only: ['postSubmit']});
  Router.onAfterAction (filters.resetScroll, {except:[]});
  Router.onBeforeAction (function() { clearErrors() });
}

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: HomeController
  });

  this.route('about', {
    path: '/about',
    controller: AboutController
  });

  this.route('features', {
    path: '/features',
    controller: FeaturesController
  });

  this.route('search', {
    path: '/search/:query',
    controller: SearchController
  });

  this.route('postSubmit', {
    path: '/submit',
    controller: PostSubmitController
  });

  this.route('newPosts', {
    path: '/coderecipe/last',
    controller: NewPostsController
  });

  this.route('bestPosts', {
    path: '/coderecipe/top',
    controller: BestPostsController
  });

  this.route('login', {
    path: '/login',
    controller: LoginController
  });

  this.route('postAuthor', {
    path: '/coderecipe/author/:author',
    controller: PostsAuthorController
  });

  this.route('postTag', {
    path: '/coderecipe/tag/:tag',
    controller: PostsTagController
  });

  this.route('postDetails', {
    path: '/coderecipe/:slug',
    controller: PostController
  });
});
