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
    return Object.assign(mapOptions(el, defaultOptions), options);
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
},{"../util":"Y/Oq","../scroll-reveal":"bpNf"}],"KGZb":[function(require,module,exports) {
var global = arguments[3];
// BigPicture.js | license MIT | henrygd.me/bigpicture
(function() {
	var // assign window object to variable
		global = window,
		// trigger element used to open popup
		el,
		// set to true after first interaction
		initialized,
		// container element holding html needed for script
		container,
		// currently active display element (image, video, youtube / vimeo iframe container)
		displayElement,
		// popup image element
		displayImage,
		// popup video element
		displayVideo,
		// container element to hold youtube / vimeo iframe
		iframeContainer,
		// iframe to hold youtube / vimeo player
		iframeSiteVid,
		// store requested image source
		imgSrc,
		// button that closes the container
		closeButton,
		// youtube / vimeo video id
		siteVidID,
		// keeps track of loading icon display state
		isLoading,
		// timeout to check video status while loading
		checkVidTimeout,
		// loading icon element
		loadingIcon,
		// caption element
		caption,
		// caption content element
		captionText,
		// store caption content
		captionContent,
		// hide caption button element
		captionHideButton,
		// open state for container element
		isOpen,
		// gallery open state
		galleryOpen,
		// used during close animation to avoid triggering timeout twice
		isClosing,
		// array of prev viewed image urls to check if cached before showing loading icon
		imgCache = [],
		// store whether image requested is remote or local
		remoteImage,
		// store animation opening callbacks
		animationStart,
		animationEnd,
		// gallery left / right icons
		rightArrowBtn,
		leftArrowBtn,
		// position of gallery
		galleryPosition,
		// hold active gallery els / image src
		galleryEls,
		// counter element
		galleryCounter,
		// store images in gallery that are being loaded
		preloadedImages = {},
		// whether device supports touch events
		supportsTouch,
		// set to true if user wants to hide loading icon
		noLoader,
		// Save bytes in the minified version
		doc = document,
		appendEl = 'appendChild',
		createEl = 'createElement',
		removeEl = 'removeChild',
		htmlInner = 'innerHTML',
		pointerEventsAuto = 'pointer-events:auto',
		cHeight = 'clientHeight',
		cWidth = 'clientWidth',
		listenFor = 'addEventListener',
		timeout = global.setTimeout,
		clearTimeout = global.clearTimeout

	module.exports = function(options) {
		// initialize called on initial open to create elements / style / event handlers
		initialized || initialize()

		// clear currently loading stuff
		if (isLoading) {
			clearTimeout(checkVidTimeout)
			removeContainer()
		}

		// store video id if youtube / vimeo video is requested
		siteVidID = options.ytSrc || options.vimeoSrc

		// store optional callbacks
		animationStart = options.animationStart
		animationEnd = options.animationEnd

		// store whether user requests to hide loading icon
		noLoader = options.noLoader

		// set trigger element
		el = options.el

		// wipe existing remoteImage state
		remoteImage = false

		// set caption if provided
		captionContent = el.getAttribute('caption')

		if (options.gallery) {
			makeGallery(options.gallery)
		} else if (siteVidID) {
			// if vimeo or youtube video
			toggleLoadingIcon(true)
			displayElement = iframeContainer
			createIframe(!!options.ytSrc)
		} else if (options.imgSrc) {
			// if remote image
			remoteImage = true
			imgSrc = options.imgSrc
			!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true)
			displayElement = displayImage
			displayElement.src = imgSrc
		} else if (options.vidSrc) {
			// if direct video link
			toggleLoadingIcon(true)
			makeVidSrc(options.vidSrc)
			checkVid()
		} else {
			// local image / background image already loaded on page
			displayElement = displayImage
			// get img source or element background image
			displayElement.src =
				el.tagName === 'IMG'
					? el.src
					: global
						.getComputedStyle(el)
						.backgroundImage.replace(/^url|[(|)|'|"]/g, '')
		}

		// add container to page
		container[appendEl](displayElement)
		doc.body[appendEl](container)
	}

	// create all needed methods / store dom elements on first use
	function initialize() {
		var startX
		// return close button elements
		function createCloseButton() {
			var el = doc[createEl]('button')
			el.className = 'bp-x'
			el[htmlInner] = '&#215;'
			return el
		}

		function createArrowSymbol(direction, style) {
			var el = doc[createEl]('button')
			el.className = 'bp-lr'
			el[htmlInner] =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" height="75" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>'
			changeCSS(el, style)
			el.onclick = function(e) {
				e.stopPropagation()
				updateGallery(direction)
			}
			return el
		}

		// add style - if you want to tweak, run through beautifier
		var style = doc[createEl]('STYLE')
		style[htmlInner] =
			'.bp-lr,.bp-x:active{outline:0}#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0;backface-visibility:hidden}#bp_container>*,#bp_loader,.bp-x{position:absolute;right:0;z-index:10}#bp_container{top:0;z-index:9999;background:rgba(0,0,0,.7);opacity:0;pointer-events:none;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:-webkit-flex;display:flex;margin:0;cursor:wait;z-index:9}#bp_count,.bp-lr,.bp-x{cursor:pointer;color:#fff}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto}#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{width:171vh}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_count,.bp-x{top:0;opacity:.8;font-size:3em;padding:0 .3em;background:0 0;border:0;text-shadow:0 0 2px rgba(0,0,0,.6)}#bp_caption .bp-x{left:2%;top:auto;right:auto;bottom:100%;padding:0 .6em;background:#d74040;border-radius:2px 2px 0 0;font-size:2.3em;text-shadow:none}.bp-x:focus,.bp-x:hover{opacity:1}@media (max-aspect-ratio:9/5){#bp_sv{height:53vw}}.bp-lr{top:50%;top:calc(50% - 138px);padding:99px 1vw;background:0 0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@media (max-width:600px){.bp-lr{font-size:15vw}}#bp_count{left:0;display:table;padding:14px;color:#fff;font-size:22px;opacity:.7;cursor:default;right:auto}'
		doc.head[appendEl](style)

		// create container element
		container = doc[createEl]('DIV')
		container.id = 'bp_container'
		container.onclick = close
		closeButton = createCloseButton()
		container[appendEl](closeButton)
		// gallery swipe listeners
		if ('ontouchstart' in global) {
			supportsTouch = true
			container.ontouchstart = function(e) {
				startX = e.changedTouches[0].pageX
			}
			container.ontouchmove = function(e) {
				e.preventDefault()
			}
			container.ontouchend = function(e) {
				if (!galleryOpen) {
					return
				}
				var touchobj = e.changedTouches[0]
				var distX = touchobj.pageX - startX
				// swipe right
				distX < -30 && updateGallery(1)
				// swipe left
				distX > 30 && updateGallery(-1)
			}
		}

		// create display image element
		displayImage = doc[createEl]('IMG')

		// create display video element
		displayVideo = doc[createEl]('VIDEO')
		displayVideo.id = 'bp_vid'
		displayVideo.autoplay = true
		displayVideo.setAttribute('playsinline', true)
		displayVideo.controls = true
		displayVideo.loop = true

		// create gallery counter
		galleryCounter = doc[createEl]('span')
		galleryCounter.id = 'bp_count'

		// create caption elements
		caption = doc[createEl]('DIV')
		caption.id = 'bp_caption'
		captionHideButton = createCloseButton()
		captionHideButton.onclick = toggleCaption.bind(null, false)
		caption[appendEl](captionHideButton)
		captionText = doc[createEl]('SPAN')
		caption[appendEl](captionText)
		container[appendEl](caption)

		// left / right arrow icons
		rightArrowBtn = createArrowSymbol(1, webkitify('transform:', 'scalex(-1);'))
		leftArrowBtn = createArrowSymbol(-1, 'left:0;right:auto')

		// create loading icon element
		loadingIcon = doc[createEl]('DIV')
		loadingIcon.id = 'bp_loader'
		loadingIcon[htmlInner] =
			'<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"><animateTransform attributeName="transform" dur="1s" from="0 16 16" repeatCount="indefinite" to="360 16 16" type="rotate"/></path></svg>'

		// create youtube / vimeo container
		iframeContainer = doc[createEl]('DIV')
		iframeContainer.id = 'bp_sv'

		// create iframe to hold youtube / vimeo player
		iframeSiteVid = doc[createEl]('IFRAME')
		iframeSiteVid.allowFullscreen = true
		iframeSiteVid.onload = open
		changeCSS(iframeSiteVid, 'border:0px;height:100%;width:100%')
		iframeContainer[appendEl](iframeSiteVid)

		// display image bindings for image load and error
		displayImage.onload = open
		displayImage.onerror = open.bind(null, 'image')

		// adjust loader position on window resize
		global[listenFor]('resize', function() {
			galleryOpen || (isLoading && toggleLoadingIcon(true))
		})

		// close container on escape key press and arrow buttons for gallery
		doc[listenFor]('keyup', function(e) {
			var key = e.keyCode
			key === 27 && isOpen && close(container)
			if (galleryOpen) {
				key === 39 && updateGallery(1)
				key === 37 && updateGallery(-1)
				key === 38 && updateGallery(10)
				key === 40 && updateGallery(-10)
			}
		})
		// prevent scrolling with arrow keys if gallery open
		doc[listenFor]('keydown', function(e) {
			var usedKeys = [37, 38, 39, 40]
			if (galleryOpen && ~usedKeys.indexOf(e.keyCode)) {
				e.preventDefault()
			}
		})

		// trap focus within conainer while open
		doc[listenFor](
			'focus',
			function(e) {
				if (isOpen && !container.contains(e.target)) {
					e.stopPropagation()
					closeButton.focus()
				}
			},
			true
		)

		// all done
		initialized = true
	}

	// return transform style to make full size display el match trigger el size
	function getRect() {
		var rect = el.getBoundingClientRect()
		var leftOffset = rect.left - (container[cWidth] - rect.width) / 2
		var centerTop = rect.top - (container[cHeight] - rect.height) / 2
		var scaleWidth = el[cWidth] / displayElement[cWidth]
		var scaleHeight = el[cHeight] / displayElement[cHeight]
		return webkitify(
			'transform:',
			'translate3D(' +
				leftOffset +
				'px, ' +
				centerTop +
				'px, 0) scale3D(' +
				scaleWidth +
				', ' +
				scaleHeight +
				', 0);'
		)
	}

	function makeVidSrc(source) {
		if (Array.isArray(source)) {
			displayElement = displayVideo.cloneNode()
			source.forEach(function(src) {
				var source = doc[createEl]('SOURCE')
				source.src = src
				source.type = 'video/' + src.match(/.(\w+)$/)[1]
				displayElement[appendEl](source)
			})
		} else {
			displayElement = displayVideo
			displayElement.src = source
		}
	}

	function makeGallery(gallery) {
		if (Array.isArray(gallery)) {
			// is array of images
			galleryPosition = 0
			galleryEls = gallery
			captionContent = gallery[0].caption
		} else {
			// is element selector or nodelist
			galleryEls = [].slice.call(typeof gallery === 'string' ? doc.querySelectorAll(gallery + ' [data-bp]') : gallery)
			// find initial gallery position
			var elIndex = galleryEls.indexOf(el)
			galleryPosition = elIndex !== -1 ? elIndex : 0
			// make gallery object w/ els / src / caption
			galleryEls = galleryEls.map(function(el) {
				return {
					el: el,
					src: el.getAttribute('data-bp'),
					caption: el.getAttribute('caption')
				}
			})
		}
		// show loading icon if needed
		remoteImage = true
		// set initial src to imgSrc so it will be cached in open func
		imgSrc = galleryEls[galleryPosition].src
		!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true)
		if (galleryEls.length > 1) {
			// if length is greater than one, add gallery stuff
			container[appendEl](galleryCounter)
			galleryCounter[htmlInner] = galleryPosition + 1 + '/' + galleryEls.length
			if (!supportsTouch) {
				// add arrows if device doesn't support touch
				container[appendEl](rightArrowBtn)
				container[appendEl](leftArrowBtn)
			}
		} else {
			// gallery is one, just show without clutter
			galleryEls = false
		}
		displayElement = displayImage
		// set initial image src
		displayElement.src = imgSrc
	}

	function updateGallery(movement) {
		var galleryLength = galleryEls.length - 1
		// normalize position
		galleryPosition = Math.max(
			0,
			Math.min(galleryPosition + movement, galleryLength)
		)

		// load images before and after for quicker scrolling through pictures
		;[galleryPosition - 1, galleryPosition, galleryPosition + 1].forEach(
			function(position) {
				// normalize position
				position = Math.max(0, Math.min(position, galleryLength))
				// cancel if image has already been preloaded
				if (!!preloadedImages[position]) return
				var src = galleryEls[position].src
				// create image for preloadedImages
				var img = doc[createEl]('IMG')
				img[listenFor]('load', addToImgCache.bind(null, src))
				img.src = src
				preloadedImages[position] = img
			}
		)
		// if image is loaded, show it
		if (preloadedImages[galleryPosition].complete) {
			return changeGalleryImage()
		}
		// if not, show loading icon and change when loaded
		isLoading = true
		changeCSS(loadingIcon, 'opacity:.4;')
		container[appendEl](loadingIcon)
		preloadedImages[galleryPosition].onload = function() {
			galleryOpen && changeGalleryImage()
		}
		// if error, store error object in el array
		preloadedImages[galleryPosition].onerror = function() {
			galleryEls[galleryPosition] = {
				error: 'Error loading image'
			}
			galleryOpen && changeGalleryImage()
		}
	}

	function changeGalleryImage() {
		if (isLoading) {
			container[removeEl](loadingIcon)
			isLoading = false
		}
		var activeEl = galleryEls[galleryPosition]
		if (activeEl.error) {
			// show alert if error
			alert(activeEl.error)
		} else {
			var newSrc = activeEl.src
			displayImage.src = newSrc
			if (activeEl.el) {
				el = activeEl.el
			}
		}
		galleryCounter[htmlInner] = galleryPosition + 1 + '/' + galleryEls.length
	}

	// create youtube / vimeo video iframe
	function createIframe(isYoutube) {
		// create appropriate url for youtube or vimeo
		var url = isYoutube
			? 'www.youtube.com/embed/' +
			  siteVidID +
			  '?html5=1&rel=0&showinfo=0&playsinline=1&'
			: 'player.vimeo.com/video/' + siteVidID + '?'

		// set iframe src to url
		iframeSiteVid.src = 'https://' + url + 'autoplay=1'
	}

	// timeout to check video status while loading
	// onloadeddata event doesn't seem to fire in less up-to-date browsers like midori & epiphany
	function checkVid() {
		if (displayElement.readyState === 4) open()
		else if (displayVideo.error) open('video')
		else checkVidTimeout = timeout(checkVid, 35)
	}

	// hide / show loading icon
	function toggleLoadingIcon(bool) {
		// don't show loading icon if noLoader is specified
		if (noLoader) return
		// bool is true if we want to show icon, false if we want to remove
		// change style to match trigger element dimensions if we want to show
		bool &&
			changeCSS(
				loadingIcon,
				'top:' +
					el.offsetTop +
					'px;left:' +
					el.offsetLeft +
					'px;height:' +
					el[cHeight] +
					'px;width:' +
					el[cWidth] +
					'px'
			)
		// add or remove loader from DOM
		el.parentElement[bool ? appendEl : removeEl](loadingIcon)
		isLoading = bool
	}

	// hide & show caption
	function toggleCaption(captionContent) {
		if (captionContent) {
			captionText[htmlInner] = captionContent
		}
		changeCSS(
			caption,
			'opacity:' + (captionContent ? '1;' + pointerEventsAuto : '0')
		)
	}

	function addToImgCache(url) {
		!~imgCache.indexOf(url) && imgCache.push(url)
	}

	// animate open of image / video; display caption if needed
	function open(err) {
		// hide loading spinner
		isLoading && toggleLoadingIcon()

		// execute animationStart callback
		animationStart && animationStart()

		// check if we have an error string instead of normal event
		if (typeof err === 'string') {
			removeContainer()
			return alert('Error: The requested ' + err + ' could not be loaded.')
		}

		// if remote image is loaded, add url to imgCache array
		remoteImage && addToImgCache(imgSrc)

		if (galleryOpen) {
			return toggleCaption(galleryEls[galleryPosition].caption)
			// return
		}

		// transform displayEl to match trigger el
		changeCSS(displayElement, getRect())

		// fade in container
		changeCSS(container, 'opacity:1;' + pointerEventsAuto)

		// set animationEnd callback to run after animation ends (cleared if container closed)
		animationEnd = timeout(animationEnd, 410)

		isOpen = true

		galleryOpen = !!galleryEls

		// enlarge displayEl, fade in caption if hasCaption
		timeout(function() {
			changeCSS(
				displayElement,
				webkitify('transition:', 'transform .35s;') +
					webkitify('transform:', 'none;')
			)
			captionContent && timeout(toggleCaption, 250, captionContent)
		}, 60)
	}

	// close active display element
	function close(e) {
		var target = e.target
		var clickEls = [
			caption,
			captionHideButton,
			displayVideo,
			captionText,
			leftArrowBtn,
			rightArrowBtn,
			loadingIcon
		]

		// blur to hide close button focus style
		target && target.blur()

		// don't close if one of the clickEls was clicked or container is already closing
		if (isClosing || ~clickEls.indexOf(target)) {
			return
		}

		// animate closing
		displayElement.style.cssText += getRect()
		changeCSS(container, pointerEventsAuto)

		// timeout to remove els from dom; use variable to avoid calling more than once
		timeout(removeContainer, 350)

		// clear animationEnd timeout
		clearTimeout(animationEnd)

		isOpen = false
		isClosing = true
	}

	// remove container / display element from the DOM
	function removeContainer() {
		// remove container from DOM & clear inline style
		doc.body[removeEl](container)
		container[removeEl](displayElement)
		changeCSS(container, '')

		// clear src of displayElement (or iframe if display el is iframe container)
		;(displayElement === iframeContainer
			? iframeSiteVid
			: displayElement
		).removeAttribute('src')

		// remove caption
		toggleCaption(false)

		if (galleryOpen) {
			isLoading && container[removeEl](loadingIcon)
			container[removeEl](galleryCounter)
			galleryOpen = galleryEls = false
			preloadedImages = {}
			supportsTouch || container[removeEl](rightArrowBtn)
			supportsTouch || container[removeEl](leftArrowBtn)
		}

		isClosing = isLoading = false
	}

	// style helper functions
	function changeCSS(element, newStyle) {
		element.style.cssText = newStyle
	}
	function webkitify(prop, val) {
		var webkit = '-webkit-'
		var propVal = prop + val
		return webkit + propVal + prop + webkit + val + propVal
	}
})()

},{}],"oCM5":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openVideo = exports.getVideoType = undefined;

var _util = require('../util');

var _bigpicture = require('bigpicture');

var _bigpicture2 = _interopRequireDefault(_bigpicture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function start(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var defaults = {
        video: ''
    };

    var settings = (0, _util.formSettings)(el, defaults, options);

    stop(el);

    el._videoPopupHandler = function (ev) {
        ev.preventDefault();
        openVideo(el, settings.video);
    };
    el.addEventListener('click', el._videoPopupHandler);
};

var stop = function stop(el) {
    if (el._videoPopupHandler) {
        el.removeEventListener('click', el._videoPopupHandler);
    }
};

exports.default = {
    start: start,
    stop: stop
};
var getVideoType = exports.getVideoType = function getVideoType(videoID) {
    if (videoID.match(/^\d+$/g)) {
        return 'vimeo';
    } else if (videoID.match(/^https?:\/\//g)) {
        return 'url';
    } else {
        return 'youtube';
    }
};

var openVideo = exports.openVideo = function openVideo(el, videoID) {
    var args = {
        el: el,
        noLoader: true
    };
    if (Array.isArray(videoID)) {
        args['vidSrc'] = videoID;
    } else {
        var type = getVideoType(videoID);
        if (type === 'vimeo') {
            args['vimeoSrc'] = videoID;
        } else if (type === 'youtube') {
            args['ytSrc'] = videoID;
        } else {
            args['vidSrc'] = videoID;
        }
    }
    (0, _bigpicture2.default)(args);
};
},{"../util":"Y/Oq","bigpicture":"KGZb"}],"Focm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollReveal = exports.videoPopup = exports.countUp = undefined;

var _countUp = require('./count-up');

var _countUp2 = _interopRequireDefault(_countUp);

var _videoPopup = require('./video-popup');

var _videoPopup2 = _interopRequireDefault(_videoPopup);

var _scrollReveal = require('./scroll-reveal');

var _scrollReveal2 = _interopRequireDefault(_scrollReveal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.countUp = _countUp2.default;
exports.videoPopup = _videoPopup2.default;
exports.scrollReveal = _scrollReveal2.default;
},{"./count-up":"vY/J","./video-popup":"oCM5","./scroll-reveal":"bpNf"}]},{},["Focm"], "effectBox")
//# sourceMappingURL=/effectbox.map