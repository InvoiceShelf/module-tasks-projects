const { Fragment: e, Teleport: t, computed: n, createBlock: r, createCommentVNode: i, createElementBlock: a, createElementVNode: o, createTextVNode: s, createVNode: c, defineComponent: l, getCurrentInstance: u, h: d, normalizeClass: f, normalizeStyle: p, onBeforeUnmount: m, onMounted: h, openBlock: g, reactive: _, ref: v, renderList: y, resolveComponent: b, toDisplayString: x, unref: S, vModelText: C, vShow: w, watch: T, withCtx: E, withDirectives: D, withKeys: O, withModifiers: k } = window.__invoiceshelf_vue;
//#region resources/js/messages.ts
var A = { en: { tasks_projects: {
	general: {
		home: "Home",
		filter: "Filter",
		search: "Search",
		actions: "Actions",
		edit: "Edit",
		delete: "Delete",
		cancel: "Cancel",
		save: "Save",
		update: "Update"
	},
	projects: {
		title: "Projects",
		new_project: "New project",
		edit_project: "Edit project",
		internal: "Internal",
		archive: "Archive",
		unarchive: "Restore",
		search_placeholder: "Search by name or identifier",
		empty_title: "No projects yet",
		empty_description: "Create a project to group its tasks, time and billing.",
		status: {
			active: "Active",
			archived: "Archived",
			all: "All"
		},
		columns: {
			name: "Name",
			status: "Status",
			customer: "Customer",
			default_rate: "Rate / hour",
			due_date: "Due date"
		},
		fields: {
			name: "Name",
			identifier: "Identifier",
			identifier_help: "A short code, used as the task number prefix.",
			customer: "Customer",
			customer_help: "Leave empty for an internal project.",
			customer_placeholder: "No customer",
			due_date: "Due date",
			default_rate: "Default rate",
			default_rate_help: "Per hour, in the customer currency.",
			budget_hours: "Budget (hours)",
			colour: "Colour",
			colour_none: "None",
			description: "Description"
		},
		created: "{name} was created.",
		updated: "{name} was updated.",
		archived: "{name} was archived.",
		unarchived: "{name} was restored.",
		deleted: "{name} was deleted.",
		delete_confirm: "Delete {name}? Its tasks and time entries go with it.",
		name_required: "Enter a project name.",
		load_failed: "Unable to load the projects.",
		save_failed: "Unable to save the project.",
		delete_failed: "Unable to delete the project.",
		customers_failed: "Unable to load the customers."
	}
} } }, j = "/api/v1/tasks-projects", M = {
	projects: `${j}/projects`,
	project: (e) => `${j}/projects/${e}`,
	archiveProject: (e) => `${j}/projects/${e}/archive`,
	unarchiveProject: (e) => `${j}/projects/${e}/unarchive`,
	members: `${j}/members`,
	settings: `${j}/settings`
}, N = { customers: "/api/v1/customers" };
function P(e, t) {
	if (e === void 0 || e.order === "") return {};
	let n = t[e.fieldName];
	return n === void 0 ? {} : {
		sort_by: n,
		sort_order: e.order
	};
}
async function F(e, t) {
	let { data: n } = await e.get(M.projects, { params: t });
	return n;
}
async function I(e, t) {
	let { data: n } = await e.post(M.projects, t);
	return n.data;
}
async function L(e, t, n) {
	let { data: r } = await e.put(M.project(t), n);
	return r.data;
}
async function R(e, t) {
	let { data: n } = await e.post(M.archiveProject(t));
	return n.data;
}
async function z(e, t) {
	let { data: n } = await e.post(M.unarchiveProject(t));
	return n.data;
}
async function B(e, t) {
	await e.delete(M.project(t));
}
async function V(e) {
	let { data: t } = await e.get(M.members);
	return t.data;
}
async function H(e, t = 100) {
	let { data: n } = await e.get(N.customers, { params: { limit: t } });
	return n.data;
}
//#endregion
//#region resources/js/support/errors.ts
function ee(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function U(e, t) {
	let n = ee(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function te(e) {
	let t = ee(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function ne(e) {
	return e === null ? "" : String(e / 100);
}
function re(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function ie(e) {
	return e === null ? "" : String(e / 60);
}
function ae(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function oe(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function se(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
function ce(e) {
	let t = Math.max(0, Math.round(e ?? 0)), n = Math.floor(t / 60), r = t % 60;
	return n === 0 ? `${r}m` : r === 0 ? `${n}h` : `${n}h ${r}m`;
}
function le(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : (t[0].charAt(0) + (t.length > 1 ? t[t.length - 1].charAt(0) : "")).toUpperCase();
}
function ue(e) {
	if (!e) return !1;
	let t = /* @__PURE__ */ new Date(), n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
	return e.slice(0, 10) < n;
}
//#endregion
//#region resources/js/support/i18n.ts
function de() {
	return u()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "flex w-full items-center justify-between" }, pe = { class: "space-y-5 px-6 py-6" }, me = { class: "flex flex-wrap items-center gap-2" }, he = ["aria-label", "onClick"], ge = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, _e = /* @__PURE__ */ l({
	__name: "ProjectFormModal",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["close", "saved"],
	setup(t, { emit: i }) {
		let l = t, u = i, d = [
			"#2563eb",
			"#0891b2",
			"#059669",
			"#ca8a04",
			"#ea580c",
			"#dc2626",
			"#7c3aed",
			"#64748b"
		], m = de(), h = _({
			name: "",
			identifier: "",
			description: "",
			colour: "",
			defaultRate: "",
			budgetHours: "",
			dueDate: ""
		}), C = v(null), w = v([]), D = v(!1), O = v({}), A = v(!1), j = n(() => l.project !== null), M = n(() => j.value ? m("tasks_projects.projects.edit_project") : m("tasks_projects.projects.new_project"));
		T(() => l.show, (e) => {
			e && (N(), R());
		}, { immediate: !0 });
		function N() {
			let e = l.project;
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = ne(e?.default_rate ?? null), h.budgetHours = ie(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, C.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : w.value.find((t) => t.id === e) ?? null;
		}
		function F(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function R() {
			if (!D.value) try {
				let e = await H(l.client);
				w.value = e.map((e) => ({
					id: e.id,
					label: F(e)
				})), D.value = !0, C.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", U(e, m("tasks_projects.projects.customers_failed")));
			}
		}
		function z() {
			return {
				name: h.name.trim(),
				customer_id: C.value?.id ?? null,
				identifier: h.identifier.trim() || null,
				description: h.description.trim() || null,
				colour: h.colour || null,
				default_rate: re(h.defaultRate),
				budget_minutes: ae(h.budgetHours),
				due_date: h.dueDate || null
			};
		}
		function B(e) {
			h.dueDate = e ? se(e) : "";
		}
		async function V() {
			if (!A.value) {
				if (h.name.trim() === "") {
					O.value = { name: m("tasks_projects.projects.name_required") };
					return;
				}
				A.value = !0, O.value = {};
				try {
					let e = l.project, t = e ? await L(l.client, e.id, z()) : await I(l.client, z());
					u("saved", t);
				} catch (e) {
					O.value = te(e), l.notify("error", U(e, m("tasks_projects.projects.save_failed")));
				} finally {
					A.value = !1;
				}
			}
		}
		return (n, i) => {
			let l = b("BaseIcon"), _ = b("BaseInput"), v = b("BaseInputGroup"), T = b("BaseSelectInput"), D = b("BaseDatePicker"), N = b("BaseInputGrid"), P = b("BaseTextarea"), F = b("BaseButton"), I = b("BaseModal");
			return g(), r(I, {
				show: t.show,
				onClose: i[9] ||= (e) => u("close")
			}, {
				header: E(() => [o("div", fe, [o("span", null, x(M.value), 1), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: i[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(V, ["prevent"]) }, [o("div", pe, [
					c(N, null, {
						default: E(() => [
							c(v, {
								label: S(m)("tasks_projects.projects.fields.name"),
								error: O.value.name,
								required: ""
							}, {
								default: E(() => [c(_, {
									modelValue: h.name,
									"onUpdate:modelValue": i[1] ||= (e) => h.name = e,
									invalid: !!O.value.name,
									type: "text"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(v, {
								label: S(m)("tasks_projects.projects.fields.identifier"),
								error: O.value.identifier,
								"help-text": S(m)("tasks_projects.projects.fields.identifier_help")
							}, {
								default: E(() => [c(_, {
									modelValue: h.identifier,
									"onUpdate:modelValue": i[2] ||= (e) => h.identifier = e,
									invalid: !!O.value.identifier,
									type: "text",
									maxlength: "32"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							]),
							c(v, {
								label: S(m)("tasks_projects.projects.fields.customer"),
								error: O.value.customer_id,
								"help-text": S(m)("tasks_projects.projects.fields.customer_help")
							}, {
								default: E(() => [c(T, {
									modelValue: C.value,
									"onUpdate:modelValue": i[3] ||= (e) => C.value = e,
									options: w.value,
									placeholder: S(m)("tasks_projects.projects.fields.customer_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							]),
							c(v, {
								label: S(m)("tasks_projects.projects.fields.due_date"),
								error: O.value.due_date
							}, {
								default: E(() => [c(D, {
									"model-value": h.dueDate,
									"onUpdate:modelValue": B
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(v, {
								label: S(m)("tasks_projects.projects.fields.default_rate"),
								error: O.value.default_rate,
								"help-text": S(m)("tasks_projects.projects.fields.default_rate_help")
							}, {
								default: E(() => [c(_, {
									modelValue: h.defaultRate,
									"onUpdate:modelValue": i[4] ||= (e) => h.defaultRate = e,
									invalid: !!O.value.default_rate,
									type: "number",
									step: "0.01",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							]),
							c(v, {
								label: S(m)("tasks_projects.projects.fields.budget_hours"),
								error: O.value.budget_minutes
							}, {
								default: E(() => [c(_, {
									modelValue: h.budgetHours,
									"onUpdate:modelValue": i[5] ||= (e) => h.budgetHours = e,
									invalid: !!O.value.budget_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"])
						]),
						_: 1
					}),
					c(v, {
						label: S(m)("tasks_projects.projects.fields.colour"),
						error: O.value.colour
					}, {
						default: E(() => [o("div", me, [(g(), a(e, null, y(d, (e) => o("button", {
							key: e,
							type: "button",
							class: f(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: p({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, he)), 64)), o("button", {
							type: "button",
							class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
							onClick: i[6] ||= (e) => h.colour = ""
						}, x(S(m)("tasks_projects.projects.fields.colour_none")), 1)])]),
						_: 1
					}, 8, ["label", "error"]),
					c(v, {
						label: S(m)("tasks_projects.projects.fields.description"),
						error: O.value.description
					}, {
						default: E(() => [c(P, {
							modelValue: h.description,
							"onUpdate:modelValue": i[7] ||= (e) => h.description = e,
							row: 3,
							invalid: !!O.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", ge, [c(F, {
					type: "button",
					variant: "primary-outline",
					onClick: i[8] ||= (e) => u("close")
				}, {
					default: E(() => [s(x(S(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(F, {
					type: "submit",
					variant: "primary",
					loading: A.value,
					disabled: A.value
				}, {
					default: E(() => [s(x(j.value ? S(m)("tasks_projects.general.update") : S(m)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), ve = _({}), ye = !1, be = null;
function xe(e) {
	return e === null ? "" : ve[e] ?? `#${e}`;
}
async function Se(e) {
	ye || (be ??= we(e), await be);
}
function Ce() {
	for (let e of Object.keys(ve)) delete ve[Number(e)];
	ye = !1, be = null;
}
async function we(e) {
	try {
		for (let t of await H(e, 200)) {
			let e = t?.id;
			typeof e == "number" && (ve[e] = Te(t));
		}
		ye = !0;
	} catch {} finally {
		be = null;
	}
}
function Te(e) {
	let t = typeof e.display_name == "string" ? e.display_name.trim() : "";
	if (t !== "") return t;
	let n = typeof e.name == "string" ? e.name.trim() : "";
	return n === "" ? `#${e.id}` : n;
}
//#endregion
//#region resources/js/pages/ProjectsIndexPage.vue?vue&type=script&setup=true&lang.ts
var Ee = { class: "flex items-center justify-end space-x-5" }, De = { class: "relative table-container" }, Oe = { class: "flex items-center" }, ke = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, Ae = { key: 0 }, je = {
	key: 1,
	class: "text-subtle"
}, Me = {
	key: 1,
	class: "text-subtle"
}, Ne = { key: 0 }, Pe = {
	key: 1,
	class: "text-subtle"
}, Fe = 10, Ie = 350, Le = /* @__PURE__ */ l({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = {
			name: "name",
			status: "status",
			default_rate: "default_rate",
			due_date: "due_date"
		}, u = de(), d = v(null), h = v(!1), y = v(!0), C = v(0), O = v(!1), k = v(null), A = v(null), j = _({
			search: "",
			status: "ACTIVE"
		}), M = n(() => [
			{
				id: "ACTIVE",
				label: u("tasks_projects.projects.status.active")
			},
			{
				id: "ARCHIVED",
				label: u("tasks_projects.projects.status.archived")
			},
			{
				id: "ALL",
				label: u("tasks_projects.projects.status.all")
			}
		]), N = n({
			get: () => M.value.find((e) => e.id === j.status) ?? M.value[0],
			set: (e) => {
				j.status = e.id;
			}
		}), I = n(() => [
			{
				key: "name",
				label: u("tasks_projects.projects.columns.name"),
				sortable: !0,
				sortBy: "name",
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: u("tasks_projects.projects.columns.status"),
				sortable: !0,
				sortBy: "status"
			},
			{
				key: "customer",
				label: u("tasks_projects.projects.columns.customer"),
				sortable: !1
			},
			{
				key: "default_rate",
				label: u("tasks_projects.projects.columns.default_rate"),
				sortable: !0,
				sortBy: "default_rate"
			},
			{
				key: "due_date",
				label: u("tasks_projects.projects.columns.due_date"),
				sortable: !0,
				sortBy: "due_date"
			},
			{
				key: "actions",
				label: u("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]), L = n(() => j.search.trim() !== "" || j.status !== "ACTIVE"), V = n(() => !y.value && C.value === 0 && !L.value), H;
		T(() => j.search, () => {
			clearTimeout(H), H = setTimeout(() => te(), Ie);
		}), T(() => j.status, () => te()), m(() => clearTimeout(H));
		async function ee({ page: e, sort: n }) {
			let r = {
				page: e,
				limit: Fe,
				...P(n, l)
			};
			j.status !== "ALL" && (r.status = j.status), j.search.trim() !== "" && (r.search = j.search.trim()), y.value = !0;
			try {
				let e = await F(t.client, r);
				return C.value = e.meta.total, e.data.some((e) => e.customer_id !== null) && Se(t.client), {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return t.notify("error", U(e, u("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Fe
					}
				};
			} finally {
				y.value = !1;
			}
		}
		function te(e = !1) {
			d.value?.refresh(e);
		}
		function ne() {
			h.value && re(), h.value = !h.value;
		}
		function re() {
			j.search = "", j.status = "ACTIVE";
		}
		function ie() {
			k.value = null, O.value = !0;
		}
		function ae(e) {
			k.value = e, O.value = !0;
		}
		function se(e) {
			let n = k.value ? u("tasks_projects.projects.updated", { name: e.name }) : u("tasks_projects.projects.created", { name: e.name });
			O.value = !1, k.value = null, t.notify("success", n), te();
		}
		async function ce(e) {
			A.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await z(t.client, e.id), t.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await R(t.client, e.id), t.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), te(!0);
			} catch (e) {
				t.notify("error", U(e, u("tasks_projects.projects.save_failed")));
			} finally {
				A.value = null;
			}
		}
		async function le(e) {
			if (window.confirm(u("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				A.value = e.id;
				try {
					await B(t.client, e.id), t.notify("success", u("tasks_projects.projects.deleted", { name: e.name })), te(!0);
				} catch (e) {
					t.notify("error", U(e, u("tasks_projects.projects.delete_failed")));
				} finally {
					A.value = null;
				}
			}
		}
		function ue(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function fe(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, n) => {
			let l = b("BaseBreadcrumbItem"), m = b("BaseBreadcrumb"), _ = b("BaseIcon"), v = b("BaseButton"), y = b("router-link"), C = b("BasePageHeader"), T = b("BaseInput"), P = b("BaseInputGroup"), F = b("BaseSelectInput"), L = b("BaseFilterWrapper"), R = b("BaseEmptyPlaceholder"), z = b("BaseBadge"), B = b("BaseFormatMoney"), H = b("BaseDropdownItem"), U = b("BaseDropdown"), te = b("BaseTable"), de = b("BasePage");
			return g(), r(de, null, {
				default: E(() => [
					c(C, { title: S(u)("tasks_projects.projects.title") }, {
						actions: E(() => [o("div", Ee, [
							c(y, { to: "/admin/modules/tasks-projects/board" }, {
								default: E(() => [c(v, { variant: "white" }, {
									left: E((e) => [c(_, {
										name: "ViewColumnsIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(u)("tasks_projects.board.title")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							c(y, { to: "/admin/modules/tasks-projects/reports" }, {
								default: E(() => [c(v, { variant: "white" }, {
									left: E((e) => [c(_, {
										name: "ChartBarIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(u)("tasks_projects.reports.title")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							c(v, {
								variant: "primary-outline",
								onClick: ne
							}, {
								right: E((e) => [h.value ? (g(), r(_, {
									key: 1,
									name: "XMarkIcon",
									class: f(e.class)
								}, null, 8, ["class"])) : (g(), r(_, {
									key: 0,
									name: "FunnelIcon",
									class: f(e.class)
								}, null, 8, ["class"]))]),
								default: E(() => [s(x(S(u)("tasks_projects.general.filter")) + " ", 1)]),
								_: 1
							}),
							c(v, {
								variant: "primary",
								onClick: ie
							}, {
								left: E((e) => [c(_, {
									name: "PlusIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(u)("tasks_projects.projects.new_project")), 1)]),
								_: 1
							})
						])]),
						default: E(() => [c(m, null, {
							default: E(() => [c(l, {
								title: S(u)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(l, {
								title: S(u)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(L, {
						show: h.value,
						class: "mt-3",
						onClear: re
					}, {
						default: E(() => [c(P, {
							label: S(u)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(T, {
								modelValue: j.search,
								"onUpdate:modelValue": n[0] ||= (e) => j.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: S(u)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), c(P, {
							label: S(u)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(F, {
								modelValue: N.value,
								"onUpdate:modelValue": n[1] ||= (e) => N.value = e,
								options: M.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					D(c(R, {
						title: S(u)("tasks_projects.projects.empty_title"),
						description: S(u)("tasks_projects.projects.empty_description")
					}, {
						actions: E(() => [c(v, {
							variant: "primary",
							onClick: ie
						}, {
							left: E((e) => [c(_, {
								name: "PlusIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: E(() => [s(" " + x(S(u)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})]),
						default: E(() => [c(_, {
							name: "FolderIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]), [[w, V.value]]),
					D(o("div", De, [c(te, {
						ref_key: "tableRef",
						ref: d,
						data: ee,
						columns: I.value,
						class: "mt-3"
					}, {
						"cell-name": E(({ row: e }) => [o("div", Oe, [o("span", {
							class: f(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: p(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), o("span", null, [c(y, {
							class: "hover:text-primary-500",
							to: {
								name: "extension.page.tasks-projects.project",
								params: { id: e.data.id }
							}
						}, {
							default: E(() => [s(x(e.data.name), 1)]),
							_: 2
						}, 1032, ["to"]), e.data.identifier ? (g(), a("span", ke, x(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": E(({ row: e }) => [c(z, { class: f(["rounded-full", ue(e.data.status)]) }, {
							default: E(() => [s(x(fe(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": E(({ row: e }) => [e.data.customer_id ? (g(), a("span", Ae, x(S(xe)(e.data.customer_id)), 1)) : (g(), a("span", je, x(S(u)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": E(({ row: e }) => [e.data.default_rate === null ? (g(), a("span", Me, "-")) : (g(), r(B, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", Ne, x(S(oe)(e.data.due_date)), 1)) : (g(), a("span", Pe, "-"))]),
						"cell-actions": E(({ row: e }) => [c(U, { "content-loading": A.value === e.data.id }, {
							activator: E(() => [c(_, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: E(() => [
								c(H, { onClick: (t) => ae(e.data) }, {
									default: E(() => [c(_, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(u)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(H, { onClick: (t) => ce(e.data) }, {
									default: E(() => [c(_, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + x(e.data.status === "ARCHIVED" ? S(u)("tasks_projects.projects.unarchive") : S(u)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(H, { onClick: (t) => le(e.data) }, {
									default: E(() => [c(_, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(u)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[w, !V.value]]),
					c(_e, {
						show: O.value,
						client: e.client,
						notify: e.notify,
						project: k.value,
						onClose: n[2] ||= (e) => O.value = !1,
						onSaved: se
					}, null, 8, [
						"show",
						"client",
						"notify",
						"project"
					])
				]),
				_: 1
			});
		};
	}
}), Re = "/api/v1/tasks-projects", ze = {
	timeEntries: `${Re}/time-entries`,
	timeEntry: (e) => `${Re}/time-entries/${e}`,
	timer: `${Re}/timer`,
	timerStart: `${Re}/timer/start`,
	timerStop: `${Re}/timer/stop`,
	taskStatuses: `${Re}/task-statuses`,
	taskStatus: (e) => `${Re}/task-statuses/${e}`,
	reorderTaskStatuses: `${Re}/task-statuses/reorder`,
	tasks: `${Re}/tasks`,
	task: (e) => `${Re}/tasks/${e}`,
	members: `${Re}/members`,
	settings: `${Re}/settings`
}, Be = { bootstrap: "/api/v1/bootstrap" }, Ve = 100, He = 5, Ue = 10;
async function We(e, t) {
	let { data: n } = await e.get(ze.timeEntries, { params: t });
	return n;
}
async function Ge(e, t) {
	let n = [];
	for (let r = 1; r <= He; r += 1) {
		let i = await We(e, {
			...t,
			page: r,
			limit: Ve
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function Ke(e, t) {
	let { data: n } = await e.post(ze.timeEntries, t);
	return n.data;
}
async function qe(e, t, n) {
	let { data: r } = await e.put(ze.timeEntry(t), n);
	return r.data;
}
async function Je(e, t) {
	await e.delete(ze.timeEntry(t));
}
async function Ye(e) {
	let { data: t } = await e.get(ze.timer);
	return t?.data ?? null;
}
async function Xe(e, t) {
	let { data: n } = await e.post(ze.timerStart, t);
	return n.data;
}
async function Ze(e) {
	let { data: t } = await e.post(ze.timerStop);
	return t.data;
}
async function Qe(e) {
	await e.delete(ze.timer);
}
async function $e(e) {
	let { data: t } = await e.get(ze.taskStatuses);
	return t.data ?? [];
}
async function et(e, t) {
	let { data: n } = await e.post(ze.taskStatuses, t);
	return n.data;
}
async function tt(e, t, n) {
	let { data: r } = await e.put(ze.taskStatus(t), n);
	return r.data;
}
async function nt(e, t) {
	await e.delete(ze.taskStatus(t));
}
async function rt(e, t) {
	let { data: n } = await e.post(ze.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function it(e, t, n = Ue) {
	let r = { limit: n };
	t.trim() !== "" && (r.search = t.trim());
	let { data: i } = await e.get(ze.tasks, { params: r });
	return i.data ?? [];
}
async function at(e, t) {
	let { data: n } = await e.get(ze.task(t));
	return n.data;
}
async function ot(e) {
	let { data: t } = await e.get(ze.members);
	return t.data ?? [];
}
async function st(e) {
	let { data: t } = await e.get(ze.settings);
	return t.data;
}
async function ct(e) {
	let { data: t } = await e.get(Be.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var lt = _({}), ut = /* @__PURE__ */ new Set(), dt = 5;
function ft(e) {
	return e === null ? "" : lt[e] ?? `#${e}`;
}
function pt(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (lt[e.id] = e.name);
}
async function mt(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && lt[e] === void 0 && !ut.has(e));
	for (let e of n) ut.add(e);
	for (let t = 0; t < n.length; t += dt) await Promise.all(n.slice(t, t + dt).map(async (t) => {
		try {
			pt(await at(e, t));
		} catch {} finally {
			ut.delete(t);
		}
	}));
}
function ht() {
	for (let e of Object.keys(lt)) delete lt[Number(e)];
	ut.clear();
}
//#endregion
//#region resources/js/support/http.ts
function gt(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function _t(e) {
	return gt(e) === 409;
}
function vt(e) {
	return gt(e) === 403;
}
//#endregion
//#region resources/js/support/time.ts
var yt = 60, bt = 60, xt = 7;
function St(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / bt), i = t % bt;
	return `${n}:${zt(r)}:${zt(i)}`;
}
function Ct(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / yt)}:${zt(t % yt)}`;
}
function wt(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * yt + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * yt);
}
function Tt(e) {
	let t = It(e);
	return t === null ? "" : Mt(t);
}
function Et(e) {
	let t = It(e);
	return t === null ? "" : `${zt(t.getHours())}:${zt(t.getMinutes())}`;
}
function Dt(e, t = "09:00") {
	let n = Lt(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function Ot(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * bt * 1e3), n.toISOString();
}
function kt(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = Rt(e), i = (r.getDay() - n + xt) % xt;
	return r.setDate(r.getDate() - i), r;
}
function At(e) {
	return Array.from({ length: xt }, (t, n) => jt(e, n));
}
function jt(e, t) {
	let n = Rt(e);
	return n.setDate(n.getDate() + t), n;
}
function Mt(e) {
	return `${e.getFullYear()}-${zt(e.getMonth() + 1)}-${zt(e.getDate())}`;
}
function Nt(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function Pt(e) {
	return Mt(e) === Mt(/* @__PURE__ */ new Date());
}
function Ft(e) {
	let t = It(e);
	return t === null ? 0 : Math.max(0, Math.floor((Date.now() - t.getTime()) / 1e3));
}
function It(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function Lt(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function Rt(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function zt(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var W = _({
	running: null,
	elapsedSeconds: 0,
	busy: !1
}), Bt;
function Vt() {
	W.elapsedSeconds = W.running === null ? 0 : Ft(W.running.started_at);
}
function Ht() {
	Vt(), Bt === void 0 && (Bt = setInterval(Vt, 1e3));
}
function Ut() {
	Bt !== void 0 && (clearInterval(Bt), Bt = void 0), W.elapsedSeconds = 0;
}
function Wt(e, t) {
	if (W.running = e && typeof e.id == "number" ? e : null, W.running === null) {
		Ut();
		return;
	}
	Ht(), t && typeof W.running.task_id == "number" && mt(t, [W.running.task_id]);
}
function Gt(e, t, n) {
	e?.notify("error", U(t, e.t(n)));
}
var G = {
	get running() {
		return W.running;
	},
	get elapsedSeconds() {
		return W.elapsedSeconds;
	},
	get busy() {
		return W.busy;
	},
	async refresh(e) {
		try {
			Wt(await Ye(e), e);
		} catch {
			Wt(null);
		}
	},
	async start(e, t, n = null, r) {
		if (W.busy) return null;
		W.busy = !0;
		try {
			let r = await Xe(e, {
				task_id: t,
				description: n
			});
			return Wt(r, e), r;
		} catch (t) {
			return _t(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : Gt(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			W.busy = !1;
		}
	},
	async stop(e, t) {
		if (W.busy || W.running === null) return null;
		W.busy = !0;
		try {
			let t = await Ze(e);
			return Wt(null), t;
		} catch (n) {
			return Gt(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			W.busy = !1;
		}
	},
	async discard(e, t) {
		if (W.busy || W.running === null) return !1;
		W.busy = !0;
		try {
			return await Qe(e), Wt(null), !0;
		} catch (n) {
			return Gt(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			W.busy = !1;
		}
	},
	reset() {
		W.busy = !1, Wt(null);
	}
}, Kt = {
	key: 0,
	class: "fixed right-6 bottom-20 z-40 flex flex-col items-end gap-3"
}, qt = ["aria-label"], Jt = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, Yt = { class: "text-sm font-semibold text-heading" }, Xt = ["aria-label"], Zt = {
	key: 0,
	class: "space-y-4 px-4 py-4"
}, Qt = { class: "truncate text-sm font-medium text-heading" }, $t = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, en = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, tn = { class: "flex items-center gap-2" }, nn = {
	key: 1,
	class: "space-y-3 px-4 py-4"
}, rn = { class: "block" }, an = { class: "sr-only" }, on = ["placeholder"], sn = {
	key: 0,
	class: "text-xs text-muted"
}, cn = {
	key: 1,
	class: "max-h-48 space-y-1 overflow-y-auto"
}, ln = ["onClick"], un = {
	key: 2,
	class: "text-xs text-muted"
}, dn = ["placeholder", "aria-label"], fn = { class: "flex items-center justify-between" }, pn = ["title", "aria-label"], mn = {
	key: 0,
	class: "tabular-nums"
}, hn = 300, gn = /* @__PURE__ */ l({
	__name: "QuickStartOverlay",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		enabled: { type: Boolean }
	},
	emits: ["open-timesheet"],
	setup(l, { emit: u }) {
		let d = l, p = u, h = de(), _ = v(!1), w = v(""), k = v([]), A = v(!1), j = v(null), M = v(""), N, P = n(() => ({
			notify: d.notify,
			t: h
		})), F = n(() => ft(G.running?.task_id ?? null)), I = n(() => St(G.elapsedSeconds));
		T(() => d.enabled, (e) => {
			e || z();
		}), T(_, (e) => {
			e && G.running === null && L();
		}), T(w, () => {
			clearTimeout(N), N = setTimeout(() => void L(), hn);
		}), m(() => clearTimeout(N));
		async function L() {
			A.value = !0;
			try {
				let e = await it(d.client, w.value);
				k.value = e, e.forEach(pt);
			} catch (e) {
				k.value = [], d.notify("error", U(e, h("tasks_projects.time.tasks_failed")));
			} finally {
				A.value = !1;
			}
		}
		function R(e) {
			j.value = e, pt(e);
		}
		function z() {
			_.value = !1, w.value = "", k.value = [], j.value = null, M.value = "";
		}
		async function B() {
			let e = j.value;
			e !== null && await G.start(d.client, e.id, M.value.trim() || null, P.value) !== null && (d.notify("success", h("tasks_projects.timer.started", { name: e.name })), z());
		}
		async function V() {
			let e = F.value, t = await G.stop(d.client, P.value);
			t !== null && (d.notify("success", h("tasks_projects.timer.stopped", {
				name: e,
				duration: Ct(t.duration_minutes)
			})), z());
		}
		async function H() {
			window.confirm(h("tasks_projects.timer.discard_confirm")) && await G.discard(d.client, P.value) && (d.notify("success", h("tasks_projects.timer.discarded")), z());
		}
		return (n, u) => {
			let d = b("BaseIcon"), m = b("BaseButton");
			return g(), r(t, { to: "body" }, [l.enabled ? (g(), a("div", Kt, [_.value ? (g(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": S(h)("tasks_projects.timer.panel_title"),
				onKeydown: O(z, ["esc"])
			}, [o("header", Jt, [o("h2", Yt, x(S(h)("tasks_projects.timer.panel_title")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": S(h)("tasks_projects.timer.close"),
				onClick: z
			}, [c(d, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Xt)]), S(G).running === null ? (g(), a("div", nn, [
				o("label", rn, [o("span", an, x(S(h)("tasks_projects.timer.search_tasks")), 1), D(o("input", {
					"onUpdate:modelValue": u[0] ||= (e) => w.value = e,
					type: "search",
					autocomplete: "off",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.search_tasks")
				}, null, 8, on), [[C, w.value]])]),
				A.value ? (g(), a("p", sn, x(S(h)("tasks_projects.general.search")), 1)) : k.value.length > 0 ? (g(), a("ul", cn, [(g(!0), a(e, null, y(k.value, (e) => (g(), a("li", { key: e.id }, [o("button", {
					type: "button",
					class: f(["w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover", j.value?.id === e.id ? "bg-hover-strong font-medium text-heading" : "text-body"]),
					onClick: (t) => R(e)
				}, x(e.name), 11, ln)]))), 128))])) : (g(), a("p", un, x(S(h)("tasks_projects.timer.no_tasks")), 1)),
				D(o("input", {
					"onUpdate:modelValue": u[1] ||= (e) => M.value = e,
					type: "text",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.description_placeholder"),
					"aria-label": S(h)("tasks_projects.time.fields.description")
				}, null, 8, dn), [[C, M.value]]),
				o("div", fn, [o("button", {
					type: "button",
					class: "text-xs text-primary-500 hover:underline",
					onClick: u[2] ||= (e) => p("open-timesheet")
				}, x(S(h)("tasks_projects.timer.open_timesheet")), 1), c(m, {
					variant: "primary",
					disabled: j.value === null || S(G).busy,
					onClick: B
				}, {
					left: E((e) => [c(d, {
						name: "PlayIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: E(() => [s(" " + x(S(h)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			])) : (g(), a("div", Zt, [o("div", null, [
				o("p", Qt, x(F.value), 1),
				o("p", $t, x(I.value), 1),
				S(G).running.description ? (g(), a("p", en, x(S(G).running.description), 1)) : i("", !0)
			]), o("div", tn, [c(m, {
				variant: "primary",
				disabled: S(G).busy,
				onClick: V
			}, {
				left: E((e) => [c(d, {
					name: "StopIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(h)("tasks_projects.timer.stop")), 1)]),
				_: 1
			}, 8, ["disabled"]), c(m, {
				variant: "primary-outline",
				disabled: S(G).busy,
				onClick: H
			}, {
				default: E(() => [s(x(S(h)("tasks_projects.timer.discard")), 1)]),
				_: 1
			}, 8, ["disabled"])])]))], 40, qt)) : i("", !0), o("button", {
				type: "button",
				class: "flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover",
				title: S(h)("tasks_projects.timer.quick_start"),
				"aria-label": S(h)("tasks_projects.timer.quick_start"),
				onClick: u[3] ||= (e) => _.value = !_.value
			}, [c(d, {
				name: S(G).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), S(G).running === null ? i("", !0) : (g(), a("span", mn, x(I.value), 1))], 8, pn)])) : i("", !0)]);
		};
	}
}), _n = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, vn = ["title"], yn = ["aria-label"], bn = { class: "font-medium tabular-nums" }, xn = [
	"disabled",
	"title",
	"aria-label"
], Sn = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = de(), u = n(() => ft(G.running?.task_id ?? null)), d = n(() => St(G.elapsedSeconds));
		async function f() {
			let e = u.value, t = await G.stop(r.client, {
				notify: r.notify,
				t: l
			});
			t !== null && r.notify("success", l("tasks_projects.timer.stopped", {
				name: e,
				duration: Ct(t.duration_minutes)
			}));
		}
		return (e, t) => {
			let n = b("BaseIcon");
			return S(G).running === null ? i("", !0) : (g(), a("li", _n, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: S(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": S(l)("tasks_projects.timer.open_timesheet"),
					onClick: t[0] ||= (e) => s("open")
				}, x(u.value), 9, yn),
				o("span", bn, x(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: S(G).busy,
					title: S(l)("tasks_projects.timer.stop"),
					"aria-label": S(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, xn)
			], 8, vn)]));
		};
	}
}), Cn = { en: { tasks_projects: {
	time: {
		title: "Time",
		my_time: "My time",
		all_time: "All time",
		this_week: "This week",
		previous_week: "Previous week",
		next_week: "Next week",
		week_total: "Week total",
		day_total: "Total",
		add_entry: "Add entry",
		new_entry: "New time entry",
		edit_entry: "Edit time entry",
		view_entry: "Time entry",
		no_entries: "Nothing logged.",
		empty_title: "No time logged yet",
		empty_description: "Log an entry by hand, or start the timer on a task.",
		unknown_member: "Removed member",
		unknown_user: "Unable to identify the signed-in user. Reload the page and try again.",
		billable: "Billable",
		non_billable: "Not billable",
		billed: "Billed",
		unbilled: "Unbilled",
		stamped_notice: "This entry is already on an invoice. Invoiced time is history and cannot be changed.",
		created: "The time entry was saved.",
		updated: "The time entry was updated.",
		deleted: "The time entry was deleted.",
		delete_confirm: "Delete this time entry?",
		load_failed: "Unable to load the time entries.",
		save_failed: "Unable to save the time entry.",
		delete_failed: "Unable to delete the time entry.",
		members_failed: "Unable to load the members.",
		projects_failed: "Unable to load the projects.",
		tasks_failed: "Unable to load the tasks.",
		columns: {
			date: "Date",
			member: "Member",
			task: "Task",
			description: "Description",
			duration: "Duration",
			billable: "Billable",
			amount: "Amount"
		},
		filters: {
			member: "Member",
			project: "Project",
			from: "From",
			to: "To",
			billing: "Billing",
			all: "All",
			any_member: "Everyone",
			any_project: "Any project"
		},
		fields: {
			task: "Task",
			task_placeholder: "Search by task name or number",
			date: "Date",
			mode: "Entry",
			duration: "Duration",
			duration_help: "Hours and minutes, as 1:30 or 1.5.",
			start: "Start",
			end: "End",
			description: "Description",
			billable: "Billable"
		},
		mode: {
			duration: "Duration",
			range: "Start and end"
		},
		task_required: "Pick a task.",
		date_required: "Pick a date.",
		duration_invalid: "Enter a duration like 1:30 or 1.5.",
		range_invalid: "Enter a start and an end time, with the end after the start."
	},
	timer: {
		running: "Timer running",
		quick_start: "Start a timer",
		panel_title: "Quick start",
		start: "Start",
		stop: "Stop",
		discard: "Discard",
		close: "Close",
		open_timesheet: "Open my time",
		elapsed: "Elapsed",
		search_tasks: "Search tasks",
		no_tasks: "No tasks match that search.",
		description_placeholder: "What are you working on? (optional)",
		started: "The timer is running on {name}.",
		stopped: "Logged {duration} on {name}.",
		discarded: "The running timer was discarded.",
		discard_confirm: "Discard the running timer? The elapsed time is not saved.",
		already_running: "A timer is already running. It has been reloaded.",
		start_failed: "Unable to start the timer.",
		stop_failed: "Unable to stop the timer.",
		discard_failed: "Unable to discard the timer."
	},
	settings: {
		title: "Tasks and Projects",
		general_title: "General",
		general_description: "The default hourly rate, the rounding increment, the first day of the week and who may see other members time.",
		open_module_settings: "Open module settings",
		statuses_title: "Task statuses",
		statuses_description: "The columns of the board. One status is the default, where new tasks land; a closed status counts as done.",
		status_name: "Name",
		colour: "Colour",
		colour_none: "None",
		is_default: "Default",
		is_closed: "Closed",
		add_status: "Add status",
		new_status: "New status",
		move_up: "Move up",
		move_down: "Move down",
		no_statuses: "No statuses yet.",
		status_created: "{name} was added.",
		status_updated: "{name} was updated.",
		status_deleted: "{name} was deleted.",
		status_reordered: "The order was saved.",
		status_delete_confirm: "Delete {name}?",
		status_name_required: "Enter a status name.",
		load_failed: "Unable to load the task statuses.",
		save_failed: "Unable to save the task status.",
		delete_failed: "Unable to delete the task status.",
		reorder_failed: "Unable to save the new order.",
		forbidden: "Your role does not allow managing the board columns."
	}
} } }, wn = { class: "relative table-container" }, Tn = { class: "block max-w-64 truncate" }, En = { class: "tabular-nums" }, Dn = {
	key: 1,
	class: "text-subtle"
}, On = /* @__PURE__ */ l({
	__name: "AllTimeTable",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		members: {},
		projects: {},
		reloadToken: {}
	},
	emits: ["edit", "delete"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = de(), p = v(null), m = _({
			memberId: null,
			projectId: null,
			from: "",
			to: "",
			billing: "ALL"
		}), h = n(() => [{
			id: 0,
			label: d("tasks_projects.time.filters.any_member")
		}, ...l.members.map((e) => ({
			id: e.id,
			label: e.name
		}))]), y = n(() => [{
			id: 0,
			label: d("tasks_projects.time.filters.any_project")
		}, ...l.projects.map((e) => ({
			id: e.id,
			label: e.name
		}))]), C = n(() => [
			{
				id: "ALL",
				label: d("tasks_projects.time.filters.all")
			},
			{
				id: "BILLED",
				label: d("tasks_projects.time.billed")
			},
			{
				id: "UNBILLED",
				label: d("tasks_projects.time.unbilled")
			}
		]), w = n({
			get: () => A(h.value, m.memberId ?? 0),
			set: (e) => {
				m.memberId = typeof e.id == "number" && e.id > 0 ? e.id : null;
			}
		}), D = n({
			get: () => A(y.value, m.projectId ?? 0),
			set: (e) => {
				m.projectId = typeof e.id == "number" && e.id > 0 ? e.id : null;
			}
		}), O = n({
			get: () => A(C.value, m.billing),
			set: (e) => {
				m.billing = typeof e.id == "string" ? e.id : "ALL";
			}
		}), k = n(() => [
			{
				key: "date",
				label: d("tasks_projects.time.columns.date"),
				sortable: !1
			},
			{
				key: "member",
				label: d("tasks_projects.time.columns.member"),
				sortable: !1
			},
			{
				key: "task",
				label: d("tasks_projects.time.columns.task"),
				sortable: !1,
				tdClass: "font-medium text-heading"
			},
			{
				key: "description",
				label: d("tasks_projects.time.columns.description"),
				sortable: !1
			},
			{
				key: "duration",
				label: d("tasks_projects.time.columns.duration"),
				sortable: !1
			},
			{
				key: "billable",
				label: d("tasks_projects.time.columns.billable"),
				sortable: !1
			},
			{
				key: "amount",
				label: d("tasks_projects.time.columns.amount"),
				sortable: !1
			},
			{
				key: "actions",
				label: d("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]);
		T(m, () => j()), T(() => l.reloadToken, () => j(!0));
		function A(e, t) {
			return e.find((e) => e.id === t) ?? e[0];
		}
		function j(e = !1) {
			p.value?.refresh(e);
		}
		function M() {
			m.memberId = null, m.projectId = null, m.from = "", m.to = "", m.billing = "ALL";
		}
		function N(e) {
			m.from = e ? se(e) : "";
		}
		function P(e) {
			m.to = e ? se(e) : "";
		}
		function F(e) {
			let t = l.members.find((t) => t.id === e);
			return t === void 0 ? l.members.length === 0 ? `#${e}` : d("tasks_projects.time.unknown_member") : t.name;
		}
		async function I({ page: e }) {
			let t = {
				page: e,
				limit: 25
			};
			m.memberId !== null && (t.user_id = m.memberId), m.projectId !== null && (t.project_id = m.projectId), m.from !== "" && (t.from = m.from), m.to !== "" && (t.to = m.to), m.billing !== "ALL" && (t.billed = m.billing === "BILLED");
			try {
				let e = await We(l.client, t), n = e.data ?? [];
				return mt(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
					data: n,
					pagination: L(e.meta, n.length)
				};
			} catch (e) {
				return l.notify("error", U(e, d("tasks_projects.time.load_failed"))), {
					data: [],
					pagination: L(null, 0)
				};
			}
		}
		function L(e, t) {
			return {
				totalPages: e?.last_page ?? 1,
				currentPage: e?.current_page ?? 1,
				totalCount: e?.total ?? t,
				count: t,
				limit: e?.per_page ?? 25
			};
		}
		return (e, t) => {
			let n = b("BaseSelectInput"), l = b("BaseInputGroup"), _ = b("BaseDatePicker"), v = b("BaseFilterWrapper"), T = b("BaseBadge"), A = b("BaseFormatMoney"), j = b("BaseIcon"), L = b("BaseDropdownItem"), R = b("BaseDropdown"), z = b("BaseTable");
			return g(), a("section", null, [c(v, {
				show: "",
				"row-on-xl": "",
				class: "mt-3",
				onClear: M
			}, {
				default: E(() => [
					c(l, {
						label: S(d)("tasks_projects.time.filters.member"),
						class: "mt-2 flex-1"
					}, {
						default: E(() => [c(n, {
							modelValue: w.value,
							"onUpdate:modelValue": t[0] ||= (e) => w.value = e,
							options: h.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: S(d)("tasks_projects.time.filters.project"),
						class: "mt-2 flex-1"
					}, {
						default: E(() => [c(n, {
							modelValue: D.value,
							"onUpdate:modelValue": t[1] ||= (e) => D.value = e,
							options: y.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: S(d)("tasks_projects.time.filters.from"),
						class: "mt-2 flex-1"
					}, {
						default: E(() => [c(_, {
							"model-value": m.from,
							"onUpdate:modelValue": N
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: S(d)("tasks_projects.time.filters.to"),
						class: "mt-2 flex-1"
					}, {
						default: E(() => [c(_, {
							"model-value": m.to,
							"onUpdate:modelValue": P
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: S(d)("tasks_projects.time.filters.billing"),
						class: "mt-2 flex-1"
					}, {
						default: E(() => [c(n, {
							modelValue: O.value,
							"onUpdate:modelValue": t[2] ||= (e) => O.value = e,
							options: C.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])
				]),
				_: 1
			}), o("div", wn, [c(z, {
				ref_key: "tableRef",
				ref: p,
				data: I,
				columns: k.value,
				class: "mt-3"
			}, {
				"cell-date": E(({ row: e }) => [s(x(S(oe)(S(Tt)(e.data.started_at))), 1)]),
				"cell-member": E(({ row: e }) => [s(x(F(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [s(x(S(ft)(e.data.task_id)), 1)]),
				"cell-description": E(({ row: e }) => [o("span", Tn, x(e.data.description || "-"), 1)]),
				"cell-duration": E(({ row: e }) => [o("span", En, x(S(Ct)(e.data.duration_minutes)), 1)]),
				"cell-billable": E(({ row: e }) => [c(T, { class: f(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: E(() => [s(x(e.data.billable ? S(d)("tasks_projects.time.billable") : S(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": E(({ row: e }) => [e.data.billable ? (g(), r(A, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (g(), a("span", Dn, "-"))]),
				"cell-actions": E(({ row: e }) => [c(R, null, {
					activator: E(() => [c(j, {
						name: "EllipsisHorizontalIcon",
						class: "h-5 text-muted"
					})]),
					default: E(() => [c(L, { onClick: (t) => u("edit", e.data) }, {
						default: E(() => [c(j, {
							name: "PencilIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + x(S(d)("tasks_projects.general.edit")), 1)]),
						_: 1
					}, 8, ["onClick"]), e.data.invoice_id === null ? (g(), r(L, {
						key: 0,
						onClick: (t) => u("delete", e.data)
					}, {
						default: E(() => [c(j, {
							name: "TrashIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + x(S(d)("tasks_projects.general.delete")), 1)]),
						_: 1
					}, 8, ["onClick"])) : i("", !0)]),
					_: 2
				}, 1024)]),
				_: 1
			}, 8, ["columns"])])]);
		};
	}
}), kn = { class: "flex w-full items-center justify-between" }, An = { class: "space-y-5 px-6 py-6" }, jn = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, Mn = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, Nn = ["disabled", "onClick"], Pn = {
	key: 1,
	class: "text-sm text-muted"
}, Fn = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, In = { key: 1 }, Ln = { class: "flex space-x-3" }, Rn = "09:00", zn = /* @__PURE__ */ l({
	__name: "TimeEntryModal",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		entry: {},
		defaultDate: {}
	},
	emits: [
		"close",
		"saved",
		"deleted"
	],
	setup(t, { emit: l }) {
		let u = t, d = l, p = ["duration", "range"], m = de(), h = _({
			date: "",
			mode: "duration",
			duration: "",
			start: Rn,
			end: "",
			description: "",
			billable: !0
		}), C = v(null), w = v({}), D = v(!1), O = v(!1), A = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : A.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		T(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			w.value = {}, C.value = null, h.date = e ? Tt(e.started_at) : u.defaultDate ?? Mt(/* @__PURE__ */ new Date()), h.duration = e ? Ct(e.duration_minutes) : "", h.start = e?.started_at ? Et(e.started_at) : Rn, h.end = e?.ended_at ? Et(e.ended_at) : "", h.description = e?.description ?? "", h.billable = !e || e.billable, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? Mt(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await at(u.client, e);
				C.value = t, pt(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await it(u.client, e ?? "");
				return t.forEach(pt), t;
			} catch (e) {
				return u.notify("error", U(e, m("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function L(e) {
			h.date = e ? se(e) : "";
		}
		function R(e) {
			C.value = e, e !== null && u.entry === null && (h.billable = e.billable !== !1);
		}
		function z() {
			let e = {}, t = C.value;
			(t === null || typeof t.id != "number") && (e.task_id = m("tasks_projects.time.task_required")), h.date === "" && (e.date = m("tasks_projects.time.date_required"));
			let n = Dt(h.date, h.mode === "range" ? h.start : Rn);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? wt(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? Dt(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), w.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = Ot(n, r)) : a.ended_at = i, a;
		}
		async function B() {
			if (D.value || j.value) return;
			let e = z();
			if (e !== null) {
				D.value = !0;
				try {
					let t = u.entry, n = t ? await qe(u.client, t.id, e) : await Ke(u.client, e);
					d("saved", n);
				} catch (e) {
					w.value = te(e), u.notify("error", U(e, m("tasks_projects.time.save_failed")));
				} finally {
					D.value = !1;
				}
			}
		}
		async function V() {
			let e = u.entry;
			if (!(e === null || O.value || j.value) && window.confirm(m("tasks_projects.time.delete_confirm"))) {
				O.value = !0;
				try {
					await Je(u.client, e.id), d("deleted", e);
				} catch (e) {
					u.notify("error", U(e, m("tasks_projects.time.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let u = b("BaseIcon"), _ = b("BaseMultiselect"), v = b("BaseInputGroup"), T = b("BaseDatePicker"), N = b("BaseInputGrid"), P = b("BaseInput"), F = b("BaseTextarea"), z = b("BaseSwitch"), H = b("BaseButton"), ee = b("BaseModal");
			return g(), r(ee, {
				show: t.show,
				onClose: l[8] ||= (e) => d("close")
			}, {
				header: E(() => [o("div", kn, [o("span", null, x(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(B, ["prevent"]) }, [o("div", An, [
					j.value ? (g(), a("p", jn, x(S(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
					c(v, {
						label: S(m)("tasks_projects.time.fields.task"),
						error: w.value.task_id,
						required: ""
					}, {
						default: E(() => [c(_, {
							"model-value": C.value,
							options: I,
							disabled: j.value,
							invalid: !!w.value.task_id,
							placeholder: S(m)("tasks_projects.time.fields.task_placeholder"),
							"initial-search": C.value?.name ?? "",
							delay: 400,
							"filter-results": !1,
							"value-prop": "id",
							"track-by": "name",
							label: "name",
							object: "",
							searchable: "",
							"preserve-search": "",
							"resolve-on-load": "",
							"onUpdate:modelValue": l[1] ||= (e) => R(e)
						}, null, 8, [
							"model-value",
							"disabled",
							"invalid",
							"placeholder",
							"initial-search"
						])]),
						_: 1
					}, 8, ["label", "error"]),
					c(N, null, {
						default: E(() => [c(v, {
							label: S(m)("tasks_projects.time.fields.date"),
							error: w.value.date,
							required: ""
						}, {
							default: E(() => [c(T, {
								"model-value": h.date,
								disabled: j.value,
								invalid: !!w.value.date,
								"onUpdate:modelValue": L
							}, null, 8, [
								"model-value",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"]), c(v, { label: S(m)("tasks_projects.time.fields.mode") }, {
							default: E(() => [o("div", Mn, [(g(), a(e, null, y(p, (e) => o("button", {
								key: e,
								type: "button",
								class: f(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, x(S(m)(`tasks_projects.time.mode.${e}`)), 11, Nn)), 64))])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					h.mode === "duration" ? (g(), r(v, {
						key: 1,
						label: S(m)("tasks_projects.time.fields.duration"),
						error: w.value.duration_minutes,
						"help-text": S(m)("tasks_projects.time.fields.duration_help"),
						required: ""
					}, {
						default: E(() => [c(P, {
							modelValue: h.duration,
							"onUpdate:modelValue": l[2] ||= (e) => h.duration = e,
							type: "text",
							inputmode: "text",
							placeholder: "1:30",
							disabled: j.value,
							invalid: !!w.value.duration_minutes
						}, null, 8, [
							"modelValue",
							"disabled",
							"invalid"
						])]),
						_: 1
					}, 8, [
						"label",
						"error",
						"help-text"
					])) : (g(), r(N, { key: 2 }, {
						default: E(() => [c(v, {
							label: S(m)("tasks_projects.time.fields.start"),
							error: w.value.started_at,
							required: ""
						}, {
							default: E(() => [c(P, {
								modelValue: h.start,
								"onUpdate:modelValue": l[3] ||= (e) => h.start = e,
								type: "time",
								disabled: j.value,
								invalid: !!w.value.started_at
							}, null, 8, [
								"modelValue",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"]), c(v, {
							label: S(m)("tasks_projects.time.fields.end"),
							error: w.value.ended_at,
							required: ""
						}, {
							default: E(() => [c(P, {
								modelValue: h.end,
								"onUpdate:modelValue": l[4] ||= (e) => h.end = e,
								type: "time",
								disabled: j.value,
								invalid: !!w.value.ended_at
							}, null, 8, [
								"modelValue",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"])]),
						_: 1
					})),
					c(v, {
						label: S(m)("tasks_projects.time.fields.description"),
						error: w.value.description
					}, {
						default: E(() => [c(F, {
							modelValue: h.description,
							"onUpdate:modelValue": l[5] ||= (e) => h.description = e,
							row: 3,
							disabled: j.value,
							invalid: !!w.value.description
						}, null, 8, [
							"modelValue",
							"disabled",
							"invalid"
						])]),
						_: 1
					}, 8, ["label", "error"]),
					c(v, {
						label: S(m)("tasks_projects.time.fields.billable"),
						error: w.value.billable
					}, {
						default: E(() => [j.value ? (g(), a("span", Pn, x(h.billable ? S(m)("tasks_projects.time.billable") : S(m)("tasks_projects.time.non_billable")), 1)) : (g(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Fn, [A.value && !j.value ? (g(), r(H, {
					key: 0,
					type: "button",
					variant: "danger",
					size: "sm",
					loading: O.value,
					disabled: O.value,
					onClick: V
				}, {
					default: E(() => [s(x(S(m)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", In)), o("div", Ln, [c(H, {
					type: "button",
					variant: "primary-outline",
					onClick: l[7] ||= (e) => d("close")
				}, {
					default: E(() => [s(x(j.value ? S(m)("tasks_projects.timer.close") : S(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), j.value ? i("", !0) : (g(), r(H, {
					key: 0,
					type: "submit",
					variant: "primary",
					loading: D.value,
					disabled: D.value
				}, {
					default: E(() => [s(x(A.value ? S(m)("tasks_projects.general.update") : S(m)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"]))])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), Bn = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, Vn = { class: "flex items-center gap-2" }, Hn = { class: "ml-1 text-sm text-muted" }, Un = { class: "flex items-center gap-2 text-sm" }, Wn = { class: "text-muted" }, Gn = { class: "text-lg font-semibold tabular-nums text-heading" }, Kn = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, qn = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, Jn = { class: "flex items-baseline justify-between" }, Yn = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, Xn = { class: "text-xs text-muted" }, Zn = { class: "text-sm font-medium tabular-nums text-heading" }, Qn = { class: "mt-3 flex-1 space-y-2" }, $n = ["onClick"], er = { class: "flex items-center justify-between gap-2" }, tr = { class: "truncate text-xs font-medium text-heading" }, nr = { class: "shrink-0 text-xs tabular-nums text-muted" }, rr = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, ir = { class: "mt-1 flex items-center gap-1" }, ar = { class: "text-[11px] text-subtle" }, or = {
	key: 0,
	class: "text-[11px] text-subtle"
}, sr = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, cr = ["onClick"], lr = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, ur = /* @__PURE__ */ l({
	__name: "WeekTimesheet",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		userId: {},
		weekStart: {},
		reloadToken: {}
	},
	emits: ["add", "edit"],
	setup(t, { emit: l }) {
		let u = t, d = l, p = de(), m = v(kt(/* @__PURE__ */ new Date(), u.weekStart)), h = v([]), _ = v(!1), C = n(() => At(m.value)), w = n(() => {
			let e = C.value[0], t = C.value[C.value.length - 1];
			return `${Nt(e).day} - ${Nt(t).day}`;
		}), D = n(() => C.value.map((e) => {
			let t = Mt(e), n = h.value.filter((e) => Tt(e.started_at) === t), r = Nt(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: Pt(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !_.value && h.value.length === 0);
		T(() => u.weekStart, (e) => {
			m.value = kt(m.value, e);
		}), T([
			m,
			() => u.userId,
			() => u.reloadToken
		], () => void j(), { immediate: !0 });
		function A(e) {
			return e.reduce((e, t) => e + (t.duration_minutes ?? 0), 0);
		}
		async function j() {
			if (u.userId === null) {
				h.value = [];
				return;
			}
			_.value = !0;
			try {
				let e = await Ge(u.client, {
					user_id: u.userId,
					from: Mt(C.value[0]),
					to: Mt(C.value[C.value.length - 1])
				});
				h.value = e, mt(u.client, e.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", U(e, p("tasks_projects.time.load_failed")));
			} finally {
				_.value = !1;
			}
		}
		function M(e) {
			m.value = jt(m.value, e * 7);
		}
		function N() {
			m.value = kt(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = b("BaseIcon"), m = b("BaseButton"), h = b("BaseSpinner");
			return g(), a("section", null, [
				o("header", Bn, [o("div", Vn, [
					c(m, {
						variant: "white",
						size: "sm",
						title: S(p)("tasks_projects.time.previous_week"),
						onClick: l[0] ||= (e) => M(-1)
					}, {
						default: E(() => [c(u, {
							name: "ChevronLeftIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title"]),
					c(m, {
						variant: "white",
						size: "sm",
						onClick: N
					}, {
						default: E(() => [s(x(S(p)("tasks_projects.time.this_week")), 1)]),
						_: 1
					}),
					c(m, {
						variant: "white",
						size: "sm",
						title: S(p)("tasks_projects.time.next_week"),
						onClick: l[1] ||= (e) => M(1)
					}, {
						default: E(() => [c(u, {
							name: "ChevronRightIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title"]),
					o("span", Hn, x(w.value), 1)
				]), o("div", Un, [
					o("span", Wn, x(S(p)("tasks_projects.time.week_total")), 1),
					o("span", Gn, x(S(Ct)(O.value)), 1),
					_.value ? (g(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (g(), a("p", Kn, x(S(p)("tasks_projects.time.unknown_user")), 1)) : (g(), a("div", qn, [(g(!0), a(e, null, y(D.value, (t) => (g(), a("article", {
					key: t.key,
					class: f(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", Jn, [o("div", null, [o("p", Yn, x(t.weekday), 1), o("p", Xn, x(t.day), 1)]), o("span", Zn, x(S(Ct)(t.minutes)), 1)]),
					o("ul", Qn, [(g(!0), a(e, null, y(t.entries, (e) => (g(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", er, [o("span", tr, x(S(ft)(e.task_id)), 1), o("span", nr, x(S(Ct)(e.duration_minutes)), 1)]),
						e.description ? (g(), a("span", rr, x(e.description), 1)) : i("", !0),
						o("span", ir, [
							o("span", { class: f(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", ar, x(e.billable ? S(p)("tasks_projects.time.billable") : S(p)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (g(), a("span", or, " - " + x(S(p)("tasks_projects.time.billed")), 1))
						])
					], 8, $n)]))), 128)), t.entries.length === 0 ? (g(), a("li", sr, x(S(p)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + x(S(p)("tasks_projects.time.add_entry")), 1)], 8, cr)
				], 2))), 128))])),
				k.value && t.userId !== null ? (g(), a("p", lr, x(S(p)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), dr = {
	default_rate: 0,
	rounding_minutes: 1,
	week_start: 1,
	members_see_all_time: !1,
	rounding_increments: [
		1,
		6,
		15,
		30
	]
}, fr = _({
	adminMode: !1,
	userId: null,
	settings: { ...dr },
	companySession: 0,
	loading: !1
});
async function pr(e) {
	if (fr.adminMode) return;
	fr.loading = !0;
	let [t, n] = await Promise.all([ct(e).catch(() => null), st(e).catch(() => null)]);
	fr.userId = t, fr.settings = gr(n), fr.loading = !1;
}
function mr() {
	fr.userId = null, fr.settings = { ...dr }, fr.companySession += 1, fr.loading = !1;
}
function hr(e) {
	fr.adminMode = e;
}
function gr(e) {
	if (typeof e != "object" || !e) return { ...dr };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : dr.rounding_increments;
	return {
		default_rate: _r(e.default_rate, dr.default_rate),
		rounding_minutes: _r(e.rounding_minutes, dr.rounding_minutes),
		week_start: vr(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		rounding_increments: t.length > 0 ? t : dr.rounding_increments
	};
}
function _r(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function vr(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : dr.week_start;
}
//#endregion
//#region resources/js/pages/TimePage.vue?vue&type=script&setup=true&lang.ts
var yr = { class: "flex items-center justify-end space-x-5" }, br = {
	key: 0,
	class: "max-sm:hidden flex items-center gap-2 text-sm text-muted"
}, xr = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, Sr = 5, Cr = /* @__PURE__ */ l({
	__name: "TimePage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = de(), u = v("MINE"), d = v(!1), p = v([]), m = v([]), _ = v(!1), y = v(null), C = v(Mt(/* @__PURE__ */ new Date())), w = v(0), T = n(() => fr.settings.week_start), D = n(() => fr.userId);
		h(() => void O());
		async function O() {
			fr.userId === null && await pr(t.client), d.value = fr.settings.members_see_all_time || await k(), d.value && await Promise.all([A(), j()]);
		}
		async function k() {
			try {
				return ((await We(t.client, { limit: Sr })).data ?? []).some((e) => e.user_id !== fr.userId);
			} catch {
				return !1;
			}
		}
		async function A() {
			try {
				p.value = await ot(t.client);
			} catch {
				p.value = [];
			}
		}
		async function j() {
			try {
				let e = await F(t.client, {
					limit: 100,
					sort_by: "name"
				});
				m.value = e.data ?? [];
			} catch {
				m.value = [];
			}
		}
		function M(e) {
			y.value = null, C.value = e ?? Mt(/* @__PURE__ */ new Date()), _.value = !0;
		}
		function N(e) {
			y.value = e, _.value = !0;
		}
		function P() {
			let e = y.value ? l("tasks_projects.time.updated") : l("tasks_projects.time.created");
			_.value = !1, y.value = null, t.notify("success", e), w.value += 1;
		}
		function I() {
			_.value = !1, y.value = null, t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
		}
		async function L(e) {
			if (window.confirm(l("tasks_projects.time.delete_confirm"))) try {
				await Je(t.client, e.id), t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
			} catch (e) {
				t.notify("error", U(e, l("tasks_projects.time.delete_failed")));
			}
		}
		function R(e) {
			return u.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), O = b("BaseIcon"), k = b("BaseButton"), A = b("router-link"), j = b("BasePageHeader"), F = b("BasePage");
			return g(), r(F, null, {
				default: E(() => [
					c(j, { title: S(l)("tasks_projects.time.title") }, {
						actions: E(() => [o("div", yr, [
							S(G).running === null ? i("", !0) : (g(), a("span", br, [c(O, {
								name: "ClockIcon",
								class: "h-4 w-4 text-primary-500"
							}), s(" " + x(S(l)("tasks_projects.timer.running")), 1)])),
							c(A, { to: "/admin/modules/tasks-projects/billing" }, {
								default: E(() => [c(k, { variant: "white" }, {
									left: E((e) => [c(O, {
										name: "BanknotesIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(l)("tasks_projects.billing.invoice_time")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							c(k, {
								variant: "primary",
								onClick: n[0] ||= (e) => M()
							}, {
								left: E((e) => [c(O, {
									name: "PlusIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(l)("tasks_projects.time.add_entry")), 1)]),
								_: 1
							})
						])]),
						default: E(() => [c(v, null, {
							default: E(() => [
								c(h, {
									title: S(l)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(h, {
									title: S(l)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								c(h, {
									title: S(l)("tasks_projects.time.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					d.value ? (g(), a("nav", xr, [o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("MINE")]),
						onClick: n[1] ||= (e) => u.value = "MINE"
					}, x(S(l)("tasks_projects.time.my_time")), 3), o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("ALL")]),
						onClick: n[2] ||= (e) => u.value = "ALL"
					}, x(S(l)("tasks_projects.time.all_time")), 3)])) : i("", !0),
					u.value === "MINE" ? (g(), r(ur, {
						key: 1,
						client: e.client,
						notify: e.notify,
						"user-id": D.value,
						"week-start": T.value,
						"reload-token": w.value,
						onAdd: M,
						onEdit: N
					}, null, 8, [
						"client",
						"notify",
						"user-id",
						"week-start",
						"reload-token"
					])) : (g(), r(On, {
						key: 2,
						client: e.client,
						notify: e.notify,
						members: p.value,
						projects: m.value,
						"reload-token": w.value,
						onEdit: N,
						onDelete: L
					}, null, 8, [
						"client",
						"notify",
						"members",
						"projects",
						"reload-token"
					])),
					c(zn, {
						show: _.value,
						client: e.client,
						notify: e.notify,
						entry: y.value,
						"default-date": C.value,
						onClose: n[3] ||= (e) => _.value = !1,
						onSaved: P,
						onDeleted: I
					}, null, 8, [
						"show",
						"client",
						"notify",
						"entry",
						"default-date"
					])
				]),
				_: 1
			});
		};
	}
}), wr = {
	key: 0,
	class: "text-sm text-muted"
}, Tr = { key: 1 }, Er = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, Dr = {
	key: 1,
	class: "text-sm text-muted"
}, Or = {
	key: 2,
	class: "divide-y divide-line-light"
}, kr = {
	key: 0,
	class: "space-y-3"
}, Ar = { class: "flex flex-wrap items-center gap-2" }, jr = ["aria-label", "onClick"], Mr = { class: "flex flex-wrap items-center gap-6" }, Nr = { class: "flex items-center gap-2 text-sm text-body" }, Pr = { class: "flex items-center gap-2 text-sm text-body" }, Fr = { class: "flex gap-3" }, Ir = {
	key: 1,
	class: "flex items-center gap-3"
}, Lr = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, Rr = { class: "flex items-center gap-1" }, zr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Br = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Vr = [
	"title",
	"aria-label",
	"onClick"
], Hr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Ur = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Wr = { class: "flex flex-wrap items-center gap-2" }, Gr = ["aria-label", "onClick"], Kr = { class: "flex flex-wrap items-center gap-6" }, qr = { class: "flex items-center gap-2 text-sm text-body" }, Jr = { class: "flex items-center gap-2 text-sm text-body" }, Yr = { class: "flex gap-3" }, Xr = /* @__PURE__ */ l({
	__name: "TaskStatusEditor",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(t) {
		let l = t, u = [
			"#94a3b8",
			"#3b82f6",
			"#22c55e",
			"#f59e0b",
			"#ef4444",
			"#a855f7",
			"#0891b2",
			"#64748b"
		], d = de(), m = v([]), C = v(!0), w = v(!1), T = v(!1), D = v(null), O = v(!1), k = _({
			name: "",
			colour: "",
			is_default: !1,
			is_closed: !1
		}), A = n(() => !C.value && m.value.length === 0);
		h(() => void j());
		async function j() {
			C.value = !0;
			try {
				m.value = await $e(l.client), w.value = !1;
			} catch (e) {
				m.value = [], w.value = vt(e), w.value || l.notify("error", U(e, d("tasks_projects.settings.load_failed")));
			} finally {
				C.value = !1;
			}
		}
		function M(e) {
			O.value = !1, D.value = e.id, k.name = e.name, k.colour = e.colour ?? "", k.is_default = e.is_default, k.is_closed = e.is_closed;
		}
		function N() {
			D.value = null, O.value = !0, k.name = "", k.colour = u[0], k.is_default = !1, k.is_closed = !1;
		}
		function P() {
			D.value = null, O.value = !1;
		}
		function F() {
			return {
				name: k.name.trim(),
				colour: k.colour || null,
				is_default: k.is_default,
				is_closed: k.is_closed
			};
		}
		async function I() {
			if (T.value) return;
			if (k.name.trim() === "") {
				l.notify("error", d("tasks_projects.settings.status_name_required"));
				return;
			}
			let e = D.value, t = k.name.trim();
			T.value = !0;
			try {
				e === null ? (await et(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await tt(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
			} catch (e) {
				l.notify("error", U(e, d("tasks_projects.settings.save_failed")));
			} finally {
				T.value = !1;
			}
		}
		async function L(e) {
			if (!T.value && window.confirm(d("tasks_projects.settings.status_delete_confirm", { name: e.name }))) {
				T.value = !0;
				try {
					await nt(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
				} catch (e) {
					l.notify("error", U(e, d("tasks_projects.settings.delete_failed")));
				} finally {
					T.value = !1;
				}
			}
		}
		async function R(e, t) {
			let n = e + t;
			if (T.value || n < 0 || n >= m.value.length) return;
			let r = [...m.value];
			r.splice(n, 0, ...r.splice(e, 1)), m.value = r, T.value = !0;
			try {
				m.value = await rt(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", U(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = b("BaseSpinner"), h = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSwitch"), j = b("BaseButton"), F = b("BaseBadge"), z = b("BaseIcon");
			return g(), a("div", null, [w.value ? (g(), a("p", wr, x(S(d)("tasks_projects.settings.forbidden")), 1)) : (g(), a("div", Tr, [C.value ? (g(), a("div", Er, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (g(), a("p", Dr, x(S(d)("tasks_projects.settings.no_statuses")), 1)) : (g(), a("ul", Or, [(g(!0), a(e, null, y(m.value, (t, l) => (g(), a("li", {
				key: t.id,
				class: "py-3"
			}, [D.value === t.id ? (g(), a("div", kr, [
				c(_, {
					label: S(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: E(() => [c(h, {
						modelValue: k.name,
						"onUpdate:modelValue": n[0] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(_, { label: S(d)("tasks_projects.settings.colour") }, {
					default: E(() => [o("div", Ar, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, jr)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, x(S(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", Mr, [o("label", Nr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Pr, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Fr, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : (g(), a("div", Ir, [
				o("span", {
					class: f(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: p(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", Lr, x(t.name), 1),
				t.is_default ? (g(), r(F, {
					key: 0,
					class: "rounded-full bg-primary-50! text-primary-500!"
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.settings.is_default")), 1)]),
					_: 1
				})) : i("", !0),
				t.is_closed ? (g(), r(F, {
					key: 1,
					class: "rounded-full bg-surface-tertiary! text-muted!"
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.settings.is_closed")), 1)]),
					_: 1
				})) : i("", !0),
				o("div", Rr, [
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === 0,
						title: S(d)("tasks_projects.settings.move_up"),
						"aria-label": S(d)("tasks_projects.settings.move_up"),
						onClick: (e) => R(l, -1)
					}, [c(z, {
						name: "ChevronUpIcon",
						class: "h-4 w-4"
					})], 8, zr),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === m.value.length - 1,
						title: S(d)("tasks_projects.settings.move_down"),
						"aria-label": S(d)("tasks_projects.settings.move_down"),
						onClick: (e) => R(l, 1)
					}, [c(z, {
						name: "ChevronDownIcon",
						class: "h-4 w-4"
					})], 8, Br),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: S(d)("tasks_projects.general.edit"),
						"aria-label": S(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, Vr),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-alert-error-text",
						disabled: T.value,
						title: S(d)("tasks_projects.general.delete"),
						"aria-label": S(d)("tasks_projects.general.delete"),
						onClick: (e) => L(t)
					}, [c(z, {
						name: "TrashIcon",
						class: "h-4 w-4"
					})], 8, Hr)
				])
			]))]))), 128))])), O.value ? (g(), a("div", Ur, [
				c(_, {
					label: S(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: E(() => [c(h, {
						modelValue: k.name,
						"onUpdate:modelValue": n[4] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(_, { label: S(d)("tasks_projects.settings.colour") }, {
					default: E(() => [o("div", Wr, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Gr)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Kr, [o("label", qr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Jr, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Yr, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : C.value ? i("", !0) : (g(), r(j, {
				key: 4,
				variant: "primary-outline",
				size: "sm",
				class: "mt-4",
				onClick: N
			}, {
				left: E((e) => [c(z, {
					name: "PlusIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(d)("tasks_projects.settings.add_status")), 1)]),
				_: 1
			}))]))]);
		};
	}
}), Zr = { class: "space-y-6" }, Qr = "/admin/settings/modules", $r = /* @__PURE__ */ l({
	__name: "TimeSettingsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = de();
		return (n, r) => {
			let i = b("BaseIcon"), o = b("BaseButton"), l = b("router-link"), u = b("BaseSettingCard");
			return g(), a("div", Zr, [c(u, {
				title: S(t)("tasks_projects.settings.general_title"),
				description: S(t)("tasks_projects.settings.general_description")
			}, {
				action: E(() => [c(l, { to: Qr }, {
					default: E(() => [c(o, {
						variant: "primary-outline",
						size: "sm"
					}, {
						right: E((e) => [c(i, {
							name: "ArrowTopRightOnSquareIcon",
							class: f(e.class)
						}, null, 8, ["class"])]),
						default: E(() => [s(" " + x(S(t)("tasks_projects.settings.open_module_settings")), 1)]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"]), c(u, {
				title: S(t)("tasks_projects.settings.statuses_title"),
				description: S(t)("tasks_projects.settings.statuses_description")
			}, {
				default: E(() => [c(Xr, {
					client: e.client,
					notify: e.notify
				}, null, 8, ["client", "notify"])]),
				_: 1
			}, 8, ["title", "description"])]);
		};
	}
}), ei = "tasks-projects", ti = `/admin/modules/${ei}/time`;
function ni(e) {
	e.addMessages(Cn);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		e.router.push(ti);
	};
	e.registerPage({
		id: "time",
		module: ei,
		path: "time",
		component: ai(e, Cr),
		meta: {
			ability: `${ei}:view-own-time`,
			title: "tasks_projects.time.title"
		}
	}), e.registerHeaderAction({
		id: `${ei}.timer-chip`,
		priority: 30,
		visible: () => G.running !== null,
		component: l({ setup: () => () => d(Sn, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${ei}.quick-start`,
		component: l({ setup: () => () => d(gn, {
			key: fr.companySession,
			client: e.client,
			notify: t,
			enabled: !fr.adminMode,
			onOpenTimesheet: n
		}) })
	}), e.registerCompanySettingsPage({
		id: `${ei}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: ei,
		priority: 70,
		component: ai(e, $r)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		ri(e, t);
	}), e.on("company:changing", () => {
		ii();
	}), e.on("company:changed", ({ companyId: t }) => {
		ri(e, t === null);
	});
}
async function ri(e, t) {
	if (hr(t), t) {
		ii();
		return;
	}
	await pr(e.client), await G.refresh(e.client);
}
function ii() {
	G.reset(), ht(), mr();
}
function ai(e, t) {
	return l({ setup: (n, { attrs: r }) => () => d(t, {
		...r,
		client: e.client,
		notify: (t, n) => {
			e.notify(t, n);
		},
		router: e.router
	}) });
}
//#endregion
//#region resources/js/messages/board.ts
var oi = { en: { tasks_projects: {
	board: {
		title: "Board",
		load_failed: "Unable to load the board.",
		move_failed: "Unable to move the task.",
		moved: "{name} moved to {status}.",
		empty_column: "Nothing here yet",
		filters: {
			project: "Project",
			all_projects: "All projects",
			assignee: "Assignee",
			all_assignees: "Everyone"
		}
	},
	tasks: {
		title: "Tasks",
		all_tasks: "All tasks",
		new_task: "New task",
		edit_task: "Edit task",
		search_placeholder: "Search by name or number",
		empty_title: "No tasks yet",
		empty_description: "Add a task to put work on the board.",
		unassigned: "Unassigned",
		billable: "Billable",
		overdue: "Overdue",
		none: "None",
		columns: {
			number: "No.",
			name: "Name",
			project: "Project",
			status: "Status",
			assignee: "Assignee",
			priority: "Priority",
			due_date: "Due date"
		},
		fields: {
			name: "Name",
			description: "Description",
			project: "Project",
			project_placeholder: "No project",
			project_help: "Leave empty for a task that stands on its own.",
			customer: "Customer",
			customer_help: "Taken from the project.",
			status: "Status",
			assignee: "Assignee",
			assignee_placeholder: "Nobody yet",
			priority: "Priority",
			priority_placeholder: "No priority",
			due_date: "Due date",
			estimate_hours: "Estimate (hours)",
			billable: "Billable",
			rate: "Rate override",
			rate_help: "Per hour. Leave empty to use the project or member rate."
		},
		priority: {
			low: "Low",
			normal: "Normal",
			high: "High",
			urgent: "Urgent"
		},
		created: "{name} was created.",
		updated: "{name} was updated.",
		deleted: "{name} was deleted.",
		delete_confirm: "Delete {name}? Its time entries go with it.",
		name_required: "Enter a task name.",
		load_failed: "Unable to load the tasks.",
		save_failed: "Unable to save the task.",
		delete_failed: "Unable to delete the task.",
		projects_failed: "Unable to load the projects.",
		members_failed: "Unable to load the members."
	},
	task_statuses: {
		load_failed: "Unable to load the task statuses.",
		none: "No board columns yet."
	},
	project: {
		load_failed: "Unable to load the project.",
		customer: "Customer",
		identifier: "Identifier",
		due_date: "Due date",
		board: "Board",
		tabs: {
			overview: "Overview",
			tasks: "Tasks",
			time: "Time",
			members: "Members"
		},
		overview: {
			tasks: "Tasks",
			open_tasks: "{count} open",
			closed_tasks: "{count} done",
			logged: "Logged",
			billable: "Billable",
			billable_amount: "Billable value",
			unbilled_amount: "Unbilled",
			budget: "Budget",
			budget_used: "{used} of {total}",
			budget_over: "Over budget by {amount}",
			no_budget: "No budget set.",
			description: "Description",
			no_description: "No description yet."
		},
		time: {
			columns: {
				date: "Date",
				member: "Member",
				task: "Task",
				minutes: "Duration",
				billable: "Billable",
				amount: "Amount"
			},
			running: "Running",
			removed_member: "Removed member",
			load_failed: "Unable to load the time entries."
		},
		members: {
			title: "Members",
			member: "Member",
			rate: "Rate / hour",
			rate_help: "Per hour on this project. Leave empty to use the project default.",
			attach: "Add member",
			attach_placeholder: "Choose a member",
			attached: "{name} was added to the project.",
			detached: "{name} was removed from the project.",
			detach_confirm: "Remove {name} from this project? Their time entries stay.",
			empty: "Nobody is on this project yet.",
			all_attached: "Every company member is already on this project.",
			load_failed: "Unable to load the project members.",
			attach_failed: "Unable to add the member.",
			detach_failed: "Unable to remove the member."
		}
	}
} } };
//#endregion
//#region node_modules/.pnpm/sortablejs@1.15.7/node_modules/sortablejs/modular/sortable.esm.js
function si(e, t, n) {
	return (t = mi(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ci() {
	return ci = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ci.apply(null, arguments);
}
function li(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ui(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? li(Object(n), !0).forEach(function(t) {
			si(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : li(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function di(e, t) {
	if (e == null) return {};
	var n, r, i = fi(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function fi(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function pi(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function mi(e) {
	var t = pi(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function hi(e) {
	"@babel/helpers - typeof";
	return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, hi(e);
}
var gi = "1.15.7";
function _i(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var vi = _i(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), yi = _i(/Edge/i), bi = _i(/firefox/i), xi = _i(/safari/i) && !_i(/chrome/i) && !_i(/android/i), Si = _i(/iP(ad|od|hone)/i), Ci = _i(/chrome/i) && _i(/android/i), wi = {
	capture: !1,
	passive: !1
};
function K(e, t, n) {
	e.addEventListener(t, n, !vi && wi);
}
function q(e, t, n) {
	e.removeEventListener(t, n, !vi && wi);
}
function Ti(e, t) {
	if (t) {
		if (t[0] === ">" && (t = t.substring(1)), e) try {
			if (e.matches) return e.matches(t);
			if (e.msMatchesSelector) return e.msMatchesSelector(t);
			if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
		} catch {
			return !1;
		}
		return !1;
	}
}
function Ei(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function Di(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Ti(e, t) : Ti(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = Ei(e));
	}
	return null;
}
var Oi = /\s+/g;
function ki(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(Oi, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(Oi, " "));
}
function J(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Ai(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = J(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function ji(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Mi() {
	return document.scrollingElement || document.documentElement;
}
function Ni(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Mi() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !vi)) do
			if (i && i.getBoundingClientRect && (J(i, "transform") !== "none" || n && J(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(J(i, "border-top-width")), s -= f.left + parseInt(J(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Ai(i || e), m = p && p.a, h = p && p.d;
			p && (o /= h, s /= m, d /= m, u /= h, c = o + u, l = s + d);
		}
		return {
			top: o,
			left: s,
			bottom: c,
			right: l,
			width: d,
			height: u
		};
	}
}
function Pi(e, t, n) {
	for (var r = Bi(e, !0), i = Ni(e)[t]; r;) {
		var a = Ni(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === Mi()) break;
		r = Bi(r, !1);
	}
	return !1;
}
function Fi(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && Di(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Ii(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || J(n, "display") === "none" || t && !Ti(n, t));) n = n.previousElementSibling;
	return n || null;
}
function Li(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || Ti(e, t)) && n++;
	return n;
}
function Ri(e) {
	var t = 0, n = 0, r = Mi();
	if (e) do {
		var i = Ai(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function zi(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Bi(e, t) {
	if (!e || !e.getBoundingClientRect) return Mi();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = J(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Mi();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Mi();
}
function Vi(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Hi(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Ui;
function Wi(e, t) {
	return function() {
		if (!Ui) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Ui = setTimeout(function() {
				Ui = void 0;
			}, t);
		}
	};
}
function Gi() {
	clearTimeout(Ui), Ui = void 0;
}
function Ki(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function qi(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Ji(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (Di(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = Ni(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var Yi = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Xi() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (J(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: Ni(t)
					});
					var n = ui({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Ai(t, !0);
						r && (n.top -= r.f, n.left -= r.e);
					}
					t.fromRect = n;
				}
			});
		},
		addAnimationState: function(t) {
			e.push(t);
		},
		removeAnimationState: function(t) {
			e.splice(zi(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = Ni(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Ai(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Hi(c, s) && !Hi(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = Qi(u, c, l, r.options)), Hi(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				J(e, "transition", ""), J(e, "transform", "");
				var i = Ai(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, J(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = Zi(e), J(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), J(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					J(e, "transition", ""), J(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function Zi(e) {
	return e.offsetWidth;
}
function Qi(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var $i = [], ea = { initializeByDefault: !0 }, ta = {
	mount: function(e) {
		for (var t in ea) ea.hasOwnProperty(t) && !(t in e) && (e[t] = ea[t]);
		$i.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), $i.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		$i.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](ui({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](ui({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in $i.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, ci(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return $i.forEach(function(r) {
			typeof r.eventProperties == "function" && ci(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return $i.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function na(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[Yi], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !vi && !yi ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = ui(ui({}, m), ta.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var ra = ["evt"], ia = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = di(n, ra);
	ta.pluginEvent.bind($)(e, t, ui({
		dragEl: Y,
		parentEl: oa,
		ghostEl: X,
		rootEl: Z,
		nextEl: sa,
		lastDownEl: ca,
		cloneEl: Q,
		cloneHidden: la,
		dragStarted: Ta,
		putSortable: ha,
		activeSortable: $.active,
		originalEvent: r,
		oldIndex: ua,
		oldDraggableIndex: fa,
		newIndex: da,
		newDraggableIndex: pa,
		hideGhostForTarget: Wa,
		unhideGhostForTarget: Ga,
		cloneNowHidden: function() {
			la = !0;
		},
		cloneNowShown: function() {
			la = !1;
		},
		dispatchSortableEvent: function(e) {
			aa({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function aa(e) {
	na(ui({
		putSortable: ha,
		cloneEl: Q,
		targetEl: Y,
		rootEl: Z,
		oldIndex: ua,
		oldDraggableIndex: fa,
		newIndex: da,
		newDraggableIndex: pa
	}, e));
}
var Y, oa, X, Z, sa, ca, Q, la, ua, da, fa, pa, ma, ha, ga = !1, _a = !1, va = [], ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa = !1, ka = !1, Aa, ja, Ma = [], Na = !1, Pa = [], Fa = typeof document < "u", Ia = Si, La = yi || vi ? "cssFloat" : "float", Ra = Fa && !Ci && !Si && "draggable" in document.createElement("div"), za = function() {
	if (Fa) {
		if (vi) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), Ba = function(e, t) {
	var n = J(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Fi(e, 0, t), a = Fi(e, 1, t), o = i && J(i), s = a && J(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + Ni(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ni(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[La] === "none" || a && n[La] === "none" && c + l > r) ? "vertical" : "horizontal";
}, Va = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, Ha = function(e, t) {
	var n;
	return va.some(function(r) {
		var i = r[Yi].options.emptyInsertThreshold;
		if (i && !Ii(r)) {
			var a = Ni(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, Ua = function(e) {
	function t(e, n) {
		return function(r, i, a, o) {
			var s = r.options.group.name && i.options.group.name && r.options.group.name === i.options.group.name;
			if (e == null && (n || s)) return !0;
			if (e == null || e === !1) return !1;
			if (n && e === "clone") return e;
			if (typeof e == "function") return t(e(r, i, a, o), n)(r, i, a, o);
			var c = (n ? r : i).options.group.name;
			return e === !0 || typeof e == "string" && e === c || e.join && e.indexOf(c) > -1;
		};
	}
	var n = {}, r = e.group;
	(!r || hi(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Wa = function() {
	!za && X && J(X, "display", "none");
}, Ga = function() {
	!za && X && J(X, "display", "");
};
Fa && !Ci && document.addEventListener("click", function(e) {
	if (_a) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), _a = !1, !1;
}, !0);
var Ka = function(e) {
	if (Y) {
		e = e.touches ? e.touches[0] : e;
		var t = Ha(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[Yi]._onDragOver(n);
		}
	}
}, qa = function(e) {
	Y && Y.parentNode[Yi]._isOutsideThisEl(e.target);
};
function $(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = ci({}, t), e[Yi] = this;
	var n = {
		group: null,
		sort: !0,
		disabled: !1,
		store: null,
		handle: null,
		draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
		swapThreshold: 1,
		invertSwap: !1,
		invertedSwapThreshold: null,
		removeCloneOnHide: !0,
		direction: function() {
			return Ba(e, this.options);
		},
		ghostClass: "sortable-ghost",
		chosenClass: "sortable-chosen",
		dragClass: "sortable-drag",
		ignore: "a, img",
		filter: null,
		preventOnFilter: !0,
		animation: 0,
		easing: null,
		setData: function(e, t) {
			e.setData("Text", t.textContent);
		},
		dropBubble: !1,
		dragoverBubble: !1,
		dataIdAttr: "data-id",
		delay: 0,
		delayOnTouchOnly: !1,
		touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
		forceFallback: !1,
		fallbackClass: "sortable-fallback",
		fallbackOnBody: !1,
		fallbackTolerance: 0,
		fallbackOffset: {
			x: 0,
			y: 0
		},
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!xi || Si),
		emptyInsertThreshold: 5
	};
	for (var r in ta.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in Ua(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Ra, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? K(e, "pointerdown", this._onTapStart) : (K(e, "mousedown", this._onTapStart), K(e, "touchstart", this._onTapStart)), this.nativeDraggable && (K(e, "dragover", this), K(e, "dragenter", this)), va.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ci(this, Xi());
}
$.prototype = {
	constructor: $,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Ea = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, Y) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (ro(n), !Y && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && xi && s && s.tagName.toUpperCase() === "SELECT") && (s = Di(s, r.draggable, n, !1), !(s && s.animated) && ca !== s)) {
				if (ua = Li(s), fa = Li(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						aa({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), ia("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Di(c, r.trim(), n, !1), r) return aa({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), ia("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || Di(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !Y && n.parentNode === i) {
			var c = Ni(n);
			if (Z = i, Y = n, oa = Y.parentNode, sa = Y.nextSibling, ca = n, ma = a.group, $.dragged = Y, ya = {
				target: Y,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Ca = ya.clientX - c.left, wa = ya.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, Y.style["will-change"] = "all", s = function() {
				if (ia("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !bi && r.nativeDraggable && (Y.draggable = !0), r._triggerDragStart(e, t), aa({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), ki(Y, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				ji(Y, e.trim(), Xa);
			}), K(o, "dragover", Ka), K(o, "mousemove", Ka), K(o, "touchmove", Ka), a.supportPointer ? (K(o, "pointerup", r._onDrop), !this.nativeDraggable && K(o, "pointercancel", r._onDrop)) : (K(o, "mouseup", r._onDrop), K(o, "touchend", r._onDrop), K(o, "touchcancel", r._onDrop)), bi && this.nativeDraggable && (this.options.touchStartThreshold = 4, Y.draggable = !0), ia("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(yi || vi))) {
				if ($.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (K(o, "pointerup", r._disableDelayedDrag), K(o, "pointercancel", r._disableDelayedDrag)) : (K(o, "mouseup", r._disableDelayedDrag), K(o, "touchend", r._disableDelayedDrag), K(o, "touchcancel", r._disableDelayedDrag)), K(o, "mousemove", r._delayedDragTouchMoveHandler), K(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && K(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		Y && Xa(Y), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		q(e, "mouseup", this._disableDelayedDrag), q(e, "touchend", this._disableDelayedDrag), q(e, "touchcancel", this._disableDelayedDrag), q(e, "pointerup", this._disableDelayedDrag), q(e, "pointercancel", this._disableDelayedDrag), q(e, "mousemove", this._delayedDragTouchMoveHandler), q(e, "touchmove", this._delayedDragTouchMoveHandler), q(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? K(document, "pointermove", this._onTouchMove) : t ? K(document, "touchmove", this._onTouchMove) : K(document, "mousemove", this._onTouchMove) : (K(Y, "dragend", this), K(Z, "dragstart", this._onDragStart));
		try {
			document.selection ? io(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (ga = !1, Z && Y) {
			ia("dragStarted", this, { evt: t }), this.nativeDraggable && K(document, "dragover", qa);
			var n = this.options;
			!e && ki(Y, n.dragClass, !1), ki(Y, n.ghostClass, !0), $.active = this, e && this._appendGhost(), aa({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (ba) {
			this._lastX = ba.clientX, this._lastY = ba.clientY, Wa();
			for (var e = document.elementFromPoint(ba.clientX, ba.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(ba.clientX, ba.clientY), e !== t);) t = e;
			if (Y.parentNode[Yi]._isOutsideThisEl(e), t) do {
				if (t[Yi]) {
					var n = void 0;
					if (n = t[Yi]._onDragOver({
						clientX: ba.clientX,
						clientY: ba.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = Ei(t));
			Ga();
		}
	},
	_onTouchMove: function(e) {
		if (ya) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = X && Ai(X, !0), o = X && a && a.a, s = X && a && a.d, c = Ia && ja && Ri(ja), l = (i.clientX - ya.clientX + r.x) / (o || 1) + (c ? c[0] - Ma[0] : 0) / (o || 1), u = (i.clientY - ya.clientY + r.y) / (s || 1) + (c ? c[1] - Ma[1] : 0) / (s || 1);
			if (!$.active && !ga) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (X) {
				a ? (a.e += l - (xa || 0), a.f += u - (Sa || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				J(X, "webkitTransform", d), J(X, "mozTransform", d), J(X, "msTransform", d), J(X, "transform", d), xa = l, Sa = u, ba = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!X) {
			var e = this.options.fallbackOnBody ? document.body : Z, t = Ni(Y, !0, Ia, !0, e), n = this.options;
			if (Ia) {
				for (ja = e; J(ja, "position") === "static" && J(ja, "transform") === "none" && ja !== document;) ja = ja.parentNode;
				ja !== document.body && ja !== document.documentElement ? (ja === document && (ja = Mi()), t.top += ja.scrollTop, t.left += ja.scrollLeft) : ja = Mi(), Ma = Ri(ja);
			}
			X = Y.cloneNode(!0), ki(X, n.ghostClass, !1), ki(X, n.fallbackClass, !0), ki(X, n.dragClass, !0), J(X, "transition", ""), J(X, "transform", ""), J(X, "box-sizing", "border-box"), J(X, "margin", 0), J(X, "top", t.top), J(X, "left", t.left), J(X, "width", t.width), J(X, "height", t.height), J(X, "opacity", "0.8"), J(X, "position", Ia ? "absolute" : "fixed"), J(X, "zIndex", "100000"), J(X, "pointerEvents", "none"), $.ghost = X, e.appendChild(X), J(X, "transform-origin", Ca / parseInt(X.style.width) * 100 + "% " + wa / parseInt(X.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (ia("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		ia("setupClone", this), $.eventCanceled || (Q = qi(Y), Q.removeAttribute("id"), Q.draggable = !1, Q.style["will-change"] = "", this._hideClone(), ki(Q, this.options.chosenClass, !1), $.clone = Q), n.cloneId = io(function() {
			ia("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || Z.insertBefore(Q, Y), n._hideClone(), aa({
				sortable: n,
				name: "clone"
			}));
		}), !t && ki(Y, i.dragClass, !0), t ? (_a = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (q(document, "mouseup", n._onDrop), q(document, "touchend", n._onDrop), q(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, Y)), K(document, "drop", n), J(Y, "transform", "translateZ(0)")), ga = !0, n._dragStartId = io(n._dragStarted.bind(n, t, e)), K(document, "selectstart", n), Ta = !0, window.getSelection().removeAllRanges(), xi && J(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = ma === s, u = o.sort, d = ha || c, f, p = this, m = !1;
		if (Na) return;
		function h(o, s) {
			ia(o, p, ui({
				evt: e,
				isOwner: l,
				axis: f ? "vertical" : "horizontal",
				revert: a,
				dragRect: r,
				targetRect: i,
				canSort: u,
				fromSortable: d,
				target: n,
				completed: _,
				onMove: function(n, i) {
					return Ya(Z, t, Y, r, n, Ni(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (ki(Y, ha ? ha.options.ghostClass : c.options.ghostClass, !1), ki(Y, o.ghostClass, !0)), ha !== p && p !== $.active ? ha = p : p === $.active && ha && (ha = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === Y && !Y.animated || n === t && !n.animated) && (Ea = null), !o.dragoverBubble && !e.rootEl && n !== document && (Y.parentNode[Yi]._isOutsideThisEl(e.target), !r && Ka(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			da = Li(Y), pa = Li(Y, o.draggable), aa({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: da,
				newDraggableIndex: pa,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Di(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (Y.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (_a = !1, c && !o.disabled && (l ? u || (a = oa !== Z) : ha === this || (this.lastPutMode = ma.checkPull(this, c, Y, e)) && s.checkPut(this, c, Y, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = Ni(Y), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return oa = Z, g(), this._hideClone(), h("revert"), $.eventCanceled || (sa ? Z.insertBefore(Y, sa) : Z.appendChild(Y)), _(!0);
			var y = Ii(t, o.draggable);
			if (!y || $a(e, f, this) && !y.animated) {
				if (y === Y) return _(!1);
				if (y && t === e.target && (n = y), n && (i = Ni(n)), Ya(Z, t, Y, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(Y, y.nextSibling) : t.appendChild(Y), oa = t, v(), _(!0);
			} else if (y && Qa(e, f, this)) {
				var b = Fi(t, 0, o, !0);
				if (b === Y) return _(!1);
				if (n = b, i = Ni(n), Ya(Z, t, Y, r, n, i, e, !1) !== !1) return g(), t.insertBefore(Y, b), oa = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = Ni(n);
				var x = 0, S, C = Y.parentNode !== t, w = !Va(Y.animated && Y.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Pi(n, "top", "top") || Pi(Y, "top", "top"), D = E ? E.scrollTop : void 0;
				Ea !== n && (S = i[T], Oa = !1, ka = !w && o.invertSwap || C), x = eo(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, ka, Ea === n);
				var O;
				if (x !== 0) {
					var k = Li(Y);
					do
						k -= x, O = oa.children[k];
					while (O && (J(O, "display") === "none" || O === X));
				}
				if (x === 0 || O === n) return _(!1);
				Ea = n, Da = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = Ya(Z, t, Y, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), Na = !0, setTimeout(Za, 30), g(), j && !A ? t.appendChild(Y) : n.parentNode.insertBefore(Y, j ? A : n), E && Ki(E, 0, D - E.scrollTop), oa = Y.parentNode, S !== void 0 && !ka && (Aa = Math.abs(S - Ni(n)[T])), v(), _(!0);
			}
			if (t.contains(Y)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		q(document, "mousemove", this._onTouchMove), q(document, "touchmove", this._onTouchMove), q(document, "pointermove", this._onTouchMove), q(document, "dragover", Ka), q(document, "mousemove", Ka), q(document, "touchmove", Ka);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		q(e, "mouseup", this._onDrop), q(e, "touchend", this._onDrop), q(e, "pointerup", this._onDrop), q(e, "pointercancel", this._onDrop), q(e, "touchcancel", this._onDrop), q(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (da = Li(Y), pa = Li(Y, n.draggable), ia("drop", this, { evt: e }), oa = Y && Y.parentNode, da = Li(Y), pa = Li(Y, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		ga = !1, ka = !1, Oa = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ao(this.cloneId), ao(this._dragStartId), this.nativeDraggable && (q(document, "drop", this), q(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), xi && J(document.body, "user-select", ""), J(Y, "transform", ""), e && (Ta && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), X && X.parentNode && X.parentNode.removeChild(X), (Z === oa || ha && ha.lastPutMode !== "clone") && Q && Q.parentNode && Q.parentNode.removeChild(Q), Y && (this.nativeDraggable && q(Y, "dragend", this), Xa(Y), Y.style["will-change"] = "", Ta && !ga && ki(Y, ha ? ha.options.ghostClass : this.options.ghostClass, !1), ki(Y, this.options.chosenClass, !1), aa({
			sortable: this,
			name: "unchoose",
			toEl: oa,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), Z === oa ? da !== ua && da >= 0 && (aa({
			sortable: this,
			name: "update",
			toEl: oa,
			originalEvent: e
		}), aa({
			sortable: this,
			name: "sort",
			toEl: oa,
			originalEvent: e
		})) : (da >= 0 && (aa({
			rootEl: oa,
			name: "add",
			toEl: oa,
			fromEl: Z,
			originalEvent: e
		}), aa({
			sortable: this,
			name: "remove",
			toEl: oa,
			originalEvent: e
		}), aa({
			rootEl: oa,
			name: "sort",
			toEl: oa,
			fromEl: Z,
			originalEvent: e
		}), aa({
			sortable: this,
			name: "sort",
			toEl: oa,
			originalEvent: e
		})), ha && ha.save()), $.active && ((da == null || da === -1) && (da = ua, pa = fa), aa({
			sortable: this,
			name: "end",
			toEl: oa,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		ia("nulling", this), Z = Y = oa = X = sa = Q = ca = la = ya = ba = Ta = da = pa = ua = fa = Ea = Da = ha = ma = $.dragged = $.ghost = $.clone = $.active = null;
		var e = this.el;
		Pa.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), Pa.length = xa = Sa = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				Y && (this._onDragOver(e), Ja(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Di(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || no(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Di(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Di(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = ta.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && Ua(n);
	},
	destroy: function() {
		ia("destroy", this);
		var e = this.el;
		e[Yi] = null, q(e, "mousedown", this._onTapStart), q(e, "touchstart", this._onTapStart), q(e, "pointerdown", this._onTapStart), this.nativeDraggable && (q(e, "dragover", this), q(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), va.splice(va.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!la) {
			if (ia("hideClone", this), $.eventCanceled) return;
			J(Q, "display", "none"), this.options.removeCloneOnHide && Q.parentNode && Q.parentNode.removeChild(Q), la = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (la) {
			if (ia("showClone", this), $.eventCanceled) return;
			Y.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(Q, Y) : sa ? Z.insertBefore(Q, sa) : Z.appendChild(Q), this.options.group.revertClone && this.animate(Y, Q), J(Q, "display", ""), la = !1;
		}
	}
};
function Ja(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Ya(e, t, n, r, i, a, o, s) {
	var c, l = e[Yi], u = l.options.onMove, d;
	return window.CustomEvent && !vi && !yi ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || Ni(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function Xa(e) {
	e.draggable = !1;
}
function Za() {
	Na = !1;
}
function Qa(e, t, n) {
	var r = Ni(Fi(n.el, 0, n.options, !0)), i = Ji(n.el, n.options, X), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function $a(e, t, n) {
	var r = Ni(Ii(n.el, n.options.draggable)), i = Ji(n.el, n.options, X), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function eo(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Aa < l * i) {
			if (!Oa && (Da === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Oa = !0), Oa) f = !0;
			else if (Da === 1 ? c < u + Aa : c > d - Aa) return -Da;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return to(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function to(e) {
	return Li(Y) < Li(e) ? 1 : -1;
}
function no(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function ro(e) {
	Pa.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Pa.push(r);
	}
}
function io(e) {
	return setTimeout(e, 0);
}
function ao(e) {
	return clearTimeout(e);
}
Fa && K(document, "touchmove", function(e) {
	($.active || ga) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: K,
	off: q,
	css: J,
	find: ji,
	is: function(e, t) {
		return !!Di(e, t, e, !1);
	},
	extend: Vi,
	throttle: Wi,
	closest: Di,
	toggleClass: ki,
	clone: qi,
	index: Li,
	nextTick: io,
	cancelNextTick: ao,
	detectDirection: Ba,
	getChild: Fi,
	expando: Yi
}, $.get = function(e) {
	return e[Yi];
}, $.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && ($.utils = ui(ui({}, $.utils), e.utils)), ta.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = gi;
var oo = [], so, co, lo = !1, uo, fo, po, mo;
function ho() {
	function e() {
		for (var e in this.defaults = {
			scroll: !0,
			forceAutoScrollFallback: !1,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: !0
		}, this) e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
	}
	return e.prototype = {
		dragStarted: function(e) {
			var t = e.originalEvent;
			this.sortable.nativeDraggable ? K(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? K(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? K(document, "touchmove", this._handleFallbackAutoScroll) : K(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : (q(document, "pointermove", this._handleFallbackAutoScroll), q(document, "touchmove", this._handleFallbackAutoScroll), q(document, "mousemove", this._handleFallbackAutoScroll)), _o(), go(), Gi();
		},
		nulling: function() {
			po = co = so = lo = mo = uo = fo = null, oo.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (po = e, t || this.options.forceAutoScrollFallback || yi || vi || xi) {
				vo(e, this.options, a, t);
				var o = Bi(a, !0);
				lo && (!mo || r !== uo || i !== fo) && (mo && _o(), mo = setInterval(function() {
					var a = Bi(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, go()), vo(e, n.options, a, t);
				}, 10), uo = r, fo = i);
			} else {
				if (!this.options.bubbleScroll || Bi(a, !0) === Mi()) {
					go();
					return;
				}
				vo(e, this.options, Bi(a, !1), !1);
			}
		}
	}, ci(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function go() {
	oo.forEach(function(e) {
		clearInterval(e.pid);
	}), oo = [];
}
function _o() {
	clearInterval(mo);
}
var vo = Wi(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Mi(), l = !1, u;
		co !== n && (co = n, go(), so = t.scroll, u = t.scrollFn, so === !0 && (so = Bi(n, !0)));
		var d = 0, f = so;
		do {
			var p = f, m = Ni(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = J(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!oo[d]) for (var A = 0; A <= d; A++) oo[A] || (oo[A] = {});
			(oo[d].vx != O || oo[d].vy != k || oo[d].el !== p) && (oo[d].el = p, oo[d].vx = O, oo[d].vy = k, clearInterval(oo[d].pid), (O != 0 || k != 0) && (l = !0, oo[d].pid = setInterval(function() {
				r && this.layer === 0 && $.active._onTouchMove(po);
				var t = oo[this.layer].vy ? oo[this.layer].vy * s : 0, n = oo[this.layer].vx ? oo[this.layer].vx * s : 0;
				(typeof u != "function" || u.call($.dragged.parentNode[Yi], n, t, e, po, oo[this.layer].el) === "continue") && Ki(oo[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Bi(f, !1)));
		lo = l;
	}
}, 30), yo = function(e) {
	var t = e.originalEvent, n = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, o = e.hideGhostForTarget, s = e.unhideGhostForTarget;
	if (t) {
		var c = n || i;
		o();
		var l = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, u = document.elementFromPoint(l.clientX, l.clientY);
		s(), c && !c.el.contains(u) && (a("spill"), this.onSpill({
			dragEl: r,
			putSortable: n
		}));
	}
};
function bo() {}
bo.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Fi(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: yo
}, ci(bo, { pluginName: "revertOnSpill" });
function xo() {}
xo.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: yo
}, ci(xo, { pluginName: "removeOnSpill" }), $.mount(new ho()), $.mount(xo, bo);
//#endregion
//#region resources/js/api/board.ts
var So = {
	board: `${j}/board`,
	tasks: `${j}/tasks`,
	task: (e) => `${j}/tasks/${e}`,
	moveTask: (e) => `${j}/tasks/${e}/move`,
	taskStatuses: `${j}/task-statuses`,
	timeEntries: `${j}/time-entries`,
	projectMembers: (e) => `${j}/projects/${e}/members`,
	projectMember: (e, t) => `${j}/projects/${e}/members/${t}`
};
async function Co(e, t) {
	let { data: n } = await e.get(So.board, { params: t });
	return n.data;
}
async function wo(e) {
	let { data: t } = await e.get(So.taskStatuses);
	return t.data;
}
async function To(e, t) {
	let { data: n } = await e.get(So.tasks, { params: t });
	return n;
}
async function Eo(e, t) {
	let { data: n } = await e.post(So.tasks, t);
	return n.data;
}
async function Do(e, t, n) {
	let { data: r } = await e.put(So.task(t), n);
	return r.data;
}
async function Oo(e, t) {
	await e.delete(So.task(t));
}
async function ko(e, t, n) {
	let { data: r } = await e.post(So.moveTask(t), n);
	return r.data;
}
async function Ao(e, t) {
	let { data: n } = await e.get(M.project(t));
	return n.data;
}
async function jo(e, t) {
	let { data: n } = await e.get(So.projectMembers(t));
	return n.data;
}
async function Mo(e, t, n) {
	let { data: r } = await e.post(So.projectMembers(t), n);
	return r.data;
}
async function No(e, t, n) {
	await e.delete(So.projectMember(t, n));
}
async function Po(e, t) {
	let { data: n } = await e.get(So.timeEntries, { params: t });
	return n;
}
//#endregion
//#region resources/js/types/task.ts
var Fo = [
	"LOW",
	"NORMAL",
	"HIGH",
	"URGENT"
], Io = { class: "flex w-full items-center justify-between" }, Lo = {
	key: 0,
	class: "ml-2 text-sm font-normal text-muted"
}, Ro = { class: "space-y-5 px-6 py-6" }, zo = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Bo = { key: 1 }, Vo = { class: "flex space-x-3" }, Ho = /* @__PURE__ */ l({
	__name: "TaskDrawer",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		task: {},
		statuses: {},
		members: {},
		projects: {},
		defaults: {},
		lockProject: { type: Boolean }
	},
	emits: [
		"close",
		"saved",
		"deleted"
	],
	setup(e, { emit: t }) {
		let l = e, u = t, d = de(), f = _({
			name: "",
			description: "",
			estimateHours: "",
			rate: "",
			dueDate: "",
			billable: !0
		}), p = v(null), m = v(null), h = v(null), y = v(null), C = v(null), w = v({}), D = v(!1), O = v(!1), A = n({
			get: () => I(l.projects, m.value),
			set: (e) => {
				m.value = e?.id ?? null;
			}
		}), j = n(() => l.task !== null), M = n(() => j.value ? d("tasks_projects.tasks.edit_task") : d("tasks_projects.tasks.new_task")), N = n(() => l.statuses.map((e) => ({
			id: e.id,
			label: e.name
		}))), P = n(() => l.members.map((e) => ({
			id: e.id,
			label: e.name
		}))), F = n(() => Fo.map((e, t) => ({
			id: t,
			label: d(`tasks_projects.tasks.priority.${e.toLowerCase()}`)
		})));
		T(() => l.show, (e) => {
			e && L();
		}, { immediate: !0 });
		function I(e, t) {
			return t === null ? null : e.find((e) => e.id === t) ?? null;
		}
		function L() {
			let e = l.task;
			f.name = e?.name ?? "", f.description = e?.description ?? "", f.estimateHours = ie(e?.estimated_minutes ?? null), f.rate = ne(e?.rate ?? null), f.dueDate = e?.due_date ?? "", f.billable = e?.billable ?? !0;
			let t = l.statuses.find((e) => e.is_default) ?? l.statuses[0], n = e?.task_status_id ?? l.defaults?.task_status_id ?? t?.id ?? null;
			p.value = I(N.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = I(P.value, e?.assignee_id ?? null), y.value = e?.priority ? F.value[Fo.indexOf(e.priority)] ?? null : null, C.value = e?.customer_id ?? null, w.value = {};
		}
		function R(e) {
			f.dueDate = e ? se(e) : "";
		}
		function z() {
			let e = p.value?.id ?? null;
			if (e === null) return null;
			let t = y.value === null ? null : Fo[y.value.id];
			return {
				name: f.name.trim(),
				task_status_id: e,
				project_id: m.value,
				customer_id: m.value === null ? C.value : null,
				description: f.description.trim() || null,
				assignee_id: h.value?.id ?? null,
				priority: t,
				due_date: f.dueDate || null,
				estimated_minutes: ae(f.estimateHours),
				billable: f.billable,
				rate: re(f.rate)
			};
		}
		async function B() {
			if (D.value) return;
			if (f.name.trim() === "") {
				w.value = { name: d("tasks_projects.tasks.name_required") };
				return;
			}
			let e = z();
			if (e === null) {
				l.notify("error", d("tasks_projects.task_statuses.none"));
				return;
			}
			D.value = !0, w.value = {};
			try {
				let t = l.task, n = t ? await Do(l.client, t.id, e) : await Eo(l.client, e);
				u("saved", n);
			} catch (e) {
				w.value = te(e), l.notify("error", U(e, d("tasks_projects.tasks.save_failed")));
			} finally {
				D.value = !1;
			}
		}
		async function V() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await Oo(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", U(e, d("tasks_projects.tasks.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, n) => {
			let l = b("BaseIcon"), m = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSelectInput"), T = b("BaseDatePicker"), I = b("BaseInputGrid"), L = b("BaseSwitch"), z = b("BaseTextarea"), H = b("BaseButton"), ee = b("BaseModal");
			return g(), r(ee, {
				show: e.show,
				onClose: n[11] ||= (e) => u("close")
			}, {
				header: E(() => [o("div", Io, [o("span", null, [s(x(M.value) + " ", 1), e.task ? (g(), a("span", Lo, "#" + x(e.task.number), 1)) : i("", !0)]), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: n[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(B, ["prevent"]) }, [o("div", Ro, [
					c(_, {
						label: S(d)("tasks_projects.tasks.fields.name"),
						error: w.value.name,
						required: ""
					}, {
						default: E(() => [c(m, {
							modelValue: f.name,
							"onUpdate:modelValue": n[1] ||= (e) => f.name = e,
							invalid: !!w.value.name,
							type: "text"
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"]),
					c(I, null, {
						default: E(() => [
							e.lockProject ? i("", !0) : (g(), r(_, {
								key: 0,
								label: S(d)("tasks_projects.tasks.fields.project"),
								error: w.value.project_id,
								"help-text": S(d)("tasks_projects.tasks.fields.project_help")
							}, {
								default: E(() => [c(v, {
									modelValue: A.value,
									"onUpdate:modelValue": n[2] ||= (e) => A.value = e,
									options: e.projects,
									placeholder: S(d)("tasks_projects.tasks.fields.project_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							])),
							C.value === null ? i("", !0) : (g(), r(_, {
								key: 1,
								label: S(d)("tasks_projects.tasks.fields.customer"),
								"help-text": S(d)("tasks_projects.tasks.fields.customer_help")
							}, {
								default: E(() => [c(m, {
									"model-value": `#${C.value}`,
									type: "text",
									disabled: ""
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "help-text"])),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.status"),
								error: w.value.task_status_id
							}, {
								default: E(() => [c(v, {
									modelValue: p.value,
									"onUpdate:modelValue": n[3] ||= (e) => p.value = e,
									options: N.value,
									"label-key": "label"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.assignee"),
								error: w.value.assignee_id
							}, {
								default: E(() => [c(v, {
									modelValue: h.value,
									"onUpdate:modelValue": n[4] ||= (e) => h.value = e,
									options: P.value,
									placeholder: S(d)("tasks_projects.tasks.fields.assignee_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.priority"),
								error: w.value.priority
							}, {
								default: E(() => [c(v, {
									modelValue: y.value,
									"onUpdate:modelValue": n[5] ||= (e) => y.value = e,
									options: F.value,
									placeholder: S(d)("tasks_projects.tasks.fields.priority_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.due_date"),
								error: w.value.due_date
							}, {
								default: E(() => [c(T, {
									"model-value": f.dueDate,
									"onUpdate:modelValue": R
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.estimate_hours"),
								error: w.value.estimated_minutes
							}, {
								default: E(() => [c(m, {
									modelValue: f.estimateHours,
									"onUpdate:modelValue": n[6] ||= (e) => f.estimateHours = e,
									invalid: !!w.value.estimated_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(_, {
								label: S(d)("tasks_projects.tasks.fields.rate"),
								error: w.value.rate,
								"help-text": S(d)("tasks_projects.tasks.fields.rate_help")
							}, {
								default: E(() => [c(m, {
									modelValue: f.rate,
									"onUpdate:modelValue": n[7] ||= (e) => f.rate = e,
									invalid: !!w.value.rate,
									type: "number",
									step: "0.01",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							])
						]),
						_: 1
					}),
					c(_, {
						label: S(d)("tasks_projects.tasks.fields.billable"),
						error: w.value.billable
					}, {
						default: E(() => [c(L, {
							modelValue: f.billable,
							"onUpdate:modelValue": n[8] ||= (e) => f.billable = e,
							class: "mt-1"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label", "error"]),
					c(_, {
						label: S(d)("tasks_projects.tasks.fields.description"),
						error: w.value.description
					}, {
						default: E(() => [c(z, {
							modelValue: f.description,
							"onUpdate:modelValue": n[9] ||= (e) => f.description = e,
							row: 3,
							invalid: !!w.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", zo, [j.value ? (g(), r(H, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: V
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", Bo)), o("div", Vo, [c(H, {
					type: "button",
					variant: "primary-outline",
					onClick: n[10] ||= (e) => u("close")
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(H, {
					type: "submit",
					variant: "primary",
					loading: D.value,
					disabled: D.value
				}, {
					default: E(() => [s(x(j.value ? S(d)("tasks_projects.general.update") : S(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), Uo = { class: "flex items-center justify-end space-x-5" }, Wo = {
	key: 0,
	class: "flex justify-center py-16"
}, Go = {
	key: 2,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, Ko = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, qo = { class: "flex items-center" }, Jo = { class: "text-sm font-semibold text-heading" }, Yo = { class: "ml-2 text-xs text-muted" }, Xo = [
	"aria-label",
	"title",
	"onClick"
], Zo = ["data-status-id"], Qo = ["data-task-id", "onClick"], $o = { class: "flex items-start justify-between gap-2" }, es = { class: "text-sm font-medium text-heading" }, ts = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, ns = ["title"], rs = {
	key: 1,
	class: "inline-flex items-center text-body"
}, is = { class: "mt-3 flex items-center justify-between" }, as = {
	key: 1,
	class: "text-xs text-subtle"
}, os = ["title"], ss = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, cs = { class: "px-3 pt-2 pb-3" }, ls = ["onClick"], us = /* @__PURE__ */ l({
	__name: "BoardPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(t) {
		let l = t, u = de(), d = v([]), _ = v([]), C = v([]), w = v(!0), D = v(null), O = v(null), k = v(!1), A = v(null), j = v({}), M = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, N = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), I = !1, L = n(() => C.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), R = n(() => _.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), z = n(() => d.value.map((e) => e.status)), B = n(() => !w.value && d.value.length === 0);
		T([D, O], () => {
			ee();
		}), h(() => {
			H(), ee();
		}), m(() => {
			for (let e of N.values()) e.destroy();
			N.clear(), P.clear();
		});
		async function H() {
			try {
				let e = await F(l.client, {
					limit: 100,
					status: "ACTIVE",
					sort_by: "name"
				});
				C.value = e.data;
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.tasks.projects_failed")));
			}
			try {
				_.value = await V(l.client);
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.tasks.members_failed")));
			}
		}
		async function ee() {
			let e = {};
			D.value && (e.project_id = D.value.id), O.value && (e.assignee_id = O.value.id), w.value = !0;
			try {
				d.value = await Co(l.client, e), d.value.some((e) => e.tasks.some((e) => e.customer_id !== null)) && Se(l.client);
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.board.load_failed")));
			} finally {
				w.value = !1;
			}
		}
		function te(e, t) {
			let n = t instanceof HTMLElement ? t : null;
			P.get(e) !== n && (N.get(e)?.destroy(), N.delete(e), P.delete(e), n !== null && (P.set(e, n), N.set(e, $.create(n, {
				group: "tasks",
				animation: 150,
				draggable: "[data-task-id]",
				ghostClass: "opacity-40",
				onStart: () => {
					I = !0;
				},
				onEnd: (e) => {
					ie(e), setTimeout(() => {
						I = !1;
					});
				}
			}))));
		}
		function ne(e) {
			let t = e.item, n = e.oldIndex ?? 0;
			t.parentNode?.removeChild(t), e.from.insertBefore(t, e.from.children[n] ?? null);
		}
		function re(e) {
			return d.value.find((t) => t.status.id === e);
		}
		async function ie(e) {
			let t = Number(e.from.dataset.statusId), n = Number(e.to.dataset.statusId), r = e.oldIndex ?? 0, i = e.newIndex ?? 0;
			if (ne(e), Number.isNaN(t) || Number.isNaN(n) || t === n && r === i) return;
			let a = re(t), o = re(n);
			if (!a || !o) return;
			let s = {
				from: [...a.tasks],
				to: [...o.tasks]
			}, [c] = a.tasks.splice(r, 1);
			if (!c) {
				a.tasks = s.from;
				return;
			}
			o.tasks.splice(i, 0, c);
			let d = o.tasks[i - 1] ?? null, f = o.tasks[i + 1] ?? null;
			try {
				let e = await ko(l.client, c.id, {
					task_status_id: n,
					before_id: d?.id ?? null,
					after_id: f?.id ?? null
				});
				Object.assign(c, e), t !== n && l.notify("success", u("tasks_projects.board.moved", {
					name: c.name,
					status: o.status.name
				}));
			} catch (e) {
				a.tasks = s.from, o.tasks = s.to, l.notify("error", U(e, u("tasks_projects.board.move_failed")));
			}
		}
		function ae(e) {
			A.value = null, j.value = {
				task_status_id: e.id,
				project_id: D.value?.id ?? null
			}, k.value = !0;
		}
		function se(e) {
			I || (A.value = e, j.value = {}, k.value = !0);
		}
		function ce(e) {
			let t = A.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			k.value = !1, A.value = null, l.notify("success", t), ee();
		}
		function fe(e) {
			k.value = !1, A.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), ee();
		}
		function pe() {
			D.value = null, O.value = null;
		}
		function me(e) {
			if (e.project_id === null) return null;
			let t = C.value.find((t) => t.id === e.project_id);
			return t?.identifier || t?.name || null;
		}
		function he(e) {
			return [C.value.find((t) => t.id === e.project_id)?.name, xe(e.customer_id)].filter(Boolean).join(" · ");
		}
		function ge(e) {
			if (e.assignee_id === null) return null;
			let t = _.value.find((t) => t.id === e.assignee_id);
			return t ? le(t.name) : `#${e.assignee_id}`;
		}
		function _e(e) {
			return e.assignee_id === null ? u("tasks_projects.tasks.unassigned") : _.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function ve(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function ye(e) {
			return M[e];
		}
		return (n, l) => {
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), v = b("BaseIcon"), C = b("BaseButton"), T = b("router-link"), M = b("BasePageHeader"), N = b("BaseSelectInput"), P = b("BaseInputGroup"), F = b("BaseFilterWrapper"), I = b("BaseSpinner"), V = b("BaseEmptyPlaceholder"), H = b("BasePage");
			return g(), r(H, null, {
				default: E(() => [
					c(M, { title: S(u)("tasks_projects.board.title") }, {
						actions: E(() => [o("div", Uo, [c(T, { to: "/admin/modules/tasks-projects" }, {
							default: E(() => [c(C, { variant: "white" }, {
								left: E((e) => [c(v, {
									name: "FolderIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(u)("tasks_projects.projects.title")), 1)]),
								_: 1
							})]),
							_: 1
						})])]),
						default: E(() => [c(h, null, {
							default: E(() => [
								c(m, {
									title: S(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(m, {
									title: S(u)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								c(m, {
									title: S(u)("tasks_projects.board.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(F, {
						show: !0,
						class: "mt-4",
						onClear: pe
					}, {
						default: E(() => [c(P, {
							label: S(u)("tasks_projects.board.filters.project"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(N, {
								modelValue: D.value,
								"onUpdate:modelValue": l[0] ||= (e) => D.value = e,
								options: L.value,
								placeholder: S(u)("tasks_projects.board.filters.all_projects"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]), c(P, {
							label: S(u)("tasks_projects.board.filters.assignee"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(N, {
								modelValue: O.value,
								"onUpdate:modelValue": l[1] ||= (e) => O.value = e,
								options: R.value,
								placeholder: S(u)("tasks_projects.board.filters.all_assignees"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					w.value && d.value.length === 0 ? (g(), a("div", Wo, [c(I, { class: "h-8 w-8 text-primary-500" })])) : B.value ? (g(), r(V, {
						key: 1,
						title: S(u)("tasks_projects.task_statuses.none"),
						description: S(u)("tasks_projects.tasks.empty_description")
					}, {
						default: E(() => [c(v, {
							name: "ViewColumnsIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"])) : (g(), a("div", Go, [(g(!0), a(e, null, y(d.value, (t) => (g(), a("section", {
						key: t.status.id,
						class: "w-72 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
					}, [
						o("header", Ko, [o("div", qo, [
							o("span", {
								class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", t.status.colour ? "" : "bg-line-default"]),
								style: p(t.status.colour ? { backgroundColor: t.status.colour } : void 0)
							}, null, 6),
							o("h3", Jo, x(t.status.name), 1),
							o("span", Yo, x(t.tasks.length), 1)
						]), o("button", {
							type: "button",
							class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
							"aria-label": S(u)("tasks_projects.tasks.new_task"),
							title: S(u)("tasks_projects.tasks.new_task"),
							onClick: (e) => ae(t.status)
						}, [c(v, {
							name: "PlusIcon",
							class: "h-4 w-4"
						})], 8, Xo)]),
						o("div", {
							ref_for: !0,
							ref: (e) => te(t.status.id, e),
							"data-status-id": t.status.id,
							class: "min-h-[80px] space-y-2 px-3 pt-3"
						}, [(g(!0), a(e, null, y(t.tasks, (e) => (g(), a("article", {
							key: e.id,
							"data-task-id": e.id,
							class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
							onClick: (t) => se(e)
						}, [
							o("div", $o, [o("p", es, x(e.name), 1), e.priority ? (g(), a("span", {
								key: 0,
								class: f(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", ye(e.priority)])
							}, x(ve(e.priority)), 3)) : i("", !0)]),
							o("div", ts, [
								o("span", null, "#" + x(e.number), 1),
								me(e) ? (g(), a("span", {
									key: 0,
									class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body",
									title: he(e)
								}, x(me(e)), 9, ns)) : i("", !0),
								e.billable ? (g(), a("span", rs, [c(v, {
									name: "CurrencyDollarIcon",
									class: "mr-0.5 h-3.5 w-3.5"
								}), s(" " + x(S(u)("tasks_projects.tasks.billable")), 1)])) : i("", !0)
							]),
							o("div", is, [e.due_date ? (g(), a("span", {
								key: 0,
								class: f(["text-xs", S(ue)(e.due_date) && !e.closed_at ? "font-medium text-status-red" : "text-muted"])
							}, x(S(oe)(e.due_date)), 3)) : (g(), a("span", as, "-")), ge(e) ? (g(), a("span", {
								key: 2,
								class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
								title: _e(e)
							}, x(ge(e)), 9, os)) : i("", !0)])
						], 8, Qo))), 128))], 8, Zo),
						t.tasks.length === 0 ? (g(), a("p", ss, x(S(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
						o("div", cs, [o("button", {
							type: "button",
							class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
							onClick: (e) => ae(t.status)
						}, " + " + x(S(u)("tasks_projects.tasks.new_task")), 9, ls)])
					]))), 128))])),
					c(Ho, {
						show: k.value,
						client: t.client,
						notify: t.notify,
						task: A.value,
						statuses: z.value,
						members: _.value,
						projects: L.value,
						defaults: j.value,
						onClose: l[2] ||= (e) => k.value = !1,
						onSaved: ce,
						onDeleted: fe
					}, null, 8, [
						"show",
						"client",
						"notify",
						"task",
						"statuses",
						"members",
						"projects",
						"defaults"
					])
				]),
				_: 1
			});
		};
	}
}), ds = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, fs = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body"
}, ps = { key: 1 }, ms = { class: "text-body" }, hs = {
	key: 2,
	class: "text-subtle"
}, gs = { key: 3 }, _s = { class: "text-body" }, vs = { class: "flex items-center justify-end space-x-5" }, ys = { class: "mt-6 flex overflow-x-auto border-b border-line-default" }, bs = [
	"href",
	"aria-current",
	"onClick"
], xs = {
	key: 0,
	class: "flex justify-center py-16"
}, Ss = "extension.page.tasks-projects.project", Cs = /* @__PURE__ */ l({
	__name: "ProjectDetailPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = de(), d = v(null), p = v(!0), m = v(!1), _ = v(!1), C = n(() => Number(l.id)), w = n(() => [
			{
				id: "overview",
				label: u("tasks_projects.project.tabs.overview"),
				name: `${Ss}.overview`
			},
			{
				id: "tasks",
				label: u("tasks_projects.project.tabs.tasks"),
				name: `${Ss}.tasks`
			},
			{
				id: "time",
				label: u("tasks_projects.project.tabs.time"),
				name: `${Ss}.time`
			},
			{
				id: "members",
				label: u("tasks_projects.project.tabs.members"),
				name: `${Ss}.members`
			}
		]), D = n(() => String(l.router.currentRoute.value.name ?? "")), O = n(() => d.value?.name ?? u("tasks_projects.projects.title")), k = n(() => xe(d.value?.customer_id ?? null));
		T(C, () => {
			j();
		}), T(D, (e) => A(e)), h(() => {
			A(D.value), j();
		});
		function A(e) {
			e === Ss && l.router.replace({
				name: `${Ss}.overview`,
				params: { id: l.id }
			});
		}
		async function j() {
			p.value = !0;
			try {
				d.value = await Ao(l.client, C.value), typeof d.value?.customer_id == "number" && await Se(l.client);
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.project.load_failed")));
			} finally {
				p.value = !1;
			}
		}
		function M(e) {
			return {
				name: e.name,
				params: { id: l.id }
			};
		}
		function N(e) {
			return D.value === e.name;
		}
		function P(e) {
			_.value = !1, l.notify("success", u("tasks_projects.projects.updated", { name: e.name })), j();
		}
		async function F() {
			let e = d.value;
			if (!(e === null || m.value)) {
				m.value = !0;
				try {
					e.status === "ARCHIVED" ? (await z(l.client, e.id), l.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await R(l.client, e.id), l.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), await j();
				} catch (e) {
					l.notify("error", U(e, u("tasks_projects.projects.save_failed")));
				} finally {
					m.value = !1;
				}
			}
		}
		function I(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function L(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (n, l) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), C = b("BaseBadge"), T = b("BaseIcon"), D = b("BaseButton"), A = b("router-link"), R = b("BasePageHeader"), z = b("BaseSpinner"), B = b("router-view"), V = b("BasePage");
			return g(), r(V, null, {
				default: E(() => [
					c(R, { title: O.value }, {
						actions: E(() => [o("div", vs, [
							c(A, { to: "/admin/modules/tasks-projects/board" }, {
								default: E(() => [c(D, { variant: "white" }, {
									left: E((e) => [c(T, {
										name: "ViewColumnsIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(u)("tasks_projects.project.board")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							d.value ? (g(), r(D, {
								key: 0,
								variant: "primary-outline",
								loading: m.value,
								disabled: m.value,
								onClick: F
							}, {
								default: E(() => [s(x(d.value.status === "ARCHIVED" ? S(u)("tasks_projects.projects.unarchive") : S(u)("tasks_projects.projects.archive")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							d.value ? (g(), r(D, {
								key: 1,
								variant: "primary",
								onClick: l[0] ||= (e) => _.value = !0
							}, {
								left: E((e) => [c(T, {
									name: "PencilIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(u)("tasks_projects.general.edit")), 1)]),
								_: 1
							})) : i("", !0)
						])]),
						default: E(() => [c(v, null, {
							default: E(() => [
								c(h, {
									title: S(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(h, {
									title: S(u)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								c(h, {
									title: O.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), d.value ? (g(), a("div", ds, [
							c(C, { class: f(["rounded-full", I(d.value.status)]) }, {
								default: E(() => [s(x(L(d.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							d.value.identifier ? (g(), a("span", fs, x(d.value.identifier), 1)) : i("", !0),
							d.value.customer_id ? (g(), a("span", ps, [s(x(S(u)("tasks_projects.project.customer")) + ": ", 1), o("span", ms, x(k.value), 1)])) : (g(), a("span", hs, x(S(u)("tasks_projects.projects.internal")), 1)),
							d.value.due_date ? (g(), a("span", gs, [s(x(S(u)("tasks_projects.project.due_date")) + ": ", 1), o("span", _s, x(S(oe)(d.value.due_date)), 1)])) : i("", !0)
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("nav", ys, [(g(!0), a(e, null, y(w.value, (e) => (g(), r(A, {
						key: e.id,
						to: M(e),
						custom: ""
					}, {
						default: E(({ href: t, navigate: n }) => [o("a", {
							href: t,
							"aria-current": N(e) ? "page" : void 0,
							class: f(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", N(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, x(e.label), 11, bs)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					p.value && d.value === null ? (g(), a("div", xs, [c(z, { class: "h-8 w-8 text-primary-500" })])) : (g(), r(B, {
						key: 1,
						project: d.value,
						onRefresh: j
					}, null, 8, ["project"])),
					c(_e, {
						show: _.value,
						client: t.client,
						notify: t.notify,
						project: d.value,
						onClose: l[1] ||= (e) => _.value = !1,
						onSaved: P
					}, null, 8, [
						"show",
						"client",
						"notify",
						"project"
					])
				]),
				_: 1
			});
		};
	}
}), ws = { class: "py-4" }, Ts = { class: "rounded-xl border border-line-default bg-surface p-5" }, Es = { class: "flex flex-col gap-4 lg:flex-row lg:items-end" }, Ds = {
	key: 0,
	class: "mt-3 text-xs text-subtle"
}, Os = { class: "mt-4 overflow-hidden rounded-xl border border-line-default bg-surface" }, ks = {
	key: 0,
	class: "flex justify-center py-10"
}, As = {
	key: 1,
	class: "px-5 py-8 text-center text-sm text-muted"
}, js = {
	key: 2,
	class: "divide-y divide-line-light"
}, Ms = { class: "text-sm font-medium text-heading" }, Ns = { class: "text-xs text-muted" }, Ps = {
	key: 1,
	class: "text-subtle"
}, Fs = /* @__PURE__ */ l({
	__name: "ProjectMembersTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	setup(t) {
		let l = t, u = de(), d = v([]), p = v([]), m = v(!0), _ = v(!1), C = v(null), w = v(null), T = v(""), D = v({}), O = n(() => l.project?.id ?? Number(l.id)), k = n(() => p.value.filter((e) => !d.value.some((t) => t.user_id === e.id)).map((e) => ({
			id: e.id,
			label: e.name
		})));
		h(() => {
			A();
		});
		async function A() {
			m.value = !0;
			try {
				p.value = await V(l.client);
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				d.value = await jo(l.client, O.value);
			} catch (e) {
				l.notify("error", U(e, u("tasks_projects.project.members.load_failed")));
			} finally {
				m.value = !1;
			}
		}
		function j(e) {
			return p.value.find((t) => t.id === e)?.name ?? u("tasks_projects.project.time.removed_member");
		}
		async function M() {
			let e = w.value;
			if (!(e === null || _.value)) {
				_.value = !0, D.value = {};
				try {
					await Mo(l.client, O.value, {
						user_id: e.id,
						rate: re(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), w.value = null, T.value = "", await A();
				} catch (e) {
					D.value = te(e), l.notify("error", U(e, u("tasks_projects.project.members.attach_failed")));
				} finally {
					_.value = !1;
				}
			}
		}
		async function N(e) {
			let t = j(e.user_id);
			if (window.confirm(u("tasks_projects.project.members.detach_confirm", { name: t }))) {
				C.value = e.user_id;
				try {
					await No(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", U(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					C.value = null;
				}
			}
		}
		return (t, n) => {
			let l = b("BaseSelectInput"), p = b("BaseInputGroup"), h = b("BaseInput"), v = b("BaseIcon"), O = b("BaseButton"), A = b("BaseSpinner"), P = b("BaseFormatMoney");
			return g(), a("div", ws, [o("div", Ts, [o("div", Es, [
				c(p, {
					label: S(u)("tasks_projects.project.members.member"),
					error: D.value.user_id,
					class: "flex-1"
				}, {
					default: E(() => [c(l, {
						modelValue: w.value,
						"onUpdate:modelValue": n[0] ||= (e) => w.value = e,
						options: k.value,
						placeholder: S(u)("tasks_projects.project.members.attach_placeholder"),
						"label-key": "label"
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "error"]),
				c(p, {
					label: S(u)("tasks_projects.project.members.rate"),
					error: D.value.rate,
					"help-text": S(u)("tasks_projects.project.members.rate_help"),
					class: "flex-1"
				}, {
					default: E(() => [c(h, {
						modelValue: T.value,
						"onUpdate:modelValue": n[1] ||= (e) => T.value = e,
						type: "number",
						step: "0.01",
						min: "0"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, [
					"label",
					"error",
					"help-text"
				]),
				c(O, {
					variant: "primary",
					class: "lg:mb-1",
					loading: _.value,
					disabled: _.value || w.value === null,
					onClick: M
				}, {
					left: E((e) => [c(v, {
						name: "PlusIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: E(() => [s(" " + x(S(u)("tasks_projects.project.members.attach")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			]), k.value.length === 0 && !m.value ? (g(), a("p", Ds, x(S(u)("tasks_projects.project.members.all_attached")), 1)) : i("", !0)]), o("div", Os, [m.value ? (g(), a("div", ks, [c(A, { class: "h-6 w-6 text-primary-500" })])) : d.value.length === 0 ? (g(), a("p", As, x(S(u)("tasks_projects.project.members.empty")), 1)) : (g(), a("ul", js, [(g(!0), a(e, null, y(d.value, (e) => (g(), a("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [o("div", null, [o("p", Ms, x(j(e.user_id)), 1), o("p", Ns, [s(x(S(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (g(), a("span", Ps, x(S(u)("tasks_projects.tasks.none")), 1)) : (g(), r(P, {
				key: 0,
				amount: e.rate
			}, null, 8, ["amount"]))])]), c(O, {
				variant: "danger",
				size: "sm",
				loading: C.value === e.user_id,
				disabled: C.value === e.user_id,
				onClick: (t) => N(e)
			}, {
				default: E(() => [s(x(S(u)("tasks_projects.general.delete")), 1)]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"onClick"
			])]))), 128))]))])]);
		};
	}
}), Is = {
	key: 0,
	class: "py-6"
}, Ls = { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Rs = { class: "rounded-xl border border-line-default bg-surface p-5" }, zs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Bs = { class: "mt-2 text-2xl font-semibold text-heading" }, Vs = { class: "mt-1 text-xs text-muted" }, Hs = { class: "rounded-xl border border-line-default bg-surface p-5" }, Us = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ws = { class: "mt-2 text-2xl font-semibold text-heading" }, Gs = { class: "mt-1 text-xs text-muted" }, Ks = { class: "rounded-xl border border-line-default bg-surface p-5" }, qs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Js = { class: "mt-2 text-2xl font-semibold text-heading" }, Ys = { class: "rounded-xl border border-line-default bg-surface p-5" }, Xs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Zs = { class: "mt-2 text-2xl font-semibold text-heading" }, Qs = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, $s = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ec = { class: "mt-2 text-sm text-body" }, tc = { class: "mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, nc = {
	key: 0,
	class: "mt-2 text-xs font-medium text-status-red"
}, rc = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, ic = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, ac = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, oc = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, sc = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, cc = {
	key: 1,
	class: "flex justify-center py-16"
}, lc = /* @__PURE__ */ l({
	__name: "ProjectOverviewTab",
	props: { project: {} },
	setup(t) {
		let l = t, u = de(), d = n(() => l.project?.totals ?? null), m = n(() => l.project?.budget_minutes ?? null), h = n(() => {
			let e = m.value, t = d.value?.logged_minutes ?? 0;
			return e ? Math.min(100, Math.round(t / e * 100)) : 0;
		}), _ = n(() => {
			let e = l.project?.customer_id ?? null;
			return e === null || (d.value?.unbilled_amount ?? 0) <= 0 ? null : `/admin/modules/tasks-projects/billing?customer_id=${e}`;
		}), v = n(() => {
			let e = m.value, t = d.value?.logged_minutes ?? 0;
			return e && t > e ? t - e : 0;
		});
		return (n, l) => {
			let y = b("BaseFormatMoney"), C = b("router-link"), w = b("BaseSpinner");
			return t.project && d.value ? (g(), a("div", Is, [
				o("div", Ls, [
					o("div", Rs, [
						o("p", zs, x(S(u)("tasks_projects.project.overview.tasks")), 1),
						o("p", Bs, x(d.value.tasks.total), 1),
						o("p", Vs, x(S(u)("tasks_projects.project.overview.open_tasks", { count: d.value.tasks.open })) + " · " + x(S(u)("tasks_projects.project.overview.closed_tasks", { count: d.value.tasks.closed })), 1)
					]),
					o("div", Hs, [
						o("p", Us, x(S(u)("tasks_projects.project.overview.logged")), 1),
						o("p", Ws, x(S(ce)(d.value.logged_minutes)), 1),
						o("p", Gs, x(S(u)("tasks_projects.project.overview.billable")) + ": " + x(S(ce)(d.value.billable_minutes)), 1)
					]),
					o("div", Ks, [o("p", qs, x(S(u)("tasks_projects.project.overview.billable_amount")), 1), o("p", Js, [c(y, { amount: d.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Ys, [
						o("p", Xs, x(S(u)("tasks_projects.project.overview.unbilled_amount")), 1),
						o("p", Zs, [c(y, { amount: d.value.unbilled_amount }, null, 8, ["amount"])]),
						_.value ? (g(), r(C, {
							key: 0,
							class: "mt-1 block text-xs font-medium text-primary-500 hover:underline",
							to: _.value
						}, {
							default: E(() => [s(x(S(u)("tasks_projects.billing.view_unbilled")), 1)]),
							_: 1
						}, 8, ["to"])) : i("", !0)
					])
				]),
				o("div", Qs, [o("p", $s, x(S(u)("tasks_projects.project.overview.budget")), 1), m.value ? (g(), a(e, { key: 0 }, [
					o("p", ec, x(S(u)("tasks_projects.project.overview.budget_used", {
						used: S(ce)(d.value.logged_minutes),
						total: S(ce)(m.value)
					})), 1),
					o("div", tc, [o("div", {
						class: f(["h-2 rounded-full", v.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: p({ width: `${h.value}%` })
					}, null, 6)]),
					v.value > 0 ? (g(), a("p", nc, x(S(u)("tasks_projects.project.overview.budget_over", { amount: S(ce)(v.value) })), 1)) : i("", !0)
				], 64)) : (g(), a("p", rc, x(S(u)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", ic, [o("p", ac, x(S(u)("tasks_projects.project.overview.description")), 1), t.project.description ? (g(), a("p", oc, x(t.project.description), 1)) : (g(), a("p", sc, x(S(u)("tasks_projects.project.overview.no_description")), 1))])
			])) : (g(), a("div", cc, [c(w, { class: "h-8 w-8 text-primary-500" })]));
		};
	}
}), uc = { class: "relative table-container" }, dc = ["onClick"], fc = { class: "inline-flex items-center" }, pc = {
	key: 1,
	class: "text-subtle"
}, mc = {
	key: 1,
	class: "text-subtle"
}, hc = 10, gc = 350, _c = /* @__PURE__ */ l({
	__name: "TaskList",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		projectId: {},
		filterable: { type: Boolean }
	},
	emits: ["changed"],
	setup(e, { expose: t, emit: l }) {
		let u = e, d = l, y = {
			number: "number",
			name: "name",
			priority: "priority",
			due_date: "due_date"
		}, C = de(), O = v(null), k = v(!0), A = v(0), j = v([]), M = v([]), N = v([]), I = v(!1), L = v(null), R = v({}), z = v(null), B = _({
			search: "",
			status: null,
			assignee: null
		}), H = n(() => j.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), ee = n(() => M.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), te = n(() => B.search.trim() !== "" || B.status !== null || B.assignee !== null), ne = n(() => !k.value && A.value === 0 && !te.value), re = n(() => [
			{
				key: "number",
				label: C("tasks_projects.tasks.columns.number"),
				sortable: !0,
				sortBy: "number",
				tdClass: "text-muted"
			},
			{
				key: "name",
				label: C("tasks_projects.tasks.columns.name"),
				sortable: !0,
				sortBy: "name",
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: C("tasks_projects.tasks.columns.status"),
				sortable: !1
			},
			{
				key: "assignee",
				label: C("tasks_projects.tasks.columns.assignee"),
				sortable: !1
			},
			{
				key: "priority",
				label: C("tasks_projects.tasks.columns.priority"),
				sortable: !0,
				sortBy: "priority"
			},
			{
				key: "due_date",
				label: C("tasks_projects.tasks.columns.due_date"),
				sortable: !0,
				sortBy: "due_date"
			},
			{
				key: "actions",
				label: C("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]), ie = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, ae;
		T(() => B.search, () => {
			clearTimeout(ae), ae = setTimeout(() => le(), gc);
		}), T([
			() => B.status,
			() => B.assignee,
			() => u.projectId
		], () => le()), h(() => {
			se();
		}), m(() => clearTimeout(ae));
		async function se() {
			try {
				j.value = await wo(u.client);
			} catch (e) {
				u.notify("error", U(e, C("tasks_projects.task_statuses.load_failed")));
			}
			try {
				M.value = await V(u.client);
			} catch (e) {
				u.notify("error", U(e, C("tasks_projects.tasks.members_failed")));
			}
			if (!u.projectId) try {
				let e = await F(u.client, {
					limit: 100,
					status: "ACTIVE",
					sort_by: "name"
				});
				N.value = e.data.map((e) => ({
					id: e.id,
					label: e.name
				}));
			} catch (e) {
				u.notify("error", U(e, C("tasks_projects.tasks.projects_failed")));
			}
		}
		async function ce({ page: e, sort: t }) {
			let n = {
				page: e,
				limit: hc,
				...P(t, y)
			};
			u.projectId && (n.project_id = u.projectId), B.status && (n.task_status_id = B.status.id), B.assignee && (n.assignee_id = B.assignee.id), B.search.trim() !== "" && (n.search = B.search.trim()), k.value = !0;
			try {
				let e = await To(u.client, n);
				return A.value = e.meta.total, {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return u.notify("error", U(e, C("tasks_projects.tasks.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: hc
					}
				};
			} finally {
				k.value = !1;
			}
		}
		function le(e = !1) {
			O.value?.refresh(e);
		}
		function fe() {
			B.search = "", B.status = null, B.assignee = null;
		}
		function pe() {
			L.value = null, R.value = { project_id: u.projectId ?? null }, I.value = !0;
		}
		function me(e) {
			L.value = e, R.value = {}, I.value = !0;
		}
		function he(e) {
			let t = L.value ? C("tasks_projects.tasks.updated", { name: e.name }) : C("tasks_projects.tasks.created", { name: e.name });
			I.value = !1, L.value = null, u.notify("success", t), le(!0), d("changed");
		}
		function ge(e) {
			I.value = !1, L.value = null, u.notify("success", C("tasks_projects.tasks.deleted", { name: e.name })), le(!0), d("changed");
		}
		function _e(e) {
			return j.value.find((t) => t.id === e.task_status_id) ?? null;
		}
		function ve(e) {
			return e.assignee_id === null ? C("tasks_projects.tasks.unassigned") : M.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function ye(e) {
			return C(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function be(e) {
			return ie[e];
		}
		async function xe(e) {
			if (window.confirm(C("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				z.value = e.id;
				try {
					await Oo(u.client, e.id), u.notify("success", C("tasks_projects.tasks.deleted", { name: e.name })), le(!0), d("changed");
				} catch (e) {
					u.notify("error", U(e, C("tasks_projects.tasks.delete_failed")));
				} finally {
					z.value = null;
				}
			}
		}
		return t({
			openCreate: pe,
			refresh: le
		}), (t, n) => {
			let l = b("BaseInput"), u = b("BaseInputGroup"), d = b("BaseSelectInput"), m = b("BaseFilterWrapper"), h = b("BaseIcon"), _ = b("BaseButton"), v = b("BaseEmptyPlaceholder"), y = b("BaseDropdownItem"), T = b("BaseDropdown"), k = b("BaseTable");
			return g(), a("div", null, [
				e.filterable ? (g(), r(m, {
					key: 0,
					show: !0,
					class: "mt-3",
					onClear: fe
				}, {
					default: E(() => [
						c(u, {
							label: S(C)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(l, {
								modelValue: B.search,
								"onUpdate:modelValue": n[0] ||= (e) => B.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: S(C)("tasks_projects.tasks.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]),
						c(u, {
							label: S(C)("tasks_projects.tasks.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(d, {
								modelValue: B.status,
								"onUpdate:modelValue": n[1] ||= (e) => B.status = e,
								options: H.value,
								placeholder: S(C)("tasks_projects.tasks.all_tasks"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						c(u, {
							label: S(C)("tasks_projects.tasks.columns.assignee"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(d, {
								modelValue: B.assignee,
								"onUpdate:modelValue": n[2] ||= (e) => B.assignee = e,
								options: ee.value,
								placeholder: S(C)("tasks_projects.board.filters.all_assignees"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					_: 1
				})) : i("", !0),
				D(c(v, {
					title: S(C)("tasks_projects.tasks.empty_title"),
					description: S(C)("tasks_projects.tasks.empty_description")
				}, {
					actions: E(() => [c(_, {
						variant: "primary",
						onClick: pe
					}, {
						left: E((e) => [c(h, {
							name: "PlusIcon",
							class: f(e.class)
						}, null, 8, ["class"])]),
						default: E(() => [s(" " + x(S(C)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})]),
					default: E(() => [c(h, {
						name: "ClipboardDocumentListIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"]), [[w, ne.value]]),
				D(o("div", uc, [c(k, {
					ref_key: "tableRef",
					ref: O,
					data: ce,
					columns: re.value,
					class: "mt-3"
				}, {
					"cell-number": E(({ row: e }) => [s("#" + x(e.data.number), 1)]),
					"cell-name": E(({ row: e }) => [o("button", {
						type: "button",
						class: "text-left hover:text-primary-500",
						onClick: (t) => me(e.data)
					}, x(e.data.name), 9, dc)]),
					"cell-status": E(({ row: e }) => [o("span", fc, [o("span", {
						class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", _e(e.data)?.colour ? "" : "bg-line-default"]),
						style: p(_e(e.data)?.colour ? { backgroundColor: _e(e.data)?.colour } : void 0)
					}, null, 6), s(" " + x(_e(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": E(({ row: e }) => [o("span", { class: f(e.data.assignee_id === null ? "text-subtle" : "") }, x(ve(e.data)), 3)]),
					"cell-priority": E(({ row: e }) => [e.data.priority ? (g(), a("span", {
						key: 0,
						class: f(["rounded-full px-2 py-0.5 text-xs font-medium", be(e.data.priority)])
					}, x(ye(e.data.priority)), 3)) : (g(), a("span", pc, "-"))]),
					"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", {
						key: 0,
						class: f(S(ue)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "")
					}, x(S(oe)(e.data.due_date)), 3)) : (g(), a("span", mc, "-"))]),
					"cell-actions": E(({ row: e }) => [c(T, { "content-loading": z.value === e.data.id }, {
						activator: E(() => [c(h, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: E(() => [c(y, { onClick: (t) => me(e.data) }, {
							default: E(() => [c(h, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(C)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(y, { onClick: (t) => xe(e.data) }, {
							default: E(() => [c(h, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(C)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1032, ["content-loading"])]),
					_: 1
				}, 8, ["columns"])], 512), [[w, !ne.value]]),
				c(Ho, {
					show: I.value,
					client: e.client,
					notify: e.notify,
					task: L.value,
					statuses: j.value,
					members: M.value,
					projects: N.value,
					defaults: R.value,
					"lock-project": !!e.projectId,
					onClose: n[3] ||= (e) => I.value = !1,
					onSaved: he,
					onDeleted: ge
				}, null, 8, [
					"show",
					"client",
					"notify",
					"task",
					"statuses",
					"members",
					"projects",
					"defaults",
					"lock-project"
				])
			]);
		};
	}
}), vc = { class: "py-4" }, yc = { class: "flex justify-end" }, bc = /* @__PURE__ */ l({
	__name: "ProjectTasksTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: t }) {
		let r = e, i = t, l = de(), u = v(null), d = n(() => r.project?.id ?? Number(r.id));
		function p() {
			i("refresh");
		}
		return (t, n) => {
			let r = b("BaseIcon"), i = b("BaseButton");
			return g(), a("div", vc, [o("div", yc, [c(i, {
				variant: "primary",
				onClick: n[0] ||= (e) => u.value?.openCreate()
			}, {
				left: E((e) => [c(r, {
					name: "PlusIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(l)("tasks_projects.tasks.new_task")), 1)]),
				_: 1
			})]), c(_c, {
				ref_key: "listRef",
				ref: u,
				client: e.client,
				notify: e.notify,
				"project-id": d.value,
				filterable: "",
				onChanged: p
			}, null, 8, [
				"client",
				"notify",
				"project-id"
			])]);
		};
	}
}), xc = { class: "relative py-4 table-container" }, Sc = { class: "font-medium text-heading" }, Cc = {
	key: 0,
	class: "block text-xs text-muted"
}, wc = {
	key: 0,
	class: "text-primary-500"
}, Tc = { key: 1 }, Ec = {
	key: 1,
	class: "text-subtle"
}, Dc = 15, Oc = /* @__PURE__ */ l({
	__name: "ProjectTimeTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	setup(e) {
		let t = e, l = de(), u = v([]), d = v([]), f = n(() => t.project?.id ?? Number(t.id)), p = n(() => [
			{
				key: "started_at",
				label: l("tasks_projects.project.time.columns.date"),
				sortable: !1
			},
			{
				key: "user",
				label: l("tasks_projects.project.time.columns.member"),
				sortable: !1
			},
			{
				key: "task",
				label: l("tasks_projects.project.time.columns.task"),
				sortable: !1,
				thClass: "extra"
			},
			{
				key: "duration_minutes",
				label: l("tasks_projects.project.time.columns.minutes"),
				sortable: !1
			},
			{
				key: "billable",
				label: l("tasks_projects.project.time.columns.billable"),
				sortable: !1
			},
			{
				key: "amount",
				label: l("tasks_projects.project.time.columns.amount"),
				sortable: !1,
				tdClass: "text-right"
			}
		]);
		h(() => {
			m();
		});
		async function m() {
			try {
				u.value = await V(t.client);
			} catch (e) {
				t.notify("error", U(e, l("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await To(t.client, {
					project_id: f.value,
					limit: 100
				});
				d.value = e.data;
			} catch (e) {
				t.notify("error", U(e, l("tasks_projects.tasks.load_failed")));
			}
		}
		async function _({ page: e }) {
			let n = {
				page: e,
				limit: Dc,
				project_id: f.value
			};
			try {
				let e = await Po(t.client, n);
				return {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return t.notify("error", U(e, l("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Dc
					}
				};
			}
		}
		function y(e) {
			return u.value.find((t) => t.id === e)?.name ?? l("tasks_projects.project.time.removed_member");
		}
		function C(e) {
			return d.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		return (e, t) => {
			let n = b("BaseIcon"), u = b("BaseFormatMoney"), d = b("BaseTable");
			return g(), a("div", xc, [c(d, {
				data: _,
				columns: p.value
			}, {
				"cell-started_at": E(({ row: e }) => [s(x(e.data.started_at ? S(oe)(e.data.started_at) : "-"), 1)]),
				"cell-user": E(({ row: e }) => [s(x(y(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [o("span", Sc, x(C(e.data.task_id)), 1), e.data.description ? (g(), a("span", Cc, x(e.data.description), 1)) : i("", !0)]),
				"cell-duration_minutes": E(({ row: e }) => [e.data.is_running ? (g(), a("span", wc, x(S(l)("tasks_projects.project.time.running")), 1)) : (g(), a("span", Tc, x(S(ce)(e.data.duration_minutes)), 1))]),
				"cell-billable": E(({ row: e }) => [e.data.billable ? (g(), r(n, {
					key: 0,
					name: "CheckCircleIcon",
					class: "h-5 w-5 text-status-green"
				})) : (g(), a("span", Ec, "-"))]),
				"cell-amount": E(({ row: e }) => [c(u, { amount: e.data.amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["columns"])]);
		};
	}
}), kc = { class: "flex items-center justify-end space-x-5" }, Ac = /* @__PURE__ */ l({
	__name: "TasksPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(e) {
		let t = de(), n = v(null);
		return (i, a) => {
			let l = b("BaseBreadcrumbItem"), u = b("BaseBreadcrumb"), d = b("BaseIcon"), p = b("BaseButton"), m = b("router-link"), h = b("BasePageHeader"), _ = b("BasePage");
			return g(), r(_, null, {
				default: E(() => [c(h, { title: S(t)("tasks_projects.tasks.title") }, {
					actions: E(() => [o("div", kc, [c(m, { to: "/admin/modules/tasks-projects/board" }, {
						default: E(() => [c(p, { variant: "white" }, {
							left: E((e) => [c(d, {
								name: "ViewColumnsIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: E(() => [s(" " + x(S(t)("tasks_projects.board.title")), 1)]),
							_: 1
						})]),
						_: 1
					}), c(p, {
						variant: "primary",
						onClick: a[0] ||= (e) => n.value?.openCreate()
					}, {
						left: E((e) => [c(d, {
							name: "PlusIcon",
							class: f(e.class)
						}, null, 8, ["class"])]),
						default: E(() => [s(" " + x(S(t)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})])]),
					default: E(() => [c(u, null, {
						default: E(() => [
							c(l, {
								title: S(t)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]),
							c(l, {
								title: S(t)("tasks_projects.projects.title"),
								to: "/admin/modules/tasks-projects"
							}, null, 8, ["title"]),
							c(l, {
								title: S(t)("tasks_projects.tasks.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])
						]),
						_: 1
					})]),
					_: 1
				}, 8, ["title"]), c(_c, {
					ref_key: "listRef",
					ref: n,
					client: e.client,
					notify: e.notify,
					filterable: ""
				}, null, 8, ["client", "notify"])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region resources/js/support/page.ts
function jc(e, t) {
	return l({ setup: (n, { attrs: r }) => () => d(t, {
		...r,
		client: e.client,
		notify: (t, n) => {
			e.notify(t, n);
		},
		router: e.router
	}) });
}
//#endregion
//#region resources/js/registrations/board.ts
var Mc = "tasks-projects", Nc = {
	viewProject: `${Mc}:view-project`,
	editProject: `${Mc}:edit-project`,
	viewTask: `${Mc}:view-task`,
	viewOwnTime: `${Mc}:view-own-time`
};
function Pc(e) {
	e.addMessages(oi), e.registerPage({
		id: "board",
		module: Mc,
		path: "board",
		component: jc(e, us),
		meta: {
			ability: Nc.viewTask,
			title: "tasks_projects.board.title"
		}
	}), e.registerPage({
		id: "tasks",
		module: Mc,
		path: "tasks",
		component: jc(e, Ac),
		meta: {
			ability: Nc.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "project",
		module: Mc,
		path: "projects/:id",
		component: jc(e, Cs),
		meta: {
			ability: Nc.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: jc(e, lc),
				meta: {
					ability: Nc.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: jc(e, bc),
				meta: {
					ability: Nc.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: jc(e, Oc),
				meta: {
					ability: Nc.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: jc(e, Fs),
				meta: {
					ability: Nc.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/messages/billing.ts
var Fc = { en: { tasks_projects: { billing: {
	title: "Invoice time",
	subtitle: "Turn unbilled hours into a draft invoice.",
	invoice_time: "Invoice time",
	unbilled: "Unbilled",
	view_unbilled: "Invoice this time",
	steps: {
		customer: "Customer",
		entries: "Entries",
		preview: "Preview",
		create: "Create"
	},
	back: "Back",
	next: "Continue",
	start_over: "Start over",
	customer: {
		title: "Who are you invoicing?",
		description: "Customers with billable time that has not reached an invoice yet.",
		entries: "{count} entries",
		empty_title: "Nothing to invoice",
		empty_description: "Billable time appears here once it has been logged against a task that belongs to a customer.",
		load_failed: "Unable to load the customers with unbilled time.",
		names_failed: "Unable to load the customer names; ids are shown instead.",
		unnamed: "Customer #{id}",
		from: "From",
		to: "To",
		clear_range: "Clear dates"
	},
	entries: {
		title: "Which time goes on the invoice?",
		grouping: "Group lines by",
		group_by: {
			task: "Task",
			project: "Project",
			member: "Member",
			summary: "One summary line"
		},
		select_all: "Select all",
		selected: "{count} of {total} entries selected",
		selected_total: "Selected: {hours}",
		no_description: "No description",
		columns: {
			date: "Date",
			task: "Task",
			project: "Project",
			member: "Member",
			duration: "Duration",
			amount: "Amount"
		},
		empty_title: "No unbilled time",
		empty_description: "This customer has nothing waiting to be invoiced in this range.",
		load_failed: "Unable to load the unbilled time.",
		none_selected: "Select at least one entry."
	},
	preview: {
		title: "Check the invoice",
		lines: "Invoice lines",
		columns: {
			description: "Description",
			quantity: "Hours",
			price: "Rate",
			total: "Amount"
		},
		sub_total: "Subtotal",
		total: "Total",
		invoice_date: "Invoice date",
		due_date: "Due date",
		invoice_number: "Invoice number",
		invoice_number_auto: "Generated by the company number format.",
		template: "Template",
		exchange_rate: "Exchange rate",
		exchange_rate_help: "1 {currency} in the company currency.",
		prepare_failed: "Unable to prepare the invoice.",
		templates_failed: "Unable to load the invoice templates.",
		number_failed: "Unable to read the next invoice number. Type one in.",
		rate_failed: "Unable to read the exchange rate. Type one in.",
		create: "Create invoice",
		invalid: "The invoice was refused. Fix the fields below and try again."
	},
	create: {
		creating: "Creating the invoice",
		stamping: "Marking the time as invoiced",
		created_title: "Invoice {number} created",
		created_description: "{count} entries were marked as invoiced.",
		view_invoice: "Open the invoice",
		invoice_more: "Invoice more time",
		failed: "Unable to create the invoice.",
		stamp_failed_title: "The invoice was created, but the time is not marked yet",
		stamp_failed_description: "Invoice {number} exists. The time entries still count as unbilled until they are stamped, which is safe to run again.",
		retry_stamp: "Retry stamping",
		stamped: "The time entries were marked as invoiced."
	}
} } } }, Ic = "/api/v1/tasks-projects", Lc = {
	customers: `${Ic}/billing/customers`,
	unbilled: `${Ic}/billing/unbilled`,
	prepare: `${Ic}/billing/prepare`,
	confirm: `${Ic}/billing/confirm`
}, Rc = {
	bootstrap: "/api/v1/bootstrap",
	customers: "/api/v1/customers",
	invoices: "/api/v1/invoices",
	invoiceTemplates: "/api/v1/invoices/templates",
	nextNumber: "/api/v1/next-number",
	exchangeRate: (e) => `/api/v1/currencies/${e}/exchange-rate`
};
async function zc(e, t = {}) {
	let { data: n } = await e.get(Lc.customers, { params: t });
	return n.data ?? [];
}
async function Bc(e, t, n = {}) {
	let { data: r } = await e.get(Lc.unbilled, { params: {
		customer_id: t,
		...n
	} });
	return r.data;
}
async function Vc(e, t, n) {
	let { data: r } = await e.post(Lc.prepare, {
		entry_ids: t,
		grouping: n
	});
	return r.data;
}
async function Hc(e, t, n) {
	let { data: r } = await e.post(Lc.confirm, {
		invoice_id: t,
		items: n
	});
	return r?.stamped ?? 0;
}
async function Uc(e, t = 200) {
	let { data: n } = await e.get(Rc.customers, { params: { limit: t } });
	return n.data ?? [];
}
async function Wc(e, t) {
	let { data: n } = await e.post(Rc.invoices, t);
	return n.data;
}
async function Gc(e) {
	let { data: t } = await e.get(Rc.invoiceTemplates);
	return t?.invoiceTemplates ?? [];
}
async function Kc(e, t) {
	let n = { key: "invoice" };
	t !== void 0 && (n.userId = t);
	let { data: r } = await e.get(Rc.nextNumber, { params: n });
	return r?.success && typeof r.nextNumber == "string" ? r.nextNumber : null;
}
async function qc(e, t) {
	let { data: n } = await e.get(Rc.exchangeRate(t)), r = Array.isArray(n?.exchangeRate) ? n.exchangeRate[0] : n?.exchangeRate, i = Number(r);
	return Number.isFinite(i) && i > 0 ? i : null;
}
async function Jc(e) {
	let { data: t } = await e.get(Rc.bootstrap), n = t?.current_company_settings ?? {}, r = t?.current_user_settings ?? {}, i = Number(n.invoice_due_date_days), a = r.default_invoice_template;
	return {
		currency: t?.current_company_currency ?? null,
		dueDateDays: Number.isFinite(i) && i >= 0 ? i : 0,
		setDueDateAutomatically: n.invoice_set_due_date_automatically === "YES",
		autoGenerateNumber: n.invoice_auto_generate !== "NO",
		defaultTemplate: typeof a == "string" && a !== "" ? a : null
	};
}
//#endregion
//#region resources/js/pages/BillingPage.vue?vue&type=script&setup=true&lang.ts
var Yc = { class: "flex items-center justify-end space-x-5" }, Xc = { class: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" }, Zc = {
	key: 0,
	class: "flex justify-center py-16"
}, Qc = {
	key: 1,
	class: "mt-6"
}, $c = { class: "text-base font-semibold text-heading" }, el = { class: "mt-1 text-sm text-muted" }, tl = { class: "mt-4 flex flex-wrap items-end gap-4" }, nl = {
	key: 0,
	class: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
}, rl = ["onClick"], il = { class: "text-sm font-semibold text-heading" }, al = { class: "mt-1 text-xs text-muted" }, ol = { class: "mt-3 text-xl font-semibold text-heading" }, sl = {
	key: 2,
	class: "mt-6"
}, cl = { class: "flex flex-wrap items-end justify-between gap-4" }, ll = { class: "text-base font-semibold text-heading" }, ul = { class: "mt-1 text-sm text-muted" }, dl = {
	key: 0,
	class: "flex justify-center py-16"
}, fl = { class: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-default bg-surface-secondary px-4 py-3" }, pl = { class: "flex cursor-pointer items-center gap-2 text-sm font-medium text-heading" }, ml = ["checked"], hl = { class: "text-sm text-muted" }, gl = { class: "flex flex-wrap items-center justify-between gap-3 bg-surface-secondary px-4 py-3" }, _l = { class: "flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading" }, vl = ["checked", "onChange"], yl = { class: "text-sm text-muted" }, bl = { class: "overflow-x-auto" }, xl = { class: "w-full table-auto" }, Sl = { class: "bg-surface text-xs tracking-wider text-muted uppercase" }, Cl = { class: "px-4 py-2 text-left font-medium" }, wl = { class: "px-4 py-2 text-left font-medium" }, Tl = { class: "px-4 py-2 text-left font-medium" }, El = { class: "px-4 py-2 text-left font-medium" }, Dl = { class: "px-4 py-2 text-right font-medium" }, Ol = { class: "px-4 py-2 text-right font-medium" }, kl = { class: "divide-y divide-line-default bg-surface text-sm" }, Al = { class: "pl-4" }, jl = ["checked", "onChange"], Ml = { class: "px-4 py-2 whitespace-nowrap text-muted" }, Nl = { class: "px-4 py-2" }, Pl = { class: "text-heading" }, Fl = { class: "block text-xs text-subtle" }, Il = { class: "px-4 py-2 text-muted" }, Ll = { class: "px-4 py-2 text-muted" }, Rl = { class: "px-4 py-2 text-right whitespace-nowrap text-muted" }, zl = { class: "px-4 py-2 text-right whitespace-nowrap text-heading" }, Bl = { class: "mt-5 flex flex-wrap items-center justify-between gap-4" }, Vl = { class: "text-sm font-medium text-heading" }, Hl = { class: "flex items-center gap-3" }, Ul = {
	key: 3,
	class: "mt-6"
}, Wl = { class: "text-base font-semibold text-heading" }, Gl = {
	key: 0,
	class: "flex justify-center py-16"
}, Kl = {
	key: 0,
	class: "mt-4 rounded-lg border border-status-red bg-surface px-4 py-3 text-sm text-status-red"
}, ql = { class: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Jl = {
	key: 0,
	class: "mt-1 block text-xs text-subtle"
}, Yl = { class: "mt-1 block text-xs text-subtle" }, Xl = { class: "mt-5 overflow-hidden rounded-xl border border-line-default" }, Zl = { class: "overflow-x-auto" }, Ql = { class: "w-full table-auto" }, $l = { class: "bg-surface-secondary text-xs tracking-wider text-muted uppercase" }, eu = { class: "px-4 py-2 text-left font-medium" }, tu = { class: "px-4 py-2 text-right font-medium" }, nu = { class: "px-4 py-2 text-right font-medium" }, ru = { class: "px-4 py-2 text-right font-medium" }, iu = { class: "divide-y divide-line-default bg-surface text-sm" }, au = { class: "px-4 py-3" }, ou = { class: "font-medium text-heading" }, su = {
	key: 0,
	class: "mt-1 block text-xs whitespace-pre-line text-subtle"
}, cu = { class: "px-4 py-3 text-right whitespace-nowrap text-muted" }, lu = { class: "px-4 py-3 text-right whitespace-nowrap text-muted" }, uu = { class: "px-4 py-3 text-right whitespace-nowrap font-medium text-heading" }, du = { class: "bg-surface-secondary text-sm" }, fu = {
	class: "px-4 py-2 text-right text-muted",
	colspan: "3"
}, pu = { class: "px-4 py-2 text-right whitespace-nowrap text-heading" }, mu = {
	class: "px-4 py-2 text-right font-semibold text-heading",
	colspan: "3"
}, hu = { class: "px-4 py-2 text-right whitespace-nowrap font-semibold text-heading" }, gu = { class: "mt-5 flex items-center justify-end gap-3" }, _u = {
	key: 4,
	class: "mt-6"
}, vu = {
	key: 0,
	class: "flex flex-col items-center gap-3 py-16"
}, yu = { class: "text-sm text-muted" }, bu = {
	key: 0,
	class: "rounded-xl border border-status-yellow bg-surface p-5"
}, xu = { class: "text-sm font-semibold text-heading" }, Su = { class: "mt-1 text-sm text-muted" }, Cu = { class: "mt-4 flex flex-wrap items-center gap-3" }, wu = {
	key: 1,
	class: "rounded-xl border border-line-default bg-surface p-6 text-center"
}, Tu = { class: "mt-3 text-base font-semibold text-heading" }, Eu = { class: "mt-1 text-sm text-muted" }, Du = { class: "mt-3 text-2xl font-semibold text-heading" }, Ou = { class: "mt-5 flex flex-wrap items-center justify-center gap-3" }, ku = {
	key: 2,
	class: "flex justify-center py-16"
}, Au = "/admin/invoices", ju = /* @__PURE__ */ l({
	__name: "BillingPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = [
			"task",
			"project",
			"member",
			"summary"
		], d = de(), p = v(1), m = v(!0), C = v([]), w = v({}), D = _({
			from: "",
			to: ""
		}), O = v(null), k = v(null), A = v("task"), j = v([]), M = v(!1), N = v(null), P = v([]), F = v(null), I = v(!1), L = _({
			invoiceDate: "",
			dueDate: "",
			invoiceNumber: "",
			templateName: "",
			exchangeRate: ""
		}), R = v({}), z = v(!1), B = v(!1), V = v(null), H = v(null), ee = v(!1), ne = v(!1), re = n(() => [
			d("tasks_projects.billing.steps.customer"),
			d("tasks_projects.billing.steps.entries"),
			d("tasks_projects.billing.steps.preview"),
			d("tasks_projects.billing.steps.create")
		]), ie = n(() => u.map((e) => ({
			id: e,
			label: d(`tasks_projects.billing.entries.group_by.${e}`)
		}))), ae = n({
			get: () => ie.value.find((e) => e.id === A.value) ?? ie.value[0],
			set: (e) => {
				A.value = e.id;
			}
		}), le = n(() => P.value.map((e) => ({ name: e.name }))), ue = n({
			get: () => le.value.find((e) => e.name === L.templateName) ?? { name: L.templateName },
			set: (e) => {
				L.templateName = e.name;
			}
		}), fe = n(() => (k.value?.entries ?? []).filter((e) => e.currency_id === (O.value?.currency_id ?? null))), pe = n(() => {
			let e = {};
			for (let t of fe.value) e[t.id] = t;
			return e;
		}), me = n(() => (k.value?.groups[A.value] ?? []).filter((e) => e.currency_id === (O.value?.currency_id ?? null))), he = n(() => fe.value.length), ge = n(() => he.value > 0 && j.value.length === he.value), _e = n(() => j.value.reduce((e, t) => e + (pe.value[t]?.minutes ?? 0), 0)), ve = n(() => j.value.reduce((e, t) => e + (pe.value[t]?.amount ?? 0), 0)), ye = n(() => O.value === null ? null : je(O.value.customer_id, O.value.currency_id)), be = n(() => {
			let e = N.value?.currency?.id ?? null;
			return e === null || O.value === null ? !1 : Ae(O.value.customer_id) !== e;
		}), xe = n(() => N.value?.autoGenerateNumber !== !0 || R.value.invoice_number !== void 0), Se = n(() => {
			let e = {};
			return D.from !== "" && (e.from = D.from), D.to !== "" && (e.to = D.to), e;
		});
		T(() => [D.from, D.to], () => void Ee()), h(() => void Ce());
		async function Ce() {
			m.value = !0, await Promise.all([
				Te(),
				Ee(),
				De(),
				Oe()
			]), m.value = !1;
			let e = we();
			if (e !== null) {
				let t = C.value.find((t) => t.customer_id === e);
				t && await Fe(t);
			}
		}
		function we() {
			let e = l.router.currentRoute.value.query.customer_id, t = Array.isArray(e) ? e[0] : e ?? new URLSearchParams(window.location.search).get("customer_id"), n = Number(t);
			return Number.isInteger(n) && n > 0 ? n : null;
		}
		async function Te() {
			try {
				N.value = await Jc(l.client);
			} catch {
				N.value = null;
			}
		}
		async function Ee() {
			try {
				C.value = await zc(l.client, Se.value);
			} catch (e) {
				C.value = [], l.notify("error", U(e, d("tasks_projects.billing.customer.load_failed")));
			}
		}
		async function De() {
			try {
				let e = {};
				for (let t of await Uc(l.client)) e[t.id] = t;
				w.value = e;
			} catch {
				w.value = {};
			}
		}
		async function Oe() {
			try {
				P.value = await Gc(l.client);
			} catch (e) {
				P.value = [], l.notify("error", U(e, d("tasks_projects.billing.preview.templates_failed")));
			}
		}
		function ke(e) {
			let t = w.value[e], n = t?.display_name ?? t?.name;
			return n && n !== "" ? n : d("tasks_projects.billing.customer.unnamed", { id: e });
		}
		function Ae(e) {
			let t = w.value[e];
			return t?.currency_id ?? t?.currency?.id ?? null;
		}
		function je(e, t) {
			if (t === null) return null;
			let n = w.value[e];
			if (n?.currency && n.currency.id === t) return n.currency;
			let r = N.value?.currency ?? null;
			return r !== null && r.id === t ? r : null;
		}
		function Me() {
			D.from = "", D.to = "";
		}
		function Ne(e) {
			D.from = e ? se(e) : "";
		}
		function Pe(e) {
			D.to = e ? se(e) : "";
		}
		async function Fe(e) {
			O.value = e, p.value = 2, M.value = !0, k.value = null, j.value = [];
			try {
				k.value = await Bc(l.client, e.customer_id, Se.value), j.value = fe.value.map((e) => e.id);
			} catch (e) {
				l.notify("error", U(e, d("tasks_projects.billing.entries.load_failed")));
			} finally {
				M.value = !1;
			}
		}
		function Ie(e) {
			return j.value.includes(e);
		}
		function Le(e) {
			j.value = Ie(e) ? j.value.filter((t) => t !== e) : [...j.value, e];
		}
		function Re() {
			j.value = ge.value ? [] : fe.value.map((e) => e.id);
		}
		function ze(e) {
			return e.entry_ids.length > 0 && e.entry_ids.every((e) => Ie(e));
		}
		function Be(e) {
			if (ze(e)) {
				j.value = j.value.filter((t) => !e.entry_ids.includes(t));
				return;
			}
			let t = e.entry_ids.filter((e) => !Ie(e));
			j.value = [...j.value, ...t];
		}
		function Ve(e) {
			return e.entry_ids.map((e) => pe.value[e]).filter((e) => e !== void 0);
		}
		async function He() {
			if (j.value.length === 0) {
				l.notify("warning", d("tasks_projects.billing.entries.none_selected"));
				return;
			}
			p.value = 3, I.value = !0, F.value = null, R.value = {}, z.value = !1;
			try {
				let e = await Vc(l.client, j.value, A.value);
				F.value = e, await Ue(e);
			} catch (e) {
				l.notify("error", U(e, d("tasks_projects.billing.preview.prepare_failed"))), p.value = 2;
			} finally {
				I.value = !1;
			}
		}
		async function Ue(e) {
			L.invoiceDate = e.invoice_date, L.dueDate = We(e.invoice_date), L.templateName = N.value?.defaultTemplate ?? P.value[0]?.name ?? "";
			let [t, n] = await Promise.all([Kc(l.client, e.customer_id).catch(() => null), be.value && O.value?.currency_id ? qc(l.client, O.value.currency_id).catch(() => null) : Promise.resolve(null)]);
			L.invoiceNumber = t ?? "", t === null && l.notify("warning", d("tasks_projects.billing.preview.number_failed")), be.value ? (L.exchangeRate = n === null ? "" : String(n), n === null && l.notify("warning", d("tasks_projects.billing.preview.rate_failed"))) : L.exchangeRate = "";
		}
		function We(e) {
			let t = N.value;
			if (t === null || !t.setDueDateAutomatically) return "";
			let n = /* @__PURE__ */ new Date(`${e}T00:00:00`);
			return Number.isNaN(n.getTime()) ? "" : (n.setDate(n.getDate() + t.dueDateDays), se(n));
		}
		function Ge(e) {
			L.invoiceDate = e ? se(e) : "", L.dueDate = We(L.invoiceDate);
		}
		function Ke(e) {
			L.dueDate = e ? se(e) : "";
		}
		function qe(e) {
			return {
				invoice_date: L.invoiceDate,
				due_date: L.dueDate === "" ? null : L.dueDate,
				customer_id: e.customer_id,
				invoice_number: L.invoiceNumber,
				currency_id: Ae(e.customer_id) ?? e.currency_id,
				exchange_rate: be.value && L.exchangeRate !== "" ? Number(L.exchangeRate) : null,
				discount: e.discount,
				discount_type: e.discount_type,
				discount_val: e.discount_val,
				tax: e.tax,
				sub_total: e.sub_total,
				total: e.total,
				tax_included: !1,
				notes: e.notes,
				template_name: L.templateName,
				items: e.items.map((e) => ({ ...e })),
				taxes: []
			};
		}
		async function Je() {
			let e = F.value;
			if (!(e === null || B.value)) {
				p.value = 4, B.value = !0, R.value = {}, z.value = !1, V.value = null, H.value = null, ee.value = !1;
				try {
					let t = await Wc(l.client, qe(e));
					V.value = t, await Ye(t, e);
				} catch (e) {
					gt(e) === 422 ? (R.value = te(e), z.value = !0, p.value = 3, l.notify("error", U(e, d("tasks_projects.billing.preview.invalid")))) : (p.value = 3, l.notify("error", U(e, d("tasks_projects.billing.create.failed"))));
				} finally {
					B.value = !1;
				}
			}
		}
		async function Ye(e, t) {
			let n = e.items ?? [], r = [];
			if (t.groups.forEach((e, t) => {
				let i = n[t];
				i && r.push({
					invoice_item_id: i.id,
					entry_ids: e.entry_ids
				});
			}), r.length === 0) {
				ee.value = !0;
				return;
			}
			ne.value = !0;
			try {
				H.value = await Hc(l.client, e.id, r), ee.value = !1;
			} catch (e) {
				ee.value = !0, l.notify("error", U(e, d("tasks_projects.billing.create.stamp_failed_title")));
			} finally {
				ne.value = !1;
			}
		}
		async function Xe() {
			let e = V.value, t = F.value;
			e === null || t === null || ne.value || (await Ye(e, t), ee.value || l.notify("success", d("tasks_projects.billing.create.stamped")));
		}
		async function Ze() {
			p.value = 1, O.value = null, k.value = null, F.value = null, V.value = null, H.value = null, ee.value = !1, j.value = [], R.value = {}, z.value = !1, await Ee();
		}
		function Qe(e) {
			return p.value > e ? "border-primary-500 bg-primary-500 text-white" : p.value === e ? "border-primary-500 text-primary-500" : "border-line-default text-subtle";
		}
		return (t, n) => {
			let l = b("BaseBreadcrumbItem"), u = b("BaseBreadcrumb"), h = b("BaseIcon"), _ = b("BaseButton"), v = b("router-link"), w = b("BasePageHeader"), T = b("BaseSpinner"), k = b("BaseDatePicker"), A = b("BaseInputGroup"), N = b("BaseFormatMoney"), P = b("BaseEmptyPlaceholder"), U = b("BaseSelectInput"), te = b("BaseInput"), se = b("BasePage");
			return g(), r(se, null, {
				default: E(() => [
					c(w, { title: S(d)("tasks_projects.billing.title") }, {
						actions: E(() => [o("div", Yc, [c(v, { to: "/admin/modules/tasks-projects/time" }, {
							default: E(() => [c(_, { variant: "white" }, {
								left: E((e) => [c(h, {
									name: "ClockIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(d)("tasks_projects.time.title")), 1)]),
								_: 1
							})]),
							_: 1
						})])]),
						default: E(() => [c(u, null, {
							default: E(() => [
								c(l, {
									title: S(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(l, {
									title: S(d)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								c(l, {
									title: S(d)("tasks_projects.billing.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					o("ol", Xc, [(g(!0), a(e, null, y(re.value, (e, t) => (g(), a("li", {
						key: e,
						class: "flex items-center gap-2"
					}, [o("span", { class: f(["flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold", Qe(t + 1)]) }, x(t + 1), 3), o("span", { class: f(["text-sm font-medium", p.value === t + 1 ? "text-heading" : "text-muted"]) }, x(e), 3)]))), 128))]),
					m.value ? (g(), a("div", Zc, [c(T, { class: "h-8 w-8 text-primary-500" })])) : p.value === 1 ? (g(), a("section", Qc, [
						o("h2", $c, x(S(d)("tasks_projects.billing.customer.title")), 1),
						o("p", el, x(S(d)("tasks_projects.billing.customer.description")), 1),
						o("div", tl, [
							c(A, {
								label: S(d)("tasks_projects.billing.customer.from"),
								class: "w-full sm:w-48"
							}, {
								default: E(() => [c(k, {
									"model-value": D.from,
									"onUpdate:modelValue": Ne
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label"]),
							c(A, {
								label: S(d)("tasks_projects.billing.customer.to"),
								class: "w-full sm:w-48"
							}, {
								default: E(() => [c(k, {
									"model-value": D.to,
									"onUpdate:modelValue": Pe
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label"]),
							D.from !== "" || D.to !== "" ? (g(), r(_, {
								key: 0,
								variant: "primary-outline",
								onClick: Me
							}, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.customer.clear_range")), 1)]),
								_: 1
							})) : i("", !0)
						]),
						C.value.length > 0 ? (g(), a("div", nl, [(g(!0), a(e, null, y(C.value, (e) => (g(), a("button", {
							key: `${e.customer_id}-${e.currency_id ?? "none"}`,
							type: "button",
							class: "rounded-xl border border-line-default bg-surface p-5 text-left transition hover:border-primary-500",
							onClick: (t) => Fe(e)
						}, [
							o("p", il, x(ke(e.customer_id)), 1),
							o("p", al, x(S(d)("tasks_projects.billing.customer.entries", { count: e.entries })) + " · " + x(S(ce)(e.minutes)), 1),
							o("p", ol, [c(N, {
								amount: e.amount,
								currency: je(e.customer_id, e.currency_id)
							}, null, 8, ["amount", "currency"])])
						], 8, rl))), 128))])) : (g(), r(P, {
							key: 1,
							title: S(d)("tasks_projects.billing.customer.empty_title"),
							description: S(d)("tasks_projects.billing.customer.empty_description")
						}, {
							default: E(() => [c(h, {
								name: "BanknotesIcon",
								class: "mt-5 mb-4 h-16 w-16 text-subtle"
							})]),
							_: 1
						}, 8, ["title", "description"]))
					])) : p.value === 2 ? (g(), a("section", sl, [o("div", cl, [o("div", null, [o("h2", ll, x(S(d)("tasks_projects.billing.entries.title")), 1), o("p", ul, x(O.value ? ke(O.value.customer_id) : ""), 1)]), c(A, {
						label: S(d)("tasks_projects.billing.entries.grouping"),
						class: "w-full sm:w-56"
					}, {
						default: E(() => [c(U, {
							modelValue: ae.value,
							"onUpdate:modelValue": n[0] ||= (e) => ae.value = e,
							options: ie.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])]), M.value ? (g(), a("div", dl, [c(T, { class: "h-8 w-8 text-primary-500" })])) : he.value > 0 ? (g(), a(e, { key: 1 }, [
						o("div", fl, [o("label", pl, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: ge.value,
							onChange: Re
						}, null, 40, ml), s(" " + x(S(d)("tasks_projects.billing.entries.select_all")), 1)]), o("p", hl, x(S(d)("tasks_projects.billing.entries.selected", {
							count: j.value.length,
							total: he.value
						})), 1)]),
						(g(!0), a(e, null, y(me.value, (t) => (g(), a("div", {
							key: `${t.label}-${t.key ?? "none"}-${t.currency_id ?? "none"}`,
							class: "mt-4 overflow-hidden rounded-xl border border-line-default"
						}, [o("div", gl, [o("label", _l, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: ze(t),
							onChange: (e) => Be(t)
						}, null, 40, vl), s(" " + x(t.label), 1)]), o("p", yl, [s(x(S(ce)(t.minutes)) + " · ", 1), c(N, {
							amount: t.amount,
							currency: ye.value
						}, null, 8, ["amount", "currency"])])]), o("div", bl, [o("table", xl, [o("thead", Sl, [o("tr", null, [
							n[6] ||= o("th", { class: "w-10" }, null, -1),
							o("th", Cl, x(S(d)("tasks_projects.billing.entries.columns.date")), 1),
							o("th", wl, x(S(d)("tasks_projects.billing.entries.columns.task")), 1),
							o("th", Tl, x(S(d)("tasks_projects.billing.entries.columns.project")), 1),
							o("th", El, x(S(d)("tasks_projects.billing.entries.columns.member")), 1),
							o("th", Dl, x(S(d)("tasks_projects.billing.entries.columns.duration")), 1),
							o("th", Ol, x(S(d)("tasks_projects.billing.entries.columns.amount")), 1)
						])]), o("tbody", kl, [(g(!0), a(e, null, y(Ve(t), (e) => (g(), a("tr", { key: e.id }, [
							o("td", Al, [o("input", {
								type: "checkbox",
								class: "h-4 w-4 cursor-pointer rounded border-line-strong",
								checked: Ie(e.id),
								onChange: (t) => Le(e.id)
							}, null, 40, jl)]),
							o("td", Ml, x(S(oe)(e.date)), 1),
							o("td", Nl, [o("span", Pl, x(e.task_name), 1), o("span", Fl, x(e.description || S(d)("tasks_projects.billing.entries.no_description")), 1)]),
							o("td", Il, x(e.project_name ?? "-"), 1),
							o("td", Ll, x(e.user_name), 1),
							o("td", Rl, x(S(ce)(e.minutes)), 1),
							o("td", zl, [c(N, {
								amount: e.amount,
								currency: ye.value
							}, null, 8, ["amount", "currency"])])
						]))), 128))])])])]))), 128)),
						o("div", Bl, [o("p", Vl, [s(x(S(d)("tasks_projects.billing.entries.selected_total", { hours: S(ce)(_e.value) })) + " · ", 1), c(N, {
							amount: ve.value,
							currency: ye.value
						}, null, 8, ["amount", "currency"])]), o("div", Hl, [c(_, {
							variant: "primary-outline",
							onClick: Ze
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}), c(_, {
							variant: "primary",
							disabled: j.value.length === 0,
							onClick: He
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.next")), 1)]),
							_: 1
						}, 8, ["disabled"])])])
					], 64)) : (g(), r(P, {
						key: 2,
						title: S(d)("tasks_projects.billing.entries.empty_title"),
						description: S(d)("tasks_projects.billing.entries.empty_description")
					}, {
						actions: E(() => [c(_, {
							variant: "primary",
							onClick: Ze
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						})]),
						default: E(() => [c(h, {
							name: "ClockIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]))])) : p.value === 3 ? (g(), a("section", Ul, [o("h2", Wl, x(S(d)("tasks_projects.billing.preview.title")), 1), I.value || F.value === null ? (g(), a("div", Gl, [c(T, { class: "h-8 w-8 text-primary-500" })])) : (g(), a(e, { key: 1 }, [
						z.value ? (g(), a("div", Kl, x(S(d)("tasks_projects.billing.preview.invalid")), 1)) : i("", !0),
						o("div", ql, [
							c(A, {
								label: S(d)("tasks_projects.billing.preview.invoice_date"),
								error: R.value.invoice_date,
								required: ""
							}, {
								default: E(() => [c(k, {
									"model-value": L.invoiceDate,
									"onUpdate:modelValue": Ge
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(A, {
								label: S(d)("tasks_projects.billing.preview.due_date"),
								error: R.value.due_date
							}, {
								default: E(() => [c(k, {
									"model-value": L.dueDate,
									"onUpdate:modelValue": Ke
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(A, {
								label: S(d)("tasks_projects.billing.preview.invoice_number"),
								error: R.value.invoice_number,
								required: ""
							}, {
								default: E(() => [c(te, {
									modelValue: L.invoiceNumber,
									"onUpdate:modelValue": n[1] ||= (e) => L.invoiceNumber = e,
									type: "text",
									name: "invoice_number",
									disabled: !xe.value
								}, null, 8, ["modelValue", "disabled"]), xe.value ? i("", !0) : (g(), a("span", Jl, x(S(d)("tasks_projects.billing.preview.invoice_number_auto")), 1))]),
								_: 1
							}, 8, ["label", "error"]),
							c(A, {
								label: S(d)("tasks_projects.billing.preview.template"),
								error: R.value.template_name,
								required: ""
							}, {
								default: E(() => [c(U, {
									modelValue: ue.value,
									"onUpdate:modelValue": n[2] ||= (e) => ue.value = e,
									options: le.value,
									"label-key": "name"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							be.value ? (g(), r(A, {
								key: 0,
								label: S(d)("tasks_projects.billing.preview.exchange_rate"),
								error: R.value.exchange_rate,
								required: ""
							}, {
								default: E(() => [c(te, {
									modelValue: L.exchangeRate,
									"onUpdate:modelValue": n[3] ||= (e) => L.exchangeRate = e,
									type: "text",
									name: "exchange_rate"
								}, null, 8, ["modelValue"]), o("span", Yl, x(S(d)("tasks_projects.billing.preview.exchange_rate_help", { currency: ye.value?.code ?? "" })), 1)]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0)
						]),
						o("div", Xl, [o("div", Zl, [o("table", Ql, [
							o("thead", $l, [o("tr", null, [
								o("th", eu, x(S(d)("tasks_projects.billing.preview.columns.description")), 1),
								o("th", tu, x(S(d)("tasks_projects.billing.preview.columns.quantity")), 1),
								o("th", nu, x(S(d)("tasks_projects.billing.preview.columns.price")), 1),
								o("th", ru, x(S(d)("tasks_projects.billing.preview.columns.total")), 1)
							])]),
							o("tbody", iu, [(g(!0), a(e, null, y(F.value.items, (e, t) => (g(), a("tr", { key: `${e.name}-${t}` }, [
								o("td", au, [o("span", ou, x(e.name), 1), e.description ? (g(), a("span", su, x(e.description), 1)) : i("", !0)]),
								o("td", cu, x(e.quantity), 1),
								o("td", lu, [c(N, {
									amount: e.price,
									currency: ye.value
								}, null, 8, ["amount", "currency"])]),
								o("td", uu, [c(N, {
									amount: e.total,
									currency: ye.value
								}, null, 8, ["amount", "currency"])])
							]))), 128))]),
							o("tfoot", du, [o("tr", null, [o("td", fu, x(S(d)("tasks_projects.billing.preview.sub_total")), 1), o("td", pu, [c(N, {
								amount: F.value.sub_total,
								currency: ye.value
							}, null, 8, ["amount", "currency"])])]), o("tr", null, [o("td", mu, x(S(d)("tasks_projects.billing.preview.total")), 1), o("td", hu, [c(N, {
								amount: F.value.total,
								currency: ye.value
							}, null, 8, ["amount", "currency"])])])])
						])])]),
						o("div", gu, [c(_, {
							variant: "primary-outline",
							onClick: n[4] ||= (e) => p.value = 2
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}), c(_, {
							variant: "primary",
							loading: B.value,
							disabled: B.value,
							onClick: Je
						}, {
							left: E((e) => [B.value ? i("", !0) : (g(), r(h, {
								key: 0,
								name: "DocumentPlusIcon",
								class: f(e.class)
							}, null, 8, ["class"]))]),
							default: E(() => [s(" " + x(S(d)("tasks_projects.billing.preview.create")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])])
					], 64))])) : (g(), a("section", _u, [B.value || ne.value ? (g(), a("div", vu, [c(T, { class: "h-8 w-8 text-primary-500" }), o("p", yu, x(B.value ? S(d)("tasks_projects.billing.create.creating") : S(d)("tasks_projects.billing.create.stamping")), 1)])) : V.value ? (g(), a(e, { key: 1 }, [ee.value ? (g(), a("div", bu, [
						o("p", xu, x(S(d)("tasks_projects.billing.create.stamp_failed_title")), 1),
						o("p", Su, x(S(d)("tasks_projects.billing.create.stamp_failed_description", { number: V.value.invoice_number })), 1),
						o("div", Cu, [c(_, {
							variant: "primary",
							loading: ne.value,
							onClick: Xe
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.create.retry_stamp")), 1)]),
							_: 1
						}, 8, ["loading"]), c(v, { to: `${Au}/${V.value.id}/view` }, {
							default: E(() => [c(_, { variant: "white" }, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.create.view_invoice")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"])])
					])) : (g(), a("div", wu, [
						c(h, {
							name: "CheckCircleIcon",
							class: "mx-auto h-12 w-12 text-primary-500"
						}),
						o("p", Tu, x(S(d)("tasks_projects.billing.create.created_title", { number: V.value.invoice_number })), 1),
						o("p", Eu, x(S(d)("tasks_projects.billing.create.created_description", { count: H.value ?? 0 })), 1),
						o("p", Du, [c(N, {
							amount: V.value.total,
							currency: ye.value
						}, null, 8, ["amount", "currency"])]),
						o("div", Ou, [c(v, { to: `${Au}/${V.value.id}/view` }, {
							default: E(() => [c(_, { variant: "primary" }, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.create.view_invoice")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"]), c(_, {
							variant: "white",
							onClick: Ze
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.create.invoice_more")), 1)]),
							_: 1
						})])
					]))], 64)) : (g(), a("div", ku, [c(_, {
						variant: "primary-outline",
						onClick: n[5] ||= (e) => p.value = 3
					}, {
						default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
						_: 1
					})]))]))
				]),
				_: 1
			});
		};
	}
}), Mu = "tasks-projects";
function Nu(e) {
	e.addMessages(Fc), e.registerPage({
		id: "billing",
		module: Mu,
		path: "billing",
		component: jc(e, ju),
		meta: {
			ability: `${Mu}:invoice-tasks`,
			title: "tasks_projects.billing.title"
		}
	});
}
//#endregion
//#region resources/js/messages/reports.ts
var Pu = { en: { tasks_projects: { reports: {
	title: "Reports",
	load_failed: "Unable to load the report.",
	empty_title: "Nothing logged in this range",
	empty_description: "Pick a wider range, or log some time against a task.",
	range: {
		this_week: "This week",
		this_month: "This month",
		last_month: "Last month",
		this_quarter: "This quarter",
		this_year: "This year",
		custom: "Custom",
		from: "From",
		to: "To"
	},
	summary: {
		logged: "Logged",
		billable: "Billable",
		amount: "Amount",
		unbilled: "Unbilled",
		currency: "Currency #{id}",
		base_currency: "Company currency"
	},
	split: {
		title: "Billable against the rest",
		billable: "Billable",
		non_billable: "Not billable",
		nothing: "No time logged in this range."
	},
	tables: {
		by_project: "By project",
		by_member: "By member",
		by_customer: "By customer",
		project: "Project",
		member: "Member",
		customer: "Customer",
		no_project: "No project",
		no_customer: "Internal",
		unknown_member: "Removed member",
		currency: "Currency",
		logged: "Logged",
		billable: "Billable",
		amount: "Amount",
		unbilled: "Unbilled"
	}
} } } }, Fu = { summary: `${j}/reports/summary` };
async function Iu(e, t) {
	let { data: n } = await e.get(Fu.summary, { params: t });
	return Lu(n?.data, t);
}
function Lu(e, t) {
	let n = Bu(e) ? e : {};
	return {
		from: Uu(n.from, t.from ?? ""),
		to: Uu(n.to, t.to ?? ""),
		totals: zu(n.totals).map(Ru),
		by_project: zu(n.by_project).map((e) => ({
			...Ru(e),
			project_id: Hu(e.project_id),
			label: Uu(e.label, "")
		})),
		by_member: zu(n.by_member).map((e) => ({
			...Ru(e),
			user_id: Hu(e.user_id),
			label: Uu(e.label, "")
		})),
		by_customer: zu(n.by_customer).map((e) => ({
			...Ru(e),
			customer_id: Hu(e.customer_id)
		})),
		by_billable: zu(n.by_billable).map((e) => ({
			...Ru(e),
			billable: e.billable === !0
		}))
	};
}
function Ru(e) {
	return {
		currency_id: Hu(e.currency_id),
		minutes: Vu(e.minutes),
		amount: Vu(e.amount),
		billable_minutes: Vu(e.billable_minutes),
		billable_amount: Vu(e.billable_amount),
		unbilled_amount: Vu(e.unbilled_amount)
	};
}
function zu(e) {
	return Array.isArray(e) ? e.filter(Bu) : [];
}
function Bu(e) {
	return typeof e == "object" && !!e;
}
function Vu(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function Hu(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function Uu(e, t) {
	return typeof e == "string" && e.trim() !== "" ? e : t;
}
//#endregion
//#region resources/js/components/ReportBreakdownTable.vue?vue&type=script&setup=true&lang.ts
var Wu = { class: "mt-6" }, Gu = { class: "text-sm font-semibold tracking-wider text-muted uppercase" }, Ku = { class: "relative table-container" }, qu = {
	key: 0,
	class: "text-subtle"
}, Ju = { key: 1 }, Yu = /* @__PURE__ */ l({
	__name: "ReportBreakdownTable",
	props: {
		title: {},
		labelHeading: {},
		rows: {},
		showCurrency: { type: Boolean }
	},
	setup(e) {
		let t = e, i = de(), l = n(() => [
			{
				key: "label",
				label: t.labelHeading,
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			...t.showCurrency ? [{
				key: "currency_id",
				label: i("tasks_projects.reports.tables.currency")
			}] : [],
			{
				key: "minutes",
				label: i("tasks_projects.reports.tables.logged"),
				dataType: "numeric"
			},
			{
				key: "billable_minutes",
				label: i("tasks_projects.reports.tables.billable"),
				dataType: "numeric"
			},
			{
				key: "amount",
				label: i("tasks_projects.reports.tables.amount"),
				dataType: "numeric"
			},
			{
				key: "unbilled_amount",
				label: i("tasks_projects.reports.tables.unbilled"),
				dataType: "numeric"
			}
		]), u = n(() => t.showCurrency ? "currency" : "plain");
		return (t, n) => {
			let i = b("BaseFormatMoney"), d = b("BaseTable");
			return g(), a("section", Wu, [o("h3", Gu, x(e.title), 1), o("div", Ku, [(g(), r(d, {
				key: u.value,
				data: e.rows,
				columns: l.value,
				class: "mt-2"
			}, {
				"cell-currency_id": E(({ row: e }) => [e.data.currency_id === null ? (g(), a("span", qu, "-")) : (g(), a("span", Ju, "#" + x(e.data.currency_id), 1))]),
				"cell-minutes": E(({ row: e }) => [s(x(S(Ct)(e.data.minutes)), 1)]),
				"cell-billable_minutes": E(({ row: e }) => [s(x(S(Ct)(e.data.billable_minutes)), 1)]),
				"cell-amount": E(({ row: e }) => [c(i, { amount: e.data.amount }, null, 8, ["amount"])]),
				"cell-unbilled_amount": E(({ row: e }) => [c(i, { amount: e.data.unbilled_amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["data", "columns"]))])]);
		};
	}
}), Xu = 3;
function Zu(e, t, n = /* @__PURE__ */ new Date()) {
	let r = n.getFullYear(), i = n.getMonth();
	switch (e) {
		case "THIS_WEEK": {
			let e = kt(n, t);
			return $u(e, jt(e, 6));
		}
		case "LAST_MONTH": return $u(new Date(r, i - 1, 1), new Date(r, i, 0));
		case "THIS_QUARTER": {
			let e = Math.floor(i / Xu) * Xu;
			return $u(new Date(r, e, 1), new Date(r, e + Xu, 0));
		}
		case "THIS_YEAR": return $u(new Date(r, 0, 1), new Date(r, 12, 0));
		default: return $u(new Date(r, i, 1), new Date(r, i + 1, 0));
	}
}
function Qu(e, t) {
	return t <= 0 ? 0 : Math.min(100, Math.max(0, Math.round(e / t * 100)));
}
function $u(e, t) {
	return {
		from: Mt(e),
		to: Mt(t)
	};
}
//#endregion
//#region resources/js/pages/ReportsPage.vue?vue&type=script&setup=true&lang.ts
var ed = {
	key: 0,
	class: "mt-2 text-sm text-muted"
}, td = { class: "flex items-center justify-end space-x-5" }, nd = { class: "mt-4 flex flex-wrap gap-2" }, rd = ["onClick"], id = {
	key: 0,
	class: "flex justify-center py-16"
}, ad = {
	key: 0,
	class: "text-xs font-medium tracking-wider text-muted uppercase"
}, od = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, sd = { class: "mt-1 text-2xl font-semibold text-heading" }, cd = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ld = { class: "mt-1 text-2xl font-semibold text-heading" }, ud = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, dd = { class: "mt-1 text-2xl font-semibold text-heading" }, fd = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, pd = { class: "mt-1 text-2xl font-semibold text-heading" }, md = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, hd = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, gd = { class: "mt-3 flex h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, _d = { class: "mt-3 flex flex-wrap gap-6 text-sm" }, vd = { class: "inline-flex items-center text-body" }, yd = { class: "ml-1 font-medium text-heading" }, bd = { class: "ml-1 text-muted" }, xd = { class: "inline-flex items-center text-body" }, Sd = { class: "ml-1 font-medium text-heading" }, Cd = { class: "ml-1 text-muted" }, wd = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Td = "THIS_MONTH", Ed = /* @__PURE__ */ l({
	__name: "ReportsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = de(), d = v(null), m = v([]), _ = v(!0), C = v(Td), w = v(""), T = v(""), D = n(() => [
			{
				id: "THIS_WEEK",
				label: u("tasks_projects.reports.range.this_week")
			},
			{
				id: "THIS_MONTH",
				label: u("tasks_projects.reports.range.this_month")
			},
			{
				id: "LAST_MONTH",
				label: u("tasks_projects.reports.range.last_month")
			},
			{
				id: "THIS_QUARTER",
				label: u("tasks_projects.reports.range.this_quarter")
			},
			{
				id: "THIS_YEAR",
				label: u("tasks_projects.reports.range.this_year")
			},
			{
				id: "CUSTOM",
				label: u("tasks_projects.reports.range.custom")
			}
		]), O = n(() => d.value?.totals ?? []), k = n(() => new Set(O.value.map((e) => e.currency_id)).size > 1), A = n(() => O.value.length > 0), j = n(() => (d.value?.by_project ?? []).map((e) => ({
			...e,
			id: `${e.project_id ?? "none"}-${e.currency_id ?? "base"}`,
			label: e.project_id === null ? u("tasks_projects.reports.tables.no_project") : e.label || `#${e.project_id}`
		}))), M = n(() => (d.value?.by_member ?? []).map((e) => ({
			...e,
			id: `${e.user_id ?? "none"}-${e.currency_id ?? "base"}`,
			label: ne(e)
		}))), N = n(() => (d.value?.by_customer ?? []).map((e) => ({
			...e,
			id: `${e.customer_id ?? "none"}-${e.currency_id ?? "base"}`,
			label: e.customer_id === null ? u("tasks_projects.reports.tables.no_customer") : xe(e.customer_id)
		}))), P = n(() => re(!0)), F = n(() => re(!1)), I = n(() => P.value + F.value), L = n(() => Qu(P.value, I.value));
		h(() => {
			R(Td), te();
		});
		function R(e) {
			if (C.value = e, e !== "CUSTOM") {
				let t = Zu(e, fr.settings.week_start);
				w.value = t.from, T.value = t.to;
			}
			H();
		}
		function z(e) {
			w.value = e ? se(e) : "", C.value = "CUSTOM", H();
		}
		function B(e) {
			T.value = e ? se(e) : "", C.value = "CUSTOM", H();
		}
		async function H() {
			_.value = !0;
			try {
				let e = await Iu(l.client, ee());
				d.value = e, e.by_customer.some((e) => e.customer_id !== null) && Se(l.client);
			} catch (e) {
				d.value = null, l.notify("error", U(e, u("tasks_projects.reports.load_failed")));
			} finally {
				_.value = !1;
			}
		}
		function ee() {
			let e = {};
			return w.value !== "" && (e.from = w.value), T.value !== "" && (e.to = T.value), e;
		}
		async function te() {
			try {
				m.value = await V(l.client);
			} catch {}
		}
		function ne(e) {
			let t = m.value.find((t) => t.id === e.user_id)?.name ?? "";
			return t === "" ? e.label === "" ? e.user_id === null ? u("tasks_projects.reports.tables.unknown_member") : `#${e.user_id}` : e.label : t;
		}
		function re(e) {
			return (d.value?.by_billable ?? []).filter((t) => t.billable === e).reduce((e, t) => e + t.minutes, 0);
		}
		function ie(e) {
			return e === null ? u("tasks_projects.reports.summary.base_currency") : u("tasks_projects.reports.summary.currency", { id: e });
		}
		function ae(e) {
			return C.value === e.id ? "border-primary-500 bg-primary-50 text-primary-500" : "border-line-default bg-surface text-muted hover:text-heading";
		}
		function ce() {
			R(Td);
		}
		return (t, n) => {
			let l = b("BaseBreadcrumbItem"), m = b("BaseBreadcrumb"), h = b("BaseIcon"), v = b("BaseButton"), C = b("router-link"), V = b("BasePageHeader"), H = b("BaseDatePicker"), ee = b("BaseInputGroup"), U = b("BaseFilterWrapper"), te = b("BaseSpinner"), ne = b("BaseEmptyPlaceholder"), re = b("BaseFormatMoney"), se = b("BasePage");
			return g(), r(se, null, {
				default: E(() => [
					c(V, { title: S(u)("tasks_projects.reports.title") }, {
						actions: E(() => [o("div", td, [c(C, { to: "/admin/modules/tasks-projects" }, {
							default: E(() => [c(v, { variant: "white" }, {
								left: E((e) => [c(h, {
									name: "FolderIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(u)("tasks_projects.projects.title")), 1)]),
								_: 1
							})]),
							_: 1
						}), c(C, { to: "/admin/modules/tasks-projects/board" }, {
							default: E(() => [c(v, { variant: "white" }, {
								left: E((e) => [c(h, {
									name: "ViewColumnsIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(u)("tasks_projects.board.title")), 1)]),
								_: 1
							})]),
							_: 1
						})])]),
						default: E(() => [c(m, null, {
							default: E(() => [
								c(l, {
									title: S(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(l, {
									title: S(u)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								c(l, {
									title: S(u)("tasks_projects.reports.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), d.value ? (g(), a("p", ed, x(S(oe)(d.value.from)) + " – " + x(S(oe)(d.value.to)), 1)) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("div", nd, [(g(!0), a(e, null, y(D.value, (e) => (g(), a("button", {
						key: e.id,
						type: "button",
						class: f(["rounded-md border px-3 py-1.5 text-sm font-medium", ae(e)]),
						onClick: (t) => R(e.id)
					}, x(e.label), 11, rd))), 128))]),
					c(U, {
						show: !0,
						"row-on-xl": "",
						class: "mt-3",
						onClear: ce
					}, {
						default: E(() => [c(ee, {
							label: S(u)("tasks_projects.reports.range.from"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(H, {
								"model-value": w.value,
								"onUpdate:modelValue": z
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]), c(ee, {
							label: S(u)("tasks_projects.reports.range.to"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(H, {
								"model-value": T.value,
								"onUpdate:modelValue": B
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					_.value && d.value === null ? (g(), a("div", id, [c(te, { class: "h-8 w-8 text-primary-500" })])) : A.value ? (g(), a(e, { key: 2 }, [
						(g(!0), a(e, null, y(O.value, (e) => (g(), a("div", {
							key: e.currency_id ?? "base",
							class: "mt-4 rounded-xl border border-line-default bg-surface p-5"
						}, [k.value ? (g(), a("p", ad, x(ie(e.currency_id)), 1)) : i("", !0), o("div", { class: f(["grid grid-cols-2 gap-4 sm:grid-cols-4", k.value ? "mt-3" : ""]) }, [
							o("div", null, [o("p", od, x(S(u)("tasks_projects.reports.summary.logged")), 1), o("p", sd, x(S(Ct)(e.minutes)), 1)]),
							o("div", null, [o("p", cd, x(S(u)("tasks_projects.reports.summary.billable")), 1), o("p", ld, x(S(Ct)(e.billable_minutes)), 1)]),
							o("div", null, [o("p", ud, x(S(u)("tasks_projects.reports.summary.amount")), 1), o("p", dd, [c(re, { amount: e.amount }, null, 8, ["amount"])])]),
							o("div", null, [o("p", fd, x(S(u)("tasks_projects.reports.summary.unbilled")), 1), o("p", pd, [c(re, { amount: e.unbilled_amount }, null, 8, ["amount"])])])
						], 2)]))), 128)),
						o("section", md, [o("p", hd, x(S(u)("tasks_projects.reports.split.title")), 1), I.value > 0 ? (g(), a(e, { key: 0 }, [o("div", gd, [o("div", {
							class: "h-2 bg-primary-500",
							style: p({ width: `${L.value}%` })
						}, null, 4)]), o("div", _d, [o("span", vd, [
							n[0] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary-500" }, null, -1),
							s(" " + x(S(u)("tasks_projects.reports.split.billable")) + ": ", 1),
							o("span", yd, x(S(Ct)(P.value)), 1),
							o("span", bd, "(" + x(L.value) + "%)", 1)
						]), o("span", xd, [
							n[1] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-surface-tertiary" }, null, -1),
							s(" " + x(S(u)("tasks_projects.reports.split.non_billable")) + ": ", 1),
							o("span", Sd, x(S(Ct)(F.value)), 1),
							o("span", Cd, "(" + x(100 - L.value) + "%)", 1)
						])])], 64)) : (g(), a("p", wd, x(S(u)("tasks_projects.reports.split.nothing")), 1))]),
						c(Yu, {
							title: S(u)("tasks_projects.reports.tables.by_project"),
							"label-heading": S(u)("tasks_projects.reports.tables.project"),
							rows: j.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(Yu, {
							title: S(u)("tasks_projects.reports.tables.by_member"),
							"label-heading": S(u)("tasks_projects.reports.tables.member"),
							rows: M.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(Yu, {
							title: S(u)("tasks_projects.reports.tables.by_customer"),
							"label-heading": S(u)("tasks_projects.reports.tables.customer"),
							rows: N.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						])
					], 64)) : (g(), r(ne, {
						key: 1,
						title: S(u)("tasks_projects.reports.empty_title"),
						description: S(u)("tasks_projects.reports.empty_description")
					}, {
						default: E(() => [c(h, {
							name: "ChartBarIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]))
				]),
				_: 1
			});
		};
	}
}), Dd = "tasks-projects";
function Od(e) {
	e.addMessages(Pu), e.registerPage({
		id: "reports",
		module: Dd,
		path: "reports",
		component: jc(e, Ed),
		meta: {
			ability: `${Dd}:view-own-time`,
			title: "tasks_projects.reports.title"
		}
	}), e.on("company:changing", () => {
		Ce();
	});
}
//#endregion
//#region resources/js/init.ts
var kd = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(A), n.registerPage({
		id: "projects",
		module: kd,
		path: "",
		component: Ad(n, Le),
		meta: {
			ability: `${kd}:view-project`,
			title: "tasks_projects.projects.title"
		}
	}), ni(n), Pc(n), Nu(n), Od(n);
});
function Ad(e, t) {
	return l({ setup: (n, { attrs: r }) => () => d(t, {
		...r,
		client: e.client,
		notify: (t, n) => {
			e.notify(t, n);
		},
		router: e.router
	}) });
}
//#endregion
