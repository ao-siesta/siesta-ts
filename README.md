# Discord Guild Support Bot

## Introduction
A bot for moderating and monitoring discord guilds. Recently been rewritten in TypeScript

## Setup

### Prerequisites
Required NodeJS v24.17.0

### Prepare config file

#### Bot related
1. Go to [Discord Developer Portal](https://discord.com/developers/home) and select your bot for development
2. Open `config.example.json` and fill in below info:
    - [General Information] Copy `Application ID` to `cid`
    - [Bot] Copy `Token` to `token`

#### Miaomi channel
- `miaomi`: Server ID
- `miaomiCh`: Channel ID
- `BDrole`: Birthday role ID

#### Rename file
Rename `config.example.json` to `config.json`

### Start dev server
Open your terminal:

```sh
# Install dependencies
npm install
pnpm install

# Register the commands
npm run cmdreg
pnpm cmdreg

# Start development
npm run dev
pnpm dev
```

### Auto Linting
This project supports auto-linting before `git commit`. You can skip this with `--no-verify` flag, e.g.:
```sh
git commit --no-verify -m "<Commit message>"
```

## Contact Us
Contact the developers with the following ways:
1. PR or Issues
2. Discord: 蒼アオ(@nkmrao)
3. [Twitter](https://twitter.com/nkmraoao/)
