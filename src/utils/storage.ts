import AsyncStorage from "@react-native-async-storage/async-storage";

// Save Login Infor
export const saveLoginInfoToCache = async (email: string, password: string) => {
  try {
    await AsyncStorage.setItem(
      "loginInfo",
      JSON.stringify({ email, password })
    );
  } catch (error) {
    console.error("Error saving login information to AsyncStorage:", error);
  }
};

export const getLoginInfoFromCache = async () => {
  try {
    const loginInfo = await AsyncStorage.getItem("loginInfo");
    return loginInfo ? JSON.parse(loginInfo) : null;
  } catch (error) {
    console.error(
      "Error retrieving login information from AsyncStorage:",
      error
    );
    return null;
  }
};

export const clearLoginInfoFromCache = async () => {
  try {
    await AsyncStorage.removeItem("loginInfo");
    // console.log("Login information cleared successfully.");
  } catch (error) {
    console.error("Error clearing login information from cache:", error);
  }
};

// Save Image URL
export const saveURLToCache = async (key: string, URL: string) => {
  try {
    await AsyncStorage.setItem(key, URL);
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
};

export const getURLFromCache = async (key: string) => {
  try {
    const URL = await AsyncStorage.getItem(key);
    return URL ? JSON.parse(URL) : null;
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    return null;
  }
};

const getAllDataFromStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);

    console.log("All data stored in AsyncStorage:");
    allData.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Cache cleared successfully.");
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};
