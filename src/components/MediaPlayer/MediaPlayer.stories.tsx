import React, { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image, Pressable, View } from 'react-native';
import { fn } from 'storybook/test';

import { Text } from '../Text/Text';
import { Column, Showcase } from '../../stories/helpers';
import photoHarbor from '../../stories/assets/photo-harbor.jpg';
import photoRidge from '../../stories/assets/photo-ridge.jpg';
import sampleTall from '../../stories/assets/sample-tall.mp4';
import sampleTone from '../../stories/assets/sample-tone.m4a';
import sampleWide from '../../stories/assets/sample-wide.mp4';
import captionsEn from '../../stories/assets/sample-wide.en.vtt';
import captionsEs from '../../stories/assets/sample-wide.es.vtt';
import { MediaPlayer } from './MediaPlayer';
import { PlayerIcon, playerIconNames } from './PlayerIcon';
import {
  DEFAULT_PLAYER_SETTINGS,
  playlistNeighbours,
  screenRotationFor,
  type MediaAudioTrack,
  type MediaEngine,
  type PlayerKind,
  type PlayerSettings,
} from './playerLogic';
import { useWebMedia, WebAudio, WebVideo, type WebCaption } from './web/WebMedia';

type DemoFile = {
  kind: PlayerKind;
  title: string;
  src: string;
  captions?: WebCaption[];
  /** Sound tracks to list in the menu (see `withDemoSound`). */
  sounds?: MediaAudioTrack[];
};

// The caption names are deliberately wordy, the way real files write them: the menu shows EN and ES.
const FILES: DemoFile[] = [
  {
    kind: 'video',
    title: 'Wide clip with captions.mp4',
    src: sampleWide,
    captions: [
      { src: captionsEn, language: 'en-US', label: 'English (US) transcribed' },
      { src: captionsEs, language: 'es', label: 'Spanish subtitles' },
    ],
  },
  { kind: 'image', title: 'Ridge at dawn.jpg', src: photoRidge },
  { kind: 'video', title: 'Tall clip.mp4', src: sampleTall },
  { kind: 'audio', title: 'A steady tone.m4a', src: sampleTone },
  { kind: 'image', title: 'Harbour.jpg', src: photoHarbor },
];

// A film as people keep them: the original sound, a comedy commentary over it, and a dub.
const MANY_SOUNDS: DemoFile[] = [
  {
    kind: 'video',
    title: 'A film with three audio tracks.mkv',
    src: sampleWide,
    sounds: [
      { id: '1', language: 'eng', label: 'English' },
      { id: '2', language: 'eng', label: 'RiffTrax' },
      { id: '3', language: 'fra', label: 'French audio track' },
    ],
  },
];

/**
 * Storybook's browser does not list the sound tracks inside a file, so this stands in for an engine
 * that does: the list is the demo's, and choosing a line only moves the tick. The sound does not change.
 */
function withDemoSound(engine: MediaEngine, sounds: readonly MediaAudioTrack[], chosen: { current: number }): MediaEngine {
  return {
    ...engine,
    audioTracks: () => ({ tracks: sounds, current: sounds[chosen.current] ?? null }),
    chooseAudioTrack: (index) => {
      chosen.current = index;
    },
  };
}

const BROKEN: DemoFile[] = [{ kind: 'video', title: 'A format this device cannot play.mkv', src: 'missing.mkv' }];

type DemoProps = {
  /** The device is being held on its side. Orientation "Auto" follows it. */
  turned: boolean;
  /** Which file the player opens on. */
  start: number;
  menuOpen: boolean;
  width: number;
  height: number;
  files?: DemoFile[];
  onShare: () => void;
  onClose: () => void;
};

type Showing = { index: number; from: 'left' | 'right' | null; autoPlay: boolean };

/** A phone-shaped frame with a small app around the player: a list of files and the saved settings. */
function Demo({ turned, start, menuOpen, width, height, files = FILES, onShare, onClose }: DemoProps) {
  const [showing, setShowing] = useState<Showing>({ index: start, from: null, autoPlay: false });
  const [settings, setSettings] = useState<PlayerSettings>(DEFAULT_PLAYER_SETTINGS);
  const [open, setOpen] = useState(true);
  const file = files[showing.index] ?? files[0];
  if (!file) return null;

  // What an app does with the Orientation choice: only a video turns the screen.
  const lock = screenRotationFor(open, file.kind, settings.rotation);
  const sideways = lock === 'landscape' || (lock === 'auto' && turned);
  const { previous, next } = playlistNeighbours(files, (f) => f === file);
  const go = (to: DemoFile, from: 'left' | 'right') => (state: { playing: boolean }) =>
    setShowing({ index: files.indexOf(to), from, autoPlay: state.playing });

  return (
    <View
      style={{
        width: sideways ? height : width,
        height: sideways ? width : height,
        borderRadius: 44,
        borderWidth: 6,
        borderColor: '#2a2a2e',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {open ? (
        <OneFile
          key={showing.index}
          file={file}
          settings={settings}
          onSettingsChange={(change) => setSettings((now) => ({ ...now, ...change }))}
          onClose={() => {
            setOpen(false);
            onClose();
          }}
          onShare={onShare}
          onNext={next ? go(next, 'right') : undefined}
          onPrevious={previous ? go(previous, 'left') : undefined}
          enterFrom={showing.from}
          autoPlay={showing.autoPlay}
          defaultMenuOpen={menuOpen && showing.from === null}
        />
      ) : (
        <Pressable
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111114' }}
          onPress={() => setOpen(true)}
        >
          <Text variant="body">The player was put away.</Text>
          <Text variant="caption">Click to open it again.</Text>
        </Pressable>
      )}
    </View>
  );
}

type OneFileProps = Omit<React.ComponentProps<typeof MediaPlayer>, 'kind' | 'title' | 'engine' | 'children'> & {
  file: DemoFile;
};

function OneFile({ file, ...player }: OneFileProps) {
  const web = useWebMedia();
  const { attach } = web;
  const chosenSound = useRef({ current: 0 }).current;
  const engine = useMemo(
    () => (file.sounds ? withDemoSound(web.engine, file.sounds, chosenSound) : web.engine),
    [web.engine, file.sounds, chosenSound],
  );
  // The edges an upright phone keeps clear: the camera cut-out and the home bar.
  const shared = { ...player, title: file.title, insets: { top: 50, bottom: 28, left: 0, right: 0 } };
  if (file.kind === 'image') {
    return (
      <MediaPlayer kind="image" {...shared}>
        <Image
          source={{ uri: file.src }}
          resizeMode="contain"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </MediaPlayer>
    );
  }
  if (file.kind === 'audio') {
    return (
      <>
        <WebAudio src={file.src} attach={attach} />
        <MediaPlayer kind="audio" engine={engine} {...shared} />
      </>
    );
  }
  return (
    <MediaPlayer kind="video" engine={engine} {...shared}>
      <WebVideo src={file.src} attach={attach} captions={file.captions} />
    </MediaPlayer>
  );
}

const meta: Meta<typeof Demo> = {
  title: 'Components/MediaPlayer',
  component: Demo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One player for video, sound and pictures, the same on iPhone, Android and the web. It draws the controls and decides what every touch does; the app gives it something that plays the file (an **engine**) and the picture. Here the engine is the browser. **Try it with the mouse as a finger:** drag up to put the player away, drag left or right to move through the five files, and open the options (top right) for Speed, Loop, Orientation and Captions. A file with more than one sound track also gets **Audio track** (see the Audio tracks story).',
      },
    },
  },
  argTypes: {
    turned: { control: 'boolean', description: 'Hold the phone on its side. Orientation "Auto" follows it.' },
    start: {
      control: 'select',
      options: FILES.map((_, i) => i),
      description: 'The file it opens on: 0 wide video, 1 picture, 2 tall video, 3 sound, 4 picture.',
    },
    menuOpen: { control: 'boolean', description: 'Open with the options showing.' },
    width: { control: { type: 'number', min: 320, max: 480 } },
    height: { control: { type: 'number', min: 560, max: 960 } },
    files: { table: { disable: true } },
  },
  args: { turned: false, start: 0, menuOpen: false, width: 390, height: 800, onShare: fn(), onClose: fn() },
};
export default meta;
type Story = StoryObj<typeof Demo>;

export const Playground: Story = {};

/** The options: one small box under its button, a line for each setting. */
export const Options: Story = { args: { menuOpen: true } };

/** The same player with the phone on its side. */
/** A file with more than one sound track: Audio track names the one playing and lists the rest. */
export const AudioTracks: Story = { args: { files: MANY_SOUNDS, start: 0, menuOpen: true } };

export const OnItsSide: Story = { args: { turned: true, menuOpen: true } };

/** Sound has nothing to turn and no captions, so its options are Speed and Loop. */
export const Sound: Story = { args: { start: 3 } };

/** A picture: Back, its name, the share button, and the same swipes. A touch hides the bar. */
export const Picture: Story = { args: { start: 1 } };

/** A file the device cannot show says so, in the same words for every kind of file, and offers the other apps. */
export const CannotPlay: Story = { args: { files: BROKEN, start: 0 } };

/** Every icon the player draws. */
export const Icons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Column>
      <Showcase title="Player icons" className="gap-5">
        {playerIconNames.map((name) => (
          <View key={name} style={{ width: 96, alignItems: 'center', gap: 8 }}>
            <PlayerIcon name={name} size={32} color="#fff" />
            <Text variant="caption">{name}</Text>
          </View>
        ))}
      </Showcase>
    </Column>
  ),
};
