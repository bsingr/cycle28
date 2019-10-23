import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = "@cycle28.calendar";

export async function write(data) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function read() {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  return JSON.parse(data) || {}
}
