/* eslint no-use-before-define: "off" */
/* eslint no-var: "off" */

const EVENTS = [
  'current_track',
  'player_paused',
  'tracklist_changed',
  'player_play',
];

const CHANNEL_URL = 'http://localhost:3000/channel.html';
const APP_ID = '229702';

let loaded = false;
let DZ;

function initialize() {
  window.dzAsyncInit = () => {

    DZ = window.DZ;

    DZ.init({
      appId: APP_ID,
      channelUrl: CHANNEL_URL,
      player: true,
    });

    DZ.Event.subscribe('player_loaded', () => {
      console.log('Deezer init done');
      for (const evt of EVENTS) {
        DZ.Event.subscribe(evt, playerNotification);
      }
      loaded = true;
    });
  };

  const e = document.createElement('script');
  e.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
  e.async = true;
  document.getElementById('dz-root').appendChild(e);
}

initialize();

/**
 * Search for playlists corresponding to the given keyword
 */
export const getPlaylists = (key, callback) => {
  console.log(`Searching for playlist with ${key}`);
  DZ.api(`/search/playlist?q=${encodeURIComponent(key)}`, response => {
    if (response.data) {
      console.log(`${response.data.length} playlists received`);
      // Convert the received data into a Playlist objects list
      const playlists = response.data.map(data => convertPlaylist(data));
      callback(null, playlists);
    } else {
      const message = response.error ? response.error.message : 'error';
      console.log('Playlist search error', message);
      callback(message, null);
    }
  });
};

/**
 * Select and play the requested playlist
 */
export const getTracks = (id, callback) => {
  console.log(`Playing playlist ${id}`);
  DZ.player.playPlaylist(id, 0, response => {
    if (response.tracks) {
      // Convert the received data into a Track objects list
      const tracks = response.tracks.map(data => convertTrack(data));
      callback(null, tracks);
    } else {
      const message = response.error ? response.error.message : 'error';
      console.log('Playlist play error', message);
      callback(message, null);
    }
  });
};

/**
 * DZ player commands
 */
export const trackNext = (callback) => {
  DZ.player.next();
  callback();
};

export const trackPlay = (callback) => {
  DZ.player.play();
  callback();
};

export const trackPause = (callback) => {
  DZ.player.pause();
  callback();
};

/**
 * Receive DZ player notifications
 */
const playerNotification = (data, event) => {
  console.log(event);
  // switch (event) {
  //   case 'current_track':
  //     this.eventSource.next(new TrackNewEvent(convertTrack(data.track)));
  //     break;
  //   case 'player_paused':
  //     this.eventSource.next(new TrackPauseEvent());
  //     break;
  //   case 'player_play':
  //     this.eventSource.next(new TrackPlayEvent());
  //     break;
  // }
};

/**
 * Convert Deezer playlist into internal one
 * @param data
 */
const convertPlaylist = data => ({
  id: data.id,
  title: data.title,
  tracksCount: data.nb_tracks,
  pictureUrl: data.picture_medium,
});

/**
 * Convert Deezer track into internal one
 * @param data
 */
const convertTrack = data => ({
  id: data.id,
  title: data.title,
  artistName: data.artist.name,
  albumTitle: data.album.title,
});
