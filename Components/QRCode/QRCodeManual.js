import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import Database from '../SQLiteAPI/Database';
//import Form from './Form';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

const db = new Database();

export default class QRCodeManual extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Product List',
      headerRight: (
        <Button
          buttonStyle={{padding: 0, backgroundColor: 'transparent'}}
          icon={{name: 'add-circle', style: {marginRight: 0, fontSize: 28}}}
          onPress={() => {
            navigation.navigate('AddProduct', {
              onNavigateBack: this.handleOnNavigateBack,
            });
          }}
        />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      scanresult_1: '',
      username: '',
      password: '',
      participant_id: '',
      userData: '',
      isLoading: false,
    };
  }

  saveProduct() {
    this.setState({
      isLoading: true,
    });
    const {scanresult_1} = this.state;
    let data = {
      
      username: this.props.username,
      password: this.props.password,
      participant_id: scanresult_1,
    };
    db.addUser_Check(data.username, data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
        });
        //this.props.navigation.state.params.onNavigateBack;
        // this.props.navigation.goBack1();
        ToastAndroid.show('User Successfully Registered!', ToastAndroid.LONG);
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


  AccessEditDataScreen() {
    const {scanresult_1} = this.state;
   
    Actions.NextUserAddScreen({scanresult_1, username: this.props.username, password: this.props.password});
  
  }

  

  render() {
   // <Text>{this.props.scanresult_1}</Text>
   // <Text>{this.props.userID}</Text>

  // <Text>useraname : {this.props.username}</Text>
   //<Text>password : {this.props.password}</Text>

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={styles.ImageStyle}
          source={require('../Images/ic_launcher.png')}
        />

        <TextInput
          style={styles.inputBox}
          //value={this.state.scanresult_1}
          value={this.props.scanresult_1}
          onChangeText={scanresult_1 => this.setState({scanresult_1})}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Enter QR Code Manually"
          placeholderTextColor="#002f6c"
          selectionColor="#fff"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={this.saveProduct.bind(this)}>
            {' '}
            Register as a Participant
          </Text>
        </TouchableOpacity>
       
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  ImageStyle: {
    marginTop: -100,
    width: 180,
    height: 180,
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
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red',
  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: '#eeeeee',
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
