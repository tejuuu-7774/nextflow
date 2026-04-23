(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/execution/topologicalLevels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getExecutionLevels",
    ()=>getExecutionLevels
]);
function getExecutionLevels(nodes, edges) {
    const inDegree = {};
    const adj = {};
    nodes.forEach((n)=>{
        inDegree[n.id] = 0;
        adj[n.id] = [];
    });
    edges.forEach((e)=>{
        adj[e.source].push(e.target);
        inDegree[e.target]++;
    });
    const levels = [];
    let queue = Object.keys(inDegree).filter((id)=>inDegree[id] === 0);
    while(queue.length > 0){
        levels.push(queue);
        const next = [];
        for (const nodeId of queue){
            for (const neighbor of adj[nodeId]){
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    next.push(neighbor);
                }
            }
        }
        queue = next;
    }
    // cycle check
    const totalProcessed = levels.flat().length;
    if (totalProcessed !== nodes.length) {
        throw new Error("Cycle detected");
    }
    return levels;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/execution/getUpstreamNodes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUpstreamNodes",
    ()=>getUpstreamNodes
]);
function getUpstreamNodes(targetId, edges) {
    const visited = new Set();
    function dfs(nodeId) {
        for (const edge of edges){
            if (edge.target === nodeId) {
                if (!visited.has(edge.source)) {
                    visited.add(edge.source);
                    dfs(edge.source);
                }
            }
        }
    }
    dfs(targetId);
    return visited;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integrations/gemini.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runGemini",
    ()=>runGemini
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function runGemini(prompt) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${("TURBOPACK compile-time value", "AIzaSyD5EtUePHZ7rTBIOS_KvZq4X-wUOGpK5Rk")}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    });
    if (!res.ok) {
        const err = await res.text();
        console.error("GEMINI ERROR:", err);
        throw new Error(err);
    }
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/workflowStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkflowStore",
    ()=>useWorkflowStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$topologicalLevels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/execution/topologicalLevels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$getUpstreamNodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/execution/getUpstreamNodes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$gemini$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integrations/gemini.ts [app-client] (ecmascript)");
;
;
;
;
;
const useWorkflowStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        nodes: [],
        edges: [],
        error: null,
        history: [],
        selectedNodeId: null,
        setSelectedNode: (id)=>set({
                selectedNodeId: id
            }),
        addRun: (run)=>set((state)=>({
                    history: [
                        run,
                        ...state.history
                    ]
                })),
        setError: (msg)=>set({
                error: msg
            }),
        onNodesChange: (changes)=>set({
                nodes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyNodeChanges"])(changes, get().nodes)
            }),
        onEdgesChange: (changes)=>set({
                edges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEdgeChanges"])(changes, get().edges)
            }),
        onConnect: (connection)=>set({
                edges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEdge"])(connection, get().edges)
            }),
        addNode: (type)=>{
            const id = `${type}-${Date.now()}`;
            const newNode = {
                id,
                type,
                position: {
                    x: Math.random() * 400 + 100,
                    y: Math.random() * 400 + 100
                },
                data: {
                    label: type.toUpperCase(),
                    status: "idle"
                }
            };
            set((state)=>({
                    nodes: [
                        ...state.nodes,
                        newNode
                    ]
                }));
        },
        updateNodeData: (id, newData)=>set((state)=>({
                    nodes: state.nodes.map((node)=>node.id === id ? {
                            ...node,
                            data: {
                                ...node.data,
                                ...newData
                            }
                        } : node)
                })),
        runWorkflow: async ()=>{
            const { nodes, edges, updateNodeData, setError, addRun, selectedNodeId } = get();
            setError(null);
            // 🔥 STEP 1 — determine execution scope
            let executionNodeIds = nodes.map((n)=>n.id);
            if (selectedNodeId) {
                const upstream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$getUpstreamNodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUpstreamNodes"])(selectedNodeId, edges);
                executionNodeIds = [
                    selectedNodeId,
                    ...Array.from(upstream)
                ];
            }
            // 🔥 STEP 2 — filter graph
            const filteredNodes = nodes.filter((n)=>executionNodeIds.includes(n.id));
            const filteredEdges = edges.filter((e)=>executionNodeIds.includes(e.source) && executionNodeIds.includes(e.target));
            let levels = [];
            try {
                levels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$topologicalLevels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExecutionLevels"])(filteredNodes, filteredEdges);
            } catch  {
                setError("Cycle detected! Fix your connections.");
                return;
            }
            const nodeMap = Object.fromEntries(filteredNodes.map((n)=>[
                    n.id,
                    n
                ]));
            const results = {};
            const runId = `run-${Date.now()}`;
            const runStart = Date.now();
            const nodeExecutions = {};
            try {
                for (const level of levels){
                    await Promise.all(level.map(async (nodeId)=>{
                        const node = nodeMap[nodeId];
                        const start = Date.now();
                        // 🔥 mark running
                        nodeExecutions[nodeId] = {
                            id: nodeId,
                            type: node.type,
                            status: "running",
                            startedAt: start
                        };
                        updateNodeData(nodeId, {
                            status: "running"
                        });
                        let output = "";
                        try {
                            if (node.type === "text") {
                                output = node.data.text || "";
                            }
                            if (node.type === "llm") {
                                const inputs = filteredEdges.filter((e)=>e.target === nodeId).map((e)=>results[e.source]);
                                const inputText = inputs?.map((d)=>d?.text || "").join(" ");
                                output = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integrations$2f$gemini$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runGemini"])(inputText || "Say something useful");
                            }
                            results[nodeId] = {
                                output,
                                text: output
                            };
                            nodeExecutions[nodeId] = {
                                ...nodeExecutions[nodeId],
                                status: "success",
                                output,
                                endedAt: Date.now()
                            };
                            updateNodeData(nodeId, {
                                status: "success",
                                output
                            });
                        } catch (err) {
                            console.error("Node failed:", nodeId, err);
                            nodeExecutions[nodeId] = {
                                ...nodeExecutions[nodeId],
                                status: "failed",
                                output: "Execution failed",
                                endedAt: Date.now()
                            };
                            updateNodeData(nodeId, {
                                status: "error",
                                output: "Execution failed"
                            });
                        }
                    }));
                }
                const runEnd = Date.now();
                addRun({
                    id: runId,
                    timestamp: runStart,
                    status: "success",
                    duration: runEnd - runStart,
                    nodes: Object.values(nodeExecutions)
                });
            } catch (err) {
                console.error("Workflow failed:", err);
                addRun({
                    id: runId,
                    timestamp: runStart,
                    status: "failed",
                    nodes: Object.values(nodeExecutions)
                });
                setError("Execution failed");
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/workflowStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const nodeList = [
    {
        label: "Text",
        type: "text"
    },
    {
        label: "Image",
        type: "image"
    },
    {
        label: "Video",
        type: "video"
    },
    {
        label: "LLM",
        type: "llm"
    },
    {
        label: "Crop",
        type: "crop"
    },
    {
        label: "Frame",
        type: "frame"
    }
];
function Sidebar() {
    _s();
    const addNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "Sidebar.useWorkflowStore[addNode]": (s)=>s.addNode
    }["Sidebar.useWorkflowStore[addNode]"]);
    const runWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "Sidebar.useWorkflowStore[runWorkflow]": (s)=>s.runWorkflow
    }["Sidebar.useWorkflowStore[runWorkflow]"]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "Sidebar.useWorkflowStore[error]": (s)=>s.error
    }["Sidebar.useWorkflowStore[error]"]);
    const selectedNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "Sidebar.useWorkflowStore[selectedNodeId]": (s)=>s.selectedNodeId
    }["Sidebar.useWorkflowStore[selectedNodeId]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-64 h-full shrink-0 border-r border-gray-800 bg-[#111] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-4",
                children: "Nodes"
            }, void 0, false, {
                fileName: "[project]/components/ui/Sidebar.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: nodeList.map((node)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>addNode(node.type),
                        className: "w-full bg-gray-800 hover:bg-gray-700 transition p-2 rounded text-left",
                        children: node.label
                    }, node.type, false, {
                        fileName: "[project]/components/ui/Sidebar.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/Sidebar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: runWorkflow,
                className: "w-full mt-4 bg-green-600 hover:bg-green-500 transition p-2 rounded text-sm font-semibold",
                children: [
                    "▶ Run ",
                    selectedNodeId ? "Selected Node" : "Workflow"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Sidebar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-sm bg-red-500/20 text-red-400 p-2 rounded border border-red-500/30",
                children: [
                    "⚠ ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Sidebar.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Sidebar.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "9ImWATLztaB2qU1eJ8od1EimQ1E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/RightPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RightPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/workflowStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RightPanel() {
    _s();
    const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "RightPanel.useWorkflowStore[history]": (s)=>s.history
    }["RightPanel.useWorkflowStore[history]"]);
    const [expandedRunId, setExpandedRunId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggleRun = (id)=>{
        setExpandedRunId((prev)=>prev === id ? null : id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "relative z-10 h-full w-80 shrink-0 overflow-y-auto border-l border-gray-800 bg-[#111] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-4",
                children: "Workflow History"
            }, void 0, false, {
                fileName: "[project]/components/ui/RightPanel.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-400",
                children: "No runs yet"
            }, void 0, false, {
                fileName: "[project]/components/ui/RightPanel.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: history.map((run)=>{
                    const isOpen = expandedRunId === run.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#1a1a1a] rounded p-3 border border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>toggleRun(run.id),
                                className: "cursor-pointer flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-medium",
                                                children: new Date(run.timestamp).toLocaleTimeString()
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/RightPanel.tsx",
                                                lineNumber: 38,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400",
                                                children: [
                                                    "Duration: ",
                                                    run.duration ?? 0,
                                                    " ms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/RightPanel.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/RightPanel.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-xs font-semibold ${run.status === "success" ? "text-green-400" : "text-red-400"}`,
                                        children: run.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/RightPanel.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/RightPanel.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this),
                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 border-t border-gray-800 pt-3 space-y-2",
                                children: run.nodes.map((node)=>{
                                    const duration = node.endedAt && node.startedAt ? node.endedAt - node.startedAt : 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: [
                                                            node.type,
                                                            " (",
                                                            node.id,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ui/RightPanel.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${node.status === "success" ? "text-green-400" : node.status === "failed" ? "text-red-400" : "text-yellow-400"}`,
                                                        children: node.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/RightPanel.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/RightPanel.tsx",
                                                lineNumber: 68,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-400",
                                                children: [
                                                    duration,
                                                    " ms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/RightPanel.tsx",
                                                lineNumber: 86,
                                                columnNumber: 25
                                            }, this),
                                            node.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-gray-300 bg-[#0d0d0d] p-2 rounded",
                                                children: node.output
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/RightPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, node.id, true, {
                                        fileName: "[project]/components/ui/RightPanel.tsx",
                                        lineNumber: 67,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/ui/RightPanel.tsx",
                                lineNumber: 59,
                                columnNumber: 17
                            }, this)
                        ]
                    }, run.id, true, {
                        fileName: "[project]/components/ui/RightPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/ui/RightPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/RightPanel.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(RightPanel, "sH19vH86mgQJxGJlk94lilBNwgA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"]
    ];
});
_c = RightPanel;
var _c;
__turbopack_context__.k.register(_c, "RightPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/nodes/BaseNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BaseNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function BaseNode({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-md min-w-[180px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border-b border-gray-700 text-sm font-semibold",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/nodes/BaseNode.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 text-xs text-gray-300",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/nodes/BaseNode.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Left,
                className: "w-2 h-2 bg-white"
            }, void 0, false, {
                fileName: "[project]/components/nodes/BaseNode.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Right,
                className: "w-2 h-2 bg-white"
            }, void 0, false, {
                fileName: "[project]/components/nodes/BaseNode.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/nodes/BaseNode.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = BaseNode;
var _c;
__turbopack_context__.k.register(_c, "BaseNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/nodes/TextNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/BaseNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/workflowStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function TextNode({ id, data }) {
    _s();
    const updateNodeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "TextNode.useWorkflowStore[updateNodeData]": (state)=>state.updateNodeData
    }["TextNode.useWorkflowStore[updateNodeData]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: "Text",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            value: data?.text || "",
            onChange: (e)=>updateNodeData(id, {
                    text: e.target.value
                }),
            placeholder: "Enter text...",
            className: "w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
        }, void 0, false, {
            fileName: "[project]/components/nodes/TextNode.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/nodes/TextNode.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(TextNode, "ZGE/hcADV2X3zRWi5+WmP6ytc0c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"]
    ];
});
_c = TextNode;
var _c;
__turbopack_context__.k.register(_c, "TextNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/nodes/ImageNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/BaseNode.tsx [app-client] (ecmascript)");
"use client";
;
;
function ImageNode() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: "Image Upload",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-gray-400 text-xs",
            children: "Upload coming soon"
        }, void 0, false, {
            fileName: "[project]/components/nodes/ImageNode.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/nodes/ImageNode.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = ImageNode;
var _c;
__turbopack_context__.k.register(_c, "ImageNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/execution/getInputData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInputData",
    ()=>getInputData
]);
function getInputData(nodeId, nodes, edges) {
    const incomingEdges = edges.filter((edge)=>edge.target === nodeId);
    const inputs = [];
    for (const edge of incomingEdges){
        const sourceNode = nodes.find((n)=>n.id === edge.source);
        if (sourceNode) {
            inputs.push(sourceNode.data);
        }
    }
    return inputs;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/nodes/LLMNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LLMNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/BaseNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/workflowStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$getInputData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/execution/getInputData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function LLMNode({ id, data }) {
    _s();
    const updateNodeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "LLMNode.useWorkflowStore[updateNodeData]": (state)=>state.updateNodeData
    }["LLMNode.useWorkflowStore[updateNodeData]"]);
    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "LLMNode.useWorkflowStore[nodes]": (state)=>state.nodes
    }["LLMNode.useWorkflowStore[nodes]"]);
    const edges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])({
        "LLMNode.useWorkflowStore[edges]": (state)=>state.edges
    }["LLMNode.useWorkflowStore[edges]"]);
    const inputs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$execution$2f$getInputData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInputData"])(id, nodes, edges);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$BaseNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: "LLM",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                inputs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] text-green-400",
                    children: [
                        "Inputs:",
                        inputs.map((input, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: input.text || input.user || "data"
                            }, i, false, {
                                fileName: "[project]/components/nodes/LLMNode.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/nodes/LLMNode.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: data?.system || "",
                    onChange: (e)=>updateNodeData(id, {
                            system: e.target.value
                        }),
                    placeholder: "System prompt...",
                    className: "w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
                }, void 0, false, {
                    fileName: "[project]/components/nodes/LLMNode.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: data?.user || "",
                    onChange: (e)=>updateNodeData(id, {
                            user: e.target.value
                        }),
                    placeholder: "User input...",
                    className: "w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
                }, void 0, false, {
                    fileName: "[project]/components/nodes/LLMNode.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/nodes/LLMNode.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/nodes/LLMNode.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(LLMNode, "NaF/bijB5RPC1gr76AnvgeTCTgA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"]
    ];
});
_c = LLMNode;
var _c;
__turbopack_context__.k.register(_c, "LLMNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/canvas/nodeTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nodeTypes",
    ()=>nodeTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$TextNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/TextNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$ImageNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/ImageNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$LLMNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/nodes/LLMNode.tsx [app-client] (ecmascript)");
;
;
;
const nodeTypes = {
    text: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$TextNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    image: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$ImageNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    llm: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$nodes$2f$LLMNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/canvas/FlowCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlowCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/workflowStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$canvas$2f$nodeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/canvas/nodeTypes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FlowCanvas() {
    _s();
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, selectedNodeId, setSelectedNode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"])();
    // Added visual selection highlight
    const styledNodes = nodes.map((node)=>({
            ...node,
            style: node.id === selectedNodeId ? {
                border: "2px solid #22c55e",
                boxShadow: "0 0 10px #22c55e"
            } : {}
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
            nodes: styledNodes,
            edges: edges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onConnect: onConnect,
            onNodeClick: (_, node)=>{
                console.log("SELECTED NODE:", node.id);
                setSelectedNode(node.id);
            },
            nodeTypes: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$canvas$2f$nodeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeTypes"],
            fitView: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
                    gap: 20,
                    size: 1,
                    color: "#1a1a1a"
                }, void 0, false, {
                    fileName: "[project]/components/canvas/FlowCanvas.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
                    fileName: "[project]/components/canvas/FlowCanvas.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {}, void 0, false, {
                    fileName: "[project]/components/canvas/FlowCanvas.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/canvas/FlowCanvas.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/canvas/FlowCanvas.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(FlowCanvas, "fbFhI+McIvH0wyBL2J2BwK3Gj0g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$workflowStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkflowStore"]
    ];
});
_c = FlowCanvas;
var _c;
__turbopack_context__.k.register(_c, "FlowCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0xpi4-z._.js.map