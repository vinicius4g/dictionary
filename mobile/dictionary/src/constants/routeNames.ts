export enum RoutesStack {
  AppStack = 'Routes/AppStack',
  AuthStack = 'Routes/AuthStack',
}

export enum AppStackRoutes {
  BottomTab = `${RoutesStack.AppStack}/BottomTab`,
  HelpStack = `${RoutesStack.AppStack}/HelpStack`,
}

export enum BottomTabRoutes {
  Home = `${AppStackRoutes.BottomTab}/HomeScreen`,
  History = `${AppStackRoutes.BottomTab}/HistoryScreen`,
  Favorites = `${AppStackRoutes.BottomTab}/FavoritesScreen`,
}

export enum HelpStackRoutes {
  InfoScreen = `${AppStackRoutes.HelpStack}/InfoScreen`,
}

export enum AuthStackRoutes {
  SignInScreen = `${RoutesStack.AuthStack}/SignInScreen`,
}
