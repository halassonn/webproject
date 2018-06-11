var Post = require('../models/postModel');

module.exports = {
    index: async (req, res, next) => {
        const posts = await Post.find({});
        res.status(200).json(posts);
    },
    newPost: async (req, res, next) => {
       /* let newPost = new Post({
            title: req.body.title,
            createat: new Date(),
            status: false
        }); */
        // console.log(newPost);

        let newPost = new Post(
            req.value.body
        )

        const postExists = await Post.findOne({
            "title": newPost.title
        });
        if (postExists) {
            return res.status(403).json({
                error: 'Posting' + newPost.title + 'is Exists'
            });
        }
        const post = await newPost.save();
        res.status(201).json({
            id: post._id
        })
    },
    getPost: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    },
    replacePost: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const newPost = req.value.body;
        const result = await Post.findByIdAndUpdate(id, newPost);
        res.status(200).json({
            success: true
        });
    },
    deletePost: async (req, res, next) => {
        const {
            id
        } = req.value.params;
        const post = await Post.findById(id);
        if (post) {
            await post.remove();
            res.status(200).json({
                success: true
            })
        }
    },
    updatePost: async (req, res, next) => {
        //req.body  may content any number of fields
        const {
            id
        } = req.value.params;
        const newPost = req.value.body;
        const result = await Menu.findByIdAndUpdate(id, newPost);
        res.status(200).json({
            success: true
        });
    },



}