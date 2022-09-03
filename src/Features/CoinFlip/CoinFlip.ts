import { Repository } from 'typeorm';
import { Coin } from '../../db/entities/Coin';
import { CoinController } from '../../db/repositories/Coin/CoinController';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { CoinDto, CoinSides, CoinFlipResult, CoinSide } from './coinFlip.types';

export class CoinFlip {
	private coinController: CoinController;
	private readonly plot =
		'The  :coin:  flies up, heart skips a beat or two, and coin goes down...';
	// constructor(coinRepository: Repository<Coin>) {
	// 	this.coinRepository = coinRepository;
	// }

	private coinFlip(coin: CoinDto): CoinSide {
		const { head, tails } = coin;
		if (Math.random() < 0.5) {
			return head;
		}
		return tails;
	}

	private getResultStringForDefaultCoin(defaultSide: string) {
		return `...  :coin:  slaps the floor, does couple flips, and it's... **${capitalizeFirstLetter(
			defaultSide
		)}**!`;
	}

	private getResultStringForCustomCoin(side: string) {
		return `...  :coin:  and we definitely see that this is **${capitalizeFirstLetter(
			side
		)}**!`;
	}

	private handleResult({ isCustom, side }: CoinSide): CoinFlipResult {
		if (isCustom) {
			const result = this.getResultStringForCustomCoin(side);
			return {
				plot: this.plot,
				result,
			};
		}
		const result = this.getResultStringForDefaultCoin(side);
		return {
			plot: this.plot,
			result,
		};
	}

	public async tossACoin(coin: CoinDto): Promise<CoinFlipResult> {
		await this.coinController.save(coin);
		const coinSide = this.coinFlip(coin);
		return this.handleResult(coinSide);
	}
}
