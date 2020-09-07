const { User, Post, Comment } = require("./models");

const seed = async () => {
  await User.destroy({ where: {} });
  await Post.destroy({ where: {} });
  await Comment.destroy({ where: {} });

  const admin = await User.create({
    username: "admin",
    password_digest:
      "$2b$11$XMmtqpO0QIrgOdGcIwr0UOVPueNHUbPAhVRwSNdx0FTao6L4pI15.",
    email: "admin@admin.com",
  });

  await admin;

  process.exit();
};

seed();
