import { 
    Address, 
    scValToNative, 
    xdr, 
    rpc
} from "@stellar/stellar-sdk";

/**
 * @novapay/sdk
 * Interface matching the Soroban contract's Stream struct.
 */
export interface Stream {
    sender: string;
    receiver: string;
    flowRatePerSecond: bigint;
    startTimestamp: bigint;
}

export class NovaStreamClient {
    private rpcUrl: string;
    private contractId: string;
    private server: rpc.Server;

    constructor(rpcUrl: string = 'https://soroban-testnet.stellar.org', contractId: string) {
        this.rpcUrl = rpcUrl;
        this.contractId = contractId;
        this.server = new rpc.Server(this.rpcUrl);
    }

    /**
     * Fetches a stream from the Soroban network by its ID.
     * Wires up real RPC calls to the contract's persistent storage.
     */
    public async getStream(streamId: string): Promise<Stream | null> {
        try {
            // In Soroban, persistent data is stored as ledger entries.
            // We use the contract ID and a key to fetch it.
            const ledgerKey = xdr.LedgerKey.contractData(
                new xdr.LedgerKeyContractData({
                    contract: Address.fromString(this.contractId).toScAddress(),
                    key: xdr.ScVal.scvString(streamId),
                    durability: xdr.ContractDataDurability.persistent(),
                })
            );

            const response = await this.server.getLedgerEntries(ledgerKey);

            if (!response.entries || response.entries.length === 0) {
                return null;
            }

            const entry = response.entries[0];
            const contractData = entry.val.contractData();
            
            // Parse the ScVal struct into a native JS object
            const nativeData = scValToNative(contractData.val());

            return {
                sender: nativeData.sender,
                receiver: nativeData.receiver,
                flowRatePerSecond: nativeData.flow_rate_per_second,
                startTimestamp: nativeData.start_timestamp
            };
        } catch (error) {
            console.error("[SDK] Error fetching stream:", error);
            throw error;
        }
    }

    /**
     * MOCK: Submits a transaction to create a new stream.
     */
    public async createStream(sender: string, receiver: string, flowRatePerSecond: number): Promise<string> {
        console.log(`[SDK] Creating stream on ${this.rpcUrl} from ${sender} to ${receiver} at ${flowRatePerSecond} tokens/sec.`);
        return "mock_tx_hash_12345";
    }

    /**
     * MOCK: Cancels an active stream.
     */
    public async cancelStream(caller: string, streamId: string): Promise<boolean> {
        console.log(`[SDK] Canceling stream ${streamId} for ${caller}...`);
        return true;
    }
}
