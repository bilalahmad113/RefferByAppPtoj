import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';


import {
	DigitalContract,
	Employer,
	ForgotPassword,
	Level1,
	LinkToCommunity,
	LoanHistory,
	Login,
	NewPinSetSuccessfully,
	Notifications,
	PersonalInfo,
	Profile,
	Referrals,
	ReferralsRules,
	RegistrationOTPSuccess,
	SetNewPin,
	Signup,
	Statement,
	PayViaPayPulseApp,
	TermsConditions,
	UploadDocs,
	UploadDocs2,
	UploadSelfie,
	UploadSelfie2,
	VerifiedProfile,

	RePersonalInfo,
	ReEmployer,
	ReProfile,
	RERegistrationOTPSuccess,
	ReUploadDocs,
	ReUploadSelfie,
	Landing

} from './../screens';


const Stack = createNativeStackNavigator();

function MainStack() {
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<WithLocalSvg
					style={styles.svg}
					asset={require('../../assets/headerFooter.svg')}
				/>
			</View>
			<Stack.Navigator>

				{Platform.OS =='android' && (<Stack.Screen
					name="Landing"
					component={Landing}
					options={{ headerShown: false }}
				/>)}

				
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Signup"
					component={Signup}
					options={{ headerShown: false }}
				/>
				
				<Stack.Screen
					name="PersonalInfo"
					component={PersonalInfo}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Employer"
					component={Employer}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="UploadDocs"
					component={UploadDocs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="UploadSelfie"
					component={UploadSelfie}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile"
					component={Profile}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Level1"
					component={Level1}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="TermsConditions"
					component={TermsConditions}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="DigitalContract"
					component={DigitalContract}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Statement"
					component={Statement}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PayViaPayPulseApp"
					component={PayViaPayPulseApp}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="LoanHistory"
					component={LoanHistory}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Referrals"
					component={Referrals}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ReferralsRules"
					component={ReferralsRules}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ForgotPassword"
					component={ForgotPassword}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Notifications"
					component={Notifications}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="VerifiedProfile"
					component={VerifiedProfile}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="RegistrationOTPSuccess"
					component={RegistrationOTPSuccess}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SetNewPin"
					component={SetNewPin}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="NewPinSetSuccessfully"
					component={NewPinSetSuccessfully}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="UploadDocs2"
					component={UploadDocs2}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="UploadSelfie2"
					component={UploadSelfie2}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="LinkToCommunity"
					component={LinkToCommunity}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="ReUploadDocs"
					component={ReUploadDocs}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="RePersonalInfo"
					component={RePersonalInfo}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ReEmployer"
					component={ReEmployer}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="ReUploadSelfie"
					component={ReUploadSelfie}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ReProfile"
					component={ReProfile}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="RERegistrationOTPSuccess"
					component={RERegistrationOTPSuccess}
					options={{ headerShown: false }}
				/>



			</Stack.Navigator>
			<View style={styles.container}>
				<WithLocalSvg
					style={styles.svg}
					asset={require('../../assets/headerFooter.svg')}
				/>
			</View>
		</NavigationContainer>
	);
}

export default MainStack;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	svg: {
		minWidth: '120%',
	},
});
