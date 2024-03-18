
    const adapterFlow = require('./flujos/flow')
    const adapterDB = require('./database/database')
    const QRPortalWeb = require('@bot-whatsapp/portal')
    const adapterProvider = require('./provider/provider')
    const {
        createBot,  
    } = require('@bot-whatsapp/bot')
    
    const main = async () => {
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
            queue: {
                timeout: 10000, //👌
                concurrencyLimit: 60 //👌
            }
        })

        QRPortalWeb()
    }

    main()
