import { Application } from "@hotwired/stimulus";

const application = Application.start();
application.debug = false;
window.Stimulus = application;

console.log("✅ Stimulus Initialized:", window.Stimulus);

export { application };