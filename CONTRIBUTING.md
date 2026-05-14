# Contributing to Novachron Pay 

Thank you for helping us build the future of Web3 streaming payments! 

##  How to Contribute
1. **Find an Issue:** Look for tags like `good first issue`.
2. **Branch:** `git checkout -b feat/your-feature`
3. **Validate:** Run `npm run build` from the root to ensure TS and Rust both compile.
4. **Pull Request:** Submit to `main`.

## High Priority Technical Needs
* **Contract Math:** Implementing real-time flow rate calculations in the Rust contract.
* **SDK RPC Integration:** Wiring up `@stellar/stellar-sdk` to read stream states from the ledger.
* **UI Real-time Animation:** Making the numbers in the Next.js dashboard count up dynamically based on the active flow rate.