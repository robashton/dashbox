var dsl = require('fishyfish')

module.exports = function(opts) {
  opts.installpath = opts.installpath || "/opt/elasticsearch"
  return dsl.module("elasticsearch")
          .wget({
            dir: "/root/elasticsearch",
            from: "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .tar({
            flags: "xzf",
            file: "/root/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .run("cp -r /root/elasticsearch/elasticsearch-1.2.1 " + opts.installpath)
          .config(function(c) {
            return c.add({
              from: __dirname + "/runit/elasticsearch",
              to: "/etc/service/elasticsearch/run",
              transform: dsl.mustache(opts),
              mode: '744'
            })
            .add({
              from: __dirname + "/config/elasticsearch/elasticsearch.yml",
              to: "/opt/elasticsearch/config",
              transform: dsl.mustache(opts)
            })
          })
        }
