"use client"

import { useAccount } from "wagmi";
import Card from "../components/card";
import Bint from "../components/bint";
import Murn from "../components/murn";
import Balance from "../components/balance";

export default function Home() {
  const account = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card>
        <div className={account.isConnected ? '' : 'flex-grow flex justify-center items-center'}>
          <w3m-button />
        </div>
        {account.isConnected && (
          <>
            <Bint/>
            <hr/>
            <Murn/>
            <Balance/>
          </>
        )}
      </Card>
    </main>
  );
}
