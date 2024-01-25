import { default as postLoginUser } from "./login/postLoginUser.js";
import { default as postUpdateSystemUser } from "./system_users/postUpdateSystemUser.js";
import { default as postCreateSystemUser } from "./system_users/postCreateSystemUser.js";
import { default as postUpdateCustomer } from "./customer/postUpdateCustomer.js";
import { default as postCreateCustomer } from "./customer/postCreateCustomer.js";

import { default as postUpdateProduct } from "./product/postUpdateProduct.js";
import { default as postCreateProduct } from "./product/postCreateProduct.js";

import { default as postCreateQuote } from "./quote/postCreateQuote.js";
import { default as postUpdateQuote } from "./quote/postUpdateQuote.js";

export {
    postLoginUser,
    postUpdateSystemUser,
    postCreateSystemUser,
    postUpdateCustomer,
    postCreateCustomer,
    postUpdateProduct,
    postCreateProduct,
    postCreateQuote,
    postUpdateQuote
}