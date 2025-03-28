function CMDC_OptionIcons() {
    var productsFetched = {};
    var optionIconsCache = null;

    var oldPrototypeSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            updateCache();
            if (optionIconsCache !== null) {
                placeIcons(optionIconsCache);
            }
        });
        return oldPrototypeSend.apply(this, arguments);
    };

    function runWhenLoaded(callable) {
        if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
            callable();
        }else{
            document.addEventListener("DOMContentLoaded", function () {
                callable();
            });
        }
    }

    function updateCache() {
        let selects = document.querySelectorAll("select[name^=Attr]");
        selects.forEach(function(element) {
            let regexResult = element.getAttribute("name").match(/Attr\[(.*)\]\[.*\]/);
            if(regexResult !== null && regexResult.length===2) {
                fetchByProductId(regexResult[1]);
            }
        });
    }

    function fetchByProductId(productId) {
        var shopID = "39697";

        if(productId !== null) {
            if(typeof productsFetched[productId] === "undefined") {
                productsFetched[productId] = true;

                var optionIconsUrl = "https://optionsicons.cmdcbv.app/public/ccvshop/" + shopID + "/" + productId;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var jsonImages = JSON.parse(this.response);
                        if(optionIconsCache === null) {
                            optionIconsCache = jsonImages["attributeValues"];
                        }else{
                            optionIconsCache = {...optionIconsCache, ...jsonImages["attributeValues"]}
                        }

                        placeIcons(optionIconsCache);
                    }
                };
                xhttp.open("GET", optionIconsUrl, true);
                xhttp.send();
            }
        }
    }

    runWhenLoaded(function () {
        try {
            updateCache();
            fetchByProductId(Vertoshop.getProduct().getId());
        } catch (e) {
            console.warn(e);
        }
    });

    let iconsCounter = 0;
    function placeIcons(jsonResponse) {
        var fieldId;
        for (fieldId in jsonResponse) {
            var image;
            var images = jsonResponse[fieldId];
            for (image in images) {
                var imageUrl = images[image];

                if (image == "small") {
                    var getField = document.querySelectorAll("[value='" + fieldId + "']");
                    if (getField.length > 0) {
                        var fieldType = getField[0].tagName.toLowerCase();
                        if (fieldType == "option") {
                            var placeholderId = "select" + iconsCounter;
                            iconsCounter++;

                            iconSelectField(imageUrl, fieldId, getField[0], placeholderId);
                        }
                    }
                }
            }
        }
        makePlaceholderClickable();
    }

    function iconSelectField(imageUrl, fieldId, fieldSelect, placeholderId) {
        /* if field is option whole select needs to be replaced*/
        var selectId = fieldSelect.parentElement.id;
        /* check if placeholder select div already exists for this element */
        if (!document.getElementById("selectID" + selectId)) {
            /* if div doesn't exist make placeholder select div */
            fieldSelect.parentElement.style.display = "none";
            fieldSelect.parentElement.id = placeholderId;
            var div = document.createElement('div');
            div.setAttribute('id', "selectID" + placeholderId);
            div.setAttribute('class', "optionIconSelectPlaceholder");
            fieldSelect.parentElement.parentElement.insertBefore(div, fieldSelect.parentElement);
            var allOptions = fieldSelect.parentElement.getElementsByTagName('option');
            var ul = document.createElement('ul');
            document.getElementById("selectID" + placeholderId).appendChild(ul);
            Object.keys(allOptions).forEach(function (key) {
                var option = allOptions[key];
                var li = document.createElement('li');
                if (fieldId == option.value && imageUrl) {
                    /* if id matches to optionvalue and image is available add image to placeholder option */
                    var imageElement = "<img src='" + imageUrl + "' >";
                    li.innerHTML = imageElement + option.innerHTML;
                } else {
                    li.innerHTML = option.innerHTML;
                }
                if (option.value) {
                    li.setAttribute('id', "valueID" + option.value);
                }
                if (option.selected) {
                    li.setAttribute('class', "optionIconOptionPlaceholder selected");
                } else {
                    li.setAttribute('class', "optionIconOptionPlaceholder");
                }
                var ul = document.getElementById("selectID" + placeholderId).getElementsByTagName('ul')[0];
                ul.appendChild(li);
            });
        } else {
            if (imageUrl) {
                /* if placeholder select div already exists add image to placeholder option */
                var select = document.getElementById("selectID" + selectId);
                var option = select.querySelectorAll("#valueID" + fieldSelect.value);
                var imageElement = "<img src='" + imageUrl + "'>";
                if (option[0].getElementsByTagName("img").length < 1) {
                    option[0].innerHTML = imageElement + option[0].innerHTML;
                }
            }
        }
        createSelectedPlaceholder();
    }

    function createSelectedPlaceholder() {
        var placeholders = document.getElementsByClassName("optionIconSelectPlaceholder");
        Object.keys(placeholders).forEach(function (key) {
            var placeholder = placeholders[key];
            var selectedOption = placeholder.getElementsByClassName("selected")[0];
            var placeholderUl = placeholder.getElementsByTagName('ul')[0];
            if (!selectedOption) {
                selectedOption = placeholder.getElementsByTagName('li')[0];
            }
            var span = document.createElement('span');
            span.innerHTML = selectedOption.innerHTML;
            span.setAttribute('class', "optionIconSelectedOption");
            if (placeholder.getElementsByClassName("optionIconSelectedOption").length < 1) {
                placeholder.insertBefore(span, placeholderUl);
            } else {
                placeholder.getElementsByClassName("optionIconSelectedOption")[0].innerHTML = span.innerHTML;
            }
        });
    }
    function makePlaceholderClickable() {
        var placeholderClass = document.getElementsByClassName("optionIconSelectPlaceholder");
        document.addEventListener("click", closeSelectOutsideClick);
        for (var i = 0; i < placeholderClass.length; i++) {
            placeholderClass[i].removeEventListener("click", clickFunction);
            placeholderClass[i].addEventListener('click', clickFunction);
        }
    }

    function clickFunction(event) {
        var placeholderClass = document.getElementsByClassName("optionIconSelectPlaceholder");
        var ul = this.parentElement.getElementsByTagName('ul')[0];
        for (var i = 0; i < placeholderClass.length; i++) {
            var otherUl = placeholderClass[i].getElementsByTagName('ul')[0];
            if (otherUl != ul) {
                otherUl.style.display = "none";
            }
        }
        if (ul.style.display == "block") {
            ul.style.display = "none";
        } else {
            ul.style.display = "block";
        }

        let realTarget = event.target;
        if(event.target.parentNode.className === "optionIconOptionPlaceholder") {
            realTarget = event.target.parentNode;
        }

        if (realTarget.className === "optionIconOptionPlaceholder") {
            /* if target is placeholder, change select to correct option */
            var optionId = realTarget.id.replace("valueID", "");
            var selectPlaceholderId = realTarget.parentElement.parentElement.id.replace("selectID", "");
            var selectedOptionPlaceholder = realTarget.parentElement.parentElement.querySelectorAll(".optionIconSelectedOption")[0];
            var selectedOption = document.getElementById(selectPlaceholderId).querySelectorAll("[value='" + optionId + "']")[0];

            var selectElement = document.getElementById(selectPlaceholderId);
            var oldSelectedOption = selectElement.options[selectElement.selectedIndex];

            var oldSelectedPlaceholder = realTarget.parentElement.parentElement.querySelectorAll(".selected")[0];
            oldSelectedOption.selected = false;
            selectedOption.selected = true;
            selectedOptionPlaceholder.innerHTML = realTarget.innerHTML;
            oldSelectedPlaceholder.className = "optionIconOptionPlaceholder";
            realTarget.className = "optionIconOptionPlaceholder selected";

            if(selectedOption.parentElement.onchange) {
                selectedOption.parentElement.onchange();
            }else{
                $(selectedOption.parentElement).trigger("change");
            }
        }
    }
    function closeSelectOutsideClick(event){
        var placeholderClass = document.getElementsByClassName("optionIconSelectPlaceholder");
        if (event.target.className != "optionIconOptionPlaceholder" && event.target.className != "optionIconSelectedOption") {
            var placeholderClass = document.getElementsByClassName("optionIconSelectPlaceholder");
            console.log("eventtarget " + event.target.className);
            for (var i = 0; i < placeholderClass.length; i++) {
                if(placeholderClass[i].getElementsByTagName('ul')[0].style.display == "block"){
                    placeholderClass[i].getElementsByTagName('ul')[0].style.display = "none";
                }
            }

        }
    }
}
CMDC_OptionIcons();
