const axios = require('axios');
var request = require('request').defaults({ encoding: null });


async function getProduct(params){

    var url = params.ECOMMERCE_API_URL+params.ECOMMERCE_PRODUCT_ENDPOINT+'/'+params.data.value.sku; //params.data.value.sku-/SG7878787
    
    var config = {
      method: 'get',
      url: url.replace(/\\\//g, "/"), 
      headers: { 
        'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN,
      }
    };

    try{
        var response = await axios(config);

        if(response.status == 200){
            return response.data;
        }
    }catch(error){
        return error;
    }
    
}


async function getCustomer(params, id){

    var url = params.ECOMMERCE_API_URL+params.ECOMMERCE_CUSTOMER_ENDPOINT+'/'+id; //params.data.value.entity_id-/18
    
    var config = {
      method: 'get',
      url: url.replace(/\\\//g, "/"), 
      headers: { 
        'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN,
      }
    };

    try{
        var response = await axios(config);

        if(response.status == 200){
            return response.data;
        }
    }catch(error){
        return error;
    }
    
}


async function getProductOptions(params,attributecode,optionId) {

    var url = params.ECOMMERCE_API_URL+params.ECOMMERCE_PRODUCT_ATTRIBUTE_OPTIONS_ENDPOINT+'/'+attributecode+'/options'; //params.data.value.entity_id-/18
    
    var config = {
      method: 'get',
      url: url.replace(/\\\//g, "/"), 
      headers: { 
        'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN,
      }
    };

    try{
        var response = await axios(config);

        if(response.status == 200){
            var label="";
            var options = response.data;
            for(var attributename in options){
                if(options[attributename]['value'] == optionId){
                    label = options[attributename]['label'];
                }
            }
            return label;
        }
    }catch(error){
        return error;
    }
}


async function UpdateCustomerInMagento(params,payload,id){

    var url = params.ECOMMERCE_API_URL+params.ECOMMERCE_CUSTOMER_ENDPOINT+'/'+id; //params.data.value.entity_id-/18

    var config = {
      method: 'put',
      url: url.replace(/\\\//g, "/"),
      headers: { 
        'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN, 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(payload)
    };

    try{
        var response = await axios(config);

        if(response.status == 200){
            return response.data;
        }
    }catch(error){
        return error;
    }
}

async function converImageintoBase64(imageurl)
{
     return new Promise((resolve, reject) => {
        request.get(imageurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = Buffer.from(body).toString('base64');
                resolve(data);
            }else{
                reject(error);
            }
        });
     })
}

async function getOrderInfo(params, order_id){

    var url = params.ECOMMERCE_API_URL+params.ECOMMERCE_ORDER_ENDPOINT+'/'+order_id;

    var config = {
        method: 'get',
        url: url.replace(/\\\//g, "/"),
        headers: {
            'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN,
            'Content-Type': 'application/json'
        },
        data : {}
    };

    try{
        var response = await axios(config);

        if(response.status == 200){
            return response.data;
        }
    }catch(error){
        return error;
    }
}

async function getCreditMemo(params, creditMemoId){

    var url = params.ECOMMERCE_API_URL+ params.ECOMMERCE_CREDITMEMO_ENDPOINT+'/'+ creditMemoId;

    var config = {
        method: 'get',
        url: url.replace(/\\\//g, "/"),
        headers: {
            'Authorization': 'Bearer '+params.ECOMMERCE_AUTHORIZED_TOKEN,
            'Content-Type': 'application/json'
        },
        data : {}
    };

    try {
            var response = await axios(config);
            
            if(response.status == 200){
                orderItemIdCreditMemo = response.data.items[0].order_item_id;
                console.log("Credit Memo's order item ID: "+response.data.items[0].order_item_id);
                return response.data;
            }
        
            } catch (error) {
                console.error(error);
            }
}

async function matchingOrderItems(orderId, creditMemoId) {

    var finalResponse = [];
    var orderResponse = await getOrderInfo(orderId);
    var creditmemoResponse = await getCreditMemo(creditMemoId);

    orderItemsLength = orderResponse.items.length;
    creditMemoLength = creditmemoResponse.items.length
    console.log("orderItemsLength: " +orderItemsLength);
    console.log("creditMemoLength: "+creditMemoLength);
    var i=0,j=0,k=0;
    var shippedArray = [];

    while(i<orderItemsLength) {

        itemQuantityShippedFromOrder = orderResponse.items[i].qty_shipped;

        if(itemQuantityShippedFromOrder > 0) {
            shippedArray[k] = orderResponse.items[i].sku;
            k++;
        }
        i++;
    }
    console.log("shippedArray: "+shippedArray)

    for(l=0; l<shippedArray.length; l++) {

        // if(creditmemoResponse.items[l] == undefined) {
        //     break;
        // }
        if((creditmemoResponse.items[l] != undefined) && shippedArray.includes(creditmemoResponse.items[l].sku) == true) {

            var temp = {"orderItemID": creditmemoResponse.items[l].sku, 
                        "quantity": creditmemoResponse.items[l].qty}
            finalResponse.push(temp);
        }
    }

    console.log("shippedArray after creditmemo condition: "+ JSON.stringify(finalResponse));
    return JSON.stringify(finalResponse);
}

module.exports = {
  getProduct,
  getCustomer,
  UpdateCustomerInMagento,
  converImageintoBase64,
  getOrderInfo,
  getProductOptions,
  getCreditMemo,
  matchingOrderItems
}
