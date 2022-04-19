import React, {Component} from 'react';
import {Button, Text, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import Database from '../SQLiteAPI/Database';

const db = new Database();

export default class QRCodeScannen extends Component {

  static navigationOptions = {
    title: 'QR Code',
    headerShown: true,
  };


  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      scanresult_1: '',
      username: '',
      password: '',
      participant_id: '',
      userData: '',
      isLoading: false,

      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

 

  CheckQR = (scanresult) => {

    fetch(
      'http://192.168.0.31/COVID19/COVID19/Components/Syncing/PostGRESync_CheckQR.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrcode: scanresult,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {



        var qrcode = responseJson.qrcode;
        


        if (qrcode === -1) {
           Alert.alert("Invalid QR Code");
        }
        else {
          Actions.MainScreen({qrcode:responseJson.qrcode});

          Alert.alert("Successfully Logged In");

        }

      })
      .catch(error => {
        console.error(error);
      });

  };

  onBarCodeRead(scanResult) {
    //console.warn(scanResult.type);
    // console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
        //console.warn('onQRCodeRead call');

        /*  Alert.alert(
          'QRCode value is' + scanResult.data,
          'QRCode type is' + scanResult.type,
        );
        */
        const scanresult = scanResult.data;
        // const str = scanresult.slice(1, 9);
        // Actions.HomeScreen2({scanresult_1: str});
        Alert.alert(
          'QR Code Scanned Successfully',
          '' + '\n' + 'Scan Result : ' + scanresult,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'REGISTER',
              onPress: () => this.CheckQR(scanresult),
            },
          ],
          {cancelable: false},
        );



        
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
   /* <View style={[styles.overlay, styles.bottomOverlay]}>
    <Text>
      Username : {this.props.username}
      Password : {this.props.password}
    </Text>
  </View>
  */
    return (
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
            Please scan the barcode. {this.props.userID}
          </Text>
        </View>
       
      </View>
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
};
