import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Ionicons } from "@expo/vector-icons";

type ImageInputProps = {
  image?: string;
  isLoadingImage: boolean;
  hasImage: boolean;
  generateChangeImageAlert: () => void;

  height?: number;
  width?: number;
  borderRadius?: number;
};

export default function ImageInput({
  image,
  isLoadingImage,
  hasImage,
  generateChangeImageAlert,

  height = 160,
  width = 160,
  borderRadius = 0,
}: ImageInputProps) {
  return (
    <View
      style={{
        alignItems: "center",
        gap: 16,
      }}
    >
      {hasImage ? (
        <>
          <Image
            source={image}
            style={{
              width,
              height,
              position: "relative",
              opacity: isLoadingImage ? 0.5 : 1,
            }}
          />
          {isLoadingImage && (
            <View
              style={{
                width,
                height,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <LoadingSpinner />
            </View>
          )}
        </>
      ) : (
        <Pressable onPress={generateChangeImageAlert}>
          {({ pressed }) => (
            <View
              style={{
                width,
                height,
                borderRadius,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f3f4f6",
                borderColor: "black",
                borderWidth: 3,
                borderStyle: "dashed",
                opacity: pressed ? 0.5 : 1,
              }}
            >
              {!isLoadingImage ? (
                <Ionicons name="camera" size={60} color="#3b82f6" />
              ) : (
                <LoadingSpinner />
              )}
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}
