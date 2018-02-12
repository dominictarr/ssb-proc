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

##
## License

MIT




