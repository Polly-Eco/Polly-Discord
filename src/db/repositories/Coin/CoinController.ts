import { Repository } from 'typeorm';
import { CoinDto } from '../../../Features/CoinFlip/coinFlip.types';
import { appDataSource } from '../../appDataSource';
import { Coin } from '../../entities/Coin';
import { CoinService } from './CoinService';

export const СoinRepository = appDataSource.getRepository(Coin);

export class CoinController {
	private coinService: CoinService;
	private coinRepository: Repository<Coin>;
	constructor (coinRepository: Repository<Coin>) {
		this.coinService = new CoinService();
		this.coinRepository = coinRepository;
	}
	public async save(coinDto: CoinDto): Promise<CoinDto> {
		const coin = await this.coinRepository.save(
			this.coinService.dtoToCoin(coinDto)
		);
		return this.coinService.coinToDto(coin);
	}
}
