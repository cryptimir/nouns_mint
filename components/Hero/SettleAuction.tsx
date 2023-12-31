import Image from "next/image";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  Address,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";

export const SettleAuction = ({ auction }: { auction?: string }) => {
  const { config } = usePrepareContractWrite({
    address: auction as Address,
    abi: AuctionABI,
    functionName: "settleCurrentAndCreateNewAuction",
    enabled: !!auction,
  });
  const { write, data, isLoading: contractLoading } = useContractWrite(config);
  const { isLoading: transactionLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isLoading = contractLoading || transactionLoading;

  return (
    <button
      onClick={() => write?.()}
      className="w-full bg-skin-button-accent bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted h-12 mt-6 rounded-lg flex items-center justify-around"
    >
      {isLoading ? (
        <Image src="/spinner.svg" height={26} width={26} alt="spinner" />
      ) : (
        <span>Settle Auction</span>
      )}
    </button>
  );
};
