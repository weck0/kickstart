import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class ContributeForm extends Component {

    state = {
        contribution: '',
        errorMessage:'',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        try{   
            const accounts = await web3.eth.getAccounts();
            const campaign = await Campaign(this.props.address);
            await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.contribution, 'ether')
                });
        } catch (error) {
            this.setState({errorMessage: error.message});
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input 
                    label='ether'
                    labelPosition='right'
                    value={this.state.contribution}
                    onChange={event => this.setState({ contribution: event.target.value })} />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button loading={this.state.loading} primary>
                    Contribute !
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;