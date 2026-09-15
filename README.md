# InvoiceShelf Tasks and Projects

The official Tasks, Projects and Time Tracking module for InvoiceShelf 3.x. It adds projects hung
off a customer, tasks that move across a configurable Kanban board, time recorded by hand or by a
running timer, and invoicing that turns unbilled hours into a draft invoice from wherever the
work is: a task, a selection of tasks, a whole project, or the unbilled time page.

The module is `AGPL-3.0-only`.

## Requirements

- InvoiceShelf `>=3.0.0-alpha.2 <4.0.0`
- Module API `^1.3.0`
- PHP `^8.4.0`

## What it adds

- **Projects.** Name, optional customer, description, colour, status, default billable rate,
  budget and due date. A project without a customer is internal and never reaches the billing
  screen.
- **Tasks and a Kanban board.** Tasks belong to a project or stand alone against a customer, and
  move across per-company task statuses with drag ordering.
- **Time tracking.** Manual time entries or a running timer, one per user per company, with a
  header chip showing elapsed time.
- **Rate resolution.** Task rate, then the assignee's project rate, then the project default, then
  the company default from module settings, written onto the time entry so a later rate change
  never rewrites history.
- **Task to invoice.** Review unbilled billable entries, choose a grouping, and produce a draft
  invoice through the host's own invoice endpoint.

See [`specs/tasks-projects.md`](../specs/tasks-projects.md) in the private specs repository for the
full scope and data model.

## Install and configure

1. Sign in as a super administrator and open **Administration → Modules**.
2. Pair the application with the InvoiceShelf marketplace if it is not already paired, then install
   and enable **Tasks and Projects**.
3. Open **Company Settings → Tasks and Projects** to set the default hourly rate, rounding
   increment, week start day, and whether non-owners may see other members' time.

## Disable and uninstall

Disabling the module turns off its UI and routes but retains its data. Uninstalling it removes the
package. If an administrator also selects **Remove module data**, the module deletes its per-company
settings and reverses its migrations. This data removal is permanent.

## Development

The package ships committed files in `dist/` because InvoiceShelf installs immutable packages
without running Composer or a JavaScript package manager. See [CONTRIBUTING.md](CONTRIBUTING.md)
for the exact local checks, generated-asset workflow, and release process.

## License

The Tasks and Projects module is licensed under [AGPL-3.0-only](LICENSE).
