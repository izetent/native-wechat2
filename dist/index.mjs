import { TurboModuleRegistry as v, NativeModules as y, NativeEventEmitter as b } from "react-native";
import { useState as w, useEffect as M } from "react";
function P(e, t, n, r) {
  function s(a) {
    return a instanceof n ? a : new n(function(h) {
      h(a);
    });
  }
  return new (n || (n = Promise))(function(a, h) {
    function m(u) {
      try {
        l(r.next(u));
      } catch (d) {
        h(d);
      }
    }
    function g(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        h(d);
      }
    }
    function l(u) {
      u.done ? a(u.value) : s(u.value).then(m, g);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
class W {
  constructor() {
    Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.handlers = /* @__PURE__ */ new Map();
  }
  getQueue(t) {
    const n = this.handlers.get(t);
    return n || (this.handlers.set(t, []), []);
  }
  listen(t, n) {
    const r = this.getQueue(t);
    this.handlers.set(t, r.concat(n));
  }
  once(t, n) {
    this.handlers.set(t, [n]);
  }
  clear(t) {
    this.handlers.set(t, []);
  }
  dispatch(t, ...n) {
    this.getQueue(t).forEach((s) => s(...n)), this.clear(t);
  }
}
const i = (e) => (...t) => new Promise((n, r) => {
  e(...t, (s, a) => {
    s ? r(a) : n(a);
  });
}), o = v.get("Wechat") || y.Wechat, I = () => {
  const [e, t] = w(!1);
  return M(() => {
    S().then(() => t(!0)).catch(() => t(!1));
  }, []), e;
}, f = new W();
let p = !1;
const E = (e) => new Error(`[Native Wechat]: (${e.errorCode}) ${e.errorStr}`), c = (e) => {
  if (!p)
    throw new Error(`Please register SDK before invoking ${e}`);
}, q = () => i(o.checkUniversalLinkReady)(), C = (e) => {
  p || (o.registerApp(e), p = !0);
  const n = new b(o).addListener("NativeWechat_Response", (r) => {
    const s = r.errorCode ? E(r) : null;
    f.dispatch(r.type, s, r);
  });
  return () => n.remove();
}, S = () => i(o.isWechatInstalled)(), k = (e = {
  scope: "snsapi_userinfo",
  state: ""
}) => {
  c("sendAuthRequest");
  const t = i(o.sendAuthRequest);
  return new Promise((n, r) => {
    t(e).catch(r), f.once("SendAuthResp", (s, a) => s ? r(s) : n(a));
  });
}, x = (e) => (c("shareText"), i(o.shareText)(e)), A = (e) => (c("shareImage"), i(o.shareImage)(e)), T = (e) => (c("shareVideo"), i(o.shareVideo)(e)), _ = (e) => (c("shareWebpage"), i(o.shareWebpage)(e)), L = (e) => (c("shareMiniProgram"), i(o.shareMiniProgram)(e)), Q = (e) => {
  c("requestPayment");
  const t = i(o.requestPayment);
  return new Promise((n, r) => P(void 0, void 0, void 0, function* () {
    t(e).catch(r), f.once("PayResp", (s, a) => s ? r(s) : n(a));
  }));
}, V = (e) => {
  c("requestSubscribeMessage");
  const t = i(o.requestSubscribeMessage);
  return e.scene = +e.scene, t(e);
}, $ = (e) => (c("openCustomerService"), i(o.openCustomerService)(e)), U = (e) => {
  c("launchMiniProgram"), e.miniprogramType = +e.miniprogramType;
  const t = i(o.launchMiniProgram);
  return f.once("WXLaunchMiniProgramResp", (n, r) => {
    var s;
    if (!n)
      return (s = e.onNavBack) === null || s === void 0 ? void 0 : s.call(e, r);
  }), t(e);
}, B = o.getConstants();
export {
  B as NativeWechatConstants,
  q as checkUniversalLinkReady,
  S as isWechatInstalled,
  U as launchMiniProgram,
  $ as openCustomerService,
  C as registerApp,
  Q as requestPayment,
  V as requestSubscribeMessage,
  k as sendAuthRequest,
  A as shareImage,
  L as shareMiniProgram,
  x as shareText,
  T as shareVideo,
  _ as shareWebpage,
  I as useWechatInstalled
};
