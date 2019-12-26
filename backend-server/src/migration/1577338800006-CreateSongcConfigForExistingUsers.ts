import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSongcConfigForExistingUsers1577338800006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO songc_configs (fk_user_id) SELECT id FROM users`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM songc_configs WHERE true`);
  }
}
