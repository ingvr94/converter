SPA-приложение для конвертирования валют.

Используемые технологии:
- VUE
- VUEX
- SCSS
- Axios

Деплой приложения:

Приложение состоит из формы, содержащей следующие элементы:
- поле выбора валюты 'У меня есть', из которой происходит конвертация. По умолчанию, устанавливается валюта страны меcтоположения, определяемого по ip девайса, с которого запущено приложение. Если этой валюты нету в списке, по умолчанию значение выставляется EUR;
- поле выбора валюты 'Хочу приобрести', в которую происходит конвертация. Значение по умолчанию USD;
- поле ввода количества приобретаемой валюты.Можно ввести только цифры. При вводе 0 или пустом поле появляется ошибка;
- cтрока 'Итог' со значением конвертации и валютой. Динамически изменяется при изменении значений полей.
  Конвертация и получение списка валют осуществляется при помощи Frankfurter API, определение местоположения по ip - при помощи Country API.
