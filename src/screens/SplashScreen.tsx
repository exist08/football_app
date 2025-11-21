import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/routes'
import ScreenLayout from '../components/layout/ScreenLayout'
// import Animated, { FadeInUp } from 'react-native-reanimated'

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000)
    }, [])
    return (
        <ScreenLayout>
            <View style={styles.container}>
                <Text>SplashScreen</Text>
                {/* <Animated.View entering={FadeInUp.duration(2000)}> */}
                <Image source={require("../assets/football.png")} />
                {/* </Animated.View> */}
            </View>
        </ScreenLayout>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})