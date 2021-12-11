import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xbEF81D3B9cb6A219f2CF08C49717292bdE33C777'
);

export default instance;