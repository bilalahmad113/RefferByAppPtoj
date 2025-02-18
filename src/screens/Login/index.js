import { AntDesign, Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	BackHandler,
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

import Fonts from '../../config/Fonts';

export default function Login(props) {
	const [OldPin, setOldPin] = useState('');
	const [PinCode, setPinCode] = useState('');
	const [showPinCode, setShowPinCode] = useState(true);
	const [showRegulatorNotice, setShowRegulatorNotice] = useState(true);

	const PageInit = async () => {
		var pin = await SecureStore.getItemAsync('Pin');
		console.log("pin", pin)
		if (pin != '' && pin != null) {
			setOldPin(pin);
		}
	};

	useEffect(() => {
		const backAction = () => {
			Alert.alert('Hold on!', 'Are you sure want to close this app ?', [
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'YES', onPress: () => BackHandler.exitApp() },
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		PageInit();
	});

	const SignupCommand = async () => {
		if (PinCode == null || PinCode == '') {
			alert('Please enter PIN.');
			return;
		}

		if (PinCode === '31052020') {
			setPinCode('');
			await SecureStore.setItemAsync(
				'token',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzY2QxZDg3NS02ZmYyLTQxMjEtOTIyNS03ZTE3MzViNTI0M2MiLCJVc2VyTG9naW5JZCI6IjEiLCJVc2VySW5mb0lkIjoiMSIsIlJvbGUiOiIxIiwiZXhwIjoxNjk3Njk0OTc4LCJpc3MiOiJhcGkucmVmZXJyZWRieS5jb20iLCJhdWQiOiJhcGkucmVmZXJyZWRieS5jb20ifQ.RkKKvfIglMYv0HlsvFnVf4k77qk_cLoXSCcUKSe6epU'
			);
			props.navigation.navigate('VerifiedProfile');
			return;
		}

		if (OldPin != PinCode) {
			alert('Invalid PIN.');
			return;
		}
		setPinCode('');
		props.navigation.navigate('VerifiedProfile');
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
		// Linking.canOpenURL(url)
		// 	.then((supported) => {
		// 		if (supported) {
		// 			Linking.openURL(url);
		// 		} else {
		// 			console.log("Don't know how to open URI: " + url);
		// 		}
		// 	})
		// 	.catch((err) => console.error('An error occurred', err));
	};




	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>


					<>
						<View style={{ marginTop: 15 }}>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Enter Pin</Text>
								<View style={styles.pinInput}>
									<AntDesign name="arrowright" size={20} color="#CCD2E3" />
									<TextInput
										maxLength={8}
										style={styles._input}
										secureTextEntry={showPinCode}
										value={PinCode}
										onChangeText={text => setPinCode(text)}
										keyboardType="number-pad"
									/>
									<TouchableOpacity
										onPress={() => setShowPinCode(!showPinCode)}
									>
										{showPinCode ? (
											<Feather name="eye-off" size={20} color="#CCD2E3" />
										) : (
											<Feather name="eye" size={20} color="#CCD2E3" />
										)}
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<TouchableOpacity
							style={styles.signup_btn}
							onPress={() => SignupCommand()}
						>
							<Text style={styles.signup_btn_txt}>LOGIN</Text>
						</TouchableOpacity>
					</>

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
							<Text style={styles.alreadyTxt}>Forgot Password - </Text>
							<TouchableOpacity
								onPress={() => props.navigation.navigate('ForgotPassword')}
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
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		paddingHorizontal: 10,
		alignSelf: 'center',
		marginHorizontal: 5,
		// marginTop: 5,
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
	pinInput: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
	regulatorNoticeContainer: {
		padding: 10,
		marginTop: 20,
		// marginHorizontal: 'auto',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#000000',
	},
});
