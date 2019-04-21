// Read a stream, perform a filter operation on it and output the stream
// - Duplex streams that can modify or transform the data as it is written and
// read
// We want object mode streams so that we are transferring completed JS objects
// back and forth
const readStream = getMyInput()
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data`)
})
