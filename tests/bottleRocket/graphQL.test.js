import GraphQL from '../../src/apis/graphQLAPI';
import Cognito from '../../src/apis/getStuff';

require('dotenv').config();

jest.setTimeout(60000 * 5);

const endPoint = 'https://br1-partner.api.loanpal.com/graphql';
const token =
  'eyJraWQiOiJhSlwvYWJ3NWxSb3JpRnBBYWY2ZlBGc01WaWFHV2t1cjBUUzVlTDhPTHhvaz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNDlhM2E0NC0yMzczLTQwY2YtOWIyYy01NDcwYjQxMWVhN2EiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXJ0bmVyLW1hbmFnZXIiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpjbGllbnRJZCI6IjFzdExpZ2h0IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfcEcxeTlDMkRxIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoibmdvbnphbGV6QGxvYW5wYWwuY29tIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMXN0bGlnaHRAbmdvbnphbGV6QGxvYW5wYWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik5pY2siLCJhdWQiOiI3bHRsY3E2djZqamlsdGwzMmE0b3FxamNxMSIsImV2ZW50X2lkIjoiYjZiZGQ4NGMtODcyMS00ZGE5LTgyYWItYWYxMzY3NDE4OGRjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODAxNTc4ODMsIm5hbWUiOiJOaWNrIEdvbnphbGV6IiwicGhvbmVfbnVtYmVyIjoiKzE5MTY2NjY3Nzc3IiwiZXhwIjoxNTgwMTcwNDgyLCJpYXQiOjE1ODAxNjY4ODIsImZhbWlseV9uYW1lIjoiR29uemFsZXoiLCJlbWFpbCI6Im5nb256YWxlekBsb2FucGFsLmNvbSJ9.ycULVse8hNxhmucZFpyV_k3PxWKYj9Rh8hd9Ieqf0359UPYtTPkBxnG4hxhV86bzCxT12CuFQOgkV2UmjTMljoBjohlHusxws57zoypeXpSoArh4n2u5SlEDGTUOnSeU5sZB1I7pVtnZEo7g9h0fJeUMfnr4FB21k_K8ThTht8xmEc5gQ1mXVlD1DF6fCLFrqOcqLwpILzDGRC1Ymdo2ijeau_xGSVvpz9eY8x_u2WB5qdA08DMhBCu-XEHcq_bnrTSx0iYVnTn3LpMZZkE6Ij0-0s8Oxv8hecE4hgd_EQ-nm6PSxhg99TfzMtS40jaVJjP4ug-0FqOfkKyHLKdc8A';

describe('GraphQL', () => {
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
    const graphQL = new GraphQL(endPoint, token);
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
    const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/g;
    const variable = { termId: 'TRMS-ddd9dec5-1ea8-46ef-b103-7ff74bd66456' };
    const graphQL = new GraphQL(endPoint, token);
    const result = await graphQL.request(query, variable);
    const allTerms = result.acceptTerms.acceptedTerms;
    const latestTerm = allTerms[allTerms.length - 1];
    console.log('latestTerm', latestTerm);
    expect(latestTerm).toEqual(expect.objectContaining({ termsAndConditionsId: variable.termId, dateAccepted: expect.stringMatching(regex) }));
  });

  test.only('getStuff', async () => {
    const config = {
      UserPoolId: 'us-west-2_pG1y9C2Dq',
      ClientId: '3jhc8h6f4qscr9kvrmj64n51hg',
      Username: process.env.testEmail,
      Password: process.env.emailPass
    };
    const cog = new Cognito(config);
    const result = await cog.login();
    console.log(result, 'result');
  });
});
