const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

export const formatEUR = (amount: number): string => eur.format(amount);
