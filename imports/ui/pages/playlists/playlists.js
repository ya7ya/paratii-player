  import { Template } from 'meteor/templating'
  import { formatNumber, showModal } from '/imports/lib/utils.js'
  import { Videos } from '../../../../imports/api/videos.js'
  import { Playlists } from '../../../../imports/api/playlists.js'
  import { getUserPTIAddress } from '/imports/api/users.js'
  import '/imports/ui/components/internals/internalsHeader.js'
  import '/imports/ui/components/modals/playlist.js'
  import '/imports/ui/components/buttons/settingsButton.js'
  import './playlists.html'

  Template.playlists.onCreated(function () {
    this.lockeds = new ReactiveDict()
    Meteor.subscribe('playlists')
  // autorun this when the playlist changes
    this.autorun(() => {
    // subscribe to videos of the current playlist
      Meteor.subscribe('videosPlaylist', FlowRouter.getParam('_id'), () => {
        const playlist = Playlists.findOne({ _id: getCurrentPlaylistId() })
        const videosId = playlist.videos
      // for each video of the playlist checks if the user bought it
        videosId.forEach((id) => {
          Meteor.call('videos.isLocked', id, getUserPTIAddress(), (err, result) => {
            if (err) {
              throw err
            }
            this.lockeds.set(id, result)
          })
        })
      })
    })
  })

  function getCurrentPlaylistId () {
    let playlistID = FlowRouter.getParam('_id')
    if (playlistID === undefined && Playlists.find().fetch().length > 0) {
      playlistID = Playlists.find().fetch()[0]._id
    }
    return playlistID
  }

  Template.playlists.helpers({
    playlists () {
      const playlists = Playlists.find()
      return playlists
    },
    playlistCounter (playlist) {
      return playlist.videos.length
    },
    videos () {
      if (Playlists.find().fetch().length > 0) {
        if (FlowRouter.getParam('_id')) {
          const playlist = Playlists.findOne({ _id: getCurrentPlaylistId() })
          const videosIds = playlist.videos
          const videos = Videos.find({ _id: { '$in': videosIds } })

          return videos
        }
      }
    },
    isLocked (video) {
    // console.log('locked' + video._id, Template.instance().lockeds.get(video._id))
      return Template.instance().lockeds.get(video._id)
    },
    hasPrice (video) {
      return video && video.price && video.price > 0
    },
    formatNumber (number) {
      return formatNumber(number)
    },
    currentPlaylistDesc () {
      if (Playlists.find().fetch().length > 0) {
        const playlist = Playlists.findOne({ _id: getCurrentPlaylistId() })
        return playlist.description
      }
    },
    videoPath (video) {
      const pathDef = 'player'
      const params = { _id: video._id }
      const queryParams = { playlist: getCurrentPlaylistId() }
      const path = FlowRouter.path(pathDef, params, queryParams)
      return path
    },
    getTitle () {
      if (FlowRouter.getParam('_id')) {
        if (Playlists.find().fetch().length > 0) {
          const playlist = Playlists.findOne({ _id: getCurrentPlaylistId() })
          return playlist.title
        }
      } else {
        return 'Playlists'
      }
    },
    getBackButton () {
      return (FlowRouter.getParam('_id'))
    },
    addSettingsButton () {
      return 'settingsButton'
    },
    getThumbTitle (title) {
      let videoTitle = title
      if (videoTitle.length > 30) {
        videoTitle = videoTitle.substring(0, 30)
      }
      return videoTitle
    }
  })

  Template.playlists.events({
    'click .playlistSel' (event) {
      Meteor.subscribe('videosPlaylist', FlowRouter.getParam('_id'))
    },
    'click #button-create-playlist' () {
      showModal('modal_playlist', {
        type: 'create'
      })
    },
    'click button.thumbs-list-settings' (event, instance) {
      $(event.currentTarget).closest('.thumbs-list-item').toggleClass('active')
    }
  })
