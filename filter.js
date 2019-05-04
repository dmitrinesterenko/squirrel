const { Readable } = require('stream')
// Read a stream, perform a filter operation on it and output the stream
// - Duplex streams that can modify or transform the data as it is written and
// read
// We want object mode streams so that we are transferring completed JS objects
// back and forth
const readStream = new Readable({
  readableObjectMode: true})

readStream.on('data', (chunk) => {
  if(chunk.toString().indexOf('A') > 0){
    console.log('I hear your message loud and clear')
  }
  console.log(`Received ${chunk.length} bytes of data`)
})

process.stdin.pipe(readStream)
