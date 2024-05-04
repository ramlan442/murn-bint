import Image from "next/image";
import { useMurn } from "./hooks";
import { BiLoader } from "react-icons/bi";
import { calculationFee, RGBDataURL } from "../../libs";
import { formatUnits } from "viem";

export const Murn = () => {
  const {
    nftsData,
    _handleMurn,
    nfts,
    handleSelectedImage,
    loading,
    fee,
    loadingNFT,
  } = useMurn();

  return (
    <div className="bg-[#303030] text-white w-full p-4 space-y-4 rounded-md flex-grow flex flex-col">
      <div>
        <h3 className="font-bold text-xl">NFTs</h3>
        <span className="text-xs mr-5">
          Selected: {Object.keys(nfts).length}
        </span>
        <span className="text-xs">
          Fee: {formatUnits(calculationFee(fee, Object.keys(nfts).length), 18)}
        </span>
      </div>

      <div
        className={`flex-grow grid ${
          nftsData ? "grid-cols-2" : "place-items-center"
        } gap-4 w-[25rem] p-2 h-[20rem] overflow-auto`}
      >
        {nftsData &&
          nftsData.map((v, i) => (
            <Image
              key={`nft_${i}`}
              src={v.image}
              placeholder="blur"
              blurDataURL={RGBDataURL()}
              width={200}
              onClick={() => handleSelectedImage(i, v.id)}
              className={`${
                nfts[i]
                  ? "border-2 rounded border-[#ED5E93] border-solid p-[3px]"
                  : ""
              } cursor-pointer`}
              height={200}
              alt={v.name}
            />
          ))}
        {!nftsData && loadingNFT && (
          <div className="">
            <BiLoader className="animate-spin" size={30} />
          </div>
        )}
      </div>

      <button
        className={`block w-full ${
          !!Object.keys(nfts).length || loading
            ? "bg-[#ED5E93]"
            : "bg-[#ff90b9]"
        } font-bold p-3 rounded-xl`}
        onClick={_handleMurn}
        disabled={!Object.keys(nfts).length || loading}
      >
        {loading ? (
          <BiLoader className="animate-spin mx-auto" size={24} />
        ) : (
          "MURN"
        )}
      </button>
    </div>
  );
};
