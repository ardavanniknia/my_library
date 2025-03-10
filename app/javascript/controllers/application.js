import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-loading";

const application = Application.start();
application.debug = false;
window.Stimulus = application;

// این بخش رو اضافه کن تا کنترلرها لود بشن
const context = require.context("controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

console.log("✅ Stimulus Initialized:", window.Stimulus);