import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getLeagueStats } from '../api/football';
import { LeagueTabParamList } from '../navigation/LeagueTabs';
import ScreenLayout from '../components/layout/ScreenLayout';

type StatsRouteProp = RouteProp<LeagueTabParamList, 'Stats'>;

const Stats = () => {
    const route = useRoute<StatsRouteProp>();
    const { country, league } = route.params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['leagueStats', country, league],
        queryFn: () => getLeagueStats(country, league),
        staleTime: 30 * 60 * 1000,
    });

    console.log(data)

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error || !data?.success || !data?.data?.stats) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Failed to load stats</Text>
            </View>
        );
    }

    return (
        <ScreenLayout>
            <ScrollView style={styles.container}>
                {Object.keys(data.data?.stats).map((key) => (
                    <View key={key} style={styles.section}>
                        <Text style={styles.sectionTitle}>{key}</Text>
                        {data.data?.stats[key].slice(0, 5).map((player, index) => (
                            <View key={index} style={[styles.row, index === 4 && styles.lastRow]}>
                                <Text style={styles.rank}>{player.rank}</Text>
                                <View style={styles.playerInfo}>
                                    <Text style={styles.playerName}>{player.player}</Text>
                                    <Text style={styles.teamName}>{player.team}</Text>
                                </View>
                                <Text style={styles.statValue}>{player.value}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
};

export default Stats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    rank: {
        width: 30,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    playerInfo: {
        flex: 1,
    },
    playerName: {
        fontSize: 16,
        fontWeight: '500',
    },
    teamName: {
        fontSize: 12,
        color: '#888',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
