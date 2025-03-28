/**
 * This object is designed as a struct. It will contain data concerning the visit of the current user and data on the current page.
 */
const Vertoshop = new function () {
    const order    = new Order(ORDER_JSON);
    const category = new Category(CATEGORY_JSON);
    const user     = new User(USER_JSON);
    const webshop  = new Webshop(WEBSHOP_JSON);

    /**
     * Returns an Order object. Only works if the customer has an active order.
     * @returns {Order}
     */
    this.getOrder = function getOrder () {
        return order;
    };

    /**
     * Returns a Product object. Only works if on a Product page.
     * @returns {Product}
     */
    this.getProduct = function getProduct () {
        return new Product(PRODUCT_JSON);
    };

    /**
     * Returns a Category object. Only works if on a Category page.
     * @returns {Category}
     */
    this.getCategory = function getCategory () {
        return category;
    };

    /**
     * Returns a User object. Returns null if the user isn't logged in.
     * @returns {User}
     */
    this.getUser = function getUser () {
        return user;
    };

    /**
     * Returns a Webshop object. This object is available on all pages.
     * @returns {Webshop}
     */
    this.getWebshop = function getWebshop () {
        return webshop;
    };


    function Order (json) {
        const orderData = JSON.parse(json);

        /**
         * Returns Id of this object or null if not available. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/orders/:id
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (orderData === null) ? null : orderData.id;
        };

        /**
         * Returns an array with a collection or orderRows. If not order is available this will be an empty collection.
         * @returns {OrderRow[]}
         */
        this.getOrderRows = function getOrderRows () {
            const orderRowCollection = [];
            let i                  = 0;
            let orderRow           = null;
            for (i in orderData.order_rows) {
                if (orderData.order_rows.hasOwnProperty(i)) {
                    orderRow = orderData.order_rows[i];
                    orderRowCollection.push(new OrderRow(orderRow));
                }

            }

            return (orderData === null) ? [] : orderRowCollection;
        };
    }

    function OrderRow (data) {
        const orderRowData = data;
        /**
         * Returns Id of this object or null if not available. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/orderrows/:id
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (orderRowData === null) ? null : orderRowData.id;
        };
        /**
         * Returns the poduct_id of this orderrow or null if not available. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/products/:id
         *
         * @returns {int|null}
         */
        this.getProductId = function getProductId () {
            return (orderRowData === null) ? null : orderRowData.product_id;
        };
        /**
         * Returns the quantity of the product in the orderrow or null if not available.
         *
         * @returns {int|null}
         */
        this.getCount = function getCount () {
            return (orderRowData === null) ? null : orderRowData.count;
        };
        /**
         * Returns the product name corresponding with this orderrow or null if not available.
         * @returns {string|null}
         */
        this.getProductName = function getProductName () {
            return (orderRowData === null) ? null : orderRowData.product_name;
        };
        /**
         * Returns the product number corresponding with this orderrow or null if not available.
         * @returns {string|null}
         */
        this.getProductNumber = function getProductNumber () {
            return (orderRowData === null) ? null : orderRowData.product_number;
        };
        /**
         * Returns the product base price corresponding with this orderrow or null if not available.
         * @returns {float|null}
         */
        this.getPrice = function getPrice () {
            return (orderRowData === null) ? null : orderRowData.price;
        };
        /**
         * Returns the product discount corresponding with this orderrow or null if not available.
         * @returns {float|null}
         */
        this.getDiscount = function getDiscount () {
            return (orderRowData === null) ? null : orderRowData.discount;
        };
        /**
         * Returns the tax percentage corresponding with this orderrow or null if not available.
         * @returns {float|null}
         */
        this.getTax = function getTax () {
            return (orderRowData === null) ? null : orderRowData.tax;
        };
    }

    function Product (json) {
        const product = JSON.parse(json);

        /**
         * Returns Id of this object. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/products/:id
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (product === null) ? null : product.id;
        };

        /**
         * Returns Name of this object in the current language of the webshop.
         *
         * @returns {string|null}
         */
        this.getName = function getName () {
            return (product === null) ? null : product.name;
        };

        /**
         * Returns Product Number of this object.
         *
         * @returns {string|null}
         */
        this.getProductNumber = function getProductNumber () {
            return (product === null) ? null : product.productnumber;
        };

        /**
         * Returns Product EAN of this object.
         *
         * @returns {string|null}
         */
        this.getEAN = function getEAN () {
            return (product === null) ? null : product.ean;
        };

        /**
         * Returns Product Amount of this object.
         *
         * @returns {string|null}
         */
        this.getAmount = function getAmount () {
            return (product === null) ? null : product.amount;
        };

        /**
         * Returns the currently selected Attribute Combination. If the customer changes his choices, these values
         * will change accordingly.
         *
         * @returns {AttributeCombination}
         */
        this.getSelectedAttributeCombination = function getSelectedAttributeCombination () {
            return new AttributeCombination(ATTRIBUTE_COMBINATION_JSON);
        };

        /**
         * Returns the Attributes of this object. If the customer changes his attribute choices, the selected values
         * will change accordingly.
         *
         * @returns {Attributes}
         */
        this.getAttributes = function getAttributes () {
            return new Attributes(ATTRIBUTES_JSON)
        };

    }

    function AttributeCombination (json) {
        const attribute_combination = JSON.parse(json);

        /**
         * Returns the Id of this object. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/attributecombinations/:id
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (attribute_combination === null) ? null : attribute_combination.id;
        };
        /**
         * Returns Note (or short description) of this object.
         *
         * @returns {string|null}
         */
        this.getNote = function getNote () {
            return (attribute_combination === null) ? null : attribute_combination.note;
        };
        /**
         * Returns Product Number of this object.
         *
         * @returns {string|null}
         */
        this.getProductNumber = function getProductNumber () {
            return (attribute_combination === null) ? null : attribute_combination.product_number;
        };
        /**
         * Returns Attribute Combination EAN of this object.
         *
         * @returns {string|null}
         */
        this.getEAN = function getEAN () {
            return (attribute_combination === null) ? null : attribute_combination.ean_number;
        };
        /**
         * Returns Attribute Combination SKU of this object.
         *
         * @returns {string|null}
         */
        this.getSKU = function getSKU () {
            return (attribute_combination === null) ? null : attribute_combination.sku_number;
        };

    }

    function Attributes (json) {
        const AttributesCollection = JSON.parse(json);

        /**
         * Returns an array with a collection or Attributes. If not available this will be an empty collection.
         * @returns {Attributes[]}
         */
        this.getAttribute = function getAttribute () {
            const Attributes         = [];
            let a                  = 0;
            let Attribute          = null;
            for (a in AttributesCollection.Attributes) {
                if (AttributesCollection.Attributes.hasOwnProperty(a)) {
                    Attribute = AttributesCollection.Attributes[a];
                    Attributes.push(new GetAttributeValues(Attribute));
                }
            }
            return (Attributes === null) ? [] : Attributes;
        };

        /**
         * Returns an array with a collection or selected attribute values. If not available this will be an empty collection.
         * @returns {SelectedAttributes[]}
         */
        this.getSelectedValues = function getSelectedValues () {
            const SelectedAttributes = [];
            let sav                  = 0;
            let SelectedAttribute  = null;
            for (sav in AttributesCollection.Selected_attribute_value) {
                if (AttributesCollection.Selected_attribute_value.hasOwnProperty(sav)) {
                    SelectedAttribute = AttributesCollection.Selected_attribute_value[sav];
                    SelectedAttributes.push(new GetSelectedAttribute(SelectedAttribute));
                }
            }
            return (SelectedAttributes === null) ? [] : SelectedAttributes;
        };

        /**
         * Returns Selected Attribute Combination Id of this object.
         *
         * @returns {string|null}
         */
        this.getSelectedAttributeCombinationId = function getSelectedAttributeCombinationId () {
            return (AttributesCollection === null) ? null : AttributesCollection.Selected_attribute_combinationId;
        };
    }

   function GetAttributeValues(Attribute) {
       /**
        * Returns the Id of this object. Id corresponds with the Resource Id in the API, ie:
        * https://apiroot/:version/attributevalues/:id/
        *
        * @returns {int|null}
        */
       this.getId = function getId () {
           return (Attribute === null) ? null : Attribute.Id;
       };
       /**
        * Returns Name of this object.
        *
        * @returns {string|null}
        */
       this.getName = function getName () {
           return (Attribute === null) ? null : Attribute.Name;
       };

       /**
        * corresponds with the Resource in the API, ie:
        * https://apiroot/:version/attributevalues/
        *
        * @returns {[]|null}
        */
       this.getValues = function getValues() {
           const AttributesValues   = [];
           let q                  = 0;
           let AttributeValue     = null;
           for (q in Attribute.Attribute_values) {
               if (Attribute.Attribute_values.hasOwnProperty(q)) {
                   AttributeValue = Attribute.Attribute_values[q];
                   AttributesValues.push(new GetAttributeValue(AttributeValue));
               }
           }
           return (AttributesValues === null) ? [] : AttributesValues;
       }
    }

    function GetSelectedAttribute (SelectedAttribute) {
        /**
         * Returns the Id of this object. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/attributevalues/:id/
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (SelectedAttribute === null) ? null : SelectedAttribute.Id;
        };
        /**
         * Returns Value of this object.
         *
         * @returns {string|null}
         */
        this.getValue = function getValue () {
            return (SelectedAttribute === null) ? null : SelectedAttribute.Value;
        };

        /**
         * Returns Name of this object.
         *
         * @returns {string|null}
         */
        this.getName = function getName () {
            return (SelectedAttribute === null) ? null : SelectedAttribute.Name;
        };

    }

    function GetAttributeValue(AttributeValue) {
        /**
         * Returns the Id of this object.
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (AttributeValue === null) ? null : AttributeValue.Id;
        };
        /**
         * Returns Name of this object.
         *
         * @returns {string|null}
         */
        this.getName = function getNote () {
            return (AttributeValue === null) ? null : AttributeValue.Name;
        };
    }


    function Category (json) {
        const category = JSON.parse(json);
        /**
         * Returns Id of this object. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/categories/:id
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (category === null) ? null : category.id;
        };

        /**
         * Returns Name of this object in the current language of the webshop.
         *
         * @returns {string|null}
         */
        this.getName = function getName () {
            return (category === null) ? null : category.name;
        };
    }

    function User (json) {
        const user = JSON.parse(json);
        /**
         * Returns Id of this object. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/users/:id
         *
         * @returns {int|null}
         */
        this.getId = function getId () {
            return (user === null) ? null : user.id;
        };
        /**
         * Returns the Id of the group to whom this user belongs or null if not available. Id corresponds with the Resource Id in the API, ie:
         * https://apiroot/:version/usergroups/:id
         * @returns {null}
         */
        this.getGroupId = function getGroupId () {
            return (user === null) ? null : user.group_id;
        };
    }




    function Webshop (json) {
        const webshop = JSON.parse(json);

        const cookieBar       = (webshop.cookieBar === null) ? null : new CookieBar(webshop.cookieBar);
        const creditPoints    = (webshop.creditPoints === null) ? null : new CreditPoints(webshop.creditPoints);
        const discountCoupons = (webshop.discountCoupons === null) ? null : new DiscountCoupons(webshop.discountCoupons);
        const currentTheme = (webshop.currentTheme === null) ? null : new CurrentTheme(webshop.currentTheme);
        /**
         * Returns a CookieBar object
         * @returns {CookieBar}
         */
        this.getCookieBar = function getCookieBar () {
            return cookieBar;
        };
        /**
         * Returns a CreditPoints object.
         * @returns {CreditPoints}
         */
        this.getCreditPoints = function getCreditPoints () {
            return creditPoints;
        };
        /**
         * Retuns a DiscountCoupons object.
         * @returns {DiscountCoupons}
         */
        this.getDiscountCoupons = function getDiscountCoupons () {
            return discountCoupons;
        };
        /**
         * Retuns a CurrentTheme object.
         * @returns {CurrentTheme}
         */
        this.getCurrentTheme = function getCurrentTheme () {
            return currentTheme;
        };
        /**
         * Returns the API root url of the webshop.
         * @returns {string}
         */
        this.getApiRoot = function getApiRoot () {
            return (webshop === null) ? null : webshop.api_root;
        };
        /**
         * Indicates if prices include VAT.
         * @returns {bool}
         */
        this.doPricesIncludeVat = function doPricesIncludeVat () {
            return (webshop === null) ? null : webshop.prices_include_vat;
        };

        /**
         * Indicates if shipping costs include VAT.
         * @returns {bool}
         */
        this.doShippingCostsIncludeVat = function doShippingCostsIncludeVat () {
            return (webshop === null) ? null : webshop.shippingcosts_include_vat;
        };

        /**
         * Returns the current currency of the webshop in ISO 4217 Currency Codes.
         * @returns {string}
         */
        this.getCurrency = function getCurrency () {
            return (webshop === null) ? null : webshop.currency;
        };
        /**
         * Returns the collection of available display languages of the webshop in ISO 639-1 Language Codes.
         * @returns {array}
         */
        this.getLanguages = function getLanguages () {
            return (webshop === null) ? null : webshop.languages;
        };
        /**
         * Returns the current display language of the webshop in ISO 639-1 Language Codes.
         * @returns {string}
         */
        this.getCurrentLanguage = function getCurrentLanguage () {
            return (webshop === null) ? null : webshop.current_language;
        };
    }

    function CookieBar (data) {
        const cookieBarData = data;
        /**
         * Indicates if the webshop has a cookie bar.
         * @returns {bool}
         */
        this.isEnabled = function isEnabled () {
            return (cookieBarData === null) ? null : cookieBarData.is_enabled;
        };
        /**
         * Indicates if the user accepted the placement of tracking cookies.
         * @returns {bool}
         */
        this.isAccepted = function isAccepted () {
            return (cookieBarData === null) ? null : cookieBarData.is_accepted;
        };

        this.getPreferences =function getPreferences () {
            return (cookieBarData === null) ? [] : cookieBarData.preferences;
        };

        this.getCookies =function getCookies () {
            return (cookieBarData === null) ? [] : cookieBarData.cookies;
        };

        this.isAllowed = function isAllowed(type) {
            return this.getPreferences().includes(type);
        }
    }

    function CreditPoints (data) {
        const creditPointData = data;
        /**
         * Indicates if the checkout accepts creditpoints.
         * @returns {bool}
         */
        this.isEnabled = function isEnabled () {
            return (creditPointData === null) ? null : creditPointData.is_enabled;
        };
        /**
         * Returns the value of 1 credit point in the current currency.
         * @returns {float}
         */
        this.getValue = function getValue () {
            return (creditPointData === null) ? null : creditPointData.value;
        };
        /**
         * Returns the display name for the creditpoints. The merchant can choose how these should be named.
         * @returns {string}
         */
        this.getName = function getName () {
            return (creditPointData === null) ? null : creditPointData.name;
        };
    }

    function DiscountCoupons (data) {
        const discountCouponData = data;
        /**
         * Indicates if the checkout accepts discount coupons.
         * @returns {bool}
         */
        this.isEnabled = function isEnabled () {
            return (discountCouponData === null) ? null : discountCouponData.is_enabled;
        };
        /**
         * Indicates if a discount coupon is used in the current order.
         * @returns {bool}
         */
        this.isFilledIn = function isFilledIn () {
            return (discountCouponData === null) ? null : discountCouponData.is_filled_in;
        };

    }

    function CurrentTheme (data) {
        const currentThemeData = data;
        /**
         * Returns the display name for the creditpoints. The merchant can choose how these should be named.
         * @returns {string}
         */
        this.getName = function getName () {
            return (currentThemeData === null) ? null : currentThemeData.name;
        };

    }
};
