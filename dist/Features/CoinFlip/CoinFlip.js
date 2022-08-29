"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinFlip = exports.CoinSides = void 0;
const capitalizeFirstLetter_1 = require("../../helpers/capitalizeFirstLetter");
const constants_1 = require("../../shared/constants");
var CoinSides;
(function (CoinSides) {
    CoinSides["HEAD"] = "head";
    CoinSides["TAILS"] = "tails";
})(CoinSides = exports.CoinSides || (exports.CoinSides = {}));
class CoinFlip {
    constructor(head, tails) {
        this.coin = {
            head: CoinSides.HEAD,
            customHead: false,
            tails: CoinSides.TAILS,
            customTails: false,
        };
        this.name = constants_1.CommandNames.COINFLIP;
        if (head) {
            this.coin.head = head;
            this.coin.customHead = !!head;
        }
        if (tails) {
            this.coin.tails = tails;
            this.coin.customTails = !!tails;
        }
    }
    coinFlip() {
        if (Math.random() < 0.5) {
            return CoinSides.HEAD;
        }
        return CoinSides.TAILS;
    }
    handleCommand() {
        const replyOne = '  :coin:  flies up, heart skips a beat or two, and coin goes down...';
        const handleResult = (customSide, side) => {
            if (customSide) {
                return `...  :coin:  and we definitely see that this is **${(0, capitalizeFirstLetter_1.capitalizeFirstLetter)(side)}**!`;
            }
            return `...  :coin:  slaps the floor, does couple flips, and it's... **${(0, capitalizeFirstLetter_1.capitalizeFirstLetter)(side)}**!`;
        };
        const result = this.coinFlip();
        const replyTwo = result === CoinSides.HEAD
            ? handleResult(this.coin.customHead, this.coin.head)
            : handleResult(this.coin.customTails, this.coin.tails);
        return {
            replyOne,
            replyTwo,
        };
    }
}
exports.CoinFlip = CoinFlip;
//# sourceMappingURL=CoinFlip.js.map