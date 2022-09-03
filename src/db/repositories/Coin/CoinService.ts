import { CoinDto, CoinSides } from '../../../Features/CoinFlip/coinFlip.types';
import { Coin } from '../../entities/Coin';

export class CoinService {
	public dtoToCoin(coinDto: CoinDto) {
		const { head, tails } = coinDto;
		const coin = new Coin();
		coin.head = head.side ?? CoinSides.HEAD;
		coin.isCustomHead = head.isCustom;
		coin.tails = tails.side ?? CoinSides.TAILS;
		coin.isCustomTails = tails.isCustom;
		return coin;
	}

	public coinToDto(coin: Coin) {
		const { head, isCustomHead, tails, isCustomTails } = coin;
		const coinDto: CoinDto = {
			head: {
				isCustom: isCustomHead,
				side: head,
			},
			tails: {
				isCustom: isCustomTails,
				side: tails,
			},
		};
		return coinDto;
	}
}
