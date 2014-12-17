players = new Mongo.Collection('players');

if (Meteor.isClient) {
	Template.leaderboard.helpers({
		players: function() {
			return players.find();
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		if (players.find().count() == 0) {
			var name = "MD";
			var score = 5;
			for (var i = 0; i < 5; i++) {
				players.insert({
					name: name.toString(),
					score: score.toString()
				})
				name += "D";
				score += 5;
			}
		}
	});
}
