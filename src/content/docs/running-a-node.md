---
title: Running a node
description: Compile nonod, run it as a service, and keep the chain pruned — the operator's guide.
group: Node Operators
order: 4
---

Running a full node validates the chain yourself, relays blocks and transactions for other peers, and keeps NONO decentralized. Every miner already runs one; this page is for anyone who wants to run a node without mining, or wants it running as a proper service.

## Compiling

### Linux and macOS

```bash
git clone --recursive https://github.com/hempmillionaire/Nono
cd Nono
make
```

NONO hasn't tagged a release yet, so build from `master`. Once a release tag exists (e.g. `v0.1.0`), `git checkout v0.1.0` before `make` is the safer default — `master` keeps moving and can be unstable. Add `make -j<threads>` for a parallel build (budget ~2GB RAM per thread). Binaries land in `build/release/bin`; add that to your `PATH`.

Optional:

```bash
make release-test   # run the test suite (core_tests can take hours)
make debug           # build with debug symbols
```

### Raspberry Pi

Tested on a Raspberry Pi 5B running 64-bit Raspberry Pi OS (Debian 12). Same `make` flow as Linux — expect a build that takes considerably longer on Pi-class hardware.

### Windows, BSD, and cross-compiling

These have their own dependency and toolchain steps (MSYS2 on Windows; pkg lists for FreeBSD/OpenBSD/NetBSD; a `contrib/depends` cross-compile path for other targets). Rather than duplicate the full dependency tables here, follow the "Compiling NONO from source" section of the [chain repo README](https://github.com/hempmillionaire/nono#compiling-nono-from-source) directly — it's kept current there.

## Running `nonod`

```bash
./bin/nonod
```

runs in the foreground. `./bin/nonod --help` lists every option; anything on the command line can also go in a config file passed via `--config-file`, one `argumentname=value` per line (no leading dashes).

To run detached with logging:

```bash
./bin/nonod --log-file nonod.log --detach
```

### As a systemd service

The repo ships an example unit and config:

- `utils/systemd/nonod.service` → copy to `/etc/systemd/system/`
- `utils/conf/nonod.conf` → copy to `/etc/`

The example service assumes a `nono` system user whose home directory is the data directory referenced in the config.

## Pruning

NONO's chain is new and currently small, so there's no established long-term size guidance yet — expect growth roughly proportional to the inherited Monero block-weight ceiling at a 60-second block time. A pruned node still serves the most recent ~5,500 blocks to other peers and is otherwise functionally identical to a full node; it just doesn't keep the entire historical chain.

Start pruned from the initial sync with:

```bash
nonod --prune-blockchain
```

To prune an existing full chain, either use the `nono-blockchain-prune` tool or add `--prune-blockchain` to an existing node — this temporarily needs disk space for both the full and pruned copies during the conversion.

## Debugging

`nonod --help` and the daemon logs (`--log-file`, `--log-level`) are the first stop. For crash investigation, stack traces, core dumps, ASAN, and valgrind workflows, see [`docs/COMPILING_DEBUGGING_TESTING.md`](https://github.com/hempmillionaire/nono/blob/master/docs/COMPILING_DEBUGGING_TESTING.md) in the chain repo — this is inherited Monero tooling and applies to `nonod` unchanged.

Source: `README.md` ("Compiling NONO from source", "Running nonod", "Pruning", "Debugging") in the [chain repo](https://github.com/hempmillionaire/nono).
