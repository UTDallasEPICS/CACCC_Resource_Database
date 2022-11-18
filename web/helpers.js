const handlebars = require('handlebars');

// used for displaying categories in dropdowns, fail reasons, etc.
process.resourceTypes = [
    "Behavioral And Mental Health Care",
    "Child Care And After School",
    "Disability",
    "Drug And Alcohol",
    "Educational",
    "Emergency Shelters",
    "Employment",
    "Financial Assistance",
    "Food And Clothing Pantries",
    "Grief Support",
    "Household ",
    "Housing",
    "Immigration And Refugee",
    "Legal",
    "Medical Health Care",
    "Miscellaneous",
    "Parenting Classes",
    "Pet Services",
    "Residential Group Homes",
    "Senior Services",
    "Transportation",
];

const states = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
};

// for use in the uploads.hbs renderer
handlebars.registerHelper("downloads", (map, id) => {
    var body = "";
    for (var key of Object.keys(map)) {
        console.log("file: " + key);
        body += '<tr><td><a href="/resource/attachments/' + id + '/' + handlebars.escapeExpression(key) + '">' + key.replace(':', '.') + '</a></td></tr>';
    }
    return new handlebars.SafeString(body);
});
// for use in the addOrEdit dropdown
handlebars.registerHelper("isSelected", (value, selection) => {
    return value == selection;
});
// for use in the mainLayout.hbs dropdown
handlebars.registerHelper("resourceTypes", () => {
    return process.resourceTypes;
});
handlebars.registerHelper("alertFails", (dict, total) => {
    if(!dict) return ""
    var output = "alert('Total Referrals: " + handlebars.escapeExpression(total) + "\\n";
    for (var key of Object.keys(dict)) {
        output += handlebars.escapeExpression(key) + ": " + handlebars.escapeExpression(dict[key]) + "\\n";
    }
    return new handlebars.SafeString(output + "')");
});
// TODO: add helper for resourceLink 
handlebars.registerHelper("stateConvert", (state)  =>{
    if (state == null) {
        return new handlebars.SafeString('TX');
    }
    return new handlebars.SafeString(states[state]);
});
