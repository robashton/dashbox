var dsl = require('fishyfish')

module.exports = dsl.module("base setup")
  .from("phusion/passenger-customizable:0.9.10")
  .run("apt-get update")
  .run("apt-get update --fix-missing -y")
  .install("wget")
  .install("openjdk-7-jre --no-install-recommends")
