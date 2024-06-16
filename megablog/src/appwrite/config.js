import conf from "../conf/conf";
import { Client, Databases, ID, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, UserID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), // Use ID.unique() for a unique document ID
                {
                    title,
                    slug, // Save slug in the document data
                    content,
                    featuredImage,
                    status,
                    UserID
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error; // Propagate the error to the caller
        }
    }

    async updatePost({ title, slug, content, featuredImage, status, UserID }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Use slug as the document ID to update
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    UserID
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error; // Propagate the error to the caller
        }
    }

    async deletePost({ slug }) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, // Correctly use collection ID here
                slug
            );
            return true; // Return true on successful deletion
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false; // Return false on error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return null; // Return null if unable to fetch the document
        }
    }
}

export const service = new Service();
export default service;
