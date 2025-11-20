import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/routes';
import LeagueOverview from '../screens/LeagueOverview';
import Standings from '../screens/Standings';
import Stats from '../screens/Stats';
import { Home, BarChart2, Trophy } from 'lucide-react-native';

export type LeagueTabParamList = {
    Overview: { country: string; league: string };
    Standings: { country: string; league: string };
    Stats: { country: string; league: string };
};

const Tab = createBottomTabNavigator<LeagueTabParamList>();

type LeagueTabsRouteProp = RouteProp<RootStackParamList, 'LeagueTabs'>;

const LeagueTabs = () => {
    const route = useRoute<LeagueTabsRouteProp>();
    const { country, league } = route.params;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Overview"
                component={LeagueOverview}
                initialParams={{ country, league }}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Standings"
                component={Standings}
                initialParams={{ country, league }}
                options={{
                    tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Stats"
                component={Stats}
                initialParams={{ country, league }}
                options={{
                    tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default LeagueTabs;
