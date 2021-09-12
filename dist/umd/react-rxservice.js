/*! For license information please see react-rxservice.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ReactRxService=e():t.ReactRxService=e()}(this,(function(){return(()=>{"use strict";var t={418:t=>{var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,i){for(var u,c,s=o(t),a=1;a<arguments.length;a++){for(var l in u=Object(arguments[a]))r.call(u,l)&&(s[l]=u[l]);if(e){c=e(u);for(var f=0;f<c.length;f++)n.call(u,c[f])&&(s[c[f]]=u[c[f]])}}return s}},251:(t,e,r)=>{r(418);var n=r(294),o=60103;if(e.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),e.Fragment=i("react.fragment")}var u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};e.jsx=function(t,e,r){var n,i={},a=null,l=null;for(n in void 0!==r&&(a=""+r),void 0!==e.key&&(a=""+e.key),void 0!==e.ref&&(l=e.ref),e)c.call(e,n)&&!s.hasOwnProperty(n)&&(i[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===i[n]&&(i[n]=e[n]);return{$$typeof:o,type:t,key:a,ref:l,props:i,_owner:u.current}}},408:(t,e,r)=>{var n=r(418),o=60103,i=60106;e.Fragment=60107,e.StrictMode=60108,e.Profiler=60114;var u=60109,c=60110,s=60112;e.Suspense=60113;var a=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),i=f("react.portal"),e.Fragment=f("react.fragment"),e.StrictMode=f("react.strict_mode"),e.Profiler=f("react.profiler"),u=f("react.provider"),c=f("react.context"),s=f("react.forward_ref"),e.Suspense=f("react.suspense"),a=f("react.memo"),l=f("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function h(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function y(t,e,r){this.props=t,this.context=e,this.refs=v,this.updater=r||d}function b(){}function _(t,e,r){this.props=t,this.context=e,this.refs=v,this.updater=r||d}y.prototype.isReactComponent={},y.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(h(85));this.updater.enqueueSetState(this,t,e,"setState")},y.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},b.prototype=y.prototype;var w=_.prototype=new b;w.constructor=_,n(w,y.prototype),w.isPureReactComponent=!0;var g={current:null},m=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function E(t,e,r){var n,i={},u=null,c=null;if(null!=e)for(n in void 0!==e.ref&&(c=e.ref),void 0!==e.key&&(u=""+e.key),e)m.call(e,n)&&!S.hasOwnProperty(n)&&(i[n]=e[n]);var s=arguments.length-2;if(1===s)i.children=r;else if(1<s){for(var a=Array(s),l=0;l<s;l++)a[l]=arguments[l+2];i.children=a}if(t&&t.defaultProps)for(n in s=t.defaultProps)void 0===i[n]&&(i[n]=s[n]);return{$$typeof:o,type:t,key:u,ref:c,props:i,_owner:g.current}}function x(t){return"object"==typeof t&&null!==t&&t.$$typeof===o}var I=/\/+/g;function O(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,(function(t){return e[t]}))}(""+t.key):e.toString(36)}function A(t,e,r,n,u){var c=typeof t;"undefined"!==c&&"boolean"!==c||(t=null);var s=!1;if(null===t)s=!0;else switch(c){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case o:case i:s=!0}}if(s)return u=u(s=t),t=""===n?"."+O(s,0):n,Array.isArray(u)?(r="",null!=t&&(r=t.replace(I,"$&/")+"/"),A(u,e,r,"",(function(t){return t}))):null!=u&&(x(u)&&(u=function(t,e){return{$$typeof:o,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(u,r+(!u.key||s&&s.key===u.key?"":(""+u.key).replace(I,"$&/")+"/")+t)),e.push(u)),1;if(s=0,n=""===n?".":n+":",Array.isArray(t))for(var a=0;a<t.length;a++){var l=n+O(c=t[a],a);s+=A(c,e,r,l,u)}else if("function"==typeof(l=function(t){return null===t||"object"!=typeof t?null:"function"==typeof(t=p&&t[p]||t["@@iterator"])?t:null}(t)))for(t=l.call(t),a=0;!(c=t.next()).done;)s+=A(c=c.value,e,r,l=n+O(c,a++),u);else if("object"===c)throw e=""+t,Error(h(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e));return s}function j(t,e,r){if(null==t)return t;var n=[],o=0;return A(t,n,"","",(function(t){return e.call(r,t,o++)})),n}function R(t){if(-1===t._status){var e=t._result;e=e(),t._status=0,t._result=e,e.then((function(e){0===t._status&&(e=e.default,t._status=1,t._result=e)}),(function(e){0===t._status&&(t._status=2,t._result=e)}))}if(1===t._status)return t._result;throw t._result}var P={current:null};function T(){var t=P.current;if(null===t)throw Error(h(321));return t}var C={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:g,IsSomeRendererActing:{current:!1},assign:n};e.Children={map:j,forEach:function(t,e,r){j(t,(function(){e.apply(this,arguments)}),r)},count:function(t){var e=0;return j(t,(function(){e++})),e},toArray:function(t){return j(t,(function(t){return t}))||[]},only:function(t){if(!x(t))throw Error(h(143));return t}},e.Component=y,e.PureComponent=_,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=C,e.cloneElement=function(t,e,r){if(null==t)throw Error(h(267,t));var i=n({},t.props),u=t.key,c=t.ref,s=t._owner;if(null!=e){if(void 0!==e.ref&&(c=e.ref,s=g.current),void 0!==e.key&&(u=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)m.call(e,l)&&!S.hasOwnProperty(l)&&(i[l]=void 0===e[l]&&void 0!==a?a[l]:e[l])}var l=arguments.length-2;if(1===l)i.children=r;else if(1<l){a=Array(l);for(var f=0;f<l;f++)a[f]=arguments[f+2];i.children=a}return{$$typeof:o,type:t.type,key:u,ref:c,props:i,_owner:s}},e.createContext=function(t,e){return void 0===e&&(e=null),(t={$$typeof:c,_calculateChangedBits:e,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:u,_context:t},t.Consumer=t},e.createElement=E,e.createFactory=function(t){var e=E.bind(null,t);return e.type=t,e},e.createRef=function(){return{current:null}},e.forwardRef=function(t){return{$$typeof:s,render:t}},e.isValidElement=x,e.lazy=function(t){return{$$typeof:l,_payload:{_status:-1,_result:t},_init:R}},e.memo=function(t,e){return{$$typeof:a,type:t,compare:void 0===e?null:e}},e.useCallback=function(t,e){return T().useCallback(t,e)},e.useContext=function(t,e){return T().useContext(t,e)},e.useDebugValue=function(){},e.useEffect=function(t,e){return T().useEffect(t,e)},e.useImperativeHandle=function(t,e,r){return T().useImperativeHandle(t,e,r)},e.useLayoutEffect=function(t,e){return T().useLayoutEffect(t,e)},e.useMemo=function(t,e){return T().useMemo(t,e)},e.useReducer=function(t,e,r){return T().useReducer(t,e,r)},e.useRef=function(t){return T().useRef(t)},e.useState=function(t){return T().useState(t)},e.version="17.0.2"},294:(t,e,r)=>{t.exports=r(408)},893:(t,e,r)=>{t.exports=r(251)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{Ignore:()=>qt,Injectable:()=>zt,Late:()=>Bt,RxService:()=>Lt,ServiceManager:()=>Ut,useService:()=>Ft});var t=r(893),e=r(294),o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function u(t,e){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}function c(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function s(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return u}function a(t,e){for(var r=0,n=e.length,o=t.length;r<n;r++,o++)t[o]=e[r];return t}function l(t){return this instanceof l?(this.v=t,this):new l(t)}function f(t,e,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(t,e||[]),i=[];return n={},u("next"),u("throw"),u("return"),n[Symbol.asyncIterator]=function(){return this},n;function u(t){o[t]&&(n[t]=function(e){return new Promise((function(r,n){i.push([t,e,r,n])>1||c(t,e)}))})}function c(t,e){try{(r=o[t](e)).value instanceof l?Promise.resolve(r.value.v).then(s,a):f(i[0][2],r)}catch(t){f(i[0][3],t)}var r}function s(t){c("next",t)}function a(t){c("throw",t)}function f(t,e){t(e),i.shift(),i.length&&c(i[0][0],i[0][1])}}function p(t){return"function"==typeof t}function h(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Object.create,Object.create;var d=h((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function v(t,e){if(t){var r=t.indexOf(e);0<=r&&t.splice(r,1)}}var y=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}var e;return t.prototype.unsubscribe=function(){var t,e,r,n,o;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var u=c(i),l=u.next();!l.done;l=u.next())l.value.remove(this)}catch(e){t={error:e}}finally{try{l&&!l.done&&(e=u.return)&&e.call(u)}finally{if(t)throw t.error}}else i.remove(this);var f=this.initialTeardown;if(p(f))try{f()}catch(t){o=t instanceof d?t.errors:[t]}var h=this._teardowns;if(h){this._teardowns=null;try{for(var v=c(h),y=v.next();!y.done;y=v.next()){var b=y.value;try{w(b)}catch(t){o=null!=o?o:[],t instanceof d?o=a(a([],s(o)),s(t.errors)):o.push(t)}}}catch(t){r={error:t}}finally{try{y&&!y.done&&(n=v.return)&&n.call(v)}finally{if(r)throw r.error}}}if(o)throw new d(o)}},t.prototype.add=function(e){var r;if(e&&e!==this)if(this.closed)w(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._teardowns=null!==(r=this._teardowns)&&void 0!==r?r:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&v(e,t)},t.prototype.remove=function(e){var r=this._teardowns;r&&v(r,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),b=y.EMPTY;function _(t){return t instanceof y||t&&"closed"in t&&p(t.remove)&&p(t.add)&&p(t.unsubscribe)}function w(t){p(t)?t():t.unsubscribe()}var g=null,m=null,S=void 0,E=!1,x=!1,I={setTimeout:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=I.delegate;return((null==r?void 0:r.setTimeout)||setTimeout).apply(void 0,a([],s(t)))},clearTimeout:function(t){var e=I.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function O(t){I.setTimeout((function(){if(!g)throw t;g(t)}))}function A(){}var j=R("C",void 0,void 0);function R(t,e,r){return{kind:t,value:e,error:r}}var P=null;function T(t){if(E){var e=!P;if(e&&(P={errorThrown:!1,error:null}),t(),e){var r=P,n=r.errorThrown,o=r.error;if(P=null,n)throw o}}else t()}function C(t){E&&P&&(P.errorThrown=!0,P.error=t)}var k=function(t){function e(e){var r=t.call(this)||this;return r.isStopped=!1,e?(r.destination=e,_(e)&&e.add(r)):r.destination=V,r}return i(e,t),e.create=function(t,e,r){return new L(t,e,r)},e.prototype.next=function(t){this.isStopped?D(function(t){return R("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?D(R("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?D(j,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(y),L=function(t){function e(e,r,n){var o,i=t.call(this)||this;if(p(e))o=e;else if(e){var u;o=e.next,r=e.error,n=e.complete,i&&x?(u=Object.create(e)).unsubscribe=function(){return i.unsubscribe()}:u=e,o=null==o?void 0:o.bind(u),r=null==r?void 0:r.bind(u),n=null==n?void 0:n.bind(u)}return i.destination={next:o?M(o):A,error:M(null!=r?r:$),complete:n?M(n):A},i}return i(e,t),e}(k);function M(t,e){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{t.apply(void 0,a([],s(e)))}catch(t){E?C(t):O(t)}}}function $(t){throw t}function D(t,e){var r=m;r&&I.setTimeout((function(){return r(t,e)}))}var V={closed:!0,next:A,error:$,complete:A},N="function"==typeof Symbol&&Symbol.observable||"@@observable";function G(t){return t}function U(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return F(t)}function F(t){return 0===t.length?G:1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}}var B=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n,o=this,i=(n=t)&&n instanceof k||function(t){return t&&p(t.next)&&p(t.error)&&p(t.complete)}(n)&&_(n)?t:new L(t,e,r);return T((function(){var t=o,e=t.operator,r=t.source;i.add(e?e.call(i,r):r?o._subscribe(i):o._trySubscribe(i))})),i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=q(e))((function(e,n){var o;o=r.subscribe((function(e){try{t(e)}catch(t){n(t),null==o||o.unsubscribe()}}),n,e)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[N]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return F(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=q(t))((function(t,r){var n;e.subscribe((function(t){return n=t}),(function(t){return r(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function q(t){var e;return null!==(e=null!=t?t:S)&&void 0!==e?e:Promise}var z=h((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),W=function(t){function e(){var e=t.call(this)||this;return e.closed=!1,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return i(e,t),e.prototype.lift=function(t){var e=new Y(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new z},e.prototype.next=function(t){var e=this;T((function(){var r,n;if(e._throwIfClosed(),!e.isStopped){var o=e.observers.slice();try{for(var i=c(o),u=i.next();!u.done;u=i.next())u.value.next(t)}catch(t){r={error:t}}finally{try{u&&!u.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}}))},e.prototype.error=function(t){var e=this;T((function(){if(e._throwIfClosed(),!e.isStopped){e.hasError=e.isStopped=!0,e.thrownError=t;for(var r=e.observers;r.length;)r.shift().error(t)}}))},e.prototype.complete=function(){var t=this;T((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var e=t.observers;e.length;)e.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,r=e.hasError,n=e.isStopped,o=e.observers;return r||n?b:(o.push(t),new y((function(){return v(o,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,r=e.hasError,n=e.thrownError,o=e.isStopped;r?t.error(n):o&&t.complete()},e.prototype.asObservable=function(){var t=new B;return t.source=this,t},e.create=function(t,e){return new Y(t,e)},e}(B),Y=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return i(e,t),e.prototype.next=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===r||r.call(e,t)},e.prototype.error=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===r||r.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,r;return null!==(r=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==r?r:b},e}(W);function J(t){return function(e){if(function(t){return p(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}var K=function(t){function e(e,r,n,o,i){var u=t.call(this,e)||this;return u.onFinalize=i,u._next=r?function(t){try{r(t)}catch(t){e.error(t)}}:t.prototype._next,u._error=o?function(t){try{o(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,u._complete=n?function(){try{n()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,u}return i(e,t),e.prototype.unsubscribe=function(){var e,r=this.closed;t.prototype.unsubscribe.call(this),!r&&(null===(e=this.onFinalize)||void 0===e||e.call(this))},e}(k),X=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function H(t){return p(null==t?void 0:t.then)}function Q(t,e){return new B((function(r){var n=0;return e.schedule((function(){n===t.length?r.complete():(r.next(t[n++]),r.closed||this.schedule())}))}))}var Z="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function tt(t,e){if(!t)throw new Error("Iterable cannot be null");return new B((function(r){var n=new y;return n.add(e.schedule((function(){var o=t[Symbol.asyncIterator]();n.add(e.schedule((function(){var t=this;o.next().then((function(e){e.done?r.complete():(r.next(e.value),t.schedule())}))})))}))),n}))}function et(t){return p(t[N])}function rt(t){return p(null==t?void 0:t[Z])}function nt(t){return Symbol.asyncIterator&&p(null==t?void 0:t[Symbol.asyncIterator])}function ot(t){return new TypeError("You provided "+(null!==t&&"object"==typeof t?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function it(t){return f(this,arguments,(function(){var e,r,n;return u(this,(function(o){switch(o.label){case 0:e=t.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,l(e.read())];case 3:return r=o.sent(),n=r.value,r.done?[4,l(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,l(n)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return e.releaseLock(),[7];case 10:return[2]}}))}))}function ut(t){return p(null==t?void 0:t.getReader)}function ct(t,e){return e?function(t,e){if(null!=t){if(et(t))return function(t,e){return new B((function(r){var n=new y;return n.add(e.schedule((function(){var o=t[N]();n.add(o.subscribe({next:function(t){n.add(e.schedule((function(){return r.next(t)})))},error:function(t){n.add(e.schedule((function(){return r.error(t)})))},complete:function(){n.add(e.schedule((function(){return r.complete()})))}}))}))),n}))}(t,e);if(X(t))return Q(t,e);if(H(t))return function(t,e){return new B((function(r){return e.schedule((function(){return t.then((function(t){r.add(e.schedule((function(){r.next(t),r.add(e.schedule((function(){return r.complete()})))})))}),(function(t){r.add(e.schedule((function(){return r.error(t)})))}))}))}))}(t,e);if(nt(t))return tt(t,e);if(rt(t))return function(t,e){return new B((function(r){var n;return r.add(e.schedule((function(){n=t[Z](),function(t,e,r,n){void 0===n&&(n=0);var o=e.schedule((function(){try{r.call(this)}catch(e){t.error(e)}}),n);t.add(o)}(r,e,(function(){var t=n.next(),e=t.value;t.done?r.complete():(r.next(e),this.schedule())}))}))),function(){return p(null==n?void 0:n.return)&&n.return()}}))}(t,e);if(ut(t))return function(t,e){return tt(it(t),e)}(t,e)}throw ot(t)}(t,e):st(t)}function st(t){if(t instanceof B)return t;if(null!=t){if(et(t))return n=t,new B((function(t){var e=n[N]();if(p(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(X(t))return at(t);if(H(t))return r=t,new B((function(t){r.then((function(e){t.closed||(t.next(e),t.complete())}),(function(e){return t.error(e)})).then(null,O)}));if(nt(t))return lt(t);if(rt(t))return e=t,new B((function(t){var r,n;try{for(var o=c(e),i=o.next();!i.done;i=o.next()){var u=i.value;if(t.next(u),t.closed)return}}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}t.complete()}));if(ut(t))return lt(it(t))}var e,r,n;throw ot(t)}function at(t){return new B((function(e){for(var r=0;r<t.length&&!e.closed;r++)e.next(t[r]);e.complete()}))}function lt(t){return new B((function(e){(function(t,e){var r,n,o,i,s,a,l,f;return s=this,a=void 0,f=function(){var s,a;return u(this,(function(u){switch(u.label){case 0:u.trys.push([0,5,6,11]),r=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,r=t[Symbol.asyncIterator];return r?r.call(t):(t=c(t),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(r){e[r]=t[r]&&function(e){return new Promise((function(n,o){!function(t,e,r,n){Promise.resolve(n).then((function(e){t({value:e,done:r})}),e)}(n,o,(e=t[r](e)).done,e.value)}))}}}(t),u.label=1;case 1:return[4,r.next()];case 2:if((n=u.sent()).done)return[3,4];if(s=n.value,e.next(s),e.closed)return[2];u.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=u.sent(),o={error:a},[3,11];case 6:return u.trys.push([6,,9,10]),n&&!n.done&&(i=r.return)?[4,i.call(r)]:[3,8];case 7:u.sent(),u.label=8;case 8:return[3,10];case 9:if(o)throw o.error;return[7];case 10:return[7];case 11:return e.complete(),[2]}}))},new((l=void 0)||(l=Promise))((function(t,e){function r(t){try{o(f.next(t))}catch(t){e(t)}}function n(t){try{o(f.throw(t))}catch(t){e(t)}}function o(e){var o;e.done?t(e.value):(o=e.value,o instanceof l?o:new l((function(t){t(o)}))).then(r,n)}o((f=f.apply(s,a||[])).next())}))})(t,e).catch((function(t){return e.error(t)}))}))}function ft(t,e){return J((function(r,n){var o=0;r.subscribe(new K(n,(function(r){n.next(t.call(e,r,o++))})))}))}var pt=Array.isArray,ht=Object.getPrototypeOf,dt=Object.prototype,vt=Object.keys;function yt(t){if(1===t.length){var e=t[0];if(pt(e))return{args:e,keys:null};if((n=e)&&"object"==typeof n&&ht(n)===dt){var r=vt(e);return{args:r.map((function(t){return e[t]})),keys:r}}}var n;return{args:t,keys:null}}var bt=Array.isArray;function _t(t){return ft((function(e){return function(t,e){return bt(e)?t.apply(void 0,a([],s(e))):t(e)}(t,e)}))}function wt(t){return t[t.length-1]}function gt(t){return p(wt(t))?t.pop():void 0}function mt(t){return(e=wt(t))&&p(e.schedule)?t.pop():void 0;var e}function St(t,e){return t.reduce((function(t,r,n){return t[r]=e[n],t}),{})}function Et(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=mt(t),n=gt(t),o=yt(t),i=o.args,u=o.keys;if(0===i.length)return ct([],r);var c=new B(xt(i,r,u?function(t){return St(u,t)}:G));return n?c.pipe(_t(n)):c}function xt(t,e,r){return void 0===r&&(r=G),function(n){It(e,(function(){for(var o=t.length,i=new Array(o),u=o,c=o,s=function(o){It(e,(function(){var s=ct(t[o],e),a=!1;s.subscribe(new K(n,(function(t){i[o]=t,a||(a=!0,c--),c||n.next(r(i.slice()))}),(function(){--u||n.complete()})))}),n)},a=0;a<o;a++)s(a)}),n)}}function It(t,e,r){t?r.add(t.schedule(e)):e()}function Ot(t,e){return e?Q(t,e):at(t)}var At=function(t){function e(e,r){return t.call(this)||this}return i(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(y),jt={setInterval:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=jt.delegate;return((null==r?void 0:r.setInterval)||setInterval).apply(void 0,a([],s(t)))},clearInterval:function(t){var e=jt.delegate;return((null==e?void 0:e.clearInterval)||clearInterval)(t)},delegate:void 0},Rt=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return i(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),jt.setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!=r&&this.delay===r&&!1===this.pending)return e;jt.clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r,n=!1;try{this.work(t)}catch(t){n=!0,r=!!t&&t||new Error(t)}if(n)return this.unsubscribe(),r},e.prototype.unsubscribe=function(){if(!this.closed){var e=this.id,r=this.scheduler,n=r.actions;this.work=this.state=this.scheduler=null,this.pending=!1,v(n,this),null!=e&&(this.id=this.recycleAsyncId(r,e,null)),this.delay=null,t.prototype.unsubscribe.call(this)}},e}(At),Pt={now:function(){return(Pt.delegate||Date).now()},delegate:void 0},Tt=function(){function t(e,r){void 0===r&&(r=t.now),this.schedulerActionCtor=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.schedulerActionCtor(this,t).schedule(r,e)},t.now=Pt.now,t}(),Ct=new(function(t){function e(e,r){void 0===r&&(r=Tt.now);var n=t.call(this,e,r)||this;return n.actions=[],n._active=!1,n._scheduled=void 0,n}return i(e,t),e.prototype.flush=function(t){var e=this.actions;if(this._active)e.push(t);else{var r;this._active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this._active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(Tt))(Rt);function kt(t,e){return void 0===e&&(e=Ct),J((function(r,n){var o=null,i=null,u=null,c=function(){if(o){o.unsubscribe(),o=null;var t=i;i=null,n.next(t)}};function s(){var r=u+t,i=e.now();if(i<r)return o=this.schedule(void 0,r-i),void n.add(o);c()}r.subscribe(new K(n,(function(r){i=r,u=e.now(),o||(o=e.schedule(s,t),n.add(o))}),(function(){c(),n.complete()}),void 0,(function(){i=o=null})))}))}const Lt=({children:r,builder:n,services:o=[],global:i=!0})=>{const[u,c]=(0,e.useState)(0);if((0,e.useEffect)((()=>{const t=new Ut,e=new W;let r;const n=[...new Set(o.map((e=>t.getService(e).change$)))],u=U((h=p(a=()=>null==r?void 0:r.unsubscribe())?{next:a,error:l,complete:f}:a)?J((function(t,e){var r;null===(r=h.subscribe)||void 0===r||r.call(h);var n=!0;t.subscribe(new K(e,(function(t){var r;null===(r=h.next)||void 0===r||r.call(h,t),e.next(t)}),(function(){var t;n=!1,null===(t=h.complete)||void 0===t||t.call(h),e.complete()}),(function(t){var r;n=!1,null===(r=h.error)||void 0===r||r.call(h,t),e.error(t)}),(function(){var t,e;n&&(null===(t=h.unsubscribe)||void 0===t||t.call(h)),null===(e=h.finalize)||void 0===e||e.call(h)})))})):G,(s=e,J((function(t,e){st(s).subscribe(new K(e,(function(){return e.complete()}),A)),!e.closed&&t.subscribe(e)}))));var s,a,l,f,h;return(i?t.GLOBAL_SERVICE$.pipe(J((function(t,e){var r=new Set;t.subscribe(new K(e,(function(t){var n=t;r.has(n)||(r.add(n),e.next(t))})))})),ft((t=>Et(t.concat(n)))),u):function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=mt(t);return r?Q(t,r):Ot(t)}(n).pipe(ft((t=>Et(t))),u)).subscribe((t=>{var e,n;r=t.pipe(U((e=1,n=function(t,r){return e<=r},J((function(t,e){var r=0;t.subscribe(new K(e,(function(t){return n.call(void 0,t,r++)&&e.next(t)})))}))),(void 0,ft((function(){}))),kt(10))).subscribe((()=>c((t=>t+1))))})),()=>{e.next(!0),e.unsubscribe(),null==r||r.unsubscribe(),[...new Set(o)].filter((e=>!t.isGlobal(e))).forEach((e=>t.destroy(e)))}}),[]),!n&&!r)throw"RxService need builder prop or children!";return(0,t.jsx)(t.Fragment,{children:(null!=n?n:r)(u)},void 0)};var Mt=function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return i(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){var t=this,e=t.hasError,r=t.thrownError,n=t._value;if(e)throw r;return this._throwIfClosed(),n},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(W);const $t="__AJANUW_RXSERVICE_IGNORES__",Dt="__AJANUW_RXSERVICE_LATE__",Vt="__AJANUW_RXSERVICE_CONFIG__";function Nt(t,e){if(!(e in t))return;return Object.getOwnPropertyDescriptor(t,e)||Nt(Object.getPrototypeOf(t),e)}function Gt(t,e,r=Object.create(null)){if("object"!=typeof(n=t)||null===n)return t;var n;if(Ut.isService(t))return t;for(const n in t){if(n in r&&r[n].init)continue;const o=t[n];t[n]=Gt(o,e)}const o=new Proxy(t,{get(t,e){if(e in r&&r[e].get)return t[e];const n=Nt(t,e);return(null==n?void 0:n.value)&&"function"==typeof n.value?n.value.bind(o):(null==n?void 0:n.get)?n.get.call(o):t[e]},set(t,n,i){if(n in r&&r[n].set)return t[n]=i,!0;const u=Nt(t,n);return i=Gt(i,e),(null==u?void 0:u.set)?u.set.call(o,i):t[n]=i,null==e||e(),!0}});return o}class Ut{constructor(){return Ut.ins?Ut.ins:(this.gServiceList=[],this.GLOBAL_SERVICE$=new Mt([]),this.SERVICE_LATE_TABLE={},this.TARGET_ID_MAP=new WeakMap,this.SERVICE_POND={},Ut.ins=this)}static isService(t){return!!t&&Object.getPrototypeOf(t).constructor[Vt]}setLate(t,e){var r,n;const o=this.TARGET_ID_MAP.get(t);o in this.SERVICE_LATE_TABLE&&(this.SERVICE_LATE_TABLE[o].forEach((t=>t.proxy[t.prop]=e)),delete this.SERVICE_LATE_TABLE[o]);const i=this.getMeta(t,Dt);if(i)for(const t in i){const o=i[t];o in this.SERVICE_POND?e[t]=this.SERVICE_POND[o].proxy:(null!==(r=(n=this.SERVICE_LATE_TABLE)[o])&&void 0!==r||(n[o]=[]),this.SERVICE_LATE_TABLE[o].push({prop:t,proxy:e}))}}getArgs(t){var e;return"getMetadata"in Reflect?(null!==(e=Reflect.getMetadata("design:paramtypes",t))&&void 0!==e?e:[]).map((t=>{var e;return null===(e=this.getService(t))||void 0===e?void 0:e.proxy})):[]}setAutoIgnore(t,e){const r=this.getMeta(t,Vt);if(r.autoIgnore){const n=Object.keys(e),o=r.autoIgnore instanceof RegExp;n.filter((t=>o?r.autoIgnore.test(t):t.endsWith("_"))).forEach((e=>this.injectIgnore(t.prototype,e)))}}register(t){var e,r,n,o,i,u;let c;this.TARGET_ID_MAP.has(t)&&(c=this.TARGET_ID_MAP.get(t));const s=this.SERVICE_POND[c];if(s&&!s.isDestory)return s;const a=s&&s.isDestory;if(a&&(s.isDestory=!1),a&&s&&s.isKeep)return null===(r=(e=this.SERVICE_POND[c].proxy).OnLink)||void 0===r||r.call(e),s;const l=this.getMeta(t,Vt);if(!a){const e=new Mt(void 0);this.SERVICE_POND[l.id]={isDestory:!1,isKeep:!1,change$:e},this.TARGET_ID_MAP.set(t,l.id),e.pipe(kt(10)).subscribe((()=>{var t,e;null===(e=(t=f.proxy).OnUpdate)||void 0===e||e.call(t)}))}const f=this.SERVICE_POND[l.id];f.instance=Reflect.construct(t,this.getArgs(t)),a||this.setAutoIgnore(t,f.instance);const p=null!==(n=this.getMeta(t,$t))&&void 0!==n?n:{};return this.setMeta(t,Vt,void 0),f.proxy=Gt(f.instance,(()=>{var t;f.isDestory||null===(t=f.change$)||void 0===t||t.next(void 0)}),p),this.setMeta(t,Vt,l),this.setLate(t,f.proxy),(null===(o=null==l?void 0:l.staticInstance)||void 0===o?void 0:o.trim())&&(this.setMeta(t,l.staticInstance,f.proxy),this.setMeta(t,"_"+l.staticInstance,f.instance)),l.global&&(this.gServiceList=[...new Set([...this.gServiceList,f.change$])],this.GLOBAL_SERVICE$.next(this.gServiceList)),null===(u=(i=f.proxy).OnCreate)||void 0===u||u.call(i),f}destroy(t){var e,r,n;if(!this.TARGET_ID_MAP.has(t))throw"destroy error: not find id!";const o=this.TARGET_ID_MAP.get(t),i=this.SERVICE_POND[o];i.isKeep=null!==(n=null===(r=null===(e=i.proxy)||void 0===e?void 0:e.OnDestroy)||void 0===r?void 0:r.call(e))&&void 0!==n&&n,i.isDestory=!0}getMeta(t,e){return t.prototype.constructor[e]}setMeta(t,e,r){return t.prototype.constructor[e]=r}isGlobal(t){return this.getMeta(t,Vt).global}getService(t){return this.register(t)}injectIgnore(t,e,r){var n,o;null!==(n=(o=t.constructor)[$t])&&void 0!==n||(o[$t]={}),t.constructor[$t][e]=Object.assign({init:!0,get:!0,set:!0},r)}injectLate(t,e,r){var n,o;null!==(n=(o=t.constructor)[Dt])&&void 0!==n||(o[Dt]={}),t.constructor[Dt][e]=r}}function Ft(...t){const e=new Ut;return t.map((t=>{var r;return null===(r=e.getService(t))||void 0===r?void 0:r.proxy}))}function Bt(t){return(e,r,n)=>(new Ut).injectLate(e,r,t)}function qt(t){return(e,r,n)=>(new Ut).injectIgnore(e,r,t)}function zt(t){const e=new Ut;return function(r){var n;e.TARGET_ID_MAP.has(r)||(t=Object.assign({id:null!==(n=null==t?void 0:t.id)&&void 0!==n?n:`${++Ut.ID}_${r.name}`,staticInstance:"ins",global:!0,autoIgnore:!1},t),e.setMeta(r,Vt,t),(null==t?void 0:t.global)&&e.register(r))}}Ut.ID=0})(),n})()}));