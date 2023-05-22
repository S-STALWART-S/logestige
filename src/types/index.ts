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

declare global {
  interface Console {
    dir(
      levelName: LevelName,
      item: any,
      options?: Partial<ConsoleDirOptions>
    ): void;

    log(levelName: LevelName, ...items: any[]): void;
  }
}

export interface StackManOptions {
  fullLine: boolean;
}
