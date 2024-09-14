import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Colors';

const Login = () => {
    const navigation = useNavigation();

    const onSignup = async()=>{}
    return (
        <KeyboardAvoidingView behavior='padding'>
            <View style={style.container}>
                <Text style={[style.title]}>Welcome back!</Text>
                <Text>Enter the phone number associated with your account.</Text>

                <View style={style.inputContainer}>
                    <TextInput
                        placeholder='Country code'
                        placeholderTextColor={"gray"}
                        defaultValue='+65'
                        style={[style.inputField,{width:60}]}
                    />
                    <TextInput
                        placeholder='Mobile number'
                        placeholderTextColor={"gray"}
                        defaultValue='+65'
                        style={[style.inputField,{flex:1}]}
                    />
                </View>

                <View style={{marginTop:40}}>
                    <Pressable>
                        <Text style={{marginTop:10, paddingVertical:10, textAlign:"center", borderRadius:20,backgroundColor:"#cc9dea", fontWeight:700}}>Continue</Text>
                    </Pressable>
                </View>

                <View style={{display:"flex", flexDirection:"row",alignItems:"center",gap:6,marginVertical:20}}>
                    <View style={{borderBottomWidth:1,flexGrow:1}}></View>
                    <Text >or</Text>
                    <View style={{borderBottomWidth:1,flexGrow:1}}></View>
                </View>

                <View style={{marginTop:40}}>
                    <Pressable>
                        <Text style={{marginTop:10, paddingVertical:10, textAlign:"center", borderRadius:20,backgroundColor:"#cc9dea", fontWeight:700, display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Ionicons name="mail" size={34} color={COLORS.dark} />
                            Continue with email
                        </Text>
                    </Pressable>
                </View>
                <View style={{marginTop:40}}>
                    <Pressable>
                        <Text style={{marginTop:10, paddingVertical:10, textAlign:"center", borderRadius:20,backgroundColor:"#cc9dea", fontWeight:700}}>Continue</Text>
                    </Pressable>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};
const style = StyleSheet.create({
    container:{
        marginHorizontal: "5%",
    },
    title:{
        fontWeight:700,
        fontSize: 35,
        textAlign:"center",
        marginVertical:15,
    },
    inputContainer:{
        display:"flex",
        flexDirection:"row",
        gap: 4,
        marginTop: 10,
    },
    inputField:{
        // borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius:5,
        borderColor: '#000',
        fontSize: 16,
        color: '#000',
        backgroundColor:"#E5E4E2",
    },
})
export default Login;