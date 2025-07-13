console.log("Apollo Clone is working!");

let currentPage = 1;
let totalPages = 1;
document.addEventListener("DOMContentLoaded", () => {
  console.log("📡 Initial doctor data fetch...");
  fetchDoctors();

  document.getElementById("genderFilter").addEventListener("change", () => {
    currentPage = 1;
    fetchDoctors();
  });
  document.getElementById("experienceFilter").addEventListener("change", () => {
    currentPage = 1;
    fetchDoctors();
  });
  document.getElementById("searchInput").addEventListener("keyup", () => {
  currentPage = 1;
  fetchDoctors();
});
});
function fetchDoctors() {
  const gender = document.getElementById("genderFilter").value;
  const experience = document.getElementById("experienceFilter").value;
  const search = document.getElementById("searchInput").value.trim();


  let url = `http://localhost:5000/api/doctors?page=${currentPage}`;

if (gender) url += `&gender=${gender}`;
if (experience) url += `&experience=${experience}`;
if (search) url += `&search=${encodeURIComponent(search)}`;


  const container = document.getElementById("doctor-cards-container");
  container.innerHTML = "<p>Loading doctors...</p>";
    loader.classList.remove("hidden");

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("❌ Failed to fetch: " + response.status);
      return response.json();
    })
    .then(data => {
    loader.classList.add("hidden");
      renderDoctors(data.doctors);
      totalPages = data.totalPages;
      renderPagination();
      console.log("✅ Doctor data rendered successfully.");
    })
    .catch(error => {
      loader.classList.add("hidden");
      console.error("❌ Error loading doctor data:", error);
      container.innerHTML = "<p style='color:red;'>Failed to load doctors. Please try again later.</p>";
    });
}

function renderDoctors(data) {
  const container = document.getElementById("doctor-cards-container");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No doctors match your filters.</p>";
    return;
  }

  data.forEach(doctor => {
    const card = document.createElement("div");
    card.className = "doctor-card";
 card.innerHTML = `
  <div class="doctor-image">
    <img src="${doctor.image}" alt="${doctor.name}" />
  </div>
  <div class="doctor-details">
    <h3>${doctor.name}</h3>
    <p>Specialty: ${doctor.specialty}</p>
    <p>⭐ ${doctor.rating} (${doctor.reviews} reviews)</p>
    <p>Fees: ₹${doctor.fees}</p>
    <p class="availability">Available: ${doctor.availability}</p>
    <div class="badge-row">
      <span class="badge video">Video Consult</span>
      <span class="badge clinic">Clinic Visit</span>
    </div>
    <button class="book-btn">Book Appointment</button>
  </div>
`;


    // Add event listener for Book Appointment button
const bookButton = card.querySelector(".book-btn");
bookButton.addEventListener("click", () => {
  alert(`✅ Appointment booked with Dr. ${doctor.name}`);
});

    container.appendChild(card);
  });
}

function renderPagination() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchDoctors();
    }
  };
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = "page-btn" + (i === currentPage ? " active" : "");
    pageBtn.textContent = i;
    pageBtn.onclick = () => {
      currentPage = i;
      fetchDoctors();
    };
    paginationContainer.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchDoctors();
    }
  };
  paginationContainer.appendChild(nextBtn);
}
