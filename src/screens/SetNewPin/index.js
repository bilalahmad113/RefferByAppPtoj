import { AntDesign, Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
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

export default function SetNewPin(props) {
	const [pinCode, setPinCode] = useState('');
	const [rePinCode, setRePinCode] = useState('');
	const [showPinCode, setShowPinCode] = useState(true);
	const [showRePinCode, setShowRePinCode] = useState(true);

	const SignupCommand = async () => {
		if (pinCode == null || pinCode == '') {
			alert('Please Enter New Pin.');
			return;
		}

		if (rePinCode == null || rePinCode == '') {
			alert('Please Re - Enter New Pin.');
			return;
		}

		if (pinCode != rePinCode) {
			alert('New Pin and Re New Pin is Missmatch.');
			return;
		}

		await SecureStore.setItemAsync('Pin', rePinCode);
		props.navigation.navigate('NewPinSetSuccessfully');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>
					<View style={{ marginTop: 15 }}>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Enter New Pin</Text>
							<View style={styles.pinInput}>
								<AntDesign name="arrowright" size={20} color="#CCD2E3" />
								<TextInput
									maxLength={6}
									style={styles._input}
									secureTextEntry={showPinCode}
									value={pinCode}
									onChangeText={text => setPinCode(text)}
									keyboardType="number-pad"
								/>
								<TouchableOpacity onPress={() => setShowPinCode(!showPinCode)}>
									{showPinCode ? (
										<Feather name="eye-off" size={20} color="#CCD2E3" />
									) : (
										<Feather name="eye" size={20} color="#CCD2E3" />
									)}
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Re - Enter New Pin</Text>
							<View style={styles.pinInput}>
								<AntDesign name="arrowright" size={20} color="#CCD2E3" />
								<TextInput
									maxLength={6}
									style={styles._input}
									secureTextEntry={showRePinCode}
									value={rePinCode}
									onChangeText={text => setRePinCode(text)}
									keyboardType="number-pad"
								/>
								<TouchableOpacity
									onPress={() => setShowRePinCode(!showRePinCode)}
								>
									{showRePinCode ? (
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
						<Text style={styles.signup_btn_txt}>SET NEW PIN</Text>
					</TouchableOpacity>
				</ScrollView>
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
		// justifyContent: "center",
		// alignItems: "center",
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
		fontFamily: Fonts.InterBold,
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
		marginTop: 10,
	},
});
