import { WaterLevelStatus } from "@/enums/WaterLevelStatus";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { H3, Paragraph, H4, View, Text } from "tamagui";
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

type HomeBottomSheetProps = {
  favoriteStations: any[];
};

export default forwardRef(function HomeBottomSheet(
  { favoriteStations }: HomeBottomSheetProps,
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
                    flexDirection="row"
                    gap="$1"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal="$6"
                    opacity={pressed ? 0.5 : 1}
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
                )}
              </Pressable>
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
