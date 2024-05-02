import { View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { FontText, PressableText, RectangleButton } from "@/components/common";

interface InputRef {
  current: TextInput | null;
}

const ForgotScreen = () => {
  const [focusedInput, setFocusedInput] = useState<number>(1);
  const [inputText, setInputText] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<InputRef[]>(
    Array.from({ length: 6 }, () => ({ current: null }))
  );

  const handleInputChange = (index: number, value: string) => {
    setInputText((prevText) => {
      const newText = [...prevText];
      newText[index] = value;
      return newText;
    });

    // Move focus to the next input if available
    if (
      value.length === 1 &&
      index < inputRefs.current.length - 1 &&
      inputRefs.current[index + 1]?.current
    ) {
      inputRefs.current[index + 1].current?.focus();
      setFocusedInput(index + 1); // Update focused input state
    } else if (
      value.length === 0 &&
      index > 0 &&
      inputRefs.current[index - 1]?.current
    ) {
      // If text is deleted and there's a previous input, move focus to the previous input
      setFocusedInput(index); // Update focused input state to the current input
    }
  };

  useEffect(() => {
    // Autofocus the first input when the component mounts
    inputRefs.current[0]?.current?.focus();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View className="items-center gap-2">
        <MaterialIcons name="verified-user" size={46} color="green" />
        <FontText className="text-2xl text-gray-800">Xác thực OTP</FontText>
        <FontText className="text-center">
          Mã OTP đã được gửi đến địa chỉ email bao@gmail.com
        </FontText>
      </View>

      <View className="flex-row w-full justify-around my-4">
        {[1, 2, 3, 4, 5, 6].map((inputIndex) => (
          <TextInput
            key={inputIndex}
            style={{
              fontSize: 20,
              textAlign: "center",
              padding: 10,
              borderWidth: 2,
              borderRadius: 8,
              borderColor: inputText[inputIndex - 1]
                ? "green"
                : focusedInput === inputIndex
                ? "green"
                : "gray",
              marginBottom: 10,
            }}
            keyboardType="numeric"
            maxLength={1}
            value={inputText[inputIndex - 1]}
            ref={(ref) => {
              if (ref) {
                inputRefs.current[inputIndex - 1].current = ref as TextInput;
              }
            }}
            onFocus={() => setFocusedInput(inputIndex)}
            onChangeText={(value) => handleInputChange(inputIndex - 1, value)} // Pass index and value to handleInputChange
            onKeyPress={({ nativeEvent }) => {
              if (
                nativeEvent.key === "Backspace" &&
                inputIndex > 1 &&
                inputText[inputIndex - 1].length === 0
              ) {
                // If Backspace is pressed and the input is empty, move focus to the previous input
                inputRefs.current[inputIndex - 2].current?.focus();
                setFocusedInput(inputIndex - 1); // Update focused input state to the previous input
              }
            }}
          />
        ))}
      </View>

      <RectangleButton className="w-3/4 rounded-full " text="Xác nhận" />

      <View className="flex-row mt-2">
        <FontText>Không nhận được mã? </FontText>
        <PressableText className="text-blue-500">Gửi lại</PressableText>
      </View>
    </View>
  );
};

export default ForgotScreen;
