jest.mock('@react-native-async-storage/async-storage', () => {
  const asyncStorage = {};
  return {
    getItem: async key => asyncStorage[key],
    setItem: async (key, value) => (asyncStorage[key] = value),
    removeItem: async key => delete asyncStorage[key],
  };
});
