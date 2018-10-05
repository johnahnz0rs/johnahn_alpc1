
// ASSUMPTIONS
// 1. user will tell me whether to encode or decode
// 2.


// NOTES
// 1. i should've spent even more time reading the test prompts and strategizing my solution before i jumped into the code. like, almost excessively so.
// 2. if i would've done 1 (above), i might not have written the myProgram function (which validates inputs before jumping into either the encoding or decoding functions). fortunately, i ended up using the validations anyway, so it wasn't wasted time.


// TESTS
// myProgram('7FJK', 'decode')
// myProgram('1234', 'decode')
// myProgram('4000', 'decode')
// myProgram('0', 'decode')
// myProgram('7F7F', 'decode')
// myProgram('5000', 'decode')
// myProgram('2000', 'decode')
// myProgram('0A05', 'decode')
// myProgram('5500', 'decode')

// myProgram('o', 'encode')
// myProgram(0, 'encode')
// myProgram(-8192, 'encode')
// myProgram(8191, 'encode')
// myProgram(2048, 'encode')
// myProgram(-4096, 'encode')



function myProgram(input, direction) {
	// if direction == encode, then validate and encode
	if (direction === 'encode') {
		try {
			if (input - 0 != input) {
				throw "not a number";
			} else if (('' + input).trim().length < 1) {
				throw "please enter a number in range (-8192 to 8191)";
			} else if (input < -8192 || input > 8191) {
				throw "number is outside of range (-8192 to 8191)";
			}
		}
		catch(err) { return console.log('ERROR:', err); }
		encode(input);
	}
	
	// else if direction == decode, then validate and decode
	else if (direction === 'decode') {
		const a = parseInt(input, 16);
		console.log('a', a);
		try {
			if (a > 0x7F7F || a < 0x0000) {
				throw "hexadecimal value is outside of range (0000 to 7F7F)";
			} else if (a.toString(16) !== input.toLowerCase()) {
				throw "not a hexadecimal value";
			}
		}
		catch(err) { return console.log('ERROR:', err); }
		while (input.length < 4) {
			input = '0' + input;
        }
		decode(input);
	}
}




// encoding v2
// 1. add 8192 to raw decimal number (input)
// 2. convert decimal input to binary, and add preceding 0's until there are 15 chars total
// 3. loByte = '0' + last 7 chars of the binary
// 4. hiByte = first 8 chars of the binary
// 6. convert both bytes to 2-char hex with preceding 0
// 7. combine each hex to get one 4-char hex, and return that value

function encode(input) {

	// add 8192 to raw input to shift range out of negative
	input = parseInt(input, 10) + 8192;

	// convert translated input to 15-char binary value (with preceding 0's);
	let binary = input.toString(2);
	while (binary.length < 15) {
		binary = '0' + binary;
	}

	let returnString = '';

	// add 2-digit 0xhiByte (with preceding 0) to returnString;
	let hiByte = binary.slice(0,8);
	hiByte = parseInt(hiByte, 2).toString(16);
	hiByte < 10 ? returnString += '0' + hiByte : returnString += hiByte.toUpperCase();

	// add 2-digit 0xloByte (with preceding 0) to returnString;
	let loByte = '0' + binary.slice(8);
	loByte = parseInt(loByte, 2).toString(16);
	loByte < 10 ? returnString += '0' + loByte : returnString += loByte.toUpperCase();

	// return returnString, ie the encoded hexadecimal value;
	console.log(returnString);
	return returnString;

}




// decoding (reverse of encoding?)
// 1. hiByte = first 2 chars of input
// 2. convert hiByte from hex to bin
// 3. add to binaryInput
// 4. loByte = last 2 chars of input
// 5. convert loByte from hex to bin, and add preceding 0's until there are 7 chars total
// 6. add to binaryInput
// 7. convert from binary to decimal, and return that value

function decode(input) {
	// console.log('lol decode this:', input, 'hex');
	// console.log('input in binary', parseInt(input,16).toString(2), parseInt(input, 16).toString(2).length);

	let hiByte = input.slice(0,2);
	hiByte = parseInt(hiByte, 16).toString(2);

	let loByte = input.slice(2);
	loByte = parseInt(loByte, 16).toString(2);
	while (loByte.length < 7) {
		loByte = '0' + loByte;
	}

	let formattedBinaryInput = hiByte + loByte;
	// console.log('hiByte', hiByte, hiByte.length);
	// console.log('loByte', loByte, loByte.length);
	// console.log(formattedBinaryInput, formattedBinaryInput.length);

	let lol = parseInt(formattedBinaryInput, 2).toString(10);

	console.log(parseInt(lol) - 8192);
	return parsetInt(lol) - 8192;
}




