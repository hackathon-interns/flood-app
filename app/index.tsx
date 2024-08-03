import { StyleSheet } from "react-native";
import { useCallback, useEffect, useRef } from "react";
import MapView from "react-native-maps";

import * as Location from "expo-location";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { View, Button } from "tamagui";

export default function HomeScreen() {

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={styles.map}
        region={{
          latitude: -23.5505,
          longitude: -47.60013,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["20%", "50%", "100%"]}
      >
        <BottomSheetView>
          <Button theme="blue">teste</Button>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
