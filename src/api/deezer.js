/* eslint no-use-before-define: "off" */
/* eslint no-var: "off" */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Actions } from '../actions';

const DZ_EVENTS = ['current_track', 'player_paused', 'player_play'];

export const [DZ_CURRENT, DZ_PAUSED, DZ_PLAY] = DZ_EVENTS;

const DZ_SCRIPT = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
const CHANNEL_URL = 'http://localhost:3000/channel.html';
const APP_ID = '229702';

class Deezer {
  constructor() {
    this.DZ = null;
    this.eventSource = new Subject();
    this.loaded = new BehaviorSubject(false);
    this.$events = this.eventSource.asObservable();
    const self = this;

    window.dzAsyncInit = () => {
      self.DZ = window.DZ;

      self.DZ.init({
        appId: APP_ID,
        channelUrl: CHANNEL_URL,
        player: {
          onload: () => {
            console.log('DZ init done');
            for (const evt of DZ_EVENTS) {
              self.DZ.Event.subscribe(evt, self.playerNotification);
            }
            self.loaded.next(true);
          }
        }
      });
    };

    const e = document.createElement('script');
    e.src = DZ_SCRIPT;
    e.async = true;
    document.getElementById('dz-root').appendChild(e);
  }

  /**
   * Search for playlists corresponding to the given keyword
   */
  getPlaylists(key) {
    console.log(`getPlaylists ${key}`);
    return Observable.create(observer => {
      this.whenLoaded(() => {
        this.DZ.api(
          `/search/playlist?q=${encodeURIComponent(key)}`,
          response => {
            if (response.data) {
              const playlists = response.data.map(data =>
                this.convertPlaylist(data)
              );
              observer.next(playlists);
            } else {
              const message = response.error ? response.error.message : 'error';
              observer.throw(message);
            }
          }
        );
      });
    });
  }

  /**
   * Select and play the requested playlist
   */
  playPlaylist(id, index = 0) {
    console.log(`playPlaylist ${id}`);
    return Observable.create(observer => {
      this.whenLoaded(() => {
        this.DZ.player.playPlaylist(id, index, response => {
          if (response.tracks) {
            const tracks = response.tracks.map(data => this.convertTrack(data));
            observer.next(tracks);
          } else {
            const message = response.error ? response.error.message : 'error';
            observer.throw(message);
          }
        });
      });
    });
  }

  /**
   * DZ player commands
   */
  trackNext() {
    this.whenLoaded(() => {
      this.DZ.player.next();
    });
  }

  trackPlay() {
    this.whenLoaded(() => {
      this.DZ.player.play();
    });
  }

  trackPause() {
    this.whenLoaded(() => {
      this.DZ.player.pause();
    });
  }

  /**
   * Execute the supplied callback when DZ API is loaded
   */
  whenLoaded = callback => {
    this.loaded.asObservable().subscribe(function cb(isLoaded) {
      if (isLoaded) {
        this._unsubscribe();
        callback();
      }
    });
  };

  /**
   * Convert Deezer playlist into internal one
   * @param data
   */
  convertPlaylist = data => ({
    id: data.id,
    title: data.title,
    tracksCount: data.nb_tracks,
    pictureUrl: data.picture_medium
  });

  /**
   * Convert Deezer track into internal one
   * @param data
   */
  convertTrack = data => ({
    id: data.id,
    title: data.title,
    artistName: data.artist.name,
    albumTitle: data.album.title
  });

  /**
   * Receive DZ player notifications
   */
  playerNotification = (data, event) => {
    switch (event) {
      case DZ_CURRENT:
        this.eventSource.next({
          type: Actions.TRACKS_CURRENT,
          current: data.index
        });
        break;
      case DZ_PAUSED:
        this.eventSource.next({ type: Actions.TRACKS_PAUSE });
        break;
      case DZ_PLAY:
        this.eventSource.next({ type: Actions.TRACKS_PLAY });
        break;
      default:
        break;
    }
  };
}

export default new Deezer();
