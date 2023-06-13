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

  constructor() {
    this.updateLevel = this.updateLevel.bind(this);
    this.log = this.log.bind(this);
    this.dir = this.dir.bind(this);
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
    this.debug = this.debug.bind(this);
    this.clear = this.clear.bind(this);
    this.overrideConsole = this.overrideConsole.bind(this);
  }

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

  updateLevel(n: LevelName, value: boolean) {
    this.levels[n] = value;
  }

  log(levelName: LevelName, ...text: LogItem[]) {
    this.stdOut(levelName, text, "log");
  }
  dir(levelName: LevelName, item: any, options?: Partial<ConsoleDirOptions>) {
    this.stdOut(levelName, item, "dir", options);
  }
  info(...text: LogItem[]) {
    this.stdOut("info", text, "info");
  }
  error(...text: LogItem[]) {
    this.stdOut("error", text, "error");
  }
  warn(...text: LogItem[]) {
    this.stdOut("warn", text, "warn");
  }
  debug(...text: LogItem[]) {
    this.stdOut("debug", text, "debug");
  }
  clear() {
    consoleMethods.clear();
    return this;
  }

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
