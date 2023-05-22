import { StackMan } from "./StackMan";

import {
  ConsoleDirOptions,
  LevelName,
  Levels,
  LogItem,
  LogMethod,
  StackManOptions,
} from "../types";

export const consoleMethods = { ...console };

type GlobalOptions = StackManOptions & { withPrefix: boolean };

const globalOptions: GlobalOptions = {
  fullLine: true,
  withPrefix: false,
};

export class Logestige {
  logs: LogItem[] = [];
  levels: Levels = this.getDefaultLevels();
  private options = globalOptions;

  static changeGlobalOptions(
    newOptions: Partial<GlobalOptions> = globalOptions
  ) {
    const options = {
      ...globalOptions,
      ...newOptions,
    };
    globalOptions.fullLine = options.fullLine;
    globalOptions.withPrefix = options.withPrefix;
  }

  getDefaultLevels() {
    return {
      error: true,
      warn: true,
      info: true,
      debug: true,
    };
  }

  on(...levelNames: LevelName[]) {
    levelNames.forEach((n) => this.updateLevel(n, true));
    return this;
  }
  onAll() {
    Object.entries(this.levels).forEach((prev) => {
      this.updateLevel(prev[0] as LevelName, true);
    });
  }

  off(...levelNames: LevelName[]) {
    levelNames.forEach((n) => this.updateLevel(n, false));
    return this;
  }
  offAll() {
    Object.entries(this.levels).forEach((prev) => {
      this.updateLevel(prev[0] as LevelName, false);
    });
  }

  @AutoBind
  updateLevel(n: LevelName, value: boolean) {
    this.levels[n] = value;
  }

  @AutoBind
  log(levelName: LevelName, ...text: LogItem[]) {
    this.stdOut(levelName, text, "log");
  }
  @AutoBind
  dir(levelName: LevelName, item: any, options?: Partial<ConsoleDirOptions>) {
    this.stdOut(levelName, item, "dir", options);
  }
  @AutoBind
  info(...text: LogItem[]) {
    this.stdOut("info", text, "info");
  }
  @AutoBind
  error(...text: LogItem[]) {
    this.stdOut("error", text, "error");
  }
  @AutoBind
  warn(...text: LogItem[]) {
    this.stdOut("warn", text, "warn");
  }
  @AutoBind
  debug(...text: LogItem[]) {
    this.stdOut("debug", text, "debug");
  }
  @AutoBind
  clear() {
    consoleMethods.clear();
    return this;
  }

  @AutoBind
  overrideConsole() {
    console.dir = this.dir;
    console.warn = this.warn;
    console.error = this.error;
    console.clear = this.clear;
    console.log = this.log;
  }

  private clearLogs() {
    this.logs = [];
  }

  private stdOut(
    level: LevelName,
    text: LogItem[],
    logMethod: LogMethod,
    options?: Partial<ConsoleDirOptions>
  ) {
    if (this.canNotSend(level)) {
      this.clearLogs();
      return;
    }

    const prefix = this.fixPrefix(level);
    if (prefix) this.logs.unshift(prefix);

    if (logMethod === "dir") {
      consoleMethods.log(...this.logs);
      consoleMethods.dir(text, options);
    } else {
      consoleMethods[logMethod](...this.logs, ...text);
    }

    this.clearLogs();
  }

  private fixPrefix(level: LevelName) {
    return this.options.withPrefix ? this.getPrefix(level) : "";
  }

  private getPrefix(level: LevelName): string {
    const stackMan = new StackMan(this.options.fullLine);

    return `[${level}] ${stackMan.getFileName()}`;
  }

  private canNotSend(levelName: LevelName) {
    return this.levels[levelName] === false;
  }
}

function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  return {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    },
    set(v) {
      descriptor.value = v.bind(this);
    },
  } as PropertyDescriptor;
}
