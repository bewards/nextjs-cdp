This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and [Sitecore Engage SDK package](https://doc.sitecore.com/cdp/en/developers/api/integrate-engage-sdk-nextjs-server-side.html) (server-set cookies).

🐻 The Engage SDK is managed using [Zustand State Management](https://github.com/pmndrs/zustand)

✨ Current Feature List
- Page Views
- IDENTITY event via Simple Form (FormCoupon)

## Getting Started

### Create a Local .env at the root with the required Engage attributes
```.env
ENGAGE_CLIENT_KEY=your_value
ENGAGE_TARGET_URL=your_value                # ex: https://api-engage-eu.sitecorecloud.io
ENGAGE_POS=your_value
NEXT_PUBLIC_ENGAGE_IDENTITY=your_value      # ex: DepotProvider_ID
```

### Setup Identity Rule in CDP
The code base is configured to send IDENTITY events through the ENV variable `NEXT_PUBLIC_ENGAGE_IDENTITY`. This Identity Provider will need to be added as a rule in your CDP if you want IDENTITY events to convert Visitors to Customers.

![CDP Identity Rules > Add Rule](docs/cdp_identity-rules.png)

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

