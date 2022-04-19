import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Image,
  Button,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';

//import Database from '../SQLiteAPI/Database';
import { Actions } from 'react-native-router-flux';

//const db = new Database();
const flagsyncVariable = 1;

export default class LoginScreen_Online extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);

    this.state = {
      isConnected: true,

    //  TextInput_UserID: '',
      TextInput_Username: '',
      TextInput_Email: '',
      TextInput_Password: '',

     
    };
  }

  componentDidMount() {
   
  }

  InsertStudentRecordsToServer = () => {
    fetch(
      'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRELogin.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         

          username_1: this.state.username,

          email_1: this.state.email,

          password_1: this.state.password,

       
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
     

        if(responseJson === 'Data Matched')
        {

            Alert.alert("User Logged In");
     
           Actions.OptionsScreen();
        }
        else{

          Alert.alert(responseJson);
        }






      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
  //  <Text>{this.props.userID}</Text>
    return (
      <View style={styles.container}>
      <Image
        style={styles.ImageStyle}
        source={require('../Images/ic_launcher.png')}
      />
    
        <TextInput
          placeholder="Username"
          value={this.state.username}
          //editable={false}
          onChangeText={TextInputValue => this.setState({username: TextInputValue})}
          underlineColorAndroid="transparent"
          style={styles.inputBox}
        />

     

        <TextInput
          placeholder="Password"
          value={this.state.password}
        //  editable={false}
          onChangeText={TextInputValue => this.setState({password: TextInputValue})}
          underlineColorAndroid="transparent"
          style={styles.inputBox}
        />

       
       

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={this.InsertStudentRecordsToServer}>
          <Text  style={styles.buttonText}> Login </Text>
        </TouchableOpacity>


        
      </View>
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

  ImageStyle: {
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
