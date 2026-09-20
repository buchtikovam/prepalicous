import { Client } from 'appwrite';

import { publicConfig } from '$lib/shared/config/public';

export const appwriteClient = new Client()
	.setEndpoint(publicConfig.appwriteEndpoint)
	.setProject(publicConfig.appwriteProjectId);
