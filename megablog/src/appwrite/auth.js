import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    createAccount({ email, password, name }) {
        // Create a new account and then log in if successful
        return this.account.create(ID.unique(), email, password, name)
            .then(userAccount => {
                return this.login({ email, password })
                    .then(() => userAccount); // Return the user account after login
            });
    }

    login({ email, password }) {
        // Create an email session for login
        return this.account.createEmailSession(email, password);
    }

    getCurrentUser() {
        // Get the currently logged-in user
        return this.account.get();
    }

    logout() {
        // Delete all sessions (logout)
        return this.account.deleteSessions();
    }
}

const authservice = new Authservice();
export default authservice;
