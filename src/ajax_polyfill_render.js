<script id="gtm-js-xhr_request-listen" type="text/javascript">
	'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
    'use strict';

    var xmlhttp = typeof window.XMLHttpRequest != "undefined" ? window.XMLHttpRequest.prototype : null;
    if (xmlhttp) {
        (function () {
            var openRequest = function openRequest(method, url, async, user, password) {
                // Create a fake a element for simple URL parsing
                var pageUrl = createDocumentFragment(url);

                formData['attributes'].type = method;
                formData['attributes'].url = pageUrl.href || '';
                formData['attributes'].hostname = pageUrl.hostname || '';
                formData['attributes'].protocol = pageUrl.protocol || '';
                formData['attributes'].fragment = pageUrl.hash || '';

                return open.apply(this, arguments);
            };

            var changeRequestState = function changeRequestState() {
                var responseHeaders = stringToMap(this.getAllResponseHeaders());

                formData['attributes'].headers = responseHeaders;

                if (this._onreadystatechange) {
                    return this._onreadystatechange.apply(this, arguments);
                }
            };

            var sendRequest = function sendRequest(data) {
                var formRequestData = this;

                if (formRequestData.onreadystatechange) {
                    formRequestData._onreadystatechange = formRequestData.onreadystatechange;
                }

                this.addEventListener('load', function () {
                    var formRequestDate = new Date();
                    var responseTextToObj = formRequestData.responseText ? JSON.parse(formRequestData.responseText) : '';

                    formData['attributes'].statusCode = formRequestData.status || '';
                    formData['attributes'].statusText = formRequestData.statusText || '';
                    formData['attributes'].timestamp = formRequestDate.valueOf();
                    formData['attributes'].date = formRequestDate;
                    formData['attributes'].response = responseTextToObj;

                    if (responseTextToObj.message == responseStatus.SUCCESS) {
                        window.dataLayer.push(Object.assign({}, formData));
                    } else {
                        console.warn('Datalayer is not defined. Because the form was submitted unsuccessfully.');
                    }
                });

                this.onreadystatechange = changeRequestState;
                return send.apply(this, arguments);
            };

            var stringToMap = function stringToMap(data) {
                var array = data.trim().split('\r\n');
                var headers = array.reduce(function (acc, current) {
                    var _current$split = current.split(': ');

                    var _current$split2 = _slicedToArray(_current$split, 2);

                    var x = _current$split2[0];
                    var v = _current$split2[1];

                    return Object.assign(acc, _defineProperty({}, x, v));
                }, {});
                return headers;
            };

            var createDocumentFragment = function createDocumentFragment() {
                var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

                var element = undefined;
                if (url) {
                    element = document.createElement('a');
                    element.href = url;
                }
                return element;
            };

            var open = xmlhttp.open;
            var send = xmlhttp.send;

            var formData = [];
            formData['event'] = 'ajaxComplete';
            formData['attributes'] = {};

            var responseStatus = Object.freeze({
                SUCCESS: "success",
                ERROR: "error"
            });

            xmlhttp.open = openRequest;
            xmlhttp.send = sendRequest;
        })();
    }
})();
</script>