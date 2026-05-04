import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = (name: string) => {
            switch (name) {
              case 'HomeTab': return '🏠';
              case 'TasksTab': return '📋';
              case 'AnalyticsTab': return '📊';
              case 'ProfileTab': return '👤';
              default: return '❓';
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused && styles.tabItemActive
              ]}
            >
              <Text style={[styles.icon, isFocused && styles.iconActive]}>
                {getIcon(route.name)}
              </Text>
              {isFocused && (
                <Text style={styles.label}>{options.tabBarLabel || route.name.replace('Tab', '')}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="TasksTab" component={TasksScreen} options={{ tabBarLabel: 'Tasks' }} />
      <Tab.Screen name="AnalyticsTab" component={AnalyticsScreen} options={{ tabBarLabel: 'Stats' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 30,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 35,
    height: 70,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    width: '100%',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  tabItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  icon: {
    fontSize: 22,
    opacity: 0.6,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MainTabNavigator;
