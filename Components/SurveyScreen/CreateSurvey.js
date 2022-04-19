import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Dimensions,

  Picker,
  Alert,
} from 'react-native';
import {
  Container, Header, Content, List, ListItem, Text, Drawer, Left,
  Body,
  Badge,
  Title,
  Right,
  FooterTab,
  Button,
  Icon
} from 'native-base';


//Import this for Drawer Sidebar -- Imp
import SideBar from '../drawer/SideBar';

import Database from '../SQLiteAPI/Database';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

const db = new Database();
const flagInsertion = 0;
var { height, width } = Dimensions.get('window');

export default class CreateSurvey extends Component {
  // These two methods are used to open and close a drawer in an individual screen
  closeDrawer() {
    this.drawer._root.close();
  }
  openDrawer() {
    this.drawer._root.open();
  }


  static navigationOptions = {
    title: 'Create Survey',
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
     
      surveyname: '',
     
      //To get User ID from the Users Table
      userID: '',

      //Used with Netinfo
      connection_Status: '',

      isLoading: false,
    };
  }

  componentDidMount = async () => {

  
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        this.setState({ connection_Status: 'Online' });
      } else {
        this.setState({ connection_Status: 'Offline' });
      }

    
    });

    //Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
     
    });



}
 

  InsertIntoStamm = () => {
    fetch(
      'http://192.168.0.31/COVID19/COVID19/Components/Syncing/PostGRESync_CreateSurvey.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          surveyname: this.state.surveyname,
          userID: this.props.userID,


        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        var surveyid = responseJson.username;
        if (username === -1) {

          Alert.alert("Invalid username and/or password");

          //this.Login();

         
        }
        else {
         
          // Showing response message coming from server after inserting records.
         Actions.SurveyQuestionaire({surveyid: surveyid})
         Alert.alert(responseJson);

     
        
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
      atc: this.state.atc,
      pzn: this.state.pzn,
      name: this.state.name,
      manufact_code: this.state.manufact_code,
      darrform_code: this.state.darrform_code,
      pack_size: this.state.pack_size,
      dddpk: this.state.dddpk,
      appliform_code: this.state.appliform_code,
      current_time: this.state.date,
      flagInsertion,
      //userID: this.state.userID,
      userID: this.props.userID,
    };
    if (this.state.flagInsertion != 1) {
      //For Updating History table
      db.addProduct_history(data)
        .then(result => {
          console.log(result);
          this.setState({
            isLoading: false,
          });

        })
        .catch(err => {
          console.log(err);
          this.setState({
            isLoading: false,
          });
        });

      db.addProduct(data)
        .then(result => {
          console.log(result);
          this.setState({
            isLoading: false,
          });
          
          ToastAndroid.show('Successfully Added!', ToastAndroid.LONG);
         
          const userID = this.props.userID;
          const input_user_id = this.props.input_user_id
          Actions.SecondAddScreen({ userID, input_user_id, pzn: this.props.pzn });

          if (this.state.connection_Status == 'Offline') {

            //Alert.alert("Sorry, we can't add to online server, because you are offline");

          }
          else if (this.state.connection_Status == 'Online') {

            this.InsertIntoHistoryTable();  // For history
            this.InsertIntoStamm();  // For stamm
          }


        })
        .catch(err => {
          console.log(err);
          this.setState({
            isLoading: false,
          });
        });
    } else if (this.state.flagInsertion == 1) {
      const userID = this.props.userID;
      Actions.OptionsScreen({ userID });
      Alert.alert('You cannot Add More Records, as You have already added 1');
    }
  }



  Back() {

      Actions.MainScreen();
  
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };
  

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

   

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>

          <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
            <Left>
              <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>
            </Left>


            <Body>
              <Title style={{ color: 'black' }}>Covid-19</Title>
            </Body>
            <Right>
              <Icon name="menu" onPress={() => this.openDrawer()} />
            </Right>
          </Header>
          <Content>

            <List>
              <ListItem itemDivider>
                <Text style={{ fontWeight: 'bold' }}>Create a New Survey</Text>
              </ListItem>
              <ListItem></ListItem>
              <ListItem itemDivider>
                <Text>1. Survey Name</Text>
              </ListItem>
              <ListItem>
                <TextInput
          
                  editable={true}
                  placeholder='Enter Your Survey Name'
                  value={this.state.surveyname}
                  onChangeText={text => this.saveProduct(text, 'surveyname')}
                  style={styles.inputBox_bemerkungen}
                />
              </ListItem>
             
             
              
            
            

              <View style={styles.subContainer}>



                    <TouchableOpacity style={styles.button}>
                      <Text
                        style={styles.buttonText}
                        // onPress={() => this.saveProduct()}>
                        onPress={this.saveProduct.bind(this)}>
                        Create
                  </Text>
                    </TouchableOpacity>

                


              </View>

            </List>
          </Content>
        </Container>

      </Drawer>



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
    padding: 20,
    // borderBottomWidth: 2,

    // borderBottomColor: '#CCCCCC',
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
    marginVertical: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GooglePlusStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: width - 90,
    borderRadius: 5,
    margin: 5,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
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
    fontWeight: '500',
    color: '#524e4d',
    textAlign: 'center',
  },

  pickerStyle: {
    height: 100,
    width: '100%',
    color: '#344953',
    justifyContent: 'center',
  },
  inputBox_bemerkungen: {
    width: '100%',
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
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
});
