import { forwardRef, useEffect, useState } from "react";
import { View, Text } from "react-native";

import axios from "axios";

import api from "@/services/api";

import Ionicons from "@expo/vector-icons/Ionicons";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type DeviceViewProps = {
  selectDeviceId: string;
};

export default forwardRef(function DeviceView(
  { selectDeviceId }: DeviceViewProps,
  ref: any
) {
  const [deviceData, setDeviceData] = useState<any>();
  const [deviceConfig, setDeviceConfig] = useState<any>();
  const [device, setDevice] = useState<any>();
  const [user, setUser] = useState<any>();
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    let data = getDeviceData();

    setDeviceData(data);
  }, []);

  useEffect(() => {
    let data = getDevice();

    setDevice(data);
  }, []);

  useEffect(() => {
    let data = getDeviceConfig();

    setDeviceConfig(data);
  }, []);

  async function getDeviceData() {
    axios
      .get(
        `http://192.168.1.100:8080/api/devices/${selectDeviceId}/latest_data`
      )
      .then((response) => {
        setDeviceData(response.data);
      })
      .catch((error) => console.error(error));
  }

  async function getDeviceConfig() {
    axios
      .get(
        `http://192.168.1.100:8080/api/devices/${selectDeviceId}/configuration`
      )
      .then((response) => {
        setDeviceConfig(response.data);
      })
      .catch((error) => console.error(error));
  }

  async function getDevice() {
    try {
      const { data } = await api.get(`/devices/${selectDeviceId}`);

      setDevice(data);
      getUser(data.user);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser(id: string) {
    try {
      const { data } = await api.get(`/users/${id}`);

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  function onPressFavorite() {
    setFavorite(!favorite);
  }

  function teste(
    value: number,
    device: any,
    deviceConfig: any,
    deviceData: any
  ) {
    switch (value) {
      case 0:
        return (
          device + deviceData.distance_to_water >=
          deviceConfig.normal_water_level
        );
      case 1:
        return (
          device + deviceData.distance_to_water >=
          deviceConfig.alert_water_level
        );
      case 2:
        return (
          device + deviceData.distance_to_water >=
          deviceConfig.danger_water_level
        );
    }
  }

  return (
    <View>
      {device && device.name ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            {device?.name}{" "}
          </Text>
          <Text>
            <Ionicons
              onPress={() => onPressFavorite()}
              name={favorite ? "star" : "star-outline"}
              size={48}
              color="goldenrod"
            ></Ionicons>
          </Text>
        </View>
      ) : (
        ""
      )}
      {user && user.username ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Usuario Responsável:
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {user?.username}
          </Text>
        </View>
      ) : (
        ""
      )}
      {deviceData && deviceData.pluviometer_value ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Nível de Água:
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {deviceData?.pluviometer_value} mm
          </Text>
        </View>
      ) : (
        ""
      )}
      {deviceData && deviceData.distance_to_water ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Distancia da Água:{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {deviceData?.distance_to_water} cm
          </Text>
        </View>
      ) : (
        ""
      )}
      {device && deviceConfig && deviceData ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 30,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 50,
          }}
        >
          <Text
            style={{
              color: teste(0, device, deviceConfig, deviceData)
                ? "blue"
                : "gray",
            }}
          >
            <FontAwesome6 name="droplet" size={80} />
          </Text>
          <Text
            style={{
              color: teste(1, device, deviceConfig, deviceData)
                ? "blue"
                : "grey",
            }}
          >
            <FontAwesome6 name="droplet" size={80} />
          </Text>
          <Text
            style={{
              color: teste(2, device, deviceConfig, deviceData)
                ? "blue"
                : "gray",
            }}
          >
            <FontAwesome6 name="droplet" size={80} />
          </Text>
        </View>
      ) : (
        ""
      )}
    </View>
  );
});
