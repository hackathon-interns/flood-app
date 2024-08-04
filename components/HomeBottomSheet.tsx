import { WaterLevelStatus } from "@/enums/WaterLevelStatus";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import Reanimated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { forwardRef } from "react";
import BottomSheetAddStationContent from "./BottomSheetAddContent";

type HomeBottomSheetProps = {
  favoriteStations: any[];
  isCreating: boolean;
  currentUserLocation: any;
};

export default forwardRef(function HomeBottomSheet(
  { favoriteStations, isCreating, currentUserLocation }: HomeBottomSheetProps,
  bottomSheetRef: any
) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["20%", "50%", "85%"]}
      handleIndicatorStyle={{
        backgroundColor: "gray",
      }}
    >
      {isCreating ? (
        <BottomSheetAddStationContent
          currentUserLocation={currentUserLocation}
        />
      ) : favoriteStations.length > 0 ? (
        <BottomSheetFlatList
          data={favoriteStations}
          contentContainerStyle={{
            gap: 12,
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  gap: 4,
                  paddingHorizontal: 24,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Estações favoritas
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 12,
                  }}
                >
                  Selecione uma estação para visualizar os detalhes.
                </Text>
              </View>
            );
          }}
          renderItem={({ item }: { item: any }) => {
            return (
              <ReanimatedSwipeable
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={RightAction}
              >
                <Pressable onPress={() => console.log("ir para detalhes")}>
                  {({ pressed }) => (
                    <View
                      style={{
                        height: 60,
                        flexDirection: "row",
                        gap: 4,
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 24,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "gray",
                          }}
                        >
                          {item.address}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              item.waterLevelStatus >= WaterLevelStatus.Normal
                                ? "blue"
                                : "gray",
                          }}
                        >
                          <FontAwesome6 name="droplet" size={24} />
                        </Text>
                        <Text
                          style={{
                            color:
                              item.waterLevelStatus >= WaterLevelStatus.Warning
                                ? "blue"
                                : "gray",
                          }}
                        >
                          <FontAwesome6 name="droplet" size={24} />
                        </Text>
                        <Text
                          style={{
                            color:
                              item.waterLevelStatus >= WaterLevelStatus.Danger
                                ? "blue"
                                : "gray",
                          }}
                        >
                          <FontAwesome6 name="droplet" size={24} />
                        </Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              </ReanimatedSwipeable>
            );
          }}
        />
      ) : (
        <BottomSheetView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            <FontAwesome5 name="sad-tear" size={48} color="gray" />
            <Text
              style={{
                color: "gray",
                textAlign: "center",
              }}
            >
              Selecione uma estação meteorológica ou favorite uma estação para
              habilitar o acesso rápido.
            </Text>
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
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
