### Owl Theme

 Take full control of your Frappe/ERPNext branding. Customize backgrounds, logos, and colors with ease.

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app owl_theme
```

### ScreenShots
===================================================
## Owl Theme Settings (DocType).
![doctype](https://github.com/user-attachments/assets/0df19627-6c3c-425e-a19f-27b58e34d704)
---------------------------------------------------
## HomePage.
![homepage](https://github.com/user-attachments/assets/f2b3491a-bee2-487f-b98c-ad2f41e05ef6)


---------------------------------------------------

## List View.
![listview](https://github.com/user-attachments/assets/68a626cc-56a5-4823-92af-3a70bbb1fb29)

---------------------------------------------------

## Form .
![formpage](https://github.com/user-attachments/assets/889acfaa-b3eb-4598-ad04-feebd29727bd)

---------------------------------------------------

### CI

This app can use GitHub Actions for CI. The following workflows are configured:

- CI: Installs this app and runs unit tests on every push to `develop` branch.
- Linters: Runs [Frappe Semgrep Rules](https://github.com/frappe/semgrep-rules) and [pip-audit](https://pypi.org/project/pip-audit/) on every pull request.


### License

mit
