import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  Alert,
  Button,
  TextInput,
  ActivityIndicator,
  SafeAreaView,

  Platform,
  ToastAndroid,
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

import Database from '../SQLiteAPI/Database';
import Toast from 'react-native-simple-toast';


import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import md5 from 'md5';


const db = new Database();
export default class LoginScreen_Offline extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dataSource: '',
      visible: false  // For Toast State
    };
  }

  componentDidMount = async () => {


    if(await AsyncStorage.getItem('usernameTouch'))
    {
        
        const usernameTouch = await AsyncStorage.getItem('usernameTouch');
        //Alert.alert(usernameTouch.toString());
        //this.setState({ usernameTouch: usernameTouch })

    }


   // const userToken = await AsyncStorage.getItem('userToken');
    // alert(userToken);
    // const userToken = await AsyncStorage.getItem('userToken');
    //  alert(userToken);
  };

  /*
  componentWillUnmount() {
    this.closeDatabase();
  }

  openSuccess() {
    console.log('Database is opened');
  }

  openError(err) {
    console.log('error: ', err);
  }

  closeDatabase = () => {
    if (db) {
      console.log('Closing database ...');
      db.close();
    } else {
      console.log('Database was not OPENED');
    }
  };

  */


  InsertStudentRecordsToServer = () => {
    //const password_md5 = md5(this.props.password);
    fetch(
      'http://192.168.0.31/DZNEREDUX/RheinLand/Components/Syncing/PostGRELogin.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({


          username_1: this.state.username,

          // email_1: this.state.email,

          // password_1: this.state.password,
          password_1: md5(this.state.password),


        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        var username = responseJson.username;
        if (username === -1) {

          Alert.alert("Invalid username and/or password");

          //this.Login();

         
        }
        else {
          Actions.MainScreen({ userID: username });

          if (Platform.OS === 'android') {
            ToastAndroid.show("Login Successfull", ToastAndroid.SHORT)
          } else {
            //Alert.alert("Login Successful");
            Toast.show('Login Successful');

          }
        //  this.saveProduct({userID:username});
      
        
          }

      

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
      email: 3,
      password: this.state.password,

    };
    db.addUser_Check(data.username, data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
        });

        // ToastAndroid.show('User Successfully Registered!', ToastAndroid.LONG);

        //  Actions.productWelcomeScreen();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }


  Login = async (username, password) => {
    // await AsyncStorage.setItem('userToken', username);
    // const set = AsyncStorage.setItem('userToken', username);
    // alert(set.toString());

    const UserEmail = this.state.username;
    const UserPassword = this.state.password;

    // Setting Up the UserEmail to AsyncStorage and keeping the user state saved with this.
    // await AsyncStorage.setItem('userToken', UserEmail);

    db.onLoginPress(UserEmail, UserPassword)
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  RegisterScreen() {
    Actions.UserAddScreen();
    //this.props.navigation.navigate('UserAddScreen');
  }

  PhoneAuth() {
    Actions.PhoneAuth(); // For Offline Registration Screen
    // Actions.userRegistrationScreenOnline();  // For Online Registration Screen
    //onPress={this.LoginScreen} in Button or touchable opacity for Actiona
    //this.props.navigation.navigate('UserAddScreen');
  }

  ForgotPassword() {
    Actions.ForgotPassword();

  }

  PhoneLogin() {
    Actions.LoginScreenPhone(); // For Offline Registration Screen
    // Actions.userRegistrationScreenOnline();  // For Online Registration Screen
    //onPress={this.LoginScreen} in Button or touchable opacity for Actiona
    //this.props.navigation.navigate('UserAddScreen');
  }

  Fingerprint() {
    Actions.Fingerprint(); 
  
  }

  GoToQRCodeScanning() {
    Actions.QRCodeScannen();
  }

  render() {
    /*<TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            //  onPress={() => this.deleteProduct()}
            onPress={this.Login.bind(this)}>
            Login
          </Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            //  onPress={() => this.deleteProduct()}
            onPress={this.InsertStudentRecordsToServer}>
            Login
          </Text>
        </TouchableOpacity>

          // onPress={this.Login.bind(this)}>

          <View style={styles.signupTextCont}>

    <Text style={styles.signupText}>Login Via </Text>


    <TouchableOpacity
      onPress={() => this.Fingerprint()}>
      <Text style={styles.signupButton}>Fingerprint</Text>
    </TouchableOpacity>


  </View>
   */
    return (
      <Container>
        <Content>
        <SafeAreaView>

  
<View style={styles.container}>
<Image
            source={require('../Images/covid.png')}
            style={{marginTop:50, width: 300, height: 200}}
          />
  


  <TouchableOpacity style={styles.button}>
    <Text
      style={styles.buttonText}
      //  onPress={() => this.deleteProduct()}
      onPress={() => this.GoToQRCodeScanning()}>
 <Icon name="ios-qr-scanner" style={{ color: '#ffffff' }} /> {"\n"}
      Login via QR Code
    </Text>
  </TouchableOpacity>

  



  
  

</View>
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
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
    color: '#ffffff',
  },
  signupButton: {
    color: '#12799f',
    fontSize: 16,
    fontWeight: '500',
    fontWeight: 'bold',
  },
 
 
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
