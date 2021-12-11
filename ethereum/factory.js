import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1De538B5ad10E74e5fAcb84DFE818c0C76FCffab'
);

export default instance;