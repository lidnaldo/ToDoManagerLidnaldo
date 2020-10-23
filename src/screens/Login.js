import React, { useState, Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Image, TextInput, Button, Text, Alert } from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
import { CommonActions } from '@react-navigation/native';

const img = require('../assets/TodoList.png');

const Login = props => {
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');
    const signInAsync = async () => {
        try {
            const user = await signInOnFirebaseAsync(email, password);
            Alert.alert(
                'User Authenticated',
                `User ${user.email} has succesfuly been authenticated!`,
            );
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TaskList' }],
                }),
            );
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
                <Image style={styles.img} source={img} />
            </View>
            <View style={styles.bottomView}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    keyboardType={'email-address'}
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button title="Sign In" onPress={() => signInAsync()} />
                <View style={styles.textConteiner}>
                    <Text>Não se cadastrou? </Text>
                    <Text style={styles.textRegister}
                        onPress={() => {
                            props.navigation.navigate('Register');
                        }}> Register</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});


export default Login;

/*
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Image, TextInput, Button, Text, Alert } from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';

const img = require('../assets/TodoList.png');

const Login = (props) => { //props propsValor  criado no index.js
    const [email, setEmail] = useState(props.email); //props propsValor atribuido vindo do index.js ** props
    const [password, setPassword] = useState('');
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
                <Image style={styles.img} source={img} />
            </View>
            <View style={styles.bottomView}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={props.email} //props propsValor atribuido inicialmente p elemendo do index.js *** vindo via props index.js
                    keyboardType={'email-address'}
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)} // capturar o email digitado
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)} // capturar o senha digitado
                />
                <Button
                    title="Sign In"
                    onPress={() => signInAsync()} />
                <View style={styles.textConteiner}>
                    <Text>Não se cadastrou? </Text>
                    <Text style={styles.textRegister}
                        onPress={() => {
                            props.navigation.navigate('Register');
                        }}>
                        Register
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const signInAsync = async () => {
    try {
        const user = await signInOnFirebaseAsync(email, password);
        Alert.alert(
            'User Authenticated',
            `User ${user.email} has succesfuly been authenticated!`,
        );
    } catch (error) {
        Alert.alert('Login Failed', error.message);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    img: {
        width: 200,
        height: 200,
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20,
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    textRegister: {
        fontWeight: 'bold',
    },
});

export default Login;
*/