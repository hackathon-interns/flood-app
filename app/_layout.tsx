import { useEffect } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.'
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded || error) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <Drawer
          screenOptions={{
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { display: "none" },
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 1000,
                      opacity: pressed ? 0.5 : 1,
                      marginLeft: 24,
                    }}
                  >
                    <Ionicons name="menu" size={36} color="black" />
                  </View>
                )}
              </Pressable>
            ),
            swipeEnabled: false,
            sceneContainerStyle: { backgroundColor: "black" },
          }}
        >
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="user" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "User",
              title: "overview",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
