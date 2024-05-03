import { useEffect, useState } from "react";
import { getBalance, GetBalanceReturnType} from "wagmi/actions";
import { config } from "../config/wagmi";

const Balance = () => {
    const [balance, setBalance] = useState<GetBalanceReturnType>()
    useEffect(
        () => {
            getBalance(config, {
                /**
                 * USDT
                 * https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7
                 */
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
            })
            .then(setBalance)
        },
        []
    )

    return ( 
        <div className="text-white">
            <p>Balance 0xdAC17F958D2ee523a2206206994597C13D831ec7</p>
            <p>{balance ? `${balance.formatted} ${balance.symbol}` : 'Loading..'}</p>
        </div>
     );
}
 
export default Balance;