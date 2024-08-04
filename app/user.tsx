import axios from "axios";
import { useEffect, useState } from "react";
import {
  Label,
  Separator,
  Switch,
  View,
  XStack,
  YStack,
  Avatar,
  Text,
  SizeTokens,
} from "tamagui";

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
    <View paddingTop="$14">
      {userData ? (
        <>
          <View justifyContent="center" alignItems="center" gap="$2">
            <Avatar circular size="$6">
              <Avatar.Image
                src={userData.profile_img || "http://picsum.photos/200/300"}
              />
              <Avatar.Fallback bc="black" />
            </Avatar>
            <Text fontSize="$5" fontWeight="bold">
              {userData.username || "Name"}
            </Text>
          </View>

          <View gap="$1" paddingBottom="$4" paddingTop="$6">
            <Label unstyled color={"white"} fontSize={"$4"} fontWeight="bold">
              E-mail
            </Label>
            <Text fontSize={"$3"}>{userData.email || "example@gmail.com"}</Text>
          </View>

          <YStack width={400} alignItems="flex-start" gap="$3">
            <XStack gap="$4" $xs={{ flexDirection: "column" }}>
              <View gap="$1.5">
                <Label
                  unstyled
                  color={"white"}
                  fontSize={"$4"}
                  fontWeight="bold"
                >
                  Notificar sensores favoritados?
                </Label>
                <SwitchWithLabel size="$2" defaultChecked />
              </View>

              <View gap="$1.5">
                <Label
                  unstyled
                  color={"white"}
                  fontSize={"$4"}
                  fontWeight="bold"
                >
                  Notificar sensores novos perto da sua área?
                </Label>
                <SwitchWithLabel
                  size="$2"
                  defaultChecked={userData.notify_on_new_station}
                />
              </View>
            </XStack>
          </YStack>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );

  function SwitchWithLabel(props: {
    size: SizeTokens;
    defaultChecked?: boolean;
  }) {
    return (
      <XStack width={200} alignItems="center" gap="$4">
        <Switch size={props.size} defaultChecked={props.defaultChecked}>
          <Switch.Thumb animation="quicker" />
        </Switch>
        <Separator minHeight={20} vertical />
        <Label
          padding="$0"
          minWidth={90}
          justifyContent="flex-end"
          size={props.size}
        >
          {props.defaultChecked ? "Sim" : "Não"}
        </Label>
      </XStack>
    );
  }
}
