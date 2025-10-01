import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export default function B4() {
  const netinfo = useNetInfo();

  return (
    <View style={{ flex: 1 }}>
      {!netinfo.isConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Không có kết nối mạng</Text>
        </View>
      )}

      <View style={styles.container}>
        <Text style={styles.title}>Trang chủ</Text>
        <Text>Trạng thái kết nối mạng</Text>
        <Text>Có kết nối? {netinfo.isConnected ? "Có" : "Không"}</Text>

        {netinfo.isConnected && <Text>Loại kết nối: {netinfo.type}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
