import { Pressable, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import MapView, { Region, Marker } from "react-native-maps";

import * as Location from "expo-location";
import { LocationOptions } from "expo-location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import BottomSheet from "@gorhom/bottom-sheet";

import { View, Button, Tooltip } from "tamagui";

import { WaterLevelStatus } from "@/enums/WaterLevelStatus";

import { MapPin } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeBottomSheet from "@/components/HomeBottomSheet";
import axios from "axios";

export default function HomeScreen() {
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;
  const navigation = useNavigation();
  const [currentUserLocation, setCurrentUserLocation] = useState<any>();
  const [mapLocation, setMapLocation] = useState<Region>();
  const [selectDevice, setSelectedDevice] = useState<any>();
  const [markers, setMarkers] = useState<any>([
    {
      id: 1,
      latlng: {
        latitude: 0,
        longitude: 0,
      },
    },
  ]);

  const locationOptions: LocationOptions = {
    accuracy: Location.LocationAccuracy.Balanced,
    mayShowUserSettingsDialog: false,
    timeInterval: 10000,
    distanceInterval: 0,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(locationOptions, (pos) => {
        setCurrentUserLocation(pos);
      });
    })();
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.100:8080/api/devices")
      .then((response) => {
        let markers: any[] = [];

        response.data.forEach((device) => {
          console.log(device);
          if (device.status) {
            markers.push({
              id: device.id,
              latlng: {
                latitude: device.latitude,
                longitude: device.longitude,
              },
            });
          }
        });

        setMarkers(markers);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    navigation.setOptions({
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
              <MaterialIcons name="add-location" size={36} color="black" />
            </View>
          )}
        </Pressable>
      ),
    });
  });

  const [favoriteStations, setFavoriteStations] = useState<any[]>([
    {
      id: 1,
      name: "Estação 1",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Normal,
    },
    {
      id: 2,
      name: "Estação 2",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Warning,
    },
    {
      id: 3,
      name: "Estação 3",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Warning,
    },
    {
      id: 4,
      name: "Estação 4",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Warning,
    },
    {
      id: 5,
      name: "Estação 5",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Warning,
    },
    {
      id: 6,
      name: "Estação 6",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Danger,
    },
    {
      id: 7,
      name: "Estação 7",
      latitude: -23.5505,
      longitude: -47.60013,
      address: "Rua Gustavolino Botejara, 123",
      waterLevelStatus: WaterLevelStatus.Danger,
    },
  ]);

  async function setCurrentLocation(teste: any) {
    let location: Region = {
      latitudeDelta: LATITUDE_DELTA,
      latitude: teste?.coords.latitude,
      longitudeDelta: LONGITUDE_DELTA,
      longitude: teste?.coords.longitude,
    };

    return location;
  }

  async function goToCurrenLocation() {
    let currentLocation = await setCurrentLocation(currentUserLocation);
    setMapLocation(currentLocation);
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  function onSelectMarker(event: any) {
    console.log(event.nativeEvent);
    setSelectedDevice(event.nativeEvent);
    console.log(selectDevice);
  }

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
            id={marker.id}
            coordinate={marker.latlng}
            onPress={onSelectMarker}
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

      <HomeBottomSheet
        favoriteStations={favoriteStations}
        ref={bottomSheetRef}
      />
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
