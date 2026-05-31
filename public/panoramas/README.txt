Imagens panorâmicas equiretangulares (formato 2:1) usadas no tour 360° em
/experiencia-360.

DESCOBERTA AUTOMÁTICA: qualquer arquivo .webp colocado nesta pasta vira uma
aba no tour, sem precisar editar código. A ordem e o nome da aba são deduzidos
do nome do arquivo por palavra-chave:

  sala / cozinha / social   -> "Área Social"    (1ª)
  suite / master / quarto   -> "Suíte Master"   (2ª)
  gourmet                    -> "Espaço Gourmet" (3ª)
  festas / salao / salão     -> "Salão de Festas"(4ª)
  fachada / externa          -> "Fachada"        (5ª)
  (qualquer outro)           -> nome em Title Case, ao final

Imagens atuais:
  - sala-cozinha-360.webp
  - suite-master-360.webp
  - sa-tio-gourmet.webp
  - salao-festas.webp
  - fachada-360.webp

Dica: equiretangular = proporção 2:1 (ex.: 4096x2048, 8192x4096). Imagens muito
grandes (>4096px) são reduzidas automaticamente no celular para garantir que
rodem em GPUs móveis.
