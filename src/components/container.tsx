import { type PropsWithChildren } from "react";
import { Footer } from "./footer";

export const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-[#2A272A] rounded-md shadow-2xl min-w-[30rem] p-4 gap-3 flex flex-col">
            {children}
            <Footer/>
        </div>
    );
}