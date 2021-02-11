const addEmojisToPrimaryCategories = (string: string, categoryName: string) => {
  switch (categoryName) {
    case 'Principles':
      string += '🗽';
      break;
    case 'Smells':
      string += '💩';
      break;
    case 'Class Design':
      string += '🧱';
      break;
    case 'Package Cohesion':
      string += '📦';
      break;
    case 'Package Coupling':
      string += '🧑‍🤝‍🧑';
      break;
    case 'General':
      string += '📖';
      break;
    case 'Environment':
      string += '🌎';
      break;
    case 'Dependency Injection':
      string += '💉';
      break;
    case 'Design':
      string += '✍';
      break;
    case 'Dependencies':
      string += '👨‍👧‍👦';
      break;
    case 'Naming':
      string += '🏷';
      break;
    case 'Understandability':
      string += '📖';
      break;
    case 'Methods':
      string += '🏃';
      break;
    case 'Source Code Structure':
      string += '🏗';
      break;
    case 'Conditionals':
      string += '👈👉';
      break;
    case 'Useless Stuff':
      string += '🗑';
      break;
    case 'Maintainability Killers':
      string += '🔧';
      break;
    case 'Exception Handling':
      string += '🚸';
      break;
    case 'How to Learn Clean Code':
      string += '👨‍🏫';
      break;
    case 'Refactoring Patterns':
      string += '🔨';
      break;
  }

  return string;
};

export default addEmojisToPrimaryCategories;
