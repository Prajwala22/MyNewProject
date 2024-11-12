import api from './apiservice';
import { endPoint } from '../api/apiConstant';

/*
/POS API Start here 
*/

//Forgot Password API
const ForgotPassword = async (email) => {
  const response = await api.get(`UserRegistration/ForgetPassword/${email}`)
  console.log(response,"responseresponse")
  return response.data;

}
//Login Api
const Login = async (emailId, password) => {
    try {
      const response = await api.post(`UserRegistration/Authentication/authentication`, JSON.stringify({
        userName: emailId,
        password: password,
      }));
      console.log(JSON.stringify(response), "response");
      return response.data;
    } catch (error) {
      console.error("Error during login request:", error);
    }
  };
  

const RefreshTokenGenerator = async (emailId, password) => {
console.log(emailId, password,"rsponsedata")
  const response = await api.post(`UserRegistration/RefreshToken/refreshToken`, JSON.stringify({
    "userName": emailId,
    "password": password
  }));
  console.log(response,"indexresponse")
  return response.data;
};
//get Restaurant Details 
const getRestaurantDetails = async (access_token, userId) => {
  const response = await api.get(`UserRestaurantLink/GetRestaurantByUserId/${userId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//get Permissions By Role Id 

const getPermissionById = async (access_token, userId) => {
  // Alert.alert('1')
  const response = await api.get(`Role/GetRoleById/${userId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//Get All Form Names

const getAllFormAccessName = async (access_token) => {
  const response = await api.get(`UserRegistration/GetAllUsers`)
}
//Create Restaurant
const CreateRestaurant = async (data) => {

  const response = await api.post(`UserRegistration/Registration`, data)
  return response.data
}

//Get User Restaurant API
const GetAllRestaurants = async (access_token) => {
  const response = await api.get(`Restaurant/GetAllRestaurant`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//Get Restaurants expect Super Admin and Cashier
const GetAllRestaurantsForCashier = async (access_token, userId) => {
  const response = await api.get(`UserRestaurantLink/GetRestaurantByUserId/${userId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
const GetOutletsByRestaurants = async (access_token, type) => {
  const response = await api.get(`Restaurant/GetRestaurantById/` + type, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};

//Get RunningOrder List API
const GetRunningOrdersList = async (access_token, OutletId, OrderType) => {
  const response = await api.get(`Orders/GetActiveOrdersByOrderType/Running?OutletId=${OutletId}&OrderType=${OrderType}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};


//GetOrdersByStatus
const GetOrdersByStatus = async (access_token, OrderType, OutletId) => {
  const response = await api.get(`Orders/GetOrdersByStatus/${OrderType}?OutletId=${OutletId}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};

//Get CompletedOrder List API
const GetCompletedOrdersList = async (access_token, OutletId, Status, OrderType) => {
  const response = await api.get(`Orders/GetActiveOrdersByOrderType/Running?${OutletId}&OrderType=Dine-in}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};

// Get Void Orders List API
const GetVoidOrdersList = async (access_token, OutletId) => {
  const response = await api.get(`Orders/GetAllVoidedOrder/${OutletId}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data;
};

// Get Void Password API
const GetVoidPassword = async (access_token, userId) => {
  const response = await api.get(`UserRegistration/GetUserById/${userId}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

};
//Void Order API
const voidOrder = async (access_token, userId, data) => {
  const response = await api.put(`UserRegistration/CheckVoidOrder/${userId}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },

  });

  return response.data;
};
//Create Master Data
const CreateMasterData = async (type, access_token, data) => {
  // Alert.alert('OrderI')
  const response = await api.post(type, data, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });

  return response.data
};


//Get Master Data API
const getAllMasterData = async (access_token, type) => {

  const response = await api.get(type, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};

//Update Master Data API
const UpdateMasterData = async (type, access_token, data) => {
  
  const response = await api.put(type, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },

  });

  return response.data;
};
//Delete Master Data API
const DeleteMasterData = async (type, access_token) => {
  const response = await api.delete(type, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;

};

const UpdateOutlet = async (access_token, data) => {

  const response = await api.put(`UserRegistration/UpdateOutlets/` + data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },

  });
  return response.data;
};


const getEditDataByID = async (access_token, type) => {
  const response = await api.get(`Items/GetItemsById/` + type, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};

//Get Orders By Count - Dashboard
const GetOrdersByCount = async (access_token, data) => {
  const response = await api.post(`Orders/getOrdersByCountForMobile`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  })
  return response.data
}

//Pay Now
const Paynoworder = async (access_token, data) => {
  const response = await api.post(`Invoice/Post`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};
//Create Take Away Order
const Takeawayorder = async (access_token, data) => {
  const response = await api.post(`Orders/CreateWalkInOrders`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};
//pay now Take away
const PaynowTakeawayorder = async (access_token, data) => {
  const response = await api.post(`Invoice/WalkInInvoice`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};
//pay now Take away
const PaynowOnlineorder = async (access_token, data) => {
  const response = await api.post(`Invoice/OnlineInvoice`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};

const GetPrintDesign = async (access_token, OutletId) => {

  const response = await api.get(`InvoicePrintSettings/GetInvoicePrintSettingsByOutlet/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//Get All Supplier Master 
const GetProductSupplierMaster = async (access_token, OutletId) => {
  console.log(access_token,":access_token:",OutletId)
  const response = await api.get(`Inventory/GetAllProductSupplierMaster/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
const GetAllSupplier = async (access_token, OutletId) => {
  const response = await api.get(`Inventory/GetAllSupplier/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}

//Get All Supplier  
const GetSupplier = async (access_token, OutletId) => {
  const response = await api.get(`Inventory/GetAllSupplier/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Get All Supplier Order  
const GetSupplierOrder = async (access_token, OutletId) => {
  const response = await api.get(`SupplierOrder/GetAllSupplierOrder/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Get All Recipe List  
const GetrecipeList = async (access_token, OutletId) => {
  const response = await api.get(`Inventory/GetAllRecipe/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
const CreateCustomer = async (access_token, data) => {
  const response = await api.post(`CustomerMaster/Post`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};

//Create Inventory product  
const CreateInventoryProduct = async (access_token, data) => {
  const response = await api.post(`Inventory/InsertProduct`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};


//Get All Product List  
const GetProductList = async (access_token, OutletId) => {
  const response = await api.get(`Inventory/GetAllProduct/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Update Product 
const updateProduct = async (access_token, data, productId) => {

  const response = await api.put(`Inventory/UpdateProduct/${productId}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },

  });
  return response.data;
};
//Delete Product List  
const DeleteProduct = async (access_token, productId) => {
  const response = await api.delete(`Inventory/DeleteProduct/${productId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Create Supplier
const CreateInventorySupplier = async (access_token, data) => {
  const response = await api.post(`Inventory/InsertSupplier`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//Get Supplier List
const GetSupplierList = async (access_token, OutletId) => {
  const response = await api.get(`Inventory/GetAllSupplier/{OutletId}/${OutletId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Update Supplier
const UpdateSupplier = async (access_token, data, supplierId) => {
  const response = await api.put(`Inventory/UpdateSupplier/${supplierId}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
}

//Delete Supplier
const DeleteSupplier = async (access_token, supplierId) => {
  const response = await api.delete(`Inventory/DeleteSupplier/${supplierId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Delete Supplier Order
const DeleteSupplierOrder = async (access_token, SupplierOrderId) => {
  const response = await api.delete(`SupplierOrder/DeleteSupplierOrder/${SupplierOrderId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Create Stock 
const createStock = async (access_token, data) => {
  const response = await api.post(`Inventory/InsertProductSupplierMaster`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data;
}
//Update Product Supplier Master updateProductSupplierMaster
const updateProductSupplierMaster = async (access_token, data, id) => {
  const response = await api.put(`Inventory/UpdateProductSupplierMaster/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
}
//Delete Stock
const DeleteProductSupplierMaster = async (access_token, productSupplierId) => {
  const response = await api.delete(`Inventory/DeleteProductSupplierMaster/${productSupplierId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}

//Merge Table Api 
const MergeTable = async (access_token, type) => {
  const response = await api.put(type, null, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data
}
//Shift Table Api 
const ShiftTable = async (access_token, type) => {
  const response = await api.put(type, null, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data
}

//Inventory Create Supplier Order
const SupplierOrder = async (access_token, data) => {
  const response = await api.post(`SupplierOrder/InsertSupplierOrder`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};
//Delete Stock
const DeleteProductSupplier = async (access_token, productSupplierId) => {
  const response = await api.delete(`Inventory/DeleteProductSupplierMaster/${productSupplierId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;

}
//Kitchen Item Status Preparing API
const changeItemStatusPrep = async (orderId, status, data, access_token) => {
  const response = await api.post(`Orders/ChangeMultipleItemStatus?OrderId=${orderId}&ItemStatus=${status}`, data, {
    // const response = await api.post(`https://mobileposapi.watermelon.market/api/Orders/ChangeMultipleItemStatus?OrderId=630dd4d71415f62f947507e9&ItemStatus=Prepared`,data,{
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data

}
//Kitchen Item Status Preparing Bar API
// const changeItemStatusPrepBar = async (orderId: any, status: any, data: any, access_token: any,) => {
//   const response = await api.post(`Orders/GetWarehouseOrdersByStatus/Preparing?OutletId${outletId}`, data, {
//     headers: {
//       'Authorization': `Bearer ${access_token}`
//     }
//   });

//   return response.data

// }

//Update Item Qty Supplier Order Planned Status   changeItemStatusPrepBar
const UpdateItemQty = async (access_token, data, id) => {
  const response = await api.put(`SupplierOrder/UpdateSupplierOrder/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data
}
//Change Planned Status to Confirmed
const changeplannedstatus = async (orderId, outletId, token) => {

  const response = await api.get(`SupplierOrder/ChangeSupplierOrderStatus/Confirmed/${orderId}/${outletId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data
}
//Insert Grn
//Create Stock 
const insertgrn = async (access_token, data) => {
  const response = await api.post(`SupplierOrder/InsertGRN`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data;
}
//Update Grn
const updateGrn = async (access_token, data, grnId) => {
  const response = await api.put(`SupplierOrder/UpdateGRN/${grnId}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return response.data;
}

//Get Online Order by Running List API
const GetOnlineOrdersByRunning = async (access_token, OutletId) => {
  const response = await api.get(`Orders/GetActiveOrdersByOrderType/Running?${OutletId}&OrderType=Online}`, {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data;
};
//Create Online Order
const OnlineOrder = async (access_token, data) => {
  const response = await api.post(`Orders/CreateOnlineOrders`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
  });
  return response.data;
};

//Get City By Id
const GetCityBYCountryId = async (CountryId) => {
  const response = await api.get(`City/GetCitysByCountryId/${CountryId}`, {

  });
  return response.data;
};

//Change Order Status
const changeOrderStatus = async (orderId, status, data, access_token) => {
  const response = await api.put(`Orders/ChangeOrderStatus?OrderId=${orderId}&OrderStatus=${status}`, data, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return response.data
}
/*
/POS API Ends here DeleteProductSupplier Orders/ChangeMultipleItemStatus?OrderId=630dd4d71415f62f947507e9&ItemStatus=Prepared
*/

export default { changeOrderStatus, GetCityBYCountryId, ForgotPassword, voidOrder, GetVoidPassword, GetVoidOrdersList, OnlineOrder, getRestaurantDetails, getPermissionById, insertgrn, updateGrn, changeplannedstatus, UpdateItemQty, changeItemStatusPrep, DeleteSupplierOrder, updateProductSupplierMaster, DeleteProductSupplierMaster, UpdateSupplier, DeleteProductSupplier, createStock, GetAllSupplier, DeleteSupplier, GetSupplierList, SupplierOrder, CreateInventorySupplier, CreateInventoryProduct, GetProductList, updateProduct, DeleteProduct, CreateCustomer, Login, CreateRestaurant, GetPrintDesign, GetAllRestaurants, GetrecipeList, GetProductSupplierMaster, GetSupplier, GetSupplierOrder, CreateMasterData, getAllMasterData, UpdateMasterData, DeleteMasterData, GetOutletsByRestaurants, UpdateOutlet, getEditDataByID, GetRunningOrdersList, GetCompletedOrdersList, GetOnlineOrdersByRunning, GetOrdersByCount, GetOrdersByStatus, Paynoworder, RefreshTokenGenerator, PaynowTakeawayorder, PaynowOnlineorder, Takeawayorder, MergeTable, ShiftTable, GetAllRestaurantsForCashier }