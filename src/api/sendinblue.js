var SibApiV3Sdk = require('sib-api-v3-typescript');

var apiInstance = new SibApiV3Sdk.SMTPApi()

// Configure API key authorization: api-key

var apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.API_KEY

// Configure API key authorization: partner-key

var partnerKey = apiInstance.authentications['partnerKey'];
partnerKey.apiKey = process.env.API_KEY

const sendinblue = (sendSmtpEmail) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('data for email', data)
      return true;
    }, function(error) {
      console.error(error);
      return false;
    });
}

module.exports = sendinblue