import api from "@/services/api";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from '@rneui/themed';

export default function BottomSheetAddStationContent() {
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
    <BottomSheetView>
      <Button size="md">teste</Button>
    </BottomSheetView>
  );
}
