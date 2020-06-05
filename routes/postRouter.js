const { Router } = require("express");
const postRouter = Router();
const { Post } = require("../models.js");
const { restrict } = require("../services/auth");

postRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (e) {
      res.json({ error: e.message });
    }
  })
  .post(restrict, async (req, res) => {
    try {
      const post = await Post.create({
        ...req.body,
        userId: res.locals.user.id
      });
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
    
  });

  
postRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
  })
  .delete(restrict, async (req, res) => {
    try {
      const post = await Post.destroy({ where: { id: req.params.id } });
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
  })
  .put(restrict, async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      await post.update(req.body);
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
  });
postRouter
  .route("/user/:userid")
  .get(async (req, res) => {
    try {
      const post = await Post.findAll({
        where: { userId: req.params.userid }
      });
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
  })
  .put(restrict, async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      await post.update(req.body);
      res.json(post);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

module.exports = postRouter;
