import axios from 'axios';
import { Platform } from 'react-native';

import {
  type WordDetailsModel,
  type WordModel,
  type WordHistoryModel,
  type WordFavoriteModel,
  type WordSearchModel,
} from '@models/WordModel';
import { type UserModel } from '@models/UserModel';

const BASE_URL_DETAILS_WORD =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';

const BASE_URL_API_WORD =
  Platform.OS === 'android'
    ? 'http://192.168.0.124:3000/api/'
    : 'http://localhost:3000/api/';

const PAGE_SIZE = 100;

async function getDetailsWord({
  word,
}: {
  word: string;
}): Promise<WordDetailsModel | undefined> {
  try {
    const response = await axios.get<WordDetailsModel[]>(
      `${BASE_URL_DETAILS_WORD}${word}`,
    );

    return response?.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function getListWords({
  page,
  pageSize,
  user_id,
}: {
  page: number;
  pageSize?: number;
  user_id: number;
}): Promise<WordModel[] | undefined> {
  const sizePage = pageSize || PAGE_SIZE;

  try {
    const response = await axios.get<WordModel[]>(
      `${BASE_URL_API_WORD}words?user_id=${user_id}&page=${page}&pageSize=${sizePage}`,
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function getListFavoritesWords({
  user_id,
}: {
  user_id: number;
}): Promise<WordFavoriteModel[] | undefined> {
  try {
    const response = await axios.get<WordFavoriteModel[]>(
      `${BASE_URL_API_WORD}favorites/listFavoriteWords`,
      {
        params: { user_id },
      },
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function getListHistoryWords({
  user_id,
}: {
  user_id: number;
}): Promise<WordHistoryModel[] | undefined> {
  try {
    const response = await axios.get<WordHistoryModel[]>(
      `${BASE_URL_API_WORD}history/listHistoryWords?user_id=${user_id}`,
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function setFavoriteWord({
  user_id,
  word_id,
  word,
}: {
  user_id: number;
  word_id: number;
  word: string;
}): Promise<string | undefined> {
  try {
    const response = await axios.post(
      `${BASE_URL_API_WORD}favorites/createFavoriteWord`,
      {
        user_id,
        word_id,
        word,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response?.data;
  } catch {}
}

async function removeFavoriteWord({
  user_id,
  word_id,
}: {
  user_id: number;
  word_id: number;
}): Promise<string | undefined> {
  try {
    const response = await axios.delete(
      `${BASE_URL_API_WORD}favorites/removeFavoriteWord`,
      { params: { user_id, word_id } },
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function setHistoryWord({
  user_id,
  word_id,
  word,
}: {
  user_id: number;
  word_id: number;
  word: string;
}): Promise<string | undefined> {
  try {
    const response = await axios.post(
      `${BASE_URL_API_WORD}history/createHistoryWord`,
      {
        user_id,
        word_id,
        word,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response?.data;
  } catch {}
}

async function removeHistoryWord({
  user_id,
  word_id,
}: {
  user_id: number;
  word_id: number;
}): Promise<string | undefined> {
  try {
    const response = await axios.delete(
      `${BASE_URL_API_WORD}history/removeHistoryWord`,
      { params: { user_id, word_id } },
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<UserModel | undefined> {
  try {
    const response = await axios.post<UserModel>(
      `${BASE_URL_API_WORD}users/login`,
      {
        username,
        password,
      },
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

async function search({
  word,
  user_id,
}: {
  word: string;
  user_id: number;
}): Promise<WordSearchModel[] | undefined> {
  try {
    const response = await axios.get<WordSearchModel[]>(
      `${BASE_URL_API_WORD}words/search?searchItem=${word}&user_id=${user_id}`,
    );

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status));
    } else {
      throw new Error('It occurred an unknown error.');
    }
  }
}

export const api = {
  getDetailsWord,
  getListWords,
  getListFavoritesWords,
  setFavoriteWord,
  removeFavoriteWord,
  getListHistoryWords,
  setHistoryWord,
  removeHistoryWord,
  signIn,
  search,
};
