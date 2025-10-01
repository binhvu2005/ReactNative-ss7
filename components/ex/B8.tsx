import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useDebounce from "./useDebounce";

// Mock data để mô phỏng kết quả tìm kiếm
const mockSearchResults = [
  { id: 1, title: "React Native Tutorial", category: "Development" },
  { id: 2, title: "JavaScript Fundamentals", category: "Programming" },
  { id: 3, title: "TypeScript Guide", category: "Development" },
  { id: 4, title: "Mobile App Design", category: "Design" },
  { id: 5, title: "React Hooks Advanced", category: "Development" },
  { id: 6, title: "UI/UX Principles", category: "Design" },
  { id: 7, title: "Node.js Backend", category: "Development" },
  { id: 8, title: "Database Design", category: "Programming" },
  { id: 9, title: "API Integration", category: "Development" },
  { id: 10, title: "Testing Strategies", category: "Quality" },
];

// Mock API call function
const mockApiCall = async (query: string): Promise<typeof mockSearchResults> => {
  // Mô phỏng delay của API
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  if (!query.trim()) return [];
  
  return mockSearchResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );
};

export default function B8() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sử dụng custom hook useDebounce với delay 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Effect để gọi API khi debouncedSearchQuery thay đổi
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim() === "") {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await mockApiCall(debouncedSearchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  const renderSearchResult = ({ item }: { item: typeof mockSearchResults[0] }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm với Debounce</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Query hiện tại: &ldquo;{searchQuery}&rdquo;
        </Text>
        <Text style={styles.statusText}>
          Debounced query: &ldquo;{debouncedSearchQuery}&rdquo;
        </Text>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
          </View>
        )}
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          Kết quả ({searchResults.length}):
        </Text>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSearchResult}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 15,
  },
  statusContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  loadingText: {
    marginLeft: 8,
    color: "#007AFF",
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});
