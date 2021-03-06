var dsl = require('teabox')

// NOTE: Half of this comes from the bash scripts on the base image
// We really need a non version of this
module.exports = function(opts) {
  return dsl.module("Riemann Dash")
  .run("/build/ruby1.9.sh")
  .run("/build/ruby-switch --set ruby1.9.1")
  .run("/build/devheaders.sh")
  .run("gem install riemann-client riemann-tools riemann-dash")
  .config(function(c) {
    return c.add({
      from: __dirname + "/config/riemann-dash/config.rb",
      to: "/root/riemann-dash/config.rb",
      transform: dsl.mustache(opts)
    })
    .add({
      from: __dirname + "/runit/riemann-dash",
      to: "/etc/service/riemann-dash/run",
      mode: '744'
    })
  })
}


