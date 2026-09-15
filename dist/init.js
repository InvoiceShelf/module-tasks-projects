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
async function P(e, t) {
	let { data: n } = await e.get(M.projects, { params: t });
	return n;
}
async function F(e, t) {
	let { data: n } = await e.post(M.projects, t);
	return n.data;
}
async function I(e, t, n) {
	let { data: r } = await e.put(M.project(t), n);
	return r.data;
}
async function L(e, t) {
	let { data: n } = await e.post(M.archiveProject(t));
	return n.data;
}
async function R(e, t) {
	let { data: n } = await e.post(M.unarchiveProject(t));
	return n.data;
}
async function z(e, t) {
	await e.delete(M.project(t));
}
async function B(e) {
	let { data: t } = await e.get(M.members);
	return t.data;
}
async function ee(e, t = 100) {
	let { data: n } = await e.get(N.customers, { params: { limit: t } });
	return n.data;
}
//#endregion
//#region resources/js/support/errors.ts
function V(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function H(e, t) {
	let n = V(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function te(e) {
	let t = V(e)?.errors, n = {};
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
		function L(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function R() {
			if (!D.value) try {
				let e = await ee(l.client);
				w.value = e.map((e) => ({
					id: e.id,
					label: L(e)
				})), D.value = !0, C.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", H(e, m("tasks_projects.projects.customers_failed")));
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
					let e = l.project, t = e ? await I(l.client, e.id, z()) : await F(l.client, z());
					u("saved", t);
				} catch (e) {
					O.value = te(e), l.notify("error", H(e, m("tasks_projects.projects.save_failed")));
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
}), ve = { class: "flex items-center justify-end space-x-5" }, ye = { class: "relative table-container" }, be = { class: "flex items-center" }, xe = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, Se = { key: 0 }, Ce = {
	key: 1,
	class: "text-subtle"
}, we = {
	key: 1,
	class: "text-subtle"
}, Te = { key: 0 }, Ee = {
	key: 1,
	class: "text-subtle"
}, De = 10, Oe = 350, ke = /* @__PURE__ */ l({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = de(), u = v(null), d = v(!1), h = v(!0), y = v(0), C = v(!1), O = v(null), k = v(null), A = _({
			search: "",
			status: "ACTIVE"
		}), j = n(() => [
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
		]), M = n({
			get: () => j.value.find((e) => e.id === A.status) ?? j.value[0],
			set: (e) => {
				A.status = e.id;
			}
		}), N = n(() => [
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
		]), F = n(() => A.search.trim() !== "" || A.status !== "ACTIVE"), I = n(() => !h.value && y.value === 0 && !F.value), B;
		T(() => A.search, () => {
			clearTimeout(B), B = setTimeout(() => V(), Oe);
		}), T(() => A.status, () => V()), m(() => clearTimeout(B));
		async function ee({ page: e }) {
			let n = {
				page: e,
				limit: De
			};
			A.status !== "ALL" && (n.status = A.status), A.search.trim() !== "" && (n.search = A.search.trim()), h.value = !0;
			try {
				let e = await P(t.client, n);
				return y.value = e.meta.total, {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return t.notify("error", H(e, l("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: De
					}
				};
			} finally {
				h.value = !1;
			}
		}
		function V(e = !1) {
			u.value?.refresh(e);
		}
		function te() {
			d.value && ne(), d.value = !d.value;
		}
		function ne() {
			A.search = "", A.status = "ACTIVE";
		}
		function re() {
			O.value = null, C.value = !0;
		}
		function ie(e) {
			O.value = e, C.value = !0;
		}
		function ae(e) {
			let n = O.value ? l("tasks_projects.projects.updated", { name: e.name }) : l("tasks_projects.projects.created", { name: e.name });
			C.value = !1, O.value = null, t.notify("success", n), V();
		}
		async function se(e) {
			k.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await R(t.client, e.id), t.notify("success", l("tasks_projects.projects.unarchived", { name: e.name }))) : (await L(t.client, e.id), t.notify("success", l("tasks_projects.projects.archived", { name: e.name }))), V(!0);
			} catch (e) {
				t.notify("error", H(e, l("tasks_projects.projects.save_failed")));
			} finally {
				k.value = null;
			}
		}
		async function ce(e) {
			if (window.confirm(l("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				k.value = e.id;
				try {
					await z(t.client, e.id), t.notify("success", l("tasks_projects.projects.deleted", { name: e.name })), V(!0);
				} catch (e) {
					t.notify("error", H(e, l("tasks_projects.projects.delete_failed")));
				} finally {
					k.value = null;
				}
			}
		}
		function le(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function ue(e) {
			return l(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, n) => {
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), _ = b("BaseIcon"), v = b("BaseButton"), y = b("router-link"), T = b("BasePageHeader"), P = b("BaseInput"), F = b("BaseInputGroup"), L = b("BaseSelectInput"), R = b("BaseFilterWrapper"), z = b("BaseEmptyPlaceholder"), B = b("BaseBadge"), V = b("BaseFormatMoney"), H = b("BaseDropdownItem"), de = b("BaseDropdown"), fe = b("BaseTable"), pe = b("BasePage");
			return g(), r(pe, null, {
				default: E(() => [
					c(T, { title: S(l)("tasks_projects.projects.title") }, {
						actions: E(() => [o("div", ve, [
							c(y, { to: "/admin/modules/tasks-projects/board" }, {
								default: E(() => [c(v, { variant: "white" }, {
									left: E((e) => [c(_, {
										name: "ViewColumnsIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(l)("tasks_projects.board.title")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							c(v, {
								variant: "primary-outline",
								onClick: te
							}, {
								right: E((e) => [d.value ? (g(), r(_, {
									key: 1,
									name: "XMarkIcon",
									class: f(e.class)
								}, null, 8, ["class"])) : (g(), r(_, {
									key: 0,
									name: "FunnelIcon",
									class: f(e.class)
								}, null, 8, ["class"]))]),
								default: E(() => [s(x(S(l)("tasks_projects.general.filter")) + " ", 1)]),
								_: 1
							}),
							c(v, {
								variant: "primary",
								onClick: re
							}, {
								left: E((e) => [c(_, {
									name: "PlusIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: E(() => [s(" " + x(S(l)("tasks_projects.projects.new_project")), 1)]),
								_: 1
							})
						])]),
						default: E(() => [c(h, null, {
							default: E(() => [c(m, {
								title: S(l)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(m, {
								title: S(l)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(R, {
						show: d.value,
						class: "mt-3",
						onClear: ne
					}, {
						default: E(() => [c(F, {
							label: S(l)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(P, {
								modelValue: A.search,
								"onUpdate:modelValue": n[0] ||= (e) => A.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: S(l)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), c(F, {
							label: S(l)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(L, {
								modelValue: M.value,
								"onUpdate:modelValue": n[1] ||= (e) => M.value = e,
								options: j.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					D(c(z, {
						title: S(l)("tasks_projects.projects.empty_title"),
						description: S(l)("tasks_projects.projects.empty_description")
					}, {
						actions: E(() => [c(v, {
							variant: "primary",
							onClick: re
						}, {
							left: E((e) => [c(_, {
								name: "PlusIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: E(() => [s(" " + x(S(l)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})]),
						default: E(() => [c(_, {
							name: "FolderIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]), [[w, I.value]]),
					D(o("div", ye, [c(fe, {
						ref_key: "tableRef",
						ref: u,
						data: ee,
						columns: N.value,
						class: "mt-3"
					}, {
						"cell-name": E(({ row: e }) => [o("div", be, [o("span", {
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
						}, 1032, ["to"]), e.data.identifier ? (g(), a("span", xe, x(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": E(({ row: e }) => [c(B, { class: f(["rounded-full", le(e.data.status)]) }, {
							default: E(() => [s(x(ue(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": E(({ row: e }) => [e.data.customer_id ? (g(), a("span", Se, "#" + x(e.data.customer_id), 1)) : (g(), a("span", Ce, x(S(l)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": E(({ row: e }) => [e.data.default_rate === null ? (g(), a("span", we, "-")) : (g(), r(V, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", Te, x(S(oe)(e.data.due_date)), 1)) : (g(), a("span", Ee, "-"))]),
						"cell-actions": E(({ row: e }) => [c(de, { "content-loading": k.value === e.data.id }, {
							activator: E(() => [c(_, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: E(() => [
								c(H, { onClick: (t) => ie(e.data) }, {
									default: E(() => [c(_, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(l)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(H, { onClick: (t) => se(e.data) }, {
									default: E(() => [c(_, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + x(e.data.status === "ARCHIVED" ? S(l)("tasks_projects.projects.unarchive") : S(l)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(H, { onClick: (t) => ce(e.data) }, {
									default: E(() => [c(_, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(l)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[w, !I.value]]),
					c(_e, {
						show: C.value,
						client: e.client,
						notify: e.notify,
						project: O.value,
						onClose: n[2] ||= (e) => C.value = !1,
						onSaved: ae
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
}), Ae = "/api/v1/tasks-projects", je = {
	timeEntries: `${Ae}/time-entries`,
	timeEntry: (e) => `${Ae}/time-entries/${e}`,
	timer: `${Ae}/timer`,
	timerStart: `${Ae}/timer/start`,
	timerStop: `${Ae}/timer/stop`,
	taskStatuses: `${Ae}/task-statuses`,
	taskStatus: (e) => `${Ae}/task-statuses/${e}`,
	reorderTaskStatuses: `${Ae}/task-statuses/reorder`,
	tasks: `${Ae}/tasks`,
	task: (e) => `${Ae}/tasks/${e}`,
	members: `${Ae}/members`,
	settings: `${Ae}/settings`
}, Me = { bootstrap: "/api/v1/bootstrap" }, Ne = 100, Pe = 5, Fe = 10;
async function Ie(e, t) {
	let { data: n } = await e.get(je.timeEntries, { params: t });
	return n;
}
async function Le(e, t) {
	let n = [];
	for (let r = 1; r <= Pe; r += 1) {
		let i = await Ie(e, {
			...t,
			page: r,
			limit: Ne
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function Re(e, t) {
	let { data: n } = await e.post(je.timeEntries, t);
	return n.data;
}
async function ze(e, t, n) {
	let { data: r } = await e.put(je.timeEntry(t), n);
	return r.data;
}
async function Be(e, t) {
	await e.delete(je.timeEntry(t));
}
async function Ve(e) {
	let { data: t } = await e.get(je.timer);
	return t?.data ?? null;
}
async function He(e, t) {
	let { data: n } = await e.post(je.timerStart, t);
	return n.data;
}
async function Ue(e) {
	let { data: t } = await e.post(je.timerStop);
	return t.data;
}
async function We(e) {
	await e.delete(je.timer);
}
async function Ge(e) {
	let { data: t } = await e.get(je.taskStatuses);
	return t.data ?? [];
}
async function Ke(e, t) {
	let { data: n } = await e.post(je.taskStatuses, t);
	return n.data;
}
async function qe(e, t, n) {
	let { data: r } = await e.put(je.taskStatus(t), n);
	return r.data;
}
async function Je(e, t) {
	await e.delete(je.taskStatus(t));
}
async function Ye(e, t) {
	let { data: n } = await e.post(je.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function Xe(e, t, n = Fe) {
	let r = { limit: n };
	t.trim() !== "" && (r.search = t.trim());
	let { data: i } = await e.get(je.tasks, { params: r });
	return i.data ?? [];
}
async function Ze(e, t) {
	let { data: n } = await e.get(je.task(t));
	return n.data;
}
async function Qe(e) {
	let { data: t } = await e.get(je.members);
	return t.data ?? [];
}
async function $e(e) {
	let { data: t } = await e.get(je.settings);
	return t.data;
}
async function et(e) {
	let { data: t } = await e.get(Me.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var tt = _({}), nt = /* @__PURE__ */ new Set(), rt = 5;
function it(e) {
	return e === null ? "" : tt[e] ?? `#${e}`;
}
function at(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (tt[e.id] = e.name);
}
async function ot(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && tt[e] === void 0 && !nt.has(e));
	for (let e of n) nt.add(e);
	for (let t = 0; t < n.length; t += rt) await Promise.all(n.slice(t, t + rt).map(async (t) => {
		try {
			at(await Ze(e, t));
		} catch {} finally {
			nt.delete(t);
		}
	}));
}
function st() {
	for (let e of Object.keys(tt)) delete tt[Number(e)];
	nt.clear();
}
//#endregion
//#region resources/js/support/http.ts
function ct(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function lt(e) {
	return ct(e) === 409;
}
function ut(e) {
	return ct(e) === 403;
}
//#endregion
//#region resources/js/support/time.ts
var dt = 60, ft = 60, pt = 7;
function mt(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / ft), i = t % ft;
	return `${n}:${jt(r)}:${jt(i)}`;
}
function ht(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / dt)}:${jt(t % dt)}`;
}
function gt(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * dt + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * dt);
}
function _t(e) {
	let t = Ot(e);
	return t === null ? "" : wt(t);
}
function vt(e) {
	let t = Ot(e);
	return t === null ? "" : `${jt(t.getHours())}:${jt(t.getMinutes())}`;
}
function yt(e, t = "09:00") {
	let n = kt(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function bt(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * ft * 1e3), n.toISOString();
}
function xt(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = At(e), i = (r.getDay() - n + pt) % pt;
	return r.setDate(r.getDate() - i), r;
}
function St(e) {
	return Array.from({ length: pt }, (t, n) => Ct(e, n));
}
function Ct(e, t) {
	let n = At(e);
	return n.setDate(n.getDate() + t), n;
}
function wt(e) {
	return `${e.getFullYear()}-${jt(e.getMonth() + 1)}-${jt(e.getDate())}`;
}
function Tt(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function Et(e) {
	return wt(e) === wt(/* @__PURE__ */ new Date());
}
function Dt(e) {
	let t = Ot(e);
	return t === null ? 0 : Math.max(0, Math.floor((Date.now() - t.getTime()) / 1e3));
}
function Ot(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function kt(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function At(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function jt(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var U = _({
	running: null,
	elapsedSeconds: 0,
	busy: !1
}), Mt;
function Nt() {
	U.elapsedSeconds = U.running === null ? 0 : Dt(U.running.started_at);
}
function Pt() {
	Nt(), Mt === void 0 && (Mt = setInterval(Nt, 1e3));
}
function Ft() {
	Mt !== void 0 && (clearInterval(Mt), Mt = void 0), U.elapsedSeconds = 0;
}
function It(e, t) {
	if (U.running = e && typeof e.id == "number" ? e : null, U.running === null) {
		Ft();
		return;
	}
	Pt(), t && typeof U.running.task_id == "number" && ot(t, [U.running.task_id]);
}
function Lt(e, t, n) {
	e?.notify("error", H(t, e.t(n)));
}
var W = {
	get running() {
		return U.running;
	},
	get elapsedSeconds() {
		return U.elapsedSeconds;
	},
	get busy() {
		return U.busy;
	},
	async refresh(e) {
		try {
			It(await Ve(e), e);
		} catch {
			It(null);
		}
	},
	async start(e, t, n = null, r) {
		if (U.busy) return null;
		U.busy = !0;
		try {
			let r = await He(e, {
				task_id: t,
				description: n
			});
			return It(r, e), r;
		} catch (t) {
			return lt(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : Lt(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			U.busy = !1;
		}
	},
	async stop(e, t) {
		if (U.busy || U.running === null) return null;
		U.busy = !0;
		try {
			let t = await Ue(e);
			return It(null), t;
		} catch (n) {
			return Lt(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			U.busy = !1;
		}
	},
	async discard(e, t) {
		if (U.busy || U.running === null) return !1;
		U.busy = !0;
		try {
			return await We(e), It(null), !0;
		} catch (n) {
			return Lt(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			U.busy = !1;
		}
	},
	reset() {
		U.busy = !1, It(null);
	}
}, Rt = {
	key: 0,
	class: "fixed right-6 bottom-20 z-40 flex flex-col items-end gap-3"
}, zt = ["aria-label"], Bt = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, Vt = { class: "text-sm font-semibold text-heading" }, Ht = ["aria-label"], Ut = {
	key: 0,
	class: "space-y-4 px-4 py-4"
}, Wt = { class: "truncate text-sm font-medium text-heading" }, Gt = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, Kt = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, qt = { class: "flex items-center gap-2" }, Jt = {
	key: 1,
	class: "space-y-3 px-4 py-4"
}, Yt = { class: "block" }, Xt = { class: "sr-only" }, Zt = ["placeholder"], Qt = {
	key: 0,
	class: "text-xs text-muted"
}, $t = {
	key: 1,
	class: "max-h-48 space-y-1 overflow-y-auto"
}, en = ["onClick"], tn = {
	key: 2,
	class: "text-xs text-muted"
}, nn = ["placeholder", "aria-label"], rn = { class: "flex items-center justify-between" }, an = ["title", "aria-label"], on = {
	key: 0,
	class: "tabular-nums"
}, sn = 300, cn = /* @__PURE__ */ l({
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
		})), F = n(() => it(W.running?.task_id ?? null)), I = n(() => mt(W.elapsedSeconds));
		T(() => d.enabled, (e) => {
			e || z();
		}), T(_, (e) => {
			e && W.running === null && L();
		}), T(w, () => {
			clearTimeout(N), N = setTimeout(() => void L(), sn);
		}), m(() => clearTimeout(N));
		async function L() {
			A.value = !0;
			try {
				let e = await Xe(d.client, w.value);
				k.value = e, e.forEach(at);
			} catch (e) {
				k.value = [], d.notify("error", H(e, h("tasks_projects.time.tasks_failed")));
			} finally {
				A.value = !1;
			}
		}
		function R(e) {
			j.value = e, at(e);
		}
		function z() {
			_.value = !1, w.value = "", k.value = [], j.value = null, M.value = "";
		}
		async function B() {
			let e = j.value;
			e !== null && await W.start(d.client, e.id, M.value.trim() || null, P.value) !== null && (d.notify("success", h("tasks_projects.timer.started", { name: e.name })), z());
		}
		async function ee() {
			let e = F.value, t = await W.stop(d.client, P.value);
			t !== null && (d.notify("success", h("tasks_projects.timer.stopped", {
				name: e,
				duration: ht(t.duration_minutes)
			})), z());
		}
		async function V() {
			window.confirm(h("tasks_projects.timer.discard_confirm")) && await W.discard(d.client, P.value) && (d.notify("success", h("tasks_projects.timer.discarded")), z());
		}
		return (n, u) => {
			let d = b("BaseIcon"), m = b("BaseButton");
			return g(), r(t, { to: "body" }, [l.enabled ? (g(), a("div", Rt, [_.value ? (g(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": S(h)("tasks_projects.timer.panel_title"),
				onKeydown: O(z, ["esc"])
			}, [o("header", Bt, [o("h2", Vt, x(S(h)("tasks_projects.timer.panel_title")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": S(h)("tasks_projects.timer.close"),
				onClick: z
			}, [c(d, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Ht)]), S(W).running === null ? (g(), a("div", Jt, [
				o("label", Yt, [o("span", Xt, x(S(h)("tasks_projects.timer.search_tasks")), 1), D(o("input", {
					"onUpdate:modelValue": u[0] ||= (e) => w.value = e,
					type: "search",
					autocomplete: "off",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.search_tasks")
				}, null, 8, Zt), [[C, w.value]])]),
				A.value ? (g(), a("p", Qt, x(S(h)("tasks_projects.general.search")), 1)) : k.value.length > 0 ? (g(), a("ul", $t, [(g(!0), a(e, null, y(k.value, (e) => (g(), a("li", { key: e.id }, [o("button", {
					type: "button",
					class: f(["w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover", j.value?.id === e.id ? "bg-hover-strong font-medium text-heading" : "text-body"]),
					onClick: (t) => R(e)
				}, x(e.name), 11, en)]))), 128))])) : (g(), a("p", tn, x(S(h)("tasks_projects.timer.no_tasks")), 1)),
				D(o("input", {
					"onUpdate:modelValue": u[1] ||= (e) => M.value = e,
					type: "text",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.description_placeholder"),
					"aria-label": S(h)("tasks_projects.time.fields.description")
				}, null, 8, nn), [[C, M.value]]),
				o("div", rn, [o("button", {
					type: "button",
					class: "text-xs text-primary-500 hover:underline",
					onClick: u[2] ||= (e) => p("open-timesheet")
				}, x(S(h)("tasks_projects.timer.open_timesheet")), 1), c(m, {
					variant: "primary",
					disabled: j.value === null || S(W).busy,
					onClick: B
				}, {
					left: E((e) => [c(d, {
						name: "PlayIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: E(() => [s(" " + x(S(h)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			])) : (g(), a("div", Ut, [o("div", null, [
				o("p", Wt, x(F.value), 1),
				o("p", Gt, x(I.value), 1),
				S(W).running.description ? (g(), a("p", Kt, x(S(W).running.description), 1)) : i("", !0)
			]), o("div", qt, [c(m, {
				variant: "primary",
				disabled: S(W).busy,
				onClick: ee
			}, {
				left: E((e) => [c(d, {
					name: "StopIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(h)("tasks_projects.timer.stop")), 1)]),
				_: 1
			}, 8, ["disabled"]), c(m, {
				variant: "primary-outline",
				disabled: S(W).busy,
				onClick: V
			}, {
				default: E(() => [s(x(S(h)("tasks_projects.timer.discard")), 1)]),
				_: 1
			}, 8, ["disabled"])])]))], 40, zt)) : i("", !0), o("button", {
				type: "button",
				class: "flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover",
				title: S(h)("tasks_projects.timer.quick_start"),
				"aria-label": S(h)("tasks_projects.timer.quick_start"),
				onClick: u[3] ||= (e) => _.value = !_.value
			}, [c(d, {
				name: S(W).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), S(W).running === null ? i("", !0) : (g(), a("span", on, x(I.value), 1))], 8, an)])) : i("", !0)]);
		};
	}
}), ln = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, un = ["title"], dn = ["aria-label"], fn = { class: "font-medium tabular-nums" }, pn = [
	"disabled",
	"title",
	"aria-label"
], mn = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = de(), u = n(() => it(W.running?.task_id ?? null)), d = n(() => mt(W.elapsedSeconds));
		async function f() {
			let e = u.value, t = await W.stop(r.client, {
				notify: r.notify,
				t: l
			});
			t !== null && r.notify("success", l("tasks_projects.timer.stopped", {
				name: e,
				duration: ht(t.duration_minutes)
			}));
		}
		return (e, t) => {
			let n = b("BaseIcon");
			return S(W).running === null ? i("", !0) : (g(), a("li", ln, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: S(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": S(l)("tasks_projects.timer.open_timesheet"),
					onClick: t[0] ||= (e) => s("open")
				}, x(u.value), 9, dn),
				o("span", fn, x(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: S(W).busy,
					title: S(l)("tasks_projects.timer.stop"),
					"aria-label": S(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, pn)
			], 8, un)]));
		};
	}
}), hn = { en: { tasks_projects: {
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
} } }, gn = { class: "relative table-container" }, _n = { class: "block max-w-64 truncate" }, vn = { class: "tabular-nums" }, yn = {
	key: 1,
	class: "text-subtle"
}, bn = /* @__PURE__ */ l({
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
				let e = await Ie(l.client, t), n = e.data ?? [];
				return ot(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
					data: n,
					pagination: L(e.meta, n.length)
				};
			} catch (e) {
				return l.notify("error", H(e, d("tasks_projects.time.load_failed"))), {
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
			}), o("div", gn, [c(z, {
				ref_key: "tableRef",
				ref: p,
				data: I,
				columns: k.value,
				class: "mt-3"
			}, {
				"cell-date": E(({ row: e }) => [s(x(S(oe)(S(_t)(e.data.started_at))), 1)]),
				"cell-member": E(({ row: e }) => [s(x(F(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [s(x(S(it)(e.data.task_id)), 1)]),
				"cell-description": E(({ row: e }) => [o("span", _n, x(e.data.description || "-"), 1)]),
				"cell-duration": E(({ row: e }) => [o("span", vn, x(S(ht)(e.data.duration_minutes)), 1)]),
				"cell-billable": E(({ row: e }) => [c(T, { class: f(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: E(() => [s(x(e.data.billable ? S(d)("tasks_projects.time.billable") : S(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": E(({ row: e }) => [e.data.billable ? (g(), r(A, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (g(), a("span", yn, "-"))]),
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
}), xn = { class: "flex w-full items-center justify-between" }, Sn = { class: "space-y-5 px-6 py-6" }, Cn = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, wn = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, Tn = ["disabled", "onClick"], En = {
	key: 1,
	class: "text-sm text-muted"
}, Dn = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, On = { key: 1 }, kn = { class: "flex space-x-3" }, An = "09:00", jn = /* @__PURE__ */ l({
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
			start: An,
			end: "",
			description: "",
			billable: !0
		}), C = v(null), w = v({}), D = v(!1), O = v(!1), A = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : A.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		T(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			w.value = {}, C.value = null, h.date = e ? _t(e.started_at) : u.defaultDate ?? wt(/* @__PURE__ */ new Date()), h.duration = e ? ht(e.duration_minutes) : "", h.start = e?.started_at ? vt(e.started_at) : An, h.end = e?.ended_at ? vt(e.ended_at) : "", h.description = e?.description ?? "", h.billable = !e || e.billable, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? wt(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await Ze(u.client, e);
				C.value = t, at(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await Xe(u.client, e ?? "");
				return t.forEach(at), t;
			} catch (e) {
				return u.notify("error", H(e, m("tasks_projects.time.tasks_failed"))), [];
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
			let n = yt(h.date, h.mode === "range" ? h.start : An);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? gt(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? yt(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), w.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = bt(n, r)) : a.ended_at = i, a;
		}
		async function B() {
			if (D.value || j.value) return;
			let e = z();
			if (e !== null) {
				D.value = !0;
				try {
					let t = u.entry, n = t ? await ze(u.client, t.id, e) : await Re(u.client, e);
					d("saved", n);
				} catch (e) {
					w.value = te(e), u.notify("error", H(e, m("tasks_projects.time.save_failed")));
				} finally {
					D.value = !1;
				}
			}
		}
		async function ee() {
			let e = u.entry;
			if (!(e === null || O.value || j.value) && window.confirm(m("tasks_projects.time.delete_confirm"))) {
				O.value = !0;
				try {
					await Be(u.client, e.id), d("deleted", e);
				} catch (e) {
					u.notify("error", H(e, m("tasks_projects.time.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let u = b("BaseIcon"), _ = b("BaseMultiselect"), v = b("BaseInputGroup"), T = b("BaseDatePicker"), N = b("BaseInputGrid"), P = b("BaseInput"), F = b("BaseTextarea"), z = b("BaseSwitch"), V = b("BaseButton"), H = b("BaseModal");
			return g(), r(H, {
				show: t.show,
				onClose: l[8] ||= (e) => d("close")
			}, {
				header: E(() => [o("div", xn, [o("span", null, x(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(B, ["prevent"]) }, [o("div", Sn, [
					j.value ? (g(), a("p", Cn, x(S(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
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
							default: E(() => [o("div", wn, [(g(), a(e, null, y(p, (e) => o("button", {
								key: e,
								type: "button",
								class: f(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, x(S(m)(`tasks_projects.time.mode.${e}`)), 11, Tn)), 64))])]),
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
						default: E(() => [j.value ? (g(), a("span", En, x(h.billable ? S(m)("tasks_projects.time.billable") : S(m)("tasks_projects.time.non_billable")), 1)) : (g(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Dn, [A.value && !j.value ? (g(), r(V, {
					key: 0,
					type: "button",
					variant: "danger",
					size: "sm",
					loading: O.value,
					disabled: O.value,
					onClick: ee
				}, {
					default: E(() => [s(x(S(m)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", On)), o("div", kn, [c(V, {
					type: "button",
					variant: "primary-outline",
					onClick: l[7] ||= (e) => d("close")
				}, {
					default: E(() => [s(x(j.value ? S(m)("tasks_projects.timer.close") : S(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), j.value ? i("", !0) : (g(), r(V, {
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
}), Mn = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, Nn = { class: "flex items-center gap-2" }, Pn = { class: "ml-1 text-sm text-muted" }, Fn = { class: "flex items-center gap-2 text-sm" }, In = { class: "text-muted" }, Ln = { class: "text-lg font-semibold tabular-nums text-heading" }, Rn = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, zn = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, Bn = { class: "flex items-baseline justify-between" }, Vn = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, Hn = { class: "text-xs text-muted" }, Un = { class: "text-sm font-medium tabular-nums text-heading" }, Wn = { class: "mt-3 flex-1 space-y-2" }, Gn = ["onClick"], Kn = { class: "flex items-center justify-between gap-2" }, qn = { class: "truncate text-xs font-medium text-heading" }, Jn = { class: "shrink-0 text-xs tabular-nums text-muted" }, Yn = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, Xn = { class: "mt-1 flex items-center gap-1" }, Zn = { class: "text-[11px] text-subtle" }, Qn = {
	key: 0,
	class: "text-[11px] text-subtle"
}, $n = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, er = ["onClick"], tr = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, nr = /* @__PURE__ */ l({
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
		let u = t, d = l, p = de(), m = v(xt(/* @__PURE__ */ new Date(), u.weekStart)), h = v([]), _ = v(!1), C = n(() => St(m.value)), w = n(() => {
			let e = C.value[0], t = C.value[C.value.length - 1];
			return `${Tt(e).day} - ${Tt(t).day}`;
		}), D = n(() => C.value.map((e) => {
			let t = wt(e), n = h.value.filter((e) => _t(e.started_at) === t), r = Tt(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: Et(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !_.value && h.value.length === 0);
		T(() => u.weekStart, (e) => {
			m.value = xt(m.value, e);
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
				let e = await Le(u.client, {
					user_id: u.userId,
					from: wt(C.value[0]),
					to: wt(C.value[C.value.length - 1])
				});
				h.value = e, ot(u.client, e.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", H(e, p("tasks_projects.time.load_failed")));
			} finally {
				_.value = !1;
			}
		}
		function M(e) {
			m.value = Ct(m.value, e * 7);
		}
		function N() {
			m.value = xt(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = b("BaseIcon"), m = b("BaseButton"), h = b("BaseSpinner");
			return g(), a("section", null, [
				o("header", Mn, [o("div", Nn, [
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
					o("span", Pn, x(w.value), 1)
				]), o("div", Fn, [
					o("span", In, x(S(p)("tasks_projects.time.week_total")), 1),
					o("span", Ln, x(S(ht)(O.value)), 1),
					_.value ? (g(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (g(), a("p", Rn, x(S(p)("tasks_projects.time.unknown_user")), 1)) : (g(), a("div", zn, [(g(!0), a(e, null, y(D.value, (t) => (g(), a("article", {
					key: t.key,
					class: f(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", Bn, [o("div", null, [o("p", Vn, x(t.weekday), 1), o("p", Hn, x(t.day), 1)]), o("span", Un, x(S(ht)(t.minutes)), 1)]),
					o("ul", Wn, [(g(!0), a(e, null, y(t.entries, (e) => (g(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", Kn, [o("span", qn, x(S(it)(e.task_id)), 1), o("span", Jn, x(S(ht)(e.duration_minutes)), 1)]),
						e.description ? (g(), a("span", Yn, x(e.description), 1)) : i("", !0),
						o("span", Xn, [
							o("span", { class: f(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", Zn, x(e.billable ? S(p)("tasks_projects.time.billable") : S(p)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (g(), a("span", Qn, " - " + x(S(p)("tasks_projects.time.billed")), 1))
						])
					], 8, Gn)]))), 128)), t.entries.length === 0 ? (g(), a("li", $n, x(S(p)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + x(S(p)("tasks_projects.time.add_entry")), 1)], 8, er)
				], 2))), 128))])),
				k.value && t.userId !== null ? (g(), a("p", tr, x(S(p)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), rr = {
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
}, ir = _({
	adminMode: !1,
	userId: null,
	settings: { ...rr },
	companySession: 0,
	loading: !1
});
async function ar(e) {
	if (ir.adminMode) return;
	ir.loading = !0;
	let [t, n] = await Promise.all([et(e).catch(() => null), $e(e).catch(() => null)]);
	ir.userId = t, ir.settings = cr(n), ir.loading = !1;
}
function or() {
	ir.userId = null, ir.settings = { ...rr }, ir.companySession += 1, ir.loading = !1;
}
function sr(e) {
	ir.adminMode = e;
}
function cr(e) {
	if (typeof e != "object" || !e) return { ...rr };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : rr.rounding_increments;
	return {
		default_rate: lr(e.default_rate, rr.default_rate),
		rounding_minutes: lr(e.rounding_minutes, rr.rounding_minutes),
		week_start: ur(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		rounding_increments: t.length > 0 ? t : rr.rounding_increments
	};
}
function lr(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function ur(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : rr.week_start;
}
//#endregion
//#region resources/js/pages/TimePage.vue?vue&type=script&setup=true&lang.ts
var dr = { class: "flex items-center justify-end space-x-5" }, fr = {
	key: 0,
	class: "hidden items-center gap-2 text-sm text-muted sm:flex"
}, pr = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, mr = 5, hr = /* @__PURE__ */ l({
	__name: "TimePage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = de(), u = v("MINE"), d = v(!1), p = v([]), m = v([]), _ = v(!1), y = v(null), C = v(wt(/* @__PURE__ */ new Date())), w = v(0), T = n(() => ir.settings.week_start), D = n(() => ir.userId);
		h(() => void O());
		async function O() {
			ir.userId === null && await ar(t.client), d.value = ir.settings.members_see_all_time || await k(), d.value && await Promise.all([A(), j()]);
		}
		async function k() {
			try {
				return ((await Ie(t.client, { limit: mr })).data ?? []).some((e) => e.user_id !== ir.userId);
			} catch {
				return !1;
			}
		}
		async function A() {
			try {
				p.value = await Qe(t.client);
			} catch {
				p.value = [];
			}
		}
		async function j() {
			try {
				let e = await P(t.client, { limit: 100 });
				m.value = e.data ?? [];
			} catch {
				m.value = [];
			}
		}
		function M(e) {
			y.value = null, C.value = e ?? wt(/* @__PURE__ */ new Date()), _.value = !0;
		}
		function N(e) {
			y.value = e, _.value = !0;
		}
		function F() {
			let e = y.value ? l("tasks_projects.time.updated") : l("tasks_projects.time.created");
			_.value = !1, y.value = null, t.notify("success", e), w.value += 1;
		}
		function I() {
			_.value = !1, y.value = null, t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
		}
		async function L(e) {
			if (window.confirm(l("tasks_projects.time.delete_confirm"))) try {
				await Be(t.client, e.id), t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
			} catch (e) {
				t.notify("error", H(e, l("tasks_projects.time.delete_failed")));
			}
		}
		function R(e) {
			return u.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), O = b("BaseIcon"), k = b("BaseButton"), A = b("router-link"), j = b("BasePageHeader"), P = b("BasePage");
			return g(), r(P, null, {
				default: E(() => [
					c(j, { title: S(l)("tasks_projects.time.title") }, {
						actions: E(() => [o("div", dr, [
							S(W).running === null ? i("", !0) : (g(), a("span", fr, [c(O, {
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
					d.value ? (g(), a("nav", pr, [o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("MINE")]),
						onClick: n[1] ||= (e) => u.value = "MINE"
					}, x(S(l)("tasks_projects.time.my_time")), 3), o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("ALL")]),
						onClick: n[2] ||= (e) => u.value = "ALL"
					}, x(S(l)("tasks_projects.time.all_time")), 3)])) : i("", !0),
					u.value === "MINE" ? (g(), r(nr, {
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
					])) : (g(), r(bn, {
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
					c(jn, {
						show: _.value,
						client: e.client,
						notify: e.notify,
						entry: y.value,
						"default-date": C.value,
						onClose: n[3] ||= (e) => _.value = !1,
						onSaved: F,
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
}), gr = {
	key: 0,
	class: "text-sm text-muted"
}, _r = { key: 1 }, vr = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, yr = {
	key: 1,
	class: "text-sm text-muted"
}, br = {
	key: 2,
	class: "divide-y divide-line-light"
}, xr = {
	key: 0,
	class: "space-y-3"
}, Sr = { class: "flex flex-wrap items-center gap-2" }, Cr = ["aria-label", "onClick"], wr = { class: "flex flex-wrap items-center gap-6" }, Tr = { class: "flex items-center gap-2 text-sm text-body" }, Er = { class: "flex items-center gap-2 text-sm text-body" }, Dr = { class: "flex gap-3" }, Or = {
	key: 1,
	class: "flex items-center gap-3"
}, kr = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, Ar = { class: "flex items-center gap-1" }, jr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Mr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Nr = [
	"title",
	"aria-label",
	"onClick"
], Pr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Fr = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Ir = { class: "flex flex-wrap items-center gap-2" }, Lr = ["aria-label", "onClick"], Rr = { class: "flex flex-wrap items-center gap-6" }, zr = { class: "flex items-center gap-2 text-sm text-body" }, Br = { class: "flex items-center gap-2 text-sm text-body" }, Vr = { class: "flex gap-3" }, Hr = /* @__PURE__ */ l({
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
				m.value = await Ge(l.client), w.value = !1;
			} catch (e) {
				m.value = [], w.value = ut(e), w.value || l.notify("error", H(e, d("tasks_projects.settings.load_failed")));
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
				e === null ? (await Ke(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await qe(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.settings.save_failed")));
			} finally {
				T.value = !1;
			}
		}
		async function L(e) {
			if (!T.value && window.confirm(d("tasks_projects.settings.status_delete_confirm", { name: e.name }))) {
				T.value = !0;
				try {
					await Je(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
				} catch (e) {
					l.notify("error", H(e, d("tasks_projects.settings.delete_failed")));
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
				m.value = await Ye(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = b("BaseSpinner"), h = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSwitch"), j = b("BaseButton"), F = b("BaseBadge"), z = b("BaseIcon");
			return g(), a("div", null, [w.value ? (g(), a("p", gr, x(S(d)("tasks_projects.settings.forbidden")), 1)) : (g(), a("div", _r, [C.value ? (g(), a("div", vr, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (g(), a("p", yr, x(S(d)("tasks_projects.settings.no_statuses")), 1)) : (g(), a("ul", br, [(g(!0), a(e, null, y(m.value, (t, l) => (g(), a("li", {
				key: t.id,
				class: "py-3"
			}, [D.value === t.id ? (g(), a("div", xr, [
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
					default: E(() => [o("div", Sr, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Cr)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, x(S(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", wr, [o("label", Tr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Er, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Dr, [c(j, {
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
			])) : (g(), a("div", Or, [
				o("span", {
					class: f(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: p(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", kr, x(t.name), 1),
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
				o("div", Ar, [
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
					})], 8, jr),
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
					})], 8, Mr),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: S(d)("tasks_projects.general.edit"),
						"aria-label": S(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, Nr),
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
					})], 8, Pr)
				])
			]))]))), 128))])), O.value ? (g(), a("div", Fr, [
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
					default: E(() => [o("div", Ir, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Lr)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Rr, [o("label", zr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Br, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Vr, [c(j, {
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
}), Ur = { class: "space-y-6" }, Wr = "/admin/settings/modules", Gr = /* @__PURE__ */ l({
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
			return g(), a("div", Ur, [c(u, {
				title: S(t)("tasks_projects.settings.general_title"),
				description: S(t)("tasks_projects.settings.general_description")
			}, {
				action: E(() => [c(l, { to: Wr }, {
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
				default: E(() => [c(Hr, {
					client: e.client,
					notify: e.notify
				}, null, 8, ["client", "notify"])]),
				_: 1
			}, 8, ["title", "description"])]);
		};
	}
}), Kr = "tasks-projects", qr = `/admin/modules/${Kr}/time`;
function Jr(e) {
	e.addMessages(hn);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		e.router.push(qr);
	};
	e.registerPage({
		id: "time",
		module: Kr,
		path: "time",
		component: Zr(e, hr),
		meta: {
			ability: `${Kr}:view-own-time`,
			title: "tasks_projects.time.title"
		}
	}), e.registerHeaderAction({
		id: `${Kr}.timer-chip`,
		priority: 30,
		visible: () => W.running !== null,
		component: l({ setup: () => () => d(mn, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${Kr}.quick-start`,
		component: l({ setup: () => () => d(cn, {
			key: ir.companySession,
			client: e.client,
			notify: t,
			enabled: !ir.adminMode,
			onOpenTimesheet: n
		}) })
	}), e.registerCompanySettingsPage({
		id: `${Kr}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: Kr,
		priority: 70,
		component: Zr(e, Gr)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		Yr(e, t);
	}), e.on("company:changing", () => {
		Xr();
	}), e.on("company:changed", ({ companyId: t }) => {
		Yr(e, t === null);
	});
}
async function Yr(e, t) {
	if (sr(t), t) {
		Xr();
		return;
	}
	await ar(e.client), await W.refresh(e.client);
}
function Xr() {
	W.reset(), st(), or();
}
function Zr(e, t) {
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
var Qr = { en: { tasks_projects: {
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
function $r(e, t, n) {
	return (t = oi(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ei() {
	return ei = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ei.apply(null, arguments);
}
function ti(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ni(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ti(Object(n), !0).forEach(function(t) {
			$r(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ti(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ri(e, t) {
	if (e == null) return {};
	var n, r, i = ii(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ii(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function ai(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oi(e) {
	var t = ai(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function si(e) {
	"@babel/helpers - typeof";
	return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, si(e);
}
var ci = "1.15.7";
function li(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var ui = li(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), di = li(/Edge/i), fi = li(/firefox/i), pi = li(/safari/i) && !li(/chrome/i) && !li(/android/i), mi = li(/iP(ad|od|hone)/i), hi = li(/chrome/i) && li(/android/i), gi = {
	capture: !1,
	passive: !1
};
function G(e, t, n) {
	e.addEventListener(t, n, !ui && gi);
}
function K(e, t, n) {
	e.removeEventListener(t, n, !ui && gi);
}
function _i(e, t) {
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
function vi(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function yi(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && _i(e, t) : _i(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = vi(e));
	}
	return null;
}
var bi = /\s+/g;
function xi(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(bi, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(bi, " "));
}
function q(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Si(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = q(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Ci(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function wi() {
	return document.scrollingElement || document.documentElement;
}
function Ti(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== wi() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !ui)) do
			if (i && i.getBoundingClientRect && (q(i, "transform") !== "none" || n && q(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(q(i, "border-top-width")), s -= f.left + parseInt(q(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Si(i || e), m = p && p.a, h = p && p.d;
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
function Ei(e, t, n) {
	for (var r = Mi(e, !0), i = Ti(e)[t]; r;) {
		var a = Ti(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === wi()) break;
		r = Mi(r, !1);
	}
	return !1;
}
function Di(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && yi(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Oi(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || q(n, "display") === "none" || t && !_i(n, t));) n = n.previousElementSibling;
	return n || null;
}
function ki(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || _i(e, t)) && n++;
	return n;
}
function Ai(e) {
	var t = 0, n = 0, r = wi();
	if (e) do {
		var i = Si(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function ji(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Mi(e, t) {
	if (!e || !e.getBoundingClientRect) return wi();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = q(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return wi();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return wi();
}
function Ni(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Pi(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Fi;
function Ii(e, t) {
	return function() {
		if (!Fi) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Fi = setTimeout(function() {
				Fi = void 0;
			}, t);
		}
	};
}
function Li() {
	clearTimeout(Fi), Fi = void 0;
}
function Ri(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function zi(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Bi(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (yi(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = Ti(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var Vi = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Hi() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (q(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: Ti(t)
					});
					var n = ni({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Si(t, !0);
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
			e.splice(ji(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = Ti(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Si(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Pi(c, s) && !Pi(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = Wi(u, c, l, r.options)), Pi(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				q(e, "transition", ""), q(e, "transform", "");
				var i = Si(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, q(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = Ui(e), q(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), q(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					q(e, "transition", ""), q(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function Ui(e) {
	return e.offsetWidth;
}
function Wi(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var Gi = [], Ki = { initializeByDefault: !0 }, qi = {
	mount: function(e) {
		for (var t in Ki) Ki.hasOwnProperty(t) && !(t in e) && (e[t] = Ki[t]);
		Gi.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), Gi.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		Gi.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](ni({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](ni({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in Gi.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, ei(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return Gi.forEach(function(r) {
			typeof r.eventProperties == "function" && ei(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return Gi.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function Ji(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[Vi], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !ui && !di ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = ni(ni({}, m), qi.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var Yi = ["evt"], Xi = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = ri(n, Yi);
	qi.pluginEvent.bind($)(e, t, ni({
		dragEl: J,
		parentEl: Y,
		ghostEl: X,
		rootEl: Z,
		nextEl: Qi,
		lastDownEl: $i,
		cloneEl: Q,
		cloneHidden: ea,
		dragStarted: ga,
		putSortable: oa,
		activeSortable: $.active,
		originalEvent: r,
		oldIndex: ta,
		oldDraggableIndex: ra,
		newIndex: na,
		newDraggableIndex: ia,
		hideGhostForTarget: Fa,
		unhideGhostForTarget: Ia,
		cloneNowHidden: function() {
			ea = !0;
		},
		cloneNowShown: function() {
			ea = !1;
		},
		dispatchSortableEvent: function(e) {
			Zi({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function Zi(e) {
	Ji(ni({
		putSortable: oa,
		cloneEl: Q,
		targetEl: J,
		rootEl: Z,
		oldIndex: ta,
		oldDraggableIndex: ra,
		newIndex: na,
		newDraggableIndex: ia
	}, e));
}
var J, Y, X, Z, Qi, $i, Q, ea, ta, na, ra, ia, aa, oa, sa = !1, ca = !1, la = [], ua, da, fa, pa, ma, ha, ga, _a, va, ya = !1, ba = !1, xa, Sa, Ca = [], wa = !1, Ta = [], Ea = typeof document < "u", Da = mi, Oa = di || ui ? "cssFloat" : "float", ka = Ea && !hi && !mi && "draggable" in document.createElement("div"), Aa = function() {
	if (Ea) {
		if (ui) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), ja = function(e, t) {
	var n = q(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Di(e, 0, t), a = Di(e, 1, t), o = i && q(i), s = a && q(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + Ti(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ti(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Oa] === "none" || a && n[Oa] === "none" && c + l > r) ? "vertical" : "horizontal";
}, Ma = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, Na = function(e, t) {
	var n;
	return la.some(function(r) {
		var i = r[Vi].options.emptyInsertThreshold;
		if (i && !Oi(r)) {
			var a = Ti(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, Pa = function(e) {
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
	(!r || si(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Fa = function() {
	!Aa && X && q(X, "display", "none");
}, Ia = function() {
	!Aa && X && q(X, "display", "");
};
Ea && !hi && document.addEventListener("click", function(e) {
	if (ca) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ca = !1, !1;
}, !0);
var La = function(e) {
	if (J) {
		e = e.touches ? e.touches[0] : e;
		var t = Na(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[Vi]._onDragOver(n);
		}
	}
}, Ra = function(e) {
	J && J.parentNode[Vi]._isOutsideThisEl(e.target);
};
function $(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = ei({}, t), e[Vi] = this;
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
			return ja(e, this.options);
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
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!pi || mi),
		emptyInsertThreshold: 5
	};
	for (var r in qi.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in Pa(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && ka, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? G(e, "pointerdown", this._onTapStart) : (G(e, "mousedown", this._onTapStart), G(e, "touchstart", this._onTapStart)), this.nativeDraggable && (G(e, "dragover", this), G(e, "dragenter", this)), la.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ei(this, Hi());
}
$.prototype = {
	constructor: $,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (_a = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, J) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (Ja(n), !J && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && pi && s && s.tagName.toUpperCase() === "SELECT") && (s = yi(s, r.draggable, n, !1), !(s && s.animated) && $i !== s)) {
				if (ta = ki(s), ra = ki(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						Zi({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), Xi("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = yi(c, r.trim(), n, !1), r) return Zi({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), Xi("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || yi(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !J && n.parentNode === i) {
			var c = Ti(n);
			if (Z = i, J = n, Y = J.parentNode, Qi = J.nextSibling, $i = n, aa = a.group, $.dragged = J, ua = {
				target: J,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, ma = ua.clientX - c.left, ha = ua.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, J.style["will-change"] = "all", s = function() {
				if (Xi("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !fi && r.nativeDraggable && (J.draggable = !0), r._triggerDragStart(e, t), Zi({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), xi(J, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Ci(J, e.trim(), Va);
			}), G(o, "dragover", La), G(o, "mousemove", La), G(o, "touchmove", La), a.supportPointer ? (G(o, "pointerup", r._onDrop), !this.nativeDraggable && G(o, "pointercancel", r._onDrop)) : (G(o, "mouseup", r._onDrop), G(o, "touchend", r._onDrop), G(o, "touchcancel", r._onDrop)), fi && this.nativeDraggable && (this.options.touchStartThreshold = 4, J.draggable = !0), Xi("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(di || ui))) {
				if ($.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (G(o, "pointerup", r._disableDelayedDrag), G(o, "pointercancel", r._disableDelayedDrag)) : (G(o, "mouseup", r._disableDelayedDrag), G(o, "touchend", r._disableDelayedDrag), G(o, "touchcancel", r._disableDelayedDrag)), G(o, "mousemove", r._delayedDragTouchMoveHandler), G(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && G(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		J && Va(J), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		K(e, "mouseup", this._disableDelayedDrag), K(e, "touchend", this._disableDelayedDrag), K(e, "touchcancel", this._disableDelayedDrag), K(e, "pointerup", this._disableDelayedDrag), K(e, "pointercancel", this._disableDelayedDrag), K(e, "mousemove", this._delayedDragTouchMoveHandler), K(e, "touchmove", this._delayedDragTouchMoveHandler), K(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? G(document, "pointermove", this._onTouchMove) : t ? G(document, "touchmove", this._onTouchMove) : G(document, "mousemove", this._onTouchMove) : (G(J, "dragend", this), G(Z, "dragstart", this._onDragStart));
		try {
			document.selection ? Ya(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (sa = !1, Z && J) {
			Xi("dragStarted", this, { evt: t }), this.nativeDraggable && G(document, "dragover", Ra);
			var n = this.options;
			!e && xi(J, n.dragClass, !1), xi(J, n.ghostClass, !0), $.active = this, e && this._appendGhost(), Zi({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (da) {
			this._lastX = da.clientX, this._lastY = da.clientY, Fa();
			for (var e = document.elementFromPoint(da.clientX, da.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(da.clientX, da.clientY), e !== t);) t = e;
			if (J.parentNode[Vi]._isOutsideThisEl(e), t) do {
				if (t[Vi]) {
					var n = void 0;
					if (n = t[Vi]._onDragOver({
						clientX: da.clientX,
						clientY: da.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = vi(t));
			Ia();
		}
	},
	_onTouchMove: function(e) {
		if (ua) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = X && Si(X, !0), o = X && a && a.a, s = X && a && a.d, c = Da && Sa && Ai(Sa), l = (i.clientX - ua.clientX + r.x) / (o || 1) + (c ? c[0] - Ca[0] : 0) / (o || 1), u = (i.clientY - ua.clientY + r.y) / (s || 1) + (c ? c[1] - Ca[1] : 0) / (s || 1);
			if (!$.active && !sa) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (X) {
				a ? (a.e += l - (fa || 0), a.f += u - (pa || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				q(X, "webkitTransform", d), q(X, "mozTransform", d), q(X, "msTransform", d), q(X, "transform", d), fa = l, pa = u, da = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!X) {
			var e = this.options.fallbackOnBody ? document.body : Z, t = Ti(J, !0, Da, !0, e), n = this.options;
			if (Da) {
				for (Sa = e; q(Sa, "position") === "static" && q(Sa, "transform") === "none" && Sa !== document;) Sa = Sa.parentNode;
				Sa !== document.body && Sa !== document.documentElement ? (Sa === document && (Sa = wi()), t.top += Sa.scrollTop, t.left += Sa.scrollLeft) : Sa = wi(), Ca = Ai(Sa);
			}
			X = J.cloneNode(!0), xi(X, n.ghostClass, !1), xi(X, n.fallbackClass, !0), xi(X, n.dragClass, !0), q(X, "transition", ""), q(X, "transform", ""), q(X, "box-sizing", "border-box"), q(X, "margin", 0), q(X, "top", t.top), q(X, "left", t.left), q(X, "width", t.width), q(X, "height", t.height), q(X, "opacity", "0.8"), q(X, "position", Da ? "absolute" : "fixed"), q(X, "zIndex", "100000"), q(X, "pointerEvents", "none"), $.ghost = X, e.appendChild(X), q(X, "transform-origin", ma / parseInt(X.style.width) * 100 + "% " + ha / parseInt(X.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (Xi("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		Xi("setupClone", this), $.eventCanceled || (Q = zi(J), Q.removeAttribute("id"), Q.draggable = !1, Q.style["will-change"] = "", this._hideClone(), xi(Q, this.options.chosenClass, !1), $.clone = Q), n.cloneId = Ya(function() {
			Xi("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || Z.insertBefore(Q, J), n._hideClone(), Zi({
				sortable: n,
				name: "clone"
			}));
		}), !t && xi(J, i.dragClass, !0), t ? (ca = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (K(document, "mouseup", n._onDrop), K(document, "touchend", n._onDrop), K(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, J)), G(document, "drop", n), q(J, "transform", "translateZ(0)")), sa = !0, n._dragStartId = Ya(n._dragStarted.bind(n, t, e)), G(document, "selectstart", n), ga = !0, window.getSelection().removeAllRanges(), pi && q(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = aa === s, u = o.sort, d = oa || c, f, p = this, m = !1;
		if (wa) return;
		function h(o, s) {
			Xi(o, p, ni({
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
					return Ba(Z, t, J, r, n, Ti(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (xi(J, oa ? oa.options.ghostClass : c.options.ghostClass, !1), xi(J, o.ghostClass, !0)), oa !== p && p !== $.active ? oa = p : p === $.active && oa && (oa = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === J && !J.animated || n === t && !n.animated) && (_a = null), !o.dragoverBubble && !e.rootEl && n !== document && (J.parentNode[Vi]._isOutsideThisEl(e.target), !r && La(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			na = ki(J), ia = ki(J, o.draggable), Zi({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: na,
				newDraggableIndex: ia,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = yi(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (J.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (ca = !1, c && !o.disabled && (l ? u || (a = Y !== Z) : oa === this || (this.lastPutMode = aa.checkPull(this, c, J, e)) && s.checkPut(this, c, J, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = Ti(J), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return Y = Z, g(), this._hideClone(), h("revert"), $.eventCanceled || (Qi ? Z.insertBefore(J, Qi) : Z.appendChild(J)), _(!0);
			var y = Oi(t, o.draggable);
			if (!y || Wa(e, f, this) && !y.animated) {
				if (y === J) return _(!1);
				if (y && t === e.target && (n = y), n && (i = Ti(n)), Ba(Z, t, J, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(J, y.nextSibling) : t.appendChild(J), Y = t, v(), _(!0);
			} else if (y && Ua(e, f, this)) {
				var b = Di(t, 0, o, !0);
				if (b === J) return _(!1);
				if (n = b, i = Ti(n), Ba(Z, t, J, r, n, i, e, !1) !== !1) return g(), t.insertBefore(J, b), Y = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = Ti(n);
				var x = 0, S, C = J.parentNode !== t, w = !Ma(J.animated && J.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Ei(n, "top", "top") || Ei(J, "top", "top"), D = E ? E.scrollTop : void 0;
				_a !== n && (S = i[T], ya = !1, ba = !w && o.invertSwap || C), x = Ga(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, ba, _a === n);
				var O;
				if (x !== 0) {
					var k = ki(J);
					do
						k -= x, O = Y.children[k];
					while (O && (q(O, "display") === "none" || O === X));
				}
				if (x === 0 || O === n) return _(!1);
				_a = n, va = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = Ba(Z, t, J, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), wa = !0, setTimeout(Ha, 30), g(), j && !A ? t.appendChild(J) : n.parentNode.insertBefore(J, j ? A : n), E && Ri(E, 0, D - E.scrollTop), Y = J.parentNode, S !== void 0 && !ba && (xa = Math.abs(S - Ti(n)[T])), v(), _(!0);
			}
			if (t.contains(J)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		K(document, "mousemove", this._onTouchMove), K(document, "touchmove", this._onTouchMove), K(document, "pointermove", this._onTouchMove), K(document, "dragover", La), K(document, "mousemove", La), K(document, "touchmove", La);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		K(e, "mouseup", this._onDrop), K(e, "touchend", this._onDrop), K(e, "pointerup", this._onDrop), K(e, "pointercancel", this._onDrop), K(e, "touchcancel", this._onDrop), K(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (na = ki(J), ia = ki(J, n.draggable), Xi("drop", this, { evt: e }), Y = J && J.parentNode, na = ki(J), ia = ki(J, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		sa = !1, ba = !1, ya = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Xa(this.cloneId), Xa(this._dragStartId), this.nativeDraggable && (K(document, "drop", this), K(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), pi && q(document.body, "user-select", ""), q(J, "transform", ""), e && (ga && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), X && X.parentNode && X.parentNode.removeChild(X), (Z === Y || oa && oa.lastPutMode !== "clone") && Q && Q.parentNode && Q.parentNode.removeChild(Q), J && (this.nativeDraggable && K(J, "dragend", this), Va(J), J.style["will-change"] = "", ga && !sa && xi(J, oa ? oa.options.ghostClass : this.options.ghostClass, !1), xi(J, this.options.chosenClass, !1), Zi({
			sortable: this,
			name: "unchoose",
			toEl: Y,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), Z === Y ? na !== ta && na >= 0 && (Zi({
			sortable: this,
			name: "update",
			toEl: Y,
			originalEvent: e
		}), Zi({
			sortable: this,
			name: "sort",
			toEl: Y,
			originalEvent: e
		})) : (na >= 0 && (Zi({
			rootEl: Y,
			name: "add",
			toEl: Y,
			fromEl: Z,
			originalEvent: e
		}), Zi({
			sortable: this,
			name: "remove",
			toEl: Y,
			originalEvent: e
		}), Zi({
			rootEl: Y,
			name: "sort",
			toEl: Y,
			fromEl: Z,
			originalEvent: e
		}), Zi({
			sortable: this,
			name: "sort",
			toEl: Y,
			originalEvent: e
		})), oa && oa.save()), $.active && ((na == null || na === -1) && (na = ta, ia = ra), Zi({
			sortable: this,
			name: "end",
			toEl: Y,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		Xi("nulling", this), Z = J = Y = X = Qi = Q = $i = ea = ua = da = ga = na = ia = ta = ra = _a = va = oa = aa = $.dragged = $.ghost = $.clone = $.active = null;
		var e = this.el;
		Ta.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), Ta.length = fa = pa = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				J && (this._onDragOver(e), za(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], yi(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || qa(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			yi(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return yi(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = qi.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && Pa(n);
	},
	destroy: function() {
		Xi("destroy", this);
		var e = this.el;
		e[Vi] = null, K(e, "mousedown", this._onTapStart), K(e, "touchstart", this._onTapStart), K(e, "pointerdown", this._onTapStart), this.nativeDraggable && (K(e, "dragover", this), K(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), la.splice(la.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!ea) {
			if (Xi("hideClone", this), $.eventCanceled) return;
			q(Q, "display", "none"), this.options.removeCloneOnHide && Q.parentNode && Q.parentNode.removeChild(Q), ea = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (ea) {
			if (Xi("showClone", this), $.eventCanceled) return;
			J.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(Q, J) : Qi ? Z.insertBefore(Q, Qi) : Z.appendChild(Q), this.options.group.revertClone && this.animate(J, Q), q(Q, "display", ""), ea = !1;
		}
	}
};
function za(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Ba(e, t, n, r, i, a, o, s) {
	var c, l = e[Vi], u = l.options.onMove, d;
	return window.CustomEvent && !ui && !di ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || Ti(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function Va(e) {
	e.draggable = !1;
}
function Ha() {
	wa = !1;
}
function Ua(e, t, n) {
	var r = Ti(Di(n.el, 0, n.options, !0)), i = Bi(n.el, n.options, X), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function Wa(e, t, n) {
	var r = Ti(Oi(n.el, n.options.draggable)), i = Bi(n.el, n.options, X), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function Ga(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && xa < l * i) {
			if (!ya && (va === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (ya = !0), ya) f = !0;
			else if (va === 1 ? c < u + xa : c > d - xa) return -va;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return Ka(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function Ka(e) {
	return ki(J) < ki(e) ? 1 : -1;
}
function qa(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function Ja(e) {
	Ta.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Ta.push(r);
	}
}
function Ya(e) {
	return setTimeout(e, 0);
}
function Xa(e) {
	return clearTimeout(e);
}
Ea && G(document, "touchmove", function(e) {
	($.active || sa) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: G,
	off: K,
	css: q,
	find: Ci,
	is: function(e, t) {
		return !!yi(e, t, e, !1);
	},
	extend: Ni,
	throttle: Ii,
	closest: yi,
	toggleClass: xi,
	clone: zi,
	index: ki,
	nextTick: Ya,
	cancelNextTick: Xa,
	detectDirection: ja,
	getChild: Di,
	expando: Vi
}, $.get = function(e) {
	return e[Vi];
}, $.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && ($.utils = ni(ni({}, $.utils), e.utils)), qi.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = ci;
var Za = [], Qa, $a, eo = !1, to, no, ro, io;
function ao() {
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
			this.sortable.nativeDraggable ? G(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? G(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? G(document, "touchmove", this._handleFallbackAutoScroll) : G(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? K(document, "dragover", this._handleAutoScroll) : (K(document, "pointermove", this._handleFallbackAutoScroll), K(document, "touchmove", this._handleFallbackAutoScroll), K(document, "mousemove", this._handleFallbackAutoScroll)), so(), oo(), Li();
		},
		nulling: function() {
			ro = $a = Qa = eo = io = to = no = null, Za.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (ro = e, t || this.options.forceAutoScrollFallback || di || ui || pi) {
				co(e, this.options, a, t);
				var o = Mi(a, !0);
				eo && (!io || r !== to || i !== no) && (io && so(), io = setInterval(function() {
					var a = Mi(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, oo()), co(e, n.options, a, t);
				}, 10), to = r, no = i);
			} else {
				if (!this.options.bubbleScroll || Mi(a, !0) === wi()) {
					oo();
					return;
				}
				co(e, this.options, Mi(a, !1), !1);
			}
		}
	}, ei(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function oo() {
	Za.forEach(function(e) {
		clearInterval(e.pid);
	}), Za = [];
}
function so() {
	clearInterval(io);
}
var co = Ii(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = wi(), l = !1, u;
		$a !== n && ($a = n, oo(), Qa = t.scroll, u = t.scrollFn, Qa === !0 && (Qa = Mi(n, !0)));
		var d = 0, f = Qa;
		do {
			var p = f, m = Ti(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = q(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!Za[d]) for (var A = 0; A <= d; A++) Za[A] || (Za[A] = {});
			(Za[d].vx != O || Za[d].vy != k || Za[d].el !== p) && (Za[d].el = p, Za[d].vx = O, Za[d].vy = k, clearInterval(Za[d].pid), (O != 0 || k != 0) && (l = !0, Za[d].pid = setInterval(function() {
				r && this.layer === 0 && $.active._onTouchMove(ro);
				var t = Za[this.layer].vy ? Za[this.layer].vy * s : 0, n = Za[this.layer].vx ? Za[this.layer].vx * s : 0;
				(typeof u != "function" || u.call($.dragged.parentNode[Vi], n, t, e, ro, Za[this.layer].el) === "continue") && Ri(Za[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Mi(f, !1)));
		eo = l;
	}
}, 30), lo = function(e) {
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
function uo() {}
uo.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Di(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: lo
}, ei(uo, { pluginName: "revertOnSpill" });
function fo() {}
fo.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: lo
}, ei(fo, { pluginName: "removeOnSpill" }), $.mount(new ao()), $.mount(fo, uo);
//#endregion
//#region resources/js/api/board.ts
var po = {
	board: `${j}/board`,
	tasks: `${j}/tasks`,
	task: (e) => `${j}/tasks/${e}`,
	moveTask: (e) => `${j}/tasks/${e}/move`,
	taskStatuses: `${j}/task-statuses`,
	timeEntries: `${j}/time-entries`,
	projectMembers: (e) => `${j}/projects/${e}/members`,
	projectMember: (e, t) => `${j}/projects/${e}/members/${t}`
};
async function mo(e, t) {
	let { data: n } = await e.get(po.board, { params: t });
	return n.data;
}
async function ho(e) {
	let { data: t } = await e.get(po.taskStatuses);
	return t.data;
}
async function go(e, t) {
	let { data: n } = await e.get(po.tasks, { params: t });
	return n;
}
async function _o(e, t) {
	let { data: n } = await e.post(po.tasks, t);
	return n.data;
}
async function vo(e, t, n) {
	let { data: r } = await e.put(po.task(t), n);
	return r.data;
}
async function yo(e, t) {
	await e.delete(po.task(t));
}
async function bo(e, t, n) {
	let { data: r } = await e.post(po.moveTask(t), n);
	return r.data;
}
async function xo(e, t) {
	let { data: n } = await e.get(M.project(t));
	return n.data;
}
async function So(e, t) {
	let { data: n } = await e.get(po.projectMembers(t));
	return n.data;
}
async function Co(e, t, n) {
	let { data: r } = await e.post(po.projectMembers(t), n);
	return r.data;
}
async function wo(e, t, n) {
	await e.delete(po.projectMember(t, n));
}
async function To(e, t) {
	let { data: n } = await e.get(po.timeEntries, { params: t });
	return n;
}
async function Eo(e, t) {
	let { data: n } = await e.get(`${N.customers}/${t}`);
	return n.data;
}
//#endregion
//#region resources/js/types/task.ts
var Do = [
	"LOW",
	"NORMAL",
	"HIGH",
	"URGENT"
], Oo = { class: "flex w-full items-center justify-between" }, ko = {
	key: 0,
	class: "ml-2 text-sm font-normal text-muted"
}, Ao = { class: "space-y-5 px-6 py-6" }, jo = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Mo = { key: 1 }, No = { class: "flex space-x-3" }, Po = /* @__PURE__ */ l({
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
		}))), F = n(() => Do.map((e, t) => ({
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
			p.value = I(N.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = I(P.value, e?.assignee_id ?? null), y.value = e?.priority ? F.value[Do.indexOf(e.priority)] ?? null : null, C.value = e?.customer_id ?? null, w.value = {};
		}
		function R(e) {
			f.dueDate = e ? se(e) : "";
		}
		function z() {
			let e = p.value?.id ?? null;
			if (e === null) return null;
			let t = y.value === null ? null : Do[y.value.id];
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
				let t = l.task, n = t ? await vo(l.client, t.id, e) : await _o(l.client, e);
				u("saved", n);
			} catch (e) {
				w.value = te(e), l.notify("error", H(e, d("tasks_projects.tasks.save_failed")));
			} finally {
				D.value = !1;
			}
		}
		async function ee() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await yo(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", H(e, d("tasks_projects.tasks.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, n) => {
			let l = b("BaseIcon"), m = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSelectInput"), T = b("BaseDatePicker"), I = b("BaseInputGrid"), L = b("BaseSwitch"), z = b("BaseTextarea"), V = b("BaseButton"), H = b("BaseModal");
			return g(), r(H, {
				show: e.show,
				onClose: n[11] ||= (e) => u("close")
			}, {
				header: E(() => [o("div", Oo, [o("span", null, [s(x(M.value) + " ", 1), e.task ? (g(), a("span", ko, "#" + x(e.task.number), 1)) : i("", !0)]), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: n[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(B, ["prevent"]) }, [o("div", Ao, [
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
				]), o("div", jo, [j.value ? (g(), r(V, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: ee
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", Mo)), o("div", No, [c(V, {
					type: "button",
					variant: "primary-outline",
					onClick: n[10] ||= (e) => u("close")
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(V, {
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
}), Fo = { class: "flex items-center justify-end space-x-5" }, Io = {
	key: 0,
	class: "flex justify-center py-16"
}, Lo = {
	key: 2,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, Ro = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, zo = { class: "flex items-center" }, Bo = { class: "text-sm font-semibold text-heading" }, Vo = { class: "ml-2 text-xs text-muted" }, Ho = [
	"aria-label",
	"title",
	"onClick"
], Uo = ["data-status-id"], Wo = ["data-task-id", "onClick"], Go = { class: "flex items-start justify-between gap-2" }, Ko = { class: "text-sm font-medium text-heading" }, qo = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, Jo = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body"
}, Yo = {
	key: 1,
	class: "inline-flex items-center text-body"
}, Xo = { class: "mt-3 flex items-center justify-between" }, Zo = {
	key: 1,
	class: "text-xs text-subtle"
}, Qo = ["title"], $o = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, es = { class: "px-3 pt-2 pb-3" }, ts = ["onClick"], ns = /* @__PURE__ */ l({
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
		}, N = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map(), I = !1, L = n(() => C.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), R = n(() => _.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), z = n(() => d.value.map((e) => e.status)), ee = n(() => !w.value && d.value.length === 0);
		T([D, O], () => {
			te();
		}), h(() => {
			V(), te();
		}), m(() => {
			for (let e of N.values()) e.destroy();
			N.clear(), F.clear();
		});
		async function V() {
			try {
				let e = await P(l.client, {
					limit: 100,
					status: "ACTIVE"
				});
				C.value = e.data;
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.tasks.projects_failed")));
			}
			try {
				_.value = await B(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.tasks.members_failed")));
			}
		}
		async function te() {
			let e = {};
			D.value && (e.project_id = D.value.id), O.value && (e.assignee_id = O.value.id), w.value = !0;
			try {
				d.value = await mo(l.client, e);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.board.load_failed")));
			} finally {
				w.value = !1;
			}
		}
		function ne(e, t) {
			let n = t instanceof HTMLElement ? t : null;
			F.get(e) !== n && (N.get(e)?.destroy(), N.delete(e), F.delete(e), n !== null && (F.set(e, n), N.set(e, $.create(n, {
				group: "tasks",
				animation: 150,
				draggable: "[data-task-id]",
				ghostClass: "opacity-40",
				onStart: () => {
					I = !0;
				},
				onEnd: (e) => {
					ae(e), setTimeout(() => {
						I = !1;
					});
				}
			}))));
		}
		function re(e) {
			let t = e.item, n = e.oldIndex ?? 0;
			t.parentNode?.removeChild(t), e.from.insertBefore(t, e.from.children[n] ?? null);
		}
		function ie(e) {
			return d.value.find((t) => t.status.id === e);
		}
		async function ae(e) {
			let t = Number(e.from.dataset.statusId), n = Number(e.to.dataset.statusId), r = e.oldIndex ?? 0, i = e.newIndex ?? 0;
			if (re(e), Number.isNaN(t) || Number.isNaN(n) || t === n && r === i) return;
			let a = ie(t), o = ie(n);
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
				let e = await bo(l.client, c.id, {
					task_status_id: n,
					before_id: d?.id ?? null,
					after_id: f?.id ?? null
				});
				Object.assign(c, e), t !== n && l.notify("success", u("tasks_projects.board.moved", {
					name: c.name,
					status: o.status.name
				}));
			} catch (e) {
				a.tasks = s.from, o.tasks = s.to, l.notify("error", H(e, u("tasks_projects.board.move_failed")));
			}
		}
		function se(e) {
			A.value = null, j.value = {
				task_status_id: e.id,
				project_id: D.value?.id ?? null
			}, k.value = !0;
		}
		function ce(e) {
			I || (A.value = e, j.value = {}, k.value = !0);
		}
		function fe(e) {
			let t = A.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			k.value = !1, A.value = null, l.notify("success", t), te();
		}
		function pe(e) {
			k.value = !1, A.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), te();
		}
		function me() {
			D.value = null, O.value = null;
		}
		function he(e) {
			if (e.project_id === null) return null;
			let t = C.value.find((t) => t.id === e.project_id);
			return t?.identifier || t?.name || null;
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
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), v = b("BaseIcon"), C = b("BaseButton"), T = b("router-link"), M = b("BasePageHeader"), N = b("BaseSelectInput"), P = b("BaseInputGroup"), F = b("BaseFilterWrapper"), I = b("BaseSpinner"), B = b("BaseEmptyPlaceholder"), V = b("BasePage");
			return g(), r(V, null, {
				default: E(() => [
					c(M, { title: S(u)("tasks_projects.board.title") }, {
						actions: E(() => [o("div", Fo, [c(T, { to: "/admin/modules/tasks-projects" }, {
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
						onClear: me
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
					w.value && d.value.length === 0 ? (g(), a("div", Io, [c(I, { class: "h-8 w-8 text-primary-500" })])) : ee.value ? (g(), r(B, {
						key: 1,
						title: S(u)("tasks_projects.task_statuses.none"),
						description: S(u)("tasks_projects.tasks.empty_description")
					}, {
						default: E(() => [c(v, {
							name: "ViewColumnsIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"])) : (g(), a("div", Lo, [(g(!0), a(e, null, y(d.value, (t) => (g(), a("section", {
						key: t.status.id,
						class: "w-72 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
					}, [
						o("header", Ro, [o("div", zo, [
							o("span", {
								class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", t.status.colour ? "" : "bg-line-default"]),
								style: p(t.status.colour ? { backgroundColor: t.status.colour } : void 0)
							}, null, 6),
							o("h3", Bo, x(t.status.name), 1),
							o("span", Vo, x(t.tasks.length), 1)
						]), o("button", {
							type: "button",
							class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
							"aria-label": S(u)("tasks_projects.tasks.new_task"),
							title: S(u)("tasks_projects.tasks.new_task"),
							onClick: (e) => se(t.status)
						}, [c(v, {
							name: "PlusIcon",
							class: "h-4 w-4"
						})], 8, Ho)]),
						o("div", {
							ref_for: !0,
							ref: (e) => ne(t.status.id, e),
							"data-status-id": t.status.id,
							class: "min-h-[80px] space-y-2 px-3 pt-3"
						}, [(g(!0), a(e, null, y(t.tasks, (e) => (g(), a("article", {
							key: e.id,
							"data-task-id": e.id,
							class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
							onClick: (t) => ce(e)
						}, [
							o("div", Go, [o("p", Ko, x(e.name), 1), e.priority ? (g(), a("span", {
								key: 0,
								class: f(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", ye(e.priority)])
							}, x(ve(e.priority)), 3)) : i("", !0)]),
							o("div", qo, [
								o("span", null, "#" + x(e.number), 1),
								he(e) ? (g(), a("span", Jo, x(he(e)), 1)) : i("", !0),
								e.billable ? (g(), a("span", Yo, [c(v, {
									name: "CurrencyDollarIcon",
									class: "mr-0.5 h-3.5 w-3.5"
								}), s(" " + x(S(u)("tasks_projects.tasks.billable")), 1)])) : i("", !0)
							]),
							o("div", Xo, [e.due_date ? (g(), a("span", {
								key: 0,
								class: f(["text-xs", S(ue)(e.due_date) && !e.closed_at ? "font-medium text-status-red" : "text-muted"])
							}, x(S(oe)(e.due_date)), 3)) : (g(), a("span", Zo, "-")), ge(e) ? (g(), a("span", {
								key: 2,
								class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
								title: _e(e)
							}, x(ge(e)), 9, Qo)) : i("", !0)])
						], 8, Wo))), 128))], 8, Uo),
						t.tasks.length === 0 ? (g(), a("p", $o, x(S(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
						o("div", es, [o("button", {
							type: "button",
							class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
							onClick: (e) => se(t.status)
						}, " + " + x(S(u)("tasks_projects.tasks.new_task")), 9, ts)])
					]))), 128))])),
					c(Po, {
						show: k.value,
						client: t.client,
						notify: t.notify,
						task: A.value,
						statuses: z.value,
						members: _.value,
						projects: L.value,
						defaults: j.value,
						onClose: l[2] ||= (e) => k.value = !1,
						onSaved: fe,
						onDeleted: pe
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
}), rs = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, is = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body"
}, as = { key: 1 }, os = { class: "text-body" }, ss = {
	key: 2,
	class: "text-subtle"
}, cs = { key: 3 }, ls = { class: "text-body" }, us = { class: "flex items-center justify-end space-x-5" }, ds = { class: "mt-6 flex overflow-x-auto border-b border-line-default" }, fs = [
	"href",
	"aria-current",
	"onClick"
], ps = {
	key: 0,
	class: "flex justify-center py-16"
}, ms = "extension.page.tasks-projects.project", hs = /* @__PURE__ */ l({
	__name: "ProjectDetailPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = de(), d = v(null), p = v(null), m = v(!0), _ = v(!1), C = v(!1), w = n(() => Number(l.id)), D = n(() => [
			{
				id: "overview",
				label: u("tasks_projects.project.tabs.overview"),
				name: `${ms}.overview`
			},
			{
				id: "tasks",
				label: u("tasks_projects.project.tabs.tasks"),
				name: `${ms}.tasks`
			},
			{
				id: "time",
				label: u("tasks_projects.project.tabs.time"),
				name: `${ms}.time`
			},
			{
				id: "members",
				label: u("tasks_projects.project.tabs.members"),
				name: `${ms}.members`
			}
		]), O = n(() => String(l.router.currentRoute.value.name ?? "")), k = n(() => d.value?.name ?? u("tasks_projects.projects.title"));
		T(w, () => {
			j();
		}), T(O, (e) => A(e)), h(() => {
			A(O.value), j();
		});
		function A(e) {
			e === ms && l.router.replace({
				name: `${ms}.overview`,
				params: { id: l.id }
			});
		}
		async function j() {
			m.value = !0;
			try {
				d.value = await xo(l.client, w.value), await M();
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.project.load_failed")));
			} finally {
				m.value = !1;
			}
		}
		async function M() {
			let e = d.value?.customer_id ?? null;
			if (e === null) {
				p.value = null;
				return;
			}
			try {
				let t = await Eo(l.client, e);
				p.value = t.display_name || t.name || `#${e}`;
			} catch {
				p.value = `#${e}`;
			}
		}
		function N(e) {
			return {
				name: e.name,
				params: { id: l.id }
			};
		}
		function P(e) {
			return O.value === e.name;
		}
		function F(e) {
			C.value = !1, l.notify("success", u("tasks_projects.projects.updated", { name: e.name })), j();
		}
		async function I() {
			let e = d.value;
			if (!(e === null || _.value)) {
				_.value = !0;
				try {
					e.status === "ARCHIVED" ? (await R(l.client, e.id), l.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await L(l.client, e.id), l.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), await j();
				} catch (e) {
					l.notify("error", H(e, u("tasks_projects.projects.save_failed")));
				} finally {
					_.value = !1;
				}
			}
		}
		function z(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function B(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (n, l) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), w = b("BaseBadge"), T = b("BaseIcon"), O = b("BaseButton"), A = b("router-link"), M = b("BasePageHeader"), L = b("BaseSpinner"), R = b("router-view"), ee = b("BasePage");
			return g(), r(ee, null, {
				default: E(() => [
					c(M, { title: k.value }, {
						actions: E(() => [o("div", us, [
							c(A, { to: "/admin/modules/tasks-projects/board" }, {
								default: E(() => [c(O, { variant: "white" }, {
									left: E((e) => [c(T, {
										name: "ViewColumnsIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: E(() => [s(" " + x(S(u)("tasks_projects.project.board")), 1)]),
									_: 1
								})]),
								_: 1
							}),
							d.value ? (g(), r(O, {
								key: 0,
								variant: "primary-outline",
								loading: _.value,
								disabled: _.value,
								onClick: I
							}, {
								default: E(() => [s(x(d.value.status === "ARCHIVED" ? S(u)("tasks_projects.projects.unarchive") : S(u)("tasks_projects.projects.archive")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							d.value ? (g(), r(O, {
								key: 1,
								variant: "primary",
								onClick: l[0] ||= (e) => C.value = !0
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
									title: k.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), d.value ? (g(), a("div", rs, [
							c(w, { class: f(["rounded-full", z(d.value.status)]) }, {
								default: E(() => [s(x(B(d.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							d.value.identifier ? (g(), a("span", is, x(d.value.identifier), 1)) : i("", !0),
							d.value.customer_id ? (g(), a("span", as, [s(x(S(u)("tasks_projects.project.customer")) + ": ", 1), o("span", os, x(p.value ?? `#${d.value.customer_id}`), 1)])) : (g(), a("span", ss, x(S(u)("tasks_projects.projects.internal")), 1)),
							d.value.due_date ? (g(), a("span", cs, [s(x(S(u)("tasks_projects.project.due_date")) + ": ", 1), o("span", ls, x(S(oe)(d.value.due_date)), 1)])) : i("", !0)
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("nav", ds, [(g(!0), a(e, null, y(D.value, (e) => (g(), r(A, {
						key: e.id,
						to: N(e),
						custom: ""
					}, {
						default: E(({ href: t, navigate: n }) => [o("a", {
							href: t,
							"aria-current": P(e) ? "page" : void 0,
							class: f(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", P(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, x(e.label), 11, fs)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					m.value && d.value === null ? (g(), a("div", ps, [c(L, { class: "h-8 w-8 text-primary-500" })])) : (g(), r(R, {
						key: 1,
						project: d.value,
						onRefresh: j
					}, null, 8, ["project"])),
					c(_e, {
						show: C.value,
						client: t.client,
						notify: t.notify,
						project: d.value,
						onClose: l[1] ||= (e) => C.value = !1,
						onSaved: F
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
}), gs = { class: "py-4" }, _s = { class: "rounded-xl border border-line-default bg-surface p-5" }, vs = { class: "flex flex-col gap-4 lg:flex-row lg:items-end" }, ys = {
	key: 0,
	class: "mt-3 text-xs text-subtle"
}, bs = { class: "mt-4 overflow-hidden rounded-xl border border-line-default bg-surface" }, xs = {
	key: 0,
	class: "flex justify-center py-10"
}, Ss = {
	key: 1,
	class: "px-5 py-8 text-center text-sm text-muted"
}, Cs = {
	key: 2,
	class: "divide-y divide-line-light"
}, ws = { class: "text-sm font-medium text-heading" }, Ts = { class: "text-xs text-muted" }, Es = {
	key: 1,
	class: "text-subtle"
}, Ds = /* @__PURE__ */ l({
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
				p.value = await B(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				d.value = await So(l.client, O.value);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.project.members.load_failed")));
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
					await Co(l.client, O.value, {
						user_id: e.id,
						rate: re(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), w.value = null, T.value = "", await A();
				} catch (e) {
					D.value = te(e), l.notify("error", H(e, u("tasks_projects.project.members.attach_failed")));
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
					await wo(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", H(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					C.value = null;
				}
			}
		}
		return (t, n) => {
			let l = b("BaseSelectInput"), p = b("BaseInputGroup"), h = b("BaseInput"), v = b("BaseIcon"), O = b("BaseButton"), A = b("BaseSpinner"), P = b("BaseFormatMoney");
			return g(), a("div", gs, [o("div", _s, [o("div", vs, [
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
			]), k.value.length === 0 && !m.value ? (g(), a("p", ys, x(S(u)("tasks_projects.project.members.all_attached")), 1)) : i("", !0)]), o("div", bs, [m.value ? (g(), a("div", xs, [c(A, { class: "h-6 w-6 text-primary-500" })])) : d.value.length === 0 ? (g(), a("p", Ss, x(S(u)("tasks_projects.project.members.empty")), 1)) : (g(), a("ul", Cs, [(g(!0), a(e, null, y(d.value, (e) => (g(), a("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [o("div", null, [o("p", ws, x(j(e.user_id)), 1), o("p", Ts, [s(x(S(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (g(), a("span", Es, x(S(u)("tasks_projects.tasks.none")), 1)) : (g(), r(P, {
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
}), Os = {
	key: 0,
	class: "py-6"
}, ks = { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, As = { class: "rounded-xl border border-line-default bg-surface p-5" }, js = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ms = { class: "mt-2 text-2xl font-semibold text-heading" }, Ns = { class: "mt-1 text-xs text-muted" }, Ps = { class: "rounded-xl border border-line-default bg-surface p-5" }, Fs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Is = { class: "mt-2 text-2xl font-semibold text-heading" }, Ls = { class: "mt-1 text-xs text-muted" }, Rs = { class: "rounded-xl border border-line-default bg-surface p-5" }, zs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Bs = { class: "mt-2 text-2xl font-semibold text-heading" }, Vs = { class: "rounded-xl border border-line-default bg-surface p-5" }, Hs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Us = { class: "mt-2 text-2xl font-semibold text-heading" }, Ws = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Gs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ks = { class: "mt-2 text-sm text-body" }, qs = { class: "mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Js = {
	key: 0,
	class: "mt-2 text-xs font-medium text-status-red"
}, Ys = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Xs = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Zs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Qs = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, $s = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, ec = {
	key: 1,
	class: "flex justify-center py-16"
}, tc = /* @__PURE__ */ l({
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
			return t.project && d.value ? (g(), a("div", Os, [
				o("div", ks, [
					o("div", As, [
						o("p", js, x(S(u)("tasks_projects.project.overview.tasks")), 1),
						o("p", Ms, x(d.value.tasks.total), 1),
						o("p", Ns, x(S(u)("tasks_projects.project.overview.open_tasks", { count: d.value.tasks.open })) + " · " + x(S(u)("tasks_projects.project.overview.closed_tasks", { count: d.value.tasks.closed })), 1)
					]),
					o("div", Ps, [
						o("p", Fs, x(S(u)("tasks_projects.project.overview.logged")), 1),
						o("p", Is, x(S(ce)(d.value.logged_minutes)), 1),
						o("p", Ls, x(S(u)("tasks_projects.project.overview.billable")) + ": " + x(S(ce)(d.value.billable_minutes)), 1)
					]),
					o("div", Rs, [o("p", zs, x(S(u)("tasks_projects.project.overview.billable_amount")), 1), o("p", Bs, [c(y, { amount: d.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Vs, [
						o("p", Hs, x(S(u)("tasks_projects.project.overview.unbilled_amount")), 1),
						o("p", Us, [c(y, { amount: d.value.unbilled_amount }, null, 8, ["amount"])]),
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
				o("div", Ws, [o("p", Gs, x(S(u)("tasks_projects.project.overview.budget")), 1), m.value ? (g(), a(e, { key: 0 }, [
					o("p", Ks, x(S(u)("tasks_projects.project.overview.budget_used", {
						used: S(ce)(d.value.logged_minutes),
						total: S(ce)(m.value)
					})), 1),
					o("div", qs, [o("div", {
						class: f(["h-2 rounded-full", v.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: p({ width: `${h.value}%` })
					}, null, 6)]),
					v.value > 0 ? (g(), a("p", Js, x(S(u)("tasks_projects.project.overview.budget_over", { amount: S(ce)(v.value) })), 1)) : i("", !0)
				], 64)) : (g(), a("p", Ys, x(S(u)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", Xs, [o("p", Zs, x(S(u)("tasks_projects.project.overview.description")), 1), t.project.description ? (g(), a("p", Qs, x(t.project.description), 1)) : (g(), a("p", $s, x(S(u)("tasks_projects.project.overview.no_description")), 1))])
			])) : (g(), a("div", ec, [c(w, { class: "h-8 w-8 text-primary-500" })]));
		};
	}
}), nc = { class: "relative table-container" }, rc = ["onClick"], ic = { class: "inline-flex items-center" }, ac = {
	key: 1,
	class: "text-subtle"
}, oc = {
	key: 1,
	class: "text-subtle"
}, sc = 10, cc = 350, lc = /* @__PURE__ */ l({
	__name: "TaskList",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		projectId: {},
		filterable: { type: Boolean }
	},
	emits: ["changed"],
	setup(e, { expose: t, emit: l }) {
		let u = e, d = l, y = de(), C = v(null), O = v(!0), k = v(0), A = v([]), j = v([]), M = v([]), N = v(!1), F = v(null), I = v({}), L = v(null), R = _({
			search: "",
			status: null,
			assignee: null
		}), z = n(() => A.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), ee = n(() => j.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), V = n(() => R.search.trim() !== "" || R.status !== null || R.assignee !== null), te = n(() => !O.value && k.value === 0 && !V.value), ne = n(() => [
			{
				key: "number",
				label: y("tasks_projects.tasks.columns.number"),
				sortable: !1,
				tdClass: "text-muted"
			},
			{
				key: "name",
				label: y("tasks_projects.tasks.columns.name"),
				sortable: !1,
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: y("tasks_projects.tasks.columns.status"),
				sortable: !1
			},
			{
				key: "assignee",
				label: y("tasks_projects.tasks.columns.assignee"),
				sortable: !1
			},
			{
				key: "priority",
				label: y("tasks_projects.tasks.columns.priority"),
				sortable: !1
			},
			{
				key: "due_date",
				label: y("tasks_projects.tasks.columns.due_date"),
				sortable: !1
			},
			{
				key: "actions",
				label: y("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]), re = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, ie;
		T(() => R.search, () => {
			clearTimeout(ie), ie = setTimeout(() => ce(), cc);
		}), T([
			() => R.status,
			() => R.assignee,
			() => u.projectId
		], () => ce()), h(() => {
			ae();
		}), m(() => clearTimeout(ie));
		async function ae() {
			try {
				A.value = await ho(u.client);
			} catch (e) {
				u.notify("error", H(e, y("tasks_projects.task_statuses.load_failed")));
			}
			try {
				j.value = await B(u.client);
			} catch (e) {
				u.notify("error", H(e, y("tasks_projects.tasks.members_failed")));
			}
			if (!u.projectId) try {
				let e = await P(u.client, {
					limit: 100,
					status: "ACTIVE"
				});
				M.value = e.data.map((e) => ({
					id: e.id,
					label: e.name
				}));
			} catch (e) {
				u.notify("error", H(e, y("tasks_projects.tasks.projects_failed")));
			}
		}
		async function se({ page: e }) {
			let t = {
				page: e,
				limit: sc
			};
			u.projectId && (t.project_id = u.projectId), R.status && (t.task_status_id = R.status.id), R.assignee && (t.assignee_id = R.assignee.id), R.search.trim() !== "" && (t.search = R.search.trim()), O.value = !0;
			try {
				let e = await go(u.client, t);
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
				return u.notify("error", H(e, y("tasks_projects.tasks.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: sc
					}
				};
			} finally {
				O.value = !1;
			}
		}
		function ce(e = !1) {
			C.value?.refresh(e);
		}
		function le() {
			R.search = "", R.status = null, R.assignee = null;
		}
		function fe() {
			F.value = null, I.value = { project_id: u.projectId ?? null }, N.value = !0;
		}
		function pe(e) {
			F.value = e, I.value = {}, N.value = !0;
		}
		function me(e) {
			let t = F.value ? y("tasks_projects.tasks.updated", { name: e.name }) : y("tasks_projects.tasks.created", { name: e.name });
			N.value = !1, F.value = null, u.notify("success", t), ce(!0), d("changed");
		}
		function he(e) {
			N.value = !1, F.value = null, u.notify("success", y("tasks_projects.tasks.deleted", { name: e.name })), ce(!0), d("changed");
		}
		function ge(e) {
			return A.value.find((t) => t.id === e.task_status_id) ?? null;
		}
		function _e(e) {
			return e.assignee_id === null ? y("tasks_projects.tasks.unassigned") : j.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function ve(e) {
			return y(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function ye(e) {
			return re[e];
		}
		async function be(e) {
			if (window.confirm(y("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				L.value = e.id;
				try {
					await yo(u.client, e.id), u.notify("success", y("tasks_projects.tasks.deleted", { name: e.name })), ce(!0), d("changed");
				} catch (e) {
					u.notify("error", H(e, y("tasks_projects.tasks.delete_failed")));
				} finally {
					L.value = null;
				}
			}
		}
		return t({
			openCreate: fe,
			refresh: ce
		}), (t, n) => {
			let l = b("BaseInput"), u = b("BaseInputGroup"), d = b("BaseSelectInput"), m = b("BaseFilterWrapper"), h = b("BaseIcon"), _ = b("BaseButton"), v = b("BaseEmptyPlaceholder"), T = b("BaseDropdownItem"), O = b("BaseDropdown"), k = b("BaseTable");
			return g(), a("div", null, [
				e.filterable ? (g(), r(m, {
					key: 0,
					show: !0,
					class: "mt-3",
					onClear: le
				}, {
					default: E(() => [
						c(u, {
							label: S(y)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(l, {
								modelValue: R.search,
								"onUpdate:modelValue": n[0] ||= (e) => R.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: S(y)("tasks_projects.tasks.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]),
						c(u, {
							label: S(y)("tasks_projects.tasks.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(d, {
								modelValue: R.status,
								"onUpdate:modelValue": n[1] ||= (e) => R.status = e,
								options: z.value,
								placeholder: S(y)("tasks_projects.tasks.all_tasks"),
								"label-key": "label"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						c(u, {
							label: S(y)("tasks_projects.tasks.columns.assignee"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(d, {
								modelValue: R.assignee,
								"onUpdate:modelValue": n[2] ||= (e) => R.assignee = e,
								options: ee.value,
								placeholder: S(y)("tasks_projects.board.filters.all_assignees"),
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
					title: S(y)("tasks_projects.tasks.empty_title"),
					description: S(y)("tasks_projects.tasks.empty_description")
				}, {
					actions: E(() => [c(_, {
						variant: "primary",
						onClick: fe
					}, {
						left: E((e) => [c(h, {
							name: "PlusIcon",
							class: f(e.class)
						}, null, 8, ["class"])]),
						default: E(() => [s(" " + x(S(y)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})]),
					default: E(() => [c(h, {
						name: "ClipboardDocumentListIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"]), [[w, te.value]]),
				D(o("div", nc, [c(k, {
					ref_key: "tableRef",
					ref: C,
					data: se,
					columns: ne.value,
					class: "mt-3"
				}, {
					"cell-number": E(({ row: e }) => [s("#" + x(e.data.number), 1)]),
					"cell-name": E(({ row: e }) => [o("button", {
						type: "button",
						class: "text-left hover:text-primary-500",
						onClick: (t) => pe(e.data)
					}, x(e.data.name), 9, rc)]),
					"cell-status": E(({ row: e }) => [o("span", ic, [o("span", {
						class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", ge(e.data)?.colour ? "" : "bg-line-default"]),
						style: p(ge(e.data)?.colour ? { backgroundColor: ge(e.data)?.colour } : void 0)
					}, null, 6), s(" " + x(ge(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": E(({ row: e }) => [o("span", { class: f(e.data.assignee_id === null ? "text-subtle" : "") }, x(_e(e.data)), 3)]),
					"cell-priority": E(({ row: e }) => [e.data.priority ? (g(), a("span", {
						key: 0,
						class: f(["rounded-full px-2 py-0.5 text-xs font-medium", ye(e.data.priority)])
					}, x(ve(e.data.priority)), 3)) : (g(), a("span", ac, "-"))]),
					"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", {
						key: 0,
						class: f(S(ue)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "")
					}, x(S(oe)(e.data.due_date)), 3)) : (g(), a("span", oc, "-"))]),
					"cell-actions": E(({ row: e }) => [c(O, { "content-loading": L.value === e.data.id }, {
						activator: E(() => [c(h, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: E(() => [c(T, { onClick: (t) => pe(e.data) }, {
							default: E(() => [c(h, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(y)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(T, { onClick: (t) => be(e.data) }, {
							default: E(() => [c(h, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(y)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1032, ["content-loading"])]),
					_: 1
				}, 8, ["columns"])], 512), [[w, !te.value]]),
				c(Po, {
					show: N.value,
					client: e.client,
					notify: e.notify,
					task: F.value,
					statuses: A.value,
					members: j.value,
					projects: M.value,
					defaults: I.value,
					"lock-project": !!e.projectId,
					onClose: n[3] ||= (e) => N.value = !1,
					onSaved: me,
					onDeleted: he
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
}), uc = { class: "py-4" }, dc = { class: "flex justify-end" }, fc = /* @__PURE__ */ l({
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
			return g(), a("div", uc, [o("div", dc, [c(i, {
				variant: "primary",
				onClick: n[0] ||= (e) => u.value?.openCreate()
			}, {
				left: E((e) => [c(r, {
					name: "PlusIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(l)("tasks_projects.tasks.new_task")), 1)]),
				_: 1
			})]), c(lc, {
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
}), pc = { class: "relative py-4 table-container" }, mc = { class: "font-medium text-heading" }, hc = {
	key: 0,
	class: "block text-xs text-muted"
}, gc = {
	key: 0,
	class: "text-primary-500"
}, _c = { key: 1 }, vc = {
	key: 1,
	class: "text-subtle"
}, yc = 15, bc = /* @__PURE__ */ l({
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
				u.value = await B(t.client);
			} catch (e) {
				t.notify("error", H(e, l("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await go(t.client, {
					project_id: f.value,
					limit: 100
				});
				d.value = e.data;
			} catch (e) {
				t.notify("error", H(e, l("tasks_projects.tasks.load_failed")));
			}
		}
		async function _({ page: e }) {
			let n = {
				page: e,
				limit: yc,
				project_id: f.value
			};
			try {
				let e = await To(t.client, n);
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
				return t.notify("error", H(e, l("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: yc
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
			return g(), a("div", pc, [c(d, {
				data: _,
				columns: p.value
			}, {
				"cell-started_at": E(({ row: e }) => [s(x(e.data.started_at ? S(oe)(e.data.started_at) : "-"), 1)]),
				"cell-user": E(({ row: e }) => [s(x(y(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [o("span", mc, x(C(e.data.task_id)), 1), e.data.description ? (g(), a("span", hc, x(e.data.description), 1)) : i("", !0)]),
				"cell-duration_minutes": E(({ row: e }) => [e.data.is_running ? (g(), a("span", gc, x(S(l)("tasks_projects.project.time.running")), 1)) : (g(), a("span", _c, x(S(ce)(e.data.duration_minutes)), 1))]),
				"cell-billable": E(({ row: e }) => [e.data.billable ? (g(), r(n, {
					key: 0,
					name: "CheckCircleIcon",
					class: "h-5 w-5 text-status-green"
				})) : (g(), a("span", vc, "-"))]),
				"cell-amount": E(({ row: e }) => [c(u, { amount: e.data.amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["columns"])]);
		};
	}
}), xc = { class: "flex items-center justify-end space-x-5" }, Sc = /* @__PURE__ */ l({
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
					actions: E(() => [o("div", xc, [c(m, { to: "/admin/modules/tasks-projects/board" }, {
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
				}, 8, ["title"]), c(lc, {
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
function Cc(e, t) {
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
var wc = "tasks-projects", Tc = {
	viewProject: `${wc}:view-project`,
	editProject: `${wc}:edit-project`,
	viewTask: `${wc}:view-task`,
	viewOwnTime: `${wc}:view-own-time`
};
function Ec(e) {
	e.addMessages(Qr), e.registerPage({
		id: "board",
		module: wc,
		path: "board",
		component: Cc(e, ns),
		meta: {
			ability: Tc.viewTask,
			title: "tasks_projects.board.title"
		}
	}), e.registerPage({
		id: "tasks",
		module: wc,
		path: "tasks",
		component: Cc(e, Sc),
		meta: {
			ability: Tc.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "project",
		module: wc,
		path: "projects/:id",
		component: Cc(e, hs),
		meta: {
			ability: Tc.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: Cc(e, tc),
				meta: {
					ability: Tc.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: Cc(e, fc),
				meta: {
					ability: Tc.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: Cc(e, bc),
				meta: {
					ability: Tc.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: Cc(e, Ds),
				meta: {
					ability: Tc.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/messages/billing.ts
var Dc = { en: { tasks_projects: { billing: {
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
} } } }, Oc = "/api/v1/tasks-projects", kc = {
	customers: `${Oc}/billing/customers`,
	unbilled: `${Oc}/billing/unbilled`,
	prepare: `${Oc}/billing/prepare`,
	confirm: `${Oc}/billing/confirm`
}, Ac = {
	bootstrap: "/api/v1/bootstrap",
	customers: "/api/v1/customers",
	invoices: "/api/v1/invoices",
	invoiceTemplates: "/api/v1/invoices/templates",
	nextNumber: "/api/v1/next-number",
	exchangeRate: (e) => `/api/v1/currencies/${e}/exchange-rate`
};
async function jc(e, t = {}) {
	let { data: n } = await e.get(kc.customers, { params: t });
	return n.data ?? [];
}
async function Mc(e, t, n = {}) {
	let { data: r } = await e.get(kc.unbilled, { params: {
		customer_id: t,
		...n
	} });
	return r.data;
}
async function Nc(e, t, n) {
	let { data: r } = await e.post(kc.prepare, {
		entry_ids: t,
		grouping: n
	});
	return r.data;
}
async function Pc(e, t, n) {
	let { data: r } = await e.post(kc.confirm, {
		invoice_id: t,
		items: n
	});
	return r?.stamped ?? 0;
}
async function Fc(e, t = 200) {
	let { data: n } = await e.get(Ac.customers, { params: { limit: t } });
	return n.data ?? [];
}
async function Ic(e, t) {
	let { data: n } = await e.post(Ac.invoices, t);
	return n.data;
}
async function Lc(e) {
	let { data: t } = await e.get(Ac.invoiceTemplates);
	return t?.invoiceTemplates ?? [];
}
async function Rc(e, t) {
	let n = { key: "invoice" };
	t !== void 0 && (n.userId = t);
	let { data: r } = await e.get(Ac.nextNumber, { params: n });
	return r?.success && typeof r.nextNumber == "string" ? r.nextNumber : null;
}
async function zc(e, t) {
	let { data: n } = await e.get(Ac.exchangeRate(t)), r = Array.isArray(n?.exchangeRate) ? n.exchangeRate[0] : n?.exchangeRate, i = Number(r);
	return Number.isFinite(i) && i > 0 ? i : null;
}
async function Bc(e) {
	let { data: t } = await e.get(Ac.bootstrap), n = t?.current_company_settings ?? {}, r = t?.current_user_settings ?? {}, i = Number(n.invoice_due_date_days), a = r.default_invoice_template;
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
var Vc = { class: "flex items-center justify-end space-x-5" }, Hc = { class: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" }, Uc = {
	key: 0,
	class: "flex justify-center py-16"
}, Wc = {
	key: 1,
	class: "mt-6"
}, Gc = { class: "text-base font-semibold text-heading" }, Kc = { class: "mt-1 text-sm text-muted" }, qc = { class: "mt-4 flex flex-wrap items-end gap-4" }, Jc = {
	key: 0,
	class: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
}, Yc = ["onClick"], Xc = { class: "text-sm font-semibold text-heading" }, Zc = { class: "mt-1 text-xs text-muted" }, Qc = { class: "mt-3 text-xl font-semibold text-heading" }, $c = {
	key: 2,
	class: "mt-6"
}, el = { class: "flex flex-wrap items-end justify-between gap-4" }, tl = { class: "text-base font-semibold text-heading" }, nl = { class: "mt-1 text-sm text-muted" }, rl = {
	key: 0,
	class: "flex justify-center py-16"
}, il = { class: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-default bg-surface-secondary px-4 py-3" }, al = { class: "flex cursor-pointer items-center gap-2 text-sm font-medium text-heading" }, ol = ["checked"], sl = { class: "text-sm text-muted" }, cl = { class: "flex flex-wrap items-center justify-between gap-3 bg-surface-secondary px-4 py-3" }, ll = { class: "flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading" }, ul = ["checked", "onChange"], dl = { class: "text-sm text-muted" }, fl = { class: "overflow-x-auto" }, pl = { class: "w-full table-auto" }, ml = { class: "bg-surface text-xs tracking-wider text-muted uppercase" }, hl = { class: "px-4 py-2 text-left font-medium" }, gl = { class: "px-4 py-2 text-left font-medium" }, _l = { class: "px-4 py-2 text-left font-medium" }, vl = { class: "px-4 py-2 text-left font-medium" }, yl = { class: "px-4 py-2 text-right font-medium" }, bl = { class: "px-4 py-2 text-right font-medium" }, xl = { class: "divide-y divide-line-default bg-surface text-sm" }, Sl = { class: "pl-4" }, Cl = ["checked", "onChange"], wl = { class: "px-4 py-2 whitespace-nowrap text-muted" }, Tl = { class: "px-4 py-2" }, El = { class: "text-heading" }, Dl = { class: "block text-xs text-subtle" }, Ol = { class: "px-4 py-2 text-muted" }, kl = { class: "px-4 py-2 text-muted" }, Al = { class: "px-4 py-2 text-right whitespace-nowrap text-muted" }, jl = { class: "px-4 py-2 text-right whitespace-nowrap text-heading" }, Ml = { class: "mt-5 flex flex-wrap items-center justify-between gap-4" }, Nl = { class: "text-sm font-medium text-heading" }, Pl = { class: "flex items-center gap-3" }, Fl = {
	key: 3,
	class: "mt-6"
}, Il = { class: "text-base font-semibold text-heading" }, Ll = {
	key: 0,
	class: "flex justify-center py-16"
}, Rl = {
	key: 0,
	class: "mt-4 rounded-lg border border-status-red bg-surface px-4 py-3 text-sm text-status-red"
}, zl = { class: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Bl = {
	key: 0,
	class: "mt-1 block text-xs text-subtle"
}, Vl = { class: "mt-1 block text-xs text-subtle" }, Hl = { class: "mt-5 overflow-hidden rounded-xl border border-line-default" }, Ul = { class: "overflow-x-auto" }, Wl = { class: "w-full table-auto" }, Gl = { class: "bg-surface-secondary text-xs tracking-wider text-muted uppercase" }, Kl = { class: "px-4 py-2 text-left font-medium" }, ql = { class: "px-4 py-2 text-right font-medium" }, Jl = { class: "px-4 py-2 text-right font-medium" }, Yl = { class: "px-4 py-2 text-right font-medium" }, Xl = { class: "divide-y divide-line-default bg-surface text-sm" }, Zl = { class: "px-4 py-3" }, Ql = { class: "font-medium text-heading" }, $l = {
	key: 0,
	class: "mt-1 block text-xs whitespace-pre-line text-subtle"
}, eu = { class: "px-4 py-3 text-right whitespace-nowrap text-muted" }, tu = { class: "px-4 py-3 text-right whitespace-nowrap text-muted" }, nu = { class: "px-4 py-3 text-right whitespace-nowrap font-medium text-heading" }, ru = { class: "bg-surface-secondary text-sm" }, iu = {
	class: "px-4 py-2 text-right text-muted",
	colspan: "3"
}, au = { class: "px-4 py-2 text-right whitespace-nowrap text-heading" }, ou = {
	class: "px-4 py-2 text-right font-semibold text-heading",
	colspan: "3"
}, su = { class: "px-4 py-2 text-right whitespace-nowrap font-semibold text-heading" }, cu = { class: "mt-5 flex items-center justify-end gap-3" }, lu = {
	key: 4,
	class: "mt-6"
}, uu = {
	key: 0,
	class: "flex flex-col items-center gap-3 py-16"
}, du = { class: "text-sm text-muted" }, fu = {
	key: 0,
	class: "rounded-xl border border-status-yellow bg-surface p-5"
}, pu = { class: "text-sm font-semibold text-heading" }, mu = { class: "mt-1 text-sm text-muted" }, hu = { class: "mt-4 flex flex-wrap items-center gap-3" }, gu = {
	key: 1,
	class: "rounded-xl border border-line-default bg-surface p-6 text-center"
}, _u = { class: "mt-3 text-base font-semibold text-heading" }, vu = { class: "mt-1 text-sm text-muted" }, yu = { class: "mt-3 text-2xl font-semibold text-heading" }, bu = { class: "mt-5 flex flex-wrap items-center justify-center gap-3" }, xu = {
	key: 2,
	class: "flex justify-center py-16"
}, Su = "/admin/invoices", Cu = /* @__PURE__ */ l({
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
		}), R = v({}), z = v(!1), B = v(!1), ee = v(null), V = v(null), ne = v(!1), re = v(!1), ie = n(() => [
			d("tasks_projects.billing.steps.customer"),
			d("tasks_projects.billing.steps.entries"),
			d("tasks_projects.billing.steps.preview"),
			d("tasks_projects.billing.steps.create")
		]), ae = n(() => u.map((e) => ({
			id: e,
			label: d(`tasks_projects.billing.entries.group_by.${e}`)
		}))), le = n({
			get: () => ae.value.find((e) => e.id === A.value) ?? ae.value[0],
			set: (e) => {
				A.value = e.id;
			}
		}), ue = n(() => P.value.map((e) => ({ name: e.name }))), fe = n({
			get: () => ue.value.find((e) => e.name === L.templateName) ?? { name: L.templateName },
			set: (e) => {
				L.templateName = e.name;
			}
		}), pe = n(() => (k.value?.entries ?? []).filter((e) => e.currency_id === (O.value?.currency_id ?? null))), me = n(() => {
			let e = {};
			for (let t of pe.value) e[t.id] = t;
			return e;
		}), he = n(() => (k.value?.groups[A.value] ?? []).filter((e) => e.currency_id === (O.value?.currency_id ?? null))), ge = n(() => pe.value.length), _e = n(() => ge.value > 0 && j.value.length === ge.value), ve = n(() => j.value.reduce((e, t) => e + (me.value[t]?.minutes ?? 0), 0)), ye = n(() => j.value.reduce((e, t) => e + (me.value[t]?.amount ?? 0), 0)), be = n(() => O.value === null ? null : Me(O.value.customer_id, O.value.currency_id)), xe = n(() => {
			let e = N.value?.currency?.id ?? null;
			return e === null || O.value === null ? !1 : je(O.value.customer_id) !== e;
		}), Se = n(() => N.value?.autoGenerateNumber !== !0 || R.value.invoice_number !== void 0), Ce = n(() => {
			let e = {};
			return D.from !== "" && (e.from = D.from), D.to !== "" && (e.to = D.to), e;
		});
		T(() => [D.from, D.to], () => void De()), h(() => void we());
		async function we() {
			m.value = !0, await Promise.all([
				Ee(),
				De(),
				Oe(),
				ke()
			]), m.value = !1;
			let e = Te();
			if (e !== null) {
				let t = C.value.find((t) => t.customer_id === e);
				t && await Ie(t);
			}
		}
		function Te() {
			let e = l.router.currentRoute.value.query.customer_id, t = Array.isArray(e) ? e[0] : e ?? new URLSearchParams(window.location.search).get("customer_id"), n = Number(t);
			return Number.isInteger(n) && n > 0 ? n : null;
		}
		async function Ee() {
			try {
				N.value = await Bc(l.client);
			} catch {
				N.value = null;
			}
		}
		async function De() {
			try {
				C.value = await jc(l.client, Ce.value);
			} catch (e) {
				C.value = [], l.notify("error", H(e, d("tasks_projects.billing.customer.load_failed")));
			}
		}
		async function Oe() {
			try {
				let e = {};
				for (let t of await Fc(l.client)) e[t.id] = t;
				w.value = e;
			} catch {
				w.value = {};
			}
		}
		async function ke() {
			try {
				P.value = await Lc(l.client);
			} catch (e) {
				P.value = [], l.notify("error", H(e, d("tasks_projects.billing.preview.templates_failed")));
			}
		}
		function Ae(e) {
			let t = w.value[e], n = t?.display_name ?? t?.name;
			return n && n !== "" ? n : d("tasks_projects.billing.customer.unnamed", { id: e });
		}
		function je(e) {
			let t = w.value[e];
			return t?.currency_id ?? t?.currency?.id ?? null;
		}
		function Me(e, t) {
			if (t === null) return null;
			let n = w.value[e];
			if (n?.currency && n.currency.id === t) return n.currency;
			let r = N.value?.currency ?? null;
			return r !== null && r.id === t ? r : null;
		}
		function Ne() {
			D.from = "", D.to = "";
		}
		function Pe(e) {
			D.from = e ? se(e) : "";
		}
		function Fe(e) {
			D.to = e ? se(e) : "";
		}
		async function Ie(e) {
			O.value = e, p.value = 2, M.value = !0, k.value = null, j.value = [];
			try {
				k.value = await Mc(l.client, e.customer_id, Ce.value), j.value = pe.value.map((e) => e.id);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.billing.entries.load_failed")));
			} finally {
				M.value = !1;
			}
		}
		function Le(e) {
			return j.value.includes(e);
		}
		function Re(e) {
			j.value = Le(e) ? j.value.filter((t) => t !== e) : [...j.value, e];
		}
		function ze() {
			j.value = _e.value ? [] : pe.value.map((e) => e.id);
		}
		function Be(e) {
			return e.entry_ids.length > 0 && e.entry_ids.every((e) => Le(e));
		}
		function Ve(e) {
			if (Be(e)) {
				j.value = j.value.filter((t) => !e.entry_ids.includes(t));
				return;
			}
			let t = e.entry_ids.filter((e) => !Le(e));
			j.value = [...j.value, ...t];
		}
		function He(e) {
			return e.entry_ids.map((e) => me.value[e]).filter((e) => e !== void 0);
		}
		async function Ue() {
			if (j.value.length === 0) {
				l.notify("warning", d("tasks_projects.billing.entries.none_selected"));
				return;
			}
			p.value = 3, I.value = !0, F.value = null, R.value = {}, z.value = !1;
			try {
				let e = await Nc(l.client, j.value, A.value);
				F.value = e, await We(e);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.billing.preview.prepare_failed"))), p.value = 2;
			} finally {
				I.value = !1;
			}
		}
		async function We(e) {
			L.invoiceDate = e.invoice_date, L.dueDate = Ge(e.invoice_date), L.templateName = N.value?.defaultTemplate ?? P.value[0]?.name ?? "";
			let [t, n] = await Promise.all([Rc(l.client, e.customer_id).catch(() => null), xe.value && O.value?.currency_id ? zc(l.client, O.value.currency_id).catch(() => null) : Promise.resolve(null)]);
			L.invoiceNumber = t ?? "", t === null && l.notify("warning", d("tasks_projects.billing.preview.number_failed")), xe.value ? (L.exchangeRate = n === null ? "" : String(n), n === null && l.notify("warning", d("tasks_projects.billing.preview.rate_failed"))) : L.exchangeRate = "";
		}
		function Ge(e) {
			let t = N.value;
			if (t === null || !t.setDueDateAutomatically) return "";
			let n = /* @__PURE__ */ new Date(`${e}T00:00:00`);
			return Number.isNaN(n.getTime()) ? "" : (n.setDate(n.getDate() + t.dueDateDays), se(n));
		}
		function Ke(e) {
			L.invoiceDate = e ? se(e) : "", L.dueDate = Ge(L.invoiceDate);
		}
		function qe(e) {
			L.dueDate = e ? se(e) : "";
		}
		function Je(e) {
			return {
				invoice_date: L.invoiceDate,
				due_date: L.dueDate === "" ? null : L.dueDate,
				customer_id: e.customer_id,
				invoice_number: L.invoiceNumber,
				currency_id: je(e.customer_id) ?? e.currency_id,
				exchange_rate: xe.value && L.exchangeRate !== "" ? Number(L.exchangeRate) : null,
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
		async function Ye() {
			let e = F.value;
			if (!(e === null || B.value)) {
				p.value = 4, B.value = !0, R.value = {}, z.value = !1, ee.value = null, V.value = null, ne.value = !1;
				try {
					let t = await Ic(l.client, Je(e));
					ee.value = t, await Xe(t, e);
				} catch (e) {
					ct(e) === 422 ? (R.value = te(e), z.value = !0, p.value = 3, l.notify("error", H(e, d("tasks_projects.billing.preview.invalid")))) : (p.value = 3, l.notify("error", H(e, d("tasks_projects.billing.create.failed"))));
				} finally {
					B.value = !1;
				}
			}
		}
		async function Xe(e, t) {
			let n = e.items ?? [], r = [];
			if (t.groups.forEach((e, t) => {
				let i = n[t];
				i && r.push({
					invoice_item_id: i.id,
					entry_ids: e.entry_ids
				});
			}), r.length === 0) {
				ne.value = !0;
				return;
			}
			re.value = !0;
			try {
				V.value = await Pc(l.client, e.id, r), ne.value = !1;
			} catch (e) {
				ne.value = !0, l.notify("error", H(e, d("tasks_projects.billing.create.stamp_failed_title")));
			} finally {
				re.value = !1;
			}
		}
		async function Ze() {
			let e = ee.value, t = F.value;
			e === null || t === null || re.value || (await Xe(e, t), ne.value || l.notify("success", d("tasks_projects.billing.create.stamped")));
		}
		async function Qe() {
			p.value = 1, O.value = null, k.value = null, F.value = null, ee.value = null, V.value = null, ne.value = !1, j.value = [], R.value = {}, z.value = !1, await De();
		}
		function $e(e) {
			return p.value > e ? "border-primary-500 bg-primary-500 text-white" : p.value === e ? "border-primary-500 text-primary-500" : "border-line-default text-subtle";
		}
		return (t, n) => {
			let l = b("BaseBreadcrumbItem"), u = b("BaseBreadcrumb"), h = b("BaseIcon"), _ = b("BaseButton"), v = b("router-link"), w = b("BasePageHeader"), T = b("BaseSpinner"), k = b("BaseDatePicker"), A = b("BaseInputGroup"), N = b("BaseFormatMoney"), P = b("BaseEmptyPlaceholder"), H = b("BaseSelectInput"), te = b("BaseInput"), se = b("BasePage");
			return g(), r(se, null, {
				default: E(() => [
					c(w, { title: S(d)("tasks_projects.billing.title") }, {
						actions: E(() => [o("div", Vc, [c(v, { to: "/admin/modules/tasks-projects/time" }, {
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
					o("ol", Hc, [(g(!0), a(e, null, y(ie.value, (e, t) => (g(), a("li", {
						key: e,
						class: "flex items-center gap-2"
					}, [o("span", { class: f(["flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold", $e(t + 1)]) }, x(t + 1), 3), o("span", { class: f(["text-sm font-medium", p.value === t + 1 ? "text-heading" : "text-muted"]) }, x(e), 3)]))), 128))]),
					m.value ? (g(), a("div", Uc, [c(T, { class: "h-8 w-8 text-primary-500" })])) : p.value === 1 ? (g(), a("section", Wc, [
						o("h2", Gc, x(S(d)("tasks_projects.billing.customer.title")), 1),
						o("p", Kc, x(S(d)("tasks_projects.billing.customer.description")), 1),
						o("div", qc, [
							c(A, {
								label: S(d)("tasks_projects.billing.customer.from"),
								class: "w-full sm:w-48"
							}, {
								default: E(() => [c(k, {
									"model-value": D.from,
									"onUpdate:modelValue": Pe
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label"]),
							c(A, {
								label: S(d)("tasks_projects.billing.customer.to"),
								class: "w-full sm:w-48"
							}, {
								default: E(() => [c(k, {
									"model-value": D.to,
									"onUpdate:modelValue": Fe
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label"]),
							D.from !== "" || D.to !== "" ? (g(), r(_, {
								key: 0,
								variant: "primary-outline",
								onClick: Ne
							}, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.customer.clear_range")), 1)]),
								_: 1
							})) : i("", !0)
						]),
						C.value.length > 0 ? (g(), a("div", Jc, [(g(!0), a(e, null, y(C.value, (e) => (g(), a("button", {
							key: `${e.customer_id}-${e.currency_id ?? "none"}`,
							type: "button",
							class: "rounded-xl border border-line-default bg-surface p-5 text-left transition hover:border-primary-500",
							onClick: (t) => Ie(e)
						}, [
							o("p", Xc, x(Ae(e.customer_id)), 1),
							o("p", Zc, x(S(d)("tasks_projects.billing.customer.entries", { count: e.entries })) + " · " + x(S(ce)(e.minutes)), 1),
							o("p", Qc, [c(N, {
								amount: e.amount,
								currency: Me(e.customer_id, e.currency_id)
							}, null, 8, ["amount", "currency"])])
						], 8, Yc))), 128))])) : (g(), r(P, {
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
					])) : p.value === 2 ? (g(), a("section", $c, [o("div", el, [o("div", null, [o("h2", tl, x(S(d)("tasks_projects.billing.entries.title")), 1), o("p", nl, x(O.value ? Ae(O.value.customer_id) : ""), 1)]), c(A, {
						label: S(d)("tasks_projects.billing.entries.grouping"),
						class: "w-full sm:w-56"
					}, {
						default: E(() => [c(H, {
							modelValue: le.value,
							"onUpdate:modelValue": n[0] ||= (e) => le.value = e,
							options: ae.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])]), M.value ? (g(), a("div", rl, [c(T, { class: "h-8 w-8 text-primary-500" })])) : ge.value > 0 ? (g(), a(e, { key: 1 }, [
						o("div", il, [o("label", al, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: _e.value,
							onChange: ze
						}, null, 40, ol), s(" " + x(S(d)("tasks_projects.billing.entries.select_all")), 1)]), o("p", sl, x(S(d)("tasks_projects.billing.entries.selected", {
							count: j.value.length,
							total: ge.value
						})), 1)]),
						(g(!0), a(e, null, y(he.value, (t) => (g(), a("div", {
							key: `${t.label}-${t.key ?? "none"}-${t.currency_id ?? "none"}`,
							class: "mt-4 overflow-hidden rounded-xl border border-line-default"
						}, [o("div", cl, [o("label", ll, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: Be(t),
							onChange: (e) => Ve(t)
						}, null, 40, ul), s(" " + x(t.label), 1)]), o("p", dl, [s(x(S(ce)(t.minutes)) + " · ", 1), c(N, {
							amount: t.amount,
							currency: be.value
						}, null, 8, ["amount", "currency"])])]), o("div", fl, [o("table", pl, [o("thead", ml, [o("tr", null, [
							n[6] ||= o("th", { class: "w-10" }, null, -1),
							o("th", hl, x(S(d)("tasks_projects.billing.entries.columns.date")), 1),
							o("th", gl, x(S(d)("tasks_projects.billing.entries.columns.task")), 1),
							o("th", _l, x(S(d)("tasks_projects.billing.entries.columns.project")), 1),
							o("th", vl, x(S(d)("tasks_projects.billing.entries.columns.member")), 1),
							o("th", yl, x(S(d)("tasks_projects.billing.entries.columns.duration")), 1),
							o("th", bl, x(S(d)("tasks_projects.billing.entries.columns.amount")), 1)
						])]), o("tbody", xl, [(g(!0), a(e, null, y(He(t), (e) => (g(), a("tr", { key: e.id }, [
							o("td", Sl, [o("input", {
								type: "checkbox",
								class: "h-4 w-4 cursor-pointer rounded border-line-strong",
								checked: Le(e.id),
								onChange: (t) => Re(e.id)
							}, null, 40, Cl)]),
							o("td", wl, x(S(oe)(e.date)), 1),
							o("td", Tl, [o("span", El, x(e.task_name), 1), o("span", Dl, x(e.description || S(d)("tasks_projects.billing.entries.no_description")), 1)]),
							o("td", Ol, x(e.project_name ?? "-"), 1),
							o("td", kl, x(e.user_name), 1),
							o("td", Al, x(S(ce)(e.minutes)), 1),
							o("td", jl, [c(N, {
								amount: e.amount,
								currency: be.value
							}, null, 8, ["amount", "currency"])])
						]))), 128))])])])]))), 128)),
						o("div", Ml, [o("p", Nl, [s(x(S(d)("tasks_projects.billing.entries.selected_total", { hours: S(ce)(ve.value) })) + " · ", 1), c(N, {
							amount: ye.value,
							currency: be.value
						}, null, 8, ["amount", "currency"])]), o("div", Pl, [c(_, {
							variant: "primary-outline",
							onClick: Qe
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}), c(_, {
							variant: "primary",
							disabled: j.value.length === 0,
							onClick: Ue
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
							onClick: Qe
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						})]),
						default: E(() => [c(h, {
							name: "ClockIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]))])) : p.value === 3 ? (g(), a("section", Fl, [o("h2", Il, x(S(d)("tasks_projects.billing.preview.title")), 1), I.value || F.value === null ? (g(), a("div", Ll, [c(T, { class: "h-8 w-8 text-primary-500" })])) : (g(), a(e, { key: 1 }, [
						z.value ? (g(), a("div", Rl, x(S(d)("tasks_projects.billing.preview.invalid")), 1)) : i("", !0),
						o("div", zl, [
							c(A, {
								label: S(d)("tasks_projects.billing.preview.invoice_date"),
								error: R.value.invoice_date,
								required: ""
							}, {
								default: E(() => [c(k, {
									"model-value": L.invoiceDate,
									"onUpdate:modelValue": Ke
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(A, {
								label: S(d)("tasks_projects.billing.preview.due_date"),
								error: R.value.due_date
							}, {
								default: E(() => [c(k, {
									"model-value": L.dueDate,
									"onUpdate:modelValue": qe
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
									disabled: !Se.value
								}, null, 8, ["modelValue", "disabled"]), Se.value ? i("", !0) : (g(), a("span", Bl, x(S(d)("tasks_projects.billing.preview.invoice_number_auto")), 1))]),
								_: 1
							}, 8, ["label", "error"]),
							c(A, {
								label: S(d)("tasks_projects.billing.preview.template"),
								error: R.value.template_name,
								required: ""
							}, {
								default: E(() => [c(H, {
									modelValue: fe.value,
									"onUpdate:modelValue": n[2] ||= (e) => fe.value = e,
									options: ue.value,
									"label-key": "name"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							xe.value ? (g(), r(A, {
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
								}, null, 8, ["modelValue"]), o("span", Vl, x(S(d)("tasks_projects.billing.preview.exchange_rate_help", { currency: be.value?.code ?? "" })), 1)]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0)
						]),
						o("div", Hl, [o("div", Ul, [o("table", Wl, [
							o("thead", Gl, [o("tr", null, [
								o("th", Kl, x(S(d)("tasks_projects.billing.preview.columns.description")), 1),
								o("th", ql, x(S(d)("tasks_projects.billing.preview.columns.quantity")), 1),
								o("th", Jl, x(S(d)("tasks_projects.billing.preview.columns.price")), 1),
								o("th", Yl, x(S(d)("tasks_projects.billing.preview.columns.total")), 1)
							])]),
							o("tbody", Xl, [(g(!0), a(e, null, y(F.value.items, (e, t) => (g(), a("tr", { key: `${e.name}-${t}` }, [
								o("td", Zl, [o("span", Ql, x(e.name), 1), e.description ? (g(), a("span", $l, x(e.description), 1)) : i("", !0)]),
								o("td", eu, x(e.quantity), 1),
								o("td", tu, [c(N, {
									amount: e.price,
									currency: be.value
								}, null, 8, ["amount", "currency"])]),
								o("td", nu, [c(N, {
									amount: e.total,
									currency: be.value
								}, null, 8, ["amount", "currency"])])
							]))), 128))]),
							o("tfoot", ru, [o("tr", null, [o("td", iu, x(S(d)("tasks_projects.billing.preview.sub_total")), 1), o("td", au, [c(N, {
								amount: F.value.sub_total,
								currency: be.value
							}, null, 8, ["amount", "currency"])])]), o("tr", null, [o("td", ou, x(S(d)("tasks_projects.billing.preview.total")), 1), o("td", su, [c(N, {
								amount: F.value.total,
								currency: be.value
							}, null, 8, ["amount", "currency"])])])])
						])])]),
						o("div", cu, [c(_, {
							variant: "primary-outline",
							onClick: n[4] ||= (e) => p.value = 2
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}), c(_, {
							variant: "primary",
							loading: B.value,
							disabled: B.value,
							onClick: Ye
						}, {
							left: E((e) => [B.value ? i("", !0) : (g(), r(h, {
								key: 0,
								name: "DocumentPlusIcon",
								class: f(e.class)
							}, null, 8, ["class"]))]),
							default: E(() => [s(" " + x(S(d)("tasks_projects.billing.preview.create")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])])
					], 64))])) : (g(), a("section", lu, [B.value || re.value ? (g(), a("div", uu, [c(T, { class: "h-8 w-8 text-primary-500" }), o("p", du, x(B.value ? S(d)("tasks_projects.billing.create.creating") : S(d)("tasks_projects.billing.create.stamping")), 1)])) : ee.value ? (g(), a(e, { key: 1 }, [ne.value ? (g(), a("div", fu, [
						o("p", pu, x(S(d)("tasks_projects.billing.create.stamp_failed_title")), 1),
						o("p", mu, x(S(d)("tasks_projects.billing.create.stamp_failed_description", { number: ee.value.invoice_number })), 1),
						o("div", hu, [c(_, {
							variant: "primary",
							loading: re.value,
							onClick: Ze
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.create.retry_stamp")), 1)]),
							_: 1
						}, 8, ["loading"]), c(v, { to: `${Su}/${ee.value.id}/view` }, {
							default: E(() => [c(_, { variant: "white" }, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.create.view_invoice")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"])])
					])) : (g(), a("div", gu, [
						c(h, {
							name: "CheckCircleIcon",
							class: "mx-auto h-12 w-12 text-primary-500"
						}),
						o("p", _u, x(S(d)("tasks_projects.billing.create.created_title", { number: ee.value.invoice_number })), 1),
						o("p", vu, x(S(d)("tasks_projects.billing.create.created_description", { count: V.value ?? 0 })), 1),
						o("p", yu, [c(N, {
							amount: ee.value.total,
							currency: be.value
						}, null, 8, ["amount", "currency"])]),
						o("div", bu, [c(v, { to: `${Su}/${ee.value.id}/view` }, {
							default: E(() => [c(_, { variant: "primary" }, {
								default: E(() => [s(x(S(d)("tasks_projects.billing.create.view_invoice")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"]), c(_, {
							variant: "white",
							onClick: Qe
						}, {
							default: E(() => [s(x(S(d)("tasks_projects.billing.create.invoice_more")), 1)]),
							_: 1
						})])
					]))], 64)) : (g(), a("div", xu, [c(_, {
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
}), wu = "tasks-projects";
function Tu(e) {
	e.addMessages(Dc), e.registerPage({
		id: "billing",
		module: wu,
		path: "billing",
		component: Cc(e, Cu),
		meta: {
			ability: `${wu}:invoice-tasks`,
			title: "tasks_projects.billing.title"
		}
	});
}
//#endregion
//#region resources/js/init.ts
var Eu = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(A), n.registerPage({
		id: "projects",
		module: Eu,
		path: "",
		component: Du(n, ke),
		meta: {
			ability: `${Eu}:view-project`,
			title: "tasks_projects.projects.title"
		}
	}), Jr(n), Ec(n), Tu(n);
});
function Du(e, t) {
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
