import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {UITransparentButton} from '../../ui_kit/ui_transparent_button';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {AudioFile} from '../files/audio_file';

type Props = {
  file?: AudioFile;
  onChange?: (file?: AudioFile) => void;
};

export const AudioController = (props: Props) => {
  const {file, onChange} = props;
  const [recording, setRecording] = useState<AudioRecorderPlayer>();
  const [playing, setPlaying] = useState<AudioRecorderPlayer>();
  const [time, setTime] = useState(0);

  const onStartRecording = async () => {
    if (!(await requestPermissions())) {
      return;
    }
    const newPlayer = new AudioRecorderPlayer();

    newPlayer.addRecordBackListener(e => {
      setTime(e.currentPosition);
    });

    await newPlayer.startRecorder();
    setRecording(newPlayer);
  };

  const onStopRecording = async () => {
    if (!recording) {
      return;
    }
    const uri = await recording.stopRecorder();
    recording.removeRecordBackListener();
    setRecording(undefined);
    setTime(0);
    onChange && onChange(new AudioFile(time, uri));
  };

  const onPlay = async () => {
    if (!file) {
      return;
    }
    if (!(await requestPermissions())) {
      return;
    }
    const playing = new AudioRecorderPlayer();
    await playing.startPlayer(file.getUri());
    playing.addPlayBackListener(e => {
      if (e.duration <= e.currentPosition) {
        setPlaying(undefined);
      }
    });
    setPlaying(playing);
  };

  const onStop = async () => {
    if (!playing) {
      return;
    }

    await playing.stopPlayer();
    playing.removePlayBackListener();
    setPlaying(undefined);
  };

  useEffect(() => {
    return () => {
      recording && recording.removeRecordBackListener();
      playing && playing.removePlayBackListener();
    };
  }, []);

  return (
    <View>
      <UITransparentButton
        text={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? onStopRecording : onStartRecording}
      />
      {file && (
        <UITransparentButton
          text={playing ? 'Stop' : 'Play'}
          onPress={playing ? onStop : onPlay}
        />
      )}
    </View>
  );
};

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      return (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      return false;
    }
  }
};
