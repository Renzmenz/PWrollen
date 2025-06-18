'use client'

import { useState } from 'react'
import RoleCard from './RoleCard'
import SituationExplorer from './SituationExplorer'
import ProgressTracker from './ProgressTracker'
import FlowchartView from './FlowchartView'
import FlashcardView from './FlashcardView'

export interface Role {
  id: string
  name: string
  icon: string
  color: string
  description: string
  fullDescription: string
  situations: Situation[]
  flowchartSteps: FlowchartStep[]
  concepts: Concept[]
}

export interface Situation {
  id: string
  title: string
  description: string
  scenario: string
  questions: Question[]
  tips: string[]
}

export interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'reflection' | 'starr'
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

export interface CompletedExample {
  roleId: string
  situationId: string
  title: string
  reflection: string
  completedAt: Date
}

export interface FlowchartStep {
  id: string
  title: string
  description: string
  completed: boolean
  requirements: string[]
}

export interface Concept {
  id: string
  term: string
  definition: string
  example: string
  category: string
}

const roles: Role[] = [
  {
    id: 'aanpakker',
    name: 'Aanpakker',
    icon: '🚀',
    color: 'from-red-500 to-orange-500',
    description: 'Neem initiatief en pak dingen aan zonder dat het gevraagd wordt',
    fullDescription: 'Als Aanpakker laat je zien initiatief te nemen in de studie, met medestudenten, op stage. Je wacht niet tot er expliciet om wordt gevraagd, maar ziet kansen en grijpt ze.',
    flowchartSteps: [
      {
        id: 'step1',
        title: 'Kansen herkennen',
        description: 'Ik kan situaties identificeren waar initiatief nodig is',
        completed: false,
        requirements: ['Observatievermogen', 'Proactieve houding']
      },
      {
        id: 'step2',
        title: 'Initiatief nemen',
        description: 'Ik durf de eerste stap te zetten zonder dat het gevraagd wordt',
        completed: false,
        requirements: ['Moed', 'Zelfvertrouwen', 'Actiebereidheid']
      },
      {
        id: 'step3',
        title: 'Anderen betrekken',
        description: 'Ik kan anderen motiveren om mee te doen aan mijn initiatieven',
        completed: false,
        requirements: ['Communicatievaardigheden', 'Overtuigingskracht']
      },
      {
        id: 'step4',
        title: 'Doorpakken',
        description: 'Ik volg mijn initiatieven consequent door tot het einde',
        completed: false,
        requirements: ['Doorzettingsvermogen', 'Planningsvaardigheden']
      }
    ],
    concepts: [
      {
        id: 'c1',
        term: 'Proactiviteit',
        definition: 'Het anticiperen op toekomstige problemen en kansen en daar actie op ondernemen',
        example: 'Een planning maken voordat er deadlines dreigen',
        category: 'Houding'
      },
      {
        id: 'c2',
        term: 'Eigenaarschap',
        definition: 'Verantwoordelijkheid nemen voor resultaten en processen',
        example: 'Zelf oplossingen bedenken in plaats van wachten op instructies',
        category: 'Verantwoordelijkheid'
      },
      {
        id: 'c3',
        term: 'Ondernemerschap',
        definition: 'Het vermogen om kansen te zien en daar actie op te ondernemen',
        example: 'Een nieuw project starten dat waarde toevoegt',
        category: 'Mindset'
      }
    ],
    situations: [
      {
        id: 'groepsproject',
        title: 'Groepsproject zonder leider',
        description: 'Je zit in een groep waar niemand de leiding neemt',
        scenario: 'Het is de eerste bijeenkomst van jullie groepsproject. Iedereen zit wat ongemakkelijk te wachten. De deadline is over 3 weken, maar niemand neemt het initiatief om te beginnen met plannen.',
        questions: [
          {
            id: 'q1',
            text: 'Wat doe je in deze situatie?',
            type: 'multiple-choice',
            options: [
              'Wachten tot iemand anders begint',
              'Voorstellen om samen een planning te maken',
              'Zelf een planning maken en die delen',
              'Vragen of de docent kan helpen'
            ],
            correctAnswer: 1,
            explanation: 'Het voorstellen om samen een planning te maken toont initiatief terwijl je ook de groep betrekt.'
          },
          {
            id: 'q2',
            text: 'Beschrijf een situatie waarin je zelf initiatief hebt genomen zonder dat het werd gevraagd.',
            type: 'reflection'
          }
        ],
        tips: [
          'Kijk naar wat er nodig is en stel voor om het aan te pakken',
          'Betrek anderen bij je initiatief',
          'Begin klein en bouw vertrouwen op'
        ]
      },
      {
        id: 'stage-probleem',
        title: 'Probleem op stage',
        description: 'Je ziet een inefficiëntie in het bedrijfsproces',
        scenario: 'Tijdens je stage merk je dat een bepaald proces veel tijd kost en inefficiënt is. Je collega\'s lijken het als normaal te beschouwen, maar jij ziet mogelijkheden voor verbetering.',
        questions: [
          {
            id: 'q1',
            text: 'Hoe pak je dit aan?',
            type: 'multiple-choice',
            options: [
              'Niets doen, je bent maar een stagiair',
              'Klagen tegen andere stagiairs',
              'Een voorstel voorbereiden en bespreken met je begeleider',
              'Direct het proces veranderen'
            ],
            correctAnswer: 2,
            explanation: 'Een voorstel voorbereiden toont initiatief en professionaliteit.'
          },
          {
            id: 'q2',
            text: 'Gebruik de STARR-methode om een situatie te beschrijven waarin je initiatief nam op stage of werk.',
            type: 'starr'
          }
        ],
        tips: [
          'Observeer eerst goed voordat je voorstellen doet',
          'Bereid je voorstel goed voor met concrete argumenten',
          'Respecteer de bestaande cultuur en processen'
        ]
      }
    ]
  },
  {
    id: 'empathicus',
    name: 'Empathicus',
    icon: '💝',
    color: 'from-pink-500 to-purple-500',
    description: 'Verplaats je in anderen en begrijp verschillende perspectieven',
    fullDescription: 'Als Empathicus laat je zien je te verplaatsen in normen en waarden van een ander en kun je iets zinnigs zeggen over je eigen referentiekader en verschillen en overeenkomsten tussen jou en de ander.',
    flowchartSteps: [
      {
        id: 'step1',
        title: 'Actief luisteren',
        description: 'Ik kan echt luisteren naar wat anderen zeggen en voelen',
        completed: false,
        requirements: ['Luistervaardigheden', 'Geduld', 'Aandacht']
      },
      {
        id: 'step2',
        title: 'Perspectief nemen',
        description: 'Ik kan me verplaatsen in de situatie van een ander',
        completed: false,
        requirements: ['Voorstellingsvermogen', 'Openheid', 'Nieuwsgierigheid']
      },
      {
        id: 'step3',
        title: 'Eigen referentiekader kennen',
        description: 'Ik ben me bewust van mijn eigen normen, waarden en vooroordelen',
        completed: false,
        requirements: ['Zelfkennis', 'Reflectievermogen', 'Eerlijkheid']
      },
      {
        id: 'step4',
        title: 'Verschillen waarderen',
        description: 'Ik kan verschillen tussen mensen waarderen en benutten',
        completed: false,
        requirements: ['Tolerantie', 'Waardering voor diversiteit']
      }
    ],
    concepts: [
      {
        id: 'c1',
        term: 'Empathie',
        definition: 'Het vermogen om je in te leven in de gevoelens en gedachten van een ander',
        example: 'Begrijpen waarom een medestudent gestrest is over een deadline',
        category: 'Emotionele intelligentie'
      },
      {
        id: 'c2',
        term: 'Referentiekader',
        definition: 'Het geheel van ervaringen, waarden en overtuigingen waarmee je de wereld bekijkt',
        example: 'Je culturele achtergrond beïnvloedt hoe je naar samenwerking kijkt',
        category: 'Zelfkennis'
      },
      {
        id: 'c3',
        term: 'Perspectief nemen',
        definition: 'Het bewust proberen te begrijpen hoe een situatie er uitziet vanuit iemands anders oogpunt',
        example: 'Begrijpen waarom een docent streng is vanuit hun verantwoordelijkheid',
        category: 'Cognitieve vaardigheid'
      }
    ],
    situations: [
      {
        id: 'culturele-verschillen',
        title: 'Samenwerken met internationale studenten',
        description: 'Je werkt samen met studenten uit verschillende culturen',
        scenario: 'In je projectgroep zitten studenten uit Nederland, Turkije en China. Je merkt dat iedereen anders communiceert en andere verwachtingen heeft over samenwerking.',
        questions: [
          {
            id: 'q1',
            text: 'Hoe ga je om met deze verschillen?',
            type: 'multiple-choice',
            options: [
              'Iedereen moet zich aanpassen aan de Nederlandse manier',
              'Een gesprek starten over ieders verwachtingen en werkstijl',
              'Gewoon doorgaan en hopen dat het goed komt',
              'De groep opsplitsen per nationaliteit'
            ],
            correctAnswer: 1,
            explanation: 'Een open gesprek over verwachtingen toont empathie en begrip voor verschillen.'
          },
          {
            id: 'q2',
            text: 'Beschrijf je eigen culturele achtergrond en hoe dit je perspectief beïnvloedt.',
            type: 'reflection'
          }
        ],
        tips: [
          'Stel open vragen over ieders achtergrond',
          'Reflecteer op je eigen vooroordelen',
          'Zoek naar gemeenschappelijke doelen'
        ]
      },
      {
        id: 'conflict-medestudent',
        title: 'Conflict tussen medestudenten',
        description: 'Twee medestudenten hebben ruzie en vragen jou om hulp',
        scenario: 'Twee goede vrienden van je hebben ruzie over een misverstand. Beide komen naar jou toe met hun verhaal en willen dat je hun kant kiest.',
        questions: [
          {
            id: 'q1',
            text: 'Wat is je eerste reactie?',
            type: 'multiple-choice',
            options: [
              'De kant kiezen van degene die je het beste kent',
              'Zeggen dat je er niet tussen wilt zitten',
              'Beide verhalen aanhoren zonder oordeel',
              'Hen direct naar elkaar toe sturen'
            ],
            correctAnswer: 2,
            explanation: 'Beide verhalen aanhoren zonder oordeel toont empathie en helpt je de situatie te begrijpen.'
          },
          {
            id: 'q2',
            text: 'Beschrijf een situatie waarin je je succesvol hebt verplaatst in iemand anders zijn perspectief.',
            type: 'reflection'
          }
        ],
        tips: [
          'Luister actief naar beide kanten',
          'Stel verheldering vragen',
          'Help hen elkaar te begrijpen in plaats van partij te kiezen'
        ]
      }
    ]
  },
  {
    id: 'samenwerker',
    name: 'Samenwerker',
    icon: '🤝',
    color: 'from-blue-500 to-cyan-500',
    description: 'Werk effectief samen en ken je eigen rol in het team',
    fullDescription: 'Als Samenwerker kun je omschrijven hoe je bent in samenwerken, welke rol je inneemt, welk effect je hebt op andere mensen en waardoor je je door anderen laat beïnvloeden bij het samenwerken.',
    flowchartSteps: [
      {
        id: 'step1',
        title: 'Teamrollen herkennen',
        description: 'Ik ken verschillende teamrollen en kan ze herkennen bij mezelf en anderen',
        completed: false,
        requirements: ['Kennis van teamrollen', 'Observatievermogen']
      },
      {
        id: 'step2',
        title: 'Eigen rol bepalen',
        description: 'Ik weet welke rol ik van nature inneem in teams',
        completed: false,
        requirements: ['Zelfkennis', 'Reflectievermogen']
      },
      {
        id: 'step3',
        title: 'Effect op anderen',
        description: 'Ik begrijp hoe mijn gedrag anderen beïnvloedt in teamverband',
        completed: false,
        requirements: ['Sociale bewustzijn', 'Feedback verwerken']
      },
      {
        id: 'step4',
        title: 'Flexibel samenwerken',
        description: 'Ik kan mijn samenwerkingsstijl aanpassen aan de situatie en het team',
        completed: false,
        requirements: ['Flexibiliteit', 'Aanpassingsvermogen']
      }
    ],
    concepts: [
      {
        id: 'c1',
        term: 'Teamrollen (Belbin)',
        definition: 'Negen verschillende rollen die mensen kunnen innemen in teams',
        example: 'Voorzitter, Uitvoerder, Creatieve denker, etc.',
        category: 'Teamdynamiek'
      },
      {
        id: 'c2',
        term: 'Groepsdynamiek',
        definition: 'De processen en patronen die ontstaan wanneer mensen samenwerken',
        example: 'Hoe beslissingen worden genomen in een groep',
        category: 'Samenwerking'
      },
      {
        id: 'c3',
        term: 'Synergie',
        definition: 'Het effect waarbij het geheel meer is dan de som der delen',
        example: 'Een team dat betere resultaten behaalt dan individuen apart',
        category: 'Teameffectiviteit'
      }
    ],
    situations: [
      {
        id: 'teamrollen',
        title: 'Nieuwe projectgroep',
        description: 'Je moet je rol vinden in een nieuwe projectgroep',
        scenario: 'Je bent ingedeeld in een nieuwe projectgroep voor een belangrijk vak. De groep bestaat uit 5 personen die je nog niet goed kent. Jullie moeten samen een presentatie voorbereiden.',
        questions: [
          {
            id: 'q1',
            text: 'Welke rol neem je meestal in een groep?',
            type: 'multiple-choice',
            options: [
              'De leider die alles organiseert',
              'De creatieve denker met ideeën',
              'De praktische uitvoerder',
              'De verbinder die iedereen bij elkaar houdt'
            ],
            correctAnswer: -1,
            explanation: 'Er is geen juist antwoord - het gaat om zelfkennis over je natuurlijke rol.'
          },
          {
            id: 'q2',
            text: 'Beschrijf hoe jouw aanwezigheid het team beïnvloedt (positief en negatief).',
            type: 'reflection'
          }
        ],
        tips: [
          'Observeer eerst de groepsdynamiek',
          'Wees eerlijk over je sterke en zwakke punten',
          'Vraag feedback aan teamgenoten'
        ]
      },
      {
        id: 'moeilijke-samenwerking',
        title: 'Samenwerking met moeilijke persoon',
        description: 'Een teamlid werkt niet mee of is lastig',
        scenario: 'In je projectgroep is één persoon die constant te laat is, weinig bijdraagt en kritiek heeft op ieders ideeën zonder zelf alternatieven aan te dragen.',
        questions: [
          {
            id: 'q1',
            text: 'Hoe ga je hiermee om?',
            type: 'multiple-choice',
            options: [
              'Negeren en het werk zelf doen',
              'Direct confronteren in de groep',
              'Een persoonlijk gesprek aangaan',
              'Klagen bij de docent'
            ],
            correctAnswer: 2,
            explanation: 'Een persoonlijk gesprek toont volwassenheid en geeft de persoon een kans zich te verbeteren.'
          },
          {
            id: 'q2',
            text: 'Gebruik de STARR-methode om een moeilijke samenwerkingssituatie te beschrijven die je hebt opgelost.',
            type: 'starr'
          }
        ],
        tips: [
          'Probeer de onderliggende oorzaak te begrijpen',
          'Spreek gedrag aan, niet de persoon',
          'Zoek naar win-win oplossingen'
        ]
      }
    ]
  },
  {
    id: 'ziener',
    name: 'Ziener',
    icon: '🔮',
    color: 'from-purple-500 to-indigo-500',
    description: 'Ken jezelf en analyseer situaties met de STARR-methode',
    fullDescription: 'Als Ziener laat je zien je bewust te zijn van eigen kwaliteiten en valkuilen en kun je deze verbinden aan situaties en deze analyseren aan de hand van de STARR-methode.',
    flowchartSteps: [
      {
        id: 'step1',
        title: 'Zelfkennis ontwikkelen',
        description: 'Ik ken mijn sterke punten, valkuilen en voorkeuren',
        completed: false,
        requirements: ['Zelfreflectie', 'Eerlijkheid', 'Feedback zoeken']
      },
      {
        id: 'step2',
        title: 'STARR-methode toepassen',
        description: 'Ik kan situaties systematisch analyseren met de STARR-methode',
        completed: false,
        requirements: ['Analytisch denken', 'Structuur', 'Reflectievermogen']
      },
      {
        id: 'step3',
        title: 'Patronen herkennen',
        description: 'Ik zie terugkerende patronen in mijn gedrag en reacties',
        completed: false,
        requirements: ['Observatievermogen', 'Patroonherkenning']
      },
      {
        id: 'step4',
        title: 'Ontwikkeling plannen',
        description: 'Ik kan concrete plannen maken voor persoonlijke groei',
        completed: false,
        requirements: ['Doelgerichtheid', 'Planningsvaardigheden']
      }
    ],
    concepts: [
      {
        id: 'c1',
        term: 'STARR-methode',
        definition: 'Situatie, Taak, Actie, Resultaat, Reflectie - methode voor situatieanalyse',
        example: 'Systematisch een werkervaring beschrijven voor een sollicitatie',
        category: 'Analysemethode'
      },
      {
        id: 'c2',
        term: 'Zelfkennis',
        definition: 'Bewustzijn van eigen persoonlijkheid, vaardigheden en gedragspatronen',
        example: 'Weten dat je goed bent in plannen maar moeite hebt met improviseren',
        category: 'Persoonlijke ontwikkeling'
      },
      {
        id: 'c3',
        term: 'Reflectie',
        definition: 'Het bewust nadenken over ervaringen om daarvan te leren',
        example: 'Na een presentatie analyseren wat goed ging en wat beter kan',
        category: 'Leerproces'
      }
    ],
    situations: [
      {
        id: 'zelfkennis',
        title: 'Feedback ontvangen',
        description: 'Je krijgt onverwachte feedback van een docent',
        scenario: 'Na een presentatie krijg je feedback van je docent dat je te snel praat en dat je boodschap daardoor onduidelijk overkomt. Dit is niet de eerste keer dat je dit hoort.',
        questions: [
          {
            id: 'q1',
            text: 'Hoe reageer je op deze feedback?',
            type: 'multiple-choice',
            options: [
              'De feedback wegwuiven - anderen begrijpen je wel',
              'Defensief worden en uitleggen waarom je zo praat',
              'De feedback accepteren en vragen om concrete tips',
              'Je afvragen of de docent wel gelijk heeft'
            ],
            correctAnswer: 2,
            explanation: 'Feedback accepteren en om concrete tips vragen toont zelfkennis en groei-mindset.'
          },
          {
            id: 'q2',
            text: 'Analyseer deze situatie met de STARR-methode en beschrijf wat je hebt geleerd.',
            type: 'starr'
          }
        ],
        tips: [
          'Zie feedback als een geschenk voor groei',
          'Vraag door naar concrete voorbeelden',
          'Maak een actieplan voor verbetering'
        ]
      },
      {
        id: 'falen-leren',
        title: 'Een project dat mislukt',
        description: 'Een belangrijk project loopt niet zoals gepland',
        scenario: 'Je hebt weken gewerkt aan een individueel project, maar het resultaat valt tegen. Je hebt de deadline gehaald, maar je bent niet tevreden met de kwaliteit en je cijfer is lager dan verwacht.',
        questions: [
          {
            id: 'q1',
            text: 'Wat is je eerste reactie?',
            type: 'multiple-choice',
            options: [
              'Boos worden op de docent die het niet begrijpt',
              'Jezelf de schuld geven en je slecht voelen',
              'Analyseren wat er mis ging en wat je kunt leren',
              'Het vergeten en doorgaan naar het volgende project'
            ],
            correctAnswer: 2,
            explanation: 'Analyseren wat er mis ging toont zelfreflectie en leervermogen.'
          },
          {
            id: 'q2',
            text: 'Beschrijf je grootste valkuil bij het werken aan projecten en hoe je daar mee omgaat.',
            type: 'reflection'
          }
        ],
        tips: [
          'Zie falen als een leerkans',
          'Wees eerlijk over je eigen aandeel',
          'Maak concrete plannen voor verbetering'
        ]
      }
    ]
  },
  {
    id: 'toepasser',
    name: 'Toepasser',
    icon: '🧠',
    color: 'from-green-500 to-teal-500',
    description: 'Pas psychologische theorieën en vaardigheden toe in de praktijk',
    fullDescription: 'Als Toepasser kun je psychologische theorieën toepassen op stage, door handelen, of analyseren. Ook kun je aangeleerde vaardigheden toepassen om gedrag te beïnvloeden.',
    flowchartSteps: [
      {
        id: 'step1',
        title: 'Theorieën begrijpen',
        description: 'Ik begrijp relevante psychologische theorieën en modellen',
        completed: false,
        requirements: ['Theoretische kennis', 'Begrip van concepten']
      },
      {
        id: 'step2',
        title: 'Situaties analyseren',
        description: 'Ik kan theorieën gebruiken om praktijksituaties te analyseren',
        completed: false,
        requirements: ['Analytisch denken', 'Theorie-praktijk verbinding']
      },
      {
        id: 'step3',
        title: 'Interventies plannen',
        description: 'Ik kan op basis van theorie gerichte interventies bedenken',
        completed: false,
        requirements: ['Strategisch denken', 'Interventievaardigheden']
      },
      {
        id: 'step4',
        title: 'Gedrag beïnvloeden',
        description: 'Ik kan aangeleerde vaardigheden effectief inzetten om gedrag te beïnvloeden',
        completed: false,
        requirements: ['Praktische toepassing', 'Effectiviteit meten']
      }
    ],
    concepts: [
      {
        id: 'c1',
        term: 'Gedragsverandering',
        definition: 'Het proces waarbij iemand zijn gedrag aanpast door verschillende technieken',
        example: 'Motivational interviewing gebruiken om iemand te helpen stoppen met roken',
        category: 'Interventie'
      },
      {
        id: 'c2',
        term: 'Cognitieve dissonantie',
        definition: 'Het ongemakkelijke gevoel dat ontstaat bij tegenstrijdige overtuigingen',
        example: 'Iemand bewust maken van de tegenstrijdigheid tussen hun waarden en gedrag',
        category: 'Psychologische theorie'
      },
      {
        id: 'c3',
        term: 'Sociale leertheorie',
        definition: 'Mensen leren door observatie, imitatie en modeling van anderen',
        example: 'Een positief rolmodel zijn om gewenst gedrag te stimuleren',
        category: 'Leertheorie'
      },
      {
        id: 'c4',
        term: 'Motivational Interviewing',
        definition: 'Gesprektechniek om intrinsieke motivatie voor verandering te versterken',
        example: 'Open vragen stellen om iemands eigen argumenten voor verandering te ontlokken',
        category: 'Gesprekstechniek'
      },
      {
        id: 'c5',
        term: 'Transtheoretisch model',
        definition: 'Model dat verschillende stadia van gedragsverandering beschrijft',
        example: 'Herkennen in welk stadium iemand zit (voorbeschouwing, beschouwing, actie, etc.)',
        category: 'Veranderingsmodel'
      }
    ],
    situations: [
      {
        id: 'stage-interventie',
        title: 'Gedragsverandering op stage',
        description: 'Je moet een interventie ontwikkelen voor een cliënt',
        scenario: 'Tijdens je stage bij een zorginstelling krijg je een cliënt die moeite heeft met het naleven van afspraken. Je begeleider vraagt je om een plan te maken om dit gedrag te veranderen.',
        questions: [
          {
            id: 'q1',
            text: 'Welke theorie zou je als eerste toepassen?',
            type: 'multiple-choice',
            options: [
              'Direct consequenties koppelen aan gedrag (behaviorisme)',
              'Eerst begrijpen waarom de cliënt moeite heeft (motivational interviewing)',
              'Een strak schema opleggen (structurele benadering)',
              'De cliënt confronteren met de gevolgen (confrontatietherapie)'
            ],
            correctAnswer: 1,
            explanation: 'Motivational interviewing helpt eerst de onderliggende motivatie en barrières te begrijpen.'
          },
          {
            id: 'q2',
            text: 'Beschrijf hoe je het transtheoretisch model zou toepassen in deze situatie.',
            type: 'reflection'
          }
        ],
        tips: [
          'Begin altijd met een grondige analyse van de situatie',
          'Kies theorieën die passen bij de cliënt en context',
          'Meet de effectiviteit van je interventie'
        ]
      },
      {
        id: 'groepsgedrag',
        title: 'Groepsdynamiek beïnvloeden',
        description: 'Je wilt negatieve groepsdynamiek doorbreken',
        scenario: 'In je projectgroep ontstaat een negatieve sfeer. Enkele leden zijn passief-agressief en er wordt veel geklaagd. Als toekomstig professional wil je deze dynamiek doorbreken.',
        questions: [
          {
            id: 'q1',
            text: 'Welke benadering kies je?',
            type: 'multiple-choice',
            options: [
              'De groep confronteren met hun gedrag',
              'Zelf positief gedrag modellen (sociale leertheorie)',
              'Individuele gesprekken voeren met elk lid',
              'De docent inschakelen om in te grijpen'
            ],
            correctAnswer: 1,
            explanation: 'Sociale leertheorie toont dat mensen gedrag overnemen van positieve rolmodellen.'
          },
          {
            id: 'q2',
            text: 'Gebruik de STARR-methode om te beschrijven hoe je psychologische kennis hebt toegepast om een situatie te verbeteren.',
            type: 'starr'
          }
        ],
        tips: [
          'Gebruik je kennis van groepsdynamiek',
          'Wees een positief rolmodel',
          'Pas verschillende technieken toe en evalueer het effect'
        ]
      }
    ]
  }
]

type ViewMode = 'overview' | 'situation' | 'flowchart' | 'flashcards'

export default function RoleExplorer() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [completedExamples, setCompletedExamples] = useState<CompletedExample[]>([])

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setViewMode('situation')
  }

  const handleBackToRoles = () => {
    setSelectedRole(null)
    setViewMode('overview')
  }

  const handleExampleCompleted = (example: CompletedExample) => {
    setCompletedExamples(prev => [...prev, example])
  }

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
  }

  if (selectedRole && viewMode === 'situation') {
    return (
      <SituationExplorer
        role={selectedRole}
        onBack={handleBackToRoles}
        onExampleCompleted={handleExampleCompleted}
        completedExamples={completedExamples.filter(ex => ex.roleId === selectedRole.id)}
        onViewModeChange={handleViewModeChange}
      />
    )
  }

  if (selectedRole && viewMode === 'flowchart') {
    return (
      <FlowchartView
        role={selectedRole}
        onBack={handleBackToRoles}
        onViewModeChange={handleViewModeChange}
        completedExamples={completedExamples.filter(ex => ex.roleId === selectedRole.id)}
      />
    )
  }

  if (selectedRole && viewMode === 'flashcards') {
    return (
      <FlashcardView
        role={selectedRole}
        onBack={handleBackToRoles}
        onViewModeChange={handleViewModeChange}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Overview */}
      <ProgressTracker roles={roles} completedExamples={completedExamples} />
      
      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onSelect={handleRoleSelect}
            completedCount={completedExamples.filter(ex => ex.roleId === role.id).length}
            totalSituations={role.situations.length}
          />
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Hoe gebruik je deze app?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Kies een rol</h3>
            <p className="text-gray-600 text-sm">
              Klik op een van de vijf professionele rollen om te beginnen
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Verken situaties</h3>
            <p className="text-gray-600 text-sm">
              Doorloop verschillende scenario's en beantwoord vragen
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Bekijk stroomdiagram</h3>
            <p className="text-gray-600 text-sm">
              Zie je voortgang en wat je nog nodig hebt per rol
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">4️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Leer met flashcards</h3>
            <p className="text-gray-600 text-sm">
              Oefen belangrijke begrippen en toepassingen
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}