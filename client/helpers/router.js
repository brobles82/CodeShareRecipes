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

  clearTag: function () {
    Session.set('currentPostTag', null);
  },

  clearAuthor: function () {
    Session.set('currentPostAuthor',null);
  },

  clearErrors: function() {
    Errors.remove({seen: true});
  },

  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.render('login');
      this.stop(); 
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
  Router.before(filters.nProgressHook, {except:[]});
  Router.before(filters.isLoggedIn, {only: ['postSubmit']});
  Router.before(filters.clearAuthor, {except: ['postAuthor']});
  Router.before(filters.clearTag, {except: ['postTag']});
  Router.after(filters.resetScroll, {except:[]});
  Router.before(function() { clearErrors() });
}

PostsAuthorController = FastRender.RouteController.extend({
  template: 'postAuthor',
  waitOn: function () {
      Session.set('currentPostAuthor', this.params.author);
    return [
      Meteor.subscribe('authorPosts', this.params.author, 10)
    ];
  },
  data: function () {
    return authorHandle = Meteor.subscribeWithPagination('authorPosts', this.params.author, 10);
  }
});

PostsTagController = FastRender.RouteController.extend({
  template: 'postTag',
  waitOn: function () {
    Session.set('currentPostTag',this.params.tag);
    return Meteor.subscribe('tagPosts', this.params.tag, 10);
  },

  data: function () {
    return tagHandle = Meteor.subscribeWithPagination('tagPosts', this.params.tag, 10);
  }
});

PostController = FastRender.RouteController.extend({
  template: 'postDetails',
  waitOn: function () {
    return [
      Meteor.subscribe('singePost',this.params.slug),
      Meteor.subscribe('comments', this.params.slug)
    ];

  },
  data: function () {
    return post = Posts.findOne({slug: this.params.slug});
  }
});

Router.map(function() {
  this.route('home', {path: '/', fastRender: true});
  this.route('about', {path: '/about', fastRender: true});
  this.route('features', {path: '/features', fastRender: true});
  this.route('search', {path: '/search', fastRender: true});
  this.route('postSubmit', {path: '/submit', fastRender: true});
  this.route('newPosts', {path: '/coderecipe/last', fastRender: true});
  this.route('bestPosts', {path: '/coderecipe/top', fastRender: true});
  this.route('login',{path: '/login', fastRender:true});

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

if(Meteor.isServer) {
  FastRender.onAllRoutes(function() {
    this.subscribe('notifications');
  });
}
