document.addEventListener("DOMContentLoaded", () => {
  // Bootstrap carousel initialization (only needed for manual control)
  const carousel = document.querySelector("#appointmentCarousel");
  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: false,
      ride: false,
      wrap: false,
    });

    // Optional: Add keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        bsCarousel.prev();
      } else if (e.key === "ArrowRight") {
        bsCarousel.next();
      }
    });
  }

  // Example: Click handler for dashboard links
  const dashboardLinks = document.querySelectorAll(".sidebar a");
  dashboardLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      dashboardLinks.forEach((l) => l.removeAttribute("id"));
      link.setAttribute("id", "active");
    });
  });

  console.log("Dashboard JS loaded.");
});
