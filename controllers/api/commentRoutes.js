const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route is /api/comments/
router.post('/', withAuth, async (req, res) => {
  try {
    const createComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(createComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/comments/id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      console.log(req.body);
    console.log('********** '+ updatedComment + " updated comment");
    if (updatedComment >0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// /api/comments/id
router.delete('/:id', withAuth, async (req, res) =>{
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router