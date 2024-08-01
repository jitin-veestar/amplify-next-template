import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { indexFormData } from './data/indexForm.js';
import {hippaContractData} from './data/hippaContract.js';

defineBackend({
  auth,
  data,
  indexFormData,
  hippaContractData
});
