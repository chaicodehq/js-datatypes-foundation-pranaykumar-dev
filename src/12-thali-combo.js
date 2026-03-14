/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    !thali ||
    typeof thali !== "object" ||
    typeof thali.name !== "string" ||
    !Array.isArray(thali.items) ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean" ||
    thali.name.trim() === ""
  ) {
    return "";
  }

  const nameUpper = thali.name.toUpperCase();
  const vegNonVeg = thali.isVeg ? "Veg" : "Non-Veg";
  const itemsStr = thali.items.join(", ");
  const priceStr = thali.price.toFixed(2);

  return `${nameUpper} (${vegNonVeg}) - Items: ${itemsStr} - Rs.${priceStr}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }

  const validThalis = thalis.filter(
    (t) =>
      t &&
      typeof t === "object" &&
      typeof t.price === "number" &&
      !isNaN(t.price) &&
      typeof t.isVeg === "boolean",
  );

  if (validThalis.length === 0) {
    return null;
  }

  const vegCount = validThalis.filter((t) => t.isVeg).length;
  const nonVegCount = validThalis.length - vegCount;

  const prices = validThalis.map((t) => t.price);
  const totalPrice = prices.reduce((sum, p) => sum + p, 0);
  const avgPrice = (totalPrice / validThalis.length).toFixed(2);

  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);

  const names = validThalis.map((t) => t.name || "Unnamed Thali");

  return {
    totalThalis: validThalis.length,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names,
  };
}

export function searchThaliMenu(thalis, query) {
  if (
    !Array.isArray(thalis) ||
    typeof query !== "string" ||
    query.trim() === ""
  ) {
    return [];
  }

  const lowerQuery = query.toLowerCase();

  return thalis.filter((thali) => {
    if (!thali || typeof thali !== "object") return false;

    const nameMatch =
      typeof thali.name === "string" &&
      thali.name.toLowerCase().includes(lowerQuery);

    const itemMatch =
      Array.isArray(thali.items) &&
      thali.items.some(
        (item) =>
          typeof item === "string" && item.toLowerCase().includes(lowerQuery),
      );

    return nameMatch || itemMatch;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  if (
    typeof customerName !== "string" ||
    customerName.trim() === "" ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  ) {
    return "";
  }

  const upperName = customerName.toUpperCase();

  const lines = thalis
    .filter(
      (t) =>
        t &&
        typeof t === "object" &&
        typeof t.name === "string" &&
        typeof t.price === "number",
    )
    .map((t) => `- ${t.name} x Rs.${t.price.toFixed(0)}`);

  if (lines.length === 0) {
    return "";
  }

  const total = thalis.reduce((sum, t) => {
    return sum + (t && typeof t.price === "number" ? t.price : 0);
  }, 0);

  const receipt = [
    "THALI RECEIPT",
    "---",
    `Customer: ${upperName}`,
    ...lines,
    "---",
    `Total: Rs.${total.toFixed(2)}`,
    `Items: ${lines.length}`,
  ].join("\n");

  return receipt;
}
