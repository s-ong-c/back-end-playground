import Koa from 'koa';
import Router from 'koa-router';
import Joi from 'joi';
import { validateBody } from '../../../../lib/utils';
import AWS from 'aws-sdk';
import mime from 'mime-types';
const files = new Router();

const BUCKET_NAME = 's3.images.songc.io';
const s3 = new AWS.S3({
  region: 'ap-northest-2',
  signatureVersion: 'v4'
});

const generateSignedUrl = (path: string, filename: string) => {
  const contentType = mime.lookup(filename);
  if (!contentType) {
    const error = new Error('Failed to parse Content-Type from filename');
    error.name = 'ContentTypeError';
    throw error;
  }
  if (!contentType.includes('image')) {
    const error = new Error('Given file is not a image');
    error.name = 'ContentTypeError';
    throw error;
  }
  const uploadPath = `${path}/${filename}`;
  return s3.getSignedUrl('putObject', {
    Bucket: BUCKET_NAME,
    Key: uploadPath,
    ContentType: contentType
  });
};

export const generateUploadPath = ({
  id,
  type,
  username
}: {
  username: string;
  id: string;
  type: string;
}) => {
  return `images/${username}/${type}/${id}`;
};

files.post('/create-url/', ctx => {
  type RequestBody = {
    type: string;
    payload: any;
    filename: string;
  };

  const schema = Joi.object().keys({
    type: Joi.string().valid('post', 'profile'),
    filename: Joi.string().required(),
    payload: Joi.any()
  });

  if (!validateBody(ctx, schema)) return;
});
export default files;
