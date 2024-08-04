import useImagePicker from "@/hooks/useImagePicker";
import api from "@/services/api";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import ImageInput from "./ImageInput";
import { View } from "react-native";
import { useState } from "react";

type BottomSheetAddStationContentProps = {
  currentUserLocation: any;
  snapToIndex: (index: 0 | 1 | 2) => void;
  setIsCreating: (isCreating: boolean) => void;
};

export default function BottomSheetAddStationContent({
  currentUserLocation,
  snapToIndex,
  setIsCreating,
}: BottomSheetAddStationContentProps) {
  const {
    image: image1,
    isLoadingImage: isLoadingImage1,
    generateChangeImageAlert: generateChangeImageAlert1,
    resetImage: resetImage1,
  } = useImagePicker([4, 3]);
  const {
    image: image2,
    isLoadingImage: isLoadingImage2,
    generateChangeImageAlert: generateChangeImageAlert2,
    resetImage: resetImage2,
  } = useImagePicker([4, 3]);

  const [stationName, setStationName] = useState("");
  const [deviceIdentifier, setDeviceIdentifier] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", stationName);
      formData.append("user", "35fca86f-2d85-4b75-87c7-e7d32f8354ba");
      formData.append("identifier", deviceIdentifier);
      formData.append("longitude", currentUserLocation?.coords.longitude);
      formData.append("latitude", currentUserLocation?.coords.latitude);
      formData.append("front_photo", {
        uri: image1.uri,
        type: image1.type,
        name: image1.fileName,
      });
      formData.append("side_photo", {
        uri: image2.uri,
        type: image2.type,
        name: image2.fileName,
      });

      await api.post("/devices/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStationName("");
      setDeviceIdentifier("");
      resetImage1();
      resetImage2();

      snapToIndex(0);

      setIsCreating(false);
    } catch (error) {
      console.log("ERRO:", error.response?.data);
    }
  };

  return (
    <BottomSheetView
      style={{
        padding: 16,
        gap: 4,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Adicione uma nova estação de monitoramento de nível de água
      </Text>
      <Input
        placeholder="Nome da estação"
        value={stationName}
        onChangeText={setStationName}
      />
      <Input
        placeholder="Identificador do dispositivo"
        value={deviceIdentifier}
        onChangeText={setDeviceIdentifier}
      />
      <Text
        style={{
          fontSize: 16,
          marginTop: -16,
        }}
      >
        Envie uma imagem frontal e uma lateral do dispositivo para comprovar sua
        validade:
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        <ImageInput
          image={image1}
          isLoadingImage={isLoadingImage1}
          generateChangeImageAlert={generateChangeImageAlert1}
          hasImage={!!image1}
        />
        <ImageInput
          image={image2}
          isLoadingImage={isLoadingImage2}
          generateChangeImageAlert={generateChangeImageAlert2}
          hasImage={!!image2}
        />
      </View>

      <Button
        size="md"
        style={{
          marginTop: 16,
        }}
        onPress={handleSubmit}
      >
        Enviar para a moderação
      </Button>
    </BottomSheetView>
  );
}
