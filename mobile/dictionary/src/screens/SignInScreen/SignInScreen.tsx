import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import Animated, { FlipInEasyY } from 'react-native-reanimated';
import styled, { css, useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { type RoutesNavigationProp } from '@routes/types/routesTypes';

import { RoutesStack } from '@constants/routeNames';

import { Text } from '@components/Text';
import { InputForm } from '@components/Input';

import { AuthContext } from '@contexts/auth';

import IconLogo from '@assets/svgs/icon-logoDictionary.svg';
import IconEyeOpen from '@assets/svgs/icon-eyeOpen.svg';
import IconEyeClose from '@assets/svgs/icon-eyeClose.svg';
import IconUser from '@assets/svgs/icon-user.svg';
import IconLock from '@assets/svgs/icon-lock.svg';

const SignInScreen = () => {
  const { signIn, loadingSignIn, checkLoggedInUser, signInWithoutData } =
    useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation<RoutesNavigationProp>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasErrorField, setHasErrorField] = useState({
    fieldUsername: false,
    fieldPassword: false,
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const checkUser = async () => {
    const hasUserLogged = await checkLoggedInUser();
    if (hasUserLogged) return navigation.navigate(RoutesStack.AppStack);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetVisiblePassword = () => {
    setIsVisiblePassword(oldState => !oldState);
  };

  const validateFields = () => {
    const errors = {
      fieldUsername: !username,
      fieldPassword: !password,
    };

    setHasErrorField(oldState => ({
      ...oldState,
      ...errors,
    }));

    return !errors.fieldUsername && !errors.fieldPassword;
  };

  const handleButtonLogin = async () => {
    const checkFields = validateFields();

    if (checkFields) {
      const result = await signIn(username, password);
      if (result) return navigation.navigate(RoutesStack.AppStack);

      Alert.alert('User and/or password invalid ');
    }
  };

  const handleSignInWithoutData = () => {
    signInWithoutData();
    navigation.navigate(RoutesStack.AppStack);
  };

  return (
    <StyledContainer onTouchStart={() => Keyboard.dismiss()}>
      <StyledContainerLogo entering={FlipInEasyY.duration(800)}>
        <IconLogo />
        <StyledTitleLogo sizing="SMALLEST">DICTIONARY</StyledTitleLogo>
      </StyledContainerLogo>
      <StyledContainerInput>
        <StyledTitleInput>Username:</StyledTitleInput>
        <InputForm
          placeholder="Enter your username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCorrect={false}
          autoCapitalize="none"
          iconLeft={<IconUser />}
          hasError={hasErrorField.fieldUsername}
        />
      </StyledContainerInput>
      <StyledContainerInput>
        <StyledTitleInput>Password:</StyledTitleInput>
        <InputForm
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          value={password}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={isVisiblePassword}
          iconLeft={<IconLock />}
          iconRight={isVisiblePassword ? <IconEyeOpen /> : <IconEyeClose />}
          onPressIcon={handleSetVisiblePassword}
          hasError={hasErrorField.fieldPassword}
        />
      </StyledContainerInput>
      <StyledButtonSignIn activeOpacity={0.7} onPress={handleButtonLogin}>
        {loadingSignIn ? (
          <ActivityIndicator color={theme.colors.BACKGROUND} />
        ) : (
          <StyledTextButtonSignIn color="BACKGROUND">
            Login
          </StyledTextButtonSignIn>
        )}
      </StyledButtonSignIn>
      <StyledButtonSignInWithoutData
        activeOpacity={0.7}
        onPress={handleSignInWithoutData}
      >
        <StyledTextButtonSignIn color="BODY_LIGHT" sizing="SMALLEST">
          Log in as guest
        </StyledTextButtonSignIn>
      </StyledButtonSignInWithoutData>
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 128 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  padding-top: 72px;
`;

const StyledContainerLogo = styled(Animated.View)`
  align-items: center;
  padding-bottom: 24px;
`;

const StyledTitleLogo = styled(Text)`
  margin-top: -24px;
  font-weight: bold;
`;

const StyledTitleInput = styled(Text)`
  margin-bottom: 4px;
`;

const StyledContainerInput = styled.View`
  padding: 4px 24px;
`;

const StyledButtonSignIn = styled.TouchableOpacity`
  height: 58px;
  margin: 24px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 48px;

  ${({ theme }) => css`
    background-color: ${theme.colors.SUCCESS};
    border: 1px solid ${theme.colors.WHITE_GRAY_DARK};
  `}
`;

const StyledTextButtonSignIn = styled(Text)``;

const StyledButtonSignInWithoutData = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 24px;
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.BODY_LIGHT};
  `}
`;

export default SignInScreen;
