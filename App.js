import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import callGoogleVisionAsync from "./googleCloudVisionHelper";
//import MissingComponent from "./foodanalysis"
import findFood from "./FindFood";
import logo from "./assets/truefoodButton.png"
import Recommendation from './FoodRecommendation';
import findFoodArray from './FindFoodArray';


export default function App() {
  console.log("ENTERING App.js");
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [showRecommendation, setShowrecommendation] = useState();
  //const [photoduplicate, setPhotoduplicate] = useState();
  //const [text, setText] = useState("Please add an image");
  const [scannedvalues, setScannedvalues] = useState("Please add an image");

  const Vegetables = new Array("Brocolli","Brussel Sprouts","Artichokes","Eggplant","Mushrooms","Potatoes","Carrots","Corn","Cauliflower","Asparagus","Avocado","Green Beans","Zuchinni","Sweet Potato");
  const Fruits = new Array("Apple","Banana","Cucumber","Durian","Elderberry","Figs","Grapes","Honeydew","Jackfruit","Kiwi","Lychee","Mango","Nectarine","Orange","Pineapple","Raspberry","Strawberry","Tamarind");
  const Grains = new Array("Bread","Rice","Quinoa","Oats","Cereal","Tortilla Chips","Pasta","Cornmeal","Cornbread","Bagel");
  const Protein = new Array("Beef","Pork","Chicken","Lamb","Fish","Eggs","Nuts","Tofu","Lentils","Paneer","Beans","Edemame","Peanut Butter");
  const Dairy = new Array("Milk","Yogurt","Cheese","Sour Cream","Latte","Ice Cream","Butter","Lassi");
  const arrayArray = [Vegetables, Protein, Fruits, Grains, Dairy];

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    //setPhotoduplicate(newPhoto);
    console.log("picture taken");
    const responseData = await callGoogleVisionAsync(newPhoto.base64);
    //await setTimeout (5000);
    //setGoog(responseData);
    console.log("Google responseData ==> " , responseData);
    //setText(responseData.toString());
    setScannedvalues(responseData);
    console.log("Response from Google Completed");

    //savePhoto();

  };

  let reset = () => {
    //shareAsync(photo.uri).then(() => {
    setPhoto(undefined);
    setShowrecommendation(false);
  };

  if (photo) {
    console.log("====>Inside photo=true method");
    //Share the pic function
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
      //setPhoto(undefined);
      });
    };

    let values = findFood(scannedvalues);
    //let valuesArray = findFoodArray(scannedvalues);
    const valuesArray = findFoodArray(scannedvalues); 
    if (showRecommendation){
      console.log("====>Inside showrecommendation=true method");
      //const cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
      console.log("ARRAY OF VALUES: "+valuesArray);


      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.recsheading}>Recommendations</Text>
            {valuesArray.map((item,index)=>{
              if (item=='Vegetables'){
                return (
                    //console.log(item);
                      <View style= {styles.textbox} key={index}>     

                          
                          <Text style={styles.recommendingText} key={index}>{item} {"\n -"} {Vegetables[Math.floor(Math.random()*Vegetables.length)]}</Text>
                          
                      </View>
                    );
            }
            if (item=='Protein'){
              return (
                  //console.log(item);
                    <View style= {styles.textbox} key={index}>     

                       
                        {/* <Text style={styles.recommendingText} key={index}>{item} {"\n -"} {Protein[Math.floor(Math.random()*Protein.length)]}</Text> */}
                        <Text style={styles.recommendingText} key={index}>{item} {"\n -"} Eggs</Text>
                    </View>
                  );
          }
          if (item=='Fruit'){
            return (
                //console.log(item);
                  <View style= {styles.textbox} key={index}>     

                      
                      {/* <Text style={styles.recommendingText} key={index}>{item} {"\n -"} {Fruits[Math.floor(Math.random()*Fruits.length)]}</Text> */}
                      <Text style={styles.recommendingText} key={index}>{item} {"\n -"} Apple</Text>
                  </View>
                );
        }
        if (item=='Grains'){
          return (
              //console.log(item);
                <View style= {styles.textbox} key={index}>     

                    
                    <Text style={styles.recommendingText} key={index}>{item} {"\n -"} {Grains[Math.floor(Math.random()*Grains.length)]}</Text>
                    
                </View>
              );
      }
      if (item=='Dairy'){
        return (
            //console.log(item);
              <View style= {styles.textbox} key={index}>     

                  
                  {/* <Text style={styles.recommendingText} key={index}>{item} {"\n -"} {Dairy[Math.floor(Math.random()*Dairy.length)]}</Text> */}
                  <Text style={styles.recommendingText} key={index}>{item} {"\n -"} Yogurt</Text>

                  
              </View>
            );
    }
})}
           <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <View style= {styles.textbox}>
          <Button style = {styles.sharebutton} title="Go Back" onPress={() => setShowrecommendation(false)} />
          </View>
          </SafeAreaView>
      );
    }
    else {
      return (
        
        <SafeAreaView style={styles.container}>
          <View style= {styles.textbox}>
          <Text style={styles.presentText}>{values[0]} </Text>
          <Text style={styles.missingText}>{values[1]}</Text>
          </View>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <View style= {styles.textbox}>
          <Button style = {styles.sharebutton} title="Share" onPress={sharePic} />
          <Button style = {styles.sharebutton} title="Recommendations" onPress={() => setShowrecommendation(true)} />
          <Button style = {styles.sharebutton} title="Start Again" onPress={() => reset()} />
          </View>
        </SafeAreaView>
      );
    }
  }

  console.log("Outside photo=true method");


  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        {/* <<Button title="Take Food Pic" onPress={takePic} />> */}
        <TouchableOpacity style = {styles.buttonContainer} activeOpacity = {0.5} onPress={takePic}>
          <Image source = {logo} style = {{width: 100, length: 50, resizeMode: 'center'}} ></Image>
        </TouchableOpacity>


      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#99cc00",
    
  },
  textbox: {
    borderWidth: 3,
    borderRadius: 10,
    width: 400,
    backgroundColor:"white",
    borderColor: '#336600',
    margin:5,


    
  },
  buttonContainer: {
    //backgroundColor: '#fff',
    alignSelf: 'flex-end',
    margin: 10
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    margin: 20,
    borderWidth: 4,
    borderRadius: 30,
    borderColor: '#134611'
  
  },
  sharebutton: {
    backgroundColor: "khaki",
    color: "hotpink", 
    borderColor: '#134611'
  },
  baseText: {
    fontFamily: 'serif',
    padding: 50,
    backgroundColor:"pink",
    textAlign: 'center',
    resizeMode: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "hotpink", 
    height: 150

  },
  presentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "green", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 20

  },
  missingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "indianred", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 20,

  },
  recommendingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "cornflowerblue", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 10,
  },
  recsheading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#134611",
  },
});
