import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CommentsTemplate from "./CommentsTemplate";
import MaskView from "../Utils/MaskView";

const PostTemplate = ({ item }) => {
  const [showMaskForBody, setShowMaskForBody] = useState(true);

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("Post", { post: item })}
        className="px-3 py-4 mx-1 rounded-xl"
        style={{ backgroundColor: "rgb(10 10 10)" }}
      >
        {/** Post */}
        <View className="flex-row">
          <Image
            src={`${item.subredditPFP}`}
            className="rounded-full w-[38] h-[38]"
            style={{ borderColor: "rgb(255, 100, 0)", borderWidth: 0.5 }}
          />
          <View className="ml-3 justify-center">
            <Pressable className="py-[1]">
              <Text className="text-white font-bold text-[14px]">{item.subreddit}</Text>
            </Pressable>
            <Pressable className="py-[1]">
              <Text className="text-white text-[12px]">u/{item.username}</Text>
            </Pressable>
          </View>
        </View>
        <View className="mt-4">
          {/** Title */}
          <Text className="text-gray-200 text-[18px] font-bold tracking-wider px-1">{item.title}</Text>
          {/** Body */}
          <View className="my-3">
            <View style={{ maxHeight: 160 }}>
              {showMaskForBody && (
                <MaskView>
                  <Text className="text-gray-300 text-[15px] leading-5 px-1 truncate">{item.body}</Text>
                </MaskView>
              )}
            </View>
          </View>
        </View>
        <View className="h-fit flex-row justify-between">
          <View className="flex-row items-center">
            {/** Votes */}
            <View className="flex-row items-center justify-center bg-zinc-900 py-[4] px-4 rounded-full ml-1">
              <Pressable className="mr-2">
                <MaterialCommunityIcons name="triangle" color={"white"} size={17} />
              </Pressable>
              <Text className="text-white font-bold text-md">47</Text>
              <Pressable className="ml-2">
                <MaterialCommunityIcons
                  name="triangle"
                  color={"white"}
                  size={17}
                  style={{ transform: [{ scaleY: -1 }] }}
                />
              </Pressable>
            </View>
            {/** Comments */}
            <View className="flex-row items-center ml-6">
              <View className="mr-2">
                <MaterialCommunityIcons name="comment" color={"white"} size={17} />
              </View>
              <Text className="text-white">7</Text>
            </View>
          </View>
          {/** Share */}
          <View className="flex-row items-center mr-3">
            <View className="mr-2">
              <MaterialCommunityIcons name="share" color={"white"} size={17} />
            </View>
            <Text className="text-white text-[12px]">Share</Text>
          </View>
        </View>
        {/** Display Comments */}
        {/* <View className="mt-5">
          <CommentsTemplate comments={Array.from(item.comments).slice(0, 2)} />
        </View> */}
      </Pressable>
    </>
  );
};

export default PostTemplate;
