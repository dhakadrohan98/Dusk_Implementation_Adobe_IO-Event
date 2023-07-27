const soap = require('soap')

//Search customer through email
async function SearchInFutura(apiEndpoint, headers, payload) {
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, {wsdl_headers: headers}, function(err, client) {
        if(err){
          reject(err)
        }
        client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
        client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
        client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
        client.web_search_customer(payload, function(err, result) {
          if(err){
            reject(err)
          }else{
            resolve((result))
          }
        })
      })
    })
}

//Create blank customer in futura
async function createBlankCustomer(apiEndpoint, headers) {
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, {wsdl_headers: headers}, function(err, client) {
        if(err){
          reject(err)
        }
        client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
        client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
        client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
        client.get_web_new_customer_id(function(err, result) {
          if(err){
            reject(err)
          }else{
            resolve((result))
          }
        })
      })
    })
}

//Get customer details by id
async function getCustomerById(apiEndpoint, headers, payload){
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, {wsdl_headers: headers}, function(err, client) {
        if(err){
          reject(err)
        }
        client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
        client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
        client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
        client.get_web_customer(payload, function(err, result) {
          if(err){
            reject(err)
          }else{
            resolve((result))
          }
        })
      })
    })
}

//update customer in futura
async function UpdateCustomerInFututra(apiEndpoint, headers, payload){
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, {wsdl_headers: headers}, function(err, client) {
        if(err){
          reject(err)
        }
        client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR')
        client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access'); 
        client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
        client.set_web_customer(payload, function(err, result) {
          if(err){
            reject(err)
          }else{
            resolve((result))
          }
        })
      })
    })
}



module.exports = {
    SearchInFutura,
    createBlankCustomer,
    getCustomerById,
    UpdateCustomerInFututra
}