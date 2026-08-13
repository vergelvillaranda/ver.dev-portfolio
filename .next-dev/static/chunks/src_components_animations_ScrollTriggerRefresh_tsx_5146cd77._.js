(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/animations/ScrollTriggerRefresh.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollTriggerRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ScrollTriggerRefresh() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollTriggerRefresh.useEffect": ()=>{
            const refresh = {
                "ScrollTriggerRefresh.useEffect.refresh": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh()
            }["ScrollTriggerRefresh.useEffect.refresh"];
            window.addEventListener('load', refresh);
            if ('fonts' in document) {
                document.fonts.ready.then(refresh);
            }
            // Catch-all: refresh whenever the page's overall height changes,
            // e.g. from lazy images, canvas/WebGL sizing, or other late layout shifts.
            let timeout;
            const resizeObserver = new ResizeObserver({
                "ScrollTriggerRefresh.useEffect": ()=>{
                    clearTimeout(timeout);
                    timeout = setTimeout(refresh, 200);
                }
            }["ScrollTriggerRefresh.useEffect"]);
            resizeObserver.observe(document.body);
            // Fallback: in case nothing above fires quickly enough, force a
            // refresh shortly after mount too.
            const fallback = setTimeout(refresh, 1000);
            return ({
                "ScrollTriggerRefresh.useEffect": ()=>{
                    window.removeEventListener('load', refresh);
                    resizeObserver.disconnect();
                    clearTimeout(timeout);
                    clearTimeout(fallback);
                }
            })["ScrollTriggerRefresh.useEffect"];
        }
    }["ScrollTriggerRefresh.useEffect"], []);
    return null;
}
_s(ScrollTriggerRefresh, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ScrollTriggerRefresh;
var _c;
__turbopack_context__.k.register(_c, "ScrollTriggerRefresh");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_animations_ScrollTriggerRefresh_tsx_5146cd77._.js.map