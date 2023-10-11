import TrackPlayer, { State } from 'react-native-track-player';

export const initializeSetupTrackPlayer = async () => {
  if (State.None) await TrackPlayer.setupPlayer();
};
