import { type PropsWithChildren } from "react";


const Card = ({ children }: PropsWithChildren) => {
    return (
        <div className="p-5 min-h-[40rem] shadow-lg min-w-[30rem] bg-[#2A272A] rounded-lg flex flex-col gap-3">
            {children}
        </div>
    );
}
 
export default Card;