
frappe.ui.Page = class CustomPage extends frappe.ui.Page {
    constructor(opts) {
        super(opts);
        this.changeStyle();
    }

    changeStyle() {
        frappe.db.get_doc("Owl Theme Settings", "Owl Theme Settings")
        .then(doc => {
            if (doc) {
                this.body.css("background-color", doc.list_page_background_color);
                this.main.css("background-color", doc.list_page_background_color);

                $(".primary-action").css("background-color", doc.primary_buttons_background_color);
                $(".primary-action").css("color", doc.primary_buttons_text_color);
                $(".btn-secondary").css("background-color", doc.secondary_buttons_background_color);
                $(".btn-secondary").css("color", doc.secondary_buttons_text_color);

            }
        }).catch(error => {
            console.error("Error details:", error);
        });
    }

   
}