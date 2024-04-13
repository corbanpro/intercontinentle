let countryDict = {
	"mw": "Malawi",
	"mg": "Madagascar",
	"np": "Nepal",
	"ga": "Gabon",
	"rw": "Rwanda",
	"se": "Sweden",
	"tg": "Togo",
	"bj": "Benin",
	"bi": "Burundi",
	"ls": "Lesotho",
	"ni": "Nicaragua",
	"gw": "Guinea-Bissau",
	"bd": "Bangladesh",
	"to": "Tonga",
	"br": "Brazil",
	"tn": "Tunisia",
	"tl": "East Timor",
	"dm": "Dominica",
	"co": "Colombia",
	"ma": "Morocco",
	"ht": "Haiti",
	"ao": "Angola",
	"vc": "Saint Vincent and the Grenadines",
	"cr": "Costa Rica",
	"in": "India",
	"sl": "Sierra Leone",
	"kp": "North Korea",
	"pw": "Palau",
	"mz": "Mozambique",
	"mm": "Myanmar",
	"bz": "Belize",
	"ir": "Iran",
	"vn": "Vietnam",
	"ws": "Samoa",
	"dz": "Algeria",
	"zw": "Zimbabwe",
	"ar": "Argentina",
	"vu": "Vanuatu",
	"ly": "Libya",
	"sr": "Suriname",
	"kn": "Saint Kitts and Nevis",
	"iq": "Iraq",
	"uy": "Uruguay",
	"pg": "Papua New Guinea",
	"ae": "United Arab Emirates",
	"sm": "San Marino",
	"cd": "Democratic Republic of the Congo",
	"kg": "Kyrgyzstan",
	"ph": "Philippines",
	"kh": "Cambodia",
	"al": "Albania",
	"gd": "Grenada",
	"pe": "Peru",
	"ad": "Andorra",
	"fj": "Fiji",
	"id": "Indonesia",
	"eg": "Egypt",
	"pt": "Portugal",
	"tt": "Trinidad and Tobago",
	"sb": "Solomon Islands",
	"mx": "Mexico",
	"do": "Dominican Republic",
	"my": "Malaysia",
	"ch": "Switzerland",
	"ag": "Antigua and Barbuda",
	"mt": "Malta",
	"il": "Israel",
	"gh": "Ghana",
	"li": "Liechtenstein",
	"kz": "Kazakhstan",
	"py": "Paraguay",
	"nl": "Netherlands",
	"uz": "Uzbekistan",
	"de": "Germany",
	"mn": "Mongolia",
	"af": "Afghanistan",
	"cv": "Cape Verde",
	"be": "Belgium",
	"lt": "Lithuania",
	"qa": "Qatar",
	"om": "Oman",
	"cm": "Cameroon",
	"ec": "Ecuador",
	"bn": "Brunei",
	"bw": "Botswana",
	"ke": "Kenya",
	"at": "Austria",
	"es": "Spain",
	"ug": "Uganda",
	"ru": "Russia",
	"lc": "Saint Lucia",
	"fr": "France",
	"la": "Laos",
	"lu": "Luxembourg",
	"cf": "Central African Republic",
	"it": "Italy",
	"cu": "Cuba",
	"gt": "Guatemala",
	"us": "United States",
	"cl": "Chile",
	"dk": "Denmark",
	"ki": "Kiribati",
	"gb": "United Kingdom",
	"mu": "Mauritius",
	"et": "Ethiopia",
	"ca": "Canada",
	"za": "South Africa",
	"tj": "Tajikistan",
	"hu": "Hungary",
	"cz": "Czech Republic",
	"sg": "Singapore",
	"by": "Belarus",
	"is": "Iceland",
	"si": "Slovenia",
	"sc": "Seychelles",
	"no": "Norway",
	"au": "Australia",
	"rs": "Serbia",
	"fi": "Finland",
	"cn": "China",
	"lk": "Sri Lanka",
	"bt": "Bhutan",
	"nz": "New Zealand",
	"pl": "Poland",
	"me": "Montenegro",
	"mr": "Mauritania",
	"sa": "Saudi Arabia",
	"th": "Thailand",
	"ci": "Ivory Coast",
	"az": "Azerbaijan",
	"gr": "Greece",
	"km": "Comoros",
	"bh": "Bahrain",
	"lv": "Latvia",
	"bb": "Barbados",
	"cy": "Cyprus",
	"ua": "Ukraine",
	"jp": "Japan",
	"sk": "Slovakia",
	"zm": "Zambia",
	"ge": "Georgia",
	"bo": "Bolivia",
	"kr": "South Korea",
	"gm": "The Gambia",
	"gy": "Guyana",
	"ee": "Estonia",
	"ve": "Venezuela",
	"fm": "Federated States of Micronesia",
	"mv": "Maldives",
	"hr": "Croatia",
	"bf": "Burkina Faso",
	"lb": "Lebanon",
	"sv": "El Salvador",
	"pa": "Panama",
	"pk": "Pakistan",
	"tz": "Tanzania",
	"ye": "Yemen",
	"tr": "Turkey",
	"am": "Armenia",
	"kw": "Kuwait",
	"hn": "Honduras",
	"gn": "Guinea",
	"jm": "Jamaica",
	"md": "Moldova",
	"bg": "Bulgaria",
	"tm": "Turkmenistan",
	"td": "Chad",
	"tv": "Tuvalu",
	"ro": "Romania",
	"lr": "Liberia",
	"ng": "Nigeria",
	"mh": "Marshall Islands",
	"sy": "Syria",
	"jo": "Jordan",
	"bs": "The Bahamas",
	"sn": "Senegal",
	"sd": "Sudan",
	"ml": "Mali",
	"dj": "Djibouti",
	"ne": "Niger",
	"ss": "South Sudan",
	"er": "Eritrea",
	"gq": "Equatorial Guinea",
	"so": "Somalia",
	"mc": "Monaco",
	"nr": "Nauru",
	"ba": "Bosnia and Herzegovina",
};

for (let key in countryDict) {
  let temp = key
  key = key.toUpperCase();
  let country = countryDict[temp];
  // replace the value in the dictionary
  delete countryDict[temp];
  countryDict[key] = country;
}

console.log(countryDict);