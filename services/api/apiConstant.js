export const endPoint = {
    CREATE_RESTAURANT: 'UserRegistration/Registration',
    GET_OUTLETS_BY_RESTAURANT: 'Restaurant/GetRestaurantById/',
    GET_CATEGORY: 'Category/GetAllCategoryByOutlet?OutletId=',
    GET_TABLE_TYPE: 'TableType/GetAllTableTypeByOutLet?OutletId=',

    GET_ITEMS_BY_MODIFIER: 'ModifierGroups/GetModifiedGroupsById/',

    GET_TABLE_LIST: 'TableMaster/GetAllTableDetailsByOutlet?OutletId=',
    DELETE_TABLE: 'TableMaster/Delete/',
    CREATE_TABLE_DETAILS: 'TableMaster/Post',

    CREATE_DINEIN_ORDER: 'Orders/Post',
    UPDATE_DINEIN_ORDER: 'Orders/Put/',


    GET_COUNTRY: 'Country/GetAllCountry',
    GET_CITY: 'City/GetCitysByCountryId/',
    GET_REPORTING_TO: 'UserRegistration/GetAllUsers',
    GET_TABLE_ORDERS: 'Orders/GetOrdersById/',

    GET_CATEGORY: 'Category/GetAllCategoryByOutlet?OutletId=',
    CREATE_CATEGORY: 'Category/Post',
    EDIT_CATEGORY: 'Category/Put/',
    DELETE_CATEGORY: 'Category/Delete/',

    GET_ITEMS: 'Items/GetAllItemsByOutlet',
    CREATE_ITEMS: 'Items/CreateItemMasterWithOutletsBase64',
    EDIT_ITEMS: 'Items/Put/',
    DELETE_ITEMS: 'Items/Delete/',

    GET_ITEMSTATUS: 'ItemStatus/GetAllItemStatusByOutlet?OutletId=',
    CREATE_ITEMSTATUS: 'ItemStatus/Post',
    EDIT_ITEMSTATUS: 'ItemStatus/Put/',
    DELETE_ITEMSTATUS: 'ItemStatus/Delete/',

    GET_OUTLETLIST: 'Restaurant/GetRestaurantById/',
    GET_PROMO_CODE: 'PromocodeMaster/GetAllPromocodeMasterByOutlet?OutletId=',
    GET_MODIFIERS_GROUP: 'ModifierGroups/GetAllModifiedGroupsByOutlet?OutletId=',
    GET_INGREDIENTS: 'BOM/GetAllBOM',
    CREATE_MODIFIER: 'ModifierGroups/Post',
    EDIT_MODIFIER: 'ModifierGroups/Put/',
    DELETE_MODIFIER: 'ModifierGroups/Delete/',

    GET_DISCOUNT: 'Discount/GetAllDiscountByOutlet?OutletId=',
    CREATE_DISCOUNT: 'Discount/Post',
    EDIT_DISCOUNT: 'Discount/Put/',
    DELETE_DISCONT: 'Discount/Delete/',


    GET_PROMOCODE: 'PromocodeMaster/GetAllPromocodeMasterByOutlet?OutletId=',
    CREATE_PROMOCODE: 'PromocodeMaster/Post',
    EDIT_PROMOCODE: 'PromocodeMaster/Put/',
    DELETE_PROMOCODE: 'PromocodeMaster/Delete/',

    GET_ORDERSTATUS: '/OrderStatus/GetAllOrderStatusByOutlet?OutletId=',
    CREATE_ORDERSTATUS: 'OrderStatus/Post',
    EDIT_ORDERSTATUS: 'OrderStatus/Put/',
    DELETE_ORDERSTATUS: 'OrderStatus/Delete/',

    GET_SECTIONS: 'TableType/GetAllTableTypeByOutLet?OutletId=',
    CREATE_SECTIONS: 'TableType/Post',
    EDIT_SECTIONS: 'TableType/Put/',
    DELETE_SECTIONS: 'TableType/Delete/',

    GET_TABLEDETAILS: 'TableMaster/GetAllTableDetailsByOutlet?OutletId=',
    CREATE_TABLEDETAILS: 'TableMaster/Post',
    EDIT_TABLEDETAILS: 'TableMaster/Put/',
    DELETE_TABLEDETAILS: 'TableMaster/Delete/',


    GET_TAX: 'Tax/GetAllTaxByOutlet?OutletId=',
    CREATE_TAX: 'Tax/Post',
    EDIT_TAX: 'Tax/Put/',
    DELETE_TAX: 'Tax/Delete/',

    GET_TAXSETUP: 'TaxCondition/GetAllTaxConditionByOutlet?OutletId=',
    CREATE_TAXSETUP: 'TaxCondition/Post',
    EDIT_TAXSETUP: 'TaxCondition/Put/',
    DELETE_TAXSETUP: 'TaxCondition/Delete/',
    EDIT_TAXSETUP_BYID: 'TaxCondition/GetTaxConditionById/',


    GET_PRINTDESIGN: 'InvoicePrintSettings/GetInvoicePrintSettingsByOutlet?OutletId=',
    CREATE_PRINTDESIGN: 'InvoicePrintSettings/Post',
    EDIT_PRINTDESIGN: 'InvoicePrintSettings/Put/',
    DELETE_PRINTDESIGN: 'InvoicePrintSettings/Delete/',
    CHECKISTOBEACTIVEORNOT: 'InvoicePrintSettings/ValidActivedesignStatus/',


    GET_ROLE: 'Role/GetAllRole',
    CREATE_ROLE: 'Role/Post',
    EDIT_ROLE: 'Role/Put/',
    DELETE_ROLE: 'Role/Delete/',
    GET_FORM_NAME_LIST: 'FormNames/GetAllFormNames',

    GET_USERS: 'UserRegistration/GetAllUsers',
    CREATE_USERS: 'UserRegistration/Post',
    EDIT_USERS: 'UserRegistration/Put/',
    DELETE_USERS: 'UserRegistration/Delete/',

    GET_RECIPE: 'Inventory/GetAllRecipe',

    GET_OUTLETS_BY_RESTAURANT: 'Restaurant/GetRestaurantById/',
    CREATE_OUTLET: 'Restaurant/AddOutlet/',
    EDIT_OUTLET: 'Restaurant/UpdateOutlet/',
    DELETE_OUTLET: 'Restaurant/DeleteOutlet/',
    MERGE_TABLE: 'Orders/MergeTableByOrder/',
    SHIFT_TABLE: 'Orders/ShiftTableByOrder/',

    CREATE_ORDER_INVENTORY: 'SupplierOrder/InsertSupplierOrder',

    GET_LOGIN_USER_DETAILS_BY_ID: 'UserRegistration/GetUserById/',
    UPDATE_LOGIN_USER_DETAILS_BY_ID: 'UserRegistration/Put/',

    DELETE_SUPPLIER_ORDER: 'SupplierOrder/DeleteSupplierOrder/',
    GET_GRNLIST_BY_ORDERID: 'SupplierOrder/GetGRNByOrderId/',

    //Reports
    GET_SALES_BY_CATEGORIES: 'Orders/GetCategoryDetail/',
    GET_ORDER_BY_COUNT: 'Orders/GetOrdersByCount/',
    GET_ORDERS_FOR_PRINT_BY_DATE: 'Orders/GetOrdersForPrintByDate',

    DELETE_ORDER: 'Orders/Delete/',

    //Draggable
    DRAG_TABLE: 'TableMaster/ArrangeTables',

    //Get User By Restaurant Id
    GETUSERSBYRESTID: 'UserRegistration/GetUsersByRestaurant/',

    //Get Invoice By OrderId
    GETINVOICEBYORDERID: 'Invoice/GetInvoiceByOrderId/'


}