import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TextInput,
    SafeAreaView,

    Image,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    //NetInfo,

    Picker,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,

    FlatList,
    Alert,
} from 'react-native';

import {
    Container, Header, Content, List, ListItem, Text, Drawer, Left,
    Body, Tab, Tabs, TabHeading, Card, CardItem,
    Badge,
    Title,
    Right,
    FooterTab,
    Button,
    Icon
} from 'native-base';


import Tab1 from '../Tabs/TabeOne';
import Tab2 from '../Tabs/TabeTwo';
import Tab3 from '../Tabs/TabeThree';


import NetInfo from '@react-native-community/netinfo';
import Database from '../SQLiteAPI/Database';
import md5 from 'md5';

import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

const db = new Database();
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

export default class TabeThree extends Component {
    // These two methods are used to open and close a drawer in an individual screen
    closeDrawer() {
        this.drawer._root.close();
    }
    openDrawer() {
        this.drawer._root.open();
    }

    static navigationOptions = {
        title: 'Medicines History',
        headerShown: false,
    };
    static navigationOptions = {
        title: 'Register New User',
        headerShown: false,
    };
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            password_repeat: '',
            first_name: '',
            last_name: '',
            dob: '',
            sex: '',
            insurance_number: '',
            phonenumber: '',
            address: '',
            zip: '',
            city: '',
            participant_id: '',
            products: [],

            connection_Status: '',

            isLoading: false,
        };
    }

    componentDidMount() {
        //To get the network state once
        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                this.setState({ connection_Status: 'Online' });

            } else {
                this.setState({ connection_Status: 'Offline' });

            }

            /*  console.log(
              'Connection type: ' +
                state.type +
                ', Is connected?: ' +
                state.isConnected,
            );
          */
        });
        // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        //add event listner is automatically triggering the offline and online mode when the wifi is turned on or off
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log(
                'Connection type: ' +
                state.type +
                ', Is connected?: ' +
                state.isConnected,
            );

            if (state.isConnected == true) {
                this.setState({ connection_Status: "Online" })
                // Alert.alert("Online");
            }
            else {
                this.setState({ connection_Status: "Offline" })
                // Alert.alert("Offline");
            }

            // this.handleConnectivityChange
        });
    }

    updateTextInput = (text, field) => {
        const state = this.state;
        state[field] = text;
        this.setState(state);
    };



    InsertStudentRecordsToServer = () => {
        const password_md5 = md5(this.props.password);
        fetch(
            'http://192.168.0.31/DZNE/RheinLand/Components/Syncing/PostGRERegistration.php',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username_1: this.props.username,


                    email_1: 'Data Matched',

                    //password_1: this.props.password,
                    password_1: password_md5,

                    // userid : this.props.userID,

                    //flagsync : flagsyncVariable,
                }),
            },
        )
            .then(response => response.json())
            .then(responseJson => {
                // Storing the user data registration in Offline Database, after it is stored in online database
                this.saveProduct();

                if (Platform.OS === 'android') {
                    ToastAndroid.show("Registration Successfull", ToastAndroid.SHORT)
                } else {
                    Alert.alert("Registration Successful");
                }



                // Actions.productWelcomeScreen();

                // Alert.alert(this.state.username);

                // Alert.alert(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
    };

    saveProduct() {
        this.setState({
            isLoading: true,
        });
        let data = {
            username: this.props.username,
            email: 1,
            password: this.props.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            sex: this.state.sex,
            insurance_number: this.state.insurance_number,
            phonenumber: this.state.phonenumber,
            address: this.state.address,
            zip: this.state.zip,
            city: this.state.city,
            participant_id: this.props.scanresult_1,
        };
        db.addUser_Check(data.username, data)
            .then(result => {
                console.log(result);
                this.setState({
                    isLoading: false,
                });
                //this.props.navigation.state.params.onNavigateBack;
                // this.props.navigation.goBack1();
                // ToastAndroid.show('User Successfully Registered!', ToastAndroid.LONG);
                //this.props.navigation.navigate('LoginScreen');
                Actions.productWelcomeScreen();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
            });
    }

    GoToQRCodeScanning() {
        Actions.QRCodeScannen({
            username: this.props.username,
            password: this.props.password,
        });
    }

    GoToManualQRCode() {
        Actions.QRCodeManual({
            username: this.props.username,
            password: this.props.password,
        });
    }
    Back() {

        Actions.UserAddScreen();
    }

    render() {
        if (this.state.connection_Status == 'Offline') {
            return <MiniOfflineSign />;
        }
        else if (this.state.connection_Status == 'Online') {




        }

        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        // <Text>useraname : {this.props.username}</Text>
        // <Text>password : {this.props.password}</Text>
        // <Text>QR (QR Code Scanned) {this.props.scanresult_1}</Text>

        /*
       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
                  {' '}
                  You are {this.state.connection_Status}{' '}
                </Text>
    
        */

        // <Text>    {this.state.username_1}</Text>
        // <Text>QR (QR Code Scanned) {this.props.scanresult_1}</Text>
        return (

            <Container>


                <Content padder>
                    <Text> {"\n"}</Text>
                    <Card>
                        <CardItem header bordered>
                            <Text>    Register nicht als teilnehmer</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <TouchableOpacity style={styles.button}>
                                    <Text
                                        style={styles.buttonText}
                                        //onPress={() => this.saveProduct()}>
                                        onPress={() => this.InsertStudentRecordsToServer()}>
                                        Register nicht als teilnehmer
              </Text>
                                </TouchableOpacity>
                            </Body>
                        </CardItem>

                    </Card>


                </Content>



            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    subContainer: {
        flex: 1,
        marginBottom: 10,
        padding: 5,
        // borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomColor: '#CCCCCC',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    /*
    pickerStyle: {
      width: '100%',
      height: 150,  
      justifyContent: 'center',  
      //backgroundColor: '#eeeeee',
      textAlign: 'center',
      alignItems: 'center',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10,
    }
    */
    pickerStyle: {
        height: 100,
        width: '100%',
        color: '#344953',
        justifyContent: 'center',
    },

    TextInputStyleClass_BorderLine: {
        marginBottom: 7,
        height: 5,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
        fontWeight: 'bold',
        marginLeft: -100,
        borderBottomColor: '#CCCCCC',
    },

    TextInputStyleClass_remarks: {
        width: '90%',
        marginBottom: 7,
        height: 90,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
    },
    inputBox: {
        width: '100%',
        height: 50,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
    },
    textRegister: {
        textAlign: 'center',
        alignItems: 'center',
    },
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30,
    },
    ImageStyle: {
        width: 130,
        height: 130,
    },
    offlineText: { color: '#fff' },
});
