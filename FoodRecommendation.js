import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';

export default function Recommendation() {
    console.log("ENTERING FoodRecommendation.js");

    const vegetables = new Array("Brocolli","Brussel Sprouts","Artichokes","Eggplant","Mushrooms","Potatoes","Carrots","Corn","Cauliflower","Asparagus","Avocado","Green Beans","Zuchinni","Sweet Potato");
    const fruits = new Array("Apple","Banana","Cucumber","Dates","Elderberry","Figs","Grapes","Honeydew","Jackfruit","Kiwi","Lychee","Mango","Nectarine","Orange","Pineapple","Rasberry","Strawberry","Tamarind");
    const grains = new Array("Bread","Rice","Quinoa","Oats","Cereal","Tortilla Chips","Pasta","Cornmeal","Cornbread","Bagel");
    const protein = new Array("Beef","Pork","Chicken","Lamb","Fish","Eggs","Nuts","Tofu","Lentils","Paneer","Beans","Edemame","Peanut Butter");
    const dairy = new Array("Milk","Yogurt","Cheese","Sour Cream","Milk Coffee","Ice Cream","Butter","Lassi");
    const missing = new Array();
    const present = new Array();
    var item = grains[Math.floor(Math.random()*grains.length)];
    var loop = 5;
    const cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];

    let text = "";
    for (let i = 0; i < cars.length; i++) {
        text += cars[i] + "<br>";
        console.log (text);
    }

  return (
    <SafeAreaView style={styles.container}>
        {cars.map((item,index)=>{
            return (
                //console.log(item);
                <View style= {styles.textbox} key='{index}'>
                    <Text style={styles.missingText} key='200'>2 mins</Text>
                    <Text style={styles.missingText} key='{index}'>{item} {index}</Text>
                    <Text style={styles.missingText} key='300'>{item}</Text>
                </View>
        );
        })}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    borderWidth: 3,
    borderRadius: 10,
    width: 200,
    length:400,
    backgroundColor:"white",
    borderColor: '#336600'
    
  },
});