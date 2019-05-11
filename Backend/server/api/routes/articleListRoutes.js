'use strict';
module.exports = function(app) {
  var articleList = require('../controllers/eventListController');
  var userHandlers = require('../controllers/userController');

  // articleList Routes
  app
  .route("/events")
  .get(articleList.listAllEvents)
  .post(articleList.createNewArticle);

  app
  .route("/event/:eventid")
  .get(articleList.readArticle)
  .patch(articleList.updateArticle)

  app
    .route("/lists")
    .get(articleList.listAllLists)


//   .delete(articleList.deleteArticle);

//   app
//   .route("/articles/by/:tag")
//   .get(articleList.listTagArticles);

//   app
//   .route("/auth/register")
//   .post(userHandlers.register);

//   app
//   .route("/auth/sign_in")
//   .post(userHandlers.signIn);

};