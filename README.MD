# Logger

## Description
Easy to use logger for nodejs applications.
                                   
Takes a message and writes it to a datestamped log file `mm-dd-yyyy-log.txt` with a time stamp `HH-MM-SS AM/PM`.

## Usage
```javascript
// this is an ES6 module
import Logger from 'logger';
Logger.log('Hello World');
```
That is it! The log file will be created a logs directory that is created at the root of the project.

## Options
```javascript
Logger.omitConsole = true; // default: false
Logger.log('Hello World'); // will not log to console
```
```javascript
logger.omitTime = true; // default: false
Logger.log('Hello World'); // will not put the time stamp in the log file.
```

This class uses static methods so you do not need to instantiate it.

This module is OS-agnostic and will work on Windows, Mac, and Linux.