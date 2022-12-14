console.clear();
/*
const cipher = (message, key) => {
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  
  const repeatKey = () => { 
    let positionTracker = 0;
    let repeatedKey = "";
    for (let i = 0; i < message.length; i++) {
        repeatedKey += key[positionTracker];
        positionTracker++
        if (positionTracker >= key.length) {
          positionTracker = 0;
        }
     }
    return repeatedKey; 
  }
  
  
  const caesarShiftedAlphabet = (shift) => {  
    let shiftedAlphabet = "";
    let startPosition = alphabet.indexOf(shift);
    for (let i = 0; i < alphabet.length; i++) {
     shiftedAlphabet+= alphabet[startPosition];
     startPosition++
     if (startPosition >= alphabet.length) {
        startPosition = 0;
     }
    }
    return shiftedAlphabet;
  }
  
  let repeatedKey = repeatKey();
  let str ="";
  
  for (let i = 0; i < message.length; i++) {
    
    let shiftedAlphabet = caesarShiftedAlphabet(repeatedKey[i]);
    
    str+= shiftedAlphabet[alphabet.indexOf(message[i])] || message[i];
    

  }  
  
  const decode = () => {    
    let str = "";    
    for (let i = 0; i < message.length; i++) {
    let shiftedAlphabet = caesarShiftedAlphabet(repeatedKey[i]);
        str+= alphabet[shiftedAlphabet.indexOf(message[i])] || message[i];
    } 
  }
  
  return str;
  
}



console.log(cipher("codewars", "password"))
*/

const form = document.querySelector("form");
const messageToCipher = document.querySelector("#message");
const resultModal = document.querySelector(".result");
const resultMessageTitle = document.querySelector("#result-message-title");
const resultMessage = document.querySelector("#result-message");
const closeButton = document.querySelector(".close-button");





function VigenèreCipher(key, abc) {
  
  const repeatKey = (message) => { 
    let positionTracker = 0;
    let repeatedKey = "";
    for (let i = 0; i < message.length; i++) {
        repeatedKey += key[positionTracker];
        positionTracker++
        if (positionTracker >= key.length) {
          positionTracker = 0;
        }
     }
    return repeatedKey; 
  }
  
  
  const caesarShiftedAlphabet = (shift) => {  
    let shiftedAlphabet = "";
    let startPosition = abc.indexOf(shift);
    for (let i = 0; i < abc.length; i++) {
     shiftedAlphabet+= abc[startPosition];
     startPosition++
     if (startPosition >= abc.length) {
        startPosition = 0;
     }
    }
    return shiftedAlphabet;
  }
  
  
  
  this.encode = function (str) {
    let repeatedKey = repeatKey(str);
    let encodedStr = "";
    for (let i = 0; i < str.length; i++) {
      let shiftedAlphabet = caesarShiftedAlphabet(repeatedKey[i]);
      encodedStr+= shiftedAlphabet[abc.indexOf(str[i])] || str[i];
    }  
    return encodedStr;
  };
  
  this.decode = function (str) {
    let repeatedKey = repeatKey(str);
    let decodedStr = "";
    for (let i = 0; i < str.length; i++) {
    let shiftedAlphabet = caesarShiftedAlphabet(repeatedKey[i]);
        decodedStr+= abc[shiftedAlphabet.indexOf(str[i])] || str[i];
    }
    return decodedStr;
  };
}

let abc, key;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password"
c = new VigenèreCipher(key, abc);

console.log(c.encode("codewarsjjj"))
console.log(c.decode("rovwsoivyjb"))


form.addEventListener("submit", (e)=>{
  
  e.preventDefault();  
  const { key, message, cipher } = e.target;
  
  const newCipher = new VigenèreCipher(key.value, abc);
  
 if(cipher.value === "decode"){
   
   resultMessageTitle.innerText = "Your Decoded Message is:";
   resultMessage.innerText = newCipher.decode(message.value);
   resultModal.classList.toggle("active");
 }
  
   if(cipher.value === "encode"){     
   resultMessageTitle.innerText = "Your Encoded Message is:";
   resultMessage.innerText = newCipher.encode(message.value);
   resultModal.classList.toggle("active");
 }
  
});


closeButton.addEventListener("click", ()=>{
  
  resultModal.classList.remove("active");
  
});
