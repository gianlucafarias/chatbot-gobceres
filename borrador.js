const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('🙌 ¡Hola!  Soy Ceresito, el chatbot del Gobierno de la Ciudad de Ceres 🍒')
    .addAnswer(['No soy un superhéroe pero puedo ayudarte de muchas maneras 🦸‍♀️',
            'Contame, ¿sobre qué necesitas saber?',
            'A. 👉 Trámites 🗃️',
            'B. 👉 Licencia de conducir 🪪',
            'C. 👉 Información sobre el CIC 🫂',
            'D. 👉 Turismo 📸',
            'E. 👉 Historia de Ceres 🏛',
            'F. 👉 Separación y recolección de residuos ♻',
            'G. 👉 Educación 📚',
            'H. 👉 Actividades para adultos mayores 👵👴',
            'I. 👉 Prevención del dengue 🦟',
            'J. 👉 Reclamos 📝',
            '\n\n Escribí la primer letra del menú sobre el tema que te interese para continuar.',
        ],
        
        null,
        null,
        [flowGracias, flowTuto, flowEventos]
    )