import Koa from 'koa';
import Router from 'koa-router';
import Joi from 'joi';
import { validateBody } from '../../../../lib/utils';
import AWS from 'aws-sdk';
import mime from 'mime-types';
import authorized from '../../../../lib/middlewares/authorized';
import { userLoader } from '../../../../entity/User';
import UserImage from '../../../../entity/UserImage';
import { getRepository } from 'typeorm';
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

files.post('/create-url/', authorized, async ctx => {
  type RequestBody = {
    type: string;
    filename: string;
    refId?: any;
  };

  const schema = Joi.object().keys({
    type: Joi.string().valid('post', 'profile'),
    filename: Joi.string().required(),
    refId: Joi.any()
  });

  if (!validateBody(ctx, schema)) return;
  const { type, filename, refId } = ctx.request.body as RequestBody;
  try {
    const user = await userLoader.load(ctx.state.user_id);
    const userImage = new UserImage();
    userImage.fk_user_id = user.id;
    userImage.type;

    const userImageRepo = getRepository(UserImage);
    await userImageRepo.save(userImage);

    const path = generateUploadPath({ type, id: userImage.id, username: user.username });
    const signedUrl = generateSignedUrl(path, filename);
    userImage.path = `${path}/${filename}`;
    await userImageRepo.save(userImage);

    ctx.body = {
      image_path: `https://images.songc.io/${userImage.path}`,
      signed_url: signedUrl
    };
  } catch (e) {
    if (e.name === 'ContentTypeError') {
      ctx.status = 401;
      return;
    }
    ctx.throw(500, e);
  }
});
export default files;
