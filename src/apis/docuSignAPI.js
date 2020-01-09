const { fs, request, urls } = require('../utilities/imports');

const callback = () => {};

export default class DocuSignAPI {
  constructor(envelopeId) {
    this.envelopeId = envelopeId;
  }

  doGetRequest(url, filename) {
    return new Promise(function(resolve) {
      request(
        {
          url,
          headers: {
            'Content-type': 'applcation/pdf',
            'X-DocuSign-Authentication':
              '{"Username": "bfieber@loanpal.com", "Password": "All4nada!", "IntegratorKey": "ef5ad7ca-ac50-49b1-a761-fd53165a1c3a" }'
          }
        },
        function(error) {
          if (error) console.log('error:', error);
          resolve();
        }
      ).pipe(fs.createWriteStream(filename).on('close', callback));
    });
  }

  async downloadDocument(filename) {
    const url = `${urls.docuSign}/envelopes/${this.envelopeId}/documents/combined`;
    try {
      await this.doGetRequest(url, filename);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
