import { sharp } from "sharp";
import { config } from "dotenv";
config();
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import { region, accessKeyId, secretAccessKey, bucketName } from "../../../types/s3bucketCreds";

type FileUpload = {
	Bucket: string;
	Body: fs.ReadStream;
	Key: string;
};

const s3bucket: S3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

export const some = async (data, res) => {
	// await sharp(data.Body.image);
	console.log(data.file.path);


	return res.status(200).json({ message: "" });
};

//* UPLOAD FILE TO S3
export const uploadFile = async (file) => {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams: FileUpload = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return await s3bucket.upload(uploadParams).promise();
};

//* DOWNLOAD FILE FROM S3
export const getFileStream = async (fileKey: string) => {
	const downloadParams: { Key: string; Bucket: string } = {
		Key: fileKey,
		Bucket: bucketName,
	};

	const signedUrlExpireSeconds: number = 60 * 1;

	return s3bucket.getSignedUrl("getObject", {
		...downloadParams,
		Expires: signedUrlExpireSeconds,
	});
};
