import React, {Component, Text} from 'react';
import {
 
 
  
  Platform,
  ToastAndroid,
} from 'react-native';

import Login from '../Authentication/LoginScreen_Offline';
import MedicationRecordList from '../CRUD/MedicationRecordList';
import FirstAddScreen from '../CRUD/FirstAddScreen';
import SearchByNameListingScreen from '../CRUD/SearchByNameListingScreen';
import SearchByNameEditScreen_2 from '../CRUD/SearchByNameEditScreen_2';
import splashScreen from '../Screens/splashscreen';
import ProductWelcome from '../Screens/Welcome';
import optionScreen from '../Screens/OptionsScreen';
import homeScreen from '../SearchPZN/ManualSearchPZN';
import homeScreen2 from '../SearchPZN/BarcodeSearchPZN';
import updateUser from '../User/UpdateUser';
import viewUser from '../User/ViewUser';
import viewAllUser from '../User/ViewAllUser';
import deleteUser from '../User/DeleteUser';
import productCategoryScreen from '../CRUD/ProductCategoryScreen';
import userAddScreen from '../Authentication/RegistrationInitialScreen';
import LoginScreenPhone from '../Authentication/LoginScreenPhone';
import barCodeScan from '../Barcode/BarcodeScanScreen';


import FirstEditScreen from '../CRUD/FirstEditScreen';
import SecondAddScreen from '../CRUD/SecondAddScreen';
import PopupScreen from '../Screens/PopupScreen';
import OfflineNotice from '../Screens/OfflineNotice';
import ForgotPassword from '../Screens/ForgotPassword';
import ChangePassword from '../Screens/ChangePaswword';
import Profile from '../Screens/Profile';
import ReduxCounter from '../Screens/ReduxCounter';

import ThirdAddScreen from '../CRUD/ThirdAddScreen';
import FourthAddScreen from '../CRUD/FourthAddScreen';
import FifthAddScreen from '../CRUD/FifthAddScreen';
import SixthAddScreen from '../CRUD/SixthAddScreen';
import SeventhScreen from '../CRUD/SeventhScreen';
import EigthScreen from '../CRUD/EigthScreen';
import NinthScreen from '../CRUD/NinthScreen';

import SecondEditScreen from '../CRUD/SecondEditScreen';
import QRCodeScannen from '../QRCode/QRCodeScannen';
import QRCodeManual from '../QRCode/QRCodeManual';
import SearchByNameEditScreen from '../CRUD/SearchByNameEditScreen';
import RegistrationOptionScreen from '../Authentication/RegistrationOptionScreen';
import LoginScreenOnline from '../Authentication/LoginScreen_Online';
import LoadingScreen from '../Screens/LoadingScreen';

import MedicinesOverview from '../Screens/MedicinesOverview';
import PhoneAuth from '../PhoneAuth/PhoneAuth';

import ManualSearchDrugName from '../SearchPZN/ManualSearchDrugName';
import History from '../CRUD/History';
import RNDetector from '../OCR/RNTextDetector';
import GalleryTextDetector from '../OCR/gallery';
import CameraTextDetector from '../OCR/camera';
import Fingerprint from '../Fingerprint/Fingerprint';


//Survey Covid-19
import MainScreen from '../Screens/MainScreen';
import AssetExample from '../SurveyScreen/AssetExample';
import SurveyScreen from '../SurveyScreen/SurveyScreen';
import SurveyCompletedScreen from '../SurveyScreen/SurveyCompletedScreen';
import SurveySummary from '../SurveyScreen/SurveySummary';
import CreateSurvey from '../SurveyScreen/CreateSurvey';
import SurveyQuestionaire from '../SurveyScreen/SurveyQuestionaire';
import SurveyChoices from '../SurveyScreen/SurveyChoices';
import SurveyResults from '../SurveyResults/SurveyResults';

import {Router, Scene, Drawer,ActionConst} from 'react-native-router-flux';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar  >
          <Scene
            key="splashScreen"
            component={splashScreen}
            title="splashScreen"
            initial
          />
          <Scene key="HomeScreen" component={homeScreen} />

          <Scene key="MainScreen" component={MainScreen} title="MainScreen"        />
    
          <Scene key="productWelcomeScreen" component={ProductWelcome} 
          //type="replace"
          type="reset"
          
          /> 

          {Platform.OS === 'android' ? 

            <Scene key="History" component={History} title="History"/>
          :
            //Type replace is used to disable back swipe in IOS device
            <Scene key="History" component={History} title="History" />
          }
          
          <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword" />
          <Scene key="ChangePassword" component={ChangePassword} title="ChangePassword" />
          <Scene key="Profile" component={Profile} title="Profile" />
          <Scene key="LoginScreenPhone" component={LoginScreenPhone} title="LoginScreenPhone" type="replace"/>
          <Scene key="ReduxCounter" component={ReduxCounter} title="ReduxCounter" />
          <Scene key="ThirdAddScreen" component={ThirdAddScreen} title="ThirdAddScreen" />
          <Scene key="FourthAddScreen" component={FourthAddScreen} title="FourthAddScreen" />
          <Scene key="FifthAddScreen" component={FifthAddScreen} title="FifthAddScreen" />
          <Scene key="SixthAddScreen" component={SixthAddScreen} title="SixthAddScreen" />
          <Scene key="SeventhScreen" component={SeventhScreen} title="SeventhScreen" />
          <Scene key="EigthScreen" component={EigthScreen} title="EigthScreen" />
          <Scene key="NinthScreen" component={NinthScreen} title="NinthScreen" />
          <Scene key="LoadingScreen" component={LoadingScreen} title="LoadingScreen" type="replace"  />
          <Scene key="RNDetector" component={RNDetector} title="RNDetector"   />
          <Scene key="GalleryTextDetector" component={GalleryTextDetector} title="GalleryTextDetector"   />
          <Scene key="CameraTextDetector" component={CameraTextDetector} title="CameraTextDetector"   />
          <Scene key="Fingerprint" component={Fingerprint} title="Fingerprint"   />
  
          <Scene key="AssetExample" component={AssetExample} title="AssetExample"        />
          <Scene key="SurveyScreen" component={SurveyScreen} title="SurveyScreen"        />
          <Scene key="SurveyCompletedScreen" component={SurveyCompletedScreen} title="SurveyCompletedScreen"        />
          <Scene key="SurveySummary" component={SurveySummary} title="SurveySummary"        />
          <Scene key="CreateSurvey" component={CreateSurvey} title="CreateSurvey"        />
          <Scene key="SurveyQuestionaire" component={SurveyQuestionaire} title="SurveyQuestionaire"        />
          <Scene key="SurveyChoices" component={SurveyChoices} title="SurveyChoices"  />
          <Scene key="SurveyResults" component={SurveyResults} title="SurveyResults" />
      


          <Scene
            key="SearchByNameEditScreen_2"
            component={SearchByNameEditScreen_2}
            title="SearchByNameEditScreen_2"
          />
          <Scene key="PhoneAuth" component={PhoneAuth} title="PhoneAuth" />

          <Scene
            key="ManualSearchDrugName"
            component={ManualSearchDrugName}
            title="ManualSearchDrugName"
          />

          <Scene
            key="RegistrationOptionScreen"
            component={RegistrationOptionScreen}
            title="RegistrationOptionScreen"
          />

          <Scene
            key="FirstEditScreen"
            component={FirstEditScreen}
            title="FirstEditScreen"
          />
          <Scene
            key="LoginScreenOnline"
            component={LoginScreenOnline}
            title="LoginScreenOnline"
            type="replace"
          />
          <Scene
            key="FirstAddScreen"
            component={FirstAddScreen}
            title="FirstAddScreen"
          />

          <Scene
            key="MedicinesOverview"
            component={MedicinesOverview}
            title="MedicinesOverview"
          />

          <Scene
            key="QRCodeScannen"
            component={QRCodeScannen}
            title="QRCodeScannen"
          />

         

          <Scene
            key="QRCodeManual"
            component={QRCodeManual}
            title="QRCodeManual"
          />

          <Scene
            key="PopupScreen"
            component={PopupScreen}
            title="PopupScreen"
          />

          <Scene
            key="homeScreen2"
            component={homeScreen2}
            title="homeScreen2"
          />
          <Scene
            key="OfflineNotice"
            component={OfflineNotice}
            title="OfflineNotice"
          />

          <Scene
            key="SecondEditScreen"
            component={SecondEditScreen}
            title="SecondEditScreen"
          />

          <Scene
            key="BarcodeScanScreen"
            component={barCodeScan}
            title="barCodeScan"
          />

        
          <Scene
            key="UserAddScreen"
            component={userAddScreen}
            title="userAddScreen"
          />

          <Scene key="UpdateUser" component={updateUser} title="updateUser" />

          <Scene key="ViewUser" component={viewUser} title="viewUser" />

          <Scene
            key="ViewAllUser"
            component={viewAllUser}
            title="viewAllUser"
          />

          <Scene key="DeleteUser" component={deleteUser} title="deleteUser" />

          {Platform.OS === 'android' ? 
          

          <Scene
            key="MedicationRecordList"
            component={MedicationRecordList}
            title="MedicationRecordList"
          
          />
          
          : 
          
          <Scene
            key="MedicationRecordList"
            component={MedicationRecordList}
            title="MedicationRecordList"
            // type="replace"  // type= "replace" is used to disable swipe back function on specific scence for IOS devices
            //type="reset"
           
           // type={ActionConst.RESET}
          />
          
          
          }
        
          

          <Scene
            key="ProductCategoryScreen"
            component={productCategoryScreen}
            title="productCategoryScreen"
          />

          <Scene
            key="SearchByNameEditScreen"
            component={SearchByNameEditScreen}
            title="SearchByNameEditScreen"
          />
          <Scene
            key="OptionsScreen"
            component={optionScreen}
            title="optionScreen"
          />

          <Scene key="login" component={Login} title="Login" 
          
          //type="replace" 

          panHandlers={null}
          
          />

          <Scene
            key="SearchByNameListingScreen"
            component={SearchByNameListingScreen}
            title="SearchByNameListingScreen"
          />

          <Scene
            key="SecondAddScreen"
            component={SecondAddScreen}
            title="SecondAddScreen"
          />
        </Scene>
      </Router>
    );
  }
}
