Players = new Mongo.Collection 'players'

if Meteor.isClient
  Template.leaderboard.helpers
    players: () ->
      Players.find()

if Meteor.isServer
  Meteor.startup ()->
    if Players.find().count() is 0
      for i in [1..5]
        Players.insert {
          name: "Player#{i}"
          score: Math.floor(Math.random() * 10) * 5
        }