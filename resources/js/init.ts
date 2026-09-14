import '../css/module.css'

window.InvoiceShelf.booting((_app, _router, extensions) => {
  extensions.addMessages({
    en: {
      tasks_projects: {
        title: 'Projects',
      },
    },
  })
})
