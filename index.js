document.addEventListener("DOMContentLoaded", () => {
  // Load the header dynamically from 'header.html'
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
      activeNav(); // Activate navigation when the header is loaded
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // Load the footer dynamically from 'footer.html'
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.log("Error loading footer:", error));

  // Initially load content for all sections
  loadSectionContent();

  // Set up Intersection Observer to track which section is visible
  setupIntersectionObserver();
});

// Function to load content for all sections
const loadSectionContent = () => {
  // Load content for each section
  loadSection("home", "home.html");
  loadSection("menu", "menu.html");
  loadSection("contact", "contact.html");
};

// Function to load a specific section's content
const loadSection = (sectionId, fileName) => {
  fetch(fileName)
    .then((response) => response.text())
    .then((content) => {
      document.getElementById(sectionId).innerHTML = content;
    })
    .catch((error) => {
      console.error(`Error loading content for ${sectionId}:`, error);
    });
};

// Handle active navigation link and smooth scrolling
const activeNav = () => {
  const navLinks = document.querySelectorAll("nav a");

  // Set default section (home) to be visible on load
  defaultPage();

  // Add event listeners for each link to toggle active state and scroll to section
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const targetId = link.getAttribute("href").slice(1); // Get the target section name (e.g., 'home')
      showSection(targetId); // Scroll to the target section
      updateActiveLink(link); // Update the active navigation link
    });
  });
};

// Set default page to show (Home) on load
const defaultPage = () => {
  const homeLink = document.querySelector('nav a[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }
};

// Function to smoothly scroll to the section
const showSection = (sectionId) => {
  const targetSection = document.getElementById(sectionId);

  // Scroll to the section if it exists
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Update the active navigation link
const updateActiveLink = (activeLink) => {
  // Remove active class from all links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Add active class to the clicked link
  activeLink.classList.add("active");
};

// Setup Intersection Observer for scroll-based active link update
const setupIntersectionObserver = () => {
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null, // viewport as root
    threshold: 0.15, // Trigger when 15% of the section is visible (adjust as needed)
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;

      // Check if the section is intersecting (in the viewport)
      if (entry.isIntersecting) {
        // Set the navigation link active when the section is visible
        const activeLink = document.querySelector(
          `nav a[href="#${sectionId}"]`
        );
        if (activeLink) {
          updateActiveLink(activeLink);
        }
      }
    });
  };

  // Create the Intersection Observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
};
