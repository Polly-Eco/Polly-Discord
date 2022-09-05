import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'text' })
	head: string;

	@Column({ type: 'boolean' })
	isCustomHead: boolean;

	@Column({ type: 'text' })
	tails: string;

	@Column({ type: 'boolean' })
	isCustomTails: boolean;
}
