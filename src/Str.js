export class Str {

	static ascii(str, { charmap = null, lower = false } = { }) {
		charmap = charmap || this.charmap
		str = (str || '').toString()

		const length = str.length
		let ascii = ''

		for(let i = 0; i < length; i++) {
			const char = str.charAt(i)
			ascii += charmap[char] || char
		}

		if(lower) {
			ascii = ascii.toLowerCase()
		}

		return ascii.replace(/[^\x00-\x7F]/g, '')
	}

	static slug(str, { charmap = null, separator = '-', lower = true } = { }) {
		str = this.ascii(str, { charmap, lower })

		// Convert all dashes/underscores into separator
		const flip = separator === '-' ? '_' : '-'

		str = str.replace(new RegExp(flip, 'g'), separator)

		// Remove all characters that are not the separator, letters, numbers, or whitespace.
		str = str.replace(new RegExp(`[^a-zA-Z0-9\\s${separator}]+`, 'g'), '')

		// Replace all separator characters and whitespace by a single separator
		str = str.replace(new RegExp(`[\\s${separator}]+`, 'g'), separator)

		// Remove all leading and trailing separators
		return str.replace(new RegExp(`(^${separator}|${separator}$)`, 'g'), '')
	}

	// https://github.com/dodo/node-slug/blob/master/slug.js#L81
	// https://github.com/django/django/blob/master/django/contrib/admin/static/admin/js/urlify.js#L5
	static charmap = Object.freeze({
		// latin
		À: 'A', Á: 'A', Â: 'A', Ã: 'A', Ä: 'A', Å: 'A', Æ: 'AE',
		Ç: 'C', È: 'E', É: 'E', Ê: 'E', Ë: 'E', Ì: 'I', Í: 'I',
		Î: 'I', Ï: 'I', Ð: 'D', Ñ: 'N', Ò: 'O', Ó: 'O', Ô: 'O',
		Õ: 'O', Ö: 'O', Ő: 'O', Ø: 'O', Ù: 'U', Ú: 'U', Û: 'U',
		Ü: 'U', Ű: 'U', Ý: 'Y', Þ: 'TH', ß: 'ss', à: 'a', á: 'a',
		â: 'a', ã: 'a', ä: 'a', å: 'a', æ: 'ae', ç: 'c', è: 'e',
		é: 'e', ê: 'e', ë: 'e', ì: 'i', í: 'i', î: 'i', ï: 'i',
		ð: 'd', ñ: 'n', ò: 'o', ó: 'o', ô: 'o', õ: 'o', ö: 'o',
		ő: 'o', ø: 'o', ù: 'u', ú: 'u', û: 'u', ü: 'u', ű: 'u',
		ý: 'y', þ: 'th', ÿ: 'y', ẞ: 'SS',

		// greek
		α: 'a', β: 'b', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'h', θ: '8',
		ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: '3', ο: 'o', π: 'p',
		ρ: 'r', σ: 's', τ: 't', υ: 'y', φ: 'f', χ: 'x', ψ: 'ps', ω: 'w',
		ά: 'a', έ: 'e', ί: 'i', ό: 'o', ύ: 'y', ή: 'h', ώ: 'w', ς: 's',
		ϊ: 'i', ΰ: 'y', ϋ: 'y', ΐ: 'i',
		Α: 'A', Β: 'B', Γ: 'G', Δ: 'D', Ε: 'E', Ζ: 'Z', Η: 'H', Θ: '8',
		Ι: 'I', Κ: 'K', Λ: 'L', Μ: 'M', Ν: 'N', Ξ: '3', Ο: 'O', Π: 'P',
		Ρ: 'R', Σ: 'S', Τ: 'T', Υ: 'Y', Φ: 'F', Χ: 'X', Ψ: 'PS', Ω: 'W',
		Ά: 'A', Έ: 'E', Ί: 'I', Ό: 'O', Ύ: 'Y', Ή: 'H', Ώ: 'W', Ϊ: 'I',
		Ϋ: 'Y',

		// turkish
		ş: 's', Ş: 'S', ı: 'i', İ: 'I',
		ğ: 'g', Ğ: 'G',

		// russian
		а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
		з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
		п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c',
		ч: 'ch', ш: 'sh', щ: 'sh', ъ: 'u', ы: 'y', ь: '', э: 'e', ю: 'yu',
		я: 'ya',
		А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo', Ж: 'Zh',
		З: 'Z', И: 'I', Й: 'J', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O',
		П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'H', Ц: 'C',
		Ч: 'Ch', Ш: 'Sh', Щ: 'Sh', Ъ: 'U', Ы: 'Y', Ь: '', Э: 'E', Ю: 'Yu',
		Я: 'Ya',

		// ukranian
		Є: 'Ye', І: 'I', Ї: 'Yi', Ґ: 'G', є: 'ye', і: 'i', ї: 'yi', ґ: 'g',

		// czech
		č: 'c', ď: 'd', ě: 'e', ň: 'n', ř: 'r', š: 's', ť: 't', ů: 'u',
		ž: 'z', Č: 'C', Ď: 'D', Ě: 'E', Ň: 'N', Ř: 'R', Š: 'S', Ť: 'T',
		Ů: 'U', Ž: 'Z',

		// polish
		ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ś: 's', ź: 'z',
		ż: 'z', Ą: 'A', Ć: 'C', Ę: 'E', Ł: 'L', Ń: 'N', Ś: 'S',
		Ź: 'Z', Ż: 'Z',

		// latvian
		ā: 'a', ē: 'e', ģ: 'g', ī: 'i', ķ: 'k', ļ: 'l', ņ: 'n',
		ū: 'u', Ā: 'A', Ē: 'E', Ģ: 'G', Ī: 'I',
		Ķ: 'K', Ļ: 'L', Ņ: 'N', Ū: 'U',

		// lithuanian
		ė: 'e', į: 'i', ų: 'u', Ė: 'E', Į: 'I', Ų: 'U',

		// romanian
		ț: 't', Ț: 'T', ţ: 't', Ţ: 'T', ș: 's', Ș: 'S', ă: 'a', Ă: 'A',

		// vietnamese
		Ạ: 'A', Ả: 'A', Ầ: 'A', Ấ: 'A', Ậ: 'A', Ẩ: 'A', Ẫ: 'A',
		Ằ: 'A', Ắ: 'A', Ặ: 'A', Ẳ: 'A', Ẵ: 'A', Ẹ: 'E', Ẻ: 'E',
		Ẽ: 'E', Ề: 'E', Ế: 'E', Ệ: 'E', Ể: 'E', Ễ: 'E', Ị: 'I',
		Ỉ: 'I', Ĩ: 'I', Ọ: 'O', Ỏ: 'O', Ồ: 'O', Ố: 'O', Ộ: 'O',
		Ổ: 'O', Ỗ: 'O', Ơ: 'O', Ờ: 'O', Ớ: 'O', Ợ: 'O', Ở: 'O',
		Ỡ: 'O', Ụ: 'U', Ủ: 'U', Ũ: 'U', Ư: 'U', Ừ: 'U', Ứ: 'U',
		Ự: 'U', Ử: 'U', Ữ: 'U', Ỳ: 'Y', Ỵ: 'Y', Ỷ: 'Y', Ỹ: 'Y',
		Đ: 'D', ạ: 'a', ả: 'a', ầ: 'a', ấ: 'a', ậ: 'a', ẩ: 'a',
		ẫ: 'a', ằ: 'a', ắ: 'a', ặ: 'a', ẳ: 'a', ẵ: 'a', ẹ: 'e',
		ẻ: 'e', ẽ: 'e', ề: 'e', ế: 'e', ệ: 'e', ể: 'e', ễ: 'e',
		ị: 'i', ỉ: 'i', ĩ: 'i', ọ: 'o', ỏ: 'o', ồ: 'o', ố: 'o',
		ộ: 'o', ổ: 'o', ỗ: 'o', ơ: 'o', ờ: 'o', ớ: 'o', ợ: 'o',
		ở: 'o', ỡ: 'o', ụ: 'u', ủ: 'u', ũ: 'u', ư: 'u', ừ: 'u',
		ứ: 'u', ự: 'u', ử: 'u', ữ: 'u', ỳ: 'y', ỵ: 'y', ỷ: 'y',
		ỹ: 'y', đ: 'd',

		// currency
		'€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
		'₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
		'₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
		'₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
		'₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', 元: 'yuan',
		円: 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
		$: 'dollar', '₹': 'indian rupee',

		// symbols
		'©': '(c)', œ: 'oe', Œ: 'OE', '∑': 'sum', '®': '(r)', '†': '+',
		'“': '"', '”': '"', '‘': '\'', '’': '\'', '∂': 'd', ƒ: 'f', '™': 'tm',
		'℠': 'sm', '…': '...', '˚': 'o', º: 'o', ª: 'a', '•': '*',
		'∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
		'<': 'less', '>': 'greater',
	})

}