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
  FlatList,
  Text,
  RefreshControl,
  Picker,
  Alert,
} from 'react-native';

import {
  InputGroup,
  Container,
  Header,
  Item, Input,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Footer, FooterTab,
  Left,
  Title,
  Body,
  Right,
} from 'native-base';


import { ListItem, SearchBar } from 'react-native-elements';
import Database from '../SQLiteAPI/Database';
import { AsyncStorage } from 'react-native';

import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

const db = new Database();
const flagInsertion = 0;
var { height, width } = Dimensions.get('window');
// For Avatar in List Item
const list = [
  {
    title: 'Appointments',
    icon: 'ios-information-circle'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },

]

export default class ManualSearchDrugName extends Component {
  static navigationOptions = {
    title: 'FirstAddScreen',
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

      notFound: 'Loading..',


      refreshing: true,  //used for refreshing the screen when scrolling for new changes


      record: [],
      arrayholder: [],
      query: '',
    };
  }

  componentDidMount = async () => { };



  onRefresh() {
    //Clear old data of the list
    this.setState({ arrayholder: [] });
    //Call the Service to get the latest data
    this.getProducts();
  }

  getProducts(text) {
    let arrayholder = [];
    const userID = this.props.userID;

    db.listProduct_drugs(text, userID)
      .then(data => {
        arrayholder = data;

        this.setState({
          refreshing: false,
          arrayholder,
          input_user_id: '',
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  MedicationRecordList() {
    //  const {input_user_drug} = this.state;
    const userID = this.props.userID;
    Actions.MedicationRecordList({ userID });

  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  //searchFilterFunction = text => {
  searchFilterFunction(text) {
    // const {text} = this.state;

    if (this.state.status == true) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
    if (this.state.text != '' && this.state.text.length >= 3) {
      this.getProducts(text);
    } else {
      Alert.alert('input is empty or characters are less');
    }

    var newData = this.state.arrayholder;
    newData = this.state.arrayholder.filter(item => {
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ query: text, arrayholder: newData });
  }

  render() {
    /*
    <TouchableOpacity style={styles.button}>
    <Text
      style={styles.buttonText}
      onPress={() => {
           
        const userID = this.props.userID;
      //  Alert.alert(text);
        Actions.OptionsScreen(userID);
      
      
    }}>
         
    Back
    </Text>
  </TouchableOpacity>



  <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
               
            const userID = this.props.userID;
          //  Alert.alert(text);
            Actions.OptionsScreen(userID);
          
          
        }}>
             
        Back
        </Text>
      </TouchableOpacity>
  */

    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (this.state.arrayholder.length === 0) {
      <Container>
        <Content>
          <Header style={{ backgroundColor: '#4287f5' }} searchBar rounded>
            <InputGroup borderType="rounded">
              <Icon name="arrow-back" onPress={() => this.MedicationRecordList()}></Icon>
              <Icon name="ios-search" />
              <TextInput
                // editable={false}
                placeholder="Enter Your Name"
                placeholderTextColor="lighgray"
                style={{
                  width: width - 120,

                  color: 'black',
                }}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />

              <Icon
                animationType={"slide"}
                name="ios-checkmark-circle-outline"
                onPress={() => {
                  if (this.state.text.trim() === '') {
                    Alert.alert('Please Type Something');
                  } else {
                    this.searchFilterFunction(this.state.text.trim());
                    const text = this.state.text;
                    //Alert.alert(text);
                    //this.AccessEditDataScreen();
                    // this.InsertStudentRecordsToServer();
                  }
                }}>


              </Icon>
            </InputGroup>
          </Header>

        </Content>
      </Container>;
    }

    return (
      <Container>
        <Header style={{ backgroundColor: '#4f83cc' }} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Enter Drug Name"
              placeholderTextColor="lighgray"
              style={{
                color: 'black',
              }}
              value={this.state.text}
              onChangeText={text => this.setState({ text })} />

            {this.state.text.trim().length <= 2
              ?
              <TouchableOpacity onPress={() => {
                if (this.state.text.trim() === '') {
                  Alert.alert('Please Type Something');
                } else {
                  this.searchFilterFunction(this.state.text.trim());
                  const text = this.state.text;

                }
              }}>
                <Icon
                  name="md-checkmark-circle-outline" style={{ color: "red" }}
                ></Icon>
              </TouchableOpacity>

              :
              <TouchableOpacity onPress={() => {
                if (this.state.text.trim() === '') {
                  Alert.alert('Please Type Something');
                } else {
                  this.searchFilterFunction(this.state.text.trim());
                  const text = this.state.text;

                }
              }}>
                <Icon
                  name="md-checkmark-circle-outline" style={{ color: 'green' }}
                ></Icon>
              </TouchableOpacity>

            }

          </Item>
        </Header>
        <Content>
          <SafeAreaView style={styles.container}>



            <ScrollView style={styles.container}>
              <FlatList
                data={this.state.arrayholder}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ListItem

                    leftAvatar={{ source: require('../Images/dwhite.png') }}
                  
                    chevron
                    onPress={() => {
                      // this.props.navigation.navigate('Screen2', {data: item.name});

                      const input_user_drug = item.name;
                      const userID = this.props.userID;
                      Actions.SearchByNameListingScreen({
                        input_user_drug,
                        userID,
                      });
                    }}
                    title={item.name}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                )}
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
              />
            </ScrollView>
          </SafeAreaView>
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
              <Text style={{ color: '#ffffff' }}>Barcode</Text>
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
              <Text style={{ color: '#ffffff' }}>Search</Text>
            </Button>
            <Button vertical onPress={() => { Actions.MedicationRecordList({ userID: this.props.userID }); }}>
              <Icon active name="ios-medkit" style={{ color: '#ffffff' }} />
              <Text style={{ color: '#ffffff' }}>Drugs</Text>
            </Button>
            <Button vertical onPress={() => { Actions.History({ userID: this.props.userID }); }}>
              <Icon name="list" style={{ color: '#ffffff' }} />
              <Text style={{ color: '#ffffff' }}>History</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    // flex: 1,
    //padding: 5,
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
    marginVertical: 5,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  GooglePlusStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderWidth: 0.5,
    borderColor: '#fff',

    width: width - 60,
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
    fontWeight: 'bold',
    color: '#524e4d',
    textAlign: 'center',
    justifyContent: 'center',
  },
  /* pickerStyle: {
    width: '93%',
    backgroundColor: '#eeeeee',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },*/
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
  ImageStyle: {
    width: width - 100,
    height: 180,
    justifyContent: 'center',
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
