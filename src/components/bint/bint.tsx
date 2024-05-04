import { formatUnits } from "viem"
import { BiLoader } from "react-icons/bi";
import { useBint } from "./hooks";
import { calculationFee } from "../../libs";

export const Bint = () => {
    const { _onSubmit, fee, loading, setAmount, amount } = useBint();
    
    return ( 
        <div className="w-full p-4 rounded-md space-y-2">
            <form className="flex items-center shadow-lg" onSubmit={_onSubmit}>
                <input 
                    placeholder="Amount to Bint" 
                    name="amount" 
                    type="number" 
                    onChange={(e) => setAmount(+e.target.value)} 
                    value={amount || ''} 
                    className="flex-grow p-2 rounded-l-md text-black"
                />
                <button type="submit" disabled={!amount || loading} className={`${!amount || loading ? 'bg-[#D19F9C]' : 'bg-[#d46b66]'} text-white flex-1 block font-bold p-2 rounded-r-md`}>
                    {loading ? <BiLoader className="animate-spin mx-auto" size={24}/> : 'BINT'}
                </button>
            </form>

            <span className="text-xs text-center w-full block font-medium text-white">Fee: {fee && amount ? formatUnits(calculationFee(fee, amount), 18) : ''}</span>
        </div>
     );
}