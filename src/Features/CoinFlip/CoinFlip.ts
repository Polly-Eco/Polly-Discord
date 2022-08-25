import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { CommandNames } from '../../shared/constants';

export interface CoinFlipResult {
	replyOne: string;
	replyTwo: string;
}

export interface Coin {
	head: string;
	customHead: boolean;
	tails: string;
	customTails: boolean;
}

export enum CoinSides {
	HEAD = 'head',
	TAILS = 'tails',
}

export class CoinFlip {
	private coin: Coin = {
		head: CoinSides.HEAD,
		customHead: false,
		tails: CoinSides.TAILS,
		customTails: false,
	};
	private readonly name = CommandNames.COINFLIP;
	constructor(head: string | null, tails: string | null) {
		if (head) {
			this.coin.head = head;
			this.coin.customHead = !!head;
		}
		if (tails) {
			this.coin.tails = tails;
			this.coin.customTails = !!tails;
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
				return `...  :coin:  and we definitely see that this is **${capitalizeFirstLetter(side)}**!`;
			}
			return `...  :coin:  slaps the floor, does couple flips, and it's... **${capitalizeFirstLetter(side)}**!`;
		};
		const result = this.coinFlip();
		const replyTwo =
			result === CoinSides.HEAD
				? handleResult(this.coin.customHead, this.coin.head)
				: handleResult(this.coin.customTails, this.coin.tails);
		return {
			replyOne,
			replyTwo,
		};
	}
}
