import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Title,
} from 'native-base';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import md5 from 'md5';
import { Button } from 'react-native-elements';
import Database from '../SQLiteAPI/Database';

import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

import PopupScreen from '../Screens/PopupScreen';

const db = new Database();


var { height, width } = Dimensions.get('window');

export default class RegistrationInitialScreen extends Component {
  static navigationOptions = {
    title: 'Registration',
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

      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  InsertintoUsersTable = () => {
    const password_md5 = md5(this.state.password);
    fetch(
      'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRERegistration.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username_1: this.state.username,


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


        if (Platform.OS === 'android') {
          ToastAndroid.show("Registration Successfull", ToastAndroid.SHORT)
        } else {
          Alert.alert("Registration Successful");
        }
        this.saveProduct();


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
      username: this.state.username,
      email: 1,
      password: this.state.password,
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
    Actions.QRCodeScannen();
  }
  nextUserAddScreen() {
    //Actions.OptionsScreen({userID});
    Actions.RegistrationOptionScreen({
      username: this.state.username,
      password: this.state.password,
    });
  }
  PhoneAuth() {
    Actions.PhoneAuth(); // For Offline Registration Screen

  }
  Back() {
    Actions.login();
  }

  GoToQRCodeScanning() {
    Actions.QRCodeScannen({
      
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    // <Text>    {this.state.username_1}</Text>
    // <Text>QR (QR Code Scanned) {this.props.scanresult_1}</Text>

    /*
     <View style={styles.signupTextCont}>

                <Text style={styles.signupText}>Register Via </Text>


                <TouchableOpacity
                  onPress={() => this.PhoneAuth()}>
                  <Text style={styles.signupButton}>Phone</Text>
                </TouchableOpacity>

             

              </View>

                <View style={styles.subContainer}>
                <TextInput
                  style={styles.inputBox}
                  placeholder={' Username'}
                  value={this.state.username}
                  onChangeText={text => this.updateTextInput(text, 'username')}
                />
                {!!this.state.nameError && (
                  <Text style={{ color: 'red' }}>{this.state.nameError}</Text>
                )}

                <TextInput
                  style={styles.inputBox}
                  placeholder={' Password'}
                  value={this.state.password}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChangeText={text => this.updateTextInput(text, 'password')}
                />

                {!!this.state.nameError && (
                  <Text style={{ color: 'red' }}>{this.state.nameError}</Text>
                )}

                <TextInput
                  style={styles.inputBox}
                  placeholder={' Enter Password Again'}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  value={this.state.password_repeat}
                  onChangeText={text =>
                    this.updateTextInput(text, 'password_repeat')
                  }
                />

                {!!this.state.nameError && (
                  <Text style={{ color: 'red' }}>{this.state.nameError}</Text>
                )}
              </View>

              <View>
                <TouchableOpacity activeOpacity={.0} style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    //onPress={() => this.saveProduct()}>
                    onPress={() => {
                      if (
                        this.state.username.trim() === '' ||
                        //this.state.email.trim() === '' ||
                        this.state.password.trim() === ''
                      ) {
                        this.setState(() => ({
                          nameError: 'This Field is required.',
                        }));
                        Alert.alert(
                          'Please check back, some fields are mandatory',
                        );
                      } else if (
                        this.state.password_repeat.trim() !=
                        this.state.password.trim()
                      ) {
                        Alert.alert('Passwords are not Matching');
                      } else {
                         // this.saveProduct();
                         // this.nextUserAddScreen();
                          this.InsertintoUsersTable();
                         //Alert.alert("not saved")
                      }
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
    */

    
    return (
      <Container>
        <Header style={{ backgroundColor: '##4287f5' }}>
          <Left>
            <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>

          </Left>

          <Body>
            <Title style={{ color: 'black' }}>COVID-19</Title>
          </Body>
          <Right>

          </Right>

        </Header>
        <Content padder>

          <SafeAreaView style={styles.container}>

            <ScrollView
              keyboardShouldPersistTaps={true}
              keyboardDismissMode="on-drag"
              style={styles.container}>

       
<View style={styles.container}>
<Image
            source={require('../Images/covid.png')}
            style={{marginTop:50, width: 300, height: 200}}
          />

              <TouchableOpacity style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => this.GoToQRCodeScanning()}>
                  <Icon name="ios-qr-scanner" style={{ color: '#ffffff' }} /> {"\n"}
                  QRCode Scannen
                    </Text> 
              </TouchableOpacity>

              </View>
            </ScrollView>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    color: '#12799f',
    fontSize: 16,
    fontWeight: '500',
    fontWeight: 'bold',
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
    color: '#ffffff',
  },
  subContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 5,
    borderBottomWidth: 2,
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
  ImageStyle: {
    width: '30%',
    height: '30%',
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

  GooglePlusStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderWidth: 0.5,
    borderColor: '#fff',

    width: width - 60,
    borderRadius: 5,
    margin: 5,
  },
  SeparatorLine: {
    backgroundColor: '#a6a6a6',
    width: 1,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
  },

  buttonText_1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#524e4d',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
