import {
  createStaticNavigation,
  type StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccessScreen } from '../../features/access/screens/access-screen';
import { CHARACTER_DETAIL_TITLE } from '../../features/character-detail/constants/character-detail.constants';
import { CharacterDetailScreen } from '../../features/character-detail/screens/character-detail-screen';
import { HOME_SCREEN_SUBTITLE } from '../../features/home/constants/home.constants';
import { HomeScreen } from '../../features/home/screens/home-screen';
import { colors } from '../../shared/theme/colors';
import {
  ACCESS_ROUTE_NAME,
  CHARACTER_DETAIL_ROUTE_NAME,
  HOME_ROUTE_NAME,
} from './route-names';

const RootStack = createNativeStackNavigator({
  initialRouteName: ACCESS_ROUTE_NAME,
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
    [ACCESS_ROUTE_NAME]: {
      screen: AccessScreen,
      options: {
        headerShown: false,
      },
    },
    [HOME_ROUTE_NAME]: {
      screen: HomeScreen,
      options: {
        title: HOME_SCREEN_SUBTITLE,
      },
    },
    [CHARACTER_DETAIL_ROUTE_NAME]: {
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
