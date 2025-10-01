import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function B1() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increase" onPress={handleIncrease} />
      <Button title="Decrease" onPress={handleDecrease} />
    </View>
  );
}
