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
    <View paddingTop="$12" paddingHorizontal="$3">
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
                <SwitchWithLabel
                  size="$3"
                  checked={notifyFavoriteSensors}
                  onCheckedChange={setNotifyFavoriteSensors}
                />
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
                  size="$3"
                  checked={notifyNewStation}
                  onCheckedChange={setNotifyNewStation}
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
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) {
    return (
      <XStack width={200} alignItems="center" gap="$4">
        <Switch
          size={props.size}
          checked={props.checked}
          onCheckedChange={props.onCheckedChange}
          style={{
            backgroundColor: props.checked ? "green" : "red",
          }}
        >
          <Switch.Thumb animation="slow" />
        </Switch>
        <Separator minHeight={20} vertical />
        <Label
          padding="$0"
          minWidth={90}
          justifyContent="flex-end"
          size={props.size}
        >
          {props.checked ? "Sim" : "Não"}
        </Label>
      </XStack>
    );
  }
}
