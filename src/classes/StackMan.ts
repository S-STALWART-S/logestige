import { StackManOptions } from "../types";

export class StackMan {
  options: StackManOptions;

  constructor(fullLine: boolean) {
    this.options = {
      fullLine,
    };
  }

  getFileName(): string {
    const fileName = this.getStackLines().trim().split(/\(|\)/g)[1];
    if (this.options.fullLine) return fileName;

    return fileName.split("/").at(-1) || "";
  }

  private getStackLines(): string {
    return this.getStackTrace().split("\n")[8] || "";
  }

  private getStackTrace(): string {
    return new Error().stack || "";
  }
}
