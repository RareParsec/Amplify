import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PostTemplate from "./PostTemplate";
import { useDispatch, useSelector } from "react-redux";
import { setScrollingDown } from "../../redux/slices/globalVariablesSlice";
import axios from "../../config/axios.config";

const Feed = ({}) => {
  const dispatch = useDispatch();
  const { scrollingDown } = useSelector((state) => state.globalVariables);
  const scrollY = useRef(0);

  interface Post {
    id: string;
    title: string;
    body: string;
    image: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY <= 0) return;

    if (currentScrollY > scrollY.current + 20) {
      if (scrollingDown === false) dispatch(setScrollingDown(true));
    } else if (currentScrollY < scrollY.current - 20) {
      if (scrollingDown === true) dispatch(setScrollingDown(false));
    } else {
      return;
    }

    scrollY.current = currentScrollY;
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {console.log(posts)}, [posts]);

  return (
    <FlatList
      data={posts}
      className="pt-[125]"
      onScroll={handleScroll}
      renderItem={({ item }) => <PostTemplate post={item} />}
      keyExtractor={(post) => post.id}
    ></FlatList>
  );
};

export default Feed;
