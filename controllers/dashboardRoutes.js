const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// dashboard route to get all posts
router.get('/', withAuth, async (req, res) => {
    // try {
    //     const postData = await Post.findAll({
    //         where: {
    //             user_id: req.session.user_id,
    //         },
    //     });
    //     const posts = postData.map((post) => post.get({ plain: true }));
    //     res.render('dashboard', {
    //         posts,
    //         loggedIn: req.session.loggedIn,
    //     });
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
    })
    .then((allPosts) => {
        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render("userPosts",  {
            layout: 'dashboard', 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});


// dashboard route to get new post
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            layout: 'dashboard',
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// dashboard route to edit post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;