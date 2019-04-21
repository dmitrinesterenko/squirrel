const xlsx = require('xlsx')
function get_value(props, field = "v", defaultValue = 0){
	if(props && props[field]){
		return props[field]
	}
	return defaultValue
}

function fetch_data(nabe){
	//stream = fs.createReadStream('data/' + nabe + '.xls')
	var workbook = xlsx.readFile('data/rollingsales_' + nabe + '.xls')
	//For work book details query the Sheets object
	//workbook.Sheets[workbook.SheetNames[0]] 
	//the workbooks data starts with
	//Borough -- A6-A100,000
	//Neighborhood - B6-
	//Building Class Category - C6 -
	//Class at present - D6
	//Block - E6
	//Lot - F6
	//Easement - G6
	//Class at present - H6
	//Address - I6
	//Apartment number - J6
	//Zip code K6
	//Residential units - L6
	//Commerical Units - M6
	//Total units - N6
	//Land square feet - O6
	//Gross square feet - P6
	//Year built - Q6
	//Tax class - R6
	//Building class - S6
	//Sale price - T6
	//Sale date - U6
	//what we need
	//Neighborhood, Address, zip code, total units, gross square feet, sale
	//price and sale date
	//B, I, K, N, P, T, U
	//start with the magic number where these spreadsheets start their data
	var i = 6
	var data = []
	var sheet = workbook.Sheets[workbook.SheetNames[0]]
	do{
	    	var total_units = 0
	  	data[i-6] = {
			Neighborhood: get_value(sheet["B"+i], "v", ""),
			Price: get_value(sheet["T"+i]),
			Address: get_value(sheet["I"+i], "v", ""),
			ZipCode: get_value(sheet["K"+i], "v", ""),
			TotalUnits: get_value(sheet["N"+i]),
			SqFeet: get_value(sheet["P"+i]),
			SaleDate: get_value(sheet["U"+i],"w", "")
		}
		next_entry = workbook.Sheets[workbook.SheetNames[0]]["B"+(i+1)]
		i = i + 1

	}while(next_entry != undefined)
	return data
}
function log(data){
    	//TODO add a verbose check before printing out 
	console.log(data)
}
// squirrel(nabe).median()
// squirrel({nabe,address,type}).median()
// squirrel constructor acts as a filter from a params object
squirrel = {
    	data: [],
	Borough: "",
        filtered: [],	
	filter: function(params){
		this.Borough=params.Borough
		this.data = fetch_data(this.Borough)
		this.filtered = this.data
		if(params.ZipCode != undefined){
			this.filtered = this.data.filter(sale => sale.ZipCode == params.ZipCode);
		}
		return this
	},
	median: function(){
		return this.filtered.reduce((acc, sale) => acc + sale.Price, 0)
		/ this.filtered.length
	}	
	
}
module.exports = squirrel
