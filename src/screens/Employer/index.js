import React from 'react';
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
import Fonts from '../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';

const Item = Picker.Item;


export default function Employer(props) {
	const [ReferralCode, onReferralCodet] = React.useState(props.route.params.ReferralCode);
	const [Gender, onChangeText] = React.useState(props.route.params.Gender);
	const [SurName, onSurName] = React.useState(props.route.params.SurName);
	const [FullName, onFullName] = React.useState(props.route.params.FullName);
	const [IdNumber, onIdNumber] = React.useState(props.route.params.IdNumber);
	const [MobileNumber, onMobileNumber] = React.useState(
		props.route.params.MobileNumber
	);
	const [Region, onRegion] = React.useState(props.route.params.Region);
	const [ResidentialTown, onResidentialTown] = React.useState(
		props.route.params.ResidentialTown
	);
	const [StreetName, onStreetName] = React.useState(
		props.route.params.StreetName
	);
	const [PhysicalAddress, onPhysicalAddress] = React.useState(
		props.route.params.PhysicalAddress
	);

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
	const [sourceoffund, setSourceOfFund] = React.useState('');



	const SignupCommand = () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (EmpEmailAddress == null || EmpEmailAddress == '') {
			alert('Please Enter Email Address.');
			return;
		}

		if (reg.test(EmpEmailAddress) === false) {
			alert('Email is Not Correct.');
			return;
		}

		if (EmpName == null || EmpName == '') {
			alert('Please Enter Employer Name.');
			return;
		}

		if (EmpOccupation == null || EmpOccupation == '') {
			alert('Please Enter Employer Occupation.');
			return;
		}
		if (sourceoffund == null || sourceoffund == '') {
			alert('Please select source of fund.');
			return;
		}

		if (EmpOffieNumber == null || EmpOffieNumber == '') {
			alert('Please Enter Employer Office Number.');
			return;
		}

		if (EmpNextOfKinFullName == null || EmpNextOfKinFullName == '') {
			alert('Please Enter Next of Kin Full Name.');
			return;
		}

		if (EmpNextOfKinSurName == null || EmpNextOfKinSurName == '') {
			alert('Please Enter Next of Kin  Surname.');
			return;
		}

		if (EmpRelationship == null || EmpRelationship == '') {
			alert('Please Enter Employer Relationship.');
			return;
		}

		if (EmpNextOfKinMobileNumber == null || EmpNextOfKinMobileNumber == '') {
			alert('Please Enter Next of Kin Mobile Number.');
			return;
		}

		if (EmpPoBox == null || EmpPoBox == '') {
			alert('Please Enter Employee P.O. Box.');
			return;
		}

		if (EmpCode == null || EmpCode == '') {
			alert('Please Enter Employee Code.');
			return;
		}

		

		// props.navigation.navigate('UploadDocs', {
		props.navigation.navigate('UploadSelfie', {
			ReferralCode: ReferralCode,
			Region: Region,
			Gender: Gender,
			SurName: SurName,
			FullName: FullName,
			IdNumber: IdNumber,
			MobileNumber: MobileNumber,
			ResidentialTown: ResidentialTown,
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
			DocNationalIdentityCard: props.route.params.DocNationalIdentityCard,
			DocPoliceDeclaration: props.route.params.DocPoliceDeclaration,
			DocPayslip: props.route.params.DocPayslip,
			DocNationalIdentityCardName: props.route.params.DocNationalIdentityCardName,
			DocPayslipName: props.route.params.DocPayslipName,
			DocPoliceDeclarationName: props.route.params.DocPoliceDeclarationName,
			sourceOfFund:sourceoffund
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<KeyboardAwareScrollView>

					<Text style={styles._tag_line}>EMPLOYER & NEXT OF KIN</Text>
					<View style={{ marginTop: 15 }}>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Email Address</Text>
							<TextInput
								maxLength={255}
								onChangeText={onEmpEmailAddress}
								value={EmpEmailAddress}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Employer Name</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpName}
								value={EmpName}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Occupation</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpOccupation}
								value={EmpOccupation}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
								<Text style={styles.referral_txt}>SOURCE OF FUNDS</Text>

								<View style={styles._inputpicker}>
									<Picker
										selectedValue={sourceoffund}
										onValueChange={source => setSourceOfFund(source)}
									>
										<Item label="Select Source Of Fund" value="" />
										<Item label="Salary" value="Salary" />
										<Item label="Business Income" value="Business Income" />
										<Item label="Investment Income" value="Investment Income" />
										<Item label="Savings" value="Savings" />
										<Item label="Inheritance" value="Inheritance" />
										<Item label="Loans" value="Loans" />
										<Item label="Pension & Retirement" value="Pension & Retirement" />
										<Item label="Insurance Payout" value="Insurance Payout" />
										<Item label="Social Grants & Scholarships" value="Social Grants & Scholarships" />
										
									</Picker>
								</View>
							</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Employer Office Number</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpOffieNumber}
								keyboardType="number-pad"
								value={EmpOffieNumber}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Next of Kin : Full Name</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpNextOfKinFullName}
								value={EmpNextOfKinFullName}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Next of Kin : Surname</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpNextOfKinSurName}
								value={EmpNextOfKinSurName}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Relationship</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpRelationship}
								value={EmpRelationship}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>
								Next of Kin : Mobile Number
							</Text>
							<TextInput
								maxLength={25}
								keyboardType="number-pad"
								onChangeText={onEmpNextOfKinMobileNumber}
								value={EmpNextOfKinMobileNumber}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>P.O. Box</Text>
							<TextInput
								maxLength={50}
								onChangeText={onEmpPoBox}
								value={EmpPoBox}
								style={styles._input}
							/>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Employee Code</Text>
							<TextInput
								maxLength={25}
								onChangeText={onEmpCode}
								value={EmpCode}
								style={styles._input}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() => SignupCommand()}
					>
						<Text style={styles.signup_btn_txt}>PROCEED</Text>
					</TouchableOpacity>
					</KeyboardAwareScrollView>
				</ScrollView>
			</View>

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
		fontFamily: Fonts.OpenSansBold,
		color: '#000000',
		textAlign: 'center',
		fontSize: 25,
		marginTop: 15,
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
		marginTop: 5,
		width: '90%',
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
	},
	_input: {
		flex: 1,
		fontFamily: Fonts.InterRegular,
		flexDirection: 'row',
		backgroundColor: '#C4C4C4',
		width: '100%',
		height: 29,
		alignItems: 'center',
		borderColor: '#F4DC01',
		paddingHorizontal: 10,
		alignSelf: 'center',
		marginTop: 10,
		fontSize: 12,
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
	_inputpicker: {
		backgroundColor: '#C4C4C4',
		width: '100%',
		borderColor: '#F4DC01',
		marginTop: 10,
	}
});
