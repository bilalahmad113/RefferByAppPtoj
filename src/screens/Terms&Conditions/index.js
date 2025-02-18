import React from 'react';
import {
	Linking,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import Fonts from '../../config/Fonts';

export default function TermsConditions(props) {
	var seconds = new Date().getSeconds();
	var minutes = new Date().getMinutes();
	var hour = new Date().getHours();
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();

	var tsmp =
		seconds + '/' + minutes + '/' + hour + '/' + day + '/' + month + '/' + year;

	const [SingDate, onSingDate] = React.useState(tsmp);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 5 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles._tag_line}>DIGITAL LOAN CONTRACT</Text>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/emtylogo.svg')} />
					</View>
					<Text style={styles.ReferedByTxt}>
						REFERREDBY FINANCIAL SOLUTIONS CC
					</Text>
					<Text style={styles.adressDetailsTxt}>CC Reg: 2022/03728</Text>
					<Text style={styles.adressDetailsTxt}>
						www.referredby.com.na | support@referredby.com.na | 264 85 738 4666
						| P.O. Box 8 Keetmanshoop |Unit 13, The Village, Eros, Windhoek,
						Namibia
					</Text>
					<View style={styles.line}></View>
					<Text style={styles.memorandumTxt}>MEMORANDUM OF UNDERSTANDING</Text>
					<Text style={styles.preambleTxt}>Preamble</Text>
					<Text style={styles.enteredTxt}>entered in between</Text>
					<View style={styles.financialSolutionSec}>
						<Text style={styles.financialSolutionTxt}>
							ReferredBy Financial Solutions cc
						</Text>
						<Text style={styles.lenderTxt}> ( Lender )</Text>
					</View>
					<Text style={[styles.enteredTxt, { marginTop: 10 }]}>{'&'}</Text>
					<View style={styles.financialSolutionSec}>
						<Text style={styles.financialSolutionTxt}>
							{props.route.params.UserData.fullName}{' '}
							{props.route.params.UserData.surName}
						</Text>
						<Text style={styles.lenderTxt}> ( Borrower )</Text>
					</View>
					<View style={[styles.line, { marginTop: 30 }]}></View>
					<View style={styles.loanIdSec}>
						<Text style={styles.loanIdTxt}>LOAN ID : </Text>
						<Text style={styles.loanIdValue}>
							{props.route.params.UserData.userUID}/XX
						</Text>
					</View>
					<View style={styles.line}></View>
					<View style={styles.loanDetailsSec}>
						<Text style={styles.loanDetailsHeading}>LOAN DETAILS</Text>
						<View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Loan Amount (NAD)</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.Amount}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Loan Interest (%) </Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.interestCharged}%
								</Text>
							</View>

							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Loan Interest(NAD)</Text>
								<Text style={styles.loanAmountValue}>
									{(parseFloat(props.route.params.Amount) *
										parseFloat(props.route.params.UserData.interestCharged)) /
										100}
								</Text>
							</View>

							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Total Repayble (NAD)</Text>
								<Text style={styles.loanAmountValue}>
									{(parseFloat(props.route.params.Amount) *
										parseFloat(props.route.params.UserData.interestCharged)) /
										100 +
										parseFloat(props.route.params.Amount)}
								</Text>
							</View>
						</View>

						<View style={{ marginTop: 20 }}>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Due Date</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										width: '50%',
									}}
								>
									<Text style={styles.dateTxt}>
										{props.route.params.UserData.dueDate}
									</Text>
									<Text style={styles.monthYearTxt}></Text>
								</View>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Outstanding Date</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										width: '50%',
									}}
								>
									<Text style={styles.dateTxt}>
										{props.route.params.UserData.outstandingDate}
									</Text>
									<Text style={styles.monthYearTxt}></Text>
								</View>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Account Block Date</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										width: '50%',
									}}
								>
									<Text style={styles.dateTxt}>
										{props.route.params.UserData.blockDate}
									</Text>
									<Text style={styles.monthYearTxt}></Text>
								</View>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>
									Interest on Late Payments
								</Text>
								<Text style={styles.loanAmountValue}>
									5% ( Five Percent per Month )
								</Text>
							</View>
						</View>
						<View style={{ marginTop: 10 }}>
							<View style={styles.loanAmountSec}>
								<Text
									style={[
										styles.loanAmountTxt,
										{ fontFamily: Fonts.InterBold },
									]}
								>
									Disbursement PayPulse Mobile App #
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										width: '50%',
									}}
								>
									<Text style={styles.dateTxt}>264 | </Text>
									<Text style={styles.monthYearTxt}>
										{props.route.params.UserData.mobileNumber}
									</Text>
								</View>
							</View>
						</View>

						<Text
							style={[styles.loanDetailsHeading, { width: 160, marginTop: 10 }]}
						>
							BORROWERS' PERSONAL DETAIL
						</Text>
						<View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Physical Address (Erf)</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.physicalAddress}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Street Name</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.streetName}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Residential Town</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.town}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Region</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.region}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Client I.D.</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.idNumber}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Mobile Number</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.mobileNumber}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Email Address</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empEmailAddress}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Gender</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.gender}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>P.O. Box</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empPoBox}
								</Text>
							</View>
						</View>

						<Text
							style={[styles.loanDetailsHeading, { width: 175, marginTop: 10 }]}
						>
							BORROWERS’ EMLOYMENT DETAILS
						</Text>
						<View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Employer Name</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empName}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Occupation</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empOccupation}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Employer Office Number</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empOffieNumber}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>
									Payslip No / Employee No
								</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empCode}
								</Text>
							</View>
						</View>

						<Text
							style={[styles.loanDetailsHeading, { width: 140, marginTop: 10 }]}
						>
							NEXT OF KIN (NOK) DETAILS
						</Text>
						<View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Full Name</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empNextOfKinFullName}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Surname</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empNextOfKinSurName}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>Relationship</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empRelationship}
								</Text>
							</View>
							<View style={styles.loanAmountSec}>
								<Text style={styles.loanAmountTxt}>NOK – Mobile Number</Text>
								<Text style={styles.loanAmountValue}>
									{props.route.params.UserData.empNextOfKinMobileNumber}
								</Text>
							</View>
						</View>
					</View>

					<View style={[styles.line, { marginTop: 25 }]}></View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>6 Credit Bureau</Text>
						<Text style={styles.legalTxt}>
							6.1 Borrower agrees to credit bureau and AML/KYC enquiry by the Lender for adequate assessment of affordability and risk compliance.
						</Text>
					</View>

					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>7 LEGAL COSTS</Text>
						<Text style={styles.legalTxt}>
							7.1 Both parties expressly agree that the legal costs that may be
							recovered by either party in the event of breach of any provision
							of this agreement, shall be on a party and party basis.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>
							8 CONSENT TO JUDGMENT AND EMOLUMENT ATTACHMENT ORDERS
						</Text>
						<Text style={styles.legalTxt}>
							8.1 The Lender agrees that any consent to judgment forms or
							emolument attachment orders obtained prior to the Borrower
							defaulting, is considered void and not enforceable.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>
							8.2 Circular No. II/ML/8/2003 dated 8 August 2003 is considered
							part of this Loan Agreement.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>
							9 RULES FOR THE PURPOSES OF EXEMPTION UNDER SECTION 15A OF THE
							USURY ACT
						</Text>
						<Text style={styles.legalTxt}>
							9.1 The rules of confidentiality, disclosure, consideration,
							cooling off period, and collection methods contained in Exemption
							Notice No. 189 of the 25 August 2004 forms part of the agreement
							and is attached as Annexure A
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>10 DISPUTE RESOLUTION</Text>
						<Text style={styles.legalTxt}>
							10.1 Complaints which cannot be resolved between the Lender and
							the Borrower should be referred to NAMFISA for mediation in
							accordance with the Complaints Procedures endorsed by the Micro
							lending Industry. Attached is the complaints procedure which forms
							part of the agreement indicated as Annexure B .
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>11. COOLING OFF</Text>
						<Text style={styles.legalTxt}>
							11.1 The Borrower may cancel this agreement within 3 business days
							after signing, provided the money paid to such Borrower, has been
							repaid, together with only the interest owed for the time the
							Borrower had the money.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>
							12. PREPAYMENT OF INSTALMENTS AND PRINCIPAL DEBT
						</Text>
						<Text style={styles.legalTxt}>
							12.1 The Borrower shall be entitled to pay any portion of the
							principal debt before due date without derogating from his rights
							in terms of this agreement.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>13 THE WHOLE CONTRACT</Text>
						<Text style={styles.legalTxt}>
							13.1 The parties confirm that this contract and its annexures
							contains the full terms of their agreement and that no addition to
							or variation of the contract shall be of any force and effect
							unless done in writing and signed by both parties.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>14 JURISDICTION </Text>
						<Text style={styles.legalTxt}>
							14.1 The Borrower hereby consents to the jurisdiction of the
							Magistrates Court having jurisdiction over the person in respect
							of all legal proceedings connected with this agreement.
						</Text>
					</View>
					<View style={styles.legalSec}>
						<Text style={styles.legalTxt}>15 GOVERNING LAW </Text>
						<Text style={styles.legalTxt}>
							15.1 This agreement shall be governed in all respects by the laws
							of the Republic of Namibia.
						</Text>
					</View>
					<View style={styles.downloadSec}>
						<Text style={styles.downloadSecTxt1}>
							To Download Annexure A {'&'} B :
						</Text>
						<TouchableOpacity
							title="To Download Annexure A"
							onPress={() => {
								Linking.openURL(
									'https://www.referredby.com.na/_files/ugd/d2b0ed_9abf2b5ab7c74f44a8c2ee0c89de285c.pdf'
								);
							}}
						>
							<Text style={styles.downloadSecTxt2}>Click Here</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.downloadSec}>
						<Text style={styles.downloadSecTxt1}>
							To Read Annexure A {'&'} B online :
						</Text>
						<TouchableOpacity
							title="To Read Annexure A and B online"
							onPress={() => {
								Linking.openURL('https://www.referredby.com.na/annexures');
							}}
						>
							<Text style={styles.downloadSecTxt2}>Click Here</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.contactTxt}>
						For any queries and complaints please contact us at
						complaints@referredby.com.na for immediate solution contact us on
						+264857384666
					</Text>
					<View style={styles.line}></View>
					<View style={{ marginTop: 10 }}>
						<View style={styles.digitalSec}>
							<Text style={styles.digitalTxt}>DIGITAL OTP SIGNATURE</Text>
							<Text style={styles.digitalValue}>: XXXXXX</Text>
						</View>
						<View style={styles.digitalSec}>
							<Text style={styles.digitalTxt}>MOBILE NUMBER ID</Text>
							<Text style={styles.digitalValue}>
								: {props.route.params.UserData.mobileNumber}
							</Text>
						</View>

						<View style={[styles.signatureSec, { marginTop: 20 }]}>
							<Text style={styles.signatureTxt}>SIGNATURE DATE</Text>
							<Text style={styles.signatureValue}>: {SingDate}</Text>
						</View>
						<View style={[styles.signatureSec, { marginTop: 20 }]}>
							<Text style={styles.signatureTxt}>BORROWER</Text>
							<Text style={styles.signatureValue}>
								: {props.route.params.UserData.fullName}{' '}
								{props.route.params.UserData.surName}
							</Text>
						</View>
						<View style={[styles.signatureSec, { marginTop: 5 }]}>
							<Text style={styles.signatureTxt}>LENDER / AGENT</Text>
							<Text style={styles.signatureValue}>: Mwaikange Motinga</Text>
						</View>

						<View style={[styles.signatureSec, { marginTop: 20 }]}>
							<Text style={styles.signatureTxt}>SIGNATURE</Text>
							<View style={{ width: '60%' }}>
								<WithLocalSvg
									asset={require('../../../assets/referredbySignature.svg')}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '90%',
						alignSelf: 'center',
						alignItems: 'flex-end',
						paddingVertical: 10,
					}}
				>
					<TouchableOpacity
						style={styles.back_btn}
						onPress={() => props.navigation.navigate('VerifiedProfile')}
					>
						<Text style={styles.back_btn_txt}>DECLINE</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() => props.navigation.goBack()}
					>
						<Text style={styles.signup_btn_txt}>ACCEPT</Text>
					</TouchableOpacity>
				</View>
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
		marginTop: 10,
	},
	signup_btn: {
		backgroundColor: '#42B85C',
		width: '40%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
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
		backgroundColor: '#E5E5E5',
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
		width: '90%',
		alignSelf: 'center',
		marginTop: 10,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 26,
		elevation: 10,
		borderRadius: 8,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},
	ReferedByTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
		fontSize: 16,
		color: '#000',
	},
	adressDetailsTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 9,
		width: '89%',
		alignSelf: 'center',
		marginTop: 2,
		color: '#000',
	},
	memorandumTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 14,
		color: '#000',
	},
	preambleTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 9,
		width: '89%',
		alignSelf: 'center',
		marginTop: 10,
		color: '#000',
	},
	enteredTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 9,
		alignSelf: 'center',
		marginTop: 20,
		color: '#000',
	},
	financialSolutionSec: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	financialSolutionTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
		alignSelf: 'center',
		color: '#000',
	},
	lenderTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 9,
		alignSelf: 'center',
		color: '#000',
	},
	loanIdSec: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loanIdTxt: {
		textAlign: 'center',
		fontFamily: Fonts.InterMedium,
		fontSize: 14,
		alignSelf: 'center',
		color: '#000',
	},
	loanIdValue: {
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
		fontSize: 14,
		alignSelf: 'center',
		color: '#000',
	},
	loanDetailsSec: {
		width: '90%',
		alignSelf: 'center',
	},
	loanDetailsHeading: {
		fontFamily: Fonts.InterMedium,
		fontSize: 10,
		color: '#000',
		borderBottomWidth: 1,
		width: 70,
	},
	loanAmountSec: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
	},
	loanAmountTxt: {
		width: '55%',
		fontFamily: Fonts.InterRegular,
		fontSize: 9,
		color: '#000',
	},
	loanAmountValue: {
		width: '50%',
		fontFamily: Fonts.InterRegular,
		fontSize: 9,
		color: '#000',
		textAlign: 'left',
	},
	dateTxt: {
		fontFamily: Fonts.InterBold,
		fontSize: 9,
		color: '#000',
	},
	monthYearTxt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 9,
		color: '#000',
	},
	legalSec: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 10,
	},
	legalTxt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 8,
		color: '#000',
	},
	digitalSec: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
	},

	digitalTxt: {
		width: '60%',
		fontFamily: Fonts.InterSemiBold,
		fontSize: 14,
		color: '#000',
	},
	digitalValue: {
		width: '40%',
		fontFamily: Fonts.InterSemiBold,
		fontSize: 14,
		color: '#000',
	},
	signatureTxt: {
		width: '40%',
		fontFamily: Fonts.InterMedium,
		fontSize: 14,
		color: '#000',
	},
	signatureValue: {
		width: '60%',
		fontFamily: Fonts.InterRegular,
		fontSize: 10,
		color: '#000',
	},
	signatureSec: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
	},
	contactTxt: {
		width: '90%',
		alignSelf: 'center',
		fontFamily: Fonts.InterSemiBold,
		fontSize: 8,
		color: '#000',
		marginTop: 10,
	},
	downloadSec: {
		width: '90%',
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	downloadSecTxt1: {
		fontFamily: Fonts.InterRegular,
		fontSize: 10,
		color: '#000',
	},
	downloadSecTxt2: {
		fontFamily: Fonts.InterBold,
		fontSize: 10,
		color: '#1d8bf7',
		marginLeft: 5,
	},
});
