import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Modal,
    ActivityIndicator
} from 'react-native';
// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import { Ionicons } from '@expo/vector-icons';

export default function PayViaPayPulseApp(props) {
    console.log("props:", props.route.params.LoanData)
    const [cardmodalVisible, setCardModalVisible] = useState(false);
    const [cardpaysucessmodalVisible, setCardPaySucessModalVisible] = useState(false);
    const [payonlinemodalVisible, setPayOnlineModalVisible] = useState(false);
    const [payinappmodalVisible, setPayInPayModalVisible] = useState(false);
    const [payussdmodalVisible, setPayUssdModalVisible] = useState(false);
    const [loading, Isloading] = useState(false);



    const PageInit = async () => {
        fetch(API_URL + '/api/App/RequestPaymentLink', {
            method: 'GET',
            headers: {
                Authorization: await SecureStore.getItemAsync('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log("rr:", responseJson)

                if (responseJson.statusCode == '200') {
                    setCardModalVisible(false);
                    Isloading(false)
                    setCardPaySucessModalVisible(true)

                } else {
                    Isloading(false)
                    alert('Something went wrong.');
                    CloseModal();

                }
                // onLoanDetails(responseJson);
            })
            .catch(error => {
                alert(JSON.stringify(error));
                setCardModalVisible(false);
                Isloading(false)
                setCardPaySucessModalVisible(false)
            });
    };




    const CloseModal = () => {
        setCardModalVisible(false);
        setPayOnlineModalVisible(false);
        setPayInPayModalVisible(false);
        setPayUssdModalVisible(false);
        setCardPaySucessModalVisible(false)


    };

    const CheckPayViaCardAlert = () => {
         if(props.route.params.LoanData.id <= 0){
			alert("You are currently unable to send payment request becuase you don't have any active loans!");
        }else{
            setCardModalVisible(true);
        }
        
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logo}>
                        <Image
                            source={require('../../../assets/paypulseicon.jpeg')}
                            resizeMode="stretch"
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 25, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <Text style={styles._tag_line}>PAYPULSE PAYMENT</Text>

                    </View>

                    <Text style={{ fontWeight: "bold", textAlign: "center", paddingVertical: 20 }}>Active Loan ID</Text>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <View style={{ justifyContent: "center", backgroundColor: "#BEBEBE", paddingVertical: 10, paddingHorizontal: 55, borderRadius: 10 }}>

                            <Text style>
                                {props.route.params.LoanData.loanId}
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 35, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                            <Text style={{}}>Amount         </Text>
                            <Text style={{ fontWeight: "bold", fontSize: 25 }}>N${props.route.params.LoanData.totalAmount}</Text>
                        </View>

                    </View>




                    <TouchableOpacity
                        onPress={() => {
                            CheckPayViaCardAlert()
                        }}
                        style={styles.sendScreenShotBtn}
                    >
                        <Text style={styles.sendScreenShotBtnTxt}>
                            Pay via Card|Request Payment Link
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setPayOnlineModalVisible(true)

                            // Linking.openURL('https://www.referredby.com.na/paypulse');
                        }}
                        style={styles.sendScreenShotBtn}
                    >
                        <Text style={styles.sendScreenShotBtnTxt}>
                            Pay Online|Paycode
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setPayInPayModalVisible(true)
                            // Linking.openURL('https://www.referredby.com.na/repayments');
                        }}
                        style={styles.sendScreenShotBtn}
                    >
                        <Text style={styles.sendScreenShotBtnTxt}>
                            Pay in App Via Merchant ID: ReferredBy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            // Linking.openURL('https://www.referredby.com.na/repayments');
                            setPayUssdModalVisible(true)
                        }}
                        style={styles.sendScreenShotBtn}
                    >
                        <Text style={styles.sendScreenShotBtnTxt}>
                            Pay via USSD: 256379010
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 25, borderBottomWidth: 1, borderBottomColor: 'grey', marginVertical: 20 }}>
                    </View>

                    <View
                        style={{
                            width: '70%',
                            alignSelf: 'center',
                            alignItems: 'flex-end',
                            marginTop: 5,
                        }}
                    >

                        <TouchableOpacity
                            style={styles.back_btn}
                            onPress={() => props.navigation.goBack()}
                        >
                            <Text style={styles.back_btn_txt}>BACK</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={cardmodalVisible}
                onRequestClose={() => {
                    setCardModalVisible(!cardmodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={50}
                                color="#2F8E44"
                            />
                            <Text style={styles.modalText}>CARD PAY ALERT</Text>
                            <Text style={styles.uidTxt}>
                                Your are about to request a payment link that is used to pay your loan via debit/ credit card.
                            </Text>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => {
                                    PageInit(); Isloading(true)
                                }}
                            >
                                {loading ?
                                    <ActivityIndicator size="small" color="#fff" />
                                    :
                                    <Text style={styles.submitBtnTxt}>PROCEED</Text>

                                }
                            </TouchableOpacity>
                        </>

                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={cardpaysucessmodalVisible}
                onRequestClose={() => {
                    setCardPaySucessModalVisible(!cardpaysucessmodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={50}
                                color="#2F8E44"
                            />
                            <Text style={styles.modalText}>Request Successful !</Text>
                            <Text style={styles.uidTxt}>
                                Standard Bank PayPulse payment link will be sent to your registered mobile number within 2 minutes, please use it to make a card payment.
                            </Text>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => {
                                    CloseModal();
                                }}
                            >
                                <Text style={styles.submitBtnTxt}>Close</Text>
                            </TouchableOpacity>
                        </>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={payonlinemodalVisible}
                onRequestClose={() => {
                    setPayOnlineModalVisible(!payonlinemodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={50}
                                color="#2F8E44"
                            />
                            <Text style={styles.modalText}>Feature Coming Soon !</Text>
                            <Text style={styles.uidTxt}>
                                This feature will be made available soon.
                            </Text>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => {
                                    CloseModal();
                                }}
                            >
                                <Text style={styles.submitBtnTxt}>Close</Text>
                            </TouchableOpacity>
                        </>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={payinappmodalVisible}
                onRequestClose={() => {
                    setPayInPayModalVisible(!payinappmodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={50}
                                color="#2F8E44"
                            />
                            <Text style={styles.modalText}>Pay Via Merchant ID</Text>
                            <Text style={styles.uidTxt}>
                                Login to the PayPulse App
                            </Text>
                           
                            
                            <Text style={{textAlign: 'center',
                                fontSize: 11,
                                fontFamily: Fonts.InterRegular,
                                fontWeight:"bold",
                                color: '#000',marginTop: 2}}>
                                {"Select Pay Merchant" + " -> " + "Find Merchant & Search by the name"}
                            </Text>
                            <View style={{ flexDirection: "row" ,marginTop: 3,justifyContent:"center", alignItems:"center"}}>

                            {/* <WithLocalSvg asset={require('../../../assets/emtylogo.svg')} /> */}
                            <Image
                            source={require('../../../assets/emtylogo.png')}
                            resizeMode="stretch"
                            style={{ width: 30, height: 30 }}
                        />

                            <Text style={{
                                textAlign: 'center',
                                fontSize: 17,
                                fontFamily: Fonts.InterRegular,
                                fontWeight:"bold",
                                color: '#000',
                            }}>
                                Referredby
                            </Text>

                            </View>
                            <Text style={styles.uidTxt}>
                                and finalize payment.
                            </Text>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => {
                                    CloseModal();
                                }}
                            >
                                <Text style={styles.submitBtnTxt}>Close</Text>
                            </TouchableOpacity>
                        </>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={payussdmodalVisible}
                onRequestClose={() => {
                    setPayUssdModalVisible(!payussdmodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={50}
                                color="#2F8E44"
                            />
                            <Text style={styles.modalText}>Pay Via USSD</Text>
                            <Text style={styles.uidTxt}>
                                Dial *140*6626#
                            </Text>
                           
                            
                            <Text style={{textAlign: 'center',
                                fontSize: 11,
                                fontFamily: Fonts.InterRegular,
                                fontWeight:"bold",
                                color: '#000',marginTop: 2}}>
                                Select #8 - Merchants & Enter Amount & Merchant ID
                            </Text>

                        
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 17,
                                fontFamily: Fonts.InterRegular,
                                fontWeight:"bold",
                                color: '#000',
                                marginTop: 3
                            }}>
                                256379010
                            </Text>

                            <Text style={styles.uidTxt}>
                                and finalize payment.
                            </Text>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => {
                                    CloseModal();
                                }}
                            >
                                <Text style={styles.submitBtnTxt}>Close</Text>
                            </TouchableOpacity>
                        </>

                    </View>
                </View>
            </Modal>

            <StatusBar
                translucent={false}
                barStyle="light-content"
                backgroundColor="#0F393B"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 2

    },
    headerImage: {
        width: '100%',
        height: 100,
    },
    body: {
        flex: 1,
        paddingBottom: 10,
    },
    _tag_line: {
        fontFamily: Fonts.OpenSansBold,
        color: '#000000',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 6,
    },


    line: {
        height: 1,
        backgroundColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },

    back_btn: {
        backgroundColor: '#C20202',
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        elevation: 10,
        borderRadius: 8,
    },
    back_btn_txt: {
        color: '#fff',
        fontFamily: Fonts.InterBold,
        fontSize: 10,
    },

    sendScreenShotBtn: {
        backgroundColor: '#42B85C',
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        elevation: 10,
        marginTop: 15, borderRadius: 10
    },
    sendScreenShotBtnTxt: {
        fontFamily: Fonts.InterBold,
        fontSize: 13,
        color: '#000',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Fonts.InterBold,
        color: '#54595E',
    },
    contract: {
        width: '30%',
        fontFamily: Fonts.InterRegular,
        fontSize: 12,
    },

    downloadTxt: {
        color: '#1EA3CD',
        fontSize: 12,
        fontFamily: Fonts.InterRegular,
        marginTop: 10,
    },
    uidTxt: {
        textAlign: 'center',
        fontSize: 11,
        fontFamily: Fonts.InterRegular,
        marginTop: 5,
        color: '#000',
    },
    idTxt: {
        fontSize: 18,
        fontFamily: Fonts.InterRegular,
        marginVertical: 6,
    },
    copyAndPost: {
        fontSize: 12,
        fontFamily: Fonts.InterRegular,
    },
    submitBtn: {
        width: '90%',
        backgroundColor: '#2F8E44',
        height: 37,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    submitBtnTxt: {
        color: '#fff',
        fontFamily: Fonts.InterBold,
    },
    otpInput: {
        width: '90%',
        backgroundColor: '#fff',
        height: 30,
        alignSelf: 'center',
        borderRadius: 10,
        fontFamily: Fonts.InterRegular,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#CCD2E3',
        width: '85%',
        height: 250,
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 5,
    },


});
