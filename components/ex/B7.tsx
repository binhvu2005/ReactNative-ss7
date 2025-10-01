import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function B7() {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  const data = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Orientation: {isPortrait ? "Portrait (dọc)" : "Landscape (ngang)"}
      </Text>

      <FlatList
        data={data}
        key={isPortrait ? "v" : "h"}
        keyExtractor={(item) => item.id}
        numColumns={isPortrait ? 1 : 2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  item: {
    flex: 1,
    backgroundColor: "#87cefa",
    margin: 5,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
