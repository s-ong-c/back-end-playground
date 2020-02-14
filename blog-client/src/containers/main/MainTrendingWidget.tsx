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
  if (!data) return null;
  return null;
};
export default MainTrendingWidget;
