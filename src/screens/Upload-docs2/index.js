import React, { useEffect } from 'react';
import {
	Linking,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';

export default function UploadDocs2(props) {
	const [DocPayslip, onDocPayslip] = React.useState('');
	const [DocPayslipName, onDocPayslipName] = React.useState('');

	const [DocPoliceDeclaration, onDocPoliceDeclaration] = React.useState('');
	const [DocPoliceDeclarationName, onDocPoliceDeclarationName] = React.useState('');


	const [DocNationalIdentityCard, onDocNationalIdentityCard] = React.useState('');
	const [DocNationalIdentityCardName, onDocNationalIdentityCardName] = React.useState('');

	const [payrollDeduction, setPayrollDeduction] = React.useState('');
	const [payrollDeductionname, setPayrollDeductionName] = React.useState('');


	const SignupCommand = () => {
		if (DocNationalIdentityCard == null || DocNationalIdentityCard == '') {
			alert('Please select National Identification Card.');
			return;
		}

		if (DocPayslip == null || DocPayslip == '') {
			alert('Please select Payslip.');
			return;
		}

		if (DocPoliceDeclaration == null || DocPoliceDeclaration == '') {
			alert('Please select Police/ Commisioner of Oath Declaration.');
			return;
		}

		props.navigation.navigate('UploadSelfie2', {
			DocNationalIdentityCard: DocNationalIdentityCard,
			DocNationalIdentityCardName: DocNationalIdentityCardName,
			DocPayslip: DocPayslip,
			DocPayslipName: DocPayslipName,
			DocPoliceDeclaration: DocPoliceDeclaration,
			DocPoliceDeclarationName: DocPoliceDeclarationName,
			PayRollDeductionDoc: payrollDeduction,
			PayRollDeductionName: payrollDeductionname,
		});
	};

	// useEffect(() => {
	// 	(async () => {
	// 		if (Platform.OS !== 'web') {
	// 			const { status } =
	// 				await ImagePicker.requestMediaLibraryPermissionsAsync();
	// 			if (status !== 'granted') {
	// 				alert('Sorry, we need camera roll permissions to make this work!');
	// 			}
	// 		}
	// 	})();
	// }, []);

	const pickImage1 = async () => {
		// let result = await DocumentPicker.getDocumentAsync({});
		// if (result.mimeType == 'application/pdf') {
		// 	const base64 = await FileSystem.readAsStringAsync(result.uri, {
		// 		encoding: 'base64',
		// 	});
		// 	onDocNationalIdentityCard(base64);
		// 	onDocNationalIdentityCardName(result.name);
		// } else {
		// 	alert('Please select only pdf.');
		// }

		let result = await DocumentPicker.getDocumentAsync({});
		if (!result.canceled) {
			// Split the mimeType value by '/'
			const mimeTypeParts = result.assets[0].mimeType.split('/');
			// Get the first part, which is the desired word "image"
			const imageWord = mimeTypeParts[0];

			if (result.assets[0].mimeType == 'application/pdf' || imageWord == 'image') {
				let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
					encoding: "base64",
				});
				console.log("Base::::", base64)
				onDocNationalIdentityCard(base64);
				onDocNationalIdentityCardName(result.assets[0].name);
			} else {
				alert('Please select only pdf.');
			}
		} else {
			console.log("no image select")
		}
	};

	const pickImage2 = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		// if (result.mimeType == 'application/pdf') {
		// 	const base64 = await FileSystem.readAsStringAsync(result.uri, {
		// 		encoding: 'base64',
		// 	});
		// 	onDocPayslip(base64);
		// 	onDocPayslipName(result.name);
		// } else {
		// 	alert('Please select only pdf.');
		// }

		if (!result.canceled) {
			// Split the mimeType value by '/'
			const mimeTypeParts = result.assets[0].mimeType.split('/');
			// Get the first part, which is the desired word "image"
			const imageWord = mimeTypeParts[0];

			if (result.assets[0].mimeType == 'application/pdf' || imageWord == 'image') {
				let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
					encoding: "base64",
				});
				onDocPayslip(base64);
				onDocPayslipName(result.assets[0].name);
			} else {
				alert('Please select only pdf.');
			}
		} else {
			console.log("no image select")
		}
	};

	const pickImage3 = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		// if (result.mimeType == 'application/pdf') {
		// 	const base64 = await FileSystem.readAsStringAsync(result.uri, {
		// 		encoding: 'base64',
		// 	});
		// 	onDocPoliceDeclaration(base64);
		// 	onDocPoliceDeclarationName(result.name);
		// } else {
		// 	alert('Please select only pdf.');
		// }

		if (!result.canceled) {
			// Split the mimeType value by '/'
			const mimeTypeParts = result.assets[0].mimeType.split('/');
			// Get the first part, which is the desired word "image"
			const imageWord = mimeTypeParts[0];

			if (result.assets[0].mimeType == 'application/pdf' || imageWord == 'image') {
				let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
					encoding: "base64",
				});
				onDocPoliceDeclaration(base64);
				onDocPoliceDeclarationName(result.assets[0].name);
			} else {
				alert('Please select only pdf.');
			}
		} else {
			console.log("no image select")
		}
	};
	const pickImage4 = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		if (!result.canceled) {
			// Split the mimeType value by '/'
			const mimeTypeParts = result.assets[0].mimeType.split('/');
			// Get the first part, which is the desired word "image"
			const imageWord = mimeTypeParts[0];

			if (result.assets[0].mimeType == 'application/pdf' || imageWord == 'image') {
				let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
					encoding: "base64",
				});
				setPayrollDeduction(base64);
				setPayrollDeductionName(result.assets[0].name);
			} else {
				alert('Please select only pdf.');
			}
		} else {
			console.log("no image select")
		}
	};


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
					<Text style={styles._tag_line}>UPLOAD REQUIRED DOCUMENTS</Text>
					<View style={{ marginTop: 15 }}>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>
								National Identification Card
							</Text>
							<View style={styles.uploadFileBtn}>
								<TouchableOpacity
									style={styles.chooseFileBtn}
									onPress={() => pickImage1()}
								>
									<Text style={styles.chooseFileBtnTxt}>CHOOSE FILE</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.referral_txt}>
								{DocNationalIdentityCardName}
							</Text>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Payslip</Text>
							<View style={styles.uploadFileBtn}>
								<TouchableOpacity
									style={styles.chooseFileBtn}
									onPress={() => pickImage2()}
								>
									<Text style={styles.chooseFileBtnTxt}>CHOOSE FILE</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.referral_txt}>{DocPayslipName}</Text>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>
								Police/ Commisioner of Oath Declaration
							</Text>
							<View style={styles.uploadFileBtn}>
								<TouchableOpacity
									style={styles.chooseFileBtn}
									onPress={() => pickImage3()}
								>
									<Text style={styles.chooseFileBtnTxt}>CHOOSE FILE</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.referral_txt}>
								{DocPoliceDeclarationName}
							</Text>
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>
								Payroll Deduction Form (For Employer Groups Only)
							</Text>
							<View style={styles.uploadFileBtn}>
								<TouchableOpacity
									style={styles.chooseFileBtn}
									onPress={() => pickImage4()}
								>
									<Text style={styles.chooseFileBtnTxt}>CHOOSE FILE</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.referral_txt}>
								{payrollDeductionname}
							</Text>
						</View>
						{/* <Text style={styles.text}>
							Police/ Commisioner of Oath Declaration Form:
						</Text>
						<TouchableOpacity
							title="Police/ Commisioner of Oath Declaration Form"
							onPress={() => {
								Linking.openURL(API_URL + '/files/Affadative.pdf');
							}}
							style={styles.downloadBtn}
						>
							<Text style={styles.downloadBtnTxt}>DOWNLOAD FORM</Text>
						</TouchableOpacity> */}
						<View style={{ flexDirection: "row", marginTop: 1, marginHorizontal: 20, justifyContent: "space-between", }}>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL('https://www.referredby.com.na/_files/ugd/d2b0ed_6d05414a39f14d8286098f167acfb71c.pdf');
								}}
								style={{
									backgroundColor: '#fff',
									width: "47%",
									height: 35,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
									borderWidth: 2,
									borderColor: '#2F9564',
									alignSelf: 'center',
									elevation: 10,
									marginTop: 20, padding: 1, marginRight: 5
								}}
							>
								<Text style={styles.downloadBtnTxt}>Police Declaration</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									Linking.openURL('https://www.referredby.com.na/_files/ugd/d2b0ed_89dad49ac8fe46d3a1acf47eb58aa361.pdf');
								}}
								style={{
									backgroundColor: '#fff',
									width: "47%",
									height: 35,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
									borderWidth: 2,
									borderColor: '#2F9564',
									alignSelf: 'center',
									elevation: 10,
									marginTop: 20, padding: 1, marginLeft: 5
								}}
							>
								<Text style={styles.downloadBtnTxt}>Payroll Deduction</Text>
							</TouchableOpacity>

						</View>
						<TouchableOpacity
							style={{
								backgroundColor: props.route.params.Status == 'DE' ? 'rgba(194, 2, 2, 0.8)' : "#A8A8A8",
								// backgroundColor: "#A8A8A8",
								width: '80%',
								height: 45,
								borderRadius: 8,
								justifyContent: 'center',
								alignItems: 'center',
								elevation: 10,
								marginTop: 20,
								alignSelf: 'center',
							}}
							onPress={() => {props.navigation.navigate('ReUploadDocs')}}
							disabled={props.route.params.Status != 'DE' ? true : false}
						// disabled ={!Status == 'DE'}
						>
							<Text style={styles.signup_btn_txt}>RE- EDIT APPLICATION</Text>
						</TouchableOpacity>

					</View>
					<Text style={styles.text2}>
						All these form will be valid for 6 months only , afterwhich they
						must all be renewed and re-uploaded.
					</Text>

					<TouchableOpacity
						style={{
							backgroundColor: props.route.params.Status == 'DE' ? "#A8A8A8" : '#110339',
							width: '80%',
							height: 45,
							borderRadius: 8,
							justifyContent: 'center',
							alignItems: 'center',
							elevation: 10,
							marginTop: 20,
							alignSelf: 'center',
						}}
						disabled={props.route.params.Status == 'DE'}
						onPress={() => SignupCommand()}
					>
						<Text style={styles.signup_btn_txt}>PROCEED</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.back_btn}
						onPress={() => props.navigation.goBack()}
					>
						<Text style={styles.back_btn_txt}>BACK</Text>
					</TouchableOpacity>

					<Text style={styles.text1}>
						Please make sure all required documents are uploaded for immediate
						approval.
					</Text>
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
		marginTop: 20,
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
		fontFamily: Fonts.InterRegular,
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
	uploadFileBtn: {
		backgroundColor: '#110339d8',
		height: 48,
		justifyContent: 'center',
		paddingHorizontal: 10,
		elevation: 3,
		borderRadius: 2,
		marginTop: 10,
	},
	chooseFileBtn: {
		backgroundColor: '#fff',
		width: 80,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 64 / 2,
		borderWidth: 2,
		borderColor: '#2F9564',
	},
	chooseFileBtnTxt: {
		color: '#2F9564',
		fontSize: 8,
	},
	downloadBtn: {
		backgroundColor: '#fff',
		width: '60%',
		height: 33,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#2F9564',
		alignSelf: 'center',
		elevation: 10,
		marginTop: 20,
	},
	downloadBtnTxt: {
		color: '#2F9564',
		fontSize: 12,
		fontFamily: Fonts.InterBold,
	},
	text: {
		fontFamily: Fonts.InterRegular,
		textAlign: 'center',
		marginTop: 20,
		fontSize: 13,
	},
	text1: {
		fontFamily: Fonts.InterRegular,
		textAlign: 'center',
		marginTop: 20,
		fontSize: 13,
		width: '90%',
		alignSelf: 'center',
	},
	text2: {
		fontFamily: Fonts.InterRegular,
		textAlign: 'center',
		marginTop: 20,
		fontSize: 11,
		width: '90%',
		alignSelf: 'center',
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
});
