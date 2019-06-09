const xlsx = require('xlsx')
const { Readable } = require('stream')

var csv = require("fast-csv")
options = { headers: 'true', objectMode:'true', ignoreEmpty:'true' }
csv.fromPath("data/rollingsales_"+Borough+".csv", options)
.on("data", function(data){
	for k in filters.keys{
			if(filters[k] == data[k]){
				keep = true	
			}
		}
		if(keep){
			console.log(entry);
		}

	}
};
//inStream.pipe(process.stdout)

//Initial params are probably:
// params = { Borough: "Brooklyn|Queens|New York" }
// they indicate which Bourough CSV file we wish to read
function RealEstateStream(params, options){
		if (!(this instanceof RealEstateStream)){
			return new RealEstateStream(params, options);
		}

		if(!options) options = {};
		options.objectMode = true;
		Readable.call(this, options);
		this.params = params;
}
//our stream will inherit from Readable
util.inherits(RealEstateStream, Readable);

//What does it mean to "read" from our stream
RealEstateStream.prototype._read = function(){

	const inStream = new Readable({
		objectMode: true,
		read() {}
	})
	inStream.pipe(process.stdout)

	function getValue (props, field = 'v', defaultValue = 0) {
	  if (props && props[field]) {
	    return props[field]
	  }
	  return defaultValue
	}
	// stream = fs.createReadStream('data/' + nabe + '.xls')
  var workbook = xlsx.readFile('data/rollingsales_' + nabe + '.xls')
  // For work book details query the Sheets object
  // workbook.Sheets[workbook.SheetNames[0]]
  // the workbooks data starts with
  // Borough -- A6-A100,000
  // Neighborhood - B6-
  // Building Class Category - C6 -
  // Class at present - D6
  // Block - E6
  // Lot - F6
  // Easement - G6
  // Class at present - H6
  // Address - I6
  // Apartment number - J6
  // Zip code K6
  // Residential units - L6
  // Commerical Units - M6
  // Total units - N6
  // Land square feet - O6
  // Gross square feet - P6
  // Year built - Q6
  // Tax class - R6
  // Building class - S6
  // Sale price - T6
  // Sale date - U6
  // what we need
  // Neighborhood, Address, zip code, total units, gross square feet, sale
  // price and sale date
  // B, I, K, N, P, T, U
  // start with the magic number where these spreadsheets start their data
  var i = 6
  var data
  var sheet = workbook.Sheets[workbook.SheetNames[0]]
  var nextEntry
  do {
    data = {
      Neighborhood: getValue(sheet['B' + i], 'v', ''),
      Price: getValue(sheet['T' + i]),
      Address: getValue(sheet['I' + i], 'v', ''),
      ZipCode: getValue(sheet['K' + i], 'v', ''),
      TotalUnits: getValue(sheet['N' + i]),
      SqFeet: getValue(sheet['P' + i]),
      SaleDate: getValue(sheet['U' + i], 'w', '')
    }
    nextEntry = workbook.Sheets[workbook.SheetNames[0]]['B' + (i + 1)]
		//process.stdout.write(data)
		//console.log(data)
		inStream.push(JSON.stringify(data))
    i = i + 1
	} while (nextEntry !== undefined)
	inStream.push(null)
}

function log (data) {
  // TODO add a verbose check before printing out
  console.log(data)
}

var filterStream = new RealEstateStream("Brooklyn");
filterStream.on('readable', function(){
	var entry;
	var keep = false;
	while (null !== (entry = readStream.read())){
		for k in filter.keys{
			if(filter[k] == entry[k]){
				keep = true	
			}
		}
		if(keep){
			console.log(entry);
		}
	}

});

