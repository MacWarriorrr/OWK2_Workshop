import type { SubjectId } from "./subjects";

export interface CardData {
  id: string;
  title: string;
  statement: string;
  category: string;
  sources?: string[];
}

export const cardsBySubject: Record<SubjectId, CardData[]> = {
  natuurkunde: [
    {
      id: "nat-1",
      title: "Het nationaal Centraal Eindexamen (CE)",
      statement: "Ongeacht de leerroute in de voorgaande jaren, sluit iedere leerling het vak af met hetzelfde landelijke eindexamen.",
      category: "Examen",
    },
    {
      id: "nat-2",
      title: "Onderzoekend leren en practica",
      statement: "Een deel van het curriculum bestaat uit (groeps)practica. De mate van openheid en de aanpak van deze onderzoeken kan sterk variëren in vergelijking met reguliere kennistoetsen.",
      category: "Practicum",
    },
    {
      id: "nat-3",
      title: "Verschillende motivaties en verwachtingen",
      statement: "Leerlingen volgen een vak met verschillende motivaties, variërend van intrinsieke interesse tot externe verplichtingen of strategische keuzes gericht op een vervolgstudie. Sommige leerlingen hebben grote interesse in natuurkundige vraagstukken, terwijl anderen het vak voornamelijk volgen vanwege hun profielkeuze of toelatingseisen.",
      category: "Motivatie",
    },
    {
      id: "nat-4",
      title: "Verschillen in wiskunde- en rekenvaardigheid",
      statement: "Leerlingen verschillen in de mate waarin zij beschikken over de wiskundige vaardigheden die nodig zijn om vakspecifieke problemen op te lossen, bijvoorbeeld door verschillen in wiskundeprofielen (zoals wiskunde A of B). Het toepassen van formules en berekeningen vereist wiskundige vaardigheden die niet bij alle leerlingen even sterk ontwikkeld zijn.",
      category: "Voorkennis",
    },
    {
      id: "nat-5",
      title: "Verschillen in abstract denkvermogen",
      statement: "Leerlingen verschillen in hun vermogen om abstracte concepten en modellen te begrijpen en toe te passen. Leerlingen moeten formules en modellen gebruiken om natuurkundige fenomenen te verklaren, wat een bepaald niveau van abstractie vereist.",
      category: "Cognitie",
    },
    {
      id: "nat-6",
      title: "Structuur van vaste lesmethodes",
      statement: "De theorie bestaat uit strak afgebakende modules en hoofdstukken, gestuurd door een schoolbrede methode die een vaste introductie- en opdrachtenvolgorde hanteert.",
      category: "Methode",
    },
    {
      id: "nat-7",
      title: "Vast eindexamenprogramma",
      statement: "Het curriculum is een snelle opeenvolging van strak gedefinieerde modules, wat weinig tijd overlaat om langdurig uit te wijken naar actualiteiten of specifieke contexten die leerlingen interessant vinden.",
      category: "Curriculum",
    },
    {
      id: "nat-8",
      title: "Gepersonaliseerde leerroutes",
      statement: "Veel moderne methodes bieden (digitale) platforms waarmee leerlingen in hun eigen tempo en op hun eigen niveau door de stof en opdrachten kunnen werken.",
      category: "Leermiddelen",
    },
  ],
  informatica: [
    {
      id: "inf-1",
      title: "Grote verschillen in voorkennis",
      statement: "Sommige leerlingen programmeren thuis al jaren in verschillende talen, terwijl anderen aan het begin van de bovenbouw nog nooit een regel code hebben geschreven.",
      category: "Voorkennis",
    },
    {
      id: "inf-2",
      title: "Volledige vrijheid in examinering (Geen CE)",
      statement: "Het vak heeft alleen een Schoolexamen (SE). De landelijke eisen van het examenprogramma zijn relatief open, wat de vakgroep veel vrijheid geeft bij het opstellen van het PTA.",
      category: "Examen",
    },
    {
      id: "inf-3",
      title: "Open projecten",
      statement: "Praktische opdrachten, zoals het bouwen van een website of game, zijn in theorie nooit 'af'. Er kunnen altijd extra functies, efficiëntere code of complexere ontwerpelementen worden toegevoegd.",
      category: "Project",
    },
    {
      id: "inf-4",
      title: "Toegankelijkheid van online bronnen",
      statement: "Voor vrijwel elk programmeerprobleem is online een oplossing, tutorial of verdieping te vinden. De docent is daardoor niet de enige, en vaak niet de snelste, bron van kennis.",
      category: "Leerbronnen",
    },
    {
      id: "inf-5",
      title: "Theoretische basiskennis",
      statement: "Naast praktisch programmeren bevat het examenprogramma ook feitelijke theorie, zoals hardware-architectuur, binaire wiskunde en netwerkprotocollen, wat wordt afgesloten via reguliere kennistoetsen.",
      category: "Curriculum",
    },
    {
      id: "inf-6",
      title: "Verschillende motivaties en verwachtingen",
      statement: "Leerlingen volgen een vak met verschillende motivaties, variërend van intrinsieke interesse tot externe verplichtingen of strategische keuzes gericht op een vervolgstudie. Leerlingen kiezen het vak zowel uit interesse (bijv. gaming) als strategisch, bijvoorbeeld ter voorbereiding op een numerus fixus-selectie voor een vervolgstudie Informatica. Deze motivatie kan gedurende het jaar veranderen.",
      category: "Motivatie",
    },
    {
      id: "inf-7",
      title: "Samenwerken aan code (Pair Programming)",
      statement: "Praktische opdrachten worden vaak in tweetallen uitgevoerd. De samenstelling van deze koppels heeft grote invloed op zowel de kwaliteit van het eindproduct als het leerproces van de individuele leerling.",
      category: "Samenwerking",
    },
  ],
  wiskunde: [
    {
      id: "wis-1",
      title: "Het nationaal Centraal Eindexamen (CE)",
      statement: "Ongeacht de leerroute in de voorgaande jaren, sluit iedere leerling het vak af met hetzelfde landelijke eindexamen.",
      category: "Examen",
    },
    {
      id: "wis-2",
      title: "Grote klassen",
      statement: "Als verplicht vak zitten wiskundeklassen vaak vol tot hun maximale capaciteit, wat een directe impact heeft op de hoeveelheid beschikbare tijd voor individuele één-op-één begeleiding tijdens een lesuur.",
      category: "Organisatie",
    },
    {
      id: "wis-3",
      title: "Verschillende motivaties en verwachtingen",
      statement: "Leerlingen volgen een vak met verschillende motivaties, variërend van intrinsieke interesse tot externe verplichtingen of strategische keuzes gericht op een vervolgstudie. Omdat het een verplicht vak is, bevat de klas veel leerlingen die het niet uit eigen interesse volgen. In combinatie met het moeilijke imago van het vak, kan dit leiden tot een lagere intrinsieke motivatie.",
      category: "Motivatie",
    },
    {
      id: "wis-4",
      title: "Structuur van vaste lesmethodes",
      statement: "De theorie bestaat uit strak afgebakende modules en hoofdstukken, gestuurd door een schoolbrede methode die een vaste introductie- en opdrachtenvolgorde hanteert.",
      category: "Methode",
    },
    {
      id: "wis-5",
      title: "Vast eindexamenprogramma",
      statement: "Het curriculum is een snelle opeenvolging van strak gedefinieerde modules, wat weinig tijd overlaat om langdurig uit te wijken naar actualiteiten of specifieke contexten die leerlingen interessant vinden.",
      category: "Curriculum",
    },
    {
      id: "wis-6",
      title: "Gepersonaliseerde leerroutes",
      statement: "Veel moderne methodes bieden (digitale) platforms waarmee leerlingen in hun eigen tempo en op hun eigen niveau door de stof en opdrachten kunnen werken.",
      category: "Leermiddelen",
    },
  ],
  scheikunde: [
    {
      id: "sch-1",
      title: "Het nationaal Centraal Eindexamen (CE)",
      statement: "Ongeacht de leerroute in de voorgaande jaren, sluit iedere leerling het vak af met hetzelfde landelijke eindexamen.",
      category: "Examen",
    },
    {
      id: "sch-2",
      title: "Verschillende motivaties en verwachtingen",
      statement: "Leerlingen volgen een vak met verschillende motivaties, variërend van intrinsieke interesse tot externe verplichtingen of strategische keuzes gericht op een vervolgstudie. Voor sommige vervolgstudies is scheikunde verplicht, waardoor sommige leerlingen zich vooral richten op het efficiënt behalen van een voldoende.",
      category: "Motivatie",
    },
    {
      id: "sch-3",
      title: "Strikte veiligheidsprotocollen",
      statement: "Het werken met zuren, branders en chemicaliën tijdens practica vereist strikte regels en constant toezicht; de ruimte voor 'vrij' experimenteren is daarom beperkt.",
      category: "Practicum",
    },
    {
      id: "sch-4",
      title: "Verschillen in wiskunde- en rekenvaardigheid",
      statement: "Leerlingen verschillen in de mate waarin zij beschikken over de wiskundige vaardigheden die nodig zijn om vakspecifieke problemen op te lossen, bijvoorbeeld door verschillen in wiskundeprofielen (zoals wiskunde A of B). Onderdelen zoals stoichiometrie vereisen rekenvaardigheden, waarvan het niveau binnen een klas sterk kan verschillen.",
      category: "Voorkennis",
    },
    {
      id: "sch-5",
      title: "Verschillen in abstract denkvermogen",
      statement: "Leerlingen verschillen in hun vermogen om abstracte concepten en modellen te begrijpen en toe te passen. Leerlingen moeten zichtbare fenomenen (macro) koppelen aan processen op moleculair niveau (micro), wat niet voor iedereen vanzelfsprekend is.",
      category: "Cognitie",
    },
    {
      id: "sch-6",
      title: "Structuur van vaste lesmethodes",
      statement: "De theorie bestaat uit strak afgebakende modules en hoofdstukken, gestuurd door een schoolbrede methode die een vaste introductie- en opdrachtenvolgorde hanteert.",
      category: "Methode",
    },
    {
      id: "sch-7",
      title: "Vast eindexamenprogramma",
      statement: "Het curriculum is een snelle opeenvolging van strak gedefinieerde modules, wat weinig tijd overlaat om langdurig uit te wijken naar actualiteiten of specifieke contexten die leerlingen interessant vinden.",
      category: "Curriculum",
    },
    {
      id: "sch-8",
      title: "Gepersonaliseerde leerroutes",
      statement: "Veel moderne methodes bieden (digitale) platforms waarmee leerlingen in hun eigen tempo en op hun eigen niveau door de stof en opdrachten kunnen werken.",
      category: "Leermiddelen",
    },
  ],
  ontwerp: [
    {
      id: "ont-1",
      title: "Gezamenlijke probleemstelling, eigen aanpak",
      statement: "Groepen werken vanuit één duidelijke, gezamenlijke opdracht, maar hebben de vrijheid om zelf te bepalen hoe het creatieve proces en de uiteindelijke oplossing eruit komen te zien.",
      category: "Project",
    },
    {
      id: "ont-2",
      title: "Projectmatige inlevermomenten",
      statement: "Het ontwerpproces wordt gestructureerd door harde deadlines voor tussenproducten, zoals een verplicht projectplan.",
      category: "Organisatie",
    },
    {
      id: "ont-3",
      title: "Externe expertise raadplegen",
      statement: "Van leerlingen wordt verwacht dat zij zelfstandig experts buiten de school benaderen die aansluiten bij hun specifieke leervraag of gekozen projectrichting.",
      category: "Leerbronnen",
    },
    {
      id: "ont-4",
      title: "Gestandaardiseerde beoordelingscriteria (Rubric)",
      statement: "Ondanks de grote diversiteit in eindproducten, wordt elk project beoordeeld op basis van één vooraf vastgestelde en transparante rubric.",
      category: "Beoordeling",
    },
    {
      id: "ont-5",
      title: "Individuele procesreflectie",
      statement: "Naast het op te leveren groepsproduct, houdt elke leerling op diens eigen manier een reflectieverslag bij, wat wordt meegewogen in de individuele eindbeoordeling.",
      category: "Reflectie",
    },
    {
      id: "ont-6",
      title: "Volledige vrijheid in examinering (Geen CE)",
      statement: "Het vak heeft alleen een Schoolexamen (SE). De landelijke eisen van het examenprogramma zijn relatief open, wat de vakgroep veel vrijheid geeft bij het opstellen van het PTA.",
      category: "Examen",
    },
  ],
};
