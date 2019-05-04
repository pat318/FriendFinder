// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {
	

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// post a new friend and use req.body to get the info - put it into a variable to do something with it
	app.post('/api/friends', function(req, res) {
		var userInput = req.body;

		var userResponses = userInput.scores;
		//set up a new var that equals the scores of the new friend

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; 

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};
