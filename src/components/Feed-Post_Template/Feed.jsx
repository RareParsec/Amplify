import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PostTemplate from "./PostTemplate";

const Feed = () => {
  const posts = [
    {
      id: 1,
      title:
        "Is it theoretically possible to harness the vast energy of lightning strikes for sustainable power generation?",
      body: "Lightning is an awe-inspiring display of natural power. I understand that a single bolt contains a tremendous amount of energy, but is there any practical way to capture and store this energy on a large scale? Could lightning potentially be a viable supplement to traditional renewable energy sources? What are the technological hurdles and potential environmental considerations for this concept?",
      username: "energy_enthusiast95",
      subreddit: "r/AskScience",
      subredditPFP:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1200px-Altja_j%C3%B5gi_Lahemaal.jpg",
      comments: [
        {
          content:
            "Although the energy of a lightning bolt is huge, the challenges are immense. Infrequency, unpredictable location, massive voltage fluctuations, and the short timeframe to capture make direct energy harvesting extremely difficult. Perhaps indirect methods (like using the heat to create steam) offer more potential?",
        },
        {
          content:
            "There have been attempts to harness lightning power throughout history, even Ben Franklin experimented with kites! While the energy is tantalizing, consistent capture remains elusive. Modern research often focuses on triggering lightning for research rather than energy generation.",
        },
      ],
    },
    {
      id: 2,
      title:
        "Seeking authentic experiences in Japan: Hidden gems, local favorites, and cultural immersion beyond the tourist hotspots",
      body: "I've dreamt of visiting Japan for years, and I'm determined to experience the country's rich culture and breathtaking landscapes beyond the typical guidebook recommendations.  I'm drawn to smaller towns with historical charm, traditional arts and crafts, stunning natural scenery, and opportunities to interact with locals.  Please share your favorite off-the-beaten-path destinations or unique experiences that made your Japan trip truly unforgettable.",
      username: "japan_dreamer2024",
      subreddit: "r/Travel",
      subredditPFP:
        "https://picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg",
      comments: [
        {
          content:
            "If you want a beautiful mix of history and nature try [insert off-the-path town/region]. It has traditional architecture, local artisan shops, and temples/shrines tucked away in scenic spots. For a truly immersive experience, consider a homestay in the area!",
        },
        {
          content:
            "Rather than just locations, seek out experiences! Look for hands-on workshops like [pottery/weaving/calligraphy]. Or festivals – smaller towns often have incredible local celebrations. Even staying in a ryokan (traditional inn) offers a cultural experience in itself.",
        },
      ],
    },
    {
      id: 3,
      title:
        "My dog's identity crisis: Convinced he's a feline, he stalks birds, attempts to groom himself incessantly, and judges me silently from high places.",
      body: "I swear, if I didn't know better, I'd think I accidentally adopted a cat disguised as a golden retriever. He's mastered the art of balancing on the arm of the sofa, insists on sampling every human food item, and has perfected the \"unimpressed glare\" that all cats seem to possess.  Does anyone else have a pet with a serious case of mistaken identity? Please share your hilarious stories!",
      username: "confused_dog_parent",
      subreddit: "r/funny",
      subredditPFP:
        "https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png",
      comments: [
        {
          content:
            "My cat totally relates! She barks at strangers to protect her domain and loves chasing squirrels...clearly a dog at heart. Your fur baby's antics sound hilarious, do you have videos?",
        },
        {
          content:
            "This is amazing! Is he a particular breed, by any chance? Curious if this is a quirk of his breed, or just pure independent spirit. You should start an Insta for him - guaranteed viral material!",
        },
      ],
    },
  ];

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostTemplate item={item} />}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
};

export default Feed;
