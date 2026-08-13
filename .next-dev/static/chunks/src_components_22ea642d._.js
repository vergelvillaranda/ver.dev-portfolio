(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/animations/HeroAnimation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function HeroAnimation() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const blobsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroAnimation.useEffect": ()=>{
            const canvas = canvasRef.current;
            const parent = canvas === null || canvas === void 0 ? void 0 : canvas.parentElement;
            if (!canvas || !parent) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            const LIFETIME = 3000;
            const SPAWN_SPACING = 20;
            const MAX_BLOBS = 1000;
            const HOLD_TIME_MIN = 500;
            const HOLD_TIME_MAX = 800;
            const GRAVITY = 0.02;
            const resizeCanvas = {
                "HeroAnimation.useEffect.resizeCanvas": ()=>{
                    const rect = parent.getBoundingClientRect();
                    canvas.width = Math.max(1, Math.round(rect.width * dpr));
                    canvas.height = Math.max(1, Math.round(rect.height * dpr));
                    canvas.style.width = "".concat(rect.width, "px");
                    canvas.style.height = "".concat(rect.height, "px");
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.scale(dpr, dpr);
                }
            }["HeroAnimation.useEffect.resizeCanvas"];
            // Masks any element marked data-no-trail so the trail can never show
            // through it — covers both "never spawn here" AND "never drift/fall
            // in here" cases, since this runs every frame after blobs are drawn.
            const maskExcludedAreas = {
                "HeroAnimation.useEffect.maskExcludedAreas": ()=>{
                    const canvasRect = canvas.getBoundingClientRect();
                    const excluded = document.querySelectorAll('[data-no-trail]');
                    ctx.fillStyle = '#000000';
                    excluded.forEach({
                        "HeroAnimation.useEffect.maskExcludedAreas": (el)=>{
                            const r = el.getBoundingClientRect();
                            ctx.fillRect(r.left - canvasRect.left, r.top - canvasRect.top, r.width, r.height);
                        }
                    }["HeroAnimation.useEffect.maskExcludedAreas"]);
                }
            }["HeroAnimation.useEffect.maskExcludedAreas"];
            const render = {
                "HeroAnimation.useEffect.render": ()=>{
                    const width = parent.clientWidth;
                    const height = parent.clientHeight;
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, width, height);
                    const now = performance.now();
                    const blobs = blobsRef.current.filter({
                        "HeroAnimation.useEffect.render.blobs": (b)=>now - b.time < LIFETIME
                    }["HeroAnimation.useEffect.render.blobs"]);
                    blobsRef.current = blobs;
                    for (const blob of blobs){
                        if (now > blob.fallStart) {
                            blob.vy += GRAVITY;
                            blob.x += blob.vx;
                            blob.y += blob.vy;
                        }
                        const age = now - blob.time;
                        const lifeRatio = 1 - age / LIFETIME;
                        const r = blob.radius * Math.max(0, Math.pow(lifeRatio, 1.6));
                        ctx.beginPath();
                        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
                        ctx.fillStyle = '#ffffff';
                        ctx.fill();
                    }
                    maskExcludedAreas();
                    rafRef.current = window.requestAnimationFrame(render);
                }
            }["HeroAnimation.useEffect.render"];
            const spawnAt = {
                "HeroAnimation.useEffect.spawnAt": (x, y, speed)=>{
                    const wobble = Math.sin(performance.now() * 0.006 + x * 0.01) * 6;
                    const radius = Math.max(24, 54 - speed * 6 + wobble) + Math.random() * 4;
                    const now = performance.now();
                    blobsRef.current.push({
                        x,
                        y,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: 0,
                        radius,
                        time: now,
                        fallStart: now + HOLD_TIME_MIN + Math.random() * (HOLD_TIME_MAX - HOLD_TIME_MIN)
                    });
                    if (Math.random() < 0.22) {
                        blobsRef.current.push({
                            x: x + (Math.random() - 0.5) * 10,
                            y: y + Math.random() * 6,
                            vx: (Math.random() - 0.5) * 0.6,
                            vy: 0.1,
                            radius: 4 + Math.random() * 8,
                            time: now,
                            fallStart: now + Math.random() * 60
                        });
                    }
                    if (blobsRef.current.length > MAX_BLOBS) {
                        blobsRef.current.shift();
                    }
                }
            }["HeroAnimation.useEffect.spawnAt"];
            const handlePointerMove = {
                "HeroAnimation.useEffect.handlePointerMove": (event)=>{
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                        lastPointRef.current = null;
                        return;
                    }
                    const target = event.target;
                    if (target === null || target === void 0 ? void 0 : target.closest('[data-no-trail]')) {
                        lastPointRef.current = null;
                        return;
                    }
                    const prev = lastPointRef.current;
                    if (prev) {
                        const dx = x - prev.x;
                        const dy = y - prev.y;
                        const dist = Math.hypot(dx, dy);
                        const speed = dist;
                        const steps = Math.max(1, Math.floor(dist / SPAWN_SPACING));
                        for(let i = 1; i <= steps; i += 1){
                            const t = i / steps;
                            spawnAt(prev.x + dx * t, prev.y + dy * t, speed);
                        }
                    } else {
                        spawnAt(x, y, 0);
                    }
                    lastPointRef.current = {
                        x,
                        y
                    };
                }
            }["HeroAnimation.useEffect.handlePointerMove"];
            resizeCanvas();
            render();
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('resize', resizeCanvas);
            return ({
                "HeroAnimation.useEffect": ()=>{
                    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
                    window.removeEventListener('mousemove', handlePointerMove);
                    window.removeEventListener('resize', resizeCanvas);
                }
            })["HeroAnimation.useEffect"];
        }
    }["HeroAnimation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 z-20 h-full w-full",
        style: {
            mixBlendMode: 'difference'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "h-full w-full",
            style: {
                filter: 'blur(7px) contrast(45) brightness(1.05)'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/animations/HeroAnimation.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/animations/HeroAnimation.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_s(HeroAnimation, "roV08AMSupZbfeGJYDKax/NeqxE=");
_c = HeroAnimation;
var _c;
__turbopack_context__.k.register(_c, "HeroAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/animations/TextReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TextReveal(param) {
    let { children, delay = 0, duration = 1.1, className = '' } = param;
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "TextReveal.useLayoutEffect": ()=>{
            const container = containerRef.current;
            const text = textRef.current;
            if (!container || !text) return;
            const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "TextReveal.useLayoutEffect.context": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(text, {
                        yPercent: 110
                    }, {
                        yPercent: 0,
                        duration,
                        delay,
                        ease: 'power4.out'
                    });
                }
            }["TextReveal.useLayoutEffect.context"], container);
            return ({
                "TextReveal.useLayoutEffect": ()=>context.revert()
            })["TextReveal.useLayoutEffect"];
        }
    }["TextReveal.useLayoutEffect"], [
        delay,
        duration
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "overflow-hidden ".concat(className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: textRef,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/animations/TextReveal.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/animations/TextReveal.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(TextReveal, "SpEQRoQcDRz7NA/sEg4dIg2sH3M=");
_c = TextReveal;
var _c;
__turbopack_context__.k.register(_c, "TextReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/animations/TechTicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TechTicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const SKILLS = [
    'TYPESCRIPT',
    'REACT',
    'JAVASCRIPT',
    'NODE.JS',
    'NEXT.JS',
    'TAILWIND CSS',
    'UI DESIGN',
    'FIGMA',
    'MYSQL',
    'DOCKER',
    'POSTGRESQL',
    'XAMMPP',
    'GIT',
    'GITHUB',
    'ARDUINO',
    'IOT DEVELOPMENT',
    'ADOBE PHOTOSHOP',
    'ADOBE PREMIERE PRO'
];
function TechTicker() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-no-trail": true,
        className: "absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 py-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-marquee flex w-max items-center whitespace-nowrap",
            children: [
                0,
                1
            ].map((dupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: SKILLS.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "label-text px-6 text-white/40",
                                    children: skill
                                }, void 0, false, {
                                    fileName: "[project]/src/components/animations/TechTicker.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/20",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/animations/TechTicker.tsx",
                                    lineNumber: 36,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, skill, true, {
                            fileName: "[project]/src/components/animations/TechTicker.tsx",
                            lineNumber: 34,
                            columnNumber: 15
                        }, this))
                }, dupIndex, false, {
                    fileName: "[project]/src/components/animations/TechTicker.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/animations/TechTicker.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/animations/TechTicker.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = TechTicker;
var _c;
__turbopack_context__.k.register(_c, "TechTicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$HeroAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/animations/HeroAnimation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TextReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/animations/TextReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TechTicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/animations/TechTicker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const getCursorColorForBackground = (backgroundColor)=>{
    if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        return '#ffffff';
    }
    const rgbValues = backgroundColor.match(/\d+(?:\.\d+)?/g);
    if (!rgbValues || rgbValues.length < 3) {
        return '#ffffff';
    }
    const [r, g, b] = rgbValues.slice(0, 3).map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#111111' : '#ffffff';
};
function Hero() {
    _s();
    const [mousePosition, setMousePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isInteractive, setIsInteractive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cursorColor, setCursorColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#ffffff');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            const updateMousePosition = {
                "Hero.useEffect.updateMousePosition": (event)=>{
                    setMousePosition({
                        x: event.clientX,
                        y: event.clientY
                    });
                    let currentElement = document.elementFromPoint(event.clientX, event.clientY);
                    let backgroundColor = null;
                    while(currentElement){
                        const computedBackground = window.getComputedStyle(currentElement).backgroundColor;
                        if (computedBackground && computedBackground !== 'rgba(0, 0, 0, 0)' && computedBackground !== 'transparent') {
                            backgroundColor = computedBackground;
                            break;
                        }
                        currentElement = currentElement.parentElement;
                    }
                    setCursorColor(getCursorColorForBackground(backgroundColor));
                }
            }["Hero.useEffect.updateMousePosition"];
            const updateHoverState = {
                "Hero.useEffect.updateHoverState": (event)=>{
                    const target = event.target;
                    const interactiveElement = target === null || target === void 0 ? void 0 : target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]');
                    setIsInteractive(Boolean(interactiveElement));
                }
            }["Hero.useEffect.updateHoverState"];
            const resetHoverState = {
                "Hero.useEffect.resetHoverState": (event)=>{
                    const target = event.target;
                    const relatedTarget = event.relatedTarget;
                    if (!target || !relatedTarget) {
                        setIsInteractive(false);
                        return;
                    }
                    if (!target.contains(relatedTarget)) {
                        setIsInteractive(false);
                    }
                }
            }["Hero.useEffect.resetHoverState"];
            window.addEventListener('mousemove', updateMousePosition);
            document.addEventListener('mouseover', updateHoverState);
            document.addEventListener('mouseout', resetHoverState);
            return ({
                "Hero.useEffect": ()=>{
                    window.removeEventListener('mousemove', updateMousePosition);
                    document.removeEventListener('mouseover', updateHoverState);
                    document.removeEventListener('mouseout', resetHoverState);
                }
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative isolate min-h-screen overflow-hidden bg-[#111111] px-6 pb-16 pt-24 text-white md:px-12 md:pt-32 lg:px-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1700px] flex-col justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mb-8 w-full max-w-[260px] md:absolute md:right-0 md:top-[14%] md:mb-0 md:max-w-[310px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-no-trail": true,
                                    className: "profile-image-card relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(155deg,#2a2a2a_0%,#212121_45%,#1a1a1a_100%)] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.28)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/prof1.jpg",
                                            alt: "Vergel Villaranda",
                                            className: "profile-image profile-image--base aspect-[4/5] w-full rounded-[1.1rem] object-cover object-center grayscale"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/prof2.jpg",
                                            alt: "Vergel Villaranda alternate",
                                            className: "profile-image profile-image--hover aspect-[4/5] w-full rounded-[1.1rem] object-cover object-center grayscale"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Hero.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-[60%]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TextReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "label-text mb-8 text-white/45",
                                            children: "Full-Stack Developer & IT Solutions - 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TextReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        delay: 0.12,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "hero-name-stack display-title",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "VERGEL"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "VILLARANDA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/Hero.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Hero.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TextReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        delay: 0.5,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-14 grid gap-4 border-t border-white/10 pt-7 md:grid-cols-[1fr_auto] md:items-end md:gap-14",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "body-copy max-w-xl text-white/45",
                                    children: "Building digital solutions, connecting technology, and turning ideas into reality."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "label-text text-white/50",
                                    children: "Scroll Down"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/Hero.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Hero.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$TechTicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animations$2f$HeroAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: "custom-cursor z-30 ".concat(isInteractive ? 'is-interactive' : ''),
                style: {
                    left: "".concat(mousePosition.x, "px"),
                    top: "".concat(mousePosition.y, "px"),
                    borderColor: cursorColor,
                    backgroundColor: isInteractive ? cursorColor : 'transparent'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Hero.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(Hero, "KlLTN4Rp++69eq6iqrfxC+AkZIk=");
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/animations/ScrollReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function ScrollReveal(param) {
    let { children, className = '' } = param;
    _s();
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ScrollReveal.useLayoutEffect": ()=>{
            const element = elementRef.current;
            if (!element) return;
            const animation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(element, {
                y: 80,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
            return ({
                "ScrollReveal.useLayoutEffect": ()=>{
                    var _animation_scrollTrigger;
                    (_animation_scrollTrigger = animation.scrollTrigger) === null || _animation_scrollTrigger === void 0 ? void 0 : _animation_scrollTrigger.kill();
                    animation.kill();
                }
            })["ScrollReveal.useLayoutEffect"];
        }
    }["ScrollReveal.useLayoutEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: elementRef,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/animations/ScrollReveal.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ScrollReveal, "IszlbjBQbWoZdZlYDOtnnodoWhI=");
_c = ScrollReveal;
var _c;
__turbopack_context__.k.register(_c, "ScrollReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_22ea642d._.js.map