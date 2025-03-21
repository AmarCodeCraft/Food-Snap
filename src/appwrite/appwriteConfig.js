import { Client, Account, Storage, Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d3d65c00019000e205");

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export { account, storage, databases, ID };
