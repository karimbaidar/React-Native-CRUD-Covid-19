'use strict';
import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    //AsyncStorage,
    TouchableHighlight,
    Platform,
    ToastAndroid,
    View,
} from 'react-native';

import {
    Container, Header, Content, List, ListItem, Text, Drawer, Left,
    Body,
    Badge,
    Title,
    Right,
    FooterTab,
    Button,
    Icon
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import TouchID from "react-native-touch-id";
import Toast from 'react-native-simple-toast';



export default class Fingerprint extends Component {
    constructor() {
        super()

        this.state = {
            biometryType: null,
            // usernameTouch:'',
        };
    }

    componentDidMount = async () => {

        TouchID.isSupported()
            .then(biometryType => {
                this.setState({ biometryType, usernameTouch });

            })

        // Alert.alert(this.state.usernameTouch.toString());


    }

    Back() {

        Actions.login();

    }
    
    clickHandler() {
        TouchID.isSupported()
            .then(this.authenticate())
            .catch(error => {
                Alert.alert('TouchID not supported');
            });
    }

    authenticate = async () => {


        const usernameTouch = await AsyncStorage.getItem('usernameTouch');
        

        return TouchID.authenticate()
            .then(success => {
               // Alert.alert('Authenticated Successfully');

                fetch(
                    'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRELoginFingerprint.php',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        
                        body: JSON.stringify({


                            // usernameTouch: "r",

                            //  usernameTouch: this.state.usernameTouch.toString(),
                       
                            usernameTouch: usernameTouch,


                        }),
                    },
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        var username = responseJson.username;
                        if (username === -1) {

                           // Alert.alert("Invalid username and/or password");

                            //this.Login();

                        }
                        else {

                            if (Platform.OS === 'android') {

                                ToastAndroid.show("Login Successfull", ToastAndroid.SHORT);
                                Actions.MedicationRecordList({ userID: username });

                            } else {

                                //Alert.alert("Login Successful");
                                Toast.show('Login Successful');
                                Actions.MedicationRecordList({ userID: username });

                            }
                           

                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });

            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message);
            });
  
  
    
    
    }

    render() {
        // {`Authenticate with ${this.state.biometryType}`}
        return (
            <Container>

                <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
                    <Left>
                        <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>
                    </Left>


                    <Body>
                        <Title style={{ color: 'black' }}>Rheinland</Title>
                    </Body>
                   
                </Header>
                <Content>
                    <View style={styles.container}>
                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this.clickHandler()}
                            underlayColor="#0380BE"
                            activeOpacity={1}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                {`Authenticate with Fingerprint`}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Content>
            </Container>

        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    btn: {
        borderRadius: 3,
        marginTop: 200,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#0391D7'
    }
});

