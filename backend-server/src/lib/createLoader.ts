import { createSeriesPostsLoader } from './../entity/SeriesPosts';
import { createSongcConfigLoader } from '../entity/SongcConfig';
import { createUserProfileLoader } from '../entity/UserProfile';
import { createUserLoader } from '../entity/User';
import { createTagsLoader } from '../entity/PostsTags';
import { createCommentsLoader } from '../entity/Comment';
import { createSeriesListLoader } from '../entity/Series';

function createLoaders() {
  return {
    songcConfig: createSongcConfigLoader(),
    userProfile: createUserProfileLoader(),
    user: createUserLoader(),
    tags: createTagsLoader(),
    comments: createCommentsLoader(),
    seriesList: createSeriesListLoader(),
    seriesPosts: createSeriesPostsLoader()
  };
}

export type Loaders = ReturnType<typeof createLoaders>;
export default createLoaders;
