import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Switch, Avatar } from "@rneui/themed";
import api from "@/services/api";

export default function UserPage() {
  const [userData, setUserData] = useState<any>(null);
  const [notifyFavoriteSensors, setNotifyFavoriteSensors] =
    useState<boolean>(true);
  const [notifyNewStation, setNotifyNewStation] = useState<boolean>(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.get(
          "/users/3f3d3863-7843-4273-a786-0616ca29c2ea"
        );

        setUserData(data);
        setNotifyFavoriteSensors(true);
        setNotifyNewStation(data.notify_on_new_station ?? true);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  return (
    <View style={{ paddingTop: 100, paddingLeft: 10 }}>
      {userData ? (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Avatar
              size={64}
              rounded
              source={{ uri: userData.profile_img_url }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {userData.username || "Nome"}
            </Text>
          </View>

          <View style={{ gap: 0, paddingBottom: 16, paddingTop: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>E-mail</Text>
            <Text style={{ fontSize: 16 }}>
              {userData.email || "exemplo@gmail.com"}
            </Text>
          </View>

          <View style={{ alignItems: "flex-start", paddingBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Notificar sensores favoritados?
            </Text>
            <Switch
              value={notifyFavoriteSensors}
              onValueChange={setNotifyFavoriteSensors}
            />
          </View>

          <View style={{ alignItems: "flex-start", gap: 0 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Notificar sensores novos perto da sua área?
            </Text>
            <Switch
              value={notifyNewStation}
              onValueChange={setNotifyNewStation}
            />
          </View>
        </>
      ) : (
        <Text style={{ padding: 20 }}>Carregando...</Text>
      )}
    </View>
  );
}
