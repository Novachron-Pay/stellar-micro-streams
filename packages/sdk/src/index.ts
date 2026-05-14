/**
 * @novapay/sdk
 * V1 Scaffold for interacting with the NovaStream Soroban contracts.
 */

export class NovaStreamClient {
    private network: string;
    private contractId: string;

    constructor(network: string = 'testnet', contractId: string) {
        this.network = network;
        this.contractId = contractId;
    }

    /**
     * MOCK: Submits a transaction to create a new stream.
     * GOOD FIRST ISSUE: Wire up @stellar/stellar-sdk and Soroban RPC.
     */
    public async createStream(sender: string, receiver: string, flowRatePerSecond: number): Promise<string> {
        console.log(`[SDK] Creating stream on ${this.network} from ${sender} to ${receiver} at ${flowRatePerSecond} tokens/sec.`);
        return "mock_tx_hash_12345";
    }

    /**
     * MOCK: Cancels an active stream.
     */
    public async cancelStream(caller: string, streamId: number): Promise<boolean> {
        console.log(`[SDK] Canceling stream ${streamId} for ${caller}...`);
        return true;
    }
}