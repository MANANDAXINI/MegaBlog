import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // Attempt to log in the user immediately after account creation
            await this.login({ email, password });
            return userAccount; // Return the created user account object
        } catch (error) {
            console.error("Error creating account:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null; // Return null if unable to fetch the user
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
}

const authService = new AuthService();
export default authService;
