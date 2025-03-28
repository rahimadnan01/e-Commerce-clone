function CMDC_Vies() {
    var settingsId = 123;
    var handleApiErrorAsValid = false;

    function init() {
        var language = Vertoshop.getWebshop().getCurrentLanguage();
        var buttonVisible = false;
        var removeWrongVatNumber = false;

        var messageObject = {"incorrectVat":{"en":"Incorrect VAT number","de":"Falsche Umsatzsteuernummer","fr":"Num\u00e9ro de TVA incorrect","it":"Numero di partita IVA errato","nl":"ongeldig BTW nummer"}};
        var messageText;
        if (typeof messageObject['incorrectVat'][language] !== "undefined") {
            messageText = messageObject['incorrectVat'][language];
        } else {
            messageText = messageObject['incorrectVat']['en'];
        }

        if (window.location.href.indexOf("ChangePersonalInfo") > -1) {
            /*register and change info*/
            var VATNumberSelector = document.getElementById("sBTW");
            var buttonSelector = document.getElementsByClassName("ChangeUserInfoSubmitButton");
            var countryCodeSelector = document.getElementById("sAddressCountry");
            if(buttonVisible){
                var type = "show";
            } else {
                var type = "remove";
            }
            var buttonSelectIdOrClass = "class";
            var b2c = false;
            if (VATNumberSelector) {
                if(VATNumberSelector.value.length > 0){
                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                }
                VATNumberSelector.addEventListener("change", function () {
                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                });
                if(countryCodeSelector){
                    countryCodeSelector.addEventListener("change", function(){
                        checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                    });
                }
            }
        } else if (window.location.href.indexOf("WebShopCustomerOrderDetails") > -1) {
            /* regular checkout*/
            var VATNumberSelector = document.getElementById("sBTW");
            var buttonSelector = document.getElementById("OrderNextButton");
            var countryCodeSelector = document.getElementById("sAddressCountry");
            if (buttonVisible){
                var type = "scroll";
            } else {
                var type = "remove";
            }
            var buttonSelectIdOrClass = "id";
            var b2c = false;
            if (VATNumberSelector) {
                if(VATNumberSelector.value.length > 0){
                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                }
                VATNumberSelector.addEventListener("change", function () {
                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                });
                if(countryCodeSelector){
                    countryCodeSelector.addEventListener("change", function(){
                        checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                    });
                }
            }
        } else if (window.location.href.indexOf("WebShopOnePageCheckout") > -1) {
            /* onepage checkout*/
            var targetNode = document.getElementById('group-customerorderdetails');
            var config = { childList: true, subtree: true };
            var callback = function(mutationsList, observer) {
                for(var mutation of mutationsList) {
                    if(mutation.target.id == "component-customerdetails"){
                        var VATNumberSelector = document.getElementById("sBTW");
                        var buttonSelector = document.getElementsByClassName("check-customerorderdetails");
                        var b2cCustomer = document.getElementById("sCustomerType_b2c");
                        if(b2cCustomer === null) {
                            b2cCustomer = document.getElementById("sCustomerType_B2C");
                        }

                        var countryCodeSelector = document.getElementById("sCountry");
                        if(buttonVisible){
                            var type = "show";
                        } else {
                            var type = "remove";
                        }
                        var buttonSelectIdOrClass = "class";
                        var b2c = false;
                        if (VATNumberSelector) {
                            if(b2cCustomer.checked){
                                var b2c = true;
                            }
                            checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                            VATNumberSelector.addEventListener("change", function () {
                                checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass,b2c, removeWrongVatNumber, countryCodeSelector);
                            });
                            if(countryCodeSelector){
                                countryCodeSelector.addEventListener("change", function(){
                                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                                });
                            }
                        }

                    }
                }
            };
            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        } else if (window.location.href.indexOf("WebShopOneStepCheckout") > -1) {
            var targetNode = document.getElementById('group-customerorderdetails');
            var config = { childList: true, subtree: true };
            var callback = function(mutationsList, observer) {
                for(var mutation of mutationsList) {
                    if(mutation.target.id == "component-customerdetails"){
                        var VATNumberSelector = document.getElementById("sBTW");
                        var buttonSelector = document.getElementById("ProcessOrder");
                        var b2cCustomer = document.getElementById("sCustomerType_b2c");
                        if(b2cCustomer === null) {
                            b2cCustomer = document.getElementById("sCustomerType_B2C");
                        }

                        var countryCodeSelector = document.getElementById("sCountry");
                        if(buttonVisible){
                            var type = "show";
                        } else {
                            var type = "remove";
                        }
                        var buttonSelectIdOrClass = "id";
                        var b2c = false;
                        if (VATNumberSelector) {
                            if(b2cCustomer.checked){
                                var b2c = true;
                            }
                            checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                            VATNumberSelector.addEventListener("change", function () {
                                checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass,b2c ,removeWrongVatNumber, countryCodeSelector);
                            });
                            if(countryCodeSelector){
                                countryCodeSelector.addEventListener("change", function(){
                                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                                });
                            }
                        }

                    }
                }
            };
            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);

            var verificationContainer = document.getElementById("container-verification");
            var verificationContainerObserver = function(mutationsList, observer) {
                var VATNumberSelector = document.getElementById("sBTW");
                var buttonSelector = document.getElementById("ProcessOrder");
                var b2cCustomer = document.getElementById("sCustomerType_b2c");
                if(b2cCustomer === null) {
                    b2cCustomer = document.getElementById("sCustomerType_B2C");
                }

                var countryCodeSelector = document.getElementById("sCountry");
                if(buttonVisible){
                    var type = "show";
                } else {
                    var type = "remove";
                }
                var buttonSelectIdOrClass = "id";
                var b2c = false;
                if (VATNumberSelector) {
                    if (b2cCustomer.checked) {
                        var b2c = true;
                    }
                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector);
                }
            }
            var verificationObserver = new MutationObserver(verificationContainerObserver);
            verificationObserver.observe(verificationContainer, config);
        } else if (window.location.href.indexOf("index.php") > -1) {
            /* when regular checkout is reloaded with errors */
            var checkoutForm = document.getElementById("CheckBasket");
            if(checkoutForm){
                window.addEventListener("load", function() {
                    var VATNumberSelector = document.getElementById("sBTW");
                    var buttonSelector = document.getElementById("OrderNextButton");
                    var countryCodeSelector = document.getElementById("sAddressCountry");
                    if (buttonVisible){
                        var type = "scroll";
                    } else {
                        var type = "remove";
                    }
                    var buttonSelectIdOrClass = "id";
                    var b2c = false;
                    if (VATNumberSelector) {
                        if(VATNumberSelector.value.length > 0){
                            checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                        }
                        if(countryCodeSelector){
                            countryCodeSelector.addEventListener("change", function(){
                                checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                            });
                        }
                    }
                });
                var send = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.send = function () {
                    this.addEventListener('load', function () {
                        var VATNumberSelector = document.getElementById("sBTW");
                        var buttonSelector = document.getElementById("OrderNextButton");
                        var countryCodeSelector = document.getElementById("sAddressCountry");
                        if (buttonVisible){
                            var type = "scroll";
                        } else {
                            var type = "remove";
                        }
                        var buttonSelectIdOrClass = "id";
                        var b2c = false;
                        if (VATNumberSelector) {
                            VATNumberSelector.addEventListener("change", function () {
                                checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                            });
                            if(countryCodeSelector){
                                countryCodeSelector.addEventListener("change", function(){
                                    checkBTW(VATNumberSelector, messageText, buttonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector)
                                });
                            }
                        }
                    })
                    return send.apply(this, arguments)
                }
            }
        }
    };

    function removeBuyButton(buttonSelectIdOrClass, buyButtonSelector) {
        if (buttonSelectIdOrClass == "id") {
            var buttonId = buyButtonSelector.id;
            var css = "#" + buttonId + '{ display: none!important; }';
        } else if (buttonSelectIdOrClass == "class") {
            var element = buyButtonSelector[0].className.split(' ');
            var classes = "";
            element.forEach(function (elementClass) {
                if (elementClass != "disabled") {
                    classes += "." + elementClass;
                }
            });
            var css = classes + '{ display: none!important; }';
        }

        if (document.getElementsByClassName("sBTW_check").length > 0) {
            var btwIconCheck = document.getElementsByClassName("sBTW_check");
            var btwIconTimes = document.getElementsByClassName("sBTW_error");
            var element = btwIconCheck[0].className.split(' ');
            var classes = "";
            element.forEach(function (elementClass) {
                classes += "." + elementClass;
            });
            css = css + classes + '{ display: none!important; }';
            var element = btwIconTimes[0].className.split(' ');
            var classes = "";
            element.forEach(function (elementClass) {
                classes += "." + elementClass;
            });
            css = css + classes + '{ display: inline !important; top:40px; }';
        }

        let existingBtwStyleId = document.querySelector("#btwStyleId");
        if(existingBtwStyleId) {
            existingBtwStyleId.innerText = css;
            return;
        }

        head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.setAttribute("id", "btwStyleId");
        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }

    /* message text (translation) and vatnumberselector need to be defined outside of function*/
    function checkBTW(VATNumberSelector, messageText, buyButtonSelector, type, buttonSelectIdOrClass, b2c, removeWrongVatNumber, countryCodeSelector) {
        if (typeof (VATNumberSelector) != 'undefined' && VATNumberSelector != null) {
            var value = VATNumberSelector.value;
            var url = "https://vies.cmdcbv.app/public/?s="+settingsId+"&vat=" + value;
            if(countryCodeSelector && countryCodeSelector.value){
                url += "&country=" + countryCodeSelector.value;
            }

            if(handleApiErrorAsValid === false) {
                if (type == "remove") {
                    removeBuyButton(buttonSelectIdOrClass, buyButtonSelector);
                }
            }

            if(buyButtonSelector) {
                if(buyButtonSelector instanceof HTMLCollection) {
                    if(buyButtonSelector.length === 0) {
                        buyButtonSelector = null;
                    }else{
                        buyButtonSelector = buyButtonSelector.item(0);
                    }
                }
            }

            if(buyButtonSelector) {
                buyButtonSelector.style.pointerEvents = 'none';
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4) {
                    buyButtonSelector.style.pointerEvents = 'inherit';
                }

                if (this.readyState == 4 && this.status == 200) {
                    var isValid = JSON.parse(this.response);
                    isValid = isValid["isValid"];
                    if (!isValid && VATNumberSelector.value.length > 0 && !b2c) {
                        // INVALID VAT NUMBER

                        if(removeWrongVatNumber){
                            VATNumberSelector.value = "";
                        }
                        /* check if error message is shown */
                        if (!document.getElementById("vatNumberError")) {
                            // Make a new div
                            var elChild = document.createElement('div');
                            // Give the new div some content
                            elChild.innerHTML = messageText;
                            /* give div styling */
                            elChild.style.color = "red";
                            elChild.style.marginBottom = "10px";
                            elChild.id = "vatNumberError";
                            //append to parent element
                            insertAfter(elChild, VATNumberSelector);
                            VATNumberSelector.style.borderColor = "red";
                            /* insert style if checkout any block reloads the buybutton will still be hidden*/
                            if (type == "scroll") {
                                /* if clicked on buy button scroll to error element */
                                Element.prototype.documentOffsetTop = function () {
                                    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
                                };
                                var elementPosition = VATNumberSelector.documentOffsetTop() - (window.innerHeight / 2);
                                if(!removeWrongVatNumber){
                                    buyButtonSelector.onclick = function () {
                                        bOrderButtonEnabled = false;
                                        window.scrollTo(0, elementPosition)
                                    };
                                }


                            } else if (type == "remove") {
                                removeBuyButton(buttonSelectIdOrClass, buyButtonSelector);
                            }
                        } else if (type == "show"){
                            //If show then don't do anything no scroll or remove
                            if(!removeWrongVatNumber){
                                buyButtonSelector.onclick = function () {
                                    bOrderButtonEnabled = false;
                                };
                            }
                        }
                    } else {
                        // VALID VAT NUMBER
                        if (document.getElementById("vatNumberError")) {
                            VATNumberSelector.style.borderColor = "inherit";
                            document.getElementById("vatNumberError").remove();
                        }

                        if(document.getElementById("btwStyleId")){
                            document.getElementById("btwStyleId").remove();
                        }

                        if (type == "scroll") {
                            buyButtonSelector.onclick = function () {
                                $('#CheckBasket').submit();
                            };
                        } else{
                            if(VATNumberSelector.value.length === 0) {
                                if (document.getElementsByClassName("sBTW_check").length > 0) {
                                    var css = "";
                                    var btwIconCheck = document.getElementsByClassName("sBTW_check");
                                    var btwIconTimes = document.getElementsByClassName("sBTW_error");
                                    var element = btwIconCheck[0].className.split(' ');
                                    var classes = "";
                                    element.forEach(function (elementClass) {
                                        classes += "." + elementClass;
                                    });
                                    css = css + classes + '{ display: none!important; }';
                                    var element = btwIconTimes[0].className.split(' ');
                                    var classes = "";
                                    element.forEach(function (elementClass) {
                                        classes += "." + elementClass;
                                    });
                                    css = css + classes + '{ display: none!important; }';

                                    head = document.head || document.getElementsByTagName('head')[0],
                                        style = document.createElement('style');
                                    style.setAttribute("id", "btwStyleId");
                                    style.type = 'text/css';
                                    if (style.styleSheet) {
                                        // This is required for IE8 and below.
                                        style.styleSheet.cssText = css;
                                    } else {
                                        style.appendChild(document.createTextNode(css));
                                    }
                                    head.appendChild(style);
                                }
                            }
                        }
                    }
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
        init();
    }else{
        document.addEventListener("DOMContentLoaded", function () {
            init();
        });
    }
}

CMDC_Vies();
