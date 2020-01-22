const { fs, request, urls } = require('../utilities/imports');

const callback = () => {};

export default class DocuSignAPI {
  constructor(envelopeId) {
    this.envelopeId = envelopeId;
    this.headers = {
      'Content-type': 'applcation/pdf',
      'X-DocuSign-Authentication': '{"Username": "bfieber@loanpal.com", "Password": "All4nada!", "IntegratorKey": "ef5ad7ca-ac50-49b1-a761-fd53165a1c3a" }'
    };
  }

  doGetRequest(url, filename) {
    const { headers } = this;
    return new Promise(function(resolve) {
      request(
        {
          url,
          headers
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

  async getAllTemplates() {
    const { headers } = this;
    const url = `${urls.docuSign}/envelopes/${this.envelopeId}/templates`;
    return new Promise(function(resolve, reject) {
      request.get({ url, headers }, function(err, res, body) {
        if (err) reject(err);
        if (body) resolve(JSON.parse(body));
      });
    });
  }

  async getDocTemplate(templateId) {
    const { headers } = this;
    const url = `${urls.docuSign}/templates/${templateId}`;
    return new Promise(function(resolve, reject) {
      request.get({ url, headers }, function(err, res, body) {
        if (err) reject(err);
        if (body) resolve(JSON.parse(body));
      });
    });
  }
}
