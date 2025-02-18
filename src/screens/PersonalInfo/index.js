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

import { Picker } from '@react-native-picker/picker';

import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Item = Picker.Item;

export default function PersonalInfo(props) {
	const [ReferralCode, onReferralCode] = React.useState(
		props.route.params.ReferralCode
	);
	const [Gender, onGender] = React.useState('Male');
	const [SurName, onSurName] = React.useState('');
	const [FullName, onFullName] = React.useState('');
	const [IdNumber, onIdNumber] = React.useState('');
	const [MobileNumber, onMobileNumber] = React.useState('');
	const [Region, onRegion] = React.useState('');
	const [ResidentialTown, onResidentialTown] = React.useState('');
	const [StreetName, onStreetName] = React.useState('');
	const [PhysicalAddress, onPhysicalAddress] = React.useState('');

	const SignupCommand = () => {
		if (SurName == null || SurName == '') {
			alert('Please enter surname.');
			return;
		}

		if (FullName == null || FullName == '') {
			alert('Please enter fullname.');
			return;
		}

		if (IdNumber == null || IdNumber == '') {
			alert('Please enter Id Number.');
			return;
		}

		if (MobileNumber == null || MobileNumber == '') {
			alert('Please enter mobile number.');
			return;
		}

		if (Region == null || Region == '') {
			alert('Please enter region.');
			return;
		}

		if (ResidentialTown == null || ResidentialTown == '') {
			alert('Please enter residential town.');
			return;
		}

		if (StreetName == null || StreetName == '') {
			alert('Please enter street name.');
			return;
		}

		if (PhysicalAddress == null || PhysicalAddress == '') {
			alert('Please enter physical address.');
			return;
		}

		if (Gender == null || Gender == '') {
			alert('Please select gender.');
			return;
		}

		var formBody = {
			// ReferralCode: ReferralCode,
			ReferralCode: props.route.params.ReferralCode,
			Region: Region,
			Gender: Gender,
			SurName: SurName,
			FullName: FullName,
			IdNumber: IdNumber,
			MobileNumber: MobileNumber,
			ResidentialTown: ResidentialTown,
			StreetName: StreetName,
			PhysicalAddress: PhysicalAddress,
		};

		fetch(API_URL + '/api/Login/App/SignUp/CheckMobile', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		}).then(response => response.json())
			.then(responseJson => {
				if (responseJson.statusCode == 200) {
					props.navigation.navigate('Employer', {
						// ReferralCode: ReferralCode,
						ReferralCode: props.route.params.ReferralCode,
						DocNationalIdentityCard: props.route.params.DocNationalIdentityCard,
						DocPoliceDeclaration: props.route.params.DocPoliceDeclaration,
						DocPayslip: props.route.params.DocPayslip,
						DocNationalIdentityCardName: props.route.params.DocNationalIdentityCardName,
						DocPayslipName: props.route.params.DocPayslipName,
						DocPoliceDeclarationName: props.route.params.DocPoliceDeclarationName,
						Region: Region,
						Gender: Gender,
						SurName: SurName,
						FullName: FullName,
						IdNumber: IdNumber,
						MobileNumber: MobileNumber,
						ResidentialTown: ResidentialTown,
						StreetName: StreetName,
						PhysicalAddress: PhysicalAddress,
					});
				} else {
					alert(responseJson.message);
				}
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
					<KeyboardAwareScrollView>
						<Text style={styles._tag_line}>PERSONAL INFORMATION</Text>
						<View style={{ marginTop: 15 }}>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Surname</Text>
								<TextInput
									maxLength={25}
									onChangeText={onSurName}
									value={SurName}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Full Names</Text>
								<TextInput
									maxLength={25}
									onChangeText={onFullName}
									value={FullName}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>ID Number</Text>
								<TextInput
									maxLength={25}
									onChangeText={onIdNumber}
									value={IdNumber}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Mobile Number</Text>
								<TextInput
									maxLength={25}
									onChangeText={onMobileNumber}
									keyboardType="number-pad"
									value={MobileNumber}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Region</Text>

								<View style={styles._inputpicker}>
									<Picker
										selectedValue={Region}
										onValueChange={Region => onRegion(Region)}
									>
										<Item label="Select Region" value="" />
										<Item label="Zambezi" value="Zambezi" />
										<Item label="Erongo" value="Erongo" />
										<Item label="Hardap" value="Hardap" />
										<Item label="Kavango West" value="Kavango West" />
										<Item label="Kavango East" value="Kavango East" />
										<Item label="Kharas" value="Kharas" />
										<Item label="Khomas" value="Khomas" />
										<Item label="Kunene" value="Kunene" />
										<Item label="Ohangwena" value="Ohangwena" />
										<Item label="Omaheke" value="Omaheke" />
										<Item label="Omusati" value="Omusati" />
										<Item label="Oshana" value="Oshana" />
										<Item label="Oshikoto" value="Oshikoto" />
										<Item label="Otjozondjupa" value="Otjozondjupa" />
									</Picker>
								</View>
							</View>

							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Residential Town</Text>
								<TextInput
									maxLength={25}
									onChangeText={onResidentialTown}
									value={ResidentialTown}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Street Name</Text>
								<TextInput
									maxLength={25}
									onChangeText={onStreetName}
									value={StreetName}
									style={styles._input}
								/>
							</View>
							<View style={styles._input_view}>
								<Text style={styles.referral_txt}>Physical Address (Erf)</Text>
								<TextInput
									maxLength={50}
									onChangeText={onPhysicalAddress}
									value={PhysicalAddress}
									style={styles._input}
								/>
							</View>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 20,
								}}
							>
								<View style={styles.maleSec}>
									<Text style={styles.maleTxt}>Male</Text>
									<TouchableOpacity
										style={styles.radioBtn}
										onPress={() => onGender('Male')}
									>
										{Gender === 'Male' ? (
											<View style={styles.selectedRadioBtn}></View>
										) : null}
									</TouchableOpacity>
								</View>
								<View style={styles.maleSec}>
									<Text style={styles.maleTxt}>Female</Text>
									<TouchableOpacity
										style={styles.radioBtn}
										onPress={() => onGender('Female')}
									>
										{Gender === 'Female' ? (
											<View style={styles.selectedRadioBtn}></View>
										) : null}
									</TouchableOpacity>
								</View>
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

	_inputpicker: {
		backgroundColor: '#C4C4C4',
		width: '100%',
		borderColor: '#F4DC01',
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
	maleSec: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 20,
	},
	radioBtn: {
		backgroundColor: '#C4C4C4',
		width: 19,
		height: 19,
		borderRadius: 19 / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
	},
	selectedRadioBtn: {
		backgroundColor: '#110339',
		width: 10,
		height: 10,
		borderRadius: 14 / 2,
	},
	maleTxt: {
		color: '#000000',
		fontFamily: Fonts.InterSemiBold,
		fontSize: 11,
	},
});
