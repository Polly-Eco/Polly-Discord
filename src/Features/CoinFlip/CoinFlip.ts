import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { CommandNames } from '../../shared/constants';

export interface CoinFlipResult {
	replyOne: string;
	replyTwo: string;
}

export interface Coin {
	head: string;
	isCustomHead: boolean;
	tails: string;
	isCustomTails: boolean;
}

export enum CoinSides {
	HEAD = 'head',
	TAILS = 'tails',
}

export class CoinFlip {
	private coin: Coin = {
		head: CoinSides.HEAD,
		isCustomHead: false,
		tails: CoinSides.TAILS,
		isCustomTails: false,
	};
	private readonly name = CommandNames.COINFLIP;
	constructor(head: string | null, tails: string | null) {
		if (head) {
			this.coin.head = head;
			this.coin.isCustomHead = !!head;
		}
		if (tails) {
			this.coin.tails = tails;
			this.coin.isCustomTails = !!tails;
		}
	}

	private coinFlip() {
		if (Math.random() < 0.5) {
			return CoinSides.HEAD;
		}
		return CoinSides.TAILS;
	}

	public handleCommand(): CoinFlipResult {
		const replyOne =
			'  :coin:  flies up, heart skips a beat or two, and coin goes down...';
		const handleResult = (customSide: boolean, side: string) => {
			if (customSide) {
				return `...  :coin:  and we definitely see that this is **${capitalizeFirstLetter(
					side
				)}**!`;
			}
			return `...  :coin:  slaps the floor, does couple flips, and it's... **${capitalizeFirstLetter(
				side
			)}**!`;
		};
		const result = this.coinFlip();
		const replyTwo =
			result === CoinSides.HEAD
				? handleResult(this.coin.isCustomHead, this.coin.head)
				: handleResult(this.coin.isCustomTails, this.coin.tails);
		return {
			replyOne,
			replyTwo,
		};
	}
}
