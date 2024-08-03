import { StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { View, Button } from "tamagui";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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

  const [markers, setMarkers] = useState([
    {
      title: "hello",
      description: "world",
      latlng: { latitude: -23.5105, longitude: -47.60213 },
    },
    {
      title: "hello2",
      description: "world",
      latlng: { latitude: -23.5105, longitude: -47.61513 },
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={styles.map}
        mapType="standard"
        userInterfaceStyle="light"
        region={{
          latitude: -23.5505,
          longitude: -47.60013,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
            <FontAwesome6
              name="house-flood-water"
              size={26}
              color="dodgerblue"
            />
          </Marker>
        ))}
      </MapView>

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
