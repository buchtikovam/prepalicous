import {
	PUBLIC_APP_NAME,
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_APPWRITE_PROJECT_ID
} from '$env/static/public';

import { parsePublicConfig } from './public-config';

export const publicConfig = parsePublicConfig({
	PUBLIC_APP_NAME,
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_APPWRITE_PROJECT_ID
});
