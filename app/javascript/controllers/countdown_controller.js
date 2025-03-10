import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["countdown"];

  connect() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  disconnect() {
    clearInterval(this.interval);
  }

  updateCountdown() {
    this.countdownTargets.forEach((element) => {
      const deadlineStr = element.dataset.countdownDeadline;
      
      if (!deadlineStr.trim()) {
        element.textContent = "No Deadline";
        return;
      }

      const deadline = new Date(deadlineStr);
      if (!deadline.getTime()) {
        element.textContent = "Invalid Date";
        return;
      }

      const now = new Date();
      const timeDiff = deadline - now;

      if (timeDiff <= 0) {
        element.textContent = "Deadline Passed";
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    });
  }
}