# Copyright (c) 2025, tahirzaqout and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

PREBUILT_THEMES = {
    "Blue Theme": {
        "navbar_background_color": "#e8f0ff",
        "main_page_background_color": "#e6ecf7",
        "sidebar_background_color": "#449CF0",
        "primary_color": "#1976D2",
        "cards_background_color": "#e3f1ff",
        "cards_title_text_color": "#4463F0",
        "cards_border_and_title_background_color": "#449CF0",
    },
    "Green Theme": {
        "navbar_background_color": "#e0f7e9",
        "main_page_background_color": "#e6f5ea",
        "sidebar_background_color": "#4CAF50",
        "primary_color": "#388E3C",
        "cards_background_color": "#e2f3e8",
        "cards_title_text_color": "#2e7d32",
        "cards_border_and_title_background_color": "#4CAF50",
    },
    "Red Theme": {
        "navbar_background_color": "#fdecea",
        "main_page_background_color": "#f9e5e3",
        "sidebar_background_color": "#e53935",
        "primary_color": "#c62828",
        "cards_background_color": "#fbe9e7",
        "cards_title_text_color": "#d32f2f",
        "cards_border_and_title_background_color": "#e53935",
    },
    "Purple Theme": {
        "navbar_background_color": "#f3e5f5",
        "main_page_background_color": "#f0eafc",
        "sidebar_background_color": "#8e24aa",
        "primary_color": "#6a1b9a",
        "cards_background_color": "#ede7f6",
        "cards_title_text_color": "#7b1fa2",
        "cards_border_and_title_background_color": "#8e24aa",
    },
    "Orange Theme": {
        "navbar_background_color": "#fff3e0",
        "main_page_background_color": "#fff8e1",
        "sidebar_background_color": "#fb8c00",
        "primary_color": "#ef6c00",
        "cards_background_color": "#ffecb3",
        "cards_title_text_color": "#e65100",
        "cards_border_and_title_background_color": "#fb8c00",
    },
    "Yellow Theme": {
        "navbar_background_color": "#fffde7",
        "main_page_background_color": "#fffde0",
        "sidebar_background_color": "#fdd835",
        "primary_color": "#fbc02d",
        "cards_background_color": "#fff9c4",
        "cards_title_text_color": "#f57f17",
        "cards_border_and_title_background_color": "#fdd835",
    },
}


def apply_prebuilt_theme(theme_name, theme_settings):
    """Applies the selected prebuilt theme to Owl Theme Settings"""
    if theme_name in PREBUILT_THEMES:
        theme_data = PREBUILT_THEMES[theme_name]

        theme_settings.main_page_background_color = theme_data[
            "main_page_background_color"
        ]
        theme_settings.navbar_background_color = theme_data["navbar_background_color"]
        theme_settings.main_page_background_color = theme_data[
            "main_page_background_color"
        ]
        theme_settings.sidebar_background_color = theme_data["sidebar_background_color"]
        theme_settings.primary_color = theme_data["primary_color"]
        theme_settings.cards_background_color = theme_data["cards_background_color"]

        theme_settings.cards_title_text_color = theme_data["cards_title_text_color"]
        theme_settings.cards_border_and_title_background_color = theme_data[
            "cards_border_and_title_background_color"
        ]

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
        if (
            self.has_value_changed("prebuilt_themes")
            and self.prebuilt_themes in PREBUILT_THEMES
        ):
            apply_prebuilt_theme(self.prebuilt_themes, self)
