const { Router } = require('express');
const controller = require('./controller');

const route = Router();

route.get('/', controller.index);
route.post('/createPost', controller.createPost);
route.post('/createComment', controller.createComment);
route.post('/login', controller.login);
route.get('/verifyToken', controller.verifyToken);
route.get('/unpublishedPosts', controller.unpublishedPosts);
route.get('/changeStatus/:id', controller.changeStatus);
route.get('/deletePost/:id', controller.deletePost);
route.get('/deleteComment/:id', controller.deleteComment);

module.exports = route;