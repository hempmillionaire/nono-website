---
title: Getting started
description: Build the node, make a wallet, start mining — the fastest path from zero to a running NONO node.
group: Getting Started
order: 1
---

NONO doesn't have published release binaries yet, so the path to running it today is building from source. It's three steps: build, make a wallet, mine.

## 1. Build `nonod` and the wallet

```bash
git clone --recursive https://github.com/hempmillionaire/Nono
cd Nono
make
```

If your machine has spare cores and RAM (budget ~2GB per thread), speed this up with `make -j<threads>`. When it finishes, the binaries — `nonod`, `nono-wallet-cli`, `nono-wallet-rpc`, and friends — are in `build/release/bin`. Add that directory to your `PATH` so you can call them from anywhere.

Full platform-specific instructions (macOS, Raspberry Pi, Windows, BSD, cross-compiling) are on the [Running a node](/docs/running-a-node) page.

## 2. Create a wallet

```bash
nono-wallet-cli --generate-new-wallet ~/nono-wallet
```

You'll be asked to set a password and you'll be shown a 25-word recovery seed. Write it down somewhere that isn't a screenshot — it's the only way to recover funds if you lose the wallet file. Details and safety notes are on the [Wallet guide](/docs/wallet).

## 3. Start mining

```bash
nonod --start-mining <YOUR_NONO_ADDRESS> --mining-threads 4
```

That's it — `nonod` starts syncing the chain and mining to your address with 4 CPU threads. No GPU, no ASIC, no pool required. See the [Mining guide](/docs/mining) for thread tuning, background mining, and troubleshooting.

## What you get

- A full validating node contributing to network decentralization.
- A wallet you fully control — no exchange, no custodian, no account approval.
- A share of every block you mine, straight to your own address.

Source: `README.md` ("Compiling NONO from source", "Running nonod") in the [chain repo](https://github.com/hempmillionaire/nono).
