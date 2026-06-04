const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {
createComment
}
=
require(
"../controllers/commentController"
);

router.post(
"/:postId",
protect,
createComment
);

module.exports =
router;