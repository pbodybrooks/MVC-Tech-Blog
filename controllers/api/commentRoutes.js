const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
  Comment.create({
    body: req.body.body,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });}
});

// update an existing comment by id
router.put('/:id', withAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.body,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'Comment not found!' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DESTROY a comment by id
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'Comment not found!' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;