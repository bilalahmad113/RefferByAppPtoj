import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Item = Picker.Item;


const loadingState = {
	notLoading: 'notLoading',
	loading: 'loading',
	saving: 'saving',
};

const LinkToCommunity = props => {
	const [selectedValue, setSelectedValue] = useState('');
	const [communityList, setCommunityList] = useState([]);
	const [loading, setLoading] = useState(loadingState.loading);
	const [uploadPayrollDecEnable, setUploadPayrollDecEnable] = useState(false);
	const [currentStatus, setCurrentStatus] = useState({
		groupUID: '',
	});
	const [payrollDedectionForm, setPayrollDeductionForm] = React.useState('');
	const [payrollDeductionFormName, setPayrollDeductionFormName] = React.useState('');

	const getCommunityList = async () => {
		try {
			const response = await axios.get(API_URL + '/api/Group/List', {
				headers: {
					Authorization: await SecureStore.getItemAsync('token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			setCommunityList(response.data);
			setLoading(loadingState.notLoading);
		} catch (error) {
			console.log(error);
			setCommunityList([{ groupUid: '', name: 'Select Community' }]);
			setLoading(loadingState.notLoading);
		}
	};

	const getCurrentStatus = async () => {
		try {
			const response = await axios.get(
				API_URL + `/api/Group/Status/${props.route.params.uid}`,
				{
					headers: {
						Authorization: await SecureStore.getItemAsync('token'),
					},
				}
			);
			setCurrentStatus(response.data);
			setSelectedValue(response.data.groupUID);
			setLoading(loadingState.notLoading);
		} catch (error) {
			console.log(error);
			setLoading(loadingState.notLoading);
		}
	};

	let Status = '';

	Status = props?.route?.params?.Status || '';

	const isFocused = useIsFocused();

	useEffect(() => {
		getCommunityList();
		getCurrentStatus();
	}, [isFocused]);

	const handleRequestToLink = async () => {
		if (!selectedValue) {
			alert('Please select a community');
			return;
		}

		setLoading(loadingState.saving);

		//  console.log({ USERID: props.route.params.uid, GROUPUID: selectedValue });
		axios
			.post(
				API_URL + '/api/Group/Link',
				{
					groupId: selectedValue,
					userId: props.route.params.uid,
					payRollDeductionDoc: payrollDedectionForm
				},
				{
					headers: {
						Authorization: await SecureStore.getItemAsync('token'),
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			.then(response => {
				alert('Request sent successfully');
				setLoading(loadingState.notLoading);
				props.navigation.navigate('VerifiedProfile');
			})
			.catch(error => {
				let statusname
				 statusname = communityList.find(
					item => item.groupUID === currentStatus.groupUID
				)?.name || ''
				console.log(error.response.data.message);
				setLoading(loadingState.notLoading);
				
				alert(
					`You cannot request to link to another group at this time as you are currently actively linked to ${statusname}, settle all due loans to be deactivated from this Lending Community`
				);
			});
	};
	const pickImage1 = async () => {


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
				setPayrollDeductionForm(base64);
				setPayrollDeductionFormName(result.assets[0].name);
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
				<ScrollView
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<KeyboardAwareScrollView>

						<Text style={styles._tag_line}>LINK TO  COMMUNITY</Text>
						<View
							style={{
								flexDirection: 'column',
								marginVertical: 20,
								alignItems: 'center',
								justifyContent: 'flex-start',


							}}
						>
							<View style={styles._input_view}>

								{/* <View style={styles._inputpicker}> */}
								{/* <Picker
										// selectedValue={sourceoffund}
										onValueChange={source => console.log(aa)}
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
								 */}
								<Picker
									enabled={Status === 'AP' || Status === 'DE2' ? true : false}
									selectedValue={selectedValue}
									//  style={{
										
									// 	// height: 50,
									// 	// width: 300,
									// 	// borderWidth: 2,
									// 	// elevation: 10,
									// 	// borderColor: '#fff',
									// 	// backgroundColor: '#d1ebef',
									// 	// marginBottom: 50,
									// 	// borderRadius: 15,
									// }}
									style={Platform.OS === 'android' ? styles.androidPickerStyle : null}

									onValueChange={(itemValue, itemIndex) => {
										setSelectedValue(itemValue);
										{
											communityList.map((item, index) => {
												if (item.groupUID == itemValue) {
													setUploadPayrollDecEnable(item.isPayrollDecRequired)
												}
											})
										}
									}}
								>
									{communityList.map((item, index) => (
										<Picker.Item
											key={index}
											label={item.name}
											value={item.groupUID}
										/>
									))}
								</Picker>

								{/* </View> */}
							</View>
							{/* <View style={styles._inputpicker}>

						<Picker
							enabled={Status === 'AP' || Status === 'AP2' ? true : false}
							selectedValue={selectedValue}
							style={{
								height: 50,
								width: 300,
								borderWidth: 2,
								elevation: 10,
								borderColor: '#fff',
								backgroundColor: '#d1ebef',
								marginBottom: 50,
								borderRadius: 15,
							}}
							onValueChange={(itemValue, itemIndex) => {
								setSelectedValue(itemValue);
								{communityList.map((item, index) => {
									if(item.groupUID == itemValue){
										setUploadPayrollDecEnable(item.isPayrollDecRequired)
									}
								})}
							}}
						>
							{communityList.map((item, index) => (
								<Picker.Item
									key={index}
									label={item.name}
									value={item.groupUID}
								/>
							))}
						</Picker>
						</View> */}
							{uploadPayrollDecEnable == true ?
								<>
									<View style={styles._input_view}>
										<Text style={styles.referral_txt}>
											Payroll Deduction Form
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
											{payrollDeductionFormName}
										</Text>
									</View>
								</>

								: <></>}

							{Status == 'AA2' ? (
								<View
									style={{
										width: 300,
										height: 200,
										backgroundColor: '#d1ebef',
										paddingHorizontal: 30,
										paddingVertical: 10,
										elevation: 10,
										borderRadius: 15,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<>
										<AntDesign name="exclamationcircle" size={24} color="gray" />

										<Text
											style={{
												fontSize: 14,
												fontFamily: Fonts.InterBold,
												textAlign: 'center',
												color: 'gray',
												marginTop: 20,
												marginBottom: 10,
											}}
										>
											Your request to be linked to group is being processed
										</Text>
										<Text
											style={{
												fontSize: 14,
												fontFamily: Fonts.InterBold,
												textAlign: 'center',
												color: 'gray',
											}}
										>
											Contact your group admin for faser linkage
										</Text>
									</>
								</View>
							) : (
								<View
									style={{
										width: 300,
										height: 200,
									}}
								></View>
							)}

							<Text
								style={{
									marginTop: 30,
									fontSize: 16,
									fontFamily: Fonts.InterBold,
								}}
							>
								You are currently linked to:
							</Text>
							<TextInput
								style={styles._input}
								editable={false}
								value={
									communityList.find(
										item => item.groupUID === currentStatus.groupUID
									)?.name || ''
								}
							/>
						</View>
						<TouchableOpacity
							disabled={loading === loadingState.saving || !Status == 'AP' || !Status == 'DE2'}
							onPress={handleRequestToLink}
							style={Status === 'AP' || Status === 'DE2' ? styles.signup_btn : styles.signup_btn1}
						>
							{loading === loadingState.saving ? (
								<ActivityIndicator size="small" color="#fff" />
							) : (
								<Text style={styles.signup_btn_txt}>
									REQUEST GROUP ACCEPTANCE
								</Text>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.back_btn}
							onPress={() => props.navigation.goBack()}
						>
							<Text style={styles.back_btn_txt}>BACK</Text>
						</TouchableOpacity>
					</KeyboardAwareScrollView>

				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default LinkToCommunity;

const styles = StyleSheet.create({
	body: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	_tag_line: {
		fontFamily: Fonts.OpenSansBold,
		color: '#000000',
		textAlign: 'center',
		fontSize: 28,
		marginTop: 6,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '30%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		elevation: 10,
		borderRadius: 8,
		marginLeft: 20,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
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
		marginBottom: 20,
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
		marginBottom: 20,
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
	},
	_input: {
		width: '85%',
		height: 60,
		fontFamily: Fonts.InterBold,
		fontSize: 16,
		color: '#333',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		marginTop: 20,
		backgroundColor: '#dfdfdf',
	},
	_input_view: {
		marginTop: 5,
		width: '90%',
		alignSelf: 'center',
	},
	referral_txt: {
		fontFamily: Fonts.InterRegular,
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
	}, androidPickerStyle: {
		height: 50,
		width: 300,
		borderWidth: 2,
		elevation: 10,
		borderColor: '#fff',
		backgroundColor: '#d1ebef',
		marginBottom: 50,
		borderRadius: 15,
	  },
});
