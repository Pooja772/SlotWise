import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import CryptoJS from "crypto-js";
 

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export const extractDate = (isoString: string): string => {
  if (!isoString) return "";
  return isoString.split("T")[0];
};
 
export const encryptPassword = (password: string): string => {
  const key = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_SECRET_KEY!);
  const iv = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_IV!);
 
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
 
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};
 
export const formatDateToYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
 
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
 
export const formatDateDDMMYY = (dob: string | undefined): string => {
  if (dob === undefined) return "N/A";
  const date = new Date(dob);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};