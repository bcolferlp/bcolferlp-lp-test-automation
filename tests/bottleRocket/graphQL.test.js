import moment from 'moment';
import GraphQL from '../../src/apis/graphQLAPI';
import Cognito from '../../src/apis/cognitoAPI';

require('dotenv').config();

jest.setTimeout(60000 * 5);

describe('GraphQL', () => {
  let token;
  let graphQL;
  const endPoint = 'https://br1-partner.api.loanpal.com/graphql';
  const config = {
    UserPoolId: process.env.cognitoUserPoolId,
    ClientId: process.env.cognitoClientId,
    Username: process.env.testEmail,
    Password: process.env.emailPass
  };

  beforeAll(async () => {
    const cog = new Cognito(config);
    token = await cog.getToken();
    graphQL = new GraphQL(endPoint, token);
  });

  test('97460: LPLBACK-8 Get terms and Conditions', async () => {
    const query = `{
        terms(current:true){
            id
            version
            sections{
              sort
              title
              subTitle
              text
            }
            current
          }
      }`;

    const result = await graphQL.request(query);
    expect(result).toMatchSnapshot();
  });

  test('97461: LPLBACK-9 Accept Terms and Conditions', async () => {
    const query = `
    mutation acceptTerms($termId: ID!){
        acceptTerms(termsId: $termId){
          id
          acceptedTerms{
            termsAndConditionsId
            dateAccepted
          }
        }
      }`;
    const date = moment().format('YYYY-MM-DD');
    const variable = { termId: 'TRMS-ddd9dec5-1ea8-46ef-b103-7ff74bd66456' };
    const result = await graphQL.request(query, variable);
    const allTerms = result.acceptTerms.acceptedTerms;
    const latestTerm = allTerms[allTerms.length - 1];
    console.log('latestTerm', latestTerm);
    expect(latestTerm).toEqual(expect.objectContaining({ termsAndConditionsId: variable.termId, dateAccepted: expect.stringMatching(date) }));
  });
});
