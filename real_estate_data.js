var csv = require("fast-csv")
let options = { headers: 'true', objectMode:'true', ignoreEmpty:'true' }
let borough = 'Brooklyn';
let filters = { Neighborhood: 'Greenpoint' }
let actions = { Calculate: 'Median' }
csv.fromPath("data/rollingsales_"+borough+".csv", options)
.on("data", function(data){
	var keep = false;
	log(data);
	for (const k in filters){
			if(filters[k] == data[k]){
				keep = true	
			}
	};
	//forEach actions run a function, this can also be a node JS script
	if(keep){
		console.log(entry);
	}
});
//inStream.pipe(process.stdout)

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
function log (data) {
  // TODO add a verbose check before printing out
  console.log(data)
}


