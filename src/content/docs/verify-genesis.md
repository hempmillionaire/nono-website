---
title: Verifying the genesis block
description: Regenerate NONO's genesis transaction bytes yourself and confirm the coinbase output is provably unspendable.
group: Reference
order: 8
---

"No premine" is only worth something if you can check it. NONO doesn't ask you to trust that claim — it gives you a script that regenerates the exact genesis transaction bytes from a public seed, so you can compare them against what's hardcoded in the source yourself.

## The claim

Every cryptocurrency's genesis block has a coinbase output — the very first block reward. On most chains, whoever controls the genesis coinbase's private key could, in principle, spend it. NONO's genesis coinbase output is instead paid to a **NUMS pubkey** — "nothing up my sleeve" — a point on the Ed25519 curve deliberately constructed to have no known private key. Nobody can spend it. Not the NONO contributors, not anyone.

## How the NUMS pubkeys are derived

The genesis transaction needs two 32-byte points: the coinbase output pubkey, and a `tx_extra` pubkey. Both are derived deterministically from a public seed string:

```
NONO_GENESIS_STRANDED_2026
```

The recipe:

```
candidate(i) = SHA-256("NONO_GENESIS_STRANDED_2026:<net>:<role>:<i>")
pubkey       = the first candidate i = 0, 1, 2, ... whose 32 bytes
               decode as a valid Ed25519 (Cryptonote) point
```

where `<net>` is `mainnet`, `testnet`, or `stagenet`, and `<role>` is `output` or `tx_extra`. Because a SHA-256 digest is just 32 pseudorandom bytes with no known discrete log relative to the curve's generator point, and because the recipe is a public, mechanical hash-and-check loop rather than a chosen scalar, nobody — including whoever wrote the script — has (or can derive) a private key for the resulting point. That's what "nothing up my sleeve" means: the construction itself rules out a hidden backdoor, rather than asking you to trust that no one kept one.

## Run it yourself

The chain repo ships the exact script, with no external dependencies (Ed25519 point validation is implemented inline against Python's standard library only):

```bash
python3 utils/genesis/derive_nums_pubkeys.py
```

It prints the derived pubkeys for all three networks. Compare them against the `GENESIS_TX` constants in `src/cryptonote_config.h` — the pubkeys should appear as substrings of the corresponding hex-encoded transaction. If they match, the genesis coinbase output really is built from a hash of a public string, not from a hidden scalar.

## What you're actually checking

- The genesis transaction format is otherwise a normal Cryptonote miner transaction: version, unlock time, a single `txin_gen` input at height 0, one `txout_to_key` output for the genesis reward (`MONEY_SUPPLY >> 21`, see [Emission & supply](/docs/emission)), and a `tx_extra` field carrying the second pubkey.
- The **only** thing that would let anyone spend the genesis output is knowing a private scalar `k` such that `k · G` equals the output pubkey. The derivation above produces the pubkey from a hash, not from `k · G` for any chosen `k` — so no such `k` is known to exist.
- This script is the entire verification surface. You don't need to trust this documentation page, the website, or any NONO contributor's word — run the script, read the ~100 lines of source, and check the bytes match.

Source: [`utils/genesis/derive_nums_pubkeys.py`](https://github.com/hempmillionaire/nono/blob/master/utils/genesis/derive_nums_pubkeys.py), `src/cryptonote_config.h` (`GENESIS_TX` per network) in the [chain repo](https://github.com/hempmillionaire/nono).
