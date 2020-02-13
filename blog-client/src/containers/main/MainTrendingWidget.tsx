import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRENDING_POSTS, PartialPost } from '../../lib/graphql/post';

export type MainTrendingWidgetProps = {};

const MainTrendingWidget: React.FC<MainTrendingWidgetProps> = props => {
  const { data } = useQuery<{ posts: PartialPost[] }>(GET_TRENDING_POSTS, {
    variables: {
      offset: 0,
      limit: 6,
    },
  });
  console.log(data);
  return null;
};
export default MainTrendingWidget;
