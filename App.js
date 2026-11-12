import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaScreen from "./src/screens/ListaScreen";
import DetalhesScreen from "./src/screens/DetalhesScreen";
import FavoritosScreen from "./src/screens/FavoritosScreen";
import { tema } from "./src/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={tema}
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Lista"
            screenOptions={{
              headerStyle: { backgroundColor: tema.colors.surface },
              headerTintColor: tema.colors.primary,
              headerTitleStyle: { fontWeight: "bold" },
              contentStyle: { backgroundColor: tema.colors.background },
              statusBarStyle: "light",
            }}
          >
            <Stack.Screen
              name="Lista"
              component={ListaScreen}
              options={({ navigation }) => ({
                title: "Rick and Morty",
                headerTitleAlign: "center",
                headerTitle: () => (
                  <Image
                    source={require("./assets/logo.png")}
                    style={{ width: 130, height: 40 }}
                    resizeMode="contain"
                  />
                ),
                headerRight: () => (
                  <IconButton
                    icon="heart"
                    iconColor={tema.colors.primary}
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