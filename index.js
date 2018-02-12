var fs = require('fs')
var path = require('path')
var os = require('os')

exports.name = 'proc'
exports.version = '1.0.0'
exports.manifest = {}

function startInterval (fn, time) {
  fn()
  return setInterval(fn, time)
}

exports.init = function (sbot, opts) {

  var ts = Date.now(), c = 0, N = 25, blockyness = 0, io = {}, cpu = {}

  setInterval(function () {
    c++
    var _ts = Date.now()
    if(ts + 1000 <= _ts) {
      blockyness = 1-(c/N)
      c = 0
    }
  }, 1000/N).unref()

  startInterval(function () {
    fs.readFile(path.join('/proc', ''+process.pid, 'io'), 'utf8', function (err, str) {
      str.split(/\n/).forEach(function (line) {
        var parts = line.split(/:\s+/)
        if(parts[0]) io[parts[0]] = +parts[1]
      })
    })
  }, 1000).unref()

//  startInterval(function () {
//    fs.readFile(path.join('/proc', ''+process.pid, 'stat'), 'utf8', function (err, str) {
//      str.split(/\n/).forEach(function (line) {
//        var parts = line.split(/:\s+/)
//        if(parts[0]) io[parts[0]] = +parts[1]
//      })
//    })
//  }, 1000).unref()
//
  var _net, net = {}
  startInterval(function () {
    fs.readFile('/proc/net/dev', 'utf8', function (err, str) {
      var o = {}
      var lines = str.split(/\n/).slice(2)
      lines.forEach(function (line) {
        if(line) {
          var parts = line.trim().split(/\s+/)
          //extract bytes, recieve and send
          o[parts[0]] = {rx: +parts[1], tx: +parts[9]}
        }
      })
      if(!_net) _net = o
      for(var k in o)
        net[k] = {rx: o[k].rx - _net[k].rx, tx: o[k].tx - _net[k].tx} //convert to bytes since process started

    })
  }, 1000).unref()


  sbot.status.hook(function (fn, args) {
    var status = fn.apply(this, args)
    status.perf = {
      pid: process.pid,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      blockyness: blockyness,
      loadavg: os.loadavg(),
      io: io,
      net: net
    }
    return status
  })

}











