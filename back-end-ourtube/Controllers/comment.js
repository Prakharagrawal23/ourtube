
const Comment = require('../Modals/comment');

exports.addComment = async (req, res) => {
    try {
        // please watch the video for the code
        let { video, message } = req.body;
        const comment = new Comment({ user: req.user._id, video, message })
        await comment.save();

        res.status(201).json({
            message:"Success",
            comment
        })
        // console.log(req.user)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.getCommentByVideoId = async(req,res)=>{
    try{
         // please watch the video for the code
        // console.log(req.params);
        let {videoId} = req.params;
        const comments = await Comment.find({video:videoId}).populate('user','channelName profilePic userName createdAt about');

        res.status(201).json({
            message:"Success",
            comments
        })
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}
