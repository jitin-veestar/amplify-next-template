import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
// import {hippaContractData} from './data/hippaContract.js';
// import { aws_dynamodb } from "aws-cdk-lib";

defineBackend({
  auth,
  data
});


// const externalDataSourcesStack = backend.createStack("MyExternalDataSources");


// const externalTable = aws_dynamodb.Table.fromTableName(
//   externalDataSourcesStack,
//   "MyHippaContractTable",
//   "hippaContractTable"
// );


// backend.data.addDynamoDbDataSource(
//   "hippaContractTable",
//   externalTable
// );