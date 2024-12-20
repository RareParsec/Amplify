import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BlockquoteBridge,
  BoldBridge,
  BulletListBridge,
  CodeBridge,
  CoreBridge,
  DEFAULT_TOOLBAR_ITEMS,
  HeadingBridge,
  ItalicBridge,
  RichText,
  StrikeBridge,
  TenTapStartKit,
  Toolbar,
  ToolbarItems,
  darkEditorCss,
  darkEditorTheme,
  useEditorBridge,
} from "@10play/tentap-editor";
// import { Images } from "NativeClient\node_modules@10play\tentap-editorsrcassetsindex.ts";
import { Images } from "../../node_modules/@10play/tentap-editor/src/assets/index.ts";

const Create = () => {
  const bodyEditor = useEditorBridge({
    autofocus: false,
    theme: {
      ...darkEditorTheme,
    },
    bridgeExtensions: [...TenTapStartKit],
    avoidIosKeyboard: true,
    initialContent: "Hello",
  });

  const blurBodyEditor = {
    onPress:
      ({ editor }) =>
      () => {
        editor.blur();
      },
    active: () => false,
    disabled: () => false,
    image: () => Images.close,
  };

  // 0: Bold formatting
  // 1: Italic formatting
  // 2: Link (insert, edit, remove)
  // 3: Task list (checkbox list)
  // 4: Heading selector
  // 5: Code block
  // 6: Underline
  // 7: Strikethrough
  // 8: Blockquote
  // 9: Ordered list (numbered)
  // 10: Bullet list  (unordered)
  // 11: Indent
  // 12: Outdent
  // 13: Undo
  // 14: Redo

  return (
    <>
      <SafeAreaView className="flex-1" style={{ backgroundColor: "rgb(13, 16, 20)" }} edges={["right", "left"]}>
        {/* <View className="mt-[125] items-center">
          <View className="mt-10 w-full px-3">
            <TextInput
              className="w-full text-[30px] text-white"
              placeholder="Title"
              placeholderTextColor={"white"}
              style={{ fontWeight: "800" }}
            />
          </View>
        </View> */}
        <View className="h-52 mt-[250]">
          <RichText editor={bodyEditor}></RichText>
        </View>
        <KeyboardAvoidingView behavior={"padding"} className="absolute bottom-0 w-full">
          <Toolbar
            editor={bodyEditor}
            items={[
              DEFAULT_TOOLBAR_ITEMS[0],
              DEFAULT_TOOLBAR_ITEMS[1],
              DEFAULT_TOOLBAR_ITEMS[4],
              DEFAULT_TOOLBAR_ITEMS[5],
              DEFAULT_TOOLBAR_ITEMS[7],
              DEFAULT_TOOLBAR_ITEMS[8],
              DEFAULT_TOOLBAR_ITEMS[10],
              blurBodyEditor,
            ]}
          ></Toolbar>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
export default Create;
