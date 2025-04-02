// frappe.ui.form.Form = class CustomForm extends frappe.ui.form.Form {
// 	constructor(doctype, parent, in_form, doctype_layout_name) {
// 		super(doctype, parent, in_form, doctype_layout_name);
// 		this.changeStyle();
// 	}
// 	changeStyle() {
// 		console.log($(".form-layout"), "form-layout");
// 		}
// };

frappe.ui.form.Form.prototype.setup_std_layout = function() {
	this.form_wrapper = $("<div></div>").appendTo(this.layout_main);
	this.body = $('<div class="std-form-layout"></div>').appendTo(this.form_wrapper);
	
	// only tray
	this.meta.section_style = "Simple"; // always simple!

	// layout
	this.layout = new frappe.ui.form.Layout({
		parent: this.body,
		doctype: this.doctype,
		doctype_layout: this.doctype_layout,
		frm: this,
		with_dashboard: true,
		card_layout: true,
	});

	this.layout.make();

	this.fields_dict = this.layout.fields_dict;
	this.fields = this.layout.fields_list;

	let dashboard_parent = $('<div class="form-dashboard">');
	let dashboard_added = false;

	if (this.layout.tabs.length) {
		this.layout.tabs.every((tab) => {
			if (tab.df.show_dashboard) {
				tab.wrapper.prepend(dashboard_parent);
				dashboard_added = true;
				return false;
			}
			return true;
		});
		if (!dashboard_added) {
			this.layout.tabs[0].wrapper.prepend(dashboard_parent);
		}
	} else {
		this.layout.wrapper.find(".form-page").prepend(dashboard_parent);
	}

	this.dashboard = new frappe.ui.form.Dashboard(dashboard_parent, this);

	this.tour = new frappe.ui.form.FormTour({
		frm: this,
	});

	// workflow state
	this.states = new frappe.ui.form.States({
		frm: this,
	});


	this.body.css("background", "red !important");
}