API DOCUMENTATION
=================

Adding a question:

	
	* Send a POST (https://docs.angularjs.org/api/ng/service/$http) with a JSON piece of data with the data you want stored in the database.	
	Send to: /submissions/questions

	You can send the following properties:

	body   : String
    title   : String,
    categoryId : Number

    The server will take care of the rest. For example, send up a JavaScript object like so:

    var question = {
    	title: "Who's best girl?"
    	body: "Akemi Homura",
    	categoryId: 0
    };

    Send a posting to the endpoint provided