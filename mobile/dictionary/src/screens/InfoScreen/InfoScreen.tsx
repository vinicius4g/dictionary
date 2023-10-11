import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import TrackPlayer from 'react-native-track-player';

import { type AppStackRoutesNavigationProp } from '@routes/types/appStackTypes';
import { api } from '@services/api';

import { Header, Footer } from '@screens/InfoScreen';

import { Cover } from '@components/Cover';
import { Text } from '@components/Text';

import { WordsContext } from '@contexts/words';

const InfoScreen = () => {
  const navigation = useNavigation<AppStackRoutesNavigationProp>();
  const {
    selectedWord,
    setWordSelection,
    listFavoritesWords,
    listHistoryWords,
    listWords,
    listSearchWords,
    setWordHistory,
  } = useContext(WordsContext);

  const wordLists = {
    HomeScreen: listWords,
    FavoriteScreen: listFavoritesWords,
    HistoryScreen: listHistoryWords,
    Search: listSearchWords,
  };
  const sizeList = wordLists[selectedWord.origin].length;

  const handleButtonGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setWordHistory(
      Number(selectedWord.wordSelected?.word_id) ||
        Number(selectedWord.wordSelected?.id) ||
        0,
      selectedWord.wordSelected.word,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWord.wordSelected.word]);

  const {
    data: detailsWord,
    isError,
    isLoading,
  } = useQuery(
    ['detailsWord', selectedWord.wordSelected.word],
    async () =>
      await api.getDetailsWord({ word: selectedWord.wordSelected.word }),
    {
      staleTime: 5000000,
    },
  );

  const handleButtonPlay = async () => {
    const audio =
      detailsWord?.phonetics[1]?.audio || detailsWord?.phonetics[1]?.audio;

    if (audio) {
      await TrackPlayer.add({
        id: 'trackId',
        url: audio,
        title: 'Track Title',
        artist: 'Track Artist',
      });
      await TrackPlayer.play();

      return null;
    }

    return Alert.alert(
      'The audio for this word is not available in our database.',
    );
  };

  const handleButtonNextWord = () => {
    if (selectedWord.origin in wordLists) {
      const position = wordLists[selectedWord.origin].findIndex(
        item => item.word === selectedWord.wordSelected.word,
      );

      if (position !== -1 && position !== sizeList - 1) {
        setWordSelection(
          wordLists[selectedWord.origin][position + 1],
          selectedWord.origin,
        );
      }
    }
  };

  const handleButtonPreviousWord = () => {
    if (selectedWord.origin in wordLists) {
      const position = wordLists[selectedWord.origin].findIndex(
        item => item.word === selectedWord.wordSelected.word,
      );

      if (position !== -1 && position !== 0) {
        setWordSelection(
          wordLists[selectedWord.origin][position - 1],
          selectedWord.origin,
        );
      }
    }
  };

  return (
    <>
      <Header
        title={selectedWord.wordSelected.word}
        onPressIcon={handleButtonGoBack}
      />
      <StyledBody>
        <StyledContainerCover>
          <Cover
            title={selectedWord.wordSelected.word}
            onPress={handleButtonPlay}
            isLoading={isLoading}
            isPlaying={false}
          />
        </StyledContainerCover>

        {isLoading ? (
          <></>
        ) : (
          <StyledInfos>
            {isError ? (
              <StyledTitleInfos>
                Word not found in our dice base!
              </StyledTitleInfos>
            ) : (
              <>
                <StyledTitleInfos>Meanings</StyledTitleInfos>
                <StyledInfoDefinition>{`Best definition: ${
                  detailsWord?.meanings[0]?.definitions[0]?.definition || ''
                }`}</StyledInfoDefinition>

                <StyledTitleInfos>Phonetic</StyledTitleInfos>
                <StyledInfoDefinition>{`Phonetic: ${
                  detailsWord?.phonetic || ''
                }`}</StyledInfoDefinition>

                <StyledTitleInfos>Part of speech </StyledTitleInfos>
                <StyledInfoDefinition>{`${
                  detailsWord?.meanings[0]?.partOfSpeech || ''
                }`}</StyledInfoDefinition>

                <StyledTitleInfos>License </StyledTitleInfos>
                <StyledInfoDefinition>{`${
                  detailsWord?.license.name || ''
                }`}</StyledInfoDefinition>
              </>
            )}
          </StyledInfos>
        )}
      </StyledBody>
      <StyledContainerFooter>
        <Footer
          onPressNext={handleButtonNextWord}
          onPressPrevious={handleButtonPreviousWord}
        />
      </StyledContainerFooter>
    </>
  );
};

const StyledBody = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 128 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.WHITE_GRAY};
  padding-top: 52px;
`;

const StyledContainerCover = styled.View`
  padding: 0 10%;
`;

const StyledInfos = styled.View`
  padding: 8% 10%;
`;

const StyledTitleInfos = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 12px;
`;

const StyledButtonPlayListen = styled.TouchableOpacity``;

const StyledInfoDefinition = styled(Text)`
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 18px;
`;

const StyledContainerFooter = styled.View`
  padding-bottom: 48px;
  background-color: ${({ theme }) => theme.colors.WHITE_GRAY};
`;

export default InfoScreen;
