import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
    Container,
    Header,
    Content,
    Footer,
    Card, CardItem, Thumbnail,
    Left,
    Body,
    Badge,
    Title,
    Right,
    FooterTab,
    List, ListItem,
    Icon,

   
} from 'native-base';


import Database from '../SQLiteAPI/Database';
import { AsyncStorage } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const defaultAnswers = { favoriteColor: 'nothing', favoriteNumber: '0', favoritePet: 'nothing' };


const db = new Database();

const flagEdit = 1;
export default class SurveySummary extends Component {
  

   constructor() {
    super();
    this.state = {
      favoriteNumberSummary:'',
      favoritePetSummary:'',
      favoriteFoodsSummary:'',
      jugglingBallsSummary:'',
      relaxSummary:'',
      radioValueSummary:'',
      singleDefaultValueSummary:'',
      multipleDefaultsValueSummary:'',
      //To get User ID from the Users Table
      userID: '',

      //Used with Netinfo
      connection_Status: '',

      isLoading: false,
    };
  }


  componentDidMount = async () => {

 

    this.setState({

      favoriteNumberSummary:await AsyncStorage.getItem('favoriteNumberSummary'),
      favoritePetSummary:await AsyncStorage.getItem('favoritePetSummary'),
      favoriteFoodsSummary:await AsyncStorage.getItem('favoriteFoodsSummary'),
      jugglingBallsSummary:await AsyncStorage.getItem('jugglingBallsSummary'),
      relaxSummary:await AsyncStorage.getItem('relaxSummary'),
      radioValueSummary:await AsyncStorage.getItem('radioValueSummary'),
      singleDefaultValueSummary:await AsyncStorage.getItem('singleDefaultValueSummary'),
      multipleDefaultsValueSummary:await AsyncStorage.getItem('multipleDefaultsValueSummary'),


    });

    
   


  }

  updateProduct() {
    this.setState({
      isLoading: true,
    });
    let data = {
      favoriteNumber: this.state.favoriteNumber,
      jugglingBalls: this.state.jugglingBalls,
      favoritePet: this.state.favoritePet.value,
      favoriteFoods: this.state.favoriteFoods[0].value,
    
      userID: this.props.userID,
    };
    db.updateSurvey(data.userID, data)

      .then(result => {
        //alert(data.pzn);
        console.log(result);
        this.setState({
          isLoading: false,
        });
      

      

       
       Actions.MainScreen({userID:this.props.userID});
        Alert('Data Successfuully Updated');

      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

    InsertStudentRecordsToServer = () => {
        fetch(
          'http://YOUR_PUBLIC_IP_ADDRESS/com/baidar/Components/Syncing/PostGRESync_History.php',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              student_name: this.state.atc,
    
              student_class: this.state.pzn,
    
              student_phone_number: this.state.date,
    
              userid: this.props.userID,
            }),
          },
        )
          .then(response => response.json())
          .then(responseJson => {
            // Showing response message coming from server after inserting records.
            // Actions.OptionsScreen({userID: this.props.userID})
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
            
              const userID_1 = this.props.userID;
              const input_user_id = this.props.input_user_id
              Actions.SecondAddScreen({userID_1,input_user_id});
    
              if (this.state.connection_Status == 'Offline') {
    
                //Alert.alert("Sorry, we can't add to online server, because you are offline");
      
              }
              else if (this.state.connection_Status == 'Online')
              {
                this.InsertStudentRecordsToServer();
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
          Actions.OptionsScreen({userID});
          Alert.alert('You cannot Add More Records, as You have already added 1');
        }
      }

    SurveyScreen = async () => {
        const flagEdit =  await AsyncStorage.setItem('flagEdit', 'FlagEdit');
  
        Actions.SurveyScreen();

    }
    

    Back() {

        Actions.MainScreen();

    }

    render() {
        if (this.state.isLoading) {
            return (
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          }
        const answers = this.props.navigation.getParam('surveyAnswers', defaultAnswers);
        return (
            <Container>
                  <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
                    <Left>
                        <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black' }}>COVID-19</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content>
                  <SafeAreaView><ScrollView>

                    <List>
                        <ListItem itemDivider style={{ backgroundColor: '#4f83cc' }} >
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Summary</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>In a typical day, how many times, do you wash your hands?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.favoriteNumberSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>In the last 1 month, did you have an illness, injury or condition that needed care right away ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.favoritePetSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>How many days a week, do you take shower or bath ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.jugglingBallsSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>Favorite Food</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.favoriteFoodsSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>How many days a week, Do you use anti bacterial sanitizer?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.multipleDefaultsValueSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>Which of the following symptoms do you have ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.relaxSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>With how many people, you have been in contact for the past 1 month</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.radioValueSummary}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>What is your Age ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.singleDefaultValueSummary}</Text>
                        </ListItem>

                    </List>
                    </ScrollView></SafeAreaView>
                    <Body>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={styles.button}
                                //onPress={this.productWelcomeScreen}>
                                onPress={() => this.SurveyScreen()}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </Body>
                </Content>





            </Container>

        );
    }
}

const styles = StyleSheet.create({
    background: {
        
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: PURPLE,
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        maxHeight: '80%',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20,
        color: 'white',
    },
    button: {

        width: '100%',
        backgroundColor: '#3367b0',
        borderRadius: 25,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 80,
        paddingVertical:10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
});