import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,SafeAreaView,Alert } from 'react-native';
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
export default class SurveyCompletedScreen extends React.Component {
  

   constructor() {
    super();
    this.state = {
    favoriteNumber: '',
    favoriteNumberSummary: '',
    favoritePetSummary: '',
    favoriteFoodsSummary: '',
    jugglingBallsSummary: '',
    

      //To get User ID from the Users Table
      userID: '',

      //Used with Netinfo
      connection_Status: '',

      flagEdit:'',

      isLoading: false,
    };
  }


  componentDidMount = async () => {

      this.setState({

        flagEdit:await AsyncStorage.getItem('flagEdit'),

      });

  

    
    //const answers = this.props.navigation.getParam('surveyAnswers', defaultAnswers);
    const answers = this.props.surveyAnswers;

    await AsyncStorage.setItem('favoriteNumberSummary', answers.favoriteNumber.toString());
    await AsyncStorage.setItem('favoritePetSummary', answers.jugglingBalls.toString());
    await AsyncStorage.setItem('favoriteFoodsSummary', answers.favoritePet.value.toString());
    await AsyncStorage.setItem('jugglingBallsSummary', answers.favoriteFoods[0].value.toString());
    await AsyncStorage.setItem('relaxSummary', answers.relax[0].value.toString());
    await AsyncStorage.setItem('radioValueSummary', answers.radio.value.toString());
    await AsyncStorage.setItem('singleDefaultValueSummary', answers.singleDefault.value.toString());
    await AsyncStorage.setItem('multipleDefaultsValueSummary', answers.multipleDefaults[0].value.toString());



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
            //Alert.alert(responseJson);
          })
          .catch(error => {
            console.error(error);
          });
      };


      saveProduct() {
        this.setState({
          isLoading: true,
        });
        const answers = this.props.surveyAnswers;
        let data = {
          favoriteNumber: answers.favoriteNumber,
          jugglingBalls: answers.jugglingBalls,
          favoritePet: answers.favoritePet.value,
          favoriteFoods: answers.favoriteFoods[0].value,
        
          //userID: this.state.userID,
          userID: this.props.userID,
        };
       
          //For Updating History table
          db.addProduct_survey(data)
            .then(result => {
              console.log(result);
              this.setState({
                isLoading: false,
              });
              Actions.MainScreen({userID:this.props.userID});
              // Alert.alert("insertion to Survey Successful");
            })
            .catch(err => {
              console.log(err);
              this.setState({
                isLoading: false,
              });
            }); 
        
      }

      updateProduct = async () => {
        this.setState({
          isLoading: true,
        });
        // const {navigation} = this.props;
        let data = {
          favoriteNumber: await AsyncStorage.getItem('favoriteNumberSummary'),
          jugglingBalls: await AsyncStorage.getItem('jugglingBalls'),
          favoritePet: await AsyncStorage.getItem('favoritePet'),
          favoriteFoods: await AsyncStorage.getItem('favoriteFoods'),
        
          //userID: this.state.userID,
          userID: this.props.userID,
        };
        db.updateSurvey(data.userID, data)
    
          .then(result => {
            //alert(data.pzn);
            console.log(result);
            this.setState({
              isLoading: false,
            });
          
    
           // const userID = this.props.userID_1;
    
            /*
            if (this.state.connection_Status == 'Offline') {
    
              //Alert.alert("Sorry, we can't add to online server, because you are offline");
    
            }
            else if (this.state.connection_Status == 'Online')
            {
              
          
            }
    
            */
    
           AsyncStorage.removeItem('flagEdit', () => { });
    
           // Actions.MedicationRecordList({userID});
            Alert('Data Successfuully Updated');
    
            // Actions.nextScreenPZN({scanresult_1:data.pzn});
          })
          .catch(err => {
            console.log(err);
            this.setState({
              isLoading: false,
            });
          });
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
        /*  <Text>Raw JSON: {JSON.stringify(this.props.navigation.getParam('surveyAnswers', {}))}</Text> */
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
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Preview of your Details</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>In a typical day, how many times, do you wash your hands?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.favoriteNumber}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>In the last 1 month, did you have an illness, injury or condition that needed care right away ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.jugglingBalls}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>How many days a week, do you take shower or bath ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.favoritePet.value}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>Favorite Food</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.favoriteFoods[0].value} and {answers.favoriteFoods[1].value}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>How many days a week, Do you use anti bacterial sanitizer?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.relax[0].value} and {answers.relax[1].value}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>Which of the following symptoms do you have ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.radio.value}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>With how many people, you have been in contact for the past 1 month</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.singleDefault.value}</Text>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>What is your Age ?</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{answers.multipleDefaults[0].value} and the {answers.multipleDefaults[1].value}</Text>
                        </ListItem>

                    </List>
                    </ScrollView></SafeAreaView>
                    <Body>
                        <View>

                        {
                        this.state.flagEdit  ?  
                        <TouchableOpacity
                          activeOpacity={0.4}
                          style={styles.button}
                          //onPress={this.productWelcomeScreen}>
                          //onPress={this.updateProduct.bind(this)}>
                          onPress={() => this.updateProduct()}>
                          <Text style={styles.buttonText}>Update Database</Text>
                      </TouchableOpacity>      
                      :  
                      <TouchableOpacity
                          activeOpacity={0.4}
                          style={styles.button}
                          //onPress={this.productWelcomeScreen}>
                          onPress={this.saveProduct.bind(this)}>
                          <Text style={styles.buttonText}>Save Database</Text>
                      </TouchableOpacity>   
                        }
                            



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