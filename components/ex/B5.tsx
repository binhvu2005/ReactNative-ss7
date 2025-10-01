import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Định nghĩa Todo
type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

// Định nghĩa Action
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

// Reducer
function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), name: action.payload, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function B5() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      {/* Ô nhập liệu */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Nhập công việc..."
        placeholderTextColor="#53d39bff"
      />
      <Button title="Thêm" onPress={handleAdd} />

      {/* Danh sách công việc */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: "TOGGLE_TODO", payload: item.id })
              }
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.todoText,
                  item.completed && { textDecorationLine: "line-through" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <Button
              title="Xóa"
              onPress={() =>
                dispatch({ type: "DELETE_TODO", payload: item.id })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  todoText: {
    fontSize: 16,
  },
});
