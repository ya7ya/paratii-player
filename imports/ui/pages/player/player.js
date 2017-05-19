/* eslint no-console: "off" */
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { sprintf } from 'meteor/sgi:sprintfjs';

import { Videos } from '../../../api/videos.js';

import './player.html';

let fullscreenOn = false;
let controlsHandler;

// Template.player.onCreated(function bodyOnCreated() {
//   Meteor.subscribe('videos');
// });

Template.player.onCreated(function () {
  const bodyView = Blaze.getView('Template.App_body');
  // this makes the test works
  this.navState = bodyView ? bodyView.templateInstance().navState : new ReactiveVar('minimized');
  this.templateDict = new ReactiveDict();
  this.templateDict.set('playPause', 'play');
  this.templateDict.set('currentTime', 0);
  this.templateDict.set('totalTime', 0);
});

Template.player.onDestroyed(function () {
  Meteor.clearTimeout(controlsHandler);
});

Template.player.helpers({
  playPause() {
    return Template.instance().templateDict.get('playPause');
  },
  playPauseIcon() {
    const state = Template.instance().templateDict.get('playPause');
    return (state === 'play') ? '/img/play-icon.svg' : '/img/pause-icon.svg';
  },
  currentTime() {
    return Template.instance().templateDict.get('currentTime');
  },
  totalTime() {
    return Template.instance().templateDict.get('totalTime');
  },
  video() {
    const videoId = FlowRouter.getParam('_id');
    const video = Videos.findOne({ _id: videoId });
    return video;
  },
  formatNumber(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
  },
  formatTime(seconds) {
    const minutes = seconds / 60;
    const remainingSeconds = seconds % 60;
    return sprintf('%02d:%02d', minutes, remainingSeconds);
  },
});

const requestFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else {
    console.log('Unsuported fullscreen.');
  }
};

const requestCancelFullscreen = (element) => {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  } else {
    console.log('Unsuported fullscreen.');
  }
};

Template.player.events({
  'ended #video-player'(event, instance) {
    const navState = instance.navState;
    instance.templateDict.set('playPause', 'play');
    navState.set('minimized');
  },
  'click #play-pause-button'(event, instance) {
    const dict = instance.templateDict;
    const navState = instance.navState;
    const video = instance.find('#video-player');
    const controls = instance.find('.player-controls');
    if (dict.get('playPause') === 'play') {
      dict.set('playPause', 'pause');
      navState.set('closed');
      video.play();
      controlsHandler = Meteor.setTimeout(() => {
        if (!video.paused) {
          controls.style.opacity = 0;
          controls.style.visibility = 'hidden';
        }
      }, 3000);
    } else {
      dict.set('playPause', 'play');
      navState.set('minimized');
      video.pause();
      Meteor.clearTimeout(controlsHandler);
    }
  },
  'click #fullscreen-button'(event, instance) {
    const video = instance.find('#player-container');
    if (fullscreenOn) {
      requestCancelFullscreen(document);
      fullscreenOn = false;
    } else {
      requestFullscreen(video);
      fullscreenOn = true;
    }
  },
  'timeupdate'(event, instance) {
    const video = instance.find('#video-player');
    const time = video.currentTime;

    // update progress bar
    const progressBar = instance.find('#progress-bar');
    const percentage = Math.floor((100 / video.duration) * time);
    progressBar.value = percentage;

    // update current time
    instance.templateDict.set('currentTime', time);
  },
  'input #progress-bar'(event, instance) {
    const video = instance.find('#video-player');
    const inputValue = event.target.valueAsNumber;
    const time = (inputValue / 100.0) * video.duration;
    video.currentTime = time;
  },
  'input #vol-control'(event, instance) {
    const video = instance.find('#video-player');
    const inputValue = event.target.valueAsNumber;
    video.volume = inputValue / 100.0;
  },
  'loadedmetadata'(event, instance) {
    const video = instance.find('#video-player');
    const duration = Math.floor(video.duration);
    instance.templateDict.set('totalTime', duration);
    instance.templateDict.set('currentTime', 0);
  },
  'mousemove'(event, instance) {
    const video = instance.find('#video-player');
    const controls = instance.find('.player-controls');
    controls.style.opacity = 1;
    controls.style.visibility = 'visible';
    Meteor.clearTimeout(controlsHandler);
    controlsHandler = Meteor.setTimeout(() => {
      if (!video.paused) {
        controls.style.opacity = 0;
        controls.style.visibility = 'hidden';
      }
    }, 3000);
  },
});
