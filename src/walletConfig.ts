import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://warpy.redstone.finance',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};
export const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet],
  metadata,
  projectId,
  features: {
    analytics: true,
    socials: false,
    email: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#e55169',
    '--w3m-font-family': 'Poppins',
  },
});
