#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Stream(u32),
    LastId,
}

#[contracttype]
#[derive(Clone)]
pub struct Stream {
    pub sender: Address,
    pub receiver: Address,
    pub flow_rate_per_second: i128,
    pub start_timestamp: u64,
}

#[contract]
pub struct NovaStreamProtocol;

#[contractimpl]
impl NovaStreamProtocol {
    /// Initializes a new continuous payment stream.
    pub fn create_stream(
        env: Env,
        sender: Address,
        receiver: Address,
        flow_rate_per_second: i128,
    ) -> u32 {
        sender.require_auth();

        // Fetch and increment the last ID
        let mut last_id: u32 = env.storage().persistent().get(&DataKey::LastId).unwrap_or(0);
        last_id += 1;

        // Create the stream state
        let stream = Stream {
            sender: sender.clone(),
            receiver: receiver.clone(),
            flow_rate_per_second,
            start_timestamp: env.ledger().timestamp(),
        };

        // Save to persistent storage
        env.storage().persistent().set(&DataKey::Stream(last_id), &stream);
        env.storage().persistent().set(&DataKey::LastId, &last_id);

        env.events().publish(
            (symbol_short!("stream"), sender, receiver, last_id),
            flow_rate_per_second
        );

        last_id
    }

    /// Cancels an active stream and settles balances.
    pub fn cancel_stream(env: Env, caller: Address, stream_id: u32) {
        caller.require_auth();

        // Check if stream exists
        if !env.storage().persistent().has(&DataKey::Stream(stream_id)) {
            panic!("Stream does not exist");
        }

        // MOCK SETTLEMENT:
        // In a full implementation, we would calculate elapsed time:
        // let stream: Stream = env.storage().persistent().get(&DataKey::Stream(stream_id)).unwrap();
        // let elapsed = env.ledger().timestamp() - stream.start_timestamp;
        // ... and transfer tokens.

        // Remove the stream record
        env.storage().persistent().remove(&DataKey::Stream(stream_id));

        env.events().publish((symbol_short!("cancel"), caller), stream_id);
    }
}
