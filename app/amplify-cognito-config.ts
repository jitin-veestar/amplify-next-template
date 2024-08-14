"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";
import outputs from '../amplify_outputs.json';

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    identityPoolId: String(process.env.NEXT_PUBLIC_IDENTITY_POOL_ID),
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
  },
};

Amplify.configure(
  outputs
);

export default function ConfigureAmplifyClientSide() {
  return null;
}