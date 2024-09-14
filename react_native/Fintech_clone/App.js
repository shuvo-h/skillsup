
import { SafeAreaView, StyleSheet, Text, View,StatusBar, Pressable, TouchableOpacity } from 'react-native';
import HomeScreen from './src/pages/home/Home';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login/Login';
import Register from './src/pages/login/Register';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from './src/constants/Colors';
import Help from './src/pages/Help';


const Stack = createNativeStackNavigator();

export default function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
           <Stack.Screen
            name='Register'
            component={Register}
            options={({ navigation }) => ({
              title: "Register Screen",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#aeecf1"
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={34} color={COLORS.dark} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Help")}>
                  <Ionicons name="help-circle-outline" size={34} color={COLORS.dark} />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            options={{
              title:"Help Screen",
              presentation: "modal"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
