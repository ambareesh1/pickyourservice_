import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import BottomNavigator from './Components/BottomNavigator';
import SubCategory from './screens/SubCategory';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { mystore } from './Components/MyStore';
import ProgressScreen from './screens/ProgressScreen';
import otpScreen from './screens/OtpScreen';
import  { UserProvider }  from "./services/UserContext";
import RegistrationConformScreen from './screens/RegistrationConformScreen';
import MapScreen from './screens/MapScreen';
import PaymentGateway from './screens/PaymentGateway';
import CartScreen from './screens/CartScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <UserProvider>
    <Provider store={mystore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: true }} />
          <Stack.Screen name="SubCategory" component={SubCategory} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SubCategory} options={{ headerShown: false }} />
          <Stack.Screen name="Progress Screen" component={ProgressScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Otp Screen" component={otpScreen} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Verify User" component={RegistrationConformScreen} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Track Our Partner" component={MapScreen} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Pick the payment" component={PaymentGateway} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </UserProvider>
  );
}

