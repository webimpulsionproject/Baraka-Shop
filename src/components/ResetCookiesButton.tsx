"use client";

export default function ResetCookiesButton() {
  const handleReset = () => {
    localStorage.removeItem("baraka-cookie-consent");
    window.location.reload();
  };
  return (
    <button onClick={handleReset} className="text-[#1B5E20] underline font-medium">
      réinitialisant votre consentement
    </button>
  );
}
