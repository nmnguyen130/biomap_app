const COLORS = {
  black: "#000000",
  white: "#FFFFFF",
  blue: "#3B82F6",
  orange: "#EAB308",
  grey: "#EEEEEE",
  primary: "#128F51",
  lighter_primary: "#4AAE70",
  darker_primary: "#0E6C38",
};

const FONT = {
  light: "AirBnbLight",
  book: "AirBnbBook",
  medium: "AirBnbMedium",
  bold: "AirBnbBold",
  Extrabold: "AirBnbExtrabold",
  black: "AirBnbBlack",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
