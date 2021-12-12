import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import campaign from '../../../ethereum/campaign';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    render() {
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Open a request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;