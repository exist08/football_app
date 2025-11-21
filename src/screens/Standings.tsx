import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getLeagueStandings } from '../api/football';
import { LeagueTabParamList } from '../navigation/LeagueTabs';
import ScreenLayout from '../components/layout/ScreenLayout';

type StandingsRouteProp = RouteProp<LeagueTabParamList, 'Standings'>;

const Standings = () => {
    const route = useRoute<StandingsRouteProp>();
    const { country, league } = route.params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['leagueStandings', country, league],
        queryFn: () => getLeagueStandings(country, league),
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
                <Text style={styles.errorText}>Failed to load standings</Text>
            </View>
        );
    }

    return (
        <ScreenLayout>
            <ScrollView style={styles.container} horizontal>
                <View>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.rankCell]}>#</Text>
                        <Text style={[styles.cell, styles.teamCell]}>Team</Text>
                        <Text style={styles.cell}>P</Text>
                        <Text style={styles.cell}>W</Text>
                        <Text style={styles.cell}>D</Text>
                        <Text style={styles.cell}>L</Text>
                        <Text style={styles.cell}>GD</Text>
                        <Text style={styles.cell}>Pts</Text>
                    </View>
                    {data.data?.standings.slice(1).map((team) => (
                        <View key={team.team} style={styles.row}>
                            <Text style={[styles.cell, styles.rankCell]}>{team.position}</Text>
                            <Text style={[styles.cell, styles.teamCell]}>{team.team}</Text>
                            <Text style={styles.cell}>{team.played}</Text>
                            <Text style={styles.cell}>{team.wins}</Text>
                            <Text style={styles.cell}>{team.draws}</Text>
                            <Text style={styles.cell}>{team.losses}</Text>
                            <Text style={styles.cell}>{team.goalsDiff}</Text>
                            <Text style={[styles.cell, styles.pointsCell]}>{team.points}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScreenLayout>
    );
};

export default Standings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    headerRow: {
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 2,
    },
    cell: {
        width: 40,
        textAlign: 'center',
        fontSize: 14,
    },
    rankCell: {
        width: 30,
        fontWeight: 'bold',
    },
    teamCell: {
        width: 150,
        textAlign: 'left',
        paddingLeft: 8,
        fontWeight: '500',
    },
    pointsCell: {
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
