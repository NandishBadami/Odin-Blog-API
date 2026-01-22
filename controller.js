const { prisma } = require('./lib/prisma');
const jwt = require('jsonwebtoken');

async function index(req, res) {
    res.json(await prisma.post.findMany({
        where: {
            published: true
        },
        orderBy: {
            id: 'desc'
        },
        include: {
            comments: true,
        }
    }));
}

async function createPost(req, res) {
    if(tokenVerification(req)) {
        if((req.body.title).trim() == '') res.json({message: 'Error: Title should not be empty'});
        else {
            await prisma.post.create({
                data: {
                    title: req.body.title,
                    body: req.body.body,
                    userId: 1,
                    date: Date(),
                    published: req.body.publish
                }
            });
            res.json({message: 'Success: Post created successfully'});
        }
    } else res.json({message: 'Error: Not Authorized!'});
}

async function createComment(req, res) {
    if((req.body.name).trim() == '') {
        res.json({message: 'Error: Username should not be empty!'});
    } else if((req.body.text).trim() == '') res.json({message: 'Error: Comment should not be empty!'});
    else {
        await prisma.comment.create({
            data: {
                name: req.body.name,
                text: req.body.text,
                postId: req.body.postId,
                date: req.body.date
            }
        });
        res.json({message: 'Comment added successfully'});
    }
}

async function login(req, res) {
    if((req.body.username).trim() == '' || (req.body.password).trim() == '') res.json({error: 'Both fields are mandatory'});
    else {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });
        if(!user) res.json({error: 'Invalid Creadentials'});
        else jwt.sign({user}, 'secretkey', {expiresIn: '86400s'}, (err, token) => res.json({token}));
    }
}

function verifyToken(req, res) {
    if(tokenVerification(req)) res.json({message: 'Success'});
    else res.json({message: 'Error'});
}

function tokenVerification(req) {
    let verified = undefined;
    try {
        verified = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
    } catch(err) {}
    return verified;
}

async function unpublishedPosts(req, res) {
    res.json(await prisma.post.findMany({
        where: {
            published: false
        },
        include: {
            comments: true
        },
        orderBy: {
            id: 'desc'
        }
    }));
}

async function changeStatus(req, res) {
    const post = await prisma.post.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if(post && tokenVerification(req)) {
        if(post.published == true) {
            await prisma.post.update({
                where: {
                    id: post.id
                },
                data: {
                    published: false
                }
            });
            res.json({'message': 'Success'});
        } else if(post.published == false) {
            await prisma.post.update({
                where: {
                    id: post.id
                },
                data: {
                    published: true
                }
            });
            res.json({'message': 'Success'});
        }
    } else res.json({'message': 'Error'});
}

async function deletePost(req, res) {
    if(tokenVerification(req)) {
        const post = await prisma.post.findFirst({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(post) {
            await prisma.post.delete({
                where: {
                    id: post.id
                }
            });
            return res.json({'message': 'Success'});
        }
    }
    res.json({'message': 'Error'});
}

async function deleteComment(req, res) {
    if(tokenVerification(req)) {
        const comment = await prisma.comment.findFirst({
            where: {id: parseInt(req.params.id)}
        });
        if(comment) {
            await prisma.comment.delete({
                where: {id: comment.id}
            });
            return res.json({'message': 'Success'});
        }
    }
    res.json({'message': 'Error'});
}

module.exports = {
    index,
    createPost,
    createComment,
    login,
    verifyToken,
    unpublishedPosts,
    changeStatus,
    deletePost,
    deleteComment
}