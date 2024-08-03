import "../tamagui-web.css";

import { useEffect } from "react";
import { Pressable, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "@/providers/Provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { View } from "tamagui";
import { DrawerActions } from "@react-navigation/native";

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
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider>
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
                      <Ionicons name="menu" size={36} color="white" />
                    </View>
                  )}
                </Pressable>
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    console.log("ADICIONAR ESTAÇÃO");
                  }}
                >
                  {({ pressed }) => (
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 1000,
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 24,
                      }}
                    >
                      <MaterialIcons
                        name="add-location"
                        size={36}
                        color="white"
                      />
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
      </Provider>
    </GestureHandlerRootView>
  );
}
