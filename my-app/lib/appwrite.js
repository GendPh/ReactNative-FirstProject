import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.reactNativeAoraProject',
  projectId: '670976a1003c9c609ac4',
  databaseId: '670a8d94001640f35045',
  userCollectionId: '670a8dc400233a441ca8',
  videosCollectionId: '670a8dfe00081500a494',
  storageId: '670a937b0012fce043e4',
}

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
  ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, userName) => {
  try {

    const newAccount = await account.create(ID.unique(), email, password, userName);

    if (!newAccount) throw new Error('Account creation failed');

    const avatarUrl = avatars.getInitials(userName);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        userName,
        avatar: avatarUrl,
      });

    return newUser;
  } catch (error) {
    console.log(`Create User Error: ${error}`);
    throw new Error(`Create User Error: ${error}`);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(`Sing-in Error: ${error}`);
    throw new Error(`Sing-in Error: ${error}`);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('No current user found');

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No current user found');

    return currentUser.documents[0];

  } catch (error) {
    console.log(`Get Current User Error: ${error}`);
    throw new Error(`Get Current User Error: ${error}`);
  }
};