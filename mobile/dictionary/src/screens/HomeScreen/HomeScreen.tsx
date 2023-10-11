import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import styled from 'styled-components/native';

import { Header } from '@components/Header';
import { CardWord } from '@components/Card';
import { ListEmpty } from '@components/ListEmpty';

import { type AppStackRoutesNavigationProp } from '@routes/types/appStackTypes';

import { type OriginType, WordsContext } from '@contexts/words';
import { AuthContext } from '@contexts/auth';

import { useSignOut } from '@hooks/useSignOut';

import { type WordSearchModel, type WordModel } from '@models/WordModel';

import { api } from '@services/api';

import { AppStackRoutes, HelpStackRoutes } from '@constants/routeNames';

const HomeScreen = () => {
  const navigation = useNavigation<AppStackRoutesNavigationProp>();
  const { signOutApp } = useSignOut();

  const [searchTerm, setSearchTerm] = useState('');
  const [listSearch, setListSearch] = useState<WordSearchModel[]>([]);

  const { user } = useContext(AuthContext);
  const {
    fetchListWords,
    loadingListWords,
    listWords,
    setWordFavorite,
    fetchFavoriteListWords,
    fetchHistoryListWords,
    setWordSelection,

    loadingListHistoryWords,
    setSearchListWords,
  } = useContext(WordsContext);

  const hasListWords = !!listWords?.length;

  const { data, refetch } = useQuery(
    ['search', searchTerm],
    async () => await api.search({ word: searchTerm, user_id: user?.id || 0 }),
    {
      staleTime: 5000000,
      enabled: false,
    },
  );

  useEffect(() => {
    updateListSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    fetchListWords();
    fetchHistoryListWords();
    fetchFavoriteListWords();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateListSearch = () => {
    setListSearch(data || []);
    setSearchListWords(data || []);

    if (searchTerm && data?.length === 0) Alert.alert('Word not found');
  };

  const handleSearch = async () => {
    refetch();
  };

  const handleButtonFavorite = (word_id: number, word: string) => {
    setWordFavorite(word_id, word);
    updateIsFavoriteInListSearch(word_id);
  };

  const updateIsFavoriteInListSearch = (word_id: number) => {
    setListSearch(prevListSearch => {
      const updatedList = prevListSearch?.map(item => ({
        ...item,
        isFavorite: word_id === item.id ? !item.isFavorite : item.isFavorite,
      }));
      return updatedList;
    });
  };

  const handleCard = (item: WordModel, originScreen: OriginType) => {
    setWordSelection(item, 'HomeScreen');

    return navigation.navigate(AppStackRoutes.HelpStack, {
      screen: HelpStackRoutes.InfoScreen,
    });
  };

  const handleButtonLogout = async () => {
    await signOutApp();
  };

  const loadMoreListWords = () => {
    if (!loadingListWords && hasListWords) fetchListWords();
  };

  const handleCleanSearch = () => {
    setSearchTerm('');
    setListSearch([]);
  };

  return (
    <StyledContainer>
      <Header
        placeholder="Search for your word"
        title="DICTIONARY"
        onPressIconSearch={handleSearch}
        onPressIconClose={handleCleanSearch}
        onChangeText={text => {
          setSearchTerm(text);
          if (!text) setListSearch([]);
        }}
        value={searchTerm}
        username={user?.username || 'guest'}
        onPressLogout={handleButtonLogout}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <StyledBody>
        {!loadingListHistoryWords &&
          !loadingListWords &&
          listSearch?.length === 0 && (
            <FlashList
              data={listWords}
              keyExtractor={item => String(item?.id)}
              renderItem={({ item }) => {
                return (
                  <CardWord
                    name={item?.word}
                    onPressFavorite={() =>
                      handleButtonFavorite(item?.id, item.word)
                    }
                    onPress={() => handleCard(item, 'HomeScreen')}
                    isFavorite={item?.isFavorite}
                  />
                );
              }}
              estimatedItemSize={72}
              ItemSeparatorComponent={() => <StyledSeparatorComponent />}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreListWords}
              showsVerticalScrollIndicator={false}
            />
          )}

        {searchTerm && listSearch?.length > 0 && (
          <FlashList
            data={listSearch}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item }) => {
              return (
                <CardWord
                  name={item?.word}
                  onPressFavorite={() =>
                    handleButtonFavorite(item?.id, item.word)
                  }
                  onPress={() => handleCard(item, 'Search')}
                  isFavorite={item?.isFavorite}
                />
              );
            }}
            estimatedItemSize={72}
            ItemSeparatorComponent={() => <StyledSeparatorComponent />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.SHAPE};
`;

const StyledBody = styled(Animated.View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.SHAPE};
  padding: 16px;
`;

const StyledSeparatorComponent = styled.View`
  margin-bottom: 12px;
`;

export default HomeScreen;
