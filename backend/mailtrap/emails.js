import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	// In development, just log the verification code to console
	if (process.env.NODE_ENV === 'development') {
		console.log('\n======================================');
		console.log(`VERIFICATION CODE for ${email}: ${verificationToken}`);
		console.log('======================================\n');
		return; // Skip sending actual email in development
	}

	// In production, send the actual email
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	// In development, just log to console
	if (process.env.NODE_ENV === 'development') {
		console.log('\n======================================');
		console.log(`WELCOME EMAIL would be sent to: ${name} <${email}>`);
		console.log('======================================\n');
		return; // Skip sending actual email in development
	}

	// In production, send the actual welcome email
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
			template_variables: {
				company_info_name: "Auth Company",
				name: name,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	// In development, just log to console
	if (process.env.NODE_ENV === 'development') {
		console.log('\n======================================');
		console.log(`PASSWORD RESET LINK for ${email}:`);
		console.log(resetURL);
		console.log('======================================\n');
		return; // Skip sending actual email in development
	}

	// In production, send the actual reset email
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	// In development, just log to console
	if (process.env.NODE_ENV === 'development') {
		console.log('\n======================================');
		console.log(`PASSWORD RESET SUCCESS for: ${email}`);
		console.log('======================================\n');
		return; // Skip sending actual email in development
	}

	// In production, send the actual success email
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset Success",
		});

		console.log("Password reset success email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
