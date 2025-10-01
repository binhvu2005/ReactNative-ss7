import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useDebounce } from "./useDebounce";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Gọi API với từ khóa:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tìm kiếm:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa..."
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.result}>Giá trị debounce: {debouncedQuery}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    color: "blue",
  },
});
