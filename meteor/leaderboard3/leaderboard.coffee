Players = new Mongo.Collection 'players'

if Meteor.isClient
  Template.leaderboard.helpers
    players: () ->
      console.log 'players'
      Players.find {},  { sort: { score: -1, name: 1 } }

  Template.leaderboard.events
    'submit .new-player': (event, template) ->
      event.preventDefault()
      $input = $(event.target).find('input')

      player = $input.val()

      Players.insert {
        name: player
        score: Math.floor(Math.random() * 10) * 5
      }

      $input.val('')

if Meteor.isServer
  Meteor.startup ()->
    if Players.find().count() is 0
      for i in [1..5]
        Players.insert {
          name: "Player#{i}"
          score: Math.floor(Math.random() * 10) * 5
        }