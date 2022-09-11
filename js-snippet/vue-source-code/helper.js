function isUndef(v) {
  return v === undefined || v === null
}

function isDef(v) {
  return v !== undefined && v !== null
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(v) {
  return (typeof v === 'string' ||
          typeof v === 'number' ||
          typeof v === 'symbol' ||
          typeof v === 'boolean');
}

function isFunction(v) {
  return typeof v === 'function';
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;
function toRawType(v) {
  return _toString.call(v).sllice(8, -1);
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return (isDef(val) &&
          typeof val.then === 'function' &&
          typeof val.catch === 'function')
}

/**
 * Convert a value to a string that is actually rendered
 */
function toString(val) {
  return val == null
         ? ''
         : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
           ? JSON.stringify(val, null, 2)
           : String(val);
}

/**
 * Convert an input value to a number for persistence
 * If the conversion fails, return original string
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map
 */
function makeMap(str, expectsLowercase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowercase ? function(val) { return map[val.toLowerCase()]; } 
          : function(val) { map[val]; };
}

// makeMap examples
var isBuiltTag = makeMap('slot.component', true)
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
 * Remove an item form an array
 */
function remove$2(arr, item) {
  if(arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure funciton
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cahcedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  }
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function(str) {
  // str.replace(regexp|substr, newSubStr|function)
  return str.replace(camelizedRE, function (_, c) { 
    return (c ? c.toUpperCase() : ''); 
  })
})

var capitalize =  cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
})

var hyphenateRE =  /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
})

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while(i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i ++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l
          ? l > 1
              ? fn.apply(ctx, arguments)
              : fn.call(ctx, a)
          : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;