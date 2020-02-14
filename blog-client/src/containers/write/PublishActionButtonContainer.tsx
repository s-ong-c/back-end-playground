import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import PublishActionButton from '../../components/write/PublishActionButton';
import { closePublish, WriteMode } from '../../modules/write';
import { WRITE_POST, WritePostResponse } from '../../lib/graphql/post';
import { pick } from 'ramda';
import { escapeForUrl } from '../../lib/utils';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { setHeadingId } from '../../lib/heading';
import { useHistory } from 'react-router';

// const mapStateToProps = ({ write }: RootState) =>
//   pick(
//     [
//       'mode',
//       'markdown',
//       'title',
//       'html',
//       'tags',
//       'defaultDescription',
//       'description',
//       'isPrivate',
//       'urlSlug',
//       'thumbnail',
//     ],
//     write,
//   );
// const mapDispatchToProps = {
//   closePublish,
// };

// interface OwnProps {}
// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;
type PublishActionButtonsContainerProps = {};

const PublishActionButtonsContainer: React.FC<PublishActionButtonsContainerProps> = props => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const history = useHistory();

  const options = useSelector((state: RootState) =>
    pick(
      [
        'mode',
        'markdown',
        'title',
        'html',
        'tags',
        'defaultDescription',
        'description',
        'isPrivate',
        'urlSlug',
        'thumbnail',
      ],
      state.write,
    ),
  );
  const [writePost] = useMutation<WritePostResponse>(WRITE_POST);

  const variables = {
    title: options.title,
    body:
      options.mode === WriteMode.MARKDOWN
        ? options.markdown
        : setHeadingId(options.html),
    tags: options.tags,
    is_markdown: options.mode === WriteMode.MARKDOWN,
    is_temp: false,
    is_private: options.isPrivate,
    url_slug: options.urlSlug || escapeForUrl(options.title),
    thumbnail: options.thumbnail,
    meta: {
      short_description: options.description,
    },
  };

  const onPublish = async () => {
    if (options.title.trim() === '') {
      console.error('제목이 비어있습니다.');
      return;
    }
    try {
      const response = await writePost({
        variables: variables,
      });
      if (!response || !response.data) return;
      const { user, url_slug } = response.data.writePost;
      await client.resetStore();
      history.push(`/@${user.username}/${url_slug}`);
    } catch (e) {
      console.error('포스트 작성 실패');
    }
  };

  const onCancel = useCallback(() => {
    dispatch(closePublish());
  }, [dispatch]);

  return <PublishActionButton onCancel={onCancel} onPublish={onPublish} />;
  // return (
  //   <Mutation mutation={WRITE_POST}>
  //     {(
  //       writePost: (arg0: {
  //         variables: {
  //           title: string;
  //           body: string;
  //           tags: string[];
  //           is_markdown: boolean;
  //           is_temp: boolean;
  //           is_private: boolean;
  //           url_slug: string;
  //           thumbnail: string | null;
  //           meta: {};
  //         };
  //       }) => void,
  //       { data, loading, error }: MutationResult<Partial<Post>>,
  //     ) => {
  //       return (
  //         <PublishActionButton
  //           onCancel={onCancel}
  //           onPublish={async () => {
  //             try {
  //               const response = await writePost({
  //                 variables: {
  //                   title: rest.title,
  //                   body:
  //                     rest.mode === WriteMode.MARKDOWN
  //                       ? rest.markdown
  //                       : rest.html,
  //                   tags: rest.tags,
  //                   is_markdown: rest.mode === WriteMode.MARKDOWN,
  //                   is_temp: false,
  //                   is_private: rest.isPrivate,
  //                   url_slug: rest.urlSlug || escapeForUrl(rest.title),
  //                   thumbnail: rest.thumbnail,
  //                   meta: {},
  //                 },
  //               });
  //               console.log(response);
  //             } catch (e) {
  //               console.log(e);
  //             }
  //           }}
  //         />
  //       );
  //     }}
  //   </Mutation>
};

export default PublishActionButtonsContainer;
