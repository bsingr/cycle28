import AsyncStorage from '@react-native-community/async-storage';

export async function write(data) {
  return AsyncStorage.setItem('@circle28.calendar', JSON.stringify(data));
}

export async function read() {
  const data = await AsyncStorage.getItem('@circle28.calendar')
  return JSON.parse(data)
}
