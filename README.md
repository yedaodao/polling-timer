# polling-timer

[![Build Status](https://travis-ci.org/yedaodao/polling-timer.svg?branch=master)](https://travis-ci.org/yedaodao/polling-timer)
[![Coverage Status](https://coveralls.io/repos/github/yedaodao/polling-timer/badge.svg?branch=master)](https://coveralls.io/github/yedaodao/polling-timer?branch=master)

Dispatch a polling action for waiting an expected condition

## Get Started

Install the package:

```shell
npm install --save polling-timer
```

Use the package:

```javascript
import PollingTimer from 'polling-timer';

// runs expected times
let timer = new PollingTimer(10000, 15000); // 10000 is the interval time, 10s; 15000 is the timeout, 15s.
let runCounts = 0;
timer.setRunCallback(() => {
    // Callback after the interval time
    // If the result is not true, this function will be invoked again and again.
    runCounts++;
    if(runCounts === 5) {
        return true
    }
});
timer.setEndCallback(() => {
    // Callback when timer stops
});
timer.setTimeoutCallback(() => {
    // Callback when timer is timeout
});
timer.start();
```

The `setRunCallback()` supports the promise result.

```javascript
import PollingTimer from 'polling-timer';
let timer = new PollingTimer(10000);
timer.setRunCallback(function () {
    // If the promise does not resolve true, this function will be invoked again and again. 
     return new Promise(function (resolve, reject) {
         setTimeout(function () {
             resolve(true);
         }, 1000);
     });
});
timer.start()
```

## API

### Constructor(interval, timeout)

**params:**

interval: The interval time, millisecond

timeout: The timeout; If it is not set, the timer has no timeout.

### setInterval(interval)

A way to set interval time after initialization.

### setTimeout(timeout)

A way to set timeout after initialization

### setRunCallback(func)

Set the callback which is invoked after the interval time.

**params**

func: A callback function which returns true or Promise object.

### setEndCallback(func)

Set the callback which is invoked after the timer timeout.

**params**

func: A callback function

### setEndCallback(func)

Set the callback which is invoked after the timer stopping.

**params**

func: A callback function

### start()

Start the timer.

### stop()

Stop the timer

## Issue

If you have any questions or requirements, use [Issues](https://github.com/yedaodao/polling-timer/issues)

