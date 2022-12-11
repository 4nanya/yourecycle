function findTrash(scan) {

console.log("ENTERING findTrash.js");
//const scan = new Array("Naan", "Cereal", "Kale", "Meat") ; // what the image has from google api
console.log("scan -->", scan);

// list of foods in the different food groups
const rec = new Array("Paper");
const fruit = new Array("Fruit", "Egg white","Animal product","Fried egg");

// the lengths
scanLen = scan.length ; 
vegLen = rec.length ; 
fruitLen = fruit.length ; 

// wheter we have the group or not
const present = new Array(false, false, false, false, false) ;
//words corrosponds to the below words
const words = new Array("recyclablable, compost") ;

// nested for loop that goes through the scanned list and checks those against our local database
for (let i = 0; i < scanLen; i++) {
  let scanner = scan[i]; //take individual index from scan area
  //console.log(scanLen, scanner) ;
  for (let w = 0; w < vegLen; w++) {
    let check = rec[w];
    var checker = scanner.localeCompare(check); //check if the one in the local list is equal to the list gotten from Google API
    if (checker == 0 ){
     //console.log("vegtable") ;
     return ("recycable"); //if the food group is present, replace that group's space with true
    
  }
  }
  for (let w = 0; w < fruitLen; w++) {
    let check = fruit[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     //console.log("fruit") ;
     return("compost"); 
  }
  }
} 

// variables for printing
// var present_print = ""; 
// var missing_print = ""; 
// var presentLen = present.length ; 

//count used to see if nothing is missing
var count = 0;

//printing the food groups  
// for (let i = 0; i < presentLen; i++) {
//       if (present[i] == true) {
//         present_print = present_print + words[i] + ", ";
//         count = count + 1;
//       }
//       else {
//         missing_print = missing_print + words[i] + ", ";
//       }
//   }
//   present_print="Present: \n"+present_print;
//   //checking if there are any missing
//   if (count == 5) {
//     missing_print = "Wow! Good Job! What a healthy meal!"
//   } else {
//     missing_print = "Missing: " + "\n" + missing_print
    
//   }
//   console.log("present_print ==>", present_print);
//   console.log("missing_print ==>", missing_print);
//   return [ present_print, missing_print];
  
}
export default findTrash;
 