import ImmersiveHome from "@/components/ImmersiveHome";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* Home imersiva (estilo galeria): a rolagem leva a câmera pelo espaço. */}
      <ImmersiveHome />
      <WhatsAppWidget />
    </>
  );
}
