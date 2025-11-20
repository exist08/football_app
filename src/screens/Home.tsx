import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/routes';
import { ChevronRight } from 'lucide-react-native';

const LEAGUES = [
    { id: '1', name: 'Premier League', country: 'england', league: 'premier-league', color: '#3d195b' },
    { id: '2', name: 'La Liga', country: 'spain', league: 'laliga', color: '#ee8707' },
    { id: '3', name: 'Bundesliga', country: 'germany', league: 'bundesliga', color: '#d3010c' },
    { id: '4', name: 'Serie A', country: 'italy', league: 'serie-a', color: '#008fd7' },
    { id: '5', name: 'Ligue 1', country: 'france', league: 'ligue-1', color: '#dae025' },
];

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: typeof LEAGUES[0] }) => (
        <TouchableOpacity
            style={[styles.card, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate('LeagueTabs', { country: item.country, league: item.league })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.leagueName}>{item.name}</Text>
                <Text style={styles.countryName}>{item.country.toUpperCase()}</Text>
            </View>
            <ChevronRight color="#ccc" size={24} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select League</Text>
            <FlatList
                data={LEAGUES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    listContent: {
        gap: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 6,
    },
    cardContent: {
        flex: 1,
    },
    leagueName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    countryName: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});