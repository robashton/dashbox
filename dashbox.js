#!/usr/bin/env node

var docker = require('fishyfish')
  , base = require('./components/base')
  , build = require('./components/build')
  , riemann = require('./components/riemann')
  , riemanndash = require('./components/riemann-dash')
  , influx = require('./components/influx')
  , grafana = require('./components/grafana')
  , elasticsearch = require('./components/elasticsearch')

var config = {
  influxdb: "riemann",
  influxport: 8086,
  riemanndashport: 4567,
  influxadminport: 8083,
  influxapiport: 8086,
  grafanaport: 80,
  elasticsearchport: 9200
}

docker.box("dashbox")
      .env("HOME", "/root")
      .cmd("run", "/sbin/my_init")
      .cmd("shell", "bash -l")
      .expose(config.influxport)
      .expose(config.influxadminport)
      .expose(config.riemanndashport)
      .expose(config.elasticsearchport)
      .expose(config.grafanaport)
      .include(base)
      .include(build)
      .include(riemann({
        influxhost: "127.0.0.1",
        influxdb: config.influxdb,
        influxport: config.influxport
      }))
      .include(riemanndash({
        port: config.riemanndashport
      }))
      .include(influx({
        adminport: config.influxadminport,
        apiport: config.influxapiport
      }))
      .include(grafana({
        port: config.grafanaport,
        elasticsearchport: config.elasticsearchport,
        influxdb: config.infuxdb,
        influxport: config.influxapiport
      }))
      .include(elasticsearch({
        port: config.elasticsearchport
  })).execute()
