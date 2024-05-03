import { useState } from "react";

const Bint = () => {
    const [amount, setAmount] = useState<undefined | number>(undefined)
    const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO run contract
        alert(amount)
    }
    
    return ( 
        <div className="w-full p-4 rounded-md">
            <form className="flex items-center" onSubmit={_onSubmit}>
                <input 
                    placeholder="Amount to Bint" 
                    name="amount" 
                    type="number" 
                    onChange={(e) => setAmount(+e.target.value)} 
                    value={amount} 
                    className="flex-grow p-2 rounded-l-md"
                />
                <button type="submit" className="bg-[#D19F9C] text-white flex-1 block font-bold p-2 rounded-r-md">BINT</button>
            </form>

            <span className="text-xs font-medium text-white">Fee: {amount}</span>
        </div>
     );
}
 
export default Bint;