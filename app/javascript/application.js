import "@hotwired/turbo-rails";
import Rails from "@rails/ujs"; // Rails UJS
import "@rails/activestorage";
import "controllers"; // لود کردن کنترلرها
import "bootstrap";

// Fix Rails UJS globally
if (!window._rails_loaded) {
  Rails.start();
  window._rails_loaded = true;
}

// Expose globally for debugging
console.log("🚀 Rails UJS loaded:", Rails);
window.Rails = Rails;