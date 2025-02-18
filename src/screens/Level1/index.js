import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
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
// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';

export default function Level1(props) {
	console.log("props.route.params.",props.route.params)
	const [Otp, setOtp] = useState('');
	const [Amount, setAmount] = useState(0);
	const [InterestPer, setInterestPer] = useState(
		props.route.params.InterestPer
	);
	const [InterestAmount, setInterestAmount] = useState(0);
	const [TotalAmount, setTotalAmount] = useState(0);

	const [DueDate, setDueDate] = useState(props.route.params.DueDate);
	const [OutstandingDate, setOutstandingDate] = useState(
		props.route.params.OutstandingDate
	);
	const [BlockDate, setBlockDate] = useState(props.route.params.BlockDate);

	const [tremsAndCondions, setTremsAndCondions] = useState(false);
	const [cotract, setCotract] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [showRequestSuccess, setShowRequestSuccess] = useState(false);

	useEffect(() => {
		const backAction = () => {
			Alert.alert(
				'Hold on!',
				'Are you sure want to cancel loan request, loan request has not yet been completed?',
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

	const OpenDigitalContract = () => {
		props.navigation.navigate('DigitalContract', {
			Amount: Amount,
			InterestPer: InterestPer,
			InterestAmount: InterestAmount,
			IdNumber: props.route.params.IdNumber,
			FullName: props.route.params.FullName,
			SurName: props.route.params.SurName,
			EmpCode: props.route.params.EmpCode,
			LoanDate: props.route.params.LoanDate,
			DueDate: DueDate,
			OutstandingDate: OutstandingDate,
			BlockDate: BlockDate,
			UserUID: props.route.params.UserUID,
		});
	};

	const OpenTermsConditions = () => {
		props.navigation.navigate('TermsConditions', {
			Amount: Amount,
			UserData: props.route.params.UserData,
		});
	};

	const submitCommand = async () => {
		if (Amount == null || Amount == '') {
			alert('Please enter Amount.');
			return;
		}

		if (!tremsAndCondions) {
			alert('Please Read Loan Terms.');
			return;
		}

		if (!cotract) {
			alert('Please Read Digital Loan Contract.');
			return;
		}

		if (parseFloat(Amount) < parseFloat(props.route.params.MinAmt)) {
			alert('Minimum loan amount is NAD ' + props.route.params.MinAmt + ' !');
			return;
		}

		if (parseFloat(Amount) > parseFloat(props.route.params.AccountMaximum)) {
			alert(
				'Your Account Maximum limit is ' +
					props.route.params.AccountMaximum 
					
			);
			return;
		}

		if (parseFloat(Amount) > parseFloat(props.route.params.MaxAmt)) {
			alert(
				'Maximum loan amount for level ' +
					props.route.params.Level +
					' is NAD ' +
					props.route.params.MaxAmt +
					' !'
			);
			return;
		}

		var formBody = { Amount: Amount };
		fetch(API_URL + '/api/App/LoanRequest/Otp/Create', {
			method: 'POST',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.statusCode == 200) {
					setModalVisible(true);
				} else {
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	const OtpVerifyCommand = async () => {
		if (Otp == null || Otp == '') {
			alert('Please enter OTP.');
			return;
		}

		var formBody = {
			Amount: Amount,
			Otp: Otp,
			InterestAmount: InterestAmount,
			DueDate: DueDate,
			OutstandingDate: OutstandingDate,
			BlockDate: BlockDate,
			Otp: Otp,
		};
		fetch(API_URL + '/api/App/LoanRequest/Otp/Verify', {
			method: 'POST',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.statusCode == 200) {
					setShowRequestSuccess(true);
				} else {
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	const CloseModal = () => {
		setShowRequestSuccess(false);
		setModalVisible(false);
		alert(
			'Your loan request has been successfully sent to the queue for processing. You will be notified of progress via sms!'
		);
		props.navigation.navigate('Login');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles._tag_line}>REQUEST LOAN</Text>
					<View style={styles.logo}>
						<WithLocalSvg
							asset={require('../../../assets/emtylogo.svg')}
							width={100}
							height={60}
						/>
					</View>

					<Text style={styles.referral_txt}>
						ACCOUNT LEVEL : {props.route.params.Level}
					</Text>
					<View style={styles._input_view}>
						<TextInput
							maxLength={4}
							onChangeText={setAmount}
							value={Amount}
							style={styles._input}
							keyboardType="number-pad"
						/>
					</View>
					<Text style={styles._min_txt}>
						Min : NAD {props.route.params.MinAmt} - Max : NAD{' '}
						{props.route.params.MaxAmt}
					</Text>
					<View style={styles._box}>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Interest (%)</Text>
							<Text style={styles.box_first_line_txt}>% {InterestPer}</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Interest (NAD)</Text>
							<Text style={styles.box_first_line_txt}>
								{(Amount * InterestPer) / 100}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>
								Total Repayable ( NAD )
							</Text>
							<Text style={styles.box_first_line_value}>
								{(Amount * InterestPer) / 100 + parseFloat(Amount)}
							</Text>
						</View>
						<View style={styles.line}></View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Due Date :</Text>
							<Text style={styles.box_first_line_value}>{DueDate}</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Outstanding Date :</Text>
							<Text style={styles.box_first_line_txt}>{OutstandingDate}</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Block Date :</Text>
							<Text style={styles.box_first_line_txt}>{BlockDate}</Text>
						</View>
					</View>
					<View style={styles._read_sec}>
						<View style={styles.trems_and_cond_sec}>
							<Text style={styles.readTxt}>READ: </Text>
							<TouchableOpacity onPress={() => OpenTermsConditions()}>
								<Text style={styles.trems_and_cond_txt}>
									Digital Loan Contract
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.trems_and_cond_sec}>
							<Text style={styles.readTxt}>READ: </Text>
							<TouchableOpacity onPress={() => OpenDigitalContract()}>
								<Text style={styles.trems_and_cond_txt}>Loan Terms</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.trems_and_conditions_sec}>
						<TouchableOpacity
							onPress={() => setTremsAndCondions(!tremsAndCondions)}
						>
							{tremsAndCondions ? (
								<Ionicons name="checkbox-sharp" size={17} color="#2F8E44" />
							) : (
								<FontAwesome5 name="square-full" size={15} color="#2F8E44" />
							)}
						</TouchableOpacity>
						<Text style={styles.trems_and_conditions}>
							I have read and understood the Terms and Conditions
						</Text>
					</View>
					<View style={styles.trems_and_conditions_sec}>
						<TouchableOpacity onPress={() => setCotract(!cotract)}>
							{cotract ? (
								<Ionicons name="checkbox-sharp" size={17} color="#2F8E44" />
							) : (
								<FontAwesome5 name="square-full" size={15} color="#2F8E44" />
							)}
						</TouchableOpacity>
						<Text style={styles.trems_and_conditions}>
							I have read the contract and acknowledge that ticking this box and
							submitting request consitutes to a digital signature and thus a
							valid contract.
						</Text>
					</View>
				</ScrollView>
				<TouchableOpacity
					style={styles.signup_btn}
					onPress={() => submitCommand()}
				>
					<Text style={styles.signup_btn_txt}>SIGN & SUBMIT</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.back_btn}
					onPress={() => props.navigation.navigate('VerifiedProfile')}
				>
					<Text style={styles.back_btn_txt}>BACK</Text>
				</TouchableOpacity>
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
						{showRequestSuccess ? (
							<>
								<Ionicons
									name="checkmark-circle-outline"
									size={50}
									color="#2F8E44"
								/>
								<Text style={styles.modalText}>Request Successfull !</Text>
								<Text style={styles.uidTxt}>
									Your loan request has been successfully submitted.
								</Text>
								<Text style={styles.uidTxt}>
									Please wait 30 mintutes for feedback or disbursement to your
									mobile number on Paypulse
								</Text>
								<TouchableOpacity
									style={styles.submitBtn}
									onPress={() => {
										CloseModal();
									}}
								>
									<Text style={styles.submitBtnTxt}>CLOSE</Text>
								</TouchableOpacity>
							</>
						) : (
							<>
								<Text style={styles.modalText}>ENTER OTP</Text>
								<Text style={styles.uidTxt}>
									An OTP was sent to you via SMS please enter it here. OTP
									serves as a Digital Signature
								</Text>
								<TextInput
									maxLength={6}
									onChangeText={setOtp}
									value={Otp}
									placeholder="Enter OTP"
									style={styles.otpInput}
									secureTextEntry={true}
									keyboardType="number-pad"
								/>
								<TouchableOpacity
									style={styles.submitBtn}
									onPress={() => {
										OtpVerifyCommand();
									}}
								>
									<Text style={styles.submitBtnTxt}>SUBMIT OTP</Text>
								</TouchableOpacity>
							</>
						)}
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
		paddingBottom: 5,
	},
	_tag_line: {
		fontFamily: Fonts.OpenSansBold,
		color: '#000000',
		textAlign: 'center',
		fontSize: 28,
		marginTop: 6,
	},
	signup_btn: {
		backgroundColor: '#110339',
		width: '85%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		marginTop: 10,
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
		width: '90%',
		alignSelf: 'center',
		marginVertical: 10,
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
		backgroundColor: '#f5f5f5',
		width: '90%',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		alignSelf: 'center',
		elevation: 2,
		paddingHorizontal: '5%',
	},
	box_first_line: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5,
	},
	box_first_line_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
	},
	box_first_line_value: {
		fontFamily: Fonts.InterBold,
		fontSize: 12,
		color: '#000',
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
	trems_and_cond_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#1d8bf7',
	},
	trems_and_conditions_sec: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		marginTop: 10,
	},
	trems_and_conditions: {
		fontFamily: Fonts.InterRegular,
		fontSize: 10,
		flex: 1,
		marginLeft: 15,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '35%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 26,
		elevation: 10,
		borderRadius: 8,
		marginVertical: 10,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
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
});
