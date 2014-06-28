var dsl = require('fishyfish')

var version = "0.2.5"
  , tar = ["riemann-", version, ".tar.bz2" ].join("")
  , installpath = "/root/riemann/riemann-" + version

module.exports = function(opts) {
  return dsl("Riemann")
  .wget({
      dir: "/root/riemann",
      from: "http://aphyr.com/riemann/" + tar })
  .tar({
      flags: "xvfj",
      file: "/root/riemann/" + tar})
    .config(function(c) {
      return c.add({
          from: __dirname + "/config/riemann/riemann.config",
          to: installpath + "/etc/riemann.config",
          transform: dsl.mustache(opts) })
        .add({
          from: __dirname + "/runit/riemann",
          to: "/etc/service/riemann/run",
          transform: dsl.mustache({ installpath: installpath })
        })
      })
    }
