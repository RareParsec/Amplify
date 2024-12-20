import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CommentsTemplate from "./CommentsTemplate";
import MaskView from "../Utils/MaskView";

const PostTemplate = ({ post }) => {
  const [showMaskForBody, setShowMaskForBody] = useState(true);

  return (
    <>
      <View className="items-center mt-4">
        <View className="w-full px-5 pt-4 pb-1" style={{ backgroundColor: "rgb(8, 11, 15)" }}>
          <View className="flex-row justify-between mb-5">
            {/** Username */}
            <View className="">
              <Text className="text-gray-300 text-[13px]">{Math.round(Math.random() * 1000000000000)}</Text>
              {/**Time */}
              <View className="flex-row items-center mt-1">
                <Text className="text-white text-[13px]">5 hrs ago</Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="mr-2">
                <MaterialCommunityIcons name="clock-time-four-outline" color={"white"} size={17} />
              </View>
            <Text className="text-white text-[13px]" style={{fontWeight:'500'}}>1 min read</Text>
            </View>
          </View>
          <Text className="text-gray-200 text-[22px]" style={{ fontWeight: "900" }}>
            {post.title}
          </Text>
          {/** Tags*/}
          <View className="flex-row gap-x-3 flex-wrap mt-5">
            <Text className="text-gray-300 text-[13px]">#entrepenuer</Text>
            <Text className="text-gray-300 text-[13px]">#business</Text>
            <Text className="text-gray-300 text-[13px]">#gaming</Text>
          </View>
          {/** Body */}
          {/* <Text className="text-gray-300 mt-4 text-[15px] leading-6" style={{ fontWeight: "300" }}>
            {post.body}
          </Text> */}
          <View className="flex-row justify-between mt-4">
            <View className="flex-row">
              {/** Votes */}
              <View className="flex-row items-center justify-center">
                <Pressable className="mr-2">
                  <MaterialCommunityIcons name="triangle" color={"white"} size={15} />
                </Pressable>
                <Text className="text-white font-bold text-[14px]">47</Text>
                <Pressable className="ml-2">
                  <MaterialCommunityIcons
                    name="triangle"
                    color={"white"}
                    size={15}
                    style={{ transform: [{ scaleY: -1 }] }}
                  />
                </Pressable>
              </View>
              {/** Comments */}
              <View className="flex-row items-center ml-6">
                <View className="mr-2">
                  <MaterialCommunityIcons name="comment" color={"white"} size={15} />
                </View>
                <Text className="text-white text-[14px]">7</Text>
              </View>
            </View>
          </View>
          {/* <Text className="text-white">{post.comments[0].body}</Text> */}
        </View>
      </View>

      {/* <Pressable>
        <View className="items-center">
          <View className="w-[90%] mt-7">
            <Text className="text-white text-[28px]" style={{ fontWeight: "700" }}>
              {post.title}
            </Text>
            <Text className="text-white mt-7 leading-6 text-[18px]">{post.body}</Text>
          </View>
        </View>
      </Pressable> */}
    </>
  );
};

export default PostTemplate;

//     <Pressable
//       onPress={() => navigation.navigate("Post", { post: post })}
//       className="mx-2 rounded-xl mb-5"
//       // style={{ backgroundColor: "rgb(24, 26, 26)" }}
//     >
//       {/** Post */}
//       <View className="p-2">
//         <View className="flex-row">
//           <Image
//             src={`${post.subredditPFP}`}
//             className="rounded-full w-[38] h-[38]"
//             style={{ borderColor: "rgb(255, 100, 0)", borderWidth: 0.5 }}
//           />
//           <View className="ml-3 justify-center">
//             <Pressable className="py-[1]">
//               <Text className="text-white font-bold text-[14px]">{post.subreddit}</Text>
//             </Pressable>
//             <Pressable className="py-[1]">
//               <Text className="text-white text-[12px]">u/{post.username}</Text>
//             </Pressable>
//           </View>
//         </View>
//         <View className="mt-4">
//           {/** Title */}
//           <Text className="text-white text-[17px] tracking-widest px-1" style={{ fontWeight: "300" }}>
//             {post.title}
//           </Text>
//           {/** Body */}
//           <View className="my-3 items-center">
//             <View style={{ maxHeight: 160 }} className="">
//               {showMaskForBody && (
//                 <MaskView>
//                   <Text className="text-gray-300 text-[15px] leading-5 px-1 truncate" style={{ fontWeight: "300" }}>
//                     {post.body}
//                   </Text>
//                 </MaskView>
//               )}
//             </View>
//           </View>
//         </View>
//         <View className="h-fit flex-row justify-between mt-2">
// <View className="flex-row items-center">
//   {/** Votes */}
//   <View className="flex-row items-center justify-center bg-zinc-900 py-[4] px-4 rounded-full ml-1">
//     <Pressable className="mr-2">
//       <MaterialCommunityIcons name="triangle" color={"white"} size={17} />
//     </Pressable>
//     <Text className="text-white font-bold text-md">47</Text>
//     <Pressable className="ml-2">
//       <MaterialCommunityIcons
//         name="triangle"
//         color={"white"}
//         size={17}
//         style={{ transform: [{ scaleY: -1 }] }}
//       />
//     </Pressable>
//   </View>
//   {/** Comments */}
//   <View className="flex-row items-center ml-6">
//     <View className="mr-2">
//       <MaterialCommunityIcons name="comment" color={"white"} size={17} />
//     </View>
//     <Text className="text-white">7</Text>
//   </View>
// </View>
//           {/** Share */}
//           <View className="flex-row items-center mr-3">
//             <View className="mr-2">
//               <MaterialCommunityIcons name="share" color={"white"} size={17} />
//             </View>
//             <Text className="text-white text-[12px]">Share</Text>
//           </View>
//         </View>
//       </View>
//       {/** Display Comments */}
//       {/* <View className="mt-5">
//   <CommentsTemplate comments={Array.from(post.comments).slice(0, 2)} />
// </View> */}
//     </Pressable>;
