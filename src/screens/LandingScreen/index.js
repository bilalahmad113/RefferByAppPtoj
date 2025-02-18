import React, { useEffect } from 'react';
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
import { WithLocalSvg } from 'react-native-svg/css';
import { AntDesign, Feather } from '@expo/vector-icons';


import Fonts from '../../config/Fonts';

export default function Landing(props) {
	
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

	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/logo.svg')} />
					</View>
					<View style={styles.line}></View>
		
						<View style={styles.regulatorNoticeContainer}>
							<AntDesign name="exclamationcircle" size={24} color="gray" />

							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.InterBold,
									textAlign: 'center',
									color: 'gray',
									marginHorizontal: 40,
									marginBottom: 10,
								}}
							>
								Please take note that we are in the Product Testing phase
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.InterBold,
									textAlign: 'center',
									color: 'gray',
								}}
							>
								The ReferredBy App and its functionalities is available to
								pre-approved test groups only, while we await Namfisa Fintech
								Regulations.
							</Text>

							<Text
								style={{
									fontSize: 14,
									fontFamily: Fonts.InterBold,
									textAlign: 'center',
									marginTop: 20,
									color: 'gray',
								}}
							>
								For more info on joining test groups, please contact us at
								support@referredby.com.na.
							</Text>

							<TouchableOpacity
								style={styles.signup_btn}
								onPress={() => props.navigation.navigate('Login')}
							>
								<Text style={styles.signup_btn_txt}>Proceed</Text>
							</TouchableOpacity>
							<View style={{ marginTop: 30 }}>
								<View style={styles.alreadySec}>
									<Text style={styles.alreadyTxt}>No Yet Registered - </Text>
									<TouchableOpacity
										onPress={() => props.navigation.navigate('Signup')}
									>
										<Text style={styles.clickHereTxt}>Click Here</Text>
									</TouchableOpacity>
								</View>
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
