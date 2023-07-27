/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */


const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
const {SearchInFutura,createBlankCustomer, getCustomerById, UpdateCustomerInFututra} = require('../futura')
const soap = require('soap');
const { parseString } = require('xml2js');
const { async } = require('regenerator-runtime');

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)

var apiEndpoint = 'https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR';

    var headers = {
    'trace':1, 
    'exceptions': true,
    'CF-Access-Client-Id': '30979c34f222ca7ac7ac3d24120060a5.access',
    'CF-Access-Client-Secret':'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048'
  }

var searchCustomerPayload = {"web_search_kde":{"web_fld_names":{"string":["ADD_NUMMER","ANS_EMAIL","ADD_TYP"]},"web_flds_fill":{"string":["","rohan.1998@gmail.com","3"]},"web_error":{"web_err_nr":0,"web_err_txt":""}}}	

  var GetCustomerByIdpayload = {
    Value: {
      web_kde_nummer: 704732351,
      web_kde_typ: 3,
      web_kde_index: '',
      web_kde_filiale: 0,
      web_kde_land: '1',
      web_kde_region: '0',
      web_kde_konto: 0,
      web_kde_vertreter: 0,
      web_kde_rabatt: 0,
      web_kde_rab_regel: 0,
      web_kde_kondition: '',
      web_kde_waehrung: '',
      web_kde_provision: 0,
      web_kde_kreditlimit: 0,
      web_kde_eigensch_typ: 0,
      web_kde_eigen_page: 0,
      web_kde_eigensch: '',
      web_kde_berater: 0,
      web_kde_eigensch_aend: 0,
      web_kde_kreditvers: '',
      web_kde_haendler: 0,
      web_kde_preisstufe: 0,
      web_kde_egsteuernr: '',
      web_kde_fasteuernr: '',
      web_kde_keine_ust: 0,
      web_kde_skonto: 0,
      web_kde_skonto_frist: 0,
      web_kde_plz_index: '',
      web_kde_prio: 0,
      web_kde_tour: 0,
      web_error: {
        web_err_nr: 0,
        web_err_txt: '',
      },
    },
    web_user: '',
    web_Pass: ''
  };

//customer Fields
const customerFields = {
  get_web_customerResult: {
    web_kde_nummer: 704732395,
    web_kde_typ: 3,
    web_kde_index: '',
    web_kde_filiale: 0,
    web_kde_land: '0',
    web_kde_region: '0',
    web_kde_konto: 0,
    web_kde_vertreter: 0,
    web_kde_rabatt: 0,
    web_kde_rab_regel: 0,
    web_kde_kondition: '',
    web_kde_waehrung: '',
    web_kde_provision: 0,
    web_kde_kreditlimit: 0,
    web_kde_eigensch_typ: 0,
    web_kde_eigen_page: 0,
    web_kde_eigensch: '',
    web_kde_berater: 0,
    web_kde_eigensch_aend: 0,
    web_kde_kreditvers: '',
    web_kde_haendler: 0,
    web_kde_preisstufe: 0,
    web_kde_egsteuernr: '',
    web_kde_fasteuernr: '',
    web_kde_keine_ust: 0,
    web_kde_skonto: 0,
    web_kde_skonto_frist: 0,
    web_kde_plz_index: '',
    web_kde_prio: 0,
    web_kde_tour: 0,
    web_error: { web_err_nr: 0, web_err_txt: '' }
  }
};

//commom fields
const commonFields = {
    get_web_commonResult: {
        web_add_typ: 3,
        web_add_number: 704732395,
        web_add_index: 'B0',
        web_add_zahlart: 0,
        web_add_zahlinttyp: 0,
        web_add_zahlintcount: 0,
        web_add_last_rg_datum: '1899-12-29T18:38:50.000Z',
        web_add_last_pay_datum: '1899-12-29T18:38:50.000Z',
        web_add_kundennummer: '',
        web_add_bankname: '',
        web_add_bankleitzahl: '',
        web_add_bankkonto: '',
        web_add_bic: '',
        web_add_iban: '',
        web_add_kreditkarte: '',
        web_add_sperrdatum: '1899-12-29T18:38:50.000Z',
        web_add_sperrgrund: '',
        web_add_last_sammelrg_datum: '1899-12-29T18:38:50.000Z',
        web_add_manumahnung: 0,
        web_add_status: 2,
        web_add_loesch_datum: '1899-12-29T18:38:50.000Z',
        web_add_inactive: 0,
        web_add_bildname: '',
        web_add_zahlziel: 0,
        web_add_gutschrift: 0,
        web_add_sprache: '',
        web_add_fibuexport_first: '1899-12-29T18:38:50.000Z',
        web_add_fibuexport_last: '1899-12-29T18:38:50.000Z',
        web_add_vfw_bereich: 0,
        web_add_rg_druckrabatt: 0,
        web_add_rg_druckformat: 0,
        web_add_info_nodisplay: 0,
        web_add_externid: '',
        web_add_geschlecht: 0,
        web_add_werbung: 0,
        web_add_master_typ: 0,
        web_add_master_nummer: 0,
        web_add_karte_erfasst: '1899-12-29T18:38:50.000Z',
        web_add_karte_ausgegeben: '1899-12-29T18:38:50.000Z',
        web_add_ohne_bonus: 0,
        web_add_wf_status: 0,
        web_add_wf_flags: 0,
        web_add_wf_id: 0,
        web_add_wf_date_time_1: '1899-12-29T18:38:50.000Z',
        web_add_wf_date_time_2: '1899-12-29T18:38:50.000Z',
        web_add_wf_date_time_3: '1899-12-29T18:38:50.000Z',
        web_add_import_datum: '1899-12-29T18:38:50.000Z',
        web_add_export_datum: '1899-12-29T18:38:50.000Z',
        web_add_datum_user: '1899-12-29T18:38:50.000Z',
        web_add_obild: '',
        web_add_obild_ext: '',
        web_add_clog_user: 0,
        web_add_clog_date_time: '1899-12-29T18:38:50.000Z',
        web_add_ulog_user: 0,
        web_add_ulog_date_time: '1899-12-29T18:38:50.000Z',
        web_error: { web_err_nr: 0, web_err_txt: '' }
    }
};

//Address fields
const jsonString = '{"get_web_addressResult":{"Tweb_ans":[{"web_ans_typ":3,"web_ans_number":704732395,"web_ans_count":1,"web_ans_name1":"","web_ans_name2":"","web_ans_strasse":"","web_ans_strasse_2":"","web_ans_plz":"","web_ans_plz_zusatz":"","web_ans_postfach_valid":0,"web_ans_postfach_plz":"","web_ans_postfach_plz_zusatz":"","web_ans_postfach":"","web_ans_ort":"","web_ans_county":"","web_ans_land":"1","web_ans_titel":"","web_ans_anrede":"","web_ans_sachbearbeiter":"","web_ans_sachgeburtstag":"1899-12-29T18:38:50.000Z","web_ans_telefon":"","web_ans_telefon2":"","web_ans_telefax":"","web_ans_email":"rohandhakad1998@gmail.com","web_ans_com_mode":"0","web_ans_m_typ":0,"web_ans_modem":"","web_error":{"web_err_nr":0,"web_err_txt":""}}]}}';
const jsonData = JSON.parse(jsonString);
var addressFields = jsonData.get_web_addressResult.Tweb_ans;

var updateCustomerpayload = {
  'web_kde': customerFields.get_web_customerResult,
  'web_add': commonFields.get_web_commonResult,
  'web_ans': addressFields,
  'web_user': '',
  'web_Pass': ''
};

var result = await SearchInFutura(apiEndpoint, headers, searchCustomerPayload);
var SearchInFuturaResult = result.web_search_customerResult.Tweb_search_kde_fld[0].web_error.web_err_nr;

if(SearchInFuturaResult == 1) {
  //customer not found
  var blankCustomer = await createBlankCustomer(apiEndpoint, headers);
  
  customerFields.get_web_customerResult.web_kde_nummer = blankCustomer.get_web_new_customer_idResult.web_kde_nummer;
  commonFields.get_web_commonResult.web_add_nummer = blankCustomer.get_web_new_customer_idResult.web_kde_nummer;
  jsonData.get_web_addressResult.Tweb_ans[0].web_ans_number = blankCustomer.get_web_new_customer_idResult.web_kde_nummer;
  jsonData.get_web_addressResult.Tweb_ans[0].web_ans_email = 'rohan.1998@gmail.com';

   //addressfields variable updated with new get_web_addressResult.Tweb_ans result
   addressFields = jsonData.get_web_addressResult.Tweb_ans;

  // Update the customer payload for updating customer detail API
  updateCustomerpayload = {
    'web_kde': customerFields.get_web_customerResult,
    'web_add': commonFields.get_web_commonResult,
    'web_ans': addressFields,
    'web_user': '',
    'web_Pass': ''
  };

  //calling update futura API
  var updateCustomerFutura = await UpdateCustomerInFututra(apiEndpoint, headers, updateCustomerpayload)

  const response = {
    statusCode: 200,
    body: updateCustomerFutura
  }
  return response

}
else {
  //customer found in futura
  jsonData.get_web_addressResult.Tweb_ans[0].web_ans_email = 'ritesh@gmail.com';

   //addressfields variable updated with new get_web_addressResult.Tweb_ans result
   addressFields = jsonData.get_web_addressResult.Tweb_ans;

  // Update the customer payload for updating customer detail API
  updateCustomerpayload = {
    'web_kde': customerFields.get_web_customerResult,
    'web_add': commonFields.get_web_commonResult,
    'web_ans': addressFields,
    'web_user': '',
    'web_Pass': ''
  };

  //calling update futura API
  var updateCustomerFutura = await UpdateCustomerInFututra(apiEndpoint, headers, updateCustomerpayload)

  const response = {
    statusCode: 200,
    body: updateCustomerFutura
  }
  return response
}

} 
  catch (error) {
    // log any server errors
    console.error(error); // Log the detailed error object
    // return with 500
    return errorResponse(500, 'server error'+error, logger)
  }

  // async function getWebCustomerData() {
  //   return new Promise((resolve, reject) => {
  //     soap.createClient(apiEndpoint, { wsdl_headers: headers }, function (err, client) {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  
  //       client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR');
  //       client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access');
  //       client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
  
  //       client.get_web_customer(payload, function (err, result) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       });
  //     });
  //   });
  // }
}

exports.main = main

// // Function to convert XML to JSON using xml2js
// function xmlToJSON(xmlData) {
//     return new Promise((resolve, reject) => {
//       parseString(xmlData, (err, result) => {
//         if (typeof err) {
//           reject(typeof err);
//         } else {
//           finalResult = resolve(result);
//         }
//       });
//     });
// }


 // var payload = {"web_search_kde":{"web_fld_names":{"string":["ADD_NUMMER","ANS_EMAIL","ADD_TYP"]},"web_flds_fill":{"string":["","rohandhakad1998@gmail.com","3"]},"web_error":{"web_err_nr":0,"web_err_txt":""}}}
  // var SearchInFuturaResults = await SearchInFutura(apiEndpoint, headers, payload);
