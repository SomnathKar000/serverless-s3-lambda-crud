import { APIGatewayProxyHandler } from "aws-lambda";
import { uploadFileHandler } from "./handlers/uploadFile";
import { getFileHandler } from "./handlers/getFile";
import { deleteFileHandler } from "./handlers/deleteFile";

export const routes: { [key: string]: APIGatewayProxyHandler } = {
  "POST/upload": uploadFileHandler,
  "GET/files/{id}": getFileHandler,
  "DELETE/delete/{id}": deleteFileHandler,
};
