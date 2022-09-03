export interface CoinFlipResult {
	plot: string;
	result: string;
}

export interface CoinSide {
	isCustom: boolean;
	side?: string;
}

export interface CoinDto {
	head: CoinSide;
	tails: CoinSide;
}

export enum CoinSides {
	HEAD = 'head',
	TAILS = 'tails',
}
