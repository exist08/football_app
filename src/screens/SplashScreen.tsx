import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/routes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import Animated, { FadeInUp } from 'react-native-reanimated'

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000)
    }, [])
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text>SplashScreen</Text>
            {/* <Animated.View entering={FadeInUp.duration(2000)}> */}
            <Image source={require("../assets/football.png")} />
            {/* </Animated.View> */}
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})