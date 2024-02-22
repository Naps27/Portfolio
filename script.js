document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetId === "home") {
        // If clicking on the home button, show all sections
        sections.forEach((section) => {
          section.style.display = "block";
        });
      } else {
        // Scroll to the target section
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });

        // Hide all sections except the target section
        sections.forEach((section) => {
          if (section !== targetSection) {
            section.style.display = "none";
          }
        });

        // Show the target section
        targetSection.style.display = "block";
      }
    });
  });
});
