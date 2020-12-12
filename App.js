// import 'react-native-gesture-handler';
import React, { useState, createContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import MainScreen from './screens/MainScreen';
import History from './screens/History';


const App = () => {

  const [calculation, setCalculation] = useState([]);

  const Stack = createStackNavigator();

  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
              <Stack.Screen 
              name="Main" 
              options={{title: "Discount Calculator!", 
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: "center",
                textTransform: 'uppercase'
              },
            }}
              >
                {(props) => <MainScreen calculation={calculation} setCalculation={setCalculation}/>}            
              </Stack.Screen>
              
              <Stack.Screen 
              name="History" 
              options={{title: "History",
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textTransform: 'uppercase'
              },
            }}
              >
                {(props) => <History calculation={calculation} setCalculation={setCalculation}/>}
              </Stack.Screen>

         
          </Stack.Navigator>
        </NavigationContainer>
        
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});

export default App;
