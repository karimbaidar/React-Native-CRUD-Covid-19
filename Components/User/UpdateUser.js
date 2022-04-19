import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

export default class UpdateUser extends Component {
  static navigationOptions = {
    header: null,
  };

  LoginScreen() {
    Actions.login();
  }

  RegistrationScreen() {
    Actions.RegisterScreenOption();
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={styles.ImageStyle}
          source={require('../Images/ic_launcher.png')}
        />

        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText} onPress={this.LoginScreen}>
            {' '}
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText} onPress={this.RegistrationScreen}>
            {' '}
            Register
          </Text>
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

  ImageStyle: {
    marginTop: -100,
  },

  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
  button1: {
    width: 300,
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    marginTop: 50,
  },
  button2: {
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
