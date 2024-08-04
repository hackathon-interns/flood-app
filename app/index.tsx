import { Pressable, StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";

import * as Location from "expo-location";

import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

import { View, Paragraph, Text, H3, H4 } from "tamagui";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { WaterLevelStatus } from "@/enums/WaterLevelStatus";

import Ionicons from "@expo/vector-icons/Ionicons";
import Reanimated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={styles.map}
        region={{
          latitude: -23.5505,
          longitude: -47.60013,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["20%", "50%", "85%"]}
        handleIndicatorStyle={{
          backgroundColor: "gray",
        }}
      >
        <BottomSheetFlatList
          data={favoriteStations}
          contentContainerStyle={{
            gap: 12,
          }}
          ListHeaderComponent={() => {
            return (
              <View gap="$1" paddingHorizontal="$6">
                <H3 color="$black1">Estações favoritas</H3>
                <Paragraph color="$gray7">
                  Selecione uma estação para visualizar os detalhes.
                </Paragraph>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <ReanimatedSwipeable
                friction={2}
                // leftThreshold={80}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={RightAction}
              >
                <View
                  flexDirection="row"
                  gap="$1"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingHorizontal="$6"
                >
                  <View flexDirection="column" alignItems="flex-start">
                    <H4 color="$black1">{item.name}</H4>
                    <Paragraph color="$gray7">{item.address}</Paragraph>
                  </View>

                  <View flexDirection="row" gap="$2">
                    <Text
                      color={
                        item.waterLevelStatus >= WaterLevelStatus.Normal
                          ? "$blue10Light"
                          : "$blue12Dark"
                      }
                    >
                      <FontAwesome6 name="droplet" size={24} />
                    </Text>
                    <Text
                      color={
                        item.waterLevelStatus >= WaterLevelStatus.Warning
                          ? "$blue10Light"
                          : "$blue12Dark"
                      }
                    >
                      <FontAwesome6 name="droplet" size={24} />
                    </Text>
                    <Text
                      color={
                        item.waterLevelStatus >= WaterLevelStatus.Danger
                          ? "$blue10Light"
                          : "$blue12Dark"
                      }
                    >
                      <FontAwesome6 name="droplet" size={24} />
                    </Text>
                  </View>
                </View>
              </ReanimatedSwipeable>
            );
          }}
        />
        {favoriteStations.length === 0 && (
          <BottomSheetView>
            <View
              justifyContent="center"
              alignItems="center"
              gap="$2"
              marginTop="$2"
            >
              <FontAwesome5 name="sad-tear" size={48} color="gray" />
              <Paragraph col="$gray7" textAlign="center">
                Selecione uma estação meteorológica ou favorite uma estação para
                habilitar o acesso rápido.
              </Paragraph>
            </View>
          </BottomSheetView>
        )}
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

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            drag.value,
            [0, -80],
            [80, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: "crimson",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Pressable onPress={() => console.log("remover dos favoritos")}>
          {({ pressed }) => (
            <Ionicons
              name="trash"
              size={24}
              color="white"
              style={{
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      </View>
    </Reanimated.View>
  );
}
