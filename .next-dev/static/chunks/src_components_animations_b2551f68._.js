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
    const lastPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const blobsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroAnimation.useEffect": ()=>{
            const canvas = canvasRef.current;
            const parent = canvas === null || canvas === void 0 ? void 0 : canvas.parentElement;
            if (!canvas || !parent) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const resizeCanvas = {
                "HeroAnimation.useEffect.resizeCanvas": ()=>{
                    const rect = parent.getBoundingClientRect();
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                }
            }["HeroAnimation.useEffect.resizeCanvas"];
            const drawBlob = {
                "HeroAnimation.useEffect.drawBlob": (blob)=>{
                    const alpha = Math.pow(Math.max(0, 1 - blob.age / blob.maxAge), 1.5) * 0.9;
                    const rx = blob.size;
                    const ry = rx * 0.52;
                    const wobble = Math.sin(blob.age * 0.04) * 0.06;
                    const rotation = blob.angle + wobble;
                    const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, rx);
                    gradient.addColorStop(0, "rgba(255, 255, 255, ".concat(alpha, ")"));
                    gradient.addColorStop(0.5, "rgba(255, 255, 255, ".concat(alpha * 0.75, ")"));
                    gradient.addColorStop(0.82, "rgba(255, 255, 255, ".concat(alpha * 0.3, ")"));
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.save();
                    ctx.translate(blob.x, blob.y);
                    ctx.rotate(rotation);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    ctx.restore();
                }
            }["HeroAnimation.useEffect.drawBlob"];
            const render = {
                "HeroAnimation.useEffect.render": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const nextBlobs = blobsRef.current.filter({
                        "HeroAnimation.useEffect.render.nextBlobs": (blob)=>blob.age <= blob.maxAge
                    }["HeroAnimation.useEffect.render.nextBlobs"]);
                    blobsRef.current = nextBlobs;
                    for (const blob of nextBlobs){
                        blob.age += 1;
                        blob.x += blob.vx;
                        blob.y += blob.vy;
                        blob.vy += 0.012;
                        blob.vx *= 0.995;
                        drawBlob(blob);
                    }
                    rafRef.current = window.requestAnimationFrame(render);
                }
            }["HeroAnimation.useEffect.render"];
            const spawnBlob = {
                "HeroAnimation.useEffect.spawnBlob": (x, y, direction)=>{
                    const size = 14 + Math.random() * 22;
                    const maxAge = 110 + Math.random() * 90;
                    const angle = direction + (Math.random() * 1.2 - 0.6);
                    blobsRef.current.push({
                        x,
                        y,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: Math.random() * 0.25,
                        size,
                        angle,
                        age: 0,
                        maxAge
                    });
                    if (Math.random() < 0.45) {
                        const normal = direction + Math.PI / 2;
                        const offset = (Math.random() - 0.5) * 52;
                        const satelliteSize = 3 + Math.random() * 9;
                        blobsRef.current.push({
                            x: x + Math.cos(normal) * offset,
                            y: y + Math.sin(normal) * offset,
                            vx: (Math.random() - 0.5) * 2.2,
                            vy: 0.2 + Math.random() * 0.8,
                            size: satelliteSize,
                            angle: direction + (Math.random() * 1.2 - 0.6),
                            age: 0,
                            maxAge: 70 + Math.random() * 60
                        });
                    }
                }
            }["HeroAnimation.useEffect.spawnBlob"];
            const handlePointerMove = {
                "HeroAnimation.useEffect.handlePointerMove": (event)=>{
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                        lastPointRef.current = null;
                        return;
                    }
                    const previousPoint = lastPointRef.current;
                    if (previousPoint) {
                        const dx = x - previousPoint.x;
                        const dy = y - previousPoint.y;
                        const distance = Math.hypot(dx, dy);
                        if (distance > 0) {
                            const direction = Math.atan2(dy, dx);
                            const steps = Math.max(1, Math.ceil(distance / 4));
                            for(let index = 1; index <= steps; index += 1){
                                const t = index / steps;
                                const pointX = previousPoint.x + dx * t;
                                const pointY = previousPoint.y + dy * t;
                                spawnBlob(pointX, pointY, direction);
                            }
                        }
                    }
                    lastPointRef.current = {
                        x,
                        y
                    };
                }
            }["HeroAnimation.useEffect.handlePointerMove"];
            const handlePointerLeave = {
                "HeroAnimation.useEffect.handlePointerLeave": ()=>{
                    lastPointRef.current = null;
                }
            }["HeroAnimation.useEffect.handlePointerLeave"];
            resizeCanvas();
            render();
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('resize', resizeCanvas);
            parent.addEventListener('mouseleave', handlePointerLeave);
            return ({
                "HeroAnimation.useEffect": ()=>{
                    if (rafRef.current) {
                        window.cancelAnimationFrame(rafRef.current);
                    }
                    window.removeEventListener('mousemove', handlePointerMove);
                    window.removeEventListener('resize', resizeCanvas);
                    parent.removeEventListener('mouseleave', handlePointerLeave);
                }
            })["HeroAnimation.useEffect"];
        }
    }["HeroAnimation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 h-full w-full",
        style: {
            mixBlendMode: 'difference'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/animations/HeroAnimation.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_s(HeroAnimation, "EXfBI4yC4VLheo+PIf1dPF4bOWk=");
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

//# sourceMappingURL=src_components_animations_b2551f68._.js.map