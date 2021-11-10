const router = require('express').Router();
const {Order, User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
    
    }); 
    const posts = postData.map((post) => post.get({ plain: true }));
  
    // console.log(posts)
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) 
  { console.log(err)
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{model: Comment, include: [User]}]
    });

    const post = postData.get({ plain: true });
    console.log(req.session.user_id);
    res.render('single-post', {
      post,
      user_id: req.session.user_id,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model:Order, include: [Post]}, { model: Comment, include: [Post]}],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update-comment/:id', withAuth, async (req,res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: Post }]
    });

    const comment = commentData.get({ plain: true });
    console.log(req.session.user_id);
    res.render('update-comment', {
      comment,
      // user_id: req.session.user_id,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;