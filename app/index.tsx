import B1 from "@/components/ex/B1";
import B2 from "@/components/ex/B2";
import B3 from "@/components/ex/B3";
import B4 from "@/components/ex/B4";
import B5 from "@/components/ex/B5";
import B6 from "@/components/ex/B6";
import B7 from "@/components/ex/B7";
import B8 from "@/components/ex/B8";
import SearchScreen from "@/components/ex/SearchScreen";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <SafeAreaView style={style.container}>
      {/* <B1 /> */}
      {/* <B2 /> */}
      {/* <B3 /> */}
      {/* <B4 /> */}
      {/* <B5 /> */}
      {/* <B6 /> */}
      {/* <B7 /> */}
      <B8 />
  
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});