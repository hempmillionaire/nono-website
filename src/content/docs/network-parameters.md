---
title: Network parameters
description: Ports, network IDs, genesis constants, and consensus parameters for mainnet, testnet, and stagenet.
group: Reference
order: 6
---

These values come straight out of `src/cryptonote_config.h` in the chain repo. A node on the wrong genesis or network ID will not peer with the rest of the network — check these before you sync, especially if you're pointing custom tooling at a specific network.

## Ports

| Network | P2P | RPC | ZMQ RPC |
|---|---|---|---|
| Mainnet | `24700` | `24701` | `24702` |
| Testnet | `24800` | `24801` | `24802` |
| Stagenet | `24900` | `24901` | `24902` |

RPC is bound to `127.0.0.1` by default on all three networks — it is not exposed externally unless you explicitly rebind it.

## Consensus parameters (all networks)

| Parameter | Value |
|---|---|
| Proof of work | RandomX |
| Block target | 60 seconds (`DIFFICULTY_TARGET_V2`) |
| Decimals | 10 (`CRYPTONOTE_DISPLAY_DECIMAL_POINT`) |
| Total emission target | 88,888,888 NONO, asymptotic pre-tail (`MONEY_SUPPLY = 888888880000000000` atomic units) |
| Emission speed factor | 21 per minute |
| Tail emission | 1.45 NONO / block, forever (`FINAL_SUBSIDY_PER_MINUTE = 14500000000` atomic) |
| Default fee | 500 atomic units / KB baseline (`DEFAULT_FEE_ATOMIC_NONO_PER_KB`) |
| Genesis timestamp | `1782264600` (Unix time) |

For the full derivation of the emission curve and why it's shaped this way, see [Emission & supply](/docs/emission).

## Genesis identity

| Network | Genesis nonce |
|---|---|
| Mainnet | `88888888` |
| Testnet | `88888889` |
| Stagenet | `88888890` |

Each network also has its own `GENESIS_TX` — the fully serialized genesis coinbase transaction, hex-encoded, hardcoded in `cryptonote_config.h` per network. The genesis coinbase output on every network pays a NUMS ("nothing up my sleeve") pubkey with no known private key, so it's provably unspendable by construction — no premine, no dev allocation. See [Verifying the genesis block](/docs/verify-genesis) to regenerate and check those bytes yourself.

Mainnet genesis hash:

```
60f468fef881125f510f7c93a8790eff5cba77cd7061437edc04b581940c5d6e
```

## Network ID and bootstrapping

NONO's mainnet network ID is derived from `"NONOMAIN"` plus a launch date and supply-target bytes, distinct from Monero's and from NONO's own testnet/stagenet IDs — this is what stops a NONO node from ever accidentally peering with a Monero node or the wrong NONO network. Checkpoints and DNS bootstrap seed lists are intentionally empty for now, pending dedicated NONO infrastructure; nodes discover peers organically via `--add-peer` / `--seed-node` or by connecting out to any known-good peer.

Source: `src/cryptonote_config.h` in the [chain repo](https://github.com/hempmillionaire/nono).
