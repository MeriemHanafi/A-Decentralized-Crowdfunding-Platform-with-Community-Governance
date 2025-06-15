import React, { Component } from 'react';
import Layout from "../../components/Layout";
import Campaign from '../../ethereum/campaign';
import { CardGroup, Button,GridRow, GridColumn, Grid } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
      static async getInitialProps(props) {
        const campaign= Campaign(props.query.address);
        console.log("CAMPAIGN INFO: ", campaign);
        const summary= await campaign.methods.getSummary().call();
        console.log('SUMMARYYYY: ', summary);
        return{
          address: props.query.address,
          minimumContribution: summary[0].toString(),
          balance: summary[1].toString(),
          requestsCount: summary[2].toString(),
          approversCount: summary[3].toString(),
          manager: summary[4].toString()
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
            description:
              'The manager created this campaign and can create requests to withsraw money.',
            meta: 'Address of the manager',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: minimumContribution,
            description:
              'You MUST contribute at least this much wei to become an approver.',
            meta: 'Minimum Contribution (wei)',
          },
          {
            header: requestsCount,
            description:
              'A request tries to withdraw money from the contrat. Requests MUST be approved by approvers.',
            meta: 'Number of requests',
          },
                    {
            header: approversCount,
            description:
              'Number of approvers who have already donated to this campaign.',
            meta: 'Number of approvers',
          },
                    {
            header: web3.utils.fromWei(balance,'ether'),
            description:
              'The balance is how much money this campaign has left to spend.',
            meta: 'Campaign balance (ether)',
          },
        ]
        return <CardGroup items={items} />;

      }
    render() {
        return(
         <Layout>
            <h3>Show Campaign</h3>
            <Grid>
              <GridRow>
              <Grid.Column width={10}>
                {this.renderCards()}
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
              </Grid.Column>
              </GridRow>

              <GridRow>
                <Grid.Column>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>
                      View Requests
                    </Button>
                  </a>
                </Link>
                </Grid.Column>
              </GridRow>

            </Grid>
            
            
         </Layout>
        )
    }
}

export default CampaignShow;