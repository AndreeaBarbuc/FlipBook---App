import * as mongodb from "mongodb";
import * as mongoose from "mongoose";
import {User} from "./user";
import {Content} from "./content";

export const collections: {
    users?: mongodb.Collection<User>;
    contents?: mongodb.Collection<Content>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("MeanApp");
    await applySchemaValidation(db);
 
   const usersCollection = db.collection<User>("users");
   collections.users = usersCollection;

   const contentsCollection = db.collection<Content>("contents");
   collections.contents = contentsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchemaUser = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "role"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },                
                role: {
                    bsonType: "string",
                    description: "'role' is required and is one of 'admin', 'agent', or 'user",
                    enum: ["admin", "agent", "user"],
                },
            },
        },
    };

    const jsonSchemaContent = {
        $jsonSchema: {
            bsonType: "object",            
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is a string",
                },                
                description: {
                    bsonType: "string",
                    description: "'description' is a string",
                },
                img: {
                    bsonType: "BinaryData",
                    description: "images"
                },
            },
        },
    };
  
    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "users",
        validator: jsonSchemaUser
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", {validator: jsonSchemaUser});
        }
    });
    await db.command({
        collMod: "contents",
        validator: jsonSchemaContent
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("contents", {validator: jsonSchemaContent});
        }
    });
 }