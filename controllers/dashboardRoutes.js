const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// dashboard route to get all of a user's posts
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
      const posts = postData.map(post => post.get({ plain: true }));
      console.log(posts)
      res.render('dashboard', { 
        posts, 
        userName: req.session.name,
        loggedIn: true 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// dashboard route to edit post found by id
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
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
      if (postData) {
        const post = postData.get({ plain: true });
        
        res.render('editPost', {
          post,
          userName: req.session.name,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;