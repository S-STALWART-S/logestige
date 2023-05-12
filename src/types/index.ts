export type LogItem = any;

type Level = boolean;

export interface Levels {
  error: Level;
  warn: Level;
  info: Level;
  debug: Level;
}

export type LevelName = keyof Levels;

export type LogMethod = "debug" | "dir" | "error" | "info" | "log" | "warn";

export interface ConsoleDirOptions {
  breakLength: number;
  colors: boolean;
  compact: boolean;
  customInspect: boolean;
  depth: number;
  getters: boolean;
  maxArrayLength: number;
  maxStringLength: number;
  numericSeparator: boolean;
  showHidden: boolean;
  showProxy: boolean;
  sorted: boolean;
}
