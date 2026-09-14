# AGENTS.md

This is the official InvoiceShelf Tasks and Projects module. Read the parent devenv `AGENTS.md` and
the InvoiceShelf 3.x `AGENTS.md` before making changes.

- PHP 8.4, Laravel 13, PHPUnit 12, Vue 3, TypeScript, and Vite.
- Keep business queries behind `InvoiceShelf\\Modules\\Contracts\\Host` interfaces; module code must
  not import InvoiceShelf Eloquent models.
- Keep the module optional: all UI must register through the host extension API and all backend
  routes must disappear when disabled.
- Every module table is prefixed `tp_`, and every table carries a `company_id` column. Scope every
  query to the company from the `company` header, never from a request parameter.
- Abilities are namespaced `tasks-projects:` (see `app/Support/Abilities.php`). Until the host
  ability catalogue is open to modules, gate through `Contracts\Host\ModuleAuthorization` against
  existing host abilities.
- Money is stored and compared as integer minor units, matching the host's `invoices.total`
  convention. Rates are minor units per hour.
- Migrations are reversible: one concrete class per file, a non-empty `up()` and `down()`, and no
  `drop*`, `rename*`, `raw`, or `statement` calls in `up()`.
- Run `composer run lint`, `composer run test`, `pnpm run build`, and package validation before
  release.
