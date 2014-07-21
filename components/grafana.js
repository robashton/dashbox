var dsl = require('fishyfish')

module.exports = function(opts) {
  opts.installpath = "/root/grafana/grafana-1.5.4"
  return dsl.module("grafana")
    .wget({
      dir: "/root/grafana",
      from: "http://grafanarel.s3.amazonaws.com/grafana-1.5.4.tar.gz"
    })
    .tar({
      flags: "xzf",
      file: "/root/grafana/grafana-1.5.4.tar.gz"
    })
    .run("npm install -g http-server")
    .config(function(c) {
      return c.add({
          from: __dirname + "/runit/grafana",
          to: "/etc/service/grafana/run",
          transform: dsl.mustache(opts),
          mode: '744'
        })
        .add({
          from: __dirname + "/config/grafana/config.js",
          to: opts.installpath + "/config.js",
          transform: dsl.mustache(opts)
        })
    })
}
