const COUNTER_NAMESPACE = "pocketforge.gg";
const COUNTER_KEY = "visitors";
const SESSION_KEY = "pocketforge-session-counted";

async function updateVisitorCounter() {
  const el = document.getElementById("visitor-count");
  if (!el) return;

  const endpoint = sessionStorage.getItem(SESSION_KEY)
    ? `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
    : `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    const data = await response.json();
    if (typeof data.value === "number") {
      el.textContent = new Intl.NumberFormat("en-CA").format(data.value);
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
  } catch (error) {
    console.error("PocketForge counter failed", error);
  }

  el.textContent = "Unavailable";
}

updateVisitorCounter();
