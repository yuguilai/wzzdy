window.onload = function () {
    document.getElementsByTagName("mdui-card")[0].style.visibility = "unset"
    document.querySelector("body > mdui-layout > mdui-top-app-bar > mdui-top-app-bar-title").innerText = "王者自定义房间 4.0"
}

const tip1 = "没有配置 请先点击管理配置新建配置"
const tip2 = "没有配置 请先新建配置"
const tip3 = "导入成功 请自行保存方案"
const tip4 = "请输入想要修改的方案名"
const tip5 = "你必须要选择一个方案"

if (localStorage.getItem("wzzdy_xgluatip") != "0.1") {
    // 创建<span>元素  
    var span = document.createElement('span');
    // 设置<span>元素的文本内容  
    span.innerHTML = '<span slot="description">全新版的lua修改脚本已经上线 使用脚本可以实现直接邀请好友(不用滴滴) 以及不用10人开房间 添加人机 以及可以像主播一样实时在游戏内设置房间自定义配置 完全免费 点击下方我知道了 查看教程<br>提示 ：开启脚本有风险 请酌情开启 仅支持安卓</span>';
    mdui.alert({
        headline: "提示",
        description: span,
        confirmText: "我知道了",
        onConfirm: () => window.location.href = "https://www.bilibili.com/video/BV16A4m1G7JJ/",
    });
    localStorage.setItem("wzzdy_xgluatip", "0.1")
}

if (localStorage.getItem("wzzdy_freetip") != "0.2") {
    mdui.dialog({
        headline: "提示",
        description: "本网页完全免费且开源 如果你是购买得到的 你可能被骗了",
        actions: [
            {
                text: "复制开源链接",
                onClick: () => {
                    复制文本("https://gitee.com/huajicloud/wzzdy")
                    return true;
                },
            },
            {
                text: "我知道了",
            }
        ],
        onClose: () => localStorage.setItem("wzzdy_freetip", "0.2"),
    });
}

if (localStorage.getItem("wzzdy_createtip") != "0.2") {
    mdui.alert({
        headline: "提示",
        description: "建议点击网页内「分享房间教程」按钮来查看文字教程 现在又可在训练营内加载界面打开网页建房来绕过开房限制了 如果使用赛宝开房遇到恶意卡房 可尝试 在训练营卡房后进入赛宝房间 这样可以邀请QQ好友 或尝试本网页内的赛宝还原 将赛宝链接转换为网页链接分享",
        confirmText: "我知道了",
        onConfirm: () => localStorage.setItem("wzzdy_createtip", "0.2"),
    });
}

if (localStorage.getItem("gamemode")) {
    document.getElementsByTagName("mdui-segmented-button-group")[0].value = localStorage.getItem("gamemode")
} else {
    document.getElementsByTagName("mdui-segmented-button-group")[0].value = "zsf"
}

if (localStorage.getItem("mapmode")) {
    document.querySelectorAll(".myedit")[0].value = localStorage.getItem("mapmode")
}

if (localStorage.getItem("banheros")) {
    if (localStorage.getItem("custom_heros")) {
        var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
        for (item in heros_json) {
            if (item == localStorage.getItem("banheros")) {
                document.querySelectorAll(".myedit")[1].value = localStorage.getItem("banheros")
            }
        }
    }
}

if (localStorage.getItem("customs")) {
    document.querySelectorAll(".myedit")[2].value = localStorage.getItem("customs")
}

if (localStorage.getItem("wzzdy_mycustomthemecolor")) {
    document.getElementsByClassName("color-custom")[0].value = localStorage.getItem("wzzdy_mycustomthemecolor")
}

if (localStorage.getItem("wzzdy_copyrule") == null) {
    localStorage.setItem("wzzdy_copyrule", "url")
}


var allbutton = document.querySelectorAll(".mybutton")
var work_message = "null"

function 打开链接(url) {
    window.location.href = url
    mdui_snackbar({
        message: "启动成功 如没反应请检查是否安装相关应用或尝试在浏览器打开",
        action: "我知道了",
        onActionClick: () => console.log("click action button")
    });
}

function checkGameMode(modeName, serverType) {
    const maptip1 = "当前地图模式暂时未开启 请重新选择"
    const maptip2 = "当前地图模式只在星期五到星期天开放 请重新选择"
    const maptip3 = "当前地图模式暂时只在正式服开启 请重新选择"
    const maptip4 = "当前地图模式暂时只在体验服开启 请重新选择"


    /*
    //暂时没用的
    if (serverType === 'tyf' && modeName.includes("5v5") != true) {
        mdui.alert({
            headline: "提示",
            description: "体验服暂时只支持5v5类型的自定义房间 其他模式已被和谐 请重新选择",
            confirmText: "我知道了",
            onConfirm: () => console.log("confirmed"),
        });
        return true
    }
    */

    const gameModes = [
        {
            keyword: "觉醒",
            isOpen: () => false,
            tip: maptip1,
        },
        {
            keyword: "克隆",
            isOpen: () => [5, 6, 0].includes(new Date().getDay()),
            tip: maptip2,
        },
        {
            keyword: "契约",
            isOpen: () => [5, 6, 0].includes(new Date().getDay()),
            tip: maptip2,
        },
        {
            keyword: "变身",
            isOpen: (serverType) => serverType === 'zsf',
            tip: maptip3,
        },
        {
            keyword: "随机征召",
            isOpen: (serverType) => serverType === 'zsf',
            tip: maptip3,
        },
        {
            keyword: "小峡谷",
            isOpen: (serverType) => serverType === 'tyf',
            tip: maptip4,
        },
    ];

    const matchedMode = gameModes.find((mode) => modeName.includes(mode.keyword));

    if (matchedMode) {
        const isOpen = matchedMode.isOpen(serverType);
        if (!isOpen) {

            mdui.alert({
                headline: "提示",
                description: matchedMode.tip,
                confirmText: "我知道了",
                onConfirm: () => console.log("confirmed"),
            });

            console.log(`${modeName} 已关闭`);
            return true;
        }
        return false;
    } else {
        console.log(`未找到对应的游戏模式：${modeName}`);
        return false;
    }
}

function 生成链接(func) {
    var mode = document.getElementsByTagName("mdui-segmented-button-group")[0].value
    var url
    if (mode == "zsf") {
        url = "tencentmsdk1104466820://?gamedata=SmobaLaunch_"
    } else if (mode == "tyf") {
        url = "tencentmsdk1104791911://?gamedata=SmobaLaunch_"
    } else {
        mdui_snackbar({
            message: "你必须选择一个游戏",
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return false
    }

    var alljson = {
        "createType": "2",
        "mapID": "待填入mapid",
        "ullRoomid": "待填入roomid",
        "mapType": "待填入maptype",
        "ullExternUid": "待填入uid",
        "roomName": "1",
        "teamerNum": "待填入人数",
        "platType": "2",
        "campid": "1",
        "AddPos": "0",
        "firstCountDownTime": "待填入时间",
        "secondCountDownTime": "17",
        "AddType": "2",
        "OfflineRelayEntityID": "",
        "openAICommentator": "1",
        //ban英雄
        "banHerosCamp1": [],
        //ban英雄
        "banHerosCamp2": [],
        "customDefineItems": []
    }

    var edittab = document.querySelectorAll(".myedit")
    var mapid = edittab[0].value.replace(/\s+/g, "");

    var modename = mapid


    var custom = edittab[2].value

    var oheros
    var omapid

    if (isJSON(custom)) {
        var custom_json = JSON.parse(custom)
        alljson.customDefineItems = custom_json
    } else if (localStorage.getItem("custom_cof")) {
        var customjson = JSON.parse(localStorage.getItem("custom_cof"))
        if (customjson[edittab[2].value]) {
            var myjson = JSON.parse(customjson[edittab[2].value].myjson)
            console.log(myjson)
            var json_herolist = myjson[0]
            var json_bxlist = myjson[1]
            var json_yglist = myjson[2]
            var json_fytlist = myjson[3]
            var json_sjlist = myjson[4]
            if (customjson[edittab[2].value].myjson) {
                mysjson = customjson[edittab[2].value].adjson
                if (typeof mysjson == "undefined") {
                    mysjson = ["", "", "", ""]
                }
                console.log(mysjson)
                if (mysjson[0] != "") {
                    omapid = mysjson[0]
                }
                if (mysjson[1] != "") {
                    oheros = mysjson[1]
                }
            }
            try {
                var custom_json = makejson(json_herolist, json_bxlist, json_yglist, json_fytlist, json_sjlist, mysjson)
            } catch (error) {
                console.log(error)
                mdui.alert({
                    headline: "提示",
                    description: "合成自定义配置时出错 错误信息(可自己查看或发送给作者):" + error,
                    confirmText: "我知道了",
                });
                return
            }
            alljson.customDefineItems = custom_json
        }
    }

    if (omapid) {
        mapid = omapid
    }

    if (isNaN(mapid)) {
        mapid = mydatajson[0][mapid]
    } else {
        mdui.alert({
            headline: "提示",
            description: "地图模式获取失败 请选择地图模式名称后重新尝试",
            confirmText: "我知道了",
            onConfirm: () => console.log("confirmed"),
        });
        return
    }

    console.log(mapid)

    alljson.mapID = mapid[0]
    alljson.mapType = mapid[1]
    alljson.teamerNum = mapid[2]

    if (checkGameMode(modename, mode)) {
        return
    }

    if (alljson.mapType != 1) {
        var myalljson = {
            "createType": "2",
            "mapID": "待填入mapid",
            "ullRoomid": "待填入roomid",
            "mapType": "待填入roomid",
            "ullExternUid": "待填入roomid",
            "roomName": "1",
            "platType": "1",
            "campid": "1",
            "AddPos": "0",
            "AddType": "2"
        }

        myalljson.mapID = mapid[0]
        myalljson.mapType = mapid[1]

        var Rand = Math.random()
        var mineId = Math.round(Rand * 1000000000000000000)

        myalljson.ullExternUid = mineId
        myalljson.ullRoomid = mineId

        var alljson_str = JSON.stringify(myalljson)
        console.log(alljson_str)
        var openurl = url + btoa(alljson_str)
        var tiptext = "此地图仅提供开房间，不可无CD哦 确认启动？"

        if (func) {
            func(openurl, tiptext)
            return
        }

        mdui.confirm({
            headline: "提示",
            description: tiptext,
            confirmText: "继续",
            cancelText: "取消",
            onConfirm: () => {
                window.openurl = openurl
                打开链接(openurl)
            },
            onCancel: () => console.log("canceled"),
        });

        window.myheros = "无禁用英雄"

        return

    }


    var heros = edittab[1].value.replace(/\s+/g, "");

    if (oheros) {
        heros = oheros
    }

    if (localStorage.getItem("custom_heros")) {
        var herojson = JSON.parse(localStorage.getItem("custom_heros"))
        if (herojson[edittab[1].value]) {
            heros = herojson[edittab[1].value]
        }
    }

    window.myheros = heros

    if (myheros == "") {
        window.myheros = "无禁用英雄"
    }

    for (item in mydatajson[1]) {
        if (heros.includes(item)) {
            //提取json内容中第一个|前的内容
            var hero = mydatajson[1][item].split('|')[0]
            alljson.banHerosCamp1.push(hero)
            alljson.banHerosCamp2.push(hero)
        }
    }

    alljson.firstCountDownTime = "6666666666"

    var Rand = Math.random()
    var mineId = Math.round(Rand * 1000000000000000000)

    alljson.ullExternUid = mineId
    alljson.ullRoomid = mineId

    console.log(alljson)

    var alljson_str = JSON.stringify(alljson)
    console.log(alljson_str)
    var openurl = url + btoa(alljson_str)
    var tiptext = "确认启动？"

    if (Object.keys(alljson.customDefineItems).length == 0) {
        tiptext = "检测到自定义配置为空 是否继续"
    }

    if (func) {
        func(openurl, tiptext)
        return
    }

    mdui.confirm({
        headline: "提示",
        description: tiptext,
        confirmText: "继续",
        cancelText: "取消",
        onConfirm: () => {
            window.openurl = openurl
            打开链接(openurl)
        },
        onCancel: () => console.log("canceled"),
    });

}

function processLink(link) {
    // 截取 api.s1f.top/ 后的内容
    const afterDomain = link.split('//api.s1f.top/')[1];
    // 将所有 / 替换为.
    const replacedContent = afterDomain.replace(/\//g, ".");
    return replacedContent;
}

//从 https://api.aa1.cn/ 找的api链接
function getShortLink(longUrl) {
    const requestUrl = `https://api.s1f.top/short_link?url=${encodeURIComponent(longUrl)}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", requestUrl, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const response = JSON.parse(this.responseText);
                resolve(response.data.url);
            } else {
                reject(new Error(`HTTP error! status: ${this.status}`));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error"));
        };
        xhr.send();
    });
}

function GetModeStr(openurl) {

    function extractNumbers(str) {
        const regex = /_(\d+)/g;
        let match;
        let result = [];

        while ((match = regex.exec(str)) !== null) {
            // 匹配到的数字位于match[1]，因为(\d+)是第一个捕获组
            result.push(Number(match[1]));
        }

        return result;
    }

    var mapnametable = {};
    var maptable = mydatajson[0]

    for (const key in maptable) {
        const valueArray = maptable[key];
        mapnametable[valueArray[0]] = [key, valueArray[2]];
    }

    //补全
    mapnametable[1010] = ["快速赛", 10]
    mapnametable[20031] = ["小峡谷", 10]
    mapnametable[25001] = ["1v1对抗路", 2]
    mapnametable[25002] = ["1v1中路", 2]
    mapnametable[25003] = ["1v1发育路", 2]
    mapnametable[20910] = ["5v5征兆0ban位", 10];

    mapnametable[20009] = ["火焰山大作战", 10]
    mapnametable[20012] = ["克隆模式", 10]
    mapnametable[20019] = ["契约之战", 10]
    mapnametable[20017] = ["无限乱斗", 10]
    mapnametable[90001] = ["梦境大乱斗", 10]
    mapnametable[4010] = ["变身大乱斗", 10]

    mapnametable[5121] = ["觉醒之战", 10]
    mapnametable[5153] = ["多重施法", 10]



    const gamedata = openurl.split(/gamedata=(.+)/)[1];
    const mapid = extractNumbers(gamedata)[9]

    if (mapnametable[mapid]) {
        var mapname = mapnametable[mapid][0]
    } else {
        var mapname = "地图id:" + mapid
    }

    if (/ShareRoom/.test(gamedata)) {
        roomtype = "房间"
    }
    else if (/ShareTeam/.test(gamedata)) {
        roomtype = "组队"
    }
    else {
        roomtype = "未知"
    }
    return mapname + roomtype
}

function replaceContent(str, replaceurl, replacepos, openurl) {

    console.log("未处理前:" + str)


    function showcopytipdia() {
        mdui.alert({
            headline: "提示",
            description: "生成规则不能为空 已帮你恢复默认生成规则",
            confirmText: "我知道了",
            onConfirm: () => console.log("confirmed"),
        });
    }

    const parts = str.split('|||');

    // 如果数组长度大于1，说明包含分隔符，返回左右两侧的数据
    if (parts.length > 1) {
        str = parts[replacepos]
        if (str == "") {
            str = "url"
            parts[replacepos] = str
            showcopytipdia()
            localStorage.setItem("wzzdy_copyrule", parts[0] + "|||" + parts[1])
        }
    } else {
        if (str == "") {
            str = "url"
            showcopytipdia()
            localStorage.setItem("wzzdy_copyrule", str)
        }
    }

    if (str.includes("url") == false) {
        mdui.alert({
            headline: "过于逆天的复制规则",
            description: "你必须要至少在规则内添加url才能生效 已自动使用默认规则 并没有清空你的错误规则 请自行修改规则后重试",
            confirmText: "我知道了",
            onConfirm: () => console.log("confirmed"),
        });
        return replaceurl
    }

    var customjson = JSON.parse(localStorage.getItem("custom_cof"))
    if (customjson[document.querySelectorAll(".myedit")[2].value]) {
        if (customjson[document.querySelectorAll(".myedit")[2].value].myjson) {
            mysjson = customjson[document.querySelectorAll(".myedit")[2].value].adjson
            if (typeof mysjson == "undefined") {
                mysjson = ["", "", "", ""]
            }
            console.log(mysjson)
            let modename = mysjson[0]
            if (modename != "") {
                str = str.replace(/mode/g, modename);
            }
            let banheros = mysjson[1]
            if (banheros != "") {
                //如果存在ban就替换hero
                if (str.includes("ban")) {
                    str = str.replace(/hero/g, "无禁用英雄配置名");
                } else {
                    str = str.replace(/hero/g, "禁用英雄:"+myheros);
                }
                mdui.alert({
                    headline: "提示",
                    description: "当前配置包含高级配置的英雄配置 无法获取配置名 已自动替换为禁用英雄配置 配置中的ban(禁用英雄配置) 将会在本次自动被替换为空 防止重复",
                    confirmText: "我知道了",
                });
            }
        }
    }

    //转换法需要特殊判断
    if (replacepos == 1) {
        str = str.replace(/mode/g, GetModeStr(openurl));
    } else {
        str = str.replace(/mode/g, document.querySelectorAll(".myedit")[0].value);
    }

    str = str.replace(/hero/g, document.querySelectorAll(".myedit")[1].value);
    str = str.replace(/custom/g, document.querySelectorAll(".myedit")[2].value);
    str = str.replace(/url/g, replaceurl);
    str = str.replace(/ban/g, myheros);

    let mode
    if (openurl.includes("tencentmsdk1104466820")) {
        mode = "正式服"
    } else if (openurl.includes("tencentmsdk1104791911")) {
        mode = "体验服"
    }

    str = str.replace(/gametype/g, mode);

    str = str.replace(/\\n/g, '\n');

    console.log("处理后:" + str)

    return str;
}


allbutton[0].onclick = function () {
    if (work_message != "null") {
        mdui_snackbar({
            message: work_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return
    }
    生成链接()
}

allbutton[1].onclick = function () {
    let value = document.getElementsByTagName("mdui-segmented-button-group")[0].value
    if (work_message != "null") {
        mdui_snackbar({
            message: work_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return
    }

    // 创建<span>元素  
    var span = document.createElement('span');
    // 设置<span>元素的文本内容  
    span.innerHTML = '<span slot="description">当前可以使用两种方法 使用链接法 可以直接复制链接 最为方便 也支持查看链接内的自定义属性 使用转换法将会把普通链接转换为通用链接 但方法较为复杂 但可以把任意房间转换为直接打开 也可以实现跨区游玩 不局限于自定义房间 但需要在游戏内QQ分享链接后才可以获取<br>提示 ：你可以通过编辑「生成规则」来编辑复制链接的生成规则</span>';
    mdui.dialog({
        headline: "提示",
        description: span,
        actions: [
            {
                text: "取消",
            },
            {
                text: "链接法",
                onClick: () => {
                    if (window.openurl) {
                        var openurl = window.openurl
                        getShortLink(window.location.origin + "/wzzdy/Smoba.html?data=" + openurl)
                            .then(shortLink => {
                                murl = processLink(shortLink);
                                work_message = "null"
                                mdui.confirm({
                                    headline: "提示",
                                    description: "已获取到数据 是否立即复制链接",
                                    confirmText: "确认",
                                    cancelText: "取消",
                                    onConfirm: () => {
                                        let url = replaceContent(myedit.value, window.location.origin + "/wzzdy/data.html?" + murl, 0, openurl)
                                        复制文本(url)
                                    },
                                    onCancel: () => console.log("canceled"),
                                });
                            })
                            .catch(error => {
                                work_message = "null"
                                mdui.alert({
                                    headline: "提示",
                                    description: "出现错误 无法请求 请检查网络",
                                    confirmText: "我知道了",
                                    onConfirm: () => console.log("confirmed"),
                                });
                                console.log(error)
                            });
                    } else {
                        生成链接(function (openurl, tiptext) {
                            getShortLink(window.location.origin + "/wzzdy/Smoba.html?data=" + openurl)
                                .then(shortLink => {
                                    murl = processLink(shortLink);
                                    work_message = "null"
                                    mdui.confirm({
                                        headline: "提示",
                                        description: tiptext + " 已获取到数据 是否复制链接并打开游戏？",
                                        confirmText: "确认",
                                        cancelText: "取消",
                                        onConfirm: () => {
                                            let url = replaceContent(myedit.value, window.location.origin + "/wzzdy/data.html?" + murl, 0, openurl)
                                            复制文本(url)
                                            打开链接(openurl)
                                        },
                                        onCancel: () => console.log("canceled"),
                                    });
                                })
                                .catch(error => {
                                    work_message = "null"
                                    mdui.alert({
                                        headline: "提示",
                                        description: "出现错误 无法请求 请检查网络",
                                        confirmText: "我知道了",
                                        onConfirm: () => console.log("confirmed"),
                                    });
                                    console.log(error)
                                });
                        })
                    }
                },
            },
            {
                text: "转换法",
                onClick: () => {
                    mdui.prompt({
                        headline: "提示",
                        description: "使用教程：如果通过网页或赛宝开房 打开游戏训练营 进入加载页 打开网页 点击启动 如果不是只是实现跨区游玩 可以忽略以上步骤 进入房间后点击游戏房间内右下角邀请QQ好友的按钮 发送到我的电脑 发送后选择留在QQ 然后复制发送的链接 输入到该输入框内 点击确认即可获得邀请链接 发送他人打开即可",
                        confirmText: "确认",
                        cancelText: "取消",
                        onConfirm: (value) => {
                            try {
                                var gamedata = value.split('gamedata=')[1]
                                var appid = value.split('appid=')[1].split('&')[0]
                            } catch (error) {
                                mdui_snackbar({
                                    message: "输入链接有误",
                                    action: "我知道了",
                                    onActionClick: () => console.log("click action button")
                                });
                                return
                            }
                            let openurl = "tencentmsdk" + appid + "://?gamedata=" + gamedata
                            getShortLink(window.location.origin + "/wzzdy/opengame.html?data=" + openurl)
                                .then(shortLink => {
                                    murl = processLink(shortLink);
                                    work_message = "null"
                                    mdui.confirm({
                                        headline: "提示",
                                        description: "已获取到数据 是否立即复制链接",
                                        confirmText: "确认",
                                        cancelText: "取消",
                                        onConfirm: () => {
                                            let url = replaceContent(myedit.value, window.location.origin + "/wzzdy/data.html?" + murl, 1, openurl)
                                            复制文本(url)
                                        },
                                        onCancel: () => console.log("canceled"),
                                    });
                                })
                                .catch(error => {
                                    work_message = "null"
                                    mdui.alert({
                                        headline: "提示",
                                        description: "出现错误 无法请求 请检查网络",
                                        confirmText: "我知道了",
                                        onConfirm: () => console.log("confirmed"),
                                    });
                                    console.log(error)
                                });
                        },
                        onCancel: () => console.log("canceled"),
                    });
                },
            }
        ],
        body: '<mdui-text-field class="copydialog_edit" variant="filled" type="text" name="" style="padding-top: 10px;" label="生成规则"></mdui-text-field>\n<p><br>如显示不全可向下滑动查看更多内容<br>当生成规则包括以下字符 会自动被替换为指定字符 默认生成规则为url<br>mode --> 模式名<br>hero --> 当前禁用英雄配置名 ban --> 当前禁用英雄配置<br>custom --> 当前自定义配置名<br>url --> 最终生成链接<br>gametype --> 游戏类型 例如正式服<br>\\n --> 换行<br>如不做特别标记 链接法和转换法复制规则默认相同 如想精准设置 请将配置与配置间直接使用|||分割即可 例如 map url|||gametype map url</p>',
        onOpen: () => {
            myedit = document.getElementsByClassName("copydialog_edit")[0]
            myedit.value = localStorage.getItem("wzzdy_copyrule")
            myedit.addEventListener("input", function () {
                localStorage.setItem("wzzdy_copyrule", myedit.value)
            })
        },
    });

}

allbutton[2].onclick = function () {
    // 创建<span>元素  
    var span = document.createElement('span');
    // 设置<span>元素的文本内容  
    span.innerHTML = '<span slot="description">提示：共有六种方法 显示不全可手动向下滑动查看<br>方法一：解除/添加人机/不满人无法开启限制<br>打开游戏训练营 选择英雄后 进入加载页 打开网页 启动即可<br>方法二：链接邀请<br>请点击复制链接按钮查看具体方法<br>方法三：游戏内邀请<br>账号A启动 账号B在游戏大厅展开好友列表 点击账号A头像 点击滴滴 滴滴后过一会即可在账号A显示邀请按钮 账号A点击邀请即可(账号B不可是组队状态)<br>方法四：QQ内邀请<br>在普通房间对离线好友点击qq邀请，开好自定义房间后再点确定邀请。随后可将发送给qq好友的qq邀请链接转发至各群中。<br>缺点：对一个qq好友每天只能点击5次qq邀请按钮，链接不能实时显示人数<br>方法五：持久化可在游戏内邀请指定人<br>让好友邀请你进任意房间（非队伍），点击拒绝。开好无cd房间，在邮箱中点击发起邀请，显示"加入失败"不用管，回到房间即自动邀请那个好友。一次卡邮箱长期可邀请<br>方法六：显示附近的人/最近的人<br>返回大厅展开好友列表，即可邀请到开黑车队/附近的人/<br></span>';
    mdui.alert({
        headline: "分享房间教程",
        description: span,
        confirmText: "我知道了",
        onConfirm: () => console.log("confirmed"),
    });
}

document.getElementsByTagName("mdui-segmented-button-group")[0].addEventListener("change", function () {
    localStorage.setItem("gamemode", this.value)
})

document.querySelectorAll(".myedit")[0].onclick = function () {
    mdui_snackbar({
        message: "可向下滑动查看更多模式",
        action: "我知道了",
        onActionClick: () => console.log("click action button")
    });
}


allbutton[3].onclick = function () {
    mdui.confirm({
        headline: "提示",
        description: "该功能来自第三方网站 点击确认 将链接到第三方网站 是否继续？",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
            window.location.href = "http://dadao.kuaibiji.info/#/wzsb?room"

        },
        onCancel: () => console.log("canceled"),
    });
}

allbutton[4].onclick = function () {
    复制文本("746855036")
}

allbutton[5].onclick = function () {
    mdui.prompt({
        headline: "提示",
        description: "源码可到http://mtw.so/5Fog8o 下载 搭建后修改myapiurl变量为自己搭建即可 该功能可防止赛宝卡房 输入赛宝链接即可 链接获取点击赛宝房间页面下方分享按钮复制链接即可 访问可能较慢 请耐心等待 该功能使用bug实现 随时可能失效",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            value = decodeURIComponent(value)
            try {
                const pathPart = value.split('room-quick/')[1]; // 获取'room-quick/'之后的部分
                // 去除后面的内容以及可能存在的查询参数
                roomID = pathPart.split('?')[0].split('&')[0]
            } catch {
                mdui_snackbar({
                    message: "输入链接有误",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
                return
            }
            var myapiurl = "https://ouwhiy7vaifi44w6ee26vxikny0bzigt.lambda-url.ap-east-1.on.aws"
            apiurl = myapiurl + "/getroom_smoba?id=" + roomID + "&t=" + Date.now()
            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiurl, true);

            work_message = "正在请求复制链接中 请稍等"

            xhr.onload = function () {

                if (this.status >= 200 && this.status < 300) {
                    var mdata = JSON.parse(this.responseText)
                    if (mdata.gamedata) {

                        const findstr = 'SmobaLaunch_'
                        var game_json = JSON.parse(atob(mdata.gamedata.split(findstr)[1]));
                        const comm_fields = mdata.comm_fields
                        var banheros = []
                        var custom_params = mdata.battle_custom_params

                        for (let index = 0; index < comm_fields.length; index++) {
                            const element = comm_fields[index];
                            if (element.name.includes("hero")) {
                                const allow_heros = element.value

                                console.log(allow_heros)

                                const allheros = mydatajson[1]

                                for (let key in allheros) {
                                    const element = allheros[key];
                                    const myvalue = element.split('|', 1)[0];
                                    if (allow_heros.includes(myvalue) != true) {
                                        banheros.push(myvalue)
                                    }
                                }

                            }
                        }

                        if (banheros.length > 0) {
                            game_json.banHerosCamp1 = banheros
                            game_json.banHerosCamp2 = banheros
                        }

                        if (custom_params) {
                            game_json.customDefineItems = custom_params
                        }

                        console.log(game_json)

                        const game_data = findstr + btoa(JSON.stringify(game_json))
                        console.log(game_data)

                        mdui_snackbar({
                            message: "已获取到数据 请耐心等待 正在请求生成短链中",
                            action: "我知道了",
                            onActionClick: () => console.log("click action button")
                        });

                        var openurl = "tencentmsdk1104466820://?gamedata=" + game_data

                        getShortLink(window.location.origin + "/wzzdy/Smoba.html?data=" + openurl)
                            .then(shortLink => {
                                murl = processLink(shortLink);
                                work_message = "null"
                                mdui.confirm({
                                    headline: "提示",
                                    description: "已获取到数据 是否复制链接？",
                                    confirmText: "确认",
                                    cancelText: "取消",
                                    onConfirm: () => {
                                        复制文本(window.location.origin + "/wzzdy/data.html?" + murl + "\n该链接由原王者赛宝房间链接" + value + "转换 可防止卡房 本链接由https://huajiqaq.github.io/wzzdy/的 赛宝还原 转换")
                                    },
                                    onCancel: () => console.log("canceled"),
                                });
                            })
                            .catch(error => {
                                work_message = "null"
                                mdui.alert({
                                    headline: "提示",
                                    description: "出现错误 无法请求 请检查网络",
                                    confirmText: "我知道了",
                                    onConfirm: () => console.log("confirmed"),
                                });
                                console.log(error)
                            });



                    } else {
                        mdui_snackbar({
                            message: "获取失败 请检查是否满员",
                            action: "我知道了",
                            onActionClick: () => console.log("click action button")
                        });
                        work_message = "null"
                        return
                    }
                }
            }

            xhr.onerror = function () {
                work_message = "null"
                mdui.alert({
                    headline: "提示",
                    description: "出现错误 可能作者登录凭证掉了",
                    confirmText: "我知道了",
                    onConfirm: () => console.log("confirmed"),
                });
                console.log(error)
            }

            xhr.send();

        },
        onCancel: () => console.log("canceled"),
    });
}

function createTooltip(title, content) {
    // 创建 mdui-tooltip 元素
    const tooltip = document.createElement('mdui-tooltip');

    tooltip.trigger = "click"

    const tooltipContent = document.createElement('div');
    tooltipContent.setAttribute('slot', 'content');

    const tooltipTitle = document.createElement('div');
    tooltipTitle.style.fontSize = '1.4em';
    tooltipTitle.textContent = title;

    if (content) {
        const tooltipText = document.createElement('div');
        tooltipText.textContent = content;
        tooltipContent.appendChild(tooltipTitle);
        tooltipContent.appendChild(tooltipText);
    } else {
        // 如果没有附加内容，只添加标题
        tooltipContent.appendChild(tooltipTitle);
    }

    //内容添加到工具提示中
    tooltip.appendChild(tooltipContent);

    // 返回创建的工具提示元素
    return tooltip;
}



for (item in mydatajson[0]) {
    // 使用闭包解决
    (function (item_str) {
        // 创建新的 mdui-menu-item 元素  
        var menuItem = document.createElement('mdui-menu-item');
        // 设置文本内容  
        menuItem.textContent = item_str;
        menuItem.onclick = function () {
            if (item_str.includes("征召")) {
                mdui_snackbar({
                    message: "征召不可以添加人机哦",
                    onActionClick: () => console.log("click action button")
                });
            }
            localStorage.setItem("mapmode", item_str)
            document.querySelectorAll(".myedit")[0].value = item_str;
        }

        if (item_str.includes("征召")) {
            // 创建 mdui-tooltip 元素
            const tooltip = createTooltip("注意", "征召不可以添加人机哦");
            tooltip.appendChild(menuItem);
            document.querySelectorAll(".mymenu")[0].appendChild(tooltip);
            return
        }
        // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
        document.querySelectorAll(".mymenu")[0].appendChild(menuItem);
    })(item);
}

var herodialog = document.querySelector(".example-dialog")

herotip = false
herodialog.querySelector("mdui-button").onclick = function () {
    if (herotip == false) {
        herotip = true
        mdui.confirm({
            headline: "提示",
            description: "确认关闭吗 更改了配置必须要新建或保存才能生效",
            confirmText: "确认",
            cancelText: "取消",
            onConfirm: () => {
                herodialog.open = false
            },
            onCancel: () => console.log("canceled"),
            onClose: () => herotip = false,
        });
    }
}

document.querySelectorAll(".myedit")[1].onclick = function () {
    加载英雄配置()
}

var customdialog = document.querySelector(".custom-dialog")

customtip = false
customdialog.querySelector("mdui-button").onclick = function () {
    if (customtip == false) {
        customtip = true
        mdui.confirm({
            headline: "提示",
            description: "确认关闭吗 更改了配置必须要新建或保存才能生效",
            confirmText: "确认",
            cancelText: "取消",
            onConfirm: () => {
                customdialog.open = false
            },
            onCancel: () => console.log("canceled"),
            onClose: () => customtip = false,
        });
    }
}

document.querySelectorAll(".myedit")[2].onclick = function () {
    加载自定义配置()
}

function loadherolist(batchSize = 10) {
    const items = Object.keys(mydatajson[1]);
    let currentIndex = 0;

    const targetList = document.getElementsByClassName('myherolist')[0];


    function processNextBatch() {
        const batchItems = [];
        for (let i = currentIndex; i < Math.min(currentIndex + batchSize, items.length); i++) {
            const item_str = items[i];
            const listItem = document.createElement('mdui-chip');
            listItem.textContent = item_str;
            listItem.selectable = true;
            listItem.className = "mychip";
            batchItems.push(listItem);
        }

        if (batchItems.length > 0 && targetList) {
            targetList.append(...batchItems);
        }

        // 更新索引和检查是否需要继续加载
        currentIndex += batchSize;
        if (currentIndex < items.length) {
            requestAnimationFrame(processNextBatch);
        } else {
            window.loadherolist = true
            herodialog.open = true
            var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
            try {
                选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value])
            } catch (e) {
                console.log(e)
            }
        }
    }

    requestAnimationFrame(processNextBatch);
}

document.getElementsByClassName("heromode")[0].addEventListener("change", function () {
    //分割符号 | 防止英雄id也包含指定的数字
    let defvalue = "|" + this.value
    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
    childnodes.forEach(element => {
        let value = element.textContent
        let mvalue = mydatajson[1][value]
        if (mvalue.includes(defvalue)) {
            element.style.display = ""
            element.isshow = true
        } else {
            element.style.display = "none"
            element.isshow = false
        }
    });

    //清空数据
    search_heroedit.value = ""
})

var heroButton = document.getElementsByClassName("herobutton")

function 获取选择英雄名() {
    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
    var heroscof = ""
    childnodes.forEach(element => {
        if (element.selected == true) {
            if (heroscof != "") {
                heroscof = heroscof + " " + element.textContent
            } else {
                heroscof = element.textContent
            }
        }
    });
    return heroscof
}

function 选择英雄名(str) {
    if (typeof str == "undefined") {
        return
    }
    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
    childnodes.forEach(element => {
        element.selected = false
        if (str.includes(element.textContent)) {
            element.selected = true
        } else {
            element.selected = false
        }
    });
}

function 加载英雄配置() {
    var menudoc = document.querySelectorAll(".mymenu")[1]

    var ismenu
    if (herodialog.open == true) {
        ismenu = true
        menudoc = herodialog.getElementsByClassName("mymenu")[0]
    }

    var childnodes = menudoc.childNodes
    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))


    for (let index = 0; index < childnodes.length; index++) {
        const element = childnodes[index];
        if (element.className != "search_edit") {
            element.remove()
            index--
        }
    }

    if (ismenu != true) {
        // 创建新的 mdui-menu-item 元素  
        var menuItem = document.createElement('mdui-menu-item');
        // 设置文本内容  
        menuItem.textContent = "管理配置";
        menuItem.isadd = true
        menuItem.onclick = function () {
            const loadherolist = window.loadherolist
            if (loadherolist == true) {
                try {
                    选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value])
                } catch (e) {
                    console.log(e)
                }
                herodialog.open = true
            } else {
                mdui_snackbar({
                    message: "加载中",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
                loadherolist(10)
            }
        }

        menudoc.appendChild(menuItem);
    }

    if (localStorage.getItem("custom_heros")) {
        if (Object.keys(heros_json).length == 0) {
            mdui_snackbar({
                message: tip1,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
            return
        }

        if (ismenu != true) {
            for (item in heros_json) {
                // 使用闭包解决
                (function (item_str) {
                    // 创建新的 mdui-menu-item 元素  
                    var menuItem = document.createElement('mdui-menu-item');
                    // 设置文本内容  
                    menuItem.textContent = item_str;
                    menuItem.onclick = function () {
                        localStorage.setItem("banheros", item_str)
                        document.querySelectorAll(".myedit")[1].value = item_str;
                    }
                    // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
                    menudoc.appendChild(menuItem);
                })(item);
            }
        } else {
            for (item in heros_json) {
                // 使用闭包解决
                (function (item_str) {
                    // 创建新的 mdui-menu-item 元素  
                    var menuItem = document.createElement('mdui-menu-item');
                    // 设置文本内容  
                    menuItem.textContent = item_str;
                    menuItem.onclick = function () {
                        localStorage.setItem("banheros", item_str)
                        document.querySelectorAll(".myedit")[1].value = item_str;
                        选择英雄名(heros_json[document.querySelectorAll(".myedit")[1].value])
                    }
                    // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
                    menudoc.appendChild(menuItem);
                })(item);
            }
        }

    } else {
        mdui_snackbar({
            message: tip1,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }

}


function 复制文本(str) {
    // 替换换行符为 HTML 的换行标签
    const htmlStr = str.replace(/\n/g, '<br>');
    // 创建一个新的元素节点来包含 HTML 内容
    const div = document.createElement('div');
    div.innerHTML = htmlStr;
    document.body.appendChild(div);

    // 创建一个范围对象
    const range = document.createRange();
    // 将新创建的元素节点添加到范围中
    range.selectNode(div);
    // 获取当前选择
    const selection = window.getSelection();
    // 移除之前选中内容
    if (selection.rangeCount > 0) selection.removeAllRanges();
    // 将范围添加到选择中
    selection.addRange(range);
    // 执行复制命令
    document.execCommand('copy');
    // 移除范围，清空选择
    selection.removeAllRanges();
    div.remove();

    mdui_snackbar({
        message: "复制成功",
        action: "我知道了",
        onActionClick: () => console.log("click action button")
    });
}

function 修改键名(jsonObj, oldKey, newKey) {
    // 创建一个新的 JSON 对象
    const newJsonObj = {};

    // 遍历旧 JSON 对象的键值对
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            // 如果当前键是要修改的键，则使用新的键名，否则保持原样
            const targetKey = (key === oldKey) ? newKey : key;

            // 将键值对添加到新的 JSON 对象中
            newJsonObj[targetKey] = jsonObj[key];
        }
    }

    return newJsonObj;
}

heroButton[0].onclick = function () {
    加载英雄配置()
}

heroButton[1].onclick = function () {
    mdui.prompt({
        headline: "新建配置",
        description: "请输入配置名以新建配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            var heros_json
            var 英雄名 = 获取选择英雄名()
            if (localStorage.getItem("custom_heros")) {
                heros_json = JSON.parse(localStorage.getItem("custom_heros"))
            } else {
                heros_json = {}
            }

            if (value == "") {
                var Rand = Math.random()
                var mineId = Math.round(Rand * 100000000)
                value = "未命名" + mineId.toString()
            }

            heros_json[value] = 英雄名;

            localStorage.setItem("custom_heros", JSON.stringify(heros_json))

            localStorage.setItem("banheros", value)
            document.querySelectorAll(".myedit")[1].value = value;

            加载英雄配置()
            mdui_snackbar({
                message: "新建配置成功",
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        },
        onCancel: () => console.log("canceled"),
    });
}

heroButton[2].onclick = function () {
    var 英雄名 = 获取选择英雄名()
    复制文本(英雄名)
}

heroButton[3].onclick = function () {
    mdui.prompt({
        headline: "导入配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            try {
                选择英雄名(value)
                mdui_snackbar({
                    message: tip3,
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            } catch {
                mdui_snackbar({
                    message: "输入配置有误",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            }
        },
        onCancel: () => console.log("canceled"),
    });
}

heroButton[4].onclick = function () {
    if (localStorage.getItem("custom_heros")) {
        var editvalue = document.querySelectorAll(".myedit")[1].value
        if (editvalue) {
            mdui.confirm({
                headline: "提示",
                description: "是否删除该配置",
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: () => {
                    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
                    delete heros_json[editvalue]
                    localStorage.setItem("custom_heros", JSON.stringify(heros_json))
                    localStorage.setItem("banheros", "")
                    document.querySelectorAll(".myedit")[1].value = ""

                    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
                    childnodes.forEach(element => {
                        element.selected = false
                    });
                    herodialog.bodyRef.value.scroll({ top: 0, behavior: 'smooth' });

                    mdui_snackbar({
                        message: "删除配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

heroButton[5].onclick = function () {
    if (localStorage.getItem("custom_heros")) {
        var editvalue = document.querySelectorAll(".myedit")[1].value
        if (editvalue) {
            mdui.prompt({
                headline: "提示",
                description: tip4,
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: (value) => {
                    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
                    var heros_json = 修改键名(heros_json, editvalue, value);
                    localStorage.setItem("custom_heros", JSON.stringify(heros_json))
                    localStorage.setItem("banheros", value)
                    document.querySelectorAll(".myedit")[1].value = value
                    加载英雄配置()
                    mdui_snackbar({
                        message: "重命名配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

heroButton[6].onclick = function () {
    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
    childnodes.forEach(element => {
        if (element.isshow == false) {
            return
        }
        element.selected = true
    });
}

heroButton[7].onclick = function () {
    var childnodes = document.getElementsByClassName("myherolist")[0].childNodes
    childnodes.forEach(element => {
        if (element.isshow == false) {
            return
        }
        if (element.selected == true) {
            element.selected = false
        } else {
            element.selected = true
        }
    });
}

heroButton[8].onclick = function () {
    if (localStorage.getItem("custom_heros")) {
        var editvalue = document.querySelectorAll(".myedit")[1].value
        if (editvalue) {
            mdui.confirm({
                headline: "提示",
                description: "是否保存该配置",
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: () => {
                    var 英雄名 = 获取选择英雄名()
                    var heros_json = JSON.parse(localStorage.getItem("custom_heros"))
                    heros_json[editvalue] = 英雄名;
                    localStorage.setItem("custom_heros", JSON.stringify(heros_json))
                    mdui_snackbar({
                        message: "保存配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

function createMenuItems(settingsDoc, values, isdata) {

    var index = 1
    values.forEach(element => {
        // 使用闭包解决
        (function (item_str, index) {
            // 创建新的 mdui-menu-item 元素  
            var menuItem = document.createElement('mdui-menu-item');
            if (isdata) {
                menuItem.value = item_str;
            } else {
                menuItem.value = index
            }
            menuItem.textContent = item_str
            menuItem.onclick = function () {
            }
            // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
            settingsDoc.appendChild(menuItem)
        })(element, index);
        index = index + 1
    });


    settingsDoc.updateComplete.then(() => {
        if (isdata) {
            settingsDoc.value = isdata;
        } else {
            settingsDoc.value = 1;
        }
        //存储默认值
        settingsDoc.defvalue = settingsDoc.value
    });
    return settingsDoc
}

function createList(str, doc) {
    // 创建 mdui-list 元素
    var list = document.createElement('mdui-list');
    // 创建 mdui-list-subheader 元素
    var listSubheader = document.createElement('mdui-list-subheader');
    listSubheader.textContent = str;
    // 将 mdui-list-subheader 添加到 mdui-list 中
    list.appendChild(listSubheader);
    // 返回创建的 mdui-list 元素
    doc.appendChild(list)
    return list;
}

function createSelectMenu(str, doc, ismultiple) {
    // 创建 mdui-select 元素
    var select = document.createElement('mdui-select');
    select.setAttribute('label', str);
    select.setAttribute('variant', "outlined");
    select.style.padding = "10px"

    if (ismultiple) {
        select.setAttribute('multiple', '');
    }


    doc.appendChild(select)

    // 返回创建的 mdui-select 元素
    return select;
}

function CreateHeroList(str, mydoc) {
    var campdoc = createList(str, mydoc)
    createMenuItems(createSelectMenu("初级等级", campdoc), ["1级", "4级", "5级", "8级", "10级", "12级", "15级"]);
    createMenuItems(createSelectMenu("法术攻击加成", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
    createMenuItems(createSelectMenu("物理攻击加成", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
    createMenuItems(createSelectMenu("冷却缩减", campdoc), ["无加成", "减25%", "减40%", "减80%", "减99%"]);
    createMenuItems(createSelectMenu("初始金币", campdoc), ["无加成", "1000", "2000", "5000", "12000"]);
    createMenuItems(createSelectMenu("移速", campdoc), ["无加成", "加10%", "加20%", "加30%"]);
}

function CreatebxList(str, str2, mydoc) {
    var campdoc = createList(str, mydoc)
    var campdoc1 = createList(str2, mydoc)
    createMenuItems(createSelectMenu("攻击力", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
    createMenuItems(createSelectMenu("血量", campdoc), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
    createMenuItems(createSelectMenu("移动速度", campdoc), ["无加成", "加25%", "加50%", "加100%"]);
    createMenuItems(createSelectMenu("刷新速度", campdoc), ["无加成", "加5%", "加10%", "加15%"]);
    createMenuItems(createSelectMenu("出兵类型", campdoc), ["普通兵线", "超级兵", "主宰先锋"]);
    createMenuItems(createSelectMenu("出兵路线", campdoc, true), ["对抗路", "中路", "发育路"], ["对抗路", "中路", "发育路"]);

    createMenuItems(createSelectMenu("攻击力", campdoc1), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);
    createMenuItems(createSelectMenu("血量", campdoc1), ["无加成", "加10%", "加25%", "加50%", "加75%", "加100%"]);

}

function CreatesjList(str, str2, mydoc) {

    var campdoc = createList(str, mydoc)
    var campdoc1 = createList(str2, mydoc)

    createMenuItems(createSelectMenu("攻击力", campdoc), ["无加成", "加25%", "加50%", "加100%"]);
    createMenuItems(createSelectMenu("攻击范围", campdoc), ["无加成", "加25%", "加50%"]);
    createMenuItems(createSelectMenu("血量", campdoc), ["无加成", "加25%", "加50%", "加100%"]);

    createMenuItems(createSelectMenu("攻击力", campdoc1), ["无加成", "加25%", "加50%", "加100%"]);
    createMenuItems(createSelectMenu("血量", campdoc1), ["无加成", "加25%", "加50%", "加100%"]);

}

var allputong = document.getElementsByClassName("putong")
var zhenyingDocBlue = document.getElementsByClassName("zhenying_blue")
var zhenyingDocRed = document.getElementsByClassName("zhenying_red")

function loadmenu() {
    var herolist = Array.from({ length: 5 }, (_, i) => (i + 1).toString() + "号")

    var xvanshouBlue = document.getElementsByClassName("xvanshou_blue")[0]
    var xvanshouRed = document.getElementsByClassName("xvanshou_red")[0]
    // 对于herolist中的每一个元素创建任务
    const herolistTasks = herolist.map((element, index) => {
        return () => {
            const item_str = element;
            CreateHeroList("蓝方" + item_str + "英雄属性", xvanshouBlue);
            CreateHeroList("红方" + item_str + "英雄属性", xvanshouRed);
        };
    });

    var mydoc = document.getElementsByClassName("CustomSettings")[2]
    var campdoc = createList("胜利条件", mydoc)


    function processNextTask() {
        if (tasks.length > 0) {
            const task = tasks.shift();
            task();
            requestAnimationFrame(processNextTask);
        } else {
            document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")[0].style.display = ""
            document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")[0].style.display = ""
            window.loadmenu = true
            customdialog.open = true
            document.getElementsByClassName("blueheronum")[0].value = "1"
            document.getElementsByClassName("redheronum")[0].value = "1"
            var custom_json = JSON.parse(localStorage.getItem("custom_cof"))

            if (localStorage.getItem("wzzdy_customsettip") != "0.1") {
                mdui.alert({
                    headline: "提示",
                    description: "网页偏重自定义属性 网页为自定义属性提供了高级设置 你可以手动在高级设置中实现更多高级功能 高级配置与该配置绑定 例如 你可以设置随机生成和打乱指定自定义属性 实现属性与地图模式 禁用英雄的绑定 等等",
                    confirmText: "我知道了",
                    onConfirm: () => localStorage.setItem("wzzdy_customsettip", "0.1"),
                });
            }


            try {
                选择自定义配置(custom_json[document.querySelectorAll(".myedit")[2].value])
            } catch (e) {
                console.log(e)
            }
        }
    }

    // 将所有创建和添加元素的任务放在一个数组里
    const tasks = [
        () => CreateHeroList("英雄属性", allputong[0]),
        () => CreateHeroList("蓝方英雄属性", zhenyingDocBlue[0]),
        () => CreateHeroList("红方英雄属性", zhenyingDocRed[0]),
        () => CreatebxList("兵线属性", "野怪属性", allputong[1]),
        () => CreatebxList("蓝方兵线属性", "蓝方野怪属性", zhenyingDocBlue[1]),
        () => CreatebxList("红方兵线属性", "红方野怪属性", zhenyingDocRed[1]),
        () => CreatesjList("防御塔属性", "水晶属性", allputong[2]),
        () => createMenuItems(createSelectMenu("胜利条件", campdoc), ["摧毁水晶", "摧毁任意一个一塔", "摧毁任意一个二塔", "摧毁任意一个三塔", "3个总击败", "20个总击败", "30个总击败", "40个总击败", "1个助攻", "5个助攻", "10个助攻",]).id = "mytiao",
        () => CreatesjList("蓝方防御塔属性", "蓝方水晶属性", zhenyingDocBlue[2]),
        () => CreatesjList("红方防御塔属性", "红方水晶属性", zhenyingDocRed[2]),
    ];

    tasks.push(...herolistTasks);

    requestAnimationFrame(processNextTask);
}


function zhenying_panduan(pos, defvalue, xvanshou) {
    document.getElementsByClassName("zhenying_xz")[pos].style.display = ""
    if (defvalue == "blue") {
        if (xvanshou) {
            document.getElementsByClassName("xvanshou")[pos].style.display = "none"
        }
        zhenyingDocBlue[pos].style.display = ""
        zhenyingDocRed[pos].style.display = "none"
    } else if (defvalue == "red") {
        if (xvanshou) {
            document.getElementsByClassName("xvanshou")[pos].style.display = "none"
        }
        zhenyingDocBlue[pos].style.display = "none"
        zhenyingDocRed[pos].style.display = ""
    }
}

document.getElementsByClassName("zhenying_xz")[0].addEventListener("change", function () {
    zhenying_panduan(0, this.value, true)
})
document.getElementsByClassName("zhenying_xz")[1].addEventListener("change", function () {
    zhenying_panduan(1, this.value)
})
document.getElementsByClassName("zhenying_xz")[2].addEventListener("change", function () {
    zhenying_panduan(2, this.value)
})

function custom_panduan(pos, defvalue, xvanshou) {
    if (defvalue == "zhenying") {
        document.getElementsByClassName("zhenying_xz")[pos].style.display = ""
        allputong[pos].style.display = "none"
        var mdefvalue = document.getElementsByClassName("zhenying_xz")[pos].value
        if (mdefvalue == "blue") {
            document.getElementsByClassName("zhenying")[pos].style.display = ""
            if (xvanshou) {
                document.getElementsByClassName("xvanshou")[pos].style.display = "none"
            }
            zhenyingDocBlue[pos].style.display = ""
            zhenyingDocRed[pos].style.display = "none"
        } else {
            document.getElementsByClassName("zhenying")[pos].style.display = ""
            if (xvanshou) {
                document.getElementsByClassName("xvanshou")[pos].style.display = "none"
            }
            zhenyingDocBlue[pos].style.display = "none"
            zhenyingDocRed[pos].style.display = ""
        }
    } else if (defvalue == "xvanshou") {
        allputong[pos].style.display = "none"
        document.getElementsByClassName("zhenying")[pos].style.display = "none"
        document.getElementsByClassName("zhenying_xz")[pos].style.display = "none"
        document.getElementsByClassName("xvanshou")[pos].style.display = ""
    } else if (defvalue == "all") {
        allputong[pos].style.display = ""
        document.getElementsByClassName("zhenying")[pos].style.display = "none"
        document.getElementsByClassName("zhenying_xz")[pos].style.display = "none"
        if (xvanshou) {
            document.getElementsByClassName("xvanshou")[pos].style.display = "none"
        }
    }
}

document.getElementsByClassName("setmode")[0].addEventListener("change", function () {
    custom_panduan(0, this.value, true)
})

document.getElementsByClassName("setmode")[1].addEventListener("change", function () {
    custom_panduan(1, this.value)
})

document.getElementsByClassName("setmode")[2].addEventListener("change", function () {
    custom_panduan(2, this.value)
})

document.getElementsByClassName("blueheronum")[0].addEventListener("change", function () {
    var defvalue = this.value
    var doc = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
    for (let index = 0; index < doc.length; index++) {
        const element = doc[index];
        if (index + 1 == [parseInt(defvalue)]) {
            element.style.display = ""
        } else {
            element.style.display = "none"
        }

    }
})

document.getElementsByClassName("redheronum")[0].addEventListener("change", function () {
    var defvalue = this.value
    var doc = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")
    for (let index = 0; index < doc.length; index++) {
        const element = doc[index];
        if (index + 1 == [parseInt(defvalue)]) {
            element.style.display = ""
        } else {
            element.style.display = "none"
        }

    }
})

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // 交换元素
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleArray2(Arr1, Arr2, randomtab) {
    var combinedArr = Arr1.concat(Arr2);
    // 打乱合并后的数组
    shuffleSelectedPositions(combinedArr, randomtab);
    // 将打乱后的数组拆分成两个数组
    var shuffledArr1 = combinedArr.slice(0, Arr1.length);
    var shuffledArr2 = combinedArr.slice(Arr1.length);
    // 打印结果（示例）
    console.log("打乱前:", Arr1, Arr2);
    console.log("打乱后的:", shuffledArr1, shuffledArr2);
    return [shuffledArr1, shuffledArr2]
}


function shuffleSelectedPositions(arr, positionsToShuffle) {
    const shuffledArr = arr;
    const length = positionsToShuffle.length;

    for (let i = 0; i < length; i++) {
        const currentPos = positionsToShuffle[i] - 1;
        const randomPos = Math.floor(Math.random() * length);

        // 使用数组解构交换元素
        [shuffledArr[currentPos], shuffledArr[positionsToShuffle[randomPos] - 1]] = [shuffledArr[positionsToShuffle[randomPos] - 1], shuffledArr[currentPos]];
    }

    return shuffledArr;
}



function getRandomElementFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


function shuffleArray3(Arr1, Arr2, randomtab, postab) {
    var combinedArr = Arr1.concat(Arr2);
    // 打乱合并后的数组
    for (let index = 0; index < postab.length; index++) {
        const pos = postab[index] - 1
        let random = getRandomElementFromArray(randomtab)
        combinedArr[pos] = random
    }
    // 将打乱后的数组拆分成两个数组
    var shuffledArr1 = combinedArr.slice(0, Arr1.length);
    var shuffledArr2 = combinedArr.slice(Arr1.length);
    console.log("随机生成前:", Arr1, Arr2);
    console.log("随机生成后的:", shuffledArr1, shuffledArr2);
    return [shuffledArr1, shuffledArr2]
}

function shuffleArray4(Arr, randomtab, postab) {
    const combinedArr = [...Arr];
    // 打乱合并后的数组
    for (let index = 0; index < postab.length; index++) {
        const pos = postab[index] - 1
        let random = getRandomElementFromArray(randomtab)
        combinedArr[pos] = random
    }
    console.log("随机生成前:", Arr);
    console.log("随机生成后的:", combinedArr);
    return combinedArr
}

function decrementNumberAfterColon(inputString) {
    return inputString.replace(/:(\d+)$/, (match, capturedNumber) => `:${parseInt(capturedNumber, 10) - 1}`);
}


function makejson(HeroList, bxList, ygList, fytList, sjList, gjjson) {

    //懒得优化的代码 或许会在有生之年优化吧

    var HeroList_blue = HeroList[0]
    var HeroList_red = HeroList[1]

    var expList_blue = HeroList_blue[0]
    var expList_red = HeroList_red[0]


    var fashuList_blue = HeroList_blue[1]
    var fashuList_red = HeroList_red[1]

    var wuliList_blue = HeroList_blue[2]
    var wuliList_red = HeroList_red[2]

    var cdList_blue = HeroList_blue[3]
    var cdList_red = HeroList_red[3]

    var jinbiList_blue = HeroList_blue[4]
    var jinbiList_red = HeroList_red[4]

    var ysList_blue = HeroList_blue[5]
    var ysList_red = HeroList_red[5]

    var sjsc = gjjson[2]
    var sjdl = gjjson[3]

    function 判断随机生成数据(pos, randomtab, postab) {
        if (pos == 1) {
            const result = shuffleArray3(expList_blue, expList_red, randomtab, postab);
            expList_blue = result[0]
            expList_red = result[1]
        } else if (pos == 2) {
            const result = shuffleArray3(fashuList_blue, fashuList_red, randomtab, postab);
            fashuList_blue = result[0]
            fashuList_red = result[1]
        } else if (pos == 3) {
            const result = shuffleArray3(wuliList_blue, wuliList_red, randomtab, postab);
            wuliList_blue = result[0]
            wuliList_red = result[1]
        } else if (pos == 4) {
            const result = shuffleArray3(cdList_blue, cdList_red, randomtab, postab);
            cdList_blue = result[0]
            cdList_red = result[1]
        } else if (pos == 5) {
            const result = shuffleArray3(jinbiList_blue, jinbiList_red, randomtab, postab);
            jinbiList_blue = result[0]
            jinbiList_red = result[1]
        } else if (pos == 6) {
            const result = shuffleArray3(ysList_blue, ysList_red, randomtab, postab);
            ysList_blue = result[0]
            ysList_red = result[1]
        } else if (pos == 7) {
            bxList[0] = shuffleArray4(bxList[0], randomtab, postab);
        } else if (pos == 8) {
            bxList[1] = shuffleArray4(bxList[1], randomtab, postab);
        } else if (pos == 9) {
            bxList[2] = shuffleArray4(bxList[2], randomtab, postab);
        } else if (pos == 10) {
            bxList[3] = shuffleArray4(bxList[3], randomtab, postab);
        } else if (pos == 11) {
            bxList[4] = shuffleArray4(bxList[4], randomtab, postab);
        } else if (pos == 12) {
            bxList[5] = shuffleArray4(bxList[5], randomtab, postab);
        } else if (pos == 13) {
            ygList[0] = shuffleArray4(ygList[0], randomtab, postab);
        } else if (pos == 14) {
            ygList[1] = shuffleArray4(ygList[1], randomtab, postab);
        } else if (pos == 15) {
            fytList[0] = shuffleArray4(fytList[0], randomtab, postab);
        } else if (pos == 16) {
            fytList[1] = shuffleArray4(fytList[1], randomtab, postab);
        } else if (pos == 17) {
            fytList[2] = shuffleArray4(fytList[2], randomtab, postab);
        } else if (pos == 18) {
            sjList[0] = shuffleArray4(sjList[0], randomtab, postab);
        } else if (pos == 19) {
            sjList[1] = shuffleArray4(sjList[1], randomtab, postab);
        } else if (pos == 20) {
            sjList[2] = shuffleArray4(sjList[2], randomtab, postab);
        }
    }

    function 判断随机打乱数据(pos, randomtab) {
        if (pos == 1) {
            const result = shuffleArray2(expList_blue, expList_red, randomtab);
            expList_blue = result[0]
            expList_red = result[1]
        } else if (pos == 2) {
            const result = shuffleArray2(fashuList_blue, fashuList_red, randomtab);
            fashuList_blue = result[0]
            fashuList_red = result[1]
        } else if (pos == 3) {
            const result = shuffleArray2(wuliList_blue, wuliList_red, randomtab);
            wuliList_blue = result[0]
            wuliList_red = result[1]
        } else if (pos == 4) {
            const result = shuffleArray2(cdList_blue, cdList_red, randomtab);
            cdList_blue = result[0]
            cdList_red = result[1]
        } else if (pos == 5) {
            const result = shuffleArray2(jinbiList_blue, jinbiList_red, randomtab);
            jinbiList_blue = result[0]
            jinbiList_red = result[1]
        } else if (pos == 6) {
            const result = shuffleArray2(ysList_blue, ysList_red, randomtab);
            ysList_blue = result[0]
            ysList_red = result[1]
        } else if (pos == 7) {
            bxList[0] = shuffleArray(bxList[0]);
        } else if (pos == 8) {
            bxList[1] = shuffleArray(bxList[1]);
        } else if (pos == 9) {
            bxList[2] = shuffleArray(bxList[2]);
        } else if (pos == 10) {
            bxList[3] = shuffleArray(bxList[3]);
        } else if (pos == 11) {
            bxList[4] = shuffleArray(bxList[4]);
        } else if (pos == 12) {
            bxList[5] = shuffleArray(bxList[5]);
        } else if (pos == 13) {
            ygList[0] = shuffleArray(ygList[0]);
        } else if (pos == 14) {
            ygList[1] = shuffleArray(ygList[1]);
        } else if (pos == 15) {
            fytList[0] = shuffleArray(fytList[0]);
        } else if (pos == 16) {
            fytList[1] = shuffleArray(fytList[1]);
        } else if (pos == 17) {
            fytList[2] = shuffleArray(fytList[2]);
        } else if (pos == 18) {
            sjList[0] = shuffleArray(sjList[0]);
        } else if (pos == 19) {
            sjList[1] = shuffleArray(sjList[1]);
        }
    }

    if (sjsc != "" && isJSON(sjsc)) {
        var scgz = JSON.parse(sjsc)

        for (item in scgz) {
            // 使用闭包解决
            (function (item_str) {
                scgz[item_str].forEach(element => {
                    var [randomtab, postab] = element.split(":")
                    randomtab = randomtab.match(/\d+/g).map(Number);
                    postab = postab.match(/\d+/g).map(Number);
                    判断随机生成数据(item_str, randomtab, postab)
                });
            })(item);
        }

    }

    if (sjdl != "" && isJSON(sjdl)) {
        var scgz1 = JSON.parse(sjdl)

        for (item in scgz1) {
            // 使用闭包解决
            (function (item_str) {
                scgz1[item_str].forEach(element => {
                    let randomtab = element.match(/\d+/g).map(Number);
                    判断随机打乱数据(item_str, randomtab)
                });
            })(item);
        }

    }


    var jsondo = [
        "0:" + expList_blue[0],
        "51:" + expList_blue[1],
        "56:" + expList_blue[2],
        "61:" + expList_blue[3],
        "66:" + expList_blue[4],
        "28:" + expList_red[0],
        "71:" + expList_red[1],
        "76:" + expList_red[2],
        "81:" + expList_red[3],
        "86:" + expList_red[4],
        "1:" + fashuList_blue[0],
        "52:" + fashuList_blue[1],
        "57:" + fashuList_blue[2],
        "62:" + fashuList_blue[3],
        "67:" + fashuList_blue[4],
        "29:" + fashuList_red[0],
        "72:" + fashuList_red[1],
        "77:" + fashuList_red[2],
        "82:" + fashuList_red[3],
        "87:" + fashuList_red[4],
        "2:" + wuliList_blue[0],
        "53:" + wuliList_blue[1],
        "58:" + wuliList_blue[2],
        "63:" + wuliList_blue[3],
        "68:" + wuliList_blue[4],
        "30:" + wuliList_red[0],
        "73:" + wuliList_red[1],
        "78:" + wuliList_red[2],
        "83:" + wuliList_red[3],
        "88:" + wuliList_red[4],
        "3:" + cdList_blue[0],
        "21:" + cdList_blue[0],
        "54:" + cdList_blue[1],
        "91:" + cdList_blue[1],
        "59:" + cdList_blue[2],
        "92:" + cdList_blue[2],
        "64:" + cdList_blue[3],
        "93:" + cdList_blue[3],
        "69:" + cdList_blue[4],
        "94:" + cdList_blue[4],
        "31:" + cdList_red[0],
        "47:" + cdList_red[0],
        "74:" + cdList_red[1],
        "95:" + cdList_red[1],
        "79:" + cdList_red[2],
        "96:" + cdList_red[2],
        "84:" + cdList_red[3],
        "97:" + cdList_red[3],
        "89:" + cdList_red[4],
        "98:" + cdList_red[4],
        "4:" + jinbiList_blue[0],
        "55:" + jinbiList_blue[1],
        "60:" + jinbiList_blue[2],
        "65:" + jinbiList_blue[3],
        "70:" + jinbiList_blue[4],
        "32:" + jinbiList_red[0],
        "75:" + jinbiList_red[1],
        "80:" + jinbiList_red[2],
        "85:" + jinbiList_red[3],
        "90:" + jinbiList_red[4],
        "106:" + ysList_blue[0],
        "107:" + ysList_blue[1],
        "108:" + ysList_blue[2],
        "109:" + ysList_blue[3],
        "110:" + ysList_blue[4],
        "111:" + ysList_red[0],
        "112:" + ysList_red[1],
        "113:" + ysList_red[2],
        "114:" + ysList_red[3],
        "115:" + ysList_red[4],
        "5:" + bxList[0][0],
        "33:" + bxList[0][1],
        "6:" + bxList[1][0],
        "34:" + bxList[1][1],
        "7:" + bxList[2][0],
        "35:" + bxList[2][1],
        "8:" + bxList[3][0],
        "36:" + bxList[3][1],
        "9:" + bxList[4][0],
        "37:" + bxList[4][1],
        /*
        "10:" + bxList[5][0],
        "38:" + bxList[5][1],
        */
        "11:" + ygList[0][0],
        "39:" + ygList[0][1],
        "12:" + ygList[1][0],
        "40:" + ygList[1][1],
        "13:" + fytList[0][0],
        "22:" + fytList[0][0],
        "41:" + fytList[0][1],
        "48:" + fytList[0][1],
        "15:" + fytList[1][0],
        "24:" + fytList[1][0],
        "43:" + fytList[1][1],
        "50:" + fytList[1][1],
        "14:" + fytList[2][0],
        "23:" + fytList[2][0],
        "42:" + fytList[2][1],
        "49:" + fytList[2][1],
        "16:" + sjList[0][0],
        "44:" + sjList[0][1],
        "17:" + sjList[1][0],
        "45:" + sjList[1][1],
    ]

    for (let index = 0; index < jsondo.length; index++) {
        const element = jsondo[index];
        const value = element.split(":")[1]
        if (value == "" || value == "0") {
            throw "自定义配置信息有误 点击自定义配置的管理配置手动保存配置来更新该配置即可解决该问题"
        }
        if (value == "1") {
            jsondo.splice(index, 1);
            index--;
        } else {
            jsondo[index] = decrementNumberAfterColon(element)
        }

    }

    var bxdata = bxList[5]
    var blue_bxdata = bxdata[0]
    var red_bxdata = bxdata[1]

    var add_bxdata = []

    if (blue_bxdata != "null") {
        add_bxdata.push("10:" + blue_bxdata)
    }

    if (red_bxdata != "null") {
        add_bxdata.push("38:" + red_bxdata)
    }

    jsondo = [...jsondo, ...add_bxdata]

    var gamemode = sjList[2]

    var gamelist = {
        1: [],
        2: ["19:1"],
        3: ["19:1", "103:1"],
        4: ["19:1", "103:2"],
        5: ["19:2"],
        6: ["19:2", "20:1"],
        7: ["19:2", "20:2"],
        8: ["19:2", "20:3"],
        9: ["19:2", "105:1"],
        10: ["19:2", "105:1", "104:1"],
        11: ["19:2", "105:1", "104:2"],

    }

    jsondo = [...jsondo, ...gamelist[gamemode]]


    return jsondo;
}



function 加载自定义配置() {
    var menudoc = document.querySelectorAll(".mymenu")[2]

    var ismenu
    if (customdialog.open == true) {
        ismenu = true
        menudoc = customdialog.getElementsByClassName("mymenu")[0]
    }

    var childnodes = menudoc.childNodes
    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))


    for (let index = 0; index < childnodes.length; index++) {
        const element = childnodes[index];
        if (element.className != "search_edit") {
            element.remove()
            index--
        }
    }

    if (ismenu != true) {
        // 创建新的 mdui-menu-item 元素  
        var menuItem = document.createElement('mdui-menu-item');
        // 设置文本内容  
        menuItem.textContent = "管理配置";
        menuItem.isadd = true
        menuItem.onclick = function () {

            const loadmenu = window.loadmenu
            if (loadmenu == true) {
                try {
                    选择自定义配置(custom_json[document.querySelectorAll(".myedit")[2].value])
                } catch (e) {
                    console.log(e)
                }
                customdialog.open = true
            } else {
                mdui_snackbar({
                    message: "加载中",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
                loadmenu()
            }

        }

        menudoc.appendChild(menuItem);
    }

    if (localStorage.getItem("custom_cof")) {

        if (Object.keys(custom_json).length == 0) {
            mdui_snackbar({
                message: tip1,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
            return
        }

        if (ismenu != true) {
            for (item in custom_json) {
                // 使用闭包解决
                (function (item_str) {
                    // 创建新的 mdui-menu-item 元素  
                    var menuItem = document.createElement('mdui-menu-item');
                    // 设置文本内容  
                    menuItem.textContent = item_str;
                    menuItem.onclick = function () {
                        localStorage.setItem("customs", item_str)
                        document.querySelectorAll(".myedit")[2].value = item_str;
                    }
                    // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
                    menudoc.appendChild(menuItem);
                })(item);
            }
        } else {
            for (item in custom_json) {
                // 使用闭包解决
                (function (item_str) {
                    // 创建新的 mdui-menu-item 元素  
                    var menuItem = document.createElement('mdui-menu-item');
                    // 设置文本内容  
                    menuItem.textContent = item_str;
                    menuItem.onclick = function () {
                        localStorage.setItem("customs", item_str)
                        document.querySelectorAll(".myedit")[2].value = item_str;
                        选择自定义配置(custom_json[document.querySelectorAll(".myedit")[2].value])
                    }
                    // 将新创建的元素添加到 DOM 中，例如添加到 body 中  
                    menudoc.appendChild(menuItem);
                })(item);
            }
        }
    } else {
        mdui_snackbar({
            message: tip1,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return
    }

}

function 判断出线数值(myvalue) {
    var isdkl
    var iszd
    var isfyl
    var bxmode
    myvalue.forEach(element => {
        if (element.includes("对抗路")) {
            isdkl = true
        } else if (element.includes("中路")) {
            iszd = true
        }
        else if (element.includes("发育路")) {
            isfyl = true
        }
    });

    // 无 0
    if (isdkl != true && iszd != true && isfyl != true) {
        bxmode = 0
        //1 1
    } else if (isdkl && iszd != true && isfyl != true) {
        bxmode = 1
        //2 2
    } else if (isdkl != true && iszd && isfyl != true) {
        bxmode = 2
        //21 3
    } else if (isdkl && iszd && isfyl != true) {
        bxmode = 3
        //3 4
    } else if (isdkl != true && iszd != true && isfyl) {
        bxmode = 4
        //31 5
    } else if (isdkl && iszd != true && isfyl) {
        bxmode = 5
        //32 6
    } else if (isdkl != true && iszd && isfyl) {
        bxmode = 6
        //本段在实际上不存在 为网页设计
    } else if (isdkl && iszd && isfyl) {
        return "null"
    }
    return bxmode
}

function 判断数据(doc) {
    if (doc.value == "") {
        doc.value = 1
    }

    let value = doc.value

    return value
}

function 获取野怪数据(bingxiandoc, func, func2, func3, bingxiandoc2) {
    //先循环五次 出兵路线需要特殊判断
    for (let index = 0; index < 5; index++) {
        if (bingxiandoc2) {
            var mydoc = bingxiandoc[index];
            var mydoc2 = bingxiandoc2[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc2))
            func(mdata)
        } else {
            var mydoc = bingxiandoc[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc))
            func(mdata)
        }
    }

    if (bingxiandoc2) {
        var bxvalue = 判断出线数值(bingxiandoc[5].value)
        var bxvalue2 = 判断出线数值(bingxiandoc2[5].value)
        var mdata = []
        mdata.push(bxvalue)
        mdata.push(bxvalue2)
        func2(mdata)
    } else {
        var myvalue = 判断出线数值(bingxiandoc[5].value)
        var mdata = []
        mdata.push(myvalue)
        mdata.push(myvalue)
        func2(mdata)
    }

    //野怪list
    for (let index = 6; index < 8; index++) {
        if (bingxiandoc2) {
            const mydoc = bingxiandoc[index];
            const mydoc2 = bingxiandoc2[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc2))
            func3(mdata)
        } else {
            const mydoc = bingxiandoc[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc))
            func3(mdata)
        }
    }
}

function 获取防御塔属性(fytsjdoc, func, func2, func3, fytsjdoc2) {
    //获取防御塔属性
    for (let index = 0; index < 3; index++) {

        if (fytsjdoc2) {
            const mydoc = fytsjdoc[index];
            const mydoc2 = fytsjdoc2[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc2))
            func(mdata)
        } else {
            const mydoc = fytsjdoc[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc))
            func(mdata)
        }
    }

    //获取水晶属性
    for (let index = 3; index < 5; index++) {

        if (fytsjdoc2) {
            const mydoc = fytsjdoc[index];
            const mydoc2 = fytsjdoc2[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc2))
            func2(mdata)
        } else {
            const mydoc = fytsjdoc[index];
            var mdata = []
            mdata.push(判断数据(mydoc))
            mdata.push(判断数据(mydoc))
            func2(mdata)
        }
    }

    func3(判断数据(document.getElementById("mytiao")))

}


function 获取选择自定义名() {

    var bxConfList = []
    var ygConfList = []
    var ygmode = document.getElementsByClassName("setmode")[1].value
    if (ygmode == "all") {

        var bingxiandoc = allputong[1].getElementsByTagName("mdui-select")
        获取野怪数据(bingxiandoc, function (myvalue) {
            bxConfList.push(myvalue)
        }, function (myvalue) {
            bxConfList.push(myvalue)
        }, function (myvalue) {
            ygConfList.push(myvalue)
        })



    } else if (ygmode == "zhenying") {
        var bingxiandoc_blue = zhenyingDocBlue[1].getElementsByTagName("mdui-select")
        var bingxiandoc_red = zhenyingDocRed[1].getElementsByTagName("mdui-select")


        获取野怪数据(bingxiandoc_blue, function (myvalue) {
            bxConfList.push(myvalue)
        }, function (myvalue) {
            bxConfList.push(myvalue)
        }, function (myvalue) {
            ygConfList.push(myvalue)
        }, bingxiandoc_red)

    }

    var fytConfList = []
    var sjConfList = []
    var sjmode = document.getElementsByClassName("setmode")[2].value
    if (sjmode == "all") {

        var fytsjdoc = allputong[2].getElementsByTagName("mdui-select")
        获取防御塔属性(fytsjdoc, function (myvalue) {
            fytConfList.push(myvalue)
        }, function (myvalue) {
            sjConfList.push(myvalue)
        }, function (myvalue) {
            sjConfList.push(myvalue)
        })

    } else if (sjmode == "zhenying") {

        var fytsjdoc_blue = zhenyingDocBlue[2].getElementsByTagName("mdui-select")
        var fytsjdoc_red = zhenyingDocRed[2].getElementsByTagName("mdui-select")

        获取防御塔属性(fytsjdoc_blue, function (myvalue) {
            fytConfList.push(myvalue)
        }, function (myvalue) {
            sjConfList.push(myvalue)
        }, function (myvalue) {
            sjConfList.push(myvalue)
        }, fytsjdoc_red)

    }


    var HeroList = []


    var value = document.getElementsByClassName("setmode")[0].value
    if (value == "zhenying") {

        var bluedoc = document.getElementsByClassName("zhenying_blue")[0].getElementsByTagName("mdui-select")
        var reddoc = document.getElementsByClassName("zhenying_red")[0].getElementsByTagName("mdui-select")
        var HeroList_blue = []
        var HeroList_red = []



        for (let index = 0; index < 6; index++) {
            var herodata_blue = []
            var herodata_red = []
            for (let i = 0; i < 5; i++) {
                herodata_blue.push(判断数据(bluedoc[index]))
                herodata_red.push(判断数据(reddoc[index]))
            }

            HeroList_blue.push(herodata_blue)
            HeroList_red.push(herodata_red)

        }

        HeroList.push(HeroList_blue)
        HeroList.push(HeroList_red)

    } else if (value == "xvanshou") {

        var bluedoc = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-select")
        var reddoc = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-select")
        var bluelist = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
        var redlist = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")
        var HeroList_blue = []
        var HeroList_red = []


        for (let index = 0; index < 6; index++) {

            var herodata_blue = []
            var herodata_red = []

            for (let i = 0; i < 5; i++) {
                herodata_blue.push(判断数据(bluelist[i].getElementsByTagName("mdui-select")[index]))
                herodata_red.push(判断数据(redlist[i].getElementsByTagName("mdui-select")[index]))
            }

            HeroList_blue.push(herodata_blue)
            HeroList_red.push(herodata_red)

        }

        HeroList.push(HeroList_blue)
        HeroList.push(HeroList_red)


    } else {

        var HeroList_blue = []
        var HeroList_red = []


        for (let index = 0; index < 6; index++) {

            var herodata_blue = []
            var herodata_red = []

            for (let i = 0; i < 5; i++) {
                herodata_blue.push(判断数据(allputong[0].getElementsByTagName("mdui-select")[index]))
                herodata_red.push(判断数据(allputong[0].getElementsByTagName("mdui-select")[index]))
            }

            HeroList_blue.push(herodata_blue)
            HeroList_red.push(herodata_red)

        }

        HeroList.push(HeroList_blue)
        HeroList.push(HeroList_red)


    }

    if (HeroList.length == 0) {
        return null
    }

    var alljson = []
    alljson.push(HeroList)
    alljson.push(bxConfList)
    alljson.push(ygConfList)
    alljson.push(fytConfList)
    alljson.push(sjConfList)

    console.log(alljson)

    return JSON.stringify(alljson)
}

function 设置自定义项目(myindex, endindex, myjson, doc) {
    for (let index = myindex; index < endindex; index++) {
        //将下标改为从0开始
        var i = index - myindex
        var element = myjson[i][0];
        doc[index].value = element;
    }
}

function 设置自定义项目2(myindex, endindex, myjson, doc, doc2) {
    for (let index = myindex; index < endindex; index++) {
        //将下标改为从0开始
        var i = index - myindex
        var element = myjson[i][0];
        doc[index].value = element
        var element = myjson[i][1];
        doc2[index].value = element
    }
}


function 选择自定义配置(json) {
    if (typeof json == "undefined") {
        return
    }

    var alldoc = customdialog.getElementsByTagName("mdui-select")
    for (let index = 0; index < alldoc.length; index++) {
        alldoc[index].value = alldoc[index].defvalue
    }

    var yxvalue = json.yxtype
    var bxvalue = json.bxtype
    var sjvalue = json.sjtype

    document.getElementsByClassName("setmode")[0].value = yxvalue
    document.getElementsByClassName("setmode")[1].value = bxvalue
    document.getElementsByClassName("setmode")[2].value = sjvalue

    var myjson = JSON.parse(json.myjson)
    edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
    if (json.adjson) {
        var ccc = json.adjson
        edittt[0].value = ccc[0]
        edittt[1].value = ccc[1]
        edittt[2].data = ccc[2]
        edittt[3].data = ccc[3]
    } else {
        edittt[0].value = ""
        edittt[1].value = ""
        edittt[2].data = ""
        edittt[3].data = ""
    }


    var json_herolist = myjson[0]
    var json_bxlist = myjson[1]
    var json_yglist = myjson[2]
    var json_fytlist = myjson[3]
    var json_sjlist = myjson[4]

    const bxjsonMap = {
        0: [],
        1: ["对抗路"],
        2: ["中路"],
        3: ["对抗路", "中路"],
        4: ["发育路"],
        5: ["对抗路", "发育路"],
        6: ["中路", "发育路"],
        "null": ["对抗路", "中路", "发育路"],
    };

    if (bxvalue == "all") {
        //先循环五次 出兵路线需要特殊判断
        var mduiDoc = allputong[1].getElementsByTagName("mdui-select")
        var myjson = json_bxlist
        var myjson2 = json_yglist
        设置自定义项目(0, 5, myjson, mduiDoc)
        var myvalue = myjson[myjson.length - 1][0]
        mduiDoc[5].value = bxjsonMap[myvalue];
        设置自定义项目(6, 8, myjson2, mduiDoc)
    } else if (bxvalue == "zhenying") {
        var bluedoc = zhenyingDocBlue[1].getElementsByTagName("mdui-select")
        var reddoc = zhenyingDocRed[1].getElementsByTagName("mdui-select")
        var myjson = json_bxlist
        var myjson2 = json_yglist
        设置自定义项目2(0, 5, myjson, bluedoc, reddoc)
        var myvalue = myjson[myjson.length - 1][0]
        bluedoc[5].value = bxjsonMap[myvalue];
        var myvalue = myjson[myjson.length - 1][1]
        reddoc[5].value = bxjsonMap[myvalue];
        设置自定义项目2(6, 8, json_yglist, bluedoc, reddoc)
    }

    if (sjvalue == "all") {
        var myjson = json_fytlist
        var myjson2 = json_sjlist
        var mduiDoc = allputong[2].getElementsByTagName("mdui-select")
        设置自定义项目(0, 3, myjson, mduiDoc)
        设置自定义项目(3, 5, myjson2, mduiDoc)
    } else if (sjvalue == "zhenying") {
        var bluedoc = zhenyingDocBlue[2].getElementsByTagName("mdui-select")
        var reddoc = zhenyingDocRed[2].getElementsByTagName("mdui-select")

        var myjson = json_fytlist
        var myjson2 = json_fytlist

        设置自定义项目2(0, 3, myjson, bluedoc, reddoc)
        设置自定义项目2(3, 5, myjson, bluedoc, reddoc)
    }

    var myvalue = json_sjlist[json_sjlist.length - 1]
    document.getElementById("mytiao").value = myvalue;


    if (yxvalue == "zhenying") {

        var bluedoc = document.getElementsByClassName("zhenying_blue")[0]
        var reddoc = document.getElementsByClassName("zhenying_red")[0]



        for (let index = 0; index < 6; index++) {
            var element = json_herolist[0][index];
            bluedoc.getElementsByTagName("mdui-select")[index].value = element[0]
            var element = json_herolist[1][index];
            reddoc.getElementsByTagName("mdui-select")[index].value = element[0]
        }


    } else if (yxvalue == "xvanshou") {

        var bluelist = document.getElementsByClassName("xvanshou_blue")[0].getElementsByTagName("mdui-list")
        var redlist = document.getElementsByClassName("xvanshou_red")[0].getElementsByTagName("mdui-list")


        for (let index = 0; index < 6; index++) {
            for (let i = 0; i < 5; i++) {
                var element = json_herolist[0][index];
                bluelist[i].getElementsByTagName("mdui-select")[index].value = element[i]
                var element = json_herolist[1][index];
                redlist[i].getElementsByTagName("mdui-select")[index].value = element[i]
            }

        }

    } else {

        for (let index = 0; index < 6; index++) {
            var element = json_herolist[0][index];
            allputong[0].getElementsByTagName("mdui-select")[index].value = element[0]
        }

    }



}


var customButton = document.getElementsByClassName("custombutton")

customButton[0].onclick = function () {
    加载自定义配置()
}

customButton[1].onclick = function () {
    mdui.prompt({
        headline: "新建配置",
        description: "请输入配置名以新建配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            var 自定义名 = 获取选择自定义名()
            var custom_json
            if (localStorage.getItem("custom_cof")) {
                custom_json = JSON.parse(localStorage.getItem("custom_cof"))
            } else {
                custom_json = {}
            }

            if (value == "") {
                var Rand = Math.random()
                var mineId = Math.round(Rand * 100000000)
                value = "未命名" + mineId.toString()
            }
            if (isJSON(value)) {
                mdui.alert({
                    headline: "提示",
                    description: "保存失败 保存配置不可是json 请输入正常字符串",
                    confirmText: "我知道了",
                    onConfirm: () => console.log("confirmed"),
                });
                return
            }
            custom_json[value] = {
                myjson: 自定义名,
                yxtype: document.getElementsByClassName("setmode")[0].value,
                bxtype: document.getElementsByClassName("setmode")[1].value,
                sjtype: document.getElementsByClassName("setmode")[2].value,
                adjson: [edittt[0].value, edittt[1].value, edittt[2].data, edittt[3].data]
            }
            console.log(custom_json)
            localStorage.setItem("custom_cof", JSON.stringify(custom_json))
            localStorage.setItem("customs", value)
            document.querySelectorAll(".myedit")[2].value = value;
            加载自定义配置()
            mdui_snackbar({
                message: "新建配置成功",
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        },
        onCancel: () => console.log("canceled"),
    });
}

customButton[2].onclick = function () {
    var 自定义名 = 获取选择自定义名()
    edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
    var custom_json = {}
    custom_json = {
        myjson: 自定义名,
        yxtype: document.getElementsByClassName("setmode")[0].value,
        bxtype: document.getElementsByClassName("setmode")[1].value,
        sjtype: document.getElementsByClassName("setmode")[2].value,
        adjson: [edittt[0].value, edittt[1].value, edittt[2].data, edittt[3].data]
    }
    复制文本(JSON.stringify(custom_json))
}

customButton[3].onclick = function () {
    mdui.prompt({
        headline: "导入配置",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            try {
                选择自定义配置(JSON.parse(value))
                mdui_snackbar({
                    message: tip3,
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            } catch {
                mdui_snackbar({
                    message: "输入配置有误",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            }
        },
        onCancel: () => console.log("canceled"),
    });
}

customButton[4].onclick = function () {
    if (localStorage.getItem("custom_cof")) {
        var editvalue = document.querySelectorAll(".myedit")[2].value
        if (editvalue) {
            mdui.confirm({
                headline: "提示",
                description: "是否删除该配置",
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: () => {
                    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
                    delete custom_json[editvalue]
                    localStorage.setItem("custom_cof", JSON.stringify(custom_json))
                    localStorage.setItem("customs", "")
                    document.querySelectorAll(".myedit")[2].value = ""

                    还原自定义配置()

                    mdui_snackbar({
                        message: "删除配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

customButton[5].onclick = function () {
    if (localStorage.getItem("custom_cof")) {
        var editvalue = document.querySelectorAll(".myedit")[2].value
        if (editvalue) {
            mdui.prompt({
                headline: "提示",
                description: tip4,
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: (value) => {
                    if (isJSON(value)) {
                        mdui.alert({
                            headline: "提示",
                            description: "保存失败 保存配置不可是json 请输入正常字符串",
                            confirmText: "我知道了",
                            onConfirm: () => console.log("confirmed"),
                        });
                        return
                    }
                    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
                    var custom_json = 修改键名(custom_json, editvalue, value);
                    localStorage.setItem("custom_cof", JSON.stringify(custom_json))
                    localStorage.setItem("customs", value)
                    document.querySelectorAll(".myedit")[2].value = value
                    加载自定义配置()
                    mdui_snackbar({
                        message: "重命名配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

customButton[6].onclick = function () {
    if (localStorage.getItem("custom_cof")) {
        var editvalue = document.querySelectorAll(".myedit")[2].value
        if (editvalue) {
            document.getElementsByClassName("suijitest")[0].open = true
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}

customButton[7].onclick = function () {
    if (localStorage.getItem("custom_cof")) {
        var editvalue = document.querySelectorAll(".myedit")[2].value
        if (editvalue) {
            mdui.confirm({
                headline: "提示",
                description: "是否保存该配置",
                confirmText: "确认",
                cancelText: "取消",
                onConfirm: () => {
                    var 自定义名 = 获取选择自定义名()
                    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
                    edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
                    custom_json[editvalue] = {
                        myjson: 自定义名,
                        yxtype: document.getElementsByClassName("setmode")[0].value,
                        bxtype: document.getElementsByClassName("setmode")[1].value,
                        sjtype: document.getElementsByClassName("setmode")[2].value,
                        adjson: [edittt[0].value, edittt[1].value, edittt[2].data, edittt[3].data]
                    }
                    localStorage.setItem("custom_cof", JSON.stringify(custom_json))
                    mdui_snackbar({
                        message: "保存配置成功",
                        action: "我知道了",
                        onActionClick: () => console.log("click action button")
                    });
                },
                onCancel: () => console.log("canceled"),
            });
        } else {
            mdui_snackbar({
                message: tip5,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        }
    } else {
        mdui_snackbar({
            message: tip2,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
    }
}


function 还原自定义配置() {
    var alldoc = customdialog.getElementsByTagName("mdui-select")
    for (let index = 0; index < alldoc.length; index++) {
        alldoc[index].value = alldoc[index].defvalue
    }
    edittt[0].value = ""
    edittt[1].value = ""
    edittt[2].data = ""
    edittt[3].data = ""
    customdialog.querySelector("mdui-tab").click()
    customdialog.bodyRef.value.scroll({ top: 0, behavior: 'smooth' });
}

customButton[8].onclick = function () {
    mdui.confirm({
        headline: "提示",
        description: "是否还原？",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
            还原自定义配置()
            mdui_snackbar({
                message: "还原成功",
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
        },
        onCancel: () => console.log("canceled"),
    });
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
    console.log('It is not a string!')
}

edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")

function checkpeiload() {
    peiedit = document.getElementsByClassName("peiedit")[0]
    const createcustom_tab = window.createcustom_tab
    if (createcustom_tab == true) {
        peiedit.open = true
    } else {
        mdui_snackbar({
            message: "加载中",
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        createcustom_tab(peiedit)
    }
}

edittt[2].onclick = function () {
    window.peimode = 2
    checkpeiload()
}
edittt[3].onclick = function () {
    window.peimode = 3
    checkpeiload()
}

function entclick() {
    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
    if (edittt[0].value != "" && typeof mydatajson[0][edittt[0].value] == "undefined") {
        mdui.alert({
            headline: "提示",
            description: "不支持的地图名称",
            confirmText: "我知道了",
            onConfirm: () => console.log("confirmed"),
        });
        return
    }

    custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"][0] = edittt[0].value
    custom_json[document.querySelectorAll(".myedit")[2].value]["adjson"][1] = edittt[1].value
    localStorage.setItem("custom_cof", JSON.stringify(custom_json))
    document.getElementsByClassName("suijitest")[0].open = false;
    mdui_snackbar({
        message: "保存成功",
        action: "我知道了",
        onActionClick: () => console.log("click action button")
    });

}

function getHexBackgroundColor(element) {
    // 获取元素的 background-color
    var computedStyles = window.getComputedStyle(element);
    var backgroundColor = computedStyles.getPropertyValue('background-color');

    // 检查是否为 RGB 或 RGBA 格式，如果是，转换为十六进制
    if (backgroundColor.match(/^rgb/) || backgroundColor.match(/^rgba/)) {
        // 提取 RGB 值
        var rgbValues = backgroundColor.match(/\d+/g).map(Number);
        // 转换为十六进制
        var hexColor = rgbValues.map(function (value) {
            return ('0' + value.toString(16)).slice(-2);
        }).join('');
        backgroundColor = '#' + hexColor;
    }

    return backgroundColor;
}

var colordoc = document.getElementsByClassName("color-preset")[0].childNodes

colordoc.forEach(element => {
    element.onclick = function () {

        if (color_message != "null") {
            mdui_snackbar({
                message: color_message,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
            return
        }

        color = getHexBackgroundColor(this)
        localStorage.setItem("wzzdy_mythemecolor", color)
        mdui.setColorScheme(color)
    }
});

document.getElementsByClassName('color-custom')[0].addEventListener('click', function (event) {
    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        event.preventDefault()
    }
});

document.getElementsByClassName("color-custom")[0].addEventListener('input', function () {
    color = this.value;
    localStorage.setItem("wzzdy_mycustomthemecolor", color)
    localStorage.setItem("wzzdy_mythemecolor", color)
    mdui.setColorScheme(color)
});

color_message = "null"

document.getElementsByClassName('color-img')[0].addEventListener('click', function (event) {
    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        event.preventDefault()
        return
    }
});

document.getElementsByClassName('color-img')[0].addEventListener('input', function () {

    if (this.files && this.files[0]) {
        color_message = "正在从壁纸提取颜色中 请耐心等待"
        const file = this.files[0];

        const reader = new FileReader();

        reader.onloadend = function () {
            const image = new Image();
            const blobUrl = URL.createObjectURL(file);
            image.src = blobUrl;
            mdui.getColorFromImage(image).then(color => {
                //清理blob
                URL.revokeObjectURL(blobUrl);
                //清空选择 防止重复选择不触发
                document.getElementsByClassName('color-img')[0].value = ""
                localStorage.setItem("wzzdy_mythemecolor", color)
                mdui.setColorScheme(color)
                color_message = "null"
                mdui_snackbar({
                    message: "从壁纸设置主题成功",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            });

        };

        reader.readAsDataURL(file); // 开始读取文件内容
    }
})

document.getElementsByClassName("colorbutton")[0].onclick = function () {

    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return
    }

    localStorage.setItem("wzzdy_mythemecolor", "null")
    mdui.removeColorScheme()
}

function bindsearch(view) {
    view.addEventListener("input", function () {
        childnodes = view.parentElement.getElementsByTagName("mdui-menu-item");
        for (let i = 0; i < childnodes.length; i++) {
            if (childnodes[i].isadd == true) {
                continue
            }
            let value = childnodes[i].textContent;
            if (value.includes(this.value)) {
                childnodes[i].style.display = "";
            } else {
                childnodes[i].style.display = "none";
            }
        }
    })
    view.parentElement.parentElement.addEventListener("closed", function () {
        childnodes = view.parentElement.getElementsByTagName("mdui-menu-item");
        //退出清空输入框
        view.value = ""

        for (let i = 0; i < childnodes.length; i++) {
            childnodes[i].style.display = "";
        }

    })
}

const allsearchview = document.getElementsByClassName("search_edit");
for (let i = 0; i < allsearchview.length; i++) {
    bindsearch(allsearchview[i]);
}


const search_heroedit = document.getElementsByClassName("search_heroedit")[0];
search_heroedit.addEventListener("input", function () {

    const view = search_heroedit
    let childnodes = view.parentElement.getElementsByClassName("myherolist")[0].childNodes;
    for (let i = 0; i < childnodes.length; i++) {
        if (childnodes[i].isshow == false) {
            continue
        }
        let value = childnodes[i].textContent;
        if (value.includes(view.value)) {
            childnodes[i].style.display = "";
        } else {
            childnodes[i].style.display = "none";
        }
    }
})

var mysnackbar = false;
function mdui_snackbar(args) {
    if (mysnackbar && mysnackbar.style.display != "none") {
        mysnackbar.remove()
    }
    mysnackbar = mdui.snackbar(args);
}

function createcheckbox(array, ele, defvalue, menu_item) {
    defvalue = defvalue.split(',')
    if (menu_item == null) {
        menu_item = Array.from({ length: array.length }, (_, index) => `${index + 1}`);
    }
    for (let index = 0; index < array.length; index++) {
        // 创建 mdui-checkbox
        var checkbox = document.createElement('mdui-checkbox');
        const value = menu_item[index].toString()
        checkbox.setAttribute('value', value);
        const element = array[index];
        checkbox.innerText = element;
        if (defvalue.includes(value)) {
            checkbox.checked = true
        }
        ele.appendChild(checkbox);
    }
}

function getIndexByTagName(element, parent) {
    if (!parent) parent = element.parentElement;


    // 过滤出具有指定tagName的子元素
    const siblingsWithTag = parent.getElementsByTagName(element.tagName.toLowerCase());

    // 找到当前元素在筛选后数组中的索引
    const index = [...siblingsWithTag].indexOf(element);

    return index !== -1 ? index : undefined; // 如果找到了就返回索引，否则返回undefined
}


function showeditdia(textv, func, ele) {
    let tabPanel = textv.parentElement.parentElement;
    let mindex = 0
    let radiodiv
    let result = ""
    let value


    let allnum = textv.allnum || tabPanel.allnum

    let step

    let allstr = []

    if (peimode == 2) {
        step = [
            "随机生成范围", function () {
                createcheckbox(textv.menu, radiodiv, value[0], textv.menu_item)
            },
        ]
    } else if (peimode == 3) {

        var customjson = JSON.parse(localStorage.getItem("custom_cof"))
        var myjson = JSON.parse(customjson[document.querySelectorAll(".myedit")[2].value].myjson)
        var json_herolist = myjson[0]
        var json_bxlist = myjson[1]
        var json_yglist = myjson[2]
        var json_fytlist = myjson[3]
        var json_sjlist = myjson[4]
        let list_pos = getIndexByTagName(textv.parentElement, tabPanel.parentElement);
        let textv_pos = getIndexByTagName(textv.parentElement);
        let alltab = []

        if (list_pos == 0) {
            //位置 属性的对应关系
            let blue = json_herolist[0][textv_pos]
            let red = json_herolist[1][textv_pos]
            alltab = [...blue, ...red]
        } else if (list_pos == 1) {
            let mydata = json_bxlist[textv_pos]
            //属性 位置的对应关系
            alltab = [mydata[0], mydata[1]]
        } else if (list_pos == 2) {
            let mydata = json_yglist[textv_pos]
            //属性 位置的对应关系
            alltab = [mydata[0], mydata[1]]
        } else if (list_pos == 3) {
            let mydata = json_fytlist[textv_pos]
            //属性 位置的对应关系
            alltab = [mydata[0], mydata[1]]
        } else if (list_pos == 4) {
            let mydata = json_sjlist[textv_pos]
            //属性 位置的对应关系
            alltab = [mydata[0], mydata[1]]
        } else if (list_pos == 5) {
            //胜利条件
            let mydata = json_sjlist[textv_pos]
            //属性 位置的对应关系
            alltab = [mydata]
        }

        allstr = alltab.map((char, index) => allnum[index] + " " + textv.menu[char - 1]);

        step = [
            "随机打乱范围", function () {
                createcheckbox(allstr, radiodiv, value[0])
                //跳过第二项的设置
                mindex++
            },
        ]
    }

    if (ele && ele.data) {
        value = ele.data.split(":")
    } else {
        value = ["", ""]
    }

    let dia = mdui.dialog({
        headline: "提示",
        description: step[0],
        body: '<p>如显示不全可向下滑动查看更多内容</p><div class="radiodiv"></div>',
        onOpen: (dia) => {
            radiodiv = dia.getElementsByClassName("radiodiv")[0]
            step[1]()
        },
        actions: [
            {
                text: "返回",
                onClick: () => {
                    return true;
                },
            },
            {
                text: "删除",
                onClick: () => {
                    if (ele == null) {
                        mdui_snackbar({
                            message: "你必须要创建配置后才能删除",
                            action: "我知道了",
                            onActionClick: () => console.log("click action button")
                        });
                        return false
                    }
                    ele.remove()
                    return true;
                },
            },
            {
                text: "全选",
                onClick: () => {
                    var childnodes = radiodiv.childNodes
                    for (let index = 0; index < childnodes.length; index++) {
                        const element = childnodes[index];
                        element.checked = true
                    }
                    return false;
                },
            },
            {
                text: "下一步",
                onClick: () => {
                    var childnodes = radiodiv.childNodes
                    let valuetab = []
                    let localstr

                    for (let index = 0; index < childnodes.length; index++) {
                        const element = childnodes[index];
                        if (element.checked == true) {
                            valuetab.push(element.value);
                        }
                    }

                    if ((mindex == 0 || peimode == 3) && valuetab.length < 2) {
                        if (childnodes.length == 1) {
                            mdui_snackbar({
                                message: "该项不支持设置该操作 请返回选择其他选项",
                                action: "我知道了",
                                onActionClick: () => console.log("click action button")
                            });
                            return false
                        }
                        mdui_snackbar({
                            message: "你必须至少选择两个选项",
                            action: "我知道了",
                            onActionClick: () => console.log("click action button")
                        });
                        return false
                    } else if (valuetab.length == 0) {
                        mdui_snackbar({
                            message: "你必须至少选择一个选项",
                            action: "我知道了",
                            onActionClick: () => console.log("click action button")
                        });
                        return false
                    }

                    mindex++
                    for (let index = 0; index < childnodes.length; index++) {
                        const element = childnodes[index];
                        element.remove()
                        index--
                    }

                    localstr = valuetab.join(',');
                    if (mindex == 1) {
                        dia.description = "作用位置设置"
                        result = localstr
                        createcheckbox(allnum, radiodiv, value[1])
                        return false
                    } else {

                        if (result == "") {
                            result = localstr
                        } else {
                            result = result + ":" + localstr
                        }

                        func(result)
                    }
                },
            }
        ],
    })

}

function addchipitem(data, textv, ele) {
    const listItem = document.createElement('mdui-chip');
    listItem.elevated = true;
    listItem.className = "mychip";
    listItem.textContent = "一个配置";
    listItem.data = data;
    listItem.onclick = function () {
        showeditdia(textv, function (result) {
            listItem.data = result
        }, listItem)
    }
    ele.appendChild(listItem)
}

function createcustom_tab(ele) {
    var customdia = document.getElementsByClassName("custom-dialog")[0]
    var tabs = customdia.getElementsByTagName("mdui-tabs")[0]


    // 创建tabs容器
    var tabsContainer = document.createElement('mdui-tabs');

    var alltab = tabs.getElementsByTagName("mdui-tab")
    let pos = 1

    for (let index = 0; index < alltab.length; index++) {
        let tabele = alltab[index]

        var tab = document.createElement('mdui-tab');
        tab.setAttribute('value', tabele.value);
        tab.textContent = tabele.textContent;

        tabpanel = tabs.getElementsByTagName("mdui-tab-panel")[index]

        // 创建mdui-tab-panel元素
        var tabPanel = document.createElement('mdui-tab-panel');
        tabPanel.setAttribute('slot', 'panel');
        tabPanel.setAttribute('value', tabele.value);


        const orilist = tabpanel.getElementsByClassName("putong")[0];

        var newlist = orilist.cloneNode(true);

        //循环到第三页时添加胜利条件
        if (index == 2) {
            let endlist = document.querySelector("#mytiao").parentElement.cloneNode(true)
            newlist.appendChild(endlist)
        }


        // 获取所有的mdui-select元素
        var selects = newlist.querySelectorAll('mdui-select');

        selects.forEach(function (select) {
            // 创建一个新的mdui-text-field元素
            var textField = document.createElement('mdui-text-field');

            textField.className = "myedit";
            textField.label = select.label;
            textField.variant = select.variant;
            textField.value = "点击编辑配置";
            textField.readonly = true

            const select_menu = select.querySelectorAll("mdui-menu-item")
            const menu = []

            select_menu.forEach(element => {
                const text = element.textContent
                menu.push(text)
            });

            textField.menu = menu
            textField.menu_item = Array.from({ length: menu.length }, (_, index) => `${index + 1}`);
            //出兵路线特殊判断
            if (select.label == "出兵路线") {
                textField.menu = [
                    ["不出兵"],
                    ["对抗路"],
                    ["中路"],
                    ["对抗路 中路"],
                    ["发育路"],
                    ["对抗路 发育路"],
                    ["中路 发育路"],
                    ["对抗路 中路 发育路"],
                ];
                textField.menu_item = [0, 1, 2, 3, 4, 5, 6, "null"]
            } else if (select.label == "胜利条件") {
                textField.allnum = ["全体"]
            }
            textField.pos = pos
            pos++


            textField.onclick = function () {
                const textv = textField
                var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
                let peiz
                try {
                    peiz = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])[textv.pos]
                } catch {
                    if (typeof custom_json[document.querySelectorAll(".myedit")[2].value].adjson == "undefined") {
                        custom_json[document.querySelectorAll(".myedit")[2].value].adjson = ["", "", "", ""]
                    }
                }
                if (typeof peiz == "undefined") {
                    peiz = []
                }

                let oridia = mdui.dialog({
                    headline: "提示",
                    description: "你可新建或点击配置卡片编辑配置",
                    body: '<mdui-button variant="filled" class="mdia" full-width>点击新建</mdui-button>',
                    onOpen: (dia) => {

                        for (let index = 0; index < peiz.length; index++) {
                            const element = peiz[index];
                            addchipitem(element, textv, oridia)
                        }

                        let mdia = dia.getElementsByClassName("mdia")[0]
                        mdia.onclick = function () {
                            showeditdia(textv, function (result) {
                                addchipitem(result, textv, oridia)
                            })
                        }

                    },
                    actions: [
                        {
                            text: "返回",
                            onClick: () => {
                                return true;
                            },
                        },
                        {
                            text: "保存",
                            onClick: () => {

                                var chips = oridia.getElementsByTagName("mdui-chip")
                                var results = []
                                for (let index = 0; index < chips.length; index++) {
                                    const element = chips[index];
                                    results.push(element.data)
                                }
                                let pos = (textv.pos).toString()

                                try {
                                    let oridata = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])
                                    if (results.length == 0) {
                                        delete oridata[pos]
                                    } else {
                                        oridata[pos] = results
                                    }
                                    let result = JSON.stringify(oridata)
                                    custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = result
                                } catch {
                                    let json = {}
                                    if (results.length == 0) {
                                        delete json[pos]
                                    } else {
                                        json[pos] = results
                                    }
                                    let result = JSON.stringify(json)
                                    custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = result
                                }

                                edittt[peimode].data = custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode]
                                localStorage.setItem("custom_cof", JSON.stringify(custom_json))
                                textv.value = "点击编辑配置 共有" + results.length + "个配置"
                                console.log(custom_json[document.querySelectorAll(".myedit")[2].value].adjson)
                            },
                        }
                    ],
                })
            }



            // 将textField替换select
            select.parentNode.replaceChild(textField, select);
        })

        var alllist = newlist.getElementsByTagName("mdui-list")

        for (let i = 0; i < alllist.length; i++) {
            const element = alllist[i];
            tabPanel.appendChild(element)
            //getElementsByTagName返回的会动态更改 appendChild会删除原元素 必须减一
            i--
        }


        if (tabpanel.querySelector(".xvanshou") != null) {
            const array = Array.from({ length: 10 }, (_, index) => `位置${index + 1}`);
            tabPanel.allnum = array
        } else if (tabpanel.querySelector(".zhenying") != null) {
            tabPanel.allnum = ["蓝方", "红方"]
        } else {
            tabPanel.allnum = ["全体"]
        }
        tabsContainer.appendChild(tab);
        tabsContainer.appendChild(tabPanel);
    }
    ele.appendChild(tabsContainer)
    tabsContainer.getElementsByTagName("mdui-tab-panel")[2]
    window.createcustom_tab = true
    ele.open = true
    ele.addEventListener("open", function () {
        ele.querySelector("mdui-tab").click()

        // 获取所有的mdui-text-field元素
        var textFields = ele.querySelectorAll('mdui-text-field');
        let index = 0

        textFields.forEach(function (textField) {

            edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
            var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
            try {
                var adjson = JSON.parse(custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode])
                textField.value = "点击编辑配置 共有" + adjson[index + 1].length + "个配置"
            } catch {
                textField.value = "点击编辑配置 共有0个配置"
            }
            index++

        })

        ele.updateComplete.then(() => {
            ele.bodyRef.value.scrollTop = 0;
        })
    })

    ele.addEventListener("close", function () {

        edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
        var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
        try {
            let adstr = custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode]
            if (adstr == "{}") {
                custom_json[document.querySelectorAll(".myedit")[2].value].adjson[peimode] = ""
                localStorage.setItem("custom_cof", JSON.stringify(custom_json))
            }
            edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
            edittt[peimode].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adstr)).length + "个配置"
        } catch {
            edittt[peimode].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adstr)).length + "个配置"
        }

    })

}

document.getElementsByClassName("suijitest")[0].addEventListener("open", function () {
    edittt = document.getElementsByClassName("suijitest")[0].getElementsByTagName("mdui-text-field")
    var custom_json = JSON.parse(localStorage.getItem("custom_cof"))
    var adjson = custom_json[document.querySelectorAll(".myedit")[2].value].adjson

    try {
        edittt[2].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adjson[2])).length + "个配置"
    } catch {
        edittt[2].value = "点击编辑配置 共有0个配置"
    }

    try {
        edittt[3].value = "点击编辑配置 共有" + Object.keys(JSON.parse(adjson[3])).length + "个配置"
    } catch {
        edittt[3].value = "点击编辑配置 共有0个配置"
    }

})