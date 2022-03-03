const handlebars = require('handlebars');

//used for displaying categories in dropdowns, fail reasons, etc.
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
//for use in the uploads.hbs renderer
handlebars.registerHelper("downloads", (map, id) => {
    var body = "";
    for (const key of map.keys()) {
        console.log("file: " + key);
        body += '<tr><td><a href="/resource/attachments/' + id + '/' + handlebars.escapeExpression(key) + '">' + key.replace(':', '.') + '</a></td></tr>';
    }
    return new handlebars.SafeString(body);
});
//for use in the addOrEdit dropdown
handlebars.registerHelper("selectedDropDown", (defaultValue, list) => {
    var body = "";
    list.forEach(element => {
        body += "<option value=\"" + handlebars.escapeExpression(element) + "\"";
        if (element == defaultValue) {
            body += " selected";
        }
        body += ">" + handlebars.escapeExpression(element) + "</option>";
    });
    return new handlebars.SafeString(body);
});
//for use in the mainLayout.hbs dropdown
handlebars.registerHelper("typesDropdown", () => {
    var body = "";
    process.resourceTypes.forEach(element => {
        body += "<option value=\"" + handlebars.escapeExpression(element) + "\">" + handlebars.escapeExpression(element) + "</option>";
    });
    return new handlebars.SafeString(body);
});
handlebars.registerHelper("alertFails", (dict, total) => {
    var output = "alert('Total Referrals: " + handlebars.escapeExpression(total) + "\\n";
    for (let key of dict.keys()) {
        output += handlebars.escapeExpression(key) + ": " + handlebars.escapeExpression(dict.get(key)) + "\\n";
    }
    return new handlebars.SafeString(output + "')");
});