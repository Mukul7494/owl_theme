# Copyright (c) 2025, tahirzaqout and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

PREBUILT_THEMES = {
    "Blue Theme": {
        "main_page_background_color": "#E3F2FD",
        "sidebar_background_color": "#64B5F6",
        "sidebar_text_color": "#000000",
        "primary_color": "#1976D2",
        "navbar_background_color": "#2196F3",
		"cards_background_color": "#E3F2FD",
    },
    "Green Theme": {
        "main_page_background_color": "#E8F5E9",
        "sidebar_background_color": "#81C784",
        "sidebar_text_color": "#000000",
        "primary_color": "#388E3C",
        "navbar_background_color": "#4CAF50",
		"cards_background_color": "#E8F5E9",
    }
}

def apply_prebuilt_theme(theme_name, theme_settings):
    """Applies the selected prebuilt theme to Owl Theme Settings"""
    if theme_name in PREBUILT_THEMES:
        theme_data = PREBUILT_THEMES[theme_name]

        theme_settings.main_page_background_color = theme_data["main_page_background_color"]
        theme_settings.sidebar_background_color = theme_data["sidebar_background_color"]
        theme_settings.sidebar_text_color = theme_data["sidebar_text_color"]
        theme_settings.primary_color = theme_data["primary_color"]
        theme_settings.navbar_background_color = theme_data["navbar_background_color"]
        theme_settings.cards_background_color = theme_data["cards_background_color"]

        frappe.msgprint(f"🎨 Applied {theme_name} successfully!", alert=True)
    else:
        frappe.msgprint("⚠️ Invalid Theme Selection!", alert=True)


class OwlThemeSettings(Document):
    def validate(self):
        """Handles theme application when saving settings"""
        self.change_splash_image_or_favicon()
        self.apply_selected_prebuilt_theme()

    def change_splash_image_or_favicon(self):
        """Updates the splash image and favicon in Website Settings"""
        if self.has_value_changed("splash_image"):
            self.apply_changes_to_website_settings("splash_image")

        if self.has_value_changed("favicon"):
            self.apply_changes_to_website_settings("favicon")

    def apply_changes_to_website_settings(self, fieldname):
        website_settings = frappe.get_single("Website Settings")
        website_settings.set(fieldname, self.get(fieldname))
        website_settings.save()
        frappe.clear_cache()

    def apply_selected_prebuilt_theme(self):
        """Apply a prebuilt theme if selected"""
        if self.has_value_changed("prebuilt_themes") and self.prebuilt_themes in PREBUILT_THEMES:
            apply_prebuilt_theme(self.prebuilt_themes, self)
