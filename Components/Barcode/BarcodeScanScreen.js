import React, {Component} from 'react';
import { View, Alert,TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
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

export default class BarcodeScanScreen extends Component {
  static navigationOptions = {
    title : "Back",
    headerShown: true,
  };
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

  onBarCodeRead(scanResult) {
   // console.warn(scanResult.type);
  //  console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
       // console.warn('onBarCodeRead call');

      /*  Alert.alert(
          'Barcode value is' + scanResult.data,
          'Barcode type is' + scanResult.type,
        );
      */

        const scanresult = scanResult.data;
        const str = scanresult.slice(1, 9);
        // Actions.HomeScreen2({scanresult_1: str});


       
        Alert.alert(
          'PZN Scanned Successfully',
          '' + '\n' + 'Scan Result : ' + str,
          [
            {
              text: 'Cancel',
              onPress: () => Actions.OptionsScreen({userID: this.props.userID}),
              style: 'cancel',
            },
            {
              text: 'CONFIRM',
              onPress: () => Actions.HomeScreen({userID: this.props.userID, scanresult_1: str}),
            },
          ],
          {cancelable: false},
        );




        //Actions.HomeScreen2({userID: this.props.userID, scanresult_1: str});
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <Container>

        
        <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        
        <View style={[styles.overlay, styles.topOverlay]}>
        
          <Text style={styles.scanScreenMessage}>
            Please scan the barcode. 
          </Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
        

         
        </View>
        
      </View>
       
        <Footer>
            <FooterTab style={{backgroundColor: '#4f83cc'}}>
              <Button
                vertical
                active
                style={{backgroundColor: '#386ab0', color:'#ffffff'}}
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
                    {cancelable: false},
                  )
                }>
                <Icon name="ios-barcode" style={{ color: '#ffffff' }} />
                <Text    style={{color:'#ffffff'}}>Barcode</Text>
              </Button>
              <Button
                vertical
                
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
                          Actions.HomeScreen({userID: this.props.userID}),
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
                    {cancelable: false},
                  )
                }>
                <Icon name="ios-search" style={{ color: '#ffffff' }} />
                <Text  style={{color:'#ffffff'}}>Search</Text>
              </Button>
              <Button vertical  onPress={() => {Actions.MedicationRecordList({userID:this.props.userID}); }}>
                <Icon active name="ios-medkit" style={{ color: '#ffffff' }} />
                <Text style={{color:'#ffffff'}}>Drugs</Text>
              </Button>
              <Button vertical onPress={() => {Actions.History({userID:this.props.userID}); }}>
                <Icon name="list" style={{ color: '#ffffff' }}  />
                <Text  style={{color:'#ffffff'}}>History</Text>
              </Button>
            </FooterTab>
          </Footer>
       
      </Container>
    
      
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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



};
