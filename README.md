# Novachron Pay | Micro-Streams 

> A continuous, second-by-second token streaming protocol for the Stellar/Soroban ecosystem.

[![Built with Soroban](https://img.shields.io/badge/Built_with-Soroban-indigo.svg)](https://soroban.stellar.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-ef4444.svg)](https://turbo.build/)

The future of Web3 payroll, subscriptions, and vesting is not discrete monthly payments—it is continuous, fluid streaming. **Nova Pay** introduces Superfluid-style token streaming to the Stellar ecosystem using Soroban smart contracts. 

Users can lock an initial deposit of USDC and open a "stream" to a recipient. Tokens flow mathematically second-by-second. Senders can cancel at any time, and recipients can claim their accumulated real-time balance instantly.

This project is currently in its **"V1 Minimum Viable Scaffold"** stage, designed to onboard developers via the Drips Wave funding program.

## Architecture (Monorepo)
* `packages/contracts` (Rust): The Soroban core streaming logic and ledger state math.
* `packages/sdk` (TypeScript): A developer-friendly wrapper for initiating and parsing streams via the Soroban RPC.
* `packages/dashboard` (Next.js 14): The user-facing dApp for managing incoming/outgoing streams.

##  Quick Start
```bash
npm install
npm run build
npm run dev
```
## Contributing
Please read our CONTRIBUTING.md for guidelines and a list of "Good First Issues."