-- Demo seed data for HTML Tags Tutor
-- Note: This resets tables for a clean demo.
TRUNCATE TABLE results RESTART IDENTITY;
TRUNCATE TABLE questions RESTART IDENTITY;
TRUNCATE TABLE tags RESTART IDENTITY;

INSERT INTO tags (slug, name, category, description, attributes, example_html, notes) VALUES
(
  'p',
  '<p>',
  'Text',
  'Використовується для створення абзаців тексту.',
  '[]'::jsonb,
  '<p>Це приклад абзацу тексту.</p>',
  'Абзаци за замовчуванням мають відступи зверху та знизу (залежить від CSS).'
),
(
  'h1',
  '<h1>',
  'Text',
  'Заголовок першого рівня. Найважливіший заголовок на сторінці.',
  '[]'::jsonb,
  '<h1>Головний заголовок</h1>',
  'На сторінці бажано використовувати один H1 для SEO та структури.'
),
(
  'a',
  '<a>',
  'Text',
  'Створює гіперпосилання на іншу сторінку, файл або розділ.',
  '[{"name":"href","desc":"Адреса посилання"},{"name":"target","desc":"Де відкривати посилання"}]'::jsonb,
  '<a href="https://example.com" target="_blank">Відкрити приклад</a>',
  'Якщо target="_blank", часто додають rel="noopener noreferrer".'
),
(
  'img',
  '<img>',
  'Media',
  'Виводить зображення на сторінці.',
  '[{"name":"src","desc":"Шлях до зображення"},{"name":"alt","desc":"Альтернативний текст"}]'::jsonb,
  '<img src="https://picsum.photos/480/200" alt="Приклад зображення" style="border-radius:12px" />',
  'alt важливий для доступності та SEO.'
),
(
  'ul',
  '<ul>',
  'Text',
  'Ненумерований список (маркерований).',
  '[]'::jsonb,
  '<ul><li>Пункт 1</li><li>Пункт 2</li><li>Пункт 3</li></ul>',
  'Для пунктів списку використовують тег <li>.'
),
(
  'table',
  '<table>',
  'Tables',
  'Створює таблицю для представлення даних.',
  '[]'::jsonb,
  '<table border="1" cellpadding="8"><tr><th>Назва</th><th>К-сть</th></tr><tr><td>Товар A</td><td>3</td></tr><tr><td>Товар B</td><td>7</td></tr></table>',
  'Для семантики використовують <thead>, <tbody>, <th>, <td>.'
),
(
  'form',
  '<form>',
  'Forms',
  'Контейнер для елементів введення (форма).',
  '[{"name":"action","desc":"URL для відправки"},{"name":"method","desc":"GET або POST"}]'::jsonb,
  '<form><label>Ім''я: <input placeholder="Ваше імя" /></label><button type="button">Надіслати</button></form>',
  'Кнопка type="submit" відправляє форму.'
),
(
  'input',
  '<input>',
  'Forms',
  'Поле вводу для тексту, паролю, email тощо.',
  '[{"name":"type","desc":"Тип поля (text, email, password...)"},{"name":"placeholder","desc":"Підказка"}]'::jsonb,
  '<input type="email" placeholder="name@example.com" style="padding:10px;border:1px solid #ccc;border-radius:10px" />',
  'input є самозакривним тегом.'
),
(
  'button',
  '<button>',
  'Forms',
  'Кнопка для дій: відправка, запуск функції тощо.',
  '[{"name":"type","desc":"button, submit, reset"}]'::jsonb,
  '<button type="button" style="padding:10px 14px;border-radius:10px;border:1px solid #333">Натисни мене</button>',
  'Якщо type не задано, за замовчуванням це submit у формі.'
),
(
  'div',
  '<div>',
  'Layout',
  'Універсальний блоковий контейнер для групування елементів.',
  '[]'::jsonb,
  '<div style="padding:12px;border:1px dashed #888;border-radius:12px">Контейнер div</div>',
  'div не має семантики, тому для структури краще використовувати семантичні теги.'
),
(
  'span',
  '<span>',
  'Text',
  'Універсальний рядковий контейнер для стилізації фрагмента тексту.',
  '[]'::jsonb,
  '<p>Тут <span style="background:#ffe58f;padding:2px 6px;border-radius:8px">виділений</span> текст.</p>',
  'span використовується для дрібних частин тексту всередині рядка.'
),
(
  'section',
  '<section>',
  'Semantic',
  'Секція сторінки: логічний блок з заголовком і контентом.',
  '[]'::jsonb,
  '<section><h2>Про нас</h2><p>Це приклад секції.</p></section>',
  'Добре підходить для великих логічних частин документа.'
),
(
  'nav',
  '<nav>',
  'Semantic',
  'Навігаційний блок (меню).',
  '[]'::jsonb,
  '<nav><a href="#">Головна</a> | <a href="#">Теги</a> | <a href="#">Тест</a></nav>',
  'Всередині зазвичай містяться посилання.'
),
(
  'code',
  '<code>',
  'Text',
  'Відображає фрагмент коду в рядку.',
  '[]'::jsonb,
  '<p>Команда: <code>npm run dev</code></p>',
  'Для блоків коду використовують <pre><code>...</code></pre>.'
),
(
  'video',
  '<video>',
  'Media',
  'Вбудовує відео на сторінку.',
  '[{"name":"controls","desc":"Показ елементів керування"}]'::jsonb,
  '<video controls width="360"><source src="" type="video/mp4" />Ваш браузер не підтримує відео.</video>',
  'Потрібно вказати source/src або використовувати відео-файл.'
);

INSERT INTO questions (prompt, options, answer_index, explanation) VALUES
(
  'Який тег використовується для створення посилання?',
  '["<p>", "<div>", "<a>", "<img>"]'::jsonb,
  2,
  'Тег <a> створює гіперпосилання (атрибут href).'
),
(
  'Який атрибут є обов''язковим для зображення з точки зору доступності?',
  '["href", "alt", "target", "method"]'::jsonb,
  1,
  'alt описує зображення для скрінрідерів та якщо картинка не завантажилась.'
),
(
  'Який тег використовується для абзацу?',
  '["<h1>", "<span>", "<nav>", "<p>"]'::jsonb,
  3,
  'Тег <p> створює абзац.'
),
(
  'Який тег є рядковим контейнером без семантики?',
  '["<div>", "<section>", "<span>", "<table>"]'::jsonb,
  2,
  '<span> — рядковий контейнер, <div> — блоковий.'
),
(
  'Який тег найчастіше використовують як універсальний блоковий контейнер?',
  '["<a>", "<div>", "<img>", "<code>"]'::jsonb,
  1,
  'Тег <div> — універсальний контейнер (block).'
),
(
  'Який тег створює ненумерований список?',
  '["<ol>", "<li>", "<table>", "<ul>"]'::jsonb,
  3,
  'Тег <ul> створює маркерований список (пункти — <li>).' 
),
(
  'Який тег призначений для навігації?',
  '["<main>", "<footer>", "<nav>", "<article>"]'::jsonb,
  2,
  'Тег <nav> містить навігаційні посилання.'
),
(
  'Який тег використовується для таблиць?',
  '["<form>", "<section>", "<table>", "<video>"]'::jsonb,
  2,
  'Тег <table> створює таблицю.'
),
(
  'Який тег створює форму для введення даних?',
  '["<input>", "<button>", "<code>", "<form>"]'::jsonb,
  3,
  'Тег <form> — контейнер для елементів введення.'
),
(
  'Який тег використовується для відображення коду всередині рядка?',
  '["<p>", "<div>", "<code>", "<ul>"]'::jsonb,
  2,
  'Тег <code> призначений для коротких фрагментів коду в тексті.'
);
