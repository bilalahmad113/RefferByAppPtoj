import { Entypo } from '@expo/vector-icons';
// import { Camera, CameraType } from 'expo-camera';

import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
import ProgressBar from '../../Components/ProgressBar';
import * as SecureStore from 'expo-secure-store';


export default function UploadSelfie2(props) {
	const [DocSelfieID, setDocSelfieID] = React.useState('');
	const [DocSelfieIDName, setDocSelfieIDName] = React.useState('');
	const [cameraOpen, setCameraOpen] = React.useState(false);
	// const [permission, requestPermission] = Camera.useCameraPermissions();
	// const [type, setType] = React.useState(CameraType.front);
	const [cameraRef, setCameraRef] = React.useState(null);
	const [loading, setLoading] = React.useState('notCaptured');
	const [facing, setFacing] = useState('front');
	const [showProgressBar, setShowProgressBar] = React.useState(false);

	const SignupCommand = async() => {
		setShowProgressBar(true)

		if (DocSelfieID == null || DocSelfieID == '') {
			alert('Please select Upload selfie with ID.');
			setShowProgressBar(false)
			return;
		}

		var formBody = {
			DocNationalIdentityCard: props.route.params.DocNationalIdentityCard,
			DocNationalIdentityCardName: props.route.params.DocNationalIdentityCardName,
			DocPayslip: props.route.params.DocPayslip,
			DocPayslipName: props.route.params.DocPayslipName,
			DocPoliceDeclaration: props.route.params.DocPoliceDeclaration,
			DocPoliceDeclarationName: props.route.params.DocPoliceDeclarationName,
			DocSelfieID: DocSelfieID,
			DocSelfieIDName: DocSelfieIDName,
			PayRollDeductionDoc : props.route.params.PayRollDeductionDoc || null
		};
		
		fetch(API_URL + '/api/App/UpdateDoc/Add', {
			method: 'POST',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formBody),
		}).then(response => response.json()
			).then(responseJson => {
				if (responseJson.statusCode == 200) {
					setShowProgressBar(false)
					props.navigation.navigate('VerifiedProfile');
				} else {
					alert(responseJson.message);
					setShowProgressBar(false)
				}
			})
			.catch(error => {
				console.error(error);
				setShowProgressBar(false)

			});
	};

	const pickImage = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		// if (
		// 	result.mimeType == 'image/jpeg' ||
		// 	result.mimeType == 'image/png' ||
		// 	result.mimeType == 'image/jpg'
		// ) {
		// 	const base64 = await FileSystem.readAsStringAsync(result.uri, {
		// 		encoding: 'base64',
		// 	});
		// 	setDocSelfieID(base64);
		// 	setDocSelfieIDName(result.name);
		// } else {
		// 	alert('Please select only image.');
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
				setDocSelfieID(base64);
				setDocSelfieIDName(result.assets[0].name);
			} else {
				alert('Please select only pdf.');
			}
		} else {
			console.log("no image select")
		}
	};

	// const handleCamera = async () => {
	// 	console.log('happened');
	// 	// Ask the user for the permission to access the camera
	// 	const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

	// 	if (permissionResult.granted === false) {
	// 		alert("You've refused to allow this appp to access your camera!");
	// 		return;
	// 	}
	// 	try {
	// 		const result = await ImagePicker.launchCameraAsync();

	// 		// Explore the result
	// 		if (result.cancelled) {
	// 			console.log('cancelled pressed');
	// 			return;
	// 		}

	// 		console.log('reading image');

	// 		const base64 = await FileSystem.readAsStringAsync(result.uri, {
	// 			encoding: 'base64',
	// 		});

	// 		setDocSelfieID(base64);
	// 		setDocSelfieIDName('image-captured');
	// 	} catch (error) {
	// 		alert('Some error occured while capturing image.');
	// 	}
	// };

	const handleCameraOpen = async () => {
		if (cameraOpen) {
			setCameraOpen(false);
			setDocSelfieIDName('');
			setDocSelfieID('');
			setLoading('notCaptured');
			return;
		}

		// if (!permission.granted) {
		// 	requestPermission()
		// 		.then(res => {
		// 			setCameraOpen(true);
		// 		})
		// 		.catch(err => {
		// 			alert('Please allow camera permissions to continue.');
		// 		});
		// }

		// if (permission.granted) {
		// 	console.log({ permission });
		// 	setCameraOpen(true);
		// }

		try {
			const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync().catch((err) =>
				Alert.alert(`camera_permission_err: ${err}`)
			);

			const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync().catch((err) =>
				Alert.alert(`camera_roll_permission_err: ${err}`)
			);

			if (cameraStatus === 'denied' || cameraRollStatus === 'denied') {
				Alert.alert(
					"Permission not granted",
					"Please allow this app to access camera and photo library in your phone settings.",
					[
						{
							text: "OK",
							onPress: async () => {
								if (cameraStatus === 'denied') {

									await ImagePicker.getCameraPermissionsAsync();
								}
								if (cameraRollStatus === 'denied') {

									await ImagePicker.requestMediaLibraryPermissionsAsync();
								}

							},
						},
					],
					{ cancelable: true }
				);
				return;
			} else {
				console.log("else")
				setCameraOpen(true);
			}
		} catch (error) {
			alert('Some error occured while capturing image.');
		}
	};

	const handleCapture = () => {
		setLoading('notCaptured');
		setDocSelfieIDName('');
		setDocSelfieID('');
		setLoading('capturing');
		if (cameraRef) {
			cameraRef.takePictureAsync({ quality: 0.5, base64: true }).then(data => {
				const imageName = data.uri.split('/').pop();
				setDocSelfieID(data.base64);
				setDocSelfieIDName(imageName);
				setLoading('captured');
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ProgressBar visible={showProgressBar} text="Please wait" />
			<View style={styles.body}>
				<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
					<Text style={styles._tag_line}>KNOW YOUR CUSTOMER (KYC)</Text>
					<Text style={styles.heading}>Upload a Selfie</Text>
					<Text style={styles.text2}>
						Upload a selfie with you holding your ID just below your chin and
						todays date written on a white paper as indicated on the photo
						below.
					</Text>
					<View style={{ marginTop: 30 }}>
						<View style={styles._image_upload_view}>
							<TouchableOpacity
								onPress={handleCameraOpen}
								style={styles._imageUploadBtn}
							>
								{cameraOpen ? (
									<Entypo name="cross" size={24} color="black" />
								) : (
									<Entypo name="camera" size={24} color="black" />
								)}
							</TouchableOpacity>
							{cameraOpen ? (
								<>
									<View
										style={{
											width: 300,
											height: 300,
											marginTop: 10,
											borderRadius: 10,
											backgroundColor: 'white',
											borderColor: 'black',
											borderWidth: 2,
										}}
									>
										{!DocSelfieID && (
											// <Camera
											// 	ref={ref => {
											// 		setCameraRef(ref);
											// 	}}
											// 	style={{ width: '100%', aspectRatio: 1 }}
											// 	type={type}
											// 	mirrorImage={true}
											// ></Camera>
											<CameraView style={{ width: '100%', aspectRatio: 1 }} facing={facing} ref={ref => {
												setCameraRef(ref);
											}}></CameraView>

										)}

										{loading === 'captured' && !!DocSelfieID && (
											<Image
												source={{ uri: `data:image/png;base64,${DocSelfieID}` }}
												style={{ width: '100%', aspectRatio: 1, scaleX: -1 }}
											/>
										)}
									</View>
									{loading !== 'captured' && (
										<TouchableOpacity
											style={[styles.captureButton, { marginTop: 24 }]}
										>
											{loading == 'capturing' ? (
												<ActivityIndicator size={24} color="#2F9564" />
											) : (
												<Text
													style={[styles.chooseFileBtnTxt, { fontSize: 16 }]}
													onPress={handleCapture}
												>
													CAPTURE
												</Text>
											)}
										</TouchableOpacity>
									)}
								</>
							) : (
								<Image
									source={require('./../../../assets/profileImage.jpeg')}
									style={{
										width: 200,
										height: 200,
										marginTop: 10,
										borderRadius: 10,
									}}
									resizeMode="stretch"
								/>
							)}
						</View>
						<View style={styles._input_view}>
							<Text style={styles.referral_txt}>Upload selfie with ID</Text>
							<View style={styles.uploadFileBtn}>
								<TouchableOpacity
									style={styles.chooseFileBtn}
									onPress={() => pickImage()}
								>
									<Text style={styles.chooseFileBtnTxt}>CHOOSE FILE</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.referral_txt}>{DocSelfieIDName}</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.signup_btn}
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
		fontSize: 21,
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
		marginTop: 30,
		alignSelf: 'center',
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,

	},
	_input_view: {
		marginTop: 10,
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
		marginTop: 10,
	},
	_image_upload_view: {
		backgroundColor: '#110339d8',
		elevation: 3,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		paddingBottom: 30,
	},
	captureButton: {
		backgroundColor: '#fff',
		width: 80,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 64 / 2,
		borderWidth: 2,
		borderColor: '#2F9564',
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
	_imageUploadBtn: {
		backgroundColor: '#fff',
		width: 45,
		height: 37,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#2F9564',
		marginTop: -10,
		elevation: 5,
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
		fontSize: 11,
		width: '90%',
		alignSelf: 'center',
		marginTop: 5,
	},
	heading: {
		fontFamily: Fonts.InterBold,
		fontSize: 18,
		textAlign: 'center',
		marginTop: 20,
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
