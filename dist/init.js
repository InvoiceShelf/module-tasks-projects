const { Fragment: e, computed: t, createBlock: n, createCommentVNode: r, createElementBlock: i, createElementVNode: a, createTextVNode: o, createVNode: s, defineComponent: c, getCurrentInstance: l, h: u, normalizeClass: d, normalizeStyle: f, onBeforeUnmount: p, openBlock: m, reactive: h, ref: g, renderList: _, resolveComponent: v, toDisplayString: y, unref: b, vShow: x, watch: S, withCtx: C, withDirectives: w, withModifiers: T } = window.__invoiceshelf_vue;
//#region resources/js/messages.ts
var E = { en: { tasks_projects: {
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
} } }, D = "/api/v1/tasks-projects", O = {
	projects: `${D}/projects`,
	project: (e) => `${D}/projects/${e}`,
	archiveProject: (e) => `${D}/projects/${e}/archive`,
	unarchiveProject: (e) => `${D}/projects/${e}/unarchive`,
	members: `${D}/members`,
	settings: `${D}/settings`
}, k = { customers: "/api/v1/customers" };
async function A(e, t) {
	let { data: n } = await e.get(O.projects, { params: t });
	return n;
}
async function j(e, t) {
	let { data: n } = await e.post(O.projects, t);
	return n.data;
}
async function M(e, t, n) {
	let { data: r } = await e.put(O.project(t), n);
	return r.data;
}
async function N(e, t) {
	let { data: n } = await e.post(O.archiveProject(t));
	return n.data;
}
async function P(e, t) {
	let { data: n } = await e.post(O.unarchiveProject(t));
	return n.data;
}
async function F(e, t) {
	await e.delete(O.project(t));
}
async function I(e, t = 100) {
	let { data: n } = await e.get(k.customers, { params: { limit: t } });
	return n.data;
}
//#endregion
//#region resources/js/support/errors.ts
function L(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function R(e, t) {
	let n = L(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function z(e) {
	let t = L(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function B(e) {
	return e === null ? "" : String(e / 100);
}
function V(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function H(e) {
	return e === null ? "" : String(e / 60);
}
function U(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function W(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function G(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
//#endregion
//#region resources/js/support/i18n.ts
function K() {
	return l()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var q = { class: "flex w-full items-center justify-between" }, J = { class: "space-y-5 px-6 py-6" }, Y = { class: "flex flex-wrap items-center gap-2" }, X = ["aria-label", "onClick"], ee = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, te = /* @__PURE__ */ c({
	__name: "ProjectFormModal",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["close", "saved"],
	setup(r, { emit: c }) {
		let l = r, u = c, p = [
			"#2563eb",
			"#0891b2",
			"#059669",
			"#ca8a04",
			"#ea580c",
			"#dc2626",
			"#7c3aed",
			"#64748b"
		], x = K(), w = h({
			name: "",
			identifier: "",
			description: "",
			colour: "",
			defaultRate: "",
			budgetHours: "",
			dueDate: ""
		}), E = g(null), D = g([]), O = g(!1), k = g({}), A = g(!1), N = t(() => l.project !== null), P = t(() => N.value ? x("tasks_projects.projects.edit_project") : x("tasks_projects.projects.new_project"));
		S(() => l.show, (e) => {
			e && (F(), te());
		}, { immediate: !0 });
		function F() {
			let e = l.project;
			w.name = e?.name ?? "", w.identifier = e?.identifier ?? "", w.description = e?.description ?? "", w.colour = e?.colour ?? "", w.defaultRate = B(e?.default_rate ?? null), w.budgetHours = H(e?.budget_minutes ?? null), w.dueDate = e?.due_date ?? "", k.value = {}, E.value = L(e?.customer_id ?? null);
		}
		function L(e) {
			return e === null ? null : D.value.find((t) => t.id === e) ?? null;
		}
		function W(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function te() {
			if (!O.value) try {
				let e = await I(l.client);
				D.value = e.map((e) => ({
					id: e.id,
					label: W(e)
				})), O.value = !0, E.value = L(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", R(e, x("tasks_projects.projects.customers_failed")));
			}
		}
		function Z() {
			return {
				name: w.name.trim(),
				customer_id: E.value?.id ?? null,
				identifier: w.identifier.trim() || null,
				description: w.description.trim() || null,
				colour: w.colour || null,
				default_rate: V(w.defaultRate),
				budget_minutes: U(w.budgetHours),
				due_date: w.dueDate || null
			};
		}
		function ne(e) {
			w.dueDate = e ? G(e) : "";
		}
		async function re() {
			if (!A.value) {
				if (w.name.trim() === "") {
					k.value = { name: x("tasks_projects.projects.name_required") };
					return;
				}
				A.value = !0, k.value = {};
				try {
					let e = l.project, t = e ? await M(l.client, e.id, Z()) : await j(l.client, Z());
					u("saved", t);
				} catch (e) {
					k.value = z(e), l.notify("error", R(e, x("tasks_projects.projects.save_failed")));
				} finally {
					A.value = !1;
				}
			}
		}
		return (t, c) => {
			let l = v("BaseIcon"), h = v("BaseInput"), g = v("BaseInputGroup"), S = v("BaseSelectInput"), O = v("BaseDatePicker"), j = v("BaseInputGrid"), M = v("BaseTextarea"), F = v("BaseButton"), I = v("BaseModal");
			return m(), n(I, {
				show: r.show,
				onClose: c[9] ||= (e) => u("close")
			}, {
				header: C(() => [a("div", q, [a("span", null, y(P.value), 1), s(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: c[0] ||= (e) => u("close")
				})])]),
				default: C(() => [a("form", { onSubmit: T(re, ["prevent"]) }, [a("div", J, [
					s(j, null, {
						default: C(() => [
							s(g, {
								label: b(x)("tasks_projects.projects.fields.name"),
								error: k.value.name,
								required: ""
							}, {
								default: C(() => [s(h, {
									modelValue: w.name,
									"onUpdate:modelValue": c[1] ||= (e) => w.name = e,
									invalid: !!k.value.name,
									type: "text"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: b(x)("tasks_projects.projects.fields.identifier"),
								error: k.value.identifier,
								"help-text": b(x)("tasks_projects.projects.fields.identifier_help")
							}, {
								default: C(() => [s(h, {
									modelValue: w.identifier,
									"onUpdate:modelValue": c[2] ||= (e) => w.identifier = e,
									invalid: !!k.value.identifier,
									type: "text",
									maxlength: "32"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							]),
							s(g, {
								label: b(x)("tasks_projects.projects.fields.customer"),
								error: k.value.customer_id,
								"help-text": b(x)("tasks_projects.projects.fields.customer_help")
							}, {
								default: C(() => [s(S, {
									modelValue: E.value,
									"onUpdate:modelValue": c[3] ||= (e) => E.value = e,
									options: D.value,
									placeholder: b(x)("tasks_projects.projects.fields.customer_placeholder"),
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
							s(g, {
								label: b(x)("tasks_projects.projects.fields.due_date"),
								error: k.value.due_date
							}, {
								default: C(() => [s(O, {
									"model-value": w.dueDate,
									"onUpdate:modelValue": ne
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: b(x)("tasks_projects.projects.fields.default_rate"),
								error: k.value.default_rate,
								"help-text": b(x)("tasks_projects.projects.fields.default_rate_help")
							}, {
								default: C(() => [s(h, {
									modelValue: w.defaultRate,
									"onUpdate:modelValue": c[4] ||= (e) => w.defaultRate = e,
									invalid: !!k.value.default_rate,
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
							s(g, {
								label: b(x)("tasks_projects.projects.fields.budget_hours"),
								error: k.value.budget_minutes
							}, {
								default: C(() => [s(h, {
									modelValue: w.budgetHours,
									"onUpdate:modelValue": c[5] ||= (e) => w.budgetHours = e,
									invalid: !!k.value.budget_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"])
						]),
						_: 1
					}),
					s(g, {
						label: b(x)("tasks_projects.projects.fields.colour"),
						error: k.value.colour
					}, {
						default: C(() => [a("div", Y, [(m(), i(e, null, _(p, (e) => a("button", {
							key: e,
							type: "button",
							class: d(["h-7 w-7 rounded-full border-2 transition", w.colour === e ? "border-heading" : "border-line-default"]),
							style: f({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => w.colour = w.colour === e ? "" : e
						}, null, 14, X)), 64)), a("button", {
							type: "button",
							class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
							onClick: c[6] ||= (e) => w.colour = ""
						}, y(b(x)("tasks_projects.projects.fields.colour_none")), 1)])]),
						_: 1
					}, 8, ["label", "error"]),
					s(g, {
						label: b(x)("tasks_projects.projects.fields.description"),
						error: k.value.description
					}, {
						default: C(() => [s(M, {
							modelValue: w.description,
							"onUpdate:modelValue": c[7] ||= (e) => w.description = e,
							row: 3,
							invalid: !!k.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), a("div", ee, [s(F, {
					type: "button",
					variant: "primary-outline",
					onClick: c[8] ||= (e) => u("close")
				}, {
					default: C(() => [o(y(b(x)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), s(F, {
					type: "submit",
					variant: "primary",
					loading: A.value,
					disabled: A.value
				}, {
					default: C(() => [o(y(N.value ? b(x)("tasks_projects.general.update") : b(x)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), Z = { class: "flex items-center justify-end space-x-5" }, ne = { class: "relative table-container" }, re = { class: "flex items-center" }, ie = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, ae = { key: 0 }, oe = {
	key: 1,
	class: "text-subtle"
}, se = {
	key: 1,
	class: "text-subtle"
}, ce = { key: 0 }, le = {
	key: 1,
	class: "text-subtle"
}, Q = 10, ue = 350, de = /* @__PURE__ */ c({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let c = e, l = K(), u = g(null), _ = g(!1), T = g(!0), E = g(0), D = g(!1), O = g(null), k = g(null), j = h({
			search: "",
			status: "ACTIVE"
		}), M = t(() => [
			{
				id: "ACTIVE",
				label: l("tasks_projects.projects.status.active")
			},
			{
				id: "ARCHIVED",
				label: l("tasks_projects.projects.status.archived")
			},
			{
				id: "ALL",
				label: l("tasks_projects.projects.status.all")
			}
		]), I = t({
			get: () => M.value.find((e) => e.id === j.status) ?? M.value[0],
			set: (e) => {
				j.status = e.id;
			}
		}), L = t(() => [
			{
				key: "name",
				label: l("tasks_projects.projects.columns.name"),
				sortable: !1,
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: l("tasks_projects.projects.columns.status"),
				sortable: !1
			},
			{
				key: "customer",
				label: l("tasks_projects.projects.columns.customer"),
				sortable: !1
			},
			{
				key: "default_rate",
				label: l("tasks_projects.projects.columns.default_rate"),
				sortable: !1
			},
			{
				key: "due_date",
				label: l("tasks_projects.projects.columns.due_date"),
				sortable: !1
			},
			{
				key: "actions",
				label: l("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]), z = t(() => j.search.trim() !== "" || j.status !== "ACTIVE"), B = t(() => !T.value && E.value === 0 && !z.value), V;
		S(() => j.search, () => {
			clearTimeout(V), V = setTimeout(() => U(), ue);
		}), S(() => j.status, () => U()), p(() => clearTimeout(V));
		async function H({ page: e }) {
			let t = {
				page: e,
				limit: Q
			};
			j.status !== "ALL" && (t.status = j.status), j.search.trim() !== "" && (t.search = j.search.trim()), T.value = !0;
			try {
				let e = await A(c.client, t);
				return E.value = e.meta.total, {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return c.notify("error", R(e, l("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Q
					}
				};
			} finally {
				T.value = !1;
			}
		}
		function U(e = !1) {
			u.value?.refresh(e);
		}
		function G() {
			_.value && q(), _.value = !_.value;
		}
		function q() {
			j.search = "", j.status = "ACTIVE";
		}
		function J() {
			O.value = null, D.value = !0;
		}
		function Y(e) {
			O.value = e, D.value = !0;
		}
		function X(e) {
			let t = O.value ? l("tasks_projects.projects.updated", { name: e.name }) : l("tasks_projects.projects.created", { name: e.name });
			D.value = !1, O.value = null, c.notify("success", t), U();
		}
		async function ee(e) {
			k.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await P(c.client, e.id), c.notify("success", l("tasks_projects.projects.unarchived", { name: e.name }))) : (await N(c.client, e.id), c.notify("success", l("tasks_projects.projects.archived", { name: e.name }))), U(!0);
			} catch (e) {
				c.notify("error", R(e, l("tasks_projects.projects.save_failed")));
			} finally {
				k.value = null;
			}
		}
		async function de(e) {
			if (window.confirm(l("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				k.value = e.id;
				try {
					await F(c.client, e.id), c.notify("success", l("tasks_projects.projects.deleted", { name: e.name })), U(!0);
				} catch (e) {
					c.notify("error", R(e, l("tasks_projects.projects.delete_failed")));
				} finally {
					k.value = null;
				}
			}
		}
		function $(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function fe(e) {
			return l(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, c) => {
			let p = v("BaseBreadcrumbItem"), h = v("BaseBreadcrumb"), g = v("BaseIcon"), S = v("BaseButton"), T = v("BasePageHeader"), E = v("BaseInput"), A = v("BaseInputGroup"), N = v("BaseSelectInput"), P = v("BaseFilterWrapper"), F = v("BaseEmptyPlaceholder"), R = v("BaseBadge"), z = v("BaseFormatMoney"), V = v("BaseDropdownItem"), U = v("BaseDropdown"), K = v("BaseTable"), Q = v("BasePage");
			return m(), n(Q, null, {
				default: C(() => [
					s(T, { title: b(l)("tasks_projects.projects.title") }, {
						actions: C(() => [a("div", Z, [s(S, {
							variant: "primary-outline",
							onClick: G
						}, {
							right: C((e) => [_.value ? (m(), n(g, {
								key: 1,
								name: "XMarkIcon",
								class: d(e.class)
							}, null, 8, ["class"])) : (m(), n(g, {
								key: 0,
								name: "FunnelIcon",
								class: d(e.class)
							}, null, 8, ["class"]))]),
							default: C(() => [o(y(b(l)("tasks_projects.general.filter")) + " ", 1)]),
							_: 1
						}), s(S, {
							variant: "primary",
							onClick: J
						}, {
							left: C((e) => [s(g, {
								name: "PlusIcon",
								class: d(e.class)
							}, null, 8, ["class"])]),
							default: C(() => [o(" " + y(b(l)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})])]),
						default: C(() => [s(h, null, {
							default: C(() => [s(p, {
								title: b(l)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), s(p, {
								title: b(l)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					s(P, {
						show: _.value,
						class: "mt-3",
						onClear: q
					}, {
						default: C(() => [s(A, {
							label: b(l)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: C(() => [s(E, {
								modelValue: j.search,
								"onUpdate:modelValue": c[0] ||= (e) => j.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: b(l)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), s(A, {
							label: b(l)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: C(() => [s(N, {
								modelValue: I.value,
								"onUpdate:modelValue": c[1] ||= (e) => I.value = e,
								options: M.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					w(s(F, {
						title: b(l)("tasks_projects.projects.empty_title"),
						description: b(l)("tasks_projects.projects.empty_description")
					}, {
						actions: C(() => [s(S, {
							variant: "primary",
							onClick: J
						}, {
							left: C((e) => [s(g, {
								name: "PlusIcon",
								class: d(e.class)
							}, null, 8, ["class"])]),
							default: C(() => [o(" " + y(b(l)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})]),
						default: C(() => [s(g, {
							name: "FolderIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]), [[x, B.value]]),
					w(a("div", ne, [s(K, {
						ref_key: "tableRef",
						ref: u,
						data: H,
						columns: L.value,
						class: "mt-3"
					}, {
						"cell-name": C(({ row: e }) => [a("div", re, [a("span", {
							class: d(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: f(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), a("span", null, [o(y(e.data.name) + " ", 1), e.data.identifier ? (m(), i("span", ie, y(e.data.identifier), 1)) : r("", !0)])])]),
						"cell-status": C(({ row: e }) => [s(R, { class: d(["rounded-full", $(e.data.status)]) }, {
							default: C(() => [o(y(fe(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": C(({ row: e }) => [e.data.customer_id ? (m(), i("span", ae, "#" + y(e.data.customer_id), 1)) : (m(), i("span", oe, y(b(l)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": C(({ row: e }) => [e.data.default_rate === null ? (m(), i("span", se, "-")) : (m(), n(z, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": C(({ row: e }) => [e.data.due_date ? (m(), i("span", ce, y(b(W)(e.data.due_date)), 1)) : (m(), i("span", le, "-"))]),
						"cell-actions": C(({ row: e }) => [s(U, { "content-loading": k.value === e.data.id }, {
							activator: C(() => [s(g, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: C(() => [
								s(V, { onClick: (t) => Y(e.data) }, {
									default: C(() => [s(g, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), o(" " + y(b(l)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								s(V, { onClick: (t) => ee(e.data) }, {
									default: C(() => [s(g, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), o(" " + y(e.data.status === "ARCHIVED" ? b(l)("tasks_projects.projects.unarchive") : b(l)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								s(V, { onClick: (t) => de(e.data) }, {
									default: C(() => [s(g, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), o(" " + y(b(l)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[x, !B.value]]),
					s(te, {
						show: D.value,
						client: e.client,
						notify: e.notify,
						project: O.value,
						onClose: c[2] ||= (e) => D.value = !1,
						onSaved: X
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
}), $ = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(E), n.registerPage({
		id: "projects",
		module: $,
		path: "",
		component: fe(n, de),
		meta: {
			ability: `${$}:view-project`,
			title: "tasks_projects.projects.title"
		}
	});
});
function fe(e, t) {
	return c({ setup: (n, { attrs: r }) => () => u(t, {
		...r,
		client: e.client,
		notify: (t, n) => {
			e.notify(t, n);
		},
		router: e.router
	}) });
}
//#endregion
