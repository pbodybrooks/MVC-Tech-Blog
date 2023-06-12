const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// get all posts to be shown on homepage
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });
//         const posts = postData.map((post) => post.get({ plain: true }));
//         res.render('homepage', {
//             posts,
//             loggedIn: req.session.loggedIn,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });
router.get('/', async (req, res) => {
    Post.findAll({
        include: [User],
    })
    .then((allPosts) => {
        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render("allPosts",  { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// get single post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                    loggedIn: req.session.loggedIn
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('singlePost', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;