const soap = require('soap')
const jsonfile = require('jsonfile');
const axios = require('axios')

/* ------ Order Create ---*/
var createOrderPayloadStructure = {
    "authenticationToken": "",
    "order": {
        "OrderDate": "2023-07-27",
        "Phone": "1234567890",
        "Email": "johndoe@gmail.com",
        "OrderStatus": "3",
        "GiftWrapStatus": false,
        "GiftMessage": "",
        "DeliveryInstructions": "",
        "Currency": "AUD",
        "PaymentMethod": 35,
        "Freight": 5.0000,
        "FreightDiscount": 0.0000,
        "FreightTax": 0.0000,
        "FreightIncludingTax": 0.0000,
        "FreightDiscountIncludingTax": 0.0000,
        "OrderBasedDiscount": 0.0000,
        "OrderBasedDiscountExcludingTax": 0.0000,
        "OrderTotal": 30.0000,
        "FreightProvider": "Standard",
        "Website": 1,
        "ExternalOrderSource": "Magento",
        "ExternalOrderID": "",
        "Addresses": {
            "CustomerAddress": [],
        },
        "Notes": {
            "OrderNote": [{
                "DisplayLevel": 2,
                "Note": "",
            }]
        },
        "OrderItems": {
            "OrderItem": [{
                "Style": "Sample-Gold",
                "Barcode": "Sample-Gold",
                "Quantity": 1,
                "StatusCode": "Unordered",
                "UnitPrice": 10.0000,
                "UnitDiscount": 0.0000,
                "UnitTax": 0.0000,
                "UnitPriceIncludingTax": 10.0000,
                "UnitDiscountIncludingTax": 0.0000,
                "UnitNet": 0.0000,
                "Parent": 0,
                "ItemCompositeType": "Product",
            }]
        },
        "Transactions": {
            "Transaction": [{
                "TransactionType": "External",
                "TransactionAmount": 0.000,
                "TransactionStatus": 1,
            }]
        }
    }
};

/* ---- Order create ends --- */

/**
 * Set Viare Authentication code
 * @param data
 */
function setViareAuthCode(obj) {

  jsonfile.writeFile('viareauth.json', obj, {spaces:2}, function(err){

  });
}

/**
 * Get Viare Authentication token which we have stored in txt file
 */
function getViareAuthCode() {
  return new Promise((resolve, reject) => {
    jsonfile.readFile('viareauth.json', function (err, obj) {
        if(err){
            reject(err)
        }else{
            resolve(obj)
        }

    })
  })
}

/**
 *
 * @param apiEndpoint
 * @param header
 * @param payload
 * @returns {boolean}
 * @constructor
 */
function SendViareAuthRequest(apiEndpoint, header, payload){
      return new Promise((resolve, reject) => {
            soap.createClient(apiEndpoint, header, function(err, client) {
            if(err){
              reject(err)
            }
            client.Authenticate(payload, function(err, result) {
              if(err){
                reject(err)
              }else{
                resolve(result)
              }
            })
          })
        })
}

/**
 *
 * @param apiEndpoint
 * @param header
 * @param payload
 * @returns {boolean}
 */
function sendProductDetail(apiEndpoint, header, payload, timeout){
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, header, function(err, client) {
        if(err){
            reject(err)
        }
        client.UpdateProduct(payload, function(err, result) {
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        },{timeout: timeout})
    })
})
}

function updateProductImage(apiEndpoint, header, payload,timeout){
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, header, function(err, client) {
        if(err){
            reject(err)
        }
        client.SetMainImage(payload, function(err, result) {
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        },{timeout: timeout})
    })
})
}

function geViaretOrderInfo(apiEndpoint, header, token, orderId) {
    var payload = {'authenticationToken': token, 'orderID': orderId}
    return new Promise((resolve, reject) => {
        soap.createClient(apiEndpoint, header, function(err, client) {
            if(err){
                reject(err)
            }
            client.Retrieve(payload, function(err, result) {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    })
}

/*
* Generates payload for the Viare Order
* @param ecommerce_order_data
* @param token
* @return {JSON}
* */
function generatePayloadForOrderCreate(ecommerce_order_data, token) {
    var order = ecommerce_order_data;

    if (typeof order.extension_attributes.shipping_assignments[0].shipping.address == 'undefined') {
        return false;
    }

    var payload = createOrderPayloadStructure;
    payload['authenticationToken'] = ""+token;
    payload['order']['OrderDate'] = ""+changeDateFormate(order.created_at);
    payload['order']['Phone'] = ""+(order.billing_address.telephone) ? order.billing_address.telephone: "0123456789";
    payload['order']['Email'] = ""+(order.customer_email) ? order.customer_email : order.billing_address.email;
    payload['order']['OrderStatus'] = 3; // Default value
    payload['order']['GiftWrapStatus'] = false; // Temporarily False
    payload['order']['GiftMessage'] = "Gift Message"; // Temporarily Blank
    payload['order']['DeliveryInstructions'] = "Delivery Instruction"; // Temporarily Blank
    payload['order']['Currency'] = "AUD"; // Temporarily AUD
    payload['order']['PaymentMethod'] = 35;
    payload['order']['Freight'] = (order.base_shipping_amount).toFixed(4);
    payload['order']['FreightDiscount'] = (order.base_shipping_discount_amount).toFixed(4);
    payload['order']['FreightTax'] = (order.base_shipping_tax_amount).toFixed(4);
    payload['order']['FreightIncludingTax'] = (order.base_shipping_incl_tax).toFixed(4);
    payload['order']['FreightDiscountIncludingTax'] = (order.base_shipping_discount_amount).toFixed(4);
    payload['order']['OrderBasedDiscount'] = (order.base_discount_amount).toFixed(4);
    payload['order']['OrderBasedDiscountExcludingTax'] = (order.discount_amount).toFixed(4);
    payload['order']['OrderTotal'] = (order.grand_total).toFixed(4);
    payload['order']['FreightProvider'] = "Standard"; // default
    payload['order']['Website'] = 1;
    payload['order']['ExternalOrderSource'] = "Magento";
    payload['order']['ExternalOrderID'] = ""+order.entity_id;


    var order_note = [];
    order_note.push({"DisplayLevel": 2, "Note": "Order Note"});
    payload['order']['Notes']['OrderNote'] = order_note;

    var transaction_notes = [];
    transaction_notes.push({"TransactionType": "External", "TransactionAmount": order.grand_total, "TransactionStatus": 1});
    payload['order']['Transactions']['Transaction'] = transaction_notes;

    var orderItemCount = 0;
    order.items.forEach((item, index) => {
        if (item.product_type != 'bundle' && item.is_virtual != true) {
            var itemData = {};
            itemData['Style'] = (item.style) ? item.style : item.sku;
            itemData['Barcode'] = (item.barcode) ? item.barcode : item.sku;
            itemData['Quantity'] = item.qty_ordered;
            itemData['StatusCode'] = "Unordered";
            itemData['UnitPrice'] = (item.base_price).toFixed(4);
            itemData['UnitDiscount'] = (item.base_discount_amount).toFixed(4);
            itemData['UnitTax'] = (item.base_tax_amount).toFixed(4);
            itemData['UnitPriceIncludingTax'] = (item.base_price_incl_tax).toFixed(4);
            itemData['UnitDiscountIncludingTax'] = (item.base_discount_amount).toFixed(4);
            itemData['UnitNet'] = (item.base_price).toFixed(4);
            itemData['Parent'] = 0;
            itemData['ItemCompositeType'] = "Product";
            payload['order']['OrderItems']['OrderItem'][orderItemCount] = itemData;
            orderItemCount++;
        }
    });

    var customer_addresses = [];

    var billing_address = {
        "Type": "Billing",
        "FirstName": ""+order.billing_address.firstname,
        "LastName": ""+order.billing_address.lastname,
        "ContactPhone": ""+order.billing_address.telephone,
        "Street": ""+order.billing_address.street[0],
        "Suburb": ""+order.billing_address.city,
        "State": ""+order.billing_address.region,
        "Postcode": ""+order.billing_address.postcode,
        "Country": "AUS", //""+order.billing_address.country_id
    };

    var shipping_address = order.extension_attributes.shipping_assignments[0].shipping.address;
    var shipping_address = {
        "Type": "Shipping",
        "FirstName": ""+shipping_address.firstname,
        "LastName": ""+shipping_address.lastname,
        "ContactPhone": ""+shipping_address.telephone,
        "Street": ""+shipping_address.street[0],
        "Suburb": ""+shipping_address.city,
        "State": ""+shipping_address.region,
        "Postcode": ""+shipping_address.postcode,
        "Country": "AUS", //""+order.billing_address.country_id
    };

    customer_addresses.push(billing_address);
    customer_addresses.push(shipping_address);
    payload['order']['Addresses']['CustomerAddress'] = customer_addresses;

    return payload;

}

/**
 *
 * @param apiEndpoint
 * @param header
 * @param payload
 * @returns {boolean}
 */
function createOrder(apiEndpoint, header, payload){
    return new Promise((resolve, reject) => {
            soap.createClient(apiEndpoint, header, function(err, client) {
            if(err){
                reject(err)
            }
            client.ImportOrder(payload, function(err, result) {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
})
}

/*
 * Change date format to YYYY-MM-DD
 * @param date
 * @returns {string}
 * */
function changeDateFormate(date) {
    const newdate = new Date(date);
    const year = newdate.getFullYear();
    const month = String(newdate.getMonth() + 1).padStart(2, '0');
    const day = String(newdate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

async function clickAndCollect(skuArray,storesArray,params){
  var finalResponse = {};
  var storeIds = "";

  for(i=0; i<storesArray.length; i++) {
    storeIds = storeIds + storesArray[i]+ ",";
  }
  for(j=0; j<skuArray.length; j++) {
    
        var config = {
          method: 'get',
          url: params.VIARE_CLICK_COLLECT_URL+ skuArray[j]+'?stores=' +storeIds
          //'50209484?stores=100,102,104,105,106'
        };

        var sku = skuArray[i];

        try {
          var response = await axios(config);
    
          if (response.status == 200) {
            var sku = skuArray[j];
            var tempArr=[];
            for(k=0; k < storesArray.length; k++) {
              var branchVal =response.data[k].Branch;
              var actualVal =response.data[k].Barcodes[0].Value;
    
              tempArr.push({"Branch": branchVal,"qty":actualVal});
            }
            finalResponse[sku]=tempArr;
            // final[sku[i].qty] = finalResponse[i].Barcodes[0].Value;
          }
        } catch (error) {
        console.error(error);
      }
    }
    return finalResponse;
}

function deleteOrder(params,headers,viarePayload){
    return new Promise((resolve, reject) => {
            soap.createClient(params.VIARE_ORDER_API, {wsdl_headers: headers}, function(err, client) {
            if(err){
                reject(err)
            }
            client.DeleteOrderItem(viarePayload, function(err, result) {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
})
}

//noinspection JSAnnotator
module.exports = {
  setViareAuthCode,
  getViareAuthCode,
  SendViareAuthRequest,
  sendProductDetail,
  updateProductImage,
  generatePayloadForOrderCreate,
  createOrder,
  geViaretOrderInfo,
  clickAndCollect,
  deleteOrder
}
