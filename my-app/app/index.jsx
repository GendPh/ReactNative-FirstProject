import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StatusBar } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <StatusBar style="auto" />

      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}
