import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaScreen from "./src/screens/ListaScreen";
import DetalhesScreen from "./src/screens/DetalhesScreen";
import FavoritosScreen from "./src/screens/FavoritosScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen
              name="Lista"
              component={ListaScreen}
              options={({ navigation }) => ({
                title: "Rick and Morty",
                headerRight: () => (
                  <IconButton
                    icon="heart"
                    onPress={() => navigation.navigate("Favoritos")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Detalhes"
              component={DetalhesScreen}
              options={{ title: "Detalhes" }}
            />
            <Stack.Screen
              name="Favoritos"
              component={FavoritosScreen}
              options={{ title: "Favoritos" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}