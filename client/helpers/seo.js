Meteor.startup(function() {
  return SEO.config({
    title: 'CodeShareRecipes - Improve your learning, share your knowledge',
    meta: [
      {
        key: 'description',
        value: 'CodeShareRecipes - Improve your learning and share your knowledge'
      }
    ],
    og: [
      {
        key: 'image',
        value: 'http://cl.ly/image/3r2J1r2Z2T0S/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
      }
    ]
  });
});


SeoCollection.insert({
  route_name: 'home',
  title: 'Home - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning share your knowledge'
    }
  ]
});


SeoCollection.insert({
  route_name: 'about',
  title: 'About - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - About Code share recipes, feel free to share your knowledge with others andhelp build complex code examples'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});


SeoCollection.insert({
  route_name: 'features',
  title: 'Features - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Our features,markdown editor, auto inset jsbin examples, realtiem updates, notifications on your recipes'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});

SeoCollection.insert({
  route_name: 'search',
  title: 'Search - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Search for the best code recipes examples and tutorials'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});

SeoCollection.insert({
  route_name: 'postSubmit',
  title: 'Create your recipes - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Submit your new code recipe tutorial'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});

SeoCollection.insert({
  route_name: 'newPosts',
  title: 'Last code recipes - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Last code recipe tutorials submited'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});

SeoCollection.insert({
  route_name: 'bestPosts',
  title: 'Top code recipe tutorial recipes - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Top voted code recipe tutorials'
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});

SeoCollection.insert({
  route_name: 'login',
  title: 'Login - CodeShareRecipes',
  meta: [
    {
      key: 'description',
      value: 'CodeShareRecipes - Register or signup for start coding your code tutorial recipes' 
    }
  ],
  og: [
    {
      key: 'title',
      value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
    },
    {
      key: 'image',
      value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
    }
  ]
});
