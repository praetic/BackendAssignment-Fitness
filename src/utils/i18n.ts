import { join } from 'node:path'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector } from 'i18next-http-middleware'

i18next
	.use(LanguageDetector)
	.use(Backend)
	.init({
		fallbackLng: 'en',
		supportedLngs: ['en', 'sk'],
		ns: ['translation'],
		defaultNS: 'translation',
		backend: {
			loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json')
		},
		detection: {
			order: ['header'],
			lookupHeader: 'language',
			caches: false
		},
		preload: ['en', 'sk']
	})

export default i18next
