import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
         };
    }
    
    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
              header: manager,
              meta: 'Manager Address',
              description: 'The manager which created this campaign and can create requests to withdraw money.',
              style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution',
                description: 'The minimum contribution required in order to participate in the project'
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'The number of requests made in the project'
            },
            {
                header: approversCount,
                meta: 'Numbers of approvers',
                description: 'The numbers of people who already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ETH)',
                description: 'The total amount available to spend'
            }
        ]

            return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;