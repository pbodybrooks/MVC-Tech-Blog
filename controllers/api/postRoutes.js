const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'date',
    ],
    order: [['date', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id', 'date'],
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
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
        attributes: ['id', 'body', 'post_id', 'user_id', 'date'],
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
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new post
router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update an existing post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      body: req.body.body
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'Post not found!' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete an existing post
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
          },
      });
      res.status(200).json(postData);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;