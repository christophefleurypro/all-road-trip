import { useEffect, useState } from "react";
import Listing from "./pages/Listing.jsx";
import Roadtrip from "./pages/Roadtrip.jsx";

/* Routage par hash, sans dépendance :
     #/                  → listing des voyages
     #/roadtrip/<id>     → détail d'un voyage
   Le hash fonctionne sur n'importe quel hébergement statique (et en local)
   sans configuration serveur, contrairement aux vraies routes. */

function routeCourante() {
  const m = location.hash.match(/^#\/roadtrip\/([^/]+)/);
  return m ? { page: "roadtrip", id: decodeURIComponent(m[1]) } : { page: "listing" };
}

export default function App() {
  const [route, setRoute] = useState(routeCourante);

  useEffect(() => {
    const surChangement = () => {
      setRoute(routeCourante());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", surChangement);
    return () => window.removeEventListener("hashchange", surChangement);
  }, []);

  return route.page === "roadtrip"
    ? <Roadtrip id={route.id} />
    : <Listing />;
}
