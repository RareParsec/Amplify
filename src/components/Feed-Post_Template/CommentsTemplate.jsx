import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import MaskView from "../Utils/MaskView";

const CommentsTemplate = ({ comments }) => {
  // console.log(comments)
  return (
    <>
      {comments.map((comment, index) => (
        <View key={index} className="px-3 pt-1 mb-3 bg-zinc-950 h-[111px] rounded-lg">
          <MaskView>
            <Text className="text-gray-300 text-sm">{comment.content}</Text>
          </MaskView>
        </View>
      ))}
    </>
  );
};

export default CommentsTemplate;
