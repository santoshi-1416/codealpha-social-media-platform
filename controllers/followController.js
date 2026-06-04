// Like Post

exports.likePost = async (req, res) => {

try {

const post = await Post.findById(
req.params.id
);

if(!post){
return res.status(404).json({
message:"Post Not Found"
});
}

if(
post.likes.includes(req.user)
){
return res.status(400).json({
message:"Already Liked"
});
}

post.likes.push(req.user);

await post.save();

res.json({
message:"Post Liked",
likes:post.likes.length
});

} catch(error){

res.status(500).json({
message:error.message
});

}

};