#!/usr/bin/env node

 const yargs = require("yargs");

 // This will be created as "array", so at the prompt the operation string does not have to be entered between double quotes. 
 // e.g.  1/2 * 3_3/4 intead of "1/2 * 3_3/4". Each element in the operation will become an element in the array. 
 // It'll be treated as three different arguments:
 // operand1 = arr[0], operator = a[1], operand2 = [2].

const options = yargs
 .usage('Usage: -? "<operation>"')
 .option("?", { alias: "operation", describe: "Your operation", type: "string", demandOption: true })
 .argv;

const prompt = `= ${options.operation}`; 

let thisOperation = options.operation;

const reduceFrac = (denominator1, denominator2, resultNum, resultDen) => {
    let retObj = {};
    if(denominator1 < denominator2 && resultNum % denominator1 === 0 && resultDen % denominator1 === 0){
        retObj.reducedNum = resultNum / denominator1;
        retObj.reducedDen = resultDen / denominator1;
    } else if(denominator1 > denominator2 && resultNum % denominator2 === 0 && resultDen % denominator2 === 0){
        retObj.reducedNum = resultNum / denominator2;
        retObj.reducedDen =  resultDen / denominator2;
    }
    return retObj;
}

const getFraction = (frac) => {

    let retObj = {};

    retObj.number = undefined;
    retObj.error = "";

    if(frac.indexOf("/") > -1){
        // get numerator and denominator from fraction - proper and improper fractions, no mixed numbers.
        if (frac.indexOf("_") < 0){
            let numsArr = frac.split("/");            
            let numerator = parseInt(numsArr[0]);
            if (numerator === 0 || typeof numerator !== 'number' || isNaN(numerator)){
                retObj.error = "Invalid Numerator!";
                return retObj;
            }
            let denominator = parseInt(numsArr[1]);
            if (denominator === 0 || typeof denominator !== 'number' || isNaN(denominator)){
                retObj.error = "Division by zero or Invalid denominator!";
                return retObj;
            }
            try{
                retObj.number = numerator / denominator;
                return retObj;
            } catch (e){
                retObj.error = e;
                return retObj;
            }
        } else {
            // This is to get the number (to be returned) from mixed numbers
            let itemsArr = frac.split("_");  
            let wholeNum = parseInt(itemsArr[0]);
            if (wholeNum === 0 || typeof wholeNum !== 'number' || isNaN(wholeNum)){
                retObj.error = "Invalid whole number from mixed numbers!";
                return retObj;
            }     
            let numsArr = itemsArr[1].split("/");            
            let tempNumerator = parseInt(numsArr[0]);
            if (tempNumerator === 0 || typeof tempNumerator !== 'number' || isNaN(tempNumerator)){
                retObj.error = "Invalid Numerator from mixed numbers!";
                return retObj;
            }
            let denominator = parseInt(numsArr[1]);
            if (denominator === 0 || typeof denominator !== 'number' || isNaN(denominator)){
                retObj.error = "Division by zero or Invalid denominator from mixed numbers!";
                return retObj;
            }
            try{
                let numerator = (wholeNum * denominator) + tempNumerator;
                retObj.number = numerator / denominator;
                return retObj;
            } catch (e){
                retObj.error = e;
                return retObj;
            }                   
        }
    } else if (typeof parseInt(frac) === 'number' && !isNaN(parseInt(frac))) {
        // return whole number
        retObj.number = parseInt(frac);
        return retObj;
    } else {
        retObj.error = "Invalidad fractions provided!";
        return retObj;
    }

    return retObj;
};

const performDivision = (operand1, operand2) => {

    let retObj = {};

    retObj.number = undefined;
    retObj.error = "";

    let numerator1 = 0;
    let denominator1 = 0;
    let numerator2 = 0;
    let denominator2 = 0;
    let operand1IsWhole = false;
    let operand2IsWhole = false;

    if(operand1.indexOf("/") > -1){
        // get numerator and denominator from fraction - proper and improper fractions, no mixed numbers.
        if (operand1.indexOf("_") < 0){
            let numsArr = operand1.split("/");            
            numerator1 = parseInt(numsArr[0]);
            if (numerator1 === 0 || typeof numerator1 !== 'number' || isNaN(numerator1)){
                retObj.error = "Invalid Numerator!";
                return retObj;
            }
            denominator1 = parseInt(numsArr[1]);
            if (denominator1 === 0 || typeof denominator1 !== 'number' || isNaN(denominator1)){
                retObj.error = "Division by zero or Invalid denominator!";
                return retObj;
            }
        } else {
            // This is to get the number (to be returned) from mixed numbers
            let itemsArr = operand1.split("_");  
            let wholeNum = parseInt(itemsArr[0]);
            if (wholeNum === 0 || typeof wholeNum !== 'number' || isNaN(wholeNum)){
                retObj.error = "Invalid whole number from mixed numbers!";
                return retObj;
            }     
            let numsArr = itemsArr[1].split("/");            
            let tempNumerator = parseInt(numsArr[0]);
            if (tempNumerator === 0 || typeof tempNumerator !== 'number' || isNaN(tempNumerator)){
                retObj.error = "Invalid Numerator from mixed numbers!";
                return retObj;
            }
            denominator1 = parseInt(numsArr[1]);
            if (denominator1 === 0 || typeof denominator1 !== 'number' || isNaN(denominator1)){
                retObj.error = "Division by zero or Invalid denominator from mixed numbers!";
                return retObj;
            }
            try{
                numerator1 = (wholeNum * denominator1) + tempNumerator;
            } catch (e){
                retObj.error = e;
                return retObj;
            }                   
        }
    } else if (typeof parseInt(operand1) === 'number' && !isNaN(parseInt(operand1))) {
        // return whole number
        operand1 = parseInt(operand1);
        operand1IsWhole = true;
        if(operand1 === 0){
            retObj.error = "0 divided by any number equals 0!";
            return retObj;            
        }
       // return retObj;
    } else {
        retObj.error = "Invalidad fractions provided!";
        return retObj;
    }

    if(operand2.indexOf("/") > -1){
        // get numerator and denominator from fraction - proper and improper fractions, no mixed numbers.
        if (operand2.indexOf("_") < 0){
            let numsArr = operand2.split("/");            
            numerator2 = parseInt(numsArr[0]);
            if (numerator2 === 0 || typeof numerator2 !== 'number' || isNaN(numerator2)){
                retObj.error = "Invalid Numerator!";
                return retObj;
            }
            denominator2 = parseInt(numsArr[1]);
            if (denominator2 === 0 || typeof denominator2 !== 'number' || isNaN(denominator2)){
                retObj.error = "Division by zero or Invalid denominator!";
                return retObj;
            }
        } else {
            // This is to get the number (to be returned) from mixed numbers
            let itemsArr = operand2.split("_");  
            let wholeNum = parseInt(itemsArr[0]);
            if (wholeNum === 0 || typeof wholeNum !== 'number' || isNaN(wholeNum)){
                retObj.error = "Invalid whole number from mixed numbers!";
                return retObj;
            }     
            let numsArr = itemsArr[1].split("/");            
            let tempNumerator = parseInt(numsArr[0]);
            if (tempNumerator === 0 || typeof tempNumerator !== 'number' || isNaN(tempNumerator)){
                retObj.error = "Invalid Numerator from mixed numbers!";
                return retObj;
            }
            denominator2 = parseInt(numsArr[1]);
            if (denominator2 === 0 || typeof denominator2 !== 'number' || isNaN(denominator2)){
                retObj.error = "Division by zero or Invalid denominator from mixed numbers!";
                return retObj;
            }
            try{
                numerator2 = (wholeNum * denominator2) + tempNumerator;
            } catch (e){
                retObj.error = e;
                return retObj;
            }                   
        }
    } else if (typeof parseInt(operand2) === 'number' && !isNaN(parseInt(operand2))) {
        // return whole number
        operand2 = parseInt(operand2);
        operand2IsWhole = true;
    } else {
        retObj.error = "Invalidad fractions provided!";
        return retObj;
    }    

    try{
        if(operand1IsWhole &&  operand2IsWhole){
            retObj.number = getFractionStr(Math.abs(operand1) / Math.abs(operand2));
        } else {
            if(operand1IsWhole){
                denominator1 = 1;
                numerator1 = operand1;
            }
            if(operand2IsWhole){
                denominator2 = 1;
                numerator2 = operand2;
            }        
            let resultNum = (numerator1 * denominator2);
            let resultDen = (denominator1 * numerator2);
            // return the appropriate result string
            if(resultNum > resultDen){
                // get the mixed numbers and return the string 
                let tempNumerator = resultNum % resultDen;
                let wholeNum = Math.floor(resultNum / resultDen);

                // simplyfy / reduce fraction
                let reduceObj = reduceFrac(denominator1, denominator2, tempNumerator, resultDen);
                let reducedNum = reduceObj.reducedNum;
                let reducedDen = reduceObj.reducedDen; 
                retObj.number = wholeNum + "_" + reducedNum + '/' + reducedDen;
            } else if(resultNum === resultDen) {
                // retrun a whole number
                retObj.number =  `${resultNum / resultDen}`;
            } else {
                // return fractions
                // simplyfy / reduce fraction
                let reduceObj = reduceFrac(denominator1, denominator2, resultNum, resultDen);                
                let reducedNum = reduceObj.reducedNum;
                let reducedDen = reduceObj.reducedDen;                
                retObj.number =  reducedNum + '/' + reducedDen;
            } 
        }   
        return retObj;
       
    } catch (e){
        retObj.error = e;
        return retObj;
    } 

    return retObj;
};

const getFractionStr = (num) => {

    var gcd = function(a, b) {
        // There is a limited precision, so we need to limit the value.
        if (b < 0.0000001) return a;                
      
        // Discard any fractions due to limitations in precision.
        return gcd(b, Math.floor(a % b));           
      };
      
      var fraction = num;
      var len = fraction.toString().length - 2;
      
      var denominator = Math.pow(10, len);
      var numerator = fraction * denominator;
      
      var divisor = gcd(numerator, denominator);
      
      numerator /= divisor;                   
      denominator /= divisor;

      numerator = Math.floor(numerator);
      denominator = Math.floor(denominator);

      // return the appropriate result string
      if(numerator > denominator){
          // get the mixed numbers and return the string 
        let tempNumerator = numerator % denominator;
        let wholeNum = Math.floor(numerator / denominator);
        return wholeNum + "_" + tempNumerator + '/' + denominator;
      } else if(numerator === denominator) {
          // retrun a whole number
          return `${numerator / denominator}`;
      } else {
          // return fractions
        return numerator + '/' + denominator;
      }
}

const performOperation = (operationStr, opSign) => {

    let operand1 = 0;
    let operator = "";
    let operand2 = 0;
    let wholeNum1 = 0;
    let wholeNum2 = 0;
    let thisNum1Neg = false;
    let thisNum2Neg = false;
    let isNegVal = false; 
    let frac1Found = true;
    let frac2Found = true;
    // this vas is used for recursion call
    opSign = !opSign?"":"-";

    // it is assumed that a valid operation string is composed by '"operand1" "operator" "operand2"'; e.g. "1/2 * 3_3/4". 
    // There must be an space in between each of the elements.
    let operationArr = operationStr.split(' ').filter((j) => j !== '');
    if(operationArr.length === 3){

        // Determine if the provided operator is valid
        const operatorRegEx = /[*+-\/]/g;
        operator = operationArr[1];
        const isValidOperator = (operator.match(operatorRegEx) || []).length ? true : false;

        if(!isValidOperator){
            return "Invalid operator was provided!"
        }

        // Get first operand
        let thisTempOperand = operationArr[0].toString();
        let thisOperand1 = thisTempOperand;
        if(thisOperand1.indexOf("-") > -1){
            thisNum1Neg = true;
        }        
        if((operator === "+" || operator === "-") && thisTempOperand.indexOf("_") > -1){
            wholeNum1 = thisTempOperand.split("_")[0];
            thisOperand1 = thisTempOperand.split("_")[1];
        }
        if((operator === "+" || operator === "-") && thisTempOperand.indexOf("_") < 0 && thisTempOperand.indexOf("/") < 0){
            wholeNum1 = thisTempOperand.split("_")[0];
            frac1Found = false;
        }  
        operand1 = 0;
        if(frac1Found){
            const operand1Obj = getFraction(thisOperand1);
            if(operand1Obj.number === undefined){
                return "The following exception or message has been thrown when getting the operand 1: \n\n" + operand1Obj.error;
            }
            operand1 = operand1Obj.number * (thisNum1Neg && thisOperand1.indexOf("-") < 0?-1:1);
        }

        thisTempOperand = operationArr[2].toString();
        let thisOperand2 = thisTempOperand;
        if(thisOperand2.indexOf("-") > -1){
            thisNum2Neg = true;
            thisOperand2 = thisOperand2.replace("-","");
        }        
        if((operator === "+" || operator === "-") && thisTempOperand.indexOf("_") > -1){
            wholeNum2 = thisTempOperand.split("_")[0];
            thisOperand2 = thisTempOperand.split("_")[1];
        }        
        if((operator === "+" || operator === "-") && thisTempOperand.indexOf("_") < 0 && thisTempOperand.indexOf("/") < 0){
            wholeNum2 = thisTempOperand.split("_")[0];
            frac2Found = false;
        }     
        
        if(!frac1Found && parseInt(wholeNum1) === 0 && frac2Found){
            let thisSign = thisNum1Neg && thisNum2Neg?"":(thisNum1Neg || thisNum2Neg || operator === "-"?"-":"");
            return "= " + thisSign + operationArr[2].toString().replace("-","");
        }        

        operand2 = 0;
        if(frac2Found){
            const operand2Obj = getFraction(thisOperand2);
            if(operand2Obj.number === undefined){
                return "The following exception or message has been thrown when getting the operand 2: \n\n" + operand2Obj.error;
            }
            operand2 = operand2Obj.number;
        }

    }else{
        return "Invalid operation string provided!"
    }

    if(operator === "-" && operand1 < operand2){
        isNegVal = true;
    }

    if(operator === "-" && operand1 === 0 && wholeNum1 === 0){
        return "= -" + operationArr[2].toString();
    }    

    // performDivision is needed because of precision issues encountered wnen dividing
    if(operator === "/"){
        let divObj = {};
        divObj =  performDivision(operationArr[0].toString().replace("-",''),operationArr[2].toString().replace("-",''));
        if(divObj.number === undefined){
            return divObj.error;
        } else{
            let thisSign = thisNum1Neg && thisNum2Neg?"":(thisNum1Neg || thisNum2Neg?"-":"");
            return "= " + thisSign + divObj.number;
        }
    }

    if(operator === "+" && thisNum2Neg){
        operator = "-";
        operand2 = Math.abs(operand2);
    }
    
    if(operator === "-" && thisNum1Neg && thisNum2Neg){
        operator = "+";
    }

    let tempResult = 0
     // get temporary numbers for later convertion to fractions
    if(operator === "*"  && (thisNum1Neg || thisNum2Neg)){
        tempResult = eval(Math.abs(operand1) + operator + Math.abs(operand2));
    } else {
        if(operand2 == 0 && Math.abs(wholeNum2) > 0 && Math.abs(operand1) > 0 && wholeNum1 === 0){
            tempResult = eval(operand1 + operator + wholeNum2);
            let thisSign = thisNum1Neg && thisNum2Neg?"":((thisNum1Neg || thisNum2Neg) && operand1 > wholeNum2?"-":"");
            return "= " + thisSign  + getFractionStr(Math.abs(tempResult));
        }else {
            tempResult = eval(operand1 + operator + operand2);
        }
    } 

    // This is for operations tha have mixed numbers. We Add/Substract integers as needed
    if (Math.abs(tempResult) % 1 === 0){       
        if(operator === "-" || operator === "+"){
            if(Math.abs(wholeNum1) > 0){
                tempResult =   eval(tempResult + "+" + wholeNum1);
            }
            if(Math.abs(wholeNum2) > 0){
                tempResult =   eval(tempResult + operator + Math.abs(wholeNum2)); 
            } 
            return "= "  + tempResult;           
        } else {
            // Multiplication
            let thisSign = thisNum1Neg && thisNum2Neg?"":(thisNum1Neg || thisNum2Neg?"-":"");
            return "= " + thisSign  + tempResult;
        }     
    } else {        
        if(operator === "-" || operator === "+"){
            // get fractions string to be returned
            let retStr = getFractionStr(Math.abs(tempResult));
            let wholeNumSum = 0;
            wholeNumSum = eval(Math.abs(parseInt(wholeNum1)) + operator + Math.abs(parseInt(wholeNum2)));
            if(retStr.indexOf("_") > -1){
                let resultWholeNum = parseInt(retStr.split("_")[0]);
                let resultOperand = retStr.split("_")[1];
                wholeNumSum = eval(Math.abs(parseInt(wholeNum1)) + operator + Math.abs(parseInt(wholeNum2)) + operator + parseInt(resultWholeNum));
                if(thisNum1Neg && thisNum2Neg){
                    wholeNumSum = wholeNumSum * -1;
                }
                if(wholeNumSum > 0)
                    return "= " + (isNegVal?"-":"") +  wholeNumSum + "_" + resultOperand;
                else
                return "= " + (isNegVal?"-":"") + resultOperand;
            } else {
                if(operator === "+"){
                    let tempSum = 0;
                    if(Math.abs(wholeNum1) > 0){
                        tempSum =  parseInt(wholeNum1);
                    }
                    if(wholeNum2 > 0){
                        tempSum =   eval(tempSum + operator + parseInt(wholeNum2));
                    } 
                    if(tempSum > 0){
                        return "= " + tempSum + "_" + retStr;  
                    } else {
                        return "= " + retStr;  
                    }  
                }  else {
                    // process substractions that end up in gegative values
                    let tempSum = 0;
                    if(Math.abs(wholeNum1) > 0){
                        tempSum =   parseInt(wholeNum1);
                    }
                    if(wholeNum2 > 0){
                        tempSum =   eval(tempSum + operator + parseInt(wholeNum2));
                    }
                     if(Math.abs(tempSum) > 0){
                         if(tempSum > 0){
                            thisSign = thisNum1Neg && thisNum2Neg?"":(thisNum1Neg || thisNum2Neg?"-":"");
                            return "= " + (opSign.length || thisSign.length?"-":"") + getFractionStr(tempSum + tempResult);
                         } else {
                            let tempOperand1 = (Math.abs(wholeNumSum)*retStr.split("/")[1]) + "/" + retStr.split("/")[1];
                            let newOperationStr = tempOperand1 + " " + operator + " " + retStr;                                 
                            // recusrion here needed to reprocess negative mixed numbers
                            return performOperation(newOperationStr,"neg");
                         }  
                    } else {
                        thisSign = thisNum1Neg && thisNum2Neg?"":(thisNum1Neg || thisNum2Neg?"-":"");
                        if(opSign.length || thisSign.length){
                            return "= -" + retStr; 
                        }else{
                            return "= " + retStr; 
                        }
                    }                     
                }                        
            }          
           
        } else {
            return "= " + (thisNum1Neg || thisNum2Neg?"-":"") + getFractionStr(tempResult);
        }
    }
};

// Display the result to the console.
console.log(performOperation(thisOperation));
