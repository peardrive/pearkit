/**
 * pearkit/updates — in-app updates for every Anjou app: the release record (what a build is, signed by its
 * publisher), and the channel (which releases are for this computer, which is newest, the download and the swap).
 *
 *   import { UpdateChannel, verifyRelease, signRelease, hostPlatform } from 'pearkit/updates';
 *
 * The desktop swap itself is `installUpdate` in `pearkit/electron` (main process only); the Updates block and the
 * sidebar notice are `UpdatesPanel` and `UpdateNotice` among the components. `~/Anjou/_deliveries/AGENTS.md` is
 * the standard the records follow.
 */
export * from './record';
export * from './channel';
