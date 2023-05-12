# Logestige

`Logestige` is a customizable logging utility for JavaScript applications. It allows you to log messages at different levels and selectively turn logging on or off for specific levels.

## Installation

`Logestige` can be installed via npm or yarn:

```bash
npm install logestige
```

or

```bash
yarn add logestige
```

## Usage

```javascript
import { Logestige } from "logestige";

const logger = new Logestige();

logger.log("info", "Hello, world!"); // logs "Hello, world!" at the "info" level
```

You can also use the convenience methods `error()`, `warn()`, `info()`, and `debug()`:

```javascript
logger.error("Something went wrong"); // logs "Something went wrong" at the "error" level
```

You can also override the default `console` methods by calling `overrideConsole()`. This will replace the default `console` methods with the corresponding `Logestige` methods:

```javascript
const logger = new Logestige();

logger.overrideConsole(); // replaces default console methods with Logestige methods

console.log("info", "This will be logged by Logestige"); // this will be logged by Logestige with the level of "info".
```

<!-- ## Log Formats

When you log a message with `Logestige`, it will be logged with a standardized format that includes the level name and timestamp. Here's an example of what a log message might look like:

```
[INFO] [2023-05-10T12:34:56.789Z] This is an info message
``` -->

## Log Levels

By default, all log levels are enabled. You can selectively turn logging `on` or `off` for specific levels by calling `on()` or `off()` with the appropriate level(s). For example to turn `off` the "debug" level:

```javascript
logger.off("debug"); // turns off logging for the "debug" level

logger.debug("This won't be logged"); // this won't be logged because "debug" logging is turned off
```

To turn `on` the "debug" level:

```javascript
logger.on("debug"); // turns logging back on for the "debug" level

logger.debug("This will be logged now");
```

The available logging levels are:

- `error`
- `warn`
- `info`
- `debug`

You can log messages at a specific level by calling the corresponding method:

```javascript
logger.error("Something went wrong");
logger.warn("This could be a problem");
logger.info("Just an FYI");
logger.debug("Debugging information");
```

You can turn all logging levels `on` or `off` by calling `onAll()` or `offAll()`
