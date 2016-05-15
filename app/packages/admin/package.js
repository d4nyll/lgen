Package.describe({
  name: 'smartix:admin',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
     jszip: "3.0.0",
     xlsx: "https://github.com/d4nyll/js-xlsx/archive/36e68fcc15a71f49fea4e73f8bc15ff4acbaa34e.tar.gz"
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('templating');
  api.use('jquery');
  api.use('less');
  api.use('reactive-dict');
  api.use('iron:router');
  api.use('aldeed:simple-schema');
  api.use('harrison:papa-parse@1.1.1');
  api.use('chrismbeckett:toastr');
  api.use('alanning:roles@1.2.15');
  api.use('easy:search@2.0.9');
  api.use('stevezhu:lodash@4.6.1');
  api.use('alethes:pages@1.8.6');
  
  api.use('smartix:lib@0.0.1');
  api.use('smartix:utilities@0.0.1');
  api.use('smartix:news@0.0.1');
  api.use('smartix:groups@0.0.1');
  api.use('smartix:classes@0.0.1');
  api.use('smartix:newsgroups@0.0.1');
  api.use('smartix:schools@0.0.1');
  api.use('smartix:accounts-schools@0.0.1');
  api.use('smartix:messages@0.0.1', 'client')
  api.use('smartix:calendarevent','client');
  api.use('smartix:absence',['client', 'server']);
  
  api.addAssets('client/assets/parents_import_template.csv', 'client');
  api.addAssets('client/assets/students_import_template.csv', 'client');
  api.addAssets('client/assets/teachers_import_template.csv', 'client');
  api.addAssets('client/assets/import-guide-csv.png', 'client');
  api.addAssets('client/assets/import-parents-preview.png', 'client');
  api.addAssets('client/assets/import-student-preview.png', 'client');
  api.addFiles('routes.js', ['web.browser', 'server']);
  api.addFiles('client/layouts/admin-layout.html', 'web.browser');
  api.addFiles('client/layouts/admin-layout.js', 'web.browser');
  api.addFiles('client/layouts/admin-layout.css', 'web.browser');
  api.addFiles('client/templates/absence/upload/upload.html', 'web.browser');
  api.addFiles('client/templates/absence/upload/upload.js', 'web.browser');
  api.addFiles('client/templates/absence/absentees/absentees.html', 'web.browser');
  api.addFiles('client/templates/absence/absentees/absentees.js', 'web.browser');
  api.addFiles('client/templates/absence/expected/expected.html', 'web.browser');
  api.addFiles('client/templates/absence/expected/expected.js', 'web.browser');
  api.addFiles('client/templates/absence/register/index.js', 'web.browser');
  api.addFiles('client/templates/absence/register/register.css', 'web.browser');
  api.addFiles('client/templates/absence/register/register.html', 'web.browser');
  api.addFiles('client/templates/absence/register/register.js', 'web.browser');
  api.addFiles('client/templates/distribution-lists/add/add.html', 'web.browser');
  api.addFiles('client/templates/distribution-lists/add/add.js', 'web.browser');
  api.addFiles('client/templates/distribution-lists/list/index.js', ['client', 'server']);
  api.addFiles('client/templates/distribution-lists/list/list.html', 'web.browser');
  api.addFiles('client/templates/distribution-lists/list/list.js', 'web.browser');
  api.addFiles('client/templates/distribution-lists/view/view.css', 'web.browser');
  api.addFiles('client/templates/distribution-lists/view/index.js', 'web.browser');
  api.addFiles('client/templates/distribution-lists/view/view.html', 'web.browser');
  api.addFiles('client/templates/distribution-lists/view/view.js', 'web.browser');
  api.addFiles('client/templates/classes/list/index.js', ['client', 'server']);
  api.addFiles('client/templates/classes/list/list.html', 'web.browser');
  api.addFiles('client/templates/classes/list/list.js', 'web.browser');
  api.addFiles('client/templates/classes/view/view.html', 'web.browser');
  api.addFiles('client/templates/classes/view/view.js', 'web.browser');
  api.addFiles('client/templates/classes/view/view.css', 'web.browser');
  api.addFiles('client/templates/classes/add/add.html', 'web.browser');
  api.addFiles('client/templates/classes/add/add.js', 'web.browser');
  api.addFiles('client/templates/classes/import/import.html', 'web.browser');
  api.addFiles('client/templates/classes/import/import.js', 'web.browser');
  api.addFiles('client/templates/dashboard/dashboard.html', 'web.browser');
  api.addFiles('client/templates/dashboard/dashboard.js', 'web.browser');
  api.addFiles('client/templates/newsgroups/list/index.js', ['client', 'server']);
  api.addFiles('client/templates/newsgroups/list/list.html', 'web.browser');
  api.addFiles('client/templates/newsgroups/list/list.js', 'web.browser');
  api.addFiles('client/templates/newsgroups/view/view.html', 'web.browser');
  api.addFiles('client/templates/newsgroups/view/view.js', 'web.browser');
  api.addFiles('client/templates/newsgroups/add/add.html', 'web.browser');
  api.addFiles('client/templates/newsgroups/add/add.js', 'web.browser');
  api.addFiles('client/templates/newsgroups/import/import.html', 'web.browser');
  api.addFiles('client/templates/newsgroups/import/import.js', 'web.browser');  
  api.addFiles('client/templates/news/add/add.html', 'web.browser');
  api.addFiles('client/templates/news/add/add.js', 'web.browser');
  api.addFiles('client/templates/news/import/import.html', 'web.browser');
  api.addFiles('client/templates/news/import/import.js', 'web.browser');
  api.addFiles('client/templates/rss/rss.html', 'web.browser');
  api.addFiles('client/templates/rss/rss.js', 'web.browser');
  
  api.addFiles('client/templates/users/list/index.js', 'web.browser');;
  api.addFiles('client/templates/users/list/list.html', 'web.browser');
  api.addFiles('client/templates/users/list/list.js', 'web.browser');
  api.addFiles('both/users.js')  
  api.addFiles('client/templates/users/view/view.html', 'web.browser');
  api.addFiles('client/templates/users/view/view.js', 'web.browser');
  api.addFiles('client/templates/users/add/add.html', 'web.browser');
  api.addFiles('client/templates/users/add/add.js', 'web.browser');
  api.addFiles('client/templates/users/import/import.html', 'web.browser');
  api.addFiles('client/templates/users/import/import.css', 'web.browser');
  api.addFiles('client/templates/users/import/import.js', 'web.browser');
  api.addFiles('client/templates/users/import-parents/import.html', 'web.browser');
  api.addFiles('client/templates/users/import-parents/import.js', 'web.browser');
  api.addFiles('client/templates/users/import-teachers/import.html', 'web.browser');
  api.addFiles('client/templates/users/import-teachers/import.js', 'web.browser');
  api.addFiles('client/templates/users/relationships/relationships.html', 'web.browser');
  api.addFiles('client/templates/users/relationships/relationships.js', 'web.browser');
  api.addFiles('client/less/_bootstrap/alerts.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/badges.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/breadcrumbs.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/button-groups.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/buttons.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/carousel.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/close.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/code.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/component-animations.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/dropdowns.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/forms.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/glyphicons.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/grid.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/input-groups.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/jumbotron.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/labels.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/list-group.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/media.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/alerts.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/background-variant.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/border-radius.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/buttons.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/center-block.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/clearfix.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/forms.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/gradients.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/grid-framework.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/grid.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/hide-text.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/image.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/labels.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/list-group.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/nav-divider.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/nav-vertical-align.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/opacity.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/pagination.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/panels.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/progress-bar.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/reset-filter.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/reset-text.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/resize.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/responsive-visibility.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/size.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/tab-focus.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/table-row.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/text-emphasis.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/text-overflow.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins/vendor-prefixes.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/mixins.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/modals.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/navbar.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/navs.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/normalize.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/pager.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/pagination.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/panels.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/popovers.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/print.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/progress-bars.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/responsive-embed.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/responsive-utilities.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/scaffolding.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/tables.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/theme.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/thumbnails.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/tooltip.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/type.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/utilities.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/variables.import.less', 'web.browser');
  api.addFiles('client/less/_bootstrap/wells.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/alerts.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/badges.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/breadcrumbs.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/button-groups.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/buttons.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/close.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/code.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/dropdowns.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/forms.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/glyphicons.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/input-groups.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/labels.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/list-group.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/media.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/modals.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/navbar.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/navs.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/pager.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/pagination.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/panels.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/popovers.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/progress-bars.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/scaffolding.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/tables.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/thumbnails.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/tooltip.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/type.import.less', 'web.browser');
  api.addFiles('client/less/bootstrap-limitless/wells.import.less', 'web.browser');
  api.addFiles('client/less/components/charts/c3.import.less', 'web.browser');
  api.addFiles('client/less/components/charts/charts.import.less', 'web.browser');
  api.addFiles('client/less/components/charts/d3.import.less', 'web.browser');
  api.addFiles('client/less/components/charts/sparklines.import.less', 'web.browser');
  api.addFiles('client/less/components/demo.import.less', 'web.browser');
  api.addFiles('client/less/components/extensions/jquery_ui/interactions.import.less', 'web.browser');
  api.addFiles('client/less/components/extensions/jquery_ui/widgets.import.less', 'web.browser');
  api.addFiles('client/less/components/maps/google-maps.import.less', 'web.browser');
  api.addFiles('client/less/components/maps/jvectormap.import.less', 'web.browser');
  api.addFiles('client/less/components/maps/maps.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/default.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/pace-demo.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-bar.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-bar-sm.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-bar-xs.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-corners.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-perspective.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-radar.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-squares.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-tail-circle.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-tail.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-xbox.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-xbox-sm.import.less', 'web.browser');
  api.addFiles('client/less/components/pace/theme-xbox-xs.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/chats.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/error.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/invoice.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/login.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/profile.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/search.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/task-manager.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/timelines.import.less', 'web.browser');
  api.addFiles('client/less/components/pages/user-list.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/checkboxes/bootstrap-switch.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/checkboxes/switchery.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/checkboxes/uniform.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/editors/ace.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/editors/summernote.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/editors/wysihtml5.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/extensions/alpaca.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/extensions/editable.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/extensions/passy.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/extensions/typeahead.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/extensions/validation.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/menus/bootstrap-select.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/menus/multiselect.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/menus/select2.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/menus/selectbox.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/plugins/dual-listbox.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/plugins/maxlength.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/plugins/touchspin.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/tags/tags-input.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/tags/tokenfield.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/wizards/form.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/wizards/steps.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/forms/wizards/stepy.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/images/fancybox.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/images/image-cropper.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/notifications/bootbox.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/notifications/jgrowl.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/notifications/pnotify.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/notifications/sweet-alerts.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/anytime.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/bootstrap-datepicker.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/date-paginator.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/daterange.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/pickadate/base.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/pickadate/date.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/pickadate/time.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/pickers/spectrum.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/sliders/ion-range-slider.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/sliders/noui-slider.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/sliders/slider-pips.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-autofill.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-buttons.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-columns-reorder.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-fixed-columns.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-fixed-header.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-keytable.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-responsive.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-rows-reorder.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-scroller.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatable-select.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/datatables/datatables.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/footable/footable.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/tables/handsontable/handsontable.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/dragula.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/fab.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/fancytree.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/fullcalendar.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/headroom.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/prism.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/progress-buttons.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/ui/ripple.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/uploaders/dropzone.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/uploaders/file-input.import.less', 'web.browser');
  api.addFiles('client/less/components/plugins/uploaders/plupload.import.less', 'web.browser');
  api.addFiles('client/less/components/ui/heading-elements.import.less', 'web.browser');
  api.addFiles('client/less/components/ui/helpers.import.less', 'web.browser');
  api.addFiles('client/less/components/ui/snippets.import.less', 'web.browser');
  api.addFiles('client/less/core/colors/colors.import.less', 'web.browser');
  api.addFiles('client/less/core/colors/palette.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/boxed.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/component-animation.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/content.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/footer.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/sidebar.import.less', 'web.browser');
  api.addFiles('client/less/core/layout/utils.import.less', 'web.browser');
  api.addFiles('client/less/core/mixins/nav-vertical-align.import.less', 'web.browser');
  api.addFiles('client/less/core/variables/variables-core.import.less', 'web.browser');
  api.addFiles('client/less/core/variables/variables-custom.import.less', 'web.browser');
  api.addFiles('client/less/_global/global.import.less', 'web.browser');
  api.addFiles('client/less/_main/bootstrap.less', 'web.browser');
  api.addFiles('client/less/_main/colors.less', 'web.browser');
  api.addFiles('client/less/_main/components.less', 'web.browser');
  api.addFiles('client/less/_main/core.less', 'web.browser');
  api.addFiles('client/limitless/js/startup.js', 'web.browser');
  api.addFiles('client/limitless/js/nicescroll.min.js', 'web.browser');
  api.addFiles('client/limitless/js/fab.min.js', 'web.browser');
  api.addFiles('client/limitless/js/extra_fab.js', 'web.browser');
  api.addFiles('client/limitless/js/datatable_basic.js', 'web.browser');
  api.addFiles('client/limitless/js/app.js', 'web.browser');
  api.addFiles('client/limitless/css/icomoon.css', 'web.browser');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('smartix:admin');
  api.addFiles('admin-tests.js');
});
