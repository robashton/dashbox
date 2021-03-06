var dsl = require('teabox')

module.exports = function(opts) {
  return dsl.module("influx")
  .wget({ dir: "/root/influx",
          from: "http://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb"})
  .run("dpkg -i /root/influx/influxdb_latest_amd64.deb")
  .config(function(c) {
    return c.add({
      from: __dirname + "/runit/influxdb",
      to: "/etc/service/influxdb/run",
      mode: '744'
    })
    .add({
      from: __dirname + "/config/influxdb/config.toml",
      to: "/opt/influxdb/shared/config.toml",
      transform: dsl.mustache(opts)
    })
  })
}
