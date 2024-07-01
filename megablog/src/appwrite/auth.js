// auth.js

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

class AuthService {
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
            await this.login({ email, password });
            return userAccount;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

// Exporting logout function separately
export const logout = async () => {
    try {
        await authService.logout();
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

// Exporting login function
export const login = async (data) => {
    try {
        const session = await authService.login(data);
        return session;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export default authService; // Exporting authService as the default export
