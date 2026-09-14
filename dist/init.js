const { Fragment: e, computed: t, createBlock: n, createCommentVNode: r, createElementBlock: i, createElementVNode: a, createTextVNode: o, createVNode: s, defineComponent: c, getCurrentInstance: l, h: u, normalizeClass: d, normalizeStyle: f, onBeforeUnmount: p, onMounted: m, openBlock: h, reactive: g, ref: _, renderList: v, resolveComponent: y, toDisplayString: b, unref: x, vShow: S, watch: C, withCtx: w, withDirectives: T, withModifiers: E } = window.__invoiceshelf_vue;
//#region resources/js/messages.ts
var D = { en: { tasks_projects: {
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
} } }, O = "/api/v1/tasks-projects", k = {
	projects: `${O}/projects`,
	project: (e) => `${O}/projects/${e}`,
	archiveProject: (e) => `${O}/projects/${e}/archive`,
	unarchiveProject: (e) => `${O}/projects/${e}/unarchive`,
	members: `${O}/members`,
	settings: `${O}/settings`
}, A = { customers: "/api/v1/customers" };
async function j(e, t) {
	let { data: n } = await e.get(k.projects, { params: t });
	return n;
}
async function M(e, t) {
	let { data: n } = await e.post(k.projects, t);
	return n.data;
}
async function ee(e, t, n) {
	let { data: r } = await e.put(k.project(t), n);
	return r.data;
}
async function N(e, t) {
	let { data: n } = await e.post(k.archiveProject(t));
	return n.data;
}
async function P(e, t) {
	let { data: n } = await e.post(k.unarchiveProject(t));
	return n.data;
}
async function F(e, t) {
	await e.delete(k.project(t));
}
async function te(e) {
	let { data: t } = await e.get(k.members);
	return t.data;
}
async function ne(e, t = 100) {
	let { data: n } = await e.get(A.customers, { params: { limit: t } });
	return n.data;
}
//#endregion
//#region resources/js/support/errors.ts
function I(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function L(e, t) {
	let n = I(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function re(e) {
	let t = I(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function ie(e) {
	return e === null ? "" : String(e / 100);
}
function ae(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function oe(e) {
	return e === null ? "" : String(e / 60);
}
function se(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function ce(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function le(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
function R(e) {
	let t = Math.max(0, Math.round(e ?? 0)), n = Math.floor(t / 60), r = t % 60;
	return n === 0 ? `${r}m` : r === 0 ? `${n}h` : `${n}h ${r}m`;
}
function ue(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : (t[0].charAt(0) + (t.length > 1 ? t[t.length - 1].charAt(0) : "")).toUpperCase();
}
function de(e) {
	if (!e) return !1;
	let t = /* @__PURE__ */ new Date(), n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
	return e.slice(0, 10) < n;
}
//#endregion
//#region resources/js/support/i18n.ts
function fe() {
	return l()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "flex w-full items-center justify-between" }, me = { class: "space-y-5 px-6 py-6" }, he = { class: "flex flex-wrap items-center gap-2" }, ge = ["aria-label", "onClick"], _e = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, ve = /* @__PURE__ */ c({
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
		], m = fe(), S = g({
			name: "",
			identifier: "",
			description: "",
			colour: "",
			defaultRate: "",
			budgetHours: "",
			dueDate: ""
		}), T = _(null), D = _([]), O = _(!1), k = _({}), A = _(!1), j = t(() => l.project !== null), N = t(() => j.value ? m("tasks_projects.projects.edit_project") : m("tasks_projects.projects.new_project"));
		C(() => l.show, (e) => {
			e && (P(), I());
		}, { immediate: !0 });
		function P() {
			let e = l.project;
			S.name = e?.name ?? "", S.identifier = e?.identifier ?? "", S.description = e?.description ?? "", S.colour = e?.colour ?? "", S.defaultRate = ie(e?.default_rate ?? null), S.budgetHours = oe(e?.budget_minutes ?? null), S.dueDate = e?.due_date ?? "", k.value = {}, T.value = F(e?.customer_id ?? null);
		}
		function F(e) {
			return e === null ? null : D.value.find((t) => t.id === e) ?? null;
		}
		function te(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function I() {
			if (!O.value) try {
				let e = await ne(l.client);
				D.value = e.map((e) => ({
					id: e.id,
					label: te(e)
				})), O.value = !0, T.value = F(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", L(e, m("tasks_projects.projects.customers_failed")));
			}
		}
		function ce() {
			return {
				name: S.name.trim(),
				customer_id: T.value?.id ?? null,
				identifier: S.identifier.trim() || null,
				description: S.description.trim() || null,
				colour: S.colour || null,
				default_rate: ae(S.defaultRate),
				budget_minutes: se(S.budgetHours),
				due_date: S.dueDate || null
			};
		}
		function R(e) {
			S.dueDate = e ? le(e) : "";
		}
		async function ue() {
			if (!A.value) {
				if (S.name.trim() === "") {
					k.value = { name: m("tasks_projects.projects.name_required") };
					return;
				}
				A.value = !0, k.value = {};
				try {
					let e = l.project, t = e ? await ee(l.client, e.id, ce()) : await M(l.client, ce());
					u("saved", t);
				} catch (e) {
					k.value = re(e), l.notify("error", L(e, m("tasks_projects.projects.save_failed")));
				} finally {
					A.value = !1;
				}
			}
		}
		return (t, c) => {
			let l = y("BaseIcon"), g = y("BaseInput"), _ = y("BaseInputGroup"), C = y("BaseSelectInput"), O = y("BaseDatePicker"), M = y("BaseInputGrid"), ee = y("BaseTextarea"), P = y("BaseButton"), F = y("BaseModal");
			return h(), n(F, {
				show: r.show,
				onClose: c[9] ||= (e) => u("close")
			}, {
				header: w(() => [a("div", pe, [a("span", null, b(N.value), 1), s(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: c[0] ||= (e) => u("close")
				})])]),
				default: w(() => [a("form", { onSubmit: E(ue, ["prevent"]) }, [a("div", me, [
					s(M, null, {
						default: w(() => [
							s(_, {
								label: x(m)("tasks_projects.projects.fields.name"),
								error: k.value.name,
								required: ""
							}, {
								default: w(() => [s(g, {
									modelValue: S.name,
									"onUpdate:modelValue": c[1] ||= (e) => S.name = e,
									invalid: !!k.value.name,
									type: "text"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(_, {
								label: x(m)("tasks_projects.projects.fields.identifier"),
								error: k.value.identifier,
								"help-text": x(m)("tasks_projects.projects.fields.identifier_help")
							}, {
								default: w(() => [s(g, {
									modelValue: S.identifier,
									"onUpdate:modelValue": c[2] ||= (e) => S.identifier = e,
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
							s(_, {
								label: x(m)("tasks_projects.projects.fields.customer"),
								error: k.value.customer_id,
								"help-text": x(m)("tasks_projects.projects.fields.customer_help")
							}, {
								default: w(() => [s(C, {
									modelValue: T.value,
									"onUpdate:modelValue": c[3] ||= (e) => T.value = e,
									options: D.value,
									placeholder: x(m)("tasks_projects.projects.fields.customer_placeholder"),
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
							s(_, {
								label: x(m)("tasks_projects.projects.fields.due_date"),
								error: k.value.due_date
							}, {
								default: w(() => [s(O, {
									"model-value": S.dueDate,
									"onUpdate:modelValue": R
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(_, {
								label: x(m)("tasks_projects.projects.fields.default_rate"),
								error: k.value.default_rate,
								"help-text": x(m)("tasks_projects.projects.fields.default_rate_help")
							}, {
								default: w(() => [s(g, {
									modelValue: S.defaultRate,
									"onUpdate:modelValue": c[4] ||= (e) => S.defaultRate = e,
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
							s(_, {
								label: x(m)("tasks_projects.projects.fields.budget_hours"),
								error: k.value.budget_minutes
							}, {
								default: w(() => [s(g, {
									modelValue: S.budgetHours,
									"onUpdate:modelValue": c[5] ||= (e) => S.budgetHours = e,
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
					s(_, {
						label: x(m)("tasks_projects.projects.fields.colour"),
						error: k.value.colour
					}, {
						default: w(() => [a("div", he, [(h(), i(e, null, v(p, (e) => a("button", {
							key: e,
							type: "button",
							class: d(["h-7 w-7 rounded-full border-2 transition", S.colour === e ? "border-heading" : "border-line-default"]),
							style: f({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => S.colour = S.colour === e ? "" : e
						}, null, 14, ge)), 64)), a("button", {
							type: "button",
							class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
							onClick: c[6] ||= (e) => S.colour = ""
						}, b(x(m)("tasks_projects.projects.fields.colour_none")), 1)])]),
						_: 1
					}, 8, ["label", "error"]),
					s(_, {
						label: x(m)("tasks_projects.projects.fields.description"),
						error: k.value.description
					}, {
						default: w(() => [s(ee, {
							modelValue: S.description,
							"onUpdate:modelValue": c[7] ||= (e) => S.description = e,
							row: 3,
							invalid: !!k.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), a("div", _e, [s(P, {
					type: "button",
					variant: "primary-outline",
					onClick: c[8] ||= (e) => u("close")
				}, {
					default: w(() => [o(b(x(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), s(P, {
					type: "submit",
					variant: "primary",
					loading: A.value,
					disabled: A.value
				}, {
					default: w(() => [o(b(j.value ? x(m)("tasks_projects.general.update") : x(m)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), ye = { class: "flex items-center justify-end space-x-5" }, be = { class: "relative table-container" }, xe = { class: "flex items-center" }, Se = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, Ce = { key: 0 }, we = {
	key: 1,
	class: "text-subtle"
}, Te = {
	key: 1,
	class: "text-subtle"
}, Ee = { key: 0 }, De = {
	key: 1,
	class: "text-subtle"
}, Oe = 10, ke = 350, Ae = /* @__PURE__ */ c({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let c = e, l = fe(), u = _(null), m = _(!1), v = _(!0), E = _(0), D = _(!1), O = _(null), k = _(null), A = g({
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
		]), ee = t({
			get: () => M.value.find((e) => e.id === A.status) ?? M.value[0],
			set: (e) => {
				A.status = e.id;
			}
		}), te = t(() => [
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
		]), ne = t(() => A.search.trim() !== "" || A.status !== "ACTIVE"), I = t(() => !v.value && E.value === 0 && !ne.value), re;
		C(() => A.search, () => {
			clearTimeout(re), re = setTimeout(() => ae(), ke);
		}), C(() => A.status, () => ae()), p(() => clearTimeout(re));
		async function ie({ page: e }) {
			let t = {
				page: e,
				limit: Oe
			};
			A.status !== "ALL" && (t.status = A.status), A.search.trim() !== "" && (t.search = A.search.trim()), v.value = !0;
			try {
				let e = await j(c.client, t);
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
				return c.notify("error", L(e, l("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Oe
					}
				};
			} finally {
				v.value = !1;
			}
		}
		function ae(e = !1) {
			u.value?.refresh(e);
		}
		function oe() {
			m.value && se(), m.value = !m.value;
		}
		function se() {
			A.search = "", A.status = "ACTIVE";
		}
		function le() {
			O.value = null, D.value = !0;
		}
		function R(e) {
			O.value = e, D.value = !0;
		}
		function ue(e) {
			let t = O.value ? l("tasks_projects.projects.updated", { name: e.name }) : l("tasks_projects.projects.created", { name: e.name });
			D.value = !1, O.value = null, c.notify("success", t), ae();
		}
		async function de(e) {
			k.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await P(c.client, e.id), c.notify("success", l("tasks_projects.projects.unarchived", { name: e.name }))) : (await N(c.client, e.id), c.notify("success", l("tasks_projects.projects.archived", { name: e.name }))), ae(!0);
			} catch (e) {
				c.notify("error", L(e, l("tasks_projects.projects.save_failed")));
			} finally {
				k.value = null;
			}
		}
		async function pe(e) {
			if (window.confirm(l("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				k.value = e.id;
				try {
					await F(c.client, e.id), c.notify("success", l("tasks_projects.projects.deleted", { name: e.name })), ae(!0);
				} catch (e) {
					c.notify("error", L(e, l("tasks_projects.projects.delete_failed")));
				} finally {
					k.value = null;
				}
			}
		}
		function me(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function he(e) {
			return l(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, c) => {
			let p = y("BaseBreadcrumbItem"), g = y("BaseBreadcrumb"), _ = y("BaseIcon"), v = y("BaseButton"), C = y("router-link"), E = y("BasePageHeader"), j = y("BaseInput"), N = y("BaseInputGroup"), P = y("BaseSelectInput"), F = y("BaseFilterWrapper"), ne = y("BaseEmptyPlaceholder"), L = y("BaseBadge"), re = y("BaseFormatMoney"), ae = y("BaseDropdownItem"), fe = y("BaseDropdown"), ge = y("BaseTable"), _e = y("BasePage");
			return h(), n(_e, null, {
				default: w(() => [
					s(E, { title: x(l)("tasks_projects.projects.title") }, {
						actions: w(() => [a("div", ye, [
							s(C, { to: "/admin/modules/tasks-projects/board" }, {
								default: w(() => [s(v, { variant: "white" }, {
									left: w((e) => [s(_, {
										name: "ViewColumnsIcon",
										class: d(e.class)
									}, null, 8, ["class"])]),
									default: w(() => [o(" " + b(x(l)("tasks_projects.board.title")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							s(v, {
								variant: "primary-outline",
								onClick: oe
							}, {
								right: w((e) => [m.value ? (h(), n(_, {
									key: 1,
									name: "XMarkIcon",
									class: d(e.class)
								}, null, 8, ["class"])) : (h(), n(_, {
									key: 0,
									name: "FunnelIcon",
									class: d(e.class)
								}, null, 8, ["class"]))]),
								default: w(() => [o(b(x(l)("tasks_projects.general.filter")) + " ", 1)]),
								_: 1
							}),
							s(v, {
								variant: "primary",
								onClick: le
							}, {
								left: w((e) => [s(_, {
									name: "PlusIcon",
									class: d(e.class)
								}, null, 8, ["class"])]),
								default: w(() => [o(" " + b(x(l)("tasks_projects.projects.new_project")), 1)]),
								_: 1
							})
						])]),
						default: w(() => [s(g, null, {
							default: w(() => [s(p, {
								title: x(l)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), s(p, {
								title: x(l)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					s(F, {
						show: m.value,
						class: "mt-3",
						onClear: se
					}, {
						default: w(() => [s(N, {
							label: x(l)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(j, {
								modelValue: A.search,
								"onUpdate:modelValue": c[0] ||= (e) => A.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: x(l)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), s(N, {
							label: x(l)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(P, {
								modelValue: ee.value,
								"onUpdate:modelValue": c[1] ||= (e) => ee.value = e,
								options: M.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					T(s(ne, {
						title: x(l)("tasks_projects.projects.empty_title"),
						description: x(l)("tasks_projects.projects.empty_description")
					}, {
						actions: w(() => [s(v, {
							variant: "primary",
							onClick: le
						}, {
							left: w((e) => [s(_, {
								name: "PlusIcon",
								class: d(e.class)
							}, null, 8, ["class"])]),
							default: w(() => [o(" " + b(x(l)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})]),
						default: w(() => [s(_, {
							name: "FolderIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]), [[S, I.value]]),
					T(a("div", be, [s(ge, {
						ref_key: "tableRef",
						ref: u,
						data: ie,
						columns: te.value,
						class: "mt-3"
					}, {
						"cell-name": w(({ row: e }) => [a("div", xe, [a("span", {
							class: d(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: f(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), a("span", null, [s(C, {
							class: "hover:text-primary-500",
							to: {
								name: "extension.page.tasks-projects.project",
								params: { id: e.data.id }
							}
						}, {
							default: w(() => [o(b(e.data.name), 1)]),
							_: 2
						}, 1032, ["to"]), e.data.identifier ? (h(), i("span", Se, b(e.data.identifier), 1)) : r("", !0)])])]),
						"cell-status": w(({ row: e }) => [s(L, { class: d(["rounded-full", me(e.data.status)]) }, {
							default: w(() => [o(b(he(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": w(({ row: e }) => [e.data.customer_id ? (h(), i("span", Ce, "#" + b(e.data.customer_id), 1)) : (h(), i("span", we, b(x(l)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": w(({ row: e }) => [e.data.default_rate === null ? (h(), i("span", Te, "-")) : (h(), n(re, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": w(({ row: e }) => [e.data.due_date ? (h(), i("span", Ee, b(x(ce)(e.data.due_date)), 1)) : (h(), i("span", De, "-"))]),
						"cell-actions": w(({ row: e }) => [s(fe, { "content-loading": k.value === e.data.id }, {
							activator: w(() => [s(_, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: w(() => [
								s(ae, { onClick: (t) => R(e.data) }, {
									default: w(() => [s(_, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), o(" " + b(x(l)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								s(ae, { onClick: (t) => de(e.data) }, {
									default: w(() => [s(_, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), o(" " + b(e.data.status === "ARCHIVED" ? x(l)("tasks_projects.projects.unarchive") : x(l)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								s(ae, { onClick: (t) => pe(e.data) }, {
									default: w(() => [s(_, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), o(" " + b(x(l)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[S, !I.value]]),
					s(ve, {
						show: D.value,
						client: e.client,
						notify: e.notify,
						project: O.value,
						onClose: c[2] ||= (e) => D.value = !1,
						onSaved: ue
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
}), je = { en: { tasks_projects: {
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
function Me(e, t, n) {
	return (t = ze(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ne() {
	return Ne = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ne.apply(null, arguments);
}
function Pe(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Fe(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Pe(Object(n), !0).forEach(function(t) {
			Me(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pe(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ie(e, t) {
	if (e == null) return {};
	var n, r, i = Le(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Le(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Re(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ze(e) {
	var t = Re(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Be(e) {
	"@babel/helpers - typeof";
	return Be = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Be(e);
}
var Ve = "1.15.7";
function He(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var Ue = He(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), We = He(/Edge/i), Ge = He(/firefox/i), Ke = He(/safari/i) && !He(/chrome/i) && !He(/android/i), qe = He(/iP(ad|od|hone)/i), Je = He(/chrome/i) && He(/android/i), Ye = {
	capture: !1,
	passive: !1
};
function z(e, t, n) {
	e.addEventListener(t, n, !Ue && Ye);
}
function B(e, t, n) {
	e.removeEventListener(t, n, !Ue && Ye);
}
function Xe(e, t) {
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
function Ze(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function Qe(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Xe(e, t) : Xe(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = Ze(e));
	}
	return null;
}
var $e = /\s+/g;
function et(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace($e, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace($e, " "));
}
function V(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function tt(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = V(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function nt(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function rt() {
	return document.scrollingElement || document.documentElement;
}
function H(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== rt() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !Ue)) do
			if (i && i.getBoundingClientRect && (V(i, "transform") !== "none" || n && V(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(V(i, "border-top-width")), s -= f.left + parseInt(V(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = tt(i || e), m = p && p.a, h = p && p.d;
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
function it(e, t, n) {
	for (var r = ut(e, !0), i = H(e)[t]; r;) {
		var a = H(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === rt()) break;
		r = ut(r, !1);
	}
	return !1;
}
function at(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== Q.ghost && (r || o[a] !== Q.dragged) && Qe(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function ot(e, t) {
	for (var n = e.lastElementChild; n && (n === Q.ghost || V(n, "display") === "none" || t && !Xe(n, t));) n = n.previousElementSibling;
	return n || null;
}
function st(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Q.clone && (!t || Xe(e, t)) && n++;
	return n;
}
function ct(e) {
	var t = 0, n = 0, r = rt();
	if (e) do {
		var i = tt(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function lt(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function ut(e, t) {
	if (!e || !e.getBoundingClientRect) return rt();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = V(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return rt();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return rt();
}
function dt(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function ft(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var pt;
function mt(e, t) {
	return function() {
		if (!pt) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), pt = setTimeout(function() {
				pt = void 0;
			}, t);
		}
	};
}
function ht() {
	clearTimeout(pt), pt = void 0;
}
function gt(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function _t(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function vt(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (Qe(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = H(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var U = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function yt() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (V(t, "display") !== "none" && t !== Q.ghost) {
					e.push({
						target: t,
						rect: H(t)
					});
					var n = Fe({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = tt(t, !0);
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
			e.splice(lt(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = H(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = tt(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && ft(c, s) && !ft(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = xt(u, c, l, r.options)), ft(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				V(e, "transition", ""), V(e, "transform", "");
				var i = tt(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, V(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = bt(e), V(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), V(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					V(e, "transition", ""), V(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function bt(e) {
	return e.offsetWidth;
}
function xt(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var St = [], Ct = { initializeByDefault: !0 }, wt = {
	mount: function(e) {
		for (var t in Ct) Ct.hasOwnProperty(t) && !(t in e) && (e[t] = Ct[t]);
		St.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), St.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		St.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](Fe({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](Fe({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in St.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, Ne(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return St.forEach(function(r) {
			typeof r.eventProperties == "function" && Ne(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return St.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function Tt(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[U], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !Ue && !We ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = Fe(Fe({}, m), wt.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var Et = ["evt"], Dt = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = Ie(n, Et);
	wt.pluginEvent.bind(Q)(e, t, Fe({
		dragEl: G,
		parentEl: K,
		ghostEl: q,
		rootEl: J,
		nextEl: Ot,
		lastDownEl: kt,
		cloneEl: Y,
		cloneHidden: At,
		dragStarted: Gt,
		putSortable: X,
		activeSortable: Q.active,
		originalEvent: r,
		oldIndex: jt,
		oldDraggableIndex: Nt,
		newIndex: Mt,
		newDraggableIndex: Pt,
		hideGhostForTarget: un,
		unhideGhostForTarget: dn,
		cloneNowHidden: function() {
			At = !0;
		},
		cloneNowShown: function() {
			At = !1;
		},
		dispatchSortableEvent: function(e) {
			W({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function W(e) {
	Tt(Fe({
		putSortable: X,
		cloneEl: Y,
		targetEl: G,
		rootEl: J,
		oldIndex: jt,
		oldDraggableIndex: Nt,
		newIndex: Mt,
		newDraggableIndex: Pt
	}, e));
}
var G, K, q, J, Ot, kt, Y, At, jt, Mt, Nt, Pt, Ft, X, It = !1, Lt = !1, Rt = [], zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt = !1, Yt = !1, Xt, Z, Zt = [], Qt = !1, $t = [], en = typeof document < "u", tn = qe, nn = We || Ue ? "cssFloat" : "float", rn = en && !Je && !qe && "draggable" in document.createElement("div"), an = function() {
	if (en) {
		if (Ue) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), on = function(e, t) {
	var n = V(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = at(e, 0, t), a = at(e, 1, t), o = i && V(i), s = a && V(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + H(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + H(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[nn] === "none" || a && n[nn] === "none" && c + l > r) ? "vertical" : "horizontal";
}, sn = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, cn = function(e, t) {
	var n;
	return Rt.some(function(r) {
		var i = r[U].options.emptyInsertThreshold;
		if (i && !ot(r)) {
			var a = H(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, ln = function(e) {
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
	(!r || Be(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, un = function() {
	!an && q && V(q, "display", "none");
}, dn = function() {
	!an && q && V(q, "display", "");
};
en && !Je && document.addEventListener("click", function(e) {
	if (Lt) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Lt = !1, !1;
}, !0);
var fn = function(e) {
	if (G) {
		e = e.touches ? e.touches[0] : e;
		var t = cn(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[U]._onDragOver(n);
		}
	}
}, pn = function(e) {
	G && G.parentNode[U]._isOutsideThisEl(e.target);
};
function Q(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = Ne({}, t), e[U] = this;
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
			return on(e, this.options);
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
		supportPointer: Q.supportPointer !== !1 && "PointerEvent" in window && (!Ke || qe),
		emptyInsertThreshold: 5
	};
	for (var r in wt.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in ln(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && rn, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? z(e, "pointerdown", this._onTapStart) : (z(e, "mousedown", this._onTapStart), z(e, "touchstart", this._onTapStart)), this.nativeDraggable && (z(e, "dragover", this), z(e, "dragenter", this)), Rt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Ne(this, yt());
}
Q.prototype = {
	constructor: Q,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Kt = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, G) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (Cn(n), !G && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Ke && s && s.tagName.toUpperCase() === "SELECT") && (s = Qe(s, r.draggable, n, !1), !(s && s.animated) && kt !== s)) {
				if (jt = st(s), Nt = st(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						W({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), Dt("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Qe(c, r.trim(), n, !1), r) return W({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), Dt("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || Qe(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !G && n.parentNode === i) {
			var c = H(n);
			if (J = i, G = n, K = G.parentNode, Ot = G.nextSibling, kt = n, Ft = a.group, Q.dragged = G, zt = {
				target: G,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Ut = zt.clientX - c.left, Wt = zt.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, G.style["will-change"] = "all", s = function() {
				if (Dt("delayEnded", r, { evt: e }), Q.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !Ge && r.nativeDraggable && (G.draggable = !0), r._triggerDragStart(e, t), W({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), et(G, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				nt(G, e.trim(), gn);
			}), z(o, "dragover", fn), z(o, "mousemove", fn), z(o, "touchmove", fn), a.supportPointer ? (z(o, "pointerup", r._onDrop), !this.nativeDraggable && z(o, "pointercancel", r._onDrop)) : (z(o, "mouseup", r._onDrop), z(o, "touchend", r._onDrop), z(o, "touchcancel", r._onDrop)), Ge && this.nativeDraggable && (this.options.touchStartThreshold = 4, G.draggable = !0), Dt("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(We || Ue))) {
				if (Q.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (z(o, "pointerup", r._disableDelayedDrag), z(o, "pointercancel", r._disableDelayedDrag)) : (z(o, "mouseup", r._disableDelayedDrag), z(o, "touchend", r._disableDelayedDrag), z(o, "touchcancel", r._disableDelayedDrag)), z(o, "mousemove", r._delayedDragTouchMoveHandler), z(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && z(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		G && gn(G), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		B(e, "mouseup", this._disableDelayedDrag), B(e, "touchend", this._disableDelayedDrag), B(e, "touchcancel", this._disableDelayedDrag), B(e, "pointerup", this._disableDelayedDrag), B(e, "pointercancel", this._disableDelayedDrag), B(e, "mousemove", this._delayedDragTouchMoveHandler), B(e, "touchmove", this._delayedDragTouchMoveHandler), B(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : t ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(G, "dragend", this), z(J, "dragstart", this._onDragStart));
		try {
			document.selection ? wn(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (It = !1, J && G) {
			Dt("dragStarted", this, { evt: t }), this.nativeDraggable && z(document, "dragover", pn);
			var n = this.options;
			!e && et(G, n.dragClass, !1), et(G, n.ghostClass, !0), Q.active = this, e && this._appendGhost(), W({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (Bt) {
			this._lastX = Bt.clientX, this._lastY = Bt.clientY, un();
			for (var e = document.elementFromPoint(Bt.clientX, Bt.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Bt.clientX, Bt.clientY), e !== t);) t = e;
			if (G.parentNode[U]._isOutsideThisEl(e), t) do {
				if (t[U]) {
					var n = void 0;
					if (n = t[U]._onDragOver({
						clientX: Bt.clientX,
						clientY: Bt.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = Ze(t));
			dn();
		}
	},
	_onTouchMove: function(e) {
		if (zt) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = q && tt(q, !0), o = q && a && a.a, s = q && a && a.d, c = tn && Z && ct(Z), l = (i.clientX - zt.clientX + r.x) / (o || 1) + (c ? c[0] - Zt[0] : 0) / (o || 1), u = (i.clientY - zt.clientY + r.y) / (s || 1) + (c ? c[1] - Zt[1] : 0) / (s || 1);
			if (!Q.active && !It) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (q) {
				a ? (a.e += l - (Vt || 0), a.f += u - (Ht || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				V(q, "webkitTransform", d), V(q, "mozTransform", d), V(q, "msTransform", d), V(q, "transform", d), Vt = l, Ht = u, Bt = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!q) {
			var e = this.options.fallbackOnBody ? document.body : J, t = H(G, !0, tn, !0, e), n = this.options;
			if (tn) {
				for (Z = e; V(Z, "position") === "static" && V(Z, "transform") === "none" && Z !== document;) Z = Z.parentNode;
				Z !== document.body && Z !== document.documentElement ? (Z === document && (Z = rt()), t.top += Z.scrollTop, t.left += Z.scrollLeft) : Z = rt(), Zt = ct(Z);
			}
			q = G.cloneNode(!0), et(q, n.ghostClass, !1), et(q, n.fallbackClass, !0), et(q, n.dragClass, !0), V(q, "transition", ""), V(q, "transform", ""), V(q, "box-sizing", "border-box"), V(q, "margin", 0), V(q, "top", t.top), V(q, "left", t.left), V(q, "width", t.width), V(q, "height", t.height), V(q, "opacity", "0.8"), V(q, "position", tn ? "absolute" : "fixed"), V(q, "zIndex", "100000"), V(q, "pointerEvents", "none"), Q.ghost = q, e.appendChild(q), V(q, "transform-origin", Ut / parseInt(q.style.width) * 100 + "% " + Wt / parseInt(q.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (Dt("dragStart", this, { evt: e }), Q.eventCanceled) {
			this._onDrop();
			return;
		}
		Dt("setupClone", this), Q.eventCanceled || (Y = _t(G), Y.removeAttribute("id"), Y.draggable = !1, Y.style["will-change"] = "", this._hideClone(), et(Y, this.options.chosenClass, !1), Q.clone = Y), n.cloneId = wn(function() {
			Dt("clone", n), !Q.eventCanceled && (n.options.removeCloneOnHide || J.insertBefore(Y, G), n._hideClone(), W({
				sortable: n,
				name: "clone"
			}));
		}), !t && et(G, i.dragClass, !0), t ? (Lt = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (B(document, "mouseup", n._onDrop), B(document, "touchend", n._onDrop), B(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, G)), z(document, "drop", n), V(G, "transform", "translateZ(0)")), It = !0, n._dragStartId = wn(n._dragStarted.bind(n, t, e)), z(document, "selectstart", n), Gt = !0, window.getSelection().removeAllRanges(), Ke && V(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = Q.active, l = Ft === s, u = o.sort, d = X || c, f, p = this, m = !1;
		if (Qt) return;
		function h(o, s) {
			Dt(o, p, Fe({
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
					return hn(J, t, G, r, n, H(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (et(G, X ? X.options.ghostClass : c.options.ghostClass, !1), et(G, o.ghostClass, !0)), X !== p && p !== Q.active ? X = p : p === Q.active && X && (X = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === G && !G.animated || n === t && !n.animated) && (Kt = null), !o.dragoverBubble && !e.rootEl && n !== document && (G.parentNode[U]._isOutsideThisEl(e.target), !r && fn(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			Mt = st(G), Pt = st(G, o.draggable), W({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: Mt,
				newDraggableIndex: Pt,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Qe(n, o.draggable, t, !0), h("dragOver"), Q.eventCanceled) return m;
		if (G.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (Lt = !1, c && !o.disabled && (l ? u || (a = K !== J) : X === this || (this.lastPutMode = Ft.checkPull(this, c, G, e)) && s.checkPut(this, c, G, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = H(G), h("dragOverValid"), Q.eventCanceled) return m;
			if (a) return K = J, g(), this._hideClone(), h("revert"), Q.eventCanceled || (Ot ? J.insertBefore(G, Ot) : J.appendChild(G)), _(!0);
			var y = ot(t, o.draggable);
			if (!y || yn(e, f, this) && !y.animated) {
				if (y === G) return _(!1);
				if (y && t === e.target && (n = y), n && (i = H(n)), hn(J, t, G, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(G, y.nextSibling) : t.appendChild(G), K = t, v(), _(!0);
			} else if (y && vn(e, f, this)) {
				var b = at(t, 0, o, !0);
				if (b === G) return _(!1);
				if (n = b, i = H(n), hn(J, t, G, r, n, i, e, !1) !== !1) return g(), t.insertBefore(G, b), K = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = H(n);
				var x = 0, S, C = G.parentNode !== t, w = !sn(G.animated && G.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = it(n, "top", "top") || it(G, "top", "top"), D = E ? E.scrollTop : void 0;
				Kt !== n && (S = i[T], Jt = !1, Yt = !w && o.invertSwap || C), x = bn(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Yt, Kt === n);
				var O;
				if (x !== 0) {
					var k = st(G);
					do
						k -= x, O = K.children[k];
					while (O && (V(O, "display") === "none" || O === q));
				}
				if (x === 0 || O === n) return _(!1);
				Kt = n, qt = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = hn(J, t, G, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), Qt = !0, setTimeout(_n, 30), g(), j && !A ? t.appendChild(G) : n.parentNode.insertBefore(G, j ? A : n), E && gt(E, 0, D - E.scrollTop), K = G.parentNode, S !== void 0 && !Yt && (Xt = Math.abs(S - H(n)[T])), v(), _(!0);
			}
			if (t.contains(G)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		B(document, "mousemove", this._onTouchMove), B(document, "touchmove", this._onTouchMove), B(document, "pointermove", this._onTouchMove), B(document, "dragover", fn), B(document, "mousemove", fn), B(document, "touchmove", fn);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		B(e, "mouseup", this._onDrop), B(e, "touchend", this._onDrop), B(e, "pointerup", this._onDrop), B(e, "pointercancel", this._onDrop), B(e, "touchcancel", this._onDrop), B(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (Mt = st(G), Pt = st(G, n.draggable), Dt("drop", this, { evt: e }), K = G && G.parentNode, Mt = st(G), Pt = st(G, n.draggable), Q.eventCanceled) {
			this._nulling();
			return;
		}
		It = !1, Yt = !1, Jt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Tn(this.cloneId), Tn(this._dragStartId), this.nativeDraggable && (B(document, "drop", this), B(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ke && V(document.body, "user-select", ""), V(G, "transform", ""), e && (Gt && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), q && q.parentNode && q.parentNode.removeChild(q), (J === K || X && X.lastPutMode !== "clone") && Y && Y.parentNode && Y.parentNode.removeChild(Y), G && (this.nativeDraggable && B(G, "dragend", this), gn(G), G.style["will-change"] = "", Gt && !It && et(G, X ? X.options.ghostClass : this.options.ghostClass, !1), et(G, this.options.chosenClass, !1), W({
			sortable: this,
			name: "unchoose",
			toEl: K,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), J === K ? Mt !== jt && Mt >= 0 && (W({
			sortable: this,
			name: "update",
			toEl: K,
			originalEvent: e
		}), W({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})) : (Mt >= 0 && (W({
			rootEl: K,
			name: "add",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), W({
			sortable: this,
			name: "remove",
			toEl: K,
			originalEvent: e
		}), W({
			rootEl: K,
			name: "sort",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), W({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})), X && X.save()), Q.active && ((Mt == null || Mt === -1) && (Mt = jt, Pt = Nt), W({
			sortable: this,
			name: "end",
			toEl: K,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		Dt("nulling", this), J = G = K = q = Ot = Y = kt = At = zt = Bt = Gt = Mt = Pt = jt = Nt = Kt = qt = X = Ft = Q.dragged = Q.ghost = Q.clone = Q.active = null;
		var e = this.el;
		$t.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), $t.length = Vt = Ht = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				G && (this._onDragOver(e), mn(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Qe(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || Sn(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Qe(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Qe(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = wt.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && ln(n);
	},
	destroy: function() {
		Dt("destroy", this);
		var e = this.el;
		e[U] = null, B(e, "mousedown", this._onTapStart), B(e, "touchstart", this._onTapStart), B(e, "pointerdown", this._onTapStart), this.nativeDraggable && (B(e, "dragover", this), B(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), Rt.splice(Rt.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!At) {
			if (Dt("hideClone", this), Q.eventCanceled) return;
			V(Y, "display", "none"), this.options.removeCloneOnHide && Y.parentNode && Y.parentNode.removeChild(Y), At = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (At) {
			if (Dt("showClone", this), Q.eventCanceled) return;
			G.parentNode == J && !this.options.group.revertClone ? J.insertBefore(Y, G) : Ot ? J.insertBefore(Y, Ot) : J.appendChild(Y), this.options.group.revertClone && this.animate(G, Y), V(Y, "display", ""), At = !1;
		}
	}
};
function mn(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function hn(e, t, n, r, i, a, o, s) {
	var c, l = e[U], u = l.options.onMove, d;
	return window.CustomEvent && !Ue && !We ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || H(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function gn(e) {
	e.draggable = !1;
}
function _n() {
	Qt = !1;
}
function vn(e, t, n) {
	var r = H(at(n.el, 0, n.options, !0)), i = vt(n.el, n.options, q), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function yn(e, t, n) {
	var r = H(ot(n.el, n.options.draggable)), i = vt(n.el, n.options, q), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function bn(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Xt < l * i) {
			if (!Jt && (qt === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Jt = !0), Jt) f = !0;
			else if (qt === 1 ? c < u + Xt : c > d - Xt) return -qt;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return xn(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function xn(e) {
	return st(G) < st(e) ? 1 : -1;
}
function Sn(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function Cn(e) {
	$t.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && $t.push(r);
	}
}
function wn(e) {
	return setTimeout(e, 0);
}
function Tn(e) {
	return clearTimeout(e);
}
en && z(document, "touchmove", function(e) {
	(Q.active || It) && e.cancelable && e.preventDefault();
}), Q.utils = {
	on: z,
	off: B,
	css: V,
	find: nt,
	is: function(e, t) {
		return !!Qe(e, t, e, !1);
	},
	extend: dt,
	throttle: mt,
	closest: Qe,
	toggleClass: et,
	clone: _t,
	index: st,
	nextTick: wn,
	cancelNextTick: Tn,
	detectDirection: on,
	getChild: at,
	expando: U
}, Q.get = function(e) {
	return e[U];
}, Q.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && (Q.utils = Fe(Fe({}, Q.utils), e.utils)), wt.mount(e);
	});
}, Q.create = function(e, t) {
	return new Q(e, t);
}, Q.version = Ve;
var $ = [], En, Dn, On = !1, kn, An, jn, Mn;
function Nn() {
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
			this.sortable.nativeDraggable ? z(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? z(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? z(document, "touchmove", this._handleFallbackAutoScroll) : z(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? B(document, "dragover", this._handleAutoScroll) : (B(document, "pointermove", this._handleFallbackAutoScroll), B(document, "touchmove", this._handleFallbackAutoScroll), B(document, "mousemove", this._handleFallbackAutoScroll)), Fn(), Pn(), ht();
		},
		nulling: function() {
			jn = Dn = En = On = Mn = kn = An = null, $.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (jn = e, t || this.options.forceAutoScrollFallback || We || Ue || Ke) {
				In(e, this.options, a, t);
				var o = ut(a, !0);
				On && (!Mn || r !== kn || i !== An) && (Mn && Fn(), Mn = setInterval(function() {
					var a = ut(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, Pn()), In(e, n.options, a, t);
				}, 10), kn = r, An = i);
			} else {
				if (!this.options.bubbleScroll || ut(a, !0) === rt()) {
					Pn();
					return;
				}
				In(e, this.options, ut(a, !1), !1);
			}
		}
	}, Ne(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function Pn() {
	$.forEach(function(e) {
		clearInterval(e.pid);
	}), $ = [];
}
function Fn() {
	clearInterval(Mn);
}
var In = mt(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = rt(), l = !1, u;
		Dn !== n && (Dn = n, Pn(), En = t.scroll, u = t.scrollFn, En === !0 && (En = ut(n, !0)));
		var d = 0, f = En;
		do {
			var p = f, m = H(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = V(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!$[d]) for (var A = 0; A <= d; A++) $[A] || ($[A] = {});
			($[d].vx != O || $[d].vy != k || $[d].el !== p) && ($[d].el = p, $[d].vx = O, $[d].vy = k, clearInterval($[d].pid), (O != 0 || k != 0) && (l = !0, $[d].pid = setInterval(function() {
				r && this.layer === 0 && Q.active._onTouchMove(jn);
				var t = $[this.layer].vy ? $[this.layer].vy * s : 0, n = $[this.layer].vx ? $[this.layer].vx * s : 0;
				(typeof u != "function" || u.call(Q.dragged.parentNode[U], n, t, e, jn, $[this.layer].el) === "continue") && gt($[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = ut(f, !1)));
		On = l;
	}
}, 30), Ln = function(e) {
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
function Rn() {}
Rn.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = at(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: Ln
}, Ne(Rn, { pluginName: "revertOnSpill" });
function zn() {}
zn.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: Ln
}, Ne(zn, { pluginName: "removeOnSpill" }), Q.mount(new Nn()), Q.mount(zn, Rn);
//#endregion
//#region resources/js/api/board.ts
var Bn = {
	board: `${O}/board`,
	tasks: `${O}/tasks`,
	task: (e) => `${O}/tasks/${e}`,
	moveTask: (e) => `${O}/tasks/${e}/move`,
	taskStatuses: `${O}/task-statuses`,
	timeEntries: `${O}/time-entries`,
	projectMembers: (e) => `${O}/projects/${e}/members`,
	projectMember: (e, t) => `${O}/projects/${e}/members/${t}`
};
async function Vn(e, t) {
	let { data: n } = await e.get(Bn.board, { params: t });
	return n.data;
}
async function Hn(e) {
	let { data: t } = await e.get(Bn.taskStatuses);
	return t.data;
}
async function Un(e, t) {
	let { data: n } = await e.get(Bn.tasks, { params: t });
	return n;
}
async function Wn(e, t) {
	let { data: n } = await e.post(Bn.tasks, t);
	return n.data;
}
async function Gn(e, t, n) {
	let { data: r } = await e.put(Bn.task(t), n);
	return r.data;
}
async function Kn(e, t) {
	await e.delete(Bn.task(t));
}
async function qn(e, t, n) {
	let { data: r } = await e.post(Bn.moveTask(t), n);
	return r.data;
}
async function Jn(e, t) {
	let { data: n } = await e.get(k.project(t));
	return n.data;
}
async function Yn(e, t) {
	let { data: n } = await e.get(Bn.projectMembers(t));
	return n.data;
}
async function Xn(e, t, n) {
	let { data: r } = await e.post(Bn.projectMembers(t), n);
	return r.data;
}
async function Zn(e, t, n) {
	await e.delete(Bn.projectMember(t, n));
}
async function Qn(e, t) {
	let { data: n } = await e.get(Bn.timeEntries, { params: t });
	return n;
}
async function $n(e, t) {
	let { data: n } = await e.get(`${A.customers}/${t}`);
	return n.data;
}
//#endregion
//#region resources/js/types/task.ts
var er = [
	"LOW",
	"NORMAL",
	"HIGH",
	"URGENT"
], tr = { class: "flex w-full items-center justify-between" }, nr = {
	key: 0,
	class: "ml-2 text-sm font-normal text-muted"
}, rr = { class: "space-y-5 px-6 py-6" }, ir = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, ar = { key: 1 }, or = { class: "flex space-x-3" }, sr = /* @__PURE__ */ c({
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
	setup(e, { emit: c }) {
		let l = e, u = c, d = fe(), f = g({
			name: "",
			description: "",
			estimateHours: "",
			rate: "",
			dueDate: "",
			billable: !0
		}), p = _(null), m = _(null), v = _(null), S = _(null), T = _(null), D = _({}), O = _(!1), k = _(!1), A = t({
			get: () => F(l.projects, m.value),
			set: (e) => {
				m.value = e?.id ?? null;
			}
		}), j = t(() => l.task !== null), M = t(() => j.value ? d("tasks_projects.tasks.edit_task") : d("tasks_projects.tasks.new_task")), ee = t(() => l.statuses.map((e) => ({
			id: e.id,
			label: e.name
		}))), N = t(() => l.members.map((e) => ({
			id: e.id,
			label: e.name
		}))), P = t(() => er.map((e, t) => ({
			id: t,
			label: d(`tasks_projects.tasks.priority.${e.toLowerCase()}`)
		})));
		C(() => l.show, (e) => {
			e && te();
		}, { immediate: !0 });
		function F(e, t) {
			return t === null ? null : e.find((e) => e.id === t) ?? null;
		}
		function te() {
			let e = l.task;
			f.name = e?.name ?? "", f.description = e?.description ?? "", f.estimateHours = oe(e?.estimated_minutes ?? null), f.rate = ie(e?.rate ?? null), f.dueDate = e?.due_date ?? "", f.billable = e?.billable ?? !0;
			let t = l.statuses.find((e) => e.is_default) ?? l.statuses[0], n = e?.task_status_id ?? l.defaults?.task_status_id ?? t?.id ?? null;
			p.value = F(ee.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, v.value = F(N.value, e?.assignee_id ?? null), S.value = e?.priority ? P.value[er.indexOf(e.priority)] ?? null : null, T.value = e?.customer_id ?? null, D.value = {};
		}
		function ne(e) {
			f.dueDate = e ? le(e) : "";
		}
		function I() {
			let e = p.value?.id ?? null;
			if (e === null) return null;
			let t = S.value === null ? null : er[S.value.id];
			return {
				name: f.name.trim(),
				task_status_id: e,
				project_id: m.value,
				customer_id: m.value === null ? T.value : null,
				description: f.description.trim() || null,
				assignee_id: v.value?.id ?? null,
				priority: t,
				due_date: f.dueDate || null,
				estimated_minutes: se(f.estimateHours),
				billable: f.billable,
				rate: ae(f.rate)
			};
		}
		async function ce() {
			if (O.value) return;
			if (f.name.trim() === "") {
				D.value = { name: d("tasks_projects.tasks.name_required") };
				return;
			}
			let e = I();
			if (e === null) {
				l.notify("error", d("tasks_projects.task_statuses.none"));
				return;
			}
			O.value = !0, D.value = {};
			try {
				let t = l.task, n = t ? await Gn(l.client, t.id, e) : await Wn(l.client, e);
				u("saved", n);
			} catch (e) {
				D.value = re(e), l.notify("error", L(e, d("tasks_projects.tasks.save_failed")));
			} finally {
				O.value = !1;
			}
		}
		async function R() {
			let e = l.task;
			if (!(e === null || k.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				k.value = !0;
				try {
					await Kn(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", L(e, d("tasks_projects.tasks.delete_failed")));
				} finally {
					k.value = !1;
				}
			}
		}
		return (t, c) => {
			let l = y("BaseIcon"), m = y("BaseInput"), g = y("BaseInputGroup"), _ = y("BaseSelectInput"), C = y("BaseDatePicker"), F = y("BaseInputGrid"), te = y("BaseSwitch"), I = y("BaseTextarea"), L = y("BaseButton"), re = y("BaseModal");
			return h(), n(re, {
				show: e.show,
				onClose: c[11] ||= (e) => u("close")
			}, {
				header: w(() => [a("div", tr, [a("span", null, [o(b(M.value) + " ", 1), e.task ? (h(), i("span", nr, "#" + b(e.task.number), 1)) : r("", !0)]), s(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: c[0] ||= (e) => u("close")
				})])]),
				default: w(() => [a("form", { onSubmit: E(ce, ["prevent"]) }, [a("div", rr, [
					s(g, {
						label: x(d)("tasks_projects.tasks.fields.name"),
						error: D.value.name,
						required: ""
					}, {
						default: w(() => [s(m, {
							modelValue: f.name,
							"onUpdate:modelValue": c[1] ||= (e) => f.name = e,
							invalid: !!D.value.name,
							type: "text"
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"]),
					s(F, null, {
						default: w(() => [
							e.lockProject ? r("", !0) : (h(), n(g, {
								key: 0,
								label: x(d)("tasks_projects.tasks.fields.project"),
								error: D.value.project_id,
								"help-text": x(d)("tasks_projects.tasks.fields.project_help")
							}, {
								default: w(() => [s(_, {
									modelValue: A.value,
									"onUpdate:modelValue": c[2] ||= (e) => A.value = e,
									options: e.projects,
									placeholder: x(d)("tasks_projects.tasks.fields.project_placeholder"),
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
							T.value === null ? r("", !0) : (h(), n(g, {
								key: 1,
								label: x(d)("tasks_projects.tasks.fields.customer"),
								"help-text": x(d)("tasks_projects.tasks.fields.customer_help")
							}, {
								default: w(() => [s(m, {
									"model-value": `#${T.value}`,
									type: "text",
									disabled: ""
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "help-text"])),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.status"),
								error: D.value.task_status_id
							}, {
								default: w(() => [s(_, {
									modelValue: p.value,
									"onUpdate:modelValue": c[3] ||= (e) => p.value = e,
									options: ee.value,
									"label-key": "label"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.assignee"),
								error: D.value.assignee_id
							}, {
								default: w(() => [s(_, {
									modelValue: v.value,
									"onUpdate:modelValue": c[4] ||= (e) => v.value = e,
									options: N.value,
									placeholder: x(d)("tasks_projects.tasks.fields.assignee_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.priority"),
								error: D.value.priority
							}, {
								default: w(() => [s(_, {
									modelValue: S.value,
									"onUpdate:modelValue": c[5] ||= (e) => S.value = e,
									options: P.value,
									placeholder: x(d)("tasks_projects.tasks.fields.priority_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.due_date"),
								error: D.value.due_date
							}, {
								default: w(() => [s(C, {
									"model-value": f.dueDate,
									"onUpdate:modelValue": ne
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.estimate_hours"),
								error: D.value.estimated_minutes
							}, {
								default: w(() => [s(m, {
									modelValue: f.estimateHours,
									"onUpdate:modelValue": c[6] ||= (e) => f.estimateHours = e,
									invalid: !!D.value.estimated_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							s(g, {
								label: x(d)("tasks_projects.tasks.fields.rate"),
								error: D.value.rate,
								"help-text": x(d)("tasks_projects.tasks.fields.rate_help")
							}, {
								default: w(() => [s(m, {
									modelValue: f.rate,
									"onUpdate:modelValue": c[7] ||= (e) => f.rate = e,
									invalid: !!D.value.rate,
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
					s(g, {
						label: x(d)("tasks_projects.tasks.fields.billable"),
						error: D.value.billable
					}, {
						default: w(() => [s(te, {
							modelValue: f.billable,
							"onUpdate:modelValue": c[8] ||= (e) => f.billable = e,
							class: "mt-1"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label", "error"]),
					s(g, {
						label: x(d)("tasks_projects.tasks.fields.description"),
						error: D.value.description
					}, {
						default: w(() => [s(I, {
							modelValue: f.description,
							"onUpdate:modelValue": c[9] ||= (e) => f.description = e,
							row: 3,
							invalid: !!D.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), a("div", ir, [j.value ? (h(), n(L, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: k.value,
					disabled: k.value,
					onClick: R
				}, {
					default: w(() => [o(b(x(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (h(), i("span", ar)), a("div", or, [s(L, {
					type: "button",
					variant: "primary-outline",
					onClick: c[10] ||= (e) => u("close")
				}, {
					default: w(() => [o(b(x(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), s(L, {
					type: "submit",
					variant: "primary",
					loading: O.value,
					disabled: O.value
				}, {
					default: w(() => [o(b(j.value ? x(d)("tasks_projects.general.update") : x(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), cr = { class: "flex items-center justify-end space-x-5" }, lr = {
	key: 0,
	class: "flex justify-center py-16"
}, ur = {
	key: 2,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, dr = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, fr = { class: "flex items-center" }, pr = { class: "text-sm font-semibold text-heading" }, mr = { class: "ml-2 text-xs text-muted" }, hr = [
	"aria-label",
	"title",
	"onClick"
], gr = ["data-status-id"], _r = ["data-task-id", "onClick"], vr = { class: "flex items-start justify-between gap-2" }, yr = { class: "text-sm font-medium text-heading" }, br = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, xr = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body"
}, Sr = {
	key: 1,
	class: "inline-flex items-center text-body"
}, Cr = { class: "mt-3 flex items-center justify-between" }, wr = {
	key: 1,
	class: "text-xs text-subtle"
}, Tr = ["title"], Er = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, Dr = { class: "px-3 pt-2 pb-3" }, Or = ["onClick"], kr = /* @__PURE__ */ c({
	__name: "BoardPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(c) {
		let l = c, u = fe(), g = _([]), S = _([]), T = _([]), E = _(!0), D = _(null), O = _(null), k = _(!1), A = _(null), M = _({}), ee = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, N = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), F = !1, ne = t(() => T.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), I = t(() => S.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), re = t(() => g.value.map((e) => e.status)), ie = t(() => !E.value && g.value.length === 0);
		C([D, O], () => {
			oe();
		}), m(() => {
			ae(), oe();
		}), p(() => {
			for (let e of N.values()) e.destroy();
			N.clear(), P.clear();
		});
		async function ae() {
			try {
				let e = await j(l.client, {
					limit: 100,
					status: "ACTIVE"
				});
				T.value = e.data;
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.tasks.projects_failed")));
			}
			try {
				S.value = await te(l.client);
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.tasks.members_failed")));
			}
		}
		async function oe() {
			let e = {};
			D.value && (e.project_id = D.value.id), O.value && (e.assignee_id = O.value.id), E.value = !0;
			try {
				g.value = await Vn(l.client, e);
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.board.load_failed")));
			} finally {
				E.value = !1;
			}
		}
		function se(e, t) {
			let n = t instanceof HTMLElement ? t : null;
			P.get(e) !== n && (N.get(e)?.destroy(), N.delete(e), P.delete(e), n !== null && (P.set(e, n), N.set(e, Q.create(n, {
				group: "tasks",
				animation: 150,
				draggable: "[data-task-id]",
				ghostClass: "opacity-40",
				onStart: () => {
					F = !0;
				},
				onEnd: (e) => {
					pe(e), setTimeout(() => {
						F = !1;
					});
				}
			}))));
		}
		function le(e) {
			let t = e.item, n = e.oldIndex ?? 0;
			t.parentNode?.removeChild(t), e.from.insertBefore(t, e.from.children[n] ?? null);
		}
		function R(e) {
			return g.value.find((t) => t.status.id === e);
		}
		async function pe(e) {
			let t = Number(e.from.dataset.statusId), n = Number(e.to.dataset.statusId), r = e.oldIndex ?? 0, i = e.newIndex ?? 0;
			if (le(e), Number.isNaN(t) || Number.isNaN(n) || t === n && r === i) return;
			let a = R(t), o = R(n);
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
				let e = await qn(l.client, c.id, {
					task_status_id: n,
					before_id: d?.id ?? null,
					after_id: f?.id ?? null
				});
				Object.assign(c, e), t !== n && l.notify("success", u("tasks_projects.board.moved", {
					name: c.name,
					status: o.status.name
				}));
			} catch (e) {
				a.tasks = s.from, o.tasks = s.to, l.notify("error", L(e, u("tasks_projects.board.move_failed")));
			}
		}
		function me(e) {
			A.value = null, M.value = {
				task_status_id: e.id,
				project_id: D.value?.id ?? null
			}, k.value = !0;
		}
		function he(e) {
			F || (A.value = e, M.value = {}, k.value = !0);
		}
		function ge(e) {
			let t = A.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			k.value = !1, A.value = null, l.notify("success", t), oe();
		}
		function _e(e) {
			k.value = !1, A.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), oe();
		}
		function ve() {
			D.value = null, O.value = null;
		}
		function ye(e) {
			if (e.project_id === null) return null;
			let t = T.value.find((t) => t.id === e.project_id);
			return t?.identifier || t?.name || null;
		}
		function be(e) {
			if (e.assignee_id === null) return null;
			let t = S.value.find((t) => t.id === e.assignee_id);
			return t ? ue(t.name) : `#${e.assignee_id}`;
		}
		function xe(e) {
			return e.assignee_id === null ? u("tasks_projects.tasks.unassigned") : S.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function Se(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function Ce(e) {
			return ee[e];
		}
		return (t, l) => {
			let p = y("BaseBreadcrumbItem"), m = y("BaseBreadcrumb"), _ = y("BaseIcon"), C = y("BaseButton"), T = y("router-link"), j = y("BasePageHeader"), ee = y("BaseSelectInput"), N = y("BaseInputGroup"), P = y("BaseFilterWrapper"), F = y("BaseSpinner"), te = y("BaseEmptyPlaceholder"), L = y("BasePage");
			return h(), n(L, null, {
				default: w(() => [
					s(j, { title: x(u)("tasks_projects.board.title") }, {
						actions: w(() => [a("div", cr, [s(T, { to: "/admin/modules/tasks-projects" }, {
							default: w(() => [s(C, { variant: "white" }, {
								left: w((e) => [s(_, {
									name: "FolderIcon",
									class: d(e.class)
								}, null, 8, ["class"])]),
								default: w(() => [o(" " + b(x(u)("tasks_projects.projects.title")), 1)]),
								_: 1
							})]),
							_: 1
						})])]),
						default: w(() => [s(m, null, {
							default: w(() => [
								s(p, {
									title: x(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								s(p, {
									title: x(u)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								s(p, {
									title: x(u)("tasks_projects.board.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					s(P, {
						show: !0,
						class: "mt-4",
						onClear: ve
					}, {
						default: w(() => [s(N, {
							label: x(u)("tasks_projects.board.filters.project"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(ee, {
								modelValue: D.value,
								"onUpdate:modelValue": l[0] ||= (e) => D.value = e,
								options: ne.value,
								placeholder: x(u)("tasks_projects.board.filters.all_projects"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]), s(N, {
							label: x(u)("tasks_projects.board.filters.assignee"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(ee, {
								modelValue: O.value,
								"onUpdate:modelValue": l[1] ||= (e) => O.value = e,
								options: I.value,
								placeholder: x(u)("tasks_projects.board.filters.all_assignees"),
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
					E.value && g.value.length === 0 ? (h(), i("div", lr, [s(F, { class: "h-8 w-8 text-primary-500" })])) : ie.value ? (h(), n(te, {
						key: 1,
						title: x(u)("tasks_projects.task_statuses.none"),
						description: x(u)("tasks_projects.tasks.empty_description")
					}, {
						default: w(() => [s(_, {
							name: "ViewColumnsIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"])) : (h(), i("div", ur, [(h(!0), i(e, null, v(g.value, (t) => (h(), i("section", {
						key: t.status.id,
						class: "w-72 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
					}, [
						a("header", dr, [a("div", fr, [
							a("span", {
								class: d(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", t.status.colour ? "" : "bg-line-default"]),
								style: f(t.status.colour ? { backgroundColor: t.status.colour } : void 0)
							}, null, 6),
							a("h3", pr, b(t.status.name), 1),
							a("span", mr, b(t.tasks.length), 1)
						]), a("button", {
							type: "button",
							class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
							"aria-label": x(u)("tasks_projects.tasks.new_task"),
							title: x(u)("tasks_projects.tasks.new_task"),
							onClick: (e) => me(t.status)
						}, [s(_, {
							name: "PlusIcon",
							class: "h-4 w-4"
						})], 8, hr)]),
						a("div", {
							ref_for: !0,
							ref: (e) => se(t.status.id, e),
							"data-status-id": t.status.id,
							class: "min-h-[80px] space-y-2 px-3 pt-3"
						}, [(h(!0), i(e, null, v(t.tasks, (e) => (h(), i("article", {
							key: e.id,
							"data-task-id": e.id,
							class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
							onClick: (t) => he(e)
						}, [
							a("div", vr, [a("p", yr, b(e.name), 1), e.priority ? (h(), i("span", {
								key: 0,
								class: d(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", Ce(e.priority)])
							}, b(Se(e.priority)), 3)) : r("", !0)]),
							a("div", br, [
								a("span", null, "#" + b(e.number), 1),
								ye(e) ? (h(), i("span", xr, b(ye(e)), 1)) : r("", !0),
								e.billable ? (h(), i("span", Sr, [s(_, {
									name: "CurrencyDollarIcon",
									class: "mr-0.5 h-3.5 w-3.5"
								}), o(" " + b(x(u)("tasks_projects.tasks.billable")), 1)])) : r("", !0)
							]),
							a("div", Cr, [e.due_date ? (h(), i("span", {
								key: 0,
								class: d(["text-xs", x(de)(e.due_date) && !e.closed_at ? "font-medium text-status-red" : "text-muted"])
							}, b(x(ce)(e.due_date)), 3)) : (h(), i("span", wr, "-")), be(e) ? (h(), i("span", {
								key: 2,
								class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
								title: xe(e)
							}, b(be(e)), 9, Tr)) : r("", !0)])
						], 8, _r))), 128))], 8, gr),
						t.tasks.length === 0 ? (h(), i("p", Er, b(x(u)("tasks_projects.board.empty_column")), 1)) : r("", !0),
						a("div", Dr, [a("button", {
							type: "button",
							class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
							onClick: (e) => me(t.status)
						}, " + " + b(x(u)("tasks_projects.tasks.new_task")), 9, Or)])
					]))), 128))])),
					s(sr, {
						show: k.value,
						client: c.client,
						notify: c.notify,
						task: A.value,
						statuses: re.value,
						members: S.value,
						projects: ne.value,
						defaults: M.value,
						onClose: l[2] ||= (e) => k.value = !1,
						onSaved: ge,
						onDeleted: _e
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
}), Ar = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, jr = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body"
}, Mr = { key: 1 }, Nr = { class: "text-body" }, Pr = {
	key: 2,
	class: "text-subtle"
}, Fr = { key: 3 }, Ir = { class: "text-body" }, Lr = { class: "flex items-center justify-end space-x-5" }, Rr = { class: "mt-6 flex overflow-x-auto border-b border-line-default" }, zr = [
	"href",
	"aria-current",
	"onClick"
], Br = {
	key: 0,
	class: "flex justify-center py-16"
}, Vr = "extension.page.tasks-projects.project", Hr = /* @__PURE__ */ c({
	__name: "ProjectDetailPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(c) {
		let l = c, u = fe(), f = _(null), p = _(null), g = _(!0), S = _(!1), T = _(!1), E = t(() => Number(l.id)), D = t(() => [
			{
				id: "overview",
				label: u("tasks_projects.project.tabs.overview"),
				name: `${Vr}.overview`
			},
			{
				id: "tasks",
				label: u("tasks_projects.project.tabs.tasks"),
				name: `${Vr}.tasks`
			},
			{
				id: "time",
				label: u("tasks_projects.project.tabs.time"),
				name: `${Vr}.time`
			},
			{
				id: "members",
				label: u("tasks_projects.project.tabs.members"),
				name: `${Vr}.members`
			}
		]), O = t(() => String(l.router.currentRoute.value.name ?? "")), k = t(() => f.value?.name ?? u("tasks_projects.projects.title"));
		C(E, () => {
			j();
		}), C(O, (e) => A(e)), m(() => {
			A(O.value), j();
		});
		function A(e) {
			e === Vr && l.router.replace({
				name: `${Vr}.overview`,
				params: { id: l.id }
			});
		}
		async function j() {
			g.value = !0;
			try {
				f.value = await Jn(l.client, E.value), await M();
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.project.load_failed")));
			} finally {
				g.value = !1;
			}
		}
		async function M() {
			let e = f.value?.customer_id ?? null;
			if (e === null) {
				p.value = null;
				return;
			}
			try {
				let t = await $n(l.client, e);
				p.value = t.display_name || t.name || `#${e}`;
			} catch {
				p.value = `#${e}`;
			}
		}
		function ee(e) {
			return {
				name: e.name,
				params: { id: l.id }
			};
		}
		function F(e) {
			return O.value === e.name;
		}
		function te(e) {
			T.value = !1, l.notify("success", u("tasks_projects.projects.updated", { name: e.name })), j();
		}
		async function ne() {
			let e = f.value;
			if (!(e === null || S.value)) {
				S.value = !0;
				try {
					e.status === "ARCHIVED" ? (await P(l.client, e.id), l.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await N(l.client, e.id), l.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), await j();
				} catch (e) {
					l.notify("error", L(e, u("tasks_projects.projects.save_failed")));
				} finally {
					S.value = !1;
				}
			}
		}
		function I(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function re(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, l) => {
			let m = y("BaseBreadcrumbItem"), _ = y("BaseBreadcrumb"), C = y("BaseBadge"), E = y("BaseIcon"), O = y("BaseButton"), A = y("router-link"), M = y("BasePageHeader"), N = y("BaseSpinner"), P = y("router-view"), L = y("BasePage");
			return h(), n(L, null, {
				default: w(() => [
					s(M, { title: k.value }, {
						actions: w(() => [a("div", Lr, [
							s(A, { to: "/admin/modules/tasks-projects/board" }, {
								default: w(() => [s(O, { variant: "white" }, {
									left: w((e) => [s(E, {
										name: "ViewColumnsIcon",
										class: d(e.class)
									}, null, 8, ["class"])]),
									default: w(() => [o(" " + b(x(u)("tasks_projects.project.board")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							f.value ? (h(), n(O, {
								key: 0,
								variant: "primary-outline",
								loading: S.value,
								disabled: S.value,
								onClick: ne
							}, {
								default: w(() => [o(b(f.value.status === "ARCHIVED" ? x(u)("tasks_projects.projects.unarchive") : x(u)("tasks_projects.projects.archive")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : r("", !0),
							f.value ? (h(), n(O, {
								key: 1,
								variant: "primary",
								onClick: l[0] ||= (e) => T.value = !0
							}, {
								left: w((e) => [s(E, {
									name: "PencilIcon",
									class: d(e.class)
								}, null, 8, ["class"])]),
								default: w(() => [o(" " + b(x(u)("tasks_projects.general.edit")), 1)]),
								_: 1
							})) : r("", !0)
						])]),
						default: w(() => [s(_, null, {
							default: w(() => [
								s(m, {
									title: x(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								s(m, {
									title: x(u)("tasks_projects.projects.title"),
									to: "/admin/modules/tasks-projects"
								}, null, 8, ["title"]),
								s(m, {
									title: k.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), f.value ? (h(), i("div", Ar, [
							s(C, { class: d(["rounded-full", I(f.value.status)]) }, {
								default: w(() => [o(b(re(f.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							f.value.identifier ? (h(), i("span", jr, b(f.value.identifier), 1)) : r("", !0),
							f.value.customer_id ? (h(), i("span", Mr, [o(b(x(u)("tasks_projects.project.customer")) + ": ", 1), a("span", Nr, b(p.value ?? `#${f.value.customer_id}`), 1)])) : (h(), i("span", Pr, b(x(u)("tasks_projects.projects.internal")), 1)),
							f.value.due_date ? (h(), i("span", Fr, [o(b(x(u)("tasks_projects.project.due_date")) + ": ", 1), a("span", Ir, b(x(ce)(f.value.due_date)), 1)])) : r("", !0)
						])) : r("", !0)]),
						_: 1
					}, 8, ["title"]),
					a("nav", Rr, [(h(!0), i(e, null, v(D.value, (e) => (h(), n(A, {
						key: e.id,
						to: ee(e),
						custom: ""
					}, {
						default: w(({ href: t, navigate: n }) => [a("a", {
							href: t,
							"aria-current": F(e) ? "page" : void 0,
							class: d(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", F(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, b(e.label), 11, zr)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					g.value && f.value === null ? (h(), i("div", Br, [s(N, { class: "h-8 w-8 text-primary-500" })])) : (h(), n(P, {
						key: 1,
						project: f.value,
						onRefresh: j
					}, null, 8, ["project"])),
					s(ve, {
						show: T.value,
						client: c.client,
						notify: c.notify,
						project: f.value,
						onClose: l[1] ||= (e) => T.value = !1,
						onSaved: te
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
}), Ur = { class: "py-4" }, Wr = { class: "rounded-xl border border-line-default bg-surface p-5" }, Gr = { class: "flex flex-col gap-4 lg:flex-row lg:items-end" }, Kr = {
	key: 0,
	class: "mt-3 text-xs text-subtle"
}, qr = { class: "mt-4 overflow-hidden rounded-xl border border-line-default bg-surface" }, Jr = {
	key: 0,
	class: "flex justify-center py-10"
}, Yr = {
	key: 1,
	class: "px-5 py-8 text-center text-sm text-muted"
}, Xr = {
	key: 2,
	class: "divide-y divide-line-light"
}, Zr = { class: "text-sm font-medium text-heading" }, Qr = { class: "text-xs text-muted" }, $r = {
	key: 1,
	class: "text-subtle"
}, ei = /* @__PURE__ */ c({
	__name: "ProjectMembersTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	setup(c) {
		let l = c, u = fe(), f = _([]), p = _([]), g = _(!0), S = _(!1), C = _(null), T = _(null), E = _(""), D = _({}), O = t(() => l.project?.id ?? Number(l.id)), k = t(() => p.value.filter((e) => !f.value.some((t) => t.user_id === e.id)).map((e) => ({
			id: e.id,
			label: e.name
		})));
		m(() => {
			A();
		});
		async function A() {
			g.value = !0;
			try {
				p.value = await te(l.client);
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				f.value = await Yn(l.client, O.value);
			} catch (e) {
				l.notify("error", L(e, u("tasks_projects.project.members.load_failed")));
			} finally {
				g.value = !1;
			}
		}
		function j(e) {
			return p.value.find((t) => t.id === e)?.name ?? u("tasks_projects.project.time.removed_member");
		}
		async function M() {
			let e = T.value;
			if (!(e === null || S.value)) {
				S.value = !0, D.value = {};
				try {
					await Xn(l.client, O.value, {
						user_id: e.id,
						rate: ae(E.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), T.value = null, E.value = "", await A();
				} catch (e) {
					D.value = re(e), l.notify("error", L(e, u("tasks_projects.project.members.attach_failed")));
				} finally {
					S.value = !1;
				}
			}
		}
		async function ee(e) {
			let t = j(e.user_id);
			if (window.confirm(u("tasks_projects.project.members.detach_confirm", { name: t }))) {
				C.value = e.user_id;
				try {
					await Zn(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", L(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					C.value = null;
				}
			}
		}
		return (t, c) => {
			let l = y("BaseSelectInput"), p = y("BaseInputGroup"), m = y("BaseInput"), _ = y("BaseIcon"), O = y("BaseButton"), A = y("BaseSpinner"), N = y("BaseFormatMoney");
			return h(), i("div", Ur, [a("div", Wr, [a("div", Gr, [
				s(p, {
					label: x(u)("tasks_projects.project.members.member"),
					error: D.value.user_id,
					class: "flex-1"
				}, {
					default: w(() => [s(l, {
						modelValue: T.value,
						"onUpdate:modelValue": c[0] ||= (e) => T.value = e,
						options: k.value,
						placeholder: x(u)("tasks_projects.project.members.attach_placeholder"),
						"label-key": "label"
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "error"]),
				s(p, {
					label: x(u)("tasks_projects.project.members.rate"),
					error: D.value.rate,
					"help-text": x(u)("tasks_projects.project.members.rate_help"),
					class: "flex-1"
				}, {
					default: w(() => [s(m, {
						modelValue: E.value,
						"onUpdate:modelValue": c[1] ||= (e) => E.value = e,
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
				s(O, {
					variant: "primary",
					class: "lg:mb-1",
					loading: S.value,
					disabled: S.value || T.value === null,
					onClick: M
				}, {
					left: w((e) => [s(_, {
						name: "PlusIcon",
						class: d(e.class)
					}, null, 8, ["class"])]),
					default: w(() => [o(" " + b(x(u)("tasks_projects.project.members.attach")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			]), k.value.length === 0 && !g.value ? (h(), i("p", Kr, b(x(u)("tasks_projects.project.members.all_attached")), 1)) : r("", !0)]), a("div", qr, [g.value ? (h(), i("div", Jr, [s(A, { class: "h-6 w-6 text-primary-500" })])) : f.value.length === 0 ? (h(), i("p", Yr, b(x(u)("tasks_projects.project.members.empty")), 1)) : (h(), i("ul", Xr, [(h(!0), i(e, null, v(f.value, (e) => (h(), i("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [a("div", null, [a("p", Zr, b(j(e.user_id)), 1), a("p", Qr, [o(b(x(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (h(), i("span", $r, b(x(u)("tasks_projects.tasks.none")), 1)) : (h(), n(N, {
				key: 0,
				amount: e.rate
			}, null, 8, ["amount"]))])]), s(O, {
				variant: "danger",
				size: "sm",
				loading: C.value === e.user_id,
				disabled: C.value === e.user_id,
				onClick: (t) => ee(e)
			}, {
				default: w(() => [o(b(x(u)("tasks_projects.general.delete")), 1)]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"onClick"
			])]))), 128))]))])]);
		};
	}
}), ti = {
	key: 0,
	class: "py-6"
}, ni = { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, ri = { class: "rounded-xl border border-line-default bg-surface p-5" }, ii = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ai = { class: "mt-2 text-2xl font-semibold text-heading" }, oi = { class: "mt-1 text-xs text-muted" }, si = { class: "rounded-xl border border-line-default bg-surface p-5" }, ci = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, li = { class: "mt-2 text-2xl font-semibold text-heading" }, ui = { class: "mt-1 text-xs text-muted" }, di = { class: "rounded-xl border border-line-default bg-surface p-5" }, fi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, pi = { class: "mt-2 text-2xl font-semibold text-heading" }, mi = { class: "rounded-xl border border-line-default bg-surface p-5" }, hi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, gi = { class: "mt-2 text-2xl font-semibold text-heading" }, _i = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, vi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, yi = { class: "mt-2 text-sm text-body" }, bi = { class: "mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, xi = {
	key: 0,
	class: "mt-2 text-xs font-medium text-status-red"
}, Si = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Ci = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, wi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ti = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, Ei = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Di = {
	key: 1,
	class: "flex justify-center py-16"
}, Oi = /* @__PURE__ */ c({
	__name: "ProjectOverviewTab",
	props: { project: {} },
	setup(n) {
		let o = n, c = fe(), l = t(() => o.project?.totals ?? null), u = t(() => o.project?.budget_minutes ?? null), p = t(() => {
			let e = u.value, t = l.value?.logged_minutes ?? 0;
			return e ? Math.min(100, Math.round(t / e * 100)) : 0;
		}), m = t(() => {
			let e = u.value, t = l.value?.logged_minutes ?? 0;
			return e && t > e ? t - e : 0;
		});
		return (t, o) => {
			let g = y("BaseFormatMoney"), _ = y("BaseSpinner");
			return n.project && l.value ? (h(), i("div", ti, [
				a("div", ni, [
					a("div", ri, [
						a("p", ii, b(x(c)("tasks_projects.project.overview.tasks")), 1),
						a("p", ai, b(l.value.tasks.total), 1),
						a("p", oi, b(x(c)("tasks_projects.project.overview.open_tasks", { count: l.value.tasks.open })) + " · " + b(x(c)("tasks_projects.project.overview.closed_tasks", { count: l.value.tasks.closed })), 1)
					]),
					a("div", si, [
						a("p", ci, b(x(c)("tasks_projects.project.overview.logged")), 1),
						a("p", li, b(x(R)(l.value.logged_minutes)), 1),
						a("p", ui, b(x(c)("tasks_projects.project.overview.billable")) + ": " + b(x(R)(l.value.billable_minutes)), 1)
					]),
					a("div", di, [a("p", fi, b(x(c)("tasks_projects.project.overview.billable_amount")), 1), a("p", pi, [s(g, { amount: l.value.billable_amount }, null, 8, ["amount"])])]),
					a("div", mi, [a("p", hi, b(x(c)("tasks_projects.project.overview.unbilled_amount")), 1), a("p", gi, [s(g, { amount: l.value.unbilled_amount }, null, 8, ["amount"])])])
				]),
				a("div", _i, [a("p", vi, b(x(c)("tasks_projects.project.overview.budget")), 1), u.value ? (h(), i(e, { key: 0 }, [
					a("p", yi, b(x(c)("tasks_projects.project.overview.budget_used", {
						used: x(R)(l.value.logged_minutes),
						total: x(R)(u.value)
					})), 1),
					a("div", bi, [a("div", {
						class: d(["h-2 rounded-full", m.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: f({ width: `${p.value}%` })
					}, null, 6)]),
					m.value > 0 ? (h(), i("p", xi, b(x(c)("tasks_projects.project.overview.budget_over", { amount: x(R)(m.value) })), 1)) : r("", !0)
				], 64)) : (h(), i("p", Si, b(x(c)("tasks_projects.project.overview.no_budget")), 1))]),
				a("div", Ci, [a("p", wi, b(x(c)("tasks_projects.project.overview.description")), 1), n.project.description ? (h(), i("p", Ti, b(n.project.description), 1)) : (h(), i("p", Ei, b(x(c)("tasks_projects.project.overview.no_description")), 1))])
			])) : (h(), i("div", Di, [s(_, { class: "h-8 w-8 text-primary-500" })]));
		};
	}
}), ki = { class: "relative table-container" }, Ai = ["onClick"], ji = { class: "inline-flex items-center" }, Mi = {
	key: 1,
	class: "text-subtle"
}, Ni = {
	key: 1,
	class: "text-subtle"
}, Pi = 10, Fi = 350, Ii = /* @__PURE__ */ c({
	__name: "TaskList",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		projectId: {},
		filterable: { type: Boolean }
	},
	emits: ["changed"],
	setup(e, { expose: c, emit: l }) {
		let u = e, v = l, E = fe(), D = _(null), O = _(!0), k = _(0), A = _([]), M = _([]), ee = _([]), N = _(!1), P = _(null), F = _({}), ne = _(null), I = g({
			search: "",
			status: null,
			assignee: null
		}), re = t(() => A.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), ie = t(() => M.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), ae = t(() => I.search.trim() !== "" || I.status !== null || I.assignee !== null), oe = t(() => !O.value && k.value === 0 && !ae.value), se = t(() => [
			{
				key: "number",
				label: E("tasks_projects.tasks.columns.number"),
				sortable: !1,
				tdClass: "text-muted"
			},
			{
				key: "name",
				label: E("tasks_projects.tasks.columns.name"),
				sortable: !1,
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: E("tasks_projects.tasks.columns.status"),
				sortable: !1
			},
			{
				key: "assignee",
				label: E("tasks_projects.tasks.columns.assignee"),
				sortable: !1
			},
			{
				key: "priority",
				label: E("tasks_projects.tasks.columns.priority"),
				sortable: !1
			},
			{
				key: "due_date",
				label: E("tasks_projects.tasks.columns.due_date"),
				sortable: !1
			},
			{
				key: "actions",
				label: E("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]), le = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, R;
		C(() => I.search, () => {
			clearTimeout(R), R = setTimeout(() => me(), Fi);
		}), C([
			() => I.status,
			() => I.assignee,
			() => u.projectId
		], () => me()), m(() => {
			ue();
		}), p(() => clearTimeout(R));
		async function ue() {
			try {
				A.value = await Hn(u.client);
			} catch (e) {
				u.notify("error", L(e, E("tasks_projects.task_statuses.load_failed")));
			}
			try {
				M.value = await te(u.client);
			} catch (e) {
				u.notify("error", L(e, E("tasks_projects.tasks.members_failed")));
			}
			if (!u.projectId) try {
				let e = await j(u.client, {
					limit: 100,
					status: "ACTIVE"
				});
				ee.value = e.data.map((e) => ({
					id: e.id,
					label: e.name
				}));
			} catch (e) {
				u.notify("error", L(e, E("tasks_projects.tasks.projects_failed")));
			}
		}
		async function pe({ page: e }) {
			let t = {
				page: e,
				limit: Pi
			};
			u.projectId && (t.project_id = u.projectId), I.status && (t.task_status_id = I.status.id), I.assignee && (t.assignee_id = I.assignee.id), I.search.trim() !== "" && (t.search = I.search.trim()), O.value = !0;
			try {
				let e = await Un(u.client, t);
				return k.value = e.meta.total, {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return u.notify("error", L(e, E("tasks_projects.tasks.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Pi
					}
				};
			} finally {
				O.value = !1;
			}
		}
		function me(e = !1) {
			D.value?.refresh(e);
		}
		function he() {
			I.search = "", I.status = null, I.assignee = null;
		}
		function ge() {
			P.value = null, F.value = { project_id: u.projectId ?? null }, N.value = !0;
		}
		function _e(e) {
			P.value = e, F.value = {}, N.value = !0;
		}
		function ve(e) {
			let t = P.value ? E("tasks_projects.tasks.updated", { name: e.name }) : E("tasks_projects.tasks.created", { name: e.name });
			N.value = !1, P.value = null, u.notify("success", t), me(!0), v("changed");
		}
		function ye(e) {
			N.value = !1, P.value = null, u.notify("success", E("tasks_projects.tasks.deleted", { name: e.name })), me(!0), v("changed");
		}
		function be(e) {
			return A.value.find((t) => t.id === e.task_status_id) ?? null;
		}
		function xe(e) {
			return e.assignee_id === null ? E("tasks_projects.tasks.unassigned") : M.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function Se(e) {
			return E(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function Ce(e) {
			return le[e];
		}
		async function we(e) {
			if (window.confirm(E("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				ne.value = e.id;
				try {
					await Kn(u.client, e.id), u.notify("success", E("tasks_projects.tasks.deleted", { name: e.name })), me(!0), v("changed");
				} catch (e) {
					u.notify("error", L(e, E("tasks_projects.tasks.delete_failed")));
				} finally {
					ne.value = null;
				}
			}
		}
		return c({
			openCreate: ge,
			refresh: me
		}), (t, c) => {
			let l = y("BaseInput"), u = y("BaseInputGroup"), p = y("BaseSelectInput"), m = y("BaseFilterWrapper"), g = y("BaseIcon"), _ = y("BaseButton"), v = y("BaseEmptyPlaceholder"), C = y("BaseDropdownItem"), O = y("BaseDropdown"), k = y("BaseTable");
			return h(), i("div", null, [
				e.filterable ? (h(), n(m, {
					key: 0,
					show: !0,
					class: "mt-3",
					onClear: he
				}, {
					default: w(() => [
						s(u, {
							label: x(E)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(l, {
								modelValue: I.search,
								"onUpdate:modelValue": c[0] ||= (e) => I.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: x(E)("tasks_projects.tasks.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]),
						s(u, {
							label: x(E)("tasks_projects.tasks.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(p, {
								modelValue: I.status,
								"onUpdate:modelValue": c[1] ||= (e) => I.status = e,
								options: re.value,
								placeholder: x(E)("tasks_projects.tasks.all_tasks"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						s(u, {
							label: x(E)("tasks_projects.tasks.columns.assignee"),
							class: "mt-2 flex-1"
						}, {
							default: w(() => [s(p, {
								modelValue: I.assignee,
								"onUpdate:modelValue": c[2] ||= (e) => I.assignee = e,
								options: ie.value,
								placeholder: x(E)("tasks_projects.board.filters.all_assignees"),
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
				})) : r("", !0),
				T(s(v, {
					title: x(E)("tasks_projects.tasks.empty_title"),
					description: x(E)("tasks_projects.tasks.empty_description")
				}, {
					actions: w(() => [s(_, {
						variant: "primary",
						onClick: ge
					}, {
						left: w((e) => [s(g, {
							name: "PlusIcon",
							class: d(e.class)
						}, null, 8, ["class"])]),
						default: w(() => [o(" " + b(x(E)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})]),
					default: w(() => [s(g, {
						name: "ClipboardDocumentListIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"]), [[S, oe.value]]),
				T(a("div", ki, [s(k, {
					ref_key: "tableRef",
					ref: D,
					data: pe,
					columns: se.value,
					class: "mt-3"
				}, {
					"cell-number": w(({ row: e }) => [o("#" + b(e.data.number), 1)]),
					"cell-name": w(({ row: e }) => [a("button", {
						type: "button",
						class: "text-left hover:text-primary-500",
						onClick: (t) => _e(e.data)
					}, b(e.data.name), 9, Ai)]),
					"cell-status": w(({ row: e }) => [a("span", ji, [a("span", {
						class: d(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", be(e.data)?.colour ? "" : "bg-line-default"]),
						style: f(be(e.data)?.colour ? { backgroundColor: be(e.data)?.colour } : void 0)
					}, null, 6), o(" " + b(be(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": w(({ row: e }) => [a("span", { class: d(e.data.assignee_id === null ? "text-subtle" : "") }, b(xe(e.data)), 3)]),
					"cell-priority": w(({ row: e }) => [e.data.priority ? (h(), i("span", {
						key: 0,
						class: d(["rounded-full px-2 py-0.5 text-xs font-medium", Ce(e.data.priority)])
					}, b(Se(e.data.priority)), 3)) : (h(), i("span", Mi, "-"))]),
					"cell-due_date": w(({ row: e }) => [e.data.due_date ? (h(), i("span", {
						key: 0,
						class: d(x(de)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "")
					}, b(x(ce)(e.data.due_date)), 3)) : (h(), i("span", Ni, "-"))]),
					"cell-actions": w(({ row: e }) => [s(O, { "content-loading": ne.value === e.data.id }, {
						activator: w(() => [s(g, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: w(() => [s(C, { onClick: (t) => _e(e.data) }, {
							default: w(() => [s(g, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), o(" " + b(x(E)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), s(C, { onClick: (t) => we(e.data) }, {
							default: w(() => [s(g, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), o(" " + b(x(E)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1032, ["content-loading"])]),
					_: 1
				}, 8, ["columns"])], 512), [[S, !oe.value]]),
				s(sr, {
					show: N.value,
					client: e.client,
					notify: e.notify,
					task: P.value,
					statuses: A.value,
					members: M.value,
					projects: ee.value,
					defaults: F.value,
					"lock-project": !!e.projectId,
					onClose: c[3] ||= (e) => N.value = !1,
					onSaved: ve,
					onDeleted: ye
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
}), Li = { class: "py-4" }, Ri = { class: "flex justify-end" }, zi = /* @__PURE__ */ c({
	__name: "ProjectTasksTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: n }) {
		let r = e, c = n, l = fe(), u = _(null), f = t(() => r.project?.id ?? Number(r.id));
		function p() {
			c("refresh");
		}
		return (t, n) => {
			let r = y("BaseIcon"), c = y("BaseButton");
			return h(), i("div", Li, [a("div", Ri, [s(c, {
				variant: "primary",
				onClick: n[0] ||= (e) => u.value?.openCreate()
			}, {
				left: w((e) => [s(r, {
					name: "PlusIcon",
					class: d(e.class)
				}, null, 8, ["class"])]),
				default: w(() => [o(" " + b(x(l)("tasks_projects.tasks.new_task")), 1)]),
				_: 1
			})]), s(Ii, {
				ref_key: "listRef",
				ref: u,
				client: e.client,
				notify: e.notify,
				"project-id": f.value,
				filterable: "",
				onChanged: p
			}, null, 8, [
				"client",
				"notify",
				"project-id"
			])]);
		};
	}
}), Bi = { class: "relative py-4 table-container" }, Vi = { class: "font-medium text-heading" }, Hi = {
	key: 0,
	class: "block text-xs text-muted"
}, Ui = {
	key: 0,
	class: "text-primary-500"
}, Wi = { key: 1 }, Gi = {
	key: 1,
	class: "text-subtle"
}, Ki = 15, qi = /* @__PURE__ */ c({
	__name: "ProjectTimeTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	setup(e) {
		let c = e, l = fe(), u = _([]), d = _([]), f = t(() => c.project?.id ?? Number(c.id)), p = t(() => [
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
		m(() => {
			g();
		});
		async function g() {
			try {
				u.value = await te(c.client);
			} catch (e) {
				c.notify("error", L(e, l("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await Un(c.client, {
					project_id: f.value,
					limit: 100
				});
				d.value = e.data;
			} catch (e) {
				c.notify("error", L(e, l("tasks_projects.tasks.load_failed")));
			}
		}
		async function v({ page: e }) {
			let t = {
				page: e,
				limit: Ki,
				project_id: f.value
			};
			try {
				let e = await Qn(c.client, t);
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
				return c.notify("error", L(e, l("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Ki
					}
				};
			}
		}
		function S(e) {
			return u.value.find((t) => t.id === e)?.name ?? l("tasks_projects.project.time.removed_member");
		}
		function C(e) {
			return d.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		return (e, t) => {
			let c = y("BaseIcon"), u = y("BaseFormatMoney"), d = y("BaseTable");
			return h(), i("div", Bi, [s(d, {
				data: v,
				columns: p.value
			}, {
				"cell-started_at": w(({ row: e }) => [o(b(e.data.started_at ? x(ce)(e.data.started_at) : "-"), 1)]),
				"cell-user": w(({ row: e }) => [o(b(S(e.data.user_id)), 1)]),
				"cell-task": w(({ row: e }) => [a("span", Vi, b(C(e.data.task_id)), 1), e.data.description ? (h(), i("span", Hi, b(e.data.description), 1)) : r("", !0)]),
				"cell-duration_minutes": w(({ row: e }) => [e.data.is_running ? (h(), i("span", Ui, b(x(l)("tasks_projects.project.time.running")), 1)) : (h(), i("span", Wi, b(x(R)(e.data.duration_minutes)), 1))]),
				"cell-billable": w(({ row: e }) => [e.data.billable ? (h(), n(c, {
					key: 0,
					name: "CheckCircleIcon",
					class: "h-5 w-5 text-status-green"
				})) : (h(), i("span", Gi, "-"))]),
				"cell-amount": w(({ row: e }) => [s(u, { amount: e.data.amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["columns"])]);
		};
	}
}), Ji = { class: "flex items-center justify-end space-x-5" }, Yi = /* @__PURE__ */ c({
	__name: "TasksPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(e) {
		let t = fe(), r = _(null);
		return (i, c) => {
			let l = y("BaseBreadcrumbItem"), u = y("BaseBreadcrumb"), f = y("BaseIcon"), p = y("BaseButton"), m = y("router-link"), g = y("BasePageHeader"), _ = y("BasePage");
			return h(), n(_, null, {
				default: w(() => [s(g, { title: x(t)("tasks_projects.tasks.title") }, {
					actions: w(() => [a("div", Ji, [s(m, { to: "/admin/modules/tasks-projects/board" }, {
						default: w(() => [s(p, { variant: "white" }, {
							left: w((e) => [s(f, {
								name: "ViewColumnsIcon",
								class: d(e.class)
							}, null, 8, ["class"])]),
							default: w(() => [o(" " + b(x(t)("tasks_projects.board.title")), 1)]),
							_: 1
						})]),
						_: 1
					}), s(p, {
						variant: "primary",
						onClick: c[0] ||= (e) => r.value?.openCreate()
					}, {
						left: w((e) => [s(f, {
							name: "PlusIcon",
							class: d(e.class)
						}, null, 8, ["class"])]),
						default: w(() => [o(" " + b(x(t)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})])]),
					default: w(() => [s(u, null, {
						default: w(() => [
							s(l, {
								title: x(t)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]),
							s(l, {
								title: x(t)("tasks_projects.projects.title"),
								to: "/admin/modules/tasks-projects"
							}, null, 8, ["title"]),
							s(l, {
								title: x(t)("tasks_projects.tasks.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])
						]),
						_: 1
					})]),
					_: 1
				}, 8, ["title"]), s(Ii, {
					ref_key: "listRef",
					ref: r,
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
function Xi(e, t) {
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
//#region resources/js/registrations/board.ts
var Zi = "tasks-projects", Qi = {
	viewProject: `${Zi}:view-project`,
	editProject: `${Zi}:edit-project`,
	viewTask: `${Zi}:view-task`,
	viewOwnTime: `${Zi}:view-own-time`
};
function $i(e) {
	e.addMessages(je), e.registerPage({
		id: "board",
		module: Zi,
		path: "board",
		component: Xi(e, kr),
		meta: {
			ability: Qi.viewTask,
			title: "tasks_projects.board.title"
		}
	}), e.registerPage({
		id: "tasks",
		module: Zi,
		path: "tasks",
		component: Xi(e, Yi),
		meta: {
			ability: Qi.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "project",
		module: Zi,
		path: "projects/:id",
		component: Xi(e, Hr),
		meta: {
			ability: Qi.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: Xi(e, Oi),
				meta: {
					ability: Qi.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: Xi(e, zi),
				meta: {
					ability: Qi.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: Xi(e, qi),
				meta: {
					ability: Qi.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: Xi(e, ei),
				meta: {
					ability: Qi.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/init.ts
var ea = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(D), n.registerPage({
		id: "projects",
		module: ea,
		path: "",
		component: ta(n, Ae),
		meta: {
			ability: `${ea}:view-project`,
			title: "tasks_projects.projects.title"
		}
	}), $i(n);
});
function ta(e, t) {
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
