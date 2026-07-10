---
title: Wallet guide
description: Create, restore, and use the nono-wallet-cli wallet — the only wallet that ships with the source today.
group: Getting Started
order: 3
---

`nono-wallet-cli` ships with the source today. Desktop, mobile, and web wallets are on the [ecosystem roadmap](/#ecosystem) — see the homepage for status.

## Create a wallet

```bash
nono-wallet-cli --generate-new-wallet ~/nono-wallet
```

You'll set a password and be shown a 25-word Electrum-style mnemonic seed. That seed **is** your money — anyone who has it can spend your funds, and there is no password reset or account recovery if you lose it. Write it down offline, somewhere durable, more than once.

## Restore a wallet from seed

Moving to a new machine, or recovering after loss:

```bash
nono-wallet-cli --restore-deterministic-wallet
```

The CLI will prompt for the mnemonic seed and the wallet file name to write. This fully reconstructs your spend/view keys and address from the seed — nothing else is needed.

## Basic commands

Once inside the interactive `nono-wallet-cli` prompt:

| Command | What it does |
|---|---|
| `address` | Show your wallet's receiving address |
| `balance` | Show unlocked and total balance |
| `transfer <address> <amount>` | Send NONO to an address |
| `seed` | Display the mnemonic seed (do this somewhere private) |
| `save` | Save the wallet file |
| `exit` | Save and quit |

Run `help` inside the wallet for the full command list — it inherits Monero's simplewallet command set unchanged.

## Security notes

- **The seed is the wallet.** No company, exchange, or NONO contributor can recover it for you.
- **Back up before you need to.** Test a restore on a spare machine if you want confidence the backup actually works.
- **Verify addresses carefully.** NONO uses stealth addresses and RingCT, inherited unchanged from Monero — a NONO address is not reused on-chain the way a Bitcoin address is, so double-check you're sending to the right string, not a truncated or malformed one.
- **Pointing at an untrusted daemon** (e.g. through Tor, see [Privacy & Tor](/docs/privacy-tor))? Pass `--untrusted-daemon` unless it's your own node.

Source: `src/simplewallet/simplewallet.cpp` in the [chain repo](https://github.com/hempmillionaire/nono).
