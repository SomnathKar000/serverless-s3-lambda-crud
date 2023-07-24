import { S3 } from "aws-sdk";
import { v4 as uuidV4 } from "uuid";

const s3 = new S3();
const bucketName = process.env.FILE_UPLOAD_BUCKET_NAME!;

export const uploadFileToS3 = async (
  filename: string,
  fileContext: any
): Promise<string> => {
  const fileId = uuidV4();
  const fileData = {
    name: filename,
    context: fileContext,
  };

  const params = {
    Bucket: bucketName,
    Key: fileId,
    Body: JSON.stringify(fileData),
    ContentType: "application/json",
  };

  try {
    await s3.upload(params).promise();

    return fileId;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3.");
  }
};

export const getFileFromS3 = async (fileId: string): Promise<any> => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
  };
  try {
    const file = await s3.getObject(params).promise();
    const fileData = JSON.parse(file.Body?.toString() || "");
    return fileData;
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    throw new Error("Failed to fetch file from S3.");
  }
};

export const deleteFileFromS3 = async (fileId: string): Promise<void> => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3.");
  }
};
