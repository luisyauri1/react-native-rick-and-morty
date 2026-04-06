import {
  createStaticNavigation,
  type StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccessScreen } from '../../features/access/screens/access-screen';
import { CHARACTER_DETAIL_TITLE } from '../../features/character-detail/constants/character-detail.constants';
import { CharacterDetailScreen } from '../../features/character-detail/screens/character-detail-screen';
import { HomeScreen } from '../../features/home/screens/home-screen';
import { colors } from '../../shared/theme/colors';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Access',
  screenOptions: {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: '700',
    },
    headerShadowVisible: false,
    contentStyle: {
      backgroundColor: colors.background,
    },
  },
  screens: {
    Access: {
      screen: AccessScreen,
      options: {
        headerShown: false,
      },
    },
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Home',
      },
    },
    CharacterDetail: {
      screen: CharacterDetailScreen,
      options: {
        title: CHARACTER_DETAIL_TITLE,
      },
    },
  },
});

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof RootStack> {}
  }
}

export const AppNavigator = createStaticNavigation(RootStack);
