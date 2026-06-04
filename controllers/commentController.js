const Comment =
require("../models/Comment");

exports.createComment =
async(req,res)=>{

try{

const comment =
await Comment.create({

post:req.params.postId,

user:req.user,

text:req.body.text

});

res.status(201).json(comment);

}catch(error){

res.status(500).json({
message:error.message
});

}

};