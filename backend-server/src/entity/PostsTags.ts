import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getRepository
} from 'typeorm';
import { groupById, normalize } from '../lib/utils';

import DataLoader from 'dataloader';
import Post from './Post';
import Tag from './Tag';

@Entity('posts_tags', {
  synchronize: false
})
export default class PostsTags {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column('uuid')
  fk_post_id!: string;

  @Index()
  @Column('uuid')
  fk_tag_id!: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(type => Tag, { cascade: true, eager: true })
  @JoinColumn({ name: 'fk_tag_id' })
  tag!: Tag;

  @ManyToOne(type => Post, { cascade: true })
  @JoinColumn({ name: 'fk_post_id' })
  post!: Post;

  static async syncPostTags(postId: string, tags: Tag[]) {
    const repo = getRepository(PostsTags);

    // get current post tags
    const prevPostTags = await repo.find({
      where: {
        fk_post_id: postId
      }
    });

    const normalized = {
      prev: normalize(prevPostTags, postTag => postTag.fk_tag_id),
      current: normalize(tags)
    };

    // removes tags that are missing
    const missing = prevPostTags.filter(postTag => !normalized.current[postTag.fk_tag_id]);
    missing.forEach(tag => repo.remove(tag));

    // adds tags that are new
    const tagsToAdd = tags.filter(tag => !normalized.prev[tag.id]);
    const postTags = tagsToAdd.map(tag => {
      const postTag = new PostsTags();
      postTag.fk_post_id = postId;
      postTag.fk_tag_id = tag.id;
      return postTag;
    });
    return repo.save(postTags);
  }
}

export const createTagsLoader = () =>
  new DataLoader<string, Tag[]>(async postIds => {
    const repo = getRepository(PostsTags);
    const postsTags = await repo
      .createQueryBuilder('posts_tags')
      .where('fk_post_id IN (:...postIds)', { postIds })
      .leftJoinAndSelect('posts_tags.tag', 'tag')
      .orderBy('fk_post_id', 'ASC')
      .orderBy('tag.name', 'ASC')
      .getMany();

    return groupById<PostsTags>(postIds, postsTags, pt => pt.fk_post_id).map(array =>
      array.map(pt => pt.tag)
    );
  });
