import { Client, Account, TablesDB, Functions, Storage } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('prepalicous');

export { ID } from 'appwrite';

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
