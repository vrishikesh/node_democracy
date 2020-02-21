'use strict'

const Primus = require('primus')
const Democracy = require('democracy')
const port = process.argv[2] || 3000

const primus = Primus.createServer({port, transformer: 'websockets'})
const dem = new Democracy({
  source: `0.0.0.0:${port}`,
  peers: ['0.0.0.0:3000', '0.0.0.0:3001']
})

dem.subscribe('global')
dem.on('global', (data) => {
  primus.write(data)
})

primus.on('connection', (spark) => {
  console.log('CONNECTED ', spark.id)

  spark.on('data', function(data) {
    // spark.write(data) // for single connection
    primus.write(data) // broadcast
    dem.publish('global', data)
  })
})

primus.on('disconnection', function (spark) {
  console.log('DISCONNECTED ', spark.id)
})
