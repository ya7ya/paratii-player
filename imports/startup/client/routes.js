import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// Import needed templates
import '/imports/ui/pages/about/about.js'
import '/imports/ui/layouts/body/body.js'
import '/imports/ui/pages/debug/debug.js'
import '/imports/ui/pages/home/home.js'
import '/imports/ui/pages/playlists/playlists.js'
import '/imports/ui/pages/player/player.js'
import '/imports/ui/pages/profile/profile.js'
import '/imports/ui/pages/myvideos/myvideos.js'
import '/imports/ui/pages/not-found/not-found.js'
import '/imports/ui/pages/transactions/transactions.js'
import '/imports/ui/pages/trendingCauses/trendingCauses.js'
import '/imports/ui/pages/upload/upload.js'
import '/imports/ui/pages/wanderlust/wanderlust.js'

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action () {
    BlazeLayout.render('App_body', { main: 'profile' })
  }
})

FlowRouter.route('/about', {
  name: 'about',
  action () {
    BlazeLayout.render('App_body', { main: 'about' })
  }
})

FlowRouter.route('/myvideos', {
  name: 'myvideos',
  action () {
    BlazeLayout.render('App_body', { main: 'myvideos' })
  }
})

FlowRouter.route('/playlists', {
  name: 'playlists',
  action () {
    BlazeLayout.render('App_body', { main: 'playlists' })
  }
})

FlowRouter.route('/playlists/:_id', {
  name: 'playlists',
  action () {
    BlazeLayout.render('App_body', { main: 'playlists' })
  }
})

FlowRouter.route('/profile', {
  name: 'profile',
  action () {
    BlazeLayout.render('App_body', { main: 'profile' })
  }
})

FlowRouter.route('/transactions', {
  name: 'transactions',
  action () {
    BlazeLayout.render('App_body', { main: 'transactions' })
  }
})

FlowRouter.route('/trendingCauses', {
  name: 'trendingCauses',
  action () {
    BlazeLayout.render('App_body', { main: 'trendingCauses' })
  }
})

FlowRouter.route('/upload', {
  name: 'upload',
  action () {
    BlazeLayout.render('App_body', { main: 'upload' })
  }
})

FlowRouter.route('/wanderlust', {
  name: 'wanderlust',
  action () {
    BlazeLayout.render('App_body', { main: 'wanderlust' })
  }
})

FlowRouter.route('/player/:_id', {
  name: 'player',
  action () {
    BlazeLayout.render('App_body', { main: 'player' })
  }
})

FlowRouter.route('/debug', {
  name: 'debug',
  action () {
    BlazeLayout.render('App_body', { main: 'debug' })
  }
})

FlowRouter.notFound = {
  action () {
    BlazeLayout.render('App_body', { main: 'App_notFound' })
  }
}
