const { Fragment: e, Teleport: t, computed: n, createBlock: r, createCommentVNode: i, createElementBlock: a, createElementVNode: o, createTextVNode: s, createVNode: c, defineComponent: l, getCurrentInstance: u, h: d, nextTick: f, normalizeClass: p, normalizeStyle: m, onBeforeUnmount: h, onMounted: g, onScopeDispose: _, openBlock: v, reactive: y, ref: b, renderList: x, resolveComponent: S, toDisplayString: C, unref: w, vShow: T, watch: E, withCtx: D, withDirectives: O, withKeys: k, withModifiers: A } = window.__invoiceshelf_vue;
//#region resources/js/messages.ts
var j = { en: { tasks_projects: {
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
} } }, M = y({
	busy: !1,
	pending: null,
	allowed: !0,
	prompt: null
});
function N() {
	return !M.busy && (M.busy = !0, !0);
}
function P() {
	M.busy = !1;
}
function F(e) {
	M.pending = e;
}
function I() {
	M.pending = null;
}
function L() {
	M.allowed = !1;
}
function R(e) {
	return z(null), new Promise((t) => {
		M.prompt = {
			suggested: e,
			resolve: t
		};
	});
}
function z(e) {
	let t = M.prompt;
	t !== null && (M.prompt = null, t.resolve(e));
}
function ee() {
	z(null), M.busy = !1, M.pending = null, M.allowed = !0;
}
//#endregion
//#region resources/js/support/i18n.ts
function B() {
	return u()?.appContext.config.globalProperties.$t ?? ((e) => e);
}
//#endregion
//#region resources/js/components/InvoiceNumberModal.vue?vue&type=script&setup=true&lang.ts
var te = { class: "flex w-full items-center justify-between" }, ne = { class: "space-y-5 px-6 py-6" }, re = { class: "text-sm text-muted" }, ie = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, ae = /* @__PURE__ */ l({
	__name: "InvoiceNumberModal",
	setup(e) {
		let t = B(), i = b(""), a = n(() => M.prompt !== null), l = n(() => i.value.trim() !== "");
		E(() => M.prompt, (e) => {
			i.value = e?.suggested ?? "";
		});
		function u() {
			l.value && z(i.value.trim());
		}
		function d() {
			z(null);
		}
		return (e, n) => {
			let f = S("BaseIcon"), p = S("BaseInput"), m = S("BaseInputGroup"), h = S("BaseButton"), g = S("BaseModal");
			return v(), r(g, {
				show: a.value,
				onClose: d
			}, {
				header: D(() => [o("div", te, [o("span", null, C(w(t)("tasks_projects.billing.number.title")), 1), c(f, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: d
				})])]),
				default: D(() => [o("form", { onSubmit: A(u, ["prevent"]) }, [o("div", ne, [o("p", re, C(w(t)("tasks_projects.billing.number.description")), 1), c(m, {
					label: w(t)("tasks_projects.billing.number.label"),
					required: ""
				}, {
					default: D(() => [c(p, {
						modelValue: i.value,
						"onUpdate:modelValue": n[0] ||= (e) => i.value = e,
						type: "text",
						name: "invoice_number",
						autocomplete: "off"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"])]), o("div", ie, [c(h, {
					type: "button",
					variant: "primary-outline",
					onClick: d
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(h, {
					type: "submit",
					variant: "primary",
					disabled: !l.value
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.billing.number.save")), 1)]),
					_: 1
				}, 8, ["disabled"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), oe = { en: { tasks_projects: { billing: {
	title: "Unbilled time",
	subtitle: "Time that has not reached an invoice yet, by customer.",
	back: "Back to customers",
	create: "Create invoice",
	busy: "Creating the invoice",
	prepare_failed: "Unable to prepare the invoice.",
	create_failed: "Unable to create the invoice.",
	rate_failed: "Unable to read the exchange rate; the invoice was created without one.",
	forbidden: "You are not allowed to invoice time.",
	nothing_to_invoice: "No unbilled billable time on the selected tasks.",
	mixed_customers: "Select tasks of one customer. This selection spans {count} customers.",
	mixed_selection: "One invoice covers one customer in one currency. Narrow the selection.",
	pending_stamp: "Finish marking the last invoice as billed before creating another one.",
	created: "Invoice {number} was created.",
	stamped: "{count} time entry was marked as invoiced. | {count} time entries were marked as invoiced.",
	stamp_failed: "Unable to mark the time as invoiced.",
	stamp_failed_notice: "Invoice {number} was created, but its time is not marked as invoiced yet.",
	stamp_unmatched: "Invoice {number} was created, but its lines could not be matched back to the time behind them.",
	number: {
		title: "Invoice number",
		description: "This company numbers its invoices by hand, so the draft needs a number before it can be created.",
		label: "Number",
		save: "Create invoice"
	},
	retry: {
		title: "The invoice was created, but the time is not marked yet",
		description: "Invoice {number} exists. Its time entries still count as unbilled until they are marked, which is safe to run again.",
		action: "Retry stamping",
		open_invoice: "Open the invoice",
		dismiss: "Forget this invoice",
		dismiss_confirm: "Forget this invoice? Its time stays unbilled and can reach a second invoice."
	},
	customer: {
		title: "Who has time waiting?",
		description: "Customers with billable time that has not reached an invoice yet.",
		entries: "{count} entry | {count} entries",
		empty_title: "Nothing to invoice",
		empty_description: "Billable time appears here once it has been logged against a task that belongs to a customer.",
		load_failed: "Unable to load the customers with unbilled time.",
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
	}
} } } }, se = "/api/v1/tasks-projects", ce = {
	customers: `${se}/billing/customers`,
	unbilled: `${se}/billing/unbilled`,
	prepare: `${se}/billing/prepare`,
	confirm: `${se}/billing/confirm`
}, le = {
	bootstrap: "/api/v1/bootstrap",
	customer: (e) => `/api/v1/customers/${e}`,
	invoices: "/api/v1/invoices",
	invoiceTemplates: "/api/v1/invoices/templates",
	nextNumber: "/api/v1/next-number",
	exchangeRate: (e) => `/api/v1/currencies/${e}/exchange-rate`
};
async function ue(e, t = {}) {
	let { data: n } = await e.get(ce.customers, { params: t });
	return n.data ?? [];
}
async function de(e, t, n = {}) {
	let { data: r } = await e.get(ce.unbilled, { params: {
		customer_id: t,
		...n
	} });
	return r.data;
}
async function fe(e, t) {
	let { data: n } = await e.post(ce.prepare, pe(t));
	return n.data;
}
function pe(e) {
	let t = "taskIds" in e ? { task_ids: e.taskIds } : "projectId" in e ? { project_id: e.projectId } : { entry_ids: e.entryIds };
	return e.grouping !== void 0 && (t.grouping = e.grouping), t;
}
async function me(e, t, n) {
	let { data: r } = await e.post(ce.confirm, {
		invoice_id: t,
		items: n
	});
	return r?.stamped ?? 0;
}
async function he(e, t) {
	let { data: n } = await e.get(le.customer(t));
	return n?.data ?? null;
}
async function ge(e, t) {
	let { data: n } = await e.post(le.invoices, t);
	return n.data;
}
async function _e(e) {
	let { data: t } = await e.get(le.invoiceTemplates);
	return t?.invoiceTemplates ?? [];
}
async function ve(e, t) {
	let n = { key: "invoice" };
	t !== void 0 && (n.userId = t);
	let { data: r } = await e.get(le.nextNumber, { params: n });
	return r?.success && typeof r.nextNumber == "string" ? r.nextNumber : null;
}
async function ye(e, t) {
	let { data: n } = await e.get(le.exchangeRate(t)), r = Array.isArray(n?.exchangeRate) ? n.exchangeRate[0] : n?.exchangeRate, i = Number(r);
	return Number.isFinite(i) && i > 0 ? i : null;
}
async function be(e) {
	let { data: t } = await e.get(le.bootstrap), n = t?.current_company_settings ?? {}, r = t?.current_user_settings ?? {}, i = Number(n.invoice_due_date_days), a = r.default_invoice_template;
	return {
		currency: t?.current_company_currency ?? null,
		dueDateDays: Number.isFinite(i) && i >= 0 ? i : 0,
		setDueDateAutomatically: n.invoice_set_due_date_automatically === "YES",
		autoGenerateNumber: n.invoice_auto_generate !== "NO",
		defaultTemplate: typeof a == "string" && a !== "" ? a : null
	};
}
//#endregion
//#region resources/js/api/time.ts
var xe = "/api/v1/tasks-projects", Se = {
	timeEntries: `${xe}/time-entries`,
	timeEntry: (e) => `${xe}/time-entries/${e}`,
	timer: `${xe}/timer`,
	timerStart: `${xe}/timer/start`,
	timerStop: `${xe}/timer/stop`,
	taskStatuses: `${xe}/task-statuses`,
	taskStatus: (e) => `${xe}/task-statuses/${e}`,
	reorderTaskStatuses: `${xe}/task-statuses/reorder`,
	tasks: `${xe}/tasks`,
	task: (e) => `${xe}/tasks/${e}`,
	members: `${xe}/members`,
	settings: `${xe}/settings`
}, Ce = { bootstrap: "/api/v1/bootstrap" }, we = 100, Te = 5, Ee = 10;
async function De(e, t) {
	let { data: n } = await e.get(Se.timeEntries, { params: t });
	return n;
}
async function Oe(e, t) {
	let n = [];
	for (let r = 1; r <= Te; r += 1) {
		let i = await De(e, {
			...t,
			page: r,
			limit: we
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function ke(e, t) {
	let { data: n } = await e.post(Se.timeEntries, t);
	return n.data;
}
async function Ae(e, t, n) {
	let { data: r } = await e.put(Se.timeEntry(t), n);
	return r.data;
}
async function je(e, t) {
	await e.delete(Se.timeEntry(t));
}
async function Me(e) {
	let { data: t } = await e.get(Se.timer);
	return t?.data ?? null;
}
async function Ne(e, t) {
	let { data: n } = await e.post(Se.timerStart, t);
	return n.data;
}
async function Pe(e, t = {}) {
	let { data: n } = await e.post(Se.timerStop, t);
	return n.data;
}
async function Fe(e) {
	await e.delete(Se.timer);
}
async function Ie(e) {
	let { data: t } = await e.get(Se.taskStatuses);
	return t.data ?? [];
}
async function Le(e, t) {
	let { data: n } = await e.post(Se.taskStatuses, t);
	return n.data;
}
async function Re(e, t, n) {
	let { data: r } = await e.put(Se.taskStatus(t), n);
	return r.data;
}
async function ze(e, t) {
	await e.delete(Se.taskStatus(t));
}
async function Be(e, t) {
	let { data: n } = await e.post(Se.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function Ve(e, t, n = {}) {
	let r = { limit: n.limit ?? Ee };
	t.trim() !== "" && (r.search = t.trim()), typeof n.projectId == "number" && (r.project_id = n.projectId), n.invoiced !== void 0 && (r.invoiced = n.invoiced);
	let { data: i } = await e.get(Se.tasks, { params: r });
	return i.data ?? [];
}
async function He(e, t) {
	let { data: n } = await e.get(Se.task(t));
	return n.data;
}
async function Ue(e) {
	let { data: t } = await e.get(Se.settings);
	return t.data;
}
async function We(e) {
	let { data: t } = await e.get(Ce.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var Ge = y({}), Ke = /* @__PURE__ */ new Set(), qe = 5, Je = {
	logged_minutes: 0,
	billable_minutes: 0,
	unbilled_minutes: 0,
	unbilled_amount: 0,
	invoiced: "none",
	running: []
}, Ye = b(0), Xe = y({});
function Ze(e) {
	return e === null ? "" : Ge[e] ?? `#${e}`;
}
function Qe(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (Ge[e.id] = e.name);
}
async function $e(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && Ge[e] === void 0 && !Ke.has(e));
	for (let e of n) Ke.add(e);
	for (let t = 0; t < n.length; t += qe) await Promise.all(n.slice(t, t + qe).map(async (t) => {
		try {
			Qe(await He(e, t));
		} catch {} finally {
			Ke.delete(t);
		}
	}));
}
var et = Ye;
function V() {
	Ye.value += 1;
}
function tt(e, t) {
	Xe[e] = {
		...Xe[e] ?? {},
		...t
	};
}
function nt(e) {
	if (!e || typeof e.id != "number") return Je;
	let t = e.time ?? Je;
	return {
		...Je,
		...t,
		running: Array.isArray(t.running) ? t.running : [],
		...Xe[e.id] ?? {}
	};
}
function rt() {
	for (let e of Object.keys(Ge)) delete Ge[Number(e)];
	for (let e of Object.keys(Xe)) delete Xe[Number(e)];
	Ke.clear();
}
//#endregion
//#region resources/js/support/errors.ts
function it(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function H(e, t) {
	let n = it(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function at(e) {
	let t = it(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function ot(e) {
	return e === null ? "" : String(e / 100);
}
function st(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function ct(e) {
	return e === null ? "" : String(e / 60);
}
function lt(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function ut(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function dt(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
function ft(e) {
	let t = Math.max(0, Math.round(e ?? 0)), n = Math.floor(t / 60), r = t % 60;
	return n === 0 ? `${r}m` : r === 0 ? `${n}h` : `${n}h ${r}m`;
}
function pt(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : (t[0].charAt(0) + (t.length > 1 ? t[t.length - 1].charAt(0) : "")).toUpperCase();
}
function mt(e) {
	if (!e) return !1;
	let t = /* @__PURE__ */ new Date(), n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
	return e.slice(0, 10) < n;
}
//#endregion
//#region resources/js/support/http.ts
function ht(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function gt(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.data;
	if (typeof t != "object" || !t) return null;
	let n = t.error;
	return typeof n == "string" && n !== "" ? n : null;
}
function _t(e) {
	return ht(e) === 409;
}
function vt(e) {
	return ht(e) === 403;
}
//#endregion
//#region resources/js/support/invoicing.ts
var yt = "/admin/invoices";
async function bt(e, t) {
	let { notify: n, t: r } = e;
	if (M.pending !== null) return n("warning", r("tasks_projects.billing.pending_stamp")), !1;
	if (!N()) return !1;
	try {
		return await Ct(e, t);
	} finally {
		P();
	}
}
async function xt(e, t, n) {
	let r = M.pending;
	if (r === null || !N()) return !1;
	try {
		let i = await me(e, r.invoiceId, r.items);
		return I(), V(), t("success", n("tasks_projects.billing.stamped", { count: i })), !0;
	} catch (e) {
		return t("error", H(e, n("tasks_projects.billing.stamp_failed"))), !1;
	} finally {
		P();
	}
}
function St(e) {
	return `${yt}/${e}/view`;
}
async function Ct(e, t) {
	let { client: n, notify: r, t: i } = e, a;
	try {
		a = await fe(n, t);
	} catch (t) {
		return wt(e, t), !1;
	}
	if (!Array.isArray(a.items) || a.items.length === 0) return r("warning", i("tasks_projects.billing.nothing_to_invoice")), !1;
	let [o, s, c] = await Promise.all([
		be(n).catch(() => null),
		_e(n).catch(() => []),
		he(n, a.customer_id).catch(() => null)
	]), l = c?.currency_id ?? c?.currency?.id ?? a.currency_id, u = o?.currency?.id ?? null, d = u !== null && l !== null && l !== u, f = await Et(e, o, a.customer_id);
	if (f === null) return !1;
	let p = null;
	d && l !== null && (p = await ye(n, l).catch(() => null), p === null && r("warning", i("tasks_projects.billing.rate_failed")));
	let m = Ot(a, {
		invoiceNumber: f,
		currencyId: l,
		exchangeRate: p,
		dueDate: Dt(a.invoice_date, o),
		templateName: o?.defaultTemplate ?? s[0]?.name ?? ""
	}), h;
	try {
		h = await ge(n, m);
	} catch (e) {
		return r("error", H(e, i("tasks_projects.billing.create_failed"))), !1;
	}
	let g = await kt(e, h, a);
	return V(), g ? (r("success", i("tasks_projects.billing.created", { number: h.invoice_number })), await jt(e.router, h.id), !0) : !1;
}
function wt(e, t) {
	let { notify: n, t: r } = e, i = gt(t);
	if (i === "mixed_billing_selection") {
		let e = Tt(t);
		n("error", e > 1 ? r("tasks_projects.billing.mixed_customers", { count: e }) : H(t, r("tasks_projects.billing.mixed_selection")));
		return;
	}
	if (i === "nothing_to_invoice") {
		n("warning", r("tasks_projects.billing.nothing_to_invoice"));
		return;
	}
	if (ht(t) === 403) {
		L(), n("error", r("tasks_projects.billing.forbidden"));
		return;
	}
	n("error", H(t, r("tasks_projects.billing.prepare_failed")));
}
function Tt(e) {
	if (typeof e != "object" || !e) return 0;
	let t = e.response?.data;
	if (typeof t != "object" || !t) return 0;
	let n = t.customer_ids;
	return Array.isArray(n) ? n.length : 0;
}
async function Et(e, t, n) {
	let r = await ve(e.client, n).catch(() => null);
	return t?.autoGenerateNumber !== !1 && r !== null ? r : R(r ?? "");
}
function Dt(e, t) {
	if (t === null || !t.setDueDateAutomatically) return null;
	let n = /* @__PURE__ */ new Date(`${e}T00:00:00`);
	return Number.isNaN(n.getTime()) ? null : (n.setDate(n.getDate() + t.dueDateDays), dt(n));
}
function Ot(e, t) {
	return {
		invoice_date: e.invoice_date,
		due_date: t.dueDate,
		customer_id: e.customer_id,
		invoice_number: t.invoiceNumber,
		currency_id: t.currencyId,
		exchange_rate: t.exchangeRate,
		discount: e.discount,
		discount_type: e.discount_type,
		discount_val: e.discount_val,
		tax: e.tax,
		sub_total: e.sub_total,
		total: e.total,
		tax_included: !1,
		notes: e.notes,
		template_name: t.templateName,
		items: e.items.map((e) => ({ ...e })),
		taxes: []
	};
}
async function kt(e, t, n) {
	let { client: r, notify: i, t: a } = e, o = At(t, n);
	if (o.length === 0) return i("error", a("tasks_projects.billing.stamp_unmatched", { number: t.invoice_number })), await jt(e.router, t.id), !1;
	try {
		return await me(r, t.id, o), !0;
	} catch (e) {
		return F({
			invoiceId: t.id,
			invoiceNumber: t.invoice_number,
			items: o
		}), i("error", H(e, a("tasks_projects.billing.stamp_failed_notice", { number: t.invoice_number }))), !1;
	}
}
function At(e, t) {
	let n = Array.isArray(e.items) ? e.items : [], r = Array.isArray(t.groups) ? t.groups : [], i = [];
	return r.forEach((e, t) => {
		let r = n[t];
		r && typeof r.id == "number" && e.entry_ids.length > 0 && i.push({
			invoice_item_id: r.id,
			entry_ids: e.entry_ids
		});
	}), i;
}
async function jt(e, t) {
	await Mt(e, `${yt}/${t}/edit`) || await Mt(e, St(t));
}
async function Mt(e, t) {
	try {
		return !await e.push(t);
	} catch {
		return !1;
	}
}
//#endregion
//#region resources/js/components/InvoiceRetryBanner.vue?vue&type=script&setup=true&lang.ts
var Nt = {
	key: 0,
	class: "mt-4 rounded-xl border border-status-yellow bg-surface p-5",
	role: "alert"
}, Pt = { class: "text-sm font-semibold text-heading" }, Ft = { class: "mt-1 text-sm text-muted" }, It = { class: "mt-4 flex flex-wrap items-center gap-3" }, Lt = /* @__PURE__ */ l({
	__name: "InvoiceRetryBanner",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(e) {
		let t = e, r = B(), l = b(!1), u = n(() => M.pending);
		async function d() {
			if (!l.value) {
				l.value = !0;
				try {
					await xt(t.client, t.notify, r);
				} finally {
					l.value = !1;
				}
			}
		}
		function f() {
			window.confirm(r("tasks_projects.billing.retry.dismiss_confirm")) && I();
		}
		return (e, t) => {
			let n = S("BaseButton"), p = S("router-link");
			return u.value ? (v(), a("div", Nt, [
				o("p", Pt, C(w(r)("tasks_projects.billing.retry.title")), 1),
				o("p", Ft, C(w(r)("tasks_projects.billing.retry.description", { number: u.value.invoiceNumber })), 1),
				o("div", It, [
					c(n, {
						variant: "primary",
						loading: l.value,
						disabled: l.value,
						onClick: d
					}, {
						default: D(() => [s(C(w(r)("tasks_projects.billing.retry.action")), 1)]),
						_: 1
					}, 8, ["loading", "disabled"]),
					c(p, { to: w(St)(u.value.invoiceId) }, {
						default: D(() => [c(n, { variant: "white" }, {
							default: D(() => [s(C(w(r)("tasks_projects.billing.retry.open_invoice")), 1)]),
							_: 1
						})]),
						_: 1
					}, 8, ["to"]),
					o("button", {
						type: "button",
						class: "text-sm font-medium text-muted hover:underline",
						onClick: f
					}, C(w(r)("tasks_projects.billing.retry.dismiss")), 1)
				])
			])) : i("", !0);
		};
	}
}), Rt = "/api/v1/tasks-projects", zt = {
	projects: `${Rt}/projects`,
	project: (e) => `${Rt}/projects/${e}`,
	archiveProject: (e) => `${Rt}/projects/${e}/archive`,
	unarchiveProject: (e) => `${Rt}/projects/${e}/unarchive`,
	members: `${Rt}/members`,
	settings: `${Rt}/settings`
}, Bt = { customers: "/api/v1/customers" };
function Vt(e, t) {
	if (e === void 0 || e.order === "") return {};
	let n = t[e.fieldName];
	return n === void 0 ? {} : {
		sort_by: n,
		sort_order: e.order
	};
}
async function Ht(e, t) {
	let { data: n } = await e.get(zt.projects, { params: t });
	return n;
}
async function Ut(e, t) {
	let { data: n } = await e.post(zt.projects, t);
	return n.data;
}
async function Wt(e, t, n) {
	let { data: r } = await e.put(zt.project(t), n);
	return r.data;
}
async function Gt(e, t) {
	let { data: n } = await e.post(zt.archiveProject(t));
	return n.data;
}
async function Kt(e, t) {
	let { data: n } = await e.post(zt.unarchiveProject(t));
	return n.data;
}
async function qt(e, t) {
	await e.delete(zt.project(t));
}
async function Jt(e) {
	let { data: t } = await e.get(zt.members);
	return t.data;
}
async function Yt(e, t = 100) {
	let { data: n } = await e.get(Bt.customers, { params: { limit: t } });
	return n.data;
}
var Xt = y({}), Zt = !1, Qt = null;
function $t(e) {
	return e === null ? "" : Xt[e] ?? `#${e}`;
}
async function en(e) {
	Zt || (Qt ??= nn(e), await Qt);
}
function tn() {
	for (let e of Object.keys(Xt)) delete Xt[Number(e)];
	Zt = !1, Qt = null;
}
async function nn(e) {
	try {
		for (let t of await Yt(e, 200)) {
			let e = t?.id;
			typeof e == "number" && (Xt[e] = rn(t));
		}
		Zt = !0;
	} catch {} finally {
		Qt = null;
	}
}
function rn(e) {
	let t = typeof e.display_name == "string" ? e.display_name.trim() : "";
	if (t !== "") return t;
	let n = typeof e.name == "string" ? e.name.trim() : "";
	return n === "" ? `#${e.id}` : n;
}
//#endregion
//#region resources/js/support/page.ts
var U = "tasks-projects", an = `/admin/modules/${U}`, W = {
	tasks: an,
	board: `${an}/board`,
	week: `${an}/week`,
	task: (e) => `${an}/tasks/${e}`,
	projects: `${an}/projects`,
	project: (e) => `${an}/projects/${e}`,
	reports: `${an}/reports`,
	billing: `${an}/billing`,
	settings: "/admin/settings/modules",
	customer: (e) => `/admin/customers/${e}/view`
}, on = {
	tasks: `extension.page.${U}.tasks`,
	list: `extension.page.${U}.tasks.list`,
	board: `extension.page.${U}.tasks.board`,
	week: `extension.page.${U}.tasks.week`,
	task: `extension.page.${U}.task`,
	projects: `extension.page.${U}.projects`,
	project: `extension.page.${U}.project`
};
function sn(e, t) {
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
//#region resources/js/pages/UnbilledTimePage.vue?vue&type=script&setup=true&lang.ts
var cn = { class: "mt-2 text-sm text-muted" }, ln = { class: "flex flex-wrap items-center justify-end gap-3" }, un = { class: "mt-4 flex flex-wrap items-end gap-4" }, dn = {
	key: 0,
	class: "flex justify-center py-16"
}, fn = {
	key: 1,
	class: "mt-6"
}, pn = { class: "text-base font-semibold text-heading" }, mn = { class: "mt-1 text-sm text-muted" }, hn = {
	key: 0,
	class: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
}, gn = ["onClick"], _n = { class: "text-sm font-semibold text-heading" }, vn = { class: "mt-1 text-xs text-muted" }, yn = { class: "mt-3 text-xl font-semibold text-heading" }, bn = {
	key: 2,
	class: "mt-6"
}, xn = { class: "flex flex-wrap items-end justify-between gap-4" }, Sn = { class: "text-base font-semibold text-heading" }, Cn = { class: "mt-1 text-sm text-muted" }, wn = {
	key: 0,
	class: "flex justify-center py-16"
}, Tn = { class: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-default bg-surface-secondary px-4 py-3" }, En = { class: "flex cursor-pointer items-center gap-2 text-sm font-medium text-heading" }, Dn = ["checked"], On = { class: "text-sm text-muted" }, kn = { class: "flex flex-wrap items-center justify-between gap-3 bg-surface-secondary px-4 py-3" }, An = { class: "flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading" }, jn = ["checked", "onChange"], Mn = { class: "text-sm text-muted" }, Nn = { class: "overflow-x-auto" }, Pn = { class: "w-full table-auto" }, Fn = { class: "bg-surface text-xs tracking-wider text-muted uppercase" }, In = { class: "px-4 py-2 text-left font-medium" }, Ln = { class: "px-4 py-2 text-left font-medium" }, Rn = { class: "px-4 py-2 text-left font-medium" }, zn = { class: "px-4 py-2 text-left font-medium" }, Bn = { class: "px-4 py-2 text-right font-medium" }, Vn = { class: "px-4 py-2 text-right font-medium" }, Hn = { class: "divide-y divide-line-default bg-surface text-sm" }, Un = { class: "pl-4" }, Wn = ["checked", "onChange"], Gn = { class: "px-4 py-2 whitespace-nowrap text-muted" }, Kn = { class: "px-4 py-2" }, qn = { class: "block text-xs text-subtle" }, Jn = { class: "px-4 py-2 text-muted" }, Yn = { class: "px-4 py-2 text-muted" }, Xn = { class: "px-4 py-2 text-right whitespace-nowrap text-muted" }, Zn = { class: "px-4 py-2 text-right whitespace-nowrap text-heading" }, Qn = { class: "mt-5 flex flex-wrap items-center justify-between gap-4" }, $n = { class: "text-sm font-medium text-heading" }, er = { class: "flex items-center gap-3" }, tr = /* @__PURE__ */ l({
	__name: "UnbilledTimePage",
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
		], d = B(), f = b(!0), m = b([]), h = y({
			from: "",
			to: ""
		}), _ = b(null), T = b(null), O = b(!1), k = b("task"), A = b([]), j = n(() => M.busy), N = n(() => u.map((e) => ({
			id: e,
			label: d(`tasks_projects.billing.entries.group_by.${e}`)
		}))), P = n({
			get: () => N.value.find((e) => e.id === k.value) ?? N.value[0],
			set: (e) => {
				k.value = e.id;
			}
		}), F = n(() => (T.value?.entries ?? []).filter((e) => e.currency_id === (_.value?.currency_id ?? null))), I = n(() => {
			let e = {};
			for (let t of F.value) e[t.id] = t;
			return e;
		}), L = n(() => (T.value?.groups?.[k.value] ?? []).filter((e) => e.currency_id === (_.value?.currency_id ?? null))), R = n(() => F.value.length), z = n(() => R.value > 0 && A.value.length === R.value), ee = n(() => A.value.reduce((e, t) => e + (I.value[t]?.minutes ?? 0), 0)), te = n(() => A.value.reduce((e, t) => e + (I.value[t]?.amount ?? 0), 0)), ne = n(() => {
			let e = {};
			return h.from !== "" && (e.from = h.from), h.to !== "" && (e.to = h.to), e;
		});
		E(() => [h.from, h.to], () => void ie()), g(() => void re());
		async function re() {
			f.value = !0, await Promise.all([ae(), en(l.client)]), f.value = !1;
		}
		async function ie() {
			await ae(), _.value !== null && await fe(_.value);
		}
		async function ae() {
			try {
				m.value = await ue(l.client, ne.value);
			} catch (e) {
				m.value = [], l.notify("error", H(e, d("tasks_projects.billing.customer.load_failed")));
			}
		}
		function oe(e) {
			return $t(e);
		}
		function se() {
			h.from = "", h.to = "";
		}
		function ce(e) {
			h.from = e ? dt(e) : "";
		}
		function le(e) {
			h.to = e ? dt(e) : "";
		}
		async function fe(e) {
			_.value = e, O.value = !0, T.value = null, A.value = [];
			try {
				T.value = await de(l.client, e.customer_id, ne.value), A.value = F.value.map((e) => e.id);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.billing.entries.load_failed")));
			} finally {
				O.value = !1;
			}
		}
		function pe() {
			_.value = null, T.value = null, A.value = [], ae();
		}
		function me(e) {
			return A.value.includes(e);
		}
		function he(e) {
			A.value = me(e) ? A.value.filter((t) => t !== e) : [...A.value, e];
		}
		function ge() {
			A.value = z.value ? [] : F.value.map((e) => e.id);
		}
		function _e(e) {
			return e.entry_ids.length > 0 && e.entry_ids.every((e) => me(e));
		}
		function ve(e) {
			if (_e(e)) {
				A.value = A.value.filter((t) => !e.entry_ids.includes(t));
				return;
			}
			let t = e.entry_ids.filter((e) => !me(e));
			A.value = [...A.value, ...t];
		}
		function ye(e) {
			return e.entry_ids.map((e) => I.value[e]).filter((e) => e !== void 0);
		}
		async function be() {
			if (A.value.length === 0) {
				l.notify("warning", d("tasks_projects.billing.entries.none_selected"));
				return;
			}
			await bt({
				client: l.client,
				router: l.router,
				notify: l.notify,
				t: d
			}, {
				entryIds: [...A.value],
				grouping: k.value
			}) || await ie();
		}
		return (n, l) => {
			let u = S("BaseBreadcrumbItem"), g = S("BaseBreadcrumb"), y = S("BaseIcon"), b = S("BaseButton"), T = S("router-link"), E = S("BasePageHeader"), k = S("BaseDatePicker"), M = S("BaseInputGroup"), F = S("BaseSpinner"), I = S("BaseFormatMoney"), B = S("BaseEmptyPlaceholder"), ne = S("BaseSelectInput"), re = S("BasePage");
			return v(), r(re, null, {
				default: D(() => [
					c(E, { title: w(d)("tasks_projects.billing.title") }, {
						actions: D(() => [o("div", ln, [c(T, { to: w(W).reports }, {
							default: D(() => [c(b, { variant: "white" }, {
								left: D((e) => [c(y, {
									name: "ChartBarIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.reports.title")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"]), c(T, { to: w(W).projects }, {
							default: D(() => [c(b, { variant: "white" }, {
								left: D((e) => [c(y, {
									name: "FolderIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.projects.title")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"])])]),
						default: D(() => [c(g, null, {
							default: D(() => [
								c(u, {
									title: w(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(u, {
									title: w(d)("tasks_projects.tasks.title"),
									to: w(W).tasks
								}, null, 8, ["title", "to"]),
								c(u, {
									title: w(d)("tasks_projects.billing.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), o("p", cn, C(w(d)("tasks_projects.billing.subtitle")), 1)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("div", un, [
						c(M, {
							label: w(d)("tasks_projects.billing.customer.from"),
							class: "w-full sm:w-48"
						}, {
							default: D(() => [c(k, {
								"model-value": h.from,
								"onUpdate:modelValue": ce
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]),
						c(M, {
							label: w(d)("tasks_projects.billing.customer.to"),
							class: "w-full sm:w-48"
						}, {
							default: D(() => [c(k, {
								"model-value": h.to,
								"onUpdate:modelValue": le
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]),
						h.from !== "" || h.to !== "" ? (v(), r(b, {
							key: 0,
							variant: "primary-outline",
							onClick: se
						}, {
							default: D(() => [s(C(w(d)("tasks_projects.billing.customer.clear_range")), 1)]),
							_: 1
						})) : i("", !0)
					]),
					f.value ? (v(), a("div", dn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : _.value === null ? (v(), a("section", fn, [
						o("h2", pn, C(w(d)("tasks_projects.billing.customer.title")), 1),
						o("p", mn, C(w(d)("tasks_projects.billing.customer.description")), 1),
						m.value.length > 0 ? (v(), a("div", hn, [(v(!0), a(e, null, x(m.value, (e) => (v(), a("button", {
							key: `${e.customer_id}-${e.currency_id ?? "none"}`,
							type: "button",
							class: "rounded-xl border border-line-default bg-surface p-5 text-left transition hover:border-primary-500",
							onClick: (t) => fe(e)
						}, [
							o("p", _n, C(oe(e.customer_id)), 1),
							o("p", vn, C(w(d)("tasks_projects.billing.customer.entries", { count: e.entries })) + " · " + C(w(ft)(e.minutes)), 1),
							o("p", yn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						], 8, gn))), 128))])) : (v(), r(B, {
							key: 1,
							title: w(d)("tasks_projects.billing.customer.empty_title"),
							description: w(d)("tasks_projects.billing.customer.empty_description")
						}, {
							default: D(() => [c(y, {
								name: "BanknotesIcon",
								class: "mt-5 mb-4 h-16 w-16 text-subtle"
							})]),
							_: 1
						}, 8, ["title", "description"]))
					])) : (v(), a("section", bn, [o("div", xn, [o("div", null, [o("h2", Sn, C(w(d)("tasks_projects.billing.entries.title")), 1), o("p", Cn, C(oe(_.value.customer_id)), 1)]), c(M, {
						label: w(d)("tasks_projects.billing.entries.grouping"),
						class: "w-full sm:w-56"
					}, {
						default: D(() => [c(ne, {
							modelValue: P.value,
							"onUpdate:modelValue": l[0] ||= (e) => P.value = e,
							options: N.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])]), O.value ? (v(), a("div", wn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : R.value > 0 ? (v(), a(e, { key: 1 }, [
						o("div", Tn, [o("label", En, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: z.value,
							onChange: ge
						}, null, 40, Dn), s(" " + C(w(d)("tasks_projects.billing.entries.select_all")), 1)]), o("p", On, C(w(d)("tasks_projects.billing.entries.selected", {
							count: A.value.length,
							total: R.value
						})), 1)]),
						(v(!0), a(e, null, x(L.value, (t) => (v(), a("div", {
							key: `${t.label}-${t.key ?? "none"}-${t.currency_id ?? "none"}`,
							class: "mt-4 overflow-hidden rounded-xl border border-line-default"
						}, [o("div", kn, [o("label", An, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: _e(t),
							onChange: (e) => ve(t)
						}, null, 40, jn), s(" " + C(t.label), 1)]), o("p", Mn, [s(C(w(ft)(t.minutes)) + " · ", 1), c(I, { amount: t.amount }, null, 8, ["amount"])])]), o("div", Nn, [o("table", Pn, [o("thead", Fn, [o("tr", null, [
							l[1] ||= o("th", { class: "w-10" }, null, -1),
							o("th", In, C(w(d)("tasks_projects.billing.entries.columns.date")), 1),
							o("th", Ln, C(w(d)("tasks_projects.billing.entries.columns.task")), 1),
							o("th", Rn, C(w(d)("tasks_projects.billing.entries.columns.project")), 1),
							o("th", zn, C(w(d)("tasks_projects.billing.entries.columns.member")), 1),
							o("th", Bn, C(w(d)("tasks_projects.billing.entries.columns.duration")), 1),
							o("th", Vn, C(w(d)("tasks_projects.billing.entries.columns.amount")), 1)
						])]), o("tbody", Hn, [(v(!0), a(e, null, x(ye(t), (e) => (v(), a("tr", { key: e.id }, [
							o("td", Un, [o("input", {
								type: "checkbox",
								class: "h-4 w-4 cursor-pointer rounded border-line-strong",
								checked: me(e.id),
								onChange: (t) => he(e.id)
							}, null, 40, Wn)]),
							o("td", Gn, C(w(ut)(e.date)), 1),
							o("td", Kn, [c(T, {
								class: "text-heading hover:text-primary-500",
								to: w(W).task(e.task_id)
							}, {
								default: D(() => [s(C(e.task_name), 1)]),
								_: 2
							}, 1032, ["to"]), o("span", qn, C(e.description || w(d)("tasks_projects.billing.entries.no_description")), 1)]),
							o("td", Jn, C(e.project_name ?? "-"), 1),
							o("td", Yn, C(e.user_name), 1),
							o("td", Xn, C(w(ft)(e.minutes)), 1),
							o("td", Zn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						]))), 128))])])])]))), 128)),
						o("div", Qn, [o("p", $n, [s(C(w(d)("tasks_projects.billing.entries.selected_total", { hours: w(ft)(ee.value) })) + " · ", 1), c(I, { amount: te.value }, null, 8, ["amount"])]), o("div", er, [c(b, {
							variant: "primary-outline",
							disabled: j.value,
							onClick: pe
						}, {
							default: D(() => [s(C(w(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}, 8, ["disabled"]), c(b, {
							variant: "primary",
							loading: j.value,
							disabled: j.value || A.value.length === 0,
							onClick: be
						}, {
							left: D((e) => [j.value ? i("", !0) : (v(), r(y, {
								key: 0,
								name: "DocumentPlusIcon",
								class: p(e.class)
							}, null, 8, ["class"]))]),
							default: D(() => [s(" " + C(w(d)("tasks_projects.billing.create")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])])])
					], 64)) : (v(), r(B, {
						key: 2,
						title: w(d)("tasks_projects.billing.entries.empty_title"),
						description: w(d)("tasks_projects.billing.entries.empty_description")
					}, {
						actions: D(() => [c(b, {
							variant: "primary",
							onClick: pe
						}, {
							default: D(() => [s(C(w(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						})]),
						default: D(() => [c(y, {
							name: "ClockIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]))]))
				]),
				_: 1
			});
		};
	}
});
//#endregion
//#region resources/js/registrations/billing.ts
function nr(e) {
	e.addMessages(oe), e.registerPage({
		id: "billing",
		module: U,
		path: "billing",
		component: sn(e, tr),
		meta: {
			ability: `${U}:invoice-tasks`,
			title: "tasks_projects.billing.title"
		}
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.invoice-number`,
		component: l({ setup: () => () => d(ae) })
	}), e.on("company:changing", () => {
		ee();
	});
}
//#endregion
//#region resources/js/messages/projects.ts
var rr = { en: { tasks_projects: { project: {
	load_failed: "Unable to load the project.",
	customer: "Customer",
	identifier: "Identifier",
	due_date: "Due date",
	board: "Board",
	tasks: "Tasks",
	invoice_project: "Invoice project",
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
		title: "Time log",
		add_entry: "Add entry",
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
} } } }, ir = {
	board: `${Rt}/board`,
	tasks: `${Rt}/tasks`,
	task: (e) => `${Rt}/tasks/${e}`,
	moveTask: (e) => `${Rt}/tasks/${e}/move`,
	startTask: (e) => `${Rt}/tasks/${e}/start`,
	stopTask: (e) => `${Rt}/tasks/${e}/stop`,
	taskTimeLog: (e) => `${Rt}/tasks/${e}/time-log`,
	bulkTasks: `${Rt}/tasks/bulk`,
	taskStatuses: `${Rt}/task-statuses`,
	timeEntries: `${Rt}/time-entries`,
	projectMembers: (e) => `${Rt}/projects/${e}/members`,
	projectMember: (e, t) => `${Rt}/projects/${e}/members/${t}`
};
async function ar(e, t) {
	let { data: n } = await e.get(ir.board, { params: t });
	return n.data;
}
async function or(e) {
	let { data: t } = await e.get(ir.taskStatuses);
	return t.data;
}
async function sr(e, t) {
	let { data: n } = await e.get(ir.tasks, { params: t });
	return n;
}
async function cr(e, t) {
	let { data: n } = await e.post(ir.tasks, t);
	return n.data;
}
async function lr(e, t, n) {
	let { data: r } = await e.put(ir.task(t), n);
	return r.data;
}
async function ur(e, t) {
	await e.delete(ir.task(t));
}
async function dr(e, t) {
	let { data: n } = await e.get(ir.task(t));
	return n.data;
}
async function fr(e, t, n = null, r) {
	let i = {};
	n !== null && (i.description = n), r !== void 0 && (i.billable = r);
	let { data: a } = await e.post(ir.startTask(t), i);
	return a.data;
}
async function pr(e, t, n = {}) {
	let { data: r } = await e.post(ir.stopTask(t), n);
	return r.data;
}
async function mr(e, t) {
	let { data: n } = await e.get(ir.taskTimeLog(t));
	return n.data ?? [];
}
async function hr(e, t) {
	let { data: n } = await e.post(ir.bulkTasks, t);
	return {
		updated: n?.updated ?? [],
		failed: n?.failed ?? []
	};
}
async function gr(e, t, n) {
	let { data: r } = await e.post(ir.moveTask(t), n);
	return r.data;
}
async function _r(e, t) {
	let { data: n } = await e.get(zt.project(t));
	return n.data;
}
async function vr(e, t) {
	let { data: n } = await e.get(ir.projectMembers(t));
	return n.data;
}
async function yr(e, t, n) {
	let { data: r } = await e.post(ir.projectMembers(t), n);
	return r.data;
}
async function br(e, t, n) {
	await e.delete(ir.projectMember(t, n));
}
async function xr(e, t) {
	let { data: n } = await e.get(ir.timeEntries, { params: t });
	return n;
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var Sr = { class: "flex w-full items-center justify-between" }, Cr = { class: "space-y-5 px-6 py-6" }, wr = { class: "flex flex-wrap items-center gap-2" }, Tr = ["aria-label", "onClick"], Er = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, Dr = /* @__PURE__ */ l({
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
		], f = B(), h = y({
			name: "",
			identifier: "",
			description: "",
			colour: "",
			defaultRate: "",
			budgetHours: "",
			dueDate: ""
		}), g = b(null), _ = b([]), T = b(!1), O = b({}), k = b(!1), j = n(() => l.project !== null), M = n(() => j.value ? f("tasks_projects.projects.edit_project") : f("tasks_projects.projects.new_project"));
		E(() => l.show, (e) => {
			e && (N(), I());
		}, { immediate: !0 });
		function N() {
			let e = l.project;
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = ot(e?.default_rate ?? null), h.budgetHours = ct(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, g.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : _.value.find((t) => t.id === e) ?? null;
		}
		function F(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function I() {
			if (!T.value) try {
				let e = await Yt(l.client);
				_.value = e.map((e) => ({
					id: e.id,
					label: F(e)
				})), T.value = !0, g.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", H(e, f("tasks_projects.projects.customers_failed")));
			}
		}
		function L() {
			return {
				name: h.name.trim(),
				customer_id: g.value?.id ?? null,
				identifier: h.identifier.trim() || null,
				description: h.description.trim() || null,
				colour: h.colour || null,
				default_rate: st(h.defaultRate),
				budget_minutes: lt(h.budgetHours),
				due_date: h.dueDate || null
			};
		}
		function R(e) {
			h.dueDate = e ? dt(e) : "";
		}
		async function z() {
			if (!k.value) {
				if (h.name.trim() === "") {
					O.value = { name: f("tasks_projects.projects.name_required") };
					return;
				}
				k.value = !0, O.value = {};
				try {
					let e = l.project, t = e ? await Wt(l.client, e.id, L()) : await Ut(l.client, L());
					u("saved", t);
				} catch (e) {
					O.value = at(e), l.notify("error", H(e, f("tasks_projects.projects.save_failed")));
				} finally {
					k.value = !1;
				}
			}
		}
		return (n, i) => {
			let l = S("BaseIcon"), y = S("BaseInput"), b = S("BaseInputGroup"), T = S("BaseSelectInput"), E = S("BaseDatePicker"), N = S("BaseInputGrid"), P = S("BaseTextarea"), F = S("BaseButton"), I = S("BaseModal");
			return v(), r(I, {
				show: t.show,
				onClose: i[9] ||= (e) => u("close")
			}, {
				header: D(() => [o("div", Sr, [o("span", null, C(M.value), 1), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: i[0] ||= (e) => u("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(z, ["prevent"]) }, [o("div", Cr, [
					c(N, null, {
						default: D(() => [
							c(b, {
								label: w(f)("tasks_projects.projects.fields.name"),
								error: O.value.name,
								required: ""
							}, {
								default: D(() => [c(y, {
									modelValue: h.name,
									"onUpdate:modelValue": i[1] ||= (e) => h.name = e,
									invalid: !!O.value.name,
									type: "text"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(b, {
								label: w(f)("tasks_projects.projects.fields.identifier"),
								error: O.value.identifier,
								"help-text": w(f)("tasks_projects.projects.fields.identifier_help")
							}, {
								default: D(() => [c(y, {
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
							c(b, {
								label: w(f)("tasks_projects.projects.fields.customer"),
								error: O.value.customer_id,
								"help-text": w(f)("tasks_projects.projects.fields.customer_help")
							}, {
								default: D(() => [c(T, {
									modelValue: g.value,
									"onUpdate:modelValue": i[3] ||= (e) => g.value = e,
									options: _.value,
									placeholder: w(f)("tasks_projects.projects.fields.customer_placeholder"),
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
							c(b, {
								label: w(f)("tasks_projects.projects.fields.due_date"),
								error: O.value.due_date
							}, {
								default: D(() => [c(E, {
									"model-value": h.dueDate,
									"onUpdate:modelValue": R
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(b, {
								label: w(f)("tasks_projects.projects.fields.default_rate"),
								error: O.value.default_rate,
								"help-text": w(f)("tasks_projects.projects.fields.default_rate_help")
							}, {
								default: D(() => [c(y, {
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
							c(b, {
								label: w(f)("tasks_projects.projects.fields.budget_hours"),
								error: O.value.budget_minutes
							}, {
								default: D(() => [c(y, {
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
					c(b, {
						label: w(f)("tasks_projects.projects.fields.colour"),
						error: O.value.colour
					}, {
						default: D(() => [o("div", wr, [(v(), a(e, null, x(d, (e) => o("button", {
							key: e,
							type: "button",
							class: p(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: m({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, Tr)), 64)), o("button", {
							type: "button",
							class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
							onClick: i[6] ||= (e) => h.colour = ""
						}, C(w(f)("tasks_projects.projects.fields.colour_none")), 1)])]),
						_: 1
					}, 8, ["label", "error"]),
					c(b, {
						label: w(f)("tasks_projects.projects.fields.description"),
						error: O.value.description
					}, {
						default: D(() => [c(P, {
							modelValue: h.description,
							"onUpdate:modelValue": i[7] ||= (e) => h.description = e,
							row: 3,
							invalid: !!O.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Er, [c(F, {
					type: "button",
					variant: "primary-outline",
					onClick: i[8] ||= (e) => u("close")
				}, {
					default: D(() => [s(C(w(f)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(F, {
					type: "submit",
					variant: "primary",
					loading: k.value,
					disabled: k.value
				}, {
					default: D(() => [s(C(j.value ? w(f)("tasks_projects.general.update") : w(f)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), Or = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, kr = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body"
}, Ar = { key: 1 }, jr = { class: "text-body" }, Mr = {
	key: 2,
	class: "text-subtle"
}, Nr = { key: 3 }, Pr = { class: "text-body" }, Fr = { class: "flex items-center justify-end space-x-5" }, Ir = { class: "mt-6 flex overflow-x-auto border-b border-line-default" }, Lr = [
	"href",
	"aria-current",
	"onClick"
], Rr = {
	key: 0,
	class: "flex justify-center py-16"
}, zr = /* @__PURE__ */ l({
	__name: "ProjectDetailPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = on.project, d = B(), f = l.router, m = b(null), h = b(!0), _ = b(!1), y = b(!1), T = n(() => Number(l.id)), O = n(() => [
			{
				id: "overview",
				label: d("tasks_projects.project.tabs.overview"),
				name: `${u}.overview`
			},
			{
				id: "tasks",
				label: d("tasks_projects.project.tabs.tasks"),
				name: `${u}.tasks`
			},
			{
				id: "time",
				label: d("tasks_projects.project.tabs.time"),
				name: `${u}.time`
			},
			{
				id: "members",
				label: d("tasks_projects.project.tabs.members"),
				name: `${u}.members`
			}
		]), k = n(() => String(l.router.currentRoute.value.name ?? "")), A = n(() => m.value?.name ?? d("tasks_projects.projects.title")), j = n(() => ({
			path: W.board,
			query: { project: String(T.value) }
		})), N = n(() => $t(m.value?.customer_id ?? null)), P = n(() => M.busy), F = n(() => M.allowed && m.value !== null && m.value.customer_id !== null && (m.value.totals?.unbilled_amount ?? 0) > 0);
		E(T, () => {
			L();
		}), E(k, (e) => I(e)), g(() => {
			I(k.value), L();
		});
		function I(e) {
			e === u && l.router.replace({
				name: `${u}.overview`,
				params: { id: l.id }
			});
		}
		async function L() {
			h.value = !0;
			try {
				m.value = await _r(l.client, T.value), typeof m.value?.customer_id == "number" && await en(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.project.load_failed")));
			} finally {
				h.value = !1;
			}
		}
		function R(e) {
			return {
				name: e.name,
				params: { id: l.id }
			};
		}
		function z(e) {
			return k.value === e.name;
		}
		function ee(e) {
			y.value = !1, l.notify("success", d("tasks_projects.projects.updated", { name: e.name })), L();
		}
		async function te() {
			let e = m.value;
			e !== null && F.value && !P.value && (await bt({
				client: l.client,
				router: f,
				notify: l.notify,
				t: d
			}, { projectId: e.id }) || await L());
		}
		async function ne() {
			let e = m.value;
			if (!(e === null || _.value)) {
				_.value = !0;
				try {
					e.status === "ARCHIVED" ? (await Kt(l.client, e.id), l.notify("success", d("tasks_projects.projects.unarchived", { name: e.name }))) : (await Gt(l.client, e.id), l.notify("success", d("tasks_projects.projects.archived", { name: e.name }))), await L();
				} catch (e) {
					l.notify("error", H(e, d("tasks_projects.projects.save_failed")));
				} finally {
					_.value = !1;
				}
			}
		}
		function re(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function ie(e) {
			return d(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (n, l) => {
			let u = S("BaseBreadcrumbItem"), f = S("BaseBreadcrumb"), g = S("BaseBadge"), b = S("BaseIcon"), T = S("BaseButton"), E = S("router-link"), k = S("BasePageHeader"), M = S("BaseSpinner"), I = S("router-view"), B = S("BasePage");
			return v(), r(B, null, {
				default: D(() => [
					c(k, { title: A.value }, {
						actions: D(() => [o("div", Fr, [
							c(E, { to: j.value }, {
								default: D(() => [c(T, { variant: "white" }, {
									left: D((e) => [c(b, {
										name: "ViewColumnsIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(d)("tasks_projects.project.board")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							F.value ? (v(), r(T, {
								key: 0,
								variant: "primary-outline",
								loading: P.value,
								disabled: P.value,
								onClick: te
							}, {
								left: D((e) => [P.value ? i("", !0) : (v(), r(b, {
									key: 0,
									name: "BanknotesIcon",
									class: p(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.project.invoice_project")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							m.value ? (v(), r(T, {
								key: 1,
								variant: "primary-outline",
								loading: _.value,
								disabled: _.value,
								onClick: ne
							}, {
								default: D(() => [s(C(m.value.status === "ARCHIVED" ? w(d)("tasks_projects.projects.unarchive") : w(d)("tasks_projects.projects.archive")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							m.value ? (v(), r(T, {
								key: 2,
								variant: "primary",
								onClick: l[0] ||= (e) => y.value = !0
							}, {
								left: D((e) => [c(b, {
									name: "PencilIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
								_: 1
							})) : i("", !0)
						])]),
						default: D(() => [c(f, null, {
							default: D(() => [
								c(u, {
									title: w(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(u, {
									title: w(d)("tasks_projects.projects.title"),
									to: w(W).projects
								}, null, 8, ["title", "to"]),
								c(u, {
									title: A.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), m.value ? (v(), a("div", Or, [
							c(g, { class: p(["rounded-full", re(m.value.status)]) }, {
								default: D(() => [s(C(ie(m.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							m.value.identifier ? (v(), a("span", kr, C(m.value.identifier), 1)) : i("", !0),
							m.value.customer_id ? (v(), a("span", Ar, [s(C(w(d)("tasks_projects.project.customer")) + ": ", 1), o("span", jr, C(N.value), 1)])) : (v(), a("span", Mr, C(w(d)("tasks_projects.projects.internal")), 1)),
							m.value.due_date ? (v(), a("span", Nr, [s(C(w(d)("tasks_projects.project.due_date")) + ": ", 1), o("span", Pr, C(w(ut)(m.value.due_date)), 1)])) : i("", !0)
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("nav", Ir, [(v(!0), a(e, null, x(O.value, (e) => (v(), r(E, {
						key: e.id,
						to: R(e),
						custom: ""
					}, {
						default: D(({ href: t, navigate: n }) => [o("a", {
							href: t,
							"aria-current": z(e) ? "page" : void 0,
							class: p(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", z(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, C(e.label), 11, Lr)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					h.value && m.value === null ? (v(), a("div", Rr, [c(M, { class: "h-8 w-8 text-primary-500" })])) : (v(), r(I, {
						key: 1,
						project: m.value,
						onRefresh: L
					}, null, 8, ["project"])),
					c(Dr, {
						show: y.value,
						client: t.client,
						notify: t.notify,
						project: m.value,
						onClose: l[1] ||= (e) => y.value = !1,
						onSaved: ee
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
}), Br = { class: "flex items-center justify-end space-x-5" }, Vr = { class: "relative table-container" }, Hr = { class: "flex items-center" }, Ur = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, Wr = { key: 0 }, Gr = {
	key: 1,
	class: "text-subtle"
}, Kr = {
	key: 1,
	class: "text-subtle"
}, qr = { key: 0 }, Jr = {
	key: 1,
	class: "text-subtle"
}, Yr = 10, Xr = 350, Zr = /* @__PURE__ */ l({
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
		}, u = B(), d = b(null), f = b(!1), g = b(!0), _ = b(0), x = b(!1), k = b(null), A = b(null), j = y({
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
		}), P = n(() => [
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
		]), F = n(() => j.search.trim() !== "" || j.status !== "ACTIVE"), I = n(() => !g.value && _.value === 0 && !F.value), L;
		E(() => j.search, () => {
			clearTimeout(L), L = setTimeout(() => z(), Xr);
		}), E(() => j.status, () => z()), h(() => clearTimeout(L));
		async function R({ page: e, sort: n }) {
			let r = {
				page: e,
				limit: Yr,
				...Vt(n, l)
			};
			j.status !== "ALL" && (r.status = j.status), j.search.trim() !== "" && (r.search = j.search.trim()), g.value = !0;
			try {
				let e = await Ht(t.client, r);
				return _.value = e.meta.total, e.data.some((e) => e.customer_id !== null) && en(t.client), {
					data: e.data,
					pagination: {
						totalPages: e.meta.last_page,
						currentPage: e.meta.current_page,
						totalCount: e.meta.total,
						limit: e.meta.per_page
					}
				};
			} catch (e) {
				return t.notify("error", H(e, u("tasks_projects.projects.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Yr
					}
				};
			} finally {
				g.value = !1;
			}
		}
		function z(e = !1) {
			d.value?.refresh(e);
		}
		function ee() {
			f.value && te(), f.value = !f.value;
		}
		function te() {
			j.search = "", j.status = "ACTIVE";
		}
		function ne() {
			k.value = null, x.value = !0;
		}
		function re(e) {
			k.value = e, x.value = !0;
		}
		function ie(e) {
			let n = k.value ? u("tasks_projects.projects.updated", { name: e.name }) : u("tasks_projects.projects.created", { name: e.name });
			x.value = !1, k.value = null, t.notify("success", n), z();
		}
		async function ae(e) {
			A.value = e.id;
			try {
				e.status === "ARCHIVED" ? (await Kt(t.client, e.id), t.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await Gt(t.client, e.id), t.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), z(!0);
			} catch (e) {
				t.notify("error", H(e, u("tasks_projects.projects.save_failed")));
			} finally {
				A.value = null;
			}
		}
		async function oe(e) {
			if (window.confirm(u("tasks_projects.projects.delete_confirm", { name: e.name }))) {
				A.value = e.id;
				try {
					await qt(t.client, e.id), t.notify("success", u("tasks_projects.projects.deleted", { name: e.name })), z(!0);
				} catch (e) {
					t.notify("error", H(e, u("tasks_projects.projects.delete_failed")));
				} finally {
					A.value = null;
				}
			}
		}
		function se(e) {
			return e === "ACTIVE" ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!";
		}
		function ce(e) {
			return u(e === "ACTIVE" ? "tasks_projects.projects.status.active" : "tasks_projects.projects.status.archived");
		}
		return (t, n) => {
			let l = S("BaseBreadcrumbItem"), h = S("BaseBreadcrumb"), g = S("BaseIcon"), _ = S("BaseButton"), y = S("router-link"), b = S("BasePageHeader"), E = S("BaseInput"), F = S("BaseInputGroup"), L = S("BaseSelectInput"), z = S("BaseFilterWrapper"), B = S("BaseEmptyPlaceholder"), le = S("BaseBadge"), ue = S("BaseFormatMoney"), de = S("BaseDropdownItem"), fe = S("BaseDropdown"), pe = S("BaseTable"), me = S("BasePage");
			return v(), r(me, null, {
				default: D(() => [
					c(b, { title: w(u)("tasks_projects.projects.title") }, {
						actions: D(() => [o("div", Br, [
							c(y, { to: w(W).tasks }, {
								default: D(() => [c(_, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ClipboardDocumentListIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.tasks.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: w(W).reports }, {
								default: D(() => [c(_, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ChartBarIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.reports.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: w(W).billing }, {
								default: D(() => [c(_, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "BanknotesIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.billing.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(_, {
								variant: "primary-outline",
								onClick: ee
							}, {
								right: D((e) => [f.value ? (v(), r(g, {
									key: 1,
									name: "XMarkIcon",
									class: p(e.class)
								}, null, 8, ["class"])) : (v(), r(g, {
									key: 0,
									name: "FunnelIcon",
									class: p(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(C(w(u)("tasks_projects.general.filter")) + " ", 1)]),
								_: 1
							}),
							c(_, {
								variant: "primary",
								onClick: ne
							}, {
								left: D((e) => [c(g, {
									name: "PlusIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(u)("tasks_projects.projects.new_project")), 1)]),
								_: 1
							})
						])]),
						default: D(() => [c(h, null, {
							default: D(() => [c(l, {
								title: w(u)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(l, {
								title: w(u)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(z, {
						show: f.value,
						class: "mt-3",
						onClear: te
					}, {
						default: D(() => [c(F, {
							label: w(u)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(E, {
								modelValue: j.search,
								"onUpdate:modelValue": n[0] ||= (e) => j.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: w(u)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), c(F, {
							label: w(u)("tasks_projects.projects.columns.status"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(L, {
								modelValue: N.value,
								"onUpdate:modelValue": n[1] ||= (e) => N.value = e,
								options: M.value,
								"label-key": "label"
							}, null, 8, ["modelValue", "options"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}, 8, ["show"]),
					O(c(B, {
						title: w(u)("tasks_projects.projects.empty_title"),
						description: w(u)("tasks_projects.projects.empty_description")
					}, {
						actions: D(() => [c(_, {
							variant: "primary",
							onClick: ne
						}, {
							left: D((e) => [c(g, {
								name: "PlusIcon",
								class: p(e.class)
							}, null, 8, ["class"])]),
							default: D(() => [s(" " + C(w(u)("tasks_projects.projects.new_project")), 1)]),
							_: 1
						})]),
						default: D(() => [c(g, {
							name: "FolderIcon",
							class: "mt-5 mb-4 h-16 w-16 text-subtle"
						})]),
						_: 1
					}, 8, ["title", "description"]), [[T, I.value]]),
					O(o("div", Vr, [c(pe, {
						ref_key: "tableRef",
						ref: d,
						data: R,
						columns: P.value,
						class: "mt-3"
					}, {
						"cell-name": D(({ row: e }) => [o("div", Hr, [o("span", {
							class: p(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: m(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), o("span", null, [c(y, {
							class: "hover:text-primary-500",
							to: w(W).project(e.data.id)
						}, {
							default: D(() => [s(C(e.data.name), 1)]),
							_: 2
						}, 1032, ["to"]), e.data.identifier ? (v(), a("span", Ur, C(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": D(({ row: e }) => [c(le, { class: p(["rounded-full", se(e.data.status)]) }, {
							default: D(() => [s(C(ce(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": D(({ row: e }) => [e.data.customer_id ? (v(), a("span", Wr, C(w($t)(e.data.customer_id)), 1)) : (v(), a("span", Gr, C(w(u)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": D(({ row: e }) => [e.data.default_rate === null ? (v(), a("span", Kr, "-")) : (v(), r(ue, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": D(({ row: e }) => [e.data.due_date ? (v(), a("span", qr, C(w(ut)(e.data.due_date)), 1)) : (v(), a("span", Jr, "-"))]),
						"cell-actions": D(({ row: e }) => [c(fe, { "content-loading": A.value === e.data.id }, {
							activator: D(() => [c(g, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: D(() => [
								c(de, { onClick: (t) => re(e.data) }, {
									default: D(() => [c(g, {
										name: "PencilIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + C(w(u)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(de, { onClick: (t) => ae(e.data) }, {
									default: D(() => [c(g, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + C(e.data.status === "ARCHIVED" ? w(u)("tasks_projects.projects.unarchive") : w(u)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(de, { onClick: (t) => oe(e.data) }, {
									default: D(() => [c(g, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + C(w(u)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[T, !I.value]]),
					c(Dr, {
						show: x.value,
						client: e.client,
						notify: e.notify,
						project: k.value,
						onClose: n[2] ||= (e) => x.value = !1,
						onSaved: ie
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
}), Qr = { class: "py-4" }, $r = { class: "rounded-xl border border-line-default bg-surface p-5" }, ei = { class: "flex flex-col gap-4 lg:flex-row lg:items-end" }, ti = {
	key: 0,
	class: "mt-3 text-xs text-subtle"
}, ni = { class: "mt-4 overflow-hidden rounded-xl border border-line-default bg-surface" }, ri = {
	key: 0,
	class: "flex justify-center py-10"
}, ii = {
	key: 1,
	class: "px-5 py-8 text-center text-sm text-muted"
}, ai = {
	key: 2,
	class: "divide-y divide-line-light"
}, oi = { class: "text-sm font-medium text-heading" }, si = { class: "text-xs text-muted" }, ci = {
	key: 1,
	class: "text-subtle"
}, li = /* @__PURE__ */ l({
	__name: "ProjectMembersTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	setup(t) {
		let l = t, u = B(), d = b([]), f = b([]), m = b(!0), h = b(!1), _ = b(null), y = b(null), T = b(""), E = b({}), O = n(() => l.project?.id ?? Number(l.id)), k = n(() => f.value.filter((e) => !d.value.some((t) => t.user_id === e.id)).map((e) => ({
			id: e.id,
			label: e.name
		})));
		g(() => {
			A();
		});
		async function A() {
			m.value = !0;
			try {
				f.value = await Jt(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				d.value = await vr(l.client, O.value);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.project.members.load_failed")));
			} finally {
				m.value = !1;
			}
		}
		function j(e) {
			return f.value.find((t) => t.id === e)?.name ?? u("tasks_projects.project.time.removed_member");
		}
		async function M() {
			let e = y.value;
			if (!(e === null || h.value)) {
				h.value = !0, E.value = {};
				try {
					await yr(l.client, O.value, {
						user_id: e.id,
						rate: st(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), y.value = null, T.value = "", await A();
				} catch (e) {
					E.value = at(e), l.notify("error", H(e, u("tasks_projects.project.members.attach_failed")));
				} finally {
					h.value = !1;
				}
			}
		}
		async function N(e) {
			let t = j(e.user_id);
			if (window.confirm(u("tasks_projects.project.members.detach_confirm", { name: t }))) {
				_.value = e.user_id;
				try {
					await br(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", H(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					_.value = null;
				}
			}
		}
		return (t, n) => {
			let l = S("BaseSelectInput"), f = S("BaseInputGroup"), g = S("BaseInput"), b = S("BaseIcon"), O = S("BaseButton"), A = S("BaseSpinner"), P = S("BaseFormatMoney");
			return v(), a("div", Qr, [o("div", $r, [o("div", ei, [
				c(f, {
					label: w(u)("tasks_projects.project.members.member"),
					error: E.value.user_id,
					class: "flex-1"
				}, {
					default: D(() => [c(l, {
						modelValue: y.value,
						"onUpdate:modelValue": n[0] ||= (e) => y.value = e,
						options: k.value,
						placeholder: w(u)("tasks_projects.project.members.attach_placeholder"),
						"label-key": "label"
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "error"]),
				c(f, {
					label: w(u)("tasks_projects.project.members.rate"),
					error: E.value.rate,
					"help-text": w(u)("tasks_projects.project.members.rate_help"),
					class: "flex-1"
				}, {
					default: D(() => [c(g, {
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
					loading: h.value,
					disabled: h.value || y.value === null,
					onClick: M
				}, {
					left: D((e) => [c(b, {
						name: "PlusIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(u)("tasks_projects.project.members.attach")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			]), k.value.length === 0 && !m.value ? (v(), a("p", ti, C(w(u)("tasks_projects.project.members.all_attached")), 1)) : i("", !0)]), o("div", ni, [m.value ? (v(), a("div", ri, [c(A, { class: "h-6 w-6 text-primary-500" })])) : d.value.length === 0 ? (v(), a("p", ii, C(w(u)("tasks_projects.project.members.empty")), 1)) : (v(), a("ul", ai, [(v(!0), a(e, null, x(d.value, (e) => (v(), a("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [o("div", null, [o("p", oi, C(j(e.user_id)), 1), o("p", si, [s(C(w(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (v(), a("span", ci, C(w(u)("tasks_projects.tasks.none")), 1)) : (v(), r(P, {
				key: 0,
				amount: e.rate
			}, null, 8, ["amount"]))])]), c(O, {
				variant: "danger",
				size: "sm",
				loading: _.value === e.user_id,
				disabled: _.value === e.user_id,
				onClick: (t) => N(e)
			}, {
				default: D(() => [s(C(w(u)("tasks_projects.general.delete")), 1)]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"onClick"
			])]))), 128))]))])]);
		};
	}
}), ui = {
	key: 0,
	class: "py-6"
}, di = { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, fi = { class: "rounded-xl border border-line-default bg-surface p-5" }, pi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, mi = { class: "mt-2 text-2xl font-semibold text-heading" }, hi = { class: "mt-1 text-xs text-muted" }, gi = { class: "rounded-xl border border-line-default bg-surface p-5" }, _i = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, vi = { class: "mt-2 text-2xl font-semibold text-heading" }, yi = { class: "mt-1 text-xs text-muted" }, bi = { class: "rounded-xl border border-line-default bg-surface p-5" }, xi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Si = { class: "mt-2 text-2xl font-semibold text-heading" }, Ci = { class: "rounded-xl border border-line-default bg-surface p-5" }, wi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ti = { class: "mt-2 text-2xl font-semibold text-heading" }, Ei = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Di = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Oi = { class: "mt-2 text-sm text-body" }, ki = { class: "mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Ai = {
	key: 0,
	class: "mt-2 text-xs font-medium text-status-red"
}, ji = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Mi = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Ni = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Pi = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, Fi = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Ii = {
	key: 1,
	class: "flex justify-center py-16"
}, Li = /* @__PURE__ */ l({
	__name: "ProjectOverviewTab",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {},
		project: {}
	},
	emits: ["refresh"],
	setup(t, { emit: l }) {
		let u = t, d = l, f = B(), h = n(() => u.project?.totals ?? null), g = n(() => u.project?.budget_minutes ?? null), _ = n(() => {
			let e = g.value, t = h.value?.logged_minutes ?? 0;
			return e ? Math.min(100, Math.round(t / e * 100)) : 0;
		}), y = n(() => M.allowed && u.project?.customer_id !== null && (h.value?.unbilled_amount ?? 0) > 0), b = n(() => M.busy), x = n(() => {
			let e = g.value, t = h.value?.logged_minutes ?? 0;
			return e && t > e ? t - e : 0;
		});
		async function T() {
			let e = u.project;
			e !== null && y.value && !b.value && (await bt({
				client: u.client,
				router: u.router,
				notify: u.notify,
				t: f
			}, { projectId: e.id }) || d("refresh"));
		}
		return (n, l) => {
			let u = S("BaseFormatMoney"), d = S("BaseIcon"), E = S("BaseButton"), O = S("BaseSpinner");
			return t.project && h.value ? (v(), a("div", ui, [
				o("div", di, [
					o("div", fi, [
						o("p", pi, C(w(f)("tasks_projects.project.overview.tasks")), 1),
						o("p", mi, C(h.value.tasks.total), 1),
						o("p", hi, C(w(f)("tasks_projects.project.overview.open_tasks", { count: h.value.tasks.open })) + " · " + C(w(f)("tasks_projects.project.overview.closed_tasks", { count: h.value.tasks.closed })), 1)
					]),
					o("div", gi, [
						o("p", _i, C(w(f)("tasks_projects.project.overview.logged")), 1),
						o("p", vi, C(w(ft)(h.value.logged_minutes)), 1),
						o("p", yi, C(w(f)("tasks_projects.project.overview.billable")) + ": " + C(w(ft)(h.value.billable_minutes)), 1)
					]),
					o("div", bi, [o("p", xi, C(w(f)("tasks_projects.project.overview.billable_amount")), 1), o("p", Si, [c(u, { amount: h.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Ci, [
						o("p", wi, C(w(f)("tasks_projects.project.overview.unbilled_amount")), 1),
						o("p", Ti, [c(u, { amount: h.value.unbilled_amount }, null, 8, ["amount"])]),
						y.value ? (v(), r(E, {
							key: 0,
							class: "mt-2",
							variant: "primary-outline",
							size: "sm",
							loading: b.value,
							disabled: b.value,
							onClick: T
						}, {
							left: D((e) => [b.value ? i("", !0) : (v(), r(d, {
								key: 0,
								name: "BanknotesIcon",
								class: p(e.class)
							}, null, 8, ["class"]))]),
							default: D(() => [s(" " + C(w(f)("tasks_projects.project.invoice_project")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])) : i("", !0)
					])
				]),
				o("div", Ei, [o("p", Di, C(w(f)("tasks_projects.project.overview.budget")), 1), g.value ? (v(), a(e, { key: 0 }, [
					o("p", Oi, C(w(f)("tasks_projects.project.overview.budget_used", {
						used: w(ft)(h.value.logged_minutes),
						total: w(ft)(g.value)
					})), 1),
					o("div", ki, [o("div", {
						class: p(["h-2 rounded-full", x.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: m({ width: `${_.value}%` })
					}, null, 6)]),
					x.value > 0 ? (v(), a("p", Ai, C(w(f)("tasks_projects.project.overview.budget_over", { amount: w(ft)(x.value) })), 1)) : i("", !0)
				], 64)) : (v(), a("p", ji, C(w(f)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", Mi, [o("p", Ni, C(w(f)("tasks_projects.project.overview.description")), 1), t.project.description ? (v(), a("p", Pi, C(t.project.description), 1)) : (v(), a("p", Fi, C(w(f)("tasks_projects.project.overview.no_description")), 1))])
			])) : (v(), a("div", Ii, [c(O, { class: "h-8 w-8 text-primary-500" })]));
		};
	}
}), Ri = {
	project: "",
	user: "",
	status: "",
	search: ""
};
function zi(e) {
	return e === "uninvoiced" || e === "invoiced";
}
function Bi(e) {
	return {
		project: Ji(e.project),
		user: Ji(e.user),
		status: Yi(e.status),
		search: qi(e.search).slice(0, 200)
	};
}
function Vi(e) {
	let t = {};
	for (let n of [
		"project",
		"user",
		"status",
		"search"
	]) e[n] !== "" && (t[n] = e[n]);
	return t;
}
function Hi(e) {
	return e.project !== "" || e.user !== "" || e.status !== "" || e.search !== "";
}
function Ui(e) {
	return [
		e.project,
		e.user,
		e.status,
		e.search
	].join("|");
}
function Wi(e, t) {
	return e.project === t.project && e.user === t.user && e.status === t.status && e.search === t.search;
}
function Gi(e, t = {}) {
	let n = {}, r = t.projectId ?? Ki(e.project);
	r !== null && (n.project_id = r);
	let i = Ki(e.user);
	if (i !== null && (n.assignee_id = i), zi(e.status)) n.invoiced = +(e.status === "invoiced");
	else {
		let t = Ki(e.status);
		t !== null && (n.task_status_id = t);
	}
	return e.search !== "" && (n.search = e.search), n;
}
function Ki(e) {
	let t = Number(e);
	return e !== "" && Number.isInteger(t) && t > 0 ? t : null;
}
function qi(e) {
	let t = Array.isArray(e) ? e[0] : e;
	return typeof t == "string" ? t.trim() : "";
}
function Ji(e) {
	let t = qi(e);
	return Ki(t) === null ? "" : t;
}
function Yi(e) {
	let t = qi(e);
	return zi(t) ? t : Ji(e);
}
//#endregion
//#region resources/js/components/TaskFilters.vue?vue&type=script&setup=true&lang.ts
var Xi = { class: "mt-4 flex flex-wrap items-end gap-3" }, Zi = {
	key: 0,
	class: "min-w-44 flex-1"
}, Qi = { class: "mb-1 block text-xs font-medium text-muted" }, $i = { class: "min-w-44 flex-1" }, ea = { class: "mb-1 block text-xs font-medium text-muted" }, ta = { class: "min-w-44 flex-1" }, na = { class: "mb-1 block text-xs font-medium text-muted" }, ra = { class: "min-w-44 flex-1" }, ia = { class: "mb-1 block text-xs font-medium text-muted" }, aa = 350, oa = /* @__PURE__ */ l({
	__name: "TaskFilters",
	props: {
		modelValue: {},
		projects: {},
		members: {},
		statuses: {},
		lockProject: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = B(), u = b(r.modelValue.search), d, f = n(() => [{
			id: "",
			label: l("tasks_projects.tasks.filters.all_projects")
		}, ...r.projects.map((e) => ({
			id: String(e.id),
			label: e.name
		}))]), p = n(() => [{
			id: "",
			label: l("tasks_projects.tasks.filters.all_members")
		}, ...r.members.map((e) => ({
			id: String(e.id),
			label: e.name
		}))]), m = n(() => [
			{
				id: "",
				label: l("tasks_projects.tasks.filters.all_statuses")
			},
			...r.statuses.map((e) => ({
				id: String(e.id),
				label: e.name
			})),
			{
				id: "uninvoiced",
				label: l("tasks_projects.tasks.uninvoiced")
			},
			{
				id: "invoiced",
				label: l("tasks_projects.tasks.invoiced")
			}
		]), g = n({
			get: () => T(f.value, r.modelValue.project),
			set: (e) => D({ project: e?.id ?? "" })
		}), _ = n({
			get: () => T(p.value, r.modelValue.user),
			set: (e) => D({ user: e?.id ?? "" })
		}), y = n({
			get: () => T(m.value, r.modelValue.status),
			set: (e) => D({ status: e?.id ?? "" })
		}), x = n(() => Hi(r.modelValue));
		E(() => r.modelValue.search, (e) => {
			e !== u.value && (u.value = e);
		}), E(u, (e) => {
			clearTimeout(d), d = setTimeout(() => D({ search: e.trim() }), aa);
		}), h(() => clearTimeout(d));
		function T(e, t) {
			return e.find((e) => e.id === t) ?? e[0];
		}
		function D(e) {
			s("update:modelValue", {
				...r.modelValue,
				...e
			});
		}
		function O() {
			u.value = "", s("update:modelValue", { ...Ri });
		}
		return (t, n) => {
			let r = S("BaseSelectInput"), s = S("BaseInput");
			return v(), a("div", Xi, [
				e.lockProject ? i("", !0) : (v(), a("label", Zi, [o("span", Qi, C(w(l)("tasks_projects.tasks.filters.project")), 1), c(r, {
					modelValue: g.value,
					"onUpdate:modelValue": n[0] ||= (e) => g.value = e,
					options: f.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])])),
				o("label", $i, [o("span", ea, C(w(l)("tasks_projects.tasks.filters.member")), 1), c(r, {
					modelValue: _.value,
					"onUpdate:modelValue": n[1] ||= (e) => _.value = e,
					options: p.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", ta, [o("span", na, C(w(l)("tasks_projects.tasks.filters.status")), 1), c(r, {
					modelValue: y.value,
					"onUpdate:modelValue": n[2] ||= (e) => y.value = e,
					options: m.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", ra, [o("span", ia, C(w(l)("tasks_projects.tasks.filters.search")), 1), c(s, {
					modelValue: u.value,
					"onUpdate:modelValue": n[3] ||= (e) => u.value = e,
					type: "text",
					name: "search",
					autocomplete: "off",
					placeholder: w(l)("tasks_projects.tasks.search_placeholder")
				}, null, 8, ["modelValue", "placeholder"])]),
				x.value ? (v(), a("button", {
					key: 1,
					type: "button",
					class: "pb-2 text-sm font-medium text-primary-500 hover:underline",
					onClick: O
				}, C(w(l)("tasks_projects.tasks.bulk.clear")), 1)) : i("", !0)
			]);
		};
	}
}), sa = {
	key: 0,
	class: "mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2.5"
}, ca = { class: "text-sm font-medium text-primary-700" }, la = { class: "min-w-48" }, ua = /* @__PURE__ */ l({
	__name: "BulkActionBar",
	props: {
		count: {},
		statuses: {},
		busy: { type: Boolean },
		invoicing: {
			type: Boolean,
			default: !1
		},
		canInvoice: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"status",
		"delete",
		"invoice",
		"clear",
		"select-page"
	],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), f = b(null), m = n(() => l.statuses.map((e) => ({
			id: e.id,
			label: e.name
		})));
		return E(f, (e) => {
			e !== null && (u("status", e.id), f.value = null);
		}), (t, n) => {
			let l = S("BaseSelectInput"), h = S("BaseIcon"), g = S("BaseButton");
			return e.count > 0 ? (v(), a("div", sa, [
				o("span", ca, C(w(d)("tasks_projects.tasks.bulk.selected", { count: e.count })), 1),
				o("div", la, [c(l, {
					modelValue: f.value,
					"onUpdate:modelValue": n[0] ||= (e) => f.value = e,
					options: m.value,
					disabled: e.busy,
					placeholder: w(d)("tasks_projects.tasks.bulk.change_status"),
					"label-key": "label"
				}, null, 8, [
					"modelValue",
					"options",
					"disabled",
					"placeholder"
				])]),
				c(g, {
					variant: "primary-outline",
					size: "sm",
					disabled: e.busy,
					onClick: n[1] ||= (e) => u("delete")
				}, {
					left: D((e) => [c(h, {
						name: "TrashIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(d)("tasks_projects.tasks.bulk.delete")), 1)]),
					_: 1
				}, 8, ["disabled"]),
				e.canInvoice ? (v(), r(g, {
					key: 0,
					variant: "primary-outline",
					size: "sm",
					loading: e.invoicing,
					disabled: e.busy || e.invoicing,
					onClick: n[2] ||= (e) => u("invoice")
				}, {
					left: D((t) => [e.invoicing ? i("", !0) : (v(), r(h, {
						key: 0,
						name: "BanknotesIcon",
						class: p(t.class)
					}, null, 8, ["class"]))]),
					default: D(() => [s(" " + C(w(d)("tasks_projects.tasks.bulk.invoice")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : i("", !0),
				o("button", {
					type: "button",
					class: "ml-auto text-sm font-medium text-primary-600 hover:underline",
					onClick: n[3] ||= (e) => u("select-page")
				}, C(w(d)("tasks_projects.tasks.bulk.select_page")), 1),
				o("button", {
					type: "button",
					class: "text-sm font-medium text-primary-600 hover:underline",
					onClick: n[4] ||= (e) => u("clear")
				}, C(w(d)("tasks_projects.tasks.bulk.clear")), 1)
			])) : i("", !0);
		};
	}
}), da = /* @__PURE__ */ l({
	__name: "InvoicedBadge",
	props: { state: { default: "none" } },
	setup(e) {
		let t = e, a = B(), o = n(() => t.state === "invoiced" || t.state === "uninvoiced"), c = n(() => t.state === "invoiced" ? a("tasks_projects.tasks.invoiced") : a("tasks_projects.tasks.uninvoiced")), l = n(() => t.state === "invoiced" ? "bg-alert-success-bg! text-alert-success-text!" : "bg-alert-warning-bg! text-alert-warning-text!");
		return (e, t) => {
			let n = S("BaseBadge");
			return o.value ? (v(), r(n, {
				key: 0,
				class: p(["rounded-full whitespace-nowrap", l.value])
			}, {
				default: D(() => [s(C(c.value), 1)]),
				_: 1
			}, 8, ["class"])) : i("", !0);
		};
	}
}), fa = [
	"LOW",
	"NORMAL",
	"HIGH",
	"URGENT"
], pa = { class: "flex w-full items-center justify-between" }, ma = {
	key: 0,
	class: "ml-2 text-sm font-normal text-muted"
}, ha = { class: "space-y-5 px-6 py-6" }, ga = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, _a = { key: 1 }, va = { class: "flex space-x-3" }, ya = /* @__PURE__ */ l({
	__name: "TaskFormModal",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		task: {},
		statuses: {},
		members: {},
		projects: {},
		defaults: {},
		lockProject: { type: Boolean },
		compact: { type: Boolean }
	},
	emits: [
		"close",
		"saved",
		"deleted"
	],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), f = y({
			name: "",
			description: "",
			estimateHours: "",
			rate: "",
			dueDate: "",
			billable: !0
		}), p = b(null), m = b(null), h = b(null), g = b(null), _ = b(null), x = b({}), T = b(!1), O = b(!1), k = b(!1), j = n(() => !l.compact || k.value), M = n({
			get: () => R(l.projects, m.value),
			set: (e) => {
				m.value = e?.id ?? null;
			}
		}), N = n(() => l.task !== null), P = n(() => N.value ? d("tasks_projects.tasks.edit_task") : d("tasks_projects.tasks.new_task")), F = n(() => l.statuses.map((e) => ({
			id: e.id,
			label: e.name
		}))), I = n(() => l.members.map((e) => ({
			id: e.id,
			label: e.name
		}))), L = n(() => fa.map((e, t) => ({
			id: t,
			label: d(`tasks_projects.tasks.priority.${e.toLowerCase()}`)
		})));
		E(() => l.show, (e) => {
			e && z();
		}, { immediate: !0 });
		function R(e, t) {
			return t === null ? null : e.find((e) => e.id === t) ?? null;
		}
		function z() {
			let e = l.task;
			f.name = e?.name ?? "", f.description = e?.description ?? "", f.estimateHours = ct(e?.estimated_minutes ?? null), f.rate = ot(e?.rate ?? null), f.dueDate = e?.due_date ?? "", f.billable = e?.billable ?? !0;
			let t = l.statuses.find((e) => e.is_default) ?? l.statuses[0], n = e?.task_status_id ?? l.defaults?.task_status_id ?? t?.id ?? null;
			p.value = R(F.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = R(I.value, e?.assignee_id ?? null), g.value = e?.priority ? L.value[fa.indexOf(e.priority)] ?? null : null, _.value = e?.customer_id ?? null, x.value = {}, k.value = !1, _.value !== null && en(l.client);
		}
		function ee(e) {
			f.dueDate = e ? dt(e) : "";
		}
		function te() {
			let e = p.value?.id ?? null;
			if (e === null) return null;
			let t = g.value === null ? null : fa[g.value.id];
			return {
				name: f.name.trim(),
				task_status_id: e,
				project_id: m.value,
				customer_id: m.value === null ? _.value : null,
				description: f.description.trim() || null,
				assignee_id: h.value?.id ?? null,
				priority: t,
				due_date: f.dueDate || null,
				estimated_minutes: lt(f.estimateHours),
				billable: f.billable,
				rate: st(f.rate)
			};
		}
		async function ne() {
			if (T.value) return;
			if (f.name.trim() === "") {
				x.value = { name: d("tasks_projects.tasks.name_required") };
				return;
			}
			let e = te();
			if (e === null) {
				l.notify("error", d("tasks_projects.task_statuses.none"));
				return;
			}
			T.value = !0, x.value = {};
			try {
				let t = l.task, n = t ? await lr(l.client, t.id, e) : await cr(l.client, e);
				u("saved", n);
			} catch (e) {
				x.value = at(e), l.notify("error", re(e, "save_failed"));
			} finally {
				T.value = !1;
			}
		}
		function re(e, t) {
			return gt(e) === "task_locked" ? d("tasks_projects.tasks.locked") : H(e, d(`tasks_projects.tasks.${t}`));
		}
		async function ie() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await ur(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", re(e, "delete_failed"));
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, n) => {
			let l = S("BaseIcon"), m = S("BaseInput"), y = S("BaseInputGroup"), b = S("BaseSelectInput"), E = S("BaseDatePicker"), R = S("BaseInputGrid"), z = S("BaseSwitch"), B = S("BaseTextarea"), te = S("BaseButton"), re = S("BaseModal");
			return v(), r(re, {
				show: e.show,
				onClose: n[12] ||= (e) => u("close")
			}, {
				header: D(() => [o("div", pa, [o("span", null, [s(C(P.value) + " ", 1), e.task ? (v(), a("span", ma, "#" + C(e.task.number), 1)) : i("", !0)]), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: n[0] ||= (e) => u("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(ne, ["prevent"]) }, [o("div", ha, [
					c(y, {
						label: w(d)("tasks_projects.tasks.fields.name"),
						error: x.value.name,
						required: ""
					}, {
						default: D(() => [c(m, {
							modelValue: f.name,
							"onUpdate:modelValue": n[1] ||= (e) => f.name = e,
							invalid: !!x.value.name,
							type: "text"
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"]),
					c(R, null, {
						default: D(() => [
							e.lockProject ? i("", !0) : (v(), r(y, {
								key: 0,
								label: w(d)("tasks_projects.tasks.fields.project"),
								error: x.value.project_id,
								"help-text": w(d)("tasks_projects.tasks.fields.project_help")
							}, {
								default: D(() => [c(b, {
									modelValue: M.value,
									"onUpdate:modelValue": n[2] ||= (e) => M.value = e,
									options: e.projects,
									placeholder: w(d)("tasks_projects.tasks.fields.project_placeholder"),
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
							_.value === null ? i("", !0) : (v(), r(y, {
								key: 1,
								label: w(d)("tasks_projects.tasks.fields.customer"),
								"help-text": w(d)("tasks_projects.tasks.fields.customer_help")
							}, {
								default: D(() => [c(m, {
									"model-value": w($t)(_.value),
									type: "text",
									disabled: ""
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "help-text"])),
							c(y, {
								label: w(d)("tasks_projects.tasks.fields.status"),
								error: x.value.task_status_id
							}, {
								default: D(() => [c(b, {
									modelValue: p.value,
									"onUpdate:modelValue": n[3] ||= (e) => p.value = e,
									options: F.value,
									"label-key": "label"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(y, {
								label: w(d)("tasks_projects.tasks.fields.assignee"),
								error: x.value.assignee_id
							}, {
								default: D(() => [c(b, {
									modelValue: h.value,
									"onUpdate:modelValue": n[4] ||= (e) => h.value = e,
									options: I.value,
									placeholder: w(d)("tasks_projects.tasks.fields.assignee_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							j.value ? (v(), r(y, {
								key: 2,
								label: w(d)("tasks_projects.tasks.fields.priority"),
								error: x.value.priority
							}, {
								default: D(() => [c(b, {
									modelValue: g.value,
									"onUpdate:modelValue": n[5] ||= (e) => g.value = e,
									options: L.value,
									placeholder: w(d)("tasks_projects.tasks.fields.priority_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0),
							c(y, {
								label: w(d)("tasks_projects.tasks.fields.due_date"),
								error: x.value.due_date
							}, {
								default: D(() => [c(E, {
									"model-value": f.dueDate,
									"onUpdate:modelValue": ee
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							j.value ? (v(), r(y, {
								key: 3,
								label: w(d)("tasks_projects.tasks.fields.estimate_hours"),
								error: x.value.estimated_minutes
							}, {
								default: D(() => [c(m, {
									modelValue: f.estimateHours,
									"onUpdate:modelValue": n[6] ||= (e) => f.estimateHours = e,
									invalid: !!x.value.estimated_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0),
							j.value ? (v(), r(y, {
								key: 4,
								label: w(d)("tasks_projects.tasks.fields.rate"),
								error: x.value.rate,
								"help-text": w(d)("tasks_projects.tasks.fields.rate_help")
							}, {
								default: D(() => [c(m, {
									modelValue: f.rate,
									"onUpdate:modelValue": n[7] ||= (e) => f.rate = e,
									invalid: !!x.value.rate,
									type: "number",
									step: "0.01",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, [
								"label",
								"error",
								"help-text"
							])) : i("", !0)
						]),
						_: 1
					}),
					c(y, {
						label: w(d)("tasks_projects.tasks.fields.billable"),
						error: x.value.billable
					}, {
						default: D(() => [c(z, {
							modelValue: f.billable,
							"onUpdate:modelValue": n[8] ||= (e) => f.billable = e,
							class: "mt-1"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label", "error"]),
					j.value ? (v(), r(y, {
						key: 0,
						label: w(d)("tasks_projects.tasks.fields.description"),
						error: x.value.description
					}, {
						default: D(() => [c(B, {
							modelValue: f.description,
							"onUpdate:modelValue": n[9] ||= (e) => f.description = e,
							row: 3,
							invalid: !!x.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])) : i("", !0),
					e.compact ? (v(), a("button", {
						key: 1,
						type: "button",
						class: "flex items-center gap-1 text-sm font-medium text-primary-500 hover:underline",
						onClick: n[10] ||= (e) => k.value = !k.value
					}, [c(l, {
						name: k.value ? "ChevronUpIcon" : "ChevronDownIcon",
						class: "h-4 w-4"
					}, null, 8, ["name"]), s(" " + C(k.value ? w(d)("tasks_projects.tasks.fewer_fields") : w(d)("tasks_projects.tasks.all_fields")), 1)])) : i("", !0)
				]), o("div", ga, [N.value ? (v(), r(te, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: ie
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (v(), a("span", _a)), o("div", va, [c(te, {
					type: "button",
					variant: "primary-outline",
					onClick: n[11] ||= (e) => u("close")
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(te, {
					type: "submit",
					variant: "primary",
					loading: T.value,
					disabled: T.value
				}, {
					default: D(() => [s(C(N.value ? w(d)("tasks_projects.general.update") : w(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), ba = {
	default_rate: 0,
	rounding_minutes: 1,
	rounding_direction: "nearest",
	week_start: 1,
	members_see_all_time: !1,
	auto_start_tasks: !1,
	lock_invoiced_tasks: !1,
	hide_invoiced_on_board: !1,
	invoice_project_heading: !1,
	invoice_task_description: !0,
	invoice_entry_dates: !0,
	invoice_entry_times: !1,
	invoice_entry_hours: !0,
	invoice_entry_descriptions: !1,
	rounding_increments: [
		1,
		5,
		6,
		15,
		30,
		60
	]
}, G = y({
	adminMode: !1,
	userId: null,
	settings: { ...ba },
	companySession: 0,
	loading: !1
});
async function xa(e) {
	if (G.adminMode) return;
	G.loading = !0;
	let [t, n] = await Promise.all([We(e).catch(() => null), Ue(e).catch(() => null)]);
	G.userId = t, G.settings = wa(n), G.loading = !1;
}
function Sa() {
	G.userId = null, G.settings = { ...ba }, G.companySession += 1, G.loading = !1;
}
function Ca(e) {
	G.adminMode = e;
}
function wa(e) {
	if (typeof e != "object" || !e) return { ...ba };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : ba.rounding_increments;
	return {
		default_rate: Ta(e.default_rate, ba.default_rate),
		rounding_minutes: Ta(e.rounding_minutes, ba.rounding_minutes),
		rounding_direction: Da(e.rounding_direction),
		week_start: Oa(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		auto_start_tasks: Ea(e.auto_start_tasks, ba.auto_start_tasks),
		lock_invoiced_tasks: Ea(e.lock_invoiced_tasks, ba.lock_invoiced_tasks),
		hide_invoiced_on_board: Ea(e.hide_invoiced_on_board, ba.hide_invoiced_on_board),
		invoice_project_heading: Ea(e.invoice_project_heading, ba.invoice_project_heading),
		invoice_task_description: Ea(e.invoice_task_description, ba.invoice_task_description),
		invoice_entry_dates: Ea(e.invoice_entry_dates, ba.invoice_entry_dates),
		invoice_entry_times: Ea(e.invoice_entry_times, ba.invoice_entry_times),
		invoice_entry_hours: Ea(e.invoice_entry_hours, ba.invoice_entry_hours),
		invoice_entry_descriptions: Ea(e.invoice_entry_descriptions, ba.invoice_entry_descriptions),
		rounding_increments: t.length > 0 ? t : ba.rounding_increments
	};
}
function Ta(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function Ea(e, t) {
	return typeof e == "boolean" ? e : t;
}
function Da(e) {
	return e === "up" || e === "down" || e === "nearest" ? e : ba.rounding_direction;
}
function Oa(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : ba.week_start;
}
//#endregion
//#region resources/js/support/time.ts
var ka = 60, Aa = 60, ja = 7;
function Ma(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / Aa), i = t % Aa;
	return `${n}:${Xa(r)}:${Xa(i)}`;
}
function Na(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / ka)}:${Xa(t % ka)}`;
}
function Pa(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * ka + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * ka);
}
function Fa(e, t, n = "nearest") {
	let r = Number.isFinite(t) && t >= 1 ? Math.floor(t) : 1, i = Number.isFinite(e) ? Math.floor(e) : 0;
	return i <= 0 ? 0 : n === "up" ? Math.ceil(i / r) * r : n === "down" ? Math.floor(i / r) * r : i < r ? r : Math.round(i / r) * r;
}
function Ia(e) {
	let t = qa(e);
	return t === null ? "" : Ua(t);
}
function La(e) {
	let t = qa(e);
	return t === null ? "" : `${Xa(t.getHours())}:${Xa(t.getMinutes())}`;
}
function Ra(e, t = "09:00") {
	let n = Ja(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function za(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * Aa * 1e3), n.toISOString();
}
function Ba(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = Ya(e), i = (r.getDay() - n + ja) % ja;
	return r.setDate(r.getDate() - i), r;
}
function Va(e) {
	return Array.from({ length: ja }, (t, n) => Ha(e, n));
}
function Ha(e, t) {
	let n = Ya(e);
	return n.setDate(n.getDate() + t), n;
}
function Ua(e) {
	return `${e.getFullYear()}-${Xa(e.getMonth() + 1)}-${Xa(e.getDate())}`;
}
function Wa(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function Ga(e) {
	return Ua(e) === Ua(/* @__PURE__ */ new Date());
}
function Ka(e, t) {
	let n = qa(e);
	return n === null ? 0 : Math.max(0, Math.floor((t - n.getTime()) / 1e3));
}
function qa(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function Ja(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function Ya(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function Xa(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var K = y({
	running: null,
	busy: !1,
	stopPrompt: null,
	startPrompt: null
}), Za = y({ now: Date.now() }), Qa, $a = 0;
function eo() {
	Za.now = Date.now();
}
function to() {
	$a += 1, Qa === void 0 && (eo(), Qa = setInterval(eo, 1e3));
}
function no() {
	$a = Math.max(0, $a - 1), $a === 0 && Qa !== void 0 && (clearInterval(Qa), Qa = void 0);
}
function ro() {
	return to(), _(no, !0), n(() => Za.now);
}
var io = !1;
function ao(e, t) {
	if (K.running = e && typeof e.id == "number" ? e : null, K.running === null) {
		io && (io = !1, no());
		return;
	}
	io || (io = !0, to()), t && typeof K.running.task_id == "number" && $e(t, [K.running.task_id]);
}
function oo(e, t, n) {
	e?.notify("error", H(t, e.t(n)));
}
function so(e) {
	tt(e.task_id, { running: [{
		entry_id: e.id,
		user_id: e.user_id,
		started_at: e.started_at
	}] });
}
async function co(e, t, n) {
	try {
		let n = await cr(e, {
			name: t.name,
			project_id: t.projectId
		});
		return Qe(n), V(), typeof n.id == "number" ? n.id : null;
	} catch (e) {
		return oo(n, e, "tasks_projects.tasks.save_failed"), null;
	}
}
var q = {
	get running() {
		return K.running;
	},
	get runningTaskId() {
		let e = K.running?.task_id;
		return typeof e == "number" ? e : null;
	},
	get elapsedSeconds() {
		return K.running === null ? 0 : Ka(K.running.started_at, Za.now);
	},
	get busy() {
		return K.busy;
	},
	get stopPrompt() {
		return K.stopPrompt;
	},
	get startPrompt() {
		return K.startPrompt;
	},
	isRunningOn(e) {
		return K.running !== null && K.running.task_id === e;
	},
	async refresh(e) {
		try {
			ao(await Me(e), e);
		} catch {
			ao(null);
		}
	},
	async start(e, t, n = null, r) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let r = await Ne(e, {
				task_id: t,
				description: n
			});
			return ao(r, e), so(r), V(), r;
		} catch (t) {
			return _t(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : oo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			K.busy = !1;
		}
	},
	async startOnTask(e, t, n = null, r, i) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let r = await fr(e, t, n, i);
			return ao(r, e), so(r), V(), r;
		} catch (t) {
			return gt(t) === "timer_already_running" ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : oo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			K.busy = !1;
		}
	},
	async stop(e, t, n) {
		if (K.busy || K.running === null) return null;
		let r = K.running.task_id;
		K.busy = !0;
		try {
			let t = await Pe(e, n);
			return ao(null), tt(r, { running: [] }), V(), t;
		} catch (n) {
			return oo(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			K.busy = !1;
		}
	},
	async stopOnTask(e, t, n, r) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let n = await pr(e, t, r);
			return ao(null), tt(t, { running: [] }), V(), n;
		} catch (t) {
			return gt(t) === "timer_mismatch" ? n?.notify("warning", n.t("tasks_projects.timer.mismatch")) : oo(n, t, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			K.busy = !1;
		}
	},
	askStop() {
		this.answerStop(null);
		let e = K.running;
		return e === null ? Promise.resolve(null) : new Promise((t) => {
			K.stopPrompt = {
				entry: e,
				resolve: t
			};
		});
	},
	answerStop(e) {
		let t = K.stopPrompt;
		t !== null && (K.stopPrompt = null, t.resolve(e));
	},
	askStart(e = {}) {
		return this.answerStart(null), new Promise((t) => {
			K.startPrompt = {
				...e,
				resolve: t
			};
		});
	},
	answerStart(e) {
		let t = K.startPrompt;
		t !== null && (K.startPrompt = null, t.resolve(e));
	},
	async stopWithPrompt(e, t, n = {}) {
		let r = K.running;
		if (r === null) return null;
		let i = n.taskId;
		if (typeof i == "number" && r.task_id !== i) return t?.notify("warning", t.t("tasks_projects.timer.mismatch")), await this.refresh(e), null;
		let a = Ze(r.task_id), o = await this.askStop();
		if (o === null) return null;
		if (o.action === "discard") return await this.discard(e, t) && t?.notify("success", t.t("tasks_projects.timer.discarded")), null;
		let s = {
			description: o.description,
			billable: o.billable
		}, c = typeof i == "number" ? await this.stopOnTask(e, i, t, s) : await this.stop(e, t, s);
		return c !== null && t?.notify("success", t.t("tasks_projects.timer.stopped", {
			name: a,
			duration: Na(c.duration_minutes)
		})), c;
	},
	async startWithPrompt(e, t, n = {}) {
		let r = await this.askStart(n);
		if (r === null) return null;
		let i = "taskId" in r ? r.taskId : await co(e, r.create, t);
		if (i === null) return null;
		let a = await this.startOnTask(e, i, r.description, t, r.billable);
		return a !== null && t?.notify("success", t.t("tasks_projects.timer.started", { name: Ze(i) })), a;
	},
	async discard(e, t) {
		if (K.busy || K.running === null) return !1;
		let n = K.running.task_id;
		K.busy = !0;
		try {
			return await Fe(e), ao(null), tt(n, { running: [] }), V(), !0;
		} catch (n) {
			return oo(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			K.busy = !1;
		}
	},
	reset() {
		this.answerStop(null), this.answerStart(null), K.busy = !1, ao(null);
	}
}, lo = { class: "flex items-center gap-1.5" }, uo = [
	"disabled",
	"title",
	"aria-label"
], fo = ["title", "aria-label"], po = ["disabled", "title"], mo = [
	"disabled",
	"title",
	"aria-label"
], ho = ["title"], go = /* @__PURE__ */ l({
	__name: "TaskRunControl",
	props: {
		client: {},
		notify: {},
		task: {},
		members: { default: () => [] },
		size: { default: "sm" }
	},
	setup(t) {
		let r = t, i = B(), l = ro(), u = n(() => ({
			notify: r.notify,
			t: i
		})), d = n(() => q.isRunningOn(r.task.id)), f = n(() => q.runningTaskId !== null && !d.value), m = n(() => Ze(q.runningTaskId)), h = n(() => nt(r.task).running.filter((e) => e.user_id !== G.userId && e.entry_id !== q.running?.id)), g = n(() => Ma(q.elapsedSeconds)), _ = n(() => r.size === "md" ? "h-5 w-5" : "h-4 w-4"), y = n(() => r.size === "md" ? "p-2" : "p-1.5");
		function b(e) {
			return r.members.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function T(e) {
			let t = r.members.find((t) => t.id === e);
			return t ? pt(t.name) : "?";
		}
		function E(e) {
			return Ma(Ka(e.started_at, l.value));
		}
		function D(e) {
			return i("tasks_projects.timer.running_by", {
				name: b(e.user_id),
				time: E(e)
			});
		}
		async function O() {
			await q.startOnTask(r.client, r.task.id, null, u.value) !== null && r.notify("success", i("tasks_projects.timer.started", { name: r.task.name }));
		}
		function k() {
			q.stopWithPrompt(r.client, u.value, { taskId: r.task.id });
		}
		async function j() {
			await q.stopWithPrompt(r.client, u.value) !== null && await O();
		}
		return (n, r) => {
			let l = S("BaseIcon");
			return v(), a("div", lo, [d.value ? (v(), a(e, { key: 0 }, [o("button", {
				type: "button",
				class: p(["rounded-md text-status-red hover:bg-hover disabled:opacity-50", y.value]),
				disabled: w(q).busy,
				title: w(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				"aria-label": w(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				onClick: A(k, ["stop"])
			}, [c(l, {
				name: "StopIcon",
				class: p(_.value)
			}, null, 8, ["class"])], 10, uo), o("span", { class: p(["font-medium tabular-nums text-primary-500", t.size === "md" ? "text-base" : "text-xs"]) }, C(g.value), 3)], 64)) : f.value ? (v(), a(e, { key: 1 }, [o("button", {
				type: "button",
				class: p(["cursor-not-allowed rounded-md text-subtle", y.value]),
				disabled: "",
				title: w(i)("tasks_projects.timer.busy_elsewhere", { name: m.value }),
				"aria-label": w(i)("tasks_projects.timer.busy_elsewhere", { name: m.value })
			}, [c(l, {
				name: "PlayIcon",
				class: p(_.value)
			}, null, 8, ["class"])], 10, fo), o("button", {
				type: "button",
				class: "rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary-500 hover:bg-hover disabled:opacity-50",
				disabled: w(q).busy,
				title: w(i)("tasks_projects.timer.stop_and_start"),
				onClick: A(j, ["stop"])
			}, C(w(i)("tasks_projects.timer.stop_and_start")), 9, po)], 64)) : (v(), a("button", {
				key: 2,
				type: "button",
				class: p(["rounded-md text-primary-500 hover:bg-hover disabled:opacity-50", y.value]),
				disabled: w(q).busy,
				title: w(i)("tasks_projects.timer.start_on", { name: t.task.name }),
				"aria-label": w(i)("tasks_projects.timer.start_on", { name: t.task.name }),
				onClick: A(O, ["stop"])
			}, [c(l, {
				name: "PlayIcon",
				class: p(_.value)
			}, null, 8, ["class"])], 10, mo)), (v(!0), a(e, null, x(h.value, (e) => (v(), a("span", {
				key: e.entry_id,
				class: "flex items-center gap-1 rounded-full bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-muted",
				title: D(e)
			}, [c(l, {
				name: "ClockIcon",
				class: "h-3.5 w-3.5 text-primary-500"
			}), s(" " + C(T(e.user_id)), 1)], 8, ho))), 128))]);
		};
	}
}), _o = { class: "relative table-container" }, vo = { class: "inline-flex items-center whitespace-nowrap" }, yo = { class: "tabular-nums" }, bo = {
	key: 1,
	class: "text-subtle"
}, xo = ["title"], So = 10, Co = "whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider", wo = "px-3 py-4 text-sm text-muted whitespace-nowrap", To = /* @__PURE__ */ l({
	__name: "TaskList",
	props: {
		client: {},
		notify: {},
		router: {},
		filters: {},
		statuses: {},
		members: {},
		projects: {},
		projectId: { default: null }
	},
	emits: ["changed"],
	setup(t, { expose: l, emit: u }) {
		let d = t, f = u, h = {
			number: "number",
			name: "name"
		}, g = B(), _ = b(null), y = b(!0), x = b(0), k = b([]), A = b([]), j = b(!1), N = b(!1), P = b(null), F = b({}), I = b(null), L = n(() => d.projects.map((e) => ({
			id: e.id,
			label: e.name
		}))), R = n(() => M.busy), z = n(() => M.allowed), ee = n(() => d.filters.search !== "" || d.filters.status !== "" || d.filters.user !== "" || d.projectId === null && d.filters.project !== ""), te = n(() => !y.value && x.value === 0 && !ee.value), ne = n(() => [
			{
				key: "select",
				label: "",
				sortable: !1,
				tdClass: "w-8"
			},
			{
				key: "number",
				label: g("tasks_projects.tasks.columns.number"),
				sortable: !0,
				sortBy: "number",
				tdClass: "text-muted"
			},
			{
				key: "name",
				label: g("tasks_projects.tasks.columns.name"),
				sortable: !0,
				sortBy: "name",
				thClass: "extra",
				tdClass: "font-medium text-heading"
			},
			{
				key: "status",
				label: g("tasks_projects.tasks.columns.status"),
				sortable: !1
			},
			{
				key: "assignee",
				label: g("tasks_projects.tasks.columns.assignee"),
				sortable: !1
			},
			{
				key: "logged",
				label: g("tasks_projects.tasks.columns.logged"),
				sortable: !1
			},
			{
				key: "unbilled",
				label: g("tasks_projects.tasks.columns.unbilled"),
				sortable: !1
			},
			{
				key: "invoiced",
				label: g("tasks_projects.tasks.columns.invoiced"),
				sortable: !1
			},
			{
				key: "timer",
				label: g("tasks_projects.tasks.columns.timer"),
				sortable: !1
			},
			{
				key: "actions",
				label: g("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		].map((e) => ({
			defaultThClass: Co,
			defaultTdClass: wo,
			...e
		})));
		E(() => Ui(d.filters), () => ie()), E(() => d.projectId, () => ie()), E(et, () => ie(!0));
		async function re({ page: e, sort: t }) {
			let n = Vt(t, h), r = {
				page: e,
				limit: So,
				...Gi(d.filters, { projectId: d.projectId }),
				...n
			};
			y.value = !0;
			try {
				let e = await sr(d.client, r), t = e.data ?? [], n = e.meta;
				return x.value = n?.total ?? t.length, k.value = t, A.value = A.value.filter((e) => t.some((t) => t.id === e)), {
					data: t,
					pagination: {
						totalPages: n?.last_page ?? 1,
						currentPage: n?.current_page ?? 1,
						totalCount: n?.total ?? t.length,
						limit: n?.per_page ?? So
					}
				};
			} catch (e) {
				return d.notify("error", H(e, g("tasks_projects.tasks.load_failed"))), k.value = [], {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: So
					}
				};
			} finally {
				y.value = !1;
			}
		}
		function ie(e = !1) {
			_.value?.refresh(e);
		}
		function ae(e) {
			return A.value.includes(e.id);
		}
		function oe(e) {
			A.value = ae(e) ? A.value.filter((t) => t !== e.id) : [...A.value, e.id];
		}
		function se() {
			A.value = k.value.map((e) => e.id);
		}
		function ce() {
			A.value = [];
		}
		function le() {
			P.value = null, F.value = { project_id: d.projectId }, N.value = !0;
		}
		function ue(e) {
			P.value = e, F.value = {}, N.value = !0;
		}
		function de(e) {
			let t = P.value ? g("tasks_projects.tasks.updated", { name: e.name }) : g("tasks_projects.tasks.created", { name: e.name });
			N.value = !1, P.value = null, d.notify("success", t), V(), f("changed");
		}
		function fe(e) {
			N.value = !1, P.value = null, d.notify("success", g("tasks_projects.tasks.deleted", { name: e.name })), V(), f("changed");
		}
		function pe(e) {
			return d.statuses.find((t) => t.id === e.task_status_id) ?? null;
		}
		function me(e) {
			return e.assignee_id === null ? g("tasks_projects.tasks.unassigned") : d.members.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function he(e) {
			return Na(nt(e).logged_minutes);
		}
		function ge(e) {
			return nt(e).invoiced === "uninvoiced";
		}
		function _e(e) {
			return nt(e).invoiced === "invoiced" ? g("tasks_projects.tasks.already_invoiced") : g("tasks_projects.tasks.nothing_to_invoice");
		}
		let ve = n(() => ({
			client: d.client,
			router: d.router,
			notify: d.notify,
			t: g
		}));
		async function ye(e) {
			if (!R.value) {
				I.value = e.id;
				try {
					await bt(ve.value, { taskIds: [e.id] });
				} finally {
					I.value = null;
				}
			}
		}
		async function be() {
			R.value || A.value.length === 0 || await bt(ve.value, { taskIds: [...A.value] }) && ce();
		}
		async function xe(e) {
			if (window.confirm(g("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				I.value = e.id;
				try {
					await ur(d.client, e.id), d.notify("success", g("tasks_projects.tasks.deleted", { name: e.name })), V(), f("changed");
				} catch (e) {
					d.notify("error", H(e, g("tasks_projects.tasks.delete_failed")));
				} finally {
					I.value = null;
				}
			}
		}
		async function Se(e) {
			await we({
				action: "status",
				ids: [...A.value],
				task_status_id: e
			}, "applied");
		}
		async function Ce() {
			let e = A.value.length;
			window.confirm(g("tasks_projects.tasks.bulk.delete_confirm", { count: e })) && await we({
				action: "delete",
				ids: [...A.value]
			}, "deleted");
		}
		async function we(e, t) {
			if (!(j.value || e.ids.length === 0)) {
				j.value = !0;
				try {
					let n = await hr(d.client, e);
					n.failed.length > 0 ? d.notify("warning", g("tasks_projects.tasks.bulk.partial", {
						count: n.updated.length,
						failed: n.failed.length,
						ids: n.failed.map((e) => `#${e.id}`).join(", ")
					})) : n.updated.length === 0 ? d.notify("warning", g("tasks_projects.tasks.bulk.nothing")) : d.notify("success", g(`tasks_projects.tasks.bulk.${t}`, { count: n.updated.length })), ce(), V(), f("changed");
				} catch (e) {
					d.notify("error", H(e, g("tasks_projects.tasks.bulk.failed")));
				} finally {
					j.value = !1;
				}
			}
		}
		return l({
			openCreate: le,
			refresh: ie
		}), (n, l) => {
			let u = S("BaseIcon"), d = S("BaseButton"), f = S("BaseEmptyPlaceholder"), h = S("BaseCheckbox"), y = S("router-link"), b = S("BaseFormatMoney"), x = S("BaseDropdownItem"), E = S("BaseDropdown"), k = S("BaseTable");
			return v(), a("div", null, [
				c(ua, {
					count: A.value.length,
					statuses: t.statuses,
					busy: j.value,
					invoicing: R.value,
					"can-invoice": z.value,
					onStatus: Se,
					onDelete: Ce,
					onInvoice: be,
					onClear: ce,
					onSelectPage: se
				}, null, 8, [
					"count",
					"statuses",
					"busy",
					"invoicing",
					"can-invoice"
				]),
				O(c(f, {
					title: w(g)("tasks_projects.tasks.empty_title"),
					description: w(g)("tasks_projects.tasks.empty_description")
				}, {
					actions: D(() => [c(d, {
						variant: "primary",
						onClick: le
					}, {
						left: D((e) => [c(u, {
							name: "PlusIcon",
							class: p(e.class)
						}, null, 8, ["class"])]),
						default: D(() => [s(" " + C(w(g)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})]),
					default: D(() => [c(u, {
						name: "ClipboardDocumentListIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"]), [[T, te.value]]),
				O(o("div", _o, [c(k, {
					ref_key: "tableRef",
					ref: _,
					data: re,
					columns: ne.value,
					class: "mt-3"
				}, {
					"cell-select": D(({ row: e }) => [c(h, {
						"model-value": ae(e.data),
						"aria-label": e.data.name,
						onChange: (t) => oe(e.data)
					}, null, 8, [
						"model-value",
						"aria-label",
						"onChange"
					])]),
					"cell-number": D(({ row: e }) => [s("#" + C(e.data.number), 1)]),
					"cell-name": D(({ row: e }) => [c(y, {
						class: "hover:text-primary-500",
						to: w(W).task(e.data.id)
					}, {
						default: D(() => [s(C(e.data.name), 1)]),
						_: 2
					}, 1032, ["to"]), e.data.due_date ? (v(), a("span", {
						key: 0,
						class: p(["mt-0.5 block text-xs font-normal", w(mt)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "text-muted"])
					}, C(w(g)("tasks_projects.tasks.columns.due_date")) + ": " + C(w(ut)(e.data.due_date)), 3)) : i("", !0)]),
					"cell-status": D(({ row: e }) => [o("span", vo, [o("span", {
						class: p(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", pe(e.data)?.colour ? "" : "bg-line-default"]),
						style: m(pe(e.data)?.colour ? { backgroundColor: pe(e.data)?.colour } : void 0)
					}, null, 6), s(" " + C(pe(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": D(({ row: e }) => [o("span", { class: p(e.data.assignee_id === null ? "text-subtle" : "") }, C(me(e.data)), 3)]),
					"cell-logged": D(({ row: e }) => [o("span", yo, C(he(e.data)), 1)]),
					"cell-unbilled": D(({ row: e }) => [w(nt)(e.data).unbilled_amount > 0 ? (v(), r(b, {
						key: 0,
						amount: w(nt)(e.data).unbilled_amount
					}, null, 8, ["amount"])) : (v(), a("span", bo, "-"))]),
					"cell-invoiced": D(({ row: e }) => [c(da, { state: w(nt)(e.data).invoiced }, null, 8, ["state"])]),
					"cell-timer": D(({ row: e }) => [c(go, {
						client: t.client,
						notify: t.notify,
						task: e.data,
						members: t.members
					}, null, 8, [
						"client",
						"notify",
						"task",
						"members"
					])]),
					"cell-actions": D(({ row: t }) => [c(E, { "content-loading": I.value === t.data.id }, {
						activator: D(() => [c(u, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [
							c(x, { onClick: (e) => ue(t.data) }, {
								default: D(() => [c(u, {
									name: "PencilIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.general.edit")), 1)]),
								_: 1
							}, 8, ["onClick"]),
							z.value ? (v(), a(e, { key: 0 }, [ge(t.data) && !R.value ? (v(), r(x, {
								key: 0,
								onClick: (e) => ye(t.data)
							}, {
								default: D(() => [c(u, {
									name: "BanknotesIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.tasks.invoice_task")), 1)]),
								_: 1
							}, 8, ["onClick"])) : (v(), a("div", {
								key: 1,
								class: "group flex cursor-not-allowed items-center px-4 py-2 text-sm font-normal text-subtle",
								title: R.value ? w(g)("tasks_projects.billing.busy") : _e(t.data)
							}, [c(u, {
								name: "BanknotesIcon",
								class: "mr-3 h-5 w-5 text-subtle"
							}), s(" " + C(w(g)("tasks_projects.tasks.invoice_task")), 1)], 8, xo))], 64)) : i("", !0),
							c(x, { onClick: (e) => xe(t.data) }, {
								default: D(() => [c(u, {
									name: "TrashIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.general.delete")), 1)]),
								_: 1
							}, 8, ["onClick"])
						]),
						_: 2
					}, 1032, ["content-loading"])]),
					_: 1
				}, 8, ["columns"])], 512), [[T, !te.value]]),
				c(ya, {
					show: N.value,
					client: t.client,
					notify: t.notify,
					task: P.value,
					statuses: t.statuses,
					members: t.members,
					projects: L.value,
					defaults: F.value,
					"lock-project": t.projectId !== null,
					compact: P.value === null,
					onClose: l[0] ||= (e) => N.value = !1,
					onSaved: de,
					onDeleted: fe
				}, null, 8, [
					"show",
					"client",
					"notify",
					"task",
					"statuses",
					"members",
					"projects",
					"defaults",
					"lock-project",
					"compact"
				])
			]);
		};
	}
}), Eo = { class: "py-4" }, Do = { class: "flex flex-wrap items-end justify-between gap-3" }, Oo = /* @__PURE__ */ l({
	__name: "ProjectTasksTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {},
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: t }) {
		let r = e, i = t, l = B(), u = b(null), d = b([]), f = b([]), m = b({ ...Ri }), h = n(() => r.project?.id ?? Number(r.id)), _ = n(() => r.project === null ? [] : [r.project]);
		g(() => void y());
		async function y() {
			try {
				d.value = await or(r.client);
			} catch (e) {
				r.notify("error", H(e, l("tasks_projects.task_statuses.load_failed")));
			}
			try {
				f.value = await Jt(r.client);
			} catch {
				f.value = [];
			}
		}
		function x() {
			i("refresh");
		}
		return (t, n) => {
			let r = S("BaseIcon"), i = S("BaseButton");
			return v(), a("div", Eo, [o("div", Do, [c(oa, {
				modelValue: m.value,
				"onUpdate:modelValue": n[0] ||= (e) => m.value = e,
				class: "flex-1",
				projects: _.value,
				members: f.value,
				statuses: d.value,
				"lock-project": ""
			}, null, 8, [
				"modelValue",
				"projects",
				"members",
				"statuses"
			]), c(i, {
				variant: "primary",
				onClick: n[1] ||= (e) => u.value?.openCreate()
			}, {
				left: D((e) => [c(r, {
					name: "PlusIcon",
					class: p(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + C(w(l)("tasks_projects.tasks.new_task")), 1)]),
				_: 1
			})]), c(To, {
				ref_key: "listRef",
				ref: u,
				client: e.client,
				notify: e.notify,
				router: e.router,
				filters: m.value,
				statuses: d.value,
				members: f.value,
				projects: _.value,
				"project-id": h.value,
				onChanged: x
			}, null, 8, [
				"client",
				"notify",
				"router",
				"filters",
				"statuses",
				"members",
				"projects",
				"project-id"
			])]);
		};
	}
}), ko = { class: "flex w-full items-center justify-between" }, Ao = { class: "space-y-5 px-6 py-6" }, jo = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, Mo = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, No = ["disabled", "onClick"], Po = {
	key: 1,
	class: "text-sm text-muted"
}, Fo = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Io = { key: 1 }, Lo = { class: "flex space-x-3" }, Ro = "09:00", zo = /* @__PURE__ */ l({
	__name: "TimeEntryModal",
	props: {
		show: { type: Boolean },
		client: { type: [Function, Object] },
		notify: { type: Function },
		entry: {},
		defaultDate: {},
		defaultTask: {},
		lockTask: { type: Boolean }
	},
	emits: [
		"close",
		"saved",
		"deleted"
	],
	setup(t, { emit: l }) {
		let u = t, d = l, f = ["duration", "range"], m = B(), h = y({
			date: "",
			mode: "duration",
			duration: "",
			start: Ro,
			end: "",
			description: "",
			billable: !0
		}), g = b(null), _ = b({}), T = b(!1), O = b(!1), k = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : k.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		E(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			_.value = {}, g.value = e === null ? u.defaultTask ?? null : null, h.date = e ? Ia(e.started_at) : u.defaultDate ?? Ua(/* @__PURE__ */ new Date()), h.duration = e ? Na(e.duration_minutes) : "", h.start = e?.started_at ? La(e.started_at) : Ro, h.end = e?.ended_at ? La(e.ended_at) : "", h.description = e?.description ?? "", h.billable = e ? e.billable : g.value?.billable ?? !0, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? Ua(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await He(u.client, e);
				g.value = t, Qe(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await Ve(u.client, e ?? "");
				return t.forEach(Qe), t;
			} catch (e) {
				return u.notify("error", H(e, m("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function L(e) {
			h.date = e ? dt(e) : "";
		}
		function R(e) {
			g.value = e, e !== null && u.entry === null && (h.billable = e.billable !== !1);
		}
		function z() {
			let e = {}, t = g.value;
			(t === null || typeof t.id != "number") && (e.task_id = m("tasks_projects.time.task_required")), h.date === "" && (e.date = m("tasks_projects.time.date_required"));
			let n = Ra(h.date, h.mode === "range" ? h.start : Ro);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? Pa(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? Ra(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), _.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = za(n, r)) : a.ended_at = i, a;
		}
		async function ee() {
			if (T.value || j.value) return;
			let e = z();
			if (e !== null) {
				T.value = !0;
				try {
					let t = u.entry, n = t ? await Ae(u.client, t.id, e) : await ke(u.client, e);
					d("saved", n);
				} catch (e) {
					_.value = at(e), u.notify("error", H(e, m("tasks_projects.time.save_failed")));
				} finally {
					T.value = !1;
				}
			}
		}
		async function te() {
			let e = u.entry;
			if (!(e === null || O.value || j.value) && window.confirm(m("tasks_projects.time.delete_confirm"))) {
				O.value = !0;
				try {
					await je(u.client, e.id), d("deleted", e);
				} catch (e) {
					u.notify("error", H(e, m("tasks_projects.time.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let u = S("BaseIcon"), y = S("BaseInput"), b = S("BaseMultiselect"), E = S("BaseInputGroup"), N = S("BaseDatePicker"), P = S("BaseInputGrid"), F = S("BaseTextarea"), z = S("BaseSwitch"), B = S("BaseButton"), ne = S("BaseModal");
			return v(), r(ne, {
				show: t.show,
				onClose: l[8] ||= (e) => d("close")
			}, {
				header: D(() => [o("div", ko, [o("span", null, C(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(ee, ["prevent"]) }, [o("div", Ao, [
					j.value ? (v(), a("p", jo, C(w(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
					c(E, {
						label: w(m)("tasks_projects.time.fields.task"),
						error: _.value.task_id,
						required: ""
					}, {
						default: D(() => [t.lockTask ? (v(), r(y, {
							key: 0,
							"model-value": g.value?.name ?? "",
							type: "text",
							disabled: ""
						}, null, 8, ["model-value"])) : (v(), r(b, {
							key: 1,
							"model-value": g.value,
							options: I,
							disabled: j.value,
							invalid: !!_.value.task_id,
							placeholder: w(m)("tasks_projects.time.fields.task_placeholder"),
							"initial-search": g.value?.name ?? "",
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
						]))]),
						_: 1
					}, 8, ["label", "error"]),
					c(P, null, {
						default: D(() => [c(E, {
							label: w(m)("tasks_projects.time.fields.date"),
							error: _.value.date,
							required: ""
						}, {
							default: D(() => [c(N, {
								"model-value": h.date,
								disabled: j.value,
								invalid: !!_.value.date,
								"onUpdate:modelValue": L
							}, null, 8, [
								"model-value",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"]), c(E, { label: w(m)("tasks_projects.time.fields.mode") }, {
							default: D(() => [o("div", Mo, [(v(), a(e, null, x(f, (e) => o("button", {
								key: e,
								type: "button",
								class: p(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, C(w(m)(`tasks_projects.time.mode.${e}`)), 11, No)), 64))])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					h.mode === "duration" ? (v(), r(E, {
						key: 1,
						label: w(m)("tasks_projects.time.fields.duration"),
						error: _.value.duration_minutes,
						"help-text": w(m)("tasks_projects.time.fields.duration_help"),
						required: ""
					}, {
						default: D(() => [c(y, {
							modelValue: h.duration,
							"onUpdate:modelValue": l[2] ||= (e) => h.duration = e,
							type: "text",
							inputmode: "text",
							placeholder: "1:30",
							disabled: j.value,
							invalid: !!_.value.duration_minutes
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
					])) : (v(), r(P, { key: 2 }, {
						default: D(() => [c(E, {
							label: w(m)("tasks_projects.time.fields.start"),
							error: _.value.started_at,
							required: ""
						}, {
							default: D(() => [c(y, {
								modelValue: h.start,
								"onUpdate:modelValue": l[3] ||= (e) => h.start = e,
								type: "time",
								disabled: j.value,
								invalid: !!_.value.started_at
							}, null, 8, [
								"modelValue",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"]), c(E, {
							label: w(m)("tasks_projects.time.fields.end"),
							error: _.value.ended_at,
							required: ""
						}, {
							default: D(() => [c(y, {
								modelValue: h.end,
								"onUpdate:modelValue": l[4] ||= (e) => h.end = e,
								type: "time",
								disabled: j.value,
								invalid: !!_.value.ended_at
							}, null, 8, [
								"modelValue",
								"disabled",
								"invalid"
							])]),
							_: 1
						}, 8, ["label", "error"])]),
						_: 1
					})),
					c(E, {
						label: w(m)("tasks_projects.time.fields.description"),
						error: _.value.description
					}, {
						default: D(() => [c(F, {
							modelValue: h.description,
							"onUpdate:modelValue": l[5] ||= (e) => h.description = e,
							row: 3,
							disabled: j.value,
							invalid: !!_.value.description
						}, null, 8, [
							"modelValue",
							"disabled",
							"invalid"
						])]),
						_: 1
					}, 8, ["label", "error"]),
					c(E, {
						label: w(m)("tasks_projects.time.fields.billable"),
						error: _.value.billable
					}, {
						default: D(() => [j.value ? (v(), a("span", Po, C(h.billable ? w(m)("tasks_projects.time.billable") : w(m)("tasks_projects.time.non_billable")), 1)) : (v(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Fo, [k.value && !j.value ? (v(), r(B, {
					key: 0,
					type: "button",
					variant: "danger",
					size: "sm",
					loading: O.value,
					disabled: O.value,
					onClick: te
				}, {
					default: D(() => [s(C(w(m)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (v(), a("span", Io)), o("div", Lo, [c(B, {
					type: "button",
					variant: "primary-outline",
					onClick: l[7] ||= (e) => d("close")
				}, {
					default: D(() => [s(C(j.value ? w(m)("tasks_projects.timer.close") : w(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), j.value ? i("", !0) : (v(), r(B, {
					key: 0,
					type: "submit",
					variant: "primary",
					loading: T.value,
					disabled: T.value
				}, {
					default: D(() => [s(C(k.value ? w(m)("tasks_projects.general.update") : w(m)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"]))])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), Bo = { class: "py-4" }, Vo = { class: "flex justify-end" }, Ho = { class: "relative mt-3 table-container" }, Uo = { class: "font-medium text-heading" }, Wo = {
	key: 0,
	class: "block text-xs text-muted"
}, Go = {
	key: 1,
	class: "text-subtle"
}, Ko = {
	key: 0,
	class: "text-xs text-primary-500"
}, qo = 15, Jo = 100, Yo = /* @__PURE__ */ l({
	__name: "ProjectTimeTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), f = ro(), m = b(null), h = b([]), _ = b([]), y = b(!1), x = b(null), T = n(() => l.project?.id ?? Number(l.id)), O = n(() => [
			{
				key: "started_at",
				label: d("tasks_projects.project.time.columns.date"),
				sortable: !1
			},
			{
				key: "user",
				label: d("tasks_projects.project.time.columns.member"),
				sortable: !1
			},
			{
				key: "task",
				label: d("tasks_projects.project.time.columns.task"),
				sortable: !1,
				thClass: "extra"
			},
			{
				key: "duration_minutes",
				label: d("tasks_projects.project.time.columns.minutes"),
				sortable: !1
			},
			{
				key: "billable",
				label: d("tasks_projects.project.time.columns.billable"),
				sortable: !1
			},
			{
				key: "amount",
				label: d("tasks_projects.project.time.columns.amount"),
				sortable: !1
			},
			{
				key: "actions",
				label: d("tasks_projects.general.actions"),
				sortable: !1,
				tdClass: "text-right text-sm font-medium"
			}
		]);
		g(() => {
			k();
		}), E(et, () => m.value?.refresh(!0));
		async function k() {
			try {
				h.value = await Jt(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await sr(l.client, {
					project_id: T.value,
					limit: Jo
				});
				_.value = e.data ?? [];
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.load_failed")));
			}
		}
		async function A({ page: e }) {
			let t = {
				page: e,
				limit: qo,
				project_id: T.value
			};
			try {
				let e = await xr(l.client, t);
				return {
					data: e.data ?? [],
					pagination: {
						totalPages: e.meta?.last_page ?? 1,
						currentPage: e.meta?.current_page ?? 1,
						totalCount: e.meta?.total ?? 0,
						limit: e.meta?.per_page ?? qo
					}
				};
			} catch (e) {
				return l.notify("error", H(e, d("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: qo
					}
				};
			}
		}
		function j(e) {
			return h.value.find((t) => t.id === e)?.name ?? d("tasks_projects.project.time.removed_member");
		}
		function M(e) {
			return _.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function N(e) {
			return e.is_running ? Ma(Ka(e.started_at, f.value)) : ft(e.duration_minutes);
		}
		function P() {
			x.value = null, y.value = !0;
		}
		function F(e) {
			e.is_running || (x.value = e, y.value = !0);
		}
		function I() {
			let e = x.value ? d("tasks_projects.time.updated") : d("tasks_projects.time.created");
			y.value = !1, x.value = null, l.notify("success", e), m.value?.refresh(!0), V(), u("refresh");
		}
		function L() {
			y.value = !1, x.value = null, l.notify("success", d("tasks_projects.time.deleted")), m.value?.refresh(!0), V(), u("refresh");
		}
		async function R(e) {
			if (window.confirm(d("tasks_projects.time.delete_confirm"))) try {
				await je(l.client, e.id), l.notify("success", d("tasks_projects.time.deleted")), m.value?.refresh(!0), V(), u("refresh");
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.time.delete_failed")));
			}
		}
		return (t, n) => {
			let l = S("BaseIcon"), u = S("BaseButton"), f = S("BaseFormatMoney"), h = S("BaseDropdownItem"), g = S("BaseDropdown"), _ = S("BaseTable");
			return v(), a("div", Bo, [
				o("div", Vo, [c(u, {
					variant: "primary",
					onClick: P
				}, {
					left: D((e) => [c(l, {
						name: "PlusIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(d)("tasks_projects.project.time.add_entry")), 1)]),
					_: 1
				})]),
				o("div", Ho, [c(_, {
					ref_key: "tableRef",
					ref: m,
					data: A,
					columns: O.value
				}, {
					"cell-started_at": D(({ row: e }) => [s(C(e.data.started_at ? w(ut)(e.data.started_at) : "-"), 1)]),
					"cell-user": D(({ row: e }) => [s(C(j(e.data.user_id)), 1)]),
					"cell-task": D(({ row: e }) => [o("span", Uo, C(M(e.data.task_id)), 1), e.data.description ? (v(), a("span", Wo, C(e.data.description), 1)) : i("", !0)]),
					"cell-duration_minutes": D(({ row: e }) => [o("span", { class: p(["tabular-nums", e.data.is_running ? "font-medium text-primary-500" : ""]) }, C(N(e.data)), 3)]),
					"cell-billable": D(({ row: e }) => [e.data.billable ? (v(), r(l, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (v(), a("span", Go, "-"))]),
					"cell-amount": D(({ row: e }) => [c(f, { amount: e.data.amount }, null, 8, ["amount"])]),
					"cell-actions": D(({ row: e }) => [e.data.is_running ? (v(), a("span", Ko, C(w(d)("tasks_projects.project.time.running")), 1)) : (v(), r(g, { key: 1 }, {
						activator: D(() => [c(l, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(h, { onClick: (t) => F(e.data) }, {
							default: D(() => [c(l, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), e.data.invoice_id === null ? (v(), r(h, {
							key: 0,
							onClick: (t) => R(e.data)
						}, {
							default: D(() => [c(l, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(d)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])) : i("", !0)]),
						_: 2
					}, 1024))]),
					_: 1
				}, 8, ["columns"])]),
				c(zo, {
					show: y.value,
					client: e.client,
					notify: e.notify,
					entry: x.value,
					onClose: n[0] ||= (e) => y.value = !1,
					onSaved: I,
					onDeleted: L
				}, null, 8, [
					"show",
					"client",
					"notify",
					"entry"
				])
			]);
		};
	}
}), Xo = {
	viewProject: `${U}:view-project`,
	editProject: `${U}:edit-project`,
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function Zo(e) {
	e.addMessages(rr), e.registerPage({
		id: "projects",
		module: U,
		path: "projects",
		component: sn(e, Zr),
		meta: {
			ability: Xo.viewProject,
			title: "tasks_projects.projects.title"
		}
	}), e.registerPage({
		id: "project",
		module: U,
		path: "projects/:id",
		component: sn(e, zr),
		meta: {
			ability: Xo.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: sn(e, Li),
				meta: {
					ability: Xo.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: sn(e, Oo),
				meta: {
					ability: Xo.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: sn(e, Yo),
				meta: {
					ability: Xo.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: sn(e, li),
				meta: {
					ability: Xo.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/messages/reports.ts
var Qo = { en: { tasks_projects: { reports: {
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
} } } }, $o = { summary: `${Rt}/reports/summary` };
async function es(e, t) {
	let { data: n } = await e.get($o.summary, { params: t });
	return ts(n?.data, t);
}
function ts(e, t) {
	let n = is(e) ? e : {};
	return {
		from: ss(n.from, t.from ?? ""),
		to: ss(n.to, t.to ?? ""),
		totals: rs(n.totals).map(ns),
		by_project: rs(n.by_project).map((e) => ({
			...ns(e),
			project_id: os(e.project_id),
			label: ss(e.label, "")
		})),
		by_member: rs(n.by_member).map((e) => ({
			...ns(e),
			user_id: os(e.user_id),
			label: ss(e.label, "")
		})),
		by_customer: rs(n.by_customer).map((e) => ({
			...ns(e),
			customer_id: os(e.customer_id)
		})),
		by_billable: rs(n.by_billable).map((e) => ({
			...ns(e),
			billable: e.billable === !0
		}))
	};
}
function ns(e) {
	return {
		currency_id: os(e.currency_id),
		minutes: as(e.minutes),
		amount: as(e.amount),
		billable_minutes: as(e.billable_minutes),
		billable_amount: as(e.billable_amount),
		unbilled_amount: as(e.unbilled_amount)
	};
}
function rs(e) {
	return Array.isArray(e) ? e.filter(is) : [];
}
function is(e) {
	return typeof e == "object" && !!e;
}
function as(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function os(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function ss(e, t) {
	return typeof e == "string" && e.trim() !== "" ? e : t;
}
//#endregion
//#region resources/js/components/ReportBreakdownTable.vue?vue&type=script&setup=true&lang.ts
var cs = { class: "mt-6" }, ls = { class: "text-sm font-semibold tracking-wider text-muted uppercase" }, us = { class: "relative table-container" }, ds = {
	key: 0,
	class: "text-subtle"
}, fs = { key: 1 }, ps = /* @__PURE__ */ l({
	__name: "ReportBreakdownTable",
	props: {
		title: {},
		labelHeading: {},
		rows: {},
		showCurrency: { type: Boolean }
	},
	setup(e) {
		let t = e, i = B(), l = n(() => [
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
			let i = S("BaseFormatMoney"), d = S("BaseTable");
			return v(), a("section", cs, [o("h3", ls, C(e.title), 1), o("div", us, [(v(), r(d, {
				key: u.value,
				data: e.rows,
				columns: l.value,
				class: "mt-2"
			}, {
				"cell-currency_id": D(({ row: e }) => [e.data.currency_id === null ? (v(), a("span", ds, "-")) : (v(), a("span", fs, "#" + C(e.data.currency_id), 1))]),
				"cell-minutes": D(({ row: e }) => [s(C(w(Na)(e.data.minutes)), 1)]),
				"cell-billable_minutes": D(({ row: e }) => [s(C(w(Na)(e.data.billable_minutes)), 1)]),
				"cell-amount": D(({ row: e }) => [c(i, { amount: e.data.amount }, null, 8, ["amount"])]),
				"cell-unbilled_amount": D(({ row: e }) => [c(i, { amount: e.data.unbilled_amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["data", "columns"]))])]);
		};
	}
}), ms = 3;
function hs(e, t, n = /* @__PURE__ */ new Date()) {
	let r = n.getFullYear(), i = n.getMonth();
	switch (e) {
		case "THIS_WEEK": {
			let e = Ba(n, t);
			return _s(e, Ha(e, 6));
		}
		case "LAST_MONTH": return _s(new Date(r, i - 1, 1), new Date(r, i, 0));
		case "THIS_QUARTER": {
			let e = Math.floor(i / ms) * ms;
			return _s(new Date(r, e, 1), new Date(r, e + ms, 0));
		}
		case "THIS_YEAR": return _s(new Date(r, 0, 1), new Date(r, 12, 0));
		default: return _s(new Date(r, i, 1), new Date(r, i + 1, 0));
	}
}
function gs(e, t) {
	return t <= 0 ? 0 : Math.min(100, Math.max(0, Math.round(e / t * 100)));
}
function _s(e, t) {
	return {
		from: Ua(e),
		to: Ua(t)
	};
}
//#endregion
//#region resources/js/pages/ReportsPage.vue?vue&type=script&setup=true&lang.ts
var vs = {
	key: 0,
	class: "mt-2 text-sm text-muted"
}, ys = { class: "flex items-center justify-end space-x-5" }, bs = { class: "mt-4 flex flex-wrap gap-2" }, xs = ["onClick"], Ss = {
	key: 0,
	class: "flex justify-center py-16"
}, Cs = {
	key: 0,
	class: "text-xs font-medium tracking-wider text-muted uppercase"
}, ws = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ts = { class: "mt-1 text-2xl font-semibold text-heading" }, Es = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ds = { class: "mt-1 text-2xl font-semibold text-heading" }, Os = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ks = { class: "mt-1 text-2xl font-semibold text-heading" }, As = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, js = { class: "mt-1 text-2xl font-semibold text-heading" }, Ms = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Ns = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ps = { class: "mt-3 flex h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Fs = { class: "mt-3 flex flex-wrap gap-6 text-sm" }, Is = { class: "inline-flex items-center text-body" }, Ls = { class: "ml-1 font-medium text-heading" }, Rs = { class: "ml-1 text-muted" }, zs = { class: "inline-flex items-center text-body" }, Bs = { class: "ml-1 font-medium text-heading" }, Vs = { class: "ml-1 text-muted" }, Hs = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Us = "THIS_MONTH", Ws = /* @__PURE__ */ l({
	__name: "ReportsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = B(), d = b(null), f = b([]), h = b(!0), _ = b(Us), y = b(""), T = b(""), E = n(() => [
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
			label: ie(e)
		}))), N = n(() => (d.value?.by_customer ?? []).map((e) => ({
			...e,
			id: `${e.customer_id ?? "none"}-${e.currency_id ?? "base"}`,
			label: e.customer_id === null ? u("tasks_projects.reports.tables.no_customer") : $t(e.customer_id)
		}))), P = n(() => ae(!0)), F = n(() => ae(!1)), I = n(() => P.value + F.value), L = n(() => gs(P.value, I.value));
		g(() => {
			R(Us), re();
		});
		function R(e) {
			if (_.value = e, e !== "CUSTOM") {
				let t = hs(e, G.settings.week_start);
				y.value = t.from, T.value = t.to;
			}
			te();
		}
		function z(e) {
			y.value = e ? dt(e) : "", _.value = "CUSTOM", te();
		}
		function ee(e) {
			T.value = e ? dt(e) : "", _.value = "CUSTOM", te();
		}
		async function te() {
			h.value = !0;
			try {
				let e = await es(l.client, ne());
				d.value = e, e.by_customer.some((e) => e.customer_id !== null) && en(l.client);
			} catch (e) {
				d.value = null, l.notify("error", H(e, u("tasks_projects.reports.load_failed")));
			} finally {
				h.value = !1;
			}
		}
		function ne() {
			let e = {};
			return y.value !== "" && (e.from = y.value), T.value !== "" && (e.to = T.value), e;
		}
		async function re() {
			try {
				f.value = await Jt(l.client);
			} catch {}
		}
		function ie(e) {
			let t = f.value.find((t) => t.id === e.user_id)?.name ?? "";
			return t === "" ? e.label === "" ? e.user_id === null ? u("tasks_projects.reports.tables.unknown_member") : `#${e.user_id}` : e.label : t;
		}
		function ae(e) {
			return (d.value?.by_billable ?? []).filter((t) => t.billable === e).reduce((e, t) => e + t.minutes, 0);
		}
		function oe(e) {
			return e === null ? u("tasks_projects.reports.summary.base_currency") : u("tasks_projects.reports.summary.currency", { id: e });
		}
		function se(e) {
			return _.value === e.id ? "border-primary-500 bg-primary-50 text-primary-500" : "border-line-default bg-surface text-muted hover:text-heading";
		}
		function ce() {
			R(Us);
		}
		return (t, n) => {
			let l = S("BaseBreadcrumbItem"), f = S("BaseBreadcrumb"), g = S("BaseIcon"), _ = S("BaseButton"), b = S("router-link"), B = S("BasePageHeader"), te = S("BaseDatePicker"), ne = S("BaseInputGroup"), re = S("BaseFilterWrapper"), ie = S("BaseSpinner"), ae = S("BaseEmptyPlaceholder"), le = S("BaseFormatMoney"), ue = S("BasePage");
			return v(), r(ue, null, {
				default: D(() => [
					c(B, { title: w(u)("tasks_projects.reports.title") }, {
						actions: D(() => [o("div", ys, [
							c(b, { to: w(W).tasks }, {
								default: D(() => [c(_, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ClipboardDocumentListIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.tasks.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(b, { to: w(W).projects }, {
								default: D(() => [c(_, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "FolderIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.projects.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(b, { to: w(W).billing }, {
								default: D(() => [c(_, { variant: "primary-outline" }, {
									left: D((e) => [c(g, {
										name: "BanknotesIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(u)("tasks_projects.billing.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"])
						])]),
						default: D(() => [c(f, null, {
							default: D(() => [
								c(l, {
									title: w(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(l, {
									title: w(u)("tasks_projects.tasks.title"),
									to: w(W).tasks
								}, null, 8, ["title", "to"]),
								c(l, {
									title: w(u)("tasks_projects.reports.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), d.value ? (v(), a("p", vs, C(w(ut)(d.value.from)) + " – " + C(w(ut)(d.value.to)), 1)) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("div", bs, [(v(!0), a(e, null, x(E.value, (e) => (v(), a("button", {
						key: e.id,
						type: "button",
						class: p(["rounded-md border px-3 py-1.5 text-sm font-medium", se(e)]),
						onClick: (t) => R(e.id)
					}, C(e.label), 11, xs))), 128))]),
					c(re, {
						show: !0,
						"row-on-xl": "",
						class: "mt-3",
						onClear: ce
					}, {
						default: D(() => [c(ne, {
							label: w(u)("tasks_projects.reports.range.from"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(te, {
								"model-value": y.value,
								"onUpdate:modelValue": z
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]), c(ne, {
							label: w(u)("tasks_projects.reports.range.to"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(te, {
								"model-value": T.value,
								"onUpdate:modelValue": ee
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					h.value && d.value === null ? (v(), a("div", Ss, [c(ie, { class: "h-8 w-8 text-primary-500" })])) : A.value ? (v(), a(e, { key: 2 }, [
						(v(!0), a(e, null, x(O.value, (e) => (v(), a("div", {
							key: e.currency_id ?? "base",
							class: "mt-4 rounded-xl border border-line-default bg-surface p-5"
						}, [k.value ? (v(), a("p", Cs, C(oe(e.currency_id)), 1)) : i("", !0), o("div", { class: p(["grid grid-cols-2 gap-4 sm:grid-cols-4", k.value ? "mt-3" : ""]) }, [
							o("div", null, [o("p", ws, C(w(u)("tasks_projects.reports.summary.logged")), 1), o("p", Ts, C(w(Na)(e.minutes)), 1)]),
							o("div", null, [o("p", Es, C(w(u)("tasks_projects.reports.summary.billable")), 1), o("p", Ds, C(w(Na)(e.billable_minutes)), 1)]),
							o("div", null, [o("p", Os, C(w(u)("tasks_projects.reports.summary.amount")), 1), o("p", ks, [c(le, { amount: e.amount }, null, 8, ["amount"])])]),
							o("div", null, [o("p", As, C(w(u)("tasks_projects.reports.summary.unbilled")), 1), o("p", js, [c(le, { amount: e.unbilled_amount }, null, 8, ["amount"])])])
						], 2)]))), 128)),
						o("section", Ms, [o("p", Ns, C(w(u)("tasks_projects.reports.split.title")), 1), I.value > 0 ? (v(), a(e, { key: 0 }, [o("div", Ps, [o("div", {
							class: "h-2 bg-primary-500",
							style: m({ width: `${L.value}%` })
						}, null, 4)]), o("div", Fs, [o("span", Is, [
							n[0] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary-500" }, null, -1),
							s(" " + C(w(u)("tasks_projects.reports.split.billable")) + ": ", 1),
							o("span", Ls, C(w(Na)(P.value)), 1),
							o("span", Rs, "(" + C(L.value) + "%)", 1)
						]), o("span", zs, [
							n[1] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-surface-tertiary" }, null, -1),
							s(" " + C(w(u)("tasks_projects.reports.split.non_billable")) + ": ", 1),
							o("span", Bs, C(w(Na)(F.value)), 1),
							o("span", Vs, "(" + C(100 - L.value) + "%)", 1)
						])])], 64)) : (v(), a("p", Hs, C(w(u)("tasks_projects.reports.split.nothing")), 1))]),
						c(ps, {
							title: w(u)("tasks_projects.reports.tables.by_project"),
							"label-heading": w(u)("tasks_projects.reports.tables.project"),
							rows: j.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(ps, {
							title: w(u)("tasks_projects.reports.tables.by_member"),
							"label-heading": w(u)("tasks_projects.reports.tables.member"),
							rows: M.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(ps, {
							title: w(u)("tasks_projects.reports.tables.by_customer"),
							"label-heading": w(u)("tasks_projects.reports.tables.customer"),
							rows: N.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						])
					], 64)) : (v(), r(ae, {
						key: 1,
						title: w(u)("tasks_projects.reports.empty_title"),
						description: w(u)("tasks_projects.reports.empty_description")
					}, {
						default: D(() => [c(g, {
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
}), Gs = "tasks-projects";
function Ks(e) {
	e.addMessages(Qo), e.registerPage({
		id: "reports",
		module: Gs,
		path: "reports",
		component: sn(e, Ws),
		meta: {
			ability: `${Gs}:view-own-time`,
			title: "tasks_projects.reports.title"
		}
	}), e.on("company:changing", () => {
		tn();
	});
}
//#endregion
//#region resources/js/messages/tasks.ts
var qs = { en: { tasks_projects: {
	board: {
		title: "Board",
		load_failed: "Unable to load the board.",
		move_failed: "Unable to move the task.",
		moved: "{name} moved to {status}.",
		empty_column: "Nothing here yet",
		hidden_invoiced: "Invoiced tasks are hidden on the board."
	},
	tasks: {
		title: "Tasks",
		all_tasks: "All tasks",
		new_task: "New task",
		edit_task: "Edit task",
		all_fields: "All fields",
		fewer_fields: "Fewer fields",
		search_placeholder: "Search by name or number",
		empty_title: "No tasks yet",
		empty_description: "Add a task to put work on the board.",
		unassigned: "Unassigned",
		billable: "Billable",
		overdue: "Overdue",
		none: "None",
		no_project: "No project",
		internal: "Internal",
		invoiced: "Invoiced",
		uninvoiced: "Unbilled",
		invoice_task: "Invoice task",
		already_invoiced: "This task is already on an invoice.",
		nothing_to_invoice: "No unbilled billable time on this task.",
		locked: "This task is on an invoice and cannot be changed.",
		views: {
			list: "List",
			board: "Board",
			week: "Week"
		},
		filters: {
			project: "Project",
			all_projects: "All projects",
			member: "Member",
			all_members: "Everyone",
			status: "Status",
			all_statuses: "Any status",
			invoicing: "Invoicing",
			search: "Search"
		},
		columns: {
			number: "No.",
			name: "Name",
			project: "Project",
			status: "Status",
			assignee: "Assignee",
			priority: "Priority",
			due_date: "Due date",
			logged: "Logged",
			unbilled: "Unbilled",
			invoiced: "Invoicing",
			timer: "Timer"
		},
		bulk: {
			selected: "{count} selected",
			select_page: "Select this page",
			clear: "Clear",
			change_status: "Move to",
			delete: "Delete",
			invoice: "Invoice",
			delete_confirm: "Delete {count} task? Its time entries go with it. | Delete {count} tasks? Their time entries go with them.",
			applied: "{count} task was updated. | {count} tasks were updated.",
			deleted: "{count} task was deleted. | {count} tasks were deleted.",
			partial: "{count} task was updated, {failed} refused: {ids}. | {count} tasks were updated, {failed} refused: {ids}.",
			nothing: "No task was changed.",
			failed: "Unable to apply the change."
		},
		detail: {
			estimate: "Estimate",
			logged: "Logged",
			unbilled: "Unbilled",
			no_estimate: "No estimate",
			project: "Project",
			customer: "Customer",
			status: "Status",
			assignee: "Assignee",
			priority: "Priority",
			due_date: "Due date",
			description: "Description",
			no_description: "No description yet.",
			status_saved: "The status was changed to {name}.",
			status_failed: "Unable to change the status.",
			not_found: "That task could not be loaded."
		},
		time_log: {
			title: "Time log",
			add_item: "Add item",
			add_disabled: "Stop the running timer to log an entry by hand.",
			running: "Running",
			empty: "No time logged against this task yet.",
			load_failed: "Unable to load the time log.",
			stamped: "Invoiced",
			stamped_delete: "Invoiced time belongs to its invoice and cannot be deleted.",
			columns: {
				start_date: "Start date",
				start_time: "Start",
				end_date: "End date",
				end_time: "End",
				duration: "Duration",
				description: "Description",
				billable: "Billable",
				member: "Member"
			}
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
		members_failed: "Unable to load the members.",
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
		}
	},
	task_statuses: {
		load_failed: "Unable to load the task statuses.",
		none: "No board columns yet."
	}
} } }, Js = { class: "mt-6 rounded-xl border border-line-default bg-surface" }, Ys = { class: "flex items-center justify-between border-b border-line-light px-5 py-3" }, Xs = { class: "text-sm font-semibold text-heading" }, Zs = ["title"], Qs = { class: "overflow-x-auto" }, $s = { class: "min-w-full text-sm" }, ec = { class: "bg-surface-secondary text-xs tracking-wide text-muted uppercase" }, tc = { class: "px-4 py-2 text-left font-medium" }, nc = { class: "px-4 py-2 text-left font-medium" }, rc = { class: "px-4 py-2 text-left font-medium" }, ic = { class: "px-4 py-2 text-left font-medium" }, ac = { class: "px-4 py-2 text-left font-medium" }, oc = { class: "px-4 py-2 text-left font-medium" }, sc = { class: "px-4 py-2 text-left font-medium" }, cc = { class: "px-4 py-2 text-left font-medium" }, lc = { class: "px-4 py-2 text-right font-medium" }, uc = ["onClick"], dc = { class: "px-4 py-2.5 whitespace-nowrap" }, fc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, pc = { class: "px-4 py-2.5 whitespace-nowrap" }, mc = {
	key: 0,
	class: "text-primary-500"
}, hc = { key: 1 }, gc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, _c = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, vc = { class: "max-w-64 truncate px-4 py-2.5" }, yc = { class: "px-4 py-2.5" }, bc = {
	key: 1,
	class: "text-subtle"
}, xc = { class: "px-4 py-2.5 whitespace-nowrap" }, Sc = ["title"], Cc = {
	key: 3,
	class: "text-xs text-primary-500"
}, wc = { key: 0 }, Tc = {
	colspan: "9",
	class: "px-4 py-8 text-center text-sm text-subtle"
}, Ec = /* @__PURE__ */ l({
	__name: "TimeLogGrid",
	props: {
		client: {},
		notify: {},
		task: {},
		members: { default: () => [] }
	},
	setup(t) {
		let l = t, u = B(), d = ro(), f = b([]), m = b(!1), h = b(!1), g = b(null), _ = n(() => ({
			id: l.task.id,
			name: l.task.name,
			number: l.task.number,
			project_id: l.task.project_id,
			billable: l.task.billable
		})), y = n(() => q.isRunningOn(l.task.id)), T = n(() => ({
			notify: l.notify,
			t: u
		}));
		function O(e) {
			return e.is_running && q.running?.id === e.id;
		}
		function k() {
			q.stopWithPrompt(l.client, T.value, { taskId: l.task.id });
		}
		E(() => l.task.id, () => void j(), { immediate: !0 }), E(et, () => void j());
		async function j() {
			m.value = !0;
			try {
				f.value = await mr(l.client, l.task.id);
			} catch (e) {
				f.value = [], l.notify("error", H(e, u("tasks_projects.tasks.time_log.load_failed")));
			} finally {
				m.value = !1;
			}
		}
		function M(e) {
			return e.invoice_id !== null;
		}
		function N(e) {
			return l.members.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function P(e) {
			return e.is_running ? Ma(Ka(e.started_at, d.value)) : Na(e.duration_minutes);
		}
		function F() {
			y.value || (g.value = null, h.value = !0);
		}
		function I(e) {
			e.is_running || (g.value = e, h.value = !0);
		}
		function L() {
			let e = g.value ? u("tasks_projects.time.updated") : u("tasks_projects.time.created");
			h.value = !1, g.value = null, l.notify("success", e), V();
		}
		function R() {
			h.value = !1, g.value = null, l.notify("success", u("tasks_projects.time.deleted")), V();
		}
		async function z(e) {
			if (M(e)) {
				l.notify("warning", u("tasks_projects.tasks.time_log.stamped_delete"));
				return;
			}
			if (window.confirm(u("tasks_projects.time.delete_confirm"))) try {
				await je(l.client, e.id), l.notify("success", u("tasks_projects.time.deleted")), V();
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.time.delete_failed")));
			}
		}
		return (n, l) => {
			let d = S("BaseSpinner"), b = S("BaseIcon"), T = S("BaseButton"), E = S("BaseDropdownItem"), j = S("BaseDropdown");
			return v(), a("section", Js, [
				o("header", Ys, [o("h2", Xs, [s(C(w(u)("tasks_projects.tasks.time_log.title")) + " ", 1), m.value ? (v(), r(d, {
					key: 0,
					class: "ml-2 inline-block h-4 w-4 text-primary-500"
				})) : i("", !0)]), o("span", { title: y.value ? w(u)("tasks_projects.tasks.time_log.add_disabled") : void 0 }, [c(T, {
					variant: "primary-outline",
					size: "sm",
					disabled: y.value,
					onClick: F
				}, {
					left: D((e) => [c(b, {
						name: "PlusIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(u)("tasks_projects.tasks.time_log.add_item")), 1)]),
					_: 1
				}, 8, ["disabled"])], 8, Zs)]),
				o("div", Qs, [o("table", $s, [o("thead", ec, [o("tr", null, [
					o("th", tc, C(w(u)("tasks_projects.tasks.time_log.columns.start_date")), 1),
					o("th", nc, C(w(u)("tasks_projects.tasks.time_log.columns.start_time")), 1),
					o("th", rc, C(w(u)("tasks_projects.tasks.time_log.columns.end_date")), 1),
					o("th", ic, C(w(u)("tasks_projects.tasks.time_log.columns.end_time")), 1),
					o("th", ac, C(w(u)("tasks_projects.tasks.time_log.columns.duration")), 1),
					o("th", oc, C(w(u)("tasks_projects.tasks.time_log.columns.description")), 1),
					o("th", sc, C(w(u)("tasks_projects.tasks.time_log.columns.billable")), 1),
					o("th", cc, C(w(u)("tasks_projects.tasks.time_log.columns.member")), 1),
					o("th", lc, C(w(u)("tasks_projects.general.actions")), 1)
				])]), o("tbody", null, [(v(!0), a(e, null, x(f.value, (e) => (v(), a("tr", {
					key: e.id,
					class: p(["border-t border-line-light", e.is_running ? "bg-primary-50" : "cursor-pointer hover:bg-hover"]),
					onClick: (t) => I(e)
				}, [
					o("td", dc, C(w(ut)(w(Ia)(e.started_at)) || "-"), 1),
					o("td", fc, C(w(La)(e.started_at) || "-"), 1),
					o("td", pc, [e.is_running ? (v(), a("span", mc, C(w(u)("tasks_projects.tasks.time_log.running")), 1)) : (v(), a("span", hc, C(w(ut)(w(Ia)(e.ended_at)) || "-"), 1))]),
					o("td", gc, C(e.is_running ? "-" : w(La)(e.ended_at) || "-"), 1),
					o("td", _c, [o("span", { class: p(e.is_running ? "font-medium text-primary-500" : "") }, C(P(e)), 3)]),
					o("td", vc, C(e.description || "-"), 1),
					o("td", yc, [e.billable ? (v(), r(b, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (v(), a("span", bc, "-"))]),
					o("td", xc, C(N(e.user_id)), 1),
					o("td", {
						class: "px-4 py-2.5 text-right whitespace-nowrap",
						onClick: l[0] ||= A(() => {}, ["stop"])
					}, [M(e) ? (v(), a("span", {
						key: 0,
						class: "text-xs text-muted",
						title: w(u)("tasks_projects.tasks.time_log.stamped_delete")
					}, C(w(u)("tasks_projects.tasks.time_log.stamped")), 9, Sc)) : e.is_running ? O(e) ? (v(), r(T, {
						key: 2,
						variant: "white",
						size: "sm",
						disabled: w(q).busy,
						onClick: k
					}, {
						left: D((e) => [c(b, {
							name: "StopIcon",
							class: p(e.class)
						}, null, 8, ["class"])]),
						default: D(() => [s(" " + C(w(u)("tasks_projects.timer.stop")), 1)]),
						_: 1
					}, 8, ["disabled"])) : (v(), a("span", Cc, C(w(u)("tasks_projects.tasks.time_log.running")), 1)) : (v(), r(j, { key: 1 }, {
						activator: D(() => [c(b, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(E, { onClick: (t) => I(e) }, {
							default: D(() => [c(b, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(u)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(E, { onClick: (t) => z(e) }, {
							default: D(() => [c(b, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(u)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1024))])
				], 10, uc))), 128)), f.value.length === 0 && !m.value ? (v(), a("tr", wc, [o("td", Tc, C(w(u)("tasks_projects.tasks.time_log.empty")), 1)])) : i("", !0)])])]),
				c(zo, {
					show: h.value,
					client: t.client,
					notify: t.notify,
					entry: g.value,
					"default-task": _.value,
					"lock-task": "",
					onClose: l[1] ||= (e) => h.value = !1,
					onSaved: L,
					onDeleted: R
				}, null, 8, [
					"show",
					"client",
					"notify",
					"entry",
					"default-task"
				])
			]);
		};
	}
}), Dc = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, Oc = { class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body" }, kc = {
	key: 1,
	class: "text-subtle"
}, Ac = {
	key: 0,
	class: "flex flex-wrap items-center justify-end gap-3"
}, jc = ["title"], Mc = {
	key: 0,
	class: "flex justify-center py-16"
}, Nc = { class: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Pc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Fc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ic = { class: "mt-2" }, Lc = { class: "mt-2 text-xs text-muted" }, Rc = { class: "text-body" }, zc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Bc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Vc = { class: "mt-2 text-2xl font-semibold text-heading" }, Hc = { class: "mt-1 text-xs text-muted" }, Uc = { class: "text-body" }, Wc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Gc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Kc = { class: "mt-2 text-2xl font-semibold text-heading" }, qc = { class: "mt-1 text-xs text-muted" }, Jc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Yc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Xc = { class: "mt-2 text-lg font-semibold text-heading" }, Zc = { class: "mt-1 text-xs text-muted" }, Qc = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, $c = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, el = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, tl = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, nl = 100, rl = /* @__PURE__ */ l({
	__name: "TaskPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, d = B(), f = l.router, m = b(null), h = b([]), _ = b([]), y = b([]), x = b(!0), T = b(!1), O = b(!1), k = b(!1), A = n(() => Number(l.id)), j = n(() => nt(m.value)), N = n(() => m.value?.name ?? d("tasks_projects.tasks.title")), P = n(() => h.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), F = n(() => y.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), I = n(() => y.value.find((e) => e.id === m.value?.project_id)), L = n(() => {
			let e = m.value?.assignee_id ?? null;
			return e === null ? d("tasks_projects.tasks.unassigned") : _.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}), R = n({
			get: () => P.value.find((e) => e.id === m.value?.task_status_id) ?? null,
			set: (e) => {
				e !== null && se(e);
			}
		}), z = n(() => M.busy), ee = n(() => j.value.invoiced === "uninvoiced"), te = n(() => j.value.invoiced === "invoiced" ? d("tasks_projects.tasks.already_invoiced") : d("tasks_projects.tasks.nothing_to_invoice")), ne = n(() => m.value?.priority ? d(`tasks_projects.tasks.priority.${m.value.priority.toLowerCase()}`) : null);
		E(A, () => void re()), E(et, () => void re(!0)), g(() => {
			re(), ie();
		});
		async function re(e = !1) {
			if (!(!Number.isInteger(A.value) || A.value <= 0)) {
				x.value = !e;
				try {
					let e = await dr(l.client, A.value);
					m.value = e, Qe(e), e.customer_id !== null && en(l.client);
				} catch (t) {
					e || l.notify("error", H(t, d("tasks_projects.tasks.detail.not_found")));
				} finally {
					x.value = !1;
				}
			}
		}
		async function ie() {
			try {
				h.value = await or(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.task_statuses.load_failed")));
			}
			try {
				_.value = await Jt(l.client);
			} catch {
				_.value = [];
			}
			try {
				let e = await Ht(l.client, {
					limit: nl,
					status: "ACTIVE",
					sort_by: "name"
				});
				y.value = e.data ?? [];
			} catch {
				y.value = [];
			}
		}
		function ae(e, t) {
			return {
				name: e.name,
				task_status_id: e.task_status_id,
				project_id: e.project_id,
				customer_id: e.project_id === null ? e.customer_id : null,
				description: e.description,
				assignee_id: e.assignee_id,
				priority: e.priority,
				due_date: e.due_date,
				estimated_minutes: e.estimated_minutes,
				billable: e.billable,
				rate: e.rate,
				...t
			};
		}
		function oe(e, t) {
			return gt(e) === "task_locked" ? d("tasks_projects.tasks.locked") : H(e, d(t));
		}
		async function se(e) {
			let t = m.value;
			if (t === null || T.value || t.task_status_id === e.id) return;
			let n = t.task_status_id;
			t.task_status_id = e.id, T.value = !0;
			try {
				m.value = await lr(l.client, t.id, ae(t, { task_status_id: e.id })), l.notify("success", d("tasks_projects.tasks.detail.status_saved", { name: e.label })), V();
			} catch (e) {
				t.task_status_id = n, l.notify("error", oe(e, "tasks_projects.tasks.detail.status_failed"));
			} finally {
				T.value = !1;
			}
		}
		async function ce() {
			let e = m.value;
			e !== null && ee.value && !z.value && await bt({
				client: l.client,
				router: f,
				notify: l.notify,
				t: d
			}, { taskIds: [e.id] });
		}
		function le() {
			f.push(W.tasks);
		}
		function ue(e) {
			k.value = !1, m.value = e, Qe(e), l.notify("success", d("tasks_projects.tasks.updated", { name: e.name })), V();
		}
		async function de() {
			let e = m.value;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await ur(l.client, e.id), l.notify("success", d("tasks_projects.tasks.deleted", { name: e.name })), V(), le();
				} catch (e) {
					l.notify("error", oe(e, "tasks_projects.tasks.delete_failed"));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let f = S("BaseBreadcrumbItem"), g = S("BaseBreadcrumb"), y = S("router-link"), b = S("BaseIcon"), E = S("BaseButton"), A = S("BasePageHeader"), B = S("BaseSpinner"), re = S("BaseSelectInput"), ie = S("BaseFormatMoney"), ae = S("BasePage");
			return v(), r(ae, null, {
				default: D(() => [
					c(A, { title: N.value }, {
						actions: D(() => [m.value ? (v(), a("div", Ac, [
							c(go, {
								client: t.client,
								notify: t.notify,
								task: m.value,
								members: _.value,
								size: "md"
							}, null, 8, [
								"client",
								"notify",
								"task",
								"members"
							]),
							w(M).allowed ? (v(), a("span", {
								key: 0,
								class: "inline-flex",
								title: ee.value ? void 0 : te.value
							}, [c(E, {
								variant: "white",
								loading: z.value,
								disabled: !ee.value || z.value,
								onClick: ce
							}, {
								left: D((e) => [z.value ? i("", !0) : (v(), r(b, {
									key: 0,
									name: "BanknotesIcon",
									class: p(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.tasks.invoice_task")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])], 8, jc)) : i("", !0),
							c(E, {
								variant: "primary-outline",
								loading: O.value,
								disabled: O.value,
								onClick: de
							}, {
								default: D(() => [s(C(w(d)("tasks_projects.general.delete")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"]),
							c(E, {
								variant: "primary",
								onClick: l[0] ||= (e) => k.value = !0
							}, {
								left: D((e) => [c(b, {
									name: "PencilIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
								_: 1
							})
						])) : i("", !0)]),
						default: D(() => [c(g, null, {
							default: D(() => [
								c(f, {
									title: w(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(f, {
									title: w(d)("tasks_projects.tasks.title"),
									to: w(W).tasks
								}, null, 8, ["title", "to"]),
								c(f, {
									title: m.value ? `#${m.value.number}` : N.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), m.value ? (v(), a("div", Dc, [
							o("span", Oc, "#" + C(m.value.number), 1),
							m.value.project_id ? (v(), r(y, {
								key: 0,
								class: "hover:text-primary-500",
								to: w(W).project(m.value.project_id)
							}, {
								default: D(() => [s(C(I.value?.name ?? `#${m.value.project_id}`), 1)]),
								_: 1
							}, 8, ["to"])) : (v(), a("span", kc, C(w(d)("tasks_projects.tasks.no_project")), 1)),
							m.value.customer_id ? (v(), r(y, {
								key: 2,
								class: "hover:text-primary-500",
								to: w(W).customer(m.value.customer_id)
							}, {
								default: D(() => [s(C(w($t)(m.value.customer_id)), 1)]),
								_: 1
							}, 8, ["to"])) : i("", !0),
							ne.value && m.value.priority ? (v(), a("span", {
								key: 3,
								class: p(["rounded-full px-2 py-0.5 text-xs font-medium", u[m.value.priority]])
							}, C(ne.value), 3)) : i("", !0),
							c(da, { state: j.value.invoiced }, null, 8, ["state"])
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					x.value && m.value === null ? (v(), a("div", Mc, [c(B, { class: "h-8 w-8 text-primary-500" })])) : m.value ? (v(), a(e, { key: 1 }, [
						o("div", Nc, [
							o("div", Pc, [
								o("p", Fc, C(w(d)("tasks_projects.tasks.detail.status")), 1),
								o("div", Ic, [c(re, {
									modelValue: R.value,
									"onUpdate:modelValue": l[1] ||= (e) => R.value = e,
									options: P.value,
									disabled: T.value,
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"disabled"
								])]),
								o("p", Lc, [s(C(w(d)("tasks_projects.tasks.detail.assignee")) + ": ", 1), o("span", Rc, C(L.value), 1)])
							]),
							o("div", zc, [
								o("p", Bc, C(w(d)("tasks_projects.tasks.detail.logged")), 1),
								o("p", Vc, C(w(ft)(j.value.logged_minutes)), 1),
								o("p", Hc, [s(C(w(d)("tasks_projects.tasks.detail.estimate")) + ": ", 1), o("span", Uc, C(m.value.estimated_minutes ? w(ft)(m.value.estimated_minutes) : w(d)("tasks_projects.tasks.detail.no_estimate")), 1)])
							]),
							o("div", Wc, [
								o("p", Gc, C(w(d)("tasks_projects.tasks.detail.unbilled")), 1),
								o("p", Kc, [c(ie, { amount: j.value.unbilled_amount }, null, 8, ["amount"])]),
								o("p", qc, C(w(ft)(j.value.unbilled_minutes)), 1)
							]),
							o("div", Jc, [
								o("p", Yc, C(w(d)("tasks_projects.tasks.detail.due_date")), 1),
								o("p", Xc, C(m.value.due_date ? w(ut)(m.value.due_date) : "-"), 1),
								o("p", Zc, C(m.value.billable ? w(d)("tasks_projects.tasks.billable") : w(d)("tasks_projects.time.non_billable")), 1)
							])
						]),
						o("div", Qc, [o("p", $c, C(w(d)("tasks_projects.tasks.detail.description")), 1), m.value.description ? (v(), a("p", el, C(m.value.description), 1)) : (v(), a("p", tl, C(w(d)("tasks_projects.tasks.detail.no_description")), 1))]),
						c(Ec, {
							client: t.client,
							notify: t.notify,
							task: m.value,
							members: _.value
						}, null, 8, [
							"client",
							"notify",
							"task",
							"members"
						])
					], 64)) : i("", !0),
					m.value ? (v(), r(ya, {
						key: 2,
						show: k.value,
						client: t.client,
						notify: t.notify,
						task: m.value,
						statuses: h.value,
						members: _.value,
						projects: F.value,
						onClose: l[2] ||= (e) => k.value = !1,
						onSaved: ue,
						onDeleted: le
					}, null, 8, [
						"show",
						"client",
						"notify",
						"task",
						"statuses",
						"members",
						"projects"
					])) : i("", !0)
				]),
				_: 1
			});
		};
	}
}), il = ["aria-label"], al = ["aria-current", "onClick"], ol = { class: "max-sm:hidden" }, sl = /* @__PURE__ */ l({
	__name: "ViewSwitcher",
	props: {
		active: {},
		query: {}
	},
	emits: ["select"],
	setup(t, { emit: r }) {
		let i = t, s = r, l = B(), u = n(() => [
			{
				id: "list",
				name: on.list,
				label: l("tasks_projects.tasks.views.list"),
				icon: "ListBulletIcon"
			},
			{
				id: "board",
				name: on.board,
				label: l("tasks_projects.tasks.views.board"),
				icon: "ViewColumnsIcon"
			},
			{
				id: "week",
				name: on.week,
				label: l("tasks_projects.tasks.views.week"),
				icon: "CalendarDaysIcon"
			}
		]);
		function d(e) {
			return i.active === e.name || e.id === "list" && i.active === on.tasks;
		}
		function f(e) {
			d(e) || s("select", {
				name: e.name,
				query: i.query
			});
		}
		return (t, n) => {
			let r = S("BaseIcon");
			return v(), a("nav", {
				class: "inline-flex overflow-hidden rounded-lg border border-line-default",
				"aria-label": w(l)("tasks_projects.tasks.title")
			}, [(v(!0), a(e, null, x(u.value, (e) => (v(), a("button", {
				key: e.id,
				type: "button",
				class: p(["flex items-center gap-1.5 border-r border-line-default px-3 py-1.5 text-sm font-medium last:border-r-0", d(e) ? "bg-primary-50 text-primary-500" : "bg-surface text-muted hover:bg-hover hover:text-heading"]),
				"aria-current": d(e) ? "page" : void 0,
				onClick: (t) => f(e)
			}, [c(r, {
				name: e.icon,
				class: "h-4 w-4"
			}, null, 8, ["name"]), o("span", ol, C(e.label), 1)], 10, al))), 128))], 8, il);
		};
	}
}), cl = { class: "flex flex-wrap items-center justify-end gap-3" }, ll = 100, ul = /* @__PURE__ */ l({
	__name: "TasksPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, i = B(), a = t.router, l = b([]), u = b([]), d = b([]), f = b(!1), m = n(() => t.router.currentRoute.value), h = n(() => Bi(m.value.query)), _ = n(() => Vi(h.value)), y = n(() => String(m.value.name ?? "")), x = n(() => d.value.map((e) => ({
			id: e.id,
			label: e.name
		})));
		E(y, (e) => T(e)), g(() => {
			T(y.value), O();
		});
		function T(e) {
			e === on.tasks && a.replace({
				name: on.list,
				query: _.value
			});
		}
		async function O() {
			try {
				l.value = await or(t.client);
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.task_statuses.load_failed")));
			}
			try {
				u.value = await Jt(t.client);
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await Ht(t.client, {
					limit: ll,
					status: "ACTIVE",
					sort_by: "name"
				});
				d.value = e.data ?? [];
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.tasks.projects_failed")));
			}
		}
		function k(e) {
			Wi(e, h.value) || a.replace({
				name: y.value === on.tasks ? on.list : y.value,
				query: Vi(e)
			});
		}
		function A(e) {
			a.push(e);
		}
		function j(e) {
			f.value = !1, t.notify("success", i("tasks_projects.tasks.created", { name: e.name })), V();
		}
		return (t, n) => {
			let a = S("BaseBreadcrumbItem"), m = S("BaseBreadcrumb"), g = S("BaseIcon"), b = S("BaseButton"), T = S("router-link"), E = S("BasePageHeader"), O = S("router-view"), M = S("BasePage");
			return v(), r(M, null, {
				default: D(() => [
					c(E, { title: w(i)("tasks_projects.tasks.title") }, {
						actions: D(() => [o("div", cl, [
							c(sl, {
								active: y.value,
								query: _.value,
								onSelect: A
							}, null, 8, ["active", "query"]),
							c(T, { to: w(W).projects }, {
								default: D(() => [c(b, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "FolderIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(i)("tasks_projects.projects.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(T, { to: w(W).reports }, {
								default: D(() => [c(b, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ChartBarIcon",
										class: p(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + C(w(i)("tasks_projects.reports.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(b, {
								variant: "primary",
								onClick: n[0] ||= (e) => f.value = !0
							}, {
								left: D((e) => [c(g, {
									name: "PlusIcon",
									class: p(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + C(w(i)("tasks_projects.tasks.new_task")), 1)]),
								_: 1
							})
						])]),
						default: D(() => [c(m, null, {
							default: D(() => [c(a, {
								title: w(i)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(a, {
								title: w(i)("tasks_projects.tasks.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: e.client,
						notify: e.notify
					}, null, 8, ["client", "notify"]),
					c(oa, {
						"model-value": h.value,
						projects: d.value,
						members: u.value,
						statuses: l.value,
						"onUpdate:modelValue": k
					}, null, 8, [
						"model-value",
						"projects",
						"members",
						"statuses"
					]),
					c(O, {
						filters: h.value,
						statuses: l.value,
						members: u.value,
						projects: d.value
					}, null, 8, [
						"filters",
						"statuses",
						"members",
						"projects"
					]),
					c(ya, {
						show: f.value,
						client: e.client,
						notify: e.notify,
						task: null,
						statuses: l.value,
						members: u.value,
						projects: x.value,
						defaults: { project_id: h.value.project === "" ? null : Number(h.value.project) },
						compact: "",
						onClose: n[1] ||= (e) => f.value = !1,
						onSaved: j
					}, null, 8, [
						"show",
						"client",
						"notify",
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
});
//#endregion
//#region node_modules/.pnpm/sortablejs@1.15.7/node_modules/sortablejs/modular/sortable.esm.js
function dl(e, t, n) {
	return (t = vl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fl() {
	return fl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, fl.apply(null, arguments);
}
function pl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ml(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? pl(Object(n), !0).forEach(function(t) {
			dl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hl(e, t) {
	if (e == null) return {};
	var n, r, i = gl(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function gl(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function _l(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function vl(e) {
	var t = _l(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function yl(e) {
	"@babel/helpers - typeof";
	return yl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, yl(e);
}
var bl = "1.15.7";
function xl(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var Sl = xl(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Cl = xl(/Edge/i), wl = xl(/firefox/i), Tl = xl(/safari/i) && !xl(/chrome/i) && !xl(/android/i), El = xl(/iP(ad|od|hone)/i), Dl = xl(/chrome/i) && xl(/android/i), Ol = {
	capture: !1,
	passive: !1
};
function J(e, t, n) {
	e.addEventListener(t, n, !Sl && Ol);
}
function Y(e, t, n) {
	e.removeEventListener(t, n, !Sl && Ol);
}
function kl(e, t) {
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
function Al(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function jl(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && kl(e, t) : kl(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = Al(e));
	}
	return null;
}
var Ml = /\s+/g;
function Nl(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(Ml, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(Ml, " "));
}
function X(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Pl(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = X(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Fl(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Il() {
	return document.scrollingElement || document.documentElement;
}
function Ll(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Il() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !Sl)) do
			if (i && i.getBoundingClientRect && (X(i, "transform") !== "none" || n && X(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(X(i, "border-top-width")), s -= f.left + parseInt(X(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Pl(i || e), m = p && p.a, h = p && p.d;
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
function Rl(e, t, n) {
	for (var r = Wl(e, !0), i = Ll(e)[t]; r;) {
		var a = Ll(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === Il()) break;
		r = Wl(r, !1);
	}
	return !1;
}
function zl(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && jl(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Bl(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || X(n, "display") === "none" || t && !kl(n, t));) n = n.previousElementSibling;
	return n || null;
}
function Vl(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || kl(e, t)) && n++;
	return n;
}
function Hl(e) {
	var t = 0, n = 0, r = Il();
	if (e) do {
		var i = Pl(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function Ul(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Wl(e, t) {
	if (!e || !e.getBoundingClientRect) return Il();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = X(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Il();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Il();
}
function Gl(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Kl(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var ql;
function Jl(e, t) {
	return function() {
		if (!ql) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), ql = setTimeout(function() {
				ql = void 0;
			}, t);
		}
	};
}
function Yl() {
	clearTimeout(ql), ql = void 0;
}
function Xl(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function Zl(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Ql(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (jl(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = Ll(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var $l = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function eu() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (X(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: Ll(t)
					});
					var n = ml({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Pl(t, !0);
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
			e.splice(Ul(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = Ll(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Pl(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Kl(c, s) && !Kl(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = nu(u, c, l, r.options)), Kl(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				X(e, "transition", ""), X(e, "transform", "");
				var i = Pl(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, X(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = tu(e), X(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), X(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					X(e, "transition", ""), X(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function tu(e) {
	return e.offsetWidth;
}
function nu(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var ru = [], iu = { initializeByDefault: !0 }, au = {
	mount: function(e) {
		for (var t in iu) iu.hasOwnProperty(t) && !(t in e) && (e[t] = iu[t]);
		ru.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), ru.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		ru.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](ml({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](ml({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in ru.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, fl(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return ru.forEach(function(r) {
			typeof r.eventProperties == "function" && fl(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return ru.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function ou(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[$l], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !Sl && !Cl ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = ml(ml({}, m), au.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var su = ["evt"], cu = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = hl(n, su);
	au.pluginEvent.bind($)(e, t, ml({
		dragEl: Z,
		parentEl: uu,
		ghostEl: Q,
		rootEl: du,
		nextEl: fu,
		lastDownEl: pu,
		cloneEl: mu,
		cloneHidden: hu,
		dragStarted: ju,
		putSortable: xu,
		activeSortable: $.active,
		originalEvent: r,
		oldIndex: gu,
		oldDraggableIndex: vu,
		newIndex: _u,
		newDraggableIndex: yu,
		hideGhostForTarget: Xu,
		unhideGhostForTarget: Zu,
		cloneNowHidden: function() {
			hu = !0;
		},
		cloneNowShown: function() {
			hu = !1;
		},
		dispatchSortableEvent: function(e) {
			lu({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function lu(e) {
	ou(ml({
		putSortable: xu,
		cloneEl: mu,
		targetEl: Z,
		rootEl: du,
		oldIndex: gu,
		oldDraggableIndex: vu,
		newIndex: _u,
		newDraggableIndex: yu
	}, e));
}
var Z, uu, Q, du, fu, pu, mu, hu, gu, _u, vu, yu, bu, xu, Su = !1, Cu = !1, wu = [], Tu, Eu, Du, Ou, ku, Au, ju, Mu, Nu, Pu = !1, Fu = !1, Iu, Lu, Ru = [], zu = !1, Bu = [], Vu = typeof document < "u", Hu = El, Uu = Cl || Sl ? "cssFloat" : "float", Wu = Vu && !Dl && !El && "draggable" in document.createElement("div"), Gu = function() {
	if (Vu) {
		if (Sl) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), Ku = function(e, t) {
	var n = X(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = zl(e, 0, t), a = zl(e, 1, t), o = i && X(i), s = a && X(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + Ll(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ll(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Uu] === "none" || a && n[Uu] === "none" && c + l > r) ? "vertical" : "horizontal";
}, qu = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, Ju = function(e, t) {
	var n;
	return wu.some(function(r) {
		var i = r[$l].options.emptyInsertThreshold;
		if (i && !Bl(r)) {
			var a = Ll(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, Yu = function(e) {
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
	(!r || yl(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Xu = function() {
	!Gu && Q && X(Q, "display", "none");
}, Zu = function() {
	!Gu && Q && X(Q, "display", "");
};
Vu && !Dl && document.addEventListener("click", function(e) {
	if (Cu) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Cu = !1, !1;
}, !0);
var Qu = function(e) {
	if (Z) {
		e = e.touches ? e.touches[0] : e;
		var t = Ju(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[$l]._onDragOver(n);
		}
	}
}, $u = function(e) {
	Z && Z.parentNode[$l]._isOutsideThisEl(e.target);
};
function $(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = fl({}, t), e[$l] = this;
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
			return Ku(e, this.options);
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
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!Tl || El),
		emptyInsertThreshold: 5
	};
	for (var r in au.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in Yu(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Wu, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? J(e, "pointerdown", this._onTapStart) : (J(e, "mousedown", this._onTapStart), J(e, "touchstart", this._onTapStart)), this.nativeDraggable && (J(e, "dragover", this), J(e, "dragenter", this)), wu.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), fl(this, eu());
}
$.prototype = {
	constructor: $,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Mu = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, Z) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (ld(n), !Z && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Tl && s && s.tagName.toUpperCase() === "SELECT") && (s = jl(s, r.draggable, n, !1), !(s && s.animated) && pu !== s)) {
				if (gu = Vl(s), vu = Vl(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						lu({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), cu("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = jl(c, r.trim(), n, !1), r) return lu({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), cu("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || jl(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !Z && n.parentNode === i) {
			var c = Ll(n);
			if (du = i, Z = n, uu = Z.parentNode, fu = Z.nextSibling, pu = n, bu = a.group, $.dragged = Z, Tu = {
				target: Z,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, ku = Tu.clientX - c.left, Au = Tu.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, Z.style["will-change"] = "all", s = function() {
				if (cu("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !wl && r.nativeDraggable && (Z.draggable = !0), r._triggerDragStart(e, t), lu({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), Nl(Z, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Fl(Z, e.trim(), nd);
			}), J(o, "dragover", Qu), J(o, "mousemove", Qu), J(o, "touchmove", Qu), a.supportPointer ? (J(o, "pointerup", r._onDrop), !this.nativeDraggable && J(o, "pointercancel", r._onDrop)) : (J(o, "mouseup", r._onDrop), J(o, "touchend", r._onDrop), J(o, "touchcancel", r._onDrop)), wl && this.nativeDraggable && (this.options.touchStartThreshold = 4, Z.draggable = !0), cu("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Cl || Sl))) {
				if ($.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (J(o, "pointerup", r._disableDelayedDrag), J(o, "pointercancel", r._disableDelayedDrag)) : (J(o, "mouseup", r._disableDelayedDrag), J(o, "touchend", r._disableDelayedDrag), J(o, "touchcancel", r._disableDelayedDrag)), J(o, "mousemove", r._delayedDragTouchMoveHandler), J(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && J(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		Z && nd(Z), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		Y(e, "mouseup", this._disableDelayedDrag), Y(e, "touchend", this._disableDelayedDrag), Y(e, "touchcancel", this._disableDelayedDrag), Y(e, "pointerup", this._disableDelayedDrag), Y(e, "pointercancel", this._disableDelayedDrag), Y(e, "mousemove", this._delayedDragTouchMoveHandler), Y(e, "touchmove", this._delayedDragTouchMoveHandler), Y(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? J(document, "pointermove", this._onTouchMove) : t ? J(document, "touchmove", this._onTouchMove) : J(document, "mousemove", this._onTouchMove) : (J(Z, "dragend", this), J(du, "dragstart", this._onDragStart));
		try {
			document.selection ? ud(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (Su = !1, du && Z) {
			cu("dragStarted", this, { evt: t }), this.nativeDraggable && J(document, "dragover", $u);
			var n = this.options;
			!e && Nl(Z, n.dragClass, !1), Nl(Z, n.ghostClass, !0), $.active = this, e && this._appendGhost(), lu({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (Eu) {
			this._lastX = Eu.clientX, this._lastY = Eu.clientY, Xu();
			for (var e = document.elementFromPoint(Eu.clientX, Eu.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Eu.clientX, Eu.clientY), e !== t);) t = e;
			if (Z.parentNode[$l]._isOutsideThisEl(e), t) do {
				if (t[$l]) {
					var n = void 0;
					if (n = t[$l]._onDragOver({
						clientX: Eu.clientX,
						clientY: Eu.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = Al(t));
			Zu();
		}
	},
	_onTouchMove: function(e) {
		if (Tu) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = Q && Pl(Q, !0), o = Q && a && a.a, s = Q && a && a.d, c = Hu && Lu && Hl(Lu), l = (i.clientX - Tu.clientX + r.x) / (o || 1) + (c ? c[0] - Ru[0] : 0) / (o || 1), u = (i.clientY - Tu.clientY + r.y) / (s || 1) + (c ? c[1] - Ru[1] : 0) / (s || 1);
			if (!$.active && !Su) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (Q) {
				a ? (a.e += l - (Du || 0), a.f += u - (Ou || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				X(Q, "webkitTransform", d), X(Q, "mozTransform", d), X(Q, "msTransform", d), X(Q, "transform", d), Du = l, Ou = u, Eu = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!Q) {
			var e = this.options.fallbackOnBody ? document.body : du, t = Ll(Z, !0, Hu, !0, e), n = this.options;
			if (Hu) {
				for (Lu = e; X(Lu, "position") === "static" && X(Lu, "transform") === "none" && Lu !== document;) Lu = Lu.parentNode;
				Lu !== document.body && Lu !== document.documentElement ? (Lu === document && (Lu = Il()), t.top += Lu.scrollTop, t.left += Lu.scrollLeft) : Lu = Il(), Ru = Hl(Lu);
			}
			Q = Z.cloneNode(!0), Nl(Q, n.ghostClass, !1), Nl(Q, n.fallbackClass, !0), Nl(Q, n.dragClass, !0), X(Q, "transition", ""), X(Q, "transform", ""), X(Q, "box-sizing", "border-box"), X(Q, "margin", 0), X(Q, "top", t.top), X(Q, "left", t.left), X(Q, "width", t.width), X(Q, "height", t.height), X(Q, "opacity", "0.8"), X(Q, "position", Hu ? "absolute" : "fixed"), X(Q, "zIndex", "100000"), X(Q, "pointerEvents", "none"), $.ghost = Q, e.appendChild(Q), X(Q, "transform-origin", ku / parseInt(Q.style.width) * 100 + "% " + Au / parseInt(Q.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (cu("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		cu("setupClone", this), $.eventCanceled || (mu = Zl(Z), mu.removeAttribute("id"), mu.draggable = !1, mu.style["will-change"] = "", this._hideClone(), Nl(mu, this.options.chosenClass, !1), $.clone = mu), n.cloneId = ud(function() {
			cu("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || du.insertBefore(mu, Z), n._hideClone(), lu({
				sortable: n,
				name: "clone"
			}));
		}), !t && Nl(Z, i.dragClass, !0), t ? (Cu = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (Y(document, "mouseup", n._onDrop), Y(document, "touchend", n._onDrop), Y(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, Z)), J(document, "drop", n), X(Z, "transform", "translateZ(0)")), Su = !0, n._dragStartId = ud(n._dragStarted.bind(n, t, e)), J(document, "selectstart", n), ju = !0, window.getSelection().removeAllRanges(), Tl && X(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = bu === s, u = o.sort, d = xu || c, f, p = this, m = !1;
		if (zu) return;
		function h(o, s) {
			cu(o, p, ml({
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
					return td(du, t, Z, r, n, Ll(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (Nl(Z, xu ? xu.options.ghostClass : c.options.ghostClass, !1), Nl(Z, o.ghostClass, !0)), xu !== p && p !== $.active ? xu = p : p === $.active && xu && (xu = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === Z && !Z.animated || n === t && !n.animated) && (Mu = null), !o.dragoverBubble && !e.rootEl && n !== document && (Z.parentNode[$l]._isOutsideThisEl(e.target), !r && Qu(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			_u = Vl(Z), yu = Vl(Z, o.draggable), lu({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: _u,
				newDraggableIndex: yu,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = jl(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (Z.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (Cu = !1, c && !o.disabled && (l ? u || (a = uu !== du) : xu === this || (this.lastPutMode = bu.checkPull(this, c, Z, e)) && s.checkPut(this, c, Z, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = Ll(Z), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return uu = du, g(), this._hideClone(), h("revert"), $.eventCanceled || (fu ? du.insertBefore(Z, fu) : du.appendChild(Z)), _(!0);
			var y = Bl(t, o.draggable);
			if (!y || ad(e, f, this) && !y.animated) {
				if (y === Z) return _(!1);
				if (y && t === e.target && (n = y), n && (i = Ll(n)), td(du, t, Z, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(Z, y.nextSibling) : t.appendChild(Z), uu = t, v(), _(!0);
			} else if (y && id(e, f, this)) {
				var b = zl(t, 0, o, !0);
				if (b === Z) return _(!1);
				if (n = b, i = Ll(n), td(du, t, Z, r, n, i, e, !1) !== !1) return g(), t.insertBefore(Z, b), uu = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = Ll(n);
				var x = 0, S, C = Z.parentNode !== t, w = !qu(Z.animated && Z.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Rl(n, "top", "top") || Rl(Z, "top", "top"), D = E ? E.scrollTop : void 0;
				Mu !== n && (S = i[T], Pu = !1, Fu = !w && o.invertSwap || C), x = od(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Fu, Mu === n);
				var O;
				if (x !== 0) {
					var k = Vl(Z);
					do
						k -= x, O = uu.children[k];
					while (O && (X(O, "display") === "none" || O === Q));
				}
				if (x === 0 || O === n) return _(!1);
				Mu = n, Nu = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = td(du, t, Z, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), zu = !0, setTimeout(rd, 30), g(), j && !A ? t.appendChild(Z) : n.parentNode.insertBefore(Z, j ? A : n), E && Xl(E, 0, D - E.scrollTop), uu = Z.parentNode, S !== void 0 && !Fu && (Iu = Math.abs(S - Ll(n)[T])), v(), _(!0);
			}
			if (t.contains(Z)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		Y(document, "mousemove", this._onTouchMove), Y(document, "touchmove", this._onTouchMove), Y(document, "pointermove", this._onTouchMove), Y(document, "dragover", Qu), Y(document, "mousemove", Qu), Y(document, "touchmove", Qu);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		Y(e, "mouseup", this._onDrop), Y(e, "touchend", this._onDrop), Y(e, "pointerup", this._onDrop), Y(e, "pointercancel", this._onDrop), Y(e, "touchcancel", this._onDrop), Y(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (_u = Vl(Z), yu = Vl(Z, n.draggable), cu("drop", this, { evt: e }), uu = Z && Z.parentNode, _u = Vl(Z), yu = Vl(Z, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		Su = !1, Fu = !1, Pu = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), dd(this.cloneId), dd(this._dragStartId), this.nativeDraggable && (Y(document, "drop", this), Y(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Tl && X(document.body, "user-select", ""), X(Z, "transform", ""), e && (ju && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), Q && Q.parentNode && Q.parentNode.removeChild(Q), (du === uu || xu && xu.lastPutMode !== "clone") && mu && mu.parentNode && mu.parentNode.removeChild(mu), Z && (this.nativeDraggable && Y(Z, "dragend", this), nd(Z), Z.style["will-change"] = "", ju && !Su && Nl(Z, xu ? xu.options.ghostClass : this.options.ghostClass, !1), Nl(Z, this.options.chosenClass, !1), lu({
			sortable: this,
			name: "unchoose",
			toEl: uu,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), du === uu ? _u !== gu && _u >= 0 && (lu({
			sortable: this,
			name: "update",
			toEl: uu,
			originalEvent: e
		}), lu({
			sortable: this,
			name: "sort",
			toEl: uu,
			originalEvent: e
		})) : (_u >= 0 && (lu({
			rootEl: uu,
			name: "add",
			toEl: uu,
			fromEl: du,
			originalEvent: e
		}), lu({
			sortable: this,
			name: "remove",
			toEl: uu,
			originalEvent: e
		}), lu({
			rootEl: uu,
			name: "sort",
			toEl: uu,
			fromEl: du,
			originalEvent: e
		}), lu({
			sortable: this,
			name: "sort",
			toEl: uu,
			originalEvent: e
		})), xu && xu.save()), $.active && ((_u == null || _u === -1) && (_u = gu, yu = vu), lu({
			sortable: this,
			name: "end",
			toEl: uu,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		cu("nulling", this), du = Z = uu = Q = fu = mu = pu = hu = Tu = Eu = ju = _u = yu = gu = vu = Mu = Nu = xu = bu = $.dragged = $.ghost = $.clone = $.active = null;
		var e = this.el;
		Bu.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), Bu.length = Du = Ou = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				Z && (this._onDragOver(e), ed(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], jl(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || cd(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			jl(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return jl(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = au.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && Yu(n);
	},
	destroy: function() {
		cu("destroy", this);
		var e = this.el;
		e[$l] = null, Y(e, "mousedown", this._onTapStart), Y(e, "touchstart", this._onTapStart), Y(e, "pointerdown", this._onTapStart), this.nativeDraggable && (Y(e, "dragover", this), Y(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), wu.splice(wu.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!hu) {
			if (cu("hideClone", this), $.eventCanceled) return;
			X(mu, "display", "none"), this.options.removeCloneOnHide && mu.parentNode && mu.parentNode.removeChild(mu), hu = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (hu) {
			if (cu("showClone", this), $.eventCanceled) return;
			Z.parentNode == du && !this.options.group.revertClone ? du.insertBefore(mu, Z) : fu ? du.insertBefore(mu, fu) : du.appendChild(mu), this.options.group.revertClone && this.animate(Z, mu), X(mu, "display", ""), hu = !1;
		}
	}
};
function ed(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function td(e, t, n, r, i, a, o, s) {
	var c, l = e[$l], u = l.options.onMove, d;
	return window.CustomEvent && !Sl && !Cl ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || Ll(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function nd(e) {
	e.draggable = !1;
}
function rd() {
	zu = !1;
}
function id(e, t, n) {
	var r = Ll(zl(n.el, 0, n.options, !0)), i = Ql(n.el, n.options, Q), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function ad(e, t, n) {
	var r = Ll(Bl(n.el, n.options.draggable)), i = Ql(n.el, n.options, Q), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function od(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Iu < l * i) {
			if (!Pu && (Nu === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Pu = !0), Pu) f = !0;
			else if (Nu === 1 ? c < u + Iu : c > d - Iu) return -Nu;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return sd(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function sd(e) {
	return Vl(Z) < Vl(e) ? 1 : -1;
}
function cd(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function ld(e) {
	Bu.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Bu.push(r);
	}
}
function ud(e) {
	return setTimeout(e, 0);
}
function dd(e) {
	return clearTimeout(e);
}
Vu && J(document, "touchmove", function(e) {
	($.active || Su) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: J,
	off: Y,
	css: X,
	find: Fl,
	is: function(e, t) {
		return !!jl(e, t, e, !1);
	},
	extend: Gl,
	throttle: Jl,
	closest: jl,
	toggleClass: Nl,
	clone: Zl,
	index: Vl,
	nextTick: ud,
	cancelNextTick: dd,
	detectDirection: Ku,
	getChild: zl,
	expando: $l
}, $.get = function(e) {
	return e[$l];
}, $.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && ($.utils = ml(ml({}, $.utils), e.utils)), au.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = bl;
var fd = [], pd, md, hd = !1, gd, _d, vd, yd;
function bd() {
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
			this.sortable.nativeDraggable ? J(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? J(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? J(document, "touchmove", this._handleFallbackAutoScroll) : J(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? Y(document, "dragover", this._handleAutoScroll) : (Y(document, "pointermove", this._handleFallbackAutoScroll), Y(document, "touchmove", this._handleFallbackAutoScroll), Y(document, "mousemove", this._handleFallbackAutoScroll)), Sd(), xd(), Yl();
		},
		nulling: function() {
			vd = md = pd = hd = yd = gd = _d = null, fd.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (vd = e, t || this.options.forceAutoScrollFallback || Cl || Sl || Tl) {
				Cd(e, this.options, a, t);
				var o = Wl(a, !0);
				hd && (!yd || r !== gd || i !== _d) && (yd && Sd(), yd = setInterval(function() {
					var a = Wl(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, xd()), Cd(e, n.options, a, t);
				}, 10), gd = r, _d = i);
			} else {
				if (!this.options.bubbleScroll || Wl(a, !0) === Il()) {
					xd();
					return;
				}
				Cd(e, this.options, Wl(a, !1), !1);
			}
		}
	}, fl(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function xd() {
	fd.forEach(function(e) {
		clearInterval(e.pid);
	}), fd = [];
}
function Sd() {
	clearInterval(yd);
}
var Cd = Jl(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Il(), l = !1, u;
		md !== n && (md = n, xd(), pd = t.scroll, u = t.scrollFn, pd === !0 && (pd = Wl(n, !0)));
		var d = 0, f = pd;
		do {
			var p = f, m = Ll(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = X(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!fd[d]) for (var A = 0; A <= d; A++) fd[A] || (fd[A] = {});
			(fd[d].vx != O || fd[d].vy != k || fd[d].el !== p) && (fd[d].el = p, fd[d].vx = O, fd[d].vy = k, clearInterval(fd[d].pid), (O != 0 || k != 0) && (l = !0, fd[d].pid = setInterval(function() {
				r && this.layer === 0 && $.active._onTouchMove(vd);
				var t = fd[this.layer].vy ? fd[this.layer].vy * s : 0, n = fd[this.layer].vx ? fd[this.layer].vx * s : 0;
				(typeof u != "function" || u.call($.dragged.parentNode[$l], n, t, e, vd, fd[this.layer].el) === "continue") && Xl(fd[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Wl(f, !1)));
		hd = l;
	}
}, 30), wd = function(e) {
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
function Td() {}
Td.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = zl(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: wd
}, fl(Td, { pluginName: "revertOnSpill" });
function Ed() {}
Ed.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: wd
}, fl(Ed, { pluginName: "removeOnSpill" }), $.mount(new bd()), $.mount(Ed, Td);
//#endregion
//#region resources/js/components/TaskCard.vue?vue&type=script&setup=true&lang.ts
var Dd = { class: "flex items-start justify-between gap-2" }, Od = { class: "text-sm font-medium text-heading" }, kd = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, Ad = ["title"], jd = { class: "mt-3 flex items-center justify-between gap-2" }, Md = {
	key: 0,
	class: "text-xs tabular-nums text-muted"
}, Nd = { class: "mt-2 flex items-center justify-between" }, Pd = {
	key: 1,
	class: "text-xs text-subtle"
}, Fd = ["title"], Id = /* @__PURE__ */ l({
	__name: "TaskCard",
	props: {
		client: {},
		notify: {},
		task: {},
		projects: { default: () => [] },
		members: { default: () => [] }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = {
			LOW: "bg-surface-tertiary text-muted",
			NORMAL: "bg-primary-50 text-primary-500",
			HIGH: "bg-alert-warning-bg text-alert-warning-text",
			URGENT: "bg-alert-error-bg text-alert-error-text"
		}, u = B(), d = n(() => nt(r.task)), f = n(() => r.projects.find((e) => e.id === r.task.project_id)), m = n(() => r.task.project_id === null ? null : f.value?.identifier || f.value?.name || null), h = n(() => [f.value?.name, $t(r.task.customer_id)].filter(Boolean).join(" · ")), g = n(() => r.members.find((e) => e.id === r.task.assignee_id)), _ = n(() => r.task.assignee_id === null ? null : g.value ? pt(g.value.name) : `#${r.task.assignee_id}`), y = n(() => g.value?.name ?? (r.task.assignee_id === null ? u("tasks_projects.tasks.unassigned") : `#${r.task.assignee_id}`)), b = n(() => Na(d.value.logged_minutes));
		function x(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		return (t, n) => (v(), a("article", {
			class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
			onClick: n[1] ||= (t) => s("open", e.task)
		}, [
			o("div", Dd, [o("p", Od, C(e.task.name), 1), e.task.priority ? (v(), a("span", {
				key: 0,
				class: p(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", l[e.task.priority]])
			}, C(x(e.task.priority)), 3)) : i("", !0)]),
			o("div", kd, [
				o("span", null, "#" + C(e.task.number), 1),
				m.value ? (v(), a("span", {
					key: 0,
					class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body",
					title: h.value
				}, C(m.value), 9, Ad)) : i("", !0),
				c(da, { state: d.value.invoiced }, null, 8, ["state"])
			]),
			o("div", jd, [c(go, {
				client: e.client,
				notify: e.notify,
				task: e.task,
				members: e.members,
				onClick: n[0] ||= A(() => {}, ["stop"])
			}, null, 8, [
				"client",
				"notify",
				"task",
				"members"
			]), d.value.logged_minutes > 0 ? (v(), a("span", Md, C(b.value), 1)) : i("", !0)]),
			o("div", Nd, [e.task.due_date ? (v(), a("span", {
				key: 0,
				class: p(["text-xs", w(mt)(e.task.due_date) && !e.task.closed_at ? "font-medium text-status-red" : "text-muted"])
			}, C(w(ut)(e.task.due_date)), 3)) : (v(), a("span", Pd, "-")), _.value ? (v(), a("span", {
				key: 2,
				class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
				title: y.value
			}, C(_.value), 9, Fd)) : i("", !0)])
		]));
	}
}), Ld = { class: "mt-4" }, Rd = {
	key: 0,
	class: "mb-3 text-xs text-subtle"
}, zd = {
	key: 1,
	class: "flex justify-center py-16"
}, Bd = {
	key: 3,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, Vd = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, Hd = { class: "flex items-center" }, Ud = { class: "text-sm font-semibold text-heading" }, Wd = { class: "ml-2 text-xs text-muted" }, Gd = [
	"aria-label",
	"title",
	"onClick"
], Kd = ["data-status-id"], qd = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, Jd = { class: "px-3 pt-2 pb-3" }, Yd = ["onClick"], Xd = /* @__PURE__ */ l({
	__name: "TasksBoardView",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		filters: {},
		statuses: {},
		members: {},
		projects: {}
	},
	setup(t, { expose: s }) {
		let l = t, u = B(), d = b([]), f = b(!0), g = b(!1), _ = b(null), y = b({}), T = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map(), k = !1, A = n(() => l.projects.map((e) => ({
			id: e.id,
			label: e.name
		}))), j = n(() => !f.value && d.value.length === 0), M = n(() => G.settings.hide_invoiced_on_board);
		function N(e) {
			return (e.tasks ?? []).filter((e) => {
				let t = nt(e).invoiced;
				return M.value && t === "invoiced" ? !1 : zi(l.filters.status) ? l.filters.status === "invoiced" ? t === "invoiced" : t !== "invoiced" : !0;
			});
		}
		E(() => `${l.filters.project}|${l.filters.user}`, () => void P(), { immediate: !0 }), E(et, () => void P()), h(() => {
			for (let e of T.values()) e.destroy();
			T.clear(), O.clear();
		});
		async function P() {
			let e = {}, t = Ki(l.filters.project), n = Ki(l.filters.user);
			t !== null && (e.project_id = t), n !== null && (e.assignee_id = n), f.value = !0;
			try {
				d.value = await ar(l.client, e), d.value.some((e) => e.tasks.some((e) => e.customer_id !== null)) && en(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.board.load_failed")));
			} finally {
				f.value = !1;
			}
		}
		function F(e, t) {
			let n = t instanceof HTMLElement ? t : null;
			O.get(e) !== n && (T.get(e)?.destroy(), T.delete(e), O.delete(e), n !== null && (O.set(e, n), T.set(e, $.create(n, {
				group: "tasks",
				animation: 150,
				draggable: "[data-task-id]",
				ghostClass: "opacity-40",
				onStart: () => {
					k = !0;
				},
				onEnd: (e) => {
					R(e), setTimeout(() => {
						k = !1;
					});
				}
			}))));
		}
		function I(e) {
			let t = e.item, n = e.oldIndex ?? 0;
			t.parentNode?.removeChild(t), e.from.insertBefore(t, e.from.children[n] ?? null);
		}
		function L(e) {
			return d.value.find((t) => t.status.id === e);
		}
		async function R(e) {
			let t = Number(e.from.dataset.statusId), n = Number(e.to.dataset.statusId), r = e.oldIndex ?? 0, i = e.newIndex ?? 0;
			if (I(e), Number.isNaN(t) || Number.isNaN(n) || t === n && r === i) return;
			let a = L(t), o = L(n);
			if (!a || !o) return;
			let s = N(a)[r], c = s ? a.tasks.findIndex((e) => e.id === s.id) : -1;
			if (!s || c === -1) return;
			let d = {
				from: [...a.tasks],
				to: [...o.tasks]
			};
			a.tasks.splice(c, 1);
			let f = N(o), p = f[i - 1] ?? null, m = f[i] ?? null, h = p === null ? 0 : o.tasks.findIndex((e) => e.id === p.id) + 1;
			o.tasks.splice(h, 0, s);
			try {
				let e = await gr(l.client, s.id, {
					task_status_id: n,
					before_id: p?.id ?? null,
					after_id: m?.id ?? null
				});
				Object.assign(s, e), t !== n && l.notify("success", u("tasks_projects.board.moved", {
					name: s.name,
					status: o.status.name
				}));
			} catch (e) {
				a.tasks = d.from, o.tasks = d.to, l.notify("error", H(e, u("tasks_projects.board.move_failed")));
			}
		}
		function z(e) {
			let t = e ?? l.statuses.find((e) => e.is_default) ?? l.statuses[0];
			_.value = null, y.value = {
				task_status_id: t?.id ?? null,
				project_id: Ki(l.filters.project)
			}, g.value = !0;
		}
		function ee(e) {
			k || (_.value = e, y.value = {}, g.value = !0);
		}
		function te(e) {
			let t = _.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			g.value = !1, _.value = null, l.notify("success", t), V();
		}
		function ne(e) {
			g.value = !1, _.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), V();
		}
		return s({ openCreate: () => z(null) }), (n, s) => {
			let l = S("BaseSpinner"), h = S("BaseIcon"), b = S("BaseEmptyPlaceholder");
			return v(), a("section", Ld, [
				M.value ? (v(), a("p", Rd, C(w(u)("tasks_projects.board.hidden_invoiced")), 1)) : i("", !0),
				f.value && d.value.length === 0 ? (v(), a("div", zd, [c(l, { class: "h-8 w-8 text-primary-500" })])) : j.value ? (v(), r(b, {
					key: 2,
					title: w(u)("tasks_projects.task_statuses.none"),
					description: w(u)("tasks_projects.tasks.empty_description")
				}, {
					default: D(() => [c(h, {
						name: "ViewColumnsIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"])) : (v(), a("div", Bd, [(v(!0), a(e, null, x(d.value, (n) => (v(), a("section", {
					key: n.status.id,
					class: "w-64 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
				}, [
					o("header", Vd, [o("div", Hd, [
						o("span", {
							class: p(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", n.status.colour ? "" : "bg-line-default"]),
							style: m(n.status.colour ? { backgroundColor: n.status.colour } : void 0)
						}, null, 6),
						o("h3", Ud, C(n.status.name), 1),
						o("span", Wd, C(N(n).length), 1)
					]), o("button", {
						type: "button",
						class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
						"aria-label": w(u)("tasks_projects.tasks.new_task"),
						title: w(u)("tasks_projects.tasks.new_task"),
						onClick: (e) => z(n.status)
					}, [c(h, {
						name: "PlusIcon",
						class: "h-4 w-4"
					})], 8, Gd)]),
					o("div", {
						ref_for: !0,
						ref: (e) => F(n.status.id, e),
						"data-status-id": n.status.id,
						class: "min-h-20 space-y-2 px-3 pt-3"
					}, [(v(!0), a(e, null, x(N(n), (e) => (v(), r(Id, {
						key: e.id,
						"data-task-id": e.id,
						client: t.client,
						notify: t.notify,
						task: e,
						projects: t.projects,
						members: t.members,
						onOpen: ee
					}, null, 8, [
						"data-task-id",
						"client",
						"notify",
						"task",
						"projects",
						"members"
					]))), 128))], 8, Kd),
					N(n).length === 0 ? (v(), a("p", qd, C(w(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
					o("div", Jd, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
						onClick: (e) => z(n.status)
					}, " + " + C(w(u)("tasks_projects.tasks.new_task")), 9, Yd)])
				]))), 128))])),
				c(ya, {
					show: g.value,
					client: t.client,
					notify: t.notify,
					task: _.value,
					statuses: t.statuses,
					members: t.members,
					projects: A.value,
					defaults: y.value,
					compact: _.value === null,
					onClose: s[0] ||= (e) => g.value = !1,
					onSaved: te,
					onDeleted: ne
				}, null, 8, [
					"show",
					"client",
					"notify",
					"task",
					"statuses",
					"members",
					"projects",
					"defaults",
					"compact"
				])
			]);
		};
	}
}), Zd = /* @__PURE__ */ l({
	__name: "TasksListView",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {},
		filters: {},
		statuses: {},
		members: {},
		projects: {}
	},
	setup(e, { expose: t }) {
		let n = b(null);
		return t({ openCreate: () => n.value?.openCreate() }), (t, i) => (v(), r(To, {
			ref_key: "listRef",
			ref: n,
			client: e.client,
			notify: e.notify,
			router: e.router,
			filters: e.filters,
			statuses: e.statuses,
			members: e.members,
			projects: e.projects
		}, null, 8, [
			"client",
			"notify",
			"router",
			"filters",
			"statuses",
			"members",
			"projects"
		]));
	}
}), Qd = { class: "relative table-container" }, $d = { class: "block max-w-64 truncate" }, ef = { class: "tabular-nums" }, tf = {
	key: 1,
	class: "text-subtle"
}, nf = /* @__PURE__ */ l({
	__name: "AllTimeTable",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		members: {},
		memberId: {},
		projectId: {},
		reloadToken: {}
	},
	emits: ["edit", "delete"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), f = b(null), m = y({
			from: "",
			to: "",
			billing: "ALL"
		}), h = n(() => [
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
		]), g = n({
			get: () => x(h.value, m.billing),
			set: (e) => {
				m.billing = typeof e.id == "string" ? e.id : "ALL";
			}
		}), _ = n(() => [
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
		E(m, () => T()), E([() => l.memberId, () => l.projectId], () => T()), E(() => l.reloadToken, () => T(!0));
		function x(e, t) {
			return e.find((e) => e.id === t) ?? e[0];
		}
		function T(e = !1) {
			f.value?.refresh(e);
		}
		function O() {
			m.from = "", m.to = "", m.billing = "ALL";
		}
		function k(e) {
			m.from = e ? dt(e) : "";
		}
		function A(e) {
			m.to = e ? dt(e) : "";
		}
		function j(e) {
			let t = l.members.find((t) => t.id === e);
			return t === void 0 ? l.members.length === 0 ? `#${e}` : d("tasks_projects.time.unknown_member") : t.name;
		}
		async function M({ page: e }) {
			let t = {
				page: e,
				limit: 25
			};
			l.memberId !== null && (t.user_id = l.memberId), l.projectId !== null && (t.project_id = l.projectId), m.from !== "" && (t.from = m.from), m.to !== "" && (t.to = m.to), m.billing !== "ALL" && (t.billed = m.billing === "BILLED");
			try {
				let e = await De(l.client, t), n = e.data ?? [];
				return $e(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
					data: n,
					pagination: N(e.meta, n.length)
				};
			} catch (e) {
				return l.notify("error", H(e, d("tasks_projects.time.load_failed"))), {
					data: [],
					pagination: N(null, 0)
				};
			}
		}
		function N(e, t) {
			return {
				totalPages: e?.last_page ?? 1,
				currentPage: e?.current_page ?? 1,
				totalCount: e?.total ?? t,
				count: t,
				limit: e?.per_page ?? 25
			};
		}
		return (e, t) => {
			let n = S("BaseDatePicker"), l = S("BaseInputGroup"), y = S("BaseSelectInput"), b = S("BaseFilterWrapper"), x = S("BaseBadge"), T = S("BaseFormatMoney"), E = S("BaseIcon"), N = S("BaseDropdownItem"), P = S("BaseDropdown"), F = S("BaseTable");
			return v(), a("section", null, [c(b, {
				show: "",
				"row-on-xl": "",
				class: "mt-3",
				onClear: O
			}, {
				default: D(() => [
					c(l, {
						label: w(d)("tasks_projects.time.filters.from"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(n, {
							"model-value": m.from,
							"onUpdate:modelValue": k
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: w(d)("tasks_projects.time.filters.to"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(n, {
							"model-value": m.to,
							"onUpdate:modelValue": A
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: w(d)("tasks_projects.time.filters.billing"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(y, {
							modelValue: g.value,
							"onUpdate:modelValue": t[0] ||= (e) => g.value = e,
							options: h.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])
				]),
				_: 1
			}), o("div", Qd, [c(F, {
				ref_key: "tableRef",
				ref: f,
				data: M,
				columns: _.value,
				class: "mt-3"
			}, {
				"cell-date": D(({ row: e }) => [s(C(w(ut)(w(Ia)(e.data.started_at))), 1)]),
				"cell-member": D(({ row: e }) => [s(C(j(e.data.user_id)), 1)]),
				"cell-task": D(({ row: e }) => [s(C(w(Ze)(e.data.task_id)), 1)]),
				"cell-description": D(({ row: e }) => [o("span", $d, C(e.data.description || "-"), 1)]),
				"cell-duration": D(({ row: e }) => [o("span", ef, C(w(Na)(e.data.duration_minutes)), 1)]),
				"cell-billable": D(({ row: e }) => [c(x, { class: p(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: D(() => [s(C(e.data.billable ? w(d)("tasks_projects.time.billable") : w(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": D(({ row: e }) => [e.data.billable ? (v(), r(T, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (v(), a("span", tf, "-"))]),
				"cell-actions": D(({ row: e }) => [c(P, null, {
					activator: D(() => [c(E, {
						name: "EllipsisHorizontalIcon",
						class: "h-5 text-muted"
					})]),
					default: D(() => [c(N, { onClick: (t) => u("edit", e.data) }, {
						default: D(() => [c(E, {
							name: "PencilIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
						_: 1
					}, 8, ["onClick"]), e.data.invoice_id === null ? (v(), r(N, {
						key: 0,
						onClick: (t) => u("delete", e.data)
					}, {
						default: D(() => [c(E, {
							name: "TrashIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + C(w(d)("tasks_projects.general.delete")), 1)]),
						_: 1
					}, 8, ["onClick"])) : i("", !0)]),
					_: 2
				}, 1024)]),
				_: 1
			}, 8, ["columns"])])]);
		};
	}
}), rf = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, af = { class: "flex items-center gap-2" }, of = { class: "ml-1 text-sm text-muted" }, sf = { class: "flex items-center gap-2 text-sm" }, cf = { class: "text-muted" }, lf = { class: "text-lg font-semibold tabular-nums text-heading" }, uf = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, df = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, ff = { class: "flex items-baseline justify-between" }, pf = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, mf = { class: "text-xs text-muted" }, hf = { class: "text-sm font-medium tabular-nums text-heading" }, gf = { class: "mt-3 flex-1 space-y-2" }, _f = ["onClick"], vf = { class: "flex items-center justify-between gap-2" }, yf = { class: "truncate text-xs font-medium text-heading" }, bf = { class: "shrink-0 text-xs tabular-nums text-muted" }, xf = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, Sf = { class: "mt-1 flex items-center gap-1" }, Cf = { class: "text-[11px] text-subtle" }, wf = {
	key: 0,
	class: "text-[11px] text-subtle"
}, Tf = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, Ef = ["onClick"], Df = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, Of = /* @__PURE__ */ l({
	__name: "WeekTimesheet",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		userId: {},
		projectId: {},
		weekStart: {},
		reloadToken: {}
	},
	emits: ["add", "edit"],
	setup(t, { emit: l }) {
		let u = t, d = l, f = B(), m = b(Ba(/* @__PURE__ */ new Date(), u.weekStart)), h = b([]), g = b(!1), _ = n(() => Va(m.value)), y = n(() => {
			let e = _.value[0], t = _.value[_.value.length - 1];
			return `${Wa(e).day} - ${Wa(t).day}`;
		}), T = n(() => _.value.map((e) => {
			let t = Ua(e), n = h.value.filter((e) => Ia(e.started_at) === t), r = Wa(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: Ga(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !g.value && h.value.length === 0);
		E(() => u.weekStart, (e) => {
			m.value = Ba(m.value, e);
		}), E([
			m,
			() => u.userId,
			() => u.projectId,
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
			g.value = !0;
			try {
				let e = {
					user_id: u.userId,
					from: Ua(_.value[0]),
					to: Ua(_.value[_.value.length - 1])
				};
				u.projectId && (e.project_id = u.projectId);
				let t = await Oe(u.client, e);
				h.value = t, $e(u.client, t.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", H(e, f("tasks_projects.time.load_failed")));
			} finally {
				g.value = !1;
			}
		}
		function M(e) {
			m.value = Ha(m.value, e * 7);
		}
		function N() {
			m.value = Ba(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = S("BaseIcon"), m = S("BaseButton"), h = S("BaseSpinner");
			return v(), a("section", null, [
				o("header", rf, [o("div", af, [
					c(m, {
						variant: "white",
						size: "sm",
						title: w(f)("tasks_projects.time.previous_week"),
						onClick: l[0] ||= (e) => M(-1)
					}, {
						default: D(() => [c(u, {
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
						default: D(() => [s(C(w(f)("tasks_projects.time.this_week")), 1)]),
						_: 1
					}),
					c(m, {
						variant: "white",
						size: "sm",
						title: w(f)("tasks_projects.time.next_week"),
						onClick: l[1] ||= (e) => M(1)
					}, {
						default: D(() => [c(u, {
							name: "ChevronRightIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title"]),
					o("span", of, C(y.value), 1)
				]), o("div", sf, [
					o("span", cf, C(w(f)("tasks_projects.time.week_total")), 1),
					o("span", lf, C(w(Na)(O.value)), 1),
					g.value ? (v(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (v(), a("p", uf, C(w(f)("tasks_projects.time.unknown_user")), 1)) : (v(), a("div", df, [(v(!0), a(e, null, x(T.value, (t) => (v(), a("article", {
					key: t.key,
					class: p(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", ff, [o("div", null, [o("p", pf, C(t.weekday), 1), o("p", mf, C(t.day), 1)]), o("span", hf, C(w(Na)(t.minutes)), 1)]),
					o("ul", gf, [(v(!0), a(e, null, x(t.entries, (e) => (v(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", vf, [o("span", yf, C(w(Ze)(e.task_id)), 1), o("span", bf, C(w(Na)(e.duration_minutes)), 1)]),
						e.description ? (v(), a("span", xf, C(e.description), 1)) : i("", !0),
						o("span", Sf, [
							o("span", { class: p(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", Cf, C(e.billable ? w(f)("tasks_projects.time.billable") : w(f)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (v(), a("span", wf, " - " + C(w(f)("tasks_projects.time.billed")), 1))
						])
					], 8, _f)]))), 128)), t.entries.length === 0 ? (v(), a("li", Tf, C(w(f)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + C(w(f)("tasks_projects.time.add_entry")), 1)], 8, Ef)
				], 2))), 128))])),
				k.value && t.userId !== null ? (v(), a("p", Df, C(w(f)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), kf = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, Af = 5, jf = /* @__PURE__ */ l({
	__name: "TasksWeekView",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		filters: {},
		statuses: {},
		members: {},
		projects: {}
	},
	setup(e) {
		let t = e, s = B(), l = b("MINE"), u = b(!1), d = b(!1), f = b(null), m = b(Ua(/* @__PURE__ */ new Date())), h = b(0), _ = n(() => G.settings.week_start), y = n(() => Ki(t.filters.project)), x = n(() => Ki(t.filters.user) ?? G.userId);
		g(() => void S()), E(et, () => {
			h.value += 1;
		});
		async function S() {
			G.userId === null && await xa(t.client), u.value = G.settings.members_see_all_time || await T();
		}
		async function T() {
			try {
				return ((await De(t.client, { limit: Af })).data ?? []).some((e) => e.user_id !== G.userId);
			} catch {
				return !1;
			}
		}
		function D(e) {
			f.value = null, m.value = e ?? Ua(/* @__PURE__ */ new Date()), d.value = !0;
		}
		function O(e) {
			f.value = e, d.value = !0;
		}
		function k() {
			let e = f.value ? s("tasks_projects.time.updated") : s("tasks_projects.time.created");
			d.value = !1, f.value = null, t.notify("success", e), h.value += 1, V();
		}
		function A() {
			d.value = !1, f.value = null, t.notify("success", s("tasks_projects.time.deleted")), h.value += 1, V();
		}
		async function j(e) {
			if (window.confirm(s("tasks_projects.time.delete_confirm"))) try {
				await je(t.client, e.id), t.notify("success", s("tasks_projects.time.deleted")), h.value += 1, V();
			} catch (e) {
				t.notify("error", H(e, s("tasks_projects.time.delete_failed")));
			}
		}
		function M(e) {
			return l.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => (v(), a("section", null, [
			u.value ? (v(), a("nav", kf, [o("button", {
				type: "button",
				class: p(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("MINE")]),
				onClick: n[0] ||= (e) => l.value = "MINE"
			}, C(w(s)("tasks_projects.time.my_time")), 3), o("button", {
				type: "button",
				class: p(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("ALL")]),
				onClick: n[1] ||= (e) => l.value = "ALL"
			}, C(w(s)("tasks_projects.time.all_time")), 3)])) : i("", !0),
			l.value === "MINE" ? (v(), r(Of, {
				key: 1,
				client: e.client,
				notify: e.notify,
				"user-id": x.value,
				"project-id": y.value,
				"week-start": _.value,
				"reload-token": h.value,
				onAdd: D,
				onEdit: O
			}, null, 8, [
				"client",
				"notify",
				"user-id",
				"project-id",
				"week-start",
				"reload-token"
			])) : (v(), r(nf, {
				key: 2,
				client: e.client,
				notify: e.notify,
				members: e.members,
				"member-id": w(Ki)(e.filters.user),
				"project-id": y.value,
				"reload-token": h.value,
				onEdit: O,
				onDelete: j
			}, null, 8, [
				"client",
				"notify",
				"members",
				"member-id",
				"project-id",
				"reload-token"
			])),
			c(zo, {
				show: d.value,
				client: e.client,
				notify: e.notify,
				entry: f.value,
				"default-date": m.value,
				onClose: n[2] ||= (e) => d.value = !1,
				onSaved: k,
				onDeleted: A
			}, null, 8, [
				"show",
				"client",
				"notify",
				"entry",
				"default-date"
			])
		]));
	}
}), Mf = {
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function Nf(e) {
	e.addMessages(qs), e.registerPage({
		id: "tasks",
		module: U,
		path: "",
		component: sn(e, ul),
		meta: {
			ability: Mf.viewTask,
			title: "tasks_projects.tasks.title"
		},
		children: [
			{
				id: "list",
				path: "",
				component: sn(e, Zd),
				meta: {
					ability: Mf.viewTask,
					title: "tasks_projects.tasks.views.list"
				}
			},
			{
				id: "board",
				path: "board",
				component: sn(e, Xd),
				meta: {
					ability: Mf.viewTask,
					title: "tasks_projects.board.title"
				}
			},
			{
				id: "week",
				path: "week",
				component: sn(e, jf),
				meta: {
					ability: Mf.viewOwnTime,
					title: "tasks_projects.time.title"
				}
			}
		]
	}), e.registerPage({
		id: "task",
		module: U,
		path: "tasks/:id",
		component: sn(e, rl),
		meta: {
			ability: Mf.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "time",
		module: U,
		path: "time",
		component: Pf(e),
		meta: {
			ability: Mf.viewOwnTime,
			title: "tasks_projects.time.title"
		}
	});
}
function Pf(e) {
	return l({ setup: () => (g(() => {
		e.router.replace(W.week);
	}), () => null) });
}
//#endregion
//#region resources/js/components/QuickStartOverlay.vue?vue&type=script&setup=true&lang.ts
var Ff = ["aria-label"], If = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, Lf = { class: "text-sm font-semibold text-heading" }, Rf = ["aria-label"], zf = { class: "space-y-4 px-4 py-4" }, Bf = { class: "truncate text-sm font-medium text-heading" }, Vf = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, Hf = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, Uf = { class: "flex items-center justify-between" }, Wf = ["title", "aria-label"], Gf = {
	key: 0,
	class: "tabular-nums"
}, Kf = "[aria-label=\"Open AI Assistant\"]", qf = "/admin/settings", Jf = /* @__PURE__ */ l({
	__name: "QuickStartOverlay",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		enabled: { type: Boolean },
		router: {}
	},
	emits: ["open-task"],
	setup(e, { emit: l }) {
		let u = e, d = l, f = B(), m = b(!1), _ = b(window.location.pathname), y = b(!1), x, T = n(() => ({
			notify: u.notify,
			t: f
		})), O = n(() => Ze(q.running?.task_id ?? null)), A = n(() => Ma(q.elapsedSeconds)), j = n(() => q.stopPrompt !== null || q.startPrompt !== null), M = n(() => j.value || _.value.startsWith(qf)), N = n(() => y.value ? "bottom-24" : "bottom-5");
		function P() {
			y.value = Array.from(document.querySelectorAll(Kf)).some((e) => window.getComputedStyle(e).position === "fixed");
		}
		E(() => u.enabled, (e) => {
			e || F();
		}), E(() => q.running, (e) => {
			e === null && F();
		}), g(() => {
			_.value = u.router.currentRoute.value.path, x = u.router.afterEach((e) => {
				_.value = e.path, P();
			}), P();
		}), h(() => {
			x?.();
		});
		function F() {
			m.value = !1;
		}
		function I() {
			if (q.running === null) {
				q.startWithPrompt(u.client, T.value);
				return;
			}
			m.value = !m.value;
		}
		function L() {
			q.stopWithPrompt(u.client, T.value);
		}
		function R() {
			F(), d("open-task");
		}
		return (n, l) => {
			let u = S("BaseIcon"), d = S("BaseButton");
			return v(), r(t, { to: "body" }, [e.enabled && !M.value ? (v(), a("div", {
				key: 0,
				class: p(["fixed right-5 z-40 flex flex-col items-end gap-3", N.value])
			}, [m.value && w(q).running !== null ? (v(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": w(f)("tasks_projects.timer.panel_title"),
				onKeydown: k(F, ["esc"])
			}, [o("header", If, [o("h2", Lf, C(w(f)("tasks_projects.timer.running")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": w(f)("tasks_projects.timer.close"),
				onClick: F
			}, [c(u, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Rf)]), o("div", zf, [o("div", null, [
				o("p", Bf, C(O.value), 1),
				o("p", Vf, C(A.value), 1),
				w(q).running.description ? (v(), a("p", Hf, C(w(q).running.description), 1)) : i("", !0)
			]), o("div", Uf, [o("button", {
				type: "button",
				class: "text-xs text-primary-500 hover:underline",
				onClick: R
			}, C(w(f)("tasks_projects.timer.open_task")), 1), c(d, {
				variant: "primary",
				disabled: w(q).busy,
				onClick: L
			}, {
				left: D((e) => [c(u, {
					name: "StopIcon",
					class: p(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + C(w(f)("tasks_projects.timer.stop")), 1)]),
				_: 1
			}, 8, ["disabled"])])])], 40, Ff)) : i("", !0), o("button", {
				type: "button",
				class: p(["flex items-center justify-center gap-2 rounded-full bg-btn-primary text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover", w(q).running === null ? "h-14 w-14 p-0" : "h-14 px-5"]),
				title: w(f)("tasks_projects.timer.quick_start"),
				"aria-label": w(f)("tasks_projects.timer.quick_start"),
				onClick: I
			}, [c(u, {
				name: w(q).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), w(q).running === null ? i("", !0) : (v(), a("span", Gf, C(A.value), 1))], 10, Wf)], 2)) : i("", !0)]);
		};
	}
}), Yf = { class: "flex w-full items-center justify-between" }, Xf = { class: "space-y-5 px-6 py-6" }, Zf = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, Qf = 0, $f = -1, ep = 100, tp = 10, np = /* @__PURE__ */ l({
	__name: "StartTimerModal",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(e) {
		let t = e, i = B(), a = b([]), l = b(Qf), u = b(null), d = b(""), m = b(!0), h = n(() => q.startPrompt !== null), g = n(() => [{
			id: Qf,
			label: i("tasks_projects.timer.any_project")
		}, ...a.value]), _ = n(() => g.value.find((e) => e.id === l.value) ?? null);
		E(() => q.startPrompt, (e) => {
			e !== null && (l.value = typeof e.projectId == "number" ? e.projectId : Qf, u.value = null, d.value = "", m.value = !0, y(), typeof e.taskId == "number" && x(e.taskId));
		}), E(l, () => {
			u.value = null;
		});
		async function y() {
			try {
				let e = await Ht(t.client, {
					limit: ep,
					status: "ACTIVE",
					sort_by: "name"
				});
				a.value = (e.data ?? []).map((e) => ({
					id: e.id,
					label: e.name
				}));
			} catch (e) {
				a.value = [], t.notify("error", H(e, i("tasks_projects.time.projects_failed")));
			}
		}
		async function x(e) {
			try {
				let n = await He(t.client, e);
				Qe(n), typeof n.project_id == "number" && (l.value = n.project_id), await f(), j(T(n));
			} catch {}
		}
		function T(e) {
			return {
				id: e.id,
				label: typeof e.number == "number" ? `#${e.number} ${e.name}` : e.name,
				name: e.name,
				billable: e.billable !== !1
			};
		}
		async function O(e) {
			let n = (e ?? "").trim();
			try {
				let e = await Ve(t.client, n, {
					projectId: l.value === Qf ? null : l.value,
					invoiced: 0,
					limit: tp
				});
				e.forEach(Qe);
				let r = e.map(T);
				return r.length === 0 && n !== "" && r.push({
					id: $f,
					label: i("tasks_projects.timer.create_and_start", { name: n }),
					name: n,
					billable: !0
				}), r;
			} catch (e) {
				return t.notify("error", H(e, i("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function k(e) {
			l.value = e?.id ?? Qf;
		}
		function j(e) {
			u.value = e, m.value = e === null || e.billable;
		}
		function M() {
			let e = u.value;
			if (e === null) return;
			let t = d.value.trim() || null, n = l.value === Qf ? null : l.value;
			q.answerStart(e.id === $f ? {
				create: {
					name: e.name,
					projectId: n
				},
				description: t,
				billable: m.value
			} : {
				taskId: e.id,
				description: t,
				billable: m.value
			});
		}
		function N() {
			q.answerStart(null);
		}
		return (e, t) => {
			let n = S("BaseIcon"), a = S("BaseMultiselect"), f = S("BaseInputGroup"), y = S("BaseTextarea"), b = S("BaseSwitch"), x = S("BaseButton"), T = S("BaseModal");
			return v(), r(T, {
				show: h.value,
				onClose: N
			}, {
				header: D(() => [o("div", Yf, [o("span", null, C(w(i)("tasks_projects.timer.start_title")), 1), c(n, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: N
				})])]),
				default: D(() => [o("form", { onSubmit: A(M, ["prevent"]) }, [o("div", Xf, [
					c(f, { label: w(i)("tasks_projects.time.filters.project") }, {
						default: D(() => [c(a, {
							"model-value": _.value,
							options: g.value,
							"can-clear": !1,
							"value-prop": "id",
							"track-by": "label",
							label: "label",
							object: "",
							searchable: "",
							"onUpdate:modelValue": t[0] ||= (e) => k(e)
						}, null, 8, ["model-value", "options"])]),
						_: 1
					}, 8, ["label"]),
					c(f, {
						label: w(i)("tasks_projects.time.fields.task"),
						required: ""
					}, {
						default: D(() => [(v(), r(a, {
							key: l.value,
							"model-value": u.value,
							options: O,
							placeholder: w(i)("tasks_projects.timer.pick_task"),
							"initial-search": u.value?.label ?? "",
							"no-results-text": w(i)("tasks_projects.timer.no_matches"),
							delay: 400,
							"filter-results": !1,
							"value-prop": "id",
							"track-by": "label",
							label: "label",
							object: "",
							searchable: "",
							"preserve-search": "",
							"resolve-on-load": "",
							"onUpdate:modelValue": t[1] ||= (e) => j(e)
						}, null, 8, [
							"model-value",
							"placeholder",
							"initial-search",
							"no-results-text"
						]))]),
						_: 1
					}, 8, ["label"]),
					c(f, { label: w(i)("tasks_projects.time.fields.description") }, {
						default: D(() => [c(y, {
							modelValue: d.value,
							"onUpdate:modelValue": t[2] ||= (e) => d.value = e,
							row: 3
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"]),
					c(f, { label: w(i)("tasks_projects.time.fields.billable") }, {
						default: D(() => [c(b, {
							modelValue: m.value,
							"onUpdate:modelValue": t[3] ||= (e) => m.value = e,
							class: "flex"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"])
				]), o("div", Zf, [c(x, {
					type: "button",
					variant: "primary-outline",
					onClick: N
				}, {
					default: D(() => [s(C(w(i)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(x, {
					type: "submit",
					variant: "primary",
					disabled: u.value === null || w(q).busy,
					loading: w(q).busy
				}, {
					left: D((e) => [c(n, {
						name: "PlayIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(i)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), rp = { class: "flex w-full items-center justify-between" }, ip = { class: "space-y-5 px-6 py-6" }, ap = { class: "truncate text-sm font-medium text-heading" }, op = { class: "mt-1 text-3xl font-semibold tabular-nums text-primary-500" }, sp = { class: "mt-1 text-xs text-muted" }, cp = { class: "border-t border-line-default px-6 py-4" }, lp = {
	key: 0,
	class: "flex flex-wrap items-center justify-between gap-3"
}, up = { class: "text-sm text-body" }, dp = { class: "flex space-x-3" }, fp = {
	key: 1,
	class: "flex items-center justify-between"
}, pp = { class: "flex space-x-3" }, mp = /* @__PURE__ */ l({
	__name: "StopTimerModal",
	setup(e) {
		let t = B(), i = b(""), l = b(!0), u = b(!1), d = n(() => q.stopPrompt !== null), f = n(() => Ze(q.stopPrompt?.entry.task_id ?? null)), m = n(() => Ma(q.elapsedSeconds)), h = n(() => G.settings.rounding_minutes), g = n(() => Na(Fa(Math.round(q.elapsedSeconds / 60), h.value, G.settings.rounding_direction))), _ = n(() => h.value > 1 ? t("tasks_projects.timer.saved_as", {
			duration: g.value,
			increment: h.value
		}) : t("tasks_projects.timer.saved_as_exact", { duration: g.value }));
		E(() => q.stopPrompt, (e) => {
			i.value = e?.entry.description ?? "", l.value = e?.entry.billable !== !1, u.value = !1;
		});
		function y() {
			q.answerStop({
				action: "save",
				description: i.value.trim() || null,
				billable: l.value
			});
		}
		function x() {
			q.answerStop({ action: "discard" });
		}
		function T() {
			q.answerStop(null);
		}
		return (e, n) => {
			let h = S("BaseIcon"), g = S("BaseTextarea"), b = S("BaseInputGroup"), E = S("BaseSwitch"), O = S("BaseButton"), k = S("BaseModal");
			return v(), r(k, {
				show: d.value,
				onClose: T
			}, {
				header: D(() => [o("div", rp, [o("span", null, C(w(t)("tasks_projects.timer.stop_title")), 1), c(h, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: T
				})])]),
				default: D(() => [o("form", { onSubmit: A(y, ["prevent"]) }, [o("div", ip, [
					o("div", null, [
						o("p", ap, C(f.value), 1),
						o("p", op, C(m.value), 1),
						o("p", sp, C(_.value), 1)
					]),
					c(b, { label: w(t)("tasks_projects.time.fields.description") }, {
						default: D(() => [c(g, {
							modelValue: i.value,
							"onUpdate:modelValue": n[0] ||= (e) => i.value = e,
							row: 3
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"]),
					c(b, { label: w(t)("tasks_projects.time.fields.billable") }, {
						default: D(() => [c(E, {
							modelValue: l.value,
							"onUpdate:modelValue": n[1] ||= (e) => l.value = e,
							class: "flex"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"])
				]), o("div", cp, [u.value ? (v(), a("div", lp, [o("p", up, C(w(t)("tasks_projects.timer.discard_ask", { duration: m.value })), 1), o("div", dp, [c(O, {
					type: "button",
					variant: "primary-outline",
					onClick: n[2] ||= (e) => u.value = !1
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(O, {
					type: "button",
					variant: "danger",
					disabled: w(q).busy,
					onClick: x
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.timer.discard")), 1)]),
					_: 1
				}, 8, ["disabled"])])])) : (v(), a("div", fp, [c(O, {
					type: "button",
					variant: "white",
					disabled: w(q).busy,
					onClick: n[3] ||= (e) => u.value = !0
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.timer.discard")), 1)]),
					_: 1
				}, 8, ["disabled"]), o("div", pp, [c(O, {
					type: "button",
					variant: "primary-outline",
					onClick: T
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(O, {
					type: "submit",
					variant: "primary",
					loading: w(q).busy,
					disabled: w(q).busy
				}, {
					left: D((e) => [c(h, {
						name: "StopIcon",
						class: p(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + C(w(t)("tasks_projects.timer.save_and_stop")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])]))])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), hp = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, gp = ["title"], _p = ["aria-label", "title"], vp = { class: "font-medium tabular-nums" }, yp = [
	"disabled",
	"title",
	"aria-label"
], bp = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = B(), u = n(() => Ze(q.running?.task_id ?? null)), d = n(() => Ma(q.elapsedSeconds));
		function f() {
			q.stopWithPrompt(r.client, {
				notify: r.notify,
				t: l
			});
		}
		return (e, t) => {
			let n = S("BaseIcon");
			return w(q).running === null ? i("", !0) : (v(), a("li", hp, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: w(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": w(l)("tasks_projects.timer.open_task"),
					title: w(l)("tasks_projects.timer.open_task"),
					onClick: t[0] ||= (e) => s("open")
				}, C(u.value), 9, _p),
				o("span", vp, C(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: w(q).busy,
					title: w(l)("tasks_projects.timer.stop"),
					"aria-label": w(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, yp)
			], 8, gp)]));
		};
	}
}), xp = { en: { tasks_projects: {
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
		open_timesheet: "Open my week",
		open_task: "Open the running task",
		start_on: "Start the timer on {name}",
		stop_on: "Stop the timer on {name}",
		busy_elsewhere: "Your timer is running on {name}.",
		stop_and_start: "Stop and start",
		running_by: "{name} has been running since {time}.",
		mismatch: "Your timer is no longer on this task. It has been reloaded.",
		elapsed: "Elapsed",
		search_tasks: "Search tasks",
		no_tasks: "No tasks match that search.",
		description_placeholder: "What are you working on? (optional)",
		started: "The timer is running on {name}.",
		stopped: "Logged {duration} on {name}.",
		discarded: "The running timer was discarded.",
		discard_confirm: "Discard the running timer? The elapsed time is not saved.",
		stop_title: "Save and stop",
		save_and_stop: "Save and stop",
		saved_as: "Saved as {duration} after rounding to {increment} min.",
		saved_as_exact: "Saved as {duration}.",
		discard_ask: "Discard {duration}? This cannot be undone.",
		start_title: "Start a timer",
		any_project: "Any project",
		pick_task: "Search by task name or number",
		create_and_start: "Create task \"{name}\" and start",
		no_matches: "No tasks match that search. Keep typing to create one.",
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
		default_rate: "Default rate / hour",
		week_start: "First day of the week",
		weekday_0: "Sunday",
		weekday_1: "Monday",
		weekday_2: "Tuesday",
		weekday_3: "Wednesday",
		weekday_4: "Thursday",
		weekday_5: "Friday",
		weekday_6: "Saturday",
		members_see_all_time: "Members see other members' time",
		behaviour_title: "Task behaviour",
		behaviour_description: "What happens when a task is created, invoiced or shown on the board. Change these in the module settings form.",
		rounding_direction: "Rounding",
		rounding_direction_nearest: "To the nearest increment",
		rounding_direction_up: "Up to the increment",
		rounding_direction_down: "Down to the increment",
		rounding_increment: "Increment",
		rounding_increment_value: "{count} minute | {count} minutes",
		auto_start_tasks: "Start the timer on a new task",
		lock_invoiced_tasks: "Lock invoiced tasks",
		hide_invoiced_on_board: "Hide invoiced tasks on the board",
		invoice_title: "Invoice lines",
		invoice_description: "What an invoice line built from a task carries. Change these in the module settings form.",
		invoice_project_heading: "Project heading",
		invoice_task_description: "Task description",
		invoice_entry_dates: "Entry dates",
		invoice_entry_times: "Entry times",
		invoice_entry_hours: "Entry hours",
		invoice_entry_descriptions: "Entry descriptions",
		on: "On",
		off: "Off",
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
} } }, Sp = {
	key: 0,
	class: "text-sm text-muted"
}, Cp = { key: 1 }, wp = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, Tp = {
	key: 1,
	class: "text-sm text-muted"
}, Ep = {
	key: 2,
	class: "divide-y divide-line-light"
}, Dp = {
	key: 0,
	class: "space-y-3"
}, Op = { class: "flex flex-wrap items-center gap-2" }, kp = ["aria-label", "onClick"], Ap = { class: "flex flex-wrap items-center gap-6" }, jp = { class: "flex items-center gap-2 text-sm text-body" }, Mp = { class: "flex items-center gap-2 text-sm text-body" }, Np = { class: "flex gap-3" }, Pp = {
	key: 1,
	class: "flex items-center gap-3"
}, Fp = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, Ip = { class: "flex items-center gap-1" }, Lp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Rp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], zp = [
	"title",
	"aria-label",
	"onClick"
], Bp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Vp = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Hp = { class: "flex flex-wrap items-center gap-2" }, Up = ["aria-label", "onClick"], Wp = { class: "flex flex-wrap items-center gap-6" }, Gp = { class: "flex items-center gap-2 text-sm text-body" }, Kp = { class: "flex items-center gap-2 text-sm text-body" }, qp = { class: "flex gap-3" }, Jp = /* @__PURE__ */ l({
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
		], d = B(), f = b([]), h = b(!0), _ = b(!1), T = b(!1), E = b(null), O = b(!1), k = y({
			name: "",
			colour: "",
			is_default: !1,
			is_closed: !1
		}), A = n(() => !h.value && f.value.length === 0);
		g(() => void j());
		async function j() {
			h.value = !0;
			try {
				f.value = await Ie(l.client), _.value = !1;
			} catch (e) {
				f.value = [], _.value = vt(e), _.value || l.notify("error", H(e, d("tasks_projects.settings.load_failed")));
			} finally {
				h.value = !1;
			}
		}
		function M(e) {
			O.value = !1, E.value = e.id, k.name = e.name, k.colour = e.colour ?? "", k.is_default = e.is_default, k.is_closed = e.is_closed;
		}
		function N() {
			E.value = null, O.value = !0, k.name = "", k.colour = u[0], k.is_default = !1, k.is_closed = !1;
		}
		function P() {
			E.value = null, O.value = !1;
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
			let e = E.value, t = k.name.trim();
			T.value = !0;
			try {
				e === null ? (await Le(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await Re(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
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
					await ze(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
				} catch (e) {
					l.notify("error", H(e, d("tasks_projects.settings.delete_failed")));
				} finally {
					T.value = !1;
				}
			}
		}
		async function R(e, t) {
			let n = e + t;
			if (T.value || n < 0 || n >= f.value.length) return;
			let r = [...f.value];
			r.splice(n, 0, ...r.splice(e, 1)), f.value = r, T.value = !0;
			try {
				f.value = await Be(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = S("BaseSpinner"), g = S("BaseInput"), y = S("BaseInputGroup"), b = S("BaseSwitch"), j = S("BaseButton"), F = S("BaseBadge"), z = S("BaseIcon");
			return v(), a("div", null, [_.value ? (v(), a("p", Sp, C(w(d)("tasks_projects.settings.forbidden")), 1)) : (v(), a("div", Cp, [h.value ? (v(), a("div", wp, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (v(), a("p", Tp, C(w(d)("tasks_projects.settings.no_statuses")), 1)) : (v(), a("ul", Ep, [(v(!0), a(e, null, x(f.value, (t, l) => (v(), a("li", {
				key: t.id,
				class: "py-3"
			}, [E.value === t.id ? (v(), a("div", Dp, [
				c(y, {
					label: w(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: D(() => [c(g, {
						modelValue: k.name,
						"onUpdate:modelValue": n[0] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(y, { label: w(d)("tasks_projects.settings.colour") }, {
					default: D(() => [o("div", Op, [(v(), a(e, null, x(u, (e) => o("button", {
						key: e,
						type: "button",
						class: p(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: m({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, kp)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, C(w(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", Ap, [o("label", jp, [c(b, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_default")), 1)]), o("label", Mp, [c(b, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Np, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : (v(), a("div", Pp, [
				o("span", {
					class: p(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: m(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", Fp, C(t.name), 1),
				t.is_default ? (v(), r(F, {
					key: 0,
					class: "rounded-full bg-primary-50! text-primary-500!"
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.settings.is_default")), 1)]),
					_: 1
				})) : i("", !0),
				t.is_closed ? (v(), r(F, {
					key: 1,
					class: "rounded-full bg-surface-tertiary! text-muted!"
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.settings.is_closed")), 1)]),
					_: 1
				})) : i("", !0),
				o("div", Ip, [
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === 0,
						title: w(d)("tasks_projects.settings.move_up"),
						"aria-label": w(d)("tasks_projects.settings.move_up"),
						onClick: (e) => R(l, -1)
					}, [c(z, {
						name: "ChevronUpIcon",
						class: "h-4 w-4"
					})], 8, Lp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === f.value.length - 1,
						title: w(d)("tasks_projects.settings.move_down"),
						"aria-label": w(d)("tasks_projects.settings.move_down"),
						onClick: (e) => R(l, 1)
					}, [c(z, {
						name: "ChevronDownIcon",
						class: "h-4 w-4"
					})], 8, Rp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: w(d)("tasks_projects.general.edit"),
						"aria-label": w(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, zp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-alert-error-text",
						disabled: T.value,
						title: w(d)("tasks_projects.general.delete"),
						"aria-label": w(d)("tasks_projects.general.delete"),
						onClick: (e) => L(t)
					}, [c(z, {
						name: "TrashIcon",
						class: "h-4 w-4"
					})], 8, Bp)
				])
			]))]))), 128))])), O.value ? (v(), a("div", Vp, [
				c(y, {
					label: w(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: D(() => [c(g, {
						modelValue: k.name,
						"onUpdate:modelValue": n[4] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(y, { label: w(d)("tasks_projects.settings.colour") }, {
					default: D(() => [o("div", Hp, [(v(), a(e, null, x(u, (e) => o("button", {
						key: e,
						type: "button",
						class: p(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: m({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, Up)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Wp, [o("label", Gp, [c(b, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_default")), 1)]), o("label", Kp, [c(b, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", qp, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : h.value ? i("", !0) : (v(), r(j, {
				key: 4,
				variant: "primary-outline",
				size: "sm",
				class: "mt-4",
				onClick: N
			}, {
				left: D((e) => [c(z, {
					name: "PlusIcon",
					class: p(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + C(w(d)("tasks_projects.settings.add_status")), 1)]),
				_: 1
			}))]))]);
		};
	}
}), Yp = { class: "space-y-6" }, Xp = { class: "divide-y divide-line-light" }, Zp = { class: "text-sm text-muted" }, Qp = { class: "text-sm font-medium text-heading" }, $p = { class: "divide-y divide-line-light" }, em = { class: "text-sm text-muted" }, tm = { class: "text-sm font-medium text-heading" }, nm = { class: "divide-y divide-line-light" }, rm = { class: "text-sm text-muted" }, im = { class: "text-sm font-medium text-heading" }, am = /* @__PURE__ */ l({
	__name: "TimeSettingsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let r = B(), i = n(() => G.settings);
		function l(e) {
			return r(e ? "tasks_projects.settings.on" : "tasks_projects.settings.off");
		}
		let u = n(() => [
			{
				key: "default_rate",
				label: r("tasks_projects.settings.default_rate"),
				value: ot(i.value.default_rate)
			},
			{
				key: "week_start",
				label: r("tasks_projects.settings.week_start"),
				value: r(`tasks_projects.settings.weekday_${i.value.week_start}`)
			},
			{
				key: "members_see_all_time",
				label: r("tasks_projects.settings.members_see_all_time"),
				value: l(i.value.members_see_all_time)
			}
		]), d = n(() => [
			{
				key: "rounding_direction",
				label: r("tasks_projects.settings.rounding_direction"),
				value: r(`tasks_projects.settings.rounding_direction_${i.value.rounding_direction}`)
			},
			{
				key: "rounding_minutes",
				label: r("tasks_projects.settings.rounding_increment"),
				value: r("tasks_projects.settings.rounding_increment_value", { count: i.value.rounding_minutes })
			},
			{
				key: "auto_start_tasks",
				label: r("tasks_projects.settings.auto_start_tasks"),
				value: l(i.value.auto_start_tasks)
			},
			{
				key: "lock_invoiced_tasks",
				label: r("tasks_projects.settings.lock_invoiced_tasks"),
				value: l(i.value.lock_invoiced_tasks)
			},
			{
				key: "hide_invoiced_on_board",
				label: r("tasks_projects.settings.hide_invoiced_on_board"),
				value: l(i.value.hide_invoiced_on_board)
			}
		]), f = n(() => [
			"invoice_project_heading",
			"invoice_task_description",
			"invoice_entry_dates",
			"invoice_entry_times",
			"invoice_entry_hours",
			"invoice_entry_descriptions"
		].map((e) => ({
			key: e,
			label: r(`tasks_projects.settings.${e}`),
			value: l(i.value[e])
		})));
		return (n, i) => {
			let l = S("BaseIcon"), m = S("BaseButton"), h = S("router-link"), g = S("BaseSettingCard");
			return v(), a("div", Yp, [
				c(g, {
					title: w(r)("tasks_projects.settings.general_title"),
					description: w(r)("tasks_projects.settings.general_description")
				}, {
					action: D(() => [c(h, { to: w(W).settings }, {
						default: D(() => [c(m, {
							variant: "primary-outline",
							size: "sm"
						}, {
							right: D((e) => [c(l, {
								name: "ArrowTopRightOnSquareIcon",
								class: p(e.class)
							}, null, 8, ["class"])]),
							default: D(() => [s(" " + C(w(r)("tasks_projects.settings.open_module_settings")), 1)]),
							_: 1
						})]),
						_: 1
					}, 8, ["to"])]),
					default: D(() => [o("dl", Xp, [(v(!0), a(e, null, x(u.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", Zp, C(e.label), 1), o("dd", Qp, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.behaviour_title"),
					description: w(r)("tasks_projects.settings.behaviour_description")
				}, {
					default: D(() => [o("dl", $p, [(v(!0), a(e, null, x(d.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", em, C(e.label), 1), o("dd", tm, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.invoice_title"),
					description: w(r)("tasks_projects.settings.invoice_description")
				}, {
					default: D(() => [o("dl", nm, [(v(!0), a(e, null, x(f.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", rm, C(e.label), 1), o("dd", im, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.statuses_title"),
					description: w(r)("tasks_projects.settings.statuses_description")
				}, {
					default: D(() => [c(Jp, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"])]),
					_: 1
				}, 8, ["title", "description"])
			]);
		};
	}
});
//#endregion
//#region resources/js/registrations/time.ts
function om(e) {
	e.addMessages(xp);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		let t = q.runningTaskId;
		e.router.push(t === null ? W.week : W.task(t));
	};
	e.registerHeaderAction({
		id: `${U}.timer-chip`,
		priority: 30,
		visible: () => q.running !== null,
		component: l({ setup: () => () => d(bp, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.quick-start`,
		component: l({ setup: () => () => d(Jf, {
			key: G.companySession,
			client: e.client,
			notify: t,
			enabled: !G.adminMode,
			router: e.router,
			onOpenTask: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.stop-timer`,
		component: l({ setup: () => () => d(mp, { key: G.companySession }) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.start-timer`,
		component: l({ setup: () => () => d(np, {
			key: G.companySession,
			client: e.client,
			notify: t
		}) })
	}), e.registerCompanySettingsPage({
		id: `${U}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: U,
		priority: 70,
		component: sn(e, am)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		sm(e, t);
	}), e.on("company:changing", () => {
		cm();
	}), e.on("company:changed", ({ companyId: t }) => {
		sm(e, t === null);
	});
}
async function sm(e, t) {
	if (Ca(t), t) {
		cm();
		return;
	}
	await xa(e.client), await q.refresh(e.client);
}
function cm() {
	q.reset(), rt(), Sa();
}
//#endregion
//#region resources/js/init.ts
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(j), Nf(n), Zo(n), om(n), nr(n), Ks(n);
});
//#endregion
