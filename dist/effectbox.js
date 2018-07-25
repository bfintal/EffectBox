// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Y/Oq":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mapOptions = exports.mapOptions = function mapOptions(el, defaultOptions) {
    var dataOptions = Object.keys(defaultOptions).reduce(function (dataOptions, optionName) {
        var attr = 'data-' + camelCaseToDash(optionName);
        var value = el.getAttribute(attr);
        if (value) {
            dataOptions[optionName] = value;
        }
        return dataOptions;
    }, {});
    return Object.assign(defaultOptions, dataOptions);
};

var camelCaseToDash = exports.camelCaseToDash = function camelCaseToDash(s) {
    return s.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};

var formSettings = exports.formSettings = function formSettings(el, defaultOptions, options) {
    return Object.assign(mapOptions(el, defaults), options);
};
},{}],"NDqt":[function(require,module,exports) {
var define;
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],"bpNf":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollHandler = exports.isInView = exports.elemsToWatch = undefined;

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elemsToWatch = exports.elemsToWatch = [];

var start = function start(el) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    stop(el);
    var options = Object.assign({ callback: function callback() {} }, opts);

    elemsToWatch.push({ el: el, options: options });
    if (isInView(el, options)) {
        options.callback();
        stop(el);
    }
};

var stop = function stop(el) {
    elemsToWatch.forEach(function (_ref, i) {
        var existingEl = _ref.el;

        if (existingEl === el) {
            elemsToWatch.splice(i, 1);
        }
    });
};

var isInView = exports.isInView = function isInView(el, options) {
    var scroll = window.scrollY || window.pageYOffset;
    var boundsTop = el.getBoundingClientRect().top + scroll;

    var viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight
    };

    var bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight
    };

    return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
};

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

var scrollHandler = exports.scrollHandler = function scrollHandler() {
    elemsToWatch.forEach(function (_ref2) {
        var el = _ref2.el,
            options = _ref2.options;

        if (isInView(el, options)) {
            options.callback();
            stop(el);
        }
    });
};

exports.default = {
    start: start,
    stop: stop
};


(0, _domready2.default)(function () {
    var handler = function handler() {
        return raf(scrollHandler);
    };
    handler();
    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
});
},{"domready":"NDqt"}],"vY/J":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyNumFormat = exports.detectNumFormat = exports.generateNumbersTo = exports.isCountable = exports.splitNumbers = undefined;

var _util = require('../util');

var _scrollReveal = require('../scroll-reveal');

var _scrollReveal2 = _interopRequireDefault(_scrollReveal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function start(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var defaults = {
        lang: '',
        duration: 1000,
        delay: 16
    };

    var settings = (0, _util.formSettings)(el, defaults, options);

    stop(el);

    // If no number, don't do anything.
    if (!/[0-9]/.test(el.innerHTML)) {
        return;
    }

    // Remember the element.
    el._countUpOrigInnerHTML = el.innerHTML;
    var hasLang = !!el.getAttribute('data-lang') || !!options.lang;

    // Number of times the number will change.
    var divisions = settings.duration / settings.delay;

    // Split numbers and html tags.
    var splitValues = splitNumbers(el.innerHTML);

    // Contains all numbers to be displayed.
    var nums = [];

    // Set blank strings to ready the split values.
    for (var k = 0; k < divisions; k++) {
        nums.push('');
    }

    // Loop through all numbers and html tags.
    for (var i = 0; i < splitValues.length; i++) {

        var num = splitValues[i];

        if (isCountable(num)) {
            (function () {

                var format = detectNumFormat(num);
                num = num.replace(/,/g, '');

                generateNumbersTo(num, divisions).forEach(function (num, i) {
                    nums[i] += applyNumFormat(num, format, settings.lang);
                });
            })();
        } else {

            // Insert all non-numbers in the same place.
            for (var _k = 0; _k < divisions; _k++) {
                nums[_k] += num;
            }
        }
    }

    el.innerHTML = nums[0];
    el.style.visibility = 'visible';

    var callback = function callback() {

        // Function for displaying output with the set time and delay.
        var output = function output() {
            el.innerHTML = nums.shift();
            if (nums.length) {
                clearTimeout(el.countUpTimeout);
                el.countUpTimeout = setTimeout(output, settings.delay);
            } else {
                el._countUpOrigInnerHTML = undefined;
            }
        };
        el.countUpTimeout = setTimeout(output, settings.delay);
    };

    _scrollReveal2.default.start(el, {
        callback: callback
    });
};

var stop = function stop(el) {
    clearTimeout(el.countUpTimeout);
    if (el._countUpOrigInnerHTML) {
        el.innerHTML = el._countUpOrigInnerHTML;
        el._countUpOrigInnerHTML = undefined;
    }
    el.style.visibility = '';
};

exports.default = {
    start: start,
    stop: stop

    // Given a string that can have HTML, split it to separate the numbers.
};
var splitNumbers = exports.splitNumbers = function splitNumbers(text) {
    return text.split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/);
};

// Countable string
var isCountable = exports.isCountable = function isCountable(num) {
    return (/([0-9.][,.0-9]*[0-9]*)/.test(num) && !/<[^>]+>/.test(num)
    );
};

// Creates an array of numbers from zero to num
var generateNumbersTo = exports.generateNumbersTo = function generateNumbersTo(finalNumber, len) {
    if (len < 1) {
        return [finalNumber];
    }
    var increment = finalNumber / len;
    var numbers = Array(len - 1).fill(0).map(function (v, i) {
        return (i + 1) * increment;
    });
    numbers.push(finalNumber); // Ensure that the last number is the original one.
    return numbers;
};

var detectNumFormat = exports.detectNumFormat = function detectNumFormat(strNum) {

    var decimalPlaces = 0;
    if (/^[0-9]+\.[0-9]+$/.test(strNum)) {
        decimalPlaces = (strNum.split('.')[1] || []).length;
    }

    return {
        hasComma: /[0-9]+,[0-9]+/.test(strNum),
        decimalPlaces: decimalPlaces
    };
};

var applyNumFormat = exports.applyNumFormat = function applyNumFormat(num, format) {
    var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var hasComma = format.hasComma,
        decimalPlaces = format.decimalPlaces;


    if (decimalPlaces || lang || hasComma) {
        return Intl.NumberFormat(lang ? lang : undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }).format(num);
    }

    return parseInt(num, 10);
};
},{"../util":"Y/Oq","../scroll-reveal":"bpNf"}],"Focm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollReveal = exports.countUp = undefined;

var _countUp = require('./count-up');

var _countUp2 = _interopRequireDefault(_countUp);

var _scrollReveal = require('./scroll-reveal');

var _scrollReveal2 = _interopRequireDefault(_scrollReveal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.countUp = _countUp2.default;
exports.scrollReveal = _scrollReveal2.default;
},{"./count-up":"vY/J","./scroll-reveal":"bpNf"}]},{},["Focm"], "effectBox")
//# sourceMappingURL=/effectbox.map