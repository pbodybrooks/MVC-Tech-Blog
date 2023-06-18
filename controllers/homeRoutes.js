const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// get all posts to be shown on homepage without needing to be logged in
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'date',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'date', 'user_id', 'post_id'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      // const userName = req.session.name;

      res.render('homepage', {
        posts,
        userName: req.session.name,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'body',
        'date',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'date', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'Post not found!' });
          return;
        }
  
        const post = postData.get({ plain: true });
  
        res.render('singlePost', {
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// register route, if logged in redirect to homepage/dashboard
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;