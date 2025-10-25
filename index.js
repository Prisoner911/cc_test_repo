import { ClientSecretCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

const TENANT_ID = process.env.AZURE_TENANT_ID;
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;




const STORAGE_ACCOUNT_NAME = "skygazerstorage26";
const CONTAINER_NAME = "app-files";

const credential = new ClientSecretCredential(TENANT_ID, CLIENT_ID, CLIENT_SECRET);
const blobServiceClient = new BlobServiceClient(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  credential
);

async function listBlobsSDK() {
  try {
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    console.log("Tenant ID:", TENANT_ID);
    console.log("Client ID:", CLIENT_ID);
    console.log("Client Secret set?", !!CLIENT_SECRET);
    
    console.log(`Attempting to list blobs in container: ${CONTAINER_NAME}`);

    let i = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    console.log("Blob listing successful.");
  } catch (error) {
    console.error("Storage connection failed (using SDK):", error);
  }
}

listBlobsSDK();
