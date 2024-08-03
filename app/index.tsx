import { StyleSheet } from "react-native";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

import { View, Button } from "tamagui";

import MapView from "react-native-maps";

export default function HomeScreen() {
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
