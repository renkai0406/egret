//--------------------------------------------------
// <auto-generated>
//      本文件由《纳米娱乐-游戏编辑器-数据工具》自动生成
//      源文件： TigerDragon.xlsx
// </auto-generated>
//--------------------------------------------------
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TigerDragonConfig = (function (_super) {
    __extends(TigerDragonConfig, _super);
    function TigerDragonConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TigerDragonConfig.prototype, "Name", {
        /**战场名*/
        get: function () { return this.Get("Name"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "AddExp", {
        /**获胜功勋值奖励*/
        get: function () { return this.Get("AddExp"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "SubExp", {
        /**失败功勋值减少*/
        get: function () { return this.Get("SubExp"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "AwardExp", {
        /**固定功勋值奖励*/
        get: function () { return this.Get("AwardExp"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "AddEnergy", {
        /**获胜积攒能量值*/
        get: function () { return this.Get("AddEnergy"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "FailEnergy", {
        /**失败积攒能量值*/
        get: function () { return this.Get("FailEnergy"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "Cost", {
        /**出征费用*/
        get: function () { return this.Get("Cost"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "MinCondition", {
        /**进入下限*/
        get: function () { return this.Get("MinCondition"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TigerDragonConfig.prototype, "MaxCondition", {
        /**进入上限*/
        get: function () { return this.Get("MaxCondition"); },
        enumerable: true,
        configurable: true
    });
    return TigerDragonConfig;
}(ConfigDataBase));
__reflect(TigerDragonConfig.prototype, "TigerDragonConfig");
