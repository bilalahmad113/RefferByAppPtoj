import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	BackHandler,
	Modal,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import ProgressBar from '../../Components/ProgressBar';

export default function Profile(props) {
	const [ReferralCode, onReferralCodet] = React.useState(
		props.route.params.ReferralCode
	);
	const [Gender, onChangeText] = React.useState(props.route.params.Gender);
	const [SurName, onSurName] = React.useState(props.route.params.SurName);
	const [FullName, onFullName] = React.useState(props.route.params.FullName);
	const [IdNumber, onIdNumber] = React.useState(props.route.params.IdNumber);
	const [MobileNumber, onMobileNumber] = React.useState(props.route.params.MobileNumber);
	const [Region, onRegion] = React.useState(props.route.params.Region);
	const [ResidentialTown, onResidentialTown] = React.useState(props.route.params.ResidentialTown);
	const [StreetName, onStreetName] = React.useState(props.route.params.StreetName);
	const [PhysicalAddress, onPhysicalAddress] = React.useState(props.route.params.PhysicalAddress);
	const [EmpEmailAddress, onEmpEmailAddress] = React.useState(props.route.params.EmpEmailAddress);
	const [EmpName, onEmpName] = React.useState(props.route.params.EmpName);
	const [EmpOccupation, onEmpOccupation] = React.useState(props.route.params.EmpOccupation);
	const [EmpOffieNumber, onEmpOffieNumber] = React.useState(props.route.params.EmpOffieNumber);
	const [EmpNextOfKinFullName, onEmpNextOfKinFullName] = React.useState(props.route.params.EmpNextOfKinFullName);
	const [EmpNextOfKinSurName, onEmpNextOfKinSurName] = React.useState(props.route.params.EmpNextOfKinSurName);
	const [EmpRelationship, onEmpRelationship] = React.useState(props.route.params.EmpRelationship);
	const [EmpNextOfKinMobileNumber, onEmpNextOfKinMobileNumber] = React.useState(props.route.params.EmpNextOfKinMobileNumber);
	const [EmpPoBox, onEmpPoBox] = React.useState(props.route.params.EmpPoBox);
	const [EmpCode, onEmpCode] = React.useState(props.route.params.EmpCode);
	const [DocNationalIdentityCard, onDocNationalIdentityCard] = React.useState(props.route.params.DocNationalIdentityCard);
	const [DocPayslip, onDocPayslip] = React.useState(props.route.params.DocPayslip);
	const [DocPoliceDeclaration, onDocPoliceDeclaration] = React.useState(props.route.params.DocPoliceDeclaration);
	const [DocSelfieID, onDocSelfieID] = React.useState(props.route.params.DocSelfieID);

	const [loading, setIsLoading] = React.useState(false);

	const [Otp, onOtp] = React.useState('');
	const [modalVisible, setModalVisible] = useState(true);
	const [DocumentDate, onDocumentDate] = React.useState('XX-XX-YYYY');

	const SignupOtpVerifyCommand = () => {
		console.log("SourceofFund:::", props.route.params.sourceOfFund)

		if (Otp == null || Otp == '') {
			alert('Please enter OTP.');
			return;
		}

		setIsLoading(true);

		// var formBody = {
		// 	ReferralCode: ReferralCode,
		// 	Gender: Gender,
		// 	SurName: SurName,
		// 	FullName: FullName,
		// 	IdNumber: IdNumber,
		// 	MobileNumber: MobileNumber,
		// 	Region: Region,
		// 	Town: ResidentialTown,
		// 	StreetName: StreetName,
		// 	PhysicalAddress: PhysicalAddress,
		// 	EmpEmailAddress: EmpEmailAddress,
		// 	EmpName: EmpName,
		// 	EmpOccupation: EmpOccupation,
		// 	EmpOffieNumber: EmpOffieNumber,
		// 	EmpNextOfKinFullName: EmpNextOfKinFullName,
		// 	EmpNextOfKinSurName: EmpNextOfKinSurName,
		// 	EmpRelationship: EmpRelationship,
		// 	EmpNextOfKinMobileNumber: EmpNextOfKinMobileNumber,
		// 	EmpPoBox: EmpPoBox,
		// 	EmpCode: EmpCode,
		// 	DocNationalIdentityCard: DocNationalIdentityCard,
		// 	DocPayslip: DocPayslip,
		// 	DocPoliceDeclaration: DocPoliceDeclaration,
		// 	DocSelfieID: DocSelfieID,
		// 	Otp: Otp,
		// 	DocNationalIdentityCardName:
		// 		props.route.params.DocNationalIdentityCardName,
		// 	DocPayslipName: props.route.params.DocPayslipName,
		// 	DocPoliceDeclarationName: props.route.params.DocPoliceDeclarationName,
		// 	DocSelfieIDName: props.route.params.DocSelfieIDName,
		// };

		var formBody = {
			ReferralCode: ReferralCode,
			Gender: Gender,
			SurName: SurName,
			FullName: FullName,
			IdNumber: IdNumber,
			MobileNumber: MobileNumber,
			Region: Region,
			Town: ResidentialTown,
			StreetName: StreetName,
			PhysicalAddress: PhysicalAddress,
			EmpEmailAddress: EmpEmailAddress,
			EmpName: EmpName,
			EmpOccupation: EmpOccupation,
			EmpOffieNumber: EmpOffieNumber,
			EmpNextOfKinFullName: EmpNextOfKinFullName,
			EmpNextOfKinSurName: EmpNextOfKinSurName,
			EmpRelationship: EmpRelationship,
			EmpNextOfKinMobileNumber: EmpNextOfKinMobileNumber,
			EmpPoBox: EmpPoBox,
			EmpCode: EmpCode,
			// DocNationalIdentityCard:
			// 	'JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3==',
			// DocPayslip:
			// 	'JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3==',
			// DocPoliceDeclaration:
			// 	'JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3==',
			// DocSelfieID:
			// 	'JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3==',
			DocNationalIdentityCard: DocNationalIdentityCard,
			DocPayslip: DocPayslip,
			DocPoliceDeclaration: DocPoliceDeclaration,
			DocSelfieID: DocSelfieID,

			Otp: Otp,
			DocNationalIdentityCardName:
				props.route.params.DocNationalIdentityCardName,
			DocPayslipName: props.route.params.DocPayslipName,
			DocPoliceDeclarationName: props.route.params.DocPoliceDeclarationName,
			DocSelfieIDName: props.route.params.DocSelfieIDName,
			sourceOfFund: props.route.params.sourceOfFund
		};
		console.log("farm", formBody)


		fetch(API_URL + '/api/Login/App/SignUp/Otp/Verify', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log("responseJson", responseJson)
				setIsLoading(false);
				if (responseJson.statusCode == 200) {
					jumpToItem(responseJson.entity);
				} else {
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert('Something went wrong, please try again later');
				setIsLoading(false);
				console.error(error);
			});
	};

	const jumpToItem = async Token => {
		await SecureStore.setItemAsync('token', Token);
		setModalVisible(false);
		props.navigation.navigate('RegistrationOTPSuccess');
	};

	const setModal = visible => {
		setModalVisible(!modalVisible);
	};

	useEffect(() => {
		const backAction = () => {
			Alert.alert(
				'Hold on!',
				'Are you sure want to cancel OTP verification, account registration has not yet been completed?',
				[
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{ text: 'YES', onPress: () => BackHandler.exitApp() },
				]
			);
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
			<ProgressBar visible={loading} text="SUBMITTING..." />

			<View style={styles.body}>
				<ScrollView>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
						}}
					>
						<Text style={styles._tag_line}>PROFILE</Text>
						<TouchableOpacity>
							<Ionicons name="notifications" size={24} color="#C20202" />
						</TouchableOpacity>
					</View>
					<View style={styles._box}>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Account Name</Text>
							<Text style={styles.box_first_line_value}>
								{FullName} {SurName}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Client ID</Text>
							<Text style={styles.box_first_line_value}>{IdNumber}</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Account UID</Text>
							<Text style={styles.box_first_line_value}>XXXXXXX</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Account Max</Text>
							<Text
								style={[
									styles.box_first_line_value,
									{
										color: '#DF3C3C',
										fontFamily: Fonts.InterBold,
										fontSize: 15,
									},
								]}
							>
								NAD 00.00
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Account Level</Text>
							<Text style={styles.box_first_line_value}>1</Text>
						</View>
						<View style={styles.line}></View>
					</View>
					<View style={styles.idSec}>
						<View style={styles.trems_and_conditions_sec}>
							<Text style={styles.trems_and_conditions}>ID</Text>
							<TouchableOpacity style={{ marginLeft: 10 }}>
								<FontAwesome5 name="square-full" size={15} color="#2F8E44" />
							</TouchableOpacity>
						</View>
						<View style={styles.trems_and_conditions_sec}>
							<Text style={styles.trems_and_conditions}>Payslip</Text>
							<TouchableOpacity style={{ marginLeft: 10 }}>
								<FontAwesome5 name="square-full" size={15} color="#2F8E44" />
							</TouchableOpacity>
						</View>
						<View style={styles.trems_and_conditions_sec}>
							<Text style={styles.trems_and_conditions}>Declaration</Text>
							<TouchableOpacity style={{ marginLeft: 10 }}>
								<FontAwesome5 name="square-full" size={15} color="#2F8E44" />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles._read_sec}>
						<View style={styles.trems_and_cond_sec}>
							<Text style={styles.readTxt}>Documents need to update on :</Text>
						</View>
						<View style={styles.trems_and_cond_sec}>
							<Text style={styles.dateTxt}>{DocumentDate}</Text>
						</View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							width: '90%',
							alignSelf: 'center',
							marginTop: 20,
						}}
					>
						<TouchableOpacity>
							<Ionicons name="settings-sharp" size={24} color="#78909C" />
						</TouchableOpacity>
						<View style={{ flex: 1 }}>
							<TouchableOpacity style={styles.update_btn}>
								<Text style={styles.signup_btn_txt}>UPDATE DOCUMENTS</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={[styles.line, { width: '90%' }]}></View>
					<TouchableOpacity style={styles.signup_btn}>
						<Text style={styles.signup_btn_txt}>REQUEST LOAN</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.signup_btn}>
						<Text style={styles.signup_btn_txt}>LINK TO COMMUNITY</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.signup_btn}>
						<Text style={styles.signup_btn_txt}>STATEMENT</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.signup_btn}>
						<Text style={styles.signup_btn_txt}>REFERRALS</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.back_btn}
						onPress={() => props.navigation.navigate('Login')}
					>
						<Text style={styles.back_btn_txt}>SIGN OUT</Text>
					</TouchableOpacity>
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
						<Text style={styles.modalText}>ENTER OTP</Text>
						<Text style={styles.uidTxt}>
							An OTP was sent to you via SMS please enter it here.
						</Text>

						<TextInput
							placeholder="Enter OTP"
							onChangeText={onOtp}
							value={Otp}
							style={styles.otpInput}
							secureTextEntry={true}
							keyboardType="number-pad"
						/>
						{/* <TouchableOpacity
							style={styles.submitBtn}
							onPress={() => console.log("SUBMITTING...")}
						// disabled={loading}
						>
							<Text style={styles.submitBtnTxt}>
								{loading ? 'SUBMITTING...' : 'SUBMIT OTP'}
							</Text>
						</TouchableOpacity> */}


						{/* {loading ?
							<TouchableOpacity
								style={styles.submitBtn}
								onPress={() => console.log("SUBMITTING...")}
							// disabled={loading}
							>
								<Text style={styles.submitBtnTxt}>
									SUBMITTING...
								</Text>
								<ActivityIndicator size={24} color="blue"  style={{marginLeft:5}}/>
							</TouchableOpacity>

							: */}

							<TouchableOpacity
								style={styles.submitBtn}
								onPress={() => SignupOtpVerifyCommand()}
							 	disabled={loading}
							>
								{!loading ? 
								<Text style={styles.submitBtnTxt}>SUBMIT OTP</Text>
								:
								// <Text style={styles.submitBtnTxt}>SUBMITTING</Text>
								<ActivityIndicator size="small" color="#fff" />
								}
							</TouchableOpacity>
						{/* } */}



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
		marginRight: 20,
	},
	signup_btn: {
		backgroundColor: '#C4C4C4',
		width: '85%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		marginTop: 20,
		alignSelf: 'center',
	},
	update_btn: {
		backgroundColor: '#110339',
		width: '70%',
		height: 39,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		alignSelf: 'center',
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
	},
	_input_view: {
		flexDirection: 'row',
		backgroundColor: '#E5E5E5',
		width: '90%',
		height: 45,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		paddingHorizontal: 5,
		alignSelf: 'center',
		elevation: 10,
	},
	line: {
		height: 1,
		backgroundColor: 'gray',
		width: '100%',
		alignSelf: 'center',
		marginVertical: 8,
	},
	referral_txt: {
		fontSize: 12,
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
	},
	_input: {
		flex: 1,
		marginLeft: 10,
		fontFamily: Fonts.PoppinsRegular,
	},

	_min_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		textAlign: 'center',
		marginTop: 10,
	},
	_box: {
		paddingHorizontal: '5%',
	},
	box_first_line: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 3,
	},
	box_first_line_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 14,
		color: '#000',
		width: '45%',
	},
	box_first_line_value: {
		fontFamily: Fonts.InterRegular,
		fontSize: 14,
		color: '#000',
		flex: 1,
	},
	_read_sec: {
		width: '90%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	trems_and_cond_sec: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	readTxt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
	},
	dateTxt: {
		fontFamily: Fonts.InterBold,
		fontSize: 13,
		color: '#C20202',
	},
	trems_and_cond_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#1d8bf7',
	},
	trems_and_conditions_sec: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	trems_and_conditions: {
		fontFamily: Fonts.InterRegular,
		fontSize: 16,
		color: '#000',
	},
	back_btn: {
		backgroundColor: 'rgba(194, 2, 2, 0.8)',
		width: '50%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 39,
		borderRadius: 8,
		marginVertical: 10,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 14,
	},
	idSec: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		alignSelf: 'center',
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
		height: 189,
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
		fontSize: 11,
		fontFamily: Fonts.InterRegular,
		marginTop: 5,
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
		marginTop: 20,flexDirection:"row"
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
});
