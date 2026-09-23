const { Fragment: e, Teleport: t, computed: n, createBlock: r, createCommentVNode: i, createElementBlock: a, createElementVNode: o, createTextVNode: s, createVNode: c, defineComponent: l, getCurrentInstance: u, h: d, nextTick: f, normalizeClass: p, normalizeStyle: m, onBeforeUnmount: h, onMounted: g, onScopeDispose: _, openBlock: v, reactive: y, ref: b, renderList: x, resolveComponent: S, toDisplayString: C, unref: w, vShow: T, watch: E, withCtx: D, withDirectives: O, withKeys: k, withModifiers: A } = window.__invoiceshelf_vue;
//#region resources/js/messages.ts
var j = { en: { tasks_projects: {
	general: {
		home: "Home",
		close: "Close",
		actions_for: "Actions for {name}",
		select_named: "Select {name}",
		colours: {
			light_grey: "Light grey",
			grey: "Grey",
			blue: "Blue",
			teal: "Teal",
			green: "Green",
			yellow: "Yellow",
			amber: "Amber",
			orange: "Orange",
			red: "Red",
			purple: "Purple",
			violet: "Violet",
			custom: "Custom colour"
		},
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
var te = { class: "flex w-full items-center justify-between" }, ne = ["aria-label"], re = { class: "space-y-5 px-6 py-6" }, ie = { class: "text-sm text-muted" }, ae = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, oe = /* @__PURE__ */ l({
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
				header: D(() => [o("div", te, [o("span", null, C(w(t)("tasks_projects.billing.number.title")), 1), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(t)("tasks_projects.general.close"),
					onClick: d
				}, [c(f, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, ne)])]),
				default: D(() => [o("form", { onSubmit: A(u, ["prevent"]) }, [o("div", re, [o("p", ie, C(w(t)("tasks_projects.billing.number.description")), 1), c(m, {
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
				}, 8, ["label"])]), o("div", ae, [c(h, {
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
}), se = { en: { tasks_projects: { billing: {
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
} } } }, ce = "/api/v1/tasks-projects", le = {
	customers: `${ce}/billing/customers`,
	unbilled: `${ce}/billing/unbilled`,
	prepare: `${ce}/billing/prepare`,
	confirm: `${ce}/billing/confirm`
}, ue = {
	bootstrap: "/api/v1/bootstrap",
	customer: (e) => `/api/v1/customers/${e}`,
	invoices: "/api/v1/invoices",
	invoiceTemplates: "/api/v1/invoices/templates",
	nextNumber: "/api/v1/next-number",
	exchangeRate: (e) => `/api/v1/currencies/${e}/exchange-rate`
};
async function de(e, t = {}) {
	let { data: n } = await e.get(le.customers, { params: t });
	return n.data ?? [];
}
async function fe(e, t, n = {}) {
	let { data: r } = await e.get(le.unbilled, { params: {
		customer_id: t,
		...n
	} });
	return r.data;
}
async function pe(e, t) {
	let { data: n } = await e.post(le.prepare, me(t));
	return n.data;
}
function me(e) {
	let t = "taskIds" in e ? { task_ids: e.taskIds } : "projectId" in e ? { project_id: e.projectId } : { entry_ids: e.entryIds };
	return e.grouping !== void 0 && (t.grouping = e.grouping), t;
}
async function he(e, t, n) {
	let { data: r } = await e.post(le.confirm, {
		invoice_id: t,
		items: n
	});
	return r?.stamped ?? 0;
}
async function ge(e, t) {
	let { data: n } = await e.get(ue.customer(t));
	return n?.data ?? null;
}
async function _e(e, t) {
	let { data: n } = await e.post(ue.invoices, t);
	return n.data;
}
async function ve(e) {
	let { data: t } = await e.get(ue.invoiceTemplates);
	return t?.invoiceTemplates ?? [];
}
async function ye(e, t) {
	let n = { key: "invoice" };
	t !== void 0 && (n.userId = t);
	let { data: r } = await e.get(ue.nextNumber, { params: n });
	return r?.success && typeof r.nextNumber == "string" ? r.nextNumber : null;
}
async function be(e, t) {
	let { data: n } = await e.get(ue.exchangeRate(t)), r = Array.isArray(n?.exchangeRate) ? n.exchangeRate[0] : n?.exchangeRate, i = Number(r);
	return Number.isFinite(i) && i > 0 ? i : null;
}
async function xe(e) {
	let { data: t } = await e.get(ue.bootstrap), n = t?.current_company_settings ?? {}, r = t?.current_user_settings ?? {}, i = Number(n.invoice_due_date_days), a = r.default_invoice_template;
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
var Se = "/api/v1/tasks-projects", Ce = {
	timeEntries: `${Se}/time-entries`,
	timeEntry: (e) => `${Se}/time-entries/${e}`,
	timer: `${Se}/timer`,
	timerStart: `${Se}/timer/start`,
	timerStop: `${Se}/timer/stop`,
	taskStatuses: `${Se}/task-statuses`,
	taskStatus: (e) => `${Se}/task-statuses/${e}`,
	reorderTaskStatuses: `${Se}/task-statuses/reorder`,
	tasks: `${Se}/tasks`,
	task: (e) => `${Se}/tasks/${e}`,
	members: `${Se}/members`,
	settings: `${Se}/settings`
}, we = { bootstrap: "/api/v1/bootstrap" }, Te = 100, Ee = 5, De = 10;
async function Oe(e, t) {
	let { data: n } = await e.get(Ce.timeEntries, { params: t });
	return n;
}
async function ke(e, t) {
	let n = [];
	for (let r = 1; r <= Ee; r += 1) {
		let i = await Oe(e, {
			...t,
			page: r,
			limit: Te
		});
		if (n.push(...i.data ?? []), !i.meta || r >= i.meta.last_page) break;
	}
	return n;
}
async function Ae(e, t) {
	let { data: n } = await e.post(Ce.timeEntries, t);
	return n.data;
}
async function je(e, t, n) {
	let { data: r } = await e.put(Ce.timeEntry(t), n);
	return r.data;
}
async function Me(e, t) {
	await e.delete(Ce.timeEntry(t));
}
async function Ne(e) {
	let { data: t } = await e.get(Ce.timer);
	return t?.data ?? null;
}
async function Pe(e, t) {
	let { data: n } = await e.post(Ce.timerStart, t);
	return n.data;
}
async function Fe(e, t = {}) {
	let { data: n } = await e.post(Ce.timerStop, t);
	return n.data;
}
async function Ie(e) {
	await e.delete(Ce.timer);
}
async function Le(e) {
	let { data: t } = await e.get(Ce.taskStatuses);
	return t.data ?? [];
}
async function Re(e, t) {
	let { data: n } = await e.post(Ce.taskStatuses, t);
	return n.data;
}
async function ze(e, t, n) {
	let { data: r } = await e.put(Ce.taskStatus(t), n);
	return r.data;
}
async function Be(e, t) {
	await e.delete(Ce.taskStatus(t));
}
async function Ve(e, t) {
	let { data: n } = await e.post(Ce.reorderTaskStatuses, { ids: t });
	return n.data ?? [];
}
async function He(e, t, n = {}) {
	let r = { limit: n.limit ?? De };
	t.trim() !== "" && (r.search = t.trim()), typeof n.projectId == "number" && (r.project_id = n.projectId), n.invoiced !== void 0 && (r.invoiced = n.invoiced);
	let { data: i } = await e.get(Ce.tasks, { params: r });
	return i.data ?? [];
}
async function Ue(e, t) {
	let { data: n } = await e.get(Ce.task(t));
	return n.data;
}
async function We(e) {
	let { data: t } = await e.get(Ce.settings);
	return t.data;
}
async function Ge(e) {
	let { data: t } = await e.get(we.bootstrap), n = t?.current_user?.id;
	return typeof n == "number" ? n : null;
}
//#endregion
//#region resources/js/stores/tasks.ts
var Ke = y({}), qe = /* @__PURE__ */ new Set(), Je = 5, Ye = {
	logged_minutes: 0,
	billable_minutes: 0,
	unbilled_minutes: 0,
	unbilled_amount: 0,
	invoiced: "none",
	running: []
}, Xe = b(0), Ze = y({});
function Qe(e) {
	return e === null ? "" : Ke[e] ?? `#${e}`;
}
function $e(e) {
	e && typeof e.id == "number" && typeof e.name == "string" && (Ke[e.id] = e.name);
}
async function et(e, t) {
	let n = [...new Set(t)].filter((e) => typeof e == "number" && Ke[e] === void 0 && !qe.has(e));
	for (let e of n) qe.add(e);
	for (let t = 0; t < n.length; t += Je) await Promise.all(n.slice(t, t + Je).map(async (t) => {
		try {
			$e(await Ue(e, t));
		} catch {} finally {
			qe.delete(t);
		}
	}));
}
var tt = Xe;
function V() {
	Xe.value += 1;
}
function nt(e, t) {
	Ze[e] = {
		...Ze[e] ?? {},
		...t
	};
}
function rt(e) {
	if (!e || typeof e.id != "number") return Ye;
	let t = e.time ?? Ye;
	return {
		...Ye,
		...t,
		running: Array.isArray(t.running) ? t.running : [],
		...Ze[e.id] ?? {}
	};
}
function it() {
	for (let e of Object.keys(Ke)) delete Ke[Number(e)];
	for (let e of Object.keys(Ze)) delete Ze[Number(e)];
	qe.clear();
}
//#endregion
//#region resources/js/support/errors.ts
function at(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response;
	return typeof t?.data != "object" || t.data === null ? null : t.data;
}
function H(e, t) {
	let n = at(e)?.message;
	return typeof n == "string" && n !== "" ? n : t;
}
function ot(e) {
	let t = at(e)?.errors, n = {};
	if (typeof t != "object" || !t) return n;
	for (let [e, r] of Object.entries(t)) Array.isArray(r) && typeof r[0] == "string" && (n[e] = r[0]);
	return n;
}
//#endregion
//#region resources/js/support/format.ts
function st(e) {
	return e === null ? "" : String(e / 100);
}
function ct(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 100);
}
function lt(e) {
	return e === null ? "" : String(e / 60);
}
function ut(e) {
	let t = Number(e);
	return e.trim() === "" || Number.isNaN(t) ? null : Math.round(t * 60);
}
function dt(e) {
	if (!e) return "";
	let [t, n, r] = e.slice(0, 10).split("-").map(Number);
	return !t || !n || !r ? e : new Date(Date.UTC(t, n - 1, r)).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function ft(e) {
	if (typeof e == "string") return e.slice(0, 10);
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
function pt(e) {
	let t = Math.max(0, Math.round(e ?? 0)), n = Math.floor(t / 60), r = t % 60;
	return n === 0 ? `${r}m` : r === 0 ? `${n}h` : `${n}h ${r}m`;
}
function mt(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : (t[0].charAt(0) + (t.length > 1 ? t[t.length - 1].charAt(0) : "")).toUpperCase();
}
function ht(e) {
	if (!e) return !1;
	let t = /* @__PURE__ */ new Date(), n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
	return e.slice(0, 10) < n;
}
//#endregion
//#region resources/js/support/http.ts
function gt(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.status;
	return typeof t == "number" ? t : null;
}
function _t(e) {
	if (typeof e != "object" || !e) return null;
	let t = e.response?.data;
	if (typeof t != "object" || !t) return null;
	let n = t.error;
	return typeof n == "string" && n !== "" ? n : null;
}
function vt(e) {
	return gt(e) === 409;
}
function yt(e) {
	return gt(e) === 403;
}
//#endregion
//#region resources/js/support/invoicing.ts
var bt = "/admin/invoices";
async function xt(e, t) {
	let { notify: n, t: r } = e;
	if (M.pending !== null) return n("warning", r("tasks_projects.billing.pending_stamp")), !1;
	if (!N()) return !1;
	try {
		return await wt(e, t);
	} finally {
		P();
	}
}
async function St(e, t, n) {
	let r = M.pending;
	if (r === null || !N()) return !1;
	try {
		let i = await he(e, r.invoiceId, r.items);
		return I(), V(), t("success", n("tasks_projects.billing.stamped", { count: i })), !0;
	} catch (e) {
		return t("error", H(e, n("tasks_projects.billing.stamp_failed"))), !1;
	} finally {
		P();
	}
}
function Ct(e) {
	return `${bt}/${e}/view`;
}
async function wt(e, t) {
	let { client: n, notify: r, t: i } = e, a;
	try {
		a = await pe(n, t);
	} catch (t) {
		return Tt(e, t), !1;
	}
	if (!Array.isArray(a.items) || a.items.length === 0) return r("warning", i("tasks_projects.billing.nothing_to_invoice")), !1;
	let [o, s, c] = await Promise.all([
		xe(n).catch(() => null),
		ve(n).catch(() => []),
		ge(n, a.customer_id).catch(() => null)
	]), l = c?.currency_id ?? c?.currency?.id ?? a.currency_id, u = o?.currency?.id ?? null, d = u !== null && l !== null && l !== u, f = await Dt(e, o, a.customer_id);
	if (f === null) return !1;
	let p = null;
	d && l !== null && (p = await be(n, l).catch(() => null), p === null && r("warning", i("tasks_projects.billing.rate_failed")));
	let m = kt(a, {
		invoiceNumber: f,
		currencyId: l,
		exchangeRate: p,
		dueDate: Ot(a.invoice_date, o),
		templateName: o?.defaultTemplate ?? s[0]?.name ?? ""
	}), h;
	try {
		h = await _e(n, m);
	} catch (e) {
		return r("error", H(e, i("tasks_projects.billing.create_failed"))), !1;
	}
	let g = await At(e, h, a);
	return V(), g ? (r("success", i("tasks_projects.billing.created", { number: h.invoice_number })), await Mt(e.router, h.id), !0) : !1;
}
function Tt(e, t) {
	let { notify: n, t: r } = e, i = _t(t);
	if (i === "mixed_billing_selection") {
		let e = Et(t);
		n("error", e > 1 ? r("tasks_projects.billing.mixed_customers", { count: e }) : H(t, r("tasks_projects.billing.mixed_selection")));
		return;
	}
	if (i === "nothing_to_invoice") {
		n("warning", r("tasks_projects.billing.nothing_to_invoice"));
		return;
	}
	if (gt(t) === 403) {
		L(), n("error", r("tasks_projects.billing.forbidden"));
		return;
	}
	n("error", H(t, r("tasks_projects.billing.prepare_failed")));
}
function Et(e) {
	if (typeof e != "object" || !e) return 0;
	let t = e.response?.data;
	if (typeof t != "object" || !t) return 0;
	let n = t.customer_ids;
	return Array.isArray(n) ? n.length : 0;
}
async function Dt(e, t, n) {
	let r = await ye(e.client, n).catch(() => null);
	return t?.autoGenerateNumber !== !1 && r !== null ? r : R(r ?? "");
}
function Ot(e, t) {
	if (t === null || !t.setDueDateAutomatically) return null;
	let n = /* @__PURE__ */ new Date(`${e}T00:00:00`);
	return Number.isNaN(n.getTime()) ? null : (n.setDate(n.getDate() + t.dueDateDays), ft(n));
}
function kt(e, t) {
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
async function At(e, t, n) {
	let { client: r, notify: i, t: a } = e, o = jt(t, n);
	if (o.length === 0) return i("error", a("tasks_projects.billing.stamp_unmatched", { number: t.invoice_number })), await Mt(e.router, t.id), !1;
	try {
		return await he(r, t.id, o), !0;
	} catch (e) {
		return F({
			invoiceId: t.id,
			invoiceNumber: t.invoice_number,
			items: o
		}), i("error", H(e, a("tasks_projects.billing.stamp_failed_notice", { number: t.invoice_number }))), !1;
	}
}
function jt(e, t) {
	let n = Array.isArray(e.items) ? e.items : [], r = Array.isArray(t.groups) ? t.groups : [], i = [];
	return r.forEach((e, t) => {
		let r = n[t];
		r && typeof r.id == "number" && e.entry_ids.length > 0 && i.push({
			invoice_item_id: r.id,
			entry_ids: e.entry_ids
		});
	}), i;
}
async function Mt(e, t) {
	await Nt(e, `${bt}/${t}/edit`) || await Nt(e, Ct(t));
}
async function Nt(e, t) {
	try {
		return !await e.push(t);
	} catch {
		return !1;
	}
}
//#endregion
//#region resources/js/components/InvoiceRetryBanner.vue?vue&type=script&setup=true&lang.ts
var Pt = {
	key: 0,
	class: "mt-4 rounded-xl border border-status-yellow bg-surface p-5",
	role: "alert"
}, Ft = { class: "text-sm font-semibold text-heading" }, It = { class: "mt-1 text-sm text-muted" }, Lt = { class: "mt-4 flex flex-wrap items-center gap-3" }, Rt = /* @__PURE__ */ l({
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
					await St(t.client, t.notify, r);
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
			return u.value ? (v(), a("div", Pt, [
				o("p", Ft, C(w(r)("tasks_projects.billing.retry.title")), 1),
				o("p", It, C(w(r)("tasks_projects.billing.retry.description", { number: u.value.invoiceNumber })), 1),
				o("div", Lt, [
					c(n, {
						variant: "primary",
						loading: l.value,
						disabled: l.value,
						onClick: d
					}, {
						default: D(() => [s(C(w(r)("tasks_projects.billing.retry.action")), 1)]),
						_: 1
					}, 8, ["loading", "disabled"]),
					c(p, { to: w(Ct)(u.value.invoiceId) }, {
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
}), zt = "/api/v1/tasks-projects", Bt = {
	projects: `${zt}/projects`,
	project: (e) => `${zt}/projects/${e}`,
	archiveProject: (e) => `${zt}/projects/${e}/archive`,
	unarchiveProject: (e) => `${zt}/projects/${e}/unarchive`,
	members: `${zt}/members`,
	settings: `${zt}/settings`
}, Vt = { customers: "/api/v1/customers" };
function Ht(e, t) {
	if (e === void 0 || e.order === "") return {};
	let n = t[e.fieldName];
	return n === void 0 ? {} : {
		sort_by: n,
		sort_order: e.order
	};
}
async function Ut(e, t) {
	let { data: n } = await e.get(Bt.projects, { params: t });
	return n;
}
async function Wt(e, t) {
	let { data: n } = await e.post(Bt.projects, t);
	return n.data;
}
async function Gt(e, t, n) {
	let { data: r } = await e.put(Bt.project(t), n);
	return r.data;
}
async function Kt(e, t) {
	let { data: n } = await e.post(Bt.archiveProject(t));
	return n.data;
}
async function qt(e, t) {
	let { data: n } = await e.post(Bt.unarchiveProject(t));
	return n.data;
}
async function Jt(e, t) {
	await e.delete(Bt.project(t));
}
async function Yt(e) {
	let { data: t } = await e.get(Bt.members);
	return t.data;
}
async function Xt(e, t = 100) {
	let { data: n } = await e.get(Vt.customers, { params: { limit: t } });
	return n.data;
}
var Zt = y({}), Qt = !1, $t = null;
function en(e) {
	return e === null ? "" : Zt[e] ?? `#${e}`;
}
async function tn(e) {
	Qt || ($t ??= rn(e), await $t);
}
function nn() {
	for (let e of Object.keys(Zt)) delete Zt[Number(e)];
	Qt = !1, $t = null;
}
async function rn(e) {
	try {
		for (let t of await Xt(e, 200)) {
			let e = t?.id;
			typeof e == "number" && (Zt[e] = an(t));
		}
		Qt = !0;
	} catch {} finally {
		$t = null;
	}
}
function an(e) {
	let t = typeof e.display_name == "string" ? e.display_name.trim() : "";
	if (t !== "") return t;
	let n = typeof e.name == "string" ? e.name.trim() : "";
	return n === "" ? `#${e.id}` : n;
}
//#endregion
//#region resources/js/support/page.ts
var U = "tasks-projects", on = `/admin/modules/${U}`, W = {
	tasks: on,
	board: `${on}/board`,
	week: `${on}/week`,
	task: (e) => `${on}/tasks/${e}`,
	projects: `${on}/projects`,
	project: (e) => `${on}/projects/${e}`,
	reports: `${on}/reports`,
	billing: `${on}/billing`,
	settings: "/admin/settings/modules",
	customer: (e) => `/admin/customers/${e}/view`
}, sn = {
	tasks: `extension.page.${U}.tasks`,
	list: `extension.page.${U}.tasks.list`,
	board: `extension.page.${U}.tasks.board`,
	week: `extension.page.${U}.tasks.week`,
	task: `extension.page.${U}.task`,
	projects: `extension.page.${U}.projects`,
	project: `extension.page.${U}.project`
};
function cn(e, t) {
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
var ln = { class: "mt-2 text-sm text-muted" }, un = { class: "flex flex-wrap items-center justify-end gap-3" }, dn = { class: "mt-4 flex flex-wrap items-end gap-4" }, fn = {
	key: 0,
	class: "flex justify-center py-16"
}, pn = {
	key: 1,
	class: "mt-6"
}, mn = { class: "text-base font-semibold text-heading" }, hn = { class: "mt-1 text-sm text-muted" }, gn = {
	key: 0,
	class: "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
}, _n = ["onClick"], vn = { class: "text-sm font-semibold text-heading" }, yn = { class: "mt-1 text-xs text-muted" }, bn = { class: "mt-3 text-xl font-semibold text-heading" }, xn = {
	key: 2,
	class: "mt-6"
}, Sn = { class: "flex flex-wrap items-end justify-between gap-4" }, Cn = { class: "text-base font-semibold text-heading" }, wn = { class: "mt-1 text-sm text-muted" }, Tn = {
	key: 0,
	class: "flex justify-center py-16"
}, En = { class: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-default bg-surface-secondary px-4 py-3" }, Dn = { class: "flex cursor-pointer items-center gap-2 text-sm font-medium text-heading" }, On = ["checked"], kn = { class: "text-sm text-muted" }, An = { class: "flex flex-wrap items-center justify-between gap-3 bg-surface-secondary px-4 py-3" }, jn = { class: "flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading" }, Mn = ["checked", "onChange"], Nn = { class: "text-sm text-muted" }, Pn = { class: "overflow-x-auto" }, Fn = { class: "w-full table-auto" }, In = { class: "bg-surface text-xs tracking-wider text-muted uppercase" }, Ln = { class: "px-4 py-2 text-start font-medium" }, Rn = { class: "px-4 py-2 text-start font-medium" }, zn = { class: "px-4 py-2 text-start font-medium" }, Bn = { class: "px-4 py-2 text-start font-medium" }, Vn = { class: "px-4 py-2 text-end font-medium" }, Hn = { class: "px-4 py-2 text-end font-medium" }, Un = { class: "divide-y divide-line-default bg-surface text-sm" }, Wn = { class: "ps-4" }, Gn = [
	"aria-label",
	"checked",
	"onChange"
], Kn = { class: "px-4 py-2 whitespace-nowrap text-muted" }, qn = { class: "px-4 py-2" }, Jn = { class: "block text-xs text-subtle" }, Yn = { class: "px-4 py-2 text-muted" }, Xn = { class: "px-4 py-2 text-muted" }, Zn = { class: "px-4 py-2 text-end whitespace-nowrap text-muted" }, Qn = { class: "px-4 py-2 text-end whitespace-nowrap text-heading" }, $n = { class: "mt-5 flex flex-wrap items-center justify-between gap-4" }, er = { class: "text-sm font-medium text-heading" }, tr = { class: "flex items-center gap-3" }, nr = /* @__PURE__ */ l({
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
			f.value = !0, await Promise.all([ae(), tn(l.client)]), f.value = !1;
		}
		async function ie() {
			await ae(), _.value !== null && await ue(_.value);
		}
		async function ae() {
			try {
				m.value = await de(l.client, ne.value);
			} catch (e) {
				m.value = [], l.notify("error", H(e, d("tasks_projects.billing.customer.load_failed")));
			}
		}
		function oe(e) {
			return en(e);
		}
		function se() {
			h.from = "", h.to = "";
		}
		function ce(e) {
			h.from = e ? ft(e) : "";
		}
		function le(e) {
			h.to = e ? ft(e) : "";
		}
		async function ue(e) {
			_.value = e, O.value = !0, T.value = null, A.value = [];
			try {
				T.value = await fe(l.client, e.customer_id, ne.value), A.value = F.value.map((e) => e.id);
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
			await xt({
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
						actions: D(() => [o("div", un, [c(T, { to: w(W).reports }, {
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
						}), o("p", ln, C(w(d)("tasks_projects.billing.subtitle")), 1)]),
						_: 1
					}, 8, ["title"]),
					c(Rt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("div", dn, [
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
					f.value ? (v(), a("div", fn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : _.value === null ? (v(), a("section", pn, [
						o("h2", mn, C(w(d)("tasks_projects.billing.customer.title")), 1),
						o("p", hn, C(w(d)("tasks_projects.billing.customer.description")), 1),
						m.value.length > 0 ? (v(), a("div", gn, [(v(!0), a(e, null, x(m.value, (e) => (v(), a("button", {
							key: `${e.customer_id}-${e.currency_id ?? "none"}`,
							type: "button",
							class: "rounded-xl border border-line-default bg-surface p-5 text-start transition hover:border-primary-500",
							onClick: (t) => ue(e)
						}, [
							o("p", vn, C(oe(e.customer_id)), 1),
							o("p", yn, C(w(d)("tasks_projects.billing.customer.entries", { count: e.entries })) + " · " + C(w(pt)(e.minutes)), 1),
							o("p", bn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						], 8, _n))), 128))])) : (v(), r(B, {
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
					])) : (v(), a("section", xn, [o("div", Sn, [o("div", null, [o("h2", Cn, C(w(d)("tasks_projects.billing.entries.title")), 1), o("p", wn, C(oe(_.value.customer_id)), 1)]), c(M, {
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
					}, 8, ["label"])]), O.value ? (v(), a("div", Tn, [c(F, { class: "h-8 w-8 text-primary-500" })])) : R.value > 0 ? (v(), a(e, { key: 1 }, [
						o("div", En, [o("label", Dn, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: z.value,
							onChange: ge
						}, null, 40, On), s(" " + C(w(d)("tasks_projects.billing.entries.select_all")), 1)]), o("p", kn, C(w(d)("tasks_projects.billing.entries.selected", {
							count: A.value.length,
							total: R.value
						})), 1)]),
						(v(!0), a(e, null, x(L.value, (t) => (v(), a("div", {
							key: `${t.label}-${t.key ?? "none"}-${t.currency_id ?? "none"}`,
							class: "mt-4 overflow-hidden rounded-xl border border-line-default"
						}, [o("div", An, [o("label", jn, [o("input", {
							type: "checkbox",
							class: "h-4 w-4 cursor-pointer rounded border-line-strong",
							checked: _e(t),
							onChange: (e) => ve(t)
						}, null, 40, Mn), s(" " + C(t.label), 1)]), o("p", Nn, [s(C(w(pt)(t.minutes)) + " · ", 1), c(I, { amount: t.amount }, null, 8, ["amount"])])]), o("div", Pn, [o("table", Fn, [o("thead", In, [o("tr", null, [
							l[1] ||= o("th", { class: "w-10" }, null, -1),
							o("th", Ln, C(w(d)("tasks_projects.billing.entries.columns.date")), 1),
							o("th", Rn, C(w(d)("tasks_projects.billing.entries.columns.task")), 1),
							o("th", zn, C(w(d)("tasks_projects.billing.entries.columns.project")), 1),
							o("th", Bn, C(w(d)("tasks_projects.billing.entries.columns.member")), 1),
							o("th", Vn, C(w(d)("tasks_projects.billing.entries.columns.duration")), 1),
							o("th", Hn, C(w(d)("tasks_projects.billing.entries.columns.amount")), 1)
						])]), o("tbody", Un, [(v(!0), a(e, null, x(ye(t), (e) => (v(), a("tr", { key: e.id }, [
							o("td", Wn, [o("input", {
								type: "checkbox",
								class: "h-4 w-4 cursor-pointer rounded border-line-strong",
								"aria-label": w(d)("tasks_projects.general.select_named", { name: e.description || w(dt)(e.date) }),
								checked: me(e.id),
								onChange: (t) => he(e.id)
							}, null, 40, Gn)]),
							o("td", Kn, C(w(dt)(e.date)), 1),
							o("td", qn, [c(T, {
								class: "text-heading hover:text-primary-500",
								to: w(W).task(e.task_id)
							}, {
								default: D(() => [s(C(e.task_name), 1)]),
								_: 2
							}, 1032, ["to"]), o("span", Jn, C(e.description || w(d)("tasks_projects.billing.entries.no_description")), 1)]),
							o("td", Yn, C(e.project_name ?? "-"), 1),
							o("td", Xn, C(e.user_name), 1),
							o("td", Zn, C(w(pt)(e.minutes)), 1),
							o("td", Qn, [c(I, { amount: e.amount }, null, 8, ["amount"])])
						]))), 128))])])])]))), 128)),
						o("div", $n, [o("p", er, [s(C(w(d)("tasks_projects.billing.entries.selected_total", { hours: w(pt)(ee.value) })) + " · ", 1), c(I, { amount: te.value }, null, 8, ["amount"])]), o("div", tr, [c(b, {
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
function rr(e) {
	e.addMessages(se), e.registerPage({
		id: "billing",
		module: U,
		path: "billing",
		component: cn(e, nr),
		meta: {
			ability: `${U}:invoice-tasks`,
			title: "tasks_projects.billing.title"
		}
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.invoice-number`,
		component: l({ setup: () => () => d(oe) })
	}), e.on("company:changing", () => {
		ee();
	});
}
//#endregion
//#region resources/js/messages/projects.ts
var ir = { en: { tasks_projects: { project: {
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
} } } }, ar = {
	board: `${zt}/board`,
	tasks: `${zt}/tasks`,
	task: (e) => `${zt}/tasks/${e}`,
	moveTask: (e) => `${zt}/tasks/${e}/move`,
	startTask: (e) => `${zt}/tasks/${e}/start`,
	stopTask: (e) => `${zt}/tasks/${e}/stop`,
	taskTimeLog: (e) => `${zt}/tasks/${e}/time-log`,
	bulkTasks: `${zt}/tasks/bulk`,
	taskStatuses: `${zt}/task-statuses`,
	timeEntries: `${zt}/time-entries`,
	projectMembers: (e) => `${zt}/projects/${e}/members`,
	projectMember: (e, t) => `${zt}/projects/${e}/members/${t}`
};
async function or(e, t) {
	let { data: n } = await e.get(ar.board, { params: t });
	return n.data;
}
async function sr(e) {
	let { data: t } = await e.get(ar.taskStatuses);
	return t.data;
}
async function cr(e, t) {
	let { data: n } = await e.get(ar.tasks, { params: t });
	return n;
}
async function lr(e, t) {
	let { data: n } = await e.post(ar.tasks, t);
	return n.data;
}
async function ur(e, t, n) {
	let { data: r } = await e.put(ar.task(t), n);
	return r.data;
}
async function dr(e, t) {
	await e.delete(ar.task(t));
}
async function fr(e, t) {
	let { data: n } = await e.get(ar.task(t));
	return n.data;
}
async function pr(e, t, n = null, r) {
	let i = {};
	n !== null && (i.description = n), r !== void 0 && (i.billable = r);
	let { data: a } = await e.post(ar.startTask(t), i);
	return a.data;
}
async function mr(e, t, n = {}) {
	let { data: r } = await e.post(ar.stopTask(t), n);
	return r.data;
}
async function hr(e, t) {
	let { data: n } = await e.get(ar.taskTimeLog(t));
	return n.data ?? [];
}
async function gr(e, t) {
	let { data: n } = await e.post(ar.bulkTasks, t);
	return {
		updated: n?.updated ?? [],
		failed: n?.failed ?? []
	};
}
async function _r(e, t, n) {
	let { data: r } = await e.post(ar.moveTask(t), n);
	return r.data;
}
async function vr(e, t) {
	let { data: n } = await e.get(Bt.project(t));
	return n.data;
}
async function yr(e, t) {
	let { data: n } = await e.get(ar.projectMembers(t));
	return n.data;
}
async function br(e, t, n) {
	let { data: r } = await e.post(ar.projectMembers(t), n);
	return r.data;
}
async function xr(e, t, n) {
	await e.delete(ar.projectMember(t, n));
}
async function Sr(e, t) {
	let { data: n } = await e.get(ar.timeEntries, { params: t });
	return n;
}
//#endregion
//#region resources/js/support/colours.ts
var Cr = {
	"#94a3b8": "light_grey",
	"#64748b": "grey",
	"#2563eb": "blue",
	"#3b82f6": "blue",
	"#0891b2": "teal",
	"#059669": "green",
	"#22c55e": "green",
	"#ca8a04": "yellow",
	"#f59e0b": "amber",
	"#ea580c": "orange",
	"#dc2626": "red",
	"#ef4444": "red",
	"#a855f7": "purple",
	"#7c3aed": "violet"
};
function wr(e) {
	return `tasks_projects.general.colours.${Cr[e.toLowerCase()] ?? "custom"}`;
}
//#endregion
//#region resources/js/components/ProjectFormModal.vue?vue&type=script&setup=true&lang.ts
var Tr = { class: "flex w-full items-center justify-between" }, Er = ["aria-label"], Dr = { class: "space-y-5 px-6 py-6" }, Or = { class: "flex flex-wrap items-center gap-2" }, kr = [
	"aria-label",
	"aria-pressed",
	"onClick"
], Ar = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, jr = /* @__PURE__ */ l({
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
			h.name = e?.name ?? "", h.identifier = e?.identifier ?? "", h.description = e?.description ?? "", h.colour = e?.colour ?? "", h.defaultRate = st(e?.default_rate ?? null), h.budgetHours = lt(e?.budget_minutes ?? null), h.dueDate = e?.due_date ?? "", O.value = {}, g.value = P(e?.customer_id ?? null);
		}
		function P(e) {
			return e === null ? null : _.value.find((t) => t.id === e) ?? null;
		}
		function F(e) {
			return e.display_name || e.name || `#${e.id}`;
		}
		async function I() {
			if (!T.value) try {
				let e = await Xt(l.client);
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
				default_rate: ct(h.defaultRate),
				budget_minutes: ut(h.budgetHours),
				due_date: h.dueDate || null
			};
		}
		function R(e) {
			h.dueDate = e ? ft(e) : "";
		}
		async function z() {
			if (!k.value) {
				if (h.name.trim() === "") {
					O.value = { name: f("tasks_projects.projects.name_required") };
					return;
				}
				k.value = !0, O.value = {};
				try {
					let e = l.project, t = e ? await Gt(l.client, e.id, L()) : await Wt(l.client, L());
					u("saved", t);
				} catch (e) {
					O.value = ot(e), l.notify("error", H(e, f("tasks_projects.projects.save_failed")));
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
				header: D(() => [o("div", Tr, [o("span", null, C(M.value), 1), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(f)("tasks_projects.general.close"),
					onClick: i[0] ||= (e) => u("close")
				}, [c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, Er)])]),
				default: D(() => [o("form", { onSubmit: A(z, ["prevent"]) }, [o("div", Dr, [
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
						default: D(() => [o("div", Or, [(v(), a(e, null, x(d, (e) => o("button", {
							key: e,
							type: "button",
							class: p(["h-7 w-7 rounded-full border-2 transition", h.colour === e ? "border-heading" : "border-line-default"]),
							style: m({ backgroundColor: e }),
							"aria-label": w(f)(w(wr)(e)),
							"aria-pressed": h.colour === e,
							onClick: (t) => h.colour = h.colour === e ? "" : e
						}, null, 14, kr)), 64)), o("button", {
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
				]), o("div", Ar, [c(F, {
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
}), Mr = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, Nr = {
	key: 0,
	class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body"
}, Pr = { key: 1 }, Fr = { class: "text-body" }, Ir = {
	key: 2,
	class: "text-subtle"
}, Lr = { key: 3 }, Rr = { class: "text-body" }, zr = { class: "flex items-center justify-end space-x-5" }, Br = { class: "mt-6 flex overflow-x-auto border-b border-line-default" }, Vr = [
	"href",
	"aria-current",
	"onClick"
], Hr = {
	key: 0,
	class: "flex justify-center py-16"
}, Ur = /* @__PURE__ */ l({
	__name: "ProjectDetailPage",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = sn.project, d = B(), f = l.router, m = b(null), h = b(!0), _ = b(!1), y = b(!1), T = n(() => Number(l.id)), O = n(() => [
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
		})), N = n(() => en(m.value?.customer_id ?? null)), P = n(() => M.busy), F = n(() => M.allowed && m.value !== null && m.value.customer_id !== null && (m.value.totals?.unbilled_amount ?? 0) > 0);
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
				m.value = await vr(l.client, T.value), typeof m.value?.customer_id == "number" && await tn(l.client);
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
			e !== null && F.value && !P.value && (await xt({
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
					e.status === "ARCHIVED" ? (await qt(l.client, e.id), l.notify("success", d("tasks_projects.projects.unarchived", { name: e.name }))) : (await Kt(l.client, e.id), l.notify("success", d("tasks_projects.projects.archived", { name: e.name }))), await L();
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
						actions: D(() => [o("div", zr, [
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
						}), m.value ? (v(), a("div", Mr, [
							c(g, { class: p(["rounded-full", re(m.value.status)]) }, {
								default: D(() => [s(C(ie(m.value.status)), 1)]),
								_: 1
							}, 8, ["class"]),
							m.value.identifier ? (v(), a("span", Nr, C(m.value.identifier), 1)) : i("", !0),
							m.value.customer_id ? (v(), a("span", Pr, [s(C(w(d)("tasks_projects.project.customer")) + ": ", 1), o("span", Fr, C(N.value), 1)])) : (v(), a("span", Ir, C(w(d)("tasks_projects.projects.internal")), 1)),
							m.value.due_date ? (v(), a("span", Lr, [s(C(w(d)("tasks_projects.project.due_date")) + ": ", 1), o("span", Rr, C(w(dt)(m.value.due_date)), 1)])) : i("", !0)
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Rt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					o("nav", Br, [(v(!0), a(e, null, x(O.value, (e) => (v(), r(E, {
						key: e.id,
						to: R(e),
						custom: ""
					}, {
						default: D(({ href: t, navigate: n }) => [o("a", {
							href: t,
							"aria-current": z(e) ? "page" : void 0,
							class: p(["relative -mb-px flex items-center border-b-2 px-5 py-2.5 text-sm leading-5 font-medium whitespace-nowrap transition-colors focus:outline-hidden", z(e) ? "border-primary-400 text-heading" : "border-transparent text-muted hover:border-line-strong hover:text-body"]),
							onClick: n
						}, C(e.label), 11, Vr)]),
						_: 2
					}, 1032, ["to"]))), 128))]),
					h.value && m.value === null ? (v(), a("div", Hr, [c(M, { class: "h-8 w-8 text-primary-500" })])) : (v(), r(I, {
						key: 1,
						project: m.value,
						onRefresh: L
					}, null, 8, ["project"])),
					c(jr, {
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
}), Wr = { class: "flex items-center justify-end space-x-5" }, Gr = { class: "relative table-container" }, Kr = { class: "flex items-center" }, qr = {
	key: 0,
	class: "block text-xs font-normal text-muted"
}, Jr = { key: 0 }, Yr = {
	key: 1,
	class: "text-subtle"
}, Xr = {
	key: 1,
	class: "text-subtle"
}, Zr = { key: 0 }, Qr = {
	key: 1,
	class: "text-subtle"
}, $r = 10, ei = 350, ti = /* @__PURE__ */ l({
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
				tdClass: "text-end text-sm font-medium"
			}
		]), F = n(() => j.search.trim() !== "" || j.status !== "ACTIVE"), I = n(() => !g.value && _.value === 0 && !F.value), L;
		E(() => j.search, () => {
			clearTimeout(L), L = setTimeout(() => z(), ei);
		}), E(() => j.status, () => z()), h(() => clearTimeout(L));
		async function R({ page: e, sort: n }) {
			let r = {
				page: e,
				limit: $r,
				...Ht(n, l)
			};
			j.status !== "ALL" && (r.status = j.status), j.search.trim() !== "" && (r.search = j.search.trim()), g.value = !0;
			try {
				let e = await Ut(t.client, r);
				return _.value = e.meta.total, e.data.some((e) => e.customer_id !== null) && tn(t.client), {
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
						limit: $r
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
				e.status === "ARCHIVED" ? (await qt(t.client, e.id), t.notify("success", u("tasks_projects.projects.unarchived", { name: e.name }))) : (await Kt(t.client, e.id), t.notify("success", u("tasks_projects.projects.archived", { name: e.name }))), z(!0);
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
					await Jt(t.client, e.id), t.notify("success", u("tasks_projects.projects.deleted", { name: e.name })), z(!0);
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
						actions: D(() => [o("div", Wr, [
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
					O(o("div", Gr, [c(pe, {
						ref_key: "tableRef",
						ref: d,
						data: R,
						columns: P.value,
						class: "mt-3"
					}, {
						"cell-name": D(({ row: e }) => [o("div", Kr, [o("span", {
							class: p(["me-3 inline-block h-2.5 w-2.5 shrink-0 rounded-full", e.data.colour ? "" : "bg-line-default"]),
							style: m(e.data.colour ? { backgroundColor: e.data.colour } : void 0)
						}, null, 6), o("span", null, [c(y, {
							class: "hover:text-primary-500",
							to: w(W).project(e.data.id)
						}, {
							default: D(() => [s(C(e.data.name), 1)]),
							_: 2
						}, 1032, ["to"]), e.data.identifier ? (v(), a("span", qr, C(e.data.identifier), 1)) : i("", !0)])])]),
						"cell-status": D(({ row: e }) => [c(le, { class: p(["rounded-full", se(e.data.status)]) }, {
							default: D(() => [s(C(ce(e.data.status)), 1)]),
							_: 2
						}, 1032, ["class"])]),
						"cell-customer": D(({ row: e }) => [e.data.customer_id ? (v(), a("span", Jr, C(w(en)(e.data.customer_id)), 1)) : (v(), a("span", Yr, C(w(u)("tasks_projects.projects.internal")), 1))]),
						"cell-default_rate": D(({ row: e }) => [e.data.default_rate === null ? (v(), a("span", Xr, "-")) : (v(), r(ue, {
							key: 0,
							amount: e.data.default_rate
						}, null, 8, ["amount"]))]),
						"cell-due_date": D(({ row: e }) => [e.data.due_date ? (v(), a("span", Zr, C(w(dt)(e.data.due_date)), 1)) : (v(), a("span", Qr, "-"))]),
						"cell-actions": D(({ row: e }) => [c(fe, {
							"content-loading": A.value === e.data.id,
							label: w(u)("tasks_projects.general.actions_for", { name: e.data.name })
						}, {
							activator: D(() => [c(g, {
								name: "EllipsisHorizontalIcon",
								class: "h-5 text-muted"
							})]),
							default: D(() => [
								c(de, { onClick: (t) => re(e.data) }, {
									default: D(() => [c(g, {
										name: "PencilIcon",
										class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + C(w(u)("tasks_projects.general.edit")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								c(de, { onClick: (t) => ae(e.data) }, {
									default: D(() => [c(g, {
										name: e.data.status === "ARCHIVED" ? "ArrowPathIcon" : "ArchiveBoxIcon",
										class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
									}, null, 8, ["name"]), s(" " + C(e.data.status === "ARCHIVED" ? w(u)("tasks_projects.projects.unarchive") : w(u)("tasks_projects.projects.archive")), 1)]),
									_: 2
								}, 1032, ["onClick"]),
								c(de, { onClick: (t) => oe(e.data) }, {
									default: D(() => [c(g, {
										name: "TrashIcon",
										class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
									}), s(" " + C(w(u)("tasks_projects.general.delete")), 1)]),
									_: 1
								}, 8, ["onClick"])
							]),
							_: 2
						}, 1032, ["content-loading", "label"])]),
						_: 1
					}, 8, ["columns"])], 512), [[T, !I.value]]),
					c(jr, {
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
}), ni = { class: "py-4" }, ri = { class: "rounded-xl border border-line-default bg-surface p-5" }, ii = { class: "flex flex-col gap-4 lg:flex-row lg:items-end" }, ai = {
	key: 0,
	class: "mt-3 text-xs text-subtle"
}, oi = { class: "mt-4 overflow-hidden rounded-xl border border-line-default bg-surface" }, si = {
	key: 0,
	class: "flex justify-center py-10"
}, ci = {
	key: 1,
	class: "px-5 py-8 text-center text-sm text-muted"
}, li = {
	key: 2,
	class: "divide-y divide-line-light"
}, ui = { class: "text-sm font-medium text-heading" }, di = { class: "text-xs text-muted" }, fi = {
	key: 1,
	class: "text-subtle"
}, pi = /* @__PURE__ */ l({
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
				f.value = await Yt(l.client);
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.tasks.members_failed")));
			}
			try {
				d.value = await yr(l.client, O.value);
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
					await br(l.client, O.value, {
						user_id: e.id,
						rate: ct(T.value)
					}), l.notify("success", u("tasks_projects.project.members.attached", { name: e.label })), y.value = null, T.value = "", await A();
				} catch (e) {
					E.value = ot(e), l.notify("error", H(e, u("tasks_projects.project.members.attach_failed")));
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
					await xr(l.client, O.value, e.user_id), l.notify("success", u("tasks_projects.project.members.detached", { name: t })), await A();
				} catch (e) {
					l.notify("error", H(e, u("tasks_projects.project.members.detach_failed")));
				} finally {
					_.value = null;
				}
			}
		}
		return (t, n) => {
			let l = S("BaseSelectInput"), f = S("BaseInputGroup"), g = S("BaseInput"), b = S("BaseIcon"), O = S("BaseButton"), A = S("BaseSpinner"), P = S("BaseFormatMoney");
			return v(), a("div", ni, [o("div", ri, [o("div", ii, [
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
			]), k.value.length === 0 && !m.value ? (v(), a("p", ai, C(w(u)("tasks_projects.project.members.all_attached")), 1)) : i("", !0)]), o("div", oi, [m.value ? (v(), a("div", si, [c(A, { class: "h-6 w-6 text-primary-500" })])) : d.value.length === 0 ? (v(), a("p", ci, C(w(u)("tasks_projects.project.members.empty")), 1)) : (v(), a("ul", li, [(v(!0), a(e, null, x(d.value, (e) => (v(), a("li", {
				key: e.id,
				class: "flex items-center justify-between px-5 py-4"
			}, [o("div", null, [o("p", ui, C(j(e.user_id)), 1), o("p", di, [s(C(w(u)("tasks_projects.project.members.rate")) + ": ", 1), e.rate === null ? (v(), a("span", fi, C(w(u)("tasks_projects.tasks.none")), 1)) : (v(), r(P, {
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
}), mi = {
	key: 0,
	class: "py-6"
}, hi = { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, gi = { class: "rounded-xl border border-line-default bg-surface p-5" }, _i = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, vi = { class: "mt-2 text-2xl font-semibold text-heading" }, yi = { class: "mt-1 text-xs text-muted" }, bi = { class: "rounded-xl border border-line-default bg-surface p-5" }, xi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Si = { class: "mt-2 text-2xl font-semibold text-heading" }, Ci = { class: "mt-1 text-xs text-muted" }, wi = { class: "rounded-xl border border-line-default bg-surface p-5" }, Ti = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ei = { class: "mt-2 text-2xl font-semibold text-heading" }, Di = { class: "rounded-xl border border-line-default bg-surface p-5" }, Oi = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ki = { class: "mt-2 text-2xl font-semibold text-heading" }, Ai = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, ji = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Mi = { class: "mt-2 text-sm text-body" }, Ni = { class: "mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Pi = {
	key: 0,
	class: "mt-2 text-xs font-medium text-status-red"
}, Fi = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Ii = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, Li = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ri = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, zi = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Bi = {
	key: 1,
	class: "flex justify-center py-16"
}, Vi = /* @__PURE__ */ l({
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
			e !== null && y.value && !b.value && (await xt({
				client: u.client,
				router: u.router,
				notify: u.notify,
				t: f
			}, { projectId: e.id }) || d("refresh"));
		}
		return (n, l) => {
			let u = S("BaseFormatMoney"), d = S("BaseIcon"), E = S("BaseButton"), O = S("BaseSpinner");
			return t.project && h.value ? (v(), a("div", mi, [
				o("div", hi, [
					o("div", gi, [
						o("p", _i, C(w(f)("tasks_projects.project.overview.tasks")), 1),
						o("p", vi, C(h.value.tasks.total), 1),
						o("p", yi, C(w(f)("tasks_projects.project.overview.open_tasks", { count: h.value.tasks.open })) + " · " + C(w(f)("tasks_projects.project.overview.closed_tasks", { count: h.value.tasks.closed })), 1)
					]),
					o("div", bi, [
						o("p", xi, C(w(f)("tasks_projects.project.overview.logged")), 1),
						o("p", Si, C(w(pt)(h.value.logged_minutes)), 1),
						o("p", Ci, C(w(f)("tasks_projects.project.overview.billable")) + ": " + C(w(pt)(h.value.billable_minutes)), 1)
					]),
					o("div", wi, [o("p", Ti, C(w(f)("tasks_projects.project.overview.billable_amount")), 1), o("p", Ei, [c(u, { amount: h.value.billable_amount }, null, 8, ["amount"])])]),
					o("div", Di, [
						o("p", Oi, C(w(f)("tasks_projects.project.overview.unbilled_amount")), 1),
						o("p", ki, [c(u, { amount: h.value.unbilled_amount }, null, 8, ["amount"])]),
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
				o("div", Ai, [o("p", ji, C(w(f)("tasks_projects.project.overview.budget")), 1), g.value ? (v(), a(e, { key: 0 }, [
					o("p", Mi, C(w(f)("tasks_projects.project.overview.budget_used", {
						used: w(pt)(h.value.logged_minutes),
						total: w(pt)(g.value)
					})), 1),
					o("div", Ni, [o("div", {
						class: p(["h-2 rounded-full", x.value > 0 ? "bg-status-red" : "bg-primary-500"]),
						style: m({ width: `${_.value}%` })
					}, null, 6)]),
					x.value > 0 ? (v(), a("p", Pi, C(w(f)("tasks_projects.project.overview.budget_over", { amount: w(pt)(x.value) })), 1)) : i("", !0)
				], 64)) : (v(), a("p", Fi, C(w(f)("tasks_projects.project.overview.no_budget")), 1))]),
				o("div", Ii, [o("p", Li, C(w(f)("tasks_projects.project.overview.description")), 1), t.project.description ? (v(), a("p", Ri, C(t.project.description), 1)) : (v(), a("p", zi, C(w(f)("tasks_projects.project.overview.no_description")), 1))])
			])) : (v(), a("div", Bi, [c(O, { class: "h-8 w-8 text-primary-500" })]));
		};
	}
}), Hi = {
	project: "",
	user: "",
	status: "",
	search: ""
};
function Ui(e) {
	return e === "uninvoiced" || e === "invoiced";
}
function Wi(e) {
	return {
		project: Qi(e.project),
		user: Qi(e.user),
		status: $i(e.status),
		search: Zi(e.search).slice(0, 200)
	};
}
function Gi(e) {
	let t = {};
	for (let n of [
		"project",
		"user",
		"status",
		"search"
	]) e[n] !== "" && (t[n] = e[n]);
	return t;
}
function Ki(e) {
	return e.project !== "" || e.user !== "" || e.status !== "" || e.search !== "";
}
function qi(e) {
	return [
		e.project,
		e.user,
		e.status,
		e.search
	].join("|");
}
function Ji(e, t) {
	return e.project === t.project && e.user === t.user && e.status === t.status && e.search === t.search;
}
function Yi(e, t = {}) {
	let n = {}, r = t.projectId ?? Xi(e.project);
	r !== null && (n.project_id = r);
	let i = Xi(e.user);
	if (i !== null && (n.assignee_id = i), Ui(e.status)) n.invoiced = +(e.status === "invoiced");
	else {
		let t = Xi(e.status);
		t !== null && (n.task_status_id = t);
	}
	return e.search !== "" && (n.search = e.search), n;
}
function Xi(e) {
	let t = Number(e);
	return e !== "" && Number.isInteger(t) && t > 0 ? t : null;
}
function Zi(e) {
	let t = Array.isArray(e) ? e[0] : e;
	return typeof t == "string" ? t.trim() : "";
}
function Qi(e) {
	let t = Zi(e);
	return Xi(t) === null ? "" : t;
}
function $i(e) {
	let t = Zi(e);
	return Ui(t) ? t : Qi(e);
}
//#endregion
//#region resources/js/components/TaskFilters.vue?vue&type=script&setup=true&lang.ts
var ea = { class: "mt-4 flex flex-wrap items-end gap-3" }, ta = {
	key: 0,
	class: "min-w-44 flex-1"
}, na = { class: "mb-1 block text-xs font-medium text-muted" }, ra = { class: "min-w-44 flex-1" }, ia = { class: "mb-1 block text-xs font-medium text-muted" }, aa = { class: "min-w-44 flex-1" }, oa = { class: "mb-1 block text-xs font-medium text-muted" }, sa = { class: "min-w-44 flex-1" }, ca = { class: "mb-1 block text-xs font-medium text-muted" }, la = 350, ua = /* @__PURE__ */ l({
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
		}), x = n(() => Ki(r.modelValue));
		E(() => r.modelValue.search, (e) => {
			e !== u.value && (u.value = e);
		}), E(u, (e) => {
			clearTimeout(d), d = setTimeout(() => D({ search: e.trim() }), la);
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
			u.value = "", s("update:modelValue", { ...Hi });
		}
		return (t, n) => {
			let r = S("BaseSelectInput"), s = S("BaseInput");
			return v(), a("div", ea, [
				e.lockProject ? i("", !0) : (v(), a("label", ta, [o("span", na, C(w(l)("tasks_projects.tasks.filters.project")), 1), c(r, {
					modelValue: g.value,
					"onUpdate:modelValue": n[0] ||= (e) => g.value = e,
					options: f.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])])),
				o("label", ra, [o("span", ia, C(w(l)("tasks_projects.tasks.filters.member")), 1), c(r, {
					modelValue: _.value,
					"onUpdate:modelValue": n[1] ||= (e) => _.value = e,
					options: p.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", aa, [o("span", oa, C(w(l)("tasks_projects.tasks.filters.status")), 1), c(r, {
					modelValue: y.value,
					"onUpdate:modelValue": n[2] ||= (e) => y.value = e,
					options: m.value,
					"label-key": "label"
				}, null, 8, ["modelValue", "options"])]),
				o("label", sa, [o("span", ca, C(w(l)("tasks_projects.tasks.filters.search")), 1), c(s, {
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
}), da = {
	key: 0,
	class: "mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2.5"
}, fa = { class: "text-sm font-medium text-primary-700" }, pa = { class: "min-w-48" }, ma = /* @__PURE__ */ l({
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
			return e.count > 0 ? (v(), a("div", da, [
				o("span", fa, C(w(d)("tasks_projects.tasks.bulk.selected", { count: e.count })), 1),
				o("div", pa, [c(l, {
					modelValue: f.value,
					"onUpdate:modelValue": n[0] ||= (e) => f.value = e,
					options: m.value,
					disabled: e.busy,
					placeholder: w(d)("tasks_projects.tasks.bulk.change_status"),
					"aria-label": w(d)("tasks_projects.tasks.bulk.change_status"),
					"label-key": "label"
				}, null, 8, [
					"modelValue",
					"options",
					"disabled",
					"placeholder",
					"aria-label"
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
					class: "ms-auto text-sm font-medium text-primary-600 hover:underline",
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
}), ha = /* @__PURE__ */ l({
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
}), ga = [
	"LOW",
	"NORMAL",
	"HIGH",
	"URGENT"
], _a = { class: "flex w-full items-center justify-between" }, va = {
	key: 0,
	class: "ms-2 text-sm font-normal text-muted"
}, ya = ["aria-label"], ba = { class: "space-y-5 px-6 py-6" }, xa = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Sa = { key: 1 }, Ca = { class: "flex space-x-3" }, wa = /* @__PURE__ */ l({
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
		}))), L = n(() => ga.map((e, t) => ({
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
			f.name = e?.name ?? "", f.description = e?.description ?? "", f.estimateHours = lt(e?.estimated_minutes ?? null), f.rate = st(e?.rate ?? null), f.dueDate = e?.due_date ?? "", f.billable = e?.billable ?? !0;
			let t = l.statuses.find((e) => e.is_default) ?? l.statuses[0], n = e?.task_status_id ?? l.defaults?.task_status_id ?? t?.id ?? null;
			p.value = R(F.value, n), m.value = e?.project_id ?? l.defaults?.project_id ?? null, h.value = R(I.value, e?.assignee_id ?? null), g.value = e?.priority ? L.value[ga.indexOf(e.priority)] ?? null : null, _.value = e?.customer_id ?? null, x.value = {}, k.value = !1, _.value !== null && tn(l.client);
		}
		function ee(e) {
			f.dueDate = e ? ft(e) : "";
		}
		function te() {
			let e = p.value?.id ?? null;
			if (e === null) return null;
			let t = g.value === null ? null : ga[g.value.id];
			return {
				name: f.name.trim(),
				task_status_id: e,
				project_id: m.value,
				customer_id: m.value === null ? _.value : null,
				description: f.description.trim() || null,
				assignee_id: h.value?.id ?? null,
				priority: t,
				due_date: f.dueDate || null,
				estimated_minutes: ut(f.estimateHours),
				billable: f.billable,
				rate: ct(f.rate)
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
				let t = l.task, n = t ? await ur(l.client, t.id, e) : await lr(l.client, e);
				u("saved", n);
			} catch (e) {
				x.value = ot(e), l.notify("error", re(e, "save_failed"));
			} finally {
				T.value = !1;
			}
		}
		function re(e, t) {
			return _t(e) === "task_locked" ? d("tasks_projects.tasks.locked") : H(e, d(`tasks_projects.tasks.${t}`));
		}
		async function ie() {
			let e = l.task;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await dr(l.client, e.id), u("deleted", e);
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
				header: D(() => [o("div", _a, [o("span", null, [s(C(P.value) + " ", 1), e.task ? (v(), a("span", va, "#" + C(e.task.number), 1)) : i("", !0)]), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(d)("tasks_projects.general.close"),
					onClick: n[0] ||= (e) => u("close")
				}, [c(l, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, ya)])]),
				default: D(() => [o("form", { onSubmit: A(ne, ["prevent"]) }, [o("div", ba, [
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
									"model-value": w(en)(_.value),
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
				]), o("div", xa, [N.value ? (v(), r(te, {
					key: 0,
					type: "button",
					variant: "danger",
					loading: O.value,
					disabled: O.value,
					onClick: ie
				}, {
					default: D(() => [s(C(w(d)("tasks_projects.general.delete")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : (v(), a("span", Sa)), o("div", Ca, [c(te, {
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
}), Ta = {
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
	settings: { ...Ta },
	companySession: 0,
	loading: !1
});
async function Ea(e) {
	if (G.adminMode) return;
	G.loading = !0;
	let [t, n] = await Promise.all([Ge(e).catch(() => null), We(e).catch(() => null)]);
	G.userId = t, G.settings = ka(n), G.loading = !1;
}
function Da() {
	G.userId = null, G.settings = { ...Ta }, G.companySession += 1, G.loading = !1;
}
function Oa(e) {
	G.adminMode = e;
}
function ka(e) {
	if (typeof e != "object" || !e) return { ...Ta };
	let t = Array.isArray(e.rounding_increments) ? e.rounding_increments.filter((e) => typeof e == "number") : Ta.rounding_increments;
	return {
		default_rate: Aa(e.default_rate, Ta.default_rate),
		rounding_minutes: Aa(e.rounding_minutes, Ta.rounding_minutes),
		rounding_direction: Ma(e.rounding_direction),
		week_start: Na(e.week_start),
		members_see_all_time: e.members_see_all_time === !0,
		auto_start_tasks: ja(e.auto_start_tasks, Ta.auto_start_tasks),
		lock_invoiced_tasks: ja(e.lock_invoiced_tasks, Ta.lock_invoiced_tasks),
		hide_invoiced_on_board: ja(e.hide_invoiced_on_board, Ta.hide_invoiced_on_board),
		invoice_project_heading: ja(e.invoice_project_heading, Ta.invoice_project_heading),
		invoice_task_description: ja(e.invoice_task_description, Ta.invoice_task_description),
		invoice_entry_dates: ja(e.invoice_entry_dates, Ta.invoice_entry_dates),
		invoice_entry_times: ja(e.invoice_entry_times, Ta.invoice_entry_times),
		invoice_entry_hours: ja(e.invoice_entry_hours, Ta.invoice_entry_hours),
		invoice_entry_descriptions: ja(e.invoice_entry_descriptions, Ta.invoice_entry_descriptions),
		rounding_increments: t.length > 0 ? t : Ta.rounding_increments
	};
}
function Aa(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function ja(e, t) {
	return typeof e == "boolean" ? e : t;
}
function Ma(e) {
	return e === "up" || e === "down" || e === "nearest" ? e : Ta.rounding_direction;
}
function Na(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= 6 ? e : Ta.week_start;
}
//#endregion
//#region resources/js/support/time.ts
var Pa = 60, Fa = 60, Ia = 7;
function La(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / Fa), i = t % Fa;
	return `${n}:${to(r)}:${to(i)}`;
}
function Ra(e) {
	let t = e !== null && Number.isFinite(e) && e > 0 ? Math.round(e) : 0;
	return `${Math.floor(t / Pa)}:${to(t % Pa)}`;
}
function za(e) {
	let t = e.trim();
	if (t === "") return null;
	let n = /^(\d+):([0-5]?\d)$/.exec(t);
	if (n) return Number(n[1]) * Pa + Number(n[2]);
	if (!/^\d+([.,]\d+)?$/.test(t)) return null;
	let r = Number(t.replace(",", "."));
	return Number.isNaN(r) ? null : Math.round(r * Pa);
}
function Ba(e, t, n = "nearest") {
	let r = Number.isFinite(t) && t >= 1 ? Math.floor(t) : 1, i = Number.isFinite(e) ? Math.floor(e) : 0;
	return i <= 0 ? 0 : n === "up" ? Math.ceil(i / r) * r : n === "down" ? Math.floor(i / r) * r : i < r ? r : Math.round(i / r) * r;
}
function Va(e) {
	let t = Qa(e);
	return t === null ? "" : Ja(t);
}
function Ha(e) {
	let t = Qa(e);
	return t === null ? "" : `${to(t.getHours())}:${to(t.getMinutes())}`;
}
function Ua(e, t = "09:00") {
	let n = $a(e), r = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
	if (n === null || r === null) return null;
	let i = Number(r[1]);
	return i > 23 ? null : (n.setHours(i, Number(r[2]), 0, 0), n.toISOString());
}
function Wa(e, t) {
	let n = new Date(e);
	return n.setTime(n.getTime() + t * Fa * 1e3), n.toISOString();
}
function Ga(e, t) {
	let n = Number.isInteger(t) && t >= 0 && t <= 6 ? t : 1, r = eo(e), i = (r.getDay() - n + Ia) % Ia;
	return r.setDate(r.getDate() - i), r;
}
function Ka(e) {
	return Array.from({ length: Ia }, (t, n) => qa(e, n));
}
function qa(e, t) {
	let n = eo(e);
	return n.setDate(n.getDate() + t), n;
}
function Ja(e) {
	return `${e.getFullYear()}-${to(e.getMonth() + 1)}-${to(e.getDate())}`;
}
function Ya(e) {
	return {
		weekday: e.toLocaleDateString(void 0, { weekday: "short" }),
		day: e.toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		})
	};
}
function Xa(e) {
	return Ja(e) === Ja(/* @__PURE__ */ new Date());
}
function Za(e, t) {
	let n = Qa(e);
	return n === null ? 0 : Math.max(0, Math.floor((t - n.getTime()) / 1e3));
}
function Qa(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function $a(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.trim());
	if (t === null) return null;
	let n = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), 0, 0, 0, 0);
	return Number.isNaN(n.getTime()) ? null : n;
}
function eo(e) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function to(e) {
	return String(e).padStart(2, "0");
}
//#endregion
//#region resources/js/stores/timer.ts
var K = y({
	running: null,
	busy: !1,
	stopPrompt: null,
	startPrompt: null
}), no = y({ now: Date.now() }), ro, io = 0;
function ao() {
	no.now = Date.now();
}
function oo() {
	io += 1, ro === void 0 && (ao(), ro = setInterval(ao, 1e3));
}
function so() {
	io = Math.max(0, io - 1), io === 0 && ro !== void 0 && (clearInterval(ro), ro = void 0);
}
function co() {
	return oo(), _(so, !0), n(() => no.now);
}
var lo = !1;
function uo(e, t) {
	if (K.running = e && typeof e.id == "number" ? e : null, K.running === null) {
		lo && (lo = !1, so());
		return;
	}
	lo || (lo = !0, oo()), t && typeof K.running.task_id == "number" && et(t, [K.running.task_id]);
}
function fo(e, t, n) {
	e?.notify("error", H(t, e.t(n)));
}
function po(e) {
	nt(e.task_id, { running: [{
		entry_id: e.id,
		user_id: e.user_id,
		started_at: e.started_at
	}] });
}
async function mo(e, t, n) {
	try {
		let n = await lr(e, {
			name: t.name,
			project_id: t.projectId
		});
		return $e(n), V(), typeof n.id == "number" ? n.id : null;
	} catch (e) {
		return fo(n, e, "tasks_projects.tasks.save_failed"), null;
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
		return K.running === null ? 0 : Za(K.running.started_at, no.now);
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
			uo(await Ne(e), e);
		} catch {
			uo(null);
		}
	},
	async start(e, t, n = null, r) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let r = await Pe(e, {
				task_id: t,
				description: n
			});
			return uo(r, e), po(r), V(), r;
		} catch (t) {
			return vt(t) ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : fo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			K.busy = !1;
		}
	},
	async startOnTask(e, t, n = null, r, i) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let r = await pr(e, t, n, i);
			return uo(r, e), po(r), V(), r;
		} catch (t) {
			return _t(t) === "timer_already_running" ? (r?.notify("warning", r.t("tasks_projects.timer.already_running")), await this.refresh(e)) : fo(r, t, "tasks_projects.timer.start_failed"), null;
		} finally {
			K.busy = !1;
		}
	},
	async stop(e, t, n) {
		if (K.busy || K.running === null) return null;
		let r = K.running.task_id;
		K.busy = !0;
		try {
			let t = await Fe(e, n);
			return uo(null), nt(r, { running: [] }), V(), t;
		} catch (n) {
			return fo(t, n, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
		} finally {
			K.busy = !1;
		}
	},
	async stopOnTask(e, t, n, r) {
		if (K.busy) return null;
		K.busy = !0;
		try {
			let n = await mr(e, t, r);
			return uo(null), nt(t, { running: [] }), V(), n;
		} catch (t) {
			return _t(t) === "timer_mismatch" ? n?.notify("warning", n.t("tasks_projects.timer.mismatch")) : fo(n, t, "tasks_projects.timer.stop_failed"), await this.refresh(e), null;
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
		let a = Qe(r.task_id), o = await this.askStop();
		if (o === null) return null;
		if (o.action === "discard") return await this.discard(e, t) && t?.notify("success", t.t("tasks_projects.timer.discarded")), null;
		let s = {
			description: o.description,
			billable: o.billable
		}, c = typeof i == "number" ? await this.stopOnTask(e, i, t, s) : await this.stop(e, t, s);
		return c !== null && t?.notify("success", t.t("tasks_projects.timer.stopped", {
			name: a,
			duration: Ra(c.duration_minutes)
		})), c;
	},
	async startWithPrompt(e, t, n = {}) {
		let r = await this.askStart(n);
		if (r === null) return null;
		let i = "taskId" in r ? r.taskId : await mo(e, r.create, t);
		if (i === null) return null;
		let a = await this.startOnTask(e, i, r.description, t, r.billable);
		return a !== null && t?.notify("success", t.t("tasks_projects.timer.started", { name: Qe(i) })), a;
	},
	async discard(e, t) {
		if (K.busy || K.running === null) return !1;
		let n = K.running.task_id;
		K.busy = !0;
		try {
			return await Ie(e), uo(null), nt(n, { running: [] }), V(), !0;
		} catch (n) {
			return fo(t, n, "tasks_projects.timer.discard_failed"), await this.refresh(e), !1;
		} finally {
			K.busy = !1;
		}
	},
	reset() {
		this.answerStop(null), this.answerStart(null), K.busy = !1, uo(null);
	}
}, ho = { class: "flex items-center gap-1.5" }, go = [
	"disabled",
	"title",
	"aria-label"
], _o = ["title", "aria-label"], vo = ["disabled", "title"], yo = [
	"disabled",
	"title",
	"aria-label"
], bo = ["title"], xo = /* @__PURE__ */ l({
	__name: "TaskRunControl",
	props: {
		client: {},
		notify: {},
		task: {},
		members: { default: () => [] },
		size: { default: "sm" }
	},
	setup(t) {
		let r = t, i = B(), l = co(), u = n(() => ({
			notify: r.notify,
			t: i
		})), d = n(() => q.isRunningOn(r.task.id)), f = n(() => q.runningTaskId !== null && !d.value), m = n(() => Qe(q.runningTaskId)), h = n(() => rt(r.task).running.filter((e) => e.user_id !== G.userId && e.entry_id !== q.running?.id)), g = n(() => La(q.elapsedSeconds)), _ = n(() => r.size === "md" ? "h-5 w-5" : "h-4 w-4"), y = n(() => r.size === "md" ? "p-2" : "p-1.5");
		function b(e) {
			return r.members.find((t) => t.id === e)?.name ?? `#${e}`;
		}
		function T(e) {
			let t = r.members.find((t) => t.id === e);
			return t ? mt(t.name) : "?";
		}
		function E(e) {
			return La(Za(e.started_at, l.value));
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
			return v(), a("div", ho, [d.value ? (v(), a(e, { key: 0 }, [o("button", {
				type: "button",
				class: p(["rounded-md text-status-red hover:bg-hover disabled:opacity-50", y.value]),
				disabled: w(q).busy,
				title: w(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				"aria-label": w(i)("tasks_projects.timer.stop_on", { name: t.task.name }),
				onClick: A(k, ["stop"])
			}, [c(l, {
				name: "StopIcon",
				class: p(_.value)
			}, null, 8, ["class"])], 10, go), o("span", { class: p(["font-medium tabular-nums text-primary-500", t.size === "md" ? "text-base" : "text-xs"]) }, C(g.value), 3)], 64)) : f.value ? (v(), a(e, { key: 1 }, [o("button", {
				type: "button",
				class: p(["cursor-not-allowed rounded-md text-subtle", y.value]),
				disabled: "",
				title: w(i)("tasks_projects.timer.busy_elsewhere", { name: m.value }),
				"aria-label": w(i)("tasks_projects.timer.busy_elsewhere", { name: m.value })
			}, [c(l, {
				name: "PlayIcon",
				class: p(_.value)
			}, null, 8, ["class"])], 10, _o), o("button", {
				type: "button",
				class: "rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary-500 hover:bg-hover disabled:opacity-50",
				disabled: w(q).busy,
				title: w(i)("tasks_projects.timer.stop_and_start"),
				onClick: A(j, ["stop"])
			}, C(w(i)("tasks_projects.timer.stop_and_start")), 9, vo)], 64)) : (v(), a("button", {
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
			}, null, 8, ["class"])], 10, yo)), (v(!0), a(e, null, x(h.value, (e) => (v(), a("span", {
				key: e.entry_id,
				class: "flex items-center gap-1 rounded-full bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-muted",
				title: D(e)
			}, [c(l, {
				name: "ClockIcon",
				class: "h-3.5 w-3.5 text-primary-500"
			}), s(" " + C(T(e.user_id)), 1)], 8, bo))), 128))]);
		};
	}
}), So = { class: "relative table-container" }, Co = { class: "inline-flex items-center whitespace-nowrap" }, wo = { class: "tabular-nums" }, To = {
	key: 1,
	class: "text-subtle"
}, Eo = ["title"], Do = 10, Oo = "whitespace-nowrap px-3 py-3 text-start text-xs font-medium text-muted uppercase tracking-wider", ko = "px-3 py-4 text-sm text-muted whitespace-nowrap", Ao = /* @__PURE__ */ l({
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
				tdClass: "text-end text-sm font-medium"
			}
		].map((e) => ({
			defaultThClass: Oo,
			defaultTdClass: ko,
			...e
		})));
		E(() => qi(d.filters), () => ie()), E(() => d.projectId, () => ie()), E(tt, () => ie(!0));
		async function re({ page: e, sort: t }) {
			let n = Ht(t, h), r = {
				page: e,
				limit: Do,
				...Yi(d.filters, { projectId: d.projectId }),
				...n
			};
			y.value = !0;
			try {
				let e = await cr(d.client, r), t = e.data ?? [], n = e.meta;
				return x.value = n?.total ?? t.length, k.value = t, A.value = A.value.filter((e) => t.some((t) => t.id === e)), {
					data: t,
					pagination: {
						totalPages: n?.last_page ?? 1,
						currentPage: n?.current_page ?? 1,
						totalCount: n?.total ?? t.length,
						limit: n?.per_page ?? Do
					}
				};
			} catch (e) {
				return d.notify("error", H(e, g("tasks_projects.tasks.load_failed"))), k.value = [], {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: Do
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
			return Ra(rt(e).logged_minutes);
		}
		function ge(e) {
			return rt(e).invoiced === "uninvoiced";
		}
		function _e(e) {
			return rt(e).invoiced === "invoiced" ? g("tasks_projects.tasks.already_invoiced") : g("tasks_projects.tasks.nothing_to_invoice");
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
					await xt(ve.value, { taskIds: [e.id] });
				} finally {
					I.value = null;
				}
			}
		}
		async function be() {
			R.value || A.value.length === 0 || await xt(ve.value, { taskIds: [...A.value] }) && ce();
		}
		async function xe(e) {
			if (window.confirm(g("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				I.value = e.id;
				try {
					await dr(d.client, e.id), d.notify("success", g("tasks_projects.tasks.deleted", { name: e.name })), V(), f("changed");
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
					let n = await gr(d.client, e);
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
				c(ma, {
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
				O(o("div", So, [c(k, {
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
						class: p(["mt-0.5 block text-xs font-normal", w(ht)(e.data.due_date) && !e.data.closed_at ? "font-medium text-status-red" : "text-muted"])
					}, C(w(g)("tasks_projects.tasks.columns.due_date")) + ": " + C(w(dt)(e.data.due_date)), 3)) : i("", !0)]),
					"cell-status": D(({ row: e }) => [o("span", Co, [o("span", {
						class: p(["me-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", pe(e.data)?.colour ? "" : "bg-line-default"]),
						style: m(pe(e.data)?.colour ? { backgroundColor: pe(e.data)?.colour } : void 0)
					}, null, 6), s(" " + C(pe(e.data)?.name ?? "-"), 1)])]),
					"cell-assignee": D(({ row: e }) => [o("span", { class: p(e.data.assignee_id === null ? "text-subtle" : "") }, C(me(e.data)), 3)]),
					"cell-logged": D(({ row: e }) => [o("span", wo, C(he(e.data)), 1)]),
					"cell-unbilled": D(({ row: e }) => [w(rt)(e.data).unbilled_amount > 0 ? (v(), r(b, {
						key: 0,
						amount: w(rt)(e.data).unbilled_amount
					}, null, 8, ["amount"])) : (v(), a("span", To, "-"))]),
					"cell-invoiced": D(({ row: e }) => [c(ha, { state: w(rt)(e.data).invoiced }, null, 8, ["state"])]),
					"cell-timer": D(({ row: e }) => [c(xo, {
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
					"cell-actions": D(({ row: t }) => [c(E, {
						"content-loading": I.value === t.data.id,
						label: w(g)("tasks_projects.general.actions_for", { name: t.data.name })
					}, {
						activator: D(() => [c(u, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [
							c(x, { onClick: (e) => ue(t.data) }, {
								default: D(() => [c(u, {
									name: "PencilIcon",
									class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.general.edit")), 1)]),
								_: 1
							}, 8, ["onClick"]),
							z.value ? (v(), a(e, { key: 0 }, [ge(t.data) && !R.value ? (v(), r(x, {
								key: 0,
								onClick: (e) => ye(t.data)
							}, {
								default: D(() => [c(u, {
									name: "BanknotesIcon",
									class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.tasks.invoice_task")), 1)]),
								_: 1
							}, 8, ["onClick"])) : (v(), a("div", {
								key: 1,
								class: "group flex cursor-not-allowed items-center px-4 py-2 text-sm font-normal text-subtle",
								title: R.value ? w(g)("tasks_projects.billing.busy") : _e(t.data)
							}, [c(u, {
								name: "BanknotesIcon",
								class: "me-3 h-5 w-5 text-subtle"
							}), s(" " + C(w(g)("tasks_projects.tasks.invoice_task")), 1)], 8, Eo))], 64)) : i("", !0),
							c(x, { onClick: (e) => xe(t.data) }, {
								default: D(() => [c(u, {
									name: "TrashIcon",
									class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
								}), s(" " + C(w(g)("tasks_projects.general.delete")), 1)]),
								_: 1
							}, 8, ["onClick"])
						]),
						_: 2
					}, 1032, ["content-loading", "label"])]),
					_: 1
				}, 8, ["columns"])], 512), [[T, !te.value]]),
				c(wa, {
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
}), jo = { class: "py-4" }, Mo = { class: "flex flex-wrap items-end justify-between gap-3" }, No = /* @__PURE__ */ l({
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
		let r = e, i = t, l = B(), u = b(null), d = b([]), f = b([]), m = b({ ...Hi }), h = n(() => r.project?.id ?? Number(r.id)), _ = n(() => r.project === null ? [] : [r.project]);
		g(() => void y());
		async function y() {
			try {
				d.value = await sr(r.client);
			} catch (e) {
				r.notify("error", H(e, l("tasks_projects.task_statuses.load_failed")));
			}
			try {
				f.value = await Yt(r.client);
			} catch {
				f.value = [];
			}
		}
		function x() {
			i("refresh");
		}
		return (t, n) => {
			let r = S("BaseIcon"), i = S("BaseButton");
			return v(), a("div", jo, [o("div", Mo, [c(ua, {
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
			})]), c(Ao, {
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
}), Po = { class: "flex w-full items-center justify-between" }, Fo = ["aria-label"], Io = { class: "space-y-5 px-6 py-6" }, Lo = {
	key: 0,
	class: "rounded-md bg-alert-warning-bg px-3 py-2 text-sm text-alert-warning-text"
}, Ro = { class: "inline-flex overflow-hidden rounded-md border border-line-default" }, zo = ["disabled", "onClick"], Bo = {
	key: 1,
	class: "text-sm text-muted"
}, Vo = { class: "flex items-center justify-between border-t border-line-default px-6 py-4" }, Ho = { key: 1 }, Uo = { class: "flex space-x-3" }, Wo = "09:00", Go = /* @__PURE__ */ l({
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
			start: Wo,
			end: "",
			description: "",
			billable: !0
		}), g = b(null), _ = b({}), T = b(!1), O = b(!1), k = n(() => u.entry !== null), j = n(() => u.entry?.invoice_id != null), M = n(() => j.value ? m("tasks_projects.time.view_entry") : k.value ? m("tasks_projects.time.edit_entry") : m("tasks_projects.time.new_entry"));
		E(() => u.show, (e) => {
			e && N();
		}, { immediate: !0 });
		function N() {
			let e = u.entry;
			_.value = {}, g.value = e === null ? u.defaultTask ?? null : null, h.date = e ? Va(e.started_at) : u.defaultDate ?? Ja(/* @__PURE__ */ new Date()), h.duration = e ? Ra(e.duration_minutes) : "", h.start = e?.started_at ? Ha(e.started_at) : Wo, h.end = e?.ended_at ? Ha(e.ended_at) : "", h.description = e?.description ?? "", h.billable = e ? e.billable : g.value?.billable ?? !0, h.mode = e !== null && P(e) ? "range" : "duration", h.date === "" && (h.date = u.defaultDate ?? Ja(/* @__PURE__ */ new Date())), e !== null && F(e.task_id);
		}
		function P(e) {
			if (!e.started_at || !e.ended_at) return !1;
			let t = new Date(e.started_at).getTime(), n = new Date(e.ended_at).getTime();
			return Number.isNaN(t) || Number.isNaN(n) ? !1 : Math.round((n - t) / 6e4) === e.duration_minutes;
		}
		async function F(e) {
			try {
				let t = await Ue(u.client, e);
				g.value = t, $e(t);
			} catch {}
		}
		async function I(e) {
			try {
				let t = await He(u.client, e ?? "");
				return t.forEach($e), t;
			} catch (e) {
				return u.notify("error", H(e, m("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function L(e) {
			h.date = e ? ft(e) : "";
		}
		function R(e) {
			g.value = e, e !== null && u.entry === null && (h.billable = e.billable !== !1);
		}
		function z() {
			let e = {}, t = g.value;
			(t === null || typeof t.id != "number") && (e.task_id = m("tasks_projects.time.task_required")), h.date === "" && (e.date = m("tasks_projects.time.date_required"));
			let n = Ua(h.date, h.mode === "range" ? h.start : Wo);
			n === null && (e.started_at = m("tasks_projects.time.range_invalid"));
			let r = h.mode === "duration" ? za(h.duration) : null;
			h.mode === "duration" && r === null && (e.duration_minutes = m("tasks_projects.time.duration_invalid"));
			let i = h.mode === "range" ? Ua(h.date, h.end) : null;
			if (h.mode === "range" && (i === null || n === null || i <= n) && (e.ended_at = m("tasks_projects.time.range_invalid")), _.value = e, Object.keys(e).length > 0 || t === null || n === null) return null;
			let a = {
				task_id: t.id,
				started_at: n,
				description: h.description.trim() || null,
				billable: h.billable
			};
			return h.mode === "duration" && r !== null ? (a.duration_minutes = r, a.ended_at = Wa(n, r)) : a.ended_at = i, a;
		}
		async function ee() {
			if (T.value || j.value) return;
			let e = z();
			if (e !== null) {
				T.value = !0;
				try {
					let t = u.entry, n = t ? await je(u.client, t.id, e) : await Ae(u.client, e);
					d("saved", n);
				} catch (e) {
					_.value = ot(e), u.notify("error", H(e, m("tasks_projects.time.save_failed")));
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
					await Me(u.client, e.id), d("deleted", e);
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
				header: D(() => [o("div", Po, [o("span", null, C(M.value), 1), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(m)("tasks_projects.general.close"),
					onClick: l[0] ||= (e) => d("close")
				}, [c(u, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, Fo)])]),
				default: D(() => [o("form", { onSubmit: A(ee, ["prevent"]) }, [o("div", Io, [
					j.value ? (v(), a("p", Lo, C(w(m)("tasks_projects.time.stamped_notice")), 1)) : i("", !0),
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
							default: D(() => [o("div", Ro, [(v(), a(e, null, x(f, (e) => o("button", {
								key: e,
								type: "button",
								class: p(["px-3 py-2 text-sm", h.mode === e ? "bg-primary-500 text-white" : "bg-surface text-body hover:bg-hover"]),
								disabled: j.value,
								onClick: (t) => h.mode = e
							}, C(w(m)(`tasks_projects.time.mode.${e}`)), 11, zo)), 64))])]),
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
						default: D(() => [j.value ? (v(), a("span", Bo, C(h.billable ? w(m)("tasks_projects.time.billable") : w(m)("tasks_projects.time.non_billable")), 1)) : (v(), r(z, {
							key: 0,
							modelValue: h.billable,
							"onUpdate:modelValue": l[6] ||= (e) => h.billable = e,
							class: "flex"
						}, null, 8, ["modelValue"]))]),
						_: 1
					}, 8, ["label", "error"])
				]), o("div", Vo, [k.value && !j.value ? (v(), r(B, {
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
				}, 8, ["loading", "disabled"])) : (v(), a("span", Ho)), o("div", Uo, [c(B, {
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
}), Ko = { class: "py-4" }, qo = { class: "flex justify-end" }, Jo = { class: "relative mt-3 table-container" }, Yo = { class: "font-medium text-heading" }, Xo = {
	key: 0,
	class: "block text-xs text-muted"
}, Zo = {
	key: 1,
	class: "text-subtle"
}, Qo = {
	key: 0,
	class: "text-xs text-primary-500"
}, $o = 15, es = 100, ts = /* @__PURE__ */ l({
	__name: "ProjectTimeTab",
	props: {
		id: {},
		client: { type: [Function, Object] },
		notify: { type: Function },
		project: {}
	},
	emits: ["refresh"],
	setup(e, { emit: t }) {
		let l = e, u = t, d = B(), f = co(), m = b(null), h = b([]), _ = b([]), y = b(!1), x = b(null), T = n(() => l.project?.id ?? Number(l.id)), O = n(() => [
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
				tdClass: "text-end text-sm font-medium"
			}
		]);
		g(() => {
			k();
		}), E(tt, () => m.value?.refresh(!0));
		async function k() {
			try {
				h.value = await Yt(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await cr(l.client, {
					project_id: T.value,
					limit: es
				});
				_.value = e.data ?? [];
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.tasks.load_failed")));
			}
		}
		async function A({ page: e }) {
			let t = {
				page: e,
				limit: $o,
				project_id: T.value
			};
			try {
				let e = await Sr(l.client, t);
				return {
					data: e.data ?? [],
					pagination: {
						totalPages: e.meta?.last_page ?? 1,
						currentPage: e.meta?.current_page ?? 1,
						totalCount: e.meta?.total ?? 0,
						limit: e.meta?.per_page ?? $o
					}
				};
			} catch (e) {
				return l.notify("error", H(e, d("tasks_projects.project.time.load_failed"))), {
					data: [],
					pagination: {
						totalPages: 1,
						currentPage: 1,
						totalCount: 0,
						limit: $o
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
			return e.is_running ? La(Za(e.started_at, f.value)) : pt(e.duration_minutes);
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
				await Me(l.client, e.id), l.notify("success", d("tasks_projects.time.deleted")), m.value?.refresh(!0), V(), u("refresh");
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.time.delete_failed")));
			}
		}
		return (t, n) => {
			let l = S("BaseIcon"), u = S("BaseButton"), f = S("BaseFormatMoney"), h = S("BaseDropdownItem"), g = S("BaseDropdown"), _ = S("BaseTable");
			return v(), a("div", Ko, [
				o("div", qo, [c(u, {
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
				o("div", Jo, [c(_, {
					ref_key: "tableRef",
					ref: m,
					data: A,
					columns: O.value
				}, {
					"cell-started_at": D(({ row: e }) => [s(C(e.data.started_at ? w(dt)(e.data.started_at) : "-"), 1)]),
					"cell-user": D(({ row: e }) => [s(C(j(e.data.user_id)), 1)]),
					"cell-task": D(({ row: e }) => [o("span", Yo, C(M(e.data.task_id)), 1), e.data.description ? (v(), a("span", Xo, C(e.data.description), 1)) : i("", !0)]),
					"cell-duration_minutes": D(({ row: e }) => [o("span", { class: p(["tabular-nums", e.data.is_running ? "font-medium text-primary-500" : ""]) }, C(N(e.data)), 3)]),
					"cell-billable": D(({ row: e }) => [e.data.billable ? (v(), r(l, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (v(), a("span", Zo, "-"))]),
					"cell-amount": D(({ row: e }) => [c(f, { amount: e.data.amount }, null, 8, ["amount"])]),
					"cell-actions": D(({ row: e }) => [e.data.is_running ? (v(), a("span", Qo, C(w(d)("tasks_projects.project.time.running")), 1)) : (v(), r(g, {
						key: 1,
						label: w(d)("tasks_projects.general.actions")
					}, {
						activator: D(() => [c(l, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(h, { onClick: (t) => F(e.data) }, {
							default: D(() => [c(l, {
								name: "PencilIcon",
								class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), e.data.invoice_id === null ? (v(), r(h, {
							key: 0,
							onClick: (t) => R(e.data)
						}, {
							default: D(() => [c(l, {
								name: "TrashIcon",
								class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(d)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])) : i("", !0)]),
						_: 2
					}, 1032, ["label"]))]),
					_: 1
				}, 8, ["columns"])]),
				c(Go, {
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
}), ns = {
	viewProject: `${U}:view-project`,
	editProject: `${U}:edit-project`,
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function rs(e) {
	e.addMessages(ir), e.registerPage({
		id: "projects",
		module: U,
		path: "projects",
		component: cn(e, ti),
		meta: {
			ability: ns.viewProject,
			title: "tasks_projects.projects.title"
		}
	}), e.registerPage({
		id: "project",
		module: U,
		path: "projects/:id",
		component: cn(e, Ur),
		meta: {
			ability: ns.viewProject,
			title: "tasks_projects.projects.title"
		},
		children: [
			{
				id: "overview",
				path: "",
				component: cn(e, Vi),
				meta: {
					ability: ns.viewProject,
					title: "tasks_projects.project.tabs.overview"
				}
			},
			{
				id: "tasks",
				path: "tasks",
				component: cn(e, No),
				meta: {
					ability: ns.viewTask,
					title: "tasks_projects.project.tabs.tasks"
				}
			},
			{
				id: "time",
				path: "time",
				component: cn(e, ts),
				meta: {
					ability: ns.viewOwnTime,
					title: "tasks_projects.project.tabs.time"
				}
			},
			{
				id: "members",
				path: "members",
				component: cn(e, pi),
				meta: {
					ability: ns.editProject,
					title: "tasks_projects.project.tabs.members"
				}
			}
		]
	});
}
//#endregion
//#region resources/js/messages/reports.ts
var is = { en: { tasks_projects: { reports: {
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
} } } }, as = { summary: `${zt}/reports/summary` };
async function os(e, t) {
	let { data: n } = await e.get(as.summary, { params: t });
	return ss(n?.data, t);
}
function ss(e, t) {
	let n = us(e) ? e : {};
	return {
		from: ps(n.from, t.from ?? ""),
		to: ps(n.to, t.to ?? ""),
		totals: ls(n.totals).map(cs),
		by_project: ls(n.by_project).map((e) => ({
			...cs(e),
			project_id: fs(e.project_id),
			label: ps(e.label, "")
		})),
		by_member: ls(n.by_member).map((e) => ({
			...cs(e),
			user_id: fs(e.user_id),
			label: ps(e.label, "")
		})),
		by_customer: ls(n.by_customer).map((e) => ({
			...cs(e),
			customer_id: fs(e.customer_id)
		})),
		by_billable: ls(n.by_billable).map((e) => ({
			...cs(e),
			billable: e.billable === !0
		}))
	};
}
function cs(e) {
	return {
		currency_id: fs(e.currency_id),
		minutes: ds(e.minutes),
		amount: ds(e.amount),
		billable_minutes: ds(e.billable_minutes),
		billable_amount: ds(e.billable_amount),
		unbilled_amount: ds(e.unbilled_amount)
	};
}
function ls(e) {
	return Array.isArray(e) ? e.filter(us) : [];
}
function us(e) {
	return typeof e == "object" && !!e;
}
function ds(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function fs(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function ps(e, t) {
	return typeof e == "string" && e.trim() !== "" ? e : t;
}
//#endregion
//#region resources/js/components/ReportBreakdownTable.vue?vue&type=script&setup=true&lang.ts
var ms = { class: "mt-6" }, hs = { class: "text-sm font-semibold tracking-wider text-muted uppercase" }, gs = { class: "relative table-container" }, _s = {
	key: 0,
	class: "text-subtle"
}, vs = { key: 1 }, ys = /* @__PURE__ */ l({
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
			return v(), a("section", ms, [o("h3", hs, C(e.title), 1), o("div", gs, [(v(), r(d, {
				key: u.value,
				data: e.rows,
				columns: l.value,
				class: "mt-2"
			}, {
				"cell-currency_id": D(({ row: e }) => [e.data.currency_id === null ? (v(), a("span", _s, "-")) : (v(), a("span", vs, "#" + C(e.data.currency_id), 1))]),
				"cell-minutes": D(({ row: e }) => [s(C(w(Ra)(e.data.minutes)), 1)]),
				"cell-billable_minutes": D(({ row: e }) => [s(C(w(Ra)(e.data.billable_minutes)), 1)]),
				"cell-amount": D(({ row: e }) => [c(i, { amount: e.data.amount }, null, 8, ["amount"])]),
				"cell-unbilled_amount": D(({ row: e }) => [c(i, { amount: e.data.unbilled_amount }, null, 8, ["amount"])]),
				_: 1
			}, 8, ["data", "columns"]))])]);
		};
	}
}), bs = 3;
function xs(e, t, n = /* @__PURE__ */ new Date()) {
	let r = n.getFullYear(), i = n.getMonth();
	switch (e) {
		case "THIS_WEEK": {
			let e = Ga(n, t);
			return Cs(e, qa(e, 6));
		}
		case "LAST_MONTH": return Cs(new Date(r, i - 1, 1), new Date(r, i, 0));
		case "THIS_QUARTER": {
			let e = Math.floor(i / bs) * bs;
			return Cs(new Date(r, e, 1), new Date(r, e + bs, 0));
		}
		case "THIS_YEAR": return Cs(new Date(r, 0, 1), new Date(r, 12, 0));
		default: return Cs(new Date(r, i, 1), new Date(r, i + 1, 0));
	}
}
function Ss(e, t) {
	return t <= 0 ? 0 : Math.min(100, Math.max(0, Math.round(e / t * 100)));
}
function Cs(e, t) {
	return {
		from: Ja(e),
		to: Ja(t)
	};
}
//#endregion
//#region resources/js/pages/ReportsPage.vue?vue&type=script&setup=true&lang.ts
var ws = {
	key: 0,
	class: "mt-2 text-sm text-muted"
}, Ts = { class: "flex items-center justify-end space-x-5" }, Es = { class: "mt-4 flex flex-wrap gap-2" }, Ds = ["onClick"], Os = {
	key: 0,
	class: "flex justify-center py-16"
}, ks = {
	key: 0,
	class: "text-xs font-medium tracking-wider text-muted uppercase"
}, As = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, js = { class: "mt-1 text-2xl font-semibold text-heading" }, Ms = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ns = { class: "mt-1 text-2xl font-semibold text-heading" }, Ps = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Fs = { class: "mt-1 text-2xl font-semibold text-heading" }, Is = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Ls = { class: "mt-1 text-2xl font-semibold text-heading" }, Rs = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, zs = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Bs = { class: "mt-3 flex h-2 w-full overflow-hidden rounded-full bg-surface-tertiary" }, Vs = { class: "mt-3 flex flex-wrap gap-6 text-sm" }, Hs = { class: "inline-flex items-center text-body" }, Us = { class: "ms-1 font-medium text-heading" }, Ws = { class: "ms-1 text-muted" }, Gs = { class: "inline-flex items-center text-body" }, Ks = { class: "ms-1 font-medium text-heading" }, qs = { class: "ms-1 text-muted" }, Js = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, Ys = "THIS_MONTH", Xs = /* @__PURE__ */ l({
	__name: "ReportsPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(t) {
		let l = t, u = B(), d = b(null), f = b([]), h = b(!0), _ = b(Ys), y = b(""), T = b(""), E = n(() => [
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
			label: e.customer_id === null ? u("tasks_projects.reports.tables.no_customer") : en(e.customer_id)
		}))), P = n(() => ae(!0)), F = n(() => ae(!1)), I = n(() => P.value + F.value), L = n(() => Ss(P.value, I.value));
		g(() => {
			R(Ys), re();
		});
		function R(e) {
			if (_.value = e, e !== "CUSTOM") {
				let t = xs(e, G.settings.week_start);
				y.value = t.from, T.value = t.to;
			}
			te();
		}
		function z(e) {
			y.value = e ? ft(e) : "", _.value = "CUSTOM", te();
		}
		function ee(e) {
			T.value = e ? ft(e) : "", _.value = "CUSTOM", te();
		}
		async function te() {
			h.value = !0;
			try {
				let e = await os(l.client, ne());
				d.value = e, e.by_customer.some((e) => e.customer_id !== null) && tn(l.client);
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
				f.value = await Yt(l.client);
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
			R(Ys);
		}
		return (t, n) => {
			let l = S("BaseBreadcrumbItem"), f = S("BaseBreadcrumb"), g = S("BaseIcon"), _ = S("BaseButton"), b = S("router-link"), B = S("BasePageHeader"), te = S("BaseDatePicker"), ne = S("BaseInputGroup"), re = S("BaseFilterWrapper"), ie = S("BaseSpinner"), ae = S("BaseEmptyPlaceholder"), le = S("BaseFormatMoney"), ue = S("BasePage");
			return v(), r(ue, null, {
				default: D(() => [
					c(B, { title: w(u)("tasks_projects.reports.title") }, {
						actions: D(() => [o("div", Ts, [
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
						}), d.value ? (v(), a("p", ws, C(w(dt)(d.value.from)) + " – " + C(w(dt)(d.value.to)), 1)) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					o("div", Es, [(v(!0), a(e, null, x(E.value, (e) => (v(), a("button", {
						key: e.id,
						type: "button",
						class: p(["rounded-md border px-3 py-1.5 text-sm font-medium", se(e)]),
						onClick: (t) => R(e.id)
					}, C(e.label), 11, Ds))), 128))]),
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
					h.value && d.value === null ? (v(), a("div", Os, [c(ie, { class: "h-8 w-8 text-primary-500" })])) : A.value ? (v(), a(e, { key: 2 }, [
						(v(!0), a(e, null, x(O.value, (e) => (v(), a("div", {
							key: e.currency_id ?? "base",
							class: "mt-4 rounded-xl border border-line-default bg-surface p-5"
						}, [k.value ? (v(), a("p", ks, C(oe(e.currency_id)), 1)) : i("", !0), o("div", { class: p(["grid grid-cols-2 gap-4 sm:grid-cols-4", k.value ? "mt-3" : ""]) }, [
							o("div", null, [o("p", As, C(w(u)("tasks_projects.reports.summary.logged")), 1), o("p", js, C(w(Ra)(e.minutes)), 1)]),
							o("div", null, [o("p", Ms, C(w(u)("tasks_projects.reports.summary.billable")), 1), o("p", Ns, C(w(Ra)(e.billable_minutes)), 1)]),
							o("div", null, [o("p", Ps, C(w(u)("tasks_projects.reports.summary.amount")), 1), o("p", Fs, [c(le, { amount: e.amount }, null, 8, ["amount"])])]),
							o("div", null, [o("p", Is, C(w(u)("tasks_projects.reports.summary.unbilled")), 1), o("p", Ls, [c(le, { amount: e.unbilled_amount }, null, 8, ["amount"])])])
						], 2)]))), 128)),
						o("section", Rs, [o("p", zs, C(w(u)("tasks_projects.reports.split.title")), 1), I.value > 0 ? (v(), a(e, { key: 0 }, [o("div", Bs, [o("div", {
							class: "h-2 bg-primary-500",
							style: m({ width: `${L.value}%` })
						}, null, 4)]), o("div", Vs, [o("span", Hs, [
							n[0] ||= o("span", { class: "me-2 inline-block h-2.5 w-2.5 rounded-full bg-primary-500" }, null, -1),
							s(" " + C(w(u)("tasks_projects.reports.split.billable")) + ": ", 1),
							o("span", Us, C(w(Ra)(P.value)), 1),
							o("span", Ws, "(" + C(L.value) + "%)", 1)
						]), o("span", Gs, [
							n[1] ||= o("span", { class: "me-2 inline-block h-2.5 w-2.5 rounded-full bg-surface-tertiary" }, null, -1),
							s(" " + C(w(u)("tasks_projects.reports.split.non_billable")) + ": ", 1),
							o("span", Ks, C(w(Ra)(F.value)), 1),
							o("span", qs, "(" + C(100 - L.value) + "%)", 1)
						])])], 64)) : (v(), a("p", Js, C(w(u)("tasks_projects.reports.split.nothing")), 1))]),
						c(ys, {
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
						c(ys, {
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
						c(ys, {
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
}), Zs = "tasks-projects";
function Qs(e) {
	e.addMessages(is), e.registerPage({
		id: "reports",
		module: Zs,
		path: "reports",
		component: cn(e, Xs),
		meta: {
			ability: `${Zs}:view-own-time`,
			title: "tasks_projects.reports.title"
		}
	}), e.on("company:changing", () => {
		nn();
	});
}
//#endregion
//#region resources/js/messages/tasks.ts
var $s = { en: { tasks_projects: {
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
			title: "View",
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
} } }, ec = { class: "mt-6 rounded-xl border border-line-default bg-surface" }, tc = { class: "flex items-center justify-between border-b border-line-light px-5 py-3" }, nc = { class: "text-sm font-semibold text-heading" }, rc = ["title"], ic = { class: "overflow-x-auto" }, ac = { class: "min-w-full text-sm" }, oc = { class: "bg-surface-secondary text-xs tracking-wide text-muted uppercase" }, sc = { class: "px-4 py-2 text-start font-medium" }, cc = { class: "px-4 py-2 text-start font-medium" }, lc = { class: "px-4 py-2 text-start font-medium" }, uc = { class: "px-4 py-2 text-start font-medium" }, dc = { class: "px-4 py-2 text-start font-medium" }, fc = { class: "px-4 py-2 text-start font-medium" }, pc = { class: "px-4 py-2 text-start font-medium" }, mc = { class: "px-4 py-2 text-start font-medium" }, hc = { class: "px-4 py-2 text-end font-medium" }, gc = ["onClick"], _c = { class: "px-4 py-2.5 whitespace-nowrap" }, vc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, yc = { class: "px-4 py-2.5 whitespace-nowrap" }, bc = {
	key: 0,
	class: "text-primary-500"
}, xc = { key: 1 }, Sc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, Cc = { class: "px-4 py-2.5 whitespace-nowrap tabular-nums" }, wc = { class: "max-w-64 truncate px-4 py-2.5" }, Tc = { class: "px-4 py-2.5" }, Ec = {
	key: 1,
	class: "text-subtle"
}, Dc = { class: "px-4 py-2.5 whitespace-nowrap" }, Oc = ["title"], kc = {
	key: 3,
	class: "text-xs text-primary-500"
}, Ac = { key: 0 }, jc = {
	colspan: "9",
	class: "px-4 py-8 text-center text-sm text-subtle"
}, Mc = /* @__PURE__ */ l({
	__name: "TimeLogGrid",
	props: {
		client: {},
		notify: {},
		task: {},
		members: { default: () => [] }
	},
	setup(t) {
		let l = t, u = B(), d = co(), f = b([]), m = b(!1), h = b(!1), g = b(null), _ = n(() => ({
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
		E(() => l.task.id, () => void j(), { immediate: !0 }), E(tt, () => void j());
		async function j() {
			m.value = !0;
			try {
				f.value = await hr(l.client, l.task.id);
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
			return e.is_running ? La(Za(e.started_at, d.value)) : Ra(e.duration_minutes);
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
				await Me(l.client, e.id), l.notify("success", u("tasks_projects.time.deleted")), V();
			} catch (e) {
				l.notify("error", H(e, u("tasks_projects.time.delete_failed")));
			}
		}
		return (n, l) => {
			let d = S("BaseSpinner"), b = S("BaseIcon"), T = S("BaseButton"), E = S("BaseDropdownItem"), j = S("BaseDropdown");
			return v(), a("section", ec, [
				o("header", tc, [o("h2", nc, [s(C(w(u)("tasks_projects.tasks.time_log.title")) + " ", 1), m.value ? (v(), r(d, {
					key: 0,
					class: "ms-2 inline-block h-4 w-4 text-primary-500"
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
				}, 8, ["disabled"])], 8, rc)]),
				o("div", ic, [o("table", ac, [o("thead", oc, [o("tr", null, [
					o("th", sc, C(w(u)("tasks_projects.tasks.time_log.columns.start_date")), 1),
					o("th", cc, C(w(u)("tasks_projects.tasks.time_log.columns.start_time")), 1),
					o("th", lc, C(w(u)("tasks_projects.tasks.time_log.columns.end_date")), 1),
					o("th", uc, C(w(u)("tasks_projects.tasks.time_log.columns.end_time")), 1),
					o("th", dc, C(w(u)("tasks_projects.tasks.time_log.columns.duration")), 1),
					o("th", fc, C(w(u)("tasks_projects.tasks.time_log.columns.description")), 1),
					o("th", pc, C(w(u)("tasks_projects.tasks.time_log.columns.billable")), 1),
					o("th", mc, C(w(u)("tasks_projects.tasks.time_log.columns.member")), 1),
					o("th", hc, C(w(u)("tasks_projects.general.actions")), 1)
				])]), o("tbody", null, [(v(!0), a(e, null, x(f.value, (e) => (v(), a("tr", {
					key: e.id,
					class: p(["border-t border-line-light", e.is_running ? "bg-primary-50" : "cursor-pointer hover:bg-hover"]),
					onClick: (t) => I(e)
				}, [
					o("td", _c, C(w(dt)(w(Va)(e.started_at)) || "-"), 1),
					o("td", vc, C(w(Ha)(e.started_at) || "-"), 1),
					o("td", yc, [e.is_running ? (v(), a("span", bc, C(w(u)("tasks_projects.tasks.time_log.running")), 1)) : (v(), a("span", xc, C(w(dt)(w(Va)(e.ended_at)) || "-"), 1))]),
					o("td", Sc, C(e.is_running ? "-" : w(Ha)(e.ended_at) || "-"), 1),
					o("td", Cc, [o("span", { class: p(e.is_running ? "font-medium text-primary-500" : "") }, C(P(e)), 3)]),
					o("td", wc, C(e.description || "-"), 1),
					o("td", Tc, [e.billable ? (v(), r(b, {
						key: 0,
						name: "CheckCircleIcon",
						class: "h-5 w-5 text-status-green"
					})) : (v(), a("span", Ec, "-"))]),
					o("td", Dc, C(N(e.user_id)), 1),
					o("td", {
						class: "px-4 py-2.5 text-end whitespace-nowrap",
						onClick: l[0] ||= A(() => {}, ["stop"])
					}, [M(e) ? (v(), a("span", {
						key: 0,
						class: "text-xs text-muted",
						title: w(u)("tasks_projects.tasks.time_log.stamped_delete")
					}, C(w(u)("tasks_projects.tasks.time_log.stamped")), 9, Oc)) : e.is_running ? O(e) ? (v(), r(T, {
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
					}, 8, ["disabled"])) : (v(), a("span", kc, C(w(u)("tasks_projects.tasks.time_log.running")), 1)) : (v(), r(j, {
						key: 1,
						label: w(u)("tasks_projects.general.actions")
					}, {
						activator: D(() => [c(b, {
							name: "EllipsisHorizontalIcon",
							class: "h-5 text-muted"
						})]),
						default: D(() => [c(E, { onClick: (t) => I(e) }, {
							default: D(() => [c(b, {
								name: "PencilIcon",
								class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(u)("tasks_projects.general.edit")), 1)]),
							_: 1
						}, 8, ["onClick"]), c(E, { onClick: (t) => z(e) }, {
							default: D(() => [c(b, {
								name: "TrashIcon",
								class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
							}), s(" " + C(w(u)("tasks_projects.general.delete")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						_: 2
					}, 1032, ["label"]))])
				], 10, gc))), 128)), f.value.length === 0 && !m.value ? (v(), a("tr", Ac, [o("td", jc, C(w(u)("tasks_projects.tasks.time_log.empty")), 1)])) : i("", !0)])])]),
				c(Go, {
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
}), Nc = {
	key: 0,
	class: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted"
}, Pc = { class: "rounded-sm bg-surface-tertiary px-2 py-0.5 text-body" }, Fc = {
	key: 1,
	class: "text-subtle"
}, Ic = {
	key: 0,
	class: "flex flex-wrap items-center justify-end gap-3"
}, Lc = ["title"], Rc = {
	key: 0,
	class: "flex justify-center py-16"
}, zc = { class: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, Bc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Vc = {
	id: "task-status-label",
	class: "text-xs font-medium tracking-wider text-muted uppercase"
}, Hc = { class: "mt-2" }, Uc = { class: "mt-2 text-xs text-muted" }, Wc = { class: "text-body" }, Gc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Kc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, qc = { class: "mt-2 text-2xl font-semibold text-heading" }, Jc = { class: "mt-1 text-xs text-muted" }, Yc = { class: "text-body" }, Xc = { class: "rounded-xl border border-line-default bg-surface p-5" }, Zc = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, Qc = { class: "mt-2 text-2xl font-semibold text-heading" }, $c = { class: "mt-1 text-xs text-muted" }, el = { class: "rounded-xl border border-line-default bg-surface p-5" }, tl = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, nl = { class: "mt-2 text-lg font-semibold text-heading" }, rl = { class: "mt-1 text-xs text-muted" }, il = { class: "mt-4 rounded-xl border border-line-default bg-surface p-5" }, al = { class: "text-xs font-medium tracking-wider text-muted uppercase" }, ol = {
	key: 0,
	class: "mt-2 text-sm whitespace-pre-line text-body"
}, sl = {
	key: 1,
	class: "mt-2 text-sm text-subtle"
}, cl = 100, ll = /* @__PURE__ */ l({
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
		}, d = B(), f = l.router, m = b(null), h = b([]), _ = b([]), y = b([]), x = b(!0), T = b(!1), O = b(!1), k = b(!1), A = n(() => Number(l.id)), j = n(() => rt(m.value)), N = n(() => m.value?.name ?? d("tasks_projects.tasks.title")), P = n(() => h.value.map((e) => ({
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
		E(A, () => void re()), E(tt, () => void re(!0)), g(() => {
			re(), ie();
		});
		async function re(e = !1) {
			if (!(!Number.isInteger(A.value) || A.value <= 0)) {
				x.value = !e;
				try {
					let e = await fr(l.client, A.value);
					m.value = e, $e(e), e.customer_id !== null && tn(l.client);
				} catch (t) {
					e || l.notify("error", H(t, d("tasks_projects.tasks.detail.not_found")));
				} finally {
					x.value = !1;
				}
			}
		}
		async function ie() {
			try {
				h.value = await sr(l.client);
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.task_statuses.load_failed")));
			}
			try {
				_.value = await Yt(l.client);
			} catch {
				_.value = [];
			}
			try {
				let e = await Ut(l.client, {
					limit: cl,
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
			return _t(e) === "task_locked" ? d("tasks_projects.tasks.locked") : H(e, d(t));
		}
		async function se(e) {
			let t = m.value;
			if (t === null || T.value || t.task_status_id === e.id) return;
			let n = t.task_status_id;
			t.task_status_id = e.id, T.value = !0;
			try {
				m.value = await ur(l.client, t.id, ae(t, { task_status_id: e.id })), l.notify("success", d("tasks_projects.tasks.detail.status_saved", { name: e.label })), V();
			} catch (e) {
				t.task_status_id = n, l.notify("error", oe(e, "tasks_projects.tasks.detail.status_failed"));
			} finally {
				T.value = !1;
			}
		}
		async function ce() {
			let e = m.value;
			e !== null && ee.value && !z.value && await xt({
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
			k.value = !1, m.value = e, $e(e), l.notify("success", d("tasks_projects.tasks.updated", { name: e.name })), V();
		}
		async function de() {
			let e = m.value;
			if (!(e === null || O.value) && window.confirm(d("tasks_projects.tasks.delete_confirm", { name: e.name }))) {
				O.value = !0;
				try {
					await dr(l.client, e.id), l.notify("success", d("tasks_projects.tasks.deleted", { name: e.name })), V(), le();
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
						actions: D(() => [m.value ? (v(), a("div", Ic, [
							c(xo, {
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
							}, 8, ["loading", "disabled"])], 8, Lc)) : i("", !0),
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
						}), m.value ? (v(), a("div", Nc, [
							o("span", Pc, "#" + C(m.value.number), 1),
							m.value.project_id ? (v(), r(y, {
								key: 0,
								class: "hover:text-primary-500",
								to: w(W).project(m.value.project_id)
							}, {
								default: D(() => [s(C(I.value?.name ?? `#${m.value.project_id}`), 1)]),
								_: 1
							}, 8, ["to"])) : (v(), a("span", Fc, C(w(d)("tasks_projects.tasks.no_project")), 1)),
							m.value.customer_id ? (v(), r(y, {
								key: 2,
								class: "hover:text-primary-500",
								to: w(W).customer(m.value.customer_id)
							}, {
								default: D(() => [s(C(w(en)(m.value.customer_id)), 1)]),
								_: 1
							}, 8, ["to"])) : i("", !0),
							ne.value && m.value.priority ? (v(), a("span", {
								key: 3,
								class: p(["rounded-full px-2 py-0.5 text-xs font-medium", u[m.value.priority]])
							}, C(ne.value), 3)) : i("", !0),
							c(ha, { state: j.value.invoiced }, null, 8, ["state"])
						])) : i("", !0)]),
						_: 1
					}, 8, ["title"]),
					c(Rt, {
						client: t.client,
						notify: t.notify
					}, null, 8, ["client", "notify"]),
					x.value && m.value === null ? (v(), a("div", Rc, [c(B, { class: "h-8 w-8 text-primary-500" })])) : m.value ? (v(), a(e, { key: 1 }, [
						o("div", zc, [
							o("div", Bc, [
								o("p", Vc, C(w(d)("tasks_projects.tasks.detail.status")), 1),
								o("div", Hc, [c(re, {
									modelValue: R.value,
									"onUpdate:modelValue": l[1] ||= (e) => R.value = e,
									"aria-labelledby": "task-status-label",
									options: P.value,
									disabled: T.value,
									"label-key": "label"
								}, null, 8, [
									"modelValue",
									"options",
									"disabled"
								])]),
								o("p", Uc, [s(C(w(d)("tasks_projects.tasks.detail.assignee")) + ": ", 1), o("span", Wc, C(L.value), 1)])
							]),
							o("div", Gc, [
								o("p", Kc, C(w(d)("tasks_projects.tasks.detail.logged")), 1),
								o("p", qc, C(w(pt)(j.value.logged_minutes)), 1),
								o("p", Jc, [s(C(w(d)("tasks_projects.tasks.detail.estimate")) + ": ", 1), o("span", Yc, C(m.value.estimated_minutes ? w(pt)(m.value.estimated_minutes) : w(d)("tasks_projects.tasks.detail.no_estimate")), 1)])
							]),
							o("div", Xc, [
								o("p", Zc, C(w(d)("tasks_projects.tasks.detail.unbilled")), 1),
								o("p", Qc, [c(ie, { amount: j.value.unbilled_amount }, null, 8, ["amount"])]),
								o("p", $c, C(w(pt)(j.value.unbilled_minutes)), 1)
							]),
							o("div", el, [
								o("p", tl, C(w(d)("tasks_projects.tasks.detail.due_date")), 1),
								o("p", nl, C(m.value.due_date ? w(dt)(m.value.due_date) : "-"), 1),
								o("p", rl, C(m.value.billable ? w(d)("tasks_projects.tasks.billable") : w(d)("tasks_projects.time.non_billable")), 1)
							])
						]),
						o("div", il, [o("p", al, C(w(d)("tasks_projects.tasks.detail.description")), 1), m.value.description ? (v(), a("p", ol, C(m.value.description), 1)) : (v(), a("p", sl, C(w(d)("tasks_projects.tasks.detail.no_description")), 1))]),
						c(Mc, {
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
					m.value ? (v(), r(wa, {
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
}), ul = ["aria-label"], dl = ["aria-current", "onClick"], fl = { class: "max-sm:sr-only" }, pl = /* @__PURE__ */ l({
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
				name: sn.list,
				label: l("tasks_projects.tasks.views.list"),
				icon: "ListBulletIcon"
			},
			{
				id: "board",
				name: sn.board,
				label: l("tasks_projects.tasks.views.board"),
				icon: "ViewColumnsIcon"
			},
			{
				id: "week",
				name: sn.week,
				label: l("tasks_projects.tasks.views.week"),
				icon: "CalendarDaysIcon"
			}
		]);
		function d(e) {
			return i.active === e.name || e.id === "list" && i.active === sn.tasks;
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
				"aria-label": w(l)("tasks_projects.tasks.views.title")
			}, [(v(!0), a(e, null, x(u.value, (e) => (v(), a("button", {
				key: e.id,
				type: "button",
				class: p(["flex items-center gap-1.5 border-e border-line-default px-3 py-1.5 text-sm font-medium last:border-e-0", d(e) ? "bg-primary-50 text-primary-500" : "bg-surface text-muted hover:bg-hover hover:text-heading"]),
				"aria-current": d(e) ? "page" : void 0,
				onClick: (t) => f(e)
			}, [c(r, {
				name: e.icon,
				class: "h-4 w-4"
			}, null, 8, ["name"]), o("span", fl, C(e.label), 1)], 10, dl))), 128))], 8, ul);
		};
	}
}), ml = { class: "flex flex-wrap items-center justify-end gap-3" }, hl = 100, gl = /* @__PURE__ */ l({
	__name: "TasksPage",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function },
		router: {}
	},
	setup(e) {
		let t = e, i = B(), a = t.router, l = b([]), u = b([]), d = b([]), f = b(!1), m = n(() => t.router.currentRoute.value), h = n(() => Wi(m.value.query)), _ = n(() => Gi(h.value)), y = n(() => String(m.value.name ?? "")), x = n(() => d.value.map((e) => ({
			id: e.id,
			label: e.name
		})));
		E(y, (e) => T(e)), g(() => {
			T(y.value), O();
		});
		function T(e) {
			e === sn.tasks && a.replace({
				name: sn.list,
				query: _.value
			});
		}
		async function O() {
			try {
				l.value = await sr(t.client);
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.task_statuses.load_failed")));
			}
			try {
				u.value = await Yt(t.client);
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.tasks.members_failed")));
			}
			try {
				let e = await Ut(t.client, {
					limit: hl,
					status: "ACTIVE",
					sort_by: "name"
				});
				d.value = e.data ?? [];
			} catch (e) {
				t.notify("error", H(e, i("tasks_projects.tasks.projects_failed")));
			}
		}
		function k(e) {
			Ji(e, h.value) || a.replace({
				name: y.value === sn.tasks ? sn.list : y.value,
				query: Gi(e)
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
						actions: D(() => [o("div", ml, [
							c(pl, {
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
					c(Rt, {
						client: e.client,
						notify: e.notify
					}, null, 8, ["client", "notify"]),
					c(ua, {
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
					c(wa, {
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
function _l(e, t, n) {
	return (t = wl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function vl() {
	return vl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, vl.apply(null, arguments);
}
function yl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function bl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? yl(Object(n), !0).forEach(function(t) {
			_l(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xl(e, t) {
	if (e == null) return {};
	var n, r, i = Sl(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Sl(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Cl(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function wl(e) {
	var t = Cl(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Tl(e) {
	"@babel/helpers - typeof";
	return Tl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Tl(e);
}
var El = "1.15.7";
function Dl(e) {
	if (typeof window < "u" && window.navigator) return !!/*@__PURE__*/ navigator.userAgent.match(e);
}
var Ol = Dl(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), kl = Dl(/Edge/i), Al = Dl(/firefox/i), jl = Dl(/safari/i) && !Dl(/chrome/i) && !Dl(/android/i), Ml = Dl(/iP(ad|od|hone)/i), Nl = Dl(/chrome/i) && Dl(/android/i), Pl = {
	capture: !1,
	passive: !1
};
function J(e, t, n) {
	e.addEventListener(t, n, !Ol && Pl);
}
function Y(e, t, n) {
	e.removeEventListener(t, n, !Ol && Pl);
}
function Fl(e, t) {
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
function Il(e) {
	return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
}
function Ll(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Fl(e, t) : Fl(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = Il(e));
	}
	return null;
}
var Rl = /\s+/g;
function zl(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(Rl, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(Rl, " "));
}
function X(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Bl(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = X(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Vl(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Hl() {
	return document.scrollingElement || document.documentElement;
}
function Ul(e, t, n, r, i) {
	if (e.getBoundingClientRect || e === window) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Hl() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !Ol)) do
			if (i && i.getBoundingClientRect && (X(i, "transform") !== "none" || n && X(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(X(i, "border-top-width")), s -= f.left + parseInt(X(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Bl(i || e), m = p && p.a, h = p && p.d;
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
function Wl(e, t, n) {
	for (var r = Xl(e, !0), i = Ul(e)[t]; r;) {
		var a = Ul(r)[n], o = void 0;
		if (o = n === "top" || n === "left" ? i >= a : i <= a, !o) return r;
		if (r === Hl()) break;
		r = Xl(r, !1);
	}
	return !1;
}
function Gl(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== $.ghost && (r || o[a] !== $.dragged) && Ll(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Kl(e, t) {
	for (var n = e.lastElementChild; n && (n === $.ghost || X(n, "display") === "none" || t && !Fl(n, t));) n = n.previousElementSibling;
	return n || null;
}
function ql(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== $.clone && (!t || Fl(e, t)) && n++;
	return n;
}
function Jl(e) {
	var t = 0, n = 0, r = Hl();
	if (e) do {
		var i = Bl(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function Yl(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Xl(e, t) {
	if (!e || !e.getBoundingClientRect) return Hl();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = X(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Hl();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Hl();
}
function Zl(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Ql(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var $l;
function eu(e, t) {
	return function() {
		if (!$l) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), $l = setTimeout(function() {
				$l = void 0;
			}, t);
		}
	};
}
function tu() {
	clearTimeout($l), $l = void 0;
}
function nu(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function ru(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function iu(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (Ll(i, t.draggable, e, !1) && !i.animated && i !== n) {
			var a = Ul(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var au = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ou() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (X(t, "display") !== "none" && t !== $.ghost) {
					e.push({
						target: t,
						rect: Ul(t)
					});
					var n = bl({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Bl(t, !0);
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
			e.splice(Yl(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = Ul(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Bl(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Ql(c, s) && !Ql(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = cu(u, c, l, r.options)), Ql(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				X(e, "transition", ""), X(e, "transform", "");
				var i = Bl(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, X(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = su(e), X(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), X(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					X(e, "transition", ""), X(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function su(e) {
	return e.offsetWidth;
}
function cu(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var lu = [], uu = { initializeByDefault: !0 }, du = {
	mount: function(e) {
		for (var t in uu) uu.hasOwnProperty(t) && !(t in e) && (e[t] = uu[t]);
		lu.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), lu.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		lu.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](bl({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](bl({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in lu.forEach(function(r) {
			var i = r.pluginName;
			if (e.options[i] || r.initializeByDefault) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, vl(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return lu.forEach(function(r) {
			typeof r.eventProperties == "function" && vl(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return lu.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function fu(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[au], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !Ol && !kl ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = bl(bl({}, m), du.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var pu = ["evt"], mu = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = xl(n, pu);
	du.pluginEvent.bind($)(e, t, bl({
		dragEl: Z,
		parentEl: gu,
		ghostEl: Q,
		rootEl: _u,
		nextEl: vu,
		lastDownEl: yu,
		cloneEl: bu,
		cloneHidden: xu,
		dragStarted: Lu,
		putSortable: Du,
		activeSortable: $.active,
		originalEvent: r,
		oldIndex: Su,
		oldDraggableIndex: wu,
		newIndex: Cu,
		newDraggableIndex: Tu,
		hideGhostForTarget: nd,
		unhideGhostForTarget: rd,
		cloneNowHidden: function() {
			xu = !0;
		},
		cloneNowShown: function() {
			xu = !1;
		},
		dispatchSortableEvent: function(e) {
			hu({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function hu(e) {
	fu(bl({
		putSortable: Du,
		cloneEl: bu,
		targetEl: Z,
		rootEl: _u,
		oldIndex: Su,
		oldDraggableIndex: wu,
		newIndex: Cu,
		newDraggableIndex: Tu
	}, e));
}
var Z, gu, Q, _u, vu, yu, bu, xu, Su, Cu, wu, Tu, Eu, Du, Ou = !1, ku = !1, Au = [], ju, Mu, Nu, Pu, Fu, Iu, Lu, Ru, zu, Bu = !1, Vu = !1, Hu, Uu, Wu = [], Gu = !1, Ku = [], qu = typeof document < "u", Ju = Ml, Yu = kl || Ol ? "cssFloat" : "float", Xu = qu && !Nl && !Ml && "draggable" in document.createElement("div"), Zu = function() {
	if (qu) {
		if (Ol) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), Qu = function(e, t) {
	var n = X(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Gl(e, 0, t), a = Gl(e, 1, t), o = i && X(i), s = a && X(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + Ul(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ul(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Yu] === "none" || a && n[Yu] === "none" && c + l > r) ? "vertical" : "horizontal";
}, $u = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, ed = function(e, t) {
	var n;
	return Au.some(function(r) {
		var i = r[au].options.emptyInsertThreshold;
		if (i && !Kl(r)) {
			var a = Ul(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, td = function(e) {
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
	(!r || Tl(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, nd = function() {
	!Zu && Q && X(Q, "display", "none");
}, rd = function() {
	!Zu && Q && X(Q, "display", "");
};
qu && !Nl && document.addEventListener("click", function(e) {
	if (ku) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ku = !1, !1;
}, !0);
var id = function(e) {
	if (Z) {
		e = e.touches ? e.touches[0] : e;
		var t = ed(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[au]._onDragOver(n);
		}
	}
}, ad = function(e) {
	Z && Z.parentNode[au]._isOutsideThisEl(e.target);
};
function $(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = vl({}, t), e[au] = this;
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
			return Qu(e, this.options);
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
		supportPointer: $.supportPointer !== !1 && "PointerEvent" in window && (!jl || Ml),
		emptyInsertThreshold: 5
	};
	for (var r in du.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in td(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Xu, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? J(e, "pointerdown", this._onTapStart) : (J(e, "mousedown", this._onTapStart), J(e, "touchstart", this._onTapStart)), this.nativeDraggable && (J(e, "dragover", this), J(e, "dragenter", this)), Au.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), vl(this, ou());
}
$.prototype = {
	constructor: $,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Ru = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, Z) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (hd(n), !Z && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && jl && s && s.tagName.toUpperCase() === "SELECT") && (s = Ll(s, r.draggable, n, !1), !(s && s.animated) && yu !== s)) {
				if (Su = ql(s), wu = ql(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						hu({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), mu("filter", t, { evt: e }), i && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Ll(c, r.trim(), n, !1), r) return hu({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), mu("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.preventDefault();
					return;
				}
				(!r.handle || Ll(c, r.handle, n, !1)) && this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !Z && n.parentNode === i) {
			var c = Ul(n);
			if (_u = i, Z = n, gu = Z.parentNode, vu = Z.nextSibling, yu = n, Eu = a.group, $.dragged = Z, ju = {
				target: Z,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Fu = ju.clientX - c.left, Iu = ju.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, Z.style["will-change"] = "all", s = function() {
				if (mu("delayEnded", r, { evt: e }), $.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !Al && r.nativeDraggable && (Z.draggable = !0), r._triggerDragStart(e, t), hu({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), zl(Z, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Vl(Z, e.trim(), cd);
			}), J(o, "dragover", id), J(o, "mousemove", id), J(o, "touchmove", id), a.supportPointer ? (J(o, "pointerup", r._onDrop), !this.nativeDraggable && J(o, "pointercancel", r._onDrop)) : (J(o, "mouseup", r._onDrop), J(o, "touchend", r._onDrop), J(o, "touchcancel", r._onDrop)), Al && this.nativeDraggable && (this.options.touchStartThreshold = 4, Z.draggable = !0), mu("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(kl || Ol))) {
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
		Z && cd(Z), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		Y(e, "mouseup", this._disableDelayedDrag), Y(e, "touchend", this._disableDelayedDrag), Y(e, "touchcancel", this._disableDelayedDrag), Y(e, "pointerup", this._disableDelayedDrag), Y(e, "pointercancel", this._disableDelayedDrag), Y(e, "mousemove", this._delayedDragTouchMoveHandler), Y(e, "touchmove", this._delayedDragTouchMoveHandler), Y(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? J(document, "pointermove", this._onTouchMove) : t ? J(document, "touchmove", this._onTouchMove) : J(document, "mousemove", this._onTouchMove) : (J(Z, "dragend", this), J(_u, "dragstart", this._onDragStart));
		try {
			document.selection ? gd(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (Ou = !1, _u && Z) {
			mu("dragStarted", this, { evt: t }), this.nativeDraggable && J(document, "dragover", ad);
			var n = this.options;
			!e && zl(Z, n.dragClass, !1), zl(Z, n.ghostClass, !0), $.active = this, e && this._appendGhost(), hu({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (Mu) {
			this._lastX = Mu.clientX, this._lastY = Mu.clientY, nd();
			for (var e = document.elementFromPoint(Mu.clientX, Mu.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Mu.clientX, Mu.clientY), e !== t);) t = e;
			if (Z.parentNode[au]._isOutsideThisEl(e), t) do {
				if (t[au]) {
					var n = void 0;
					if (n = t[au]._onDragOver({
						clientX: Mu.clientX,
						clientY: Mu.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = Il(t));
			rd();
		}
	},
	_onTouchMove: function(e) {
		if (ju) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = Q && Bl(Q, !0), o = Q && a && a.a, s = Q && a && a.d, c = Ju && Uu && Jl(Uu), l = (i.clientX - ju.clientX + r.x) / (o || 1) + (c ? c[0] - Wu[0] : 0) / (o || 1), u = (i.clientY - ju.clientY + r.y) / (s || 1) + (c ? c[1] - Wu[1] : 0) / (s || 1);
			if (!$.active && !Ou) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (Q) {
				a ? (a.e += l - (Nu || 0), a.f += u - (Pu || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				X(Q, "webkitTransform", d), X(Q, "mozTransform", d), X(Q, "msTransform", d), X(Q, "transform", d), Nu = l, Pu = u, Mu = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!Q) {
			var e = this.options.fallbackOnBody ? document.body : _u, t = Ul(Z, !0, Ju, !0, e), n = this.options;
			if (Ju) {
				for (Uu = e; X(Uu, "position") === "static" && X(Uu, "transform") === "none" && Uu !== document;) Uu = Uu.parentNode;
				Uu !== document.body && Uu !== document.documentElement ? (Uu === document && (Uu = Hl()), t.top += Uu.scrollTop, t.left += Uu.scrollLeft) : Uu = Hl(), Wu = Jl(Uu);
			}
			Q = Z.cloneNode(!0), zl(Q, n.ghostClass, !1), zl(Q, n.fallbackClass, !0), zl(Q, n.dragClass, !0), X(Q, "transition", ""), X(Q, "transform", ""), X(Q, "box-sizing", "border-box"), X(Q, "margin", 0), X(Q, "top", t.top), X(Q, "left", t.left), X(Q, "width", t.width), X(Q, "height", t.height), X(Q, "opacity", "0.8"), X(Q, "position", Ju ? "absolute" : "fixed"), X(Q, "zIndex", "100000"), X(Q, "pointerEvents", "none"), $.ghost = Q, e.appendChild(Q), X(Q, "transform-origin", Fu / parseInt(Q.style.width) * 100 + "% " + Iu / parseInt(Q.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (mu("dragStart", this, { evt: e }), $.eventCanceled) {
			this._onDrop();
			return;
		}
		mu("setupClone", this), $.eventCanceled || (bu = ru(Z), bu.removeAttribute("id"), bu.draggable = !1, bu.style["will-change"] = "", this._hideClone(), zl(bu, this.options.chosenClass, !1), $.clone = bu), n.cloneId = gd(function() {
			mu("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || _u.insertBefore(bu, Z), n._hideClone(), hu({
				sortable: n,
				name: "clone"
			}));
		}), !t && zl(Z, i.dragClass, !0), t ? (ku = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (Y(document, "mouseup", n._onDrop), Y(document, "touchend", n._onDrop), Y(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, Z)), J(document, "drop", n), X(Z, "transform", "translateZ(0)")), Ou = !0, n._dragStartId = gd(n._dragStarted.bind(n, t, e)), J(document, "selectstart", n), Lu = !0, window.getSelection().removeAllRanges(), jl && X(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = $.active, l = Eu === s, u = o.sort, d = Du || c, f, p = this, m = !1;
		if (Gu) return;
		function h(o, s) {
			mu(o, p, bl({
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
					return sd(_u, t, Z, r, n, Ul(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (zl(Z, Du ? Du.options.ghostClass : c.options.ghostClass, !1), zl(Z, o.ghostClass, !0)), Du !== p && p !== $.active ? Du = p : p === $.active && Du && (Du = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === Z && !Z.animated || n === t && !n.animated) && (Ru = null), !o.dragoverBubble && !e.rootEl && n !== document && (Z.parentNode[au]._isOutsideThisEl(e.target), !r && id(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			Cu = ql(Z), Tu = ql(Z, o.draggable), hu({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: Cu,
				newDraggableIndex: Tu,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Ll(n, o.draggable, t, !0), h("dragOver"), $.eventCanceled) return m;
		if (Z.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (ku = !1, c && !o.disabled && (l ? u || (a = gu !== _u) : Du === this || (this.lastPutMode = Eu.checkPull(this, c, Z, e)) && s.checkPut(this, c, Z, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = Ul(Z), h("dragOverValid"), $.eventCanceled) return m;
			if (a) return gu = _u, g(), this._hideClone(), h("revert"), $.eventCanceled || (vu ? _u.insertBefore(Z, vu) : _u.appendChild(Z)), _(!0);
			var y = Kl(t, o.draggable);
			if (!y || dd(e, f, this) && !y.animated) {
				if (y === Z) return _(!1);
				if (y && t === e.target && (n = y), n && (i = Ul(n)), sd(_u, t, Z, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(Z, y.nextSibling) : t.appendChild(Z), gu = t, v(), _(!0);
			} else if (y && ud(e, f, this)) {
				var b = Gl(t, 0, o, !0);
				if (b === Z) return _(!1);
				if (n = b, i = Ul(n), sd(_u, t, Z, r, n, i, e, !1) !== !1) return g(), t.insertBefore(Z, b), gu = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = Ul(n);
				var x = 0, S, C = Z.parentNode !== t, w = !$u(Z.animated && Z.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Wl(n, "top", "top") || Wl(Z, "top", "top"), D = E ? E.scrollTop : void 0;
				Ru !== n && (S = i[T], Bu = !1, Vu = !w && o.invertSwap || C), x = fd(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Vu, Ru === n);
				var O;
				if (x !== 0) {
					var k = ql(Z);
					do
						k -= x, O = gu.children[k];
					while (O && (X(O, "display") === "none" || O === Q));
				}
				if (x === 0 || O === n) return _(!1);
				Ru = n, zu = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var M = sd(_u, t, Z, r, n, i, e, j);
				if (M !== !1) return (M === 1 || M === -1) && (j = M === 1), Gu = !0, setTimeout(ld, 30), g(), j && !A ? t.appendChild(Z) : n.parentNode.insertBefore(Z, j ? A : n), E && nu(E, 0, D - E.scrollTop), gu = Z.parentNode, S !== void 0 && !Vu && (Hu = Math.abs(S - Ul(n)[T])), v(), _(!0);
			}
			if (t.contains(Z)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		Y(document, "mousemove", this._onTouchMove), Y(document, "touchmove", this._onTouchMove), Y(document, "pointermove", this._onTouchMove), Y(document, "dragover", id), Y(document, "mousemove", id), Y(document, "touchmove", id);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		Y(e, "mouseup", this._onDrop), Y(e, "touchend", this._onDrop), Y(e, "pointerup", this._onDrop), Y(e, "pointercancel", this._onDrop), Y(e, "touchcancel", this._onDrop), Y(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (Cu = ql(Z), Tu = ql(Z, n.draggable), mu("drop", this, { evt: e }), gu = Z && Z.parentNode, Cu = ql(Z), Tu = ql(Z, n.draggable), $.eventCanceled) {
			this._nulling();
			return;
		}
		Ou = !1, Vu = !1, Bu = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _d(this.cloneId), _d(this._dragStartId), this.nativeDraggable && (Y(document, "drop", this), Y(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), jl && X(document.body, "user-select", ""), X(Z, "transform", ""), e && (Lu && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), Q && Q.parentNode && Q.parentNode.removeChild(Q), (_u === gu || Du && Du.lastPutMode !== "clone") && bu && bu.parentNode && bu.parentNode.removeChild(bu), Z && (this.nativeDraggable && Y(Z, "dragend", this), cd(Z), Z.style["will-change"] = "", Lu && !Ou && zl(Z, Du ? Du.options.ghostClass : this.options.ghostClass, !1), zl(Z, this.options.chosenClass, !1), hu({
			sortable: this,
			name: "unchoose",
			toEl: gu,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), _u === gu ? Cu !== Su && Cu >= 0 && (hu({
			sortable: this,
			name: "update",
			toEl: gu,
			originalEvent: e
		}), hu({
			sortable: this,
			name: "sort",
			toEl: gu,
			originalEvent: e
		})) : (Cu >= 0 && (hu({
			rootEl: gu,
			name: "add",
			toEl: gu,
			fromEl: _u,
			originalEvent: e
		}), hu({
			sortable: this,
			name: "remove",
			toEl: gu,
			originalEvent: e
		}), hu({
			rootEl: gu,
			name: "sort",
			toEl: gu,
			fromEl: _u,
			originalEvent: e
		}), hu({
			sortable: this,
			name: "sort",
			toEl: gu,
			originalEvent: e
		})), Du && Du.save()), $.active && ((Cu == null || Cu === -1) && (Cu = Su, Tu = wu), hu({
			sortable: this,
			name: "end",
			toEl: gu,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		mu("nulling", this), _u = Z = gu = Q = vu = bu = yu = xu = ju = Mu = Lu = Cu = Tu = Su = wu = Ru = zu = Du = Eu = $.dragged = $.ghost = $.clone = $.active = null;
		var e = this.el;
		Ku.forEach(function(t) {
			e.contains(t) && (t.checked = !0);
		}), Ku.length = Nu = Pu = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				Z && (this._onDragOver(e), od(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Ll(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || md(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Ll(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Ll(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = du.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && td(n);
	},
	destroy: function() {
		mu("destroy", this);
		var e = this.el;
		e[au] = null, Y(e, "mousedown", this._onTapStart), Y(e, "touchstart", this._onTapStart), Y(e, "pointerdown", this._onTapStart), this.nativeDraggable && (Y(e, "dragover", this), Y(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), Au.splice(Au.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!xu) {
			if (mu("hideClone", this), $.eventCanceled) return;
			X(bu, "display", "none"), this.options.removeCloneOnHide && bu.parentNode && bu.parentNode.removeChild(bu), xu = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (xu) {
			if (mu("showClone", this), $.eventCanceled) return;
			Z.parentNode == _u && !this.options.group.revertClone ? _u.insertBefore(bu, Z) : vu ? _u.insertBefore(bu, vu) : _u.appendChild(bu), this.options.group.revertClone && this.animate(Z, bu), X(bu, "display", ""), xu = !1;
		}
	}
};
function od(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function sd(e, t, n, r, i, a, o, s) {
	var c, l = e[au], u = l.options.onMove, d;
	return window.CustomEvent && !Ol && !kl ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || Ul(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function cd(e) {
	e.draggable = !1;
}
function ld() {
	Gu = !1;
}
function ud(e, t, n) {
	var r = Ul(Gl(n.el, 0, n.options, !0)), i = iu(n.el, n.options, Q), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function dd(e, t, n) {
	var r = Ul(Kl(n.el, n.options.draggable)), i = iu(n.el, n.options, Q), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function fd(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Hu < l * i) {
			if (!Bu && (zu === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Bu = !0), Bu) f = !0;
			else if (zu === 1 ? c < u + Hu : c > d - Hu) return -zu;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return pd(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function pd(e) {
	return ql(Z) < ql(e) ? 1 : -1;
}
function md(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function hd(e) {
	Ku.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Ku.push(r);
	}
}
function gd(e) {
	return setTimeout(e, 0);
}
function _d(e) {
	return clearTimeout(e);
}
qu && J(document, "touchmove", function(e) {
	($.active || Ou) && e.cancelable && e.preventDefault();
}), $.utils = {
	on: J,
	off: Y,
	css: X,
	find: Vl,
	is: function(e, t) {
		return !!Ll(e, t, e, !1);
	},
	extend: Zl,
	throttle: eu,
	closest: Ll,
	toggleClass: zl,
	clone: ru,
	index: ql,
	nextTick: gd,
	cancelNextTick: _d,
	detectDirection: Qu,
	getChild: Gl,
	expando: au
}, $.get = function(e) {
	return e[au];
}, $.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && ($.utils = bl(bl({}, $.utils), e.utils)), du.mount(e);
	});
}, $.create = function(e, t) {
	return new $(e, t);
}, $.version = El;
var vd = [], yd, bd, xd = !1, Sd, Cd, wd, Td;
function Ed() {
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
			this.sortable.nativeDraggable ? Y(document, "dragover", this._handleAutoScroll) : (Y(document, "pointermove", this._handleFallbackAutoScroll), Y(document, "touchmove", this._handleFallbackAutoScroll), Y(document, "mousemove", this._handleFallbackAutoScroll)), Od(), Dd(), tu();
		},
		nulling: function() {
			wd = bd = yd = xd = Td = Sd = Cd = null, vd.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (wd = e, t || this.options.forceAutoScrollFallback || kl || Ol || jl) {
				kd(e, this.options, a, t);
				var o = Xl(a, !0);
				xd && (!Td || r !== Sd || i !== Cd) && (Td && Od(), Td = setInterval(function() {
					var a = Xl(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, Dd()), kd(e, n.options, a, t);
				}, 10), Sd = r, Cd = i);
			} else {
				if (!this.options.bubbleScroll || Xl(a, !0) === Hl()) {
					Dd();
					return;
				}
				kd(e, this.options, Xl(a, !1), !1);
			}
		}
	}, vl(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function Dd() {
	vd.forEach(function(e) {
		clearInterval(e.pid);
	}), vd = [];
}
function Od() {
	clearInterval(Td);
}
var kd = eu(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Hl(), l = !1, u;
		bd !== n && (bd = n, Dd(), yd = t.scroll, u = t.scrollFn, yd === !0 && (yd = Xl(n, !0)));
		var d = 0, f = yd;
		do {
			var p = f, m = Ul(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = X(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!vd[d]) for (var A = 0; A <= d; A++) vd[A] || (vd[A] = {});
			(vd[d].vx != O || vd[d].vy != k || vd[d].el !== p) && (vd[d].el = p, vd[d].vx = O, vd[d].vy = k, clearInterval(vd[d].pid), (O != 0 || k != 0) && (l = !0, vd[d].pid = setInterval(function() {
				r && this.layer === 0 && $.active._onTouchMove(wd);
				var t = vd[this.layer].vy ? vd[this.layer].vy * s : 0, n = vd[this.layer].vx ? vd[this.layer].vx * s : 0;
				(typeof u != "function" || u.call($.dragged.parentNode[au], n, t, e, wd, vd[this.layer].el) === "continue") && nu(vd[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Xl(f, !1)));
		xd = l;
	}
}, 30), Ad = function(e) {
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
function jd() {}
jd.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Gl(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: Ad
}, vl(jd, { pluginName: "revertOnSpill" });
function Md() {}
Md.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: Ad
}, vl(Md, { pluginName: "removeOnSpill" }), $.mount(new Ed()), $.mount(Md, jd);
//#endregion
//#region resources/js/components/TaskCard.vue?vue&type=script&setup=true&lang.ts
var Nd = { class: "flex items-start justify-between gap-2" }, Pd = { class: "text-sm font-medium text-heading" }, Fd = { class: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted" }, Id = ["title"], Ld = { class: "mt-3 flex items-center justify-between gap-2" }, Rd = {
	key: 0,
	class: "text-xs tabular-nums text-muted"
}, zd = { class: "mt-2 flex items-center justify-between" }, Bd = {
	key: 1,
	class: "text-xs text-subtle"
}, Vd = ["title"], Hd = /* @__PURE__ */ l({
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
		}, u = B(), d = n(() => rt(r.task)), f = n(() => r.projects.find((e) => e.id === r.task.project_id)), m = n(() => r.task.project_id === null ? null : f.value?.identifier || f.value?.name || null), h = n(() => [f.value?.name, en(r.task.customer_id)].filter(Boolean).join(" · ")), g = n(() => r.members.find((e) => e.id === r.task.assignee_id)), _ = n(() => r.task.assignee_id === null ? null : g.value ? mt(g.value.name) : `#${r.task.assignee_id}`), y = n(() => g.value?.name ?? (r.task.assignee_id === null ? u("tasks_projects.tasks.unassigned") : `#${r.task.assignee_id}`)), b = n(() => Ra(d.value.logged_minutes));
		function x(e) {
			return u(`tasks_projects.tasks.priority.${e.toLowerCase()}`);
		}
		return (t, n) => (v(), a("article", {
			class: "cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover",
			onClick: n[2] ||= (t) => s("open", e.task)
		}, [
			o("div", Nd, [o("p", Pd, [o("button", {
				type: "button",
				class: "rounded-sm text-start focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
				onClick: n[0] ||= A((t) => s("open", e.task), ["stop"])
			}, C(e.task.name), 1)]), e.task.priority ? (v(), a("span", {
				key: 0,
				class: p(["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium", l[e.task.priority]])
			}, C(x(e.task.priority)), 3)) : i("", !0)]),
			o("div", Fd, [
				o("span", null, "#" + C(e.task.number), 1),
				m.value ? (v(), a("span", {
					key: 0,
					class: "rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body",
					title: h.value
				}, C(m.value), 9, Id)) : i("", !0),
				c(ha, { state: d.value.invoiced }, null, 8, ["state"])
			]),
			o("div", Ld, [c(xo, {
				client: e.client,
				notify: e.notify,
				task: e.task,
				members: e.members,
				onClick: n[1] ||= A(() => {}, ["stop"])
			}, null, 8, [
				"client",
				"notify",
				"task",
				"members"
			]), d.value.logged_minutes > 0 ? (v(), a("span", Rd, C(b.value), 1)) : i("", !0)]),
			o("div", zd, [e.task.due_date ? (v(), a("span", {
				key: 0,
				class: p(["text-xs", w(ht)(e.task.due_date) && !e.task.closed_at ? "font-medium text-status-red" : "text-muted"])
			}, C(w(dt)(e.task.due_date)), 3)) : (v(), a("span", Bd, "-")), _.value ? (v(), a("span", {
				key: 2,
				class: "flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500",
				title: y.value
			}, C(_.value), 9, Vd)) : i("", !0)])
		]));
	}
}), Ud = { class: "mt-4" }, Wd = {
	key: 0,
	class: "mb-3 text-xs text-subtle"
}, Gd = {
	key: 1,
	class: "flex justify-center py-16"
}, Kd = {
	key: 3,
	class: "flex items-start gap-4 overflow-x-auto pb-4"
}, qd = { class: "flex items-center justify-between border-b border-line-light px-3 py-2.5" }, Jd = { class: "flex items-center" }, Yd = { class: "text-sm font-semibold text-heading" }, Xd = { class: "ms-2 text-xs text-muted" }, Zd = [
	"aria-label",
	"title",
	"onClick"
], Qd = ["data-status-id"], $d = {
	key: 0,
	class: "px-3 pt-2 text-xs text-subtle"
}, ef = { class: "px-3 pt-2 pb-3" }, tf = ["onClick"], nf = /* @__PURE__ */ l({
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
				let t = rt(e).invoiced;
				return M.value && t === "invoiced" ? !1 : Ui(l.filters.status) ? l.filters.status === "invoiced" ? t === "invoiced" : t !== "invoiced" : !0;
			});
		}
		E(() => `${l.filters.project}|${l.filters.user}`, () => void P(), { immediate: !0 }), E(tt, () => void P()), h(() => {
			for (let e of T.values()) e.destroy();
			T.clear(), O.clear();
		});
		async function P() {
			let e = {}, t = Xi(l.filters.project), n = Xi(l.filters.user);
			t !== null && (e.project_id = t), n !== null && (e.assignee_id = n), f.value = !0;
			try {
				d.value = await or(l.client, e), d.value.some((e) => e.tasks.some((e) => e.customer_id !== null)) && tn(l.client);
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
				let e = await _r(l.client, s.id, {
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
				project_id: Xi(l.filters.project)
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
			return v(), a("section", Ud, [
				M.value ? (v(), a("p", Wd, C(w(u)("tasks_projects.board.hidden_invoiced")), 1)) : i("", !0),
				f.value && d.value.length === 0 ? (v(), a("div", Gd, [c(l, { class: "h-8 w-8 text-primary-500" })])) : j.value ? (v(), r(b, {
					key: 2,
					title: w(u)("tasks_projects.task_statuses.none"),
					description: w(u)("tasks_projects.tasks.empty_description")
				}, {
					default: D(() => [c(h, {
						name: "ViewColumnsIcon",
						class: "mt-5 mb-4 h-16 w-16 text-subtle"
					})]),
					_: 1
				}, 8, ["title", "description"])) : (v(), a("div", Kd, [(v(!0), a(e, null, x(d.value, (n) => (v(), a("section", {
					key: n.status.id,
					class: "w-64 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
				}, [
					o("header", qd, [o("div", Jd, [
						o("span", {
							class: p(["me-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full", n.status.colour ? "" : "bg-line-default"]),
							style: m(n.status.colour ? { backgroundColor: n.status.colour } : void 0)
						}, null, 6),
						o("h3", Yd, C(n.status.name), 1),
						o("span", Xd, C(N(n).length), 1)
					]), o("button", {
						type: "button",
						class: "rounded-md p-1 text-subtle hover:bg-hover hover:text-body",
						"aria-label": w(u)("tasks_projects.tasks.new_task"),
						title: w(u)("tasks_projects.tasks.new_task"),
						onClick: (e) => z(n.status)
					}, [c(h, {
						name: "PlusIcon",
						class: "h-4 w-4"
					})], 8, Zd)]),
					o("div", {
						ref_for: !0,
						ref: (e) => F(n.status.id, e),
						"data-status-id": n.status.id,
						class: "min-h-20 space-y-2 px-3 pt-3"
					}, [(v(!0), a(e, null, x(N(n), (e) => (v(), r(Hd, {
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
					]))), 128))], 8, Qd),
					N(n).length === 0 ? (v(), a("p", $d, C(w(u)("tasks_projects.board.empty_column")), 1)) : i("", !0),
					o("div", ef, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body",
						onClick: (e) => z(n.status)
					}, " + " + C(w(u)("tasks_projects.tasks.new_task")), 9, tf)])
				]))), 128))])),
				c(wa, {
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
}), rf = /* @__PURE__ */ l({
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
		return t({ openCreate: () => n.value?.openCreate() }), (t, i) => (v(), r(Ao, {
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
}), af = { class: "relative table-container" }, of = { class: "block max-w-64 truncate" }, sf = { class: "tabular-nums" }, cf = {
	key: 1,
	class: "text-subtle"
}, lf = /* @__PURE__ */ l({
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
				tdClass: "text-end text-sm font-medium"
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
			m.from = e ? ft(e) : "";
		}
		function A(e) {
			m.to = e ? ft(e) : "";
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
				let e = await Oe(l.client, t), n = e.data ?? [];
				return et(l.client, n.map((e) => e.task_id).filter((e) => typeof e == "number")), {
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
			}), o("div", af, [c(F, {
				ref_key: "tableRef",
				ref: f,
				data: M,
				columns: _.value,
				class: "mt-3"
			}, {
				"cell-date": D(({ row: e }) => [s(C(w(dt)(w(Va)(e.data.started_at))), 1)]),
				"cell-member": D(({ row: e }) => [s(C(j(e.data.user_id)), 1)]),
				"cell-task": D(({ row: e }) => [s(C(w(Qe)(e.data.task_id)), 1)]),
				"cell-description": D(({ row: e }) => [o("span", of, C(e.data.description || "-"), 1)]),
				"cell-duration": D(({ row: e }) => [o("span", sf, C(w(Ra)(e.data.duration_minutes)), 1)]),
				"cell-billable": D(({ row: e }) => [c(x, { class: p(["rounded-full", e.data.billable ? "bg-primary-50! text-primary-500!" : "bg-surface-tertiary! text-muted!"]) }, {
					default: D(() => [s(C(e.data.billable ? w(d)("tasks_projects.time.billable") : w(d)("tasks_projects.time.non_billable")), 1)]),
					_: 2
				}, 1032, ["class"])]),
				"cell-amount": D(({ row: e }) => [e.data.billable ? (v(), r(T, {
					key: 0,
					amount: e.data.amount
				}, null, 8, ["amount"])) : (v(), a("span", cf, "-"))]),
				"cell-actions": D(({ row: t }) => [c(P, { label: e.$t("tasks_projects.general.actions") }, {
					activator: D(() => [c(E, {
						name: "EllipsisHorizontalIcon",
						class: "h-5 text-muted"
					})]),
					default: D(() => [c(N, { onClick: (e) => u("edit", t.data) }, {
						default: D(() => [c(E, {
							name: "PencilIcon",
							class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + C(w(d)("tasks_projects.general.edit")), 1)]),
						_: 1
					}, 8, ["onClick"]), t.data.invoice_id === null ? (v(), r(N, {
						key: 0,
						onClick: (e) => u("delete", t.data)
					}, {
						default: D(() => [c(E, {
							name: "TrashIcon",
							class: "me-3 h-5 w-5 text-subtle group-hover:text-muted"
						}), s(" " + C(w(d)("tasks_projects.general.delete")), 1)]),
						_: 1
					}, 8, ["onClick"])) : i("", !0)]),
					_: 2
				}, 1032, ["label"])]),
				_: 1
			}, 8, ["columns"])])]);
		};
	}
}), uf = { class: "mt-4 flex flex-wrap items-center justify-between gap-3" }, df = { class: "flex items-center gap-2" }, ff = { class: "ms-1 text-sm text-muted" }, pf = { class: "flex items-center gap-2 text-sm" }, mf = { class: "text-muted" }, hf = { class: "text-lg font-semibold tabular-nums text-heading" }, gf = {
	key: 0,
	class: "mt-6 text-sm text-muted"
}, _f = {
	key: 1,
	class: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
}, vf = { class: "flex items-baseline justify-between" }, yf = { class: "text-xs font-semibold tracking-wide text-heading uppercase" }, bf = { class: "text-xs text-muted" }, xf = { class: "text-sm font-medium tabular-nums text-heading" }, Sf = { class: "mt-3 flex-1 space-y-2" }, Cf = ["onClick"], wf = { class: "flex items-center justify-between gap-2" }, Tf = { class: "truncate text-xs font-medium text-heading" }, Ef = { class: "shrink-0 text-xs tabular-nums text-muted" }, Df = {
	key: 0,
	class: "mt-1 block truncate text-xs text-muted"
}, Of = { class: "mt-1 flex items-center gap-1" }, kf = { class: "text-[11px] text-subtle" }, Af = {
	key: 0,
	class: "text-[11px] text-subtle"
}, jf = {
	key: 0,
	class: "py-2 text-xs text-subtle"
}, Mf = ["onClick"], Nf = {
	key: 2,
	class: "mt-4 text-center text-sm text-subtle"
}, Pf = /* @__PURE__ */ l({
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
		let u = t, d = l, f = B(), m = b(Ga(/* @__PURE__ */ new Date(), u.weekStart)), h = b([]), g = b(!1), _ = n(() => Ka(m.value)), y = n(() => {
			let e = _.value[0], t = _.value[_.value.length - 1];
			return `${Ya(e).day} - ${Ya(t).day}`;
		}), T = n(() => _.value.map((e) => {
			let t = Ja(e), n = h.value.filter((e) => Va(e.started_at) === t), r = Ya(e);
			return {
				key: t,
				weekday: r.weekday,
				day: r.day,
				today: Xa(e),
				entries: n,
				minutes: A(n)
			};
		})), O = n(() => A(h.value)), k = n(() => !g.value && h.value.length === 0);
		E(() => u.weekStart, (e) => {
			m.value = Ga(m.value, e);
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
					from: Ja(_.value[0]),
					to: Ja(_.value[_.value.length - 1])
				};
				u.projectId && (e.project_id = u.projectId);
				let t = await ke(u.client, e);
				h.value = t, et(u.client, t.map((e) => e.task_id).filter((e) => typeof e == "number"));
			} catch (e) {
				h.value = [], u.notify("error", H(e, f("tasks_projects.time.load_failed")));
			} finally {
				g.value = !1;
			}
		}
		function M(e) {
			m.value = qa(m.value, e * 7);
		}
		function N() {
			m.value = Ga(/* @__PURE__ */ new Date(), u.weekStart);
		}
		return (n, l) => {
			let u = S("BaseIcon"), m = S("BaseButton"), h = S("BaseSpinner");
			return v(), a("section", null, [
				o("header", uf, [o("div", df, [
					c(m, {
						variant: "white",
						size: "sm",
						title: w(f)("tasks_projects.time.previous_week"),
						"aria-label": w(f)("tasks_projects.time.previous_week"),
						onClick: l[0] ||= (e) => M(-1)
					}, {
						default: D(() => [c(u, {
							name: "ChevronLeftIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title", "aria-label"]),
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
						"aria-label": w(f)("tasks_projects.time.next_week"),
						onClick: l[1] ||= (e) => M(1)
					}, {
						default: D(() => [c(u, {
							name: "ChevronRightIcon",
							class: "h-4 w-4"
						})]),
						_: 1
					}, 8, ["title", "aria-label"]),
					o("span", ff, C(y.value), 1)
				]), o("div", pf, [
					o("span", mf, C(w(f)("tasks_projects.time.week_total")), 1),
					o("span", hf, C(w(Ra)(O.value)), 1),
					g.value ? (v(), r(h, {
						key: 0,
						class: "h-4 w-4 text-primary-500"
					})) : i("", !0)
				])]),
				t.userId === null ? (v(), a("p", gf, C(w(f)("tasks_projects.time.unknown_user")), 1)) : (v(), a("div", _f, [(v(!0), a(e, null, x(T.value, (t) => (v(), a("article", {
					key: t.key,
					class: p(["flex min-h-40 flex-col rounded-xl border bg-surface p-3", t.today ? "border-primary-400" : "border-line-default"])
				}, [
					o("header", vf, [o("div", null, [o("p", yf, C(t.weekday), 1), o("p", bf, C(t.day), 1)]), o("span", xf, C(w(Ra)(t.minutes)), 1)]),
					o("ul", Sf, [(v(!0), a(e, null, x(t.entries, (e) => (v(), a("li", { key: e.id }, [o("button", {
						type: "button",
						class: "w-full rounded-md border border-line-light px-2 py-2 text-start hover:bg-hover",
						onClick: (t) => d("edit", e)
					}, [
						o("span", wf, [o("span", Tf, C(w(Qe)(e.task_id)), 1), o("span", Ef, C(w(Ra)(e.duration_minutes)), 1)]),
						e.description ? (v(), a("span", Df, C(e.description), 1)) : i("", !0),
						o("span", Of, [
							o("span", { class: p(["inline-block h-1.5 w-1.5 rounded-full", e.billable ? "bg-status-green" : "bg-line-strong"]) }, null, 2),
							o("span", kf, C(e.billable ? w(f)("tasks_projects.time.billable") : w(f)("tasks_projects.time.non_billable")), 1),
							e.invoice_id === null ? i("", !0) : (v(), a("span", Af, " - " + C(w(f)("tasks_projects.time.billed")), 1))
						])
					], 8, Cf)]))), 128)), t.entries.length === 0 ? (v(), a("li", jf, C(w(f)("tasks_projects.time.no_entries")), 1)) : i("", !0)]),
					o("button", {
						type: "button",
						class: "mt-2 flex items-center justify-center gap-1 rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-heading",
						onClick: (e) => d("add", t.key)
					}, [c(u, {
						name: "PlusIcon",
						class: "h-4 w-4"
					}), s(" " + C(w(f)("tasks_projects.time.add_entry")), 1)], 8, Mf)
				], 2))), 128))])),
				k.value && t.userId !== null ? (v(), a("p", Nf, C(w(f)("tasks_projects.time.empty_description")), 1)) : i("", !0)
			]);
		};
	}
}), Ff = {
	key: 0,
	class: "mt-4 flex gap-6 border-b border-line-default"
}, If = 5, Lf = /* @__PURE__ */ l({
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
		let t = e, s = B(), l = b("MINE"), u = b(!1), d = b(!1), f = b(null), m = b(Ja(/* @__PURE__ */ new Date())), h = b(0), _ = n(() => G.settings.week_start), y = n(() => Xi(t.filters.project)), x = n(() => Xi(t.filters.user) ?? G.userId);
		g(() => void S()), E(tt, () => {
			h.value += 1;
		});
		async function S() {
			G.userId === null && await Ea(t.client), u.value = G.settings.members_see_all_time || await T();
		}
		async function T() {
			try {
				return ((await Oe(t.client, { limit: If })).data ?? []).some((e) => e.user_id !== G.userId);
			} catch {
				return !1;
			}
		}
		function D(e) {
			f.value = null, m.value = e ?? Ja(/* @__PURE__ */ new Date()), d.value = !0;
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
				await Me(t.client, e.id), t.notify("success", s("tasks_projects.time.deleted")), h.value += 1, V();
			} catch (e) {
				t.notify("error", H(e, s("tasks_projects.time.delete_failed")));
			}
		}
		function M(e) {
			return l.value === e ? "border-primary-500 text-primary-500" : "border-transparent text-muted hover:border-line-strong hover:text-heading";
		}
		return (t, n) => (v(), a("section", null, [
			u.value ? (v(), a("nav", Ff, [o("button", {
				type: "button",
				class: p(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("MINE")]),
				onClick: n[0] ||= (e) => l.value = "MINE"
			}, C(w(s)("tasks_projects.time.my_time")), 3), o("button", {
				type: "button",
				class: p(["-mb-px border-b-2 px-1 pb-3 text-sm font-medium", M("ALL")]),
				onClick: n[1] ||= (e) => l.value = "ALL"
			}, C(w(s)("tasks_projects.time.all_time")), 3)])) : i("", !0),
			l.value === "MINE" ? (v(), r(Pf, {
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
			])) : (v(), r(lf, {
				key: 2,
				client: e.client,
				notify: e.notify,
				members: e.members,
				"member-id": w(Xi)(e.filters.user),
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
			c(Go, {
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
}), Rf = {
	viewTask: `${U}:view-task`,
	viewOwnTime: `${U}:view-own-time`
};
function zf(e) {
	e.addMessages($s), e.registerPage({
		id: "tasks",
		module: U,
		path: "",
		component: cn(e, gl),
		meta: {
			ability: Rf.viewTask,
			title: "tasks_projects.tasks.title"
		},
		children: [
			{
				id: "list",
				path: "",
				component: cn(e, rf),
				meta: {
					ability: Rf.viewTask,
					title: "tasks_projects.tasks.views.list"
				}
			},
			{
				id: "board",
				path: "board",
				component: cn(e, nf),
				meta: {
					ability: Rf.viewTask,
					title: "tasks_projects.board.title"
				}
			},
			{
				id: "week",
				path: "week",
				component: cn(e, Lf),
				meta: {
					ability: Rf.viewOwnTime,
					title: "tasks_projects.time.title"
				}
			}
		]
	}), e.registerPage({
		id: "task",
		module: U,
		path: "tasks/:id",
		component: cn(e, ll),
		meta: {
			ability: Rf.viewTask,
			title: "tasks_projects.tasks.title"
		}
	}), e.registerPage({
		id: "time",
		module: U,
		path: "time",
		component: Bf(e),
		meta: {
			ability: Rf.viewOwnTime,
			title: "tasks_projects.time.title"
		}
	});
}
function Bf(e) {
	return l({ setup: () => (g(() => {
		e.router.replace(W.week);
	}), () => null) });
}
//#endregion
//#region resources/js/components/QuickStartOverlay.vue?vue&type=script&setup=true&lang.ts
var Vf = ["aria-label"], Hf = { class: "flex items-center justify-between border-b border-line-default px-4 py-3" }, Uf = { class: "text-sm font-semibold text-heading" }, Wf = ["aria-label"], Gf = { class: "space-y-4 px-4 py-4" }, Kf = { class: "truncate text-sm font-medium text-heading" }, qf = { class: "mt-1 text-2xl font-semibold tabular-nums text-primary-500" }, Jf = {
	key: 0,
	class: "mt-1 text-xs text-muted"
}, Yf = { class: "flex items-center justify-between" }, Xf = ["title", "aria-label"], Zf = {
	key: 0,
	class: "tabular-nums"
}, Qf = "[aria-label=\"Open AI Assistant\"]", $f = "/admin/settings", ep = /* @__PURE__ */ l({
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
		})), O = n(() => Qe(q.running?.task_id ?? null)), A = n(() => La(q.elapsedSeconds)), j = n(() => q.stopPrompt !== null || q.startPrompt !== null), M = n(() => j.value || _.value.startsWith($f)), N = n(() => y.value ? "bottom-24" : "bottom-5");
		function P() {
			y.value = Array.from(document.querySelectorAll(Qf)).some((e) => window.getComputedStyle(e).position === "fixed");
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
				class: p(["fixed end-5 z-40 flex flex-col items-end gap-3", N.value])
			}, [m.value && w(q).running !== null ? (v(), a("section", {
				key: 0,
				class: "w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl",
				"aria-label": w(f)("tasks_projects.timer.panel_title"),
				onKeydown: k(F, ["esc"])
			}, [o("header", Hf, [o("h2", Uf, C(w(f)("tasks_projects.timer.running")), 1), o("button", {
				type: "button",
				class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
				"aria-label": w(f)("tasks_projects.timer.close"),
				onClick: F
			}, [c(u, {
				name: "XMarkIcon",
				class: "h-5 w-5"
			})], 8, Wf)]), o("div", Gf, [o("div", null, [
				o("p", Kf, C(O.value), 1),
				o("p", qf, C(A.value), 1),
				w(q).running.description ? (v(), a("p", Jf, C(w(q).running.description), 1)) : i("", !0)
			]), o("div", Yf, [o("button", {
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
			}, 8, ["disabled"])])])], 40, Vf)) : i("", !0), o("button", {
				type: "button",
				class: p(["flex items-center justify-center gap-2 rounded-full bg-btn-primary text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover", w(q).running === null ? "h-14 w-14 p-0" : "h-14 px-5"]),
				title: w(f)("tasks_projects.timer.quick_start"),
				"aria-label": w(f)("tasks_projects.timer.quick_start"),
				onClick: I
			}, [c(u, {
				name: w(q).running === null ? "ClockIcon" : "StopIcon",
				class: "h-5 w-5 text-white"
			}, null, 8, ["name"]), w(q).running === null ? i("", !0) : (v(), a("span", Zf, C(A.value), 1))], 10, Xf)], 2)) : i("", !0)]);
		};
	}
}), tp = { class: "flex w-full items-center justify-between" }, np = ["aria-label"], rp = { class: "space-y-5 px-6 py-6" }, ip = { class: "flex justify-end space-x-3 border-t border-line-default px-6 py-4" }, ap = 0, op = -1, sp = 100, cp = 10, lp = /* @__PURE__ */ l({
	__name: "StartTimerModal",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	setup(e) {
		let t = e, i = B(), a = b([]), l = b(ap), u = b(null), d = b(""), m = b(!0), h = n(() => q.startPrompt !== null), g = n(() => [{
			id: ap,
			label: i("tasks_projects.timer.any_project")
		}, ...a.value]), _ = n(() => g.value.find((e) => e.id === l.value) ?? null);
		E(() => q.startPrompt, (e) => {
			e !== null && (l.value = typeof e.projectId == "number" ? e.projectId : ap, u.value = null, d.value = "", m.value = !0, y(), typeof e.taskId == "number" && x(e.taskId));
		}), E(l, () => {
			u.value = null;
		});
		async function y() {
			try {
				let e = await Ut(t.client, {
					limit: sp,
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
				let n = await Ue(t.client, e);
				$e(n), typeof n.project_id == "number" && (l.value = n.project_id), await f(), j(T(n));
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
				let e = await He(t.client, n, {
					projectId: l.value === ap ? null : l.value,
					invoiced: 0,
					limit: cp
				});
				e.forEach($e);
				let r = e.map(T);
				return r.length === 0 && n !== "" && r.push({
					id: op,
					label: i("tasks_projects.timer.create_and_start", { name: n }),
					name: n,
					billable: !0
				}), r;
			} catch (e) {
				return t.notify("error", H(e, i("tasks_projects.time.tasks_failed"))), [];
			}
		}
		function k(e) {
			l.value = e?.id ?? ap;
		}
		function j(e) {
			u.value = e, m.value = e === null || e.billable;
		}
		function M() {
			let e = u.value;
			if (e === null) return;
			let t = d.value.trim() || null, n = l.value === ap ? null : l.value;
			q.answerStart(e.id === op ? {
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
				header: D(() => [o("div", tp, [o("span", null, C(w(i)("tasks_projects.timer.start_title")), 1), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(i)("tasks_projects.general.close"),
					onClick: N
				}, [c(n, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, np)])]),
				default: D(() => [o("form", { onSubmit: A(M, ["prevent"]) }, [o("div", rp, [
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
				]), o("div", ip, [c(x, {
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
}), up = { class: "flex w-full items-center justify-between" }, dp = ["aria-label"], fp = { class: "space-y-5 px-6 py-6" }, pp = { class: "truncate text-sm font-medium text-heading" }, mp = { class: "mt-1 text-3xl font-semibold tabular-nums text-primary-500" }, hp = { class: "mt-1 text-xs text-muted" }, gp = { class: "border-t border-line-default px-6 py-4" }, _p = {
	key: 0,
	class: "flex flex-wrap items-center justify-between gap-3"
}, vp = { class: "text-sm text-body" }, yp = { class: "flex space-x-3" }, bp = {
	key: 1,
	class: "flex items-center justify-between"
}, xp = { class: "flex space-x-3" }, Sp = /* @__PURE__ */ l({
	__name: "StopTimerModal",
	setup(e) {
		let t = B(), i = b(""), l = b(!0), u = b(!1), d = n(() => q.stopPrompt !== null), f = n(() => Qe(q.stopPrompt?.entry.task_id ?? null)), m = n(() => La(q.elapsedSeconds)), h = n(() => G.settings.rounding_minutes), g = n(() => Ra(Ba(Math.round(q.elapsedSeconds / 60), h.value, G.settings.rounding_direction))), _ = n(() => h.value > 1 ? t("tasks_projects.timer.saved_as", {
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
				header: D(() => [o("div", up, [o("span", null, C(w(t)("tasks_projects.timer.stop_title")), 1), o("button", {
					type: "button",
					class: "-m-1.5 rounded-lg p-1.5 text-subtle hover:text-body focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500",
					"aria-label": w(t)("tasks_projects.general.close"),
					onClick: T
				}, [c(h, {
					name: "XMarkIcon",
					class: "h-6 w-6"
				})], 8, dp)])]),
				default: D(() => [o("form", { onSubmit: A(y, ["prevent"]) }, [o("div", fp, [
					o("div", null, [
						o("p", pp, C(f.value), 1),
						o("p", mp, C(m.value), 1),
						o("p", hp, C(_.value), 1)
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
				]), o("div", gp, [u.value ? (v(), a("div", _p, [o("p", vp, C(w(t)("tasks_projects.timer.discard_ask", { duration: m.value })), 1), o("div", yp, [c(O, {
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
				}, 8, ["disabled"])])])) : (v(), a("div", bp, [c(O, {
					type: "button",
					variant: "white",
					disabled: w(q).busy,
					onClick: n[3] ||= (e) => u.value = !0
				}, {
					default: D(() => [s(C(w(t)("tasks_projects.timer.discard")), 1)]),
					_: 1
				}, 8, ["disabled"]), o("div", xp, [c(O, {
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
}), Cp = {
	key: 0,
	class: "relative float-start m-0 ms-2"
}, wp = ["title"], Tp = ["aria-label", "title"], Ep = { class: "font-medium tabular-nums" }, Dp = [
	"disabled",
	"title",
	"aria-label"
], Op = /* @__PURE__ */ l({
	__name: "TimerChip",
	props: {
		client: { type: [Function, Object] },
		notify: { type: Function }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let r = e, s = t, l = B(), u = n(() => Qe(q.running?.task_id ?? null)), d = n(() => La(q.elapsedSeconds));
		function f() {
			q.stopWithPrompt(r.client, {
				notify: r.notify,
				t: l
			});
		}
		return (e, t) => {
			let n = S("BaseIcon");
			return w(q).running === null ? i("", !0) : (v(), a("li", Cp, [o("div", {
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
				}, C(u.value), 9, Tp),
				o("span", Ep, C(d.value), 1),
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
				})], 8, Dp)
			], 8, wp)]));
		};
	}
}), kp = { en: { tasks_projects: {
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
} } }, Ap = {
	key: 0,
	class: "text-sm text-muted"
}, jp = { key: 1 }, Mp = {
	key: 0,
	class: "flex items-center gap-2 text-sm text-muted"
}, Np = {
	key: 1,
	class: "text-sm text-muted"
}, Pp = {
	key: 2,
	class: "divide-y divide-line-light"
}, Fp = {
	key: 0,
	class: "space-y-3"
}, Ip = { class: "flex flex-wrap items-center gap-2" }, Lp = [
	"aria-label",
	"aria-pressed",
	"onClick"
], Rp = { class: "flex flex-wrap items-center gap-6" }, zp = { class: "flex items-center gap-2 text-sm text-body" }, Bp = { class: "flex items-center gap-2 text-sm text-body" }, Vp = { class: "flex gap-3" }, Hp = {
	key: 1,
	class: "flex items-center gap-3"
}, Up = { class: "min-w-0 flex-1 truncate text-sm font-medium text-heading" }, Wp = { class: "flex items-center gap-1" }, Gp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Kp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], qp = [
	"title",
	"aria-label",
	"onClick"
], Jp = [
	"disabled",
	"title",
	"aria-label",
	"onClick"
], Yp = {
	key: 3,
	class: "mt-4 space-y-3 rounded-lg border border-line-default p-3"
}, Xp = { class: "flex flex-wrap items-center gap-2" }, Zp = [
	"aria-label",
	"aria-pressed",
	"onClick"
], Qp = { class: "flex flex-wrap items-center gap-6" }, $p = { class: "flex items-center gap-2 text-sm text-body" }, em = { class: "flex items-center gap-2 text-sm text-body" }, tm = { class: "flex gap-3" }, nm = /* @__PURE__ */ l({
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
				f.value = await Le(l.client), _.value = !1;
			} catch (e) {
				f.value = [], _.value = yt(e), _.value || l.notify("error", H(e, d("tasks_projects.settings.load_failed")));
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
				e === null ? (await Re(l.client, F()), l.notify("success", d("tasks_projects.settings.status_created", { name: t }))) : (await ze(l.client, e, F()), l.notify("success", d("tasks_projects.settings.status_updated", { name: t }))), P(), await j();
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
					await Be(l.client, e.id), l.notify("success", d("tasks_projects.settings.status_deleted", { name: e.name })), P(), await j();
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
				f.value = await Ve(l.client, r.map((e) => e.id)), l.notify("success", d("tasks_projects.settings.status_reordered"));
			} catch (e) {
				l.notify("error", H(e, d("tasks_projects.settings.reorder_failed"))), await j();
			} finally {
				T.value = !1;
			}
		}
		return (t, n) => {
			let l = S("BaseSpinner"), g = S("BaseInput"), y = S("BaseInputGroup"), b = S("BaseSwitch"), j = S("BaseButton"), F = S("BaseBadge"), z = S("BaseIcon");
			return v(), a("div", null, [_.value ? (v(), a("p", Ap, C(w(d)("tasks_projects.settings.forbidden")), 1)) : (v(), a("div", jp, [h.value ? (v(), a("div", Mp, [c(l, { class: "h-4 w-4 text-primary-500" })])) : A.value ? (v(), a("p", Np, C(w(d)("tasks_projects.settings.no_statuses")), 1)) : (v(), a("ul", Pp, [(v(!0), a(e, null, x(f.value, (t, l) => (v(), a("li", {
				key: t.id,
				class: "py-3"
			}, [E.value === t.id ? (v(), a("div", Fp, [
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
					default: D(() => [o("div", Ip, [(v(), a(e, null, x(u, (e) => o("button", {
						key: e,
						type: "button",
						class: p(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: m({ backgroundColor: e }),
						"aria-label": w(d)(w(wr)(e)),
						"aria-pressed": k.colour === e,
						onClick: (t) => k.colour = e
					}, null, 14, Lp)), 64)), o("button", {
						type: "button",
						class: "rounded-md border border-line-default px-2 py-1 text-xs text-muted hover:bg-hover",
						onClick: n[1] ||= (e) => k.colour = ""
					}, C(w(d)("tasks_projects.settings.colour_none")), 1)])]),
					_: 1
				}, 8, ["label"]),
				o("div", Rp, [o("label", zp, [c(b, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[2] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_default")), 1)]), o("label", Bp, [c(b, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[3] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", Vp, [c(j, {
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
			])) : (v(), a("div", Hp, [
				o("span", {
					class: p(["inline-block h-3 w-3 shrink-0 rounded-full", t.colour ? "" : "bg-line-default"]),
					style: m(t.colour ? { backgroundColor: t.colour } : void 0)
				}, null, 6),
				o("span", Up, C(t.name), 1),
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
				o("div", Wp, [
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
					})], 8, Gp),
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
					})], 8, Kp),
					o("button", {
						type: "button",
						class: "rounded p-1 text-subtle hover:bg-hover hover:text-heading",
						title: w(d)("tasks_projects.general.edit"),
						"aria-label": w(d)("tasks_projects.general.edit"),
						onClick: (e) => M(t)
					}, [c(z, {
						name: "PencilIcon",
						class: "h-4 w-4"
					})], 8, qp),
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
					})], 8, Jp)
				])
			]))]))), 128))])), O.value ? (v(), a("div", Yp, [
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
					default: D(() => [o("div", Xp, [(v(), a(e, null, x(u, (e) => o("button", {
						key: e,
						type: "button",
						class: p(["h-7 w-7 rounded-full border-2 transition", k.colour === e ? "border-heading" : "border-line-default"]),
						style: m({ backgroundColor: e }),
						"aria-label": w(d)(w(wr)(e)),
						"aria-pressed": k.colour === e,
						onClick: (t) => k.colour = e
					}, null, 14, Zp)), 64))])]),
					_: 1
				}, 8, ["label"]),
				o("div", Qp, [o("label", $p, [c(b, {
					modelValue: k.is_default,
					"onUpdate:modelValue": n[5] ||= (e) => k.is_default = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_default")), 1)]), o("label", em, [c(b, {
					modelValue: k.is_closed,
					"onUpdate:modelValue": n[6] ||= (e) => k.is_closed = e,
					class: "flex"
				}, null, 8, ["modelValue"]), s(" " + C(w(d)("tasks_projects.settings.is_closed")), 1)])]),
				o("div", tm, [c(j, {
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
}), rm = { class: "space-y-6" }, im = { class: "divide-y divide-line-light" }, am = { class: "text-sm text-muted" }, om = { class: "text-sm font-medium text-heading" }, sm = { class: "divide-y divide-line-light" }, cm = { class: "text-sm text-muted" }, lm = { class: "text-sm font-medium text-heading" }, um = { class: "divide-y divide-line-light" }, dm = { class: "text-sm text-muted" }, fm = { class: "text-sm font-medium text-heading" }, pm = /* @__PURE__ */ l({
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
				value: st(i.value.default_rate)
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
			return v(), a("div", rm, [
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
					default: D(() => [o("dl", im, [(v(!0), a(e, null, x(u.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", am, C(e.label), 1), o("dd", om, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.behaviour_title"),
					description: w(r)("tasks_projects.settings.behaviour_description")
				}, {
					default: D(() => [o("dl", sm, [(v(!0), a(e, null, x(d.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", cm, C(e.label), 1), o("dd", lm, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.invoice_title"),
					description: w(r)("tasks_projects.settings.invoice_description")
				}, {
					default: D(() => [o("dl", um, [(v(!0), a(e, null, x(f.value, (e) => (v(), a("div", {
						key: e.key,
						class: "flex justify-between gap-4 py-2.5"
					}, [o("dt", dm, C(e.label), 1), o("dd", fm, C(e.value), 1)]))), 128))])]),
					_: 1
				}, 8, ["title", "description"]),
				c(g, {
					title: w(r)("tasks_projects.settings.statuses_title"),
					description: w(r)("tasks_projects.settings.statuses_description")
				}, {
					default: D(() => [c(nm, {
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
function mm(e) {
	e.addMessages(kp);
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
		component: l({ setup: () => () => d(Op, {
			client: e.client,
			notify: t,
			onOpen: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.quick-start`,
		component: l({ setup: () => () => d(ep, {
			key: G.companySession,
			client: e.client,
			notify: t,
			enabled: !G.adminMode,
			router: e.router,
			onOpenTask: n
		}) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.stop-timer`,
		component: l({ setup: () => () => d(Sp, { key: G.companySession }) })
	}), e.registerCompanyLayoutOverlay({
		id: `${U}.start-timer`,
		component: l({ setup: () => () => d(lp, {
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
		component: cn(e, pm)
	}), e.on("bootstrap:completed", ({ adminMode: t }) => {
		hm(e, t);
	}), e.on("company:changing", () => {
		gm();
	}), e.on("company:changed", ({ companyId: t }) => {
		hm(e, t === null);
	});
}
async function hm(e, t) {
	if (Oa(t), t) {
		gm();
		return;
	}
	await Ea(e.client), await q.refresh(e.client);
}
function gm() {
	q.reset(), it(), Da();
}
//#endregion
//#region resources/js/init.ts
window.InvoiceShelf.booting((e, t, n) => {
	n.addMessages(j), zf(n), rs(n), mm(n), rr(n), Qs(n);
});
//#endregion
