import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                <div className="text-white font-bold text-xl">丰</div>
              </div>
              <span className="text-white font-bold text-xl">丰吉国际</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              FENGJI INTERNATIONAL SUPPLY CHAIN MANAGEMENT (JIANGSU) CO., LTD.
            </p>
            <p className="text-gray-400 text-sm">Global Connections · Smooth Supply Chain</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <nav aria-label="Quick Links">
              <ul className="space-y-4">
                {["Home", "Services", "About Us", "Network", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                  >
                    {item}
                  </Link>
                </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Our Services</h3>
            <nav aria-label="Services">
              <ul className="space-y-4">
                {[
                  "International Blocktrain",
                  "Transit Transport",
                  "Supply Chain Consulting",
                  "Customs Clearance",
                  "Warehousing & Distribution",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Phone aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+8617374932331"
                  className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  +86 17374932331 (China/WeChat)
                </a>
              </li>
              <li className="flex">
                <Mail aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:renyizheng@landsea.cc"
                  className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  renyizheng@landsea.cc
                </a>
              </li>
              <li className="flex">
                <MapPin aria-hidden="true" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <p>Room 2403, Building C, Sunshine International,</p>
                  <p>Lianyungang District, China (Jiangsu)</p>
                  <p>Pilot Free Trade Zone</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Fengji International. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex space-x-6">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-gray-300 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

