const express = require('express');
const router = express.Router();
const { Posts } = require('../../models');

// @route    Post api/posts
// @desc     Create a post
// @access   Public
router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

// @route    Post api/posts
// @desc     Edit a post
// @access   Public
router.post('/:id', async (req, res) => {
  try {
    const Post = await Posts.findByPk(req.params.id);
    const id = req.params.id;
    const updatePost = {
      client: req.body.client,
      invoiceNumber: req.body.invoiceNumber,
      currency: req.body.currency,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
    };
    if (!Post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    await Posts.update(updatePost, { where: { id: id } });
    res.json({ msg: 'Post Updated' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route    Get api/posts
// @desc     Get All post
// @access   Public
router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(
    // return the values widhout date
    listOfPosts.map((el) => {
      let el1 = { ...el.dataValues };
      delete el1.createdAt;
      delete el1.updatedAt;
      return el1;
    })
  );
});

// @route    Get api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const Post = await Posts.findByPk(req.params.id);

    if (!Post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(Post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/posts/:id
// @desc     Delete post by ID
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    const delPost = await Posts.findByPk(req.params.id);

    if (!delPost) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await delPost.destroy();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    Delete api/posts
// @desc     Delete All posts
// @access   Public
router.delete('/', async (req, res) => {
  try {
    const AllPosts = await Posts.findAll();
    if (!AllPosts == AllPosts) {
      return res.status(404).json({ msg: 'Posts not found' });
    }
    await Posts.destroy({
      where: {},
    });
    res.json({ msg: 'Posts removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Posts not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
