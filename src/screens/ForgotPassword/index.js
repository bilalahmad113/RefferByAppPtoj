import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
	Linking,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';

export default function ForgotPassword(props) {
	const [MobileNumber, onMobileNumber] = useState(false);
	const [Otp, onOtp] = useState('');
	const [showOtpInput, setShowOtpInput] = useState(false);
	const [loading, setLoading] = useState(false);

	const SignupCommand = () => {
		if (MobileNumber == null || MobileNumber == '') {
			alert('Please enter mobile number.');
			return;
		}
		setLoading(true);
		var formBody = { MobileNumber: MobileNumber };
		fetch(API_URL + '/api/Login/App/ForgotPin/Create', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.statusCode == 200) {
					setLoading(false);
					setShowOtpInput(true);
					alert(responseJson.message);
				} else {
					setLoading(false);
					alert(responseJson.message);
				}
			})
			.catch(error => {
				setLoading(false);
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	const OtpVerify = () => {
		if (Otp == null || Otp == '') {
			alert('Please enter OTP.');
			return;
		}

		var formBody = { MobileNumber: MobileNumber, Otp: Otp };
		fetch(API_URL + '/api/Login/App/ForgotPin/Verify', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.statusCode == 200) {
					jumpToItem(responseJson.entity);
				} else {
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	const jumpToItem = async Token => {
		await SecureStore.setItemAsync('token', Token);
		props.navigation.navigate('RegistrationOTPSuccess', {
			welcomeScreen: false,
		});
	};

	const openWhatsApp = () => {
		// const url = 'https://wa.me/264857384666';
		let msg = "hi, ";
		let phoneWithCountryCode = "+264857384666";

		let url = "whatsapp://send?text=" + msg + "&phone=" + phoneWithCountryCode;

		Linking.openURL(url)
			.then((data) => {
				console.log("WhatsApp Opened");
			}).catch(() => {
				Alert.alert(
					"Information",
					"Make sure WhatsApp installed on your device",
					[
						{
							text: "OK",
							onPress: () => {
								console.log("Ok")
							}
						},
					]
				);

			});

	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>

					{showOtpInput ? (
						<>
							<View style={{ marginTop: 15 }}>
								<View style={styles._input_view}>
									<Text style={styles.referral_txt}>Enter OTP</Text>
									<TextInput
										maxLength={6}
										onChangeText={onOtp}
										value={Otp}
										style={styles._input}
										secureTextEntry={true}
										keyboardType="number-pad"
									/>
								</View>
							</View>
							<TouchableOpacity
								style={styles.signup_btn}
								onPress={() => OtpVerify()}
							>
								<Text style={styles.signup_btn_txt}>SUBMIT OTP</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<View style={{ marginTop: 15 }}>
								<View style={styles._input_view}>
									<Text style={styles.referral_txt}>Mobile Number</Text>
									<TextInput
										maxLength={13}
										onChangeText={onMobileNumber}
										value={MobileNumber}
										style={styles._input}
										keyboardType="number-pad"
									/>
								</View>
							</View>
							<TouchableOpacity
								style={loading ? styles.signup_btn_disabled : styles.signup_btn}
								onPress={() => SignupCommand()}
								disabled={loading}
							>
								<Text style={styles.signup_btn_txt}>
									{loading ? 'SENDING OTP...' : 'SEND OTP'}
								</Text>
							</TouchableOpacity>
						</>
					)}
					<View style={{ marginTop: 15 }}>
						<View style={styles.alreadySec}>
							<Text style={styles.alreadyTxt}>Not Yet Registered - </Text>
							<TouchableOpacity
								onPress={() => props.navigation.navigate('Signup')}
							>
								<Text style={styles.clickHereTxt}>Click Here</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.alreadySec}>
							<Text style={styles.alreadyTxt}>Back to Login - </Text>
							<TouchableOpacity
								onPress={() => props.navigation.navigate('Login')}
							>
								<Text style={styles.clickHereTxt}>Click Here</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.alreadySec}>
						<Text style={{
							fontSize: 12,
							color: '#000', fontWeight: "bold"
						}}>Talk to an Agent - </Text>
						<TouchableOpacity
							onPress={openWhatsApp}
						>
							<Text style={styles.clickHereTxt}>Click Here</Text>
						</TouchableOpacity>
					</View>
					</View>
				</ScrollView>
			</View>
			<View style={styles.alreadySec}>
				<TouchableOpacity
					title="Terms of Service"
					onPress={() => {
						Linking.openURL(
							'https://www.referredby.com.na/terms-of-service'
						);
					}}
				>
					<Text style={styles.clickHereTxt}>Terms of Service</Text>
				</TouchableOpacity>
				<Text> | </Text>
				<TouchableOpacity
					title="Privacy Policy"
					onPress={() => {
						Linking.openURL(
							'https://www.referredby.com.na/privacy-policy'
						);
					}}
				>
					<Text style={styles.clickHereTxt}> Privacy Policy</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles._botom_txt}>Version 1.0.0.1</Text>

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
		marginTop: 80,
	},
	headerImage: {
		width: '100%',
		height: 100,
	},
	body: {
		flex: 1,
	},
	_tag_line: {
		fontFamily: Fonts.PoppinsBold,
		color: '#000000',
		textAlign: 'center',
	},
	signup_btn: {
		backgroundColor: '#110339',
		width: '80%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		marginTop: 25,
		alignSelf: 'center',
	},
	signup_btn_disabled: {
		backgroundColor: '#C4C4C4',
		width: '80%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		marginTop: 25,
		alignSelf: 'center',
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
	},
	_input_view: {
		marginTop: 20,
	},
	line: {
		height: 1,
		backgroundColor: '#000000',
		width: '90%',
		marginTop: 20,
		alignSelf: 'center',
	},
	referral_txt: {
		fontSize: 10,
		textAlign: 'center',
	},
	_input: {
		flex: 1,
		fontFamily: Fonts.PoppinsRegular,
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		height: 45,
		alignItems: 'center',
		borderWidth: 5,
		borderColor: '#F4DC01',
		paddingHorizontal: 10,
		alignSelf: 'center',
		marginTop: 5,
	},
	_botom_txt: {
		fontSize: 10,
		textAlign: 'center',
		width: '100%',
		color: '#000000',
		marginBottom: 10,
	},
	alreadySec: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	clickHereTxt: {
		fontSize: 12,
		color: 'dodgerblue',
	},
	alreadyTxt: {
		fontSize: 12,
	},
});
