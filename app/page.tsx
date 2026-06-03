import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import VideoBackground from "@/components/VideoBackground";
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

      {/* Fundo em vídeo cinematográfico, fixo em tela cheia, com efeito de
          scroll "ida e volta" (rola → avança / volta → rebobina). */}
      <VideoBackground
        mode="hero"
        src="/video/videosite2.2.mp4"
        poster="/video/videosite2.2-poster.webp"
      />

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
