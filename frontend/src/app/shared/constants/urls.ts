const BASE_URL = 'http://localhost:8080';

// ----------------dashboard----------------
export const EVENT_URL = BASE_URL + '/api/events';
export const NEWSLETTER_URL = BASE_URL + '/api/newsletter';
export const CONTACTUS_URL = BASE_URL + '/api/contactus';
export const MEMBERSHIP_URL = BASE_URL + '/api/membeships';
export const MEMBERSHIPBY_ID_URL = MEMBERSHIP_URL + '/';

export const PRODUCTS_URL = BASE_URL + '/api/products';
export const PRODUCTS_CATEGORY_URL = PRODUCTS_URL + '/category';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_CATEGORY_URL = PRODUCTS_URL + '/category/';
export const PRODUCT_BY_ID_URL = PRODUCTS_URL + '/';
export const PROMOCODE_URL = BASE_URL + '/api/promocode';
export const PROMOCODE_URL_BY_NAME = BASE_URL + '/api/promocode/';
export const CREATE_ORDER_URL = BASE_URL + '/api/orders';

