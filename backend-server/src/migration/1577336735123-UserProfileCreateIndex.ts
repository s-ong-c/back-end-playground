import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfileCreateIndex1577336735123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE INDEX user_profiles_fk_user_id ON user_profiles(fk_user_id)');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP INDEX user_profiles_fk_user_id');
  }
}
