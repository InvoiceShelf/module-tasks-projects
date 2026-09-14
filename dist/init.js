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
async function ee(e) {
	let { data: t } = await e.get(M.members);
	return t.data;
}
async function te(e, t = 100) {
	let { data: n } = await e.get(N.customers, { params: { limit: t } });
	return n.data;
}
//#endregion
//#region resources/js/support/errors.ts
function ne(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function B(e, t) {
	let n = ne(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function re(e) {
	let t = ne(e)?.errors, n = {};
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
function ue(e) {
	let t = Math.max(0, Math.round(e ?? 0)), n = Math.floor(t / 60), r = t % 60;
	return n === 0 ? `${r}m` : r === 0 ? `${n}h` : `${n}h ${r}m`;
}
function de(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : (t[0].charAt(0) + (t.length > 1 ? t[t.length - 1].charAt(0) : "")).toUpperCase();
}
function fe(e) {
	if (!e) return !1;
	let t = /* @__PURE__ */ new Date(), n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
	return e.slice(0, 10) < n;
}
//#endregion
//#region resources/js/support/i18n.ts
function V() {
	return u()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "flex w-full items-center justify-between" }, me = { class: "space-y-5 px-6 py-6" }, he = { class: "flex flex-wrap items-center gap-2" }, ge = ["aria-label", "onClick"], _e = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, ve = /* @__PURE__ */ l({
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
		], m = V(), h = _({
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
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = ie(e?.default_rate ?? null), h.budgetHours = oe(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, C.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : w.value.find((t) => t.id === e) ?? null;
		}
		function L(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function R() {
			if (!D.value) try {
				let e = await te(l.client);
				w.value = e.map((e) => ({
					id: e.id,
					label: L(e)
				})), D.value = !0, C.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", B(e, m("tasks_projects.projects.customers_failed")));
			}
		}
		function z() {
			return {
				name: h.name.trim(),
				customer_id: C.value?.id ?? null,
				identifier: h.identifier.trim() || null,
				description: h.description.trim() || null,
				colour: h.colour || null,
				default_rate: ae(h.defaultRate),
				budget_minutes: se(h.budgetHours),
				due_date: h.dueDate || null
			};
		}
		function ee(e) {
			h.dueDate = e ? le(e) : "";
		}
		async function ne() {
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
					O.value = re(e), l.notify("error", B(e, m("tasks_projects.projects.save_failed")));
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
				header: E(() => [o("div", pe, [o("span", null, x(M.value), 1), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: i[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(ne, ["prevent"]) }, [o("div", me, [
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
									"onUpdate:modelValue": ee
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
						default: E(() => [o("div", he, [(g(), a(e, null, y(d, (e) => o("button", {
							key: e,
							type: "button",
							class: f(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: p({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, ge)), 64)), o("button", {
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
				]), o("div", _e, [c(F, {
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
}, Oe = 10, ke = 350, Ae = /* @__PURE__ */ l({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = V(), u = v(null), d = v(!1), h = v(!0), y = v(0), C = v(!1), O = v(null), k = v(null), A = _({
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
		]), F = n(() => A.search.trim() !== "" || A.status !== "ACTIVE"), I = n(() => !h.value && y.value === 0 && !F.value), ee;
		T(() => A.search, () => {
			clearTimeout(ee), ee = setTimeout(() => ne(), ke);
		}), T(() => A.status, () => ne()), m(() => clearTimeout(ee));
		async function te({ page: e }) {
			let n = {
				page: e,
				limit: Oe
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
				return t.notify("error", B(e, l("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Oe
					}
				};
			} finally {
				h.value = !1;
			}
		}
		function ne(e = !1) {
			u.value?.refresh(e);
		}
		function re() {
			d.value && ie(), d.value = !d.value;
		}
		function ie() {
			A.search = "", A.status = "ACTIVE";
		}
		function ae() {
			O.value = null, C.value = !0;
		}
		function oe(e) {
			O.value = e, C.value = !0;
		}
		function se(e) {
			let n = O.value ? l("tasks_projects.projects.updated", { name: e.name }) : l("tasks_projects.projects.created", { name: e.name });
			C.value = !1, O.value = null, t.notify("success", n), ne();
		}
		async function le(e) {
			k.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await R(t.client, e.id), t.notify("success", l("tasks_projects.projects.unarchived", { name: e.name }))) : (await L(t.client, e.id), t.notify("success", l("tasks_projects.projects.archived", { name: e.name }))), ne(!0);
			} catch (e) {
				t.notify("error", B(e, l("tasks_projects.projects.save_failed")));
			} finally {
				k.value = null;
			}
		}
		async function ue(e) {
			if (window.confirm(l("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				k.value = e.id;
				try {
					await z(t.client, e.id), t.notify("success", l("tasks_projects.projects.deleted", { name: e.name })), ne(!0);
				} catch (e) {
					t.notify("error", B(e, l("tasks_projects.projects.delete_failed")));
				} finally {
					k.value = null;
				}
			}
		}
		function de(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function fe(e) {
			return l(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, n) => {
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), _ = b("BaseIcon"), v = b("BaseButton"), y = b("router-link"), T = b("BasePageHeader"), P = b("BaseInput"), F = b("BaseInputGroup"), L = b("BaseSelectInput"), R = b("BaseFilterWrapper"), z = b("BaseEmptyPlaceholder"), ee = b("BaseBadge"), ne = b("BaseFormatMoney"), B = b("BaseDropdownItem"), V = b("BaseDropdown"), pe = b("BaseTable"), me = b("BasePage");
			return g(), r(me, null, {
				default: E(() => [
					c(T, { title: S(l)("tasks_projects.projects.title") }, {
						actions: E(() => [o("div", ye, [
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
								onClick: re
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
								onClick: ae
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
						onClear: ie
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
							onClick: ae
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
					D(o("div", be, [c(pe, {
						ref_key: "tableRef",
						ref: u,
						data: te,
						columns: N.value,
						class: "mt-3"
					}, {
						"cell-name": E(({ row: e }) => [o("div", xe, [o("span", {
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
						}, 1032, ["to"]), e.data.identifier ? (g(), a("span", Se, x(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": E(({ row: e }) => [c(ee, { class: f(["rounded-full", de(e.data.status)]) }, {
							default: E(() => [s(x(fe(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": E(({ row: e }) => [e.data.customer_id ? (g(), a("span", Ce, "#" + x(e.data.customer_id), 1)) : (g(), a("span", we, x(S(l)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": E(({ row: e }) => [e.data.default_rate === null ? (g(), a("span", Te, "-")) : (g(), r(ne, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", Ee, x(S(ce)(e.data.due_date)), 1)) : (g(), a("span", De, "-"))]),
						"cell-actions": E(({ row: e }) => [c(V, { "content-loading": k.value === e.data.id }, {
							activator: E(() => [c(_, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: E(() => [
								c(B, { onClick: (t) => oe(e.data) }, {
									default: E(() => [c(_, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(l)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(B, { onClick: (t) => le(e.data) }, {
									default: E(() => [c(_, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + x(e.data.status === "ARCHIVED" ? S(l)("tasks_projects.projects.unarchive") : S(l)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(B, { onClick: (t) => ue(e.data) }, {
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
					c(ve, {
						show: C.value,
						client: e.client,
						notify: e.notify,
						project: O.value,
						onClose: n[2] ||= (e) => C.value = !1,
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
}), je = "/api/v1/tasks-projects", Me = {
	timeEntries: `${je}/time-entries`,
	timeEntry: (e) => `${je}/time-entries/${e}`,
	timer: `${je}/timer`,
	timerStart: `${je}/timer/start`,
	timerStop: `${je}/timer/stop`,
	taskStatuses: `${je}/task-statuses`,
	taskStatus: (e) => `${je}/task-statuses/${e}`,
	reorderTaskStatuses: `${je}/task-statuses/reorder`,
	tasks: `${je}/tasks`,
	task: (e) => `${je}/tasks/${e}`,
	members: `${je}/members`,
	settings: `${je}/settings`
}, Ne = { bootstrap: "/api/v1/bootstrap" }, Pe = 100, Fe = 5, Ie = 10;
async function Le(e, t) {
	let { data: n } = await e.get(Me.timeEntries, { params: t });
	return n;
}
async function Re(e, t) {
	let n = [];
	for (let r = 1; r <= Fe; r += 1) {
		let i = await Le(e, {
			...t,
			page: r,
			limit: Pe
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function ze(e, t) {
	let { data: n } = await e.post(Me.timeEntries, t);
	return n.data;
}
async function Be(e, t, n) {
	let { data: r } = await e.put(Me.timeEntry(t), n);
	return r.data;
}
async function Ve(e, t) {
	await e.delete(Me.timeEntry(t));
}
async function He(e) {
	let { data: t } = await e.get(Me.timer);
	return t?.data ?? null;
}
async function Ue(e, t) {
	let { data: n } = await e.post(Me.timerStart, t);
	return n.data;
}
async function We(e) {
	let { data: t } = await e.post(Me.timerStop);
	return t.data;
}
async function Ge(e) {
	await e.delete(Me.timer);
}
async function Ke(e) {
	let { data: t } = await e.get(Me.taskStatuses);
	return t.data ?? [];
}
async function qe(e, t) {
	let { data: n } = await e.post(Me.taskStatuses, t);
	return n.data;
}
async function Je(e, t, n) {
	let { data: r } = await e.put(Me.taskStatus(t), n);
	return r.data;
}
async function Ye(e, t) {
	await e.delete(Me.taskStatus(t));
}
async function Xe(e, t) {
	let { data: n } = await e.post(Me.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function Ze(e, t, n = Ie) {
	let r = { limit: n };
	t.trim() !== "" && (r.search = t.trim());
	let { data: i } = await e.get(Me.tasks, { params: r });
	return i.data ?? [];
}
async function Qe(e, t) {
	let { data: n } = await e.get(Me.task(t));
	return n.data;
}
async function $e(e) {
	let { data: t } = await e.get(Me.members);
	return t.data ?? [];
}
async function et(e) {
	let { data: t } = await e.get(Me.settings);
	return t.data;
}
async function tt(e) {
	let { data: t } = await e.get(Ne.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var nt = _({}), rt = /* @__PURE__ */ new Set(), it = 5;
function at(e) {
	return e === null ? "" : nt[e] ?? `#${e}`;
}
function ot(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (nt[e.id] = e.name);
}
async function st(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && nt[e] === void 0 && !rt.has(e));
	for (let e of n) rt.add(e);
	for (let t = 0; t < n.length; t += it) await Promise.all(n.slice(t, t + it).map(async (t) => {
		try {
			ot(await Qe(e, t));
		} catch {} finally {
			rt.delete(t);
		}
	}));
}
function ct() {
	for (let e of Object.keys(nt)) delete nt[Number(e)];
	rt.clear();
}
//#endregion
//#region resources/js/support/http.ts
function lt(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function ut(e) {
	return lt(e) === 409;
}
function dt(e) {
	return lt(e) === 403;
}
//#endregion
//#region resources/js/support/time.ts
var ft = 60, pt = 60, mt = 7;
function ht(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / pt), i = t % pt;
	return `${n}:${Mt(r)}:${Mt(i)}`;
}
function gt(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / ft)}:${Mt(t % ft)}`;
}
function _t(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * ft + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * ft);
}
function vt(e) {
	let t = kt(e);
	return t === null ? "" : Tt(t);
}
function yt(e) {
	let t = kt(e);
	return t === null ? "" : `${Mt(t.getHours())}:${Mt(t.getMinutes())}`;
}
function bt(e, t = "09:00") {
	let n = At(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function xt(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * pt * 1e3), n.toISOString();
}
function St(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = jt(e), i = (r.getDay() - n + mt) % mt;
	return r.setDate(r.getDate() - i), r;
}
function Ct(e) {
	return Array.from({ length: mt }, (t, n) => wt(e, n));
}
function wt(e, t) {
	let n = jt(e);
	return n.setDate(n.getDate() + t), n;
}
function Tt(e) {
	return `${e.getFullYear()}-${Mt(e.getMonth() + 1)}-${Mt(e.getDate())}`;
}
function Et(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function Dt(e) {
	return Tt(e) === Tt(/* @__PURE__ */ new Date());
}
function Ot(e) {
	let t = kt(e);
	return t === null ? 0 : Math.max(0, Math.floor((Date.now() - t.getTime()) / 1e3));
}
function kt(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function At(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function jt(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function Mt(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var H = _({
	running: null,
	elapsedSeconds: 0,
	busy: !1
}), Nt;
function Pt() {
	H.elapsedSeconds = H.running === null ? 0 : Ot(H.running.started_at);
}
function Ft() {
	Pt(), Nt === void 0 && (Nt = setInterval(Pt, 1e3));
}
function It() {
	Nt !== void 0 && (clearInterval(Nt), Nt = void 0), H.elapsedSeconds = 0;
}
function Lt(e, t) {
	if (H.running = e && typeof e.id == "number" ? e : null, H.running === null) {
		It();
		return;
	}
	Ft(), t && typeof H.running.task_id == "number" && st(t, [H.running.task_id]);
}
function Rt(e, t, n) {
	e?.notify("error", B(t, e.t(n)));
}
var U = {
	get running() {
		return H.running;
	},
	get elapsedSeconds() {
		return H.elapsedSeconds;
	},
	get busy() {
		return H.busy;
	},
	async refresh(e) {
		try {
			Lt(await He(e), e);
		} catch {
			Lt(null);
		}
	},
	async start(e, t, n = null, r) {
		if (H.busy) return null;
		H.busy = !0;
		try {
			let r = await Ue(e, {
				task_id: t,
				description: n
			});
			return Lt(r, e), r;
		} catch (t) {
			return ut(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : Rt(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			H.busy = !1;
		}
	},
	async stop(e, t) {
		if (H.busy || H.running === null) return null;
		H.busy = !0;
		try {
			let t = await We(e);
			return Lt(null), t;
		} catch (n) {
			return Rt(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			H.busy = !1;
		}
	},
	async discard(e, t) {
		if (H.busy || H.running === null) return !1;
		H.busy = !0;
		try {
			return await Ge(e), Lt(null), !0;
		} catch (n) {
			return Rt(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			H.busy = !1;
		}
	},
	reset() {
		H.busy = !1, Lt(null);
	}
}, zt = {
	key: 0,
	class: "fixed right-6 bottom-20 z-40 flex flex-col items-end gap-3"
}, Bt = ["aria-label"], Vt = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, Ht = { class: "text-sm font-semibold text-heading" }, Ut = ["aria-label"], Wt = {
	key: 0,
	class: "space-y-4 px-4 py-4"
}, Gt = { class: "truncate text-sm font-medium text-heading" }, Kt = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, qt = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, Jt = { class: "flex items-center gap-2" }, Yt = {
	key: 1,
	class: "space-y-3 px-4 py-4"
}, Xt = { class: "block" }, Zt = { class: "sr-only" }, Qt = ["placeholder"], $t = {
	key: 0,
	class: "text-xs text-muted"
}, en = {
	key: 1,
	class: "max-h-48 space-y-1 overflow-y-auto"
}, tn = ["onClick"], nn = {
	key: 2,
	class: "text-xs text-muted"
}, rn = ["placeholder", "aria-label"], an = { class: "flex items-center justify-between" }, on = ["title", "aria-label"], sn = {
	key: 0,
	class: "tabular-nums"
}, cn = 300, ln = /* @__PURE__ */ l({
	__name: "QuickStartOverlay",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		enabled: { type: Boolean }
	},
	emits: ["open-timesheet"],
	setup(l, { emit: u }) {
		let d = l, p = u, h = V(), _ = v(!1), w = v(""), k = v([]), A = v(!1), j = v(null), M = v(""), N, P = n(() => ({
			notify: d.notify,
			t: h
		})), F = n(() => at(U.running?.task_id ?? null)), I = n(() => ht(U.elapsedSeconds));
		T(() => d.enabled, (e) => {
			e || z();
		}), T(_, (e) => {
			e && U.running === null && L();
		}), T(w, () => {
			clearTimeout(N), N = setTimeout(() => void L(), cn);
		}), m(() => clearTimeout(N));
		async function L() {
			A.value = !0;
			try {
				let e = await Ze(d.client, w.value);
				k.value = e, e.forEach(ot);
			} catch (e) {
				k.value = [], d.notify("error", B(e, h("tasks_projects.time.tasks_failed")));
			} finally {
				A.value = !1;
			}
		}
		function R(e) {
			j.value = e, ot(e);
		}
		function z() {
			_.value = !1, w.value = "", k.value = [], j.value = null, M.value = "";
		}
		async function ee() {
			let e = j.value;
			e !== null && await U.start(d.client, e.id, M.value.trim() || null, P.value) !== null && (d.notify("success", h("tasks_projects.timer.started", { name: e.name })), z());
		}
		async function te() {
			let e = F.value, t = await U.stop(d.client, P.value);
			t !== null && (d.notify("success", h("tasks_projects.timer.stopped", {
				name: e,
				duration: gt(t.duration_minutes)
			})), z());
		}
		async function ne() {
			window.confirm(h("tasks_projects.timer.discard_confirm")) && await U.discard(d.client, P.value) && (d.notify("success", h("tasks_projects.timer.discarded")), z());
		}
		return (n, u) => {
			let d = b("BaseIcon"), m = b("BaseButton");
			return g(), r(t, { to: "body" }, [l.enabled ? (g(), a("div", zt, [_.value ? (g(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": S(h)("tasks_projects.timer.panel_title"),
				onKeydown: O(z, ["esc"])
			}, [o("header", Vt, [o("h2", Ht, x(S(h)("tasks_projects.timer.panel_title")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": S(h)("tasks_projects.timer.close"),
				onClick: z
			}, [c(d, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Ut)]), S(U).running === null ? (g(), a("div", Yt, [
				o("label", Xt, [o("span", Zt, x(S(h)("tasks_projects.timer.search_tasks")), 1), D(o("input", {
					"onUpdate:modelValue": u[0] ||= (e) => w.value = e,
					type: "search",
					autocomplete: "off",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.search_tasks")
				}, null, 8, Qt), [[C, w.value]])]),
				A.value ? (g(), a("p", $t, x(S(h)("tasks_projects.general.search")), 1)) : k.value.length > 0 ? (g(), a("ul", en, [(g(!0), a(e, null, y(k.value, (e) => (g(), a("li", { key: e.id }, [o("button", {
					type: "button",
					class: f(["w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover", j.value?.id === e.id ? "bg-hover-strong font-medium text-heading" : "text-body"]),
					onClick: (t) => R(e)
				}, x(e.name), 11, tn)]))), 128))])) : (g(), a("p", nn, x(S(h)("tasks_projects.timer.no_tasks")), 1)),
				D(o("input", {
					"onUpdate:modelValue": u[1] ||= (e) => M.value = e,
					type: "text",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.description_placeholder"),
					"aria-label": S(h)("tasks_projects.time.fields.description")
				}, null, 8, rn), [[C, M.value]]),
				o("div", an, [o("button", {
					type: "button",
					class: "text-xs text-primary-500 hover:underline",
					onClick: u[2] ||= (e) => p("open-timesheet")
				}, x(S(h)("tasks_projects.timer.open_timesheet")), 1), c(m, {
					variant: "primary",
					disabled: j.value === null || S(U).busy,
					onClick: ee
				}, {
					left: E((e) => [c(d, {
						name: "PlayIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: E(() => [s(" " + x(S(h)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			])) : (g(), a("div", Wt, [o("div", null, [
				o("p", Gt, x(F.value), 1),
				o("p", Kt, x(I.value), 1),
				S(U).running.description ? (g(), a("p", qt, x(S(U).running.description), 1)) : i("", !0)
			]), o("div", Jt, [c(m, {
				variant: "primary",
				disabled: S(U).busy,
				onClick: te
			}, {
				left: E((e) => [c(d, {
					name: "StopIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: E(() => [s(" " + x(S(h)("tasks_projects.timer.stop")), 1)]),
				_: 1
			}, 8, ["disabled"]), c(m, {
				variant: "primary-outline",
				disabled: S(U).busy,
				onClick: ne
			}, {
				default: E(() => [s(x(S(h)("tasks_projects.timer.discard")), 1)]),
				_: 1
			}, 8, ["disabled"])])]))], 40, Bt)) : i("", !0), o("button", {
				type: "button",
				class: "flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover",
				title: S(h)("tasks_projects.timer.quick_start"),
				"aria-label": S(h)("tasks_projects.timer.quick_start"),
				onClick: u[3] ||= (e) => _.value = !_.value
			}, [c(d, {
				name: S(U).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), S(U).running === null ? i("", !0) : (g(), a("span", sn, x(I.value), 1))], 8, on)])) : i("", !0)]);
		};
	}
}), un = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, dn = ["title"], fn = ["aria-label"], pn = { class: "font-medium tabular-nums" }, mn = [
	"disabled",
	"title",
	"aria-label"
], hn = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = V(), u = n(() => at(U.running?.task_id ?? null)), d = n(() => ht(U.elapsedSeconds));
		async function f() {
			let e = u.value, t = await U.stop(r.client, {
				notify: r.notify,
				t: l
			});
			t !== null && r.notify("success", l("tasks_projects.timer.stopped", {
				name: e,
				duration: gt(t.duration_minutes)
			}));
		}
		return (e, t) => {
			let n = b("BaseIcon");
			return S(U).running === null ? i("", !0) : (g(), a("li", un, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: S(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": S(l)("tasks_projects.timer.open_timesheet"),
					onClick: t[0] ||= (e) => s("open")
				}, x(u.value), 9, fn),
				o("span", pn, x(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: S(U).busy,
					title: S(l)("tasks_projects.timer.stop"),
					"aria-label": S(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, mn)
			], 8, dn)]));
		};
	}
}), gn = { en: { tasks_projects: {
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
} } }, _n = { class: "relative table-container" }, vn = { class: "block max-w-64 truncate" }, yn = { class: "tabular-nums" }, bn = {
	key: 1,
	class: "text-subtle"
}, xn = /* @__PURE__ */ l({
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
		let l = e, u = t, d = V(), p = v(null), m = _({
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
			m.from = e ? le(e) : "";
		}
		function P(e) {
			m.to = e ? le(e) : "";
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
				let e = await Le(l.client, t), n = e.data ?? [];
				return st(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
					data: n,
					pagination: L(e.meta, n.length)
				};
			} catch (e) {
				return l.notify("error", B(e, d("tasks_projects.time.load_failed"))), {
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
			}), o("div", _n, [c(z, {
				ref_key: "tableRef",
				ref: p,
				data: I,
				columns: k.value,
				class: "mt-3"
			}, {
				"cell-date": E(({ row: e }) => [s(x(S(ce)(S(vt)(e.data.started_at))), 1)]),
				"cell-member": E(({ row: e }) => [s(x(F(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [s(x(S(at)(e.data.task_id)), 1)]),
				"cell-description": E(({ row: e }) => [o("span", vn, x(e.data.description || "-"), 1)]),
				"cell-duration": E(({ row: e }) => [o("span", yn, x(S(gt)(e.data.duration_minutes)), 1)]),
				"cell-billable": E(({ row: e }) => [c(T, { class: f(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: E(() => [s(x(e.data.billable ? S(d)("tasks_projects.time.billable") : S(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": E(({ row: e }) => [e.data.billable ? (g(), r(A, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (g(), a("span", bn, "-"))]),
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
}), Sn = { class: "flex w-full items-center justify-between" }, Cn = { class: "space-y-5 px-6 py-6" }, wn = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, Tn = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, En = ["disabled", "onClick"], Dn = {
	key: 1,
	class: "text-sm text-muted"
}, On = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, kn = { key: 1 }, An = { class: "flex space-x-3" }, jn = "09:00", Mn = /* @__PURE__ */ l({
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
		let u = t, d = l, p = ["duration", "range"], m = V(), h = _({
			date: "",
			mode: "duration",
			duration: "",
			start: jn,
			end: "",
			description: "",
			billable: !0
		}), C = v(null), w = v({}), D = v(!1), O = v(!1), A = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : A.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		T(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			w.value = {}, C.value = null, h.date = e ? vt(e.started_at) : u.defaultDate ?? Tt(/* @__PURE__ */ new Date()), h.duration = e ? gt(e.duration_minutes) : "", h.start = e?.started_at ? yt(e.started_at) : jn, h.end = e?.ended_at ? yt(e.ended_at) : "", h.description = e?.description ?? "", h.billable = !e || e.billable, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? Tt(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await Qe(u.client, e);
				C.value = t, ot(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await Ze(u.client, e ?? "");
				return t.forEach(ot), t;
			} catch (e) {
				return u.notify("error", B(e, m("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function L(e) {
			h.date = e ? le(e) : "";
		}
		function R(e) {
			C.value = e, e !== null && u.entry === null && (h.billable = e.billable !== !1);
		}
		function z() {
			let e = {}, t = C.value;
			(t === null || typeof t.id != "number") && (e.task_id = m("tasks_projects.time.task_required")), h.date === "" && (e.date = m("tasks_projects.time.date_required"));
			let n = bt(h.date, h.mode === "range" ? h.start : jn);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? _t(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? bt(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), w.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = xt(n, r)) : a.ended_at = i, a;
		}
		async function ee() {
			if (D.value || j.value) return;
			let e = z();
			if (e !== null) {
				D.value = !0;
				try {
					let t = u.entry, n = t ? await Be(u.client, t.id, e) : await ze(u.client, e);
					d("saved", n);
				} catch (e) {
					w.value = re(e), u.notify("error", B(e, m("tasks_projects.time.save_failed")));
				} finally {
					D.value = !1;
				}
			}
		}
		async function te() {
			let e = u.entry;
			if (!(e === null || O.value || j.value) && window.confirm(m("tasks_projects.time.delete_confirm"))) {
				O.value = !0;
				try {
					await Ve(u.client, e.id), d("deleted", e);
				} catch (e) {
					u.notify("error", B(e, m("tasks_projects.time.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let u = b("BaseIcon"), _ = b("BaseMultiselect"), v = b("BaseInputGroup"), T = b("BaseDatePicker"), N = b("BaseInputGrid"), P = b("BaseInput"), F = b("BaseTextarea"), z = b("BaseSwitch"), ne = b("BaseButton"), B = b("BaseModal");
			return g(), r(B, {
				show: t.show,
				onClose: l[8] ||= (e) => d("close")
			}, {
				header: E(() => [o("div", Sn, [o("span", null, x(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(ee, ["prevent"]) }, [o("div", Cn, [
					j.value ? (g(), a("p", wn, x(S(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
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
							default: E(() => [o("div", Tn, [(g(), a(e, null, y(p, (e) => o("button", {
								key: e,
								type: "button",
								class: f(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, x(S(m)(`tasks_projects.time.mode.${e}`)), 11, En)), 64))])]),
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
						default: E(() => [j.value ? (g(), a("span", Dn, x(h.billable ? S(m)("tasks_projects.time.billable") : S(m)("tasks_projects.time.non_billable")), 1)) : (g(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", On, [A.value && !j.value ? (g(), r(ne, {
					key: 0,
					type: "button",
					variant: "danger",
					size: "sm",
					loading: O.value,
					disabled: O.value,
					onClick: te
				}, {
					default: E(() => [s(x(S(m)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", kn)), o("div", An, [c(ne, {
					type: "button",
					variant: "primary-outline",
					onClick: l[7] ||= (e) => d("close")
				}, {
					default: E(() => [s(x(j.value ? S(m)("tasks_projects.timer.close") : S(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), j.value ? i("", !0) : (g(), r(ne, {
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
}), Nn = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, Pn = { class: "flex items-center gap-2" }, Fn = { class: "ml-1 text-sm text-muted" }, In = { class: "flex items-center gap-2 text-sm" }, Ln = { class: "text-muted" }, Rn = { class: "text-lg font-semibold tabular-nums text-heading" }, zn = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, Bn = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, Vn = { class: "flex items-baseline justify-between" }, Hn = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, Un = { class: "text-xs text-muted" }, Wn = { class: "text-sm font-medium tabular-nums text-heading" }, Gn = { class: "mt-3 flex-1 space-y-2" }, Kn = ["onClick"], qn = { class: "flex items-center justify-between gap-2" }, Jn = { class: "truncate text-xs font-medium text-heading" }, Yn = { class: "shrink-0 text-xs tabular-nums text-muted" }, Xn = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, Zn = { class: "mt-1 flex items-center gap-1" }, Qn = { class: "text-[11px] text-subtle" }, $n = {
	key: 0,
	class: "text-[11px] text-subtle"
}, er = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, tr = ["onClick"], nr = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, rr = /* @__PURE__ */ l({
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
		let u = t, d = l, p = V(), m = v(St(/* @__PURE__ */ new Date(), u.weekStart)), h = v([]), _ = v(!1), C = n(() => Ct(m.value)), w = n(() => {
			let e = C.value[0], t = C.value[C.value.length - 1];
			return `${Et(e).day} - ${Et(t).day}`;
		}), D = n(() => C.value.map((e) => {
			let t = Tt(e), n = h.value.filter((e) => vt(e.started_at) === t), r = Et(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: Dt(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !_.value && h.value.length === 0);
		T(() => u.weekStart, (e) => {
			m.value = St(m.value, e);
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
				let e = await Re(u.client, {
					user_id: u.userId,
					from: Tt(C.value[0]),
					to: Tt(C.value[C.value.length - 1])
				});
				h.value = e, st(u.client, e.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", B(e, p("tasks_projects.time.load_failed")));
			} finally {
				_.value = !1;
			}
		}
		function M(e) {
			m.value = wt(m.value, e * 7);
		}
		function N() {
			m.value = St(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = b("BaseIcon"), m = b("BaseButton"), h = b("BaseSpinner");
			return g(), a("section", null, [
				o("header", Nn, [o("div", Pn, [
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
					o("span", Fn, x(w.value), 1)
				]), o("div", In, [
					o("span", Ln, x(S(p)("tasks_projects.time.week_total")), 1),
					o("span", Rn, x(S(gt)(O.value)), 1),
					_.value ? (g(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (g(), a("p", zn, x(S(p)("tasks_projects.time.unknown_user")), 1)) : (g(), a("div", Bn, [(g(!0), a(e, null, y(D.value, (t) => (g(), a("article", {
					key: t.key,
					class: f(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", Vn, [o("div", null, [o("p", Hn, x(t.weekday), 1), o("p", Un, x(t.day), 1)]), o("span", Wn, x(S(gt)(t.minutes)), 1)]),
					o("ul", Gn, [(g(!0), a(e, null, y(t.entries, (e) => (g(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", qn, [o("span", Jn, x(S(at)(e.task_id)), 1), o("span", Yn, x(S(gt)(e.duration_minutes)), 1)]),
						e.description ? (g(), a("span", Xn, x(e.description), 1)) : i("", !0),
						o("span", Zn, [
							o("span", { class: f(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", Qn, x(e.billable ? S(p)("tasks_projects.time.billable") : S(p)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (g(), a("span", $n, " - " + x(S(p)("tasks_projects.time.billed")), 1))
						])
					], 8, Kn)]))), 128)), t.entries.length === 0 ? (g(), a("li", er, x(S(p)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + x(S(p)("tasks_projects.time.add_entry")), 1)], 8, tr)
				], 2))), 128))])),
				k.value && t.userId !== null ? (g(), a("p", nr, x(S(p)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), ir = {
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
}, ar = _({
	adminMode: !1,
	userId: null,
	settings: { ...ir },
	companySession: 0,
	loading: !1
});
async function or(e) {
	if (ar.adminMode) return;
	ar.loading = !0;
	let [t, n] = await Promise.all([tt(e).catch(() => null), et(e).catch(() => null)]);
	ar.userId = t, ar.settings = lr(n), ar.loading = !1;
}
function sr() {
	ar.userId = null, ar.settings = { ...ir }, ar.companySession += 1, ar.loading = !1;
}
function cr(e) {
	ar.adminMode = e;
}
function lr(e) {
	if (typeof e != "object" || !e) return { ...ir };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : ir.rounding_increments;
	return {
		default_rate: ur(e.default_rate, ir.default_rate),
		rounding_minutes: ur(e.rounding_minutes, ir.rounding_minutes),
		week_start: dr(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		rounding_increments: t.length > 0 ? t : ir.rounding_increments
	};
}
function ur(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function dr(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : ir.week_start;
}
//#endregion
//#region resources/js/pages/TimePage.vue?vue&type=script&setup=true&lang.ts
var fr = { class: "flex items-center justify-end space-x-5" }, pr = {
	key: 0,
	class: "hidden items-center gap-2 text-sm text-muted sm:flex"
}, mr = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, hr = 5, gr = /* @__PURE__ */ l({
	__name: "TimePage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = V(), u = v("MINE"), d = v(!1), p = v([]), m = v([]), _ = v(!1), y = v(null), C = v(Tt(/* @__PURE__ */ new Date())), w = v(0), T = n(() => ar.settings.week_start), D = n(() => ar.userId);
		h(() => void O());
		async function O() {
			ar.userId === null && await or(t.client), d.value = ar.settings.members_see_all_time || await k(), d.value && await Promise.all([A(), j()]);
		}
		async function k() {
			try {
				return ((await Le(t.client, { limit: hr })).data ?? []).some((e) => e.user_id !== ar.userId);
			} catch {
				return !1;
			}
		}
		async function A() {
			try {
				p.value = await $e(t.client);
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
			y.value = null, C.value = e ?? Tt(/* @__PURE__ */ new Date()), _.value = !0;
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
				await Ve(t.client, e.id), t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
			} catch (e) {
				t.notify("error", B(e, l("tasks_projects.time.delete_failed")));
			}
		}
		function R(e) {
			return u.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), O = b("BaseIcon"), k = b("BaseButton"), A = b("BasePageHeader"), j = b("BasePage");
			return g(), r(j, null, {
				default: E(() => [
					c(A, { title: S(l)("tasks_projects.time.title") }, {
						actions: E(() => [o("div", fr, [S(U).running === null ? i("", !0) : (g(), a("span", pr, [c(O, {
							name: "ClockIcon",
							class: "h-4 w-4 text-primary-500"
						}), s(" " + x(S(l)("tasks_projects.timer.running")), 1)])), c(k, {
							variant: "primary",
							onClick: n[0] ||= (e) => M()
						}, {
							left: E((e) => [c(O, {
								name: "PlusIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: E(() => [s(" " + x(S(l)("tasks_projects.time.add_entry")), 1)]),
							_: 1
						})])]),
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
					d.value ? (g(), a("nav", mr, [o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("MINE")]),
						onClick: n[1] ||= (e) => u.value = "MINE"
					}, x(S(l)("tasks_projects.time.my_time")), 3), o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("ALL")]),
						onClick: n[2] ||= (e) => u.value = "ALL"
					}, x(S(l)("tasks_projects.time.all_time")), 3)])) : i("", !0),
					u.value === "MINE" ? (g(), r(rr, {
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
					])) : (g(), r(xn, {
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
					c(Mn, {
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
}), _r = {
	key: 0,
	class: "text-sm text-muted"
}, vr = { key: 1 }, yr = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, br = {
	key: 1,
	class: "text-sm text-muted"
}, xr = {
	key: 2,
	class: "divide-y divide-line-light"
}, Sr = {
	key: 0,
	class: "space-y-3"
}, Cr = { class: "flex flex-wrap items-center gap-2" }, wr = ["aria-label", "onClick"], Tr = { class: "flex flex-wrap items-center gap-6" }, Er = { class: "flex items-center gap-2 text-sm text-body" }, Dr = { class: "flex items-center gap-2 text-sm text-body" }, Or = { class: "flex gap-3" }, kr = {
	key: 1,
	class: "flex items-center gap-3"
}, Ar = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, jr = { class: "flex items-center gap-1" }, Mr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Nr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Pr = [
	"title",
	"aria-label",
	"onClick"
], Fr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Ir = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Lr = { class: "flex flex-wrap items-center gap-2" }, Rr = ["aria-label", "onClick"], zr = { class: "flex flex-wrap items-center gap-6" }, Br = { class: "flex items-center gap-2 text-sm text-body" }, Vr = { class: "flex items-center gap-2 text-sm text-body" }, Hr = { class: "flex gap-3" }, Ur = /* @__PURE__ */ l({
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
		], d = V(), m = v([]), C = v(!0), w = v(!1), T = v(!1), D = v(null), O = v(!1), k = _({
			name: "",
			colour: "",
			is_default: !1,
			is_closed: !1
		}), A = n(() => !C.value && m.value.length === 0);
		h(() => void j());
		async function j() {
			C.value = !0;
			try {
				m.value = await Ke(l.client), w.value = !1;
			} catch (e) {
				m.value = [], w.value = dt(e), w.value || l.notify("error", B(e, d("tasks_projects.settings.load_failed")));
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
				e === null ? (await qe(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await Je(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
			} catch (e) {
				l.notify("error", B(e, d("tasks_projects.settings.save_failed")));
			} finally {
				T.value = !1;
			}
		}
		async function L(e) {
			if (!T.value && window.confirm(d("tasks_projects.settings.status_delete_confirm", { name: e.name }))) {
				T.value = !0;
				try {
					await Ye(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
				} catch (e) {
					l.notify("error", B(e, d("tasks_projects.settings.delete_failed")));
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
				m.value = await Xe(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", B(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = b("BaseSpinner"), h = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSwitch"), j = b("BaseButton"), F = b("BaseBadge"), z = b("BaseIcon");
			return g(), a("div", null, [w.value ? (g(), a("p", _r, x(S(d)("tasks_projects.settings.forbidden")), 1)) : (g(), a("div", vr, [C.value ? (g(), a("div", yr, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (g(), a("p", br, x(S(d)("tasks_projects.settings.no_statuses")), 1)) : (g(), a("ul", xr, [(g(!0), a(e, null, y(m.value, (t, l) => (g(), a("li", {
				key: t.id,
				class: "py-3"
			}, [D.value === t.id ? (g(), a("div", Sr, [
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
					default: E(() => [o("div", Cr, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, wr)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, x(S(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", Tr, [o("label", Er, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Dr, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Or, [c(j, {
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
			])) : (g(), a("div", kr, [
				o("span", {
					class: f(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: p(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", Ar, x(t.name), 1),
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
				o("div", jr, [
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
					})], 8, Mr),
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
					})], 8, Nr),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: S(d)("tasks_projects.general.edit"),
						"aria-label": S(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, Pr),
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
					})], 8, Fr)
				])
			]))]))), 128))])), O.value ? (g(), a("div", Ir, [
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
					default: E(() => [o("div", Lr, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Rr)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", zr, [o("label", Br, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Vr, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Hr, [c(j, {
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
}), Wr = { class: "space-y-6" }, Gr = "/admin/settings/modules", Kr = /* @__PURE__ */ l({
	__name: "TimeSettingsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = V();
		return (n, r) => {
			let i = b("BaseIcon"), o = b("BaseButton"), l = b("router-link"), u = b("BaseSettingCard");
			return g(), a("div", Wr, [c(u, {
				title: S(t)("tasks_projects.settings.general_title"),
				description: S(t)("tasks_projects.settings.general_description")
			}, {
				action: E(() => [c(l, { to: Gr }, {
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
				default: E(() => [c(Ur, {
					client: e.client,
					notify: e.notify
				}, null, 8, ["client", "notify"])]),
				_: 1
			}, 8, ["title", "description"])]);
		};
	}
}), qr = "tasks-projects", Jr = `/admin/modules/${qr}/time`;
function Yr(e) {
	e.addMessages(gn);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		e.router.push(Jr);
	};
	e.registerPage({
		id: "time",
		module: qr,
		path: "time",
		component: Qr(e, gr),
		meta: {
			ability: `${qr}:view-own-time`,
			title: "tasks_projects.time.title"
		}
	}), e.registerHeaderAction({
		id: `${qr}.timer-chip`,
		priority: 30,
		visible: () => U.running !== null,
		component: l({ setup: () => () => d(hn, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${qr}.quick-start`,
		component: l({ setup: () => () => d(ln, {
			key: ar.companySession,
			client: e.client,
			notify: t,
			enabled: !ar.adminMode,
			onOpenTimesheet: n
		}) })
	}), e.registerCompanySettingsPage({
		id: `${qr}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: qr,
		priority: 70,
		component: Qr(e, Kr)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		Xr(e, t);
	}), e.on("company:changing", () => {
		Zr();
	}), e.on("company:changed", ({ companyId: t }) => {
		Xr(e, t === null);
	});
}
async function Xr(e, t) {
	if (cr(t), t) {
		Zr();
		return;
	}
	await or(e.client), await U.refresh(e.client);
}
function Zr() {
	U.reset(), ct(), sr();
}
function Qr(e, t) {
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
var $r = { en: { tasks_projects: {
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
function ei(e, t, n) {
	return (t = si(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ti() {
	return ti = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ti.apply(null, arguments);
}
function ni(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ri(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ni(Object(n), !0).forEach(function(t) {
			ei(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ni(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ii(e, t) {
	if (e == null) return {};
	var n, r, i = ai(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ai(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function oi(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function si(e) {
	var t = oi(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ci(e) {
	"@babel/helpers - typeof";
	return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, ci(e);
}
var li = "1.15.7";
function ui(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var di = ui(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), fi = ui(/Edge/i), pi = ui(/firefox/i), mi = ui(/safari/i) && !ui(/chrome/i) && !ui(/android/i), hi = ui(/iP(ad|od|hone)/i), gi = ui(/chrome/i) && ui(/android/i), _i = {
	capture: !1,
	passive: !1
};
function W(e, t, n) {
	e.addEventListener(t, n, !di && _i);
}
function G(e, t, n) {
	e.removeEventListener(t, n, !di && _i);
}
function vi(e, t) {
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
function yi(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function bi(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && vi(e, t) : vi(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = yi(e));
	}
	return null;
}
var xi = /\s+/g;
function Si(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(xi, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(xi, " "));
}
function K(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Ci(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = K(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function wi(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Ti() {
	return document.scrollingElement || document.documentElement;
}
function q(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Ti() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !di)) do
			if (i && i.getBoundingClientRect && (K(i, "transform") !== "none" || n && K(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(K(i, "border-top-width")), s -= f.left + parseInt(K(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Ci(i || e), m = p && p.a, h = p && p.d;
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
	for (var r = Mi(e, !0), i = q(e)[t]; r;) {
		var a = q(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === Ti()) break;
		r = Mi(r, !1);
	}
	return !1;
}
function Di(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && bi(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Oi(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || K(n, "display") === "none" || t && !vi(n, t));) n = n.previousElementSibling;
	return n || null;
}
function ki(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || vi(e, t)) && n++;
	return n;
}
function Ai(e) {
	var t = 0, n = 0, r = Ti();
	if (e) do {
		var i = Ci(e), a = i.a, o = i.d;
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
	if (!e || !e.getBoundingClientRect) return Ti();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = K(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Ti();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Ti();
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
		if (bi(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = q(i);
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
				if (K(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: q(t)
					});
					var n = ri({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Ci(t, !0);
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
				var t = 0, n = e.target, o = n.fromRect, s = q(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Ci(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Pi(c, s) && !Pi(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = Wi(u, c, l, r.options)), Pi(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				K(e, "transition", ""), K(e, "transform", "");
				var i = Ci(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, K(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = Ui(e), K(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), K(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					K(e, "transition", ""), K(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
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
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](ri({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](ri({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in Gi.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, ti(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return Gi.forEach(function(r) {
			typeof r.eventProperties == "function" && ti(n, r.eventProperties.call(t[r.pluginName], e));
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
		window.CustomEvent && !di && !fi ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = ri(ri({}, m), qi.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var Yi = ["evt"], Xi = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = ii(n, Yi);
	qi.pluginEvent.bind($)(e, t, ri({
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
	Ji(ri({
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
var J, Y, X, Z, Qi, $i, Q, ea, ta, na, ra, ia, aa, oa, sa = !1, ca = !1, la = [], ua, da, fa, pa, ma, ha, ga, _a, va, ya = !1, ba = !1, xa, Sa, Ca = [], wa = !1, Ta = [], Ea = typeof document < "u", Da = hi, Oa = fi || di ? "cssFloat" : "float", ka = Ea && !gi && !hi && "draggable" in document.createElement("div"), Aa = function() {
	if (Ea) {
		if (di) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), ja = function(e, t) {
	var n = K(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Di(e, 0, t), a = Di(e, 1, t), o = i && K(i), s = a && K(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + q(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + q(a).width;
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
			var a = q(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
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
	(!r || ci(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Fa = function() {
	!Aa && X && K(X, "display", "none");
}, Ia = function() {
	!Aa && X && K(X, "display", "");
};
Ea && !gi && document.addEventListener("click", function(e) {
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
	this.el = e, this.options = t = ti({}, t), e[Vi] = this;
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
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!mi || hi),
		emptyInsertThreshold: 5
	};
	for (var r in qi.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in Pa(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && ka, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? W(e, "pointerdown", this._onTapStart) : (W(e, "mousedown", this._onTapStart), W(e, "touchstart", this._onTapStart)), this.nativeDraggable && (W(e, "dragover", this), W(e, "dragenter", this)), la.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ti(this, Hi());
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
			if (Ja(n), !J && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && mi && s && s.tagName.toUpperCase() === "SELECT") && (s = bi(s, r.draggable, n, !1), !(s && s.animated) && $i !== s)) {
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
					if (r = bi(c, r.trim(), n, !1), r) return Zi({
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
				(!r.handle || bi(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !J && n.parentNode === i) {
			var c = q(n);
			if (Z = i, J = n, Y = J.parentNode, Qi = J.nextSibling, $i = n, aa = a.group, $.dragged = J, ua = {
				target: J,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, ma = ua.clientX - c.left, ha = ua.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, J.style["will-change"] = "all", s = function() {
				if (Xi("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !pi && r.nativeDraggable && (J.draggable = !0), r._triggerDragStart(e, t), Zi({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), Si(J, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				wi(J, e.trim(), Va);
			}), W(o, "dragover", La), W(o, "mousemove", La), W(o, "touchmove", La), a.supportPointer ? (W(o, "pointerup", r._onDrop), !this.nativeDraggable && W(o, "pointercancel", r._onDrop)) : (W(o, "mouseup", r._onDrop), W(o, "touchend", r._onDrop), W(o, "touchcancel", r._onDrop)), pi && this.nativeDraggable && (this.options.touchStartThreshold = 4, J.draggable = !0), Xi("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(fi || di))) {
				if ($.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (W(o, "pointerup", r._disableDelayedDrag), W(o, "pointercancel", r._disableDelayedDrag)) : (W(o, "mouseup", r._disableDelayedDrag), W(o, "touchend", r._disableDelayedDrag), W(o, "touchcancel", r._disableDelayedDrag)), W(o, "mousemove", r._delayedDragTouchMoveHandler), W(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && W(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
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
		G(e, "mouseup", this._disableDelayedDrag), G(e, "touchend", this._disableDelayedDrag), G(e, "touchcancel", this._disableDelayedDrag), G(e, "pointerup", this._disableDelayedDrag), G(e, "pointercancel", this._disableDelayedDrag), G(e, "mousemove", this._delayedDragTouchMoveHandler), G(e, "touchmove", this._delayedDragTouchMoveHandler), G(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? W(document, "pointermove", this._onTouchMove) : t ? W(document, "touchmove", this._onTouchMove) : W(document, "mousemove", this._onTouchMove) : (W(J, "dragend", this), W(Z, "dragstart", this._onDragStart));
		try {
			document.selection ? Ya(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (sa = !1, Z && J) {
			Xi("dragStarted", this, { evt: t }), this.nativeDraggable && W(document, "dragover", Ra);
			var n = this.options;
			!e && Si(J, n.dragClass, !1), Si(J, n.ghostClass, !0), $.active = this, e && this._appendGhost(), Zi({
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
			} while (t = yi(t));
			Ia();
		}
	},
	_onTouchMove: function(e) {
		if (ua) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = X && Ci(X, !0), o = X && a && a.a, s = X && a && a.d, c = Da && Sa && Ai(Sa), l = (i.clientX - ua.clientX + r.x) / (o || 1) + (c ? c[0] - Ca[0] : 0) / (o || 1), u = (i.clientY - ua.clientY + r.y) / (s || 1) + (c ? c[1] - Ca[1] : 0) / (s || 1);
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
				K(X, "webkitTransform", d), K(X, "mozTransform", d), K(X, "msTransform", d), K(X, "transform", d), fa = l, pa = u, da = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!X) {
			var e = this.options.fallbackOnBody ? document.body : Z, t = q(J, !0, Da, !0, e), n = this.options;
			if (Da) {
				for (Sa = e; K(Sa, "position") === "static" && K(Sa, "transform") === "none" && Sa !== document;) Sa = Sa.parentNode;
				Sa !== document.body && Sa !== document.documentElement ? (Sa === document && (Sa = Ti()), t.top += Sa.scrollTop, t.left += Sa.scrollLeft) : Sa = Ti(), Ca = Ai(Sa);
			}
			X = J.cloneNode(!0), Si(X, n.ghostClass, !1), Si(X, n.fallbackClass, !0), Si(X, n.dragClass, !0), K(X, "transition", ""), K(X, "transform", ""), K(X, "box-sizing", "border-box"), K(X, "margin", 0), K(X, "top", t.top), K(X, "left", t.left), K(X, "width", t.width), K(X, "height", t.height), K(X, "opacity", "0.8"), K(X, "position", Da ? "absolute" : "fixed"), K(X, "zIndex", "100000"), K(X, "pointerEvents", "none"), $.ghost = X, e.appendChild(X), K(X, "transform-origin", ma / parseInt(X.style.width) * 100 + "% " + ha / parseInt(X.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (Xi("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		Xi("setupClone", this), $.eventCanceled || (Q = zi(J), Q.removeAttribute("id"), Q.draggable = !1, Q.style["will-change"] = "", this._hideClone(), Si(Q, this.options.chosenClass, !1), $.clone = Q), n.cloneId = Ya(function() {
			Xi("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || Z.insertBefore(Q, J), n._hideClone(), Zi({
				sortable: n,
				name: "clone"
			}));
		}), !t && Si(J, i.dragClass, !0), t ? (ca = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (G(document, "mouseup", n._onDrop), G(document, "touchend", n._onDrop), G(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, J)), W(document, "drop", n), K(J, "transform", "translateZ(0)")), sa = !0, n._dragStartId = Ya(n._dragStarted.bind(n, t, e)), W(document, "selectstart", n), ga = !0, window.getSelection().removeAllRanges(), mi && K(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = aa === s, u = o.sort, d = oa || c, f, p = this, m = !1;
		if (wa) return;
		function h(o, s) {
			Xi(o, p, ri({
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
					return Ba(Z, t, J, r, n, q(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (Si(J, oa ? oa.options.ghostClass : c.options.ghostClass, !1), Si(J, o.ghostClass, !0)), oa !== p && p !== $.active ? oa = p : p === $.active && oa && (oa = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
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
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = bi(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (J.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (ca = !1, c && !o.disabled && (l ? u || (a = Y !== Z) : oa === this || (this.lastPutMode = aa.checkPull(this, c, J, e)) && s.checkPut(this, c, J, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = q(J), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return Y = Z, g(), this._hideClone(), h("revert"), $.eventCanceled || (Qi ? Z.insertBefore(J, Qi) : Z.appendChild(J)), _(!0);
			var y = Oi(t, o.draggable);
			if (!y || Wa(e, f, this) && !y.animated) {
				if (y === J) return _(!1);
				if (y && t === e.target && (n = y), n && (i = q(n)), Ba(Z, t, J, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(J, y.nextSibling) : t.appendChild(J), Y = t, v(), _(!0);
			} else if (y && Ua(e, f, this)) {
				var b = Di(t, 0, o, !0);
				if (b === J) return _(!1);
				if (n = b, i = q(n), Ba(Z, t, J, r, n, i, e, !1) !== !1) return g(), t.insertBefore(J, b), Y = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = q(n);
				var x = 0, S, C = J.parentNode !== t, w = !Ma(J.animated && J.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Ei(n, "top", "top") || Ei(J, "top", "top"), D = E ? E.scrollTop : void 0;
				_a !== n && (S = i[T], ya = !1, ba = !w && o.invertSwap || C), x = Ga(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, ba, _a === n);
				var O;
				if (x !== 0) {
					var k = ki(J);
					do
						k -= x, O = Y.children[k];
					while (O && (K(O, "display") === "none" || O === X));
				}
				if (x === 0 || O === n) return _(!1);
				_a = n, va = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = Ba(Z, t, J, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), wa = !0, setTimeout(Ha, 30), g(), j && !A ? t.appendChild(J) : n.parentNode.insertBefore(J, j ? A : n), E && Ri(E, 0, D - E.scrollTop), Y = J.parentNode, S !== void 0 && !ba && (xa = Math.abs(S - q(n)[T])), v(), _(!0);
			}
			if (t.contains(J)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		G(document, "mousemove", this._onTouchMove), G(document, "touchmove", this._onTouchMove), G(document, "pointermove", this._onTouchMove), G(document, "dragover", La), G(document, "mousemove", La), G(document, "touchmove", La);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		G(e, "mouseup", this._onDrop), G(e, "touchend", this._onDrop), G(e, "pointerup", this._onDrop), G(e, "pointercancel", this._onDrop), G(e, "touchcancel", this._onDrop), G(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (na = ki(J), ia = ki(J, n.draggable), Xi("drop", this, { evt: e }), Y = J && J.parentNode, na = ki(J), ia = ki(J, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		sa = !1, ba = !1, ya = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Xa(this.cloneId), Xa(this._dragStartId), this.nativeDraggable && (G(document, "drop", this), G(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), mi && K(document.body, "user-select", ""), K(J, "transform", ""), e && (ga && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), X && X.parentNode && X.parentNode.removeChild(X), (Z === Y || oa && oa.lastPutMode !== "clone") && Q && Q.parentNode && Q.parentNode.removeChild(Q), J && (this.nativeDraggable && G(J, "dragend", this), Va(J), J.style["will-change"] = "", ga && !sa && Si(J, oa ? oa.options.ghostClass : this.options.ghostClass, !1), Si(J, this.options.chosenClass, !1), Zi({
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
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], bi(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || qa(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			bi(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return bi(e, t || this.options.draggable, this.el, !1);
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
		e[Vi] = null, G(e, "mousedown", this._onTapStart), G(e, "touchstart", this._onTapStart), G(e, "pointerdown", this._onTapStart), this.nativeDraggable && (G(e, "dragover", this), G(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), la.splice(la.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!ea) {
			if (Xi("hideClone", this), $.eventCanceled) return;
			K(Q, "display", "none"), this.options.removeCloneOnHide && Q.parentNode && Q.parentNode.removeChild(Q), ea = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (ea) {
			if (Xi("showClone", this), $.eventCanceled) return;
			J.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(Q, J) : Qi ? Z.insertBefore(Q, Qi) : Z.appendChild(Q), this.options.group.revertClone && this.animate(J, Q), K(Q, "display", ""), ea = !1;
		}
	}
};
function za(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Ba(e, t, n, r, i, a, o, s) {
	var c, l = e[Vi], u = l.options.onMove, d;
	return window.CustomEvent && !di && !fi ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || q(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function Va(e) {
	e.draggable = !1;
}
function Ha() {
	wa = !1;
}
function Ua(e, t, n) {
	var r = q(Di(n.el, 0, n.options, !0)), i = Bi(n.el, n.options, X), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function Wa(e, t, n) {
	var r = q(Oi(n.el, n.options.draggable)), i = Bi(n.el, n.options, X), a = 10;
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
Ea && W(document, "touchmove", function(e) {
	($.active || sa) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: W,
	off: G,
	css: K,
	find: wi,
	is: function(e, t) {
		return !!bi(e, t, e, !1);
	},
	extend: Ni,
	throttle: Ii,
	closest: bi,
	toggleClass: Si,
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
		e.utils && ($.utils = ri(ri({}, $.utils), e.utils)), qi.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = li;
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
			this.sortable.nativeDraggable ? W(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? W(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? W(document, "touchmove", this._handleFallbackAutoScroll) : W(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? G(document, "dragover", this._handleAutoScroll) : (G(document, "pointermove", this._handleFallbackAutoScroll), G(document, "touchmove", this._handleFallbackAutoScroll), G(document, "mousemove", this._handleFallbackAutoScroll)), so(), oo(), Li();
		},
		nulling: function() {
			ro = $a = Qa = eo = io = to = no = null, Za.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (ro = e, t || this.options.forceAutoScrollFallback || fi || di || mi) {
				co(e, this.options, a, t);
				var o = Mi(a, !0);
				eo && (!io || r !== to || i !== no) && (io && so(), io = setInterval(function() {
					var a = Mi(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, oo()), co(e, n.options, a, t);
				}, 10), to = r, no = i);
			} else {
				if (!this.options.bubbleScroll || Mi(a, !0) === Ti()) {
					oo();
					return;
				}
				co(e, this.options, Mi(a, !1), !1);
			}
		}
	}, ti(e, {
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
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Ti(), l = !1, u;
		$a !== n && ($a = n, oo(), Qa = t.scroll, u = t.scrollFn, Qa === !0 && (Qa = Mi(n, !0)));
		var d = 0, f = Qa;
		do {
			var p = f, m = q(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = K(p), E = p.scrollLeft, D = p.scrollTop;
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
}, ti(uo, { pluginName: "revertOnSpill" });
function fo() {}
fo.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: lo
}, ti(fo, { pluginName: "removeOnSpill" }), $.mount(new ao()), $.mount(fo, uo);
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
		let l = e, u = t, d = V(), f = _({
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
			f.name = e?.name ?? "", f.description = e?.description ?? "", f.estimateHours = oe(e?.estimated_minutes ?? null), f.rate = ie(e?.rate ?? null), f.dueDate = e?.due_date ?? "", f.billable = e?.billable ?? !0;
			let t = l.statuses.find((e) => e.is_default) ?? l.statuses[0], n = e?.task_status_id ?? l.defaults?.task_status_id ?? t?.id ?? null;
			p.value = I(N.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = I(P.value, e?.assignee_id ?? null), y.value = e?.priority ? F.value[Do.indexOf(e.priority)] ?? null : null, C.value = e?.customer_id ?? null, w.value = {};
		}
		function R(e) {
			f.dueDate = e ? le(e) : "";
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
				estimated_minutes: se(f.estimateHours),
				billable: f.billable,
				rate: ae(f.rate)
			};
		}
		async function ee() {
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
				w.value = re(e), l.notify("error", B(e, d("tasks_projects.tasks.save_failed")));
			} finally {
				D.value = !1;
			}
		}
		async function te() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await yo(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", B(e, d("tasks_projects.tasks.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, n) => {
			let l = b("BaseIcon"), m = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSelectInput"), T = b("BaseDatePicker"), I = b("BaseInputGrid"), L = b("BaseSwitch"), z = b("BaseTextarea"), ne = b("BaseButton"), B = b("BaseModal");
			return g(), r(B, {
				show: e.show,
				onClose: n[11] ||= (e) => u("close")
			}, {
				header: E(() => [o("div", Oo, [o("span", null, [s(x(M.value) + " ", 1), e.task ? (g(), a("span", ko, "#" + x(e.task.number), 1)) : i("", !0)]), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: n[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(ee, ["prevent"]) }, [o("div", Ao, [
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
				]), o("div", jo, [j.value ? (g(), r(ne, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: te
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), a("span", Mo)), o("div", No, [c(ne, {
					type: "button",
					variant: "primary-outline",
					onClick: n[10] ||= (e) => u("close")
				}, {
					default: E(() => [s(x(S(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(ne, {
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
		let l = t, u = V(), d = v([]), _ = v([]), C = v([]), w = v(!0), D = v(null), O = v(null), k = v(!1), A = v(null), j = v({}), M = {
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
		}))), z = n(() => d.value.map((e) => e.status)), te = n(() => !w.value && d.value.length === 0);
		T([D, O], () => {
			re();
		}), h(() => {
			ne(), re();
		}), m(() => {
			for (let e of N.values()) e.destroy();
			N.clear(), F.clear();
		});
		async function ne() {
			try {
				let e = await P(l.client, {
					limit: 100,
					status: "ACTIVE"
				});
				C.value = e.data;
			} catch (e) {
				l.notify("error", B(e, u("tasks_projects.tasks.projects_failed")));
			}
			try {
				_.value = await ee(l.client);
			} catch (e) {
				l.notify("error", B(e, u("tasks_projects.tasks.members_failed")));
			}
		}
		async function re() {
			let e = {};
			D.value && (e.project_id = D.value.id), O.value && (e.assignee_id = O.value.id), w.value = !0;
			try {
				d.value = await mo(l.client, e);
			} catch (e) {
				l.notify("error", B(e, u("tasks_projects.board.load_failed")));
			} finally {
				w.value = !1;
			}
		}
		function ie(e, t) {
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
					se(e), setTimeout(() => {
						I = !1;
					});
				}
			}))));
		}
		function ae(e) {
			let t = e.item, n = e.oldIndex ?? 0;
			t.parentNode?.removeChild(t), e.from.insertBefore(t, e.from.children[n] ?? null);
		}
		function oe(e) {
			return d.value.find((t) => t.status.id === e);
		}
		async function se(e) {
			let t = Number(e.from.dataset.statusId), n = Number(e.to.dataset.statusId), r = e.oldIndex ?? 0, i = e.newIndex ?? 0;
			if (ae(e), Number.isNaN(t) || Number.isNaN(n) || t === n && r === i) return;
			let a = oe(t), o = oe(n);
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
				a.tasks = s.from, o.tasks = s.to, l.notify("error", B(e, u("tasks_projects.board.move_failed")));
			}
		}
		function le(e) {
			A.value = null, j.value = {
				task_status_id: e.id,
				project_id: D.value?.id ?? null
			}, k.value = !0;
		}
		function ue(e) {
			I || (A.value = e, j.value = {}, k.value = !0);
		}
		function pe(e) {
			let t = A.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			k.value = !1, A.value = null, l.notify("success", t), re();
		}
		function me(e) {
			k.value = !1, A.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), re();
		}
		function he() {
			D.value = null, O.value = null;
		}
		function ge(e) {
			if (e.project_id === null) return null;
			let t = C.value.find((t) => t.id === e.project_id);
			return t?.identifier || t?.name || null;
		}
		function _e(e) {
			if (e.assignee_id === null) return null;
			let t = _.value.find((t) => t.id === e.assignee_id);
			return t ? de(t.name) : `#${e.assignee_id}`;
		}
		function ve(e) {
			return e.assignee_id === null ? u("tasks_projects.tasks.unassigned") : _.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function ye(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function be(e) {
			return M[e];
		}
		return (n, l) => {
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), v = b("BaseIcon"), C = b("BaseButton"), T = b("router-link"), M = b("BasePageHeader"), N = b("BaseSelectInput"), P = b("BaseInputGroup"), F = b("BaseFilterWrapper"), I = b("BaseSpinner"), ee = b("BaseEmptyPlaceholder"), ne = b("BasePage");
			return g(), r(ne, null, {
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
						onClear: he
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
					w.value && d.value.length === 0 ? (g(), a("div", Io, [c(I, { class: "h-8 w-8 text-primary-500" })])) : te.value ? (g(), r(ee, {
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
							onClick: (e) => le(t.status)
						}, [c(v, {
							name: "PlusIcon",
							class: "h-4 w-4"
						})], 8, Ho)]),
						o("div", {
							ref_for: !0,
							ref: (e) => ie(t.status.id, e),
							"data-status-id": t.status.id,
							class: "min-h-[80px] space-y-2 px-3 pt-3"
						}, [(g(!0), a(e, null, y(t.tasks, (e) => (g(), a("article", {
							key: e.id,
							"data-task-id": e.id,
							class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
							onClick: (t) => ue(e)
						}, [
							o("div", Go, [o("p", Ko, x(e.name), 1), e.priority ? (g(), a("span", {
								key: 0,
								class: f(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", be(e.priority)])
							}, x(ye(e.priority)), 3)) : i("", !0)]),
							o("div", qo, [
								o("span", null, "#" + x(e.number), 1),
								ge(e) ? (g(), a("span", Jo, x(ge(e)), 1)) : i("", !0),
								e.billable ? (g(), a("span", Yo, [c(v, {
									name: "CurrencyDollarIcon",
									class: "mr-0.5 h-3.5 w-3.5"
								}), s(" " + x(S(u)("tasks_projects.tasks.billable")), 1)])) : i("", !0)
							]),
							o("div", Xo, [e.due_date ? (g(), a("span", {
								key: 0,
								class: f(["text-xs", S(fe)(e.due_date) && !e.closed_at ? "font-medium text-status-red" : "text-muted"])
							}, x(S(ce)(e.due_date)), 3)) : (g(), a("span", Zo, "-")), _e(e) ? (g(), a("span", {
								key: 2,
								class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
								title: ve(e)
							}, x(_e(e)), 9, Qo)) : i("", !0)])
						], 8, Wo))), 128))], 8, Uo),
						t.tasks.length === 0 ? (g(), a("p", $o, x(S(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
						o("div", es, [o("button", {
							type: "button",
							class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
							onClick: (e) => le(t.status)
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
						onSaved: pe,
						onDeleted: me
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
		let l = t, u = V(), d = v(null), p = v(null), m = v(!0), _ = v(!1), C = v(!1), w = n(() => Number(l.id)), D = n(() => [
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
				l.notify("error", B(e, u("tasks_projects.project.load_failed")));
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
					l.notify("error", B(e, u("tasks_projects.projects.save_failed")));
				} finally {
					_.value = !1;
				}
			}
		}
		function z(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function ee(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (n, l) => {
			let h = b("BaseBreadcrumbItem"), v = b("BaseBreadcrumb"), w = b("BaseBadge"), T = b("BaseIcon"), O = b("BaseButton"), A = b("router-link"), M = b("BasePageHeader"), L = b("BaseSpinner"), R = b("router-view"), te = b("BasePage");
			return g(), r(te, null, {
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
								default: E(() => [s(x(ee(d.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							d.value.identifier ? (g(), a("span", is, x(d.value.identifier), 1)) : i("", !0),
							d.value.customer_id ? (g(), a("span", as, [s(x(S(u)("tasks_projects.project.customer")) + ": ", 1), o("span", os, x(p.value ?? `#${d.value.customer_id}`), 1)])) : (g(), a("span", ss, x(S(u)("tasks_projects.projects.internal")), 1)),
							d.value.due_date ? (g(), a("span", cs, [s(x(S(u)("tasks_projects.project.due_date")) + ": ", 1), o("span", ls, x(S(ce)(d.value.due_date)), 1)])) : i("", !0)
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
					c(ve, {
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
		let l = t, u = V(), d = v([]), p = v([]), m = v(!0), _ = v(!1), C = v(null), w = v(null), T = v(""), D = v({}), O = n(() => l.project?.id ?? Number(l.id)), k = n(() => p.value.filter((e) => !d.value.some((t) => t.user_id === e.id)).map((e) => ({
			id: e.id,
			label: e.name
		})));
		h(() => {
			A();
		});
		async function A() {
			m.value = !0;
			try {
				p.value = await ee(l.client);
			} catch (e) {
				l.notify("error", B(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				d.value = await So(l.client, O.value);
			} catch (e) {
				l.notify("error", B(e, u("tasks_projects.project.members.load_failed")));
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
						rate: ae(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), w.value = null, T.value = "", await A();
				} catch (e) {
					D.value = re(e), l.notify("error", B(e, u("tasks_projects.project.members.attach_failed")));
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
					l.notify("error", B(e, u("tasks_projects.project.members.detach_failed")));
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
		let r = t, s = V(), l = n(() => r.project?.totals ?? null), u = n(() => r.project?.budget_minutes ?? null), d = n(() => {
			let e = u.value, t = l.value?.logged_minutes ?? 0;
			return e ? Math.min(100, Math.round(t / e * 100)) : 0;
		}), m = n(() => {
			let e = u.value, t = l.value?.logged_minutes ?? 0;
			return e && t > e ? t - e : 0;
		});
		return (n, r) => {
			let h = b("BaseFormatMoney"), _ = b("BaseSpinner");
			return t.project && l.value ? (g(), a("div", Os, [
				o("div", ks, [
					o("div", As, [
						o("p", js, x(S(s)("tasks_projects.project.overview.tasks")), 1),
						o("p", Ms, x(l.value.tasks.total), 1),
						o("p", Ns, x(S(s)("tasks_projects.project.overview.open_tasks", { count: l.value.tasks.open })) + " · " + x(S(s)("tasks_projects.project.overview.closed_tasks", { count: l.value.tasks.closed })), 1)
					]),
					o("div", Ps, [
						o("p", Fs, x(S(s)("tasks_projects.project.overview.logged")), 1),
						o("p", Is, x(S(ue)(l.value.logged_minutes)), 1),
						o("p", Ls, x(S(s)("tasks_projects.project.overview.billable")) + ": " + x(S(ue)(l.value.billable_minutes)), 1)
					]),
					o("div", Rs, [o("p", zs, x(S(s)("tasks_projects.project.overview.billable_amount")), 1), o("p", Bs, [c(h, { amount: l.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Vs, [o("p", Hs, x(S(s)("tasks_projects.project.overview.unbilled_amount")), 1), o("p", Us, [c(h, { amount: l.value.unbilled_amount }, null, 8, ["amount"])])])
				]),
				o("div", Ws, [o("p", Gs, x(S(s)("tasks_projects.project.overview.budget")), 1), u.value ? (g(), a(e, { key: 0 }, [
					o("p", Ks, x(S(s)("tasks_projects.project.overview.budget_used", {
						used: S(ue)(l.value.logged_minutes),
						total: S(ue)(u.value)
					})), 1),
					o("div", qs, [o("div", {
						class: f(["h-2 rounded-full", m.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: p({ width: `${d.value}%` })
					}, null, 6)]),
					m.value > 0 ? (g(), a("p", Js, x(S(s)("tasks_projects.project.overview.budget_over", { amount: S(ue)(m.value) })), 1)) : i("", !0)
				], 64)) : (g(), a("p", Ys, x(S(s)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", Xs, [o("p", Zs, x(S(s)("tasks_projects.project.overview.description")), 1), t.project.description ? (g(), a("p", Qs, x(t.project.description), 1)) : (g(), a("p", $s, x(S(s)("tasks_projects.project.overview.no_description")), 1))])
			])) : (g(), a("div", ec, [c(_, { class: "h-8 w-8 text-primary-500" })]));
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
		let u = e, d = l, y = V(), C = v(null), O = v(!0), k = v(0), A = v([]), j = v([]), M = v([]), N = v(!1), F = v(null), I = v({}), L = v(null), R = _({
			search: "",
			status: null,
			assignee: null
		}), z = n(() => A.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), te = n(() => j.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), ne = n(() => R.search.trim() !== "" || R.status !== null || R.assignee !== null), re = n(() => !O.value && k.value === 0 && !ne.value), ie = n(() => [
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
		]), ae = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, oe;
		T(() => R.search, () => {
			clearTimeout(oe), oe = setTimeout(() => ue(), cc);
		}), T([
			() => R.status,
			() => R.assignee,
			() => u.projectId
		], () => ue()), h(() => {
			se();
		}), m(() => clearTimeout(oe));
		async function se() {
			try {
				A.value = await ho(u.client);
			} catch (e) {
				u.notify("error", B(e, y("tasks_projects.task_statuses.load_failed")));
			}
			try {
				j.value = await ee(u.client);
			} catch (e) {
				u.notify("error", B(e, y("tasks_projects.tasks.members_failed")));
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
				u.notify("error", B(e, y("tasks_projects.tasks.projects_failed")));
			}
		}
		async function le({ page: e }) {
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
				return u.notify("error", B(e, y("tasks_projects.tasks.load_failed"))), {
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
		function ue(e = !1) {
			C.value?.refresh(e);
		}
		function de() {
			R.search = "", R.status = null, R.assignee = null;
		}
		function pe() {
			F.value = null, I.value = { project_id: u.projectId ?? null }, N.value = !0;
		}
		function me(e) {
			F.value = e, I.value = {}, N.value = !0;
		}
		function he(e) {
			let t = F.value ? y("tasks_projects.tasks.updated", { name: e.name }) : y("tasks_projects.tasks.created", { name: e.name });
			N.value = !1, F.value = null, u.notify("success", t), ue(!0), d("changed");
		}
		function ge(e) {
			N.value = !1, F.value = null, u.notify("success", y("tasks_projects.tasks.deleted", { name: e.name })), ue(!0), d("changed");
		}
		function _e(e) {
			return A.value.find((t) => t.id === e.task_status_id) ?? null;
		}
		function ve(e) {
			return e.assignee_id === null ? y("tasks_projects.tasks.unassigned") : j.value.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function ye(e) {
			return y(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		function be(e) {
			return ae[e];
		}
		async function xe(e) {
			if (window.confirm(y("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				L.value = e.id;
				try {
					await yo(u.client, e.id), u.notify("success", y("tasks_projects.tasks.deleted", { name: e.name })), ue(!0), d("changed");
				} catch (e) {
					u.notify("error", B(e, y("tasks_projects.tasks.delete_failed")));
				} finally {
					L.value = null;
				}
			}
		}
		return t({
			openCreate: pe,
			refresh: ue
		}), (t, n) => {
			let l = b("BaseInput"), u = b("BaseInputGroup"), d = b("BaseSelectInput"), m = b("BaseFilterWrapper"), h = b("BaseIcon"), _ = b("BaseButton"), v = b("BaseEmptyPlaceholder"), T = b("BaseDropdownItem"), O = b("BaseDropdown"), k = b("BaseTable");
			return g(), a("div", null, [
				e.filterable ? (g(), r(m, {
					key: 0,
					show: !0,
					class: "mt-3",
					onClear: de
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
								options: te.value,
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
						onClick: pe
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
				}, 8, ["title", "description"]), [[w, re.value]]),
				D(o("div", nc, [c(k, {
					ref_key: "tableRef",
					ref: C,
					data: le,
					columns: ie.value,
					class: "mt-3"
				}, {
					"cell-number": E(({ row: e }) => [s("#" + x(e.data.number), 1)]),
					"cell-name": E(({ row: e }) => [o("button", {
						type: "button",
						class: "text-left hover:text-primary-500",
						onClick: (t) => me(e.data)
					}, x(e.data.name), 9, rc)]),
					"cell-status": E(({ row: e }) => [o("span", ic, [o("span", {
						class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", _e(e.data)?.colour ? "" : "bg-line-default"]),
						style: p(_e(e.data)?.colour ? { backgroundColor: _e(e.data)?.colour } : void 0)
					}, null, 6), s(" " + x(_e(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": E(({ row: e }) => [o("span", { class: f(e.data.assignee_id === null ? "text-subtle" : "") }, x(ve(e.data)), 3)]),
					"cell-priority": E(({ row: e }) => [e.data.priority ? (g(), a("span", {
						key: 0,
						class: f(["rounded-full px-2 py-0.5 text-xs font-medium", be(e.data.priority)])
					}, x(ye(e.data.priority)), 3)) : (g(), a("span", ac, "-"))]),
					"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", {
						key: 0,
						class: f(S(fe)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "")
					}, x(S(ce)(e.data.due_date)), 3)) : (g(), a("span", oc, "-"))]),
					"cell-actions": E(({ row: e }) => [c(O, { "content-loading": L.value === e.data.id }, {
						activator: E(() => [c(h, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: E(() => [c(T, { onClick: (t) => me(e.data) }, {
							default: E(() => [c(h, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(y)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(T, { onClick: (t) => xe(e.data) }, {
							default: E(() => [c(h, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + x(S(y)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1032, ["content-loading"])]),
					_: 1
				}, 8, ["columns"])], 512), [[w, !re.value]]),
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
		let r = e, i = t, l = V(), u = v(null), d = n(() => r.project?.id ?? Number(r.id));
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
		let t = e, l = V(), u = v([]), d = v([]), f = n(() => t.project?.id ?? Number(t.id)), p = n(() => [
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
				u.value = await ee(t.client);
			} catch (e) {
				t.notify("error", B(e, l("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await go(t.client, {
					project_id: f.value,
					limit: 100
				});
				d.value = e.data;
			} catch (e) {
				t.notify("error", B(e, l("tasks_projects.tasks.load_failed")));
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
				return t.notify("error", B(e, l("tasks_projects.project.time.load_failed"))), {
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
				"cell-started_at": E(({ row: e }) => [s(x(e.data.started_at ? S(ce)(e.data.started_at) : "-"), 1)]),
				"cell-user": E(({ row: e }) => [s(x(y(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [o("span", mc, x(C(e.data.task_id)), 1), e.data.description ? (g(), a("span", hc, x(e.data.description), 1)) : i("", !0)]),
				"cell-duration_minutes": E(({ row: e }) => [e.data.is_running ? (g(), a("span", gc, x(S(l)("tasks_projects.project.time.running")), 1)) : (g(), a("span", _c, x(S(ue)(e.data.duration_minutes)), 1))]),
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
		let t = V(), n = v(null);
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
	e.addMessages($r), e.registerPage({
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
//#region resources/js/init.ts
var Dc = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(A), n.registerPage({
		id: "projects",
		module: Dc,
		path: "",
		component: Oc(n, Ae),
		meta: {
			ability: `${Dc}:view-project`,
			title: "tasks_projects.projects.title"
		}
	}), Yr(n), Ec(n);
});
function Oc(e, t) {
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
