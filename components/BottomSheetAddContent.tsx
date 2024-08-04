import useImagePicker from "@/hooks/useImagePicker";
import api from "@/services/api";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import ImageInput from "./ImageInput";
import { View } from "react-native";

export default function BottomSheetAddStationContent() {
  const {
    image: image1,
    isLoadingImage: isLoadingImage1,
    generateChangeImageAlert: generateChangeImageAlert1,
  } = useImagePicker([4, 3]);
  const {
    image: image2,
    isLoadingImage: isLoadingImage2,
    generateChangeImageAlert: generateChangeImageAlert2,
  } = useImagePicker([4, 3]);

  const handleSubmit = async () => {
    try {
      // await api.post("/devices", {
      // })
    } catch (error) {
      console.error("ERRO:", error);
    }
    console.log("submitting");
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
      <Input placeholder="Nome da estação" />
      <Text
        style={{
          fontSize: 16,
          marginTop: -16,
        }}
      >
        Envie uma imagem frontal e uma lateral do dispositivo para comprovar sua
        validade
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
      >
        Enviar para a moderação
      </Button>
    </BottomSheetView>
  );
}
