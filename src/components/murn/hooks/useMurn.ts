import { useState } from "react";
import { burnNFT, listTokensOfOwner } from "../../../api";
import { useAccount, useChainId } from "wagmi";
import {
  config,
  WOJAX_CONTRACT_ADDRESS_ERC20HX,
  WOJAX_CONTRACT_ADDRESS_ERC721HX,
} from "../../../config/wagmi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatUnits, RpcError } from "viem";
import { useBint } from "../../bint/hooks";
import { getBalance, waitForTransactionReceipt } from "wagmi/actions";
import { AccountController } from "@web3modal/core";

export const useMurn = () => {
  const account = useAccount();
  const chainId = useChainId();
  const [nfts, setNfts] = useState<Record<number, string>>({});
  const { fee, loading, setLoading } = useBint();

  const {
    data: nftsData,
    refetch: reloadNFT,
    isLoading,
  } = useQuery({
    queryKey: ["fetchNFT"],
    queryFn: () =>
      listTokensOfOwner(
        account.address,
        WOJAX_CONTRACT_ADDRESS_ERC721HX,
        chainId
      ),
    enabled: !!account.address && !!chainId,
    initialData: undefined,
  });

  const handleSelectedImage = (index: number, tokenId: string) => {
    setNfts((prev) => {
      const obj = { ...prev };
      if (!obj[index]) {
        obj[index] = tokenId;
      } else {
        delete obj[index];
      }
      return obj;
    });
  };

  const _handleMurn = async () => {
    setLoading(true);
    try {
      const amount = Object.values(nfts);
      if (amount.length && fee) {
        const result = await burnNFT(fee, amount);
        await waitForTransactionReceipt(config, {
          hash: result,
          retryDelay: 1500,
        });
        setNfts({});
        await reloadNFT();
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

  return {
    nfts,
    nftsData,
    reloadNFT,
    _handleMurn,
    handleSelectedImage,
    fee,
    loading,
    loadingNFT: isLoading,
  };
};
