frappe.ui.toolbar.Toolbar = class CustomNavbar extends frappe.ui.toolbar.Toolbar {
	constructor() {
		super();
		this.changeStyle();
	}
	changeStyle() {
		frappe.db
			.get_doc("Owl Theme Settings", "Owl Theme Settings")
			.then((doc) => {
				if (doc) {
					$(".navbar.navbar-expand").css(
						"background-color",
						doc.navbar_background_color
					);

					$("#navbar-breadcrumbs a").css(
						"background-color",
						`${doc.navbar_text_color} !important`
					);

					$(".main-section").css("background-color", doc.main_page_background_color);
					// $(".page-body").css("width", "100%");
					$(".content.page-container").css(
						"background-color",
						doc.main_page_background_color
					);

					$(".layout-main-section").css(
						"background-color",
						doc.main_page_card_container_background_color
					);

					// cards
					// $(".widget.links-widget-box").css("background-color", `${doc.cards_background_color} !important`);
					// $(".ce-header span").css("color", doc.cards_text_color);
				}
			})
			.catch((error) => {
				console.error("Error details:", error);
			});
	}
};
