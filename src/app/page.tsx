"use client";

import { useAccount } from "wagmi";
import { Bint, Container, Modal, Murn } from "../components";
import { FaInfoCircle } from "react-icons/fa";
import { ComponentProps, useState } from "react";

const TabItem = ({
  title,
  active,
  ...props
}: ComponentProps<"button"> & { title: string; active: boolean }) => (
  <button
    {...props}
    className={`${
      active ? "border-[#ACA7CB] border-b-2 border-solid" : ""
    } px-4 py-2 font-bold rounded hover:bg-[#ACA7CB] hover:text-black`}
  >
    {title}
  </button>
);

export default function Home() {
  const account = useAccount();
  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const [tab, setTab] = useState("Bint");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Container>
        <div
          className={`flex-grow flex ${
            account.isConnected ? "justify-between" : "justify-center"
          } items-center`}
        >
          <w3m-button />
          {account.isConnected && (
            <FaInfoCircle
              onClick={() => setModalOpen(true)}
              color="white"
              size={20}
              className="shadow cursor-pointer"
            />
          )}
        </div>
        {account.isConnected && (
          <div className="bg-[#303030] text-white w-full p-4 space-y-4 rounded-md flex-grow flex flex-col">
            <div className="flex gap-2">
              {["Bint", "Murn"].map((v, i) => (
                <TabItem
                  title={v}
                  key={`tabitem_${i}`}
                  onClick={() => setTab(v)}
                  active={v === tab}
                />
              ))}
            </div>
            {tab === "Bint" && <Bint />}
            {tab === "Murn" && <Murn />}
          </div>
        )}
      </Container>

      {/* modal */}
      <Modal close={closeModal} open={openModal}>
        <div className="w-[30rem]">
          <h3 className="text-lg font-bold">BINT</h3>
          <p>{`When you minted, it's in fungible mode, so you need to BINT (burn FT, mint NFT) to get your artwork and entitled for fee distribution.`}</p>
          <br />
          <h3 className="text-lg font-bold">MURN</h3>
          <p>{`If you want to sell in Uniswap, you need to MURN (burn NFT, mint FT), and you'll get back your ERC-20.`}</p>
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded bg-pink-500 mt-5 mx-auto block"
          >
            Close
          </button>
        </div>
      </Modal>
    </main>
  );
}
