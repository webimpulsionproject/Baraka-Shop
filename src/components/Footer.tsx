import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1B5E20] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={38} />
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-playfair text-lg font-bold text-white">Baraka</span>
                  <span className="font-playfair text-lg font-bold text-[#C9922A]">Shop</span>
                </div>
                <p className="text-white/50 text-[10px] mt-0.5">Boucherie Halal Premium</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              La qualité halal, à votre service depuis le premier jour.
            </p>
            <a href="https://www.facebook.com/Barakashop17/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2]/90 hover:bg-[#1877F2] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              1,6K followers
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/produits", label: "Nos Produits" },
                { href: "/epicerie", label: "Épicerie Vrac" },
                { href: "/#magasin", label: "Nous trouver" },
                { href: "/connexion", label: "Connexion" },
                { href: "/commande", label: "Ma commande" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Horaires</h4>
            <ul className="space-y-1.5 text-sm text-white/65">
              <li className="text-white/30">Lundi : Fermé</li>
              {["Mardi","Mercredi","Jeudi","Vendredi","Samedi"].map(d => <li key={d}>{d} : 8h30 – 20h00</li>)}
              <li>Dimanche : 9h30 – 20h00</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li className="flex items-start gap-2"><span className="mt-0.5">📍</span><span>17 rue Corneille<br />59370 Mons-en-Barœul</span></li>
              <li><a href="tel:0952291306" className="flex items-center gap-2 hover:text-white transition-colors">📞 09 52 29 13 06</a></li>
              <li><a href="mailto:contact.barakashop@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">✉️ contact.barakashop@gmail.com</a></li>
              <li><a href="https://barakashop.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">🌐 barakashop.fr</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {year} Baraka Shop — Mons-en-Barœul. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/60 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
