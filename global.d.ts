import { ConsoleDirOptions, LevelName } from "./src/types";

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
