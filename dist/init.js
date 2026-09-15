const { Fragment: e, Teleport: t, computed: n, createBlock: r, createCommentVNode: i, createElementBlock: a, createElementVNode: o, createTextVNode: s, createVNode: c, defineComponent: l, getCurrentInstance: u, h: d, normalizeClass: f, normalizeStyle: p, onBeforeUnmount: m, onMounted: h, onScopeDispose: g, openBlock: _, reactive: v, ref: y, renderList: b, resolveComponent: x, toDisplayString: S, unref: C, vModelText: w, vShow: T, watch: E, withCtx: D, withDirectives: O, withKeys: k, withModifiers: A } = window.__invoiceshelf_vue;
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
} } }, M = v({
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
		let t = B(), i = y(""), a = n(() => M.prompt !== null), l = n(() => i.value.trim() !== "");
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
			let f = x("BaseIcon"), p = x("BaseInput"), m = x("BaseInputGroup"), h = x("BaseButton"), g = x("BaseModal");
			return _(), r(g, {
				show: a.value,
				onClose: d
			}, {
				header: D(() => [o("div", te, [o("span", null, S(C(t)("tasks_projects.billing.number.title")), 1), c(f, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: d
				})])]),
				default: D(() => [o("form", { onSubmit: A(u, ["prevent"]) }, [o("div", ne, [o("p", re, S(C(t)("tasks_projects.billing.number.description")), 1), c(m, {
					label: C(t)("tasks_projects.billing.number.label"),
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
					default: D(() => [s(S(C(t)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(h, {
					type: "submit",
					variant: "primary",
					disabled: !l.value
				}, {
					default: D(() => [s(S(C(t)("tasks_projects.billing.number.save")), 1)]),
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
	stamped: "{count} time entries were marked as invoiced.",
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
		entries: "{count} entries",
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
async function Pe(e) {
	let { data: t } = await e.post(Se.timerStop);
	return t.data;
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
async function Ve(e, t, n = Ee) {
	let r = { limit: n };
	t.trim() !== "" && (r.search = t.trim());
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
var Ge = v({}), Ke = /* @__PURE__ */ new Set(), qe = 5, Je = {
	logged_minutes: 0,
	billable_minutes: 0,
	unbilled_minutes: 0,
	unbilled_amount: 0,
	invoiced: "none",
	running: []
}, Ye = y(0), Xe = v({});
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
		let t = e, r = B(), l = y(!1), u = n(() => M.pending);
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
			let n = x("BaseButton"), p = x("router-link");
			return u.value ? (_(), a("div", Nt, [
				o("p", Pt, S(C(r)("tasks_projects.billing.retry.title")), 1),
				o("p", Ft, S(C(r)("tasks_projects.billing.retry.description", { number: u.value.invoiceNumber })), 1),
				o("div", It, [
					c(n, {
						variant: "primary",
						loading: l.value,
						disabled: l.value,
						onClick: d
					}, {
						default: D(() => [s(S(C(r)("tasks_projects.billing.retry.action")), 1)]),
						_: 1
					}, 8, ["loading", "disabled"]),
					c(p, { to: C(St)(u.value.invoiceId) }, {
						default: D(() => [c(n, { variant: "white" }, {
							default: D(() => [s(S(C(r)("tasks_projects.billing.retry.open_invoice")), 1)]),
							_: 1
						})]),
						_: 1
					}, 8, ["to"]),
					o("button", {
						type: "button",
						class: "text-sm font-medium text-muted hover:underline",
						onClick: f
					}, S(C(r)("tasks_projects.billing.retry.dismiss")), 1)
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
var Xt = v({}), Zt = !1, Qt = null;
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
		], d = B(), p = y(!0), m = y([]), g = v({
			from: "",
			to: ""
		}), w = y(null), T = y(null), O = y(!1), k = y("task"), A = y([]), j = n(() => M.busy), N = n(() => u.map((e) => ({
			id: e,
			label: d(`tasks_projects.billing.entries.group_by.${e}`)
		}))), P = n({
			get: () => N.value.find((e) => e.id === k.value) ?? N.value[0],
			set: (e) => {
				k.value = e.id;
			}
		}), F = n(() => (T.value?.entries ?? []).filter((e) => e.currency_id === (w.value?.currency_id ?? null))), I = n(() => {
			let e = {};
			for (let t of F.value) e[t.id] = t;
			return e;
		}), L = n(() => (T.value?.groups?.[k.value] ?? []).filter((e) => e.currency_id === (w.value?.currency_id ?? null))), R = n(() => F.value.length), z = n(() => R.value > 0 && A.value.length === R.value), ee = n(() => A.value.reduce((e, t) => e + (I.value[t]?.minutes ?? 0), 0)), te = n(() => A.value.reduce((e, t) => e + (I.value[t]?.amount ?? 0), 0)), ne = n(() => {
			let e = {};
			return g.from !== "" && (e.from = g.from), g.to !== "" && (e.to = g.to), e;
		});
		E(() => [g.from, g.to], () => void ie()), h(() => void re());
		async function re() {
			p.value = !0, await Promise.all([ae(), en(l.client)]), p.value = !1;
		}
		async function ie() {
			await ae(), w.value !== null && await fe(w.value);
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
			g.from = "", g.to = "";
		}
		function ce(e) {
			g.from = e ? dt(e) : "";
		}
		function le(e) {
			g.to = e ? dt(e) : "";
		}
		async function fe(e) {
			w.value = e, O.value = !0, T.value = null, A.value = [];
			try {
				T.value = await de(l.client, e.customer_id, ne.value), A.value = F.value.map((e) => e.id);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.billing.entries.load_failed")));
			} finally {
				O.value = !1;
			}
		}
		function pe() {
			w.value = null, T.value = null, A.value = [], ae();
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
			let u = x("BaseBreadcrumbItem"), h = x("BaseBreadcrumb"), v = x("BaseIcon"), y = x("BaseButton"), T = x("router-link"), E = x("BasePageHeader"), k = x("BaseDatePicker"), M = x("BaseInputGroup"), F = x("BaseSpinner"), I = x("BaseFormatMoney"), B = x("BaseEmptyPlaceholder"), ne = x("BaseSelectInput"), re = x("BasePage");
			return _(), r(re, null, {
				default: D(() => [
					c(E, { title: C(d)("tasks_projects.billing.title") }, {
						actions: D(() => [o("div", ln, [c(T, { to: C(W).reports }, {
							default: D(() => [c(y, { variant: "white" }, {
								left: D((e) => [c(v, {
									name: "ChartBarIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.reports.title")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"]), c(T, { to: C(W).projects }, {
							default: D(() => [c(y, { variant: "white" }, {
								left: D((e) => [c(v, {
									name: "FolderIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.projects.title")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["to"])])]),
						default: D(() => [c(h, null, {
							default: D(() => [
								c(u, {
									title: C(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(u, {
									title: C(d)("tasks_projects.tasks.title"),
									to: C(W).tasks
								}, null, 8, ["title", "to"]),
								c(u, {
									title: C(d)("tasks_projects.billing.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), o("p", cn, S(C(d)("tasks_projects.billing.subtitle")), 1)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("div", un, [
						c(M, {
							label: C(d)("tasks_projects.billing.customer.from"),
							class: "w-full sm:w-48"
						}, {
							default: D(() => [c(k, {
								"model-value": g.from,
								"onUpdate:modelValue": ce
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]),
						c(M, {
							label: C(d)("tasks_projects.billing.customer.to"),
							class: "w-full sm:w-48"
						}, {
							default: D(() => [c(k, {
								"model-value": g.to,
								"onUpdate:modelValue": le
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]),
						g.from !== "" || g.to !== "" ? (_(), r(y, {
							key: 0,
							variant: "primary-outline",
							onClick: se
						}, {
							default: D(() => [s(S(C(d)("tasks_projects.billing.customer.clear_range")), 1)]),
							_: 1
						})) : i("", !0)
					]),
					p.value ? (_(), a("div", dn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : w.value === null ? (_(), a("section", fn, [
						o("h2", pn, S(C(d)("tasks_projects.billing.customer.title")), 1),
						o("p", mn, S(C(d)("tasks_projects.billing.customer.description")), 1),
						m.value.length > 0 ? (_(), a("div", hn, [(_(!0), a(e, null, b(m.value, (e) => (_(), a("button", {
							key: `${e.customer_id}-${e.currency_id ?? "none"}`,
							type: "button",
							class: "rounded-xl border border-line-default bg-surface p-5 text-left transition hover:border-primary-500",
							onClick: (t) => fe(e)
						}, [
							o("p", _n, S(oe(e.customer_id)), 1),
							o("p", vn, S(C(d)("tasks_projects.billing.customer.entries", { count: e.entries })) + " · " + S(C(ft)(e.minutes)), 1),
							o("p", yn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						], 8, gn))), 128))])) : (_(), r(B, {
							key: 1,
							title: C(d)("tasks_projects.billing.customer.empty_title"),
							description: C(d)("tasks_projects.billing.customer.empty_description")
						}, {
							default: D(() => [c(v, {
								name: "BanknotesIcon",
								class: "mt-5 mb-4 h-16 w-16 text-subtle"
							})]),
							_: 1
						}, 8, ["title", "description"]))
					])) : (_(), a("section", bn, [o("div", xn, [o("div", null, [o("h2", Sn, S(C(d)("tasks_projects.billing.entries.title")), 1), o("p", Cn, S(oe(w.value.customer_id)), 1)]), c(M, {
						label: C(d)("tasks_projects.billing.entries.grouping"),
						class: "w-full sm:w-56"
					}, {
						default: D(() => [c(ne, {
							modelValue: P.value,
							"onUpdate:modelValue": l[0] ||= (e) => P.value = e,
							options: N.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])]), O.value ? (_(), a("div", wn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : R.value > 0 ? (_(), a(e, { key: 1 }, [
						o("div", Tn, [o("label", En, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: z.value,
							onChange: ge
						}, null, 40, Dn), s(" " + S(C(d)("tasks_projects.billing.entries.select_all")), 1)]), o("p", On, S(C(d)("tasks_projects.billing.entries.selected", {
							count: A.value.length,
							total: R.value
						})), 1)]),
						(_(!0), a(e, null, b(L.value, (t) => (_(), a("div", {
							key: `${t.label}-${t.key ?? "none"}-${t.currency_id ?? "none"}`,
							class: "mt-4 overflow-hidden rounded-xl border border-line-default"
						}, [o("div", kn, [o("label", An, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: _e(t),
							onChange: (e) => ve(t)
						}, null, 40, jn), s(" " + S(t.label), 1)]), o("p", Mn, [s(S(C(ft)(t.minutes)) + " · ", 1), c(I, { amount: t.amount }, null, 8, ["amount"])])]), o("div", Nn, [o("table", Pn, [o("thead", Fn, [o("tr", null, [
							l[1] ||= o("th", { class: "w-10" }, null, -1),
							o("th", In, S(C(d)("tasks_projects.billing.entries.columns.date")), 1),
							o("th", Ln, S(C(d)("tasks_projects.billing.entries.columns.task")), 1),
							o("th", Rn, S(C(d)("tasks_projects.billing.entries.columns.project")), 1),
							o("th", zn, S(C(d)("tasks_projects.billing.entries.columns.member")), 1),
							o("th", Bn, S(C(d)("tasks_projects.billing.entries.columns.duration")), 1),
							o("th", Vn, S(C(d)("tasks_projects.billing.entries.columns.amount")), 1)
						])]), o("tbody", Hn, [(_(!0), a(e, null, b(ye(t), (e) => (_(), a("tr", { key: e.id }, [
							o("td", Un, [o("input", {
								type: "checkbox",
								class: "h-4 w-4 cursor-pointer rounded border-line-strong",
								checked: me(e.id),
								onChange: (t) => he(e.id)
							}, null, 40, Wn)]),
							o("td", Gn, S(C(ut)(e.date)), 1),
							o("td", Kn, [c(T, {
								class: "text-heading hover:text-primary-500",
								to: C(W).task(e.task_id)
							}, {
								default: D(() => [s(S(e.task_name), 1)]),
								_: 2
							}, 1032, ["to"]), o("span", qn, S(e.description || C(d)("tasks_projects.billing.entries.no_description")), 1)]),
							o("td", Jn, S(e.project_name ?? "-"), 1),
							o("td", Yn, S(e.user_name), 1),
							o("td", Xn, S(C(ft)(e.minutes)), 1),
							o("td", Zn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						]))), 128))])])])]))), 128)),
						o("div", Qn, [o("p", $n, [s(S(C(d)("tasks_projects.billing.entries.selected_total", { hours: C(ft)(ee.value) })) + " · ", 1), c(I, { amount: te.value }, null, 8, ["amount"])]), o("div", er, [c(y, {
							variant: "primary-outline",
							disabled: j.value,
							onClick: pe
						}, {
							default: D(() => [s(S(C(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						}, 8, ["disabled"]), c(y, {
							variant: "primary",
							loading: j.value,
							disabled: j.value || A.value.length === 0,
							onClick: be
						}, {
							left: D((e) => [j.value ? i("", !0) : (_(), r(v, {
								key: 0,
								name: "DocumentPlusIcon",
								class: f(e.class)
							}, null, 8, ["class"]))]),
							default: D(() => [s(" " + S(C(d)("tasks_projects.billing.create")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])])])
					], 64)) : (_(), r(B, {
						key: 2,
						title: C(d)("tasks_projects.billing.entries.empty_title"),
						description: C(d)("tasks_projects.billing.entries.empty_description")
					}, {
						actions: D(() => [c(y, {
							variant: "primary",
							onClick: pe
						}, {
							default: D(() => [s(S(C(d)("tasks_projects.billing.back")), 1)]),
							_: 1
						})]),
						default: D(() => [c(v, {
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
async function fr(e, t, n = null) {
	let r = n === null ? {} : { description: n }, { data: i } = await e.post(ir.startTask(t), r);
	return i.data;
}
async function pr(e, t) {
	let { data: n } = await e.post(ir.stopTask(t));
	return n.data;
}
async function mr(e, t) {
	let { data: n } = await e.get(ir.taskTimeLog(t));
	return n.data ?? [];
}
async function hr(e, t) {
	let { data: n } = await e.post(ir.bulkTasks, t);
	return {
		updated: n?.updated ?? 0,
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
		], m = B(), h = v({
			name: "",
			identifier: "",
			description: "",
			colour: "",
			defaultRate: "",
			budgetHours: "",
			dueDate: ""
		}), g = y(null), w = y([]), T = y(!1), O = y({}), k = y(!1), j = n(() => l.project !== null), M = n(() => j.value ? m("tasks_projects.projects.edit_project") : m("tasks_projects.projects.new_project"));
		E(() => l.show, (e) => {
			e && (N(), I());
		}, { immediate: !0 });
		function N() {
			let e = l.project;
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = ot(e?.default_rate ?? null), h.budgetHours = ct(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, g.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : w.value.find((t) => t.id === e) ?? null;
		}
		function F(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function I() {
			if (!T.value) try {
				let e = await Yt(l.client);
				w.value = e.map((e) => ({
					id: e.id,
					label: F(e)
				})), T.value = !0, g.value = P(l.project?.customer_id ?? null);
			} catch (e) {
				l.notify("error", H(e, m("tasks_projects.projects.customers_failed")));
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
					O.value = { name: m("tasks_projects.projects.name_required") };
					return;
				}
				k.value = !0, O.value = {};
				try {
					let e = l.project, t = e ? await Wt(l.client, e.id, L()) : await Ut(l.client, L());
					u("saved", t);
				} catch (e) {
					O.value = at(e), l.notify("error", H(e, m("tasks_projects.projects.save_failed")));
				} finally {
					k.value = !1;
				}
			}
		}
		return (n, i) => {
			let l = x("BaseIcon"), v = x("BaseInput"), y = x("BaseInputGroup"), T = x("BaseSelectInput"), E = x("BaseDatePicker"), N = x("BaseInputGrid"), P = x("BaseTextarea"), F = x("BaseButton"), I = x("BaseModal");
			return _(), r(I, {
				show: t.show,
				onClose: i[9] ||= (e) => u("close")
			}, {
				header: D(() => [o("div", Sr, [o("span", null, S(M.value), 1), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: i[0] ||= (e) => u("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(z, ["prevent"]) }, [o("div", Cr, [
					c(N, null, {
						default: D(() => [
							c(y, {
								label: C(m)("tasks_projects.projects.fields.name"),
								error: O.value.name,
								required: ""
							}, {
								default: D(() => [c(v, {
									modelValue: h.name,
									"onUpdate:modelValue": i[1] ||= (e) => h.name = e,
									invalid: !!O.value.name,
									type: "text"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(y, {
								label: C(m)("tasks_projects.projects.fields.identifier"),
								error: O.value.identifier,
								"help-text": C(m)("tasks_projects.projects.fields.identifier_help")
							}, {
								default: D(() => [c(v, {
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
							c(y, {
								label: C(m)("tasks_projects.projects.fields.customer"),
								error: O.value.customer_id,
								"help-text": C(m)("tasks_projects.projects.fields.customer_help")
							}, {
								default: D(() => [c(T, {
									modelValue: g.value,
									"onUpdate:modelValue": i[3] ||= (e) => g.value = e,
									options: w.value,
									placeholder: C(m)("tasks_projects.projects.fields.customer_placeholder"),
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
							c(y, {
								label: C(m)("tasks_projects.projects.fields.due_date"),
								error: O.value.due_date
							}, {
								default: D(() => [c(E, {
									"model-value": h.dueDate,
									"onUpdate:modelValue": R
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(y, {
								label: C(m)("tasks_projects.projects.fields.default_rate"),
								error: O.value.default_rate,
								"help-text": C(m)("tasks_projects.projects.fields.default_rate_help")
							}, {
								default: D(() => [c(v, {
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
							c(y, {
								label: C(m)("tasks_projects.projects.fields.budget_hours"),
								error: O.value.budget_minutes
							}, {
								default: D(() => [c(v, {
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
					c(y, {
						label: C(m)("tasks_projects.projects.fields.colour"),
						error: O.value.colour
					}, {
						default: D(() => [o("div", wr, [(_(), a(e, null, b(d, (e) => o("button", {
							key: e,
							type: "button",
							class: f(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: p({ backgroundColor: e }),
							"aria-label": e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, Tr)), 64)), o("button", {
							type: "button",
							class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
							onClick: i[6] ||= (e) => h.colour = ""
						}, S(C(m)("tasks_projects.projects.fields.colour_none")), 1)])]),
						_: 1
					}, 8, ["label", "error"]),
					c(y, {
						label: C(m)("tasks_projects.projects.fields.description"),
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
					default: D(() => [s(S(C(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(F, {
					type: "submit",
					variant: "primary",
					loading: k.value,
					disabled: k.value
				}, {
					default: D(() => [s(S(j.value ? C(m)("tasks_projects.general.update") : C(m)("tasks_projects.general.save")), 1)]),
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
		let l = t, u = on.project, d = B(), p = l.router, m = y(null), g = y(!0), v = y(!1), w = y(!1), T = n(() => Number(l.id)), O = n(() => [
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
		}), E(k, (e) => I(e)), h(() => {
			I(k.value), L();
		});
		function I(e) {
			e === u && l.router.replace({
				name: `${u}.overview`,
				params: { id: l.id }
			});
		}
		async function L() {
			g.value = !0;
			try {
				m.value = await _r(l.client, T.value), typeof m.value?.customer_id == "number" && await en(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.project.load_failed")));
			} finally {
				g.value = !1;
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
			w.value = !1, l.notify("success", d("tasks_projects.projects.updated", { name: e.name })), L();
		}
		async function te() {
			let e = m.value;
			e !== null && F.value && !P.value && (await bt({
				client: l.client,
				router: p,
				notify: l.notify,
				t: d
			}, { projectId: e.id }) || await L());
		}
		async function ne() {
			let e = m.value;
			if (!(e === null || v.value)) {
				v.value = !0;
				try {
					e.status === "ARCHIVED" ? (await Kt(l.client, e.id), l.notify("success", d("tasks_projects.projects.unarchived", { name: e.name }))) : (await Gt(l.client, e.id), l.notify("success", d("tasks_projects.projects.archived", { name: e.name }))), await L();
				} catch (e) {
					l.notify("error", H(e, d("tasks_projects.projects.save_failed")));
				} finally {
					v.value = !1;
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
			let u = x("BaseBreadcrumbItem"), p = x("BaseBreadcrumb"), h = x("BaseBadge"), y = x("BaseIcon"), T = x("BaseButton"), E = x("router-link"), k = x("BasePageHeader"), M = x("BaseSpinner"), I = x("router-view"), B = x("BasePage");
			return _(), r(B, null, {
				default: D(() => [
					c(k, { title: A.value }, {
						actions: D(() => [o("div", Fr, [
							c(E, { to: j.value }, {
								default: D(() => [c(T, { variant: "white" }, {
									left: D((e) => [c(y, {
										name: "ViewColumnsIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(d)("tasks_projects.project.board")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							F.value ? (_(), r(T, {
								key: 0,
								variant: "primary-outline",
								loading: P.value,
								disabled: P.value,
								onClick: te
							}, {
								left: D((e) => [P.value ? i("", !0) : (_(), r(y, {
									key: 0,
									name: "BanknotesIcon",
									class: f(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.project.invoice_project")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							m.value ? (_(), r(T, {
								key: 1,
								variant: "primary-outline",
								loading: v.value,
								disabled: v.value,
								onClick: ne
							}, {
								default: D(() => [s(S(m.value.status === "ARCHIVED" ? C(d)("tasks_projects.projects.unarchive") : C(d)("tasks_projects.projects.archive")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])) : i("", !0),
							m.value ? (_(), r(T, {
								key: 2,
								variant: "primary",
								onClick: l[0] ||= (e) => w.value = !0
							}, {
								left: D((e) => [c(y, {
									name: "PencilIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.general.edit")), 1)]),
								_: 1
							})) : i("", !0)
						])]),
						default: D(() => [c(p, null, {
							default: D(() => [
								c(u, {
									title: C(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(u, {
									title: C(d)("tasks_projects.projects.title"),
									to: C(W).projects
								}, null, 8, ["title", "to"]),
								c(u, {
									title: A.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), m.value ? (_(), a("div", Or, [
							c(h, { class: f(["rounded-full", re(m.value.status)]) }, {
								default: D(() => [s(S(ie(m.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							m.value.identifier ? (_(), a("span", kr, S(m.value.identifier), 1)) : i("", !0),
							m.value.customer_id ? (_(), a("span", Ar, [s(S(C(d)("tasks_projects.project.customer")) + ": ", 1), o("span", jr, S(N.value), 1)])) : (_(), a("span", Mr, S(C(d)("tasks_projects.projects.internal")), 1)),
							m.value.due_date ? (_(), a("span", Nr, [s(S(C(d)("tasks_projects.project.due_date")) + ": ", 1), o("span", Pr, S(C(ut)(m.value.due_date)), 1)])) : i("", !0)
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("nav", Ir, [(_(!0), a(e, null, b(O.value, (e) => (_(), r(E, {
						key: e.id,
						to: R(e),
						custom: ""
					}, {
						default: D(({ href: t, navigate: n }) => [o("a", {
							href: t,
							"aria-current": z(e) ? "page" : void 0,
							class: f(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", z(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, S(e.label), 11, Lr)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					g.value && m.value === null ? (_(), a("div", Rr, [c(M, { class: "h-8 w-8 text-primary-500" })])) : (_(), r(I, {
						key: 1,
						project: m.value,
						onRefresh: L
					}, null, 8, ["project"])),
					c(Dr, {
						show: w.value,
						client: t.client,
						notify: t.notify,
						project: m.value,
						onClose: l[1] ||= (e) => w.value = !1,
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
		}, u = B(), d = y(null), h = y(!1), g = y(!0), b = y(0), w = y(!1), k = y(null), A = y(null), j = v({
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
		]), F = n(() => j.search.trim() !== "" || j.status !== "ACTIVE"), I = n(() => !g.value && b.value === 0 && !F.value), L;
		E(() => j.search, () => {
			clearTimeout(L), L = setTimeout(() => z(), Xr);
		}), E(() => j.status, () => z()), m(() => clearTimeout(L));
		async function R({ page: e, sort: n }) {
			let r = {
				page: e,
				limit: Yr,
				...Vt(n, l)
			};
			j.status !== "ALL" && (r.status = j.status), j.search.trim() !== "" && (r.search = j.search.trim()), g.value = !0;
			try {
				let e = await Ht(t.client, r);
				return b.value = e.meta.total, e.data.some((e) => e.customer_id !== null) && en(t.client), {
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
			h.value && te(), h.value = !h.value;
		}
		function te() {
			j.search = "", j.status = "ACTIVE";
		}
		function ne() {
			k.value = null, w.value = !0;
		}
		function re(e) {
			k.value = e, w.value = !0;
		}
		function ie(e) {
			let n = k.value ? u("tasks_projects.projects.updated", { name: e.name }) : u("tasks_projects.projects.created", { name: e.name });
			w.value = !1, k.value = null, t.notify("success", n), z();
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
			let l = x("BaseBreadcrumbItem"), m = x("BaseBreadcrumb"), g = x("BaseIcon"), v = x("BaseButton"), y = x("router-link"), b = x("BasePageHeader"), E = x("BaseInput"), F = x("BaseInputGroup"), L = x("BaseSelectInput"), z = x("BaseFilterWrapper"), B = x("BaseEmptyPlaceholder"), le = x("BaseBadge"), ue = x("BaseFormatMoney"), de = x("BaseDropdownItem"), fe = x("BaseDropdown"), pe = x("BaseTable"), me = x("BasePage");
			return _(), r(me, null, {
				default: D(() => [
					c(b, { title: C(u)("tasks_projects.projects.title") }, {
						actions: D(() => [o("div", Br, [
							c(y, { to: C(W).tasks }, {
								default: D(() => [c(v, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ClipboardDocumentListIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.tasks.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: C(W).reports }, {
								default: D(() => [c(v, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "ChartBarIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.reports.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: C(W).billing }, {
								default: D(() => [c(v, { variant: "white" }, {
									left: D((e) => [c(g, {
										name: "BanknotesIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.billing.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(v, {
								variant: "primary-outline",
								onClick: ee
							}, {
								right: D((e) => [h.value ? (_(), r(g, {
									key: 1,
									name: "XMarkIcon",
									class: f(e.class)
								}, null, 8, ["class"])) : (_(), r(g, {
									key: 0,
									name: "FunnelIcon",
									class: f(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(S(C(u)("tasks_projects.general.filter")) + " ", 1)]),
								_: 1
							}),
							c(v, {
								variant: "primary",
								onClick: ne
							}, {
								left: D((e) => [c(g, {
									name: "PlusIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(u)("tasks_projects.projects.new_project")), 1)]),
								_: 1
							})
						])]),
						default: D(() => [c(m, null, {
							default: D(() => [c(l, {
								title: C(u)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(l, {
								title: C(u)("tasks_projects.projects.title"),
								to: "#",
								active: ""
							}, null, 8, ["title"])]),
							_: 1
						})]),
						_: 1
					}, 8, ["title"]),
					c(z, {
						show: h.value,
						class: "mt-3",
						onClear: te
					}, {
						default: D(() => [c(F, {
							label: C(u)("tasks_projects.general.search"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(E, {
								modelValue: j.search,
								"onUpdate:modelValue": n[0] ||= (e) => j.search = e,
								type: "text",
								name: "search",
								autocomplete: "off",
								placeholder: C(u)("tasks_projects.projects.search_placeholder")
							}, null, 8, ["modelValue", "placeholder"])]),
							_: 1
						}, 8, ["label"]), c(F, {
							label: C(u)("tasks_projects.projects.columns.status"),
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
						title: C(u)("tasks_projects.projects.empty_title"),
						description: C(u)("tasks_projects.projects.empty_description")
					}, {
						actions: D(() => [c(v, {
							variant: "primary",
							onClick: ne
						}, {
							left: D((e) => [c(g, {
								name: "PlusIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: D(() => [s(" " + S(C(u)("tasks_projects.projects.new_project")), 1)]),
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
							class: f(["mr-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: p(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), o("span", null, [c(y, {
							class: "hover:text-primary-500",
							to: C(W).project(e.data.id)
						}, {
							default: D(() => [s(S(e.data.name), 1)]),
							_: 2
						}, 1032, ["to"]), e.data.identifier ? (_(), a("span", Ur, S(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": D(({ row: e }) => [c(le, { class: f(["rounded-full", se(e.data.status)]) }, {
							default: D(() => [s(S(ce(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": D(({ row: e }) => [e.data.customer_id ? (_(), a("span", Wr, S(C($t)(e.data.customer_id)), 1)) : (_(), a("span", Gr, S(C(u)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": D(({ row: e }) => [e.data.default_rate === null ? (_(), a("span", Kr, "-")) : (_(), r(ue, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": D(({ row: e }) => [e.data.due_date ? (_(), a("span", qr, S(C(ut)(e.data.due_date)), 1)) : (_(), a("span", Jr, "-"))]),
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
									}), s(" " + S(C(u)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(de, { onClick: (t) => ae(e.data) }, {
									default: D(() => [c(g, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + S(e.data.status === "ARCHIVED" ? C(u)("tasks_projects.projects.unarchive") : C(u)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(de, { onClick: (t) => oe(e.data) }, {
									default: D(() => [c(g, {
										name: "TrashIcon",
										class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + S(C(u)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading"])]),
						_: 1
					}, 8, ["columns"])], 512), [[T, !I.value]]),
					c(Dr, {
						show: w.value,
						client: e.client,
						notify: e.notify,
						project: k.value,
						onClose: n[2] ||= (e) => w.value = !1,
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
		let l = t, u = B(), d = y([]), p = y([]), m = y(!0), g = y(!1), v = y(null), w = y(null), T = y(""), E = y({}), O = n(() => l.project?.id ?? Number(l.id)), k = n(() => p.value.filter((e) => !d.value.some((t) => t.user_id === e.id)).map((e) => ({
			id: e.id,
			label: e.name
		})));
		h(() => {
			A();
		});
		async function A() {
			m.value = !0;
			try {
				p.value = await Jt(l.client);
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
			return p.value.find((t) => t.id === e)?.name ?? u("tasks_projects.project.time.removed_member");
		}
		async function M() {
			let e = w.value;
			if (!(e === null || g.value)) {
				g.value = !0, E.value = {};
				try {
					await yr(l.client, O.value, {
						user_id: e.id,
						rate: st(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), w.value = null, T.value = "", await A();
				} catch (e) {
					E.value = at(e), l.notify("error", H(e, u("tasks_projects.project.members.attach_failed")));
				} finally {
					g.value = !1;
				}
			}
		}
		async function N(e) {
			let t = j(e.user_id);
			if (window.confirm(u("tasks_projects.project.members.detach_confirm", { name: t }))) {
				v.value = e.user_id;
				try {
					await br(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", H(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					v.value = null;
				}
			}
		}
		return (t, n) => {
			let l = x("BaseSelectInput"), p = x("BaseInputGroup"), h = x("BaseInput"), y = x("BaseIcon"), O = x("BaseButton"), A = x("BaseSpinner"), P = x("BaseFormatMoney");
			return _(), a("div", Qr, [o("div", $r, [o("div", ei, [
				c(p, {
					label: C(u)("tasks_projects.project.members.member"),
					error: E.value.user_id,
					class: "flex-1"
				}, {
					default: D(() => [c(l, {
						modelValue: w.value,
						"onUpdate:modelValue": n[0] ||= (e) => w.value = e,
						options: k.value,
						placeholder: C(u)("tasks_projects.project.members.attach_placeholder"),
						"label-key": "label"
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "error"]),
				c(p, {
					label: C(u)("tasks_projects.project.members.rate"),
					error: E.value.rate,
					"help-text": C(u)("tasks_projects.project.members.rate_help"),
					class: "flex-1"
				}, {
					default: D(() => [c(h, {
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
					loading: g.value,
					disabled: g.value || w.value === null,
					onClick: M
				}, {
					left: D((e) => [c(y, {
						name: "PlusIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + S(C(u)("tasks_projects.project.members.attach")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			]), k.value.length === 0 && !m.value ? (_(), a("p", ti, S(C(u)("tasks_projects.project.members.all_attached")), 1)) : i("", !0)]), o("div", ni, [m.value ? (_(), a("div", ri, [c(A, { class: "h-6 w-6 text-primary-500" })])) : d.value.length === 0 ? (_(), a("p", ii, S(C(u)("tasks_projects.project.members.empty")), 1)) : (_(), a("ul", ai, [(_(!0), a(e, null, b(d.value, (e) => (_(), a("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [o("div", null, [o("p", oi, S(j(e.user_id)), 1), o("p", si, [s(S(C(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (_(), a("span", ci, S(C(u)("tasks_projects.tasks.none")), 1)) : (_(), r(P, {
				key: 0,
				amount: e.rate
			}, null, 8, ["amount"]))])]), c(O, {
				variant: "danger",
				size: "sm",
				loading: v.value === e.user_id,
				disabled: v.value === e.user_id,
				onClick: (t) => N(e)
			}, {
				default: D(() => [s(S(C(u)("tasks_projects.general.delete")), 1)]),
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
		let u = t, d = l, m = B(), h = n(() => u.project?.totals ?? null), g = n(() => u.project?.budget_minutes ?? null), v = n(() => {
			let e = g.value, t = h.value?.logged_minutes ?? 0;
			return e ? Math.min(100, Math.round(t / e * 100)) : 0;
		}), y = n(() => M.allowed && u.project?.customer_id !== null && (h.value?.unbilled_amount ?? 0) > 0), b = n(() => M.busy), w = n(() => {
			let e = g.value, t = h.value?.logged_minutes ?? 0;
			return e && t > e ? t - e : 0;
		});
		async function T() {
			let e = u.project;
			e !== null && y.value && !b.value && (await bt({
				client: u.client,
				router: u.router,
				notify: u.notify,
				t: m
			}, { projectId: e.id }) || d("refresh"));
		}
		return (n, l) => {
			let u = x("BaseFormatMoney"), d = x("BaseIcon"), E = x("BaseButton"), O = x("BaseSpinner");
			return t.project && h.value ? (_(), a("div", ui, [
				o("div", di, [
					o("div", fi, [
						o("p", pi, S(C(m)("tasks_projects.project.overview.tasks")), 1),
						o("p", mi, S(h.value.tasks.total), 1),
						o("p", hi, S(C(m)("tasks_projects.project.overview.open_tasks", { count: h.value.tasks.open })) + " · " + S(C(m)("tasks_projects.project.overview.closed_tasks", { count: h.value.tasks.closed })), 1)
					]),
					o("div", gi, [
						o("p", _i, S(C(m)("tasks_projects.project.overview.logged")), 1),
						o("p", vi, S(C(ft)(h.value.logged_minutes)), 1),
						o("p", yi, S(C(m)("tasks_projects.project.overview.billable")) + ": " + S(C(ft)(h.value.billable_minutes)), 1)
					]),
					o("div", bi, [o("p", xi, S(C(m)("tasks_projects.project.overview.billable_amount")), 1), o("p", Si, [c(u, { amount: h.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Ci, [
						o("p", wi, S(C(m)("tasks_projects.project.overview.unbilled_amount")), 1),
						o("p", Ti, [c(u, { amount: h.value.unbilled_amount }, null, 8, ["amount"])]),
						y.value ? (_(), r(E, {
							key: 0,
							class: "mt-2",
							variant: "primary-outline",
							size: "sm",
							loading: b.value,
							disabled: b.value,
							onClick: T
						}, {
							left: D((e) => [b.value ? i("", !0) : (_(), r(d, {
								key: 0,
								name: "BanknotesIcon",
								class: f(e.class)
							}, null, 8, ["class"]))]),
							default: D(() => [s(" " + S(C(m)("tasks_projects.project.invoice_project")), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])) : i("", !0)
					])
				]),
				o("div", Ei, [o("p", Di, S(C(m)("tasks_projects.project.overview.budget")), 1), g.value ? (_(), a(e, { key: 0 }, [
					o("p", Oi, S(C(m)("tasks_projects.project.overview.budget_used", {
						used: C(ft)(h.value.logged_minutes),
						total: C(ft)(g.value)
					})), 1),
					o("div", ki, [o("div", {
						class: f(["h-2 rounded-full", w.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: p({ width: `${v.value}%` })
					}, null, 6)]),
					w.value > 0 ? (_(), a("p", Ai, S(C(m)("tasks_projects.project.overview.budget_over", { amount: C(ft)(w.value) })), 1)) : i("", !0)
				], 64)) : (_(), a("p", ji, S(C(m)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", Mi, [o("p", Ni, S(C(m)("tasks_projects.project.overview.description")), 1), t.project.description ? (_(), a("p", Pi, S(t.project.description), 1)) : (_(), a("p", Fi, S(C(m)("tasks_projects.project.overview.no_description")), 1))])
			])) : (_(), a("div", Ii, [c(O, { class: "h-8 w-8 text-primary-500" })]));
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
		let r = e, s = t, l = B(), u = y(r.modelValue.search), d, f = n(() => [{
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
		}))]), h = n(() => [
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
		}), v = n({
			get: () => T(p.value, r.modelValue.user),
			set: (e) => D({ user: e?.id ?? "" })
		}), b = n({
			get: () => T(h.value, r.modelValue.status),
			set: (e) => D({ status: e?.id ?? "" })
		}), w = n(() => Hi(r.modelValue));
		E(() => r.modelValue.search, (e) => {
			e !== u.value && (u.value = e);
		}), E(u, (e) => {
			clearTimeout(d), d = setTimeout(() => D({ search: e.trim() }), aa);
		}), m(() => clearTimeout(d));
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
			let r = x("BaseSelectInput"), s = x("BaseInput");
			return _(), a("div", Xi, [
				e.lockProject ? i("", !0) : (_(), a("label", Zi, [o("span", Qi, S(C(l)("tasks_projects.tasks.filters.project")), 1), c(r, {
					modelValue: g.value,
					"onUpdate:modelValue": n[0] ||= (e) => g.value = e,
					options: f.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])])),
				o("label", $i, [o("span", ea, S(C(l)("tasks_projects.tasks.filters.member")), 1), c(r, {
					modelValue: v.value,
					"onUpdate:modelValue": n[1] ||= (e) => v.value = e,
					options: p.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", ta, [o("span", na, S(C(l)("tasks_projects.tasks.filters.status")), 1), c(r, {
					modelValue: b.value,
					"onUpdate:modelValue": n[2] ||= (e) => b.value = e,
					options: h.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", ra, [o("span", ia, S(C(l)("tasks_projects.tasks.filters.search")), 1), c(s, {
					modelValue: u.value,
					"onUpdate:modelValue": n[3] ||= (e) => u.value = e,
					type: "text",
					name: "search",
					autocomplete: "off",
					placeholder: C(l)("tasks_projects.tasks.search_placeholder")
				}, null, 8, ["modelValue", "placeholder"])]),
				w.value ? (_(), a("button", {
					key: 1,
					type: "button",
					class: "pb-2 text-sm font-medium text-primary-500 hover:underline",
					onClick: O
				}, S(C(l)("tasks_projects.tasks.bulk.clear")), 1)) : i("", !0)
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
		let l = e, u = t, d = B(), p = y(null), m = n(() => l.statuses.map((e) => ({
			id: e.id,
			label: e.name
		})));
		return E(p, (e) => {
			e !== null && (u("status", e.id), p.value = null);
		}), (t, n) => {
			let l = x("BaseSelectInput"), h = x("BaseIcon"), g = x("BaseButton");
			return e.count > 0 ? (_(), a("div", sa, [
				o("span", ca, S(C(d)("tasks_projects.tasks.bulk.selected", { count: e.count })), 1),
				o("div", la, [c(l, {
					modelValue: p.value,
					"onUpdate:modelValue": n[0] ||= (e) => p.value = e,
					options: m.value,
					disabled: e.busy,
					placeholder: C(d)("tasks_projects.tasks.bulk.change_status"),
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
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + S(C(d)("tasks_projects.tasks.bulk.delete")), 1)]),
					_: 1
				}, 8, ["disabled"]),
				e.canInvoice ? (_(), r(g, {
					key: 0,
					variant: "primary-outline",
					size: "sm",
					loading: e.invoicing,
					disabled: e.busy || e.invoicing,
					onClick: n[2] ||= (e) => u("invoice")
				}, {
					left: D((t) => [e.invoicing ? i("", !0) : (_(), r(h, {
						key: 0,
						name: "BanknotesIcon",
						class: f(t.class)
					}, null, 8, ["class"]))]),
					default: D(() => [s(" " + S(C(d)("tasks_projects.tasks.bulk.invoice")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : i("", !0),
				o("button", {
					type: "button",
					class: "ml-auto text-sm font-medium text-primary-600 hover:underline",
					onClick: n[3] ||= (e) => u("select-page")
				}, S(C(d)("tasks_projects.tasks.bulk.select_page")), 1),
				o("button", {
					type: "button",
					class: "text-sm font-medium text-primary-600 hover:underline",
					onClick: n[4] ||= (e) => u("clear")
				}, S(C(d)("tasks_projects.tasks.bulk.clear")), 1)
			])) : i("", !0);
		};
	}
}), da = /* @__PURE__ */ l({
	__name: "InvoicedBadge",
	props: { state: { default: "none" } },
	setup(e) {
		let t = e, a = B(), o = n(() => t.state === "invoiced" || t.state === "uninvoiced"), c = n(() => t.state === "invoiced" ? a("tasks_projects.tasks.invoiced") : a("tasks_projects.tasks.uninvoiced")), l = n(() => t.state === "invoiced" ? "bg-alert-success-bg! text-alert-success-text!" : "bg-alert-warning-bg! text-alert-warning-text!");
		return (e, t) => {
			let n = x("BaseBadge");
			return o.value ? (_(), r(n, {
				key: 0,
				class: f(["rounded-full whitespace-nowrap", l.value])
			}, {
				default: D(() => [s(S(c.value), 1)]),
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
		let l = e, u = t, d = B(), f = v({
			name: "",
			description: "",
			estimateHours: "",
			rate: "",
			dueDate: "",
			billable: !0
		}), p = y(null), m = y(null), h = y(null), g = y(null), b = y(null), w = y({}), T = y(!1), O = y(!1), k = y(!1), j = n(() => !l.compact || k.value), M = n({
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
			p.value = R(F.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = R(I.value, e?.assignee_id ?? null), g.value = e?.priority ? L.value[fa.indexOf(e.priority)] ?? null : null, b.value = e?.customer_id ?? null, w.value = {}, k.value = !1, b.value !== null && en(l.client);
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
				customer_id: m.value === null ? b.value : null,
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
				w.value = { name: d("tasks_projects.tasks.name_required") };
				return;
			}
			let e = te();
			if (e === null) {
				l.notify("error", d("tasks_projects.task_statuses.none"));
				return;
			}
			T.value = !0, w.value = {};
			try {
				let t = l.task, n = t ? await lr(l.client, t.id, e) : await cr(l.client, e);
				u("saved", n);
			} catch (e) {
				w.value = at(e), l.notify("error", H(e, re(e, "save_failed")));
			} finally {
				T.value = !1;
			}
		}
		function re(e, t) {
			return gt(e) === "task_locked" ? d("tasks_projects.tasks.locked") : d(`tasks_projects.tasks.${t}`);
		}
		async function ie() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await ur(l.client, e.id), u("deleted", e);
				} catch (e) {
					l.notify("error", H(e, re(e, "delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, n) => {
			let l = x("BaseIcon"), m = x("BaseInput"), v = x("BaseInputGroup"), y = x("BaseSelectInput"), E = x("BaseDatePicker"), R = x("BaseInputGrid"), z = x("BaseSwitch"), B = x("BaseTextarea"), te = x("BaseButton"), re = x("BaseModal");
			return _(), r(re, {
				show: e.show,
				onClose: n[12] ||= (e) => u("close")
			}, {
				header: D(() => [o("div", pa, [o("span", null, [s(S(P.value) + " ", 1), e.task ? (_(), a("span", ma, "#" + S(e.task.number), 1)) : i("", !0)]), c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: n[0] ||= (e) => u("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(ne, ["prevent"]) }, [o("div", ha, [
					c(v, {
						label: C(d)("tasks_projects.tasks.fields.name"),
						error: w.value.name,
						required: ""
					}, {
						default: D(() => [c(m, {
							modelValue: f.name,
							"onUpdate:modelValue": n[1] ||= (e) => f.name = e,
							invalid: !!w.value.name,
							type: "text"
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"]),
					c(R, null, {
						default: D(() => [
							e.lockProject ? i("", !0) : (_(), r(v, {
								key: 0,
								label: C(d)("tasks_projects.tasks.fields.project"),
								error: w.value.project_id,
								"help-text": C(d)("tasks_projects.tasks.fields.project_help")
							}, {
								default: D(() => [c(y, {
									modelValue: M.value,
									"onUpdate:modelValue": n[2] ||= (e) => M.value = e,
									options: e.projects,
									placeholder: C(d)("tasks_projects.tasks.fields.project_placeholder"),
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
							b.value === null ? i("", !0) : (_(), r(v, {
								key: 1,
								label: C(d)("tasks_projects.tasks.fields.customer"),
								"help-text": C(d)("tasks_projects.tasks.fields.customer_help")
							}, {
								default: D(() => [c(m, {
									"model-value": C($t)(b.value),
									type: "text",
									disabled: ""
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "help-text"])),
							c(v, {
								label: C(d)("tasks_projects.tasks.fields.status"),
								error: w.value.task_status_id
							}, {
								default: D(() => [c(y, {
									modelValue: p.value,
									"onUpdate:modelValue": n[3] ||= (e) => p.value = e,
									options: F.value,
									"label-key": "label"
								}, null, 8, ["modelValue", "options"])]),
								_: 1
							}, 8, ["label", "error"]),
							c(v, {
								label: C(d)("tasks_projects.tasks.fields.assignee"),
								error: w.value.assignee_id
							}, {
								default: D(() => [c(y, {
									modelValue: h.value,
									"onUpdate:modelValue": n[4] ||= (e) => h.value = e,
									options: I.value,
									placeholder: C(d)("tasks_projects.tasks.fields.assignee_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"]),
							j.value ? (_(), r(v, {
								key: 2,
								label: C(d)("tasks_projects.tasks.fields.priority"),
								error: w.value.priority
							}, {
								default: D(() => [c(y, {
									modelValue: g.value,
									"onUpdate:modelValue": n[5] ||= (e) => g.value = e,
									options: L.value,
									placeholder: C(d)("tasks_projects.tasks.fields.priority_placeholder"),
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"placeholder"
								])]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0),
							c(v, {
								label: C(d)("tasks_projects.tasks.fields.due_date"),
								error: w.value.due_date
							}, {
								default: D(() => [c(E, {
									"model-value": f.dueDate,
									"onUpdate:modelValue": ee
								}, null, 8, ["model-value"])]),
								_: 1
							}, 8, ["label", "error"]),
							j.value ? (_(), r(v, {
								key: 3,
								label: C(d)("tasks_projects.tasks.fields.estimate_hours"),
								error: w.value.estimated_minutes
							}, {
								default: D(() => [c(m, {
									modelValue: f.estimateHours,
									"onUpdate:modelValue": n[6] ||= (e) => f.estimateHours = e,
									invalid: !!w.value.estimated_minutes,
									type: "number",
									step: "0.25",
									min: "0"
								}, null, 8, ["modelValue", "invalid"])]),
								_: 1
							}, 8, ["label", "error"])) : i("", !0),
							j.value ? (_(), r(v, {
								key: 4,
								label: C(d)("tasks_projects.tasks.fields.rate"),
								error: w.value.rate,
								"help-text": C(d)("tasks_projects.tasks.fields.rate_help")
							}, {
								default: D(() => [c(m, {
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
							])) : i("", !0)
						]),
						_: 1
					}),
					c(v, {
						label: C(d)("tasks_projects.tasks.fields.billable"),
						error: w.value.billable
					}, {
						default: D(() => [c(z, {
							modelValue: f.billable,
							"onUpdate:modelValue": n[8] ||= (e) => f.billable = e,
							class: "mt-1"
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label", "error"]),
					j.value ? (_(), r(v, {
						key: 0,
						label: C(d)("tasks_projects.tasks.fields.description"),
						error: w.value.description
					}, {
						default: D(() => [c(B, {
							modelValue: f.description,
							"onUpdate:modelValue": n[9] ||= (e) => f.description = e,
							row: 3,
							invalid: !!w.value.description
						}, null, 8, ["modelValue", "invalid"])]),
						_: 1
					}, 8, ["label", "error"])) : i("", !0),
					e.compact ? (_(), a("button", {
						key: 1,
						type: "button",
						class: "flex items-center gap-1 text-sm font-medium text-primary-500 hover:underline",
						onClick: n[10] ||= (e) => k.value = !k.value
					}, [c(l, {
						name: k.value ? "ChevronUpIcon" : "ChevronDownIcon",
						class: "h-4 w-4"
					}, null, 8, ["name"]), s(" " + S(k.value ? C(d)("tasks_projects.tasks.fewer_fields") : C(d)("tasks_projects.tasks.all_fields")), 1)])) : i("", !0)
				]), o("div", ga, [N.value ? (_(), r(te, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: ie
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), a("span", _a)), o("div", va, [c(te, {
					type: "button",
					variant: "primary-outline",
					onClick: n[11] ||= (e) => u("close")
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), c(te, {
					type: "submit",
					variant: "primary",
					loading: T.value,
					disabled: T.value
				}, {
					default: D(() => [s(S(N.value ? C(d)("tasks_projects.general.update") : C(d)("tasks_projects.general.save")), 1)]),
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
}, xa = v({
	adminMode: !1,
	userId: null,
	settings: { ...ba },
	companySession: 0,
	loading: !1
});
async function Sa(e) {
	if (xa.adminMode) return;
	xa.loading = !0;
	let [t, n] = await Promise.all([We(e).catch(() => null), Ue(e).catch(() => null)]);
	xa.userId = t, xa.settings = Ta(n), xa.loading = !1;
}
function Ca() {
	xa.userId = null, xa.settings = { ...ba }, xa.companySession += 1, xa.loading = !1;
}
function wa(e) {
	xa.adminMode = e;
}
function Ta(e) {
	if (typeof e != "object" || !e) return { ...ba };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : ba.rounding_increments;
	return {
		default_rate: Ea(e.default_rate, ba.default_rate),
		rounding_minutes: Ea(e.rounding_minutes, ba.rounding_minutes),
		rounding_direction: Oa(e.rounding_direction),
		week_start: ka(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		auto_start_tasks: Da(e.auto_start_tasks, ba.auto_start_tasks),
		lock_invoiced_tasks: Da(e.lock_invoiced_tasks, ba.lock_invoiced_tasks),
		hide_invoiced_on_board: Da(e.hide_invoiced_on_board, ba.hide_invoiced_on_board),
		invoice_project_heading: Da(e.invoice_project_heading, ba.invoice_project_heading),
		invoice_task_description: Da(e.invoice_task_description, ba.invoice_task_description),
		invoice_entry_dates: Da(e.invoice_entry_dates, ba.invoice_entry_dates),
		invoice_entry_times: Da(e.invoice_entry_times, ba.invoice_entry_times),
		invoice_entry_hours: Da(e.invoice_entry_hours, ba.invoice_entry_hours),
		invoice_entry_descriptions: Da(e.invoice_entry_descriptions, ba.invoice_entry_descriptions),
		rounding_increments: t.length > 0 ? t : ba.rounding_increments
	};
}
function Ea(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function Da(e, t) {
	return typeof e == "boolean" ? e : t;
}
function Oa(e) {
	return e === "up" || e === "down" || e === "nearest" ? e : ba.rounding_direction;
}
function ka(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : ba.week_start;
}
//#endregion
//#region resources/js/support/time.ts
var Aa = 60, ja = 60, Ma = 7;
function Na(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / ja), i = t % ja;
	return `${n}:${Xa(r)}:${Xa(i)}`;
}
function Pa(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / Aa)}:${Xa(t % Aa)}`;
}
function Fa(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * Aa + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * Aa);
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
	return n.setTime(n.getTime() + t * ja * 1e3), n.toISOString();
}
function Ba(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = Ya(e), i = (r.getDay() - n + Ma) % Ma;
	return r.setDate(r.getDate() - i), r;
}
function Va(e) {
	return Array.from({ length: Ma }, (t, n) => Ha(e, n));
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
var G = v({
	running: null,
	busy: !1
}), Za = v({ now: Date.now() }), Qa, $a = 0;
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
	return to(), g(no, !0), n(() => Za.now);
}
var io = !1;
function ao(e, t) {
	if (G.running = e && typeof e.id == "number" ? e : null, G.running === null) {
		io && (io = !1, no());
		return;
	}
	io || (io = !0, to()), t && typeof G.running.task_id == "number" && $e(t, [G.running.task_id]);
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
var K = {
	get running() {
		return G.running;
	},
	get runningTaskId() {
		let e = G.running?.task_id;
		return typeof e == "number" ? e : null;
	},
	get elapsedSeconds() {
		return G.running === null ? 0 : Ka(G.running.started_at, Za.now);
	},
	get busy() {
		return G.busy;
	},
	isRunningOn(e) {
		return G.running !== null && G.running.task_id === e;
	},
	async refresh(e) {
		try {
			ao(await Me(e), e);
		} catch {
			ao(null);
		}
	},
	async start(e, t, n = null, r) {
		if (G.busy) return null;
		G.busy = !0;
		try {
			let r = await Ne(e, {
				task_id: t,
				description: n
			});
			return ao(r, e), so(r), V(), r;
		} catch (t) {
			return _t(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : oo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			G.busy = !1;
		}
	},
	async startOnTask(e, t, n = null, r) {
		if (G.busy) return null;
		G.busy = !0;
		try {
			let r = await fr(e, t, n);
			return ao(r, e), so(r), V(), r;
		} catch (t) {
			return gt(t) === "timer_already_running" ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : oo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			G.busy = !1;
		}
	},
	async stop(e, t) {
		if (G.busy || G.running === null) return null;
		let n = G.running.task_id;
		G.busy = !0;
		try {
			let t = await Pe(e);
			return ao(null), tt(n, { running: [] }), V(), t;
		} catch (n) {
			return oo(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			G.busy = !1;
		}
	},
	async stopOnTask(e, t, n) {
		if (G.busy) return null;
		G.busy = !0;
		try {
			let n = await pr(e, t);
			return ao(null), tt(t, { running: [] }), V(), n;
		} catch (t) {
			return gt(t) === "timer_mismatch" ? n?.notify("warning", n.t("tasks_projects.timer.mismatch")) : oo(n, t, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			G.busy = !1;
		}
	},
	async discard(e, t) {
		if (G.busy || G.running === null) return !1;
		let n = G.running.task_id;
		G.busy = !0;
		try {
			return await Fe(e), ao(null), tt(n, { running: [] }), V(), !0;
		} catch (n) {
			return oo(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			G.busy = !1;
		}
	},
	reset() {
		G.busy = !1, ao(null);
	}
}, co = { class: "flex items-center gap-1.5" }, lo = [
	"disabled",
	"title",
	"aria-label"
], uo = ["title", "aria-label"], fo = ["disabled", "title"], po = [
	"disabled",
	"title",
	"aria-label"
], mo = ["title"], ho = /* @__PURE__ */ l({
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
		})), d = n(() => K.isRunningOn(r.task.id)), p = n(() => K.runningTaskId !== null && !d.value), m = n(() => Ze(K.runningTaskId)), h = n(() => nt(r.task).running.filter((e) => e.user_id !== xa.userId && e.entry_id !== K.running?.id)), g = n(() => Na(K.elapsedSeconds)), v = n(() => r.size === "md" ? "h-5 w-5" : "h-4 w-4"), y = n(() => r.size === "md" ? "p-2" : "p-1.5");
		function w(e) {
			return r.members.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function T(e) {
			let t = r.members.find((t) => t.id === e);
			return t ? pt(t.name) : "?";
		}
		function E(e) {
			return Na(Ka(e.started_at, l.value));
		}
		function D(e) {
			return i("tasks_projects.timer.running_by", {
				name: w(e.user_id),
				time: E(e)
			});
		}
		async function O() {
			await K.startOnTask(r.client, r.task.id, null, u.value) !== null && r.notify("success", i("tasks_projects.timer.started", { name: r.task.name }));
		}
		async function k() {
			let e = await K.stopOnTask(r.client, r.task.id, u.value);
			e !== null && r.notify("success", i("tasks_projects.timer.stopped", {
				name: r.task.name,
				duration: Pa(e.duration_minutes)
			}));
		}
		async function j() {
			await K.stop(r.client, u.value) !== null && await O();
		}
		return (n, r) => {
			let l = x("BaseIcon");
			return _(), a("div", co, [d.value ? (_(), a(e, { key: 0 }, [o("button", {
				type: "button",
				class: f(["rounded-md text-status-red hover:bg-hover disabled:opacity-50", y.value]),
				disabled: C(K).busy,
				title: C(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				"aria-label": C(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				onClick: A(k, ["stop"])
			}, [c(l, {
				name: "StopIcon",
				class: f(v.value)
			}, null, 8, ["class"])], 10, lo), o("span", { class: f(["font-medium tabular-nums text-primary-500", t.size === "md" ? "text-base" : "text-xs"]) }, S(g.value), 3)], 64)) : p.value ? (_(), a(e, { key: 1 }, [o("button", {
				type: "button",
				class: f(["cursor-not-allowed rounded-md text-subtle", y.value]),
				disabled: "",
				title: C(i)("tasks_projects.timer.busy_elsewhere", { name: m.value }),
				"aria-label": C(i)("tasks_projects.timer.busy_elsewhere", { name: m.value })
			}, [c(l, {
				name: "PlayIcon",
				class: f(v.value)
			}, null, 8, ["class"])], 10, uo), o("button", {
				type: "button",
				class: "rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary-500 hover:bg-hover disabled:opacity-50",
				disabled: C(K).busy,
				title: C(i)("tasks_projects.timer.stop_and_start"),
				onClick: A(j, ["stop"])
			}, S(C(i)("tasks_projects.timer.stop_and_start")), 9, fo)], 64)) : (_(), a("button", {
				key: 2,
				type: "button",
				class: f(["rounded-md text-primary-500 hover:bg-hover disabled:opacity-50", y.value]),
				disabled: C(K).busy,
				title: C(i)("tasks_projects.timer.start_on", { name: t.task.name }),
				"aria-label": C(i)("tasks_projects.timer.start_on", { name: t.task.name }),
				onClick: A(O, ["stop"])
			}, [c(l, {
				name: "PlayIcon",
				class: f(v.value)
			}, null, 8, ["class"])], 10, po)), (_(!0), a(e, null, b(h.value, (e) => (_(), a("span", {
				key: e.entry_id,
				class: "flex items-center gap-1 rounded-full bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-muted",
				title: D(e)
			}, [c(l, {
				name: "ClockIcon",
				class: "h-3.5 w-3.5 text-primary-500"
			}), s(" " + S(T(e.user_id)), 1)], 8, mo))), 128))]);
		};
	}
}), go = { class: "relative table-container" }, _o = { class: "inline-flex items-center whitespace-nowrap" }, vo = { class: "tabular-nums" }, yo = {
	key: 1,
	class: "text-subtle"
}, bo = ["title"], xo = 10, So = "whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider", Co = "px-3 py-4 text-sm text-muted whitespace-nowrap", wo = /* @__PURE__ */ l({
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
		let d = t, m = u, h = {
			number: "number",
			name: "name"
		}, g = B(), v = y(null), b = y(!0), w = y(0), k = y([]), A = y([]), j = y(!1), N = y(!1), P = y(null), F = y({}), I = y(null), L = n(() => d.projects.map((e) => ({
			id: e.id,
			label: e.name
		}))), R = n(() => M.busy), z = n(() => M.allowed), ee = n(() => d.filters.search !== "" || d.filters.status !== "" || d.filters.user !== "" || d.projectId === null && d.filters.project !== ""), te = n(() => !b.value && w.value === 0 && !ee.value), ne = n(() => [
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
			defaultThClass: So,
			defaultTdClass: Co,
			...e
		})));
		E(() => Ui(d.filters), () => ie()), E(() => d.projectId, () => ie()), E(et, () => ie(!0));
		async function re({ page: e, sort: t }) {
			let n = Vt(t, h), r = {
				page: e,
				limit: xo,
				...Gi(d.filters, { projectId: d.projectId }),
				...n
			};
			b.value = !0;
			try {
				let e = await sr(d.client, r), t = e.data ?? [], n = e.meta;
				return w.value = n?.total ?? t.length, k.value = t, A.value = A.value.filter((e) => t.some((t) => t.id === e)), {
					data: t,
					pagination: {
						totalPages: n?.last_page ?? 1,
						currentPage: n?.current_page ?? 1,
						totalCount: n?.total ?? t.length,
						limit: n?.per_page ?? xo
					}
				};
			} catch (e) {
				return d.notify("error", H(e, g("tasks_projects.tasks.load_failed"))), k.value = [], {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: xo
					}
				};
			} finally {
				b.value = !1;
			}
		}
		function ie(e = !1) {
			v.value?.refresh(e);
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
			N.value = !1, P.value = null, d.notify("success", t), V(), m("changed");
		}
		function fe(e) {
			N.value = !1, P.value = null, d.notify("success", g("tasks_projects.tasks.deleted", { name: e.name })), V(), m("changed");
		}
		function pe(e) {
			return d.statuses.find((t) => t.id === e.task_status_id) ?? null;
		}
		function me(e) {
			return e.assignee_id === null ? g("tasks_projects.tasks.unassigned") : d.members.find((t) => t.id === e.assignee_id)?.name ?? `#${e.assignee_id}`;
		}
		function he(e) {
			return Pa(nt(e).logged_minutes);
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
					await ur(d.client, e.id), d.notify("success", g("tasks_projects.tasks.deleted", { name: e.name })), V(), m("changed");
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
						count: n.updated,
						failed: n.failed.length
					})) : n.updated === 0 ? d.notify("warning", g("tasks_projects.tasks.bulk.nothing")) : d.notify("success", g(`tasks_projects.tasks.bulk.${t}`, { count: n.updated })), ce(), V(), m("changed");
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
			let u = x("BaseIcon"), d = x("BaseButton"), m = x("BaseEmptyPlaceholder"), h = x("BaseCheckbox"), y = x("router-link"), b = x("BaseFormatMoney"), w = x("BaseDropdownItem"), E = x("BaseDropdown"), k = x("BaseTable");
			return _(), a("div", null, [
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
				O(c(m, {
					title: C(g)("tasks_projects.tasks.empty_title"),
					description: C(g)("tasks_projects.tasks.empty_description")
				}, {
					actions: D(() => [c(d, {
						variant: "primary",
						onClick: le
					}, {
						left: D((e) => [c(u, {
							name: "PlusIcon",
							class: f(e.class)
						}, null, 8, ["class"])]),
						default: D(() => [s(" " + S(C(g)("tasks_projects.tasks.new_task")), 1)]),
						_: 1
					})]),
					default: D(() => [c(u, {
						name: "ClipboardDocumentListIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"]), [[T, te.value]]),
				O(o("div", go, [c(k, {
					ref_key: "tableRef",
					ref: v,
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
					"cell-number": D(({ row: e }) => [s("#" + S(e.data.number), 1)]),
					"cell-name": D(({ row: e }) => [c(y, {
						class: "hover:text-primary-500",
						to: C(W).task(e.data.id)
					}, {
						default: D(() => [s(S(e.data.name), 1)]),
						_: 2
					}, 1032, ["to"]), e.data.due_date ? (_(), a("span", {
						key: 0,
						class: f(["mt-0.5 block text-xs font-normal", C(mt)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "text-muted"])
					}, S(C(g)("tasks_projects.tasks.columns.due_date")) + ": " + S(C(ut)(e.data.due_date)), 3)) : i("", !0)]),
					"cell-status": D(({ row: e }) => [o("span", _o, [o("span", {
						class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", pe(e.data)?.colour ? "" : "bg-line-default"]),
						style: p(pe(e.data)?.colour ? { backgroundColor: pe(e.data)?.colour } : void 0)
					}, null, 6), s(" " + S(pe(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": D(({ row: e }) => [o("span", { class: f(e.data.assignee_id === null ? "text-subtle" : "") }, S(me(e.data)), 3)]),
					"cell-logged": D(({ row: e }) => [o("span", vo, S(he(e.data)), 1)]),
					"cell-unbilled": D(({ row: e }) => [C(nt)(e.data).unbilled_amount > 0 ? (_(), r(b, {
						key: 0,
						amount: C(nt)(e.data).unbilled_amount
					}, null, 8, ["amount"])) : (_(), a("span", yo, "-"))]),
					"cell-invoiced": D(({ row: e }) => [c(da, { state: C(nt)(e.data).invoiced }, null, 8, ["state"])]),
					"cell-timer": D(({ row: e }) => [c(ho, {
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
							c(w, { onClick: (e) => ue(t.data) }, {
								default: D(() => [c(u, {
									name: "PencilIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + S(C(g)("tasks_projects.general.edit")), 1)]),
								_: 1
							}, 8, ["onClick"]),
							z.value ? (_(), a(e, { key: 0 }, [ge(t.data) && !R.value ? (_(), r(w, {
								key: 0,
								onClick: (e) => ye(t.data)
							}, {
								default: D(() => [c(u, {
									name: "BanknotesIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + S(C(g)("tasks_projects.tasks.invoice_task")), 1)]),
								_: 1
							}, 8, ["onClick"])) : (_(), a("div", {
								key: 1,
								class: "group flex cursor-not-allowed items-center px-4 py-2 text-sm font-normal text-subtle",
								title: R.value ? C(g)("tasks_projects.billing.busy") : _e(t.data)
							}, [c(u, {
								name: "BanknotesIcon",
								class: "mr-3 h-5 w-5 text-subtle"
							}), s(" " + S(C(g)("tasks_projects.tasks.invoice_task")), 1)], 8, bo))], 64)) : i("", !0),
							c(w, { onClick: (e) => xe(t.data) }, {
								default: D(() => [c(u, {
									name: "TrashIcon",
									class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + S(C(g)("tasks_projects.general.delete")), 1)]),
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
}), To = { class: "py-4" }, Eo = { class: "flex flex-wrap items-end justify-between gap-3" }, Do = /* @__PURE__ */ l({
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
		let r = e, i = t, l = B(), u = y(null), d = y([]), p = y([]), m = y({ ...Ri }), g = n(() => r.project?.id ?? Number(r.id)), v = n(() => r.project === null ? [] : [r.project]);
		h(() => void b());
		async function b() {
			try {
				d.value = await or(r.client);
			} catch (e) {
				r.notify("error", H(e, l("tasks_projects.task_statuses.load_failed")));
			}
			try {
				p.value = await Jt(r.client);
			} catch {
				p.value = [];
			}
		}
		function w() {
			i("refresh");
		}
		return (t, n) => {
			let r = x("BaseIcon"), i = x("BaseButton");
			return _(), a("div", To, [o("div", Eo, [c(oa, {
				modelValue: m.value,
				"onUpdate:modelValue": n[0] ||= (e) => m.value = e,
				class: "flex-1",
				projects: v.value,
				members: p.value,
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
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + S(C(l)("tasks_projects.tasks.new_task")), 1)]),
				_: 1
			})]), c(wo, {
				ref_key: "listRef",
				ref: u,
				client: e.client,
				notify: e.notify,
				router: e.router,
				filters: m.value,
				statuses: d.value,
				members: p.value,
				projects: v.value,
				"project-id": g.value,
				onChanged: w
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
}), Oo = { class: "flex w-full items-center justify-between" }, ko = { class: "space-y-5 px-6 py-6" }, Ao = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, jo = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, Mo = ["disabled", "onClick"], No = {
	key: 1,
	class: "text-sm text-muted"
}, Po = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Fo = { key: 1 }, Io = { class: "flex space-x-3" }, Lo = "09:00", Ro = /* @__PURE__ */ l({
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
		let u = t, d = l, p = ["duration", "range"], m = B(), h = v({
			date: "",
			mode: "duration",
			duration: "",
			start: Lo,
			end: "",
			description: "",
			billable: !0
		}), g = y(null), w = y({}), T = y(!1), O = y(!1), k = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : k.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		E(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			w.value = {}, g.value = e === null ? u.defaultTask ?? null : null, h.date = e ? Ia(e.started_at) : u.defaultDate ?? Ua(/* @__PURE__ */ new Date()), h.duration = e ? Pa(e.duration_minutes) : "", h.start = e?.started_at ? La(e.started_at) : Lo, h.end = e?.ended_at ? La(e.ended_at) : "", h.description = e?.description ?? "", h.billable = e ? e.billable : g.value?.billable ?? !0, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? Ua(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
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
			let n = Ra(h.date, h.mode === "range" ? h.start : Lo);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? Fa(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? Ra(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), w.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
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
					w.value = at(e), u.notify("error", H(e, m("tasks_projects.time.save_failed")));
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
			let u = x("BaseIcon"), v = x("BaseInput"), y = x("BaseMultiselect"), E = x("BaseInputGroup"), N = x("BaseDatePicker"), P = x("BaseInputGrid"), F = x("BaseTextarea"), z = x("BaseSwitch"), B = x("BaseButton"), ne = x("BaseModal");
			return _(), r(ne, {
				show: t.show,
				onClose: l[8] ||= (e) => d("close")
			}, {
				header: D(() => [o("div", Oo, [o("span", null, S(M.value), 1), c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6 cursor-pointer text-subtle hover:text-body",
					onClick: l[0] ||= (e) => d("close")
				})])]),
				default: D(() => [o("form", { onSubmit: A(ee, ["prevent"]) }, [o("div", ko, [
					j.value ? (_(), a("p", Ao, S(C(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
					c(E, {
						label: C(m)("tasks_projects.time.fields.task"),
						error: w.value.task_id,
						required: ""
					}, {
						default: D(() => [t.lockTask ? (_(), r(v, {
							key: 0,
							"model-value": g.value?.name ?? "",
							type: "text",
							disabled: ""
						}, null, 8, ["model-value"])) : (_(), r(y, {
							key: 1,
							"model-value": g.value,
							options: I,
							disabled: j.value,
							invalid: !!w.value.task_id,
							placeholder: C(m)("tasks_projects.time.fields.task_placeholder"),
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
							label: C(m)("tasks_projects.time.fields.date"),
							error: w.value.date,
							required: ""
						}, {
							default: D(() => [c(N, {
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
						}, 8, ["label", "error"]), c(E, { label: C(m)("tasks_projects.time.fields.mode") }, {
							default: D(() => [o("div", jo, [(_(), a(e, null, b(p, (e) => o("button", {
								key: e,
								type: "button",
								class: f(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, S(C(m)(`tasks_projects.time.mode.${e}`)), 11, Mo)), 64))])]),
							_: 1
						}, 8, ["label"])]),
						_: 1
					}),
					h.mode === "duration" ? (_(), r(E, {
						key: 1,
						label: C(m)("tasks_projects.time.fields.duration"),
						error: w.value.duration_minutes,
						"help-text": C(m)("tasks_projects.time.fields.duration_help"),
						required: ""
					}, {
						default: D(() => [c(v, {
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
					])) : (_(), r(P, { key: 2 }, {
						default: D(() => [c(E, {
							label: C(m)("tasks_projects.time.fields.start"),
							error: w.value.started_at,
							required: ""
						}, {
							default: D(() => [c(v, {
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
						}, 8, ["label", "error"]), c(E, {
							label: C(m)("tasks_projects.time.fields.end"),
							error: w.value.ended_at,
							required: ""
						}, {
							default: D(() => [c(v, {
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
					c(E, {
						label: C(m)("tasks_projects.time.fields.description"),
						error: w.value.description
					}, {
						default: D(() => [c(F, {
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
					c(E, {
						label: C(m)("tasks_projects.time.fields.billable"),
						error: w.value.billable
					}, {
						default: D(() => [j.value ? (_(), a("span", No, S(h.billable ? C(m)("tasks_projects.time.billable") : C(m)("tasks_projects.time.non_billable")), 1)) : (_(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Po, [k.value && !j.value ? (_(), r(B, {
					key: 0,
					type: "button",
					variant: "danger",
					size: "sm",
					loading: O.value,
					disabled: O.value,
					onClick: te
				}, {
					default: D(() => [s(S(C(m)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), a("span", Fo)), o("div", Io, [c(B, {
					type: "button",
					variant: "primary-outline",
					onClick: l[7] ||= (e) => d("close")
				}, {
					default: D(() => [s(S(j.value ? C(m)("tasks_projects.timer.close") : C(m)("tasks_projects.general.cancel")), 1)]),
					_: 1
				}), j.value ? i("", !0) : (_(), r(B, {
					key: 0,
					type: "submit",
					variant: "primary",
					loading: T.value,
					disabled: T.value
				}, {
					default: D(() => [s(S(k.value ? C(m)("tasks_projects.general.update") : C(m)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"]))])])], 32)]),
				_: 1
			}, 8, ["show"]);
		};
	}
}), zo = { class: "py-4" }, Bo = { class: "flex justify-end" }, Vo = { class: "relative mt-3 table-container" }, Ho = { class: "font-medium text-heading" }, Uo = {
	key: 0,
	class: "block text-xs text-muted"
}, Wo = {
	key: 1,
	class: "text-subtle"
}, Go = {
	key: 0,
	class: "text-xs text-primary-500"
}, Ko = 15, qo = 100, Jo = /* @__PURE__ */ l({
	__name: "ProjectTimeTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), p = ro(), m = y(null), g = y([]), v = y([]), b = y(!1), w = y(null), T = n(() => l.project?.id ?? Number(l.id)), O = n(() => [
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
		h(() => {
			k();
		}), E(et, () => m.value?.refresh(!0));
		async function k() {
			try {
				g.value = await Jt(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await sr(l.client, {
					project_id: T.value,
					limit: qo
				});
				v.value = e.data ?? [];
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.load_failed")));
			}
		}
		async function A({ page: e }) {
			let t = {
				page: e,
				limit: Ko,
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
						limit: e.meta?.per_page ?? Ko
					}
				};
			} catch (e) {
				return l.notify("error", H(e, d("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Ko
					}
				};
			}
		}
		function j(e) {
			return g.value.find((t) => t.id === e)?.name ?? d("tasks_projects.project.time.removed_member");
		}
		function M(e) {
			return v.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function N(e) {
			return e.is_running ? Na(Ka(e.started_at, p.value)) : ft(e.duration_minutes);
		}
		function P() {
			w.value = null, b.value = !0;
		}
		function F(e) {
			e.is_running || (w.value = e, b.value = !0);
		}
		function I() {
			let e = w.value ? d("tasks_projects.time.updated") : d("tasks_projects.time.created");
			b.value = !1, w.value = null, l.notify("success", e), m.value?.refresh(!0), V(), u("refresh");
		}
		function L() {
			b.value = !1, w.value = null, l.notify("success", d("tasks_projects.time.deleted")), m.value?.refresh(!0), V(), u("refresh");
		}
		async function R(e) {
			if (window.confirm(d("tasks_projects.time.delete_confirm"))) try {
				await je(l.client, e.id), l.notify("success", d("tasks_projects.time.deleted")), m.value?.refresh(!0), V(), u("refresh");
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.time.delete_failed")));
			}
		}
		return (t, n) => {
			let l = x("BaseIcon"), u = x("BaseButton"), p = x("BaseFormatMoney"), h = x("BaseDropdownItem"), g = x("BaseDropdown"), v = x("BaseTable");
			return _(), a("div", zo, [
				o("div", Bo, [c(u, {
					variant: "primary",
					onClick: P
				}, {
					left: D((e) => [c(l, {
						name: "PlusIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + S(C(d)("tasks_projects.project.time.add_entry")), 1)]),
					_: 1
				})]),
				o("div", Vo, [c(v, {
					ref_key: "tableRef",
					ref: m,
					data: A,
					columns: O.value
				}, {
					"cell-started_at": D(({ row: e }) => [s(S(e.data.started_at ? C(ut)(e.data.started_at) : "-"), 1)]),
					"cell-user": D(({ row: e }) => [s(S(j(e.data.user_id)), 1)]),
					"cell-task": D(({ row: e }) => [o("span", Ho, S(M(e.data.task_id)), 1), e.data.description ? (_(), a("span", Uo, S(e.data.description), 1)) : i("", !0)]),
					"cell-duration_minutes": D(({ row: e }) => [o("span", { class: f(["tabular-nums", e.data.is_running ? "font-medium text-primary-500" : ""]) }, S(N(e.data)), 3)]),
					"cell-billable": D(({ row: e }) => [e.data.billable ? (_(), r(l, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (_(), a("span", Wo, "-"))]),
					"cell-amount": D(({ row: e }) => [c(p, { amount: e.data.amount }, null, 8, ["amount"])]),
					"cell-actions": D(({ row: e }) => [e.data.is_running ? (_(), a("span", Go, S(C(d)("tasks_projects.project.time.running")), 1)) : (_(), r(g, { key: 1 }, {
						activator: D(() => [c(l, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(h, { onClick: (t) => F(e.data) }, {
							default: D(() => [c(l, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + S(C(d)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), e.data.invoice_id === null ? (_(), r(h, {
							key: 0,
							onClick: (t) => R(e.data)
						}, {
							default: D(() => [c(l, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + S(C(d)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])) : i("", !0)]),
						_: 2
					}, 1024))]),
					_: 1
				}, 8, ["columns"])]),
				c(Ro, {
					show: b.value,
					client: e.client,
					notify: e.notify,
					entry: w.value,
					onClose: n[0] ||= (e) => b.value = !1,
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
}), Yo = {
	viewProject: `${U}:view-project`,
	editProject: `${U}:edit-project`,
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function Xo(e) {
	e.addMessages(rr), e.registerPage({
		id: "projects",
		module: U,
		path: "projects",
		component: sn(e, Zr),
		meta: {
			ability: Yo.viewProject,
			title: "tasks_projects.projects.title"
		}
	}), e.registerPage({
		id: "project",
		module: U,
		path: "projects/:id",
		component: sn(e, zr),
		meta: {
			ability: Yo.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: sn(e, Li),
				meta: {
					ability: Yo.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: sn(e, Do),
				meta: {
					ability: Yo.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: sn(e, Jo),
				meta: {
					ability: Yo.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: sn(e, li),
				meta: {
					ability: Yo.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/messages/reports.ts
var Zo = { en: { tasks_projects: { reports: {
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
} } } }, Qo = { summary: `${Rt}/reports/summary` };
async function $o(e, t) {
	let { data: n } = await e.get(Qo.summary, { params: t });
	return es(n?.data, t);
}
function es(e, t) {
	let n = rs(e) ? e : {};
	return {
		from: os(n.from, t.from ?? ""),
		to: os(n.to, t.to ?? ""),
		totals: ns(n.totals).map(ts),
		by_project: ns(n.by_project).map((e) => ({
			...ts(e),
			project_id: as(e.project_id),
			label: os(e.label, "")
		})),
		by_member: ns(n.by_member).map((e) => ({
			...ts(e),
			user_id: as(e.user_id),
			label: os(e.label, "")
		})),
		by_customer: ns(n.by_customer).map((e) => ({
			...ts(e),
			customer_id: as(e.customer_id)
		})),
		by_billable: ns(n.by_billable).map((e) => ({
			...ts(e),
			billable: e.billable === !0
		}))
	};
}
function ts(e) {
	return {
		currency_id: as(e.currency_id),
		minutes: is(e.minutes),
		amount: is(e.amount),
		billable_minutes: is(e.billable_minutes),
		billable_amount: is(e.billable_amount),
		unbilled_amount: is(e.unbilled_amount)
	};
}
function ns(e) {
	return Array.isArray(e) ? e.filter(rs) : [];
}
function rs(e) {
	return typeof e == "object" && !!e;
}
function is(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function as(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function os(e, t) {
	return typeof e == "string" && e.trim() !== "" ? e : t;
}
//#endregion
//#region resources/js/components/ReportBreakdownTable.vue?vue&type=script&setup=true&lang.ts
var ss = { class: "mt-6" }, cs = { class: "text-sm font-semibold tracking-wider text-muted uppercase" }, ls = { class: "relative table-container" }, us = {
	key: 0,
	class: "text-subtle"
}, ds = { key: 1 }, fs = /* @__PURE__ */ l({
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
			let i = x("BaseFormatMoney"), d = x("BaseTable");
			return _(), a("section", ss, [o("h3", cs, S(e.title), 1), o("div", ls, [(_(), r(d, {
				key: u.value,
				data: e.rows,
				columns: l.value,
				class: "mt-2"
			}, {
				"cell-currency_id": D(({ row: e }) => [e.data.currency_id === null ? (_(), a("span", us, "-")) : (_(), a("span", ds, "#" + S(e.data.currency_id), 1))]),
				"cell-minutes": D(({ row: e }) => [s(S(C(Pa)(e.data.minutes)), 1)]),
				"cell-billable_minutes": D(({ row: e }) => [s(S(C(Pa)(e.data.billable_minutes)), 1)]),
				"cell-amount": D(({ row: e }) => [c(i, { amount: e.data.amount }, null, 8, ["amount"])]),
				"cell-unbilled_amount": D(({ row: e }) => [c(i, { amount: e.data.unbilled_amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["data", "columns"]))])]);
		};
	}
}), ps = 3;
function ms(e, t, n = /* @__PURE__ */ new Date()) {
	let r = n.getFullYear(), i = n.getMonth();
	switch (e) {
		case "THIS_WEEK": {
			let e = Ba(n, t);
			return gs(e, Ha(e, 6));
		}
		case "LAST_MONTH": return gs(new Date(r, i - 1, 1), new Date(r, i, 0));
		case "THIS_QUARTER": {
			let e = Math.floor(i / ps) * ps;
			return gs(new Date(r, e, 1), new Date(r, e + ps, 0));
		}
		case "THIS_YEAR": return gs(new Date(r, 0, 1), new Date(r, 12, 0));
		default: return gs(new Date(r, i, 1), new Date(r, i + 1, 0));
	}
}
function hs(e, t) {
	return t <= 0 ? 0 : Math.min(100, Math.max(0, Math.round(e / t * 100)));
}
function gs(e, t) {
	return {
		from: Ua(e),
		to: Ua(t)
	};
}
//#endregion
//#region resources/js/pages/ReportsPage.vue?vue&type=script&setup=true&lang.ts
var _s = {
	key: 0,
	class: "mt-2 text-sm text-muted"
}, vs = { class: "flex items-center justify-end space-x-5" }, ys = { class: "mt-4 flex flex-wrap gap-2" }, bs = ["onClick"], xs = {
	key: 0,
	class: "flex justify-center py-16"
}, Ss = {
	key: 0,
	class: "text-xs font-medium tracking-wider text-muted uppercase"
}, Cs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ws = { class: "mt-1 text-2xl font-semibold text-heading" }, Ts = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Es = { class: "mt-1 text-2xl font-semibold text-heading" }, Ds = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Os = { class: "mt-1 text-2xl font-semibold text-heading" }, ks = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, As = { class: "mt-1 text-2xl font-semibold text-heading" }, js = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Ms = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ns = { class: "mt-3 flex h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Ps = { class: "mt-3 flex flex-wrap gap-6 text-sm" }, Fs = { class: "inline-flex items-center text-body" }, Is = { class: "ml-1 font-medium text-heading" }, Ls = { class: "ml-1 text-muted" }, Rs = { class: "inline-flex items-center text-body" }, zs = { class: "ml-1 font-medium text-heading" }, Bs = { class: "ml-1 text-muted" }, Vs = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Hs = "THIS_MONTH", Us = /* @__PURE__ */ l({
	__name: "ReportsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = B(), d = y(null), m = y([]), g = y(!0), v = y(Hs), w = y(""), T = y(""), E = n(() => [
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
		}))), P = n(() => ae(!0)), F = n(() => ae(!1)), I = n(() => P.value + F.value), L = n(() => hs(P.value, I.value));
		h(() => {
			R(Hs), re();
		});
		function R(e) {
			if (v.value = e, e !== "CUSTOM") {
				let t = ms(e, xa.settings.week_start);
				w.value = t.from, T.value = t.to;
			}
			te();
		}
		function z(e) {
			w.value = e ? dt(e) : "", v.value = "CUSTOM", te();
		}
		function ee(e) {
			T.value = e ? dt(e) : "", v.value = "CUSTOM", te();
		}
		async function te() {
			g.value = !0;
			try {
				let e = await $o(l.client, ne());
				d.value = e, e.by_customer.some((e) => e.customer_id !== null) && en(l.client);
			} catch (e) {
				d.value = null, l.notify("error", H(e, u("tasks_projects.reports.load_failed")));
			} finally {
				g.value = !1;
			}
		}
		function ne() {
			let e = {};
			return w.value !== "" && (e.from = w.value), T.value !== "" && (e.to = T.value), e;
		}
		async function re() {
			try {
				m.value = await Jt(l.client);
			} catch {}
		}
		function ie(e) {
			let t = m.value.find((t) => t.id === e.user_id)?.name ?? "";
			return t === "" ? e.label === "" ? e.user_id === null ? u("tasks_projects.reports.tables.unknown_member") : `#${e.user_id}` : e.label : t;
		}
		function ae(e) {
			return (d.value?.by_billable ?? []).filter((t) => t.billable === e).reduce((e, t) => e + t.minutes, 0);
		}
		function oe(e) {
			return e === null ? u("tasks_projects.reports.summary.base_currency") : u("tasks_projects.reports.summary.currency", { id: e });
		}
		function se(e) {
			return v.value === e.id ? "border-primary-500 bg-primary-50 text-primary-500" : "border-line-default bg-surface text-muted hover:text-heading";
		}
		function ce() {
			R(Hs);
		}
		return (t, n) => {
			let l = x("BaseBreadcrumbItem"), m = x("BaseBreadcrumb"), h = x("BaseIcon"), v = x("BaseButton"), y = x("router-link"), B = x("BasePageHeader"), te = x("BaseDatePicker"), ne = x("BaseInputGroup"), re = x("BaseFilterWrapper"), ie = x("BaseSpinner"), ae = x("BaseEmptyPlaceholder"), le = x("BaseFormatMoney"), ue = x("BasePage");
			return _(), r(ue, null, {
				default: D(() => [
					c(B, { title: C(u)("tasks_projects.reports.title") }, {
						actions: D(() => [o("div", vs, [
							c(y, { to: C(W).tasks }, {
								default: D(() => [c(v, { variant: "white" }, {
									left: D((e) => [c(h, {
										name: "ClipboardDocumentListIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.tasks.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: C(W).projects }, {
								default: D(() => [c(v, { variant: "white" }, {
									left: D((e) => [c(h, {
										name: "FolderIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.projects.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, { to: C(W).billing }, {
								default: D(() => [c(v, { variant: "primary-outline" }, {
									left: D((e) => [c(h, {
										name: "BanknotesIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(u)("tasks_projects.billing.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"])
						])]),
						default: D(() => [c(m, null, {
							default: D(() => [
								c(l, {
									title: C(u)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(l, {
									title: C(u)("tasks_projects.tasks.title"),
									to: C(W).tasks
								}, null, 8, ["title", "to"]),
								c(l, {
									title: C(u)("tasks_projects.reports.title"),
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), d.value ? (_(), a("p", _s, S(C(ut)(d.value.from)) + " – " + S(C(ut)(d.value.to)), 1)) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("div", ys, [(_(!0), a(e, null, b(E.value, (e) => (_(), a("button", {
						key: e.id,
						type: "button",
						class: f(["rounded-md border px-3 py-1.5 text-sm font-medium", se(e)]),
						onClick: (t) => R(e.id)
					}, S(e.label), 11, bs))), 128))]),
					c(re, {
						show: !0,
						"row-on-xl": "",
						class: "mt-3",
						onClear: ce
					}, {
						default: D(() => [c(ne, {
							label: C(u)("tasks_projects.reports.range.from"),
							class: "mt-2 flex-1"
						}, {
							default: D(() => [c(te, {
								"model-value": w.value,
								"onUpdate:modelValue": z
							}, null, 8, ["model-value"])]),
							_: 1
						}, 8, ["label"]), c(ne, {
							label: C(u)("tasks_projects.reports.range.to"),
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
					g.value && d.value === null ? (_(), a("div", xs, [c(ie, { class: "h-8 w-8 text-primary-500" })])) : A.value ? (_(), a(e, { key: 2 }, [
						(_(!0), a(e, null, b(O.value, (e) => (_(), a("div", {
							key: e.currency_id ?? "base",
							class: "mt-4 rounded-xl border border-line-default bg-surface p-5"
						}, [k.value ? (_(), a("p", Ss, S(oe(e.currency_id)), 1)) : i("", !0), o("div", { class: f(["grid grid-cols-2 gap-4 sm:grid-cols-4", k.value ? "mt-3" : ""]) }, [
							o("div", null, [o("p", Cs, S(C(u)("tasks_projects.reports.summary.logged")), 1), o("p", ws, S(C(Pa)(e.minutes)), 1)]),
							o("div", null, [o("p", Ts, S(C(u)("tasks_projects.reports.summary.billable")), 1), o("p", Es, S(C(Pa)(e.billable_minutes)), 1)]),
							o("div", null, [o("p", Ds, S(C(u)("tasks_projects.reports.summary.amount")), 1), o("p", Os, [c(le, { amount: e.amount }, null, 8, ["amount"])])]),
							o("div", null, [o("p", ks, S(C(u)("tasks_projects.reports.summary.unbilled")), 1), o("p", As, [c(le, { amount: e.unbilled_amount }, null, 8, ["amount"])])])
						], 2)]))), 128)),
						o("section", js, [o("p", Ms, S(C(u)("tasks_projects.reports.split.title")), 1), I.value > 0 ? (_(), a(e, { key: 0 }, [o("div", Ns, [o("div", {
							class: "h-2 bg-primary-500",
							style: p({ width: `${L.value}%` })
						}, null, 4)]), o("div", Ps, [o("span", Fs, [
							n[0] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary-500" }, null, -1),
							s(" " + S(C(u)("tasks_projects.reports.split.billable")) + ": ", 1),
							o("span", Is, S(C(Pa)(P.value)), 1),
							o("span", Ls, "(" + S(L.value) + "%)", 1)
						]), o("span", Rs, [
							n[1] ||= o("span", { class: "mr-2 inline-block h-2.5 w-2.5 rounded-full bg-surface-tertiary" }, null, -1),
							s(" " + S(C(u)("tasks_projects.reports.split.non_billable")) + ": ", 1),
							o("span", zs, S(C(Pa)(F.value)), 1),
							o("span", Bs, "(" + S(100 - L.value) + "%)", 1)
						])])], 64)) : (_(), a("p", Vs, S(C(u)("tasks_projects.reports.split.nothing")), 1))]),
						c(fs, {
							title: C(u)("tasks_projects.reports.tables.by_project"),
							"label-heading": C(u)("tasks_projects.reports.tables.project"),
							rows: j.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(fs, {
							title: C(u)("tasks_projects.reports.tables.by_member"),
							"label-heading": C(u)("tasks_projects.reports.tables.member"),
							rows: M.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						]),
						c(fs, {
							title: C(u)("tasks_projects.reports.tables.by_customer"),
							"label-heading": C(u)("tasks_projects.reports.tables.customer"),
							rows: N.value,
							"show-currency": k.value
						}, null, 8, [
							"title",
							"label-heading",
							"rows",
							"show-currency"
						])
					], 64)) : (_(), r(ae, {
						key: 1,
						title: C(u)("tasks_projects.reports.empty_title"),
						description: C(u)("tasks_projects.reports.empty_description")
					}, {
						default: D(() => [c(h, {
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
}), Ws = "tasks-projects";
function Gs(e) {
	e.addMessages(Zo), e.registerPage({
		id: "reports",
		module: Ws,
		path: "reports",
		component: sn(e, Us),
		meta: {
			ability: `${Ws}:view-own-time`,
			title: "tasks_projects.reports.title"
		}
	}), e.on("company:changing", () => {
		tn();
	});
}
//#endregion
//#region resources/js/messages/tasks.ts
var Ks = { en: { tasks_projects: {
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
			delete_confirm: "Delete {count} tasks? Their time entries go with them.",
			applied: "{count} tasks were updated.",
			deleted: "{count} tasks were deleted.",
			partial: "{count} tasks were updated, {failed} were refused.",
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
} } }, qs = { class: "mt-6 rounded-xl border border-line-default bg-surface" }, Js = { class: "flex items-center justify-between border-b border-line-light px-5 py-3" }, Ys = { class: "text-sm font-semibold text-heading" }, Xs = ["title"], Zs = { class: "overflow-x-auto" }, Qs = { class: "min-w-full text-sm" }, $s = { class: "bg-surface-secondary text-xs tracking-wide text-muted uppercase" }, ec = { class: "px-4 py-2 text-left font-medium" }, tc = { class: "px-4 py-2 text-left font-medium" }, nc = { class: "px-4 py-2 text-left font-medium" }, rc = { class: "px-4 py-2 text-left font-medium" }, ic = { class: "px-4 py-2 text-left font-medium" }, ac = { class: "px-4 py-2 text-left font-medium" }, oc = { class: "px-4 py-2 text-left font-medium" }, sc = { class: "px-4 py-2 text-left font-medium" }, cc = { class: "px-4 py-2 text-right font-medium" }, lc = ["onClick"], uc = { class: "px-4 py-2.5 whitespace-nowrap" }, dc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, fc = { class: "px-4 py-2.5 whitespace-nowrap" }, pc = {
	key: 0,
	class: "text-primary-500"
}, mc = { key: 1 }, hc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, gc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, _c = { class: "max-w-64 truncate px-4 py-2.5" }, vc = { class: "px-4 py-2.5" }, yc = {
	key: 1,
	class: "text-subtle"
}, bc = { class: "px-4 py-2.5 whitespace-nowrap" }, xc = ["title"], Sc = {
	key: 2,
	class: "text-xs text-primary-500"
}, Cc = { key: 0 }, wc = {
	colspan: "9",
	class: "px-4 py-8 text-center text-sm text-subtle"
}, Tc = /* @__PURE__ */ l({
	__name: "TimeLogGrid",
	props: {
		client: {},
		notify: {},
		task: {},
		members: { default: () => [] }
	},
	setup(t) {
		let l = t, u = B(), d = ro(), p = y([]), m = y(!1), h = y(!1), g = y(null), v = n(() => ({
			id: l.task.id,
			name: l.task.name,
			number: l.task.number,
			project_id: l.task.project_id,
			billable: l.task.billable
		})), w = n(() => K.isRunningOn(l.task.id));
		E(() => l.task.id, () => void T(), { immediate: !0 }), E(et, () => void T());
		async function T() {
			m.value = !0;
			try {
				p.value = await mr(l.client, l.task.id);
			} catch (e) {
				p.value = [], l.notify("error", H(e, u("tasks_projects.tasks.time_log.load_failed")));
			} finally {
				m.value = !1;
			}
		}
		function O(e) {
			return e.invoice_id !== null;
		}
		function k(e) {
			return l.members.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function j(e) {
			return e.is_running ? Na(Ka(e.started_at, d.value)) : Pa(e.duration_minutes);
		}
		function M() {
			w.value || (g.value = null, h.value = !0);
		}
		function N(e) {
			e.is_running || (g.value = e, h.value = !0);
		}
		function P() {
			let e = g.value ? u("tasks_projects.time.updated") : u("tasks_projects.time.created");
			h.value = !1, g.value = null, l.notify("success", e), V();
		}
		function F() {
			h.value = !1, g.value = null, l.notify("success", u("tasks_projects.time.deleted")), V();
		}
		async function I(e) {
			if (O(e)) {
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
			let d = x("BaseSpinner"), y = x("BaseIcon"), T = x("BaseButton"), E = x("BaseDropdownItem"), L = x("BaseDropdown");
			return _(), a("section", qs, [
				o("header", Js, [o("h2", Ys, [s(S(C(u)("tasks_projects.tasks.time_log.title")) + " ", 1), m.value ? (_(), r(d, {
					key: 0,
					class: "ml-2 inline-block h-4 w-4 text-primary-500"
				})) : i("", !0)]), o("span", { title: w.value ? C(u)("tasks_projects.tasks.time_log.add_disabled") : void 0 }, [c(T, {
					variant: "primary-outline",
					size: "sm",
					disabled: w.value,
					onClick: M
				}, {
					left: D((e) => [c(y, {
						name: "PlusIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + S(C(u)("tasks_projects.tasks.time_log.add_item")), 1)]),
					_: 1
				}, 8, ["disabled"])], 8, Xs)]),
				o("div", Zs, [o("table", Qs, [o("thead", $s, [o("tr", null, [
					o("th", ec, S(C(u)("tasks_projects.tasks.time_log.columns.start_date")), 1),
					o("th", tc, S(C(u)("tasks_projects.tasks.time_log.columns.start_time")), 1),
					o("th", nc, S(C(u)("tasks_projects.tasks.time_log.columns.end_date")), 1),
					o("th", rc, S(C(u)("tasks_projects.tasks.time_log.columns.end_time")), 1),
					o("th", ic, S(C(u)("tasks_projects.tasks.time_log.columns.duration")), 1),
					o("th", ac, S(C(u)("tasks_projects.tasks.time_log.columns.description")), 1),
					o("th", oc, S(C(u)("tasks_projects.tasks.time_log.columns.billable")), 1),
					o("th", sc, S(C(u)("tasks_projects.tasks.time_log.columns.member")), 1),
					o("th", cc, S(C(u)("tasks_projects.general.actions")), 1)
				])]), o("tbody", null, [(_(!0), a(e, null, b(p.value, (e) => (_(), a("tr", {
					key: e.id,
					class: f(["border-t border-line-light", e.is_running ? "bg-primary-50" : "cursor-pointer hover:bg-hover"]),
					onClick: (t) => N(e)
				}, [
					o("td", uc, S(C(ut)(C(Ia)(e.started_at)) || "-"), 1),
					o("td", dc, S(C(La)(e.started_at) || "-"), 1),
					o("td", fc, [e.is_running ? (_(), a("span", pc, S(C(u)("tasks_projects.tasks.time_log.running")), 1)) : (_(), a("span", mc, S(C(ut)(C(Ia)(e.ended_at)) || "-"), 1))]),
					o("td", hc, S(e.is_running ? "-" : C(La)(e.ended_at) || "-"), 1),
					o("td", gc, [o("span", { class: f(e.is_running ? "font-medium text-primary-500" : "") }, S(j(e)), 3)]),
					o("td", _c, S(e.description || "-"), 1),
					o("td", vc, [e.billable ? (_(), r(y, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (_(), a("span", yc, "-"))]),
					o("td", bc, S(k(e.user_id)), 1),
					o("td", {
						class: "px-4 py-2.5 text-right whitespace-nowrap",
						onClick: l[0] ||= A(() => {}, ["stop"])
					}, [O(e) ? (_(), a("span", {
						key: 0,
						class: "text-xs text-muted",
						title: C(u)("tasks_projects.tasks.time_log.stamped_delete")
					}, S(C(u)("tasks_projects.tasks.time_log.stamped")), 9, xc)) : e.is_running ? (_(), a("span", Sc, S(C(u)("tasks_projects.tasks.time_log.running")), 1)) : (_(), r(L, { key: 1 }, {
						activator: D(() => [c(y, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(E, { onClick: (t) => N(e) }, {
							default: D(() => [c(y, {
								name: "PencilIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + S(C(u)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(E, { onClick: (t) => I(e) }, {
							default: D(() => [c(y, {
								name: "TrashIcon",
								class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + S(C(u)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1024))])
				], 10, lc))), 128)), p.value.length === 0 && !m.value ? (_(), a("tr", Cc, [o("td", wc, S(C(u)("tasks_projects.tasks.time_log.empty")), 1)])) : i("", !0)])])]),
				c(Ro, {
					show: h.value,
					client: t.client,
					notify: t.notify,
					entry: g.value,
					"default-task": v.value,
					"lock-task": "",
					onClose: l[1] ||= (e) => h.value = !1,
					onSaved: P,
					onDeleted: F
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
}), Ec = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, Dc = { class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body" }, Oc = {
	key: 1,
	class: "text-subtle"
}, kc = {
	key: 0,
	class: "flex flex-wrap items-center justify-end gap-3"
}, Ac = ["title"], jc = {
	key: 0,
	class: "flex justify-center py-16"
}, Mc = { class: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Nc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Pc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Fc = { class: "mt-2" }, Ic = { class: "mt-2 text-xs text-muted" }, Lc = { class: "text-body" }, Rc = { class: "rounded-xl border border-line-default bg-surface p-5" }, zc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Bc = { class: "mt-2 text-2xl font-semibold text-heading" }, Vc = { class: "mt-1 text-xs text-muted" }, Hc = { class: "text-body" }, Uc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Wc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Gc = { class: "mt-2 text-2xl font-semibold text-heading" }, Kc = { class: "mt-1 text-xs text-muted" }, qc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Jc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Yc = { class: "mt-2 text-lg font-semibold text-heading" }, Xc = { class: "mt-1 text-xs text-muted" }, Zc = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Qc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, $c = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, el = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, tl = 100, nl = /* @__PURE__ */ l({
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
		}, d = B(), p = l.router, m = y(null), g = y([]), v = y([]), b = y([]), w = y(!0), T = y(!1), O = y(!1), k = y(!1), A = n(() => Number(l.id)), j = n(() => nt(m.value)), N = n(() => m.value?.name ?? d("tasks_projects.tasks.title")), P = n(() => g.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), F = n(() => b.value.map((e) => ({
			id: e.id,
			label: e.name
		}))), I = n(() => b.value.find((e) => e.id === m.value?.project_id)), L = n(() => {
			let e = m.value?.assignee_id ?? null;
			return e === null ? d("tasks_projects.tasks.unassigned") : v.value.find((t) => t.id === e)?.name ?? `#${e}`;
		}), R = n({
			get: () => P.value.find((e) => e.id === m.value?.task_status_id) ?? null,
			set: (e) => {
				e !== null && oe(e);
			}
		}), z = n(() => M.busy), ee = n(() => j.value.invoiced === "uninvoiced"), te = n(() => j.value.invoiced === "invoiced" ? d("tasks_projects.tasks.already_invoiced") : d("tasks_projects.tasks.nothing_to_invoice")), ne = n(() => m.value?.priority ? d(`tasks_projects.tasks.priority.${m.value.priority.toLowerCase()}`) : null);
		E(A, () => void re()), E(et, () => void re(!0)), h(() => {
			re(), ie();
		});
		async function re(e = !1) {
			if (!(!Number.isInteger(A.value) || A.value <= 0)) {
				w.value = !e;
				try {
					let e = await dr(l.client, A.value);
					m.value = e, Qe(e), e.customer_id !== null && en(l.client);
				} catch (t) {
					e || l.notify("error", H(t, d("tasks_projects.tasks.detail.not_found")));
				} finally {
					w.value = !1;
				}
			}
		}
		async function ie() {
			try {
				g.value = await or(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.task_statuses.load_failed")));
			}
			try {
				v.value = await Jt(l.client);
			} catch {
				v.value = [];
			}
			try {
				let e = await Ht(l.client, {
					limit: tl,
					status: "ACTIVE",
					sort_by: "name"
				});
				b.value = e.data ?? [];
			} catch {
				b.value = [];
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
		async function oe(e) {
			let t = m.value;
			if (t === null || T.value || t.task_status_id === e.id) return;
			let n = t.task_status_id;
			t.task_status_id = e.id, T.value = !0;
			try {
				m.value = await lr(l.client, t.id, ae(t, { task_status_id: e.id })), l.notify("success", d("tasks_projects.tasks.detail.status_saved", { name: e.label })), V();
			} catch (e) {
				t.task_status_id = n, l.notify("error", H(e, gt(e) === "task_locked" ? d("tasks_projects.tasks.locked") : d("tasks_projects.tasks.detail.status_failed")));
			} finally {
				T.value = !1;
			}
		}
		async function se() {
			let e = m.value;
			e !== null && ee.value && !z.value && await bt({
				client: l.client,
				router: p,
				notify: l.notify,
				t: d
			}, { taskIds: [e.id] });
		}
		function ce() {
			p.push(W.tasks);
		}
		function le(e) {
			k.value = !1, m.value = e, Qe(e), l.notify("success", d("tasks_projects.tasks.updated", { name: e.name })), V();
		}
		async function ue() {
			let e = m.value;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await ur(l.client, e.id), l.notify("success", d("tasks_projects.tasks.deleted", { name: e.name })), V(), ce();
				} catch (e) {
					l.notify("error", H(e, gt(e) === "task_locked" ? d("tasks_projects.tasks.locked") : d("tasks_projects.tasks.delete_failed")));
				} finally {
					O.value = !1;
				}
			}
		}
		return (n, l) => {
			let p = x("BaseBreadcrumbItem"), h = x("BaseBreadcrumb"), y = x("router-link"), b = x("BaseIcon"), E = x("BaseButton"), A = x("BasePageHeader"), B = x("BaseSpinner"), re = x("BaseSelectInput"), ie = x("BaseFormatMoney"), ae = x("BasePage");
			return _(), r(ae, null, {
				default: D(() => [
					c(A, { title: N.value }, {
						actions: D(() => [m.value ? (_(), a("div", kc, [
							c(ho, {
								client: t.client,
								notify: t.notify,
								task: m.value,
								members: v.value,
								size: "md"
							}, null, 8, [
								"client",
								"notify",
								"task",
								"members"
							]),
							C(M).allowed ? (_(), a("span", {
								key: 0,
								class: "inline-flex",
								title: ee.value ? void 0 : te.value
							}, [c(E, {
								variant: "white",
								loading: z.value,
								disabled: !ee.value || z.value,
								onClick: se
							}, {
								left: D((e) => [z.value ? i("", !0) : (_(), r(b, {
									key: 0,
									name: "BanknotesIcon",
									class: f(e.class)
								}, null, 8, ["class"]))]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.tasks.invoice_task")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])], 8, Ac)) : i("", !0),
							c(E, {
								variant: "primary-outline",
								loading: O.value,
								disabled: O.value,
								onClick: ue
							}, {
								default: D(() => [s(S(C(d)("tasks_projects.general.delete")), 1)]),
								_: 1
							}, 8, ["loading", "disabled"]),
							c(E, {
								variant: "primary",
								onClick: l[0] ||= (e) => k.value = !0
							}, {
								left: D((e) => [c(b, {
									name: "PencilIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(d)("tasks_projects.general.edit")), 1)]),
								_: 1
							})
						])) : i("", !0)]),
						default: D(() => [c(h, null, {
							default: D(() => [
								c(p, {
									title: C(d)("tasks_projects.general.home"),
									to: "/admin/dashboard"
								}, null, 8, ["title"]),
								c(p, {
									title: C(d)("tasks_projects.tasks.title"),
									to: C(W).tasks
								}, null, 8, ["title", "to"]),
								c(p, {
									title: m.value ? `#${m.value.number}` : N.value,
									to: "#",
									active: ""
								}, null, 8, ["title"])
							]),
							_: 1
						}), m.value ? (_(), a("div", Ec, [
							o("span", Dc, "#" + S(m.value.number), 1),
							m.value.project_id ? (_(), r(y, {
								key: 0,
								class: "hover:text-primary-500",
								to: C(W).project(m.value.project_id)
							}, {
								default: D(() => [s(S(I.value?.name ?? `#${m.value.project_id}`), 1)]),
								_: 1
							}, 8, ["to"])) : (_(), a("span", Oc, S(C(d)("tasks_projects.tasks.no_project")), 1)),
							m.value.customer_id ? (_(), r(y, {
								key: 2,
								class: "hover:text-primary-500",
								to: C(W).customer(m.value.customer_id)
							}, {
								default: D(() => [s(S(C($t)(m.value.customer_id)), 1)]),
								_: 1
							}, 8, ["to"])) : i("", !0),
							ne.value && m.value.priority ? (_(), a("span", {
								key: 3,
								class: f(["rounded-full px-2 py-0.5 text-xs font-medium", u[m.value.priority]])
							}, S(ne.value), 3)) : i("", !0),
							c(da, { state: j.value.invoiced }, null, 8, ["state"])
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Lt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					w.value && m.value === null ? (_(), a("div", jc, [c(B, { class: "h-8 w-8 text-primary-500" })])) : m.value ? (_(), a(e, { key: 1 }, [
						o("div", Mc, [
							o("div", Nc, [
								o("p", Pc, S(C(d)("tasks_projects.tasks.detail.status")), 1),
								o("div", Fc, [c(re, {
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
								o("p", Ic, [s(S(C(d)("tasks_projects.tasks.detail.assignee")) + ": ", 1), o("span", Lc, S(L.value), 1)])
							]),
							o("div", Rc, [
								o("p", zc, S(C(d)("tasks_projects.tasks.detail.logged")), 1),
								o("p", Bc, S(C(ft)(j.value.logged_minutes)), 1),
								o("p", Vc, [s(S(C(d)("tasks_projects.tasks.detail.estimate")) + ": ", 1), o("span", Hc, S(m.value.estimated_minutes ? C(ft)(m.value.estimated_minutes) : C(d)("tasks_projects.tasks.detail.no_estimate")), 1)])
							]),
							o("div", Uc, [
								o("p", Wc, S(C(d)("tasks_projects.tasks.detail.unbilled")), 1),
								o("p", Gc, [c(ie, { amount: j.value.unbilled_amount }, null, 8, ["amount"])]),
								o("p", Kc, S(C(ft)(j.value.unbilled_minutes)), 1)
							]),
							o("div", qc, [
								o("p", Jc, S(C(d)("tasks_projects.tasks.detail.due_date")), 1),
								o("p", Yc, S(m.value.due_date ? C(ut)(m.value.due_date) : "-"), 1),
								o("p", Xc, S(m.value.billable ? C(d)("tasks_projects.tasks.billable") : C(d)("tasks_projects.time.non_billable")), 1)
							])
						]),
						o("div", Zc, [o("p", Qc, S(C(d)("tasks_projects.tasks.detail.description")), 1), m.value.description ? (_(), a("p", $c, S(m.value.description), 1)) : (_(), a("p", el, S(C(d)("tasks_projects.tasks.detail.no_description")), 1))]),
						c(Tc, {
							client: t.client,
							notify: t.notify,
							task: m.value,
							members: v.value
						}, null, 8, [
							"client",
							"notify",
							"task",
							"members"
						])
					], 64)) : i("", !0),
					m.value ? (_(), r(ya, {
						key: 2,
						show: k.value,
						client: t.client,
						notify: t.notify,
						task: m.value,
						statuses: g.value,
						members: v.value,
						projects: F.value,
						onClose: l[2] ||= (e) => k.value = !1,
						onSaved: le,
						onDeleted: ce
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
}), rl = ["aria-label"], il = ["aria-current", "onClick"], al = { class: "max-sm:hidden" }, ol = /* @__PURE__ */ l({
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
		function p(e) {
			d(e) || s("select", {
				name: e.name,
				query: i.query
			});
		}
		return (t, n) => {
			let r = x("BaseIcon");
			return _(), a("nav", {
				class: "inline-flex overflow-hidden rounded-lg border border-line-default",
				"aria-label": C(l)("tasks_projects.tasks.title")
			}, [(_(!0), a(e, null, b(u.value, (e) => (_(), a("button", {
				key: e.id,
				type: "button",
				class: f(["flex items-center gap-1.5 border-r border-line-default px-3 py-1.5 text-sm font-medium last:border-r-0", d(e) ? "bg-primary-50 text-primary-500" : "bg-surface text-muted hover:bg-hover hover:text-heading"]),
				"aria-current": d(e) ? "page" : void 0,
				onClick: (t) => p(e)
			}, [c(r, {
				name: e.icon,
				class: "h-4 w-4"
			}, null, 8, ["name"]), o("span", al, S(e.label), 1)], 10, il))), 128))], 8, rl);
		};
	}
}), sl = { class: "flex flex-wrap items-center justify-end gap-3" }, cl = 100, ll = /* @__PURE__ */ l({
	__name: "TasksPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, i = B(), a = t.router, l = y([]), u = y([]), d = y([]), p = y(!1), m = n(() => t.router.currentRoute.value), g = n(() => Bi(m.value.query)), v = n(() => Vi(g.value)), b = n(() => String(m.value.name ?? "")), w = n(() => d.value.map((e) => ({
			id: e.id,
			label: e.name
		})));
		E(b, (e) => T(e)), h(() => {
			T(b.value), O();
		});
		function T(e) {
			e === on.tasks && a.replace({
				name: on.list,
				query: v.value
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
					limit: cl,
					status: "ACTIVE",
					sort_by: "name"
				});
				d.value = e.data ?? [];
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.tasks.projects_failed")));
			}
		}
		function k(e) {
			Wi(e, g.value) || a.replace({
				name: b.value === on.tasks ? on.list : b.value,
				query: Vi(e)
			});
		}
		function A(e) {
			a.push(e);
		}
		function j(e) {
			p.value = !1, t.notify("success", i("tasks_projects.tasks.created", { name: e.name })), V();
		}
		return (t, n) => {
			let a = x("BaseBreadcrumbItem"), m = x("BaseBreadcrumb"), h = x("BaseIcon"), y = x("BaseButton"), T = x("router-link"), E = x("BasePageHeader"), O = x("router-view"), M = x("BasePage");
			return _(), r(M, null, {
				default: D(() => [
					c(E, { title: C(i)("tasks_projects.tasks.title") }, {
						actions: D(() => [o("div", sl, [
							c(ol, {
								active: b.value,
								query: v.value,
								onSelect: A
							}, null, 8, ["active", "query"]),
							c(T, { to: C(W).projects }, {
								default: D(() => [c(y, { variant: "white" }, {
									left: D((e) => [c(h, {
										name: "FolderIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(i)("tasks_projects.projects.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(T, { to: C(W).reports }, {
								default: D(() => [c(y, { variant: "white" }, {
									left: D((e) => [c(h, {
										name: "ChartBarIcon",
										class: f(e.class)
									}, null, 8, ["class"])]),
									default: D(() => [s(" " + S(C(i)("tasks_projects.reports.title")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["to"]),
							c(y, {
								variant: "primary",
								onClick: n[0] ||= (e) => p.value = !0
							}, {
								left: D((e) => [c(h, {
									name: "PlusIcon",
									class: f(e.class)
								}, null, 8, ["class"])]),
								default: D(() => [s(" " + S(C(i)("tasks_projects.tasks.new_task")), 1)]),
								_: 1
							})
						])]),
						default: D(() => [c(m, null, {
							default: D(() => [c(a, {
								title: C(i)("tasks_projects.general.home"),
								to: "/admin/dashboard"
							}, null, 8, ["title"]), c(a, {
								title: C(i)("tasks_projects.tasks.title"),
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
						"model-value": g.value,
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
						filters: g.value,
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
						show: p.value,
						client: e.client,
						notify: e.notify,
						task: null,
						statuses: l.value,
						members: u.value,
						projects: w.value,
						defaults: { project_id: g.value.project === "" ? null : Number(g.value.project) },
						compact: "",
						onClose: n[1] ||= (e) => p.value = !1,
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
function ul(e, t, n) {
	return (t = _l(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dl() {
	return dl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dl.apply(null, arguments);
}
function fl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fl(Object(n), !0).forEach(function(t) {
			ul(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ml(e, t) {
	if (e == null) return {};
	var n, r, i = hl(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function hl(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function gl(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _l(e) {
	var t = gl(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function vl(e) {
	"@babel/helpers - typeof";
	return vl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, vl(e);
}
var yl = "1.15.7";
function bl(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var xl = bl(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Sl = bl(/Edge/i), Cl = bl(/firefox/i), wl = bl(/safari/i) && !bl(/chrome/i) && !bl(/android/i), Tl = bl(/iP(ad|od|hone)/i), El = bl(/chrome/i) && bl(/android/i), Dl = {
	capture: !1,
	passive: !1
};
function q(e, t, n) {
	e.addEventListener(t, n, !xl && Dl);
}
function J(e, t, n) {
	e.removeEventListener(t, n, !xl && Dl);
}
function Ol(e, t) {
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
function kl(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function Al(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Ol(e, t) : Ol(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = kl(e));
	}
	return null;
}
var jl = /\s+/g;
function Ml(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(jl, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(jl, " "));
}
function Y(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Nl(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = Y(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Pl(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Fl() {
	return document.scrollingElement || document.documentElement;
}
function Il(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Fl() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !xl)) do
			if (i && i.getBoundingClientRect && (Y(i, "transform") !== "none" || n && Y(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(Y(i, "border-top-width")), s -= f.left + parseInt(Y(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Nl(i || e), m = p && p.a, h = p && p.d;
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
function Ll(e, t, n) {
	for (var r = Ul(e, !0), i = Il(e)[t]; r;) {
		var a = Il(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === Fl()) break;
		r = Ul(r, !1);
	}
	return !1;
}
function Rl(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && Al(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function zl(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || Y(n, "display") === "none" || t && !Ol(n, t));) n = n.previousElementSibling;
	return n || null;
}
function Bl(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || Ol(e, t)) && n++;
	return n;
}
function Vl(e) {
	var t = 0, n = 0, r = Fl();
	if (e) do {
		var i = Nl(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function Hl(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Ul(e, t) {
	if (!e || !e.getBoundingClientRect) return Fl();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = Y(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Fl();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Fl();
}
function Wl(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Gl(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Kl;
function ql(e, t) {
	return function() {
		if (!Kl) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Kl = setTimeout(function() {
				Kl = void 0;
			}, t);
		}
	};
}
function Jl() {
	clearTimeout(Kl), Kl = void 0;
}
function Yl(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function Xl(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Zl(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (Al(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = Il(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var Ql = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function $l() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (Y(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: Il(t)
					});
					var n = pl({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Nl(t, !0);
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
			e.splice(Hl(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = Il(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Nl(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Gl(c, s) && !Gl(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = tu(u, c, l, r.options)), Gl(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				Y(e, "transition", ""), Y(e, "transform", "");
				var i = Nl(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, Y(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = eu(e), Y(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), Y(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					Y(e, "transition", ""), Y(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function eu(e) {
	return e.offsetWidth;
}
function tu(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var nu = [], ru = { initializeByDefault: !0 }, iu = {
	mount: function(e) {
		for (var t in ru) ru.hasOwnProperty(t) && !(t in e) && (e[t] = ru[t]);
		nu.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), nu.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		nu.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](pl({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](pl({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in nu.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, dl(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return nu.forEach(function(r) {
			typeof r.eventProperties == "function" && dl(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return nu.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function au(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[Ql], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !xl && !Sl ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = pl(pl({}, m), iu.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var ou = ["evt"], su = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = ml(n, ou);
	iu.pluginEvent.bind($)(e, t, pl({
		dragEl: X,
		parentEl: lu,
		ghostEl: Z,
		rootEl: Q,
		nextEl: uu,
		lastDownEl: du,
		cloneEl: fu,
		cloneHidden: pu,
		dragStarted: ku,
		putSortable: yu,
		activeSortable: $.active,
		originalEvent: r,
		oldIndex: mu,
		oldDraggableIndex: gu,
		newIndex: hu,
		newDraggableIndex: _u,
		hideGhostForTarget: Ju,
		unhideGhostForTarget: Yu,
		cloneNowHidden: function() {
			pu = !0;
		},
		cloneNowShown: function() {
			pu = !1;
		},
		dispatchSortableEvent: function(e) {
			cu({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function cu(e) {
	au(pl({
		putSortable: yu,
		cloneEl: fu,
		targetEl: X,
		rootEl: Q,
		oldIndex: mu,
		oldDraggableIndex: gu,
		newIndex: hu,
		newDraggableIndex: _u
	}, e));
}
var X, lu, Z, Q, uu, du, fu, pu, mu, hu, gu, _u, vu, yu, bu = !1, xu = !1, Su = [], Cu, wu, Tu, Eu, Du, Ou, ku, Au, ju, Mu = !1, Nu = !1, Pu, Fu, Iu = [], Lu = !1, Ru = [], zu = typeof document < "u", Bu = Tl, Vu = Sl || xl ? "cssFloat" : "float", Hu = zu && !El && !Tl && "draggable" in document.createElement("div"), Uu = function() {
	if (zu) {
		if (xl) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), Wu = function(e, t) {
	var n = Y(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Rl(e, 0, t), a = Rl(e, 1, t), o = i && Y(i), s = a && Y(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + Il(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Il(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Vu] === "none" || a && n[Vu] === "none" && c + l > r) ? "vertical" : "horizontal";
}, Gu = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, Ku = function(e, t) {
	var n;
	return Su.some(function(r) {
		var i = r[Ql].options.emptyInsertThreshold;
		if (i && !zl(r)) {
			var a = Il(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, qu = function(e) {
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
	(!r || vl(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Ju = function() {
	!Uu && Z && Y(Z, "display", "none");
}, Yu = function() {
	!Uu && Z && Y(Z, "display", "");
};
zu && !El && document.addEventListener("click", function(e) {
	if (xu) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), xu = !1, !1;
}, !0);
var Xu = function(e) {
	if (X) {
		e = e.touches ? e.touches[0] : e;
		var t = Ku(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[Ql]._onDragOver(n);
		}
	}
}, Zu = function(e) {
	X && X.parentNode[Ql]._isOutsideThisEl(e.target);
};
function $(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = dl({}, t), e[Ql] = this;
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
			return Wu(e, this.options);
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
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!wl || Tl),
		emptyInsertThreshold: 5
	};
	for (var r in iu.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in qu(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Hu, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? q(e, "pointerdown", this._onTapStart) : (q(e, "mousedown", this._onTapStart), q(e, "touchstart", this._onTapStart)), this.nativeDraggable && (q(e, "dragover", this), q(e, "dragenter", this)), Su.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), dl(this, $l());
}
$.prototype = {
	constructor: $,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Au = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, X) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (sd(n), !X && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && wl && s && s.tagName.toUpperCase() === "SELECT") && (s = Al(s, r.draggable, n, !1), !(s && s.animated) && du !== s)) {
				if (mu = Bl(s), gu = Bl(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						cu({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), su("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Al(c, r.trim(), n, !1), r) return cu({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), su("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || Al(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !X && n.parentNode === i) {
			var c = Il(n);
			if (Q = i, X = n, lu = X.parentNode, uu = X.nextSibling, du = n, vu = a.group, $.dragged = X, Cu = {
				target: X,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Du = Cu.clientX - c.left, Ou = Cu.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, X.style["will-change"] = "all", s = function() {
				if (su("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !Cl && r.nativeDraggable && (X.draggable = !0), r._triggerDragStart(e, t), cu({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), Ml(X, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Pl(X, e.trim(), ed);
			}), q(o, "dragover", Xu), q(o, "mousemove", Xu), q(o, "touchmove", Xu), a.supportPointer ? (q(o, "pointerup", r._onDrop), !this.nativeDraggable && q(o, "pointercancel", r._onDrop)) : (q(o, "mouseup", r._onDrop), q(o, "touchend", r._onDrop), q(o, "touchcancel", r._onDrop)), Cl && this.nativeDraggable && (this.options.touchStartThreshold = 4, X.draggable = !0), su("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Sl || xl))) {
				if ($.eventCanceled) {
					this._onDrop();
					return;
				}
				a.supportPointer ? (q(o, "pointerup", r._disableDelayedDrag), q(o, "pointercancel", r._disableDelayedDrag)) : (q(o, "mouseup", r._disableDelayedDrag), q(o, "touchend", r._disableDelayedDrag), q(o, "touchcancel", r._disableDelayedDrag)), q(o, "mousemove", r._delayedDragTouchMoveHandler), q(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && q(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		X && ed(X), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		J(e, "mouseup", this._disableDelayedDrag), J(e, "touchend", this._disableDelayedDrag), J(e, "touchcancel", this._disableDelayedDrag), J(e, "pointerup", this._disableDelayedDrag), J(e, "pointercancel", this._disableDelayedDrag), J(e, "mousemove", this._delayedDragTouchMoveHandler), J(e, "touchmove", this._delayedDragTouchMoveHandler), J(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? q(document, "pointermove", this._onTouchMove) : t ? q(document, "touchmove", this._onTouchMove) : q(document, "mousemove", this._onTouchMove) : (q(X, "dragend", this), q(Q, "dragstart", this._onDragStart));
		try {
			document.selection ? cd(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (bu = !1, Q && X) {
			su("dragStarted", this, { evt: t }), this.nativeDraggable && q(document, "dragover", Zu);
			var n = this.options;
			!e && Ml(X, n.dragClass, !1), Ml(X, n.ghostClass, !0), $.active = this, e && this._appendGhost(), cu({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (wu) {
			this._lastX = wu.clientX, this._lastY = wu.clientY, Ju();
			for (var e = document.elementFromPoint(wu.clientX, wu.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(wu.clientX, wu.clientY), e !== t);) t = e;
			if (X.parentNode[Ql]._isOutsideThisEl(e), t) do {
				if (t[Ql]) {
					var n = void 0;
					if (n = t[Ql]._onDragOver({
						clientX: wu.clientX,
						clientY: wu.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = kl(t));
			Yu();
		}
	},
	_onTouchMove: function(e) {
		if (Cu) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = Z && Nl(Z, !0), o = Z && a && a.a, s = Z && a && a.d, c = Bu && Fu && Vl(Fu), l = (i.clientX - Cu.clientX + r.x) / (o || 1) + (c ? c[0] - Iu[0] : 0) / (o || 1), u = (i.clientY - Cu.clientY + r.y) / (s || 1) + (c ? c[1] - Iu[1] : 0) / (s || 1);
			if (!$.active && !bu) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (Z) {
				a ? (a.e += l - (Tu || 0), a.f += u - (Eu || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				Y(Z, "webkitTransform", d), Y(Z, "mozTransform", d), Y(Z, "msTransform", d), Y(Z, "transform", d), Tu = l, Eu = u, wu = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!Z) {
			var e = this.options.fallbackOnBody ? document.body : Q, t = Il(X, !0, Bu, !0, e), n = this.options;
			if (Bu) {
				for (Fu = e; Y(Fu, "position") === "static" && Y(Fu, "transform") === "none" && Fu !== document;) Fu = Fu.parentNode;
				Fu !== document.body && Fu !== document.documentElement ? (Fu === document && (Fu = Fl()), t.top += Fu.scrollTop, t.left += Fu.scrollLeft) : Fu = Fl(), Iu = Vl(Fu);
			}
			Z = X.cloneNode(!0), Ml(Z, n.ghostClass, !1), Ml(Z, n.fallbackClass, !0), Ml(Z, n.dragClass, !0), Y(Z, "transition", ""), Y(Z, "transform", ""), Y(Z, "box-sizing", "border-box"), Y(Z, "margin", 0), Y(Z, "top", t.top), Y(Z, "left", t.left), Y(Z, "width", t.width), Y(Z, "height", t.height), Y(Z, "opacity", "0.8"), Y(Z, "position", Bu ? "absolute" : "fixed"), Y(Z, "zIndex", "100000"), Y(Z, "pointerEvents", "none"), $.ghost = Z, e.appendChild(Z), Y(Z, "transform-origin", Du / parseInt(Z.style.width) * 100 + "% " + Ou / parseInt(Z.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (su("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		su("setupClone", this), $.eventCanceled || (fu = Xl(X), fu.removeAttribute("id"), fu.draggable = !1, fu.style["will-change"] = "", this._hideClone(), Ml(fu, this.options.chosenClass, !1), $.clone = fu), n.cloneId = cd(function() {
			su("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || Q.insertBefore(fu, X), n._hideClone(), cu({
				sortable: n,
				name: "clone"
			}));
		}), !t && Ml(X, i.dragClass, !0), t ? (xu = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (J(document, "mouseup", n._onDrop), J(document, "touchend", n._onDrop), J(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, X)), q(document, "drop", n), Y(X, "transform", "translateZ(0)")), bu = !0, n._dragStartId = cd(n._dragStarted.bind(n, t, e)), q(document, "selectstart", n), ku = !0, window.getSelection().removeAllRanges(), wl && Y(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = vu === s, u = o.sort, d = yu || c, f, p = this, m = !1;
		if (Lu) return;
		function h(o, s) {
			su(o, p, pl({
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
					return $u(Q, t, X, r, n, Il(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (Ml(X, yu ? yu.options.ghostClass : c.options.ghostClass, !1), Ml(X, o.ghostClass, !0)), yu !== p && p !== $.active ? yu = p : p === $.active && yu && (yu = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === X && !X.animated || n === t && !n.animated) && (Au = null), !o.dragoverBubble && !e.rootEl && n !== document && (X.parentNode[Ql]._isOutsideThisEl(e.target), !r && Xu(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			hu = Bl(X), _u = Bl(X, o.draggable), cu({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: hu,
				newDraggableIndex: _u,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Al(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (X.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (xu = !1, c && !o.disabled && (l ? u || (a = lu !== Q) : yu === this || (this.lastPutMode = vu.checkPull(this, c, X, e)) && s.checkPut(this, c, X, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = Il(X), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return lu = Q, g(), this._hideClone(), h("revert"), $.eventCanceled || (uu ? Q.insertBefore(X, uu) : Q.appendChild(X)), _(!0);
			var y = zl(t, o.draggable);
			if (!y || rd(e, f, this) && !y.animated) {
				if (y === X) return _(!1);
				if (y && t === e.target && (n = y), n && (i = Il(n)), $u(Q, t, X, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(X, y.nextSibling) : t.appendChild(X), lu = t, v(), _(!0);
			} else if (y && nd(e, f, this)) {
				var b = Rl(t, 0, o, !0);
				if (b === X) return _(!1);
				if (n = b, i = Il(n), $u(Q, t, X, r, n, i, e, !1) !== !1) return g(), t.insertBefore(X, b), lu = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = Il(n);
				var x = 0, S, C = X.parentNode !== t, w = !Gu(X.animated && X.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Ll(n, "top", "top") || Ll(X, "top", "top"), D = E ? E.scrollTop : void 0;
				Au !== n && (S = i[T], Mu = !1, Nu = !w && o.invertSwap || C), x = id(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Nu, Au === n);
				var O;
				if (x !== 0) {
					var k = Bl(X);
					do
						k -= x, O = lu.children[k];
					while (O && (Y(O, "display") === "none" || O === Z));
				}
				if (x === 0 || O === n) return _(!1);
				Au = n, ju = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = $u(Q, t, X, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), Lu = !0, setTimeout(td, 30), g(), j && !A ? t.appendChild(X) : n.parentNode.insertBefore(X, j ? A : n), E && Yl(E, 0, D - E.scrollTop), lu = X.parentNode, S !== void 0 && !Nu && (Pu = Math.abs(S - Il(n)[T])), v(), _(!0);
			}
			if (t.contains(X)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		J(document, "mousemove", this._onTouchMove), J(document, "touchmove", this._onTouchMove), J(document, "pointermove", this._onTouchMove), J(document, "dragover", Xu), J(document, "mousemove", Xu), J(document, "touchmove", Xu);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		J(e, "mouseup", this._onDrop), J(e, "touchend", this._onDrop), J(e, "pointerup", this._onDrop), J(e, "pointercancel", this._onDrop), J(e, "touchcancel", this._onDrop), J(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (hu = Bl(X), _u = Bl(X, n.draggable), su("drop", this, { evt: e }), lu = X && X.parentNode, hu = Bl(X), _u = Bl(X, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		bu = !1, Nu = !1, Mu = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ld(this.cloneId), ld(this._dragStartId), this.nativeDraggable && (J(document, "drop", this), J(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), wl && Y(document.body, "user-select", ""), Y(X, "transform", ""), e && (ku && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), Z && Z.parentNode && Z.parentNode.removeChild(Z), (Q === lu || yu && yu.lastPutMode !== "clone") && fu && fu.parentNode && fu.parentNode.removeChild(fu), X && (this.nativeDraggable && J(X, "dragend", this), ed(X), X.style["will-change"] = "", ku && !bu && Ml(X, yu ? yu.options.ghostClass : this.options.ghostClass, !1), Ml(X, this.options.chosenClass, !1), cu({
			sortable: this,
			name: "unchoose",
			toEl: lu,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), Q === lu ? hu !== mu && hu >= 0 && (cu({
			sortable: this,
			name: "update",
			toEl: lu,
			originalEvent: e
		}), cu({
			sortable: this,
			name: "sort",
			toEl: lu,
			originalEvent: e
		})) : (hu >= 0 && (cu({
			rootEl: lu,
			name: "add",
			toEl: lu,
			fromEl: Q,
			originalEvent: e
		}), cu({
			sortable: this,
			name: "remove",
			toEl: lu,
			originalEvent: e
		}), cu({
			rootEl: lu,
			name: "sort",
			toEl: lu,
			fromEl: Q,
			originalEvent: e
		}), cu({
			sortable: this,
			name: "sort",
			toEl: lu,
			originalEvent: e
		})), yu && yu.save()), $.active && ((hu == null || hu === -1) && (hu = mu, _u = gu), cu({
			sortable: this,
			name: "end",
			toEl: lu,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		su("nulling", this), Q = X = lu = Z = uu = fu = du = pu = Cu = wu = ku = hu = _u = mu = gu = Au = ju = yu = vu = $.dragged = $.ghost = $.clone = $.active = null;
		var e = this.el;
		Ru.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), Ru.length = Tu = Eu = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				X && (this._onDragOver(e), Qu(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Al(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || od(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Al(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Al(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = iu.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && qu(n);
	},
	destroy: function() {
		su("destroy", this);
		var e = this.el;
		e[Ql] = null, J(e, "mousedown", this._onTapStart), J(e, "touchstart", this._onTapStart), J(e, "pointerdown", this._onTapStart), this.nativeDraggable && (J(e, "dragover", this), J(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), Su.splice(Su.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!pu) {
			if (su("hideClone", this), $.eventCanceled) return;
			Y(fu, "display", "none"), this.options.removeCloneOnHide && fu.parentNode && fu.parentNode.removeChild(fu), pu = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (pu) {
			if (su("showClone", this), $.eventCanceled) return;
			X.parentNode == Q && !this.options.group.revertClone ? Q.insertBefore(fu, X) : uu ? Q.insertBefore(fu, uu) : Q.appendChild(fu), this.options.group.revertClone && this.animate(X, fu), Y(fu, "display", ""), pu = !1;
		}
	}
};
function Qu(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function $u(e, t, n, r, i, a, o, s) {
	var c, l = e[Ql], u = l.options.onMove, d;
	return window.CustomEvent && !xl && !Sl ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || Il(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function ed(e) {
	e.draggable = !1;
}
function td() {
	Lu = !1;
}
function nd(e, t, n) {
	var r = Il(Rl(n.el, 0, n.options, !0)), i = Zl(n.el, n.options, Z), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function rd(e, t, n) {
	var r = Il(zl(n.el, n.options.draggable)), i = Zl(n.el, n.options, Z), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function id(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Pu < l * i) {
			if (!Mu && (ju === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Mu = !0), Mu) f = !0;
			else if (ju === 1 ? c < u + Pu : c > d - Pu) return -ju;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return ad(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function ad(e) {
	return Bl(X) < Bl(e) ? 1 : -1;
}
function od(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function sd(e) {
	Ru.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Ru.push(r);
	}
}
function cd(e) {
	return setTimeout(e, 0);
}
function ld(e) {
	return clearTimeout(e);
}
zu && q(document, "touchmove", function(e) {
	($.active || bu) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: q,
	off: J,
	css: Y,
	find: Pl,
	is: function(e, t) {
		return !!Al(e, t, e, !1);
	},
	extend: Wl,
	throttle: ql,
	closest: Al,
	toggleClass: Ml,
	clone: Xl,
	index: Bl,
	nextTick: cd,
	cancelNextTick: ld,
	detectDirection: Wu,
	getChild: Rl,
	expando: Ql
}, $.get = function(e) {
	return e[Ql];
}, $.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && ($.utils = pl(pl({}, $.utils), e.utils)), iu.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = yl;
var ud = [], dd, fd, pd = !1, md, hd, gd, _d;
function vd() {
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
			this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? q(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? q(document, "touchmove", this._handleFallbackAutoScroll) : q(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? J(document, "dragover", this._handleAutoScroll) : (J(document, "pointermove", this._handleFallbackAutoScroll), J(document, "touchmove", this._handleFallbackAutoScroll), J(document, "mousemove", this._handleFallbackAutoScroll)), bd(), yd(), Jl();
		},
		nulling: function() {
			gd = fd = dd = pd = _d = md = hd = null, ud.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (gd = e, t || this.options.forceAutoScrollFallback || Sl || xl || wl) {
				xd(e, this.options, a, t);
				var o = Ul(a, !0);
				pd && (!_d || r !== md || i !== hd) && (_d && bd(), _d = setInterval(function() {
					var a = Ul(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, yd()), xd(e, n.options, a, t);
				}, 10), md = r, hd = i);
			} else {
				if (!this.options.bubbleScroll || Ul(a, !0) === Fl()) {
					yd();
					return;
				}
				xd(e, this.options, Ul(a, !1), !1);
			}
		}
	}, dl(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function yd() {
	ud.forEach(function(e) {
		clearInterval(e.pid);
	}), ud = [];
}
function bd() {
	clearInterval(_d);
}
var xd = ql(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Fl(), l = !1, u;
		fd !== n && (fd = n, yd(), dd = t.scroll, u = t.scrollFn, dd === !0 && (dd = Ul(n, !0)));
		var d = 0, f = dd;
		do {
			var p = f, m = Il(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = Y(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!ud[d]) for (var A = 0; A <= d; A++) ud[A] || (ud[A] = {});
			(ud[d].vx != O || ud[d].vy != k || ud[d].el !== p) && (ud[d].el = p, ud[d].vx = O, ud[d].vy = k, clearInterval(ud[d].pid), (O != 0 || k != 0) && (l = !0, ud[d].pid = setInterval(function() {
				r && this.layer === 0 && $.active._onTouchMove(gd);
				var t = ud[this.layer].vy ? ud[this.layer].vy * s : 0, n = ud[this.layer].vx ? ud[this.layer].vx * s : 0;
				(typeof u != "function" || u.call($.dragged.parentNode[Ql], n, t, e, gd, ud[this.layer].el) === "continue") && Yl(ud[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Ul(f, !1)));
		pd = l;
	}
}, 30), Sd = function(e) {
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
function Cd() {}
Cd.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Rl(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: Sd
}, dl(Cd, { pluginName: "revertOnSpill" });
function wd() {}
wd.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: Sd
}, dl(wd, { pluginName: "removeOnSpill" }), $.mount(new vd()), $.mount(wd, Cd);
//#endregion
//#region resources/js/components/TaskCard.vue?vue&type=script&setup=true&lang.ts
var Td = { class: "flex items-start justify-between gap-2" }, Ed = { class: "text-sm font-medium text-heading" }, Dd = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, Od = ["title"], kd = { class: "mt-3 flex items-center justify-between gap-2" }, Ad = {
	key: 0,
	class: "text-xs tabular-nums text-muted"
}, jd = { class: "mt-2 flex items-center justify-between" }, Md = {
	key: 1,
	class: "text-xs text-subtle"
}, Nd = ["title"], Pd = /* @__PURE__ */ l({
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
		}, u = B(), d = n(() => nt(r.task)), p = n(() => r.projects.find((e) => e.id === r.task.project_id)), m = n(() => r.task.project_id === null ? null : p.value?.identifier || p.value?.name || null), h = n(() => [p.value?.name, $t(r.task.customer_id)].filter(Boolean).join(" · ")), g = n(() => r.members.find((e) => e.id === r.task.assignee_id)), v = n(() => r.task.assignee_id === null ? null : g.value ? pt(g.value.name) : `#${r.task.assignee_id}`), y = n(() => g.value?.name ?? (r.task.assignee_id === null ? u("tasks_projects.tasks.unassigned") : `#${r.task.assignee_id}`)), b = n(() => Pa(d.value.logged_minutes));
		function x(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		return (t, n) => (_(), a("article", {
			class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
			onClick: n[1] ||= (t) => s("open", e.task)
		}, [
			o("div", Td, [o("p", Ed, S(e.task.name), 1), e.task.priority ? (_(), a("span", {
				key: 0,
				class: f(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", l[e.task.priority]])
			}, S(x(e.task.priority)), 3)) : i("", !0)]),
			o("div", Dd, [
				o("span", null, "#" + S(e.task.number), 1),
				m.value ? (_(), a("span", {
					key: 0,
					class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body",
					title: h.value
				}, S(m.value), 9, Od)) : i("", !0),
				c(da, { state: d.value.invoiced }, null, 8, ["state"])
			]),
			o("div", kd, [c(ho, {
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
			]), d.value.logged_minutes > 0 ? (_(), a("span", Ad, S(b.value), 1)) : i("", !0)]),
			o("div", jd, [e.task.due_date ? (_(), a("span", {
				key: 0,
				class: f(["text-xs", C(mt)(e.task.due_date) && !e.task.closed_at ? "font-medium text-status-red" : "text-muted"])
			}, S(C(ut)(e.task.due_date)), 3)) : (_(), a("span", Md, "-")), v.value ? (_(), a("span", {
				key: 2,
				class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
				title: y.value
			}, S(v.value), 9, Nd)) : i("", !0)])
		]));
	}
}), Fd = { class: "mt-4" }, Id = {
	key: 0,
	class: "mb-3 text-xs text-subtle"
}, Ld = {
	key: 1,
	class: "flex justify-center py-16"
}, Rd = {
	key: 3,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, zd = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, Bd = { class: "flex items-center" }, Vd = { class: "text-sm font-semibold text-heading" }, Hd = { class: "ml-2 text-xs text-muted" }, Ud = [
	"aria-label",
	"title",
	"onClick"
], Wd = ["data-status-id"], Gd = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, Kd = { class: "px-3 pt-2 pb-3" }, qd = ["onClick"], Jd = /* @__PURE__ */ l({
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
		let l = t, u = B(), d = y([]), h = y(!0), g = y(!1), v = y(null), w = y({}), T = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map(), k = !1, A = n(() => l.projects.map((e) => ({
			id: e.id,
			label: e.name
		}))), j = n(() => !h.value && d.value.length === 0), M = n(() => xa.settings.hide_invoiced_on_board);
		function N(e) {
			return (e.tasks ?? []).filter((e) => {
				let t = nt(e).invoiced;
				return M.value && t === "invoiced" ? !1 : zi(l.filters.status) ? l.filters.status === "invoiced" ? t === "invoiced" : t !== "invoiced" : !0;
			});
		}
		E(() => `${l.filters.project}|${l.filters.user}`, () => void P(), { immediate: !0 }), E(et, () => void P()), m(() => {
			for (let e of T.values()) e.destroy();
			T.clear(), O.clear();
		});
		async function P() {
			let e = {}, t = Ki(l.filters.project), n = Ki(l.filters.user);
			t !== null && (e.project_id = t), n !== null && (e.assignee_id = n), h.value = !0;
			try {
				d.value = await ar(l.client, e), d.value.some((e) => e.tasks.some((e) => e.customer_id !== null)) && en(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.board.load_failed")));
			} finally {
				h.value = !1;
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
			v.value = null, w.value = {
				task_status_id: t?.id ?? null,
				project_id: Ki(l.filters.project)
			}, g.value = !0;
		}
		function ee(e) {
			k || (v.value = e, w.value = {}, g.value = !0);
		}
		function te(e) {
			let t = v.value ? u("tasks_projects.tasks.updated", { name: e.name }) : u("tasks_projects.tasks.created", { name: e.name });
			g.value = !1, v.value = null, l.notify("success", t), V();
		}
		function ne(e) {
			g.value = !1, v.value = null, l.notify("success", u("tasks_projects.tasks.deleted", { name: e.name })), V();
		}
		return s({ openCreate: () => z(null) }), (n, s) => {
			let l = x("BaseSpinner"), m = x("BaseIcon"), y = x("BaseEmptyPlaceholder");
			return _(), a("section", Fd, [
				M.value ? (_(), a("p", Id, S(C(u)("tasks_projects.board.hidden_invoiced")), 1)) : i("", !0),
				h.value && d.value.length === 0 ? (_(), a("div", Ld, [c(l, { class: "h-8 w-8 text-primary-500" })])) : j.value ? (_(), r(y, {
					key: 2,
					title: C(u)("tasks_projects.task_statuses.none"),
					description: C(u)("tasks_projects.tasks.empty_description")
				}, {
					default: D(() => [c(m, {
						name: "ViewColumnsIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"])) : (_(), a("div", Rd, [(_(!0), a(e, null, b(d.value, (n) => (_(), a("section", {
					key: n.status.id,
					class: "w-64 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
				}, [
					o("header", zd, [o("div", Bd, [
						o("span", {
							class: f(["mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", n.status.colour ? "" : "bg-line-default"]),
							style: p(n.status.colour ? { backgroundColor: n.status.colour } : void 0)
						}, null, 6),
						o("h3", Vd, S(n.status.name), 1),
						o("span", Hd, S(N(n).length), 1)
					]), o("button", {
						type: "button",
						class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
						"aria-label": C(u)("tasks_projects.tasks.new_task"),
						title: C(u)("tasks_projects.tasks.new_task"),
						onClick: (e) => z(n.status)
					}, [c(m, {
						name: "PlusIcon",
						class: "h-4 w-4"
					})], 8, Ud)]),
					o("div", {
						ref_for: !0,
						ref: (e) => F(n.status.id, e),
						"data-status-id": n.status.id,
						class: "min-h-20 space-y-2 px-3 pt-3"
					}, [(_(!0), a(e, null, b(N(n), (e) => (_(), r(Pd, {
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
					]))), 128))], 8, Wd),
					N(n).length === 0 ? (_(), a("p", Gd, S(C(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
					o("div", Kd, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
						onClick: (e) => z(n.status)
					}, " + " + S(C(u)("tasks_projects.tasks.new_task")), 9, qd)])
				]))), 128))])),
				c(ya, {
					show: g.value,
					client: t.client,
					notify: t.notify,
					task: v.value,
					statuses: t.statuses,
					members: t.members,
					projects: A.value,
					defaults: w.value,
					compact: v.value === null,
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
}), Yd = /* @__PURE__ */ l({
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
		let n = y(null);
		return t({ openCreate: () => n.value?.openCreate() }), (t, i) => (_(), r(wo, {
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
}), Xd = { class: "relative table-container" }, Zd = { class: "block max-w-64 truncate" }, Qd = { class: "tabular-nums" }, $d = {
	key: 1,
	class: "text-subtle"
}, ef = /* @__PURE__ */ l({
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
		let l = e, u = t, d = B(), p = y(null), m = v({
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
			get: () => w(h.value, m.billing),
			set: (e) => {
				m.billing = typeof e.id == "string" ? e.id : "ALL";
			}
		}), b = n(() => [
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
		function w(e, t) {
			return e.find((e) => e.id === t) ?? e[0];
		}
		function T(e = !1) {
			p.value?.refresh(e);
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
			let n = x("BaseDatePicker"), l = x("BaseInputGroup"), v = x("BaseSelectInput"), y = x("BaseFilterWrapper"), w = x("BaseBadge"), T = x("BaseFormatMoney"), E = x("BaseIcon"), N = x("BaseDropdownItem"), P = x("BaseDropdown"), F = x("BaseTable");
			return _(), a("section", null, [c(y, {
				show: "",
				"row-on-xl": "",
				class: "mt-3",
				onClear: O
			}, {
				default: D(() => [
					c(l, {
						label: C(d)("tasks_projects.time.filters.from"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(n, {
							"model-value": m.from,
							"onUpdate:modelValue": k
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: C(d)("tasks_projects.time.filters.to"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(n, {
							"model-value": m.to,
							"onUpdate:modelValue": A
						}, null, 8, ["model-value"])]),
						_: 1
					}, 8, ["label"]),
					c(l, {
						label: C(d)("tasks_projects.time.filters.billing"),
						class: "mt-2 flex-1"
					}, {
						default: D(() => [c(v, {
							modelValue: g.value,
							"onUpdate:modelValue": t[0] ||= (e) => g.value = e,
							options: h.value,
							"label-key": "label"
						}, null, 8, ["modelValue", "options"])]),
						_: 1
					}, 8, ["label"])
				]),
				_: 1
			}), o("div", Xd, [c(F, {
				ref_key: "tableRef",
				ref: p,
				data: M,
				columns: b.value,
				class: "mt-3"
			}, {
				"cell-date": D(({ row: e }) => [s(S(C(ut)(C(Ia)(e.data.started_at))), 1)]),
				"cell-member": D(({ row: e }) => [s(S(j(e.data.user_id)), 1)]),
				"cell-task": D(({ row: e }) => [s(S(C(Ze)(e.data.task_id)), 1)]),
				"cell-description": D(({ row: e }) => [o("span", Zd, S(e.data.description || "-"), 1)]),
				"cell-duration": D(({ row: e }) => [o("span", Qd, S(C(Pa)(e.data.duration_minutes)), 1)]),
				"cell-billable": D(({ row: e }) => [c(w, { class: f(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: D(() => [s(S(e.data.billable ? C(d)("tasks_projects.time.billable") : C(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": D(({ row: e }) => [e.data.billable ? (_(), r(T, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (_(), a("span", $d, "-"))]),
				"cell-actions": D(({ row: e }) => [c(P, null, {
					activator: D(() => [c(E, {
						name: "EllipsisHorizontalIcon",
						class: "h-5 text-muted"
					})]),
					default: D(() => [c(N, { onClick: (t) => u("edit", e.data) }, {
						default: D(() => [c(E, {
							name: "PencilIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + S(C(d)("tasks_projects.general.edit")), 1)]),
						_: 1
					}, 8, ["onClick"]), e.data.invoice_id === null ? (_(), r(N, {
						key: 0,
						onClick: (t) => u("delete", e.data)
					}, {
						default: D(() => [c(E, {
							name: "TrashIcon",
							class: "mr-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + S(C(d)("tasks_projects.general.delete")), 1)]),
						_: 1
					}, 8, ["onClick"])) : i("", !0)]),
					_: 2
				}, 1024)]),
				_: 1
			}, 8, ["columns"])])]);
		};
	}
}), tf = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, nf = { class: "flex items-center gap-2" }, rf = { class: "ml-1 text-sm text-muted" }, af = { class: "flex items-center gap-2 text-sm" }, of = { class: "text-muted" }, sf = { class: "text-lg font-semibold tabular-nums text-heading" }, cf = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, lf = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, uf = { class: "flex items-baseline justify-between" }, df = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, ff = { class: "text-xs text-muted" }, pf = { class: "text-sm font-medium tabular-nums text-heading" }, mf = { class: "mt-3 flex-1 space-y-2" }, hf = ["onClick"], gf = { class: "flex items-center justify-between gap-2" }, _f = { class: "truncate text-xs font-medium text-heading" }, vf = { class: "shrink-0 text-xs tabular-nums text-muted" }, yf = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, bf = { class: "mt-1 flex items-center gap-1" }, xf = { class: "text-[11px] text-subtle" }, Sf = {
	key: 0,
	class: "text-[11px] text-subtle"
}, Cf = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, wf = ["onClick"], Tf = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, Ef = /* @__PURE__ */ l({
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
		let u = t, d = l, p = B(), m = y(Ba(/* @__PURE__ */ new Date(), u.weekStart)), h = y([]), g = y(!1), v = n(() => Va(m.value)), w = n(() => {
			let e = v.value[0], t = v.value[v.value.length - 1];
			return `${Wa(e).day} - ${Wa(t).day}`;
		}), T = n(() => v.value.map((e) => {
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
					from: Ua(v.value[0]),
					to: Ua(v.value[v.value.length - 1])
				};
				u.projectId && (e.project_id = u.projectId);
				let t = await Oe(u.client, e);
				h.value = t, $e(u.client, t.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", H(e, p("tasks_projects.time.load_failed")));
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
			let u = x("BaseIcon"), m = x("BaseButton"), h = x("BaseSpinner");
			return _(), a("section", null, [
				o("header", tf, [o("div", nf, [
					c(m, {
						variant: "white",
						size: "sm",
						title: C(p)("tasks_projects.time.previous_week"),
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
						default: D(() => [s(S(C(p)("tasks_projects.time.this_week")), 1)]),
						_: 1
					}),
					c(m, {
						variant: "white",
						size: "sm",
						title: C(p)("tasks_projects.time.next_week"),
						onClick: l[1] ||= (e) => M(1)
					}, {
						default: D(() => [c(u, {
							name: "ChevronRightIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title"]),
					o("span", rf, S(w.value), 1)
				]), o("div", af, [
					o("span", of, S(C(p)("tasks_projects.time.week_total")), 1),
					o("span", sf, S(C(Pa)(O.value)), 1),
					g.value ? (_(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (_(), a("p", cf, S(C(p)("tasks_projects.time.unknown_user")), 1)) : (_(), a("div", lf, [(_(!0), a(e, null, b(T.value, (t) => (_(), a("article", {
					key: t.key,
					class: f(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", uf, [o("div", null, [o("p", df, S(t.weekday), 1), o("p", ff, S(t.day), 1)]), o("span", pf, S(C(Pa)(t.minutes)), 1)]),
					o("ul", mf, [(_(!0), a(e, null, b(t.entries, (e) => (_(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-left hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", gf, [o("span", _f, S(C(Ze)(e.task_id)), 1), o("span", vf, S(C(Pa)(e.duration_minutes)), 1)]),
						e.description ? (_(), a("span", yf, S(e.description), 1)) : i("", !0),
						o("span", bf, [
							o("span", { class: f(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", xf, S(e.billable ? C(p)("tasks_projects.time.billable") : C(p)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (_(), a("span", Sf, " - " + S(C(p)("tasks_projects.time.billed")), 1))
						])
					], 8, hf)]))), 128)), t.entries.length === 0 ? (_(), a("li", Cf, S(C(p)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + S(C(p)("tasks_projects.time.add_entry")), 1)], 8, wf)
				], 2))), 128))])),
				k.value && t.userId !== null ? (_(), a("p", Tf, S(C(p)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), Df = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, Of = 5, kf = /* @__PURE__ */ l({
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
		let t = e, s = B(), l = y("MINE"), u = y(!1), d = y(!1), p = y(null), m = y(Ua(/* @__PURE__ */ new Date())), g = y(0), v = n(() => xa.settings.week_start), b = n(() => Ki(t.filters.project)), x = n(() => Ki(t.filters.user) ?? xa.userId);
		h(() => void w()), E(et, () => {
			g.value += 1;
		});
		async function w() {
			xa.userId === null && await Sa(t.client), u.value = xa.settings.members_see_all_time || await T();
		}
		async function T() {
			try {
				return ((await De(t.client, { limit: Of })).data ?? []).some((e) => e.user_id !== xa.userId);
			} catch {
				return !1;
			}
		}
		function D(e) {
			p.value = null, m.value = e ?? Ua(/* @__PURE__ */ new Date()), d.value = !0;
		}
		function O(e) {
			p.value = e, d.value = !0;
		}
		function k() {
			let e = p.value ? s("tasks_projects.time.updated") : s("tasks_projects.time.created");
			d.value = !1, p.value = null, t.notify("success", e), g.value += 1, V();
		}
		function A() {
			d.value = !1, p.value = null, t.notify("success", s("tasks_projects.time.deleted")), g.value += 1, V();
		}
		async function j(e) {
			if (window.confirm(s("tasks_projects.time.delete_confirm"))) try {
				await je(t.client, e.id), t.notify("success", s("tasks_projects.time.deleted")), g.value += 1, V();
			} catch (e) {
				t.notify("error", H(e, s("tasks_projects.time.delete_failed")));
			}
		}
		function M(e) {
			return l.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => (_(), a("section", null, [
			u.value ? (_(), a("nav", Df, [o("button", {
				type: "button",
				class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("MINE")]),
				onClick: n[0] ||= (e) => l.value = "MINE"
			}, S(C(s)("tasks_projects.time.my_time")), 3), o("button", {
				type: "button",
				class: f(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("ALL")]),
				onClick: n[1] ||= (e) => l.value = "ALL"
			}, S(C(s)("tasks_projects.time.all_time")), 3)])) : i("", !0),
			l.value === "MINE" ? (_(), r(Ef, {
				key: 1,
				client: e.client,
				notify: e.notify,
				"user-id": x.value,
				"project-id": b.value,
				"week-start": v.value,
				"reload-token": g.value,
				onAdd: D,
				onEdit: O
			}, null, 8, [
				"client",
				"notify",
				"user-id",
				"project-id",
				"week-start",
				"reload-token"
			])) : (_(), r(ef, {
				key: 2,
				client: e.client,
				notify: e.notify,
				members: e.members,
				"member-id": C(Ki)(e.filters.user),
				"project-id": b.value,
				"reload-token": g.value,
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
			c(Ro, {
				show: d.value,
				client: e.client,
				notify: e.notify,
				entry: p.value,
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
}), Af = {
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function jf(e) {
	e.addMessages(Ks), e.registerPage({
		id: "tasks",
		module: U,
		path: "",
		component: sn(e, ll),
		meta: {
			ability: Af.viewTask,
			title: "tasks_projects.tasks.title"
		},
		children: [
			{
				id: "list",
				path: "",
				component: sn(e, Yd),
				meta: {
					ability: Af.viewTask,
					title: "tasks_projects.tasks.views.list"
				}
			},
			{
				id: "board",
				path: "board",
				component: sn(e, Jd),
				meta: {
					ability: Af.viewTask,
					title: "tasks_projects.board.title"
				}
			},
			{
				id: "week",
				path: "week",
				component: sn(e, kf),
				meta: {
					ability: Af.viewOwnTime,
					title: "tasks_projects.time.title"
				}
			}
		]
	}), e.registerPage({
		id: "task",
		module: U,
		path: "tasks/:id",
		component: sn(e, nl),
		meta: {
			ability: Af.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "time",
		module: U,
		path: "time",
		component: Mf(e),
		meta: {
			ability: Af.viewOwnTime,
			title: "tasks_projects.time.title"
		}
	});
}
function Mf(e) {
	return l({ setup: () => (h(() => {
		e.router.replace(W.week);
	}), () => null) });
}
//#endregion
//#region resources/js/components/QuickStartOverlay.vue?vue&type=script&setup=true&lang.ts
var Nf = {
	key: 0,
	class: "fixed right-6 bottom-20 z-40 flex flex-col items-end gap-3"
}, Pf = ["aria-label"], Ff = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, If = { class: "text-sm font-semibold text-heading" }, Lf = ["aria-label"], Rf = {
	key: 0,
	class: "space-y-4 px-4 py-4"
}, zf = { class: "truncate text-sm font-medium text-heading" }, Bf = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, Vf = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, Hf = { class: "flex items-center gap-2" }, Uf = {
	key: 1,
	class: "space-y-3 px-4 py-4"
}, Wf = { class: "block" }, Gf = { class: "sr-only" }, Kf = ["placeholder"], qf = {
	key: 0,
	class: "text-xs text-muted"
}, Jf = {
	key: 1,
	class: "max-h-48 space-y-1 overflow-y-auto"
}, Yf = ["onClick"], Xf = {
	key: 2,
	class: "text-xs text-muted"
}, Zf = ["placeholder", "aria-label"], Qf = { class: "flex items-center justify-between" }, $f = ["title", "aria-label"], ep = {
	key: 0,
	class: "tabular-nums"
}, tp = 300, np = /* @__PURE__ */ l({
	__name: "QuickStartOverlay",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		enabled: { type: Boolean }
	},
	emits: ["open-week"],
	setup(l, { emit: u }) {
		let d = l, p = u, h = B(), g = y(!1), v = y(""), T = y([]), A = y(!1), j = y(null), M = y(""), N, P = n(() => ({
			notify: d.notify,
			t: h
		})), F = n(() => Ze(K.running?.task_id ?? null)), I = n(() => Na(K.elapsedSeconds));
		E(() => d.enabled, (e) => {
			e || z();
		}), E(g, (e) => {
			e && K.running === null && L();
		}), E(v, () => {
			clearTimeout(N), N = setTimeout(() => void L(), tp);
		}), m(() => clearTimeout(N));
		async function L() {
			A.value = !0;
			try {
				let e = await Ve(d.client, v.value);
				T.value = e, e.forEach(Qe);
			} catch (e) {
				T.value = [], d.notify("error", H(e, h("tasks_projects.time.tasks_failed")));
			} finally {
				A.value = !1;
			}
		}
		function R(e) {
			j.value = e, Qe(e);
		}
		function z() {
			g.value = !1, v.value = "", T.value = [], j.value = null, M.value = "";
		}
		async function ee() {
			let e = j.value;
			e !== null && await K.start(d.client, e.id, M.value.trim() || null, P.value) !== null && (d.notify("success", h("tasks_projects.timer.started", { name: e.name })), z());
		}
		async function te() {
			let e = F.value, t = await K.stop(d.client, P.value);
			t !== null && (d.notify("success", h("tasks_projects.timer.stopped", {
				name: e,
				duration: Pa(t.duration_minutes)
			})), z());
		}
		async function ne() {
			window.confirm(h("tasks_projects.timer.discard_confirm")) && await K.discard(d.client, P.value) && (d.notify("success", h("tasks_projects.timer.discarded")), z());
		}
		return (n, u) => {
			let d = x("BaseIcon"), m = x("BaseButton");
			return _(), r(t, { to: "body" }, [l.enabled ? (_(), a("div", Nf, [g.value ? (_(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": C(h)("tasks_projects.timer.panel_title"),
				onKeydown: k(z, ["esc"])
			}, [o("header", Ff, [o("h2", If, S(C(h)("tasks_projects.timer.panel_title")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": C(h)("tasks_projects.timer.close"),
				onClick: z
			}, [c(d, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Lf)]), C(K).running === null ? (_(), a("div", Uf, [
				o("label", Wf, [o("span", Gf, S(C(h)("tasks_projects.timer.search_tasks")), 1), O(o("input", {
					"onUpdate:modelValue": u[0] ||= (e) => v.value = e,
					type: "search",
					autocomplete: "off",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: C(h)("tasks_projects.timer.search_tasks")
				}, null, 8, Kf), [[w, v.value]])]),
				A.value ? (_(), a("p", qf, S(C(h)("tasks_projects.general.search")), 1)) : T.value.length > 0 ? (_(), a("ul", Jf, [(_(!0), a(e, null, b(T.value, (e) => (_(), a("li", { key: e.id }, [o("button", {
					type: "button",
					class: f(["w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover", j.value?.id === e.id ? "bg-hover-strong font-medium text-heading" : "text-body"]),
					onClick: (t) => R(e)
				}, S(e.name), 11, Yf)]))), 128))])) : (_(), a("p", Xf, S(C(h)("tasks_projects.timer.no_tasks")), 1)),
				O(o("input", {
					"onUpdate:modelValue": u[1] ||= (e) => M.value = e,
					type: "text",
					class: "w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
					placeholder: C(h)("tasks_projects.timer.description_placeholder"),
					"aria-label": C(h)("tasks_projects.time.fields.description")
				}, null, 8, Zf), [[w, M.value]]),
				o("div", Qf, [o("button", {
					type: "button",
					class: "text-xs text-primary-500 hover:underline",
					onClick: u[2] ||= (e) => p("open-week")
				}, S(C(h)("tasks_projects.timer.open_timesheet")), 1), c(m, {
					variant: "primary",
					disabled: j.value === null || C(K).busy,
					onClick: ee
				}, {
					left: D((e) => [c(d, {
						name: "PlayIcon",
						class: f(e.class)
					}, null, 8, ["class"])]),
					default: D(() => [s(" " + S(C(h)("tasks_projects.timer.start")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			])) : (_(), a("div", Rf, [o("div", null, [
				o("p", zf, S(F.value), 1),
				o("p", Bf, S(I.value), 1),
				C(K).running.description ? (_(), a("p", Vf, S(C(K).running.description), 1)) : i("", !0)
			]), o("div", Hf, [c(m, {
				variant: "primary",
				disabled: C(K).busy,
				onClick: te
			}, {
				left: D((e) => [c(d, {
					name: "StopIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + S(C(h)("tasks_projects.timer.stop")), 1)]),
				_: 1
			}, 8, ["disabled"]), c(m, {
				variant: "primary-outline",
				disabled: C(K).busy,
				onClick: ne
			}, {
				default: D(() => [s(S(C(h)("tasks_projects.timer.discard")), 1)]),
				_: 1
			}, 8, ["disabled"])])]))], 40, Pf)) : i("", !0), o("button", {
				type: "button",
				class: "flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover",
				title: C(h)("tasks_projects.timer.quick_start"),
				"aria-label": C(h)("tasks_projects.timer.quick_start"),
				onClick: u[3] ||= (e) => g.value = !g.value
			}, [c(d, {
				name: C(K).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), C(K).running === null ? i("", !0) : (_(), a("span", ep, S(I.value), 1))], 8, $f)])) : i("", !0)]);
		};
	}
}), rp = {
	key: 0,
	class: "relative float-left m-0 ml-2"
}, ip = ["title"], ap = ["aria-label", "title"], op = { class: "font-medium tabular-nums" }, sp = [
	"disabled",
	"title",
	"aria-label"
], cp = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = B(), u = n(() => Ze(K.running?.task_id ?? null)), d = n(() => Na(K.elapsedSeconds));
		async function f() {
			let e = u.value, t = await K.stop(r.client, {
				notify: r.notify,
				t: l
			});
			t !== null && r.notify("success", l("tasks_projects.timer.stopped", {
				name: e,
				duration: Pa(t.duration_minutes)
			}));
		}
		return (e, t) => {
			let n = x("BaseIcon");
			return C(K).running === null ? i("", !0) : (_(), a("li", rp, [o("div", {
				class: "flex h-8 items-center gap-2 rounded-lg bg-white/20 px-2 text-sm text-white md:h-9 md:px-3",
				title: C(l)("tasks_projects.timer.running")
			}, [
				t[1] ||= o("span", { class: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" }, null, -1),
				o("button", {
					type: "button",
					class: "hidden max-w-32 truncate hover:underline lg:block",
					"aria-label": C(l)("tasks_projects.timer.open_task"),
					title: C(l)("tasks_projects.timer.open_task"),
					onClick: t[0] ||= (e) => s("open")
				}, S(u.value), 9, ap),
				o("span", op, S(d.value), 1),
				o("button", {
					type: "button",
					class: "rounded p-1 hover:bg-white/20 disabled:opacity-50",
					disabled: C(K).busy,
					title: C(l)("tasks_projects.timer.stop"),
					"aria-label": C(l)("tasks_projects.timer.stop"),
					onClick: f
				}, [c(n, {
					name: "StopIcon",
					class: "h-4 w-4 text-white"
				})], 8, sp)
			], 8, ip)]));
		};
	}
}), lp = { en: { tasks_projects: {
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
		behaviour_title: "Task behaviour",
		behaviour_description: "What happens when a task is created, invoiced or shown on the board. Change these in the module settings form.",
		rounding_direction: "Rounding",
		rounding_direction_nearest: "To the nearest increment",
		rounding_direction_up: "Up to the increment",
		rounding_direction_down: "Down to the increment",
		rounding_increment: "Increment",
		rounding_increment_value: "{count} minutes",
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
} } }, up = {
	key: 0,
	class: "text-sm text-muted"
}, dp = { key: 1 }, fp = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, pp = {
	key: 1,
	class: "text-sm text-muted"
}, mp = {
	key: 2,
	class: "divide-y divide-line-light"
}, hp = {
	key: 0,
	class: "space-y-3"
}, gp = { class: "flex flex-wrap items-center gap-2" }, _p = ["aria-label", "onClick"], vp = { class: "flex flex-wrap items-center gap-6" }, yp = { class: "flex items-center gap-2 text-sm text-body" }, bp = { class: "flex items-center gap-2 text-sm text-body" }, xp = { class: "flex gap-3" }, Sp = {
	key: 1,
	class: "flex items-center gap-3"
}, Cp = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, wp = { class: "flex items-center gap-1" }, Tp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Ep = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Dp = [
	"title",
	"aria-label",
	"onClick"
], Op = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], kp = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Ap = { class: "flex flex-wrap items-center gap-2" }, jp = ["aria-label", "onClick"], Mp = { class: "flex flex-wrap items-center gap-6" }, Np = { class: "flex items-center gap-2 text-sm text-body" }, Pp = { class: "flex items-center gap-2 text-sm text-body" }, Fp = { class: "flex gap-3" }, Ip = /* @__PURE__ */ l({
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
		], d = B(), m = y([]), g = y(!0), w = y(!1), T = y(!1), E = y(null), O = y(!1), k = v({
			name: "",
			colour: "",
			is_default: !1,
			is_closed: !1
		}), A = n(() => !g.value && m.value.length === 0);
		h(() => void j());
		async function j() {
			g.value = !0;
			try {
				m.value = await Ie(l.client), w.value = !1;
			} catch (e) {
				m.value = [], w.value = vt(e), w.value || l.notify("error", H(e, d("tasks_projects.settings.load_failed")));
			} finally {
				g.value = !1;
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
			if (T.value || n < 0 || n >= m.value.length) return;
			let r = [...m.value];
			r.splice(n, 0, ...r.splice(e, 1)), m.value = r, T.value = !0;
			try {
				m.value = await Be(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = x("BaseSpinner"), h = x("BaseInput"), v = x("BaseInputGroup"), y = x("BaseSwitch"), j = x("BaseButton"), F = x("BaseBadge"), z = x("BaseIcon");
			return _(), a("div", null, [w.value ? (_(), a("p", up, S(C(d)("tasks_projects.settings.forbidden")), 1)) : (_(), a("div", dp, [g.value ? (_(), a("div", fp, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (_(), a("p", pp, S(C(d)("tasks_projects.settings.no_statuses")), 1)) : (_(), a("ul", mp, [(_(!0), a(e, null, b(m.value, (t, l) => (_(), a("li", {
				key: t.id,
				class: "py-3"
			}, [E.value === t.id ? (_(), a("div", hp, [
				c(v, {
					label: C(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: D(() => [c(h, {
						modelValue: k.name,
						"onUpdate:modelValue": n[0] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(v, { label: C(d)("tasks_projects.settings.colour") }, {
					default: D(() => [o("div", gp, [(_(), a(e, null, b(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, _p)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, S(C(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", vp, [o("label", yp, [c(y, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + S(C(d)("tasks_projects.settings.is_default")), 1)]), o("label", bp, [c(y, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + S(C(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", xp, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : (_(), a("div", Sp, [
				o("span", {
					class: f(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: p(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", Cp, S(t.name), 1),
				t.is_default ? (_(), r(F, {
					key: 0,
					class: "rounded-full bg-primary-50! text-primary-500!"
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.settings.is_default")), 1)]),
					_: 1
				})) : i("", !0),
				t.is_closed ? (_(), r(F, {
					key: 1,
					class: "rounded-full bg-surface-tertiary! text-muted!"
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.settings.is_closed")), 1)]),
					_: 1
				})) : i("", !0),
				o("div", wp, [
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === 0,
						title: C(d)("tasks_projects.settings.move_up"),
						"aria-label": C(d)("tasks_projects.settings.move_up"),
						onClick: (e) => R(l, -1)
					}, [c(z, {
						name: "ChevronUpIcon",
						class: "h-4 w-4"
					})], 8, Tp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading disabled:opacity-40",
						disabled: T.value || l === m.value.length - 1,
						title: C(d)("tasks_projects.settings.move_down"),
						"aria-label": C(d)("tasks_projects.settings.move_down"),
						onClick: (e) => R(l, 1)
					}, [c(z, {
						name: "ChevronDownIcon",
						class: "h-4 w-4"
					})], 8, Ep),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: C(d)("tasks_projects.general.edit"),
						"aria-label": C(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, Dp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-alert-error-text",
						disabled: T.value,
						title: C(d)("tasks_projects.general.delete"),
						"aria-label": C(d)("tasks_projects.general.delete"),
						onClick: (e) => L(t)
					}, [c(z, {
						name: "TrashIcon",
						class: "h-4 w-4"
					})], 8, Op)
				])
			]))]))), 128))])), O.value ? (_(), a("div", kp, [
				c(v, {
					label: C(d)("tasks_projects.settings.status_name"),
					required: ""
				}, {
					default: D(() => [c(h, {
						modelValue: k.name,
						"onUpdate:modelValue": n[4] ||= (e) => k.name = e,
						type: "text",
						maxlength: "255"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]),
				c(v, { label: C(d)("tasks_projects.settings.colour") }, {
					default: D(() => [o("div", Ap, [(_(), a(e, null, b(u, (e) => o("button", {
						key: e,
						type: "button",
						class: f(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: p({ backgroundColor: e }),
						"aria-label": e,
						onClick: (t) => k.colour = e
					}, null, 14, jp)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Mp, [o("label", Np, [c(y, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + S(C(d)("tasks_projects.settings.is_default")), 1)]), o("label", Pp, [c(y, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + S(C(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Fp, [c(j, {
					variant: "primary",
					size: "sm",
					disabled: T.value,
					onClick: I
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.save")), 1)]),
					_: 1
				}, 8, ["disabled"]), c(j, {
					variant: "primary-outline",
					size: "sm",
					onClick: P
				}, {
					default: D(() => [s(S(C(d)("tasks_projects.general.cancel")), 1)]),
					_: 1
				})])
			])) : g.value ? i("", !0) : (_(), r(j, {
				key: 4,
				variant: "primary-outline",
				size: "sm",
				class: "mt-4",
				onClick: N
			}, {
				left: D((e) => [c(z, {
					name: "PlusIcon",
					class: f(e.class)
				}, null, 8, ["class"])]),
				default: D(() => [s(" " + S(C(d)("tasks_projects.settings.add_status")), 1)]),
				_: 1
			}))]))]);
		};
	}
}), Lp = { class: "space-y-6" }, Rp = { class: "divide-y divide-line-light" }, zp = { class: "text-sm text-muted" }, Bp = { class: "text-sm font-medium text-heading" }, Vp = { class: "divide-y divide-line-light" }, Hp = { class: "text-sm text-muted" }, Up = { class: "text-sm font-medium text-heading" }, Wp = /* @__PURE__ */ l({
	__name: "TimeSettingsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let r = B(), i = n(() => xa.settings);
		function l(e) {
			return r(e ? "tasks_projects.settings.on" : "tasks_projects.settings.off");
		}
		let u = n(() => [
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
		]), d = n(() => [
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
			let l = x("BaseIcon"), p = x("BaseButton"), m = x("router-link"), h = x("BaseSettingCard");
			return _(), a("div", Lp, [
				c(h, {
					title: C(r)("tasks_projects.settings.general_title"),
					description: C(r)("tasks_projects.settings.general_description")
				}, {
					action: D(() => [c(m, { to: C(W).settings }, {
						default: D(() => [c(p, {
							variant: "primary-outline",
							size: "sm"
						}, {
							right: D((e) => [c(l, {
								name: "ArrowTopRightOnSquareIcon",
								class: f(e.class)
							}, null, 8, ["class"])]),
							default: D(() => [s(" " + S(C(r)("tasks_projects.settings.open_module_settings")), 1)]),
							_: 1
						})]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				}, 8, ["title", "description"]),
				c(h, {
					title: C(r)("tasks_projects.settings.behaviour_title"),
					description: C(r)("tasks_projects.settings.behaviour_description")
				}, {
					default: D(() => [o("dl", Rp, [(_(!0), a(e, null, b(u.value, (e) => (_(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", zp, S(e.label), 1), o("dd", Bp, S(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(h, {
					title: C(r)("tasks_projects.settings.invoice_title"),
					description: C(r)("tasks_projects.settings.invoice_description")
				}, {
					default: D(() => [o("dl", Vp, [(_(!0), a(e, null, b(d.value, (e) => (_(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", Hp, S(e.label), 1), o("dd", Up, S(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(h, {
					title: C(r)("tasks_projects.settings.statuses_title"),
					description: C(r)("tasks_projects.settings.statuses_description")
				}, {
					default: D(() => [c(Ip, {
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
function Gp(e) {
	e.addMessages(lp);
	let t = (t, n) => {
		e.notify(t, n);
	}, n = () => {
		e.router.push(W.week);
	}, r = () => {
		let t = K.runningTaskId;
		e.router.push(t === null ? W.week : W.task(t));
	};
	e.registerHeaderAction({
		id: `${U}.timer-chip`,
		priority: 30,
		visible: () => K.running !== null,
		component: l({ setup: () => () => d(cp, {
			client: e.client,
			notify: t,
			onOpen: r
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.quick-start`,
		component: l({ setup: () => () => d(np, {
			key: xa.companySession,
			client: e.client,
			notify: t,
			enabled: !xa.adminMode,
			onOpenWeek: n
		}) })
	}), e.registerCompanySettingsPage({
		id: `${U}.settings`,
		title: "tasks_projects.settings.title",
		icon: "ClockIcon",
		path: U,
		priority: 70,
		component: sn(e, Wp)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		Kp(e, t);
	}), e.on("company:changing", () => {
		qp();
	}), e.on("company:changed", ({ companyId: t }) => {
		Kp(e, t === null);
	});
}
async function Kp(e, t) {
	if (wa(t), t) {
		qp();
		return;
	}
	await Sa(e.client), await K.refresh(e.client);
}
function qp() {
	K.reset(), rt(), Ca();
}
//#endregion
//#region resources/js/init.ts
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(j), jf(n), Xo(n), Gp(n), nr(n), Gs(n);
});
//#endregion
