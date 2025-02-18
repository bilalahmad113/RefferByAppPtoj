import React, { useEffect } from 'react';
import {
	ActivityIndicator,
	Alert,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import { themeComponentColor } from '../../Components/Colors';
import { useCart } from '../../Components/contaxtt/cartcontext';

const canApplyLoanUserStatus = ['AP2'];
const canApplyLoanLoanStatus = ['NR', 'PU', 'DE'];

const canViewLinkToCommunityUserStatus = ['AP', 'AA2', 'AP2'];
const canViewReferralsUserStatus = ['AP', 'AA2', 'AP2'];

export default function VerifiedProfile(props) {
	const { updateProfileData } = useCart();

	const [UserData, onUserData] = React.useState({});
	const [UserUID, onUserUID] = React.useState('');
	const [ReferralCode, onReferralCode] = React.useState('');
	const [SurName, onSurName] = React.useState('');
	const [FullName, onFullName] = React.useState('');
	const [IdNumber, onIdNumber] = React.useState('');
	const [MobileNumber, onMobileNumber] = React.useState('');
	const [Region, onRegion] = React.useState('');
	const [ResidentialTown, onResidentialTown] = React.useState('');
	const [StreetName, onStreetName] = React.useState('');
	const [PhysicalAddress, onPhysicalAddress] = React.useState('');
	const [AccountMaximum, onAccountMaximum] = React.useState('');
	const [EmpEmailAddress, onEmpEmailAddress] = React.useState('');
	const [EmpName, onEmpName] = React.useState('');
	const [EmpOccupation, onEmpOccupation] = React.useState('');
	const [EmpOffieNumber, onEmpOffieNumber] = React.useState('');
	const [EmpNextOfKinFullName, onEmpNextOfKinFullName] = React.useState('');
	const [EmpNextOfKinSurName, onEmpNextOfKinSurName] = React.useState('');
	const [EmpRelationship, onEmpRelationship] = React.useState('');
	const [EmpNextOfKinMobileNumber, onEmpNextOfKinMobileNumber] = React.useState('');
	const [EmpPoBox, onEmpPoBox] = React.useState('');
	const [EmpCode, onEmpCode] = React.useState('');
	const [DocNationalIdentityCard, onDocNationalIdentityCard] = React.useState('');
	const [DocPayslip, onDocPayslip] = React.useState('');
	const [DocPoliceDeclaration, onDocPoliceDeclaration] = React.useState('');
	const [DocSelfieID, onDocSelfieID] = React.useState('');
	const [DocumentDate, onDocumentDate] = React.useState('');
	const [isLoanRequestButton, onisLoanRequestButton] = React.useState('');
	const [DueDate, onDueDate] = React.useState('');
	const [OutstandingDate, onOutstandingDate] = React.useState('');
	const [BlockDate, onBlockDate] = React.useState('');
	const [InterestPer, onInterestPer] = React.useState('0');
	const [Status, onStatus] = React.useState('');
	const [LoanStatus, onLoanStatus] = React.useState('');
	const [Level, onLevel] = React.useState('1');
	const [MinAmt, onMinAmt] = React.useState('300');
	const [MaxAmt, onMaxAmt] = React.useState('300');

	const [isLinkCommunityButtonEnabled, setIsLinkCommunityButtonEnabled] = React.useState()
	const [isLoanRequestButtonEnabled, setIsLoanRequestButtonEnabled] = React.useState()

	const [appLoading, setAppLoading] = React.useState(true)

	const PageInit = async () => {
		console.log("tt:", await SecureStore.getItemAsync('token'))

		fetch(API_URL + '/api/App/Profile', {
			method: 'GET',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(response => {
			console.log("response:", response)

			return response.json();
		}).then(responseJson => {
			console.log("responseJson:", responseJson)
				setAppLoading(false)
				onUserData(responseJson);
				onUserUID(responseJson.userUID);
				onReferralCode(responseJson.referralCode);
				onDocumentDate(responseJson.documentDate);
				onEmpCode(responseJson.empCode);
				onAccountMaximum(responseJson.accountMaximum);
				onIdNumber(responseJson.idNumber);
				onFullName(responseJson.fullName);
				onSurName(responseJson.surName);
				onisLoanRequestButton(responseJson.isLoanRequestButton);
				onInterestPer(responseJson.interestCharged);
				onDueDate(responseJson.dueDate);
				onOutstandingDate(responseJson.outstandingDate);
				onBlockDate(responseJson.blockDate);
				onStatus(responseJson.status);
				onMinAmt(responseJson.minAmt);
				onMaxAmt(responseJson.maxAmt);
				onLevel(responseJson.level);
				onLoanStatus(responseJson.loanStatus);
				setIsLinkCommunityButtonEnabled(responseJson.isLinkCommunityButtonEnabled);
				setIsLoanRequestButtonEnabled(responseJson.isLoanRequestButtonEnabled);
				updateProfileData(responseJson)
			})
			.catch(error => {
				console.error(error);
				setAppLoading(false)

			});
	};

	const isFocused = useIsFocused();

	useEffect(() => {
		PageInit();
	}, [isFocused]);

	const GoToReferrals = () => {
		// if (canViewReferralsUserStatus.includes(Status)) {
		// 	return;
		// }
		props.navigation.navigate('Referrals', { ReferralCode: ReferralCode });
	};

	const GoToChangePin = () => {
		Alert.alert(
			'Confirm',
			'Are you sure want to change PIN.?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: () => props.navigation.navigate('ForgotPassword'),
				},
			],
			{ cancelable: false }
		);
	};

	const GoToStatement = () => {
		if (Status == 'NP') {
			return;
		}
		props.navigation.navigate('Statement', { UserUID: UserUID });
	};

	const GoToLoanRequest = () => {
		// if (
		// 	!canApplyLoanLoanStatus.includes(LoanStatus) ||
		// 	!canApplyLoanUserStatus.includes(Status)
		// ) {
		// 	return;
		// }

		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();

		var LoanDate = date + '-' + month + '-' + year;

		props.navigation.navigate('Level1', {
			InterestPer: InterestPer,
			DueDate: DueDate,
			OutstandingDate: OutstandingDate,
			BlockDate: BlockDate,
			ReferralCode: ReferralCode,
			FullName: FullName,
			SurName: SurName,
			EmpCode: EmpCode,
			IdNumber: IdNumber,
			MinAmt: MinAmt,
			MaxAmt: MaxAmt,
			LoanDate: LoanDate,
			Level: Level,
			UserUID: UserUID,
			UserData: UserData,
			AccountMaximum: AccountMaximum
		});
	};

	const goToLinkToCommunity = () => {
		// if (canViewLinkToCommunityUserStatus.includes(Status)) {
		props.navigation.navigate('LinkToCommunity', {
			uid: UserData.uid,
			Status,
		});
		// }
	};

	return (

		<SafeAreaView style={styles.container}>
			{appLoading ?
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={themeComponentColor} size="large" />
				</View>
				:

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
							<TouchableOpacity
								onPress={() => props.navigation.navigate('Notifications')}
							>
								<Ionicons name="notifications" size={24} color="#C20202" />
							</TouchableOpacity>
						</View>
						<View style={styles._box}>
							<View style={styles.box_first_line}>
								<Text style={styles.box_first_line_txt}>Account Name</Text>
								<Text style={styles.box_first_line_value}>
									{FullName} {SurName}{' '}
								</Text>
							</View>
							<View style={styles.box_first_line}>
								<Text style={styles.box_first_line_txt}>Client ID</Text>
								<Text style={styles.box_first_line_value}>{IdNumber}</Text>
							</View>
							<View style={styles.box_first_line}>
								<Text style={styles.box_first_line_txt}>Account UID</Text>
								<Text style={styles.box_first_line_value}>{UserUID}</Text>
							</View>
							<View style={styles.box_first_line}>
								<Text style={styles.box_first_line_txt}>Account Max</Text>
								<Text style={styles.box_first_line_value}>
									NAD {AccountMaximum}
								</Text>
							</View>
							<View style={styles.box_first_line}>
								<Text style={styles.box_first_line_txt}>Account Level</Text>
								<Text style={styles.box_first_line_value}>{Level}</Text>
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
							<TouchableOpacity onPress={() => GoToChangePin()}>
								<Ionicons name="settings-sharp" size={24} color="#78909C" />
							</TouchableOpacity>

							<View style={{ flex: 1 }}>

								<TouchableOpacity
									style={styles.signup_btn}
									onPress={() => props.navigation.navigate('UploadDocs2', { Status: Status })}
								// onPress={() => console.log("stt:",Status)}

								>
									<Text style={styles.signup_btn_txt}>UPDATE DOCUMENTS</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={[styles.line, { width: '90%' }]}></View>

						<TouchableOpacity
							// style={
							// 	canApplyLoanUserStatus.includes(Status) &&
							// 	canApplyLoanLoanStatus.includes(LoanStatus)
							// 		? styles.signup_btn
							// 		: styles.signup_btn1
							// }
							style={isLoanRequestButtonEnabled ? styles.signup_btn : styles.signup_btn1}
							onPress={() => GoToLoanRequest()}
							// disabled={!canApplyLoanLoanStatus.includes(LoanStatus) &&
							// 	!canApplyLoanUserStatus.includes(Status)}>
							disabled={isLoanRequestButtonEnabled == true ? false : true}>
							<Text style={styles.signup_btn_txt}>REQUEST LOAN</Text>
						</TouchableOpacity>

						<TouchableOpacity
							// style={
							// 	canViewLinkToCommunityUserStatus.includes(Status)
							// 		? styles.signup_btn
							// 		: styles.signup_btn1
							// }
							style={isLinkCommunityButtonEnabled ? styles.signup_btn : styles.signup_btn1}

							onPress={() => goToLinkToCommunity()}
							// disabled = {isLinkCommunityButtonEnabled}
							disabled={isLinkCommunityButtonEnabled == true ? false : true}>

							<Text style={styles.signup_btn_txt}>LINK TO COMMUNITY</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={Status == 'AA' || Status == 'DE' ? styles.signup_btn1 : styles.signup_btn}
							onPress={() => GoToStatement()}
							disabled={Status == 'DE' ? true : false}

						>
							<Text style={styles.signup_btn_txt}>STATEMENT</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={Status == 'DE' ? styles.signup_btn1 : styles.signup_btn}
							onPress={() => GoToReferrals()}
							disabled={Status == 'DE' ? true : false}

						>
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
			}

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
		backgroundColor: '#110339',
		width: '85%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
		marginTop: 20,
		alignSelf: 'center',
	},

	signup_btn1: {
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
		fontFamily: Fonts.InterRegular,
		fontSize: 13,
		color: '#000',
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
});
