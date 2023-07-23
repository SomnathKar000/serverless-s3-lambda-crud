import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
} from "aws-lambda";
import { deleteFileFromS3 } from "../services/s3Services";
import { errorHandler } from "../utils/errorHandler";
import { successResponse } from "../utils/responseHandler";

export const deleteFileHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const fileId = event.pathParameters?.id;
  if (!fileId) {
    return errorHandler(400, "Please provide file id");
  }

  try {
    await deleteFileFromS3(fileId);
    return successResponse({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error);
    return errorHandler(500, "Internal Server Error");
  }
};
