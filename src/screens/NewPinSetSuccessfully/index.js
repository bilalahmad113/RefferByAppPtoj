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

export default function NewPinSetSuccessfully(props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>
					<Text style={styles.referral_txt}>New Pin Set Successfully !</Text>
					<Text style={styles.welcomeTxt}>Welcome to Simplicity!</Text>
					<Text style={styles.messageTxt1}>
						You will be able to acess rest of the features once your account has
						been approved, this may take 30 mins - 24 hours.
					</Text>
					<Text style={styles.messageTxt1}>
						As employment verification may not be possible during weekends,
						verification process is done only during weekdays during working
						hours.
					</Text>
					<Text style={styles.messageTxt2}>
						After your account is verified, you are able to access Level 1 loan
						facility by a click of a button anywhere, anytime, anyday and
						recieve funds within 30 minutes.
					</Text>

					<Text style={styles.messageTxt2}>
						If you are verified member already and just doing a PIN Reset,
						please disregard the above Welcome Message and notices.
					</Text>

					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() => props.navigation.navigate('VerifiedProfile')}
					>
						<Text style={styles.signup_btn_txt}>Go to PROFILE</Text>
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
		marginTop: 30,
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
		marginTop: 10,
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
	welcomeTxt: {
		color: '#000000',
		fontFamily: Fonts.OpenSansBold,
		fontSize: 24,
		textAlign: 'center',
		marginTop: 15,
	},
	messageTxt1: {
		fontFamily: Fonts.InterRegular,
		textAlign: 'center',
		fontSize: 10,
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
	messageTxt2: {
		fontFamily: Fonts.InterSemiBold,
		textAlign: 'center',
		fontSize: 10,
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
});
