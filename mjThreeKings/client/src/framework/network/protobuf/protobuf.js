/*
 Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/Long.js for details
*/
function p() {
    function b(a, b, d) { this.low = a | 0; this.high = b | 0; this.unsigned = !!d; }
    b.isLong = function (a) { return !0 === (a && a instanceof b); };
    var r = {}, s = {};
    b.fromInt = function (a, c) { var d; if (c) {
        a >>>= 0;
        if (0 <= a && 256 > a && (d = s[a]))
            return d;
        d = new b(a, 0 > (a | 0) ? -1 : 0, !0);
        0 <= a && 256 > a && (s[a] = d);
    }
    else {
        a |= 0;
        if (-128 <= a && 128 > a && (d = r[a]))
            return d;
        d = new b(a, 0 > a ? -1 : 0, !1);
        -128 <= a && 128 > a && (r[a] = d);
    } return d; };
    b.fromNumber = function (a, c) {
        c = !!c;
        return isNaN(a) || !isFinite(a) ? b.ZERO : !c && a <= -t ? b.MIN_VALUE : !c && a + 1 >= t ? b.MAX_VALUE : c && a >= u ? b.MAX_UNSIGNED_VALUE :
            0 > a ? b.fromNumber(-a, c).negate() : new b(a % 4294967296 | 0, a / 4294967296 | 0, c);
    };
    b.fromBits = function (a, c, d) { return new b(a, c, d); };
    b.fromString = function (a, c, d) {
        if (0 === a.length)
            throw Error("number format error: empty string");
        if ("NaN" === a || "Infinity" === a || "+Infinity" === a || "-Infinity" === a)
            return b.ZERO;
        "number" === typeof c && (d = c, c = !1);
        d = d || 10;
        if (2 > d || 36 < d)
            throw Error("radix out of range: " + d);
        var e;
        if (0 < (e = a.indexOf("-")))
            throw Error('number format error: interior "-" character: ' + a);
        if (0 === e)
            return b.fromString(a.substring(1), c, d).negate();
        e = b.fromNumber(Math.pow(d, 8));
        for (var f = b.ZERO, g = 0; g < a.length; g += 8) {
            var k = Math.min(8, a.length - g), l = parseInt(a.substring(g, g + k), d);
            8 > k ? (k = b.fromNumber(Math.pow(d, k)), f = f.multiply(k).add(b.fromNumber(l))) : (f = f.multiply(e), f = f.add(b.fromNumber(l)));
        }
        f.unsigned = c;
        return f;
    };
    b.fromValue = function (a) { return "number" === typeof a ? b.fromNumber(a) : "string" === typeof a ? b.fromString(a) : b.isLong(a) ? a : new b(a.low, a.high, a.unsigned); };
    var u = 4294967296 * 4294967296, t = u / 2, v = b.fromInt(16777216);
    b.ZERO = b.fromInt(0);
    b.UZERO = b.fromInt(0, !0);
    b.ONE = b.fromInt(1);
    b.UONE = b.fromInt(1, !0);
    b.NEG_ONE = b.fromInt(-1);
    b.MAX_VALUE = b.fromBits(-1, 2147483647, !1);
    b.MAX_UNSIGNED_VALUE = b.fromBits(-1, -1, !0);
    b.MIN_VALUE = b.fromBits(0, -2147483648, !1);
    b.prototype.toInt = function () { return this.unsigned ? this.low >>> 0 : this.low; };
    b.prototype.toNumber = function () { return this.unsigned ? 4294967296 * (this.high >>> 0) + (this.low >>> 0) : 4294967296 * this.high + (this.low >>> 0); };
    b.prototype.toString = function (a) {
        a = a || 10;
        if (2 > a || 36 < a)
            throw RangeError("radix out of range: " +
                a);
        if (this.isZero())
            return "0";
        var c;
        if (this.isNegative()) {
            if (this.equals(b.MIN_VALUE)) {
                c = b.fromNumber(a);
                var d = this.div(c);
                c = d.multiply(c).subtract(this);
                return d.toString(a) + c.toInt().toString(a);
            }
            return "-" + this.negate().toString(a);
        }
        d = b.fromNumber(Math.pow(a, 6), this.unsigned);
        c = this;
        for (var e = "";;) {
            var f = c.div(d), g = (c.subtract(f.multiply(d)).toInt() >>> 0).toString(a);
            c = f;
            if (c.isZero())
                return g + e;
            for (; 6 > g.length;)
                g = "0" + g;
            e = "" + g + e;
        }
    };
    b.prototype.getHighBits = function () { return this.high; };
    b.prototype.getHighBitsUnsigned =
        function () { return this.high >>> 0; };
    b.prototype.getLowBits = function () { return this.low; };
    b.prototype.getLowBitsUnsigned = function () { return this.low >>> 0; };
    b.prototype.getNumBitsAbs = function () { if (this.isNegative())
        return this.equals(b.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs(); for (var a = 0 != this.high ? this.high : this.low, c = 31; 0 < c && 0 == (a & 1 << c); c--)
        ; return 0 != this.high ? c + 33 : c + 1; };
    b.prototype.isZero = function () { return 0 === this.high && 0 === this.low; };
    b.prototype.isNegative = function () { return !this.unsigned && 0 > this.high; };
    b.prototype.isPositive = function () { return this.unsigned || 0 <= this.high; };
    b.prototype.isOdd = function () { return 1 === (this.low & 1); };
    b.prototype.isEven = function () { return 0 === (this.low & 1); };
    b.prototype.equals = function (a) { b.isLong(a) || (a = b.fromValue(a)); return this.unsigned !== a.unsigned && 1 === this.high >>> 31 && 1 === a.high >>> 31 ? !1 : this.high === a.high && this.low === a.low; };
    b.prototype.notEquals = function (a) { b.isLong(a) || (a = b.fromValue(a)); return !this.equals(a); };
    b.prototype.lessThan = function (a) {
        b.isLong(a) || (a = b.fromValue(a));
        return 0 > this.compare(a);
    };
    b.prototype.lessThanOrEqual = function (a) { b.isLong(a) || (a = b.fromValue(a)); return 0 >= this.compare(a); };
    b.prototype.greaterThan = function (a) { b.isLong(a) || (a = b.fromValue(a)); return 0 < this.compare(a); };
    b.prototype.greaterThanOrEqual = function (a) { b.isLong(a) || (a = b.fromValue(a)); return 0 <= this.compare(a); };
    b.prototype.compare = function (a) {
        if (this.equals(a))
            return 0;
        var b = this.isNegative(), d = a.isNegative();
        return b && !d ? -1 : !b && d ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high &&
            a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.subtract(a).isNegative() ? -1 : 1;
    };
    b.prototype.negate = function () { return !this.unsigned && this.equals(b.MIN_VALUE) ? b.MIN_VALUE : this.not().add(b.ONE); };
    b.prototype.add = function (a) { b.isLong(a) || (a = b.fromValue(a)); var c = this.high >>> 16, d = this.high & 65535, e = this.low >>> 16, f = a.high >>> 16, g = a.high & 65535, k = a.low >>> 16, l; l = 0 + ((this.low & 65535) + (a.low & 65535)); a = 0 + (l >>> 16); a += e + k; e = 0 + (a >>> 16); e += d + g; d = 0 + (e >>> 16); d = d + (c + f) & 65535; return b.fromBits((a & 65535) << 16 | l & 65535, d << 16 | e & 65535, this.unsigned); };
    b.prototype.subtract = function (a) { b.isLong(a) || (a = b.fromValue(a)); return this.add(a.negate()); };
    b.prototype.multiply = function (a) {
        if (this.isZero())
            return b.ZERO;
        b.isLong(a) || (a = b.fromValue(a));
        if (a.isZero())
            return b.ZERO;
        if (this.equals(b.MIN_VALUE))
            return a.isOdd() ? b.MIN_VALUE : b.ZERO;
        if (a.equals(b.MIN_VALUE))
            return this.isOdd() ? b.MIN_VALUE : b.ZERO;
        if (this.isNegative())
            return a.isNegative() ? this.negate().multiply(a.negate()) : this.negate().multiply(a).negate();
        if (a.isNegative())
            return this.multiply(a.negate()).negate();
        if (this.lessThan(v) && a.lessThan(v))
            return b.fromNumber(this.toNumber() * a.toNumber(), this.unsigned);
        var c = this.high >>> 16, d = this.high & 65535, e = this.low >>> 16, f = this.low & 65535, g = a.high >>> 16, k = a.high & 65535, l = a.low >>> 16;
        a = a.low & 65535;
        var n, h, m, q;
        q = 0 + f * a;
        m = 0 + (q >>> 16);
        m += e * a;
        h = 0 + (m >>> 16);
        m = (m & 65535) + f * l;
        h += m >>> 16;
        m &= 65535;
        h += d * a;
        n = 0 + (h >>> 16);
        h = (h & 65535) + e * l;
        n += h >>> 16;
        h &= 65535;
        h += f * k;
        n += h >>> 16;
        h &= 65535;
        n = n + (c * a + d * l + e * k + f * g) & 65535;
        return b.fromBits(m << 16 | q & 65535, n << 16 | h, this.unsigned);
    };
    b.prototype.div = function (a) {
        b.isLong(a) ||
            (a = b.fromValue(a));
        if (a.isZero())
            throw Error("division by zero");
        if (this.isZero())
            return this.unsigned ? b.UZERO : b.ZERO;
        var c, d, e;
        if (this.equals(b.MIN_VALUE)) {
            if (a.equals(b.ONE) || a.equals(b.NEG_ONE))
                return b.MIN_VALUE;
            if (a.equals(b.MIN_VALUE))
                return b.ONE;
            c = this.shiftRight(1).div(a).shiftLeft(1);
            if (c.equals(b.ZERO))
                return a.isNegative() ? b.ONE : b.NEG_ONE;
            d = this.subtract(a.multiply(c));
            return e = c.add(d.div(a));
        }
        if (a.equals(b.MIN_VALUE))
            return this.unsigned ? b.UZERO : b.ZERO;
        if (this.isNegative())
            return a.isNegative() ?
                this.negate().div(a.negate()) : this.negate().div(a).negate();
        if (a.isNegative())
            return this.div(a.negate()).negate();
        e = b.ZERO;
        for (d = this; d.greaterThanOrEqual(a);) {
            c = Math.max(1, Math.floor(d.toNumber() / a.toNumber()));
            for (var f = Math.ceil(Math.log(c) / Math.LN2), f = 48 >= f ? 1 : Math.pow(2, f - 48), g = b.fromNumber(c), k = g.multiply(a); k.isNegative() || k.greaterThan(d);)
                c -= f, g = b.fromNumber(c, this.unsigned), k = g.multiply(a);
            g.isZero() && (g = b.ONE);
            e = e.add(g);
            d = d.subtract(k);
        }
        return e;
    };
    b.prototype.modulo = function (a) {
        b.isLong(a) ||
            (a = b.fromValue(a));
        return this.subtract(this.div(a).multiply(a));
    };
    b.prototype.not = function () { return b.fromBits(~this.low, ~this.high, this.unsigned); };
    b.prototype.and = function (a) { b.isLong(a) || (a = b.fromValue(a)); return b.fromBits(this.low & a.low, this.high & a.high, this.unsigned); };
    b.prototype.or = function (a) { b.isLong(a) || (a = b.fromValue(a)); return b.fromBits(this.low | a.low, this.high | a.high, this.unsigned); };
    b.prototype.xor = function (a) {
        b.isLong(a) || (a = b.fromValue(a));
        return b.fromBits(this.low ^ a.low, this.high ^
            a.high, this.unsigned);
    };
    b.prototype.shiftLeft = function (a) { b.isLong(a) && (a = a.toInt()); return 0 === (a &= 63) ? this : 32 > a ? b.fromBits(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : b.fromBits(0, this.low << a - 32, this.unsigned); };
    b.prototype.shiftRight = function (a) { b.isLong(a) && (a = a.toInt()); return 0 === (a &= 63) ? this : 32 > a ? b.fromBits(this.low >>> a | this.high << 32 - a, this.high >> a, this.unsigned) : b.fromBits(this.high >> a - 32, 0 <= this.high ? 0 : -1, this.unsigned); };
    b.prototype.shiftRightUnsigned = function (a) {
        b.isLong(a) && (a =
            a.toInt());
        a &= 63;
        if (0 === a)
            return this;
        var c = this.high;
        return 32 > a ? b.fromBits(this.low >>> a | c << 32 - a, c >>> a, this.unsigned) : 32 === a ? b.fromBits(c, 0, this.unsigned) : b.fromBits(c >>> a - 32, 0, this.unsigned);
    };
    b.prototype.toSigned = function () { return this.unsigned ? new b(this.low, this.high, !1) : this; };
    b.prototype.toUnsigned = function () { return this.unsigned ? this : new b(this.low, this.high, !0); };
    return b;
}
"function" === typeof define && define.amd ? define([], p) : "function" === typeof require && "object" === typeof module && module && module.exports ? module.exports = p() : (this.dcodeIO = this.dcodeIO || {}).Long = p();
/*
 ByteBuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
 [BUILD] ByteBufferAB - Backing buffer: ArrayBuffer, Accessor: Uint8Array
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/ByteBuffer.js for details
*/
function u(k) {
    function g(a, b, c) { "undefined" === typeof a && (a = g.DEFAULT_CAPACITY); "undefined" === typeof b && (b = g.DEFAULT_ENDIAN); "undefined" === typeof c && (c = g.DEFAULT_NOASSERT); if (!c) {
        a |= 0;
        if (0 > a)
            throw RangeError("Illegal capacity");
        b = !!b;
        c = !!c;
    } this.buffer = 0 === a ? v : new ArrayBuffer(a); this.view = 0 === a ? null : new Uint8Array(this.buffer); this.offset = 0; this.markedOffset = -1; this.limit = a; this.littleEndian = "undefined" !== typeof b ? !!b : !1; this.noAssert = !!c; }
    function m(a) {
        var b = 0;
        return function () {
            return b < a.length ? a.charCodeAt(b++) :
                null;
        };
    }
    function s() { var a = [], b = []; return function () { if (0 === arguments.length)
        return b.join("") + w.apply(String, a); 1024 < a.length + arguments.length && (b.push(w.apply(String, a)), a.length = 0); Array.prototype.push.apply(a, arguments); }; }
    function x(a, b, c, d, e) {
        var n;
        n = 8 * e - d - 1;
        var h = (1 << n) - 1, f = h >> 1, g = -7;
        e = c ? e - 1 : 0;
        var q = c ? -1 : 1, k = a[b + e];
        e += q;
        c = k & (1 << -g) - 1;
        k >>= -g;
        for (g += n; 0 < g; c = 256 * c + a[b + e], e += q, g -= 8)
            ;
        n = c & (1 << -g) - 1;
        c >>= -g;
        for (g += d; 0 < g; n = 256 * n + a[b + e], e += q, g -= 8)
            ;
        if (0 === c)
            c = 1 - f;
        else {
            if (c === h)
                return n ? NaN : Infinity * (k ? -1 :
                    1);
            n += Math.pow(2, d);
            c -= f;
        }
        return (k ? -1 : 1) * n * Math.pow(2, c - d);
    }
    function z(a, b, c, d, e, n) {
        var f, g = 8 * n - e - 1, t = (1 << g) - 1, k = t >> 1, y = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        n = d ? 0 : n - 1;
        var l = d ? 1 : -1, m = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
        b = Math.abs(b);
        isNaN(b) || Infinity === b ? (b = isNaN(b) ? 1 : 0, d = t) : (d = Math.floor(Math.log(b) / Math.LN2), 1 > b * (f = Math.pow(2, -d)) && (d--, f *= 2), b = 1 <= d + k ? b + y / f : b + y * Math.pow(2, 1 - k), 2 <= b * f && (d++, f /= 2), d + k >= t ? (b = 0, d = t) : 1 <= d + k ? (b = (b * f - 1) * Math.pow(2, e), d += k) : (b = b * Math.pow(2, k - 1) * Math.pow(2, e), d = 0));
        for (; 8 <= e; a[c + n] =
            b & 255, n += l, b /= 256, e -= 8)
            ;
        d = d << e | b;
        for (g += e; 0 < g; a[c + n] = d & 255, n += l, d /= 256, g -= 8)
            ;
        a[c + n - l] |= 128 * m;
    }
    g.VERSION = "4.0.0";
    g.LITTLE_ENDIAN = !0;
    g.BIG_ENDIAN = !1;
    g.DEFAULT_CAPACITY = 16;
    g.DEFAULT_ENDIAN = g.BIG_ENDIAN;
    g.DEFAULT_NOASSERT = !1;
    g.Long = k || null;
    var f = g.prototype;
    Object.defineProperty(f, "__isByteBuffer__", { value: !0, enumerable: !1, configurable: !1 });
    var v = new ArrayBuffer(0), w = String.fromCharCode;
    g.accessor = function () { return Uint8Array; };
    g.allocate = function (a, b, c) { return new g(a, b, c); };
    g.concat = function (a, b, c, d) {
        if ("boolean" ===
            typeof b || "string" !== typeof b)
            d = c, c = b, b = void 0;
        for (var e = 0, f = 0, h = a.length, p; f < h; ++f)
            g.isByteBuffer(a[f]) || (a[f] = g.wrap(a[f], b)), p = a[f].limit - a[f].offset, 0 < p && (e += p);
        if (0 === e)
            return new g(0, c, d);
        b = new g(e, c, d);
        for (f = 0; f < h;)
            c = a[f++], p = c.limit - c.offset, 0 >= p || (b.view.set(c.view.subarray(c.offset, c.limit), b.offset), b.offset += p);
        b.limit = b.offset;
        b.offset = 0;
        return b;
    };
    g.isByteBuffer = function (a) { return !0 === (a && a.__isByteBuffer__); };
    g.type = function () { return ArrayBuffer; };
    g.wrap = function (a, b, c, d) {
        "string" !== typeof b &&
            (d = c, c = b, b = void 0);
        if ("string" === typeof a)
            switch ("undefined" === typeof b && (b = "utf8"), b) {
                case "base64": return g.fromBase64(a, c);
                case "hex": return g.fromHex(a, c);
                case "binary": return g.fromBinary(a, c);
                case "utf8": return g.fromUTF8(a, c);
                case "debug": return g.fromDebug(a, c);
                default: throw Error("Unsupported encoding: " + b);
            }
        if (null === a || "object" !== typeof a)
            throw TypeError("Illegal buffer");
        if (g.isByteBuffer(a))
            return b = f.clone.call(a), b.markedOffset = -1, b;
        if (a instanceof Uint8Array)
            b = new g(0, c, d), 0 < a.length &&
                (b.buffer = a.buffer, b.offset = a.byteOffset, b.limit = a.byteOffset + a.byteLength, b.view = new Uint8Array(a.buffer));
        else if (a instanceof ArrayBuffer)
            b = new g(0, c, d), 0 < a.byteLength && (b.buffer = a, b.offset = 0, b.limit = a.byteLength, b.view = 0 < a.byteLength ? new Uint8Array(a) : null);
        else if ("[object Array]" === Object.prototype.toString.call(a))
            for (b = new g(a.length, c, d), b.limit = a.length, c = 0; c < a.length; ++c)
                b.view[c] = a[c];
        else
            throw TypeError("Illegal buffer");
        return b;
    };
    f.readBytes = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + a > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + a + ") <= " + this.buffer.byteLength);
        }
        var d = this.slice(b, b + a);
        c && (this.offset += a);
        return d;
    };
    f.writeBytes = f.append;
    f.writeInt8 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a |= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 1;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        this.view[b - 1] = a;
        c && (this.offset += 1);
        return this;
    };
    f.writeByte = f.writeInt8;
    f.readInt8 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " +
                    a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
        }
        a = this.view[a];
        128 === (a & 128) && (a = -(255 - a + 1));
        b && (this.offset += 1);
        return a;
    };
    f.readByte = f.readInt8;
    f.writeUint8 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b +
                    " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 1;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        this.view[b - 1] = a;
        c && (this.offset += 1);
        return this;
    };
    f.writeUInt8 = f.writeUint8;
    f.readUint8 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    a + " (+1) <= " + this.buffer.byteLength);
        }
        a = this.view[a];
        b && (this.offset += 1);
        return a;
    };
    f.readUInt8 = f.readUint8;
    f.writeInt16 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a |= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 2;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 2;
        this.littleEndian ? (this.view[b + 1] = (a & 65280) >>> 8, this.view[b] = a & 255) : (this.view[b] = (a & 65280) >>> 8, this.view[b + 1] = a & 255);
        c && (this.offset += 2);
        return this;
    };
    f.writeShort = f.writeInt16;
    f.readInt16 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    a + " (+2) <= " + this.buffer.byteLength);
        }
        var c = 0;
        this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]);
        32768 === (c & 32768) && (c = -(65535 - c + 1));
        b && (this.offset += 2);
        return c;
    };
    f.readShort = f.readInt16;
    f.writeUint16 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 2;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 2;
        this.littleEndian ? (this.view[b + 1] = (a & 65280) >>> 8, this.view[b] = a & 255) : (this.view[b] = (a & 65280) >>> 8, this.view[b + 1] = a & 255);
        c && (this.offset += 2);
        return this;
    };
    f.writeUInt16 = f.writeUint16;
    f.readUint16 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " +
                    a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+2) <= " + this.buffer.byteLength);
        }
        var c = 0;
        this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]);
        b && (this.offset += 2);
        return c;
    };
    f.readUInt16 = f.readUint16;
    f.writeInt32 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a |= 0;
            if ("number" !==
                typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 4;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 4;
        this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = a & 255);
        c && (this.offset += 4);
        return this;
    };
    f.writeInt = f.writeInt32;
    f.readInt32 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
        }
        var c = 0;
        this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a +
            3], c += this.view[a] << 24 >>> 0);
        b && (this.offset += 4);
        return c | 0;
    };
    f.readInt = f.readInt32;
    f.writeUint32 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 4;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 4;
        this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = a & 255);
        c && (this.offset += 4);
        return this;
    };
    f.writeUInt32 = f.writeUint32;
    f.readUint32 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 >
                a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
        }
        var c = 0;
        this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0);
        b && (this.offset += 4);
        return c;
    };
    f.readUInt32 = f.readUint32;
    k && (f.writeInt64 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" === typeof a)
                a = k.fromNumber(a);
            else if ("string" === typeof a)
                a = k.fromString(a);
            else if (!(a && a instanceof k))
                throw TypeError("Illegal value: " + a + " (not an integer or Long)");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        "number" === typeof a ? a = k.fromNumber(a) : "string" === typeof a && (a = k.fromString(a));
        b += 8;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 8;
        var d = a.low, e = a.high;
        this.littleEndian ? (this.view[b + 3] = d >>> 24 & 255, this.view[b + 2] = d >>> 16 & 255, this.view[b + 1] = d >>> 8 & 255, this.view[b] = d & 255, b += 4, this.view[b + 3] = e >>> 24 & 255, this.view[b + 2] = e >>> 16 & 255, this.view[b + 1] = e >>> 8 & 255, this.view[b] = e & 255) : (this.view[b] = e >>> 24 & 255, this.view[b + 1] = e >>> 16 & 255, this.view[b + 2] = e >>> 8 & 255, this.view[b + 3] = e & 255, b += 4, this.view[b] = d >>> 24 & 255, this.view[b + 1] = d >>> 16 & 255, this.view[b + 2] = d >>> 8 & 255, this.view[b + 3] = d & 255);
        c && (this.offset += 8);
        return this;
    }, f.writeLong = f.writeInt64, f.readInt64 =
        function (a) {
            var b = "undefined" === typeof a;
            b && (a = this.offset);
            if (!this.noAssert) {
                if ("number" !== typeof a || 0 !== a % 1)
                    throw TypeError("Illegal offset: " + a + " (not an integer)");
                a >>>= 0;
                if (0 > a || a + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength);
            }
            var c = 0, d = 0;
            this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0, a += 4, d = this.view[a + 2] << 16, d |= this.view[a + 1] << 8, d |= this.view[a], d += this.view[a + 3] << 24 >>> 0) : (d = this.view[a +
                1] << 16, d |= this.view[a + 2] << 8, d |= this.view[a + 3], d += this.view[a] << 24 >>> 0, a += 4, c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0);
            a = new k(c, d, !1);
            b && (this.offset += 8);
            return a;
        }, f.readLong = f.readInt64, f.writeUint64 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" === typeof a)
                a = k.fromNumber(a);
            else if ("string" === typeof a)
                a = k.fromString(a);
            else if (!(a && a instanceof k))
                throw TypeError("Illegal value: " + a + " (not an integer or Long)");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        "number" === typeof a ? a = k.fromNumber(a) : "string" === typeof a && (a = k.fromString(a));
        b += 8;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= 8;
        var d = a.low, e = a.high;
        this.littleEndian ? (this.view[b + 3] = d >>> 24 & 255, this.view[b + 2] = d >>> 16 & 255, this.view[b + 1] = d >>> 8 & 255, this.view[b] = d & 255, b += 4,
            this.view[b + 3] = e >>> 24 & 255, this.view[b + 2] = e >>> 16 & 255, this.view[b + 1] = e >>> 8 & 255, this.view[b] = e & 255) : (this.view[b] = e >>> 24 & 255, this.view[b + 1] = e >>> 16 & 255, this.view[b + 2] = e >>> 8 & 255, this.view[b + 3] = e & 255, b += 4, this.view[b] = d >>> 24 & 255, this.view[b + 1] = d >>> 16 & 255, this.view[b + 2] = d >>> 8 & 255, this.view[b + 3] = d & 255);
        c && (this.offset += 8);
        return this;
    }, f.writeUInt64 = f.writeUint64, f.readUint64 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " +
                    a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 8 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength);
        }
        var c = 0, d = 0;
        this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0, a += 4, d = this.view[a + 2] << 16, d |= this.view[a + 1] << 8, d |= this.view[a], d += this.view[a + 3] << 24 >>> 0) : (d = this.view[a + 1] << 16, d |= this.view[a + 2] << 8, d |= this.view[a + 3], d += this.view[a] << 24 >>> 0, a += 4, c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c +=
            this.view[a] << 24 >>> 0);
        a = new k(c, d, !0);
        b && (this.offset += 8);
        return a;
    }, f.readUInt64 = f.readUint64);
    f.writeFloat32 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a)
                throw TypeError("Illegal value: " + a + " (not a number)");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 4;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        z(this.view, a, b - 4, this.littleEndian, 23, 4);
        c && (this.offset += 4);
        return this;
    };
    f.writeFloat = f.writeFloat32;
    f.readFloat32 = function (a) { var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
        if ("number" !== typeof a || 0 !== a % 1)
            throw TypeError("Illegal offset: " + a + " (not an integer)");
        a >>>= 0;
        if (0 > a || a + 4 > this.buffer.byteLength)
            throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
    } a = x(this.view, a, this.littleEndian, 23, 4); b && (this.offset += 4); return a; };
    f.readFloat = f.readFloat32;
    f.writeFloat64 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a)
                throw TypeError("Illegal value: " + a + " (not a number)");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        b += 8;
        var d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        z(this.view, a, b - 8, this.littleEndian, 52, 8);
        c && (this.offset += 8);
        return this;
    };
    f.writeDouble = f.writeFloat64;
    f.readFloat64 = function (a) { var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
        if ("number" !== typeof a || 0 !== a % 1)
            throw TypeError("Illegal offset: " + a + " (not an integer)");
        a >>>= 0;
        if (0 > a || a + 8 > this.buffer.byteLength)
            throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength);
    } a = x(this.view, a, this.littleEndian, 52, 8); b && (this.offset += 8); return a; };
    f.readDouble = f.readFloat64;
    g.MAX_VARINT32_BYTES = 5;
    g.calculateVarint32 =
        function (a) { a >>>= 0; return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5; };
    g.zigZagEncode32 = function (a) { return ((a |= 0) << 1 ^ a >> 31) >>> 0; };
    g.zigZagDecode32 = function (a) { return a >>> 1 ^ -(a & 1) | 0; };
    f.writeVarint32 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a |= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    b + " (+0) <= " + this.buffer.byteLength);
        }
        var d = g.calculateVarint32(a), e;
        b += d;
        e = this.buffer.byteLength;
        b > e && this.resize((e *= 2) > b ? e : b);
        b -= d;
        for (a >>>= 0; 128 <= a;)
            e = a & 127 | 128, this.view[b++] = e, a >>>= 7;
        this.view[b++] = a;
        return c ? (this.offset = b, this) : d;
    };
    f.writeVarint32ZigZag = function (a, b) { return this.writeVarint32(g.zigZagEncode32(a), b); };
    f.readVarint32 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
        }
        var c = 0, d = 0, e;
        do {
            if (!this.noAssert && a > this.limit)
                throw a = Error("Truncated"), a.truncated = !0, a;
            e = this.view[a++];
            5 > c && (d |= (e & 127) << 7 * c);
            ++c;
        } while (0 !== (e & 128));
        d |= 0;
        return b ? (this.offset = a, d) : { value: d, length: c };
    };
    f.readVarint32ZigZag = function (a) { a = this.readVarint32(a); "object" === typeof a ? a.value = g.zigZagDecode32(a.value) : a = g.zigZagDecode32(a); return a; };
    k && (g.MAX_VARINT64_BYTES = 10, g.calculateVarint64 =
        function (a) { "number" === typeof a ? a = k.fromNumber(a) : "string" === typeof a && (a = k.fromString(a)); var b = a.toInt() >>> 0, c = a.shiftRightUnsigned(28).toInt() >>> 0; a = a.shiftRightUnsigned(56).toInt() >>> 0; return 0 == a ? 0 == c ? 16384 > b ? 128 > b ? 1 : 2 : 2097152 > b ? 3 : 4 : 16384 > c ? 128 > c ? 5 : 6 : 2097152 > c ? 7 : 8 : 128 > a ? 9 : 10; }, g.zigZagEncode64 = function (a) { "number" === typeof a ? a = k.fromNumber(a, !1) : "string" === typeof a ? a = k.fromString(a, !1) : !1 !== a.unsigned && (a = a.toSigned()); return a.shiftLeft(1).xor(a.shiftRight(63)).toUnsigned(); }, g.zigZagDecode64 =
        function (a) { "number" === typeof a ? a = k.fromNumber(a, !1) : "string" === typeof a ? a = k.fromString(a, !1) : !1 !== a.unsigned && (a = a.toSigned()); return a.shiftRightUnsigned(1).xor(a.and(k.ONE).toSigned().negate()).toSigned(); }, f.writeVarint64 = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" === typeof a)
                a = k.fromNumber(a);
            else if ("string" === typeof a)
                a = k.fromString(a);
            else if (!(a && a instanceof k))
                throw TypeError("Illegal value: " + a + " (not an integer or Long)");
            if ("number" !==
                typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        "number" === typeof a ? a = k.fromNumber(a, !1) : "string" === typeof a ? a = k.fromString(a, !1) : !1 !== a.unsigned && (a = a.toSigned());
        var d = g.calculateVarint64(a), e = a.toInt() >>> 0, f = a.shiftRightUnsigned(28).toInt() >>> 0, h = a.shiftRightUnsigned(56).toInt() >>> 0;
        b += d;
        var p = this.buffer.byteLength;
        b > p && this.resize((p *= 2) > b ? p : b);
        b -= d;
        switch (d) {
            case 10: this.view[b + 9] = h >>> 7 & 1;
            case 9: this.view[b + 8] = 9 !== d ? h | 128 : h & 127;
            case 8: this.view[b + 7] = 8 !== d ? f >>> 21 | 128 : f >>> 21 & 127;
            case 7: this.view[b + 6] = 7 !== d ? f >>> 14 | 128 : f >>> 14 & 127;
            case 6: this.view[b + 5] = 6 !== d ? f >>> 7 | 128 : f >>> 7 & 127;
            case 5: this.view[b + 4] = 5 !== d ? f | 128 : f & 127;
            case 4: this.view[b + 3] = 4 !== d ? e >>> 21 | 128 : e >>> 21 & 127;
            case 3: this.view[b + 2] = 3 !== d ? e >>> 14 | 128 : e >>> 14 & 127;
            case 2: this.view[b + 1] = 2 !== d ? e >>> 7 | 128 : e >>> 7 & 127;
            case 1: this.view[b] = 1 !== d ? e | 128 : e & 127;
        }
        return c ? (this.offset += d, this) : d;
    }, f.writeVarint64ZigZag =
        function (a, b) { return this.writeVarint64(g.zigZagEncode64(a), b); }, f.readVarint64 = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
        }
        var c = a, d = 0, e = 0, f = 0, h = 0, h = this.view[a++], d = h & 127;
        if (h & 128 && (h = this.view[a++], d |= (h & 127) << 7, h & 128 || this.noAssert && "undefined" === typeof h) &&
            (h = this.view[a++], d |= (h & 127) << 14, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], d |= (h & 127) << 21, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], e = h & 127, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], e |= (h & 127) << 7, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], e |= (h & 127) << 14, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], e |= (h & 127) << 21, h & 128 || this.noAssert && "undefined" === typeof h) && (h = this.view[a++], f = h & 127, h & 128 ||
            this.noAssert && "undefined" === typeof h) && (h = this.view[a++], f |= (h & 127) << 7, h & 128 || this.noAssert && "undefined" === typeof h))
            throw Error("Buffer overrun");
        d = k.fromBits(d | e << 28, e >>> 4 | f << 24, !1);
        return b ? (this.offset = a, d) : { value: d, length: a - c };
    }, f.readVarint64ZigZag = function (a) { (a = this.readVarint64(a)) && a.value instanceof k ? a.value = g.zigZagDecode64(a.value) : a = g.zigZagDecode64(a); return a; });
    f.writeCString = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        var d, e = a.length;
        if (!this.noAssert) {
            if ("string" !==
                typeof a)
                throw TypeError("Illegal str: Not a string");
            for (d = 0; d < e; ++d)
                if (0 === a.charCodeAt(d))
                    throw RangeError("Illegal str: Contains NULL-characters");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        e = l.a(m(a))[1];
        b += e + 1;
        d = this.buffer.byteLength;
        b > d && this.resize((d *= 2) > b ? d : b);
        b -= e + 1;
        l.c(m(a), function (a) { this.view[b++] = a; }.bind(this));
        this.view[b++] =
            0;
        return c ? (this.offset = b, this) : e;
    };
    f.readCString = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
        }
        var c = a, d, e = -1;
        l.b(function () {
            if (0 === e)
                return null;
            if (a >= this.limit)
                throw RangeError("Illegal range: Truncated data, " + a + " < " + this.limit);
            e = this.view[a++];
            return 0 ===
                e ? null : e;
        }.bind(this), d = s(), !0);
        return b ? (this.offset = a, d()) : { string: d(), length: a - c };
    };
    f.writeIString = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("string" !== typeof a)
                throw TypeError("Illegal str: Not a string");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        var d = b, e;
        e = l.a(m(a), this.noAssert)[1];
        b +=
            4 + e;
        var f = this.buffer.byteLength;
        b > f && this.resize((f *= 2) > b ? f : b);
        b -= 4 + e;
        this.littleEndian ? (this.view[b + 3] = e >>> 24 & 255, this.view[b + 2] = e >>> 16 & 255, this.view[b + 1] = e >>> 8 & 255, this.view[b] = e & 255) : (this.view[b] = e >>> 24 & 255, this.view[b + 1] = e >>> 16 & 255, this.view[b + 2] = e >>> 8 & 255, this.view[b + 3] = e & 255);
        b += 4;
        l.c(m(a), function (a) { this.view[b++] = a; }.bind(this));
        if (b !== d + 4 + e)
            throw RangeError("Illegal range: Truncated data, " + b + " == " + (b + 4 + e));
        return c ? (this.offset = b, this) : b - d;
    };
    f.readIString = function (a) {
        var b = "undefined" ===
            typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
        }
        var c = 0, d = a;
        this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0);
        a += 4;
        var e = a + c;
        l.b(function () {
            return a < e ?
                this.view[a++] : null;
        }.bind(this), c = s(), this.noAssert);
        c = c();
        return b ? (this.offset = a, c) : { string: c, length: a - d };
    };
    g.METRICS_CHARS = "c";
    g.METRICS_BYTES = "b";
    f.writeUTF8String = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        var d, e = b;
        d = l.a(m(a))[1];
        b += d;
        var f = this.buffer.byteLength;
        b > f && this.resize((f *= 2) > b ? f : b);
        b -= d;
        l.c(m(a), function (a) { this.view[b++] = a; }.bind(this));
        return c ? (this.offset = b, this) : b - e;
    };
    f.writeString = f.writeUTF8String;
    g.calculateUTF8Chars = function (a) { return l.a(m(a))[0]; };
    g.calculateUTF8Bytes = function (a) { return l.a(m(a))[1]; };
    g.calculateString = g.calculateUTF8Bytes;
    f.readUTF8String = function (a, b, c) {
        "number" === typeof b && (c = b, b = void 0);
        var d = "undefined" === typeof c;
        d && (c = this.offset);
        "undefined" === typeof b && (b = g.METRICS_CHARS);
        if (!this.noAssert) {
            if ("number" !== typeof a ||
                0 !== a % 1)
                throw TypeError("Illegal length: " + a + " (not an integer)");
            a |= 0;
            if ("number" !== typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            c >>>= 0;
            if (0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength);
        }
        var e = 0, f = c, h;
        if (b === g.METRICS_CHARS) {
            h = s();
            l.f(function () { return e < a && c < this.limit ? this.view[c++] : null; }.bind(this), function (a) { ++e; l.e(a, h); });
            if (e !== a)
                throw RangeError("Illegal range: Truncated data, " + e + " == " + a);
            return d ?
                (this.offset = c, h()) : { string: h(), length: c - f };
        }
        if (b === g.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" !== typeof c || 0 !== c % 1)
                    throw TypeError("Illegal offset: " + c + " (not an integer)");
                c >>>= 0;
                if (0 > c || c + a > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= " + c + " (+" + a + ") <= " + this.buffer.byteLength);
            }
            var p = c + a;
            l.b(function () { return c < p ? this.view[c++] : null; }.bind(this), h = s(), this.noAssert);
            if (c !== p)
                throw RangeError("Illegal range: Truncated data, " + c + " == " + p);
            return d ? (this.offset = c, h()) : { string: h(),
                length: c - f };
        }
        throw TypeError("Unsupported metrics: " + b);
    };
    f.readString = f.readUTF8String;
    f.writeVString = function (a, b) {
        var c = "undefined" === typeof b;
        c && (b = this.offset);
        if (!this.noAssert) {
            if ("string" !== typeof a)
                throw TypeError("Illegal str: Not a string");
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            b >>>= 0;
            if (0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
        }
        var d = b, e, f;
        e = l.a(m(a), this.noAssert)[1];
        f = g.calculateVarint32(e);
        b += f + e;
        var h = this.buffer.byteLength;
        b > h && this.resize((h *= 2) > b ? h : b);
        b -= f + e;
        b += this.writeVarint32(e, b);
        l.c(m(a), function (a) { this.view[b++] = a; }.bind(this));
        if (b !== d + e + f)
            throw RangeError("Illegal range: Truncated data, " + b + " == " + (b + e + f));
        return c ? (this.offset = b, this) : b - d;
    };
    f.readVString = function (a) {
        var b = "undefined" === typeof a;
        b && (a = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            a >>>= 0;
            if (0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    a + " (+1) <= " + this.buffer.byteLength);
        }
        var c = this.readVarint32(a), d = a;
        a += c.length;
        var c = c.value, e = a + c, c = s();
        l.b(function () { return a < e ? this.view[a++] : null; }.bind(this), c, this.noAssert);
        c = c();
        return b ? (this.offset = a, c) : { string: c, length: a - d };
    };
    f.append = function (a, b, c) {
        if ("number" === typeof b || "string" !== typeof b)
            c = b, b = void 0;
        var d = "undefined" === typeof c;
        d && (c = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            c >>>= 0;
            if (0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    c + " (+0) <= " + this.buffer.byteLength);
        }
        a instanceof g || (a = g.wrap(a, b));
        b = a.limit - a.offset;
        if (0 >= b)
            return this;
        c += b;
        var e = this.buffer.byteLength;
        c > e && this.resize((e *= 2) > c ? e : c);
        this.view.set(a.view.subarray(a.offset, a.limit), c - b);
        a.offset += b;
        d && (this.offset += b);
        return this;
    };
    f.appendTo = function (a, b) { a.append(this, b); return this; };
    f.assert = function (a) { this.noAssert = !a; return this; };
    f.capacity = function () { return this.buffer.byteLength; };
    f.clear = function () {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset =
            -1;
        return this;
    };
    f.clone = function (a) { var b = new g(0, this.littleEndian, this.noAssert); a ? (b.buffer = new ArrayBuffer(this.buffer.byteLength), b.view = new Uint8Array(b.buffer)) : (b.buffer = this.buffer, b.view = this.view); b.offset = this.offset; b.markedOffset = this.markedOffset; b.limit = this.limit; return b; };
    f.compact = function (a, b) {
        "undefined" === typeof a && (a = this.offset);
        "undefined" === typeof b && (b = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        if (0 === a && b === this.buffer.byteLength)
            return this;
        var c = b - a;
        if (0 === c)
            return this.buffer = v, this.view = null, 0 <= this.markedOffset && (this.markedOffset -= a), this.limit = this.offset = 0, this;
        var d = new ArrayBuffer(c), e = new Uint8Array(d);
        e.set(this.view.subarray(a, b));
        this.buffer = d;
        this.view = e;
        0 <= this.markedOffset &&
            (this.markedOffset -= a);
        this.offset = 0;
        this.limit = c;
        return this;
    };
    f.copy = function (a, b) {
        "undefined" === typeof a && (a = this.offset);
        "undefined" === typeof b && (b = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        if (a === b)
            return new g(0, this.littleEndian, this.noAssert);
        var c = b - a, d = new g(c, this.littleEndian, this.noAssert);
        d.offset = 0;
        d.limit = c;
        0 <= d.markedOffset && (d.markedOffset -= a);
        this.copyTo(d, 0, a, b);
        return d;
    };
    f.copyTo = function (a, b, c, d) {
        var e, f;
        if (!this.noAssert && !g.isByteBuffer(a))
            throw TypeError("Illegal target: Not a ByteBuffer");
        b = (f = "undefined" === typeof b) ? a.offset : b | 0;
        c = (e = "undefined" === typeof c) ? this.offset : c | 0;
        d = "undefined" === typeof d ? this.limit : d | 0;
        if (0 > b || b > a.buffer.byteLength)
            throw RangeError("Illegal target range: 0 <= " +
                b + " <= " + a.buffer.byteLength);
        if (0 > c || d > this.buffer.byteLength)
            throw RangeError("Illegal source range: 0 <= " + c + " <= " + this.buffer.byteLength);
        var h = d - c;
        if (0 === h)
            return a;
        a.ensureCapacity(b + h);
        a.view.set(this.view.subarray(c, d), b);
        e && (this.offset += h);
        f && (a.offset += h);
        return this;
    };
    f.ensureCapacity = function (a) { var b = this.buffer.byteLength; return b < a ? this.resize((b *= 2) > a ? b : a) : this; };
    f.fill = function (a, b, c) {
        var d = "undefined" === typeof b;
        d && (b = this.offset);
        "string" === typeof a && 0 < a.length && (a = a.charCodeAt(0));
        "undefined" === typeof b && (b = this.offset);
        "undefined" === typeof c && (c = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            a |= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal begin: Not an integer");
            b >>>= 0;
            if ("number" !== typeof c || 0 !== c % 1)
                throw TypeError("Illegal end: Not an integer");
            c >>>= 0;
            if (0 > b || b > c || c > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength);
        }
        if (b >= c)
            return this;
        for (; b < c;)
            this.view[b++] = a;
        d && (this.offset = b);
        return this;
    };
    f.flip = function () { this.limit = this.offset; this.offset = 0; return this; };
    f.mark = function (a) { a = "undefined" === typeof a ? this.offset : a; if (!this.noAssert) {
        if ("number" !== typeof a || 0 !== a % 1)
            throw TypeError("Illegal offset: " + a + " (not an integer)");
        a >>>= 0;
        if (0 > a || a + 0 > this.buffer.byteLength)
            throw RangeError("Illegal offset: 0 <= " + a + " (+0) <= " + this.buffer.byteLength);
    } this.markedOffset = a; return this; };
    f.order = function (a) {
        if (!this.noAssert && "boolean" !== typeof a)
            throw TypeError("Illegal littleEndian: Not a boolean");
        this.littleEndian = !!a;
        return this;
    };
    f.LE = function (a) { this.littleEndian = "undefined" !== typeof a ? !!a : !0; return this; };
    f.BE = function (a) { this.littleEndian = "undefined" !== typeof a ? !a : !1; return this; };
    f.prepend = function (a, b, c) {
        if ("number" === typeof b || "string" !== typeof b)
            c = b, b = void 0;
        var d = "undefined" === typeof c;
        d && (c = this.offset);
        if (!this.noAssert) {
            if ("number" !== typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            c >>>= 0;
            if (0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " +
                    c + " (+0) <= " + this.buffer.byteLength);
        }
        a instanceof g || (a = g.wrap(a, b));
        b = a.limit - a.offset;
        if (0 >= b)
            return this;
        var e = b - c;
        if (0 < e) {
            var f = new ArrayBuffer(this.buffer.byteLength + e), h = new Uint8Array(f);
            h.set(this.view.subarray(c, this.buffer.byteLength), b);
            this.buffer = f;
            this.view = h;
            this.offset += e;
            0 <= this.markedOffset && (this.markedOffset += e);
            this.limit += e;
            c += e;
        }
        else
            new Uint8Array(this.buffer);
        this.view.set(a.view.subarray(a.offset, a.limit), c - b);
        a.offset = a.limit;
        d && (this.offset -= b);
        return this;
    };
    f.prependTo =
        function (a, b) { a.prepend(this, b); return this; };
    f.printDebug = function (a) { "function" !== typeof a && (a = console.log.bind(console)); a(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0)); };
    f.remaining = function () { return this.limit - this.offset; };
    f.reset = function () { 0 <= this.markedOffset ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0; return this; };
    f.resize = function (a) {
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal capacity: " +
                    a + " (not an integer)");
            a |= 0;
            if (0 > a)
                throw RangeError("Illegal capacity: 0 <= " + a);
        }
        if (this.buffer.byteLength < a) {
            a = new ArrayBuffer(a);
            var b = new Uint8Array(a);
            b.set(this.view);
            this.buffer = a;
            this.view = b;
        }
        return this;
    };
    f.reverse = function (a, b) {
        "undefined" === typeof a && (a = this.offset);
        "undefined" === typeof b && (b = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        if (a === b)
            return this;
        Array.prototype.reverse.call(this.view.subarray(a, b));
        return this;
    };
    f.skip = function (a) {
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal length: " + a + " (not an integer)");
            a |= 0;
        }
        var b = this.offset + a;
        if (!this.noAssert && (0 > b || b > this.buffer.byteLength))
            throw RangeError("Illegal length: 0 <= " + this.offset + " + " + a + " <= " + this.buffer.byteLength);
        this.offset = b;
        return this;
    };
    f.slice = function (a, b) { "undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); if (!this.noAssert) {
        if ("number" !== typeof a || 0 !== a % 1)
            throw TypeError("Illegal begin: Not an integer");
        a >>>= 0;
        if ("number" !== typeof b || 0 !== b % 1)
            throw TypeError("Illegal end: Not an integer");
        b >>>= 0;
        if (0 > a || a > b || b > this.buffer.byteLength)
            throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
    } var c = this.clone(); c.offset = a; c.limit = b; return c; };
    f.toBuffer =
        function (a) {
            var b = this.offset, c = this.limit;
            if (!this.noAssert) {
                if ("number" !== typeof b || 0 !== b % 1)
                    throw TypeError("Illegal offset: Not an integer");
                b >>>= 0;
                if ("number" !== typeof c || 0 !== c % 1)
                    throw TypeError("Illegal limit: Not an integer");
                c >>>= 0;
                if (0 > b || b > c || c > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength);
            }
            if (!a && 0 === b && c === this.buffer.byteLength)
                return this.buffer;
            if (b === c)
                return v;
            a = new ArrayBuffer(c - b);
            (new Uint8Array(a)).set((new Uint8Array(this.buffer)).subarray(b, c), 0);
            return a;
        };
    f.toArrayBuffer = f.toBuffer;
    f.toString = function (a, b, c) {
        if ("undefined" === typeof a)
            return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        "number" === typeof a && (c = b = a = "utf8");
        switch (a) {
            case "utf8": return this.toUTF8(b, c);
            case "base64": return this.toBase64(b, c);
            case "hex": return this.toHex(b, c);
            case "binary": return this.toBinary(b, c);
            case "debug": return this.toDebug();
            case "columns": return this.m();
            default: throw Error("Unsupported encoding: " +
                a);
        }
    };
    var A = function () {
        for (var a = {}, b = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], c = [], d = 0, e = b.length; d < e; ++d)
            c[b[d]] = d;
        a.h = function (a, c) {
            for (var d, e; null !== (d = a());)
                c(b[d >> 2 & 63]), e = (d & 3) << 4, null !== (d = a()) ? (e |= d >> 4 & 15, c(b[(e | d >> 4 & 15) & 63]), e = (d & 15) << 2, null !== (d = a()) ? (c(b[(e | d >> 6 & 3) & 63]), c(b[d & 63])) : (c(b[e & 63]), c(61))) : (c(b[e & 63]),
                    c(61), c(61));
        };
        a.g = function (a, b) { function d(a) { throw Error("Illegal character code: " + a); } for (var e, f, g; null !== (e = a());)
            if (f = c[e], "undefined" === typeof f && d(e), null !== (e = a()) && (g = c[e], "undefined" === typeof g && d(e), b(f << 2 >>> 0 | (g & 48) >> 4), null !== (e = a()))) {
                f = c[e];
                if ("undefined" === typeof f)
                    if (61 === e)
                        break;
                    else
                        d(e);
                b((g & 15) << 4 >>> 0 | (f & 60) >> 2);
                if (null !== (e = a())) {
                    g = c[e];
                    if ("undefined" === typeof g)
                        if (61 === e)
                            break;
                        else
                            d(e);
                    b((f & 3) << 6 >>> 0 | g);
                }
            } };
        a.test = function (a) { return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(a); };
        return a;
    }();
    f.toBase64 = function (a, b) {
        "undefined" === typeof a && (a = this.offset);
        "undefined" === typeof b && (b = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        var c;
        A.h(function () { return a < b ? this.view[a++] : null; }.bind(this), c = s());
        return c();
    };
    g.fromBase64 = function (a, b, c) { if (!c) {
        if ("string" !== typeof a)
            throw TypeError("Illegal str: Not a string");
        if (0 !== a.length % 4)
            throw TypeError("Illegal str: Length not a multiple of 4");
    } var d = new g(a.length / 4 * 3, b, c), e = 0; A.g(m(a), function (a) { d.view[e++] = a; }); d.limit = e; return d; };
    g.btoa = function (a) { return g.fromBinary(a).toBase64(); };
    g.atob = function (a) { return g.fromBase64(a).toBinary(); };
    f.toBinary = function (a, b) {
        a = "undefined" === typeof a ? this.offset : a;
        b = "undefined" === typeof b ? this.limit : b;
        if (!this.noAssert) {
            if ("number" !==
                typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        if (a === b)
            return "";
        for (var c = [], d = []; a < b;)
            c.push(this.view[a++]), 1024 <= c.length && (d.push(String.fromCharCode.apply(String, c)), c = []);
        return d.join("") + String.fromCharCode.apply(String, c);
    };
    g.fromBinary = function (a, b, c) {
        if (!c &&
            "string" !== typeof a)
            throw TypeError("Illegal str: Not a string");
        for (var d = 0, e = a.length, f = new g(e, b, c); d < e;) {
            b = a.charCodeAt(d);
            if (!c && 255 < b)
                throw RangeError("Illegal charCode at " + d + ": 0 <= " + b + " <= 255");
            f.view[d++] = b;
        }
        f.limit = e;
        return f;
    };
    f.toDebug = function (a) {
        for (var b = -1, c = this.buffer.byteLength, d, e = "", f = "", g = ""; b < c;) {
            -1 !== b && (d = this.view[b], e = 16 > d ? e + ("0" + d.toString(16).toUpperCase()) : e + d.toString(16).toUpperCase(), a && (f += 32 < d && 127 > d ? String.fromCharCode(d) : "."));
            ++b;
            if (a && 0 < b && 0 === b % 16 && b !== c) {
                for (; 51 >
                    e.length;)
                    e += " ";
                g += e + f + "\n";
                e = f = "";
            }
            e = b === this.offset && b === this.limit ? e + (b === this.markedOffset ? "!" : "|") : b === this.offset ? e + (b === this.markedOffset ? "[" : "<") : b === this.limit ? e + (b === this.markedOffset ? "]" : ">") : e + (b === this.markedOffset ? "'" : a || 0 !== b && b !== c ? " " : "");
        }
        if (a && " " !== e) {
            for (; 51 > e.length;)
                e += " ";
            g += e + f + "\n";
        }
        return a ? g : e;
    };
    g.fromDebug = function (a, b, c) {
        var d = a.length;
        b = new g((d + 1) / 3 | 0, b, c);
        for (var e = 0, f = 0, h, k = !1, l = !1, q = !1, m = !1, r = !1; e < d;) {
            switch (h = a.charAt(e++)) {
                case "!":
                    if (!c) {
                        if (l || q || m) {
                            r = !0;
                            break;
                        }
                        l =
                            q = m = !0;
                    }
                    b.offset = b.markedOffset = b.limit = f;
                    k = !1;
                    break;
                case "|":
                    if (!c) {
                        if (l || m) {
                            r = !0;
                            break;
                        }
                        l = m = !0;
                    }
                    b.offset = b.limit = f;
                    k = !1;
                    break;
                case "[":
                    if (!c) {
                        if (l || q) {
                            r = !0;
                            break;
                        }
                        l = q = !0;
                    }
                    b.offset = b.markedOffset = f;
                    k = !1;
                    break;
                case "<":
                    if (!c) {
                        if (l) {
                            r = !0;
                            break;
                        }
                        l = !0;
                    }
                    b.offset = f;
                    k = !1;
                    break;
                case "]":
                    if (!c) {
                        if (m || q) {
                            r = !0;
                            break;
                        }
                        m = q = !0;
                    }
                    b.limit = b.markedOffset = f;
                    k = !1;
                    break;
                case ">":
                    if (!c) {
                        if (m) {
                            r = !0;
                            break;
                        }
                        m = !0;
                    }
                    b.limit = f;
                    k = !1;
                    break;
                case "'":
                    if (!c) {
                        if (q) {
                            r = !0;
                            break;
                        }
                        q = !0;
                    }
                    b.markedOffset = f;
                    k = !1;
                    break;
                case " ":
                    k = !1;
                    break;
                default:
                    if (!c &&
                        k) {
                        r = !0;
                        break;
                    }
                    h = parseInt(h + a.charAt(e++), 16);
                    if (!c && (isNaN(h) || 0 > h || 255 < h))
                        throw TypeError("Illegal str: Not a debug encoded string");
                    b.view[f++] = h;
                    k = !0;
            }
            if (r)
                throw TypeError("Illegal str: Invalid symbol at " + e);
        }
        if (!c) {
            if (!l || !m)
                throw TypeError("Illegal str: Missing offset or limit");
            if (f < b.buffer.byteLength)
                throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + f + " < " + d);
        }
        return b;
    };
    f.toHex = function (a, b) {
        a = "undefined" === typeof a ? this.offset : a;
        b = "undefined" === typeof b ? this.limit :
            b;
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        for (var c = Array(b - a), d; a < b;)
            d = this.view[a++], 16 > d ? c.push("0", d.toString(16)) : c.push(d.toString(16));
        return c.join("");
    };
    g.fromHex = function (a, b, c) {
        if (!c) {
            if ("string" !== typeof a)
                throw TypeError("Illegal str: Not a string");
            if (0 !== a.length % 2)
                throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var d = a.length;
        b = new g(d / 2 | 0, b);
        for (var e, f = 0, h = 0; f < d; f += 2) {
            e = parseInt(a.substring(f, f + 2), 16);
            if (!c && (!isFinite(e) || 0 > e || 255 < e))
                throw TypeError("Illegal str: Contains non-hex characters");
            b.view[h++] = e;
        }
        b.limit = h;
        return b;
    };
    var l = function () {
        var a = { j: 1114111, i: function (a, c) {
                var d = null;
                "number" === typeof a && (d = a, a = function () { return null; });
                for (; null !== d || null !== (d = a());)
                    128 > d ? c(d & 127) : (2048 > d ? c(d >> 6 & 31 | 192) : (65536 > d ? c(d >> 12 & 15 |
                        224) : (c(d >> 18 & 7 | 240), c(d >> 12 & 63 | 128)), c(d >> 6 & 63 | 128)), c(d & 63 | 128)), d = null;
            }, f: function (a, c) {
                function d(a) { a = a.slice(0, a.indexOf(null)); var b = Error(a.toString()); b.name = "TruncatedError"; b.bytes = a; throw b; }
                for (var e, f, g, k; null !== (e = a());)
                    if (0 === (e & 128))
                        c(e);
                    else if (192 === (e & 224))
                        null === (f = a()) && d([e, f]), c((e & 31) << 6 | f & 63);
                    else if (224 === (e & 240))
                        null !== (f = a()) && null !== (g = a()) || d([e, f, g]), c((e & 15) << 12 | (f & 63) << 6 | g & 63);
                    else if (240 === (e & 248))
                        null !== (f = a()) && null !== (g = a()) && null !== (k = a()) || d([e, f, g, k]), c((e &
                            7) << 18 | (f & 63) << 12 | (g & 63) << 6 | k & 63);
                    else
                        throw RangeError("Illegal starting byte: " + e);
            }, d: function (a, c) { for (var d, e = null; null !== (d = null !== e ? e : a());)
                55296 <= d && 57343 >= d && null !== (e = a()) && 56320 <= e && 57343 >= e ? (c(1024 * (d - 55296) + e - 56320 + 65536), e = null) : c(d); null !== e && c(e); }, e: function (a, c) { var d = null; "number" === typeof a && (d = a, a = function () { return null; }); for (; null !== d || null !== (d = a());)
                65535 >= d ? c(d) : (d -= 65536, c((d >> 10) + 55296), c(d % 1024 + 56320)), d = null; }, c: function (b, c) { a.d(b, function (b) { a.i(b, c); }); }, b: function (b, c) {
                a.f(b, function (b) { a.e(b, c); });
            }, k: function (a) { return 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4; }, l: function (a) { for (var c, d = 0; null !== (c = a());)
                d += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4; return d; }, a: function (b) { var c = 0, d = 0; a.d(b, function (a) { ++c; d += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4; }); return [c, d]; } };
        return a;
    }();
    f.toUTF8 = function (a, b) {
        "undefined" === typeof a && (a = this.offset);
        "undefined" === typeof b && (b = this.limit);
        if (!this.noAssert) {
            if ("number" !== typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            a >>>= 0;
            if ("number" !== typeof b ||
                0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            b >>>= 0;
            if (0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
        }
        var c;
        try {
            l.b(function () { return a < b ? this.view[a++] : null; }.bind(this), c = s());
        }
        catch (d) {
            if (a !== b)
                throw RangeError("Illegal range: Truncated data, " + a + " != " + b);
        }
        return c();
    };
    g.fromUTF8 = function (a, b, c) {
        if (!c && "string" !== typeof a)
            throw TypeError("Illegal str: Not a string");
        var d = new g(l.a(m(a), !0)[1], b, c), e = 0;
        l.c(m(a), function (a) {
            d.view[e++] =
                a;
        });
        d.limit = e;
        return d;
    };
    return g;
}
if ("function" === typeof define && define.amd)
    define(["Long"], u);
else if ("function" === typeof require && "object" === typeof module && module && module.exports) {
    var B = module, C, D;
    try {
        D = require("long");
    }
    catch (E) { }
    C = u(D);
    B.exports = C;
}
else
    (this.dcodeIO = this.dcodeIO || {}).ByteBuffer = u(this.dcodeIO.Long);
/*
 ProtoBuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/ProtoBuf.js for details
*/
(function (h, v) { "function" === typeof define && define.amd ? define(["ByteBuffer"], v) : "function" === typeof require && "object" === typeof module && module && module.exports ? module.exports = v(require("bytebuffer"), require) : (h.dcodeIO = h.dcodeIO || {}).ProtoBuf = v(h.dcodeIO.ByteBuffer); })(this, function (h, v) {
    var d = {};
    d.ByteBuffer = h;
    d.Long = h.Long || null;
    d.VERSION = "4.1.0";
    d.WIRE_TYPES = {};
    d.WIRE_TYPES.VARINT = 0;
    d.WIRE_TYPES.BITS64 = 1;
    d.WIRE_TYPES.LDELIM = 2;
    d.WIRE_TYPES.STARTGROUP = 3;
    d.WIRE_TYPES.ENDGROUP = 4;
    d.WIRE_TYPES.BITS32 = 5;
    d.PACKABLE_WIRE_TYPES = [d.WIRE_TYPES.VARINT, d.WIRE_TYPES.BITS64, d.WIRE_TYPES.BITS32];
    d.TYPES = { int32: { name: "int32", wireType: d.WIRE_TYPES.VARINT, defaultValue: 0 }, uint32: { name: "uint32", wireType: d.WIRE_TYPES.VARINT, defaultValue: 0 }, sint32: { name: "sint32", wireType: d.WIRE_TYPES.VARINT, defaultValue: 0 }, int64: { name: "int64", wireType: d.WIRE_TYPES.VARINT, defaultValue: d.Long ? d.Long.ZERO : void 0 }, uint64: { name: "uint64", wireType: d.WIRE_TYPES.VARINT, defaultValue: d.Long ? d.Long.UZERO : void 0 }, sint64: { name: "sint64", wireType: d.WIRE_TYPES.VARINT,
            defaultValue: d.Long ? d.Long.ZERO : void 0 }, bool: { name: "bool", wireType: d.WIRE_TYPES.VARINT, defaultValue: !1 }, "double": { name: "double", wireType: d.WIRE_TYPES.BITS64, defaultValue: 0 }, string: { name: "string", wireType: d.WIRE_TYPES.LDELIM, defaultValue: "" }, bytes: { name: "bytes", wireType: d.WIRE_TYPES.LDELIM, defaultValue: null }, fixed32: { name: "fixed32", wireType: d.WIRE_TYPES.BITS32, defaultValue: 0 }, sfixed32: { name: "sfixed32", wireType: d.WIRE_TYPES.BITS32, defaultValue: 0 }, fixed64: { name: "fixed64", wireType: d.WIRE_TYPES.BITS64,
            defaultValue: d.Long ? d.Long.UZERO : void 0 }, sfixed64: { name: "sfixed64", wireType: d.WIRE_TYPES.BITS64, defaultValue: d.Long ? d.Long.ZERO : void 0 }, "float": { name: "float", wireType: d.WIRE_TYPES.BITS32, defaultValue: 0 }, "enum": { name: "enum", wireType: d.WIRE_TYPES.VARINT, defaultValue: 0 }, message: { name: "message", wireType: d.WIRE_TYPES.LDELIM, defaultValue: null }, group: { name: "group", wireType: d.WIRE_TYPES.STARTGROUP, defaultValue: null } };
    d.MAP_KEY_TYPES = [d.TYPES.int32, d.TYPES.sint32, d.TYPES.sfixed32, d.TYPES.uint32, d.TYPES.fixed32,
        d.TYPES.int64, d.TYPES.sint64, d.TYPES.sfixed64, d.TYPES.uint64, d.TYPES.fixed64, d.TYPES.bool, d.TYPES.string, d.TYPES.bytes];
    d.ID_MIN = 1;
    d.ID_MAX = 536870911;
    d.convertFieldsToCamelCase = !1;
    d.populateAccessors = !0;
    d.populateDefaults = !0;
    d.Util = function () {
        var b = {};
        b.IS_NODE = !("object" !== typeof process || "[object process]" !== process + "");
        b.XHR = function () {
            for (var b = [function () { return new XMLHttpRequest; }, function () { return new ActiveXObject("Msxml2.XMLHTTP"); }, function () { return new ActiveXObject("Msxml3.XMLHTTP"); }, function () { return new ActiveXObject("Microsoft.XMLHTTP"); }], d = null, h = 0; h < b.length; h++) {
                try {
                    d = b[h]();
                }
                catch (l) {
                    continue;
                }
                break;
            }
            if (!d)
                throw Error("XMLHttpRequest is not supported");
            return d;
        };
        b.fetch = function (u, d) {
            d && "function" != typeof d && (d = null);
            if (b.IS_NODE)
                if (d)
                    b.require("fs").readFile(u, function (b, a) { b ? d(null) : d("" + a); });
                else
                    try {
                        return b.require("fs").readFileSync(u);
                    }
                    catch (h) {
                        return null;
                    }
            else {
                var l = b.XHR();
                l.open("GET", u, d ? !0 : !1);
                l.setRequestHeader("Accept", "text/plain");
                "function" === typeof l.overrideMimeType && l.overrideMimeType("text/plain");
                if (d)
                    l.onreadystatechange =
                        function () { 4 == l.readyState && (200 == l.status || 0 == l.status && "string" === typeof l.responseText ? d(l.responseText) : d(null)); }, 4 != l.readyState && l.send(null);
                else
                    return l.send(null), 200 == l.status || 0 == l.status && "string" === typeof l.responseText ? l.responseText : null;
            }
        };
        b.require = b.IS_NODE ? function (b) { return v(b); } : function (b) { throw Error("node require is not supported by this platform"); };
        b.toCamelCase = function (b) { return b.replace(/_([a-zA-Z])/g, function (b, d) { return d.toUpperCase(); }); };
        return b;
    }();
    d.Lang = { DELIM: /[\s\{\}=;\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/, TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/, NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/, TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/, TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/, FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/, NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/, NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/, NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/, NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/, ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/, NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/, WHITESPACE: /\s/, STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g, BOOL: /^(?:true|false)$/i };
    d.DotProto = function (b, d) {
        function h(c, b) {
            var a = -1, e = 1;
            "-" == c.charAt(0) && (e = -1, c = c.substring(1));
            if (d.NUMBER_DEC.test(c))
                a = parseInt(c);
            else if (d.NUMBER_HEX.test(c))
                a = parseInt(c.substring(2), 16);
            else if (d.NUMBER_OCT.test(c))
                a =
                    parseInt(c.substring(1), 8);
            else
                throw Error("illegal id value: " + (0 > e ? "-" : "") + c);
            a = e * a | 0;
            if (!b && 0 > a)
                throw Error("illegal id value: " + (0 > e ? "-" : "") + c);
            return a;
        }
        function n(c) {
            var b = 1;
            "-" == c.charAt(0) && (b = -1, c = c.substring(1));
            if (d.NUMBER_DEC.test(c))
                return b * parseInt(c, 10);
            if (d.NUMBER_HEX.test(c))
                return b * parseInt(c.substring(2), 16);
            if (d.NUMBER_OCT.test(c))
                return b * parseInt(c.substring(1), 8);
            if ("inf" === c)
                return Infinity * b;
            if ("nan" === c)
                return NaN;
            if (d.NUMBER_FLT.test(c))
                return b * parseFloat(c);
            throw Error("illegal number value: " +
                (0 > b ? "-" : "") + c);
        }
        var l = {}, m = function (c) { this.source = "" + c; this.index = 0; this.line = 1; this.stack = []; this.readingString = !1; this.stringEndsWith = '"'; }, a = m.prototype;
        a._readString = function () { d.STRING.lastIndex = this.index - 1; var c; if (null !== (c = d.STRING.exec(this.source)))
            return c = "undefined" !== typeof c[1] ? c[1] : c[2], this.index = d.STRING.lastIndex, this.stack.push(this.stringEndsWith), c; throw Error("Unterminated string at line " + this.line + ", index " + this.index); };
        a.next = function () {
            if (0 < this.stack.length)
                return this.stack.shift();
            if (this.index >= this.source.length)
                return null;
            if (this.readingString)
                return this.readingString = !1, this._readString();
            var c, b;
            do {
                for (c = !1; d.WHITESPACE.test(b = this.source.charAt(this.index));)
                    if (this.index++, "\n" === b && this.line++, this.index === this.source.length)
                        return null;
                if ("/" === this.source.charAt(this.index))
                    if ("/" === this.source.charAt(++this.index)) {
                        for (; "\n" !== this.source.charAt(this.index);)
                            if (this.index++, this.index == this.source.length)
                                return null;
                        this.index++;
                        this.line++;
                        c = !0;
                    }
                    else if ("*" ===
                        this.source.charAt(this.index)) {
                        for (b = ""; "*/" !== b + (b = this.source.charAt(this.index));)
                            if (this.index++, "\n" === b && this.line++, this.index === this.source.length)
                                return null;
                        this.index++;
                        c = !0;
                    }
                    else
                        throw Error("Unterminated comment at line " + this.line + ": /" + this.source.charAt(this.index));
            } while (c);
            if (this.index === this.source.length)
                return null;
            c = this.index;
            d.DELIM.lastIndex = 0;
            if (d.DELIM.test(this.source.charAt(c)))
                ++c;
            else
                for (++c; c < this.source.length && !d.DELIM.test(this.source.charAt(c));)
                    c++;
            c = this.source.substring(this.index, this.index = c);
            '"' === c ? (this.readingString = !0, this.stringEndsWith = '"') : "'" === c && (this.readingString = !0, this.stringEndsWith = "'");
            return c;
        };
        a.peek = function () { if (0 === this.stack.length) {
            var c = this.next();
            if (null === c)
                return null;
            this.stack.push(c);
        } return this.stack[0]; };
        a.skip = function (c) { var b = this.next(); if (b !== c)
            throw Error("illegal '" + b + "', '" + c + "' expected"); };
        a.omit = function (b) { this.peek() === b && this.next(); };
        a.toString = function () {
            return "Tokenizer(" + this.index + "/" + this.source.length + " at line " + this.line +
                ")";
        };
        l.Tokenizer = m;
        var a = function (b) { this.tn = new m(b); }, e = a.prototype;
        e.parse = function () {
            var b = { name: "[ROOT]", "package": null, messages: [], enums: [], imports: [], options: {}, services: [] }, a, e = !0;
            try {
                for (; a = this.tn.next();)
                    switch (a) {
                        case "package":
                            if (!e || null !== b["package"])
                                throw Error("unexpected 'package'");
                            a = this.tn.next();
                            if (!d.TYPEREF.test(a))
                                throw Error("illegal package name: " + a);
                            this.tn.skip(";");
                            b["package"] = a;
                            break;
                        case "import":
                            if (!e)
                                throw Error("unexpected 'import'");
                            a = this.tn.peek();
                            "public" ===
                                a && this.tn.next();
                            a = this._readString();
                            this.tn.skip(";");
                            b.imports.push(a);
                            break;
                        case "syntax":
                            if (!e)
                                throw Error("unexpected 'syntax'");
                            this.tn.skip("=");
                            b.syntax = this._readString();
                            this.tn.skip(";");
                            break;
                        case "message":
                            this._parseMessage(b, null);
                            e = !1;
                            break;
                        case "enum":
                            this._parseEnum(b);
                            e = !1;
                            break;
                        case "option":
                            this._parseOption(b);
                            break;
                        case "service":
                            this._parseService(b);
                            break;
                        case "extend":
                            this._parseExtend(b);
                            break;
                        default: throw Error("unexpected '" + a + "'");
                    }
            }
            catch (f) {
                throw f.message = "Parse error at line " +
                    this.tn.line + ": " + f.message, f;
            }
            delete b.name;
            return b;
        };
        e._readString = function () { var b = "", a; do {
            a = this.tn.next();
            if ("'" !== a && '"' !== a)
                throw this.Error("illegal string delimiter: " + a);
            b += this.tn.next();
            this.tn.skip(a);
            a = this.tn.peek();
        } while ('"' === a || '"' === a); return b; };
        e._readValue = function (b) {
            var a = this.tn.peek();
            if ('"' === a || "'" === a)
                return this._readString();
            this.tn.next();
            if (d.NUMBER.test(a))
                return n(a);
            if (d.BOOL.test(a))
                return "true" === a;
            if (b && d.TYPEREF.test(a))
                return a;
            throw Error("illegal value: " +
                a);
        };
        e._parseOption = function (b, a) { var e = this.tn.next(), f = !1; "(" === e && (f = !0, e = this.tn.next()); if (!d.TYPEREF.test(e))
            throw Error("illegal option name: " + e); var g = e; f && (this.tn.skip(")"), g = "(" + g + ")", e = this.tn.peek(), d.FQTYPEREF.test(e) && (g += e, this.tn.next())); this.tn.skip("="); b.options[g] = this._readValue(!0); a || this.tn.skip(";"); };
        e._parseService = function (b) {
            var a = this.tn.next();
            if (!d.NAME.test(a))
                throw Error("Illegal service name at line " + this.tn.line + ": " + a);
            var e = { name: a, rpc: {}, options: {} };
            for (this.tn.skip("{"); "}" !==
                (a = this.tn.next());)
                if ("option" === a)
                    this._parseOption(e);
                else if ("rpc" === a)
                    this._parseServiceRPC(e);
                else
                    throw Error("illegal service token: " + a);
            this.tn.omit(";");
            b.services.push(e);
        };
        e._parseServiceRPC = function (b) {
            var a = this.tn.next();
            if (!d.NAME.test(a))
                throw Error("illegal rpc service method name: " + a);
            var e = a, f = { request: null, response: null, request_stream: !1, response_stream: !1, options: {} };
            this.tn.skip("(");
            a = this.tn.next();
            "stream" === a.toLowerCase() && (f.request_stream = !0, a = this.tn.next());
            if (!d.TYPEREF.test(a))
                throw Error("illegal rpc service request type: " +
                    a);
            f.request = a;
            this.tn.skip(")");
            a = this.tn.next();
            if ("returns" !== a.toLowerCase())
                throw Error("illegal rpc service request type delimiter: " + a);
            this.tn.skip("(");
            a = this.tn.next();
            "stream" === a.toLowerCase() && (f.response_stream = !0, a = this.tn.next());
            f.response = a;
            this.tn.skip(")");
            a = this.tn.peek();
            if ("{" === a) {
                for (this.tn.next(); "}" !== (a = this.tn.next());)
                    if ("option" === a)
                        this._parseOption(f);
                    else
                        throw Error("illegal rpc service token: " + a);
                this.tn.omit(";");
            }
            else
                this.tn.skip(";");
            "undefined" === typeof b.rpc &&
                (b.rpc = {});
            b.rpc[e] = f;
        };
        e._parseMessage = function (b, a) {
            var e = !!a, f = this.tn.next(), g = { name: "", fields: [], enums: [], messages: [], options: {}, oneofs: {} };
            if (!d.NAME.test(f))
                throw Error("Illegal " + (e ? "group" : "message") + " name: " + f);
            g.name = f;
            e && (this.tn.skip("="), a.id = h(this.tn.next()), g.isGroup = !0);
            f = this.tn.peek();
            "[" === f && a && this._parseFieldOptions(a);
            for (this.tn.skip("{"); "}" !== (f = this.tn.next());)
                if (d.RULE.test(f))
                    this._parseMessageField(g, f);
                else if ("oneof" === f)
                    this._parseMessageOneOf(g);
                else if ("enum" ===
                    f)
                    this._parseEnum(g);
                else if ("message" === f)
                    this._parseMessage(g);
                else if ("option" === f)
                    this._parseOption(g);
                else if ("extensions" === f)
                    this._parseExtensions(g);
                else if ("extend" === f)
                    this._parseExtend(g);
                else if (d.TYPEREF.test(f))
                    this._parseMessageField(g, "optional", f);
                else
                    throw Error("illegal message token: " + f);
            this.tn.omit(";");
            b.messages.push(g);
            return g;
        };
        e._parseMessageField = function (b, a, e) {
            if (!d.RULE.test(a))
                throw Error("illegal message field rule: " + a);
            var f = { rule: a, type: "", name: "", options: {},
                id: 0 };
            if ("map" === a) {
                if (e)
                    throw Error("illegal type: " + e);
                this.tn.skip("<");
                a = this.tn.next();
                if (!d.TYPE.test(a) && !d.TYPEREF.test(a))
                    throw Error("illegal message field type: " + a);
                f.keytype = a;
                this.tn.skip(",");
                a = this.tn.next();
                if (!d.TYPE.test(a) && !d.TYPEREF.test(a))
                    throw Error("Illegal message field: " + a);
                f.type = a;
                this.tn.skip(">");
                a = this.tn.next();
                if (!d.NAME.test(a))
                    throw Error("illegal message field name: " + a);
                f.name = a;
                this.tn.skip("=");
                f.id = h(this.tn.next());
                a = this.tn.peek();
                "[" === a && this._parseFieldOptions(f);
                this.tn.skip(";");
            }
            else if (e = "undefined" !== typeof e ? e : this.tn.next(), "group" === e) {
                a = this._parseMessage(b, f);
                if (!/^[A-Z]/.test(a.name))
                    throw Error("illegal group name: " + a.name);
                f.type = a.name;
                f.name = a.name.toLowerCase();
                this.tn.omit(";");
            }
            else {
                if (!d.TYPE.test(e) && !d.TYPEREF.test(e))
                    throw Error("illegal message field type: " + e);
                f.type = e;
                a = this.tn.next();
                if (!d.NAME.test(a))
                    throw Error("illegal message field name: " + a);
                f.name = a;
                this.tn.skip("=");
                f.id = h(this.tn.next());
                a = this.tn.peek();
                "[" === a && this._parseFieldOptions(f);
                this.tn.skip(";");
            }
            b.fields.push(f);
            return f;
        };
        e._parseMessageOneOf = function (a) { var b = this.tn.next(); if (!d.NAME.test(b))
            throw Error("illegal oneof name: " + b); var e = b, f = []; for (this.tn.skip("{"); "}" !== (b = this.tn.next());)
            b = this._parseMessageField(a, "optional", b), b.oneof = e, f.push(b.id); this.tn.omit(";"); a.oneofs[e] = f; };
        e._parseFieldOptions = function (a) { this.tn.skip("["); for (var b = !0; "]" !== this.tn.peek();)
            b || this.tn.skip(","), this._parseOption(a, !0), b = !1; this.tn.next(); };
        e._parseEnum = function (a) {
            var b = { name: "",
                values: [], options: {} }, e = this.tn.next();
            if (!d.NAME.test(e))
                throw Error("illegal name: " + e);
            b.name = e;
            for (this.tn.skip("{"); "}" !== (e = this.tn.next());)
                if ("option" === e)
                    this._parseOption(b);
                else {
                    if (!d.NAME.test(e))
                        throw Error("illegal name: " + e);
                    this.tn.skip("=");
                    var f = { name: e, id: h(this.tn.next(), !0) }, e = this.tn.peek();
                    "[" === e && this._parseFieldOptions({ options: {} });
                    this.tn.skip(";");
                    b.values.push(f);
                }
            this.tn.omit(";");
            a.enums.push(b);
        };
        e._parseExtensions = function (a) {
            var e = this.tn.next(), d = [];
            "min" === e ? d.push(b.ID_MIN) :
                "max" === e ? d.push(b.ID_MAX) : d.push(n(e));
            this.tn.skip("to");
            e = this.tn.next();
            "min" === e ? d.push(b.ID_MIN) : "max" === e ? d.push(b.ID_MAX) : d.push(n(e));
            this.tn.skip(";");
            a.extensions = d;
        };
        e._parseExtend = function (a) {
            var b = this.tn.next();
            if (!d.TYPEREF.test(b))
                throw Error("illegal extend reference: " + b);
            var e = { ref: b, fields: [] };
            for (this.tn.skip("{"); "}" !== (b = this.tn.next());)
                if (d.RULE.test(b))
                    this._parseMessageField(e, b);
                else if (d.TYPEREF.test(b))
                    this._parseMessageField(e, "optional", b);
                else
                    throw Error("illegal extend token: " +
                        b);
            this.tn.omit(";");
            a.messages.push(e);
            return e;
        };
        e.toString = function () { return "Parser at line " + this.tn.line; };
        l.Parser = a;
        return l;
    }(d, d.Lang);
    d.Reflect = function (b) {
        function d(k, a) {
            if (k && "number" === typeof k.low && "number" === typeof k.high && "boolean" === typeof k.unsigned && k.low === k.low && k.high === k.high)
                return new b.Long(k.low, k.high, "undefined" === typeof a ? k.unsigned : a);
            if ("string" === typeof k)
                return b.Long.fromString(k, a || !1, 10);
            if ("number" === typeof k)
                return b.Long.fromNumber(k, a || !1);
            throw Error("not convertible to Long");
        }
        function r(k, a) {
            var c = a.readVarint32(), e = c & 7, c = c >>> 3;
            switch (e) {
                case b.WIRE_TYPES.VARINT:
                    do
                        c = a.readUint8();
                    while (128 === (c & 128));
                    break;
                case b.WIRE_TYPES.BITS64:
                    a.offset += 8;
                    break;
                case b.WIRE_TYPES.LDELIM:
                    c = a.readVarint32();
                    a.offset += c;
                    break;
                case b.WIRE_TYPES.STARTGROUP:
                    r(c, a);
                    break;
                case b.WIRE_TYPES.ENDGROUP:
                    if (c === k)
                        return !1;
                    throw Error("Illegal GROUPEND after unknown group: " + c + " (" + k + " expected)");
                case b.WIRE_TYPES.BITS32:
                    a.offset += 4;
                    break;
                default: throw Error("Illegal wire type in unknown group " +
                    k + ": " + e);
            }
            return !0;
        }
        var n = {}, l = function (a, b, c) { this.builder = a; this.parent = b; this.name = c; }, m = l.prototype;
        m.fqn = function () { var a = this.name, b = this; do {
            b = b.parent;
            if (null == b)
                break;
            a = b.name + "." + a;
        } while (1); return a; };
        m.toString = function (a) { return (a ? this.className + " " : "") + this.fqn(); };
        m.build = function () { throw Error(this.toString(!0) + " cannot be built directly"); };
        n.T = l;
        var a = function (a, b, c, e, d) { l.call(this, a, b, c); this.className = "Namespace"; this.children = []; this.options = e || {}; this.syntax = d || "proto2"; }, m = a.prototype =
            Object.create(l.prototype);
        m.getChildren = function (a) { a = a || null; if (null == a)
            return this.children.slice(); for (var b = [], c = 0, e = this.children.length; c < e; ++c)
            this.children[c] instanceof a && b.push(this.children[c]); return b; };
        m.addChild = function (a) {
            var b;
            if (b = this.getChild(a.name))
                if (b instanceof q.Field && b.name !== b.originalName && null === this.getChild(b.originalName))
                    b.name = b.originalName;
                else if (a instanceof q.Field && a.name !== a.originalName && null === this.getChild(a.originalName))
                    a.name = a.originalName;
                else
                    throw Error("Duplicate name in namespace " +
                        this.toString(!0) + ": " + a.name);
            this.children.push(a);
        };
        m.getChild = function (a) { for (var b = "number" === typeof a ? "id" : "name", c = 0, e = this.children.length; c < e; ++c)
            if (this.children[c][b] === a)
                return this.children[c]; return null; };
        m.resolve = function (a, b) {
            var c = "string" === typeof a ? a.split(".") : a, e = this, d = 0;
            if ("" === c[d]) {
                for (; null !== e.parent;)
                    e = e.parent;
                d++;
            }
            do {
                do {
                    if (!(e instanceof n.Namespace)) {
                        e = null;
                        break;
                    }
                    e = e.getChild(c[d]);
                    if (!(e && e instanceof n.T) || b && !(e instanceof n.Namespace)) {
                        e = null;
                        break;
                    }
                    d++;
                } while (d < c.length);
                if (null != e)
                    break;
                if (null !== this.parent)
                    return this.parent.resolve(a, b);
            } while (null != e);
            return e;
        };
        m.qn = function (a) { var b = [], c = a; do
            b.unshift(c.name), c = c.parent;
        while (null !== c); for (c = 1; c <= b.length; c++) {
            var e = b.slice(b.length - c);
            if (a === this.resolve(e, a instanceof n.Namespace))
                return e.join(".");
        } return a.fqn(); };
        m.build = function () {
            for (var b = {}, c = this.children, e = 0, d = c.length, f; e < d; ++e)
                f = c[e], f instanceof a && (b[f.name] = f.build());
            Object.defineProperty && Object.defineProperty(b, "$options", { value: this.buildOpt() });
            return b;
        };
        m.buildOpt = function () { for (var a = {}, b = Object.keys(this.options), c = 0, e = b.length; c < e; ++c)
            a[b[c]] = this.options[b[c]]; return a; };
        m.getOption = function (a) { return "undefined" === typeof a ? this.options : "undefined" !== typeof this.options[a] ? this.options[a] : null; };
        n.Namespace = a;
        var e = function (a, c, e, d) { this.type = a; this.resolvedType = c; this.isMapKey = e; this.syntax = d; if (e && 0 > b.MAP_KEY_TYPES.indexOf(a))
            throw Error("Invalid map key type: " + a.name); }, c = e.prototype;
        c.defaultFieldValue = function (a) {
            "string" === typeof a &&
                (a = b.TYPES[a]);
            if ("undefined" === typeof a.defaultValue)
                throw Error("default value for type " + a.name + " is not supported");
            return a == b.TYPES.bytes ? new h(0) : a.defaultValue;
        };
        c.verifyValue = function (a) {
            var c = function (a, b) { throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + a + " (" + b + ")"); }.bind(this);
            switch (this.type) {
                case b.TYPES.int32:
                case b.TYPES.sint32:
                case b.TYPES.sfixed32: return ("number" !== typeof a || a === a && 0 !== a % 1) && c(typeof a, "not an integer"), 4294967295 < a ? a | 0 : a;
                case b.TYPES.uint32:
                case b.TYPES.fixed32: return ("number" !==
                    typeof a || a === a && 0 !== a % 1) && c(typeof a, "not an integer"), 0 > a ? a >>> 0 : a;
                case b.TYPES.int64:
                case b.TYPES.sint64:
                case b.TYPES.sfixed64: if (b.Long)
                    try {
                        return d(a, !1);
                    }
                    catch (e) {
                        c(typeof a, e.message);
                    }
                else
                    c(typeof a, "requires Long.js");
                case b.TYPES.uint64:
                case b.TYPES.fixed64: if (b.Long)
                    try {
                        return d(a, !0);
                    }
                    catch (f) {
                        c(typeof a, f.message);
                    }
                else
                    c(typeof a, "requires Long.js");
                case b.TYPES.bool: return "boolean" !== typeof a && c(typeof a, "not a boolean"), a;
                case b.TYPES["float"]:
                case b.TYPES["double"]: return "number" !== typeof a &&
                    c(typeof a, "not a number"), a;
                case b.TYPES.string: return "string" === typeof a || a && a instanceof String || c(typeof a, "not a string"), "" + a;
                case b.TYPES.bytes: return h.isByteBuffer(a) ? a : h.wrap(a, "base64");
                case b.TYPES["enum"]:
                    for (var g = this.resolvedType.getChildren(b.Reflect.Enum.Value), t = 0; t < g.length; t++)
                        if (g[t].name == a || g[t].id == a)
                            return g[t].id;
                    if ("proto3" === this.syntax)
                        return ("number" !== typeof a || a === a && 0 !== a % 1) && c(typeof a, "not an integer"), (4294967295 < a || 0 > a) && c(typeof a, "not in range for uint32"),
                            a;
                    c(a, "not a valid enum value");
                case b.TYPES.group:
                case b.TYPES.message:
                    a && "object" === typeof a || c(typeof a, "object expected");
                    if (a instanceof this.resolvedType.clazz)
                        return a;
                    if (a instanceof b.Builder.Message) {
                        var c = {}, t;
                        for (t in a)
                            a.hasOwnProperty(t) && (c[t] = a[t]);
                        a = c;
                    }
                    return new this.resolvedType.clazz(a);
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + a + " (undefined type " + this.type + ")");
        };
        c.calculateLength = function (a, c) {
            if (null === c)
                return 0;
            var e;
            switch (this.type) {
                case b.TYPES.int32: return 0 >
                    c ? h.calculateVarint64(c) : h.calculateVarint32(c);
                case b.TYPES.uint32: return h.calculateVarint32(c);
                case b.TYPES.sint32: return h.calculateVarint32(h.zigZagEncode32(c));
                case b.TYPES.fixed32:
                case b.TYPES.sfixed32:
                case b.TYPES["float"]: return 4;
                case b.TYPES.int64:
                case b.TYPES.uint64: return h.calculateVarint64(c);
                case b.TYPES.sint64: return h.calculateVarint64(h.zigZagEncode64(c));
                case b.TYPES.fixed64:
                case b.TYPES.sfixed64: return 8;
                case b.TYPES.bool: return 1;
                case b.TYPES["enum"]: return h.calculateVarint32(c);
                case b.TYPES["double"]: return 8;
                case b.TYPES.string: return e = h.calculateUTF8Bytes(c), h.calculateVarint32(e) + e;
                case b.TYPES.bytes:
                    if (0 > c.remaining())
                        throw Error("Illegal value for " + this.toString(!0) + ": " + c.remaining() + " bytes remaining");
                    return h.calculateVarint32(c.remaining()) + c.remaining();
                case b.TYPES.message: return e = this.resolvedType.calculate(c), h.calculateVarint32(e) + e;
                case b.TYPES.group: return e = this.resolvedType.calculate(c), e + h.calculateVarint32(a << 3 | b.WIRE_TYPES.ENDGROUP);
            }
            throw Error("[INTERNAL] Illegal value to encode in " +
                this.toString(!0) + ": " + c + " (unknown type)");
        };
        c.encodeValue = function (a, c, e) {
            if (null === c)
                return e;
            switch (this.type) {
                case b.TYPES.int32:
                    0 > c ? e.writeVarint64(c) : e.writeVarint32(c);
                    break;
                case b.TYPES.uint32:
                    e.writeVarint32(c);
                    break;
                case b.TYPES.sint32:
                    e.writeVarint32ZigZag(c);
                    break;
                case b.TYPES.fixed32:
                    e.writeUint32(c);
                    break;
                case b.TYPES.sfixed32:
                    e.writeInt32(c);
                    break;
                case b.TYPES.int64:
                case b.TYPES.uint64:
                    e.writeVarint64(c);
                    break;
                case b.TYPES.sint64:
                    e.writeVarint64ZigZag(c);
                    break;
                case b.TYPES.fixed64:
                    e.writeUint64(c);
                    break;
                case b.TYPES.sfixed64:
                    e.writeInt64(c);
                    break;
                case b.TYPES.bool:
                    "string" === typeof c ? e.writeVarint32("false" === c.toLowerCase() ? 0 : !!c) : e.writeVarint32(c ? 1 : 0);
                    break;
                case b.TYPES["enum"]:
                    e.writeVarint32(c);
                    break;
                case b.TYPES["float"]:
                    e.writeFloat32(c);
                    break;
                case b.TYPES["double"]:
                    e.writeFloat64(c);
                    break;
                case b.TYPES.string:
                    e.writeVString(c);
                    break;
                case b.TYPES.bytes:
                    if (0 > c.remaining())
                        throw Error("Illegal value for " + this.toString(!0) + ": " + c.remaining() + " bytes remaining");
                    a = c.offset;
                    e.writeVarint32(c.remaining());
                    e.append(c);
                    c.offset = a;
                    break;
                case b.TYPES.message:
                    a = (new h).LE();
                    this.resolvedType.encode(c, a);
                    e.writeVarint32(a.offset);
                    e.append(a.flip());
                    break;
                case b.TYPES.group:
                    this.resolvedType.encode(c, e);
                    e.writeVarint32(a << 3 | b.WIRE_TYPES.ENDGROUP);
                    break;
                default: throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + c + " (unknown type)");
            }
            return e;
        };
        c.decode = function (a, c, e) {
            if (c != this.type.wireType)
                throw Error("Unexpected wire type for element");
            switch (this.type) {
                case b.TYPES.int32: return a.readVarint32() |
                    0;
                case b.TYPES.uint32: return a.readVarint32() >>> 0;
                case b.TYPES.sint32: return a.readVarint32ZigZag() | 0;
                case b.TYPES.fixed32: return a.readUint32() >>> 0;
                case b.TYPES.sfixed32: return a.readInt32() | 0;
                case b.TYPES.int64: return a.readVarint64();
                case b.TYPES.uint64: return a.readVarint64().toUnsigned();
                case b.TYPES.sint64: return a.readVarint64ZigZag();
                case b.TYPES.fixed64: return a.readUint64();
                case b.TYPES.sfixed64: return a.readInt64();
                case b.TYPES.bool: return !!a.readVarint32();
                case b.TYPES["enum"]: return a.readVarint32();
                case b.TYPES["float"]: return a.readFloat();
                case b.TYPES["double"]: return a.readDouble();
                case b.TYPES.string: return a.readVString();
                case b.TYPES.bytes:
                    e = a.readVarint32();
                    if (a.remaining() < e)
                        throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + e + " required but got only " + a.remaining());
                    c = a.clone();
                    c.limit = c.offset + e;
                    a.offset += e;
                    return c;
                case b.TYPES.message: return e = a.readVarint32(), this.resolvedType.decode(a, e);
                case b.TYPES.group: return this.resolvedType.decode(a, -1, e);
            }
            throw Error("[INTERNAL] Illegal decode type");
        };
        c.valueFromString = function (a) { if (!this.isMapKey)
            throw Error("valueFromString() called on non-map-key element"); switch (this.type) {
            case b.TYPES.int32:
            case b.TYPES.sint32:
            case b.TYPES.sfixed32:
            case b.TYPES.uint32:
            case b.TYPES.fixed32: return this.verifyValue(parseInt(a));
            case b.TYPES.int64:
            case b.TYPES.sint64:
            case b.TYPES.sfixed64:
            case b.TYPES.uint64:
            case b.TYPES.fixed64: return this.verifyValue(a);
            case b.TYPES.bool: return "true" === a;
            case b.TYPES.string: return this.verifyValue(a);
            case b.TYPES.bytes: return h.fromBinary(a);
        } };
        c.valueToString = function (a) { if (!this.isMapKey)
            throw Error("valueToString() called on non-map-key element"); return this.type === b.TYPES.bytes ? a.toString("binary") : a.toString(); };
        n.Element = e;
        var q = function (c, e, d, f, g, t) { a.call(this, c, e, d, f, t); this.className = "Message"; this.extensions = [b.ID_MIN, b.ID_MAX]; this.clazz = null; this.isGroup = !!g; this._fieldsByName = this._fieldsById = this._fields = null; }, c = q.prototype = Object.create(a.prototype);
        c.build = function (a) {
            if (this.clazz && !a)
                return this.clazz;
            a = function (a, b) {
                function c(b, e, d, k, p) {
                    var f = void 0;
                    if (null === b || "object" !== typeof b) {
                        if (k == a.TYPES["enum"]) {
                            e = p.getChildren(a.Reflect.Enum.Value);
                            for (var g = 0; g < e.length; g++)
                                if (e[g].id === b) {
                                    b = e[g].name;
                                    break;
                                }
                        }
                        f = b;
                    }
                    else if (h.isByteBuffer(b))
                        f = e ? b.toBase64() : b.toBuffer();
                    else if (Array.isArray(b))
                        for (f = [], g = 0; g < b.length; g++)
                            f.push(c(b[g], e, d, k, p));
                    else if (b instanceof a.Map)
                        for (g = b.entries(), f = {}, k = g.next(); !k.done; k = g.next())
                            f[b.keyElem.valueToString(k.value[0])] = c(k.value[1], e, d, b.valueElem.type, b.valueElem.resolvedType);
                    else if (b instanceof
                        a.Long)
                        f = d ? b.toString() : new a.Long(b);
                    else
                        for (g in f = {}, k = b.$type, p = void 0, b)
                            if (b.hasOwnProperty(g)) {
                                var s = b[g];
                                k && (p = k.getChild(g));
                                f[g] = c(s, e, d, p.type, p.resolvedType);
                            }
                    return f;
                }
                var e = b.getChildren(a.Reflect.Message.Field), d = b.getChildren(a.Reflect.Message.OneOf), k = function (c, p) {
                    a.Builder.Message.call(this);
                    for (var f = 0, g = d.length; f < g; ++f)
                        this[d[f].name] = null;
                    f = 0;
                    for (g = e.length; f < g; ++f) {
                        var s = e[f];
                        this[s.name] = s.repeated ? [] : s.map ? new a.Map(s) : null;
                        !s.required && "proto3" !== b.syntax || null === s.defaultValue ||
                            (this[s.name] = s.defaultValue);
                    }
                    if (0 < arguments.length)
                        if (1 !== arguments.length || null === c || "object" !== typeof c || !("function" !== typeof c.encode || c instanceof k) || Array.isArray(c) || c instanceof a.Map || h.isByteBuffer(c) || c instanceof ArrayBuffer || a.Long && c instanceof a.Long)
                            for (f = 0, g = arguments.length; f < g; ++f)
                                "undefined" !== typeof (s = arguments[f]) && this.$set(e[f].name, s);
                        else
                            this.$set(c);
                }, p = k.prototype = Object.create(a.Builder.Message.prototype);
                p.add = function (c, e, d) {
                    var k = b._fieldsByName[c];
                    if (!d) {
                        if (!k)
                            throw Error(this +
                                "#" + c + " is undefined");
                        if (!(k instanceof a.Reflect.Message.Field))
                            throw Error(this + "#" + c + " is not a field: " + k.toString(!0));
                        if (!k.repeated)
                            throw Error(this + "#" + c + " is not a repeated field");
                        e = k.verifyValue(e, !0);
                    }
                    null === this[c] && (this[c] = []);
                    this[c].push(e);
                    return this;
                };
                p.$add = p.add;
                p.set = function (c, e, d) {
                    if (c && "object" === typeof c) {
                        d = e;
                        for (var k in c)
                            c.hasOwnProperty(k) && "undefined" !== typeof (e = c[k]) && this.$set(k, e, d);
                        return this;
                    }
                    k = b._fieldsByName[c];
                    if (d)
                        this[c] = e;
                    else {
                        if (!k)
                            throw Error(this + "#" + c +
                                " is not a field: undefined");
                        if (!(k instanceof a.Reflect.Message.Field))
                            throw Error(this + "#" + c + " is not a field: " + k.toString(!0));
                        this[k.name] = e = k.verifyValue(e);
                    }
                    k && k.oneof && (null !== e ? (null !== this[k.oneof.name] && (this[this[k.oneof.name]] = null), this[k.oneof.name] = k.name) : k.oneof.name === c && (this[k.oneof.name] = null));
                    return this;
                };
                p.$set = p.set;
                p.get = function (c, e) {
                    if (e)
                        return this[c];
                    var d = b._fieldsByName[c];
                    if (!(d && d instanceof a.Reflect.Message.Field))
                        throw Error(this + "#" + c + " is not a field: undefined");
                    if (!(d instanceof a.Reflect.Message.Field))
                        throw Error(this + "#" + c + " is not a field: " + d.toString(!0));
                    return this[d.name];
                };
                p.$get = p.get;
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    g instanceof a.Reflect.Message.ExtensionField || b.builder.options.populateAccessors && function (a) {
                        var c = a.originalName.replace(/(_[a-zA-Z])/g, function (a) { return a.toUpperCase().replace("_", ""); }), c = c.substring(0, 1).toUpperCase() + c.substring(1), e = a.originalName.replace(/([A-Z])/g, function (a) { return "_" + a; }), d = function (b, c) {
                            this[a.name] =
                                c ? b : a.verifyValue(b);
                            return this;
                        }, k = function () { return this[a.name]; };
                        null === b.getChild("set" + c) && (p["set" + c] = d);
                        null === b.getChild("set_" + e) && (p["set_" + e] = d);
                        null === b.getChild("get" + c) && (p["get" + c] = k);
                        null === b.getChild("get_" + e) && (p["get_" + e] = k);
                    }(g);
                }
                p.encode = function (a, c) { "boolean" === typeof a && (c = a, a = void 0); var e = !1; a || (a = new h, e = !0); var d = a.littleEndian; try {
                    return b.encode(this, a.LE(), c), (e ? a.flip() : a).LE(d);
                }
                catch (k) {
                    throw a.LE(d), k;
                } };
                k.encode = function (a, b, c) { return (new k(a)).encode(b, c); };
                p.calculate =
                    function () { return b.calculate(this); };
                p.encodeDelimited = function (a) { var c = !1; a || (a = new h, c = !0); var e = (new h).LE(); b.encode(this, e).flip(); a.writeVarint32(e.remaining()); a.append(e); return c ? a.flip() : a; };
                p.encodeAB = function () { try {
                    return this.encode().toArrayBuffer();
                }
                catch (a) {
                    throw a.encoded && (a.encoded = a.encoded.toArrayBuffer()), a;
                } };
                p.toArrayBuffer = p.encodeAB;
                p.encodeNB = function () { try {
                    return this.encode().toBuffer();
                }
                catch (a) {
                    throw a.encoded && (a.encoded = a.encoded.toBuffer()), a;
                } };
                p.toBuffer = p.encodeNB;
                p.encode64 = function () { try {
                    return this.encode().toBase64();
                }
                catch (a) {
                    throw a.encoded && (a.encoded = a.encoded.toBase64()), a;
                } };
                p.toBase64 = p.encode64;
                p.encodeHex = function () { try {
                    return this.encode().toHex();
                }
                catch (a) {
                    throw a.encoded && (a.encoded = a.encoded.toHex()), a;
                } };
                p.toHex = p.encodeHex;
                p.toRaw = function (b, e) { return c(this, !!b, !!e, a.TYPES.message, this.$type); };
                p.encodeJSON = function () { return JSON.stringify(c(this, !0, !0, a.TYPES.message, this.$type)); };
                k.decode = function (a, c) {
                    "string" === typeof a && (a = h.wrap(a, c ?
                        c : "base64"));
                    a = h.isByteBuffer(a) ? a : h.wrap(a);
                    var e = a.littleEndian;
                    try {
                        var d = b.decode(a.LE());
                        a.LE(e);
                        return d;
                    }
                    catch (k) {
                        throw a.LE(e), k;
                    }
                };
                k.decodeDelimited = function (a, c) { "string" === typeof a && (a = h.wrap(a, c ? c : "base64")); a = h.isByteBuffer(a) ? a : h.wrap(a); if (1 > a.remaining())
                    return null; var e = a.offset, d = a.readVarint32(); if (a.remaining() < d)
                    return a.offset = e, null; try {
                    var k = b.decode(a.slice(a.offset, a.offset + d).LE());
                    a.offset += d;
                    return k;
                }
                catch (p) {
                    throw a.offset += d, p;
                } };
                k.decode64 = function (a) {
                    return k.decode(a, "base64");
                };
                k.decodeHex = function (a) { return k.decode(a, "hex"); };
                k.decodeJSON = function (a) { return new k(JSON.parse(a)); };
                p.toString = function () { return b.toString(); };
                Object.defineProperty && (Object.defineProperty(k, "$options", { value: b.buildOpt() }), Object.defineProperty(p, "$options", { value: k.$options }), Object.defineProperty(k, "$type", { value: b }), Object.defineProperty(p, "$type", { value: b }));
                return k;
            }(b, this);
            this._fields = [];
            this._fieldsById = {};
            this._fieldsByName = {};
            for (var c = 0, e = this.children.length, d; c < e; c++)
                if (d =
                    this.children[c], d instanceof f || d instanceof q || d instanceof y) {
                    if (a.hasOwnProperty(d.name))
                        throw Error("Illegal reflect child of " + this.toString(!0) + ": " + d.toString(!0) + " cannot override static property '" + d.name + "'");
                    a[d.name] = d.build();
                }
                else if (d instanceof q.Field)
                    d.build(), this._fields.push(d), this._fieldsById[d.id] = d, this._fieldsByName[d.name] = d;
                else if (!(d instanceof q.OneOf || d instanceof g))
                    throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[c].toString(!0));
            return this.clazz =
                a;
        };
        c.encode = function (a, b, c) { for (var e = null, d, f = 0, g = this._fields.length, q; f < g; ++f)
            d = this._fields[f], q = a[d.name], d.required && null === q ? null === e && (e = d) : d.encode(c ? q : d.verifyValue(q), b); if (null !== e)
            throw a = Error("Missing at least one required field for " + this.toString(!0) + ": " + e), a.encoded = b, a; return b; };
        c.calculate = function (a) {
            for (var b = 0, c = 0, e = this._fields.length, d, f; c < e; ++c) {
                d = this._fields[c];
                f = a[d.name];
                if (d.required && null === f)
                    throw Error("Missing at least one required field for " + this.toString(!0) +
                        ": " + d);
                b += d.calculate(f);
            }
            return b;
        };
        c.decode = function (a, c, e) {
            c = "number" === typeof c ? c : -1;
            for (var d = a.offset, f = new this.clazz, g, q, l; a.offset < d + c || -1 === c && 0 < a.remaining();) {
                g = a.readVarint32();
                q = g & 7;
                l = g >>> 3;
                if (q === b.WIRE_TYPES.ENDGROUP) {
                    if (l !== e)
                        throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + l + " (" + (e ? e + " expected" : "not a group") + ")");
                    break;
                }
                if (g = this._fieldsById[l])
                    g.repeated && !g.options.packed ? f[g.name].push(g.decode(q, a)) : g.map ? (q = g.decode(q, a), f[g.name].set(q[0], q[1])) : (f[g.name] =
                        g.decode(q, a), g.oneof && (null !== this[g.oneof.name] && (this[this[g.oneof.name]] = null), f[g.oneof.name] = g.name));
                else
                    switch (q) {
                        case b.WIRE_TYPES.VARINT:
                            a.readVarint32();
                            break;
                        case b.WIRE_TYPES.BITS32:
                            a.offset += 4;
                            break;
                        case b.WIRE_TYPES.BITS64:
                            a.offset += 8;
                            break;
                        case b.WIRE_TYPES.LDELIM:
                            g = a.readVarint32();
                            a.offset += g;
                            break;
                        case b.WIRE_TYPES.STARTGROUP:
                            for (; r(l, a);)
                                ;
                            break;
                        default: throw Error("Illegal wire type for unknown field " + l + " in " + this.toString(!0) + "#decode: " + q);
                    }
            }
            a = 0;
            for (c = this._fields.length; a <
                c; ++a)
                if (g = this._fields[a], null === f[g.name]) {
                    if (g.required)
                        throw a = Error("Missing at least one required field for " + this.toString(!0) + ": " + g.name), a.decoded = f, a;
                    b.populateDefaults && null !== g.defaultValue && (f[g.name] = g.defaultValue);
                }
            return f;
        };
        n.Message = q;
        var w = function (a, c, e, d, f, g, m, u, h, r) {
            l.call(this, a, c, g);
            this.className = "Message.Field";
            this.required = "required" === e;
            this.repeated = "repeated" === e;
            this.map = "map" === e;
            this.keyType = d || null;
            this.type = f;
            this.resolvedType = null;
            this.id = m;
            this.options = u || {};
            this.defaultValue = null;
            this.oneof = h || null;
            this.syntax = r || "proto2";
            this.originalName = this.name;
            this.keyElement = this.element = null;
            !this.builder.options.convertFieldsToCamelCase || this instanceof q.ExtensionField || (this.name = b.Util.toCamelCase(this.name));
        }, c = w.prototype = Object.create(l.prototype);
        c.build = function () {
            this.element = new e(this.type, this.resolvedType, !1, this.syntax);
            this.map && (this.keyElement = new e(this.keyType, void 0, !0, this.syntax));
            this.defaultValue = "undefined" !== typeof this.options["default"] ?
                this.verifyValue(this.options["default"]) : null;
            "proto3" !== this.syntax || this.repeated || this.map || (this.defaultValue = this.element.defaultFieldValue(this.type));
        };
        c.verifyValue = function (a, c) {
            c = c || !1;
            var e = function (a, c) { throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + a + " (" + c + ")"); }.bind(this);
            if (null === a)
                return this.required && e(typeof a, "required"), "proto3" === this.syntax && this.type !== b.TYPES.message && e(typeof a, "proto3 field without field presence cannot be null"), null;
            if (this.repeated && !c) {
                Array.isArray(a) || (a = [a]);
                for (var d = [], e = 0; e < a.length; e++)
                    d.push(this.element.verifyValue(a[e]));
                return d;
            }
            if (this.map && !c) {
                if (a instanceof b.Map)
                    return a;
                a instanceof Object || e(typeof a, "expected ProtoBuf.Map or raw object for map field");
                return new b.Map(this, a);
            }
            !this.repeated && Array.isArray(a) && e(typeof a, "no array expected");
            return this.element.verifyValue(a);
        };
        c.hasWirePresence = function (a) {
            if ("proto3" !== this.syntax)
                return null !== a;
            switch (this.type) {
                case b.TYPES.int32:
                case b.TYPES.sint32:
                case b.TYPES.sfixed32:
                case b.TYPES.uint32:
                case b.TYPES.fixed32: return 0 !==
                    a;
                case b.TYPES.int64:
                case b.TYPES.sint64:
                case b.TYPES.sfixed64:
                case b.TYPES.uint64:
                case b.TYPES.fixed64: return 0 !== a.low || 0 !== a.high;
                case b.TYPES.bool: return a;
                case b.TYPES["float"]:
                case b.TYPES["double"]: return 0 !== a;
                case b.TYPES.string: return 0 < a.length;
                case b.TYPES.bytes: return 0 < a.remaining();
                case b.TYPES["enum"]: return 0 !== a;
                case b.TYPES.message: return null !== a;
                default: return !0;
            }
        };
        c.encode = function (a, c) {
            if (null === this.type || "object" !== typeof this.type)
                throw Error("[INTERNAL] Unresolved type in " +
                    this.toString(!0) + ": " + this.type);
            if (null === a || this.repeated && 0 == a.length)
                return c;
            try {
                if (this.repeated) {
                    var e;
                    if (this.options.packed && 0 <= b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                        c.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM);
                        c.ensureCapacity(c.offset += 1);
                        var d = c.offset;
                        for (e = 0; e < a.length; e++)
                            this.element.encodeValue(this.id, a[e], c);
                        var f = c.offset - d, g = h.calculateVarint32(f);
                        if (1 < g) {
                            var q = c.slice(d, c.offset), d = d + (g - 1);
                            c.offset = d;
                            c.append(q);
                        }
                        c.writeVarint32(f, d - g);
                    }
                    else
                        for (e = 0; e < a.length; e++)
                            c.writeVarint32(this.id <<
                                3 | this.type.wireType), this.element.encodeValue(this.id, a[e], c);
                }
                else
                    this.map ? a.forEach(function (a, e, d) { d = h.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, e) + h.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, a); c.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM); c.writeVarint32(d); c.writeVarint32(8 | this.keyType.wireType); this.keyElement.encodeValue(1, e, c); c.writeVarint32(16 | this.type.wireType); this.element.encodeValue(2, a, c); }, this) : this.hasWirePresence(a) &&
                        (c.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, a, c));
            }
            catch (l) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + a + " (" + l + ")");
            }
            return c;
        };
        c.calculate = function (a) {
            a = this.verifyValue(a);
            if (null === this.type || "object" !== typeof this.type)
                throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === a || this.repeated && 0 == a.length)
                return 0;
            var c = 0;
            try {
                if (this.repeated) {
                    var e, d;
                    if (this.options.packed && 0 <= b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                        c +=
                            h.calculateVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM);
                        for (e = d = 0; e < a.length; e++)
                            d += this.element.calculateLength(this.id, a[e]);
                        c += h.calculateVarint32(d);
                        c += d;
                    }
                    else
                        for (e = 0; e < a.length; e++)
                            c += h.calculateVarint32(this.id << 3 | this.type.wireType), c += this.element.calculateLength(this.id, a[e]);
                }
                else
                    this.map ? a.forEach(function (a, e, d) {
                        a = h.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, e) + h.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, a);
                        c += h.calculateVarint32(this.id <<
                            3 | b.WIRE_TYPES.LDELIM);
                        c += h.calculateVarint32(a);
                        c += a;
                    }, this) : this.hasWirePresence(a) && (c += h.calculateVarint32(this.id << 3 | this.type.wireType), c += this.element.calculateLength(this.id, a));
            }
            catch (f) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + a + " (" + f + ")");
            }
            return c;
        };
        c.decode = function (a, c, e) {
            if (!(!this.map && a == this.type.wireType || !e && this.repeated && this.options.packed && a == b.WIRE_TYPES.LDELIM || this.map && a == b.WIRE_TYPES.LDELIM))
                throw Error("Illegal wire type for field " + this.toString(!0) + ": " +
                    a + " (" + this.type.wireType + " expected)");
            if (a == b.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && 0 <= b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) && !e) {
                a = c.readVarint32();
                a = c.offset + a;
                for (e = []; c.offset < a;)
                    e.push(this.decode(this.type.wireType, c, !0));
                return e;
            }
            if (this.map) {
                var d = this.keyElement.defaultFieldValue(this.keyType);
                e = this.element.defaultFieldValue(this.type);
                a = c.readVarint32();
                if (c.remaining() < a)
                    throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + a + " required but got only " +
                        c.remaining());
                var f = c.clone();
                f.limit = f.offset + a;
                for (c.offset += a; 0 < f.remaining();)
                    if (c = f.readVarint32(), a = c & 7, c >>>= 3, 1 === c)
                        d = this.keyElement.decode(f, a, c);
                    else if (2 === c)
                        e = this.element.decode(f, a, c);
                    else
                        throw Error("Unexpected tag in map field key/value submessage");
                return [d, e];
            }
            return this.element.decode(c, a, this.id);
        };
        n.Message.Field = w;
        c = function (a, c, b, e, d, f, g) { w.call(this, a, c, b, null, e, d, f, g); };
        c.prototype = Object.create(w.prototype);
        n.Message.ExtensionField = c;
        n.Message.OneOf = function (a, c, b) {
            l.call(this, a, c, b);
            this.fields = [];
        };
        var f = function (c, b, e, d, f) { a.call(this, c, b, e, d, f); this.className = "Enum"; this.object = null; };
        (f.prototype = Object.create(a.prototype)).build = function () { for (var a = {}, c = this.getChildren(f.Value), b = 0, e = c.length; b < e; ++b)
            a[c[b].name] = c[b].id; Object.defineProperty && Object.defineProperty(a, "$options", { value: this.buildOpt() }); return this.object = a; };
        n.Enum = f;
        c = function (a, c, b, e) { l.call(this, a, c, b); this.className = "Enum.Value"; this.id = e; };
        c.prototype = Object.create(l.prototype);
        n.Enum.Value = c;
        var g = function (a, c, b, e) { l.call(this, a, c, b); this.field = e; };
        g.prototype = Object.create(l.prototype);
        n.Extension = g;
        var y = function (c, b, e, d) { a.call(this, c, b, e, d); this.className = "Service"; this.clazz = null; };
        (y.prototype = Object.create(a.prototype)).build = function (a) {
            return this.clazz && !a ? this.clazz : this.clazz = function (a, c) {
                for (var b = function (c) {
                    a.Builder.Service.call(this);
                    this.rpcImpl = c || function (a, c, b) {
                        setTimeout(b.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
                    };
                }, e = b.prototype = Object.create(a.Builder.Service.prototype), d = c.getChildren(a.Reflect.Service.RPCMethod), f = 0; f < d.length; f++)
                    (function (a) {
                        e[a.name] = function (b, e) {
                            try {
                                try {
                                    b = a.resolvedRequestType.clazz.decode(h.wrap(b));
                                }
                                catch (d) {
                                    if (!(d instanceof TypeError))
                                        throw d;
                                }
                                b && b instanceof a.resolvedRequestType.clazz ? this.rpcImpl(a.fqn(), b, function (b, d) {
                                    if (b)
                                        e(b);
                                    else {
                                        try {
                                            d = a.resolvedResponseType.clazz.decode(d);
                                        }
                                        catch (f) { }
                                        d && d instanceof a.resolvedResponseType.clazz ? e(null, d) : e(Error("Illegal response type received in service method " +
                                            c.name + "#" + a.name));
                                    }
                                }) : setTimeout(e.bind(this, Error("Illegal request type provided to service method " + c.name + "#" + a.name)), 0);
                            }
                            catch (f) {
                                setTimeout(e.bind(this, f), 0);
                            }
                        };
                        b[a.name] = function (c, e, d) { (new b(c))[a.name](e, d); };
                        Object.defineProperty && (Object.defineProperty(b[a.name], "$options", { value: a.buildOpt() }), Object.defineProperty(e[a.name], "$options", { value: b[a.name].$options }));
                    })(d[f]);
                Object.defineProperty && (Object.defineProperty(b, "$options", { value: c.buildOpt() }), Object.defineProperty(e, "$options", { value: b.$options }), Object.defineProperty(b, "$type", { value: c }), Object.defineProperty(e, "$type", { value: c }));
                return b;
            }(b, this);
        };
        n.Service = y;
        var x = function (a, c, b, e) { l.call(this, a, c, b); this.className = "Service.Method"; this.options = e || {}; };
        (x.prototype = Object.create(l.prototype)).buildOpt = m.buildOpt;
        n.Service.Method = x;
        m = function (a, c, b, e, d, f, g, q) {
            x.call(this, a, c, b, q);
            this.className = "Service.RPCMethod";
            this.requestName = e;
            this.responseName = d;
            this.requestStream = f;
            this.responseStream = g;
            this.resolvedResponseType =
                this.resolvedRequestType = null;
        };
        m.prototype = Object.create(x.prototype);
        n.Service.RPCMethod = m;
        return n;
    }(d);
    d.Builder = function (b, d, h) {
        function n(a, b) { b.syntax = a; b.messages && b.messages.forEach(function (c) { n(a, c); }); b.enums && b.enums.forEach(function (c) { n(a, c); }); }
        var l = function (a) { this.ptr = this.ns = new h.Namespace(this, null, ""); this.resolved = !1; this.result = null; this.files = {}; this.importRoot = null; this.options = a || {}; }, m = l.prototype;
        m.reset = function () { this.ptr = this.ns; };
        m.define = function (a) {
            if ("string" !== typeof a ||
                !d.TYPEREF.test(a))
                throw Error("Illegal package: " + a);
            a = a.split(".");
            var b, c;
            for (b = 0; b < a.length; b++)
                if (!d.NAME.test(a[b]))
                    throw Error("Illegal package: " + a[b]);
            for (b = 0; b < a.length; b++)
                c = this.ptr.getChild(a[b]), null === c && this.ptr.addChild(c = new h.Namespace(this, this.ptr, a[b])), this.ptr = c;
            return this;
        };
        l.isValidMessage = function (a) {
            if ("string" !== typeof a.name || !d.NAME.test(a.name) || "undefined" !== typeof a.values || "undefined" !== typeof a.rpc)
                return !1;
            var b;
            if ("undefined" !== typeof a.fields) {
                if (!Array.isArray(a.fields))
                    return !1;
                var c = [], q;
                for (b = 0; b < a.fields.length; b++) {
                    if (!l.isValidMessageField(a.fields[b]))
                        return !1;
                    q = parseInt(a.fields[b].id, 10);
                    if (0 <= c.indexOf(q))
                        return !1;
                    c.push(q);
                }
            }
            if ("undefined" !== typeof a.enums) {
                if (!Array.isArray(a.enums))
                    return !1;
                for (b = 0; b < a.enums.length; b++)
                    if (!l.isValidEnum(a.enums[b]))
                        return !1;
            }
            if ("undefined" !== typeof a.messages) {
                if (!Array.isArray(a.messages))
                    return !1;
                for (b = 0; b < a.messages.length; b++)
                    if (!l.isValidMessage(a.messages[b]) && !l.isValidExtend(a.messages[b]))
                        return !1;
            }
            if ("undefined" !== typeof a.extensions &&
                (!Array.isArray(a.extensions) || 2 !== a.extensions.length || "number" !== typeof a.extensions[0] || "number" !== typeof a.extensions[1]))
                return !1;
            if ("proto3" === a.syntax) {
                for (b = 0; b < a.fields.length; b++) {
                    c = a.fields[b];
                    if ("required" === c.rule || c["default"])
                        return !1;
                    if (c.options)
                        for (c = Object.keys(c.options), q = 0; q < c.length; q++)
                            if ("default" === c[q])
                                return !1;
                }
                if (a.extensions)
                    return !1;
            }
            return !0;
        };
        l.isValidMessageField = function (a) {
            if ("string" !== typeof a.rule || "string" !== typeof a.name || "string" !== typeof a.type || "undefined" ===
                typeof a.id || !(d.RULE.test(a.rule) && d.NAME.test(a.name) && d.TYPEREF.test(a.type) && d.ID.test("" + a.id)))
                return !1;
            if ("undefined" !== typeof a.options) {
                if ("object" !== typeof a.options)
                    return !1;
                for (var b = Object.keys(a.options), c = 0, q; c < b.length; c++)
                    if ("string" !== typeof (q = b[c]) || "string" !== typeof a.options[q] && "number" !== typeof a.options[q] && "boolean" !== typeof a.options[q])
                        return !1;
            }
            return !0;
        };
        l.isValidEnum = function (a) {
            if ("string" !== typeof a.name || !d.NAME.test(a.name) || "undefined" === typeof a.values || !Array.isArray(a.values) ||
                0 == a.values.length)
                return !1;
            for (var b = 0; b < a.values.length; b++)
                if ("object" != typeof a.values[b] || "string" !== typeof a.values[b].name || "undefined" === typeof a.values[b].id || !d.NAME.test(a.values[b].name) || !d.NEGID.test("" + a.values[b].id))
                    return !1;
            return "proto3" === a.syntax && 0 !== a.values[0].id ? !1 : !0;
        };
        m.create = function (a) {
            if (!a)
                return this;
            if (Array.isArray(a)) {
                if (0 === a.length)
                    return this;
                a = a.slice();
            }
            else
                a = [a];
            var e = [];
            for (e.push(a); 0 < e.length;) {
                a = e.pop();
                if (Array.isArray(a))
                    for (; 0 < a.length;) {
                        var c = a.shift();
                        if (l.isValidMessage(c)) {
                            var d = new h.Message(this, this.ptr, c.name, c.options, c.isGroup, c.syntax), m = {};
                            if (c.oneofs)
                                for (var f = Object.keys(c.oneofs), g = 0, u = f.length; g < u; ++g)
                                    d.addChild(m[f[g]] = new h.Message.OneOf(this, d, f[g]));
                            if (c.fields && 0 < c.fields.length)
                                for (g = 0, u = c.fields.length; g < u; ++g) {
                                    f = c.fields[g];
                                    if (null !== d.getChild(f.id))
                                        throw Error("Duplicate field id in message " + d.name + ": " + f.id);
                                    if (f.options)
                                        for (var n = Object.keys(f.options), k = 0, p = n.length; k < p; ++k) {
                                            if ("string" !== typeof n[k])
                                                throw Error("Illegal field option name in message " +
                                                    d.name + "#" + f.name + ": " + n[k]);
                                            if ("string" !== typeof f.options[n[k]] && "number" !== typeof f.options[n[k]] && "boolean" !== typeof f.options[n[k]])
                                                throw Error("Illegal field option value in message " + d.name + "#" + f.name + "#" + n[k] + ": " + f.options[n[k]]);
                                        }
                                    n = null;
                                    if ("string" === typeof f.oneof && (n = m[f.oneof], "undefined" === typeof n))
                                        throw Error("Illegal oneof in message " + d.name + "#" + f.name + ": " + f.oneof);
                                    f = new h.Message.Field(this, d, f.rule, f.keytype, f.type, f.name, f.id, f.options, n, c.syntax);
                                    n && n.fields.push(f);
                                    d.addChild(f);
                                }
                            m =
                                [];
                            if ("undefined" !== typeof c.enums && 0 < c.enums.length)
                                for (g = 0; g < c.enums.length; g++)
                                    m.push(c.enums[g]);
                            if (c.messages && 0 < c.messages.length)
                                for (g = 0; g < c.messages.length; g++)
                                    m.push(c.messages[g]);
                            if (c.services && 0 < c.services.length)
                                for (g = 0; g < c.services.length; g++)
                                    m.push(c.services[g]);
                            c.extensions && (d.extensions = c.extensions, d.extensions[0] < b.ID_MIN && (d.extensions[0] = b.ID_MIN), d.extensions[1] > b.ID_MAX && (d.extensions[1] = b.ID_MAX));
                            this.ptr.addChild(d);
                            0 < m.length && (e.push(a), a = m, this.ptr = d);
                        }
                        else if (l.isValidEnum(c)) {
                            d =
                                new h.Enum(this, this.ptr, c.name, c.options, c.syntax);
                            for (g = 0; g < c.values.length; g++)
                                d.addChild(new h.Enum.Value(this, d, c.values[g].name, c.values[g].id));
                            this.ptr.addChild(d);
                        }
                        else if (l.isValidService(c)) {
                            d = new h.Service(this, this.ptr, c.name, c.options);
                            for (g in c.rpc)
                                c.rpc.hasOwnProperty(g) && d.addChild(new h.Service.RPCMethod(this, d, g, c.rpc[g].request, c.rpc[g].response, !!c.rpc[g].request_stream, !!c.rpc[g].response_stream, c.rpc[g].options));
                            this.ptr.addChild(d);
                        }
                        else if (l.isValidExtend(c))
                            if (d = this.ptr.resolve(c.ref, !0))
                                for (g = 0; g < c.fields.length; g++) {
                                    if (null !== d.getChild(c.fields[g].id))
                                        throw Error("Duplicate extended field id in message " + d.name + ": " + c.fields[g].id);
                                    if (c.fields[g].id < d.extensions[0] || c.fields[g].id > d.extensions[1])
                                        throw Error("Illegal extended field id in message " + d.name + ": " + c.fields[g].id + " (" + d.extensions.join(" to ") + " expected)");
                                    m = c.fields[g].name;
                                    this.options.convertFieldsToCamelCase && (m = b.Util.toCamelCase(c.fields[g].name));
                                    f = new h.Message.ExtensionField(this, d, c.fields[g].rule, c.fields[g].type, this.ptr.fqn() + "." + m, c.fields[g].id, c.fields[g].options);
                                    m = new h.Extension(this, this.ptr, c.fields[g].name, f);
                                    f.extension = m;
                                    this.ptr.addChild(m);
                                    d.addChild(f);
                                }
                            else {
                                if (!/\.?google\.protobuf\./.test(c.ref))
                                    throw Error("Extended message " + c.ref + " is not defined");
                            }
                        else
                            throw Error("Not a valid definition: " + JSON.stringify(c));
                    }
                else
                    throw Error("Not a valid namespace: " + JSON.stringify(a));
                this.ptr = this.ptr.parent;
            }
            this.resolved = !1;
            this.result = null;
            return this;
        };
        m["import"] = function (a, e) {
            if ("string" === typeof e) {
                b.Util.IS_NODE &&
                    (e = b.Util.require("path").resolve(e));
                if (!0 === this.files[e])
                    return this.reset(), this;
                this.files[e] = !0;
            }
            else if ("object" === typeof e) {
                var c = e.root;
                b.Util.IS_NODE && (c = b.Util.require("path").resolve(c));
                var d = "/";
                if (0 <= c.indexOf("\\") || 0 <= e.file.indexOf("\\"))
                    d = "\\";
                d = [c, e.file].join(d);
                if (!0 === this.files[d])
                    return this.reset(), this;
                this.files[d] = !0;
            }
            if (a.imports && 0 < a.imports.length) {
                var d = "/", m = !1;
                if ("object" === typeof e) {
                    if (this.importRoot = e.root, m = !0, c = this.importRoot, e = e.file, 0 <= c.indexOf("\\") || 0 <=
                        e.indexOf("\\"))
                        d = "\\";
                }
                else
                    "string" === typeof e ? this.importRoot ? c = this.importRoot : 0 <= e.indexOf("/") ? (c = e.replace(/\/[^\/]*$/, ""), "" === c && (c = "/")) : 0 <= e.indexOf("\\") ? (c = e.replace(/\\[^\\]*$/, ""), d = "\\") : c = "." : c = null;
                for (var f = 0; f < a.imports.length; f++)
                    if ("string" === typeof a.imports[f]) {
                        if (!c)
                            throw Error("Cannot determine import root: File name is unknown");
                        var g = a.imports[f];
                        if ("google/protobuf/descriptor.proto" !== g && (g = c + d + g, !0 !== this.files[g])) {
                            /\.proto$/i.test(g) && !b.DotProto && (g = g.replace(/\.proto$/, ".json"));
                            var l = b.Util.fetch(g);
                            if (null === l)
                                throw Error("Failed to import '" + g + "' in '" + e + "': File not found");
                            if (/\.json$/i.test(g))
                                this["import"](JSON.parse(l + ""), g);
                            else
                                this["import"]((new b.DotProto.Parser(l + "")).parse(), g);
                        }
                    }
                    else if (e)
                        if (/\.(\w+)$/.test(e))
                            this["import"](a.imports[f], e.replace(/^(.+)\.(\w+)$/, function (a, c, b) { return c + "_import" + f + "." + b; }));
                        else
                            this["import"](a.imports[f], e + "_import" + f);
                    else
                        this["import"](a.imports[f]);
                m && (this.importRoot = null);
            }
            a["package"] && this.define(a["package"]);
            a.syntax && n(a.syntax, a);
            var h = this.ptr;
            a.options && Object.keys(a.options).forEach(function (c) { h.options[c] = a.options[c]; });
            a.messages && (this.create(a.messages), this.ptr = h);
            a.enums && (this.create(a.enums), this.ptr = h);
            a.services && (this.create(a.services), this.ptr = h);
            a["extends"] && this.create(a["extends"]);
            this.reset();
            return this;
        };
        l.isValidService = function (a) { return !("string" !== typeof a.name || !d.NAME.test(a.name) || "object" !== typeof a.rpc); };
        l.isValidExtend = function (a) {
            if ("string" !== typeof a.ref || !d.TYPEREF.test(a.ref))
                return !1;
            var b;
            if ("undefined" !== typeof a.fields) {
                if (!Array.isArray(a.fields))
                    return !1;
                var c = [], m;
                for (b = 0; b < a.fields.length; b++) {
                    if (!l.isValidMessageField(a.fields[b]))
                        return !1;
                    m = parseInt(a.id, 10);
                    if (0 <= c.indexOf(m))
                        return !1;
                    c.push(m);
                }
            }
            return !0;
        };
        m.resolveAll = function () {
            var a;
            if (null != this.ptr && "object" !== typeof this.ptr.type) {
                if (this.ptr instanceof h.Namespace) {
                    a = this.ptr.children;
                    for (var e = 0, c = a.length; e < c; ++e)
                        this.ptr = a[e], this.resolveAll();
                }
                else if (this.ptr instanceof h.Message.Field) {
                    if (d.TYPE.test(this.ptr.type))
                        this.ptr.type =
                            b.TYPES[this.ptr.type];
                    else {
                        if (!d.TYPEREF.test(this.ptr.type))
                            throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        a = (this.ptr instanceof h.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0);
                        if (!a)
                            throw Error("Unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.resolvedType = a;
                        if (a instanceof h.Enum) {
                            if (this.ptr.type = b.TYPES["enum"], "proto3" === this.ptr.syntax && "proto3" !== a.syntax)
                                throw Error("Proto3 message refers to proto2 enum; this is not allowed due to differing enum semantics in proto3");
                        }
                        else if (a instanceof h.Message)
                            this.ptr.type = a.isGroup ? b.TYPES.group : b.TYPES.message;
                        else
                            throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    }
                    if (this.ptr.map) {
                        if (!d.TYPE.test(this.ptr.keyType))
                            throw Error("Illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.keyType = b.TYPES[this.ptr.keyType];
                    }
                }
                else if (!(this.ptr instanceof b.Reflect.Enum.Value))
                    if (this.ptr instanceof b.Reflect.Service.Method)
                        if (this.ptr instanceof b.Reflect.Service.RPCMethod) {
                            a =
                                this.ptr.parent.resolve(this.ptr.requestName, !0);
                            if (!(a && a instanceof b.Reflect.Message))
                                throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                            this.ptr.resolvedRequestType = a;
                            a = this.ptr.parent.resolve(this.ptr.responseName, !0);
                            if (!(a && a instanceof b.Reflect.Message))
                                throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                            this.ptr.resolvedResponseType = a;
                        }
                        else
                            throw Error("Illegal service type in " + this.ptr.toString(!0));
                    else if (!(this.ptr instanceof
                        b.Reflect.Message.OneOf || this.ptr instanceof b.Reflect.Extension))
                        throw Error("Illegal object in namespace: " + typeof this.ptr + ":" + this.ptr);
                this.reset();
            }
        };
        m.build = function (a) { this.reset(); this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null); null === this.result && (this.result = this.ns.build()); if (a) {
            a = "string" === typeof a ? a.split(".") : a;
            for (var b = this.result, c = 0; c < a.length; c++)
                if (b[a[c]])
                    b = b[a[c]];
                else {
                    b = null;
                    break;
                }
            return b;
        } return this.result; };
        m.lookup = function (a, b) {
            return a ? this.ns.resolve(a, b) : this.ns;
        };
        m.toString = function () { return "Builder"; };
        l.Message = function () { };
        l.Service = function () { };
        return l;
    }(d, d.Lang, d.Reflect);
    d.Map = function (b, d) {
        function h(b) { var a = 0; return { next: function () { return a < b.length ? { done: !1, value: b[a++] } : { done: !0 }; } }; }
        var n = function (b, a) {
            if (!b.map)
                throw Error("field is not a map");
            this.field = b;
            this.keyElem = new d.Element(b.keyType, null, !0, b.syntax);
            this.valueElem = new d.Element(b.type, b.resolvedType, !1, b.syntax);
            this.map = {};
            Object.defineProperty(this, "size", { get: function () { return Object.keys(this.map).length; } });
            if (a)
                for (var e = Object.keys(a), c = 0; c < e.length; c++) {
                    var h = this.keyElem.valueFromString(e[c]), l = this.valueElem.verifyValue(a[e[c]]);
                    this.map[this.keyElem.valueToString(h)] = { key: h, value: l };
                }
        }, l = n.prototype;
        l.clear = function () { this.map = {}; };
        l["delete"] = function (b) { b = this.keyElem.valueToString(this.keyElem.verifyValue(b)); var a = b in this.map; delete this.map[b]; return a; };
        l.entries = function () { for (var b = [], a = Object.keys(this.map), d = 0, c; d < a.length; d++)
            b.push([(c = this.map[a[d]]).key, c.value]); return h(b); };
        l.keys =
            function () { for (var b = [], a = Object.keys(this.map), d = 0; d < a.length; d++)
                b.push(this.map[a[d]].key); return h(b); };
        l.values = function () { for (var b = [], a = Object.keys(this.map), d = 0; d < a.length; d++)
            b.push(this.map[a[d]].value); return h(b); };
        l.forEach = function (b, a) { for (var d = Object.keys(this.map), c = 0, h; c < d.length; c++)
            b.call(a, (h = this.map[d[c]]).value, h.key, this); };
        l.set = function (b, a) { var d = this.keyElem.verifyValue(b), c = this.valueElem.verifyValue(a); this.map[this.keyElem.valueToString(d)] = { key: d, value: c }; return this; };
        l.get = function (b) { b = this.keyElem.valueToString(this.keyElem.verifyValue(b)); return b in this.map ? this.map[b].value : void 0; };
        l.has = function (b) { return this.keyElem.valueToString(this.keyElem.verifyValue(b)) in this.map; };
        return n;
    }(d, d.Reflect);
    d.loadProto = function (b, h, r) { if ("string" === typeof h || h && "string" === typeof h.file && "string" === typeof h.root)
        r = h, h = void 0; return d.loadJson((new d.DotProto.Parser(b)).parse(), h, r); };
    d.protoFromString = d.loadProto;
    d.loadProtoFile = function (b, h, r) {
        h && "object" === typeof h ?
            (r = h, h = null) : h && "function" === typeof h || (h = null);
        if (h)
            return d.Util.fetch("string" === typeof b ? b : b.root + "/" + b.file, function (l) { if (null === l)
                h(Error("Failed to fetch file"));
            else
                try {
                    h(null, d.loadProto(l, r, b));
                }
                catch (m) {
                    h(m);
                } });
        var n = d.Util.fetch("object" === typeof b ? b.root + "/" + b.file : b);
        return null === n ? null : d.loadProto(n, r, b);
    };
    d.protoFromFile = d.loadProtoFile;
    d.newBuilder = function (b) {
        b = b || {};
        "undefined" === typeof b.convertFieldsToCamelCase && (b.convertFieldsToCamelCase = d.convertFieldsToCamelCase);
        "undefined" ===
            typeof b.populateAccessors && (b.populateAccessors = d.populateAccessors);
        return new d.Builder(b);
    };
    d.loadJson = function (b, h, r) { if ("string" === typeof h || h && "string" === typeof h.file && "string" === typeof h.root)
        r = h, h = null; h && "object" === typeof h || (h = d.newBuilder()); "string" === typeof b && (b = JSON.parse(b)); h["import"](b, r); h.resolveAll(); return h; };
    d.loadJsonFile = function (b, h, r) {
        h && "object" === typeof h ? (r = h, h = null) : h && "function" === typeof h || (h = null);
        if (h)
            return d.Util.fetch("string" === typeof b ? b : b.root + "/" + b.file, function (l) { if (null === l)
                h(Error("Failed to fetch file"));
            else
                try {
                    h(null, d.loadJson(JSON.parse(l), r, b));
                }
                catch (m) {
                    h(m);
                } });
        var n = d.Util.fetch("object" === typeof b ? b.root + "/" + b.file : b);
        return null === n ? null : d.loadJson(JSON.parse(n), r, b);
    };
    return d;
});
