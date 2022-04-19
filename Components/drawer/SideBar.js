import React, {Component} from 'react';
import {Text, SafeAreaView, Image, View, Alert} from 'react-native';
import {Left, Right, List, ListItem, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SideBar extends Component {
  async Logout() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // alert('Async ID ' + userToken);

      //  await AsyncStorage.removeItem(userToken)
      //  await AsyncStorage.clear();

      AsyncStorage.removeItem('userToken', () => {});

      Actions.login();
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }

  async ForgotPassword() {
    try {
      const userID = await AsyncStorage.getItem('userToken');

      //  Actions.ForgotPassword(userID);

      Alert.alert('Under Construction');
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }

  async Profile() {
    try {
      const userID = await AsyncStorage.getItem('userToken');

      // Actions.Profile(userID);

      Alert.alert('Under Construction');
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }

  async ChangePassword() {
    try {
      const userID = await AsyncStorage.getItem('userToken');

     // Actions.ChangePassword(userID);

      Alert.alert('Under Construction');
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }
  async CreateSurvey() {
    try {
      const userID = await AsyncStorage.getItem('userToken');

      Actions.CreateSurvey(userID);

     // Alert.alert('Under Construction');
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }
  render() {
    /*
     <TouchableOpacity>
      <ListItem onPress={this.CreateSurvey}>
              <Left>
                <TouchableOpacity>
                  <Text>Create Survey</Text>
                </TouchableOpacity>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
   </TouchableOpacity>

    <TouchableOpacity>
            <ListItem onPress={this.Profile}>
              <Left>
                <TouchableOpacity>
                  <Text>Profile</Text>
                </TouchableOpacity>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableOpacity>
    */
    return (
      <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
        <List>
          <ListItem>
          <Image
            source={require('../Images/covid.png')}
            style={{width: 200, height: 100}}
          />
          </ListItem>
         
         
          <TouchableOpacity>
            <ListItem onPress={this.Logout}>
              <Left>
                <TouchableOpacity>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableOpacity>
        

          <TouchableOpacity>
            <ListItem onPress={this.ChangePassword}>
              <Left>
                <TouchableOpacity>
                  <Text>Change Password</Text>
                </TouchableOpacity>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableOpacity>
        </List>
      </SafeAreaView>
    );
  }
}
