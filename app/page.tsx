import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import VideoBackground from "@/components/VideoBackground";
import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import HomeShowcase from "@/components/HomeShowcase";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* Tela de carregamento — não importa nada de three/drei/fiber. */}
      <LoadingScreen />

      {/* Header fixo (pointer-events controlado internamente). */}
      <Header />

      {/* Vídeo cinematográfico do HERÓI: fixo atrás da 1ª dobra; scrub localizado
          (ver VideoBackground, trigger #hero). O conteúdo sólido o cobre ao rolar. */}
      <VideoBackground
        mode="hero"
        src="/video/videosite2.2.mp4"
        poster="/video/videosite2.2-poster.webp"
      />

      {/* 1ª dobra: título claro sobre o vídeo. */}
      <Hero />

      {/* Conteúdo editorial em creme + faixas de vídeo (cobre o vídeo do herói). */}
      <HomeIntro />

      {/* Portfólio, depoimentos e contato — bloco taupe escuro (texto claro). */}
      <HomeShowcase />

      {/* Botão flutuante de WhatsApp com mini-chatbot. */}
      <WhatsAppWidget />
    </>
  );
}
