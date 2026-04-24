import { Category } from "../utils/types";

export const categories: Category[] = [
  {
    id: "science",
    name: "Наука",
    emoji: "🔬",
    questions: [
      {
        id: 1,
        text: "Яка найменша планета Сонячної системи?",
        options: ["Марс", "Меркурій", "Плутон", "Венера"],
        correctIndex: 1,
        explanation: "Меркурій — найменша планета Сонячної системи з діаметром ~4879 км.",
      },
      {
        id: 2,
        text: "Скільки кісток у дорослої людини?",
        options: ["186", "206", "226", "246"],
        correctIndex: 1,
        explanation: "У дорослої людини 206 кісток. У немовлят їх більше — близько 270.",
      },
      {
        id: 3,
        text: "Що вивчає сейсмологія?",
        options: ["Землетруси", "Морські течії", "Атмосферу", "Зорі"],
        correctIndex: 0,
        explanation: "Сейсмологія — наука про землетруси та поширення сейсмічних хвиль.",
      },
      {
        id: 4,
        text: "Яка хімічна формула води?",
        options: ["HO", "H2O", "H3O", "OH2"],
        correctIndex: 1,
        explanation: "H₂O — молекула води складається з двох атомів водню та одного атома кисню.",
      },
      {
        id: 5,
        text: "Яка швидкість світла у вакуумі (приблизно)?",
        options: ["100 000 км/с", "200 000 км/с", "300 000 км/с", "400 000 км/с"],
        correctIndex: 2,
        explanation: "Швидкість світла у вакуумі — ~299 792 км/с, або приблизно 300 000 км/с.",
      },
    ],
  },
  {
    id: "geography",
    name: "Географія",
    emoji: "🌍",
    questions: [
      {
        id: 1,
        text: "Яка найдовша річка у світі?",
        options: ["Амазонка", "Янцзи", "Ніл", "Міссісіпі"],
        correctIndex: 2,
        explanation: "Ніл — найдовша річка у світі, довжиною ~6650 км.",
      },
      {
        id: 2,
        text: "Яка країна має найбільшу площу у світі?",
        options: ["США", "Китай", "Канада", "Росія"],
        correctIndex: 3,
        explanation: "Росія — найбільша країна у світі з площею ~17,1 млн км².",
      },
      {
        id: 3,
        text: "Столиця Австралії?",
        options: ["Сідней", "Мельбурн", "Канберра", "Брісбен"],
        correctIndex: 2,
        explanation: "Канберра є столицею Австралії, хоча багато хто думає, що це Сідней.",
      },
      {
        id: 4,
        text: "Який найвищий водоспад у світі?",
        options: ["Ніагарський", "Анхель", "Ігуасу", "Вікторія"],
        correctIndex: 1,
        explanation: "Анхель (Венесуела) — найвищий водоспад у світі, висота ~979 м.",
      },
      {
        id: 5,
        text: "На якому материку знаходиться пустеля Сахара?",
        options: ["Азія", "Австралія", "Південна Америка", "Африка"],
        correctIndex: 3,
        explanation: "Сахара розташована на півночі Африки — найбільша гаряча пустеля світу.",
      },
    ],
  },
  {
    id: "programming",
    name: "Програмування",
    emoji: "💻",
    questions: [
      {
        id: 1,
        text: "Що означає абревіатура HTML?",
        options: [
          "Hyper Text Markup Language",
          "High Transfer Mode Language",
          "Hyper Transfer Markup Links",
          "Home Tool Markup Language",
        ],
        correctIndex: 0,
        explanation: "HTML — HyperText Markup Language, мова розмітки веб-сторінок.",
      },
      {
        id: 2,
        text: "Який рік вважається роком створення JavaScript?",
        options: ["1991", "1993", "1995", "1998"],
        correctIndex: 2,
        explanation: "JavaScript створив Брендан Айк у 1995 році за 10 днів для браузера Netscape.",
      },
      {
        id: 3,
        text: "Що таке API?",
        options: [
          "Мова програмування",
          "Інтерфейс програмування застосунків",
          "Тип бази даних",
          "Протокол шифрування",
        ],
        correctIndex: 1,
        explanation: "API (Application Programming Interface) — набір правил для взаємодії програм.",
      },
      {
        id: 4,
        text: "Який з цих патернів є поведінковим?",
        options: ["Singleton", "Factory", "Observer", "Decorator"],
        correctIndex: 2,
        explanation: "Observer — поведінковий патерн. Singleton і Factory — породжуючі, Decorator — структурний.",
      },
      {
        id: 5,
        text: "Що виведе: console.log(typeof null)?",
        options: ["null", "undefined", "object", "string"],
        correctIndex: 2,
        explanation: "typeof null повертає 'object' — це відомий баг JavaScript, що залишився з ранніх версій.",
      },
    ],
  },
  {
    id: "history",
    name: "Історія",
    emoji: "📜",
    questions: [
      {
        id: 1,
        text: "У якому році почалася Перша світова війна?",
        options: ["1912", "1914", "1916", "1918"],
        correctIndex: 1,
        explanation: "Перша світова війна почалась 28 липня 1914 року після вбивства ерцгерцога Франца Фердинанда.",
      },
      {
        id: 2,
        text: "Хто написав 'Кобзар'?",
        options: ["Іван Франко", "Леся Українка", "Тарас Шевченко", "Михайло Коцюбинський"],
        correctIndex: 2,
        explanation: "'Кобзар' — збірка поетичних творів Тараса Григоровича Шевченка, вперше видана у 1840 році.",
      },
      {
        id: 3,
        text: "Коли Україна проголосила незалежність?",
        options: ["1989", "1990", "1991", "1992"],
        correctIndex: 2,
        explanation: "Україна проголосила незалежність 24 серпня 1991 року.",
      },
      {
        id: 4,
        text: "Яка цивілізація побудувала піраміди Гізи?",
        options: ["Шумерська", "Єгипетська", "Грецька", "Вавилонська"],
        correctIndex: 1,
        explanation: "Піраміди Гізи побудували давні єгиптяни близько 2560–2540 рр. до н. е.",
      },
      {
        id: 5,
        text: "Хто був першим президентом США?",
        options: ["Авраам Лінкольн", "Томас Джефферсон", "Бенджамін Франклін", "Джордж Вашингтон"],
        correctIndex: 3,
        explanation: "Джордж Вашингтон — перший президент США, обраний у 1789 році.",
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
