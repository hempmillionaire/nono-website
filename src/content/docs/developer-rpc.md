---
title: Developer reference — RPC, ZMQ, URIs
description: "Building on NONO — the ZMQ pub/sub event stream, the nono: payment URI scheme, and where to find full RPC docs."
group: Developers
order: 9
---

NONO inherits Monero's RPC, ZMQ, and P2P wire protocols unchanged — if you've built against Monero before, this is the same surface with NONO's ports and address prefixes. This page covers the parts most useful for wallets, explorers, and pool software; it isn't a full RPC method reference.

## ZMQ pub/sub

`nonod` can publish daemon events over ZMQ (default mainnet port `24702` — see [Network parameters](/docs/network-parameters)). Clients subscribe to topics shaped `format-context-event`:

- **Format:** `json` (the only wire format currently).
- **Context:** `full` (entire block/transaction, hash computable client-side) or `minimal` (bare minimum to react to the event).
- **Events:** `chain_main` (main-chain changes), `txpool_add` (newly visible mempool transactions), `miner_data` (everything needed to build a custom block template — `full` context only).

Subscribing to `json-minimal-chain_main` gets you minimal-payload notifications on every main-chain change; subscribing to just `json-minimal` gets all events in that context. Topic prefix matching is supported, so partial topics work as expected.

Ordering guarantees worth knowing before you build against this:

- `chain_*` events always reference a real previous block via `prev_id`; on a reorg, the event points at an earlier block instead of the latest one.
- `txpool_add` for a given transaction always fires before the `chain_*` event that includes it — so `chain_*` payloads only re-serialize miner transactions, not ones you already saw via `txpool_add`.
- ZMQ pub/sub can drop messages under network congestion. Detect gaps by watching `height`/`prev_id` continuity on `chain_*`, and fall back to the `get_last_block_header` RPC call to resync state after a suspected drop.

## Payment URIs

The `nono:` URI scheme follows RFC 3986, same shape as Monero's `monero:` scheme:

```
nono:<address>?tx_amount=<decimal>&tx_description=<text>
```

Multiple recipients are supported by separating `address` and matching `tx_amount` values with semicolons. Example:

```
nono:46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em?tx_amount=239.39014&tx_description=donation
```

Useful for QR codes and merchant checkout flows. Spaces in any field must be percent-encoded (`%20`).

There's also a wallet-definition URI scheme for describing/restoring a wallet from a link (`seed`, or `spend_key`+`view_key`, plus an optional `height` or `txid` to scan from) — see `docs/URI_SCHEME.md` in the chain repo for the full parameter table.

## Full RPC reference

The JSON-RPC method list (`get_info`, `get_block`, `get_transactions`, wallet RPC methods, etc.) is inherited from Monero verbatim — method names, parameters, and response shapes are unchanged, only the default ports and address prefixes differ. If you already have Monero RPC client code, pointing it at `nonod`'s RPC port (`24701` mainnet) and swapping the address-prefix validation is usually the entire porting job.

Source: `docs/ZMQ.md`, `docs/URI_SCHEME.md` in the [chain repo](https://github.com/hempmillionaire/nono).
