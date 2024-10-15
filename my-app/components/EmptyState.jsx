import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import React from "react";
import { images } from "../constants";
import ButtonComponentCustom from "./CustomButton";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>

      <ButtonComponentCustom
        title="Create video"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyles={"my-5 w-full"}
      />
    </View>
  );
};

export default EmptyState;
