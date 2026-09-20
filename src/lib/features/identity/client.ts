import type { Authentication } from './application/authentication';
import { AppwriteAuthentication } from './infrastructure/appwrite-authentication';

export const authentication: Authentication = new AppwriteAuthentication();
