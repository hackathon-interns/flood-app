import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function LoadingSpinner() {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  const rotateZ = rotationDegree.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 56,
        width: 56,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 1000,
          borderWidth: 6,
          opacity: 0.25,
          borderColor: "yellow",
        }}
      />
      <Animated.View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 1000,
          borderWidth: 6,
          borderTopColor: "yellow",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          position: "absolute",
          transform: [
            {
              rotateZ,
            },
          ],
        }}
      />
    </View>
  );
}
