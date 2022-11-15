<script id="gtm-js-xhr_request-listen" type="text/javascript">
        (function () {
            'use strict';

            let xmlhttp = typeof window.XMLHttpRequest != "undefined" ? window.XMLHttpRequest.prototype : null;
            if(xmlhttp){
                let open = xmlhttp.open;
                let send = xmlhttp.send;

                let formData = [];
                formData['event'] = 'ajaxComplete';
                formData['attributes'] = {};

                const responseStatus = Object.freeze({
                    SUCCESS : "success",
                    ERROR : "error"
                });

                function openRequest(method, url, async, user, password) {
                    // Create a fake a element for simple URL parsing
                    let pageUrl = createDocumentFragment(url);

                    formData['attributes'].type = method;
                    formData['attributes'].url = pageUrl.href || '';
                    formData['attributes'].hostname =  pageUrl.hostname || '';
                    formData['attributes'].protocol = pageUrl.protocol || '';
                    formData['attributes'].fragment = pageUrl.hash || '';

                    return open.apply(this, arguments);
                }

                function changeRequestState() {
                    let responseHeaders = stringToMap(this.getAllResponseHeaders());

                    formData['attributes'].headers = responseHeaders;

                    if(this._onreadystatechange) {
                        return this._onreadystatechange.apply(this, arguments);
                    }
                }

                function sendRequest(data) {
                    let formRequestData = this;

                    if(formRequestData.onreadystatechange){
                        formRequestData._onreadystatechange = formRequestData.onreadystatechange;
                    }

                    this.addEventListener('load', function() {
                        let formRequestDate = new Date();
                        let responseTextToObj = formRequestData.responseText ? JSON.parse(formRequestData.responseText) : '';

                        formData['attributes'].statusCode = formRequestData.status || '';
                        formData['attributes'].statusText = formRequestData.statusText || '';
                        formData['attributes'].timestamp = (formRequestDate.valueOf());
                        formData['attributes'].date = formRequestDate;
                        formData['attributes'].response = responseTextToObj;

                        if(responseTextToObj.message == responseStatus.SUCCESS){
                            window.dataLayer.push(Object.assign({}, formData));
                        }else{
                            console.warn('Datalayer is not defined. Because the form was submitted unsuccessfully.');
                        }
                    });

                    this.onreadystatechange = changeRequestState;
                    return send.apply(this, arguments);
                }

                function stringToMap(data) {
                    let array = data.trim().split('\r\n');
                    let headers = array.reduce(function (acc, current) {
                        const [x,v] = current.split(': ');
                        return Object.assign(acc, {[x] : v });
                    }, {});
                    return headers;
                }

                function createDocumentFragment(url = ''){
                    let element;
                    if(url){
                        element = document.createElement('a');
                        element.href = url;
                    }
                    return element;
                }

                xmlhttp.open = openRequest;
                xmlhttp.send = sendRequest;
            }
        })();
    </script>