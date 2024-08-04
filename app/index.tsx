import { Pressable, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import MapView, { Region, Marker } from "react-native-maps";

import * as Location from "expo-location";
import { LocationOptions } from "expo-location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import BottomSheet from "@gorhom/bottom-sheet";

import { FAB } from "@rneui/themed";

import { WaterLevelStatus } from "@/enums/WaterLevelStatus";

import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeBottomSheet from "@/components/HomeBottomSheet";
import api from "@/services/api";

export default function HomeScreen() {
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;
  const navigation = useNavigation();
  const [currentUserLocation, setCurrentUserLocation] = useState<any>();
  const [initialRegion, setInitialRegion] = useState<Region>();
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

  const [isCreating, setIsCreating] = useState(false);

  const locationOptions: LocationOptions = {
    accuracy: Location.LocationAccuracy.Balanced,
    mayShowUserSettingsDialog: false,
    timeInterval: 10000,
    distanceInterval: 0,
  };

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    async function watchUserLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const firstPosition = await Location.getCurrentPositionAsync();

      setInitialRegion({
        latitude: firstPosition?.coords.latitude,
        longitude: firstPosition?.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      locationSubscription = await Location.watchPositionAsync(
        locationOptions,
        (pos) => {
          setCurrentUserLocation(pos);
        }
      );
    }

    watchUserLocation();

    return () => {
      locationSubscription?.remove();
    };
  }, []);

  useEffect(() => {
    async function getDevices() {
      try {
        const { data } = await api.get("/devices");

        setMarkers(
          data.map((device: any) => {
            if (device.status === "ACTIVE") {
              return {
                id: device.id,
                latlng: {
                  latitude: device.latitude,
                  longitude: device.longitude,
                },
              };
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    }

    getDevices();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setIsCreating(true);
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

  async function goToCurrentLocation() {
    setMapLocation({
      latitude: currentUserLocation?.coords.latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitude: currentUserLocation?.coords.longitude,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  function onSelectMarker(deviceId: any) {
    setSelectedDevice(deviceId);
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
        initialRegion={initialRegion}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker?.latlng}
            onPress={() => onSelectMarker(marker?.id)}
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
        <FAB
          placement="right"
          onPress={goToCurrentLocation}
          icon={{ name: "add", color: "white" }}
        />
      </View>

      <HomeBottomSheet
        favoriteStations={favoriteStations}
        isCreating={isCreating}
        selectDeviceId={selectDevice}
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
