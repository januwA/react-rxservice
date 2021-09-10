/*! For license information please see react-rxservice.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ReactRxService=e():t.ReactRxService=e()}(this,(function(){return(()=>{"use strict";var t={418:t=>{var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,i){for(var u,c,s=o(t),a=1;a<arguments.length;a++){for(var l in u=Object(arguments[a]))r.call(u,l)&&(s[l]=u[l]);if(e){c=e(u);for(var f=0;f<c.length;f++)n.call(u,c[f])&&(s[c[f]]=u[c[f]])}}return s}},251:(t,e,r)=>{r(418);var n=r(294),o=60103;if(e.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),e.Fragment=i("react.fragment")}var u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};e.jsx=function(t,e,r){var n,i={},a=null,l=null;for(n in void 0!==r&&(a=""+r),void 0!==e.key&&(a=""+e.key),void 0!==e.ref&&(l=e.ref),e)c.call(e,n)&&!s.hasOwnProperty(n)&&(i[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===i[n]&&(i[n]=e[n]);return{$$typeof:o,type:t,key:a,ref:l,props:i,_owner:u.current}}},408:(t,e,r)=>{var n=r(418),o=60103,i=60106;e.Fragment=60107,e.StrictMode=60108,e.Profiler=60114;var u=60109,c=60110,s=60112;e.Suspense=60113;var a=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),i=f("react.portal"),e.Fragment=f("react.fragment"),e.StrictMode=f("react.strict_mode"),e.Profiler=f("react.profiler"),u=f("react.provider"),c=f("react.context"),s=f("react.forward_ref"),e.Suspense=f("react.suspense"),a=f("react.memo"),l=f("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function h(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function y(t,e,r){this.props=t,this.context=e,this.refs=v,this.updater=r||d}function b(){}function _(t,e,r){this.props=t,this.context=e,this.refs=v,this.updater=r||d}y.prototype.isReactComponent={},y.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(h(85));this.updater.enqueueSetState(this,t,e,"setState")},y.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},b.prototype=y.prototype;var w=_.prototype=new b;w.constructor=_,n(w,y.prototype),w.isPureReactComponent=!0;var g={current:null},m=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function E(t,e,r){var n,i={},u=null,c=null;if(null!=e)for(n in void 0!==e.ref&&(c=e.ref),void 0!==e.key&&(u=""+e.key),e)m.call(e,n)&&!S.hasOwnProperty(n)&&(i[n]=e[n]);var s=arguments.length-2;if(1===s)i.children=r;else if(1<s){for(var a=Array(s),l=0;l<s;l++)a[l]=arguments[l+2];i.children=a}if(t&&t.defaultProps)for(n in s=t.defaultProps)void 0===i[n]&&(i[n]=s[n]);return{$$typeof:o,type:t,key:u,ref:c,props:i,_owner:g.current}}function x(t){return"object"==typeof t&&null!==t&&t.$$typeof===o}var O=/\/+/g;function I(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,(function(t){return e[t]}))}(""+t.key):e.toString(36)}function j(t,e,r,n,u){var c=typeof t;"undefined"!==c&&"boolean"!==c||(t=null);var s=!1;if(null===t)s=!0;else switch(c){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case o:case i:s=!0}}if(s)return u=u(s=t),t=""===n?"."+I(s,0):n,Array.isArray(u)?(r="",null!=t&&(r=t.replace(O,"$&/")+"/"),j(u,e,r,"",(function(t){return t}))):null!=u&&(x(u)&&(u=function(t,e){return{$$typeof:o,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(u,r+(!u.key||s&&s.key===u.key?"":(""+u.key).replace(O,"$&/")+"/")+t)),e.push(u)),1;if(s=0,n=""===n?".":n+":",Array.isArray(t))for(var a=0;a<t.length;a++){var l=n+I(c=t[a],a);s+=j(c,e,r,l,u)}else if("function"==typeof(l=function(t){return null===t||"object"!=typeof t?null:"function"==typeof(t=p&&t[p]||t["@@iterator"])?t:null}(t)))for(t=l.call(t),a=0;!(c=t.next()).done;)s+=j(c=c.value,e,r,l=n+I(c,a++),u);else if("object"===c)throw e=""+t,Error(h(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e));return s}function A(t,e,r){if(null==t)return t;var n=[],o=0;return j(t,n,"","",(function(t){return e.call(r,t,o++)})),n}function R(t){if(-1===t._status){var e=t._result;e=e(),t._status=0,t._result=e,e.then((function(e){0===t._status&&(e=e.default,t._status=1,t._result=e)}),(function(e){0===t._status&&(t._status=2,t._result=e)}))}if(1===t._status)return t._result;throw t._result}var C={current:null};function L(){var t=C.current;if(null===t)throw Error(h(321));return t}var P={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:g,IsSomeRendererActing:{current:!1},assign:n};e.Children={map:A,forEach:function(t,e,r){A(t,(function(){e.apply(this,arguments)}),r)},count:function(t){var e=0;return A(t,(function(){e++})),e},toArray:function(t){return A(t,(function(t){return t}))||[]},only:function(t){if(!x(t))throw Error(h(143));return t}},e.Component=y,e.PureComponent=_,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=P,e.cloneElement=function(t,e,r){if(null==t)throw Error(h(267,t));var i=n({},t.props),u=t.key,c=t.ref,s=t._owner;if(null!=e){if(void 0!==e.ref&&(c=e.ref,s=g.current),void 0!==e.key&&(u=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)m.call(e,l)&&!S.hasOwnProperty(l)&&(i[l]=void 0===e[l]&&void 0!==a?a[l]:e[l])}var l=arguments.length-2;if(1===l)i.children=r;else if(1<l){a=Array(l);for(var f=0;f<l;f++)a[f]=arguments[f+2];i.children=a}return{$$typeof:o,type:t.type,key:u,ref:c,props:i,_owner:s}},e.createContext=function(t,e){return void 0===e&&(e=null),(t={$$typeof:c,_calculateChangedBits:e,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:u,_context:t},t.Consumer=t},e.createElement=E,e.createFactory=function(t){var e=E.bind(null,t);return e.type=t,e},e.createRef=function(){return{current:null}},e.forwardRef=function(t){return{$$typeof:s,render:t}},e.isValidElement=x,e.lazy=function(t){return{$$typeof:l,_payload:{_status:-1,_result:t},_init:R}},e.memo=function(t,e){return{$$typeof:a,type:t,compare:void 0===e?null:e}},e.useCallback=function(t,e){return L().useCallback(t,e)},e.useContext=function(t,e){return L().useContext(t,e)},e.useDebugValue=function(){},e.useEffect=function(t,e){return L().useEffect(t,e)},e.useImperativeHandle=function(t,e,r){return L().useImperativeHandle(t,e,r)},e.useLayoutEffect=function(t,e){return L().useLayoutEffect(t,e)},e.useMemo=function(t,e){return L().useMemo(t,e)},e.useReducer=function(t,e,r){return L().useReducer(t,e,r)},e.useRef=function(t){return L().useRef(t)},e.useState=function(t){return L().useState(t)},e.version="17.0.2"},294:(t,e,r)=>{t.exports=r(408)},893:(t,e,r)=>{t.exports=r(251)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{Ignore:()=>zt,Injectable:()=>Yt,Late:()=>Wt,RxService:()=>kt,ServiceManager:()=>Gt,useService:()=>qt});var t=r(893),e=r(294),o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function u(t,e){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}function c(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function s(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return u}function a(t,e){for(var r=0,n=e.length,o=t.length;r<n;r++,o++)t[o]=e[r];return t}function l(t){return this instanceof l?(this.v=t,this):new l(t)}function f(t,e,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(t,e||[]),i=[];return n={},u("next"),u("throw"),u("return"),n[Symbol.asyncIterator]=function(){return this},n;function u(t){o[t]&&(n[t]=function(e){return new Promise((function(r,n){i.push([t,e,r,n])>1||c(t,e)}))})}function c(t,e){try{(r=o[t](e)).value instanceof l?Promise.resolve(r.value.v).then(s,a):f(i[0][2],r)}catch(t){f(i[0][3],t)}var r}function s(t){c("next",t)}function a(t){c("throw",t)}function f(t,e){t(e),i.shift(),i.length&&c(i[0][0],i[0][1])}}function p(t){return"function"==typeof t}function h(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Object.create,Object.create;var d=h((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function v(t,e){if(t){var r=t.indexOf(e);0<=r&&t.splice(r,1)}}var y=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}var e;return t.prototype.unsubscribe=function(){var t,e,r,n,o;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var u=c(i),l=u.next();!l.done;l=u.next())l.value.remove(this)}catch(e){t={error:e}}finally{try{l&&!l.done&&(e=u.return)&&e.call(u)}finally{if(t)throw t.error}}else i.remove(this);var f=this.initialTeardown;if(p(f))try{f()}catch(t){o=t instanceof d?t.errors:[t]}var h=this._teardowns;if(h){this._teardowns=null;try{for(var v=c(h),y=v.next();!y.done;y=v.next()){var b=y.value;try{w(b)}catch(t){o=null!=o?o:[],t instanceof d?o=a(a([],s(o)),s(t.errors)):o.push(t)}}}catch(t){r={error:t}}finally{try{y&&!y.done&&(n=v.return)&&n.call(v)}finally{if(r)throw r.error}}}if(o)throw new d(o)}},t.prototype.add=function(e){var r;if(e&&e!==this)if(this.closed)w(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._teardowns=null!==(r=this._teardowns)&&void 0!==r?r:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&v(e,t)},t.prototype.remove=function(e){var r=this._teardowns;r&&v(r,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),b=y.EMPTY;function _(t){return t instanceof y||t&&"closed"in t&&p(t.remove)&&p(t.add)&&p(t.unsubscribe)}function w(t){p(t)?t():t.unsubscribe()}var g=null,m=null,S=void 0,E=!1,x=!1,O={setTimeout:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=O.delegate;return((null==r?void 0:r.setTimeout)||setTimeout).apply(void 0,a([],s(t)))},clearTimeout:function(t){var e=O.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function I(t){O.setTimeout((function(){if(!g)throw t;g(t)}))}function j(){}var A=R("C",void 0,void 0);function R(t,e,r){return{kind:t,value:e,error:r}}var C=null;function L(t){if(E){var e=!C;if(e&&(C={errorThrown:!1,error:null}),t(),e){var r=C,n=r.errorThrown,o=r.error;if(C=null,n)throw o}}else t()}function P(t){E&&C&&(C.errorThrown=!0,C.error=t)}var T=function(t){function e(e){var r=t.call(this)||this;return r.isStopped=!1,e?(r.destination=e,_(e)&&e.add(r)):r.destination=B,r}return i(e,t),e.create=function(t,e,r){return new k(t,e,r)},e.prototype.next=function(t){this.isStopped?V(function(t){return R("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?V(R("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?V(A,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(y),k=function(t){function e(e,r,n){var o,i=t.call(this)||this;if(p(e))o=e;else if(e){var u;o=e.next,r=e.error,n=e.complete,i&&x?(u=Object.create(e)).unsubscribe=function(){return i.unsubscribe()}:u=e,o=null==o?void 0:o.bind(u),r=null==r?void 0:r.bind(u),n=null==n?void 0:n.bind(u)}return i.destination={next:o?$(o):j,error:$(null!=r?r:M),complete:n?$(n):j},i}return i(e,t),e}(T);function $(t,e){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{t.apply(void 0,a([],s(e)))}catch(t){E?P(t):I(t)}}}function M(t){throw t}function V(t,e){var r=m;r&&O.setTimeout((function(){return r(t,e)}))}var B={closed:!0,next:j,error:M,complete:j},U="function"==typeof Symbol&&Symbol.observable||"@@observable";function N(t){return t}function D(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return F(t)}function F(t){return 0===t.length?N:1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}}var G=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n,o=this,i=(n=t)&&n instanceof T||function(t){return t&&p(t.next)&&p(t.error)&&p(t.complete)}(n)&&_(n)?t:new k(t,e,r);return L((function(){var t=o,e=t.operator,r=t.source;i.add(e?e.call(i,r):r?o._subscribe(i):o._trySubscribe(i))})),i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=q(e))((function(e,n){var o;o=r.subscribe((function(e){try{t(e)}catch(t){n(t),null==o||o.unsubscribe()}}),n,e)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[U]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return F(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=q(t))((function(t,r){var n;e.subscribe((function(t){return n=t}),(function(t){return r(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function q(t){var e;return null!==(e=null!=t?t:S)&&void 0!==e?e:Promise}var W=h((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),z=function(t){function e(){var e=t.call(this)||this;return e.closed=!1,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return i(e,t),e.prototype.lift=function(t){var e=new Y(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new W},e.prototype.next=function(t){var e=this;L((function(){var r,n;if(e._throwIfClosed(),!e.isStopped){var o=e.observers.slice();try{for(var i=c(o),u=i.next();!u.done;u=i.next())u.value.next(t)}catch(t){r={error:t}}finally{try{u&&!u.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}}))},e.prototype.error=function(t){var e=this;L((function(){if(e._throwIfClosed(),!e.isStopped){e.hasError=e.isStopped=!0,e.thrownError=t;for(var r=e.observers;r.length;)r.shift().error(t)}}))},e.prototype.complete=function(){var t=this;L((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var e=t.observers;e.length;)e.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,r=e.hasError,n=e.isStopped,o=e.observers;return r||n?b:(o.push(t),new y((function(){return v(o,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,r=e.hasError,n=e.thrownError,o=e.isStopped;r?t.error(n):o&&t.complete()},e.prototype.asObservable=function(){var t=new G;return t.source=this,t},e.create=function(t,e){return new Y(t,e)},e}(G),Y=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return i(e,t),e.prototype.next=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===r||r.call(e,t)},e.prototype.error=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===r||r.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,r;return null!==(r=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==r?r:b},e}(z);function J(t){return function(e){if(function(t){return p(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}var X=function(t){function e(e,r,n,o,i){var u=t.call(this,e)||this;return u.onFinalize=i,u._next=r?function(t){try{r(t)}catch(t){e.error(t)}}:t.prototype._next,u._error=o?function(t){try{o(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,u._complete=n?function(){try{n()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,u}return i(e,t),e.prototype.unsubscribe=function(){var e,r=this.closed;t.prototype.unsubscribe.call(this),!r&&(null===(e=this.onFinalize)||void 0===e||e.call(this))},e}(T),H=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function K(t){return p(null==t?void 0:t.then)}function Q(t,e){return new G((function(r){var n=0;return e.schedule((function(){n===t.length?r.complete():(r.next(t[n++]),r.closed||this.schedule())}))}))}var Z="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function tt(t,e){if(!t)throw new Error("Iterable cannot be null");return new G((function(r){var n=new y;return n.add(e.schedule((function(){var o=t[Symbol.asyncIterator]();n.add(e.schedule((function(){var t=this;o.next().then((function(e){e.done?r.complete():(r.next(e.value),t.schedule())}))})))}))),n}))}function et(t){return p(t[U])}function rt(t){return p(null==t?void 0:t[Z])}function nt(t){return Symbol.asyncIterator&&p(null==t?void 0:t[Symbol.asyncIterator])}function ot(t){return new TypeError("You provided "+(null!==t&&"object"==typeof t?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function it(t){return f(this,arguments,(function(){var e,r,n;return u(this,(function(o){switch(o.label){case 0:e=t.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,l(e.read())];case 3:return r=o.sent(),n=r.value,r.done?[4,l(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,l(n)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return e.releaseLock(),[7];case 10:return[2]}}))}))}function ut(t){return p(null==t?void 0:t.getReader)}function ct(t,e){return e?function(t,e){if(null!=t){if(et(t))return function(t,e){return new G((function(r){var n=new y;return n.add(e.schedule((function(){var o=t[U]();n.add(o.subscribe({next:function(t){n.add(e.schedule((function(){return r.next(t)})))},error:function(t){n.add(e.schedule((function(){return r.error(t)})))},complete:function(){n.add(e.schedule((function(){return r.complete()})))}}))}))),n}))}(t,e);if(H(t))return Q(t,e);if(K(t))return function(t,e){return new G((function(r){return e.schedule((function(){return t.then((function(t){r.add(e.schedule((function(){r.next(t),r.add(e.schedule((function(){return r.complete()})))})))}),(function(t){r.add(e.schedule((function(){return r.error(t)})))}))}))}))}(t,e);if(nt(t))return tt(t,e);if(rt(t))return function(t,e){return new G((function(r){var n;return r.add(e.schedule((function(){n=t[Z](),function(t,e,r,n){void 0===n&&(n=0);var o=e.schedule((function(){try{r.call(this)}catch(e){t.error(e)}}),n);t.add(o)}(r,e,(function(){var t=n.next(),e=t.value;t.done?r.complete():(r.next(e),this.schedule())}))}))),function(){return p(null==n?void 0:n.return)&&n.return()}}))}(t,e);if(ut(t))return function(t,e){return tt(it(t),e)}(t,e)}throw ot(t)}(t,e):st(t)}function st(t){if(t instanceof G)return t;if(null!=t){if(et(t))return n=t,new G((function(t){var e=n[U]();if(p(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(H(t))return at(t);if(K(t))return r=t,new G((function(t){r.then((function(e){t.closed||(t.next(e),t.complete())}),(function(e){return t.error(e)})).then(null,I)}));if(nt(t))return lt(t);if(rt(t))return e=t,new G((function(t){var r,n;try{for(var o=c(e),i=o.next();!i.done;i=o.next()){var u=i.value;if(t.next(u),t.closed)return}}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}t.complete()}));if(ut(t))return lt(it(t))}var e,r,n;throw ot(t)}function at(t){return new G((function(e){for(var r=0;r<t.length&&!e.closed;r++)e.next(t[r]);e.complete()}))}function lt(t){return new G((function(e){(function(t,e){var r,n,o,i,s,a,l,f;return s=this,a=void 0,f=function(){var s,a;return u(this,(function(u){switch(u.label){case 0:u.trys.push([0,5,6,11]),r=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,r=t[Symbol.asyncIterator];return r?r.call(t):(t=c(t),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(r){e[r]=t[r]&&function(e){return new Promise((function(n,o){!function(t,e,r,n){Promise.resolve(n).then((function(e){t({value:e,done:r})}),e)}(n,o,(e=t[r](e)).done,e.value)}))}}}(t),u.label=1;case 1:return[4,r.next()];case 2:if((n=u.sent()).done)return[3,4];if(s=n.value,e.next(s),e.closed)return[2];u.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=u.sent(),o={error:a},[3,11];case 6:return u.trys.push([6,,9,10]),n&&!n.done&&(i=r.return)?[4,i.call(r)]:[3,8];case 7:u.sent(),u.label=8;case 8:return[3,10];case 9:if(o)throw o.error;return[7];case 10:return[7];case 11:return e.complete(),[2]}}))},new((l=void 0)||(l=Promise))((function(t,e){function r(t){try{o(f.next(t))}catch(t){e(t)}}function n(t){try{o(f.throw(t))}catch(t){e(t)}}function o(e){var o;e.done?t(e.value):(o=e.value,o instanceof l?o:new l((function(t){t(o)}))).then(r,n)}o((f=f.apply(s,a||[])).next())}))})(t,e).catch((function(t){return e.error(t)}))}))}function ft(t,e){return J((function(r,n){var o=0;r.subscribe(new X(n,(function(r){n.next(t.call(e,r,o++))})))}))}var pt=Array.isArray,ht=Object.getPrototypeOf,dt=Object.prototype,vt=Object.keys;function yt(t){if(1===t.length){var e=t[0];if(pt(e))return{args:e,keys:null};if((n=e)&&"object"==typeof n&&ht(n)===dt){var r=vt(e);return{args:r.map((function(t){return e[t]})),keys:r}}}var n;return{args:t,keys:null}}var bt=Array.isArray;function _t(t){return ft((function(e){return function(t,e){return bt(e)?t.apply(void 0,a([],s(e))):t(e)}(t,e)}))}function wt(t){return t[t.length-1]}function gt(t){return p(wt(t))?t.pop():void 0}function mt(t){return(e=wt(t))&&p(e.schedule)?t.pop():void 0;var e}function St(t,e){return t.reduce((function(t,r,n){return t[r]=e[n],t}),{})}function Et(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=mt(t),n=gt(t),o=yt(t),i=o.args,u=o.keys;if(0===i.length)return ct([],r);var c=new G(xt(i,r,u?function(t){return St(u,t)}:N));return n?c.pipe(_t(n)):c}function xt(t,e,r){return void 0===r&&(r=N),function(n){Ot(e,(function(){for(var o=t.length,i=new Array(o),u=o,c=o,s=function(o){Ot(e,(function(){var s=ct(t[o],e),a=!1;s.subscribe(new X(n,(function(t){i[o]=t,a||(a=!0,c--),c||n.next(r(i.slice()))}),(function(){--u||n.complete()})))}),n)},a=0;a<o;a++)s(a)}),n)}}function Ot(t,e,r){t?r.add(t.schedule(e)):e()}function It(t,e){return e?Q(t,e):at(t)}var jt=function(t){function e(e,r){return t.call(this)||this}return i(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(y),At={setInterval:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=At.delegate;return((null==r?void 0:r.setInterval)||setInterval).apply(void 0,a([],s(t)))},clearInterval:function(t){var e=At.delegate;return((null==e?void 0:e.clearInterval)||clearInterval)(t)},delegate:void 0},Rt=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return i(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),At.setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!=r&&this.delay===r&&!1===this.pending)return e;At.clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r,n=!1;try{this.work(t)}catch(t){n=!0,r=!!t&&t||new Error(t)}if(n)return this.unsubscribe(),r},e.prototype.unsubscribe=function(){if(!this.closed){var e=this.id,r=this.scheduler,n=r.actions;this.work=this.state=this.scheduler=null,this.pending=!1,v(n,this),null!=e&&(this.id=this.recycleAsyncId(r,e,null)),this.delay=null,t.prototype.unsubscribe.call(this)}},e}(jt),Ct={now:function(){return(Ct.delegate||Date).now()},delegate:void 0},Lt=function(){function t(e,r){void 0===r&&(r=t.now),this.schedulerActionCtor=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.schedulerActionCtor(this,t).schedule(r,e)},t.now=Ct.now,t}(),Pt=new(function(t){function e(e,r){void 0===r&&(r=Lt.now);var n=t.call(this,e,r)||this;return n.actions=[],n._active=!1,n._scheduled=void 0,n}return i(e,t),e.prototype.flush=function(t){var e=this.actions;if(this._active)e.push(t);else{var r;this._active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this._active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(Lt))(Rt);function Tt(t,e){return void 0===e&&(e=Pt),J((function(r,n){var o=null,i=null,u=null,c=function(){if(o){o.unsubscribe(),o=null;var t=i;i=null,n.next(t)}};function s(){var r=u+t,i=e.now();if(i<r)return o=this.schedule(void 0,r-i),void n.add(o);c()}r.subscribe(new X(n,(function(r){i=r,u=e.now(),o||(o=e.schedule(s,t),n.add(o))}),(function(){c(),n.complete()}),void 0,(function(){i=o=null})))}))}const kt=({children:r,pipe:n,services:o=[],global:i=!0})=>{const[u,c]=(0,e.useState)(0);return(0,e.useEffect)((()=>{const t=new Gt,e=new z;let r;const u=o.map((e=>t.getService(e).change$)),s=D((d=p(l=()=>null==r?void 0:r.unsubscribe())?{next:l,error:f,complete:h}:l)?J((function(t,e){var r;null===(r=d.subscribe)||void 0===r||r.call(d);var n=!0;t.subscribe(new X(e,(function(t){var r;null===(r=d.next)||void 0===r||r.call(d,t),e.next(t)}),(function(){var t;n=!1,null===(t=d.complete)||void 0===t||t.call(d),e.complete()}),(function(t){var r;n=!1,null===(r=d.error)||void 0===r||r.call(d,t),e.error(t)}),(function(){var t,e;n&&(null===(t=d.unsubscribe)||void 0===t||t.call(d)),null===(e=d.finalize)||void 0===e||e.call(d)})))})):N,(a=e,J((function(t,e){st(a).subscribe(new X(e,(function(){return e.complete()}),j)),!e.closed&&t.subscribe(e)}))));var a,l,f,h,d;return(i?t.GLOBAL_SERVICE$.pipe(ft((t=>Et(t.concat(u)))),s):function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=mt(t);return r?Q(t,r):It(t)}(Et(u)).pipe(s)).subscribe((t=>{var e,o;r=t.pipe(n||D((e=1,o=function(t,r){return e<=r},J((function(t,e){var r=0;t.subscribe(new X(e,(function(t){return o.call(void 0,t,r++)&&e.next(t)})))}))),(void 0,ft((function(){}))),Tt(10))).subscribe((()=>c((t=>t+1))))})),()=>{var n;e.next(!0),e.unsubscribe(),null==r||r.unsubscribe(),null===(n=null==o?void 0:o.filter((e=>!t.isGlobal(e))))||void 0===n||n.forEach((e=>t.destroy(e)))}}),[]),(0,t.jsx)(t.Fragment,{children:r(u)},void 0)};var $t=function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return i(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){var t=this,e=t.hasError,r=t.thrownError,n=t._value;if(e)throw r;return this._throwIfClosed(),n},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(z);const Mt="__AJANUW_RXSERVICE_ID__",Vt="__AJANUW_RXSERVICE_CACHE__",Bt="__AJANUW_RXSERVICE_IGNORES__",Ut="__AJANUW_RXSERVICE_LATE__",Nt="__AJANUW_RXSERVICE_CONFIG__";function Dt(t,e){if(!(e in t))return;return Object.getOwnPropertyDescriptor(t,e)||Dt(Object.getPrototypeOf(t),e)}function Ft(t,e,r=Object.create(null)){if("object"!=typeof(n=t)||null===n)return t;var n;if(Gt.isService(t))return t;for(const n in t){if(n in r&&r[n].init)continue;const o=t[n];t[n]=Ft(o,e)}const o=new Proxy(t,{get(t,e){if(e in r&&r[e].get)return t[e];const n=Dt(t,e);return(null==n?void 0:n.value)&&"function"==typeof n.value?n.value.bind(o):(null==n?void 0:n.get)?n.get.call(o):t[e]},set(t,n,i){if(n in r&&r[n].set)return t[n]=i,!0;const u=Dt(t,n);return i=Ft(i,e),(null==u?void 0:u.set)?u.set.call(o,i):t[n]=i,e(),!0}});return o}class Gt{constructor(){var t;return this.GLOBAL_SERVICE$=new $t([]),this.SERVICE_LATE_TABLE={},this.GLOBAL_SERVICES_TABLE={},null!==(t=Gt.ins)&&void 0!==t?t:Gt.ins=this}static isService(t){return"[object Object]"===Object.prototype.toString.call(t)&&Mt in Object.getPrototypeOf(t).constructor}getID(t){return this.getMeta(t,Mt)}get gSubject(){return Object.values(this.GLOBAL_SERVICES_TABLE).map((t=>t.change$))}setLate(t,e){var r,n;const o=this.getID(t);o in this.SERVICE_LATE_TABLE&&(this.SERVICE_LATE_TABLE[o].forEach((t=>t.proxy[t.prop]=e)),delete this.SERVICE_LATE_TABLE[o]);const i=this.getMeta(t,Ut);if(i)for(const t in i){const o=i[t];o in this.GLOBAL_SERVICES_TABLE?e[t]=this.GLOBAL_SERVICES_TABLE[o].proxy:(null!==(r=(n=this.SERVICE_LATE_TABLE)[o])&&void 0!==r||(n[o]=[]),this.SERVICE_LATE_TABLE[o].push({prop:t,proxy:e}))}}register(t){var e,r,n,o,i;const u=this.getMeta(t,Vt);if(u)return u;const c=this.getMeta(t,Nt),s=("getMetadata"in Reflect&&null!==(e=Reflect.getMetadata("design:paramtypes",t))&&void 0!==e?e:[]).map((t=>{var e;return null===(e=this.getService(t))||void 0===e?void 0:e.proxy})),a=Reflect.construct(t,s);if(c.autoIgnore){const e=Object.keys(a),r=c.autoIgnore instanceof RegExp;e.filter((t=>r?c.autoIgnore.test(t):t.endsWith("_"))).forEach((e=>this.injectIgnore(t.prototype,e)))}const l=Ft(a,(()=>{var t;null===(t=l.OnChange)||void 0===t||t.call(l),p.next(void 0)}),null!==(r=this.getMeta(t,Bt))&&void 0!==r?r:{}),f=null!==(n=c.id)&&void 0!==n?n:`${++Gt.ID}_${t.name}`;this.setMeta(t,Mt,f);const p=new $t(void 0),h=this.GLOBAL_SERVICES_TABLE[f]=this.setMeta(t,Vt,{proxy:l,change$:p});return p.pipe(Tt(10)).subscribe((()=>{var t;null===(t=l.OnUpdate)||void 0===t||t.call(l)})),this.setLate(t,l),(null===(o=null==c?void 0:c.staticInstance)||void 0===o?void 0:o.trim())&&this.setMeta(t,c.staticInstance,l),c.global&&this.GLOBAL_SERVICE$.next(this.gSubject),null===(i=l.OnCreate)||void 0===i||i.call(l),h}destroy(t){var e,r;const n=this.getMeta(t,Nt),o=this.getMeta(t,Vt);if(null===(r=(e=o.proxy).OnDestroy)||void 0===r||r.call(e),n.global){const e=this.getID(t);delete this.GLOBAL_SERVICES_TABLE[e]}o.change$.unsubscribe(),delete t.prototype.constructor[Mt],delete t.prototype.constructor[Vt]}getMeta(t,e){return t.prototype.constructor[e]}setMeta(t,e,r){return t.prototype.constructor[e]=r}isGlobal(t){return this.getMeta(t,Nt).global}getService(t){return this.register(t)}injectIgnore(t,e,r){var n,o;null!==(n=(o=t.constructor)[Bt])&&void 0!==n||(o[Bt]={}),t.constructor[Bt][e]=Object.assign({init:!0,get:!0,set:!0},r)}injectLate(t,e,r){var n,o;null!==(n=(o=t.constructor)[Ut])&&void 0!==n||(o[Ut]={}),t.constructor[Ut][e]=r}}function qt(...t){const e=new Gt;return t.map((t=>{var r;return null===(r=e.getService(t))||void 0===r?void 0:r.proxy}))}function Wt(t){return(e,r,n)=>(new Gt).injectLate(e,r,t)}function zt(t){return(e,r,n)=>(new Gt).injectIgnore(e,r,t)}function Yt(t){t=Object.assign({staticInstance:"ins",global:!0,autoIgnore:!1},t);const e=new Gt;return function(r){e.setMeta(r,Nt,t),(null==t?void 0:t.global)&&e.register(r)}}Gt.ID=0})(),n})()}));