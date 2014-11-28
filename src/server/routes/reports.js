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
      Purpose: Provides a set of reports pulled down from the active database that are accomapnied to a certain question type.

      Notes:   Resources provided
  */
  server.get('/reports/:id', function (req, res, next) {
      res.send(200);
  });




}
