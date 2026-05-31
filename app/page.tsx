import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import SceneClient from "@/components/SceneClient";
import ScrollSections from "@/components/ScrollSections";
import HomeShowcase from "@/components/HomeShowcase";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* Tela de carregamento — não importa nada de three/drei/fiber. */}
      <LoadingScreen />

      {/* Header fixo (pointer-events controlado internamente). */}
      <Header />

      {/* Cena 3D fixa em tela cheia (lazy chunk, ssr:false). */}
      <SceneClient />

      {/* Conteúdo editorial: 6 seções de 100vh empilhadas sobre o canvas. */}
      <ScrollSections />

      {/* Projetos, depoimentos e contato — fora do <main>, fundo sólido, para
          não interferir na timeline 3D do ScrollTrigger. */}
      <HomeShowcase />

      {/* Botão flutuante de WhatsApp com mini-chatbot. */}
      <WhatsAppWidget />
    </>
  );
}
