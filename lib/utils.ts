import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomHexString(length: number = 24) {
  // Check for valid length
  if (length <= 0) {
    throw new Error("Length must be a positive integer");
  }

  // Array of hexadecimal digits (0-9, a-f)
  const hexChars = "0123456789abcdef";

  // Create an empty string to store the hex string
  let hexString = "";

  // Loop for the desired length
  for (let i = 0; i < length; i++) {
    // Get a random index from the hexChars array
    const randomIndex = Math.floor(Math.random() * hexChars.length);

    // Append the random character to the hex string
    hexString += hexChars.charAt(randomIndex);
  }

  return hexString;
}
