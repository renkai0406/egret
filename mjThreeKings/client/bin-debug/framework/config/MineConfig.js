//--------------------------------------------------
// <auto-generated>
//      本文件由《纳米娱乐-游戏编辑器-数据工具》自动生成
//      源文件： Mine.xlsx
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
var MineConfig = (function (_super) {
    __extends(MineConfig, _super);
    function MineConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MineConfig.prototype, "Name", {
        /**矿区名*/
        get: function () { return this.Get("Name"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "Unlock", {
        /**解锁方式*/
        get: function () { return this.Get("Unlock"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "Level", {
        /**解锁等级*/
        get: function () { return this.Get("Level"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "Level_1", {
        /**魔晶解锁*/
        get: function () { return this.Get("Level_1"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "ItemType", {
        /**最低保底收益类型*/
        get: function () { return this.Get("ItemType"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "MinItemCount", {
        /**最低保底收益数量*/
        get: function () { return this.Get("MinItemCount"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "MaxItemCount", {
        /**最高保底收益数量*/
        get: function () { return this.Get("MaxItemCount"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "ExtraItemType", {
        /**最低额外收益类型*/
        get: function () { return this.Get("ExtraItemType"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "MinRate", {
        /**最低额外收益*/
        get: function () { return this.Get("MinRate"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineConfig.prototype, "MaxRate", {
        /**最高额外收益*/
        get: function () { return this.Get("MaxRate"); },
        enumerable: true,
        configurable: true
    });
    return MineConfig;
}(ConfigDataBase));
__reflect(MineConfig.prototype, "MineConfig");
