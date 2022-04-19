import React, { Component } from 'react';
import { StyleSheet, ScrollView, TextInput, View, Image, Alert, Button } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from './ValidColors';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
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

    Icon,
    Text,
    Drawer,
} from 'native-base';

const GREEN = 'white';
//const PURPLE = 'rgba(108,48,237,1)';
const PURPLE = 'white';

const green = 'white';
//const PURPLE = 'rgba(108,48,237,1)';
const blue = 'lightgray';



export default class SurveyScreen extends Component {


    constructor(props) {
        const Info = 'Info';
        super(props);
        this.state = {
            flagEdit:'',
            backgroundColor: PURPLE, answersSoFar: '', survey: [
                {
                    questionType : Info,
                   // questionType: 'Info',
                    questionText: 'Welcome to COVID-19 App, Please click on Next Button'
                },
                {
                    questionType: 'TextInput',
                    //questionText: 'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
                    questionText: 'In a typical day, how many times, do you wash your hands?',
                    questionId: 'favoriteColor',
                    placeholderText: 'How many times do you wash hands!',
                },
                {
                    questionType: 'NumericInput',
                    questionText: 'In the last 1 month, did you have an illness, injury or condition that needed care right away ?',
                    questionId: 'favoriteNumber',
                    placeholderText: '42',
                },
                {
                    questionType: 'NumericInput',
                    questionText: 'How many days a week, do you take shower or bath ?',
                    questionId: 'jugglingBalls',
                    defaultValue: '0'
                },
                {
                    questionType: 'SelectionGroup',
                    questionText:
                        'How many days a week\n\nDo you use anti bacterial sanitizer?',
                    questionId: 'favoritePet',
                    options: [
                        {
                            optionText: 'One',
                            value: 'one'
                        },
                        {
                            optionText: 'Two',
                            value: 'two'
                        },
                        {
                            optionText: 'Three',
                            value: 'three'
                        },
                        {
                            optionText: 'Four',
                            value: 'four'
                        },
                        {
                            optionText: 'More than Five',
                            value: 'five'
                        }
                    ]
                },
                {
                    questionType: 'MultipleSelectionGroup',
                    questionText:
                        'Which of the following symptoms do you have ?',
                    questionId: 'favoriteFoods',
                    questionSettings: {
                        maxMultiSelect: 3,
                        minMultiSelect: 2,
                    },
                    options: [
                        {
                            optionText: 'Short Breathing',
                            value: 'short breathing'
                        },
                        {
                            optionText: 'Sneezing',
                            value: 'Sneezing'
                        },
                        {
                            optionText: 'Coughing',
                            value: 'coughing'
                        },
                        {
                            optionText: 'Fever',
                            value: 'fever'
                        },
                        {
                            optionText: 'Headache',
                            value: 'headache'
                        },
                        {
                            optionText: 'Insomnia',
                            value: 'Insomnia'
                        },
                        {
                            optionText: 'Dont know',
                            value: 'Dont know'
                        },
                       
                    ]
                },
                {
                    questionType: 'MultipleSelectionGroup',
                    questionText:
                        'With how many people, you have been in contact for the past 1 month',
                    questionId: 'relax',
                    questionSettings: {
                        maxMultiSelect: 2,
                        minMultiSelect: 2,
                        autoAdvance: true,
                    },
                    options: [
                        {
                            optionText: 'Less than Ten',
                            value: 'ten'
                        },
                        {
                            optionText: 'Twnenty',
                            value: 'twenty'
                        },
                        {
                            optionText: 'Thirty',
                            value: 'thirty'
                        },
                        {
                            optionText: 'Dont Know',
                            value: 'dont know'
                        }
                    ]
                },
                {
                    questionType: 'SelectionGroup',
                    questionText:
                        'What is your Age ? ',
                    questionId: 'radio',
                    questionSettings: {
                        allowDeselect: false,
                    },
                    options: [
                        {
                            optionText: 'Less than 10',
                            value: 'ten'
                        },
                        {
                            optionText: 'Between 20-30',
                            value: 'between 20-30'
                        },
                        {
                            optionText: 'Between 30-60',
                            value: 'Between 30-60'
                        }
                    ]
                },
                {
                    questionType: 'SelectionGroup',
                    questionText:
                        'What is your Gender ? ',
                    questionId: 'singleDefault',
                    questionSettings: {
                        defaultSelection: 0
                    },
                    options: [
                        {
                            optionText: 'Male',
                            value: 'male'
                        },
                        {
                            optionText: 'Female',
                            value: 'female'
                        },
                    ]
                },
                {
                    questionType: 'MultipleSelectionGroup',
                    questionText:
                        'For how many days, you have been in quarantine ? ',
                    questionId: 'multipleDefaults',
                    questionSettings: {
                        defaultSelection: [0, 2],
                        maxMultiSelect: 2,
                        minMultiSelect: 2,
                    },
                    options: [
                        {
                            optionText: '30',
                            value: '30'
                        },
                        {
                            optionText: '40',
                            value: '40'
                        },
                        {
                            optionText: '14',
                            value: '14'
                        },
                        {
                            optionText: 'One Month',
                            value: 'one month'
                        },
                    ]
                },
                {
                    questionType: 'Info',
                    questionText: 'That is all, Click on finish to see your results!'
                },
            ]
        };

    }

    componentDidMount = async (surveyAnswers) => {

        Alert.alert(this.props.flagEdit);

        const favoriteColor = await AsyncStorage.getItem('favoriteColor');
        const favoriteNumber = await AsyncStorage.getItem('favoriteNumber');
        const jugglingBalls = await AsyncStorage.getItem('jugglingBalls');
        const favoritePet = await AsyncStorage.getItem('favoritePet');


    
        this.state.survey[1].defaultValue = favoriteColor.toString();
        this.state.survey[2].defaultValue = favoriteNumber;
        this.state.survey[3].defaultValue = jugglingBalls;

        var str = 'What is your favorite Pet ?';

    







    }

    onSurveyFinished = async (answers) => {
       

        const infoQuestionsRemoved = [...answers];

        // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        const answersAsObj = {};
        for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }

        await AsyncStorage.setItem('finish', 'finish');
        Actions.SurveyCompletedScreen({ surveyAnswers: answersAsObj, flagEdit:this.props.flagEdit });
    }

  
    onAnswerSubmitted = async (answer) => {
        {


            this.setState({ flagEdit: this.props.flagEdit });

            switch (answer.questionId) {
                case 'favoriteColor': {

                    await AsyncStorage.setItem('favoriteColor', answer.value.toLowerCase().toString());
                    break;
                }
                case 'favoriteNumber': {


                    await AsyncStorage.setItem('favoriteNumber', answer.value.toString());
                    break;
                }
                case 'jugglingBalls': {


                    await AsyncStorage.setItem('jugglingBalls', answer.value.toString());
                    break;
                }

                case 'favoritePet': {

                  
                    await AsyncStorage.setItem('favoritePet', answer.value.optionText.toString());
                 
                    break;
                }

                default:
                    break;
            }
        }
    }

    renderPreviousButton(onPress, enabled) {
        return (
            <View>    
            <Text>{"\n"}</Text>
            <View style={{
                flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10, width: 300,
                backgroundColor: '#2d64b3',
                borderRadius: 25,
                marginVertical: 10,
                paddingVertical: 12,
            }}>
                <Button

                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}
                    title={'Previous'}
                />
            </View>
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View>    
            <Text>{"\n"}</Text>
            <View style={{
                flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10, width: 300,
                backgroundColor: '#2d64b3',
                borderRadius: 25,
                marginVertical: 10,
                paddingVertical: 12,
            }}>

                <Button
                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}

                    title={'Next'}
                />
            </View>
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View>    
            <Text>{"\n"}</Text>
            <View style={{
                flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10, width: 300,
                backgroundColor: '#2d64b3',
                borderRadius: 25,
                marginVertical: 10,
                paddingVertical: 12,
            }}>
                <Button
                    title={'Finished'}
                    onPress={onPress}
                    disabled={!enabled}
                    color={GREEN}
                />
            </View>
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
                <Button
                    title={data.optionText}
                    onPress={onPress}
                    color={isSelected ? blue : green}
                    style={isSelected ? { fontWeight: 'bold' } : {}}
                    key={`button_${index}`}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderTextBox(onChange, value, placeholder, onBlur) {
        return (
            <View>
                <TextInput
                    style={styles.textBox}
                    onChangeText={text => onChange(text)}
                    numberOfLines={1}
                    underlineColorAndroid={'white'}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(184,184,184,1)'}
                    value={value}
                    multiline
                    onBlur={onBlur}
                    blurOnSubmit
                    returnKeyType='done'
                />
            </View>
        );
    }

    renderNumericInput(onChange, value, placeholder, onBlur) {
        return (<TextInput
            style={styles.numericInput}
            onChangeText={text => { onChange(text); }}
            underlineColorAndroid={'white'}
            placeholderTextColor={'rgba(184,184,184,1)'}
            value={String(value)}
            placeholder={placeholder}
            keyboardType={'numeric'}
            onBlur={onBlur}
            maxLength={3}
        />);
    }

    renderInfoText(infoText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }
    Back() {


        Actions.MainScreen();




    }

    render() {
        /*

         <ScrollView style={styles.answersContainer}>
                    <Text style={{textAlign:'center'}}>JSON output</Text>
                    <Text>{this.state.answersSoFar}</Text>
                </ScrollView>

    */
        return (

            <Container>

                <Header style={{ backgroundColor: '##4287f5' }} searchBar rounded>
                    <Left>
                        <Icon name="ios-arrow-back" color='blue' onPress={() => this.Back()}></Icon>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black' }}>Rheinland</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <Content>


                    <Card>
                        <CardItem style={{ backgroundColor: '#3367b0' }} header bordered>
                        <Text style={{ color: 'white' }}>Covid-19: Behaviorial Questionaire</Text>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#4f83cc' }}  bordered>
                            <Body>
                                <View style={styles.container}>
                                    <SimpleSurvey
                                        ref={(s) => { this.surveyRef = s; }}
                                        survey={this.state.survey}
                                        renderSelector={this.renderButton.bind(this)}
                                        containerStyle={styles.surveyContainer}
                                        selectionGroupContainerStyle={styles.selectionGroupContainer}
                                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                        renderPrevious={this.renderPreviousButton.bind(this)}
                                        renderNext={this.renderNextButton.bind(this)}
                                        renderFinished={this.renderFinishedButton.bind(this)}
                                        renderQuestionText={this.renderQuestionText}
                                        onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                                        onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                                        componentDidMount={(answer) => this.componentDidMount(answer)}
                                        renderTextInput={this.renderTextBox}
                                        renderNumericInput={this.renderNumericInput}
                                        renderInfo={this.renderInfoText}
                                    />


                                </View>
                            </Body>
                        </CardItem>

                    </Card>



                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        minWidth: '100%',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    
        borderRadius: 10,
     
    },
    answersContainer: {
        width: '90%',
        maxHeight: '20%',
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#6c9ee6',
        elevation: 20,
        borderRadius: 10,
    },
    surveyContainer: {
        width: '100%',
        //alignSelf: 'center',
        //backgroundColor: 'white',
        backgroundColor: '#4f83cc',
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5,
        alignContent: 'center',
        padding: 50,
        //flexGrow: 0,
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: '#6c9ee6',
        alignContent: 'flex-end',
        color: "white",
    },
    background: {
        flex: 1,
        minHeight: 500,
        maxHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',

    },
    questionText: {
        marginBottom: 20,
        fontSize: 19,
        fontFamily:'Arial',
        width:'100%',
        color: "white",
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,

        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    },

    ImageStyle: {
        marginTop: -200,
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',

    },
    numericInput: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },
    infoText: {
        marginBottom: 20,
        fontSize: 18,
        fontFamily: 'Trebuchet MS',
        marginLeft: 10,
        color: "white",
    },
});
