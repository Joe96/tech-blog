const router = require('express').Router();
const {User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
    include:[User]
    }); 
    const posts = postData.map((post) => post.get({ plain: true }));
  
    //console.log(posts)
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
// withAuth,
router.get('/profile', async (req, res) => {
  console.log(req.session.user_id);
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where:{
        user_id: req.session.user_id

    }, include: [{model:Comment}],
    });
    
    
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(post)
    res.render('profile', {
      posts,
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