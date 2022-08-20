const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
}); 

const test = async (f) => {
	process.stdout.write("Test Input: \n");
	for await (const line of readline){
		f(line);
	}
};

module.exports = test;
