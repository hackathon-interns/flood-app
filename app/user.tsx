import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Switch, Avatar } from "@rneui/themed";

export default function UserPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(
        "http://192.168.1.100:8080/api/users/2f7979a1-36fc-4054-833c-d6756b71e573"
      )
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("ERRO:", error);
      });
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
