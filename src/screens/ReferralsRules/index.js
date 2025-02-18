import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	Clipboard,
	Modal,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Fonts from '../../config/Fonts';
import { API_URL } from '../../config/api-config';
import * as SecureStore from 'expo-secure-store';
import ProgressBar from '../../Components/ProgressBar';

export default function ReferralsRules(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [signupCode, setSignupCode] = useState('');
	const [showProgressBar, setShowProgressBar] = React.useState(false);
	const setModal = visible => {
		setModalVisible(!modalVisible);
	};

	const copyToClipboard = () => {
		Clipboard.setString(signupCode);
		setModalVisible(false);
	};

	const GetReferralCode = async () => {
		try {
		  const response = await fetch(API_URL+'/api/User/GetSignupCode', {
			method: 'GET',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		  });
		  
		  const data = await response.json();
	
		  if (response.ok) {
			setModalVisible(true);
			setShowProgressBar(false);
			const code = data.signupCode;
			setSignupCode(code);
			console.log('Signup Code:', code);
		  } else {
			console.error('API call failed:', data);
		  }
		} catch (error) {
		  console.error('Network error:', error);
		}
	  };
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles._tag_line}>REFERRAL_RULES</Text>

					<View style={styles._box}>
						<Text style={styles.ruleHeaing}>RULE 1:</Text>
						<Text style={[styles.ruleHeaing, { marginTop: 10 }]}>
							DON’T GIVE YOUR REFERRAL CODE TO ANYONE YOU DONT KNOW OR THAT IS
							UNRELIABLE AND FINANCIAL INCAPABLE OF REPAYING. THIER BEHAVIOUR
							EFFECTS YOUR ACCOUNT.
						</Text>
						<View style={styles.line}></View>
						<View style={{ marginTop: 15 }}>
							<View style={styles.ruleSec}>
								<FontAwesome name="circle" size={5} color="black" />
								<Text style={styles.ruleTxt}>
									Your account needs to be FULLY paid up + the required amount
									of referrals need to be registered under your UID code to
									advance to next allowable loan advance.
								</Text>
							</View>
							<View style={styles.ruleSec}>
								<FontAwesome name="circle" size={5} color="black" />
								<Text style={styles.ruleTxt}>
									If there is any{' '}
									<Text style={{ fontFamily: Fonts.InterBold }}>
										Blocked or Outstanding Referral{' '}
									</Text>
									under your referrals you will be downgraded 1 level , make
									sure the people you refer are reliable
								</Text>
							</View>
							<View style={styles.ruleSec}>
								<FontAwesome name="circle" size={5} color="black" />
								<Text style={styles.ruleTxt}>
									If there is any{' '}
									<Text style={{ fontFamily: Fonts.InterBold }}>
										Blocked or Outstanding Referral{' '}
									</Text>
									under you, YOU will not be allowed to take any loan advance
									until your referrals has paid the outstanding amount.
								</Text>
							</View>
							<View style={styles.ruleSec}>
								<FontAwesome name="circle" size={5} color="black" />
								<Text style={styles.ruleTxt}>
									If your own account becomes outstanding, you will be
									downgraded to LEVEL 1 and blocked until you make the required
									payments.
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignSelf: 'center',
							alignItems: 'flex-end',
							marginTop: 20,
						}}
					>
						<TouchableOpacity
							style={styles.signup_btn}
							onPress={() => {setShowProgressBar(true); GetReferralCode()}}
						>
							<Text style={styles.signup_btn_txt}>REQUEST CODE</Text>
						</TouchableOpacity>
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
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Ionicons
							name="checkmark-circle-outline"
							size={50}
							color="#2F8E44"
						/>
						<Text style={styles.modalText}>Referral Code</Text>
						<TouchableOpacity>
							<Text style={styles.downloadTxt}>
								{signupCode}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.submitBtn}
							onPress={() => copyToClipboard()}
						>
							<Text style={styles.submitBtnTxt}>Copy</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<StatusBar
				translucent={false}
				barStyle="light-content"
				backgroundColor="#0F393B"
			/>
			<ProgressBar visible={showProgressBar} text="Please wait" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	headerImage: {
		width: '100%',
		height: 100,
	},
	body: {
		flex: 1,
	},
	_tag_line: {
		fontFamily: Fonts.OpenSansBold,
		color: '#000000',
		textAlign: 'center',
		fontSize: 28,
		marginTop: 6,
	},
	signup_btn: {
		backgroundColor: '#155824',
		width: '30%',
		height: 30,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},
	line: {
		height: 1,
		backgroundColor: 'gray',
		width: '100%',
		alignSelf: 'center',
		marginTop: 15,
	},
	_box: {
		backgroundColor: '#f5f5f5',
		width: '90%',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		alignSelf: 'center',
		elevation: 2,
		paddingHorizontal: '2%',
		paddingVertical: 30,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '30%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		elevation: 10,
		borderRadius: 8,
		marginLeft: 20,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},
	ruleHeaing: {
		textAlign: 'center',
		fontFamily: Fonts.InterSemiBold,
	},
	ruleSec: {
		flexDirection: 'row',
		marginTop: 5,
	},
	ruleTxt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
		marginLeft: 5,
		flex: 1,
		marginTop: -5,
	},
	ruleNumber: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
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
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
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
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		marginTop: 20,
	},
	idTxt: {
		fontSize: 18,
		fontFamily: Fonts.InterRegular,
		marginVertical: 6,
	},
	copyAndPost: {
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		marginTop: 10,
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
});
