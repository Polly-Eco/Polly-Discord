import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class testMigration1661891247507 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'coin',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'text',
					},
					{
						name: 'head',
						type: 'text',
					},
					{
						name: 'tails',
						type: 'text',
					},
					{
						name: 'isCustomHead',
						type: 'boolean',
					},
					{
						name: 'isCustomTails',
						type: 'boolean',
					},
				],
			}),
			true
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('coin');
	}
}
