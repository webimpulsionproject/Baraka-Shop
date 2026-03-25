"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function InscriptionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", tel: "",
    password: "", confirm: "", adresse: "", cp: "", ville: "",
  });
  const [cgv, setCgv] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.prenom || !form.nom || !form.email || !form.password) {
      setError("Veuillez remplir les champs obligatoires.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!cgv) {
      setError("Veuillez accepter les CGV.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("baraka-user", JSON.stringify({
        email: form.email,
        name: `${form.prenom} ${form.nom}`,
        tel: form.tel,
        adresse: `${form.adresse}, ${form.cp} ${form.ville}`,
      }));
      router.push("/compte");
    }, 800);
  };

  const Field = ({
    label, name, type = "text", placeholder, required = false
  }: {
    label: string; name: keyof typeof form; type?: string; placeholder?: string; required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-[#E64A19]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={set(name)}
        className="input-field"
        required={required}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex flex-col items-center gap-2 justify-center">
            <Logo size={44} />
            <div className="flex items-baseline gap-0.5">
              <span className="font-playfair text-xl font-bold text-[#1B5E20]">Baraka</span>
              <span className="font-playfair text-xl font-bold text-[#C9922A]">Shop</span>
            </div>
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 mt-4">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Profitez du Click & Collect et de la livraison</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" name="prenom" placeholder="Ahmed" required />
            <Field label="Nom" name="nom" placeholder="Benali" required />
          </div>

          <Field label="Adresse email" name="email" type="email" placeholder="vous@exemple.fr" required />
          <Field label="Téléphone" name="tel" type="tel" placeholder="06 12 34 56 78" />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Mot de passe" name="password" type="password" placeholder="••••••••" required />
            <Field label="Confirmer" name="confirm" type="password" placeholder="••••••••" required />
          </div>

          <Field label="Adresse" name="adresse" placeholder="12 rue de la Paix" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Code postal" name="cp" placeholder="59370" />
            <Field label="Ville" name="ville" placeholder="Mons-en-Barœul" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={cgv}
              onChange={(e) => setCgv(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#E64A19] cursor-pointer"
            />
            <span className="text-sm text-gray-600">
              J&apos;accepte les{" "}
              <Link href="#" className="text-[#E64A19] hover:underline font-medium">CGV</Link>
              {" "}et la{" "}
              <Link href="#" className="text-[#E64A19] hover:underline font-medium">politique de confidentialité</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3.5 text-base mt-2 disabled:opacity-60"
          >
            {loading ? "Création du compte…" : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="text-[#E64A19] font-semibold hover:underline">
            Se connecter →
          </Link>
        </p>
      </div>
    </div>
  );
}
