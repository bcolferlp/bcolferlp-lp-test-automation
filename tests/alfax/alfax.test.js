import AlfaTokenAPI from '../../src/apis/alfax/alfaxTokenAPI';
import alfaxData1 from '../../data/alfax/alfaxData1';
import AlfaExampleAPI from '../../src/apis/alfax/alfaExampleAPI';

describe('Test Suite Alfa API 1', () => {
  let alfaToken;
  beforeAll(async () => {
    alfaToken = await new AlfaTokenAPI().getToken();
    console.log(alfaToken);
  });

  test.each(alfaxData1)('Test Case 1', async data => {
    expect(alfaToken).not.toContain('Error');
    const dataJsonobj = data.dataJson;
    const bodyJson = JSON.stringify(dataJsonobj, null, 1);
    const alfaExample = new AlfaExampleAPI(alfaToken, bodyJson);
    const results = await alfaExample.getResults();
    console.log(results);
  });
});
