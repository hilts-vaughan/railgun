/*
    Routing Resource:  /submissions/answers
                       /submissions/answers/:id

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/
module.exports = function(server) {


  /*
      Purpose: Provides a set of answers pulled down from the active database.

      Notes:   Resources provided
  */
  server.get('/submissions/answers', function (req, res, next) {
      var list = [];
      for(var i = 0; i < 100; i++) {
          list.push({
            "body": "42 doge",
            "title": "What is the answer to life and everything? mlp",
            "categoryId": 1,
            "postCount": 9001
          })
      }
      res.send(list);
  });


  /*
      Purpose:

      Notes:
  */
  server.get('/submissions/answers/:id', function (req, res, next) {
        var id = req.params.id;
        var list = {
          "body": "42 doge",
          "title": "What is the answer to life and everything?",
          "categoryId": 1,
          "postCount": 9001,
          "score": 95382647,
          "author": "Vaughan Doge King",
          "id": id
        }

      res.send(list);

  });



}
