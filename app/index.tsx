import { StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Region, Marker } from "react-native-maps";

import * as Location from "expo-location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { View, Button, Tooltip } from "tamagui";
import { MapPin } from "@tamagui/lucide-icons";

export default function HomeScreen() {
  const [mapLocation, setMapLocation] = useState<Region>();
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await getCurrentLocation();
      setMapLocation(currentLocation);
    })();
  }, []);

  async function getCurrentLocation() {
    let currentLocation = await Location.getCurrentPositionAsync();

    let location: Region = {
      latitudeDelta: LATITUDE_DELTA,
      latitude: currentLocation.coords.latitude,
      longitudeDelta: LONGITUDE_DELTA,
      longitude: currentLocation.coords.longitude,
    };

    return location;
  }

  async function goToCurrenLocation() {
    let currentLocation = await getCurrentLocation();
    setMapLocation(currentLocation);
  }

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
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
        region={mapLocation}
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

      <View style={styles.tooltipContainer}>
        <Tooltip placement="right-end">
          <Button
            theme="blue"
            icon={MapPin}
            color="white"
            circular
            onPress={goToCurrenLocation}
          />
        </Tooltip>
      </View>

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
  tooltipContainer: {
    position: "absolute",
    bottom: 200,
    right: 20,
  },
});
