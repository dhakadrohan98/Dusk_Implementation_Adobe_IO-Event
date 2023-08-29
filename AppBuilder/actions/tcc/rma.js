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
const {authenticate,createRMA} = require('../tcc')
const {getRMADetails, getCustomer, getOrderInfo} = require('../magento')
const NodeCache = require( "node-cache" ); 

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

    var result = {};


    var sku = "";

    if(params.rma_id != null) {
        //calling magento APIs to fetch RMAdetails, customerDetails & orderInfo(sku)
        var rmaDetails = await getRMADetails(params);

        if(rmaDetails != undefined) {
          var customerDetails = await getCustomer(params, rmaDetails.customer_id);

          if(customerDetails != undefined) {
            var orderDetails = await getOrderInfo(params, rmaDetails.order_id);

            if(orderDetails != undefined) {
 
            //Extracting item sku for payload of createRMA API of TCC
              var length = orderDetails.items.length;
              var items = orderDetails.items;
              for(i=0; i<length; i++) {
                  if(items[i].item_id == rmaDetails.items[0].order_item_id) {
                      sku = items[i].sku;
                  }
              }
            }
            var authenticationToken = "";
            //caching mechanism
            const myCache = new NodeCache();  
            if(myCache.has('token')) {
              authenticationToken = myCache.get('token');
            }
            else {
              var authenticationResult = await authenticate(params); 
              authenticationToken = authenticationResult.Payload.AuthenticationToken;
              myCache.set("token",authenticationToken);
            }
            result = authenticationToken;

            // result = await createRMA(params, authenticationToken, rmaDetails, customerDetails, sku);
          }
        }
    }
    else {
        result = {"error":"provide RMA id"};
    }

    
    const response = {
      statusCode: 200,
      body: result
    }
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error: '+error, logger)
  }
}

exports.main = main
