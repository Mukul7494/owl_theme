frappe.widget.widget_factory.base.prototype.make_widget = function () {
	this.widget = $(`<div class="widget" data-widget-name="${this.name ? this.name : ""}">
        <div class="widget-head">
            <div class="widget-label">
                <div class="widget-title"></div>
                <div class="widget-subtitle"></div>
            </div>
            <div class="widget-control"></div>
        </div>
        <div class="widget-body"></div>
        <div class="widget-footer"></div>
    </div>`);

	this.title_field = this.widget.find(".widget-title");
	this.subtitle_field = this.widget.find(".widget-subtitle");
	this.body = this.widget.find(".widget-body");
	this.action_area = this.widget.find(".widget-control");
	this.head = this.widget.find(".widget-head");
	this.footer = this.widget.find(".widget-footer");

	frappe.db
		.get_doc("Owl Theme Settings", "Owl Theme Settings")
		.then((doc) => {
			if (doc) {
				this.widget.css("background-color", doc.cards_background_color);
				this.title_field.css("color", doc.cards_title_text_color);

				$(".shortcut-widget-box").css({
					"box-shadow": "0px 4px 2px rgba(0, 0, 0, 0.3)",
					padding: "16px 9px",
					border: `1px solid ${doc.cards_border_and_title_background_color}`,
					"border-radius": "8px",
				});
				$(".links-widget-box").css({
					padding: "0",
					border: `1px solid ${doc.cards_border_and_title_background_color}`,
					"border-radius": "8px",
				});

				$(".links-widget-box > .widget-head").css({
					padding: "12px",
					"background-color": doc.cards_border_and_title_background_color,
					"border-radius": "8px 8px 0px 0px",
					"margin-top": "-1px",
				});

				$(".links-widget-box > .widget-body").css({
					padding: "12px",
				});

				$(".link-text").css("color", doc.cards_text_color);
			}
		})
		.catch((error) => {
			console.error("Error details:", error);
		});

	this.refresh();
};

// change buttons color
frappe.db
	.get_doc("Owl Theme Settings", "Owl Theme Settings")
	.then((doc) => {
		if (doc) {
			$(".btn-primary").css(
				"background-color",
				`${doc.primary_buttons_background_color} !important`
			);
			$(".btn-primary").css("color", `${doc.primary_buttons_text_color} !important`);
			$(".btn-default").css(
				"background-color",
				`${doc.secondary_buttons_background_color} !important`
			);
			$(".btn-default").css("color", `${doc.secondary_buttons_text_color} !important`);
		}
	})
	.catch((error) => {
		console.error("Error details:", error);
	});
