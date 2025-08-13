export const medicineCompositions = {
  "paracetamol": {
    composition: "Paracetamol 500mg",
    brands: ["Crocin", "Paracip", "Dolopar", "Calpol", "Tylenol"]
  },
  "ibuprofen": {
    composition: "Ibuprofen 400mg", 
    brands: ["Brufen", "Combiflam", "Advil", "Nurofen", "Ibugesic"]
  },
  "amoxicillin": {
    composition: "Amoxicillin 500mg",
    brands: ["Amoxil", "Novamox", "Polymox", "Trimox", "Augmentin"]
  },
  "metformin": {
    composition: "Metformin 500mg",
    brands: ["Glucophage", "Glycomet", "Obimet", "Diabex", "Formin"]
  },
  "atorvastatin": {
    composition: "Atorvastatin 10mg",
    brands: ["Lipitor", "Atorva", "Tonact", "Atocor", "Storvas"]
  },
  "omeprazole": {
    composition: "Omeprazole 20mg",
    brands: ["Prilosec", "Omez", "Lomac", "Ocid", "Ulcid"]
  },
  "aspirin": {
    composition: "Aspirin 75mg",
    brands: ["Disprin", "Ecosprin", "Aspros", "Delisprin", "Loprin"]
  },
  "cetirizine": {
    composition: "Cetirizine 10mg",
    brands: ["Zyrtec", "Alerid", "Okacet", "Cetriz", "Incidal"]
  }
};

export const getMedicinesByName = (query: string) => {
  if (!query || query.length < 2) return [];
  
  const lowercaseQuery = query.toLowerCase();
  const results: { name: string; composition: string; brands: string[] }[] = [];
  
  // Search by composition name
  Object.entries(medicineCompositions).forEach(([key, value]) => {
    if (key.includes(lowercaseQuery)) {
      results.push({ name: key, ...value });
    }
  });
  
  // Search by brand name
  Object.entries(medicineCompositions).forEach(([key, value]) => {
    value.brands.forEach(brand => {
      if (brand.toLowerCase().includes(lowercaseQuery) && 
          !results.some(r => r.name === key)) {
        results.push({ name: key, ...value });
      }
    });
  });
  
  return results.slice(0, 5);
};