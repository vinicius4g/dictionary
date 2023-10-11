export interface WordDetailsModel {
  license: {
    name: string;
    url: string;
  };
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string;
    audio?: string;
  }>;
  origin?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example: string;
      synonyms?: string[];
      antonyms?: string[];
    }>;
  }>;
  sourceUrls: string[];
}

export interface WordModel {
  id: number;
  word: string;
  isFavorite: boolean;
  word_id?: string;
}

export interface WordHistoryModel {
  word_id: number;
  word: string;
  isFavorite: boolean;
  id?: string;
}

export interface WordFavoriteModel extends WordHistoryModel {}

export interface WordSearchModel extends WordModel {}
