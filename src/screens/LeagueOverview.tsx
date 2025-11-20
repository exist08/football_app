import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getLeagueOverview } from '../api/football';
import { LeagueTabParamList } from '../navigation/LeagueTabs';

type LeagueOverviewRouteProp = RouteProp<LeagueTabParamList, 'Overview'>;

const LeagueOverview = () => {
    const route = useRoute<LeagueOverviewRouteProp>();
    const { country, league } = route.params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['leagueOverview', country, league],
        queryFn: () => getLeagueOverview(country, league),
    });

    console.log(data)

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error || !data?.success) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Failed to load league overview</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{data.data?.league} - {data.data?.country}</Text>
            <View style={styles.matchesContainer}>
                {data.data?.matches.map((match, index) => (
                    <View key={index} style={styles.matchCard}>
                        <View style={styles.teamRow}>
                            <Text style={styles.teamName}>{match.homeTeam}</Text>
                            <Text style={styles.score}>{match.homeScore || '-'}</Text>
                        </View>
                        <View style={styles.teamRow}>
                            <Text style={styles.teamName}>{match.awayTeam}</Text>
                            <Text style={styles.score}>{match.awayScore || '-'}</Text>
                        </View>
                        <Text style={styles.matchStatus}>{match.time} - {match.date}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default LeagueOverview;

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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    matchesContainer: {
        gap: 12,
    },
    matchCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    teamName: {
        fontSize: 16,
        fontWeight: '500',
    },
    score: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    matchStatus: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        textAlign: 'right',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
