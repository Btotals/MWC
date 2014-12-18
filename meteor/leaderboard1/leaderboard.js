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
		},
		selectedName: function() {
			var player = players.findOne(Session.get('selectedPlayer'));
			return player != null ? player.name : void 0;
		}
	});

	Template.leaderboard.events({
		'submit .new-player': function(event, template) {
			var input = $(event.target).find('input');
			var playerName = input.val();
			players.insert({
				name: playerName,
				score: Math.floor(Math.random() * 10) *5
			});
		},

		'click .inc': function() {
			return players.update(Session.get('selectedPlayer'), {
				$inc: {
					score: 5
				}
			});
		}
	});

	Template.player.helpers({
		selected: function() {
			if (Session.equals('selectedPlayer', this._id)) {
				return 'selected';
			}
		}
	});

	Template.player.events({
		'click' : function() {
			Session.set('selectedPlayer', this._id);
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
