import ImmersiveHome from "@/components/ImmersiveHome";
import HomeShowcase from "@/components/HomeShowcase";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* Página única: a rolagem percorre o flythrough imersivo e, em seguida,
          flui para Projetos / Depoimentos / Contato (mesmo scroll). A 360° é
          uma página à parte (mantém o estilo anterior). */}
      <ImmersiveHome />
      <HomeShowcase />
      <WhatsAppWidget />
    </>
  );
}
