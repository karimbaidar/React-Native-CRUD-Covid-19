import React, {Component} from 'react';
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
} from 'react-native';
import Database from '../SQLiteAPI/Database';

import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import md5 from 'md5';

const db = new Database();
export default class LoginScreenPhone extends Component {
  static navigationOptions = {
    title: 'Login Via Phone',
    headerShown: true,
  };
 

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dataSource: '',
    };
  }

  componentDidMount = async () => {

    
    const userToken = await AsyncStorage.getItem('userToken');
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
    'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRELogin.php',
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
   

      if(responseJson === 'Data Matched1')
      {

          Alert.alert("Logged In Successfully");

        
   
          Actions.MedicationRecordList(responseJson);
      }
      else{

        // Alert.alert(responseJson);
        this.Login();
      }


    })
    .catch(error => {
      console.error(error);
    });
};


  Login = async (username) => {
    // await AsyncStorage.setItem('userToken', username);
    // const set = AsyncStorage.setItem('userToken', username);
    // alert(set.toString());

    const UserEmail = this.state.username;


    // Setting Up the UserEmail to AsyncStorage and keeping the user state saved with this.
    // await AsyncStorage.setItem('userToken', UserEmail);

    db.onLoginPress_Phone(UserEmail)
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
   */
    return (
      <View style={styles.container}>
        <Image
          style={styles.ImageStyle}
          source={require('../Images/ic_launcher.png')}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={text => this.setState({username: text})}
          value={this.state.username}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone Number"
          placeholderTextColor="#002f6c"
          selectionColor="#fff"
          keyboardType="email-address"
        />

    

      
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            //  onPress={() => this.deleteProduct()}
            onPress={this.Login.bind(this)}>
            Login
          </Text>
        </TouchableOpacity>
       

       
        <View style={styles.signupTextCont}>
          
          <Text style={styles.signupText}>Not Yet Registered </Text>

          
          <TouchableOpacity 
           onPress={() => this.PhoneAuth()}>
            <Text style={styles.signupButton}>Phone Authentication</Text>
          </TouchableOpacity>
  

        </View>
        
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
