players = new Mongo.Collection('players');

if (Meteor.isClient) {
	Template.leaderboard.helpers({
		players: function() {
			return players.find({}, {
				sort: {
					score: -1,
					name: 1
				}
			});
			console.log(players.find());
		}
	});

	Template.leaderboard.events({
		'submit .new-player': function(event, template) {
			var input = event.target.find('input');
		}
	})
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		if (players.find().count() == 0) {
			var name = "MD";
			for (var i = 0; i < 5; i++) {
				players.insert({
					name: name.toString(),
					score: Math.floor(Math.random() * 10) * 5
				})
				name += "D";
			}
		}
	});
}
