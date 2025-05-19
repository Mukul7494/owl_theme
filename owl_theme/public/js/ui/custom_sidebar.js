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
			initCollapsibleSidebars();
		})
		.catch((error) => console.error("❌ Error fetching theme settings:", error));

	// Stop observing once applied
	obs.disconnect();
});

//function starts here

function initCollapsibleSidebars() {
	const nestedContainers = Array.from(
		document.querySelectorAll(".nested-container:not([data-title])")
	).filter((container) => container.children.length > 0);

	// Create an accordion wrapper
	const accordionWrapper = document.createElement("div");
	accordionWrapper.id = "accordionWrapper";
	accordionWrapper.classList.add("p-3");
	document.querySelector(".layout-side-section").after(accordionWrapper);

	const dropIcons = Array.from(document.querySelectorAll(".drop-icon:not(.hidden)"));

	nestedContainers.forEach((container, index) => {
		const id = `Collapsible-${index}`;
		const content = container.innerHTML;

		// this is added here for making the element center
		container.previousElementSibling.style.paddingLeft = "33px";
		// console.log(container.previousElementSibling)

		addCollapsibleSidebar(content, id, accordionWrapper);

		const dropIcon = dropIcons[index];
		if (dropIcon) {
			Object.assign(dropIcon.dataset, {
				toggle: "collapse",
				target: `#${id}`,
				parent: "#accordionWrapper",
			});
			dropIcon.setAttribute("aria-controls", id);
		}

		container.hidden = true;
	});
}

function addCollapsibleSidebar(content, id, wrapper) {
	const collapsibleSidebar = `
		<div class="collapse collapse-horizontal" id="${id}" data-bs-parent="#accordionWrapper">
			${content}
		</div>
	`;
	wrapper.insertAdjacentHTML("beforeend", collapsibleSidebar);
}

// Function to Apply Styles to Items
function applyItemStyles(items, textColor) {
	items.addClass(["d-flex", "flex-column", "align-items-center", "justify-content-center",]);
	items.css({ color: textColor ,"font-size":"12px",});
}

// Function to Apply Styles to Icons
function applyIconStyles(color) {
	const icon = $(".icon");
	replaceClass(icon, "icon-md", "icon-lg");
	// icon.css({ fill: color });
}

// Function to Apply Styles to Sidebar
function applySidebarStyles(sidebar, color) {
	// replaceClass(sidebar, "col-lg-2", "col-lg-1");
	sidebar.removeClass("col-lg-2");
	sidebar.css({ "background-color": color , width:"110px"});
}

// Start Observing the Body for Changes (Used for Sidebar Updates)
observer.observe(document.body, { childList: true, subtree: true });






