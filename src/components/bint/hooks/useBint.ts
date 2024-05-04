import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatUnits, type RpcError } from "viem";
import { checkFee, minNFT } from "../../../api";
import { getBalance, waitForTransactionReceipt } from "wagmi/actions";
import { config, WOJAX_CONTRACT_ADDRESS_ERC20HX } from "../../../config/wagmi";
import { AccountController } from "@web3modal/core";
import { useAccount } from "wagmi";

export const useBint = () => {
  const [amount, setAmount] = useState<undefined | number>();
  const [fee, setFee] = useState(BigInt(0));
  const [loading, setLoading] = useState(false);
  const account = useAccount();

  const _onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (amount && fee) {
        const result = await minNFT(fee, amount);
        await waitForTransactionReceipt(config, {
          hash: result,
          retryDelay: 1500,
        });
        const bresult = await getBalance(config, {
          address: account.address!,
          token: WOJAX_CONTRACT_ADDRESS_ERC20HX,
        });
        await AccountController.setBalance(
          formatUnits(bresult.value, bresult.decimals),
          bresult.symbol
        );
      }
    } catch (error: any) {
      toast.error((error as RpcError).shortMessage);
    } finally {
      setLoading(false);
    }
  };

  const _checkFee = async () => {
    const result = await checkFee();
    setFee(result);
  };

  useEffect(() => {
    _checkFee();
  }, []);

  return {
    loading,
    fee,
    setAmount,
    setLoading,
    _onSubmit,
    amount,
  };
};
