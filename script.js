document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");

  // Add 'active' class to all sections initially
  sections.forEach((section) => {
    section.classList.add("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetId === "home") {
        // Add 'active' class to all sections if 'Home' is clicked
        sections.forEach((section) => {
          section.classList.add("active");
        });
      } else {
        const sectionTop = targetSection.offsetTop;
        const sectionHeight = targetSection.offsetHeight;
        const windowHeight = window.innerHeight;
        let scrollOffset;

        if (sectionHeight < windowHeight) {
          scrollOffset = sectionTop;
        } else {
          scrollOffset = sectionTop - (windowHeight - sectionHeight) / 2;
        }

        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth"
        });

        sections.forEach((section) => {
          if (section === targetSection) {
            section.classList.add("active");
          } else {
            section.classList.remove("active");
          }
        });
      }
    });
  });

  // Scroll to top when 'Home' is clicked
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", function (event) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Add 'active' class to all sections when 'Home' is clicked
    sections.forEach((section) => {
      section.classList.add("active");
    });
  });
});
