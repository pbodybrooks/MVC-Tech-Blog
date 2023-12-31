// TODO: Remove any helpers that are not used.
module.exports = {
  // format date as MM/DD/YYYY
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },

  // format date as "Thursday, June 1st, 2023", for example. (used for Workout History)
  format_date_day_of_week: (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const day = new Date(date).getDate();
    let suffix;
  
    if (day >= 11 && day <= 13) {
      suffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }
    }
    return formattedDate.replace(/\b\d+\b/, (match) => match + suffix);
  },

  // format words in title case, replace underscores with spaces
  toTitleCase: (str) => {
    let words = str.replace("_", " ").split(" ");
    let titleCaseWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let titleCaseStr = titleCaseWords.join(" ");
    return titleCaseStr;
  }, 
      
  // simple helper to add two numbers used to format indexes from 0 to 1, 1 to 2, etc.
  addHelper : (a, b) => {
    return a + b;
  },

  // format_plural helper function to pluralize words, particularly for comments and likes
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },

  addPossessiveSuffix: (name) => {
    if (name.endsWith('s')) {
      return name + "'";
    } else {
      return name + "'s";
    }
  },
};


