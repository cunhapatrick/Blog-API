import handle from 'express-async-handler'
import authMiddleware from './app/middlewares/auth'
import controllers from './app/controllers'

// app = express
module.exports = app => {

  /**
   * Authors
   */

  app.route('/authors')
      .get(handle(controllers.AuthorController.index))
      .post(handle(controllers.AuthorController.store))

  app.route('/authors/:id')
      .get(handle(controllers.AuthorController.show))
      .put(handle(controllers.AuthorController.update))
      .delete(handle(controllers.AuthorController.destroy))

  /**
   * Session
   */

  app.post('/sessions',handle(controllers.SessionController.store))

  /*
  * Article
  */

  app.route('/articles')
    .get(handle(controllers.ArticleController.index))
    .post(handle(controllers.ArticleController.store))

  app.route('/articles/:id')
    .get(handle(controllers.ArticleController.show))
    .put(handle(controllers.ArticleController.update))
    .delete(handle(controllers.ArticleController.destroy))

  /*
  * Comment
  */


  app.route('/comments')
    .get(handle(controllers.CommentController.index))
    .post(handle(controllers.CommentController.store))

  app.route('/comments/:id')
    .get(handle(controllers.CommentController.show))
    .put(handle(controllers.CommentController.update))
    .delete(authMiddleware,handle(controllers.CommentController.destroy))
}
