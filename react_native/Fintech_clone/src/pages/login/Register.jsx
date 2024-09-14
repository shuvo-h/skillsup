import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Register = () => {
    const navigation = useNavigation();

    const onSignup = async()=>{}
    return (
        <KeyboardAvoidingView behavior='padding'>
            <View style={style.container}>
                <Text style={[style.title]}>Let's get started!</Text>
                <Text>Enter your phone number. We will send you a confirmation code there.</Text>

                <View style={style.inputContainer}>
                    <TextInput
                        placeholder='Country code'
                        placeholderTextColor={"gray"}
                        defaultValue='+65'
                        style={[style.inputField,{width:60}]}
                    />
                    <TextInput
                        placeholder='Country code'
                        placeholderTextColor={"gray"}
                        defaultValue='+65'
                        style={[style.inputField,{flex:1}]}
                    />
                </View>
                <View style={{display:"flex",flexDirection:"row", gap:4,marginTop:20}}>
                    <Text>Already have an account?</Text>
                    <Pressable onPress={()=>navigation.navigate('Login')}>
                        <Text style={{color:"blue",textDecorationLine:"underline"}}>Log in</Text>
                    </Pressable>
                </View>
                <View style={{marginTop:40}}>
                    <Pressable>
                        <Text style={{marginTop:10, paddingVertical:10, textAlign:"center", borderRadius:20,backgroundColor:"#cc9dea", fontWeight:700}}>Sign Up</Text>
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
export default Register;