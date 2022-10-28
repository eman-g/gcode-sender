const { SerialPort, ReadlineParser } = require('serialport');

const GCODE = [
  "G01 X254.5 Y245.07875\n", 
  "G01 X248.25 Y245.50375\n", 
  "G01 X242 Y245.905\n", 
  "G01 X229.5 Y246.64\n", 
  "G01 X217 Y247.29\n", 
  "G01 X204.5 Y247.8525\n", 
  "G01 X192 Y248.30875\n", 
  "G01 X179.5 Y248.6275\n", 
  "G01 X167 Y248.75125\n", 
  "G01 X160.75 Y248.71375\n", 
  "G01 X154.5 Y248.58625\n", 
  "G01 X148.25 Y248.34125\n", 
  "G01 X142 Y247.92625\n", 
  "G01 X138.875 Y247.625\n", 
  "G01 X135.75 Y247.22125\n", 
  "G01 X132.625 Y246.63375\n", 
  "G01 X131.0625 Y246.18375\n", 
  "G01 X129.5 Y245\n", 
  "G01 X131.0625 Y243.81625\n", 
  "G01 X132.625 Y243.36625\n", 
  "G01 X135.75 Y242.77875\n", 
  "G01 X138.875 Y242.375\n", 
  "G01 X142 Y242.07375\n", 
  "G01 X148.25 Y241.65875\n", 
  "G01 X154.5 Y241.41375\n", 
  "G01 X160.75 Y241.28625\n", 
  "G01 X167 Y241.24875\n", 
  "G01 X179.5 Y241.3725\n", 
  "G01 X192 Y241.69125\n", 
  "G01 X204.5 Y242.1475\n", 
  "G01 X217 Y242.71\n", 
  "G01 X229.5 Y243.36\n", 
  "G01 X242 Y244.095\n", 
  "G01 X248.25 Y244.49625\n", 
  "G01 X254.5 Y244.92125\n",
];

const port = new SerialPort({
  path: "COM9",
  baudRate: 57600,
  autoOpen: true,
});

const parser = new ReadlineParser();
port.pipe(parser);

let current_cmd = 0;

parser.on('data', (line) => {
  console.log(line);
  if (line.includes("ok") && current_cmd < GCODE.length) {
    port.write(GCODE[current_cmd]);
    current_cmd += 1;
  }
});

