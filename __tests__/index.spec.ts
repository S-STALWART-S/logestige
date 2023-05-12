import { consoleMethods, Logestige } from "../src/classes/Logestige";

describe("Logger", () => {
  let logger: Logestige;

  beforeEach(() => {
    logger = new Logestige();
  });

  it("should initialize with default log levels", () => {
    const defaultLevels = logger.getDefaultLevels();

    expect(logger.levels).toEqual(defaultLevels);
  });

  it("should be able to turn on log levels individually", () => {
    logger.offAll();
    logger.on("error", "warn");

    expect(logger.levels.error).toEqual(true);
    expect(logger.levels.warn).toEqual(true);
    expect(logger.levels.info).toEqual(false);
    expect(logger.levels.debug).toEqual(false);
  });

  it("should be able to turn off log levels individually", () => {
    logger.off("info", "debug");

    expect(logger.levels.error).toEqual(true);
    expect(logger.levels.warn).toEqual(true);
    expect(logger.levels.info).toEqual(false);
    expect(logger.levels.debug).toEqual(false);
  });

  it("should be able to turn off all log levels", () => {
    logger.onAll();
    logger.offAll();

    Object.values(logger.levels).forEach((level) => {
      expect(level).toEqual(false);
    });
  });

  it("should be able to turn on all log levels", () => {
    logger.offAll();
    logger.onAll();

    Object.values(logger.levels).forEach((level) => {
      expect(level).toEqual(true);
    });
  });

  it("should be able to update a single log level", () => {
    logger.updateLevel("error", false);

    expect(logger.levels.error).toBe(false);
    expect(logger.levels.warn).toBe(true);
    expect(logger.levels.info).toBe(true);
    expect(logger.levels.debug).toBe(true);
  });

  it("should be able clear logs array", () => {
    logger.log("debug", "foo", "bar");

    expect(logger.logs).toEqual([]);
  });

  it("should be able to log messages", () => {
    const spy = jest.spyOn(consoleMethods, "log");

    logger.log("debug", "foo", "bar");

    expect(spy).toHaveBeenCalledWith("foo", "bar");
    expect(logger.logs).toEqual([]);
  });

  it("should be able to log errors", () => {
    const spy = jest.spyOn(consoleMethods, "error");

    logger.error("foo", "bar");

    expect(spy).toHaveBeenCalledWith("foo", "bar");
    expect(logger.logs).toEqual([]);
  });

  it("should be able to log warnings", () => {
    const spy = jest.spyOn(consoleMethods, "warn");

    logger.warn("foo", "bar");

    expect(spy).toHaveBeenCalledWith("foo", "bar");
    expect(logger.logs).toEqual([]);
  });

  it("should be able to log info", () => {
    const spy = jest.spyOn(consoleMethods, "info");

    logger.info("foo", "bar");

    expect(spy).toHaveBeenCalledWith("foo", "bar");
    expect(logger.logs).toEqual([]);
  });

  it("should be able to log debug info", () => {
    const spy = jest.spyOn(consoleMethods, "debug");

    logger.debug("foo", "bar");

    expect(spy).toHaveBeenCalledWith("foo", "bar");
    expect(logger.logs).toEqual([]);
  });

  it("should be able to clear logs", () => {
    const spy = jest.spyOn(consoleMethods, "clear");

    logger.log("debug", "foo", "bar");

    logger.clear();

    expect(spy).toHaveBeenCalled();
  });

  // it("should be able to override console", () => {
  //   logger.overrideConsole();

  //   expect(console.dir).toBe(logger.dir);
  //   expect(console.warn).toBe(logger.warn);
  //   expect(console.error).toBe(logger.error);
  //   expect(console.clear).toBe(logger.clear);
  // });
});
