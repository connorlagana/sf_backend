const { Router } = require("express");
const commentRouter = Router();
const { Comment } = require("../models.js");
const { restrict } = require("../services/auth");

commentRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const comment = await Comment.findAll();
      res.json(comment);
    } catch (e) {
      res.json({ error: e.message });
    }
  })
  .post(restrict, async (req, res) => {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: res.locals.user.id,
      });
      res.json(comment);
    } catch (e) {
      console.log(e);
    }
  });

commentRouter.route("/allComments/:id").get(async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      where: {
        postId: req.params.id,
      },
    });
    res.json(comment);
  } catch (e) {
    res.json({ error: e.message });
  }
});

commentRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      res.json(comment);
    } catch (e) {
      res.json({ error: e.message });
    }
  })

  .put(restrict, async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      await comment.update(req.body);
      res.json(comment);
    } catch (e) {
      res.json({ error: e.message });
    }
  })

  .delete(restrict, async (req, res, next) => {
    try {
      const comment = await Comment.destroy({ where: { id: req.params.id } });
      res.json(comment);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

module.exports = commentRouter;
