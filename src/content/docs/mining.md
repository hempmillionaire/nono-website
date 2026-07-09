---
title: Mining guide
description: Mine NONO from a CPU with RandomX — flags, thread tuning, background mining, and troubleshooting.
group: Getting Started
order: 2
---

NONO uses **RandomX**, the same proof-of-work Monero uses. RandomX is deliberately optimized for general-purpose CPUs rather than ASICs or GPUs — it leans on random code execution and large memory access patterns that specialized hardware doesn't have a meaningful edge on. Practically, that means a laptop mines on the same terms as anyone else, and hash power stays distributed instead of concentrating in a handful of ASIC farms.

## Mine to your own address

You need a wallet address first — see the [Wallet guide](/docs/wallet) if you don't have one yet. Then:

```bash
nonod --start-mining <YOUR_NONO_ADDRESS> --mining-threads 4
```

- `--start-mining <address>` tells `nonod` to mine and pay the block reward to that address.
- `--mining-threads <n>` sets how many CPU threads to dedicate. Omit it and `nonod` picks a thread count for you; set it explicitly to leave headroom for the rest of your system.

Both flags come from the daemon's built-in miner (`src/cryptonote_basic/miner.cpp` in the chain repo) — nothing NONO-specific has changed here from upstream Monero's miner.

## Running in the background

Combine mining with a detached, logged daemon so it survives closing your terminal:

```bash
nonod --start-mining <YOUR_NONO_ADDRESS> --mining-threads 4 --log-file nonod.log --detach
```

For a persistent setup, run `nonod` as a systemd service (see [Running a node](/docs/running-a-node#running-nonod)) and put `start-mining` and `mining-threads` in the config file instead of the command line, using `argumentname=value` syntax, e.g.:

```
start-mining=<YOUR_NONO_ADDRESS>
mining-threads=4
```

## Choosing a thread count

RandomX is memory-hard — it benefits from fast RAM and large caches more than raw core count. Rough guidance:

- Leave at least one core free if you're using the machine for anything else.
- More threads helps up to roughly your physical core count; hyperthreads add less because RandomX is memory-bound, not just compute-bound.
- Watch memory usage: RandomX allocates a large dataset (~2GB) for full-speed "fast mode" verification. Low-RAM machines may need to mine in a lighter mode — check `nonod --help` for the current memory-related flags on your build.

## Solo mining today

There are no public NONO mining pools yet (see [Ecosystem](/#ecosystem) on the homepage), so mining today is solo: your node finds a block, you get the whole reward, straight to your address, no pool fee. At a 60-second block target this is far more attainable for small miners than most chains' 10-minute targets — see [Emission & supply](/docs/emission) for why the curve was shaped this way.

## Troubleshooting

- **No blocks found for a long time**: expected with solo mining at low hash rate — you're competing against total network hash rate for the whole reward, there's no partial/shared payout. This is inherent to solo CPU mining, not a bug.
- **High memory pressure / swapping**: reduce `--mining-threads`, or check for a "light mode" RandomX flag in `nonod --help` on your build — light mode trades throughput for far less RAM.
- **Crashes while mining on macOS**: try adding `--max-concurrency 1`.

Source: `src/cryptonote_basic/miner.cpp`, `README.md` ("Running nonod") in the [chain repo](https://github.com/hempmillionaire/nono).
