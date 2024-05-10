import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ActionType = "edit" | "delete";

type Props = {
  type: ActionType;
  isEdit?: boolean;
} & TouchableOpacityProps;

const ActionButton = (props: Props) => {
  const { type, isEdit = false, className, ...otherProps } = props;

  const renderIcon = () => {
    switch (type) {
      case "edit":
        return isEdit ? (
          <MaterialCommunityIcons name="check" size={20} color="green" />
        ) : (
          <MaterialCommunityIcons
            name="wrench-outline"
            size={20}
            color="black"
          />
        );
      case "delete":
        return (
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color="red"
          />
        );
      default:
        return null;
    }
  };

  const renderStyle = () => {
    switch (type) {
      case "edit":
        return isEdit
          ? {
              backgroundColor: "rgb(220, 252, 231)",
              borderColor: "green",
            }
          : { backgroundColor: "rgb(243, 244, 246)" };
      case "delete":
        return {
          backgroundColor: "rgb(255, 204, 204)",
          borderColor: "red",
        };
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      className={`p-2 rounded-lg border ${className}`}
      style={renderStyle()}
      {...otherProps}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default ActionButton;
