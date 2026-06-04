const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
try {
const post = await Post.create({
user: req.user,
content: req.body.content
});

```
const populatedPost = await Post.findById(post._id)
  .populate("user", "username");

res.status(201).json(populatedPost);
```

} catch (error) {
res.status(500).json({
message: error.message
});
}
};

// Get All Posts
exports.getPosts = async (req, res) => {
try {
const posts = await Post.find()
.populate("user", "username")
.sort({ createdAt: -1 });

```
res.status(200).json(posts);
```

} catch (error) {
res.status(500).json({
message: error.message
});
}
};

// Like Post
exports.likePost = async (req, res) => {
try {

```
const post = await Post.findById(req.params.id);

if (!post) {
  return res.status(404).json({
    message: "Post Not Found"
  });
}

const alreadyLiked = post.likes.some(
  like => like.toString() === req.user.toString()
);

if (alreadyLiked) {
  return res.status(400).json({
    message: "Already Liked"
  });
}

post.likes.push(req.user);

await post.save();

res.status(200).json({
  message: "Post Liked",
  likes: post.likes.length
});
```

} catch (error) {
res.status(500).json({
message: error.message
});
}
};

// Delete Post
exports.deletePost = async (req, res) => {
try {

```
const post = await Post.findById(req.params.id);

if (!post) {
  return res.status(404).json({
    message: "Post Not Found"
  });
}

if (post.user.toString() !== req.user.toString()) {
  return res.status(403).json({
    message: "Unauthorized"
  });
}

await post.deleteOne();

res.status(200).json({
  message: "Post Deleted"
});
```

} catch (error) {
res.status(500).json({
message: error.message
});
}
};
