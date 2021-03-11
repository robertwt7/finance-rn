import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// ========================================================
// Size Utils
// Ref: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
// ========================================================
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
