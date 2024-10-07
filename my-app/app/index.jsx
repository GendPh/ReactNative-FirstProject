import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StatusBar } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">Gabriel</Text>
      <StatusBar style="auto" />

      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}
