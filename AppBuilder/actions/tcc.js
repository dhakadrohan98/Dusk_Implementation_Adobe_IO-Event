const axios = require('axios')

async function authenticate(params){
    var payload = {
        "Username":params.TCC_USERNAME,
        "Password":params.TCC_PASSWORD,
        "AccountID":params.TCC_ACCOUNT_ID
    }
    // params.TCC_API_URL+params.TCC_AUTHENTICATION
    var config = {
        method: 'POST',
        url: params.TCC_API_URL+params.TCC_AUTHENTICATION,
        headers: {
            'Content-Type': 'application/json'
        },
        data : payload
      };

      try {
        var response = await axios(config);
  
        if (response.status == 200) {
            return response.data;
        }
      } catch (error) {
        console.error(error.message);
        }
}


async function createRMA(params, authenticationToken, rmaDetails, customerDetails, sku){

    const currentDate = new Date();
    // Increment the date by 1 day (in milliseconds)
    const nextDayDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const nextDate = nextDayDate.getTime() / 1000;

    var dateString = rmaDetails.date_requested;
    const epochTimestamp = new Date(dateString).getTime() / 1000;
    var order_id = rmaDetails.order_id.toString();
    
    var state = customerDetails.addresses[0].region.region_code;
    //prepairing payload
    var payload = {
            "AuthenticationToken": authenticationToken,
            "Payload": {
            "ContainerNumber": null,
            "DateCreated": epochTimestamp,
            "DateModified": epochTimestamp,
            
            "Description": order_id,
            "ForeignJobID": 123,
            "ForeignReference": null,
            "ScheduledReceivingDate": nextDate,
            "ID": null,
            "Items": [
            {
            "BatchNo": "",
            "BoxPackCountOnly": null,
            "CheckQuality": "Yes",
            "CollectionDate": null,
            "Confidential": null,
            "CountIndividualItems": null,
            "DeliveryDueDate": nextDate,
            "Description": rmaDetails.order_id,
            "ForeignFulfilmentID": rmaDetails.items[0].rma_entity_id,
            "ForeignReference": null,
            "ID": null,
            "IsBulkyItem": null,
            "JobManagerEmail": "",
            "JobManagerName": "",
            "MinReOrderLevel": null,
            "Notes": null,
            "PackageQuantity": null,
            "PackageType": null,
            "PhotoRequired": null,
            "ProductGroup": null,
            "ProductPartNumber": null,
            "Quantity": rmaDetails.items[0].qty_requested,
            "Quarantined": null,
            "SampleRequired": null,
            "Source": "",
            "StockCode": sku,
            "StockLocationID": 1,
            "SubCategory": null,
            "SupplierLocation": null,
            "UnitOfMeasure": "",
            "WarehouseLocationID": null
            }
            
            ],
            "JobReferenceID": "",
            "RequestorEmail": customerDetails.email,
            "RequestorName": customerDetails.firstname,
            "SenderAddress": customerDetails.addresses[0].street[0],
            "SenderName": customerDetails.firstname,
            "SenderPostcode": customerDetails.addresses[0].postcode,
            "SenderState": state,
            "SenderSuburb": customerDetails.addresses[0].city,
            "Status": 10,
            "StockLocationID": null,
            "WarehouseLocationID": 1
            }
    }
    var config = {
        method: 'POST',
        url: params.TCC_API_URL+params.TCC_ISN,
        headers: {
            'Content-Type': 'application/json'
        },
        data : payload
    };

      try {
        var response = await axios(config);
  
        if (response.status == 200) {
            return response.data;
        }
      } catch (error) {
        console.error(error.message);
        }
}

module.exports = {
    authenticate,
    createRMA
}
