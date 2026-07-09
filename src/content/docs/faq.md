---
title: FAQ
description: Straight answers to the questions people actually ask before mining or building on NONO.
group: Reference
order: 10
---

## Is there really no premine?

Correct. The genesis coinbase output is paid to a NUMS pubkey with no known private key — provably unspendable, not just promised to be. You can regenerate the exact bytes yourself; see [Verifying the genesis block](/docs/verify-genesis).

## Is there a dev tax or founder allocation?

No. There's no protocol-level fee redirect and no special-cased address that receives coins outside of normal mining. Every NONO in circulation was mined. See [Emission & supply](/docs/emission).

## Can I mine with a GPU or ASIC?

You can try, but RandomX is deliberately designed to be inhospitable to specialized hardware — it's built to run best on general-purpose CPUs, so a GPU/ASIC miner has no meaningful advantage over a CPU here. See the [Mining guide](/docs/mining).

## Are there release binaries yet?

Not yet. NONO hasn't tagged its first release, so the only path today is building from source — see [Getting started](/docs/getting-started). Release binaries and prebuilt installers are on the roadmap.

## Are there public mining pools?

Not yet — mining today is solo. At a 60-second block target, solo mining is far more attainable than on chains with longer block times. See [Mining guide](/docs/mining) and the [ecosystem status](/#ecosystem) on the homepage.

## What wallets are available?

Only `nono-wallet-cli` today, built from source. Desktop, mobile, and web wallets are planned — see the [Wallet guide](/docs/wallet) and the [ecosystem status](/#ecosystem).

## Is NONO audited?

NONO's own changes (network parameters, emission curve, genesis construction, branding) have not had an independent third-party audit. The cryptography and consensus machinery it inherits — RingCT, stealth addresses, bulletproofs+, RandomX, CLSAG — come from Monero's codebase largely unchanged, and carry Monero's own audit and review history with them. NONO does not invent new cryptography.

## Is NONO affiliated with Monero?

No. NONO is built on the Monero source tree and owes its cryptography and protocol design to the Monero Project and the Cryptonote authors, but the Monero Project has not endorsed NONO and isn't affiliated with it. Bugs introduced by NONO's own changes are NONO's responsibility, not Monero's.

## How do I verify I'm on the right network?

Check your node's genesis hash and P2P/RPC ports against [Network parameters](/docs/network-parameters). A node with the wrong genesis or network ID simply won't peer with the rest of the mainnet — there's no ambiguous "half-synced to the wrong chain" state.

## How can I help without writing code?

Run a node, mine, write tutorials, translate docs, help newcomers in [Discord](https://discord.gg/Tuwt6TAbJw), or build wallets/explorers/tools — see the [homepage community section](/#community) for the current list of what's open.
