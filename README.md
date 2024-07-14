# SolSight

## Overview

SolSight is an explorer/dashboard for the Solana blockchain, providing users with an intuitive interface to explore and analyze key network data. This project is an experiment front-end built under 48 hours, focused on good practices and great UI.

## Features

- **Data Dashboard**: View information such as current epoch, slot, and transaction count...
- **View Account Data**: Display some basic information about an account.
- **View Account Transactions**: Display a list of recent transactions with key details.
- **View Account Assets**: Display a list of user assets such as NFTs and tokens.
- **View Transaction Data**: Display data about a transaction.
- **Light/Dark Mode**: A nice and simple good to have feature.
- **Internationalization**: The code is made ready to support multiple languages, but currently it only supports English.

## Technical Features

The website is more than a simple front-end, because it uses Next.js new features of server components, all components that require data from the RPC or APIs are server-side components.

Why?

Because it's expensive to query the RPC/APIs on every page load, and in the case of Helius it uses a lot of credits. By fetching the data in the server we can cache it between users and requests.

## Structure Explained

The `src` folder contains the following folders:

- app: Nextjs routes & pages
- components
  - server: components rendered in the server that fetches data and caches it.
  - client: components rendered in the client that also are part of the business logic.
  - ui: components responsible only for displaying data in a nice way.
  - dev: components that are created during development but not still not used.
- i18n: Internationalization
- styles: global/reusable CSS
- utils: TypeScript functions that are used repeatedly in the app.

## Installation and Setup

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

1. Clone the repository:

   ```
   git clone https://github.com/sekaiking/solsight.git
   cd solsight
   ```

2. Install dependencies (I prefer pnpm, but use whichever you prefer):

   ```
   pnpm install
   ```

3. Rename the `.env.example` file to `.env` and fill in the following values:

   ```
   SOLANA_RPC_URL=
   SOLANA_BEACH_API=
   SOLANA_BEACH_KEY=
   HELIUS_API=
   HELIUS_KEY=
   ```

4. Start the development server:

   ```
   pnpm dev
   ```

5. Open `http://localhost:3000` to view the app in your browser.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or feedback, please reach out to us at:

- Email: <afaithraf@gmail.com>
