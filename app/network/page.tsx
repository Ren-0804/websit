import { permanentRedirect } from "next/navigation"

export default function NetworkRedirectPage() {
  permanentRedirect("/regions")
}
