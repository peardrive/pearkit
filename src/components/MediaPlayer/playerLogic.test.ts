// One file, two runners: Pearkit runs it with vitest; an app that takes a copy runs it with jest.
import { describe, expect, test } from 'vitest';

import {
  applyPlayback,
  canStepSpeed,
  captionLine,
  captionNames,
  captionSwitchTarget,
  clockText,
  controlsPinned,
  MENU_MAX_WIDTH,
  MENU_MIN_WIDTH,
  menuBox,
  menuLines,
  playlistNeighbours,
  stepSpeed,
  swipeAction,
  swipeAxis,
  swipeOffset,
  engineCaptionChoices,
  pressBar,
  pressJump,
  pressPlayPause,
  readEngine,
  ROTATION_CHOICES,
  type CaptionTrack,
  type MediaEngine,
  barPercent,
  barTarget,
  captionChoices,
  controlsAfterTap,
  controlsMayHide,
  DEFAULT_PLAYER_SETTINGS,
  jumpTarget,
  parsePlayerSettings,
  playerEdges,
  playStartsOver,
  PLAYBACK_SPEEDS,
  safely,
  screenRotationFor,
  serializePlayerSettings,
  speedLabel,
  validSpeed,
  windowOrientationsFor,
} from "./playerLogic";

describe("Loop and Rotation are remembered for every file", () => {
  test("a first launch plays once and turns with the phone", () => {
    expect(parsePlayerSettings(null)).toEqual({ loop: false, rotation: "auto" });
  });

  test("what was saved comes back the same", () => {
    for (const loop of [true, false]) {
      for (const rotation of ["auto", "portrait", "landscape"] as const) {
        expect(parsePlayerSettings(serializePlayerSettings({ loop, rotation }))).toEqual({ loop, rotation });
      }
    }
  });

  test("damaged or foreign data falls back instead of breaking the player", () => {
    expect(parsePlayerSettings("not json")).toEqual(DEFAULT_PLAYER_SETTINGS);
    expect(parsePlayerSettings("null")).toEqual(DEFAULT_PLAYER_SETTINGS);
    expect(parsePlayerSettings("[1,2]")).toEqual(DEFAULT_PLAYER_SETTINGS);
    expect(parsePlayerSettings('{"loop":"yes","rotation":"upside-down"}')).toEqual(DEFAULT_PLAYER_SETTINGS);
    // One good field is kept when the other is bad.
    expect(parsePlayerSettings('{"loop":true,"rotation":7}')).toEqual({ loop: true, rotation: "auto" });
  });

  test("the fallback is a fresh object each time, so one caller cannot change another's", () => {
    const a = parsePlayerSettings(null);
    a.loop = true;
    expect(parsePlayerSettings(null).loop).toBe(false);
  });
});

describe("turning the screen", () => {
  test("a video follows the saved choice", () => {
    expect(screenRotationFor(true, "video", "auto")).toBe("auto");
    expect(screenRotationFor(true, "video", "landscape")).toBe("landscape");
    expect(screenRotationFor(true, "video", "portrait")).toBe("portrait");
  });

  test("closing the player puts the app upright, whatever the choice", () => {
    expect(screenRotationFor(false, "video", "landscape")).toBe("portrait");
    expect(screenRotationFor(false, null, "auto")).toBe("portrait");
  });

  test("audio stays upright", () => {
    expect(screenRotationFor(true, "audio", "landscape")).toBe("portrait");
  });

  test("the window is told exactly the directions the choice allows", () => {
    expect(windowOrientationsFor("auto")).toEqual(["portrait", "landscape"]);
    expect(windowOrientationsFor("portrait")).toEqual(["portrait"]);
    expect(windowOrientationsFor("landscape")).toEqual(["landscape"]);
  });
});

describe("controls keep clear of the camera cut-out and the home bar", () => {
  const upright = { top: 62, bottom: 34, left: 0, right: 0 };

  test("upright: as measured", () => {
    expect(playerEdges(upright, false)).toEqual(upright);
  });

  test("sideways: the cut-out is on a short edge, either one", () => {
    expect(playerEdges(upright, true)).toEqual({ top: 0, bottom: 21, left: 62, right: 62 });
  });

  test("Android reports the cut-out at the side it is on; both sides are still kept clear", () => {
    expect(playerEdges({ top: 0, bottom: 0, left: 48, right: 0 }, true)).toEqual({ top: 0, bottom: 0, left: 48, right: 48 });
  });

  test("a phone with no cut-out and no home bar needs no room", () => {
    expect(playerEdges({ top: 0, bottom: 0, left: 0, right: 0 }, true)).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
  });

  test("a bad reading never becomes a negative or missing margin", () => {
    expect(playerEdges({ top: NaN, bottom: -5, left: 0, right: 0 }, false)).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
  });
});

describe("jumping and the bar", () => {
  test("15 seconds forward and back", () => {
    expect(jumpTarget(30, 15, 100)).toBe(45);
    expect(jumpTarget(30, -15, 100)).toBe(15);
  });

  test("never before the start or past the end", () => {
    expect(jumpTarget(5, -15, 100)).toBe(0);
    expect(jumpTarget(95, 15, 100)).toBe(100);
  });

  test("a file whose length is not known yet can still be jumped in", () => {
    expect(jumpTarget(10, 15, 0)).toBe(25);
    expect(jumpTarget(10, 15, NaN)).toBe(25);
    expect(jumpTarget(NaN, -15, NaN)).toBe(0);
  });

  test("a touch on the bar lands in proportion, and off the ends counts as the end", () => {
    expect(barTarget(50, 200, 100)).toBe(25);
    expect(barTarget(-20, 200, 100)).toBe(0);
    expect(barTarget(900, 200, 100)).toBe(100);
  });

  test("a touch before the bar or the length is known does nothing", () => {
    expect(barTarget(50, 0, 100)).toBeNull();
    expect(barTarget(50, 200, 0)).toBeNull();
  });

  test("the bar's fill stays between empty and full", () => {
    expect(barPercent(50, 200)).toBe(25);
    expect(barPercent(300, 200)).toBe(100);
    expect(barPercent(-1, 200)).toBe(0);
    expect(barPercent(10, 0)).toBe(0);
  });

  test("Play at the end starts over; in the middle it carries on", () => {
    expect(playStartsOver(100, 100)).toBe(true);
    expect(playStartsOver(99.9, 100)).toBe(true);
    expect(playStartsOver(40, 100)).toBe(false);
    expect(playStartsOver(0, 0)).toBe(false);
  });
});

describe("speed", () => {
  test("normal speed is offered, with slower and faster around it", () => {
    expect(PLAYBACK_SPEEDS).toContain(1);
    expect(Math.min(...PLAYBACK_SPEEDS)).toBeLessThan(1);
    expect(Math.max(...PLAYBACK_SPEEDS)).toBeGreaterThan(1);
  });

  test("anything that is not on the list plays at normal speed", () => {
    expect(validSpeed(1.5)).toBe(1.5);
    expect(validSpeed(3)).toBe(1);
    expect(validSpeed(0)).toBe(1);
    expect(validSpeed("fast")).toBe(1);
  });

  test("labels", () => {
    expect(speedLabel(1)).toBe("1×");
    expect(speedLabel(1.25)).toBe("1.25×");
  });
});

describe("captions", () => {
  const en = { id: "a", language: "en", label: "" };
  const es = { id: "b", language: "es-MX", label: "Español (México)" };

  test("a file with none offers nothing", () => {
    expect(captionChoices([], null)).toEqual([]);
    expect(captionChoices(null, null)).toEqual([]);
  });

  test("Off comes first and is chosen until a track is", () => {
    const choices = captionChoices([en, es], null);
    expect(choices.map((c) => c.label)).toEqual(["Off", "English", "Spanish"]);
    expect(choices.map((c) => c.short)).toEqual(["Off", "EN", "ES"]);
    expect(choices.map((c) => c.selected)).toEqual([true, false, false]);
    expect(choices.map((c) => c.index)).toEqual([-1, 0, 1]);
  });

  test("the track in use is the one marked", () => {
    expect(captionChoices([en, es], es).map((c) => c.selected)).toEqual([false, false, true]);
  });

  test("a track with no name is still listed", () => {
    expect(captionChoices([{ language: "ca" }, {}], null).map((c) => c.label)).toEqual(["Off", "CA", "Captions 2"]);
  });

  test("every row has its own key, even when two tracks look alike", () => {
    const keys = captionChoices([{ id: "1", language: "en" }, { id: "2", language: "en" }], null).map((c) => c.key);
    expect(keys).toHaveLength(3);
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("a track an iPhone lists twice is offered once", () => {
    // What an iPhone reports for a file with one English and one Spanish track.
    const phone = [
      { language: "en", label: "English" },
      { language: "en", label: "English" },
      { language: "es", label: "Spanish" },
      { language: "es", label: "Spanish" },
    ];
    const choices = captionChoices(phone, null);
    expect(choices.map((c) => c.label)).toEqual(["Off", "English", "Spanish"]);
    expect(choices.map((c) => c.short)).toEqual(["Off", "EN", "ES"]);
    expect(choices.map((c) => c.index)).toEqual([-1, 0, 2]);
    expect(captionChoices(phone, phone[3]).map((c) => c.selected)).toEqual([false, false, true]);
  });

  test("the empty 'forced' companion an iPhone adds to each track is not offered", () => {
    // What an iPhone really reports for a file with one English and one Spanish track.
    const phone = [
      { language: "en", label: "English" },
      { language: "en", label: "English Forced" },
      { language: "es", label: "Spanish" },
      { language: "es", label: "Spanish Forced" },
    ];
    const choices = captionChoices(phone, null);
    expect(choices.map((c) => c.label)).toEqual(["Off", "English", "Spanish"]);
    expect(choices.map((c) => c.index)).toEqual([-1, 0, 2]);
    // If the phone itself picked the companion, the list marks the language it belongs to.
    expect(captionChoices(phone, phone[3]).map((c) => c.selected)).toEqual([false, false, true]);
    // A forced track with no full track in its language is all there is, so it stays.
    expect(captionChoices([{ language: "fr", label: "French Forced" }], null).map((c) => c.label)).toEqual(["Off", "French"]);
  });

  test("two tracks in one language that the engine can tell apart are both kept", () => {
    const byName = captionChoices([{ language: "en", label: "English" }, { language: "en", label: "English SDH" }], null);
    expect(byName).toHaveLength(3);
    const byId = captionChoices([{ id: "1", language: "en" }, { id: "2", language: "en" }], null);
    expect(byId.map((c) => c.label)).toEqual(["Off", "English", "English 2"]);
  });
});

describe("controls over the picture", () => {
  const playingVideo = { kind: "video" as const, playing: true, menuOpen: false, scrubbing: false, failed: false };

  test("they hide by themselves only over a playing video", () => {
    expect(controlsMayHide(playingVideo)).toBe(true);
    expect(controlsMayHide({ ...playingVideo, playing: false })).toBe(false);
    expect(controlsMayHide({ ...playingVideo, kind: "audio" })).toBe(false);
  });

  test("never while the menu is open, a finger is on the bar, or the file failed", () => {
    expect(controlsMayHide({ ...playingVideo, menuOpen: true })).toBe(false);
    expect(controlsMayHide({ ...playingVideo, scrubbing: true })).toBe(false);
    expect(controlsMayHide({ ...playingVideo, failed: true })).toBe(false);
  });

  test("a touch brings them up; a second touch puts them away only while playing", () => {
    expect(controlsAfterTap(false, true)).toBe(true);
    expect(controlsAfterTap(true, true)).toBe(false);
    expect(controlsAfterTap(true, false)).toBe(true);
    expect(controlsAfterTap(false, false)).toBe(true);
  });
});

describe("a player that has already been closed", () => {
  test("a call on it is swallowed and the fallback is used", () => {
    expect(
      safely(() => {
        throw new Error("released");
      }, 7),
    ).toBe(7);
    expect(safely(() => 3, 7)).toBe(3);
  });
});

/** A stand-in for expo-video / expo-audio: it keeps state the way a real player does and records every call. */
function fakeEngine(
  start: Partial<{ position: number; duration: number; playing: boolean; failed: boolean; rateStartsPlayback: boolean }> = {},
) {
  const state = { position: 0, duration: 100, playing: false, failed: false, rate: 1, loop: false, rateStartsPlayback: false, ...start };
  const tracks: CaptionTrack[] = [];
  let current: CaptionTrack | null = null;
  const calls: string[] = [];
  let broken = false;
  const guard = () => {
    if (broken) throw new Error("The player was released");
  };
  const engine: MediaEngine = {
    play: () => {
      guard();
      calls.push("play");
      state.playing = true;
    },
    pause: () => {
      guard();
      calls.push("pause");
      state.playing = false;
    },
    seekTo: (s) => {
      guard();
      calls.push(`seek:${s}`);
      state.position = s;
    },
    setRate: (r) => {
      guard();
      calls.push(`rate:${r}`);
      state.rate = r;
      // iPhone's player starts when it is given a speed; Android's does not.
      if (state.rateStartsPlayback) state.playing = true;
    },
    setLoop: (l) => {
      guard();
      calls.push(`loop:${l}`);
      state.loop = l;
    },
    read: () => {
      guard();
      return { position: state.position, duration: state.duration, playing: state.playing, failed: state.failed };
    },
    captions: () => {
      guard();
      return { tracks, current };
    },
    chooseCaption: (i) => {
      guard();
      current = i >= 0 ? (tracks[i] ?? null) : null;
    },
  };
  return { engine, state, calls, tracks, release: () => (broken = true) };
}

describe("the same buttons on every engine (video or audio, iPhone or Android)", () => {
  test("Play starts it, Pause stops it", () => {
    const f = fakeEngine({ position: 10 });
    expect(pressPlayPause(f.engine)).toBe(true);
    expect(f.state.playing).toBe(true);
    expect(pressPlayPause(f.engine)).toBe(false);
    expect(f.state.playing).toBe(false);
    expect(f.calls).toEqual(["play", "pause"]);
  });

  test("Play on a file that has ended goes back to the start first", () => {
    const f = fakeEngine({ position: 100, duration: 100 });
    pressPlayPause(f.engine);
    expect(f.calls).toEqual(["seek:0", "play"]);
  });

  test("the jump buttons move 15 seconds and stop at the ends", () => {
    const f = fakeEngine({ position: 50 });
    expect(pressJump(f.engine, 15)).toBe(65);
    expect(pressJump(f.engine, -15)).toBe(50);
    f.state.position = 4;
    expect(pressJump(f.engine, -15)).toBe(0);
    f.state.position = 96;
    expect(pressJump(f.engine, 15)).toBe(100);
  });

  test("a touch on the bar seeks; before the length is known it does nothing", () => {
    const f = fakeEngine();
    expect(pressBar(f.engine, 100, 400)).toBe(25);
    expect(f.state.position).toBe(25);
    const unknown = fakeEngine({ duration: 0 });
    expect(pressBar(unknown.engine, 100, 400)).toBeNull();
    expect(unknown.calls).toEqual([]);
  });

  test("Loop and Speed are put onto every new file", () => {
    const first = fakeEngine();
    const second = fakeEngine();
    applyPlayback(first.engine, { loop: true, speed: 1.5 });
    applyPlayback(second.engine, { loop: true, speed: 1 });
    expect(first.state).toMatchObject({ loop: true, rate: 1.5 });
    expect(second.state).toMatchObject({ loop: true, rate: 1 });
  });

  test("choosing a speed while paused does not start the video (iPhone starts a player that is given a speed)", () => {
    const f = fakeEngine({ rateStartsPlayback: true });
    applyPlayback(f.engine, { loop: false, speed: 1 });
    expect(f.state.playing).toBe(false);
    applyPlayback(f.engine, { loop: false, speed: 1.5 });
    expect(f.state).toMatchObject({ playing: false, rate: 1.5 });
  });

  test("choosing a speed while playing keeps it playing, on both kinds of phone", () => {
    for (const rateStartsPlayback of [true, false]) {
      const f = fakeEngine({ playing: true, rateStartsPlayback });
      applyPlayback(f.engine, { loop: false, speed: 2 });
      expect(f.state).toMatchObject({ playing: true, rate: 2 });
    }
  });

  test("Loop off is put on too, so an engine that defaults to looping cannot keep going", () => {
    const f = fakeEngine();
    f.state.loop = true;
    applyPlayback(f.engine, { loop: false, speed: 1 });
    expect(f.state.loop).toBe(false);
  });

  test("a speed the player does not offer is never sent to the engine", () => {
    const f = fakeEngine();
    applyPlayback(f.engine, { loop: false, speed: 16 });
    expect(f.state.rate).toBe(1);
  });

  test("a reading with holes in it becomes zeros, never NaN on screen", () => {
    const f = fakeEngine();
    f.engine.read = () => ({ position: NaN, duration: undefined as unknown as number, playing: 1 as unknown as boolean, failed: false });
    expect(readEngine(f.engine)).toEqual({ position: 0, duration: 0, playing: false, failed: false });
  });

  test("captions come from the engine, and choosing Off clears them", () => {
    const f = fakeEngine();
    expect(engineCaptionChoices(f.engine)).toEqual([]);
    f.tracks.push({ id: "1", language: "en", label: "English" });
    f.engine.chooseCaption(0);
    expect(engineCaptionChoices(f.engine).map((c) => c.selected)).toEqual([false, true]);
    f.engine.chooseCaption(-1);
    expect(engineCaptionChoices(f.engine).map((c) => c.selected)).toEqual([true, false]);
  });
});

describe("the player closing under a button press", () => {
  test("no button throws once the engine is gone", () => {
    const f = fakeEngine({ position: 30 });
    f.release();
    expect(() => pressPlayPause(f.engine)).not.toThrow();
    expect(() => pressJump(f.engine, 15)).not.toThrow();
    expect(() => pressBar(f.engine, 10, 100)).not.toThrow();
    expect(() => applyPlayback(f.engine, { loop: true, speed: 2 })).not.toThrow();
    expect(readEngine(f.engine)).toEqual({ position: 0, duration: 0, playing: false, failed: false });
    expect(engineCaptionChoices(f.engine)).toEqual([]);
    expect(pressPlayPause(f.engine)).toBe(false);
  });

  test("no engine at all is the same as a closed one", () => {
    expect(pressPlayPause(null)).toBe(false);
    expect(pressJump(undefined, 15)).toBe(0);
    expect(pressBar(null, 1, 2)).toBeNull();
    expect(readEngine(null).playing).toBe(false);
  });
});

describe("the rotation choices in the menu", () => {
  test("there is one for each setting, in the words the menu shows", () => {
    expect(ROTATION_CHOICES.map((c) => c.value)).toEqual(["auto", "portrait", "landscape"]);
    expect(ROTATION_CHOICES.map((c) => c.label)).toEqual(["Auto", "Portrait", "Landscape"]);
  });
});

describe("the Speed line: a minus and a plus", () => {
  test("each press moves one step along the speeds", () => {
    expect(stepSpeed(1, 1)).toBe(1.25);
    expect(stepSpeed(1.25, 1)).toBe(1.5);
    expect(stepSpeed(1, -1)).toBe(0.75);
    expect(stepSpeed(2, -1)).toBe(1.5);
  });

  test("plus walks from the slowest to the fastest, and minus back again", () => {
    let rate = PLAYBACK_SPEEDS[0] as number;
    const up: number[] = [rate];
    while (canStepSpeed(rate, 1)) up.push((rate = stepSpeed(rate, 1)));
    expect(up).toEqual([...PLAYBACK_SPEEDS]);
    const down: number[] = [rate];
    while (canStepSpeed(rate, -1)) down.push((rate = stepSpeed(rate, -1)));
    expect(down).toEqual([...PLAYBACK_SPEEDS].reverse());
  });

  test("the ends stay put and say so", () => {
    expect(stepSpeed(2, 1)).toBe(2);
    expect(canStepSpeed(2, 1)).toBe(false);
    expect(stepSpeed(0.5, -1)).toBe(0.5);
    expect(canStepSpeed(0.5, -1)).toBe(false);
    expect(canStepSpeed(1, 1)).toBe(true);
    expect(canStepSpeed(1, -1)).toBe(true);
  });

  test("a speed the player does not offer steps from normal", () => {
    expect(stepSpeed(3, 1)).toBe(1.25);
    expect(stepSpeed(Number.NaN, -1)).toBe(0.75);
  });
});

describe("the clock beside the bar", () => {
  test("minutes and seconds, hours only when there are some", () => {
    expect(clockText(0)).toBe("0:00");
    expect(clockText(7.9)).toBe("0:07");
    expect(clockText(760)).toBe("12:40");
    expect(clockText(3723)).toBe("1:02:03");
  });

  test("a length not known yet reads as zero", () => {
    expect(clockText(Number.NaN)).toBe("0:00");
    expect(clockText(-4)).toBe("0:00");
  });
});

describe("caption names are short and say only what tells them apart", () => {
  test("the track Guy saw: 'English (US) transcribed' is EN / English", () => {
    expect(captionNames([{ language: "en-US", label: "English (US) transcribed" }])).toEqual([
      { label: "English", short: "EN" },
    ]);
    // The same when the file gives a name and no language code.
    expect(captionNames([{ label: "English (US) transcribed" }])).toEqual([{ label: "English", short: "EN" }]);
  });

  test("no name in any list carries the filler words", () => {
    const names = captionNames([
      { language: "en", label: "English subtitles" },
      { language: "es", label: "Spanish (auto-generated)" },
      { language: "fr", label: "French CC" },
      { language: "de", label: "German SDH" },
      { language: "it", label: "Italian [Forced]" },
    ]);
    for (const n of names) {
      expect(`${n.label} ${n.short}`).not.toMatch(/transcri|subtitle|caption|generated|\bcc\b|sdh|forced/i);
    }
    expect(names.map((n) => n.short)).toEqual(["EN", "ES", "FR", "DE", "IT"]);
  });

  test("the region appears only when two tracks share a language", () => {
    expect(captionNames([{ language: "en-US" }, { language: "en-GB" }, { language: "es-MX" }])).toEqual([
      { label: "English (US)", short: "EN-US" },
      { label: "English (GB)", short: "EN-GB" },
      { label: "Spanish", short: "ES" },
    ]);
  });

  test("three-letter codes and odd spellings come out the same", () => {
    expect(captionNames([{ language: "eng" }, { language: "spa" }, { language: "fre" }]).map((n) => n.short)).toEqual([
      "EN",
      "ES",
      "FR",
    ]);
    expect(captionNames([{ language: "EN_us" }])).toEqual([{ label: "English", short: "EN" }]);
    expect(captionNames([{ language: "zh-Hans" }, { language: "zh-Hant" }]).map((n) => n.short)).toEqual([
      "ZH-Hans",
      "ZH-Hant",
    ]);
  });

  test("a language the player has no name for shows its code", () => {
    expect(captionNames([{ language: "ca" }])).toEqual([{ label: "CA", short: "CA" }]);
  });

  test("a track that says nothing about itself is still listed, by number", () => {
    expect(captionNames([{}, { language: "und", label: "" }])).toEqual([
      { label: "Captions 1", short: "CC 1" },
      { label: "Captions 2", short: "CC 2" },
    ]);
  });

  test("a track known only by its own name keeps that name, cut short on the button", () => {
    expect(captionNames([{ label: "Director's commentary" }])).toEqual([
      { label: "Director's commentary", short: "Director's" },
    ]);
  });

  test("two tracks that read alike are numbered", () => {
    expect(captionNames([{ language: "en" }, { language: "en", label: "English SDH" }])).toEqual([
      { label: "English", short: "EN" },
      { label: "English 2", short: "EN 2" },
    ]);
  });

  test("nothing in, nothing out", () => {
    expect(captionNames(null)).toEqual([]);
    expect(captionNames([])).toEqual([]);
  });
});

describe("the Captions line: a switch and a language", () => {
  const en = { id: "a", language: "en-US", label: "English (US) transcribed" };
  const es = { id: "b", language: "es", label: "" };

  test("a file with none has nothing to switch", () => {
    expect(captionLine([], -1)).toEqual({ available: false, on: false, shown: null, tracks: [] });
    expect(captionSwitchTarget([], true, -1)).toBe(-1);
  });

  test("off to begin with, showing the first language ready to switch on", () => {
    const line = captionLine(captionChoices([en, es], null), -1);
    expect(line.available).toBe(true);
    expect(line.on).toBe(false);
    expect(line.shown?.short).toBe("EN");
    expect(line.tracks.map((t) => t.short)).toEqual(["EN", "ES"]);
  });

  test("switching on chooses the language shown; switching off chooses none", () => {
    const off = captionChoices([en, es], null);
    expect(captionSwitchTarget(off, true, -1)).toBe(0);
    expect(captionSwitchTarget(captionChoices([en, es], es), false, 1)).toBe(-1);
  });

  test("off and on again comes back to the language last used", () => {
    const off = captionChoices([en, es], null);
    expect(captionLine(off, 1).shown?.short).toBe("ES");
    expect(captionSwitchTarget(off, true, 1)).toBe(1);
  });

  test("the language in use is the one shown, whatever was used before", () => {
    const line = captionLine(captionChoices([en, es], es), 0);
    expect(line.on).toBe(true);
    expect(line.shown?.short).toBe("ES");
  });
});

describe("the options menu is small and sits under its button", () => {
  test("a video has exactly four lines, in this order", () => {
    expect(menuLines("video")).toEqual(["speed", "loop", "orientation", "captions"]);
  });

  test("sound has only the two that apply; a picture has no menu", () => {
    expect(menuLines("audio")).toEqual(["speed", "loop"]);
    expect(menuLines("image")).toEqual([]);
  });

  test("on an upright phone it is a little over half the width and under a third of the height", () => {
    for (const screen of [
      { width: 402, height: 874 }, // iPhone 17 Pro
      { width: 375, height: 667 }, // iPhone SE
      { width: 360, height: 800 }, // a common Android
      { width: 440, height: 956 }, // iPhone Pro Max
    ]) {
      const box = menuBox(screen, 4);
      expect(box.width).toBeGreaterThanOrEqual(MENU_MIN_WIDTH);
      expect(box.width / screen.width).toBeLessThanOrEqual(0.67);
      expect(box.height / screen.height).toBeLessThanOrEqual(0.3);
    }
  });

  test("on its side, and on a tablet, it stops growing", () => {
    expect(menuBox({ width: 874, height: 402 }, 4).width).toBe(MENU_MAX_WIDTH);
    expect(menuBox({ width: 1180, height: 820 }, 4).width).toBe(MENU_MAX_WIDTH);
    expect(menuBox({ width: 874, height: 402 }, 4).height).toBeLessThan(402 / 2);
  });

  test("it never runs off a very narrow screen", () => {
    expect(menuBox({ width: 240, height: 500 }, 4).width).toBe(216);
  });

  test("a menu with fewer lines is shorter", () => {
    expect(menuBox({ width: 402, height: 874 }, 2).height).toBeLessThan(menuBox({ width: 402, height: 874 }, 4).height);
  });
});

describe("swipes: up puts the player away, sideways moves through the files", () => {
  const room = { width: 402, height: 874, hasNext: true, hasPrevious: true };

  test("a small movement is still a tap", () => {
    expect(swipeAxis(5, -6)).toBeNull();
    expect(swipeAxis(0, 0)).toBeNull();
  });

  test("the direction is the one the finger mostly moved in", () => {
    expect(swipeAxis(-30, 4)).toBe("horizontal");
    expect(swipeAxis(30, -10)).toBe("horizontal");
    expect(swipeAxis(6, -40)).toBe("vertical");
  });

  test("pulling down does nothing", () => {
    expect(swipeAxis(3, 60)).toBeNull();
    expect(swipeOffset({ axis: "vertical", dx: 0, dy: 80 }, room)).toEqual({ x: 0, y: 0 });
  });

  test("a long swipe up closes; a short one settles back", () => {
    expect(swipeAction({ axis: "vertical", dx: 0, dy: -200, vx: 0, vy: 0 }, room)).toBe("close");
    expect(swipeAction({ axis: "vertical", dx: 0, dy: -50, vx: 0, vy: 0 }, room)).toBeNull();
  });

  test("a quick flick up closes without going far", () => {
    expect(swipeAction({ axis: "vertical", dx: 0, dy: -60, vx: 0, vy: -1.2 }, room)).toBe("close");
  });

  test("left is the next file, right is the one before", () => {
    expect(swipeAction({ axis: "horizontal", dx: -180, dy: 0, vx: 0, vy: 0 }, room)).toBe("next");
    expect(swipeAction({ axis: "horizontal", dx: 180, dy: 0, vx: 0, vy: 0 }, room)).toBe("previous");
    expect(swipeAction({ axis: "horizontal", dx: -60, dy: 0, vx: -0.9, vy: 0 }, room)).toBe("next");
    expect(swipeAction({ axis: "horizontal", dx: -60, dy: 0, vx: 0, vy: 0 }, room)).toBeNull();
  });

  test("a finger that turns back before lifting does not flick the other way", () => {
    expect(swipeAction({ axis: "horizontal", dx: -60, dy: 0, vx: 0.9, vy: 0 }, room)).toBeNull();
  });

  test("at either end of the list there is nowhere to go, and the player drags behind", () => {
    const first = { ...room, hasPrevious: false };
    const last = { ...room, hasNext: false };
    expect(swipeAction({ axis: "horizontal", dx: 200, dy: 0, vx: 0, vy: 0 }, first)).toBeNull();
    expect(swipeAction({ axis: "horizontal", dx: -200, dy: 0, vx: 0, vy: 0 }, last)).toBeNull();
    expect(swipeOffset({ axis: "horizontal", dx: 200, dy: 0 }, first).x).toBe(50);
    expect(swipeOffset({ axis: "horizontal", dx: -200, dy: 0 }, first).x).toBe(-200);
  });

  test("the same swipes work with the phone on its side", () => {
    const wide = { width: 874, height: 402, hasNext: true, hasPrevious: true };
    expect(swipeAction({ axis: "vertical", dx: 0, dy: -90, vx: 0, vy: 0 }, wide)).toBe("close");
    expect(swipeAction({ axis: "horizontal", dx: -130, dy: 0, vx: 0, vy: 0 }, wide)).toBe("next");
  });

  test("a swipe that never chose a direction does nothing", () => {
    expect(swipeAction({ axis: null, dx: -300, dy: -300, vx: -2, vy: -2 }, room)).toBeNull();
    expect(swipeOffset({ axis: null, dx: -300, dy: -300 }, room)).toEqual({ x: 0, y: 0 });
  });
});

describe("moving through the files", () => {
  const files = ["a.mp4", "b.m4a", "c.jpg"];

  test("the files either side of the one on screen", () => {
    expect(playlistNeighbours(files, (f) => f === "b.m4a")).toEqual({ previous: "a.mp4", next: "c.jpg" });
  });

  test("the list has two ends and does not wrap round", () => {
    expect(playlistNeighbours(files, (f) => f === "a.mp4")).toEqual({ previous: null, next: "b.m4a" });
    expect(playlistNeighbours(files, (f) => f === "c.jpg")).toEqual({ previous: "b.m4a", next: null });
  });

  test("a file that is not in the list, or an empty list, has no neighbours", () => {
    expect(playlistNeighbours(files, (f) => f === "gone")).toEqual({ previous: null, next: null });
    expect(playlistNeighbours([], () => true)).toEqual({ previous: null, next: null });
    expect(playlistNeighbours(null, () => true)).toEqual({ previous: null, next: null });
  });
});

describe("a picture in the player", () => {
  test("a touch shows or hides the bar", () => {
    expect(controlsAfterTap(true, false, "image")).toBe(false);
    expect(controlsAfterTap(false, false, "image")).toBe(true);
  });

  test("nothing forces the bar back once the user has put it away", () => {
    const still = { kind: "image" as const, playing: false, menuOpen: false, scrubbing: false, failed: false };
    expect(controlsPinned(still)).toBe(false);
    // A paused video is the opposite: its controls belong on screen.
    expect(controlsPinned({ ...still, kind: "video" })).toBe(true);
    expect(controlsPinned({ ...still, kind: "video", playing: true })).toBe(false);
    expect(controlsPinned({ ...still, kind: "video", playing: true, menuOpen: true })).toBe(true);
    expect(controlsPinned({ ...still, kind: "audio", playing: true })).toBe(true);
  });

  test("the bar never hides by itself", () => {
    expect(controlsMayHide({ kind: "image", playing: false, menuOpen: false, scrubbing: false, failed: false })).toBe(
      false,
    );
  });

  test("it turns with the device, is never held sideways, and stays upright for someone who chose upright", () => {
    expect(screenRotationFor(true, "image", "auto")).toBe("auto");
    expect(screenRotationFor(true, "image", "landscape")).toBe("auto");
    expect(screenRotationFor(true, "image", "portrait")).toBe("portrait");
    expect(screenRotationFor(false, "image", "auto")).toBe("portrait");
  });
});
