import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import Database from '../SQLiteAPI/Database';

//import Form from './Form';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import ListView from 'deprecated-react-native-listview';
import SideBar from '../drawer/SideBar';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Body,
  Title,
  Right,
  FooterTab,
  Button,
  Icon,
  Text,
  Drawer,
} from 'native-base';

const db = new Database();
var ds;

export default class ManualSearchPZN extends Component {

  // These two methods are used to open and close a drawer in an individual screen
  closeDrawer() {
    this.drawer._root.close();
  }
  openDrawer() {
    this.drawer._root.open();
  }

  static navigationOptions = {
    title: 'Register New User',
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      input_user_id: '',
      input_user_drug: '',
      userData: '',

      //Autocomplete Search
      isLoading: false,
      text: '',

      //For hiding a view
      show: true,
      films: [],
      query: '',

    };
    this.arrayholder = [];
  }

  ShowHideTextComponentView = () => {
    if (this.state.status == true) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  };
  async AccessEditDataScreen() {
    const { input_user_id } = this.state;
    const scanresult_1 = this.props.scanresult_1;
    const userID = this.props.userID;


    this.clean();


    if (input_user_id) {

      input_user_id_Async = await AsyncStorage.setItem('input_user_id', input_user_id.toString());

      Actions.FirstAddScreen({ input_user_id, userID });

    } else if (scanresult_1) {


      Actions.FirstAddScreen({ scanresult_1, userID });
    }
  }

  async clean() {
    try {

      const vomArztVerordnet = await AsyncStorage.getItem('vomArztVerordnet');

      AsyncStorage.removeItem('vomArztVerordnet', () => { });


    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  }

  componentDidMount = async () => {

    this.setState({
      input_user_id_Async: await AsyncStorage.getItem('input_user_id_Async'),


    });

    // Alert.alert(this.state.vomArztVerordnet);
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  InsertStudentRecordsToServer = () => {
    fetch(
      'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRESync_Autocomplete.php',
      {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
          name: this.state.input_user_drug.toString(),
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => { })
      .catch(error => { });
  };

  EmptyScreen() {
    // Alert.alert("Bar Code Scanning Option is not working");
    //Actions.BarcodeScanScreen();

    const userID = this.props.userID;
    Actions.BarcodeScanScreen({ userID });
  }

  AccessDrugSearchScreen() {
    const { input_user_drug } = this.state;
    const userID = this.props.userID;
    Actions.SearchByNameListingScreen({ input_user_drug, userID });
  }

  MedicationRecordList() {
    const userID = this.props.userID;
    Actions.MedicationRecordList({ userID });
  }
  async FirstNavigateScreen() {

    const userID = this.props.userID;
    const input_user_id = this.props.input_user_id



    Actions.FirstAddScreen({ userID, input_user_id });


  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    /*
          <Text
            style={styles.buttonText}
            onPress={this.AccessEditDataScreen.bind(this)}>
            {' '}
            Search
          </Text>

           <Icon name="arrow-back" onPress={() => this.MedicationRecordList()}></Icon>
      */
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
            {this.props.input_user_id ?
              <Left>
                <Icon name="ios-arrow-forward" color='blue' onPress={() => this.FirstNavigateScreen()}></Icon>
              </Left>
              :
              null
            }
            <Left>
              <Icon name="cloud" ></Icon>
            </Left>
            <Body>
              <Title style={{ color: 'black' }}>Rheinland</Title>
            </Body>
            <Right>
              <Icon name="menu" onPress={() => this.openDrawer()} />
            </Right>
          </Header>
          <Content padder>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'} {'\n'}
                {this.props.input_user_id}
              </Text>

              <Image
                style={styles.ImageStyle}
                source={require('../Images/ic_launcher.png')}
              />


              {this.props.scanresult_1 ? (
                <TextInput
                  style={styles.inputBox}
                  //value={this.state.input_user_id}
                  value={this.props.scanresult_1}
                  onChangeText={scanresult_1 =>
                    this.setState(this.props.scanresult_1)
                  }
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Barcode PZN"
                  placeholderTextColor="#002f6c"
                  selectionColor="#fff"
                  keyboardType="email-address"
                  editable={false}
                />
              ) : (
                  <TextInput
                    style={styles.inputBox}
                    //value={this.state.input_user_id}
                    value={this.state.input_user_id}
                    onChangeText={input_user_id => this.setState({ input_user_id })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Enter PZN"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                  />
                )}

              {!!this.state.nameError && (
                <Text style={{ color: 'red' }}>{this.state.nameError}</Text>
              )}

              {this.props.scanresult_1 ? (
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    onPress={this.AccessEditDataScreen.bind(this)}>
                    {' '}
                    Search
                  </Text>
                </TouchableOpacity>

              ) : (
                  <TouchableOpacity style={styles.button}>
                    <Text
                      style={styles.buttonText}
                      onPress={() => {
                        if (this.state.input_user_id.trim() === '') {
                          this.setState(() => ({
                            nameError: 'Fill the above Input.',
                          }));
                        } else {
                          //Alert.alert("HEllo");
                          this.AccessEditDataScreen();
                          // this.InsertStudentRecordsToServer();
                        }
                      }}>
                      {' '}
                      Search
                  </Text>
                  </TouchableOpacity>
                )}
            </View>
          </Content>
          <Footer>
            <FooterTab style={{ backgroundColor: '#4f83cc' }}>
              <Button
                vertical
                onPress={() =>
                  Alert.alert(
                    'Are you Sure',
                    '' + '\n' + 'Barcode Scannen',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                      },

                      {
                        text: 'Scannen',
                        onPress: () =>
                          Actions.BarcodeScanScreen({
                            userID: this.props.userID,
                          }),
                      },
                    ],
                    { cancelable: false },
                  )
                }>
                <Icon name="ios-barcode" style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }} >Barcode</Text>
              </Button>
              <Button
                vertical
                active
                style={{ backgroundColor: '#386ab0', color: '#ffffff' }}
                onPress={() =>
                  Alert.alert(
                    'How do you want to Search',
                    '' + '\n' + 'SEARCH BY : ',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                      },
                      {
                        text: 'PZN',
                        //onPress={() => this.deleteProduct({this.state.id)} ,
                        onPress: () =>
                          Actions.HomeScreen({ userID: this.props.userID }),
                        style: 'cancel',
                      },
                      {
                        text: 'DRUG NAME',
                        onPress: () =>
                          Actions.ManualSearchDrugName({
                            userID: this.props.userID,
                          }),
                      },
                    ],
                    { cancelable: false },
                  )
                }>
                <Icon name="ios-search" style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }} >Search</Text>
              </Button>
              <Button vertical onPress={() => { Actions.MedicationRecordList({ userID: this.props.userID }); }}>
                <Icon active name="ios-medkit" style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }} >Drugs</Text>
              </Button>
              <Button vertical onPress={() => { Actions.History({ userID: this.props.userID }); }}>
                <Icon name="list" style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }} >History</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
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
  rowViewContainer: {
    fontSize: 17,
    padding: 10,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },

  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
});
