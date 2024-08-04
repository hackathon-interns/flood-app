import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Switch, Avatar } from "@rneui/themed";
import api from "@/services/api";

export default function UserPage() {
  const [userData, setUserData] = useState<any>(null);
  const [notifyFavoriteSensors, setNotifyFavoriteSensors] =
    useState<boolean>(false);
  const [notifyNewStation, setNotifyNewStation] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.get(
          "/users/3f3d3863-7843-4273-a786-0616ca29c2ea"
        );

        setUserData(data);
        setNotifyFavoriteSensors(true);
        setNotifyNewStation(data.notify_on_new_station || true);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  return (
    <View
      style={{
        paddingTop: 40,
      }}
    >
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
              source={userData.profile_img || "http://picsum.photos/200/300"}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {userData.username || "Name"}
            </Text>
          </View>

          <View
            style={{
              gap: 2,
              paddingBottom: 12,
              paddingTop: 16,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              E-mail
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {userData.email || "example@gmail.com"}
            </Text>
          </View>

          <View
            style={{
              width: 400,
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <View
              style={{
                gap: 16,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Notificar sensores favoritados?
                </Text>
                <Switch value={true} />
              </View>

              <View
                style={{
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Notificar sensores novos perto da sua área?
                </Text>
                <Switch value={true} />
              </View>
            </View>
          </View>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}
