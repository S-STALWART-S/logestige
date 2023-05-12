import { ConsoleDirOptions, LevelName } from ".";

declare global {
  interface Console {
    dir(
      levelName: LevelName,
      item: any,
      options?: Partial<ConsoleDirOptions>
    ): void;
    log(levelName: LevelName, ...items): void;
  }
}

export {};
