import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
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
import PhoneInput from 'react-native-phone-input';
import firebase from 'react-native-firebase';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Database from '../SQLiteAPI/Database';

var { height, width } = Dimensions.get('window');
const db = new Database();

export default class PhoneAuth extends Component {
  static navigationOptions = {
    title: 'Phone Authentication',
    headerShown: true,
  };
  constructor() {
    super();

    this.state = {
      valid: '',
      type: '',
      value: '',
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    valid: '',
    type: '',
  };

  updateInfo() {
    this.setState({
      value: this.phone.getValue(),
    });

    if (this.state.confirmResult) {
      this.changePhoneNumber();
    } else {
      this.handleSendCode();
    }
  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            {this.state.confirmResult ? null : (
              <Text style={{ fontWeight: 'bold', color: 'red' }}>

              </Text>
            )}
          </Text>
        </View>
      );
    }
  }

  validatePhoneNumber = () => {
    //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;   //+491525419242
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.value);

    //+(123) - 456-78-90   /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/   \s is whitespace  \. escaped character  /character
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.value)
        .then(confirmResult => {
          this.setState({ confirmResult });
        })
        .catch(error => {
          alert(error.message);

          console.log(error);
        });
    } else {
      Alert.alert(
        'Are you sure to send the code',


        '\n' +
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },

          {
            text: 'Yes',
            //onPress={() => this.deleteProduct({this.state.id)} ,
            onPress: () =>
              this.updateInfo(),
            style: 'cancel',
          },


        ],
        { cancelable: false },
      )
      // alert('Thank You, Now Please Press the Send Code Button Again');
    }
  };

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' });
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid });
          // alert(`Verified! ${user.uid}`);
          // Alert.alert("Successfully Loggedin");
          // Actions.MedicinesOverview({userID: user.uid});



          //  this.saveProduct();
          this.InsertStudentRecordsToServer();
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  InsertStudentRecordsToServer = () => {
    // const password_md5 = md5(this.props.password);
    const scanresult = this.phone.getValue();
    const str = scanresult.slice(3, 14);

    fetch(
      'http://192.168.0.31/DZNE/RheinLand/Components/Syncing/PostGRERegistration.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({


          username_1: str,


          email_1: 'Data Matched',

          //password_1: this.props.password,
          password_1: "Encrypted",

          // userid : this.props.userID,

          //flagsync : flagsyncVariable,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // Storing the user data registration in Offline Database, after it is stored in online database
        this.saveProduct();

        // Actions.productWelcomeScreen();

        // Alert.alert(this.state.username);

        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  saveProduct() {
    this.setState({
      isLoading: true,
    });
    const scanresult = this.phone.getValue();
    const str = scanresult.slice(3, 14);

    let data = {


      username: str,
      password: 2,

    };
    db.addUser_Check(data.username, data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
        });

        ToastAndroid.show('Phone Number Successfully Registered!', ToastAndroid.LONG);

        Actions.LoginScreen_Phone();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <Text>Please enter the verification code below that is sent to your provided Phone Number above{'\n'}</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Verification code"
          placeholderTextColor="black"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={verificationCode => {
            this.setState({ verificationCode });
          }}
          maxLength={6}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleVerifyCode}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    /*
     <TouchableOpacity
            style={[styles.button]}
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }>
            <Text style={styles.buttonText}>
              {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
            </Text>
          </TouchableOpacity>
          */
    return (

      <Container>
        <Content padder>


          <SafeAreaView style={[styles.container]}>


            <View style={styles.subContainer}>
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                style={styles.inputBox}
              />
              <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
                <Text style={styles.buttonText}>
                  {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
                </Text>
              </TouchableOpacity>

              {this.renderInfo()}
              {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
            </View>
          </SafeAreaView>

        </Content>
      </Container>








    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,





  },
  subContainer: {
    flex: 1,
    marginBottom: 300,
    padding: 5,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'white',
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
  verificationView: {
    marginBottom: 100,
    width: '100%',
    alignItems: 'center',

  },

});
