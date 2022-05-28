# cli-fraction-operations

<p>Prior to executing this file, the following must be done:</p>
<ol>
  <li>A recent version of <a href="https://nodejs.org/">Node.js</a> has been downloaded and installed</li>
  <li>Add support for CLI arguments in Node by ensuring the yargs module is installed. If it’s not installed, run the command below:
    <p>npm install yargs@13.2</p>
  </li>
  <li>Clone the application from this repo.</li>
  <li>In CLI, navigate to the folder containing the Fractions Operations code.</li>
  <li>Run the Fractions Operations script as follows. Quotes must be included because of issues encountered with the “-” sign.
    <p>node . -? "1/4 + 1/4"</p>
  </li>
</ol>
<p>The main file containing the code for performing the operations is https://github.com/gjbecerril/cli-fraction-operations/blob/master/bin/index.js</p>
 <p>These are my test cases. The code results were tested against the same operations performed at <a href="https://www.calculatorsoup.com/calculators/math/mixednumbers.php">CalculatorSoup</a>. You can copy and paste multiple operation strings to the CLI, just remove the “= ½” part.</p>
 
<h3>Addition:</h3>
node . -? "1/4 + 1/4" = 1/2<br>
node . -? "1_3/4 + 2_3/8" = 4_1/8<br>
node . -? "2_3/4 + 3/8" = 3_1/8<br>
node . -? "2 + 3/8" = 2_3/8<br>
node . -? "1_3/4 + 2" = 3_3/4<br>
node . -? "2 + 2" = 4<br>
node . -? "0 + 3/4" = 3/4<br>
node . -? "0 + 2_3/4" = 2_3/4<br>
node . -? "0_3/4 + 3/8" = 1_1/8<br>
 
<h3>Multiplication:</h3>
node . -? "1/4 * 1/4" = 1/16<br>
node . -? "1_3/4 * 2_3/8" = 4_5/32<br>
node . -? "2_3/4 * 3/8" = 1_1/32<br>
node . -? "2 * 3/8" = 3/4<br>
node . -? "1_3/4 * 2" =  3_1/2<br>
node . -? "2 * 2" = 4<br>
node . -? "0 * 3/4" = 0<br>
node . -? "0_3/4 * 3/8" = invalid<br>
 
<h3>Division:</h3>
node . -? "1/4 / 1/4" = 1<br>
node . -? "1_3/4 / 2_3/8" = 14/19<br>
node . -? "2_3/4 / 3/8" = 7_1/3<br>
node . -? "2 / 3/8" = 5_1/3<br>
node . -? "1_3/4 / 2" =  7/8<br>
node . -? "2 / 2" = 1<br>
node . -? "0 / 3/4" = 0<br>
node . -? "0_3/4 / 3/8" = invalid<br>
 
<h3>Substraction:</h3>
node . -? "1/4 - 1/4" = 0<br>
node . -? "1_3/4 - 2_3/8" = -5/8<br>
node . -? "2_3/4 - 3/8" = 2_3/8<br>
node . -? "2 - 3/8" = 1_5/8<br>
node . -? "1_3/4 - 2" =  -1/4<br>
node . -? "2 - 2" = 0<br>
node . -? "0 - 3/4" = -3/4<br>
node . -? "0 - 2_3/4" = -2_3/4<br>
node . -? "0_3/4 - 3/8" = 3/8<br>
