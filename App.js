import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import callGoogleVisionAsync from "./googleCloudVisionHelper";
//import MissingComponent from "./foodanalysis"
import findTrash from "./FindTrash";
import logo from "./assets/logo.png"
//import Recommendation from './FoodRecommendation';
import * as Location from 'expo-location';




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

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);
  
  // create the handler method
  
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log(response);
      for (let item of response) {
        let address = `${item.city}`;
        
        setDisplayCurrentAddress(address);
      }
    }
  };
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

    let values = findTrash(scannedvalues);
    console.log("Values -", values);
    //let valuesArray = findFoodArray(scannedvalues);

    if (showRecommendation){


      return(
    
    
        <View style={styles.container}>
          <View style={styles.space} />
          <View style={styles.space} />
          <View style={styles.space} />
          <Text style={styles.titleText} >Local Information</Text>
          <View style= {styles.textbox}>
          <Text style={styles.sheading} >Location found: </Text>
          <Text style={styles.recsheading} >{displayCurrentAddress}</Text>
          </View>
          {senators.map((senator) => {
        //console.log(senator);
        //console.log({senator.id});

        if (senator.id==displayCurrentAddress){
          console.log("Matchfound " , senator);
          return (
            
            <View style= {styles.newbox}>
            {/* <Text style={styles.infoText}></Text> */}
            <Text style={styles.sheading} >Detailed Summary:</Text>
            <Text style={styles.infoText}>{displayCurrentAddress} has a an overall pollution index of {senator.pollution}. This is made up of
            three main indexes: carbon, air quality, and water quality. The carbon index, air quality, and water quality 
            of {displayCurrentAddress} are {senator.carbon}, {senator.aqi}, and {senator.water} respectively. These are measured in comparison to 
            other cities in the area. Additionaly, {displayCurrentAddress}'s trash level is {senator.trash}. </Text>
            <View style={styles.space} />
            <Text style={styles.infoTextBold}>By using our app and spreading awarnesss, you can help lower this amount. </Text>
            </View>
            
          ); 
          
      
      };
      })}
      <View style={styles.space} />
      <Button style = {styles.sharebutton} title="Start Again" onPress={() => reset()} />
      <View style={styles.space} />
      <View style={styles.space} />
      <View style={styles.space} />
          </View>
    

        );


    }
    else {

      return (
        
        <SafeAreaView style={styles.container}>
          <View style= {styles.textbox}>
          <Text style={styles.recommendingText}>Your item is:  </Text>
          <Text style={styles.recommendingText}>{values} </Text>
          </View>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <View style= {styles.textbox}>
          <Button style = {styles.sharebutton} title="Share" onPress={sharePic} />
          <Button style = {styles.sharebutton} title="Learn More Info" onPress={() => setShowrecommendation(true)} />
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
          <Image source = {logo} style = {{width: 120, height: 120}} ></Image>
        </TouchableOpacity>


      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}
const senators = [
  { id: "Fremont",
  uid:"1",
  pollution: "27.56",
  carbon: "45.00",
  water: "85.00",
	aqi: "79.17",
  trash:"medium"},
  { id: "Milpitas",
  pollution: "23.76",
  carbon: "50.02",
  water: "82.40",
	aqi: "80.19",
  trash:"high"},
  { id: "San Jose",
  pollution: "35.73",
  carbon: "60.98",
  water: "98.87",
	aqi: "98.77",
  trash:"high"},
  { id: "Oakland",
  pollution: "54.23",
  carbon: "56.31",
  water: "97.90",
	aqi: "96.47",
  trash:"high"},
  { id: "Sunnyvale",
  pollution: "22.21",
  carbon: "42.45",
  water: "78.65",
	aqi: "65.43",
  trash:"medium"},
  
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#D4FCC3",
    
  },
  newbox: {
    borderWidth: 3,
    borderRadius: 10,
    width: 400,
    backgroundColor:"white",
    borderColor: "#60A76D",
    margin: 5,
    flex:1,
   
 
  },
  textbox: {
    borderWidth: 3,
    borderRadius: 10,
    width: 400,
    backgroundColor:"white",
    borderColor: "#60A76D",
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
    borderColor: "#60A76D"
  
  },
  sharebutton: {
    backgroundColor: "khaki",
    color: "hotpink", 
    borderColor: "#60A76D",
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
    color: "#60A76D", 


  },
  
  recommendingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#1B5299", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 10,
  },
  infoTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#1B5299", 
    //height: 50,
    alignSelf: "left",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex:1,
    
  },
  infoText: {
    fontSize: 20,
    color: "#1B5299", 
    //height: 50,
    alignSelf: "left",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex:0,
  },

  space: {
    //width: 10, // or whatever size you need
    height: 15,
    //color: "white",
  },
  recsheading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "#090C9B",
    alignSelf: "center"
  },
  sheading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#134611",
    padding: 10,
    alignSelf: "center"
  },
  
});
