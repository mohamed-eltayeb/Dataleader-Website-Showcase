export const content = {
  en: {
    brand: {
      name: "Data Leader",
      name_ar: "مؤسسة البيانات الرائدة",
      tagline: "Powering Smart Spaces Across the Kingdom",
    },
    nav: {
      home: "Home",
      services: "Services",
      shop: "Shop",
      about: "About Us",
      support: "Support",
      contact: "Contact",
    },
    hero: {
      headline: "Smart Technology For Modern Buildings",
      subheadline: "From access control to energy saving – Data Leader is your trusted partner.",
      cta: "Get a Quote",
    },
    services: {
      title: "Our Core Services",
      description: "We provide integrated solutions to build and manage modern, efficient, and secure infrastructures.",
      items: [
        {
          id: "smart",
          title: "Smart Building Systems",
          description: "Intelligent automation for lighting, climate, and security.",
        },
        {
          id: "it",
          title: "IT & Network Infrastructure",
          description: "Reliable and scalable network solutions for your business.",
        },
        {
          id: "security",
          title: "Advanced Security Solutions",
          description: "CCTV, access control, and fire alarm systems.",
        },
        {
          id: "av",
          title: "Audio & Video Systems",
          description: "Professional AV solutions for commercial spaces.",
        },
        {
          id: "solar",
          title: "Solar Energy Systems",
          description: "Sustainable and cost-effective solar power solutions.",
        },
      ],
    },
    shop: {
      title: "Our Products",
      description: "Explore our range of high-tech solutions designed to modernize your infrastructure.",
      viewDetails: "View Details",
      addToCart: "Add to Cart",
      backToShop: "Back to Shop",
      itemAddedToCart: "Added to cart",
      configure: "Configure",
      generateQuote: "Generate Instant Quote",
      quoteGenerated: "Quotation Ready",
      yourQuote: "Your Instant Quotation",
      generatingQuote: "Generating your quotation...",
      estimatedPrice: "Estimated Total Price",
      sendForReview: "Send for Final Review",
      quoteSent: "Your configuration has been sent for review.",
      quotePrompt: "Customize your package below, then generate an instant quote.",
      products: [
        {
          id: "smart-systems",
          name: "Smart Building System",
          description: "Complete automation solution for modern buildings.",
          longDescription: "Our Smart Building System provides intelligent, centralized control over lighting, HVAC, and security systems. Enhance comfort, improve energy efficiency, and gain valuable insights into your building's operations.",
          price: 50000,
          image: "https://placehold.co/600x400.png",
          aiHint: "smart home",
          options: [
            { id: 'tier', label: 'System Tier', type: 'radio', choices: [
              { name: 'Essential', priceModifier: 0 },
              { name: 'Professional', priceModifier: 15000 },
              { name: 'Enterprise', priceModifier: 40000 },
            ]},
            { id: 'sensors', label: 'Sensor Package', type: 'radio', choices: [
              { name: 'Standard (10 sensors)', priceModifier: 0 },
              { name: 'Expanded (25 sensors)', priceModifier: 5000 },
            ]},
            { id: 'support', label: 'Add-ons', type: 'checkbox', choices: [
              { name: 'Priority Support (1-year)', priceModifier: 7500 },
              { name: "On-site training", priceModifier: 4000 },
            ]}
          ]
        },
        {
          id: "it-networking",
          name: "Enterprise IT & Network Package",
          description: "Scalable and secure network infrastructure setup.",
          longDescription: "We design and deploy robust IT and network infrastructures tailored to your business needs. This package includes high-speed routers, switches, access points, and structured cabling to ensure reliable connectivity and data flow for your entire organization.",
          price: 35000,
          image: "https://placehold.co/600x400.png",
          aiHint: "network server",
           options: [
            { id: 'scale', label: 'Infrastructure Scale', type: 'radio', choices: [
              { name: 'Small Business (up to 50 users)', priceModifier: 0 },
              { name: 'Medium Enterprise (up to 200 users)', priceModifier: 18000 },
              { name: 'Large Corporation (200+ users)', priceModifier: 55000 },
            ]},
            { id: 'features', label: 'Additional Features', type: 'checkbox', choices: [
              { name: 'Redundant Power Supply', priceModifier: 6000 },
              { name: "Advanced Firewall", priceModifier: 9000 },
              { name: "Managed Wi-Fi Solution", priceModifier: 12000 },
            ]}
          ]
        },
        {
          id: "security-solutions",
          name: "Advanced Security Suite",
          description: "Integrated CCTV, access control, and alarm systems.",
          longDescription: "Protect your assets with our comprehensive security suite. It includes high-definition CCTV cameras, smart access control panels with biometric options, and an integrated fire and intrusion alarm system, all manageable from a single, intuitive interface.",
          price: 45000,
          image: "https://placehold.co/600x400.png",
          aiHint: "security camera",
          options: [
            { id: 'cameras', label: 'Camera Count', type: 'radio', choices: [
              { name: '8 Cameras', priceModifier: 0 },
              { name: '16 Cameras', priceModifier: 12000 },
              { name: '32 Cameras', priceModifier: 30000 },
            ]},
            { id: 'access', label: 'Access Control', type: 'radio', choices: [
              { name: 'Card-based', priceModifier: 0 },
              { name: 'Card + Biometric', priceModifier: 15000 },
            ]},
            { id: 'monitoring', label: 'Monitoring Service', type: 'checkbox', choices: [
              { name: '24/7 Professional Monitoring (1-year)', priceModifier: 10000 },
            ]}
          ]
        },
        {
          id: "av-systems",
          name: "Professional Audio-Video Setup",
          description: "High-quality AV solutions for commercial spaces.",
          longDescription: "Transform your meeting rooms and public areas with our professional AV solutions. This setup includes 4K displays, ceiling-mounted speakers, microphones, and a central control unit for seamless presentations, video conferencing, and background music.",
          price: 25000,
          image: "https://placehold.co/600x400.png",
          aiHint: "video conference",
          options: [
            { id: 'rooms', label: 'Number of Rooms', type: 'radio', choices: [
              { name: '1 Room', priceModifier: 0 },
              { name: '3 Rooms', priceModifier: 40000 },
              { name: '5 Rooms', priceModifier: 70000 },
            ]},
             { id: 'display', label: 'Display Type', type: 'radio', choices: [
              { name: '85" 4K TV', priceModifier: 0 },
              { name: '120" Projector System', priceModifier: 8000 },
            ]},
            { id: 'addons', label: 'Features', type: 'checkbox', choices: [
              { name: 'Video Conferencing Camera', priceModifier: 3500 },
              { name: 'Wireless Presentation System', priceModifier: 5000 },
            ]}
          ]
        },
        {
          id: "solar-energy",
          name: "Commercial Solar Power System",
          description: "Sustainable energy solution to reduce operational costs.",
          longDescription: "Go green and save on energy bills with our commercial-grade solar power system. We provide high-efficiency solar panels, inverters, and battery storage solutions tailored to your energy consumption, including full installation and grid connection services.",
          price: 80000,
          image: "https://placehold.co/600x400.png",
          aiHint: "solar panels",
           options: [
            { id: 'capacity', label: 'System Capacity', type: 'radio', choices: [
              { name: '20kW System', priceModifier: 0 },
              { name: '50kW System', priceModifier: 100000 },
              { name: '100kW System', priceModifier: 250000 },
            ]},
            { id: 'storage', label: 'Battery Storage', type: 'checkbox', choices: [
              { name: 'Include 40kWh Battery Bank', priceModifier: 50000 },
            ]}
          ]
        },
      ],
    },
    about: {
      title: "About Data Leader",
      p1: "Data Leader is a premier provider of integrated IT infrastructure, security, and smart building systems in the Kingdom. Our mission is to empower businesses with smart, sustainable, and secure technology solutions.",
      p2: "With a focus on quality, innovation, and reliability, we have become a trusted B2B partner for companies seeking to modernize their operations and physical spaces.",
      licensesTitle: "Our Licenses & Certifications",
      licenses: [
        "Certified Smart Building Integrator",
        "Official Network Solutions Provider",
        "Licensed Security Systems Installer",
        "National Solar Energy Partner",
      ],
    },
    contact: {
      title: "Get In Touch",
      description: "Have a question or a project in mind? Fill out the form below and we'll get back to you shortly.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        success: "Thank you! Your message has been sent.",
        error: "An error occurred. Please try again."
      },
    },
    support: {
        title: "Submit a Support Ticket",
        description: "Encountering an issue? Our team is here to help. Please describe your problem in detail.",
        form: {
          name: "Full Name",
          email: "Email Address",
          product: "Product/Service",
          issue: "Describe your issue",
          submit: "Submit Ticket",
          success: "Thank you! Your support ticket has been created.",
          error: "An error occurred. Please try again."
        },
    },
    testimonials: {
      title: "What Our Clients Say",
      description: "Discover why leading companies in the Kingdom trust Data Leader for their technology needs.",
      items: [
        {
          name: "Ahmed Al-Fahad",
          role: "CEO, Modern Ventures Co.",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "man portrait",
          comment: "Data Leader's smart building system transformed our headquarters. We've seen a 30% reduction in energy costs and our employees love the automated environment.",
        },
        {
          name: "Fatima Al-Jamil",
          role: "IT Director, Royal Towers",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "woman portrait",
          comment: "The network infrastructure they deployed is rock-solid. We've had zero downtime since the upgrade, which is critical for our 24/7 operations.",
        },
        {
          name: "Yusuf Al-Mutairi",
          role: "Facility Manager, Global Logistics",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "person portrait",
          comment: "The security and AV systems installed in our new warehouse are top-notch. The integration is seamless and the user interface is incredibly easy to manage.",
        },
      ]
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
  ar: {
    brand: {
      name: "Data Leader",
      name_ar: "مؤسسة البيانات الرائدة",
      tagline: "نقود التحول الذكي للمباني في المملكة",
    },
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      shop: "المتجر",
      about: "من نحن",
      support: "الدعم الفني",
      contact: "اتصل بنا",
    },
    hero: {
      headline: "تقنيات ذكية لمبانٍ عصرية",
      subheadline: "من التحكم بالدخول إلى تقليل الطاقة – مؤسسة البيانات الرائدة هي شريكك الموثوق.",
      cta: "اطلب عرض سعر",
    },
    services: {
      title: "خدماتنا الأساسية",
      description: "نقدم حلولاً متكاملة لبناء وإدارة بنى تحتية حديثة وفعالة وآمنة.",
      items: [
        {
          id: "smart",
          title: "أنظمة المباني الذكية",
          description: "أتمتة ذكية للإضاءة والتكييف والأمان.",
        },
        {
          id: "it",
          title: "البنية التحتية لتقنية المعلومات والشبكات",
          description: "حلول شبكات موثوقة وقابلة للتطوير لعملك.",
        },
        {
          id: "security",
          title: "حلول أمنية متقدمة",
          description: "كاميرات المراقبة، التحكم بالدخول، وأنظمة إنذار الحريق.",
        },
        {
          id: "av",
          title: "الأنظمة الصوتية والمرئية",
          description: "حلول صوتية ومرئية احترافية للمساحات التجارية.",
        },
        {
          id: "solar",
          title: "أنظمة الطاقة الشمسية",
          description: "حلول طاقة شمسية مستدامة وفعالة من حيث التكلفة.",
        },
      ],
    },
    shop: {
      title: "منتجاتنا",
      description: "اكتشف مجموعتنا من الحلول التقنية المتقدمة المصممة لتحديث بنيتك التحتية.",
      viewDetails: "عرض التفاصيل",
      addToCart: "أضف إلى السلة",
      backToShop: "العودة للمتجر",
      itemAddedToCart: "تمت الإضافة إلى السلة",
      configure: "تخصيص",
      generateQuote: "إنشاء عرض سعر فوري",
      quoteGenerated: "عرض السعر جاهز",
      yourQuote: "عرض السعر الفوري الخاص بك",
      generatingQuote: "جاري إنشاء عرض السعر...",
      estimatedPrice: "السعر الإجمالي التقديري",
      sendForReview: "إرسال للمراجعة النهائية",
      quoteSent: "تم إرسال التكوين الخاص بك للمراجعة.",
      quotePrompt: "قم بتخصيص باقتك أدناه، ثم قم بإنشاء عرض سعر فوري.",
      products: [
        {
          id: "smart-systems",
          name: "نظام المباني الذكية",
          description: "حل أتمتة كامل للمباني الحديثة.",
          longDescription: "يوفر نظام المباني الذكية الخاص بنا تحكمًا مركزيًا ذكيًا في أنظمة الإضاءة والتكييف والأمن. عزز الراحة، وحسّن كفاءة الطاقة، واحصل على رؤى قيمة حول عمليات المبنى.",
          price: 50000,
          image: "https://placehold.co/600x400.png",
          aiHint: "smart home",
          options: [
            { id: 'tier', label: 'فئة النظام', type: 'radio', choices: [
              { name: 'أساسي', priceModifier: 0 },
              { name: 'احترافي', priceModifier: 15000 },
              { name: 'مؤسسي', priceModifier: 40000 },
            ]},
            { id: 'sensors', label: 'باقة الحساسات', type: 'radio', choices: [
              { name: 'قياسي (10 حساسات)', priceModifier: 0 },
              { name: 'موسع (25 حساس)', priceModifier: 5000 },
            ]},
            { id: 'support', label: 'إضافات', type: 'checkbox', choices: [
              { name: 'دعم ذو أولوية (سنة واحدة)', priceModifier: 7500 },
              { name: "تدريب في الموقع", priceModifier: 4000 },
            ]}
          ]
        },
        {
          id: "it-networking",
          name: "باقة تقنية المعلومات والشبكات للمؤسسات",
          description: "بنية تحتية للشبكات قابلة للتطوير وآمنة.",
          longDescription: "نقوم بتصميم ونشر بنى تحتية قوية لتقنية المعلومات والشبكات مصممة خصيصًا لاحتياجات عملك. تتضمن هذه الحزمة أجهزة توجيه عالية السرعة ومحولات ونقاط وصول وكابلات منظمة لضمان اتصال موثوق وتدفق بيانات لمؤسستك بأكملها.",
          price: 35000,
          image: "https://placehold.co/600x400.png",
          aiHint: "network server",
           options: [
            { id: 'scale', label: 'حجم البنية التحتية', type: 'radio', choices: [
              { name: 'أعمال صغيرة (حتى 50 مستخدم)', priceModifier: 0 },
              { name: 'مؤسسة متوسطة (حتى 200 مستخدم)', priceModifier: 18000 },
              { name: 'شركة كبيرة (200+ مستخدم)', priceModifier: 55000 },
            ]},
            { id: 'features', label: 'ميزات إضافية', type: 'checkbox', choices: [
              { name: 'مزود طاقة احتياطي', priceModifier: 6000 },
              { name: "جدار حماية متقدم", priceModifier: 9000 },
              { name: "حل واي فاي مُدار", priceModifier: 12000 },
            ]}
          ]
        },
        {
          id: "security-solutions",
          name: "مجموعة الأمن المتقدمة",
          description: "أنظمة متكاملة لكاميرات المراقبة والتحكم بالدخول والإنذار.",
          longDescription: "احمِ أصولك مع مجموعتنا الأمنية الشاملة. تتضمن كاميرات مراقبة عالية الدقة، ولوحات تحكم بالدخول ذكية مع خيارات بيومترية، ونظام إنذار متكامل للحريق والتسلل، وكلها قابلة للإدارة من واجهة واحدة سهلة الاستخدام.",
          price: 45000,
          image: "https://placehold.co/600x400.png",
          aiHint: "security camera",
          options: [
            { id: 'cameras', label: 'عدد الكاميرات', type: 'radio', choices: [
              { name: '8 كاميرات', priceModifier: 0 },
              { name: '16 كاميرا', priceModifier: 12000 },
              { name: '32 كاميرا', priceModifier: 30000 },
            ]},
            { id: 'access', label: 'التحكم بالدخول', type: 'radio', choices: [
              { name: 'عبر البطاقات', priceModifier: 0 },
              { name: 'بطاقات + بصمة', priceModifier: 15000 },
            ]},
            { id: 'monitoring', label: 'خدمة المراقبة', type: 'checkbox', choices: [
              { name: 'مراقبة احترافية 24/7 (سنة واحدة)', priceModifier: 10000 },
            ]}
          ]
        },
        {
          id: "av-systems",
          name: "تجهيزات صوتية ومرئية احترافية",
          description: "حلول صوتية ومرئية عالية الجودة للمساحات التجارية.",
          longDescription: "حوّل غرف الاجتماعات والمناطق العامة الخاصة بك مع حلولنا الصوتية والمرئية الاحترافية. يتضمن هذا الإعداد شاشات 4K، ومكبرات صوت مثبتة في السقف، وميكروفونات، ووحدة تحكم مركزية لعروض تقديمية ومؤتمرات فيديو وموسيقى خلفية سلسة.",
          price: 25000,
          image: "https://placehold.co/600x400.png",
          aiHint: "video conference",
          options: [
            { id: 'rooms', label: 'عدد الغرف', type: 'radio', choices: [
              { name: 'غرفة واحدة', priceModifier: 0 },
              { name: '3 غرف', priceModifier: 40000 },
              { name: '5 غرف', priceModifier: 70000 },
            ]},
             { id: 'display', label: 'نوع الشاشة', type: 'radio', choices: [
              { name: 'تلفزيون 85 بوصة 4K', priceModifier: 0 },
              { name: 'نظام بروجيكتور 120 بوصة', priceModifier: 8000 },
            ]},
            { id: 'addons', label: 'ميزات', type: 'checkbox', choices: [
              { name: 'كاميرا مؤتمرات الفيديو', priceModifier: 3500 },
              { name: 'نظام عرض لاسلكي', priceModifier: 5000 },
            ]}
          ]
        },
        {
          id: "solar-energy",
          name: "نظام طاقة شمسية تجاري",
          description: "حل طاقة مستدام لتقليل التكاليف التشغيلية.",
          longDescription: "اتجه نحو البيئة الخضراء ووفر في فواتير الطاقة مع نظام الطاقة الشمسية التجاري الخاص بنا. نحن نقدم ألواح طاقة شمسية عالية الكفاءة، ومحولات، وحلول تخزين بطاريات مصممة خصيصًا لاستهلاكك للطاقة، بما في ذلك خدمات التركيب الكامل والربط بالشبكة.",
          price: 80000,
          image: "https://placehold.co/600x400.png",
          aiHint: "solar panels",
           options: [
            { id: 'capacity', label: 'سعة النظام', type: 'radio', choices: [
              { name: 'نظام 20 كيلوواط', priceModifier: 0 },
              { name: 'نظام 50 كيلوواط', priceModifier: 100000 },
              { name: 'نظام 100 كيلوواط', priceModifier: 250000 },
            ]},
            { id: 'storage', label: 'تخزين البطارية', type: 'checkbox', choices: [
              { name: 'يشمل بنك بطاريات 40 كيلوواط/ساعة', priceModifier: 50000 },
            ]}
          ]
        },
      ],
    },
    about: {
      title: "عن مؤسسة البيانات الرائدة",
      p1: "مؤسسة البيانات الرائدة هي مزود رئيسي للبنية التحتية المتكاملة لتقنية المعلومات والأمن وأنظمة المباني الذكية في المملكة. مهمتنا هي تمكين الشركات بحلول تقنية ذكية ومستدامة وآمنة.",
      p2: "مع التركيز على الجودة والابتكار والموثوقية، أصبحنا شريكًا تجاريًا موثوقًا للشركات التي تسعى إلى تحديث عملياتها ومساحاتها المادية.",
      licensesTitle: "تراخيصنا وشهاداتنا",
      licenses: [
        "معتمدون في تكامل المباني الذكية",
        "مزود رسمي لحلول الشبكات",
        "مرخصون لتركيب الأنظمة الأمنية",
        "شريك وطني للطاقة الشمسية",
      ],
    },
    contact: {
      title: "تواصل معنا",
      description: "لديك سؤال أو مشروع؟ املأ النموذج أدناه وسنعاود الاتصال بك قريبًا.",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        submit: "إرسال الرسالة",
        success: "شكرًا لك! تم إرسال رسالتك بنجاح.",
        error: "حدث خطأ. يرجى المحاولة مرة أخرى."
      },
    },
    support: {
        title: "إرسال تذكرة دعم فني",
        description: "هل تواجه مشكلة؟ فريقنا هنا للمساعدة. يرجى وصف مشكلتك بالتفصيل.",
        form: {
          name: "الاسم الكامل",
          email: "البريد الإلكتروني",
          product: "المنتج/الخدمة",
          issue: "صف مشكلتك",
          submit: "إرسال التذكرة",
          success: "شكرًا لك! تم إنشاء تذكرة الدعم الخاصة بك.",
          error: "حدث خطأ. يرجى المحاولة مرة أخرى."
        },
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      description: "اكتشف لماذا تثق الشركات الرائدة في المملكة في مؤسسة البيانات الرائدة لتلبية احتياجاتها التقنية.",
      items: [
        {
          name: "أحمد الفهد",
          role: "الرئيس التنفيذي، شركة المشاريع الحديثة",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "man portrait",
          comment: "نظام المباني الذكية من مؤسسة البيانات الرائدة غير مقرنا الرئيسي. لقد شهدنا انخفاضًا بنسبة 30٪ في تكاليف الطاقة ويحب موظفونا البيئة المؤتمتة.",
        },
        {
          name: "فاطمة الجميل",
          role: "مديرة تقنية المعلومات، أبراج رويال",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "woman portrait",
          comment: "البنية التحتية للشبكة التي قاموا بنشرها قوية جدًا. لم نواجه أي توقف عن العمل منذ الترقية، وهو أمر بالغ الأهمية لعملياتنا على مدار الساعة طوال أيام الأسبوع.",
        },
        {
          name: "يوسف المطيري",
          role: "مدير المرافق، جلوبال لوجستكس",
          avatar: "https://placehold.co/100x100.png",
          aiHint: "person portrait",
          comment: "أنظمة الأمن والصوتيات والمرئيات التي تم تركيبها في مستودعاتنا الجديدة على أعلى مستوى. التكامل سلس وواجهة المستخدم سهلة الإدارة بشكل لا يصدق.",
        },
      ]
    },
    footer: {
      copyright: "جميع الحقوق محفوظة.",
    },
  },
};
