import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { getFileFromS3 } from "../services/s3Services";
import { errorHandler } from "../utils/errorHandler";
import { successResponse } from "../utils/responseHandler";

export const getFileHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const fileId = event.pathParameters?.id;
  if (!fileId) {
    return errorHandler(400, "Please provide file id");
  }
  try {
    const file = await getFileFromS3(fileId);
    if (!file) {
      return errorHandler(404, "File not found");
    }
    return successResponse({ file, message: "File fetched successfully" });
  } catch (error) {
    console.log(error);
    return errorHandler(500, "Internal Server Error");
  }
};
