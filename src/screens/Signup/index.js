import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import {
	Clipboard,
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
import axios from 'axios';


import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import ProgressBar from '../../Components/ProgressBar';


export default function Signup(props) {
	const [ReferralCode, onChangeText] = React.useState('');
	const [showRegulatorNotice, setShowRegulatorNotice] = React.useState(true);
	const [showProgressBar, setShowProgressBar] = React.useState(false);

	// const InitToken = async () => {
	// 	var IsFirstTime = await SecureStore.getItemAsync('IsFirstTime');

	// 	if (IsFirstTime == '' || IsFirstTime == undefined) {
	// 		await SecureStore.setItemAsync('IsFirstTime', 'True');
	// 		await SecureStore.setItemAsync('Pin', '31052020');
	// 		await SecureStore.setItemAsync(
	// 			'token',
	// 			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzY2QxZDg3NS02ZmYyLTQxMjEtOTIyNS03ZTE3MzViNTI0M2MiLCJVc2VyTG9naW5JZCI6IjEiLCJVc2VySW5mb0lkIjoiMSIsIlJvbGUiOiIxIiwiZXhwIjoxNjk3Njk0OTc4LCJpc3MiOiJhcGkucmVmZXJyZWRieS5jb20iLCJhdWQiOiJhcGkucmVmZXJyZWRieS5jb20ifQ.RkKKvfIglMYv0HlsvFnVf4k77qk_cLoXSCcUKSe6epU'
	// 		);
	// 	}
	// 	var Pin = await SecureStore.getItemAsync('Pin');
	// 	if (Pin != '' && Pin != null) {
	// 		props.navigation.navigate('Login');
	// 	}
	// };

	// useEffect(() => {
	// 	InitToken();
	// }, []);

	const fetchCopiedText = async () => {
		const text = await Clipboard.getString();
		onChangeText(text);
	};

	const SignupCommand = async () => {
		setShowProgressBar(true)
		if (ReferralCode == null || ReferralCode == '') {
			setShowProgressBar(false)
			alert('Please enter referral code.');
			return;
		}

		var formBody = { ReferralCode: ReferralCode };
		fetch(API_URL + '/api/Login/App/SignUp/CheckRefrral', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log("responseJson:", responseJson)
				if (responseJson.statusCode == 200) {
					setShowProgressBar(false)
					// props.navigation.navigate('PersonalInfo', {
					// 	ReferralCode: ReferralCode,
					// });
					props.navigation.navigate('UploadDocs', {
						ReferralCode: ReferralCode,
					});
				} else {
					console.log("elseError")
					setShowProgressBar(false)
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error("catchErro", error);
				setShowProgressBar(false)
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

					<Text style={styles.referral_txt}>Referral Code</Text>
					<View style={styles._input_view}>
						<TouchableOpacity onPress={() => fetchCopiedText()}>
							<MaterialCommunityIcons
								name="file"
								size={24}
								color="#C4C4C4"
							/>
						</TouchableOpacity>
						<TextInput
							maxLength={50}
							placeholder="Referral Code"
							onChangeText={onChangeText}
							value={ReferralCode}
							style={styles._input}
						/>
					</View>
					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() => SignupCommand()}
					>
						<Text style={styles.signup_btn_txt}>SIGN UP</Text>
					</TouchableOpacity>

					<View style={{ marginTop: 30 }}>
						<View style={styles.alreadySec}>
							<Text style={styles.alreadyTxt}>Already Registered - </Text>
							<TouchableOpacity
								onPress={() => props.navigation.navigate('Login')}
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


					</View>

				</ScrollView>

			</View>


			<Text style={styles._botom_txt}>Version 1.0.0.1</Text>

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
		// justifyContent: 'center',
		// alignItems: 'center',
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
		marginTop: 40,
		alignSelf: 'center',
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
	},
	_input_view: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		height: 45,
		alignItems: 'center',
		borderWidth: 5,
		borderColor: '#F4DC01',
		marginTop: 10,
		paddingHorizontal: 5,
		alignSelf: 'center',
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
		marginTop: 40,
		textAlign: 'center',
	},
	_input: {
		flex: 1,
		marginLeft: 10,
		fontFamily: Fonts.PoppinsRegular,
	},
	_botom_txt: {
		fontSize: 10,
		textAlign: 'center',
		position: 'absolute',
		bottom: 10,
		width: '100%',
		color: '#000000',
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
