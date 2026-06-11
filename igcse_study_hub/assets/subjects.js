/* ── (I)GCSE STUDY HUB — SUBJECT REGISTRY ─────────────────────────
   Single source of truth for every subject: identity, theming, and
   topic structure. Subject pages and the hub both render from this.
   To flesh out a subject later, fill in topic content on its page —
   the structure here drives navigation and placeholders only.      */

window.SUBJECTS = [
  {
    id: 'latin',
    file: 'latin.html',
    name: 'Latin',
    code: 'OCR GCSE Latin (J282)',
    tagline: 'Grammar, syntax, and the complete defined vocabulary list',
    icon: '🏛️',
    accent: '#8b1a1a', accentDark: '#5a0a0a',
    status: 'complete',
    // Latin's page is fully hand-authored; topics listed for the hub card only.
    topics: [
      { id: 'nouns', title: 'Nouns' },
      { id: 'adjectives', title: 'Adjectives' },
      { id: 'pronouns', title: 'Pronouns' },
      { id: 'verbs', title: 'Verbs' },
      { id: 'adverbs', title: 'Adverbs' },
      { id: 'prepositions', title: 'Prepositions' },
      { id: 'conjunctions', title: 'Conjunctions' },
      { id: 'syntax', title: 'Syntax' },
      { id: 'vocab', title: 'Vocabulary' }
    ]
  },
  {
    id: 'french',
    file: 'french.html',
    name: 'French',
    code: '(I)GCSE French',
    tagline: 'Grammar, themed vocabulary, and skills for all four papers',
    icon: '🗼',
    accent: '#1d4ed8', accentDark: '#102a72',
    status: 'planned',
    topics: [
      { id: 'grammar', title: 'Grammar', subtopics: ['Articles & nouns', 'Adjectives & agreement', 'Adverbs & comparison', 'Pronouns', 'Prepositions', 'Negatives', 'Asking questions'] },
      { id: 'verbs', title: 'Verbs & Tenses', subtopics: ['Present tense', 'Perfect tense', 'Imperfect tense', 'Near & simple future', 'Conditional', 'Subjunctive basics', 'Reflexive verbs', 'Irregular verb tables'] },
      { id: 'vocab', title: 'Vocabulary by Theme', subtopics: ['Identity & culture', 'Local area, holiday & travel', 'School & education', 'Future aspirations, study & work', 'International & global dimension'] },
      { id: 'phrases', title: 'Phrases & Structures', subtopics: ['Opinion phrases', 'Connectives', 'Time expressions', 'Complex structures for top marks', 'Idioms'] },
      { id: 'skills', title: 'Exam Skills', subtopics: ['Listening strategy', 'Reading strategy', 'Speaking: role-play, photo card, conversation', 'Writing tasks', 'Translation both ways'] }
    ]
  },
  {
    id: 'chemistry',
    file: 'chemistry.html',
    name: 'Chemistry',
    code: '(I)GCSE Chemistry',
    tagline: 'All topics, required practicals, and key terminology',
    icon: '⚗️',
    accent: '#0d7a5f', accentDark: '#06453a',
    status: 'planned',
    topics: [
      { id: 'atomic', title: 'Atomic Structure & the Periodic Table', subtopics: ['Atoms, elements, compounds, mixtures', 'Atomic models', 'Electronic structure', 'Periodic table trends', 'Groups 1, 7 and 0'] },
      { id: 'bonding', title: 'Bonding, Structure & Properties', subtopics: ['Ionic bonding', 'Covalent bonding', 'Metallic bonding', 'States of matter', 'Giant structures, polymers, nanoparticles'] },
      { id: 'quantitative', title: 'Quantitative Chemistry', subtopics: ['Relative masses & moles', 'Conservation of mass', 'Reacting mass calculations', 'Concentration', 'Yield & atom economy'] },
      { id: 'changes', title: 'Chemical Changes', subtopics: ['Reactivity series', 'Extraction of metals', 'Acids, bases & salts', 'pH & neutralisation', 'Electrolysis'] },
      { id: 'energy', title: 'Energy Changes', subtopics: ['Exothermic & endothermic reactions', 'Reaction profiles', 'Bond energy calculations', 'Cells, batteries & fuel cells'] },
      { id: 'rates', title: 'Rates & Equilibrium', subtopics: ['Collision theory', 'Factors affecting rate', 'Catalysts', 'Reversible reactions', "Le Chatelier's principle"] },
      { id: 'organic', title: 'Organic Chemistry', subtopics: ['Crude oil & alkanes', 'Cracking', 'Alkenes', 'Alcohols & carboxylic acids', 'Polymers'] },
      { id: 'analysis', title: 'Chemical Analysis', subtopics: ['Purity & formulations', 'Chromatography', 'Gas tests', 'Ion tests & flame tests'] },
      { id: 'atmosphere', title: 'Atmosphere & Resources', subtopics: ["Evolution of Earth's atmosphere", 'Greenhouse gases & climate', 'Pollutants', 'Potable water', 'Life-cycle assessment & recycling'] },
      { id: 'practicals', title: 'Required Practicals', subtopics: ['Method summaries', 'Variables & control', 'Common errors', 'Practical exam questions'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words', 'Equations & formulae triangle'] }
    ]
  },
  {
    id: 'biology',
    file: 'biology.html',
    name: 'Biology',
    code: '(I)GCSE Biology',
    tagline: 'All topics, required practicals, and key terminology',
    icon: '🧬',
    accent: '#3f7d20', accentDark: '#244a11',
    status: 'planned',
    topics: [
      { id: 'cells', title: 'Cell Biology', subtopics: ['Cell structure: animal, plant, bacterial', 'Microscopy & magnification', 'Cell division & stem cells', 'Transport: diffusion, osmosis, active transport'] },
      { id: 'organisation', title: 'Organisation', subtopics: ['Tissues, organs & organ systems', 'Digestive system & enzymes', 'Heart, blood & circulation', 'Plant tissues & transport', 'Non-communicable disease'] },
      { id: 'infection', title: 'Infection & Response', subtopics: ['Pathogens: bacteria, viruses, fungi, protists', 'Human defence systems', 'Vaccination', 'Antibiotics & drug development', 'Monoclonal antibodies'] },
      { id: 'bioenergetics', title: 'Bioenergetics', subtopics: ['Photosynthesis & limiting factors', 'Aerobic & anaerobic respiration', 'Metabolism', 'Exercise & oxygen debt'] },
      { id: 'homeostasis', title: 'Homeostasis & Response', subtopics: ['Nervous system & reflexes', 'The brain & the eye', 'Hormones & the endocrine system', 'Blood glucose control', 'Hormones in reproduction', 'Plant hormones'] },
      { id: 'inheritance', title: 'Inheritance, Variation & Evolution', subtopics: ['DNA & the genome', 'Genetic crosses & inheritance', 'Variation & mutation', 'Evolution & natural selection', 'Selective breeding & genetic engineering', 'Classification'] },
      { id: 'ecology', title: 'Ecology', subtopics: ['Communities & abiotic/biotic factors', 'Adaptations', 'Cycles: carbon & water', 'Biodiversity & human impact', 'Trophic levels & food security'] },
      { id: 'practicals', title: 'Required Practicals', subtopics: ['Method summaries', 'Variables & control', 'Common errors', 'Practical exam questions'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words'] }
    ]
  },
  {
    id: 'physics',
    file: 'physics.html',
    name: 'Physics',
    code: '(I)GCSE Physics',
    tagline: 'All topics, equations, required practicals, and key terms',
    icon: '⚛️',
    accent: '#5d3ab8', accentDark: '#33206b',
    status: 'planned',
    topics: [
      { id: 'energy', title: 'Energy', subtopics: ['Energy stores & transfers', 'Kinetic, potential & elastic energy', 'Specific heat capacity', 'Power & efficiency', 'Energy resources'] },
      { id: 'electricity', title: 'Electricity', subtopics: ['Circuit symbols & rules', 'Current, potential difference & resistance', 'Series & parallel circuits', 'Mains electricity & safety', 'Energy & power in circuits', 'Static electricity'] },
      { id: 'particles', title: 'Particle Model of Matter', subtopics: ['Density', 'States of matter & internal energy', 'Specific latent heat', 'Gas pressure'] },
      { id: 'atomic', title: 'Atomic Structure & Radiation', subtopics: ['Atomic models', 'Isotopes', 'Radioactive decay: α, β, γ', 'Half-life', 'Uses & hazards of radiation', 'Fission & fusion'] },
      { id: 'forces', title: 'Forces & Motion', subtopics: ['Scalars, vectors & resultant forces', 'Speed, velocity & acceleration', 'Motion graphs', "Newton's laws", 'Stopping distances', 'Momentum', 'Moments, levers & pressure'] },
      { id: 'waves', title: 'Waves', subtopics: ['Transverse & longitudinal waves', 'Wave equation', 'Reflection & refraction', 'Electromagnetic spectrum', 'Lenses & sound (separate science)'] },
      { id: 'magnetism', title: 'Magnetism & Electromagnetism', subtopics: ['Magnetic fields', 'Electromagnets', 'The motor effect', 'Generators & transformers'] },
      { id: 'space', title: 'Space Physics', subtopics: ['The solar system', 'Life cycle of stars', 'Orbits & satellites', 'Red-shift & the Big Bang'] },
      { id: 'equations', title: 'Equations & Units', subtopics: ['Equations to memorise', 'Equations given on the sheet', 'SI units & prefixes', 'Rearranging practice'] },
      { id: 'practicals', title: 'Required Practicals', subtopics: ['Method summaries', 'Variables & control', 'Common errors', 'Practical exam questions'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words'] }
    ]
  },
  {
    id: 'maths',
    file: 'maths.html',
    name: 'Maths',
    code: '(I)GCSE Mathematics',
    tagline: 'Every topic strand, formulae, and worked-example bank',
    icon: '📐',
    accent: '#0e7490', accentDark: '#074152',
    status: 'planned',
    topics: [
      { id: 'number', title: 'Number', subtopics: ['Integers, decimals & fractions', 'Indices & surds', 'Standard form', 'Bounds & estimation', 'HCF, LCM & primes'] },
      { id: 'algebra', title: 'Algebra', subtopics: ['Simplifying & expanding', 'Factorising', 'Linear & quadratic equations', 'Simultaneous equations', 'Inequalities', 'Sequences', 'Graphs & functions', 'Algebraic proof'] },
      { id: 'ratio', title: 'Ratio, Proportion & Rates of Change', subtopics: ['Ratio & scale', 'Direct & inverse proportion', 'Percentages & compound growth', 'Speed, density & pressure'] },
      { id: 'geometry', title: 'Geometry & Measures', subtopics: ['Angles & polygons', 'Congruence & similarity', 'Transformations', 'Constructions & loci', 'Circle theorems', 'Area, perimeter & volume'] },
      { id: 'trig', title: 'Trigonometry & Vectors', subtopics: ['Pythagoras', 'SOHCAHTOA', 'Sine & cosine rules', '3D problems', 'Vectors & vector proof'] },
      { id: 'probability', title: 'Probability', subtopics: ['Basic probability & sample space', 'Tree diagrams', 'Venn diagrams & set notation', 'Conditional probability'] },
      { id: 'statistics', title: 'Statistics', subtopics: ['Averages & spread', 'Charts & graphs', 'Cumulative frequency & box plots', 'Histograms', 'Sampling'] },
      { id: 'formulae', title: 'Formulae Sheet', subtopics: ['Formulae to memorise', 'Formulae given in exam', 'When to use which'] },
      { id: 'worked', title: 'Worked Example Bank', subtopics: ['Grade 4–5 staples', 'Grade 6–7 problems', 'Grade 8–9 stretch', 'Common mistakes'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words & mark scheme language'] }
    ]
  },
  {
    id: 'economics',
    file: 'economics.html',
    name: 'Economics',
    code: '(I)GCSE Economics',
    tagline: 'Micro, macro, diagrams, and key terminology',
    icon: '📈',
    accent: '#946200', accentDark: '#543700',
    status: 'planned',
    topics: [
      { id: 'basic', title: 'The Basic Economic Problem', subtopics: ['Scarcity & choice', 'Opportunity cost', 'Factors of production', 'Production possibility curves'] },
      { id: 'markets', title: 'Markets: Demand, Supply & Price', subtopics: ['Demand & its determinants', 'Supply & its determinants', 'Market equilibrium', 'Elasticity (PED, PES, YED)', 'Market failure & externalities'] },
      { id: 'firms', title: 'Production, Costs & Firms', subtopics: ['Productivity & division of labour', 'Costs, revenue & profit', 'Economies of scale', 'Competition & monopoly', 'Business growth'] },
      { id: 'labour', title: 'The Labour Market', subtopics: ['Wage determination', 'Trade unions', 'Minimum wage', 'Employment & unemployment types'] },
      { id: 'government', title: 'Government & the Economy', subtopics: ['Macroeconomic objectives', 'Economic growth & GDP', 'Inflation', 'Fiscal policy', 'Monetary policy', 'Supply-side policy', 'Income distribution & redistribution'] },
      { id: 'trade', title: 'International Trade & Exchange Rates', subtopics: ['Why countries trade', 'Free trade & protectionism', 'Exchange rates', 'Balance of payments', 'Globalisation'] },
      { id: 'development', title: 'Development Economics', subtopics: ['Measuring development', 'Causes of poverty', 'Aid, debt & investment', 'Sustainable development'] },
      { id: 'diagrams', title: 'Diagrams Bank', subtopics: ['Demand & supply shifts', 'Elasticity diagrams', 'Externality diagrams', 'How to draw & label for full marks'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words & essay structure'] }
    ]
  },
  {
    id: 'history',
    file: 'history.html',
    name: 'History',
    code: '(I)GCSE History',
    tagline: 'Period, depth and thematic studies, sources, and dates',
    icon: '📜',
    accent: '#7a4a21', accentDark: '#432711',
    status: 'planned',
    topics: [
      { id: 'period', title: 'Period Study', subtopics: ['Key events narrative', 'Causes & consequences', 'Key individuals', 'Turning points'] },
      { id: 'depth', title: 'Depth Studies', subtopics: ['Study 1: key events & people', 'Study 2: key events & people', 'Society, politics & economy in depth'] },
      { id: 'thematic', title: 'Thematic Study', subtopics: ['Change & continuity over time', 'Factors driving change', 'Comparisons across periods'] },
      { id: 'environment', title: 'Historic Environment', subtopics: ['Site knowledge', 'Site in its historical context', 'Typical question styles'] },
      { id: 'sources', title: 'Source & Interpretation Skills', subtopics: ['Analysing sources (content, provenance, tone)', 'Evaluating usefulness & reliability', 'Comparing interpretations', 'Writing source answers'] },
      { id: 'timeline', title: 'Timelines & Key Dates', subtopics: ['Master timeline per unit', 'Date drills', 'Linking events'] },
      { id: 'technique', title: 'Essay & Exam Technique', subtopics: ['Question types & timings', 'Paragraph structures (PEEL etc.)', 'Mark scheme language', 'Model answers'] },
      { id: 'glossary', title: 'Key Terms Glossary', subtopics: ['Definitions A–Z', 'Command words'] }
    ]
  },
  {
    id: 'english-literature',
    file: 'english-literature.html',
    name: 'English Literature',
    code: '(I)GCSE English Literature',
    tagline: 'Set texts, poetry, context, terminology, and essay craft',
    icon: '📖',
    accent: '#a31d5c', accentDark: '#5c0e33',
    status: 'planned',
    topics: [
      { id: 'shakespeare', title: 'Shakespeare', subtopics: ['Plot & scene summaries', 'Characters', 'Themes', 'Key quotations', 'Language & dramatic methods', 'Context'] },
      { id: 'novel', title: '19th-Century Novel', subtopics: ['Plot & chapter summaries', 'Characters', 'Themes', 'Key quotations', "Writer's methods", 'Context'] },
      { id: 'modern', title: 'Modern Prose / Drama', subtopics: ['Plot summaries', 'Characters', 'Themes', 'Key quotations', "Writer's methods", 'Context'] },
      { id: 'anthology', title: 'Poetry Anthology', subtopics: ['Poem-by-poem analysis', 'Comparisons & pairings', 'Key quotations', 'Poetic methods', 'Context'] },
      { id: 'unseen', title: 'Unseen Poetry', subtopics: ['Approach & annotation method', 'Comparing two unseen poems', 'Useful analytical vocabulary'] },
      { id: 'devices', title: 'Literary Devices & Terminology', subtopics: ['Language devices', 'Structural devices', 'Poetic form & metre', 'Dramatic techniques'] },
      { id: 'context', title: 'Context Banks', subtopics: ['Historical & social context per text', 'How to weave context into essays'] },
      { id: 'technique', title: 'Essay Technique & Mark Schemes', subtopics: ['Assessment objectives explained', 'Essay structures', 'Embedding quotations', 'Model paragraphs'] }
    ]
  },
  {
    id: 'english-language',
    file: 'english-language.html',
    name: 'English Language',
    code: '(I)GCSE English Language',
    tagline: 'Reading analysis, writing skills, and exam technique',
    icon: '✒️',
    accent: '#c2451e', accentDark: '#6e2410',
    status: 'planned',
    topics: [
      { id: 'fiction', title: 'Reading: Fiction', subtopics: ['Identifying explicit & implicit information', 'Language analysis questions', 'Structure analysis questions', 'Evaluation questions'] },
      { id: 'nonfiction', title: 'Reading: Non-fiction', subtopics: ['Summary & synthesis', 'Language analysis in non-fiction', 'Comparing writers’ viewpoints', '19th- vs 20th/21st-century texts'] },
      { id: 'creative', title: 'Creative Writing', subtopics: ['Narrative structure', 'Descriptive techniques', 'Openings & endings', 'Sentence variety & ambitious vocabulary', 'Planning under time pressure'] },
      { id: 'transactional', title: 'Transactional Writing', subtopics: ['Letters, articles, speeches, leaflets, essays', 'Form, audience & purpose', 'Rhetorical devices', 'Tone & register'] },
      { id: 'terminology', title: 'Language & Structure Terminology', subtopics: ['Word-level terms', 'Sentence-level terms', 'Whole-text structural terms', 'How to use terms in answers'] },
      { id: 'spoken', title: 'Spoken Language Endorsement', subtopics: ['Choosing a topic', 'Delivery techniques', 'Handling questions'] },
      { id: 'technique', title: 'Exam Technique & Mark Schemes', subtopics: ['Question-by-question timings', 'Assessment objectives explained', 'Model answers', 'Common pitfalls'] }
    ]
  }
];

window.getSubject = function (id) {
  return window.SUBJECTS.find(function (s) { return s.id === id; }) || null;
};
