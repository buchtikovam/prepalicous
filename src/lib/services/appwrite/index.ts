import { Client, Account, TablesDB, Functions, Storage } from 'appwrite';

export const client = new Client();

import { publicConfig } from '$lib/config/public';

client.setEndpoint(publicConfig.appwriteEndpoint).setProject(publicConfig.appwriteProjectId);

export { ID } from 'appwrite';

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
