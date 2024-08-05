import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
UserPoolId:"ap-south-1_oYWdlen3x",
ClientId:"5547m03pqtnoaq504atf9jtlvb"
}
export default new CognitoUserPool(poolData);