const xlsx = require('xlsx')
function getValue (props, field = 'v', defaultValue = 0) {
  if (props && props[field]) {
    return props[field]
  }
  return defaultValue
}

function fetchData (nabe) {
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
  var data = []
  var sheet = workbook.Sheets[workbook.SheetNames[0]]
  var nextEntry
  do {
    data[i - 6] = {
      Neighborhood: getValue(sheet['B' + i], 'v', ''),
      Price: getValue(sheet['T' + i]),
      Address: getValue(sheet['I' + i], 'v', ''),
      ZipCode: getValue(sheet['K' + i], 'v', ''),
      TotalUnits: getValue(sheet['N' + i]),
      SqFeet: getValue(sheet['P' + i]),
      SaleDate: getValue(sheet['U' + i], 'w', '')
    }
    nextEntry = workbook.Sheets[workbook.SheetNames[0]]['B' + (i + 1)]
    i = i + 1
  } while (nextEntry !== undefined)
  return data
}

function log (data) {
  // TODO add a verbose check before printing out
  console.log(data)
}
// squirrel(nabe).median()
// squirrel({nabe,address,type}).median()
// squirrel constructor acts as a filter from a params object
var squirrel = {
  data: [],
  Borough: '',
  filtered: [],
  filter: function (params) {
    log(params)
    this.Borough = params.Borough
    this.data = fetchData(this.Borough)
    this.filtered = this.data
    if (params.ZipCode !== undefined) {
      // eslint-disable-next-line eqeqeq
      this.filtered = this.data.filter(sale => sale.ZipCode == params.ZipCode)
    }
    return this
  },
  median: function () {
    return this.filtered.reduce((acc, sale) => acc + sale.Price, 0) / this.filtered.length
  }

}
module.exports = squirrel
