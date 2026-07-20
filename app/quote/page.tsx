import { permanentRedirect } from "next/navigation"

export default function QuoteRedirectPage() {
  permanentRedirect("/contact")
}
