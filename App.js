import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import TimerPage from "./screens/TimerPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Donner la possibilité à l'user de creer son timer lui même en donnant la qté de minutes et un nom
// Mettre des pauses predefinies comme: pause5,  pause 10,  pause 15
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chrono"
          component={TimerPage}
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
