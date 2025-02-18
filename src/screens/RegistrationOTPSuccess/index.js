import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';


import Fonts from '../../config/Fonts';

export default function RegistrationOTPSuccess(props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>
					<Text style={styles.referral_txt}>OTP Verification Successful !</Text>
					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() =>
							props.navigation.navigate('SetNewPin', {
								welcomeScreen: props.route.params?.welcomeScreen,
							})
						}
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
		// marginTop: 25,
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
		fontSize: 16,
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
		marginVertical: 30,
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
});
