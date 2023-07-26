var soap = require('soap');
var apiEndpoint = 'https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR';

var headers = {
'CF-Access-Client-Id': '30979c34f222ca7ac7ac3d24120060a5.access',
'CF-Access-Client-Secret':'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048'
}

var payload = {
    'web_search_kde': {
      'web_fld_names': ['ADD_NUMMER', 'ANS_EMAIL', 'ADD_TYP'],
      'web_flds_fill': ['', 'rohandhakad1998@gmail.com', '3'],
      'web_error': {
        'web_err_nr': 0,
        'web_err_txt': '',
      },
    },
    'web_user': '',
    'web_Pass': '',
};

soap.createClient(apiEndpoint, {wsdl_headers: headers}, function(err, client) {


//   client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
//   client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
//   client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');

    client.web_search_customer(payload, function(err, result) {
       console.log(result);
    });
}); 