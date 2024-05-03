import Image from "next/image";
import { useState } from "react";

const Murn = () => {
    const [nfts, setNfts] = useState<Record<string, boolean>>({});
    const handleSelectedImage = (index: number) => {
        setNfts(
            (prev) => {
                const obj = {...prev}
                if(!obj[index]){
                    obj[index] = true
                }else{
                    delete obj[index]
                }
                return obj
            }
        )
    }
    const _handleMurn = () => {
        // TODO run contract
        alert(Object.keys(nfts))
    }
    return ( 
        <div className="bg-[#303030] text-white w-full p-4 space-y-4 rounded-md flex-grow flex flex-col">
            <div>
                <h3 className="font-bold text-xl">NFTs</h3>
                <span className="text-xs">Selected: {Object.keys(nfts).length}</span>
            </div>

            <div className="flex-grow grid grid-cols-2 place-items-center gap-4 w-[25rem] p-2 h-[5rem] overflow-auto">
                {Array(5).fill('/albert.png').map((v,i) => (
                    <Image 
                        key={`nft_${i}`} 
                        src={v} width={200} 
                        onClick={() => handleSelectedImage(i)} 
                        className={nfts[i] ? "border-2 rounded border-black border-solid p-[3px]" : ""} 
                        height={200} 
                        alt="albert"
                    />
                ))}
            </div>

            <button 
                className={`block w-full ${!!Object.keys(nfts).length ? 'bg-[#ED5E93]' : 'bg-[#ff90b9]'} font-bold p-3 rounded-xl`} 
                onClick={_handleMurn} 
                disabled={!Object.keys(nfts).length}>
                MURN
            </button>
        </div>
     );
}
 
export default Murn;