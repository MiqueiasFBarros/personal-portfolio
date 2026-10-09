const projectsData = [
  {
    title: "hel_py: Mini IDE & Compiler",
    date: "2026-06",
    displayDate: "2026 // Academic",
    type: "text",
    imageContent: ">_ hel_py.exe",
    imageBg: "#1e1e1e",
    imageColor: "#4b8bbe",
    fontSize: "1.5rem",
    description:
      "Ambiente de desenvolvimento e compilador/interpretador construído do zero. Implementação de análise léxica, sintática e gerenciamento de variáveis para sintaxe Python.",
    techs: ["C#", ".NET Framework", "Compiladores"],
    links: [
      {
        url: "https://github.com/MiqueiasFBarros",
        icon: "ph-github-logo",
        text: "Source",
        highlight: false,
      },
    ],
  },
  {
    title: "MeiLink",
    date: "2026-05",
    displayDate: "2026 // Live",
    type: "image",
    imageContent: "assets/images/sites/meilink.png",
    imageFit: "cover",
    description:
      "Interface web orientada para gestão e centralização de links (Bio Links). Foco total em design mobile-first e navegação rápida.",
    techs: ["WordPress", "Elementor", "CSS3", "JavaScript"],
    links: [
      {
        url: "https://meilink.com.br",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "Agito Alagoas",
    date: "2026-04",
    displayDate: "2026 // Live",
    type: "image",
    imageContent: "assets/images/sites/agitoalagoas.png",
    imageFit: "cover",
    description:
      "Portal de entretenimento e eventos regionais. Arquitetura front-end desenvolvida para destacar galerias de imagens e cobertura de festas.",
    techs: ["WordPress", "Elementor", "CSS3", "JavaScript"],
    links: [
      {
        url: "https://agitoalagoas.com.br",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "PNG Grátis",
    date: "2026-04",
    displayDate: "2026 // Live",
    type: "image",
    imageContent: "assets/images/sites/pnggratis.png",
    imageFit: "cover",
    description:
      "Plataforma de disponibilização de recursos visuais. Desenvolvimento de carrosséis de categorias, banners promocionais e interfaces de utilizador.",
    techs: ["WordPress", "Elementor", "Web Design"],
    links: [
      {
        url: "https://pnggratis.com.br",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "Comércio de Coruripe",
    date: "2026-03",
    displayDate: "2026 // Live",
    type: "image",
    imageContent: "assets/images/sites/comerciodecoruripe.png",
    imageFit: "cover",
    description:
      "Guia comercial e diretório online de negócios. Estruturação de dados e design responsivo focado na usabilidade para pesquisa local.",
    techs: ["WordPress", "Elementor", "CSS3", "JavaScript"],
    links: [
      {
        url: "https://comerciodecoruripe.com.br",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "Grupo Castro Agência",
    date: "2026-02",
    displayDate: "2026 // Live",
    type: "image",
    imageContent: "assets/images/sites/grupocastro.png",
    imageFit: "cover",
    description:
      "Desenvolvimento e manutenção da plataforma web oficial da agência. Criação de layouts dinâmicos e integração de componentes institucionais.",
    techs: ["WordPress", "Elementor", "CSS3", "JavaScript"],
    links: [
      {
        url: "https://grupocastroagencia.com.br",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "Moptimizer",
    date: "2025-12",
    displayDate: "2025 // Private Beta",
    type: "text",
    imageContent: "{ Mopt }",
    imageBg: "#0a0a0a",
    imageColor: "#00ff41",
    fontSize: "2rem",
    description:
      "Projeto privado em fase Beta. Script JavaScript client-side criado para demonstrar domínio técnico avançado em otimização extrema de banda. Gerencia o carregamento assíncrono de imagens e iframes em ambientes de baixa conexão.",
    techs: [
      "JavaScript",
      "Web Performance",
      "DOM Manipulation",
      "Private Architecture",
    ],
    links: [
      {
        url: "#contact",
        icon: "ph-lock-key",
        text: "Closed Source",
        highlight: false,
      },
    ],
  },
  {
    title: "Portal Destino Coruripe",
    date: "2025-06",
    displayDate: "2025 // Live",
    type: "image",
    imageContent: "assets/images/sites/destinocoruripe.png",
    imageFit: "cover",
    description:
      "Desenvolvimento Front-end freelancer para o Grupo Castro Agência. Portal turístico responsivo com sistema de reservas e guia local.",
    techs: ["HTML5", "CSS3", "JavaScript", "SEO"],
    links: [
      {
        url: "https://destinocoruripe.com.br/",
        icon: "ph-globe",
        text: "Visit Site",
        highlight: false,
      },
    ],
  },
  {
    title: "Ping-Pong Arcade",
    date: "2024-11",
    displayDate: "2024",
    type: "image",
    imageContent: "assets/images/sites/pong.png",
    imageFit: "cover",
    description:
      "Recriação do clássico jogo Arcade com física de colisão e pontuação via Canvas API.",
    techs: ["HTML5 Canvas", "JS Game Loop", "CSS3"],
    links: [
      {
        url: "https://github.com/MiqueiasFBarros/PING-PONG",
        icon: "ph-github-logo",
        text: "Code",
        highlight: false,
      },
      {
        url: "https://miqueiasfbarros.github.io/PING-PONG/",
        icon: "ph-play",
        text: "Play",
        highlight: true,
      },
    ],
  },
  {
    title: "Golden Dice (Android)",
    date: "2024-06",
    displayDate: "2024",
    type: "image",
    imageContent:
      "https://raw.githubusercontent.com/MiqueiasFBarros/Golden_Dice/master/app/src/main/res/drawable/titulo.png",
    imageFit: "object-contain",
    imageBg: "#2b2b2b",
    description:
      "App auxiliar para RPG de mesa com rolagem de dados e histórico offline via SQLite.",
    techs: ["Java Android", "SQLite", "Android Studio"],
    links: [
      {
        url: "https://github.com/MiqueiasFBarros/Golden_Dice",
        icon: "ph-github-logo",
        text: "Repo",
        highlight: false,
      },
      {
        url: "https://github.com/MiqueiasFBarros/Golden_Dice/releases",
        icon: "ph-android-logo",
        text: "APK",
        highlight: false,
      },
    ],
  },
  {
    title: "PokeEco: Ecosystem Sim",
    date: "2023-10",
    displayDate: "2023",
    type: "image",
    imageContent:
      "https://raw.githubusercontent.com/MiqueiasFBarros/SimpEco_-PokeEco-/refs/heads/main/src/assetsREADME/logopoke.png",
    imageFit: "object-contain",
    imageBg: "#0f380f",
    description:
      "Simulador de ecossistema autônomo aplicando conceitos complexos de POO em Java.",
    techs: ["Java POO", "AI Logic", "OpenJDK"],
    links: [
      {
        url: "https://github.com/MiqueiasFBarros/SimpEco_-PokeEco-",
        icon: "ph-github-logo",
        text: "Repo",
        highlight: false,
      },
    ],
  },
];
