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

export default class BarcodeSearchPZN extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Barcode Scan',
      header:null,
    };
  };

  constructor() {
    super();
    this.state = {
      input_user_id: '',
      userData: '',
    };
  }

  AccessEditDataScreen() {
    
    Actions.FirstEditScreen({scanresult_2: this.props.scanresult_1,userID: this.props.userID});
  }

  AccessAddDataScreen() {
    Actions.productAddScreen();
  }

  GoBack() {
    Actions.OptionsScreen({userID: this.props.userID});
  }

  

  render() {
  //  <Text>PZN (Barcode Scanned) {this.props.scanresult_1}</Text>
  //  <Text>User ID {this.props.userID}</Text>
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={styles.ImageStyle}
          source={require('../Images/ic_launcher.png')}
        />
         
        <TextInput
          style={styles.inputBox}
          //value={this.state.input_user_id}
          value={this.props.scanresult_1}
          onChangeText={scanresult_2 => this.setState(this.props.scanresult_1)}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Enter User Id"
          placeholderTextColor="#002f6c"
          selectionColor="#fff"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={this.AccessEditDataScreen.bind(this)}>
            {' '}
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={this.GoBack.bind(this)}>
            {' '}
            BACK
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
