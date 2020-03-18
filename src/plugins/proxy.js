import store from "../store"
import path from "path"
import fs from "fs"
import { tagList, charList } from './ak_data'
const moment = require('moment');

const chkPath = function (obj, level, ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && Object.prototype.hasOwnProperty.call(obj, level)) return true
    return chkPath(obj[level], ...rest)
}

const subsets = function* (array, offset = 0) {
    while (offset < array.length) {
        let first = array[offset++];
        for (let x of subsets(array, offset)) {
            x.push(first);
            yield x;
        }
    }
    yield [];
}

const calcSlot = function (slot) {
    var matchedList = {}, sortWeight = charList.length / 12.0 // (wtf)

    for (let subSet of subsets(slot)) {
        if (subSet.length == 0) continue; // {a:3, b:4}

        for (let char of charList) {
            if (!subSet.includes(11) && char.level == 6) continue;
            if (subSet.every(function (v) { return char.tags.includes(v) })) {
                var idxId = subSet.join(':')

                if (!Object.prototype.hasOwnProperty.call(matchedList, idxId)) {
                    matchedList[idxId] = {
                        tags: tagList.filter(function (o) { return subSet.indexOf(o.id) >= 0 }),
                        chars: [],
                        perfect: false,
                        thres: 0
                    }
                }

                matchedList[idxId].chars.push(char)
            }
        }
    }

    //sort chars
    Object.keys(matchedList).forEach(function (k) {
        var perfectGroup =
            matchedList[k].chars.every((e) => 1 == e.level || e.level > 3);

        matchedList[k].chars.sort((x, bx) => bx.level - x.level);
        matchedList[k].perfect = perfectGroup;
        matchedList[k].thres = (matchedList[k].chars.reduce((p, v) => p + v.level, 0) / matchedList[k].tags.length)
            - (matchedList[k].tags.length / 10.0) - sortWeight + (perfectGroup ? 1000.0 : 0.0);
    })

    matchedList = Object.values(matchedList)
    matchedList.sort((a, b) => a.thres > b.thres ? -1 : (a.thres < b.thres ? 1 : (a.tags.length > b.tags.length ? 1 : (a.tags.length < b.tags.length ? -1 : 0))))

    return matchedList
}

const DataExtractors = [
    {
        host: 'gs.arknights.kr', // <== if u need changes server name
        path: '*',
        extract: async (data) => {
            var exData = { 'no-impl-data': true }
            if (/* syncData */Object.prototype.hasOwnProperty.call(data, 'user')) {
                exData = data.user
            } else if (/* other modified */Object.prototype.hasOwnProperty.call(data, 'playerDataDelta')) {
                //modified
                if (Object.prototype.hasOwnProperty.call(data.playerDataDelta, 'modified')) {
                    exData = data.playerDataDelta.modified
                }

                //deleted - not impl yet.
            }

            if (Object.prototype.hasOwnProperty.call(exData, 'no-impl-data')) {
                return
            }

            // calc recruit 
            if (chkPath(exData, 'recruit', 'normal', 'slots')) {
                for (let [k, v] of Object.entries(exData.recruit.normal.slots)) {
                    var selTags = [];

                    if (v.state == 1) { //ready
                        selTags = v.tags
                    } else if (v.state == 2) { //ongoing
                        selTags = v.selectTags.map(o => o['tagId'])
                    }

                    exData.recruit.normal.slots[k].matched = calcSlot(selTags)
                }
            }

            // calc ap
            // if (chkPath(exData, 'building', 'chars')) {
            //     for (left [k, v] of Object.entries(exData.building.chars)) {
            //         exData.building.chars[k].displayAp = Math.round(v.ap / 8640000)
            //         exData.building.chars[k].isTired = v.changeScale <= 0 && v.ap < v.changeScale 
            //     }
            // }

            store.commit('updatePlayerData', {
                data: exData
            })
        }
    }
]


const Proxy = require('../libs/proxy/proxy');
const xProxy = Proxy();

xProxy.use(Proxy.gunzip)
xProxy.use(Proxy.wildcard)
xProxy.onRequest(function (ctx, callback) {
    var extractor = DataExtractors.find(
        (e) => (e.host == "*" || e.host == ctx.clientToProxyRequest.headers.host)
    )

    console.log(ctx.clientToProxyRequest.headers.host + ";;")

    if(ctx.clientToProxyRequest.headers.host == "fn.page.link") {
        ctx.proxyToClientResponse.writeHeader(200, {
            'content-type' : 'application/octet-stream; charset=utf-8',
            'expires' : 'Tue, 10 Mar 1993 16:31:31 GMT'
        })
        
        ctx.proxyToClientResponse.end(fs.readFileSync(path.resolve(process.cwd(), '.caches/certs/ca.pem')));
        return;
    }

    var chunks = [];

    ctx.onResponseData(function (ctx, chunk, callback) {
        if (extractor != undefined) {
            chunks.push(chunk);
            return callback(null, null);
        } else {
            return callback(null, chunk);
        }
    });

    ctx.onResponseEnd(function (ctx, callback) {
        if (extractor != undefined) {

            var body = Buffer.concat(chunks);

            try {
                var data = JSON.parse(body)

                extractor.extract(data)

                store.commit('updateField', {
                    path: 'lastUpdatedAt',
                    value: moment().unix()
                })
            } catch (e) {
                ////
            }

            ctx.proxyToClientResponse.write(body);
        }

        return callback();
    });

    callback();
});

class FnProxy {
    constructor() {
        var self = this
        self.port = 8080;
        self.isRunning = false;
        self.proxy = xProxy;
        self.onXError = function (_ctx, _err) { };

        self.proxy.onError(function (ctx, err) {
            console.log("on error fnProxy : ")
            self.onXError(ctx, err)
        });
    }

    onError(fn) {
        this.onXError = fn;
    }

    changePort(newPort) {
        this.port = newPort
    }

    start() {
        this.isRunning = true;
        console.log(this.port + " : ongoing fnProxy;");
        this.proxy.listen({ port: this.port, sslCaDir: path.resolve(process.cwd(), '.caches') });
    }

    close() {
        this.isRunning = false;
        this.proxy.close();
    }
}

const fnProxy = new FnProxy()

store.subscribe(function (pl, _st) {
    switch (pl.type) {
        case 'serverPort':
            fnProxy.changePort(pl.payload)
            break;
        default:
            break;
    }
})
export default fnProxy
