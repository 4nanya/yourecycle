function findTrash(scan) {

console.log("ENTERING findTrash.js");
//const scan = new Array("Naan", "Cereal", "Kale", "Meat") ; // what the image has from google api
console.log("scan -->", scan);

// list of foods in the different food groups
const rec = new Array("Paper",'Plastic');
const fruit = new Array("Fruit","Plant",'Herb');

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
     return ("Recycable"); //if the food group is present, replace that group's space with true
    
  }
  }
  for (let w = 0; w < fruitLen; w++) {
    let check = fruit[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     //console.log("fruit") ;
     return("Compost"); 
  }
  }
} 
return("Trash");

}
export default findTrash;
 