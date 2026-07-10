---
title: Privacy & Tor
description: Route nonod and the wallet over Tor or I2P for network-level privacy on top of on-chain privacy.
group: Node Operators
order: 5
---

RingCT, stealth addresses, and bulletproofs+ hide *what* you sent and *to whom* on-chain. They don't hide *which IP address* broadcast a transaction. Routing over Tor or I2P closes that gap. NONO inherits Monero's anonymity-network integration unchanged, so everything below is the same wire protocol, with NONO's own ports substituted in.

This is still considered experimental upstream — there are known pessimistic edge cases where privacy can leak. Treat it as a strong improvement, not a guarantee.

## How it works

- `--proxy <host:port>` routes **all** external traffic (block sync, peer connections, update checks) through a SOCKS proxy. It treats the proxy as clearnet — it will not use it to reach hidden services.
- `--tx-proxy <network>,<host:port>[,<max-connections>]` enables anonymity-network mode specifically for transaction relay. Once any anonymity network is enabled, transactions that didn't arrive over a normal P2P connection (i.e. your own transactions) are broadcast **only** over anonymity-network peers — never leaked to clearnet.
- Only Tor and I2P are currently integrated.

## Sync the chain through Tor

`nonod` can't sync blocks over onion/I2P hidden services directly, but it can sync over IPv4 through a SOCKS proxy:

```bash
nonod --proxy 127.0.0.1:9050 --p2p-bind-ip 127.0.0.1
```

`--p2p-bind-ip 127.0.0.1` stops `nonod` from also listening for inbound connections on your public interface.

## Broadcast transactions anonymously

```bash
nonod \
  --tx-proxy tor,127.0.0.1:9050,10 \
  --tx-proxy i2p,127.0.0.1:4447
```

This can be combined with `--proxy` above. A ready-made helper that starts Tor and `nonod` with the right flags is at `contrib/tor/nono-over-tor.sh` in the chain repo.

## Using the wallet over Tor

`nono-wallet-cli` and `nono-wallet-rpc` can connect to a daemon through a proxy the same way (`--proxy [socks5://[user:pass]]host:port`, SOCKS 4/4a/5 supported). If the daemon isn't your own hidden service, pass `--untrusted-daemon` so the wallet doesn't trust remote block data implicitly. By default the wallets only accept `.onion`/`.i2p` daemon addresses unless you also pass daemon SSL/cert flags.

## Tails

TAILS' firewall is restrictive by default, so allow the local RPC port explicitly before routing through torsocks:

```bash
sudo iptables -I OUTPUT 2 -p tcp -d 127.0.0.1 -m tcp --dport 24701 -j ACCEPT
DNS_PUBLIC=tcp torsocks ./nonod --p2p-bind-ip 127.0.0.1 --rpc-bind-ip 127.0.0.1 \
    --data-dir /home/amnesia/Persistent/your/directory/to/the/blockchain
```

(`24701` is NONO's default local RPC port — see [Network parameters](/docs/network-parameters).)

Source: `docs/ANONYMITY_NETWORKS.md`, `docs/proxies.md`, `README.md` ("Using Tor") in the [chain repo](https://github.com/hempmillionaire/nono).
