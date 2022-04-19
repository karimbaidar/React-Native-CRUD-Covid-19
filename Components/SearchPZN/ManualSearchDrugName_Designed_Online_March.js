//This is an example code to Add Search Bar Filter on Listview//
import React, {Component} from 'react';

import {
  InputGroup,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import all the components we are going to use.

var {height, width} = Dimensions.get('window');

import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

export default class ManualSearchDrugName extends Component {
  static navigationOptions = {
    title: 'Search By Drug Name',
    headerShown: false,
  };
  constructor(props) {
    super(props);
    //setting default state
    this.state = {isLoading: true, text: ''};
    this.arrayholder = [];
  }

  componentDidMount = async () => {
    return fetch(
      'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRESync_Autocomplete.php',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },

          function() {
            this.arrayholder = responseJson;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  ButtonSearch = text => {
    fetch(
      'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRESync_Autocomplete.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.text,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'No Record Found') {
          Alert.alert('No Record Found');
        } else {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
            },

            function() {
              this.arrayholder = responseJson;
            },
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    //https://ionicframework.com/docs/v3/ionicons/
    return (
      <Container>
        <Header style={{backgroundColor: '##4287f5'}} searchBar rounded>
          <InputGroup borderType="rounded">
            <Icon name="arrow-back" onPress={Actions.OptionsScreen}></Icon>
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
              onChangeText={text => this.setState({text})}
            />

            <Icon
              animationType={"slide"}
              name="ios-checkmark-circle-outline"
              onPress={() => {
                if (this.state.text.trim() === '') {
                  Alert.alert('Please Type Something');
                } else {
                  this.ButtonSearch(this.state.text.trim());
                  const text = this.state.text;
                  //Alert.alert(text);
                  //this.AccessEditDataScreen();
                  // this.InsertStudentRecordsToServer();
                }
              }}></Icon>
          </InputGroup>
        </Header>

        <Content>
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={({item}) => (
                <View>
                  <Content>
                    <Card>
                      <CardItem>
                        <Left>
                          <Thumbnail
                            source={require('../Images/ic_launcher.png')}
                          />
                          <Body>
                            <Text style={styles.textRegister1}>{item.fruit_name}</Text>
                          </Body>
                        </Left>
                      </CardItem>
                      <CardItem cardBody>
                        <Image
                          source={require('../Images/rb.jpg')}
                          style={{height: 200, width: null, flex: 1}}
                        />
                      </CardItem>
                      <CardItem>
                        <Left>
                          <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text> You can check your records here </Text>
                          </Button>
                        </Left>
                      </CardItem>
                    </Card>
                  </Content>
                </View>
              )}
              enableEmptySections={true}
              style={{marginTop: 10}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Content>
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
    flex: 1,
    marginBottom: 5,
    padding: 5,
    // borderBottomWidth: 2,

    // borderBottomColor: '#CCCCCC',
  },
  textStyle: {
    padding: 10,
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
  textRegister1: {
    color: 'black',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15  
  },
});
