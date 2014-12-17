Players = new Mongo.Collection 'players'

if Meteor.isClient
  Template.leaderboard.helpers
    players: () ->
      Players.find {},  { sort: { score: -1, name: 1 } }

    selectedName: ()->
      player = Players.findOne Session.get 'selectedPlayer'
      player?.name

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

    'click .inc': (event, template)->
      Players.update Session.get('selectedPlayer'), {$inc: {score: 5}}

  Template.player.helpers
    selected: ()->
      if Session.equals('selectedPlayer', this._id) then 'selected'

    name: ()->
      @name + "...."

  Template.player.events
    'click': () ->
      console.log @_id
      Session.set 'selectedPlayer', @_id

if Meteor.isServer
  Meteor.startup ()->
    if Players.find().count() is 0
      for i in [1..5]
        Players.insert {
          name: "Player#{i}"
          score: Math.floor(Math.random() * 10) * 5
        }