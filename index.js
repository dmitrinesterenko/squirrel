const xlsx = require('xlsx')
function fetch_data(nabe){
	stream = fs.createReadStream('data/' + nabe + '.xls')
}
function log(data){
    	//TODO add a verbose check before printing out 
	console.log(data)
}
// squirrel(nabe).median()
// squirrel({nabe,address,type}).median()
// squirrel constructor acts as a filter from a params object
squirrel = {
    	data: {},
	nabe: "",

	filter: function(nabe){
		this.nabe=nabe
		this.data = fetch_data(nabe)
		if(this.nabe == 'test'){
			this.data = [100.00]
		}else{
			this.data = fetch_data(nabe)
		}
		return this
	},
	median: function(){
		var sum = 0.0
		var length = this.data.length
		for(var i = 0; i<length; i++){
			sum = sum + this.data[i]
		}
		return sum / length
	}	
	
}
module.exports = squirrel
