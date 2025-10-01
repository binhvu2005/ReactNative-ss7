import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme phải được dùng bên trong ThemeProvider");
  }
  return context;
}

export default function B6() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemedScreen />
    </ThemeContext.Provider>
  );
}

function ThemedScreen() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const backgroundColor = isDark ? "#222" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Chế độ hiện tại: {isDark ? "Tối (Dark)" : "Sáng (Light)"}
      </Text>
      <Switch value={isDark} onValueChange={toggleTheme} />

      <LevelOne />
    </View>
  );
}

function LevelOne() {
  return (
    <View style={{ marginTop: 20 }}>
      <ThemedBox />
    </View>
  );
}

function ThemedBox() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.box, { backgroundColor: isDark ? "#444" : "#ddd" }]}>
      <Text style={{ color: isDark ? "#fff" : "#000" }}>
        Đây là component con đang theo theme {theme}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    padding: 20,
    borderRadius: 10,
  },
});
