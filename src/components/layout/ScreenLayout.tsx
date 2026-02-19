import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ScreenLayoutProps {
    children: React.ReactNode;
}

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: '#fff' }]}
            edges={['top']}
        >
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'red'}
                translucent={true}
            />
            {children}
        </SafeAreaView>
    );
};

export default ScreenLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
