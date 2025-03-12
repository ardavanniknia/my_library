import { Application } from "@hotwired/stimulus";

const application = Application.start();
window.Stimulus = application;

// 🔥 لود خودکار کنترلرهای موجود
const controllers = {
  books: () => import("controllers/books_controller"),
  users: () => import("controllers/users_controller"),
  countdown: () => import("controllers/countdown_controller"),
  hello: () => import("controllers/hello_controller"),
};

// 📌 ثبت خودکار کنترلرها
Object.entries(controllers).forEach(([name, controller]) => {
  controller()
    .then((module) => {
      application.register(name, module.default);
      console.log(`✅ Loaded: ${name} controller`);
    })
    .catch((error) => {
      console.error(`❌ Error loading ${name} controller:`, error);
    });
});

console.log("✅ Stimulus Initialized:", window.Stimulus);