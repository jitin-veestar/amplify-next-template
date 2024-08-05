"use client";
import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  resetPassword, type ResetPasswordOutput,
  confirmResetPassword,
  type ConfirmResetPasswordInput,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
} from "aws-amplify/auth";
import { getErrorMessage } from "../utils/get-error-message";

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        // optional
        // autoSignIn: true,
      },
    });
  } catch (error) {
    console.error("cognitoActions:::: ERROR", error)
    return getErrorMessage(error);
  }
  return false
  // redirect("/auth/confirm-signup")
  // return {redirectLink: "/auth/confirm-signup"}
}

export async function handleSendEmailVerificationCode(
  formData: {email: string}
) {
  try {
    await resendSignUpCode({
      username: formData.email,
    });
    return {message: "Code Sent successfully", success: true}
  } catch (error) {
    console.log({error})
    return  {
      success:false,
      message: getErrorMessage(error)
    }
  }
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: any
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: formData.email,
      confirmationCode: formData.code,
    });
    return {
      success: true,
      message: "User Confirmed!"
    }
  } catch (error) {
    return {success: false, message: getErrorMessage(error)};
  }
  redirect("/auth/sign-in")
  // return {redirectLink: "/auth/login"}
}
// forgot password - 

export async function handleResetPassword(formData: {email: string}) {
  try {
    // const userExists = await signIn({
    //   username: formData.email,
    //   password: '123123',
    // });
    // console.log(userExists, 'hello');
    const output = await resetPassword({
      username: formData.email,
    });
    await handleResetPasswordNextSteps(output);
    return {message: "Code Sent successfully", success: true}
  } catch (error) {
    console.log(error);
    return  {
      success:false,
      message: getErrorMessage(error)
    }
  }
}

function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
  const { nextStep } = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
      );
      break;
    case 'DONE':
      console.log('Successfully reset password.');
      break;
  }
}

export async function handleConfirmResetPassword({
  username,
  confirmationCode,
  newPassword
}: ConfirmResetPasswordInput) {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
    return {message: "Password changed successfully", success: true}
  } catch (error) {
    console.log(error);
    return  {
      success:false,
      message: getErrorMessage(error)
    }
  }
}
// 

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
){
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    console.log("reached, nextStep", nextStep)
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      return {success: false, message: "Please Confirm Email!", redirectLink: "/auth/confirm-signup"}
    }
    return {success: true, message: "Success!", redirectLink: "/"}
  } catch (error) {
    console.error(error)
    return {success: false, message: getErrorMessage(error)};
  }
  // redirect(redirectLink)
}

export async function handleSignOut(bool: boolean) {
  try {
    if(bool){
      await signOut({global: true});
    }else {
      await signOut();
    }
    return {success: true, message: 'Signed out successfully'}
  } catch (error) {
    console.log(getErrorMessage(error));
    return {success: false, message: getErrorMessage(error)}
  }
}