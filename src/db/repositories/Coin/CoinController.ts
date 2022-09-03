import { CoinDto } from '../../../Features/CoinFlip/coinFlip.types';
import { appDataSource } from '../../appDataSource';
import { Coin } from '../../entities/Coin';
import { CoinService } from './CoinService';

const СoinRepository = appDataSource.getRepository(Coin);

export class CoinController {
	private coinService: CoinService;

	public async save(coinDto: CoinDto): Promise<CoinDto> {
		const coin = await СoinRepository.save(
			this.coinService.dtoToCoin(coinDto)
		);
		return this.coinService.coinToDto(coin);
	}
}
