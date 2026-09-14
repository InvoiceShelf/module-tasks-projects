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
async function B(e, t = 100) {
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
function V(e, t) {
	let n = ee(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function H(e) {
	let t = ee(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function te(e) {
	return e === null ? "" : String(e / 100);
}
function ne(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function re(e) {
	return e === null ? "" : String(e / 60);
}
function ie(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function ae(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function oe(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
//#endregion
//#region resources/js/support/i18n.ts
function U() {
	return u()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var se = { class: "flex w-full items-center justify-between" }, ce = { class: "space-y-5 px-6 py-6" }, le = { class: "flex flex-wrap items-center gap-2" }, ue = ["aria-label", "onClick"], de = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, fe = /* @__PURE__ */ l({
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
		], m = U(), h = _({
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
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = te(e?.default_rate ?? null), h.budgetHours = re(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, C.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : w.value.find((t) => t.id === e) ?? null;
		}
		function L(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function R() {
			if (!D.value) try {
				let e = await B(l.client);
				w.value = e.map((e) => ({
					id: e.id,
					label: L(e)
				})), D.value = !0, C.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", V(e, m("tasks_projects.projects.customers_failed")));
			}
		}
		function z() {
			return {
				name: h.name.trim(),
				customer_id: C.value?.id ?? null,
				identifier: h.identifier.trim() || null,
				description: h.description.trim() || null,
				colour: h.colour || null,
				default_rate: ne(h.defaultRate),
				budget_minutes: ie(h.budgetHours),
				due_date: h.dueDate || null
			};
		}
		function ee(e) {
			h.dueDate = e ? oe(e) : "";
		}
		async function ae() {
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
					O.value = H(e), l.notify("error", V(e, m("tasks_projects.projects.save_failed")));
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
				header: E(() => [o("div", se, [o("span", null, x(M.value), 1), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: i[0] ||= (e) => u("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(ae, ["prevent"]) }, [o("div", ce, [
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
						default: E(() => [o("div", le, [(g(), a(e, null, y(d, (e) => o("button", {
							key: e,
							type: "button",
							class: f(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: p({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, ue)), 64)), o("button", {
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
				]), o("div", de, [c(F, {
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
}), pe = { class: "flex items-center justify-end space-x-5" }, me = { class: "relative table-container" }, he = { class: "flex items-center" }, ge = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, _e = { key: 0 }, ve = {
	key: 1,
	class: "text-subtle"
}, ye = {
	key: 1,
	class: "text-subtle"
}, be = { key: 0 }, xe = {
	key: 1,
	class: "text-subtle"
}, Se = 10, Ce = 350, we = /* @__PURE__ */ l({
	__name: "ProjectsIndexPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = U(), u = v(null), d = v(!1), h = v(!0), y = v(0), C = v(!1), O = v(null), k = v(null), A = _({
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
			clearTimeout(B), B = setTimeout(() => H(), Ce);
		}), T(() => A.status, () => H()), m(() => clearTimeout(B));
		async function ee({ page: e }) {
			let n = {
				page: e,
				limit: Se
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
				return t.notify("error", V(e, l("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Se
					}
				};
			} finally {
				h.value = !1;
			}
		}
		function H(e = !1) {
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
		function oe(e) {
			let n = O.value ? l("tasks_projects.projects.updated", { name: e.name }) : l("tasks_projects.projects.created", { name: e.name });
			C.value = !1, O.value = null, t.notify("success", n), H();
		}
		async function se(e) {
			k.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await R(t.client, e.id), t.notify("success", l("tasks_projects.projects.unarchived", { name: e.name }))) : (await L(t.client, e.id), t.notify("success", l("tasks_projects.projects.archived", { name: e.name }))), H(!0);
			} catch (e) {
				t.notify("error", V(e, l("tasks_projects.projects.save_failed")));
			} finally {
				k.value = null;
			}
		}
		async function ce(e) {
			if (window.confirm(l("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				k.value = e.id;
				try {
					await z(t.client, e.id), t.notify("success", l("tasks_projects.projects.deleted", { name: e.name })), H(!0);
				} catch (e) {
					t.notify("error", V(e, l("tasks_projects.projects.delete_failed")));
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
			let m = b("BaseBreadcrumbItem"), h = b("BaseBreadcrumb"), _ = b("BaseIcon"), v = b("BaseButton"), y = b("BasePageHeader"), T = b("BaseInput"), P = b("BaseInputGroup"), F = b("BaseSelectInput"), L = b("BaseFilterWrapper"), R = b("BaseEmptyPlaceholder"), z = b("BaseBadge"), B = b("BaseFormatMoney"), V = b("BaseDropdownItem"), H = b("BaseDropdown"), U = b("BaseTable"), de = b("BasePage");
			return g(), r(de, null, {
				default: E(() => [
					c(y, { title: S(l)("tasks_projects.projects.title") }, {
						actions: E(() => [o("div", pe, [c(v, {
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
						}), c(v, {
							variant: "primary",
							onClick: re
						}, {
							left: E((e) => [c(_, {
								name: "PlusIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: E(() => [s(" " + x(S(l)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})])]),
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
					c(L, {
						show: d.value,
						class: "mt-3",
						onClear: ne
					}, {
						default: E(() => [c(P, {
							label: S(l)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(T, {
								modelValue: A.search,
								"onUpdate:modelValue": n[0] ||= (e) => A.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: S(l)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), c(P, {
							label: S(l)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: E(() => [c(F, {
								modelValue: M.value,
								"onUpdate:modelValue": n[1] ||= (e) => M.value = e,
								options: j.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					D(c(R, {
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
					D(o("div", me, [c(U, {
						ref_key: "tableRef",
						ref: u,
						data: ee,
						columns: N.value,
						class: "mt-3"
					}, {
						"cell-name": E(({ row: e }) => [o("div", he, [o("span", {
							class: f(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: p(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), o("span", null, [s(x(e.data.name) + " ", 1), e.data.identifier ? (g(), a("span", ge, x(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": E(({ row: e }) => [c(z, { class: f(["rounded-full", le(e.data.status)]) }, {
							default: E(() => [s(x(ue(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": E(({ row: e }) => [e.data.customer_id ? (g(), a("span", _e, "#" + x(e.data.customer_id), 1)) : (g(), a("span", ve, x(S(l)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": E(({ row: e }) => [e.data.default_rate === null ? (g(), a("span", ye, "-")) : (g(), r(B, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": E(({ row: e }) => [e.data.due_date ? (g(), a("span", be, x(S(ae)(e.data.due_date)), 1)) : (g(), a("span", xe, "-"))]),
						"cell-actions": E(({ row: e }) => [c(H, { "content-loading": k.value === e.data.id }, {
							activator: E(() => [c(_, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: E(() => [
								c(V, { onClick: (t) => ie(e.data) }, {
									default: E(() => [c(_, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + x(S(l)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(V, { onClick: (t) => se(e.data) }, {
									default: E(() => [c(_, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + x(e.data.status === "ARCHIVED" ? S(l)("tasks_projects.projects.unarchive") : S(l)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(V, { onClick: (t) => ce(e.data) }, {
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
					c(fe, {
						show: C.value,
						client: e.client,
						notify: e.notify,
						project: O.value,
						onClose: n[2] ||= (e) => C.value = !1,
						onSaved: oe
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
}), W = "/api/v1/tasks-projects", G = {
	timeEntries: `${W}/time-entries`,
	timeEntry: (e) => `${W}/time-entries/${e}`,
	timer: `${W}/timer`,
	timerStart: `${W}/timer/start`,
	timerStop: `${W}/timer/stop`,
	taskStatuses: `${W}/task-statuses`,
	taskStatus: (e) => `${W}/task-statuses/${e}`,
	reorderTaskStatuses: `${W}/task-statuses/reorder`,
	tasks: `${W}/tasks`,
	task: (e) => `${W}/tasks/${e}`,
	members: `${W}/members`,
	settings: `${W}/settings`
}, Te = { bootstrap: "/api/v1/bootstrap" }, Ee = 100, De = 5, Oe = 10;
async function ke(e, t) {
	let { data: n } = await e.get(G.timeEntries, { params: t });
	return n;
}
async function Ae(e, t) {
	let n = [];
	for (let r = 1; r <= De; r += 1) {
		let i = await ke(e, {
			...t,
			page: r,
			limit: Ee
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function je(e, t) {
	let { data: n } = await e.post(G.timeEntries, t);
	return n.data;
}
async function Me(e, t, n) {
	let { data: r } = await e.put(G.timeEntry(t), n);
	return r.data;
}
async function Ne(e, t) {
	await e.delete(G.timeEntry(t));
}
async function Pe(e) {
	let { data: t } = await e.get(G.timer);
	return t?.data ?? null;
}
async function Fe(e, t) {
	let { data: n } = await e.post(G.timerStart, t);
	return n.data;
}
async function Ie(e) {
	let { data: t } = await e.post(G.timerStop);
	return t.data;
}
async function Le(e) {
	await e.delete(G.timer);
}
async function Re(e) {
	let { data: t } = await e.get(G.taskStatuses);
	return t.data ?? [];
}
async function ze(e, t) {
	let { data: n } = await e.post(G.taskStatuses, t);
	return n.data;
}
async function Be(e, t, n) {
	let { data: r } = await e.put(G.taskStatus(t), n);
	return r.data;
}
async function Ve(e, t) {
	await e.delete(G.taskStatus(t));
}
async function He(e, t) {
	let { data: n } = await e.post(G.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function Ue(e, t, n = Oe) {
	let r = { limit: n };
	t.trim() !== "" && (r.search = t.trim());
	let { data: i } = await e.get(G.tasks, { params: r });
	return i.data ?? [];
}
async function We(e, t) {
	let { data: n } = await e.get(G.task(t));
	return n.data;
}
async function Ge(e) {
	let { data: t } = await e.get(G.members);
	return t.data ?? [];
}
async function Ke(e) {
	let { data: t } = await e.get(G.settings);
	return t.data;
}
async function qe(e) {
	let { data: t } = await e.get(Te.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var Je = _({}), Ye = /* @__PURE__ */ new Set(), Xe = 5;
function Ze(e) {
	return e === null ? "" : Je[e] ?? `#${e}`;
}
function Qe(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (Je[e.id] = e.name);
}
async function $e(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && Je[e] === void 0 && !Ye.has(e));
	for (let e of n) Ye.add(e);
	for (let t = 0; t < n.length; t += Xe) await Promise.all(n.slice(t, t + Xe).map(async (t) => {
		try {
			Qe(await We(e, t));
		} catch {} finally {
			Ye.delete(t);
		}
	}));
}
function et() {
	for (let e of Object.keys(Je)) delete Je[Number(e)];
	Ye.clear();
}
//#endregion
//#region resources/js/support/http.ts
function tt(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function nt(e) {
	return tt(e) === 409;
}
function rt(e) {
	return tt(e) === 403;
}
//#endregion
//#region resources/js/support/time.ts
var it = 60, at = 60, ot = 7;
function st(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / at), i = t % at;
	return `${n}:${J(r)}:${J(i)}`;
}
function K(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / it)}:${J(t % it)}`;
}
function ct(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * it + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * it);
}
function lt(e) {
	let t = yt(e);
	return t === null ? "" : q(t);
}
function ut(e) {
	let t = yt(e);
	return t === null ? "" : `${J(t.getHours())}:${J(t.getMinutes())}`;
}
function dt(e, t = "09:00") {
	let n = bt(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function ft(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * at * 1e3), n.toISOString();
}
function pt(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = xt(e), i = (r.getDay() - n + ot) % ot;
	return r.setDate(r.getDate() - i), r;
}
function mt(e) {
	return Array.from({ length: ot }, (t, n) => ht(e, n));
}
function ht(e, t) {
	let n = xt(e);
	return n.setDate(n.getDate() + t), n;
}
function q(e) {
	return `${e.getFullYear()}-${J(e.getMonth() + 1)}-${J(e.getDate())}`;
}
function gt(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function _t(e) {
	return q(e) === q(/* @__PURE__ */ new Date());
}
function vt(e) {
	let t = yt(e);
	return t === null ? 0 : Math.max(0, Math.floor((Date.now() - t.getTime()) / 1e3));
}
function yt(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function bt(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function xt(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function J(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var Y = _({
	running: null,
	elapsedSeconds: 0,
	busy: !1
}), St;
function Ct() {
	Y.elapsedSeconds = Y.running === null ? 0 : vt(Y.running.started_at);
}
function wt() {
	Ct(), St === void 0 && (St = setInterval(Ct, 1e3));
}
function Tt() {
	St !== void 0 && (clearInterval(St), St = void 0), Y.elapsedSeconds = 0;
}
function Et(e, t) {
	if (Y.running = e && typeof e.id == "number" ? e : null, Y.running === null) {
		Tt();
		return;
	}
	wt(), t && typeof Y.running.task_id == "number" && $e(t, [Y.running.task_id]);
}
function Dt(e, t, n) {
	e?.notify("error", V(t, e.t(n)));
}
var X = {
	get running() {
		return Y.running;
	},
	get elapsedSeconds() {
		return Y.elapsedSeconds;
	},
	get busy() {
		return Y.busy;
	},
	async refresh(e) {
		try {
			Et(await Pe(e), e);
		} catch {
			Et(null);
		}
	},
	async start(e, t, n = null, r) {
		if (Y.busy) return null;
		Y.busy = !0;
		try {
			let r = await Fe(e, {
				task_id: t,
				description: n
			});
			return Et(r, e), r;
		} catch (t) {
			return nt(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : Dt(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			Y.busy = !1;
		}
	},
	async stop(e, t) {
		if (Y.busy || Y.running === null) return null;
		Y.busy = !0;
		try {
			let t = await Ie(e);
			return Et(null), t;
		} catch (n) {
			return Dt(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			Y.busy = !1;
		}
	},
	async discard(e, t) {
		if (Y.busy || Y.running === null) return !1;
		Y.busy = !0;
		try {
			return await Le(e), Et(null), !0;
		} catch (n) {
			return Dt(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			Y.busy = !1;
		}
	},
	reset() {
		Y.busy = !1, Et(null);
	}
}, Ot = {
	key: 0,
	class: "fixed right-6 bottom-20 z-40 flex flex-col items-end gap-3"
}, kt = ["aria-label"], At = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, jt = { class: "text-sm font-semibold text-heading" }, Mt = ["aria-label"], Nt = {
	key: 0,
	class: "space-y-4 px-4 py-4"
}, Pt = { class: "truncate text-sm font-medium text-heading" }, Ft = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, It = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, Lt = { class: "flex items-center gap-2" }, Rt = {
	key: 1,
	class: "space-y-3 px-4 py-4"
}, zt = { class: "block" }, Bt = { class: "sr-only" }, Vt = ["placeholder"], Ht = {
	key: 0,
	class: "text-xs text-muted"
}, Ut = {
	key: 1,
	class: "max-h-48 space-y-1 overflow-y-auto"
}, Wt = ["onClick"], Gt = {
	key: 2,
	class: "text-xs text-muted"
}, Kt = ["placeholder", "aria-label"], qt = { class: "flex items-center justify-between" }, Jt = ["title", "aria-label"], Yt = {
	key: 0,
	class: "tabular-nums"
}, Xt = 300, Zt = /* @__PURE__ */ l({
	__name: "QuickStartOverlay",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		enabled: { type: Boolean }
	},
	emits: ["open-timesheet"],
	setup(l, { emit: u }) {
		let d = l, p = u, h = U(), _ = v(!1), w = v(""), k = v([]), A = v(!1), j = v(null), M = v(""), N, P = n(() => ({
			notify: d.notify,
			t: h
		})), F = n(() => Ze(X.running?.task_id ?? null)), I = n(() => st(X.elapsedSeconds));
		T(() => d.enabled, (e) => {
			e || z();
		}), T(_, (e) => {
			e && X.running === null && L();
		}), T(w, () => {
			clearTimeout(N), N = setTimeout(() => void L(), Xt);
		}), m(() => clearTimeout(N));
		async function L() {
			A.value = !0;
			try {
				let e = await Ue(d.client, w.value);
				k.value = e, e.forEach(Qe);
			} catch (e) {
				k.value = [], d.notify("error", V(e, h("tasks_projects.time.tasks_failed")));
			} finally {
				A.value = !1;
			}
		}
		function R(e) {
			j.value = e, Qe(e);
		}
		function z() {
			_.value = !1, w.value = "", k.value = [], j.value = null, M.value = "";
		}
		async function B() {
			let e = j.value;
			e !== null && await X.start(d.client, e.id, M.value.trim() || null, P.value) !== null && (d.notify("success", h("tasks_projects.timer.started", { name: e.name })), z());
		}
		async function ee() {
			let e = F.value, t = await X.stop(d.client, P.value);
			t !== null && (d.notify("success", h("tasks_projects.timer.stopped", {
				name: e,
				duration: K(t.duration_minutes)
			})), z());
		}
		async function H() {
			window.confirm(h("tasks_projects.timer.discard_confirm")) && await X.discard(d.client, P.value) && (d.notify("success", h("tasks_projects.timer.discarded")), z());
		}
		return (n, u) => {
			let d = b("BaseIcon"), m = b("BaseButton");
			return g(), r(t, { to: "body" }, [l.enabled ? (g(), a("div", Ot, [_.value ? (g(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": S(h)("tasks_projects.timer.panel_title"),
				onKeydown: O(z, ["esc"])
			}, [o("header", At, [o("h2", jt, x(S(h)("tasks_projects.timer.panel_title")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": S(h)("tasks_projects.timer.close"),
				onClick: z
			}, [c(d, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Mt)]), S(X).running === null ? (g(), a("div", Rt, [
				o("label", zt, [o("span", Bt, x(S(h)("tasks_projects.timer.search_tasks")), 1), D(o("input", {
					"onUpdate:modelValue": u[0] ||= (e) => w.value = e,
					type: "search",
					autocomplete: "off",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.search_tasks")
				}, null, 8, Vt), [[C, w.value]])]),
				A.value ? (g(), a("p", Ht, x(S(h)("tasks_projects.general.search")), 1)) : k.value.length > 0 ? (g(), a("ul", Ut, [(g(!0), a(e, null, y(k.value, (e) => (g(), a("li", { key: e.id }, [o("button", {
					type: "button",
					class: f(["w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover", j.value?.id === e.id ? "bg-hover-strong font-medium text-heading" : "text-body"]),
					onClick: (t) => R(e)
				}, x(e.name), 11, Wt)]))), 128))])) : (g(), a("p", Gt, x(S(h)("tasks_projects.timer.no_tasks")), 1)),
				D(o("input", {
					"onUpdate:modelValue": u[1] ||= (e) => M.value = e,
					type: "text",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: S(h)("tasks_projects.timer.description_placeholder"),
					"aria-label": S(h)("tasks_projects.time.fields.description")
				}, null, 8, Kt), [[C, M.value]]),
				o("div", qt, [o("button", {
					type: "button",
					class: "text-xs text-primary-500 hover:underline",
					onClick: u[2] ||= (e) => p("open-timesheet")
				}, x(S(h)("tasks_projects.timer.open_timesheet")), 1), c(m, {
					variant: "primary",
					disabled: j.value === null || S(X).busy,
					onClick: B
				}, {
					left: E((e) => [c(d, {
						name: "PlayIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: E(() => [s(" " + x(S(h)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			])) : (g(), a("div", Nt, [o("div", null, [
				o("p", Pt, x(F.value), 1),
				o("p", Ft, x(I.value), 1),
				S(X).running.description ? (g(), a("p", It, x(S(X).running.description), 1)) : i("", !0)
			]), o("div", Lt, [c(m, {
				variant: "primary",
				disabled: S(X).busy,
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
				disabled: S(X).busy,
				onClick: H
			}, {
				default: E(() => [s(x(S(h)("tasks_projects.timer.discard")), 1)]),
				_: 1
			}, 8, ["disabled"])])]))], 40, kt)) : i("", !0), o("button", {
				type: "button",
				class: "flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover",
				title: S(h)("tasks_projects.timer.quick_start"),
				"aria-label": S(h)("tasks_projects.timer.quick_start"),
				onClick: u[3] ||= (e) => _.value = !_.value
			}, [c(d, {
				name: S(X).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), S(X).running === null ? i("", !0) : (g(), a("span", Yt, x(I.value), 1))], 8, Jt)])) : i("", !0)]);
		};
	}
}), Qt = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, $t = ["title"], en = ["aria-label"], tn = { class: "font-medium tabular-nums" }, nn = [
	"disabled",
	"title",
	"aria-label"
], rn = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = U(), u = n(() => Ze(X.running?.task_id ?? null)), d = n(() => st(X.elapsedSeconds));
		async function f() {
			let e = u.value, t = await X.stop(r.client, {
				notify: r.notify,
				t: l
			});
			t !== null && r.notify("success", l("tasks_projects.timer.stopped", {
				name: e,
				duration: K(t.duration_minutes)
			}));
		}
		return (e, t) => {
			let n = b("BaseIcon");
			return S(X).running === null ? i("", !0) : (g(), a("li", Qt, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: S(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": S(l)("tasks_projects.timer.open_timesheet"),
					onClick: t[0] ||= (e) => s("open")
				}, x(u.value), 9, en),
				o("span", tn, x(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: S(X).busy,
					title: S(l)("tasks_projects.timer.stop"),
					"aria-label": S(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, nn)
			], 8, $t)]));
		};
	}
}), an = { en: { tasks_projects: {
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
} } }, on = { class: "relative table-container" }, sn = { class: "block max-w-64 truncate" }, cn = { class: "tabular-nums" }, ln = {
	key: 1,
	class: "text-subtle"
}, un = /* @__PURE__ */ l({
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
		let l = e, u = t, d = U(), p = v(null), m = _({
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
			m.from = e ? oe(e) : "";
		}
		function P(e) {
			m.to = e ? oe(e) : "";
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
				let e = await ke(l.client, t), n = e.data ?? [];
				return $e(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
					data: n,
					pagination: L(e.meta, n.length)
				};
			} catch (e) {
				return l.notify("error", V(e, d("tasks_projects.time.load_failed"))), {
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
			}), o("div", on, [c(z, {
				ref_key: "tableRef",
				ref: p,
				data: I,
				columns: k.value,
				class: "mt-3"
			}, {
				"cell-date": E(({ row: e }) => [s(x(S(ae)(S(lt)(e.data.started_at))), 1)]),
				"cell-member": E(({ row: e }) => [s(x(F(e.data.user_id)), 1)]),
				"cell-task": E(({ row: e }) => [s(x(S(Ze)(e.data.task_id)), 1)]),
				"cell-description": E(({ row: e }) => [o("span", sn, x(e.data.description || "-"), 1)]),
				"cell-duration": E(({ row: e }) => [o("span", cn, x(S(K)(e.data.duration_minutes)), 1)]),
				"cell-billable": E(({ row: e }) => [c(T, { class: f(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: E(() => [s(x(e.data.billable ? S(d)("tasks_projects.time.billable") : S(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": E(({ row: e }) => [e.data.billable ? (g(), r(A, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (g(), a("span", ln, "-"))]),
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
}), dn = { class: "flex w-full items-center justify-between" }, fn = { class: "space-y-5 px-6 py-6" }, pn = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, mn = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, hn = ["disabled", "onClick"], gn = {
	key: 1,
	class: "text-sm text-muted"
}, _n = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, vn = { key: 1 }, yn = { class: "flex space-x-3" }, bn = "09:00", xn = /* @__PURE__ */ l({
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
		let u = t, d = l, p = ["duration", "range"], m = U(), h = _({
			date: "",
			mode: "duration",
			duration: "",
			start: bn,
			end: "",
			description: "",
			billable: !0
		}), C = v(null), w = v({}), D = v(!1), O = v(!1), A = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : A.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		T(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			w.value = {}, C.value = null, h.date = e ? lt(e.started_at) : u.defaultDate ?? q(/* @__PURE__ */ new Date()), h.duration = e ? K(e.duration_minutes) : "", h.start = e?.started_at ? ut(e.started_at) : bn, h.end = e?.ended_at ? ut(e.ended_at) : "", h.description = e?.description ?? "", h.billable = !e || e.billable, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? q(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await We(u.client, e);
				C.value = t, Qe(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await Ue(u.client, e ?? "");
				return t.forEach(Qe), t;
			} catch (e) {
				return u.notify("error", V(e, m("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function L(e) {
			h.date = e ? oe(e) : "";
		}
		function R(e) {
			C.value = e, e !== null && u.entry === null && (h.billable = e.billable !== !1);
		}
		function z() {
			let e = {}, t = C.value;
			(t === null || typeof t.id != "number") && (e.task_id = m("tasks_projects.time.task_required")), h.date === "" && (e.date = m("tasks_projects.time.date_required"));
			let n = dt(h.date, h.mode === "range" ? h.start : bn);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? ct(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? dt(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), w.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = ft(n, r)) : a.ended_at = i, a;
		}
		async function B() {
			if (D.value || j.value) return;
			let e = z();
			if (e !== null) {
				D.value = !0;
				try {
					let t = u.entry, n = t ? await Me(u.client, t.id, e) : await je(u.client, e);
					d("saved", n);
				} catch (e) {
					w.value = H(e), u.notify("error", V(e, m("tasks_projects.time.save_failed")));
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
					await Ne(u.client, e.id), d("deleted", e);
				} catch (e) {
					u.notify("error", V(e, m("tasks_projects.time.delete_failed")));
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
				header: E(() => [o("div", dn, [o("span", null, x(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: E(() => [o("form", { onSubmit: k(B, ["prevent"]) }, [o("div", fn, [
					j.value ? (g(), a("p", pn, x(S(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
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
							default: E(() => [o("div", mn, [(g(), a(e, null, y(p, (e) => o("button", {
								key: e,
								type: "button",
								class: f(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, x(S(m)(`tasks_projects.time.mode.${e}`)), 11, hn)), 64))])]),
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
						default: E(() => [j.value ? (g(), a("span", gn, x(h.billable ? S(m)("tasks_projects.time.billable") : S(m)("tasks_projects.time.non_billable")), 1)) : (g(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", _n, [A.value && !j.value ? (g(), r(V, {
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
				}, 8, ["loading", "disabled"])) : (g(), a("span", vn)), o("div", yn, [c(V, {
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
}), Sn = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, Cn = { class: "flex items-center gap-2" }, wn = { class: "ml-1 text-sm text-muted" }, Tn = { class: "flex items-center gap-2 text-sm" }, En = { class: "text-muted" }, Dn = { class: "text-lg font-semibold tabular-nums text-heading" }, On = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, kn = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, An = { class: "flex items-baseline justify-between" }, jn = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, Mn = { class: "text-xs text-muted" }, Nn = { class: "text-sm font-medium tabular-nums text-heading" }, Pn = { class: "mt-3 flex-1 space-y-2" }, Fn = ["onClick"], In = { class: "flex items-center justify-between gap-2" }, Ln = { class: "truncate text-xs font-medium text-heading" }, Rn = { class: "shrink-0 text-xs tabular-nums text-muted" }, zn = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, Bn = { class: "mt-1 flex items-center gap-1" }, Vn = { class: "text-[11px] text-subtle" }, Hn = {
	key: 0,
	class: "text-[11px] text-subtle"
}, Un = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, Wn = ["onClick"], Gn = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, Kn = /* @__PURE__ */ l({
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
		let u = t, d = l, p = U(), m = v(pt(/* @__PURE__ */ new Date(), u.weekStart)), h = v([]), _ = v(!1), C = n(() => mt(m.value)), w = n(() => {
			let e = C.value[0], t = C.value[C.value.length - 1];
			return `${gt(e).day} - ${gt(t).day}`;
		}), D = n(() => C.value.map((e) => {
			let t = q(e), n = h.value.filter((e) => lt(e.started_at) === t), r = gt(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: _t(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !_.value && h.value.length === 0);
		T(() => u.weekStart, (e) => {
			m.value = pt(m.value, e);
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
				let e = await Ae(u.client, {
					user_id: u.userId,
					from: q(C.value[0]),
					to: q(C.value[C.value.length - 1])
				});
				h.value = e, $e(u.client, e.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", V(e, p("tasks_projects.time.load_failed")));
			} finally {
				_.value = !1;
			}
		}
		function M(e) {
			m.value = ht(m.value, e * 7);
		}
		function N() {
			m.value = pt(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = b("BaseIcon"), m = b("BaseButton"), h = b("BaseSpinner");
			return g(), a("section", null, [
				o("header", Sn, [o("div", Cn, [
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
					o("span", wn, x(w.value), 1)
				]), o("div", Tn, [
					o("span", En, x(S(p)("tasks_projects.time.week_total")), 1),
					o("span", Dn, x(S(K)(O.value)), 1),
					_.value ? (g(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (g(), a("p", On, x(S(p)("tasks_projects.time.unknown_user")), 1)) : (g(), a("div", kn, [(g(!0), a(e, null, y(D.value, (t) => (g(), a("article", {
					key: t.key,
					class: f(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", An, [o("div", null, [o("p", jn, x(t.weekday), 1), o("p", Mn, x(t.day), 1)]), o("span", Nn, x(S(K)(t.minutes)), 1)]),
					o("ul", Pn, [(g(!0), a(e, null, y(t.entries, (e) => (g(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", In, [o("span", Ln, x(S(Ze)(e.task_id)), 1), o("span", Rn, x(S(K)(e.duration_minutes)), 1)]),
						e.description ? (g(), a("span", zn, x(e.description), 1)) : i("", !0),
						o("span", Bn, [
							o("span", { class: f(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", Vn, x(e.billable ? S(p)("tasks_projects.time.billable") : S(p)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (g(), a("span", Hn, " - " + x(S(p)("tasks_projects.time.billed")), 1))
						])
					], 8, Fn)]))), 128)), t.entries.length === 0 ? (g(), a("li", Un, x(S(p)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + x(S(p)("tasks_projects.time.add_entry")), 1)], 8, Wn)
				], 2))), 128))])),
				k.value && t.userId !== null ? (g(), a("p", Gn, x(S(p)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), Z = {
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
}, Q = _({
	adminMode: !1,
	userId: null,
	settings: { ...Z },
	companySession: 0,
	loading: !1
});
async function qn(e) {
	if (Q.adminMode) return;
	Q.loading = !0;
	let [t, n] = await Promise.all([qe(e).catch(() => null), Ke(e).catch(() => null)]);
	Q.userId = t, Q.settings = Xn(n), Q.loading = !1;
}
function Jn() {
	Q.userId = null, Q.settings = { ...Z }, Q.companySession += 1, Q.loading = !1;
}
function Yn(e) {
	Q.adminMode = e;
}
function Xn(e) {
	if (typeof e != "object" || !e) return { ...Z };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : Z.rounding_increments;
	return {
		default_rate: Zn(e.default_rate, Z.default_rate),
		rounding_minutes: Zn(e.rounding_minutes, Z.rounding_minutes),
		week_start: Qn(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		rounding_increments: t.length > 0 ? t : Z.rounding_increments
	};
}
function Zn(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function Qn(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : Z.week_start;
}
//#endregion
//#region resources/js/pages/TimePage.vue?vue&type=script&setup=true&lang.ts
var $n = { class: "flex items-center justify-end space-x-5" }, er = {
	key: 0,
	class: "hidden items-center gap-2 text-sm text-muted sm:flex"
}, tr = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, nr = 5, rr = /* @__PURE__ */ l({
	__name: "TimePage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, l = U(), u = v("MINE"), d = v(!1), p = v([]), m = v([]), _ = v(!1), y = v(null), C = v(q(/* @__PURE__ */ new Date())), w = v(0), T = n(() => Q.settings.week_start), D = n(() => Q.userId);
		h(() => void O());
		async function O() {
			Q.userId === null && await qn(t.client), d.value = Q.settings.members_see_all_time || await k(), d.value && await Promise.all([A(), j()]);
		}
		async function k() {
			try {
				return ((await ke(t.client, { limit: nr })).data ?? []).some((e) => e.user_id !== Q.userId);
			} catch {
				return !1;
			}
		}
		async function A() {
			try {
				p.value = await Ge(t.client);
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
			y.value = null, C.value = e ?? q(/* @__PURE__ */ new Date()), _.value = !0;
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
				await Ne(t.client, e.id), t.notify("success", l("tasks_projects.time.deleted")), w.value += 1;
			} catch (e) {
				t.notify("error", V(e, l("tasks_projects.time.delete_failed")));
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
						actions: E(() => [o("div", $n, [S(X).running === null ? i("", !0) : (g(), a("span", er, [c(O, {
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
					d.value ? (g(), a("nav", tr, [o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("MINE")]),
						onClick: n[1] ||= (e) => u.value = "MINE"
					}, x(S(l)("tasks_projects.time.my_time")), 3), o("button", {
						type: "button",
						class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", R("ALL")]),
						onClick: n[2] ||= (e) => u.value = "ALL"
					}, x(S(l)("tasks_projects.time.all_time")), 3)])) : i("", !0),
					u.value === "MINE" ? (g(), r(Kn, {
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
					])) : (g(), r(un, {
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
					c(xn, {
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
}), ir = {
	key: 0,
	class: "text-sm text-muted"
}, ar = { key: 1 }, or = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, sr = {
	key: 1,
	class: "text-sm text-muted"
}, cr = {
	key: 2,
	class: "divide-y divide-line-light"
}, lr = {
	key: 0,
	class: "space-y-3"
}, ur = { class: "flex flex-wrap items-center gap-2" }, dr = ["aria-label", "onClick"], fr = { class: "flex flex-wrap items-center gap-6" }, pr = { class: "flex items-center gap-2 text-sm text-body" }, mr = { class: "flex items-center gap-2 text-sm text-body" }, hr = { class: "flex gap-3" }, gr = {
	key: 1,
	class: "flex items-center gap-3"
}, _r = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, vr = { class: "flex items-center gap-1" }, yr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], br = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], xr = [
	"title",
	"aria-label",
	"onClick"
], Sr = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Cr = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, wr = { class: "flex flex-wrap items-center gap-2" }, Tr = ["aria-label", "onClick"], Er = { class: "flex flex-wrap items-center gap-6" }, Dr = { class: "flex items-center gap-2 text-sm text-body" }, Or = { class: "flex items-center gap-2 text-sm text-body" }, kr = { class: "flex gap-3" }, Ar = /* @__PURE__ */ l({
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
		], d = U(), m = v([]), C = v(!0), w = v(!1), T = v(!1), D = v(null), O = v(!1), k = _({
			name: "",
			colour: "",
			is_default: !1,
			is_closed: !1
		}), A = n(() => !C.value && m.value.length === 0);
		h(() => void j());
		async function j() {
			C.value = !0;
			try {
				m.value = await Re(l.client), w.value = !1;
			} catch (e) {
				m.value = [], w.value = rt(e), w.value || l.notify("error", V(e, d("tasks_projects.settings.load_failed")));
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
				e === null ? (await ze(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await Be(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
			} catch (e) {
				l.notify("error", V(e, d("tasks_projects.settings.save_failed")));
			} finally {
				T.value = !1;
			}
		}
		async function L(e) {
			if (!T.value && window.confirm(d("tasks_projects.settings.status_delete_confirm", { name: e.name }))) {
				T.value = !0;
				try {
					await Ve(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
				} catch (e) {
					l.notify("error", V(e, d("tasks_projects.settings.delete_failed")));
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
				m.value = await He(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", V(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = b("BaseSpinner"), h = b("BaseInput"), _ = b("BaseInputGroup"), v = b("BaseSwitch"), j = b("BaseButton"), F = b("BaseBadge"), z = b("BaseIcon");
			return g(), a("div", null, [w.value ? (g(), a("p", ir, x(S(d)("tasks_projects.settings.forbidden")), 1)) : (g(), a("div", ar, [C.value ? (g(), a("div", or, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (g(), a("p", sr, x(S(d)("tasks_projects.settings.no_statuses")), 1)) : (g(), a("ul", cr, [(g(!0), a(e, null, y(m.value, (t, l) => (g(), a("li", {
				key: t.id,
				class: "py-3"
			}, [D.value === t.id ? (g(), a("div", lr, [
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
					default: E(() => [o("div", ur, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, dr)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, x(S(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", fr, [o("label", pr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", mr, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", hr, [c(j, {
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
			])) : (g(), a("div", gr, [
				o("span", {
					class: f(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: p(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", _r, x(t.name), 1),
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
				o("div", vr, [
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
					})], 8, yr),
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
					})], 8, br),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: S(d)("tasks_projects.general.edit"),
						"aria-label": S(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, xr),
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
					})], 8, Sr)
				])
			]))]))), 128))])), O.value ? (g(), a("div", Cr, [
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
					default: E(() => [o("div", wr, [(g(), a(e, null, y(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Tr)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Er, [o("label", Dr, [c(v, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_default")), 1)]), o("label", Or, [c(v, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + x(S(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", kr, [c(j, {
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
}), jr = { class: "space-y-6" }, Mr = "/admin/settings/modules", Nr = /* @__PURE__ */ l({
	__name: "TimeSettingsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = U();
		return (n, r) => {
			let i = b("BaseIcon"), o = b("BaseButton"), l = b("router-link"), u = b("BaseSettingCard");
			return g(), a("div", jr, [c(u, {
				title: S(t)("tasks_projects.settings.general_title"),
				description: S(t)("tasks_projects.settings.general_description")
			}, {
				action: E(() => [c(l, { to: Mr }, {
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
				default: E(() => [c(Ar, {
					client: e.client,
					notify: e.notify
				}, null, 8, ["client", "notify"])]),
				_: 1
			}, 8, ["title", "description"])]);
		};
	}
}), $ = "tasks-projects", Pr = `/admin/modules/${$}/time`;
function Fr(e) {
	e.addMessages(an);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		e.router.push(Pr);
	};
	e.registerPage({
		id: "time",
		module: $,
		path: "time",
		component: Rr(e, rr),
		meta: {
			ability: `${$}:view-own-time`,
			title: "tasks_projects.time.title"
		}
	}), e.registerHeaderAction({
		id: `${$}.timer-chip`,
		priority: 30,
		visible: () => X.running !== null,
		component: l({ setup: () => () => d(rn, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${$}.quick-start`,
		component: l({ setup: () => () => d(Zt, {
			key: Q.companySession,
			client: e.client,
			notify: t,
			enabled: !Q.adminMode,
			onOpenTimesheet: n
		}) })
	}), e.registerCompanySettingsPage({
		id: `${$}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: $,
		priority: 70,
		component: Rr(e, Nr)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		Ir(e, t);
	}), e.on("company:changing", () => {
		Lr();
	}), e.on("company:changed", ({ companyId: t }) => {
		Ir(e, t === null);
	});
}
async function Ir(e, t) {
	if (Yn(t), t) {
		Lr();
		return;
	}
	await qn(e.client), await X.refresh(e.client);
}
function Lr() {
	X.reset(), et(), Jn();
}
function Rr(e, t) {
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
//#region resources/js/init.ts
var zr = "tasks-projects";
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(A), n.registerPage({
		id: "projects",
		module: zr,
		path: "",
		component: Br(n, we),
		meta: {
			ability: `${zr}:view-project`,
			title: "tasks_projects.projects.title"
		}
	}), Fr(n);
});
function Br(e, t) {
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
