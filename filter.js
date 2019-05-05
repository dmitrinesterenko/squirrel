const { Writable } = require('stream');
//This is using the simplified constructor approach
//to initializing the stream
const outStream = new Writable({
	writableObjectMode: true,
	objectMode: true,
  write(chunk, encoding, callback) {
    console.log(JSON.parse(chunk))
    callback();
  }
});

process.stdin.pipe(outStream);


