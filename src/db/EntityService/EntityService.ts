import { BaseEntity, EntityTarget, Repository } from 'typeorm';
import { appDataSource } from '../appDataSource';

interface IEntityService {
	target: EntityTarget<BaseEntity>;
}

export class EntityService extends Repository<BaseEntity> {
	// constructor({ target }: IEntityService) {
	//     // super();
	// }
}

const entityRepo = appDataSource.getRepository(BaseEntity);
