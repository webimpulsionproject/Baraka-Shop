import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#14533A] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xl">🥩</span>
              <span className="font-playfair text-xl font-bold text-white">Baraka</span>
              <span className="font-playfair text-xl font-bold text-[#C9922A]">Shop</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Boucherie Halal · Traiteur · Épicerie Vrac
            </p>
            <a
              href="https://www.facebook.com/Barakashop17/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565D8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Baraka Shop — 1,6K followers
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/#magasin", label: "Notre magasin" },
                { href: "/connexion", label: "Connexion" },
                { href: "/compte", label: "Mon compte" },
                { href: "/panier", label: "Mon panier" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Horaires
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li className="text-white/40">Lundi : Fermé</li>
              <li>Mardi : 8h30 – 20h00</li>
              <li>Mercredi : 8h30 – 20h00</li>
              <li>Jeudi : 8h30 – 20h00</li>
              <li>Vendredi : 8h30 – 20h00</li>
              <li>Samedi : 8h30 – 20h00</li>
              <li>Dimanche : 9h30 – 20h00</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact & Adresse
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">📍</span>
                <span>17 rue Corneille<br />59370 Mons-en-Barœul</span>
              </li>
              <li>
                <a href="tel:0952291306" className="flex items-center gap-2 hover:text-white transition-colors">
                  📞 09 52 29 13 06
                </a>
              </li>
              <li>
                <a href="mailto:contact.barakashop@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  ✉️ contact.barakashop@gmail.com
                </a>
              </li>
              <li>
                <a href="https://barakashop.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  🌐 barakashop.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5!2d3.1!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+rue+Corneille+Mons-en-Bar%C5%93ul!5e0!3m2!1sfr!2sfr!4v1"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Baraka Shop — 17 rue Corneille, Mons-en-Barœul"
          />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {year} Baraka Shop. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/70 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">CGV</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
