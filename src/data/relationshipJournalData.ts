export interface RelationshipMessage {
  sender: 'me' | 'maica';
  senderName: string;
  timestamp?: string;
  text: string;
}

export interface RelationshipChapter {
  chapterNumber: number;
  date: string;
  title: string;
  subtitle: string;
  narrativeBefore?: string;
  messages: RelationshipMessage[];
  narrativeMiddle?: string;
  narrativeAfter?: string;
  calloutBox?: {
    title: string;
    subtitle: string;
    points: { label: string; text: string }[];
  };
  scriptures?: string[];
  topics?: string[];
}

export interface LexiconItem {
  term: string;
  subtitle: string;
  description: string;
  scriptureOrRoot?: string;
}

export const relationshipJournalData = {
  title: 'THE CHRONICLE OF GRACE & LOYALTY',
  subtitle: 'A Word-by-Word Relationship Journal & Spiritual Dialogue Archive',
  authorship: 'Recorded & Authored in Our Shared Voice • Me & Jamaica (Maica)',
  timeframe: 'May 30, 2026 – July 2026',
  preamble: {
    title: 'THE ANCHOR OF OUR SOULS',
    text: `This journal is our living anchor. It captures the raw, unfiltered conversations, late-night tears, mountain reunions, practical dreams, and sacred reflections shared between us. Every word recorded here is our actual voice—preserving Maica's exact messages in Bisaya and English, alongside the deep psychological, philosophical, and spiritual reflections that hold our hearts together across the miles. Here lies the proof of Nag-unongay—standing by each other in the quiet, heavy trenches.`,
  },
  chapters: [
    {
      chapterNumber: 1,
      date: 'May 30, 2026',
      title: 'Chapter 1: The Crucible & The Late-Night Call',
      subtitle: 'Surrendering Control, Facing the Doctrinal Wall, and the Midnight Farewell',
      scriptures: ['Ephesians 5:1', 'Proverbs 16:3'],
      topics: ['surrender', 'long-distance', 'faith divide', 'honesty', 'vulnerability', 'nag-unongay'],
      narrativeBefore: `For a month and a half following graduation, our communication had turned heavy and cold. Distance was stretching our days, and life was pressing down hard on both ends. Maica was carrying immense family responsibilities as the eldest sister—working far from home, struggling with financial burdens, and wrestling with deep spiritual questions within her Jehovah's Witness faith. I was processing my own distant withdrawal as a Christian. I felt a breakup was inevitable due to our doctrinal differences, yet my heart refused to let go. Then, on Saturday evening, May 30, 2026, Maica sent the message that shattered my quiet evening.`,
      messages: [
        {
          sender: 'maica',
          senderName: 'MAICA',
          timestamp: 'Saturday Evening, May 30, 2026',
          text: `Hi lovey, Good evening Sorry sa late kaau na reply, naa lng jdkoy g muni² hehe and Yas Karun naa Koy e sulti Lovey and sorry kaau Daan lovey ahmm naa koy importante tell nimo and I hope nga makasabot raka. Sorry daan lovey kay lisod jud ni para sa akoa and maybe sa imoha pd... Actually, ikaw jud akong gusto forever (but naa lay mga situation na dli ta Makabalo or dli natu ma control). Anyways thankful kaayo ko nga naka ila taka. Thank you kay but-an ka nga bf, kugihan, caring, ug labi na kay nag alagad pud ka sa Ginoo. Proud kaayo ko nimo lovey, and padayon jud sa imong dreams ug sa imong pag serve niya. Lovey, to be honest lng kanang every time mo ingon ko nga mo una kog sleep, usahay wala pa jud ko katulog ana. Mag basa ko Bible and usahay makahilak nalang ko silently kada gabie Kay daghan kaayo kog questions sa akong mind. Especially sa among family situation.... Usahay mag tan-aw ko sa akong mama ug mga manghud then ma pressure ko kay gusto kaayo nako sila matabangan someday. Murag as the ate, dako kaayo kog responsibility sa ilaha.... Nag mag pray lang ko kang Jehovah ug mangutana ko, 'unsa jud akong purpose? Nganong ing Ani? bzta, dghna uy why??' Honestly lovey, naa pa jud ko sa discovery nga part sa akong life and yas wla jd ko kasabut maybe soon ipa sabut Rani ni jehovah nako for now gubot pa. Ginapangita pa nako unsa jud ang gusto ni Jehovah para sa akoa ug unsaon nako pag mahimong mas close sa iyaha... Maong karon lovey… maybe i-stop sa natu ni, focus nlng sa ta sa Ginoo and also sa atung tagsa² sa family ug sa pag ayo sa akong kaugalingon spiritually, and sa Akong self... Sorry kaayo lovey, Karon rajud ko naka courage ug sulti nimo ani.. sorry JD kaau... Maybe dili pa jud ni ang right time para sa atoa.... Thank you kaayo sa tanan lovey, sa love, care, patience, ug support. Dili jud nako na malimtan. Na safe place ka nako sa daghang panahon ug thankful jud ko ana. Amping pirmi ha, eventhough atung relationship dli magpa dayun buy still padayon gihapon ta sa pag alagad sa Ginoo Kay diha natu JD Makita Ang true love sa Ginoo. Again thankful gihapon ko kay na part ka sa akong life ug naka tabang ka sa akong spiritual journey. I'll always pray nga i-bless ka ni Jehovah ug ma achieve nimo imong dreams... PADAYUN Ta sa pag served lovey Thank u sa tanan nimong effort lovey, na appreciate kaau to nako, and sorry if ing Ani ko....`,
        },
      ],
      narrativeMiddle: `Reading those words, my chest tightened. I couldn't accept a farewell written over text. I started calling her phone repeatedly. She didn't answer until the 7th call, deep in the Saturday midnight hour. When her voice came through, my core was laid completely bare. I asked her directly: 'Is there a chance? Can we start again? Can we try again?'

She was weeping silently on the other end, stuck blaming herself for causing me pain. She revealed two perspectives she had sought out before writing:
• Her Churchmates: Warned her that differing beliefs often create an irreconcilable divide.
• Her Mom: Highly admired me—calling me rare for serving in the church, being patient, financially grounded, and protective. Her mom believed a wife should follow her husband, but Maica feared her motives would warp into pleasing me rather than God.

As midnight stretched into dawn, she asked through her tears: 'What if this happens again in the future and I just keep hurting you? What if it is God's will that we meet again later, just not right now?' I saw a young woman overwhelmed by family duty, living far from home, working as a helper, and completely alone with her doubts. The hardest blow came when she whispered: 'Maybe you'll find someone better than me, someone aligned with you who goes to your church.' I cried. But I refused to let bitterness take root. I sent her this final text:`,
      messagesSecondBatch: [
        {
          sender: 'me',
          senderName: 'ME',
          timestamp: 'Sunday Dawn, May 31, 2026',
          text: `Goodbye Jamaica, Thank u sa memories, ikaw ang the best, heheh, honestly daghn pata kaayo ko e sulti, but u said it namn many times, i try to fight for us, but yess, spiritual nani nga battle atong gi atubang, so yes naka sabot rako heheh, i wont force, but remember ikaw, jud ang pinaka the best nga nahitabo sa akoa, hehehe, hopefully nga mag padayun ta sa pag served pud sa Ginoo, and as always, I always pray for u and Ur family.. heheh, thank u, thank u so much lovey, and im sorry, naa koy mga pag kulang, im sorry that im not the one nga maka lead nimo sa True Jesus Christ, but i always pray for u nga, mag minister si Jesus Christ nimo, u don't know what i mean if it said sa words, but soon u will know ra once maka encounter naka heheh, because fr lang, the experience of my encounter is grabe ka nindot, i was hoping to share it with u.. but i don't have that rights, heheha, back then, mindset nako sauna was, to lead u sa truth, and i was wrong, it is him who leads diay heheh, i was hoping sa great testimony while besides u, but maybe u find with urself nalang, and im happy if that will happened, i will always pray sa inyuha, So this is Goodbye na hehehe, Thank u Jamaica sa memories`,
        },
      ],
    },
    {
      chapterNumber: 2,
      date: 'May 31, 2026',
      title: 'Chapter 2: The Mountain Reconciliation at Pangilatan',
      subtitle: 'Lifting the Heavy Cloud, Dissecting Pity vs. Love, and Choosing Absolute Transparency',
      scriptures: ['1 John 4:18', 'Romans 8:28'],
      topics: ['reconciliation', 'pangilatan', 'clarity', 'love vs pity', 'empathy', 'authenticity'],
      narrativeBefore: `Sunday morning brought an overwhelming grief. I couldn't rest. I messaged Maica, asking if we could meet at Pangilatan—the mountain we used to frequent—just to see each other one last time, with no demands. We agreed to meet after our respective church services. When I arrived and saw her standing there, all the heavy dread evaporated. I looked at her, she looked at me, and we both burst into smiles. The dark cloud from Saturday midnight dissolved.

We rode up the mountain road together in comfortable silence. Sitting on the mountain peak, looking out over the landscape, we began talking effortlessly. She confessed she wasn't ready to let go either. I realized my past emotional walls had been built because I was evaluating her through rigid doctrinal filters rather than seeing her heart—a girl who deeply loves God. Late that night, we reviewed the miracle of our day:`,
      messages: [
        {
          sender: 'me',
          senderName: 'ME',
          text: `Cute mo raba kanina, i never see nga u react in that way... like kuan ba, i thought nga hopeless ra, my goal ganiha is to 'See u ra' thats it... and i cant believe that it turns out to this way. First palang, pag lili nako nimo, gakatawa nako, even while ga drive ko padung didto sa pangilatan, gakatawa ko hahah, pag kita nako nimo ato, I almost forget about last night...`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Bitw hahaha naa kos luyo nmo, feel nako mura rajd wlay nahitabo pag Gabie HAHAAH, batia, ana MN JD ka, kataw an ramn ko nmo hahaha`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Bwhahha lagi, honestly kato nga time, reminds the feeling of katong gikan ta sa school mag hangout. Mo stay rata ko positive... But i want reassurance ba, cuz we cant pretend, u said those things and its real... Did I force you?? Or overwhelm u emotionally ganiha? Cuz I still want to love you, to care for you amidst everything u said last night... That's why I fought heheheh`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Lovey, if nag stay lng deay ka nako or imo Ning fight atung relationship tungod lng sa ma worried ka or about sa Akung fam na layu ko, I think lahi na Siya, lain kaau if ni stay ka nga Ang reasons is na looy ka... Actually dli kana nga reasons Akong gpa ngita, feel nako gd if na looy Ra, lahi na kaysa sa love JD eheh bzta... Sayang if wla deay na na tarung natug talk katung naa patas personal...`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `I mean lovey, nag stay ko is because all that memories we have, naka build natag connection... But i stay because sa love... We already talked this ganiha, but nag show rako empathy nimo, because that empathy has care, and care has love!`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Okay Ra kasabut rako... And kani remember this nga wla ka ni Force nako... Ako JD Ning decision namo fight or padayun... Since nag kita lng ta atu katung ni smile plang ka nako sa layu, lahi rajd kaau, important JD kaau kas Akong life and I really² love u JD... Actually katung decision nako pag Gabie is dli JD mo sugot Akong heart, but lahi sd Ang sa Akung mind... I love u...`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `That's all i want to hear... That's more than enough, thank u... Healthy reassurance ra, because I want to understand the deeper part ba hehehe.`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Sorry if na misunderstand nako...`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `I feel the same way pud hehehe, everything u described, we both feel it, and that's why nga nganong worth fighting ni hehehe Lahi rajud ganiha. I love you lovey.`,
        },
      ],
    },
    {
      chapterNumber: 3,
      date: 'June 15, 2026',
      title: 'Chapter 3: Practical Dreams & The Husband Blueprint',
      subtitle: 'The All-Rounder Mindset, \'Diskarte\', and Fusing Practical Skills with High EQ',
      scriptures: ['Proverbs 31:10-31', 'Colossians 3:23'],
      topics: ['future family', 'diskarte', 'practical skills', 'husband blueprint', 'high eq', 'partnership'],
      narrativeBefore: `Following our mountain reunion, our communication transformed into an open stream of shared visions. On June 15, Maica shared her heart about her work as an 'all-rounder' taking on diverse practical tasks. She wasn't just earning a wage; her mind was actively translating present labor into future family value. She revealed her childhood dream husband criteria—a vision that deeply resonated with my own values.`,
      messages: [
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Yeah, Sakto ka hahaha thankful Gani kaau ko Ani hahah, suweldoan MN ko lovey tas ganahan lng ko ani ba Kay naa sd Koy ma learn... Ganahan ko Ani hahaha all around ba haha dghan nahibaloan mga bulohatonon haha... Magamit MN sd ni in the future gd labi na mag tukod kag family heheh... And Ako sang pinaka ganahan Ani is Akong mga katabi Kay mga edaran na, something nana say family ba, ganahan kaau ko makig tabi ing ana Kay daghan Sila Ihatag ma advice and experiences nila... Tas Kabalo ka lovey hahaha since pag Bata plang nako hahaha Akong ganahan JD ma husband Kay dapat same sd nako hahaha dli literal nga same, Bali kanang kabalo sd tanan sa trabaho ba tas naa diskarte and dapat Gani labwan ko HAHAHAHA bzta skl so maoto, wla lng... Nindut sd if Bali Ang bana is Kabalo Siya sa kanang USO Gani Karun technology tapos Ang asawa Kay sa practical haha Peru mas nice kamong duha kabalo Tanan hahaha tinabangay ba hahaha ninduta ana haha open mong duha ba hahaha, best friends hahaha bzta imagination Ra nako hahahahaha...`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Wow, hehehh, nindot jud lagi heheheh... Nindot bitaw na nga mag desire ka ana ba, hunger ka sa learnings ug thirsty ka sa skills especially when it comes on practical. Ang naka biggest green flag pajud is u are not just thinking and desiring about learnings for yourself, but nag aim pud ka to be useful magamit sa future and especially kana jud oh, sa building family! Green flag nayan hahahah... And choya kaha sa if that person exist (bana), kanang same mog mindset about the future, and has the same practical skills, and that way naa jud moy compatibility, open up, and shared responsibilities as pillars sa family... Proud ko nimo lovey!`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Lagy lovey hehe, awa na sobraan na noon kog share nmo haha bzta... Kana lovey hahah green flag tapos naay emotional intelligence hahahhah bzta hahahahaha... Choy kaau bitw hahaha. Thank u so MUCH lovey!`,
        },
      ],
    },
    {
      chapterNumber: 4,
      date: 'June 21–22, 2026',
      title: 'Chapter 4: Affection, \'Treasure & Keys\', and Agape Love',
      subtitle: 'Navigating Boundaries, De-escalating Guilt, and Framing Love as a Decision of the Will',
      scriptures: ['Ephesians 5:1', 'Song of Solomon 2:7', '1 Corinthians 6:19-20'],
      topics: ['intimacy', 'boundaries', 'treasure and keys', 'agape', 'chastity', 'safe space'],
      narrativeBefore: `On June 21, we met face-to-face and shared deep physical affection—kissing and close physical intimacy while keeping our clothes on and maintaining absolute boundary control. The next morning, knowing how her religious background could trigger a wave of vulnerability, I initiated a check-in over text to parse her emotions and protect her peace.`,
      messages: [
        {
          sender: 'me',
          senderName: 'ME',
          timestamp: 'June 22, 2026 Morning',
          text: `Lovey... Kani lang, desperate kaayu ko makabaw nga 'What do u feel?' Do u have a name na? Kay lets talk about ur feelings first. Maminaw rako lovey hehehe.`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Lovey sorry, Wala JD ko kasabut JD, Peru katu feel nako lovey na safe ko tapos comfortable kaau ko atu tapos exciting lng pd hehe, so maoto nga na ing atu pd ko Peru sorry lovey`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Important man pud ang intimacy sa relationship... But I was afraid nga after na kay ma feel guilty ka ba... And thats why ni beg ko ato nimo, nga what are my intentions gani, para dli pud ta ma lead sa misunderstanding. That's why nga nag prayer ko ato cause sayud jud ko nga unsa imo ma feel after—assurance for u and intercession pud from God.`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Lovey, honest lng JD no, katu Akong g una nimo ug answer katung feel nako nga safety ko, comfortable, actually mixed emotions to Ako lovey... While nag huna² ko atu nah questions kos Akong self ngano ma buhat ko to... And you know lovey, I'm so thankful nga ing ana ka, nangutana JD ka nako. Kana lng is nag show JD ug respect sa akoa. Salamat kaau sa Imong assurance lovey... Ni unong JD ka nako lovey! Don't tell me wla sd ka Kabalo unsa ng ni unong? Haha Peru Yas... Thank u kaau lovey ha`,
        },
      ],
      narrativeMiddle: `The following day, June 22, I sent her a lengthy follow-up letter to fully articulate my intentions and outline three core words for her state that night: Vulnerable (dropping her guard), Fragile (sensitive to hurt), and Open (granting deep access). I introduced the Treasure and Keys metaphor, anchoring our relationship in Agape Love (Ephesians 5:1):`,
      messagesSecondBatch: [
        {
          sender: 'me',
          senderName: 'ME',
          timestamp: 'June 22, 2026 Afternoon Letter',
          text: `Lovey, 'What u feel? Safe, Comfortable, Trust' and sa akong gi add pud 'Vulnerable, Fragile and Open.' Ako siya e compress and turn into something... I would say nga You have Given me the Keys. And keys? So naa diay something naka lock nga ablihanan... Yess! Ang naka lock is something nindot, a TREASURE. Lovey, kato nga moment nga ni tan aw ko sa imong eyes, i feel in love even more, and I see treasures. You are that treasure lovey! So valuable nga ikaw ra ang maka give. I am happy to receive the keys, yet dli pako ka open sa treasure kay im not worthy to carry it yet pa heheheh... But sa karon, I really value the keys, akong pangalagaan! And the treasure is valuable and at the same time vulnerable and fragile... So that's why kani nga treasure is worth protecting at all cost! And lovey, I want to clarify: forcing and intentions are different. What I'm doing is NOT force. It is my INTENTION, MY WILL, MY DECISION nga mo buhat ko ana! Because will is something pud—kay sa will pwede nato e reject ang usa ka tao, but that same will pwede pud ta mo love, mo care and to choose to be with that person. LOVE IS A CHOICE! If kana lang akong buhaton, mo choose nimo always, mo protect pud in order to love you... And I want to emphasize my choice to be realistic: tao lamang pud ako, but HE loves us. This is not Just You and Me lang, but YOU AND ME AND GOD. Honestly lovey, kabalo ka sa isa sa 4 Greek words for love: 'AGAPE'—meaning ultimate, supernatural Love that only God can give, his Sacrifice, Unconditional Love, Boundless Grace, and faithfulness. Ephesians 5:1 says 'be Imitators of God.' Ill do my part, but God carries what I cannot.`,
        },
      ],
      calloutBox: {
        title: 'CORE METAPHOR: TREASURE AND KEYS',
        subtitle: 'The Sacred Architecture of Physical Trust & Boundary',
        points: [
          { label: 'Her Trust', text: 'The Keys handed to his care with deep vulnerability.' },
          { label: 'Her Soul & Purity', text: 'The Treasure, priceless and fragile, never to be rushed or forced.' },
          { label: 'His Duty', text: 'Holding the keys with honor, protecting the lock until sacred timing, and anchoring their boundary in God.' },
        ],
      },
    },
    {
      chapterNumber: 5,
      date: 'June 27, 2026',
      title: 'Chapter 5: Deconstructing Modern Commitment (1 Cor 13)',
      subtitle: 'Analyzing Viral Breakups, Pleasure vs. Love, and Defining Commitment as Daily Choice',
      scriptures: ['1 Corinthians 13:4-8'],
      topics: ['commitment', '1 corinthians 13', 'loyalty', 'modern dating critique', 'pleasure vs love'],
      narrativeBefore: `On June 27, Maica brought up public relationship scandals—an 8-year influencer breakup and a coast guard officer who abandoned his family for a 3-month affair. She handed me a psychological puzzle: 'Curious ko, ngano deay ing ana na?' Instead of reacting with gossip, I paused, processed deeply, and deconstructed the mechanics of true love vs. fleeting impulse:`,
      messages: [
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Ako lng g imagine ba, dugay na Sila ba... 7yrs grabe na kaau na, kasal na sana. And same sd Katung balita, Katung coast guard nga nag cheat sa iyang asawa... Mas g choose ni boy Ang katung 3 months lng Niya na kaila? Wla MN ko nang judge sa boy, but Ako curious ko, ngano deay ing ana na?`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Nangutana ka nako lovey nga 'Ngano diay ngin ana'? Ang kanang lalaki, at first place sa 8yrs relationship, 'If mag talk tag Love', its NOT love, its pleasure and affection... Ang root cause is the pleasure itself, and nanay consequences ang uncontrolled pleasures. Dli tanan pleasures is naay love, while tanan love naajuy pleasures! If love nimo ang person, u should be aware and know pud sa mga consequences and that same love dapat nimo siyang protektahan ana! Balik ta sa clear instructions: 1 Corinthians 13. Love is patient... Willing ba sila magpadayun for 40-50 years? Ilang gi answer 'dli', so its not love. Love is Kind... If love is Kind, then why mo cheat? Love is a choice, choosing everyday each other... How you gonna prove your love? Through obedience and loyalty pud hehehe.`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Wow heheh, speechless mn ko sa imong mga g reply lovey, like bzta hahah biha ah... Salamat sa pag share lovey, important na kaau ni para nako hehe, na appreciate kaau nako! Padayun lng lovey...`,
        },
      ],
    },
    {
      chapterNumber: 6,
      date: 'July 4, 2026',
      title: 'Chapter 6: The Morning Jog & Unmasked Peace',
      subtitle: 'Real-World Confirmation, Secure Attachment, and Anticipating Our 10th Month',
      scriptures: ['Psalm 119:165', 'Philippians 4:7'],
      topics: ['peace', 'secure attachment', 'jogging', 'freedom from shame', 'milestone'],
      narrativeBefore: `On July 4, we met early in the morning for a casual jogging session and spent time relaxing together before heading home. While resting, physical closeness happened naturally again. But this time, the atmosphere was completely transformed. There was no lingering anxiety, no fear, and no vulnerability hangover. She was deeply passionate, fully present, and completely relaxed—with both of us holding our established boundaries with total ease. Our high-EQ checks and spiritual intercession in June had completely cleared out the fear of shame. We walked away from that morning with secure attachment, looking forward to our upcoming 10th-month anniversary on July 22, 2026.`,
      messages: [],
    },
    {
      chapterNumber: 7,
      date: 'July 2026',
      title: 'Chapter 7: Midnight Deep Processing — Nag-unongay & Overcoming Shame',
      subtitle: 'Radical Masculine Ownership, Closing Past Vulnerabilities, and Standing in the Trenches',
      scriptures: ['Galatians 6:2', '1 Peter 4:8', 'Colossians 3:13'],
      topics: ['nag-unongay', 'reassurance', 'overcoming shame', 'ownership', 'kita duha', 'sacred trust'],
      narrativeBefore: `Late one night, a sudden wave of vulnerability hit Maica. She texted me near midnight, struggling with lingering social fears that she was 'hugaw' (dirty) or 'weak' after our physical closeness. Someone had shared stories with her about men who use women and then gossip (*tsimis*) to their friends, discarding them like garbage. This fear triggered a memory of my past carelessness regarding a mutual acquaintance named Edziel. What unfolded was our most profound demonstration of Nag-unongay:`,
      messages: [
        {
          sender: 'maica',
          senderName: 'MAICA',
          timestamp: 'Near Midnight',
          text: `Lovey, sorry JD if ing Ani ko... Tan aw nako sa Akung self is hugaw na, lovey katung intimacy... Feel lng nako nga weak ko, hugaw, sag unsa nlng naa sakung mind... I need reassurance lng, nga the same Ra japon, respect japon... Naa lng nag share nako, nga Ang uban dw laki after nila ma kuan, mag break na ila dayun e tsimis sa ila barkada and e throw Ang girl na murag basura... I know dka ing ana, right lovey? Respect dba sa atung privacy?`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Lovey, mangayog pud kog pasaylo lovey... Sala nako as lalaki, nga u feel that way. Sorry talaga ako ang source lovey, and ayaw ka guilty kay ako pud naa koy sala, ur feelings are valid. I named it for u dba? First is 'Guilt', then 'Used', then na kuan nimo as 'Hugaw'... I understand, I respect! And why would I break after ato? I love you, I want to protect you and grow with u! Why would I chismiss it? We have privacy lovey, Im bound to keep it, promise! And 'NOOO'! E throw nga murag basura? Dli lovey! I never, never jud naka think ana... You are valuable, important ka sa aking life. Everything is atoa ra, kita ra... And I know why naka tell ka about chissmis—nag doubt ka because sa katong kay Edziel. Sorry talaga, careless ako. But ayaw na ka worry, mistake to nako. I already blocked Edziel, gi delete nako iyang convo! I am willing to change out of obedience and love!`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Lovey salamat kaau sa pag understand... And lovey, promise me plss, ayw Kauna imong self plss, dsad ko ganahan mag ing ana sd ka... Kita MN nag Kuan lovey so katu KITA SDUHA MO SOLVE! And katu mo grow together... Ni unong JD ka nako lovey! Kani Karun tawag Ani is NAG-UNONGAY ba...`,
        },
        {
          sender: 'me',
          senderName: 'ME',
          text: `Kana! Mag sinabtanay ta lovey, dli lang pud ako mo understand but kita duha, and kita rapud mo solve pud. Dli lang ako, but KITA DUHA!`,
        },
        {
          sender: 'maica',
          senderName: 'MAICA',
          text: `Uhhhh Lovey, Salamat kaau sa Imong pagka understanding... I Love you`,
        },
      ],
      calloutBox: {
        title: 'CULTURAL & EMOTIONAL BEDROCK: NAG-UNONGAY',
        subtitle: 'The Bisayan Principle of Unyielding Shared Endurance',
        points: [
          { label: 'Definition', text: 'To stick together, endure emotional weight, and refuse to abandon one another in the quiet, heavy trenches.' },
          { label: 'Application', text: `Not a physical act or sound, but the highest cultural expression of loyalty, shared problem-solving ('Kita Duha'), and staying awake at midnight until peace is fully restored.` },
        ],
      },
    },
  ],
  lexicon: [
    {
      term: 'Nag-unongay',
      subtitle: 'Enduring Loyalty',
      description: `A Bisayan concept meaning to remain steadfastly by each other's side through emotional storms, vulnerability, and heavy processing, refusing to let the other person suffer alone.`,
      scriptureOrRoot: 'Bisayan Cultural Bedrock',
    },
    {
      term: 'Treasure & Keys',
      subtitle: 'Sacred Trust',
      description: `A metaphor framing her trust as the 'Keys' and her soul/purity as a priceless 'Treasure'—worth protecting at all costs rather than exploiting for short-term desire.`,
      scriptureOrRoot: 'Relational Boundary Metaphor',
    },
    {
      term: 'Diskarte & The Husband Blueprint',
      subtitle: 'Practical Resourcefulness & High EQ',
      description: `Her vision of a future husband who combines practical resourcefulness (diskarte), technological awareness, and emotional best-friendship—a role he actively fulfills through high EQ.`,
      scriptureOrRoot: 'Partnership & Family Vision',
    },
    {
      term: 'Agape Choice',
      subtitle: 'Love as a Decision of the Will',
      description: `Love defined not as a fleeting chemical feeling, but as a daily, deliberate decision of the will to stay, protect, and obey God's design for relational integrity.`,
      scriptureOrRoot: 'Ephesians 5:1 · 1 Corinthians 13',
    },
    {
      term: 'Vulnerable, Fragile, & Open',
      subtitle: 'The Threefold Intimacy State',
      description: `The three-fold state of dropping one's defensive guards during intimacy, requiring non-judgmental aftercare, intercessory prayer, and absolute confidentiality.`,
      scriptureOrRoot: 'Emotional & Relational Safe Space',
    },
    {
      term: 'Phileo',
      subtitle: 'Deep Friendship & Teammate System',
      description: `The foundational bond of companionship where two partners act as best friends, sharing transparent goals and lifting each other up when one is weary.`,
      scriptureOrRoot: 'Teammate Covenant',
    },
  ],
  conclusion: {
    text: `This chronicle stands as an unshakeable testimony of our growth. From the heartbreak of May 30 to the mountain reunion at Pangilatan, through the practical blueprints of June and the deep midnight intercessions of July—we have proven that distance, religious divides, and human anxieties cannot break a bond anchored in Agape and Nag-unongay.`,
    quote: 'Kita duha mo solve... Kita duha mo grow together.',
  },
};
