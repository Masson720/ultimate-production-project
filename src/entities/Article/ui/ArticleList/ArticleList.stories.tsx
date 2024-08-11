import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { ArticleView } from '@/entities/Article/model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const articles: any = [
    {
        "id": "1",
        "title": "Javascript news СВЕЖАЯ",
        "subtitle": "Что нового в JS за 2022 год?",
        "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        "user": {
            "id": "1",
            "username": "admin",
            "password": "123",
            "roles": [
              "ADMIN"
            ],
            "features": {
              "isArticleRatingEnabled": true,
              "isCounterEnabled": true,
              "isAppRedesigned": true
            },
            "avatar": "https://mobimg.b-cdn.net/v3/fetch/22/2207633df03a819cd72889249c8361a8.jpeg?w=1470&r=0.5625",
            "jsonSettings": {
              "theme": "app_light_theme",
              "isFirstVisit": true,
              "settingsPageHasBeenOpen": false,
              "isArticlesPageWasOpened": false,
              "isArticlePageWasOpened": true
            }
        },
        "views": 1022,
        "createdAt": "26.04.2024",
        "userId": "1",
        "type": [
          "IT"
        ],
        "blocks": [
          {
            "id": "1",
            "type": "TEXT",
            "title": "Заголовок этого блока",
            "paragraphs": [
              "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
              "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
              "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
            ]
          },
        ]
      },
      {
        "id": "1",
        "title": "Javascript news СВЕЖАЯ",
        "subtitle": "Что нового в JS за 2022 год?",
        "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        "user": {
            "id": "1",
            "username": "admin",
            "password": "123",
            "roles": [
              "ADMIN"
            ],
            "features": {
              "isArticleRatingEnabled": true,
              "isCounterEnabled": true,
              "isAppRedesigned": true
            },
            "avatar": "https://mobimg.b-cdn.net/v3/fetch/22/2207633df03a819cd72889249c8361a8.jpeg?w=1470&r=0.5625",
            "jsonSettings": {
              "theme": "app_light_theme",
              "isFirstVisit": true,
              "settingsPageHasBeenOpen": false,
              "isArticlesPageWasOpened": false,
              "isArticlePageWasOpened": true
            }
        },
        "views": 1022,
        "createdAt": "26.04.2024",
        "userId": "1",
        "type": [
          "IT"
        ],
        "blocks": [
          {
            "id": "1",
            "type": "TEXT",
            "title": "Заголовок этого блока",
            "paragraphs": [
              "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
              "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
              "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
            ]
          },
        ]
      },
      {
        "id": "1",
        "title": "Javascript news СВЕЖАЯ",
        "subtitle": "Что нового в JS за 2022 год?",
        "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        "user": {
            "id": "1",
            "username": "admin",
            "password": "123",
            "roles": [
              "ADMIN"
            ],
            "features": {
              "isArticleRatingEnabled": true,
              "isCounterEnabled": true,
              "isAppRedesigned": true
            },
            "avatar": "https://mobimg.b-cdn.net/v3/fetch/22/2207633df03a819cd72889249c8361a8.jpeg?w=1470&r=0.5625",
            "jsonSettings": {
              "theme": "app_light_theme",
              "isFirstVisit": true,
              "settingsPageHasBeenOpen": false,
              "isArticlesPageWasOpened": false,
              "isArticlePageWasOpened": true
            }
        },
        "views": 1022,
        "createdAt": "26.04.2024",
        "userId": "1",
        "type": [
          "IT"
        ],
        "blocks": [
          {
            "id": "1",
            "type": "TEXT",
            "title": "Заголовок этого блока",
            "paragraphs": [
              "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
              "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
              "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
            ]
          },
        ]
      }
]

const meta = {
  title: 'entities/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isLoading: false,
        articles: articles,
        view: ArticleView.SMALL
    },
};

export const PrimaryBig: Story = {
    args: {
        isLoading: false,
        articles: articles,
        view: ArticleView.BIG
    },
};

export const isLoadingBig: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.BIG
    },
};

export const isLoadingSmall: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.SMALL
    },
};

export const PrimaryRedesigned: Story = {
    args: {
        isLoading: false,
        articles: articles,
        view: ArticleView.SMALL
    },
};
PrimaryRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]

export const PrimaryBigRedesigned: Story = {
    args: {
        isLoading: false,
        articles: articles,
        view: ArticleView.BIG
    },
};
PrimaryBigRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]

export const isLoadingBigRedesigned: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.BIG
    },
};
isLoadingBigRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]

export const isLoadingSmallRedesigned: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.SMALL
    },
};
isLoadingSmallRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]