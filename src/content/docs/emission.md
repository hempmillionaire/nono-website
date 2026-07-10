---
title: Emission & supply
description: How NONO's issuance curve works, why it's slower than Monero's, and what "no premine" actually means.
group: Reference
order: 7
---

## The numbers

- **Total emission target:** 88,888,888 NONO, asymptotic (never fully reached, converges toward it) — `MONEY_SUPPLY = 888888880000000000` atomic units at 10 decimals.
- **Emission speed factor:** 21 per minute.
- **Genesis block reward:** `MONEY_SUPPLY >> 21` ≈ **42.39 NONO**.
- **Tail emission:** once the curve decays past it, block reward floors at a fixed **1.45 NONO per block**, forever (`FINAL_SUBSIDY_PER_MINUTE = 14500000000` atomic).
- **Block time:** 60 seconds, so tail emission is also ~1.45 NONO/minute.
- **Decimals:** 10 — atomic units fit comfortably in a `uint64_t`.

## How the curve works

Each block's reward is computed from how much of the emission target hasn't been mined yet, scaled by the emission speed factor — this is the same style of smoothly-decaying issuance curve Monero uses, just with different constants. Reward starts around 42.39 NONO at genesis and decreases block by block as more of the 88,888,888 target gets mined, asymptotically approaching (but never quite reaching) full emission. Once the *decaying* portion of the reward would fall below the tail emission floor, the tail emission (1.45 NONO/block) takes over permanently — this is what keeps miners incentivized indefinitely instead of the network eventually running on transaction fees alone.

`EMISSION_SPEED_FACTOR_PER_MINUTE = 21` is intentionally set to give a slower, fairer launch curve than Monero's own factor — more of the early supply is spread over more blocks, which means more time for small miners to join before a large share of the mineable early supply is gone.

## What "no premine, no dev tax" actually means

- **No premine.** The genesis coinbase output — normally where a chain author could quietly pay themselves — is instead paid to a deterministically-derived NUMS pubkey with no known private key. It is unspendable by anyone, by construction, not by promise. Verify this yourself on the [Verifying the genesis block](/docs/verify-genesis) page.
- **No dev tax.** There is no protocol-level fee redirect to a foundation or team address. NONO's fee (`DEFAULT_FEE_ATOMIC_NONO_PER_KB = 500` atomic units/KB baseline) goes to miners like the rest of the block reward, same as Monero.
- **No founder allocation.** There is no special-cased address anywhere in consensus that receives coins outside of normal mining. Every NONO in circulation, from block 1 onward, is mined.
- **No `donate` command.** Monero's wallet ships a hardcoded donation address and a `donate` command; NONO removed both, since there's no foundation to donate to.

## Verify it, don't trust it

All of the above are consensus rules — they're enforced by every node on the network, not by convention. If you want to check the genesis unspendability claim byte-for-byte yourself rather than take this page's word for it, see [Verifying the genesis block](/docs/verify-genesis).

Source: `src/cryptonote_config.h` (`MONEY_SUPPLY`, `EMISSION_SPEED_FACTOR_PER_MINUTE`, `FINAL_SUBSIDY_PER_MINUTE`, `DEFAULT_FEE_ATOMIC_NONO_PER_KB`), `README.md` ("NONO is a fork — not Monero") in the [chain repo](https://github.com/hempmillionaire/nono).
