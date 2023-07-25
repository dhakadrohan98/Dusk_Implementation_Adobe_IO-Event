var soap = require('soap');
var url = 'https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR';

const data = {
    get_web_customerResult: {
      web_kde_nummer: 704732395,
      web_kde_typ: 3,
      web_kde_index: 'B0',
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

//   console.log(data)
  
//commom fields
const commonFields = {
    get_web_commonResult: {
      web_add_typ: 3,
      web_add_nummer: 704732395,
      web_add_index: '',
      web_add_zahlart: 0,
      web_add_zahlinttyp: 0,
      web_add_zahlintcount: 0,
      web_add_last_rg_datum: "1899-12-29T18:38:50.000Z",
      web_add_last_pay_datum: "1899-12-29T18:38:50.000Z",
      web_add_kundennummer: '',
      web_add_bankname: '',
      web_add_bankleitzahl: '',
      web_add_bankkonto: '',
      web_add_bic: '',
      web_add_iban: '',
      web_add_kreditkarte: '',
      web_add_sperrdatum: "1899-12-29T18:38:50.000Z",
      web_add_sperrgrund: '',
      web_add_last_sammelrg_datum: "1899-12-29T18:38:50.000Z",
      web_add_manumahnung: 0,
      web_add_status: 2,
      web_add_loesch_datum: "1899-12-29T18:38:50.000Z",
      web_add_inactive: 0,
      web_add_bildname: '',
      web_add_zahlziel: 0,
      web_add_gutschrift: 0,
      web_add_sprache: '',
      web_add_fibuexport_first: "1899-12-29T18:38:50.000Z",
      web_add_fibuexport_last: "1899-12-29T18:38:50.000Z",
      web_add_vfw_bereich: 0,
      web_add_rg_druckrabatt: 0,
      web_add_rg_druckformat: 0,
      web_add_info_nodisplay: 0,
      web_add_externid: '',
      web_add_geschlecht: 0,
      web_add_werbung: 0,
      web_add_master_typ: 0,
      web_add_master_nummer: 0,
      web_add_karte_erfasst: "1899-12-29T18:38:50.000Z",
      web_add_karte_ausgegeben: "1899-12-29T18:38:50.000Z",
      web_add_ohne_bonus: 0,
      web_add_wf_status: 0,
      web_add_wf_flags: 0,
      web_add_wf_id: 0,
      web_add_wf_date_time_1: "1899-12-29T18:38:50.000Z",
      web_add_wf_date_time_2: "1899-12-29T18:38:50.000Z",
      web_add_wf_date_time_3: '1899-12-29T18:38:50.000Z',
      web_add_import_datum: '1899-12-29T18:38:50.000Z',
      web_add_export_datum: '1899-12-29T18:38:50.000Z',
      web_add_datum_user: '1899-12-29T18:38:50.000Z',
      web_add_obild: '',
      web_add_obild_ext: '',
      web_add_clog_user: 0,
      web_add_clog_date_time: '2023-07-25T23:51:51.000Z',
      web_add_ulog_user: 0,
      web_add_ulog_date_time: '2023-07-25T23:51:51.000Z',
      web_error: { web_err_nr: 0, web_err_txt: '' }
    }
  }
  
//   console.log(commonFields);

//Address fields
const addressFields = {
    get_web_commonResult: {
      web_add_typ: 3,
      web_add_nummer: 704732395,
      web_add_index: '',
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
      web_add_clog_date_time: '2023-07-25T23:51:51.000Z',
      web_add_ulog_user: 0,
      web_add_ulog_date_time: '2023-07-25T23:51:51.000Z',
      web_error: { web_err_nr: 0, web_err_txt: '' }
    }
  }

//   console.log(addressFields);
  


var headers = {
    'trace':1, 
    'exceptions': true,
    'connection_timeout': 15, 	
    'CF-Access-Client-Id': '30979c34f222ca7ac7ac3d24120060a5.access',
    'CF-Access-Client-Secret': 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048'
}

var payload = {
    'web_kde': data.get_web_customerResult,
    'web_add': commonFields,
    'web_ans': addressFields,
    'web_user': '',
    'web_Pass': ''
};

  soap.createClient(url, {wsdl_headers: headers}, function(err, client) {
  

  client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
  client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
  client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');

  client.set_web_customer(payload, function(err, result) {
         console.log("Final result: "+result.set_web_customerResult);
      });
});