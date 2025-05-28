// // Keep track of processed titles to prevent duplicates
// const processedTitles = new Set();

// const observer = new MutationObserver(() => {
//     const cards = document.querySelectorAll('.number-widget-box');

//     cards.forEach((card) => {
//         const titleElement = card.querySelector('.widget-title');

//         if (!titleElement) return;

//         const cardTitle = titleElement.innerText?.trim();

//         if (!cardTitle || processedTitles.has(cardTitle)) return;

//         // Avoid duplicate icons by checking for an <i> tag already
//         if (titleElement.querySelector('i')) {
//             processedTitles.add(cardTitle);
//             return;
//         }

//         // Fetch icon from the Number Card doctype
//         frappe.call({
//             method: 'frappe.client.get',
//             args: {
//                 doctype: 'Number Card',
//                 name: cardTitle
//             },
//             callback: function (r) {
//                 if (!r.message || !r.message.icon) return;

//                 const iconClass = r.message.icon;

//                 const icon = document.createElement('span');
//                 icon.className = iconClass;
//                 icon.style.marginRight = '10px';
//                 icon.style.fontSize = '35px';


//                 // Add icon at beginning
//                 if(! processedTitles.has(cardTitle)){
//                     titleElement.prepend(icon);
//                 }

//                 // Mark as processed
//                 processedTitles.add(cardTitle);
//             }
//         });
//     });
// });

// // Start observing only after full DOM load
// //The DOMContentLoaded is an event which is used for run your code just after the bare minimum structure is build
// //we can use id or class here 
// document.addEventListener("DOMContentLoaded", () => {
//     observer.observe(document.body, {
//         childList: true,
//         subtree: true
//     });
// });
