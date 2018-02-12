# ssb-proc

add process stats to `sbot status`

## example

```

> sbot plugins.install ssb-proc
> # now, restart sbot...

> sbot status
```

output: (snipped at ...)

```
{
  ...
  "proc": {
    "pid": 16873,
    "uptime": 170.073,
    "memoryUsage": {
      "rss": 187174912,
      "heapTotal": 75300864,
      "heapUsed": 68445192,
      "external": 21983959
    },
    "cpuUsage": {
      "user": 4679999,
      "system": 496666
    },
    "blockyness": 0.96,
    "loadavg": [
      0.37158203125,
      0.5224609375,
      0.45458984375
    ],
    "io": {
      "rchar": 78338626,
      "wchar": 796716,
      "syscr": 7711,
      "syscw": 1999,
      "read_bytes": 0,
      "write_bytes": 901120,
      "cancelled_write_bytes": 0
    },
    "net": {
      "lo:": {
        "rx": 740057,
        "tx": 740057
      },
      "wlp2s0:": {
        "rx": 214996,
        "tx": 111649
      }
    }
  }
}
```

## status.proc

under the proc heading, are the following measurements

### pid

the [process identifier](https://en.wikipedia.org/wiki/Process_identifier) of the node process.

### uptime

length of time in seconds that the current sbot process has been running.

### memoryUsage

node.js process [memory usage](http://devdocs.io/node/process#process_process_memoryusage)

### blockyness

A the [ratio of setIntervals that have fired in the last second](https://github.com/dominictarr/ssb-proc/blob/master/index.js#L16-L24).
If this is not near 1 something must be hogging the CPU, possibly
heavy loops.

### loadavg

average cpu usage in the last minute, 5 minutes and 15 minutes.

### io

output of [`/proc/{pid}/io`](http://docs.1h.com/Proc_I/O_Explained)

`rchar` and `wchar` is reads and write calls to the os,
including cached reads. `read_bytes` and `write_bytes` is the actual
bytes that have been read or written to disk, by this process
since it started.

### net

Bytes received (rx) and transmitted per network interface,
taken from [/proc/net/dev](http://www.onlamp.com/pub/a/linux/2000/11/16/LinuxAdmin.html)

Unlike the other measurements,
This applies to the system as a whole and not the specific process.
I would like to make it per process - any suggestions or PR most appreciated!


## License

MIT




