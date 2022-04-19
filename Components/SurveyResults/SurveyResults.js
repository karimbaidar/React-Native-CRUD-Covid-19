import React, { Component } from 'react';
import { View, Platform, Alert, ProgressBarAndroid, ProgressViewIOS, ActivityIndicator, Image, FlatList, StyleSheet, TouchableOpacity, headers, SafeAreaView } from 'react-native';


import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

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
  Button,
  Icon,
  Text,
  Drawer,
} from 'native-base';
import Database from '../SQLiteAPI/Database';



//Import this for Drawer Sidebar -- Imp
import SideBar from '../drawer/SideBar';
import { ScrollView } from 'react-native-gesture-handler';


const db = new Database();

export default class SurveyResults extends Component {
  // These two methods are used to open and close a drawer in an individual screen
  closeDrawer() {
    this.drawer._root.close();
  }
  openDrawer() {
    this.drawer._root.open();
  }


  constructor(props) {
    super(props);

    this.state = {

      result: '',
      ratio: '',

      progressBarProgress: 0.0,
      enableSummaryOption: false,
      isLoading: false,
      text: '',
      qrcode: '',


      tableHead: ['Entity', 'Description'],
      tableTitle: ['Lab ID', 'Patient Name', 'Measurement Type', 'Measurement Subtype', 'IgG_ratio', 'Result', 'Date', 'Comment'],
      tableData: [
        ['4535974260ZX'],
        ['Anonymous'],
        ['ELISA'],
        ['IgG [Euroimmun]'],
        ['this.state.ratio'],
        ['+'],
        ['2020-04-24'],
        ['This is a comment']
      ]

    }
    this.arrayholder = [];
  }

  changeProgress = () => {
    this.setState({ progressBarProgress: 0.60 });
  }

  SurveyScreen = () => {
    Actions.SurveyScreen();
  }

  componentDidMount = async () => {
   // Alert.alert(this.props.qrcode);

    fetch(
      'http://192.168.0.31/COVID19/COVID19/Components/Syncing/PostGRESync_FetchResults.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrcode: this.props.qrcode,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {



        var labidn = responseJson.labidn;
        var measurement_type = responseJson.measurement_type;
        var measurement_subtype = responseJson.measurement_subtype;
        var result = responseJson.result;
        var ratio = responseJson.ratio;
        var date = responseJson.date;
        var comment = responseJson.comment;

        if (this.props.qrcode) {
          this.setState({

            tableData: [
              [labidn],
              ['Anonymous'],
              [measurement_type],
              [measurement_subtype],
              [result],
              [ratio],
              [date],
              [comment]
            ]


          })
        }
        else {
          Alert.alert("No User Data Found");

        }






        if (result === -1) {
          // Alert.alert("Invalid username and/or password");
        }
        else {
          //Actions.MainScreen({result:result});

          //  Alert.alert(this.state.result);

        }

      })
      .catch(error => {
        console.error(error);
      });

  };



  Back() {

    Actions.MainScreen({ qrcode: this.props.qrcode });

  }

  render() {

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Drawer
        gesturesEnabled={false}
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container >
          <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
            <Left>
              <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>
            </Left>
            <Body>
              <Title style={{ color: 'black' }}>COVID-19</Title>
            </Body>
            <Right>
              <Icon name="menu" onPress={() => this.openDrawer()} />
            </Right>
          </Header>
          <Content>

            <SafeAreaView>
              <ScrollView>

                <Card style={{ width: '100%', padding: 20 }}>
                  <CardItem header bordered>
                    <Text style={{ color: '#4f83cc', fontSize: 20 }}>Results Overview </Text>
                  </CardItem>


                </Card>



                <View style={styles.container}>
                  <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={this.state.tableHead} flexArr={[3, 4, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                      <Col data={this.state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text2} />
                      <Rows data={this.state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text1} />
                    </TableWrapper>
                  </Table>
                </View>

              </ScrollView>

            </SafeAreaView>



          </Content>
        </Container>
      </Drawer>

    );
  }
}

const styles = StyleSheet.create(
  {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#4f83cc' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 3, backgroundColor: '#4f83cc' },
    row: { height: 28 },
    text: { textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 17 },
    text1: { textAlign: 'center', color: 'black' },
    text2: { textAlign: 'center', color: 'white' },
    btn:
    {
      padding: 10,
      backgroundColor: '#4f83cc',
      marginTop: 20
    },

    btnText:
    {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
    }
  });