import React, {
  createContext,
  useState,
  type ReactNode,
  useContext,
} from 'react';

import {
  type WordModel,
  type WordFavoriteModel,
  type WordHistoryModel,
} from '@models/WordModel';

import { api } from '@services/api';

import { AuthContext } from '@contexts/auth';

type WordType = WordModel | WordFavoriteModel | WordHistoryModel;
export type OriginType =
  | 'HomeScreen'
  | 'FavoriteScreen'
  | 'HistoryScreen'
  | 'Search';

interface IValuesWords {
  listWords: WordModel[];
  setListWords: (listWords: WordModel[]) => void;
  fetchListWords: () => Promise<void>;
  loadingListWords: boolean;
  fetchFavoriteListWords: () => Promise<void>;
  listFavoritesWords: WordFavoriteModel[];
  loadingListFavoritesWords: boolean;
  fetchHistoryListWords: () => Promise<void>;
  listHistoryWords: WordHistoryModel[];
  loadingListHistoryWords: boolean;
  setWordFavorite: (word_id: number, word: string) => Promise<void>;
  selectedWord: SelectedWord;
  setWordSelection: (word: WordType, origin: OriginType) => void;
  setWordHistory: (word_id: number, word: string) => Promise<void>;
  resetContextWords: () => void;
  setSearchListWords: (listSearchWords: WordModel[]) => void;
  listSearchWords: WordModel[];
}

const initialValue: IValuesWords = {
  listWords: [],
  setListWords: newListWords => {},
  fetchListWords: async () => {},
  loadingListWords: false,
  fetchFavoriteListWords: async () => {},
  listFavoritesWords: [],
  loadingListFavoritesWords: false,
  fetchHistoryListWords: async () => {},
  listHistoryWords: [],
  loadingListHistoryWords: false,
  setWordFavorite: async (word_id: number, word: string) => {},
  selectedWord: {
    origin: 'HomeScreen',
    wordSelected: { word: 'a', isFavorite: false, word_id: 1 },
  },
  setWordSelection: (word: WordType, origin: OriginType) => {},
  setWordHistory: async (word_id: number, word: string) => {},
  resetContextWords: () => {},
  setSearchListWords: (listSearchWords: WordModel[]) => {},
  listSearchWords: [],
};

interface SelectedWord {
  wordSelected: WordType;
  origin: OriginType;
}

export const WordsContext = createContext<IValuesWords>(initialValue);

function WordsProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);

  const [listWords, setListWords] = useState<WordModel[]>(
    initialValue.listWords,
  );
  const [pageListWords, setPageListWords] = useState(1);
  const [loadingListWords, setLoadingListWords] = useState(false);

  const [listFavoritesWords, setListFavoritesWords] = useState<
    WordFavoriteModel[]
  >(initialValue.listFavoritesWords);
  const [loadingListFavoritesWords, setLoadingListFavoritesWords] =
    useState(false);

  const [listHistoryWords, setListHistoryWords] = useState<WordHistoryModel[]>(
    initialValue.listHistoryWords,
  );
  const [loadingListHistoryWords, setLoadingListHistoryWords] = useState(false);

  const [selectedWord, setSelectedWord] = useState<SelectedWord>({
    wordSelected: initialValue.selectedWord.wordSelected,
    origin: 'HomeScreen',
  });

  const [listSearchWords, setListSearchWords] = useState<WordModel[]>(
    initialValue.listSearchWords,
  );

  const fetchListWords = async () => {
    setLoadingListWords(true);
    try {
      const response = await api.getListWords({
        page: pageListWords,
        user_id: user?.id || 0,
      });

      if (response && Array.isArray(response))
        setListWords(oldStState => [...oldStState, ...response]);

      setPageListWords(oldState => oldState + 1);
    } catch {
    } finally {
      setLoadingListWords(false);
    }
  };

  const fetchFavoriteListWords = async () => {
    setLoadingListFavoritesWords(true);
    try {
      const response = await api.getListFavoritesWords({
        user_id: user?.id || 0,
      });

      setListFavoritesWords(response || []);
    } catch {
    } finally {
      setLoadingListFavoritesWords(false);
    }
  };

  const fetchHistoryListWords = async () => {
    setLoadingListHistoryWords(true);
    try {
      const response = await api.getListHistoryWords({
        user_id: user?.id || 0,
      });

      setListHistoryWords(response || []);
    } catch {
    } finally {
      setLoadingListHistoryWords(false);
    }
  };

  const setLocalWordFavorite = (
    word_id: number,
    word: string,
    isFavorite: boolean,
  ) => {
    setListFavoritesWords(prevListFavoritesWords => {
      const updatedList = isFavorite
        ? prevListFavoritesWords.filter(item => item.word_id !== word_id)
        : [...prevListFavoritesWords, { word, word_id, isFavorite: true }];
      return updatedList;
    });

    setListHistoryWords(prevListHistoryWords => {
      const updatedList = prevListHistoryWords.map(item => ({
        ...item,
        isFavorite:
          word_id === item.word_id ? !item.isFavorite : item.isFavorite,
      }));
      return updatedList;
    });

    setListWords(prevListWords => {
      const updatedList = prevListWords.map(item => ({
        ...item,
        isFavorite: word_id === item.id ? !item.isFavorite : item.isFavorite,
      }));
      return updatedList;
    });
  };

  const setWordFavorite = async (word_id: number, word: string) => {
    const isFavorite = listFavoritesWords?.some(
      word => word.word_id === word_id,
    );

    if (!isFavorite) {
      await api.setFavoriteWord({ user_id: user?.id || 0, word_id, word });
    } else {
      await api.removeFavoriteWord({ user_id: user?.id || 0, word_id });
    }

    setLocalWordFavorite(word_id, word, isFavorite);
  };

  const setWordHistory = async (word_id: number, word: string) => {
    const hasHistory = listHistoryWords?.some(item => item.word_id === word_id);

    if (!hasHistory) {
      await api.setHistoryWord({ user_id: user?.id || 0, word, word_id });
      await fetchHistoryListWords();
    }
  };

  const setWordSelection = (word: WordType, origin: OriginType) => {
    setSelectedWord({ wordSelected: word, origin });
  };

  const setSearchListWords = (listSearchWord: WordModel[]) => {
    setListSearchWords(listSearchWord);
  };

  const resetContextWords = () => {
    setListWords(initialValue.listWords);
    setListFavoritesWords(initialValue.listFavoritesWords);
    setListHistoryWords(initialValue.listHistoryWords);
    setListSearchWords(initialValue.listSearchWords);

    setPageListWords(1);
  };

  return (
    <WordsContext.Provider
      value={{
        listWords,
        setListWords,
        fetchListWords,
        loadingListWords,
        fetchFavoriteListWords,
        listFavoritesWords,
        loadingListFavoritesWords,
        fetchHistoryListWords,
        listHistoryWords,
        loadingListHistoryWords,
        setWordFavorite,
        selectedWord,
        setWordSelection,
        setWordHistory,
        resetContextWords,
        listSearchWords,
        setSearchListWords,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export default WordsProvider;
