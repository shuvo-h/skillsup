import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const showVideo = require("../../../assets/video/show_video.mp4")
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const {width:screenWidth} = Dimensions.get('window')
const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container]}>
            <View>
                <View>
                    <Text style={[styles.title]}>Welcome to EcoTech</Text>
                </View>
                <Video
                    source={showVideo}
                    rate={1.0}
                    volume={1.0}
                    shouldPlay
                    isMuted
                    isLooping
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    style={styles.video}

                />
                <View style={styles.buttonContainer}>

                        <TouchableOpacity style={[styles.button]} onPress={()=>navigation.navigate('Login')}>
                            <Text style={[styles.buttonText]}>Login in</Text>
                        </TouchableOpacity>

                </View>
            </View>
            <Text>11 ok</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        position:"relative",
        flex: 1,
        // justifyContent: "space-between",
    },
    title:{
        textAlign:"center",
        color:"#fff",
        fontSize: 30,
        marginTop:80,
        padding:20
    },
    video:{
        position:"absolute",
        width: '100%',
        height: '100%',
        borderWidth:1,
        top: 0,
        left:0,
        zIndex: -10
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})
export default Home;