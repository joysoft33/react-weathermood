import { schema } from 'normalizr';

export const weather = new schema.Entity('weather');

export const playlist = new schema.Entity('playlist');
export const arrayOfPlaylists = new schema.Array(playlist);

export const track = new schema.Entity('track');
export const arrayOfTracks = new schema.Array(track);
