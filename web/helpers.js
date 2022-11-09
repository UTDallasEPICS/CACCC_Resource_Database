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
// for use in the uploads.hbs renderer
handlebars.registerHelper("downloads", (map, id) => {
    var body = "";
    for (var key of Object.keys(map)) {
        console.log("file: " + key);
        body += '<tr><td><a href="/resource/attachments/' + id + '/' + handlebars.escapeExpression(key) + '">' + key.replace(':', '.') + '</a></td></tr>';
    }
    return new handlebars.SafeString(body);
});
// for use in the addOrEdit.hbs dropdown
handlebars.registerHelper("selectedDropDown", (defaultValue, list) => {
    var body = "";
    list.forEach(element => {
        body += "<option value=\"" + handlebars.escapeExpression(element) + "\"";
        if (element === defaultValue) {
            body += " selected";
        }
        body += ">" + handlebars.escapeExpression(element) + "</option>";
    });
    return new handlebars.SafeString(body);
});
// for use in the mainLayout.hbs dropdown
handlebars.registerHelper("typesDropdown", () => {
    var body = "";
    process.resourceTypes.forEach(element => {
        body += "<option value=\"" + handlebars.escapeExpression(element) + "\">" + handlebars.escapeExpression(element) + "</option>";
    });
    return new handlebars.SafeString(body);
});
// for use in the addOrEdit.hbs resource referrals and fails
handlebars.registerHelper("alertFails", (dict, total) => {
    if(!dict) return ""
    var output = "alert('Total Referrals: " + handlebars.escapeExpression(total) + "\\n";
    for (var key of Object.keys(dict)) {
        output += handlebars.escapeExpression(key) + ": " + handlebars.escapeExpression(dict[key]) + "\\n";
    }
    return new handlebars.SafeString(output + "')");
});
// for use in the list.hbs additional resource hyperlinks
handlebars.registerHelper("resourceLinks", (str) => {
    var links = "";
    str.split('\n').forEach(element => {
        links += "<a href=\"" + handlebars.escapeExpression(element) + "\">" + handlebars.escapeExpression(element) + "</a>";
    });
    return new handlebars.SafeString(links);
});
// for use in the list.hbs list tag attribute generation
handlebars.registerHelper("isOdd", (num) => {
    return num % 2 != 0;
});
const sortableStrColumns = ['Type', 'Name', 'City', 'State'];
const sortableNumColumns = ['Zipcode', 'Referrals', 'Success'];
handlebars.registerHelper("isSortableByStr", (col) => {
    return sortableStrColumns.includes(col);
});
handlebars.registerHelper("isSortableByNum", (col) => {
    return sortableNumColumns.includes(col);
});
