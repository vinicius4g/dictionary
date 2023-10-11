export const storageKeys = {
  userData: '@dictionary_app-vinicius4g/user',
};

export type StorageKeys = keyof typeof storageKeys;

export const rootKeys = { ...storageKeys };
