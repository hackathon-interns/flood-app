import { StyleSheet } from "react-native";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

import { View, Button } from "tamagui";

export default function HomeScreen() {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["20%", "50%", "100%"]}
      >
        <BottomSheetView>
          <Button theme="blue">teste</Button>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
