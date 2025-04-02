import { replaceClass } from "../utils/replace_class";

const observer = new MutationObserver((mutations, obs) => {
	const items = $(".item-anchor");
	const sidebar = $(".layout-side-section");

	if (!items.length) return;

	// Fetch Theme Settings & Apply Changes
	frappe.db
		.get_doc("Owl Theme Settings", "Owl Theme Settings")
		.then((doc) => {
			if (!doc) return console.warn("⚠️ No Theme Settings Found!");

			applySidebarStyles(sidebar, doc.sidebar_background_color);
			applyIconStyles(doc.sidebar_text_color);
			applyItemStyles(items, doc.sidebar_text_color);
			configureItemAnchors();

			const nestedContainers = document.querySelectorAll(
				"[item-name='Accounting'] > .nested-container"
			);

			if (nestedContainers.length) {
				const content = Array.from(nestedContainers, (item) => item.innerHTML).join("");
				addCollapsibleSidebar(content);

				nestedContainers.forEach((item) => (item.hidden = true));
			}
		})
		.catch((error) => console.error("❌ Error fetching theme settings:", error));

	// Stop observing once applied
	obs.disconnect();
});



//function starts here

// Function to Add Collapsible Sidebar
function addCollapsibleSidebar(content) {
	const collapsibleSidebar = `<div class="collapse" id="Collapsable">${content}</div>`;
	document
		.querySelector(".layout-side-section")
		.insertAdjacentHTML("afterend", collapsibleSidebar);
}

// Function to Configure Item Anchors for Collapsible Sidebar
function configureItemAnchors() {
	document.querySelectorAll("[item-name='Accounting'] .drop-icon").forEach((btn) => {
		Object.assign(btn.dataset, { toggle: "collapse", target: "#Collapsable" });
		btn.setAttribute("aria-controls", "Collapsable");
	});
}

// Function to Apply Styles to Items
function applyItemStyles(items, textColor) {
	items.addClass(["d-flex", "flex-column", "align-items-center", "justify-content-center"]);
	items.css({ color: textColor });
}

// Function to Apply Styles to Icons
function applyIconStyles(color) {
	const icon = $(".icon");
	replaceClass(icon, "icon-md", "icon-lg");
	icon.css({ fill: color });
}

// Function to Apply Styles to Sidebar
function applySidebarStyles(sidebar, color) {
	replaceClass(sidebar, "col-lg-2", "col-lg-1");
	sidebar.css({ "background-color": color });
}

// Start Observing the Body for Changes (Used for Sidebar Updates)
observer.observe(document.body, { childList: true, subtree: true });
