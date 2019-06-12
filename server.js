let WebSocketServer = require('ws').Server
let port_number = 3000
let wss = new WebSocketServer({ port: port_number })

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbmodem1432401', { baudRate: 9600 })
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

console.log('💾: Started server at port: ', port_number)

wss.on('connection', ws => {
  console.log('💾: Someone connected to the server.')
  ws.send('A connection to the socket has been made!')
  parser.on('data', val => ws.send(val))
})