//--------------------------------------------------
// <auto-generated>
//      本文件由《纳米娱乐-游戏编辑器-数据工具》自动生成
//      源文件： Task.xlsx
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
var TaskConfig = (function (_super) {
    __extends(TaskConfig, _super);
    function TaskConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TaskConfig.prototype, "Name", {
        /**任务名称*/
        get: function () { return this.Get("Name"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "Describe", {
        /**任务描述*/
        get: function () { return this.Get("Describe"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "PreTask", {
        /**前置任务*/
        get: function () { return this.Get("PreTask"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "Level", {
        /**等级限制*/
        get: function () { return this.Get("Level"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "Type", {
        /**任务类型*/
        get: function () { return this.Get("Type"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "Action", {
        /**功能号*/
        get: function () { return this.Get("Action"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "Value", {
        /**取值*/
        get: function () { return this.Get("Value"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "AwardType", {
        /**奖励类型*/
        get: function () { return this.Get("AwardType"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskConfig.prototype, "AwardValue", {
        /**奖励值*/
        get: function () { return this.Get("AwardValue"); },
        enumerable: true,
        configurable: true
    });
    return TaskConfig;
}(ConfigDataBase));
__reflect(TaskConfig.prototype, "TaskConfig");