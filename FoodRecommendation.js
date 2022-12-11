import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';

export default function Recommendation() {
    console.log("ENTERING FoodRecommendation.js");

   

  return (
    <SafeAreaView style={styles.container}>
        
                <View style= {styles.textbox} key='{index}'>
                    <Text style={styles.missingText} >2 mins</Text>
                    
                </View>
       
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