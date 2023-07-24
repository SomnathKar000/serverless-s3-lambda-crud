# S3 Bucket API - Serverless Application

This is a serverless application that provides a RESTful API to interact with an S3 bucket for file upload, retrieval, and deletion.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Built With](#built-with)

## Overview

The S3 Bucket API is built using the Serverless Framework and AWS Lambda. It allows users to perform various operations on an S3 bucket, such as uploading files, retrieving files, and deleting files. The API is implemented with Lambda functions, and the data is stored in an S3 bucket with private access control.

## Prerequisites

Before running this application, you'll need the following:

- Node.js (>= 14.x) and npm installed on your local machine.
- AWS CLI configured with proper credentials to deploy the application.
- An S3 bucket configured with the appropriate permissions and an environment variable `FILE_UPLOAD_BUCKET_NAME` set to the bucket name.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/SomnathKar000/s3-bucket-api.git
cd s3-bucket-api
```

2. Install dependencies:

```bash
npm install
```

3. Update the `serverless.yml` file:

   - Replace `ap-south-1` in the `provider` section with your desired AWS region.
   - Replace `${self:custom.bucketName}` in the `custom` section with your desired S3 bucket name prefix.

## Usage

To run the application locally, you can use the Serverless Framework's `invoke local` command. For example, to test the `getFileHandler` function:

```bash
serverless invoke local --function getFileHandler --path ./test/event.json
```

Replace `getFileHandler` with the desired function name and update the `event.json` file with the event data.

## API Endpoints

The following API endpoints are available:

1. `POST /upload`: Upload a file to the S3 bucket.

   Request body:

   ```json
   {
     "fileName": "example.txt",
     "fileContext": "Your file content here"
   }
   ```

2. `GET /files/{id}`: Retrieve a file from the S3 bucket by its ID.

3. `DELETE /delete/{id}`: Delete a file from the S3 bucket by its ID.

## Deployment

To deploy the application to AWS, use the following command:

```bash
npm run deploy
```

This will create the necessary AWS resources, including the Lambda functions and API Gateway with the defined routes.

## Built With

- Node.js
- Serverless Framework
- AWS Lambda
- AWS API Gateway
- AWS S3
