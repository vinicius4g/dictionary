import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import styled from 'styled-components/native';

import { Header } from '@components/Header';
import { CardWord } from '@components/Card';
import { ListEmpty } from '@components/ListEmpty';

import { type AppStackRoutesNavigationProp } from '@routes/types/appStackTypes';

import { WordsContext } from '@contexts/words';

import { type WordHistoryModel } from '@models/WordModel';

import { useSignOut } from '@hooks/useSignOut';

import { AppStackRoutes, HelpStackRoutes } from '@constants/routeNames';

const HistoryScreen = () => {
  const navigation = useNavigation<AppStackRoutesNavigationProp>();
  const { signOutApp } = useSignOut();

  const [searchTerm, setSearchTerm] = useState('');
  const [listSearch, setListSearch] = useState<WordHistoryModel[]>([]);

  const { listHistoryWords, setWordFavorite, setWordSelection } =
    useContext(WordsContext);

  const handleSearch = () => {
    const inputWordLowercase = searchTerm.toLowerCase();

    const resultSearch = listHistoryWords.filter(wordObj =>
      wordObj.word.toLowerCase().startsWith(inputWordLowercase),
    );

    setListSearch(resultSearch);
    if (resultSearch.length === 0) Alert.alert('Word not found');
  };

  const handleButtonFavorite = (word_id: number, word: string) => {
    setWordFavorite(word_id, word);
  };

  const handleCard = (item: WordHistoryModel) => {
    setWordSelection(item, 'HistoryScreen');
    return navigation.navigate(AppStackRoutes.HelpStack, {
      screen: HelpStackRoutes.InfoScreen,
    });
  };

  const handleButtonLogout = async () => {
    await signOutApp();
  };

  const handleCleanSearch = () => {
    setSearchTerm('');
    setListSearch([]);
  };

  return (
    <StyledContainer>
      <Header
        placeholder="Search for your word"
        title="HISTORY"
        onPressIconSearch={handleSearch}
        onPressIconClose={handleCleanSearch}
        onChangeText={text => {
          setSearchTerm(text);
          if (!text) setListSearch([]);
        }}
        value={searchTerm}
        onPressLogout={handleButtonLogout}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <StyledBody>
        <>
          {!searchTerm || listSearch.length === 0 ? (
            <FlashList
              data={listHistoryWords}
              keyExtractor={item => String(item?.word_id)}
              renderItem={({ item }) => {
                return (
                  <CardWord
                    name={item.word}
                    onPressFavorite={() =>
                      handleButtonFavorite(item.word_id, item.word)
                    }
                    onPress={() => handleCard(item)}
                    isFavorite={item.isFavorite}
                  />
                );
              }}
              estimatedItemSize={72}
              ItemSeparatorComponent={() => <StyledSeparatorComponent />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <ListEmpty />}
            />
          ) : (
            <FlashList
              data={listSearch}
              keyExtractor={item => String(item?.word_id)}
              renderItem={({ item }) => {
                return (
                  <CardWord
                    name={item.word}
                    onPressFavorite={() =>
                      handleButtonFavorite(item.word_id, item.word)
                    }
                    onPress={() => handleCard(item)}
                    isFavorite={item.isFavorite}
                  />
                );
              }}
              estimatedItemSize={72}
              ItemSeparatorComponent={() => <StyledSeparatorComponent />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <ListEmpty />}
            />
          )}
        </>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.SHAPE};
`;

const StyledBody = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.SHAPE};
  padding: 16px;
`;

const StyledSeparatorComponent = styled.View`
  margin-bottom: 12px;
`;

export default HistoryScreen;
