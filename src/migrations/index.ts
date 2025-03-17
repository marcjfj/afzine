import * as migration_20250311_214549_initial from './20250311_214549_initial';
import * as migration_20250317_033457 from './20250317_033457';

export const migrations = [
  {
    up: migration_20250311_214549_initial.up,
    down: migration_20250311_214549_initial.down,
    name: '20250311_214549_initial',
  },
  {
    up: migration_20250317_033457.up,
    down: migration_20250317_033457.down,
    name: '20250317_033457'
  },
];
