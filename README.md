# portfolio

## Setup

Have [Nodejs](https://nodejs.org/en/download) installed on your machine.

and clone the repository:

```bash
git clone https://github.com/jTiKey/portfolio.git
```

In the project directory, you run to install yarn:

```bash
npm install --global yarn
```

then run  to install the dependencies:


```bash
# Run one
yarn install
````

## Run server

This command will start a server at [http:\\localhost:3000](http:\\localhost:3000):

```bash

yarn dev

```

## Run agency site: 

Change .env file to: IS_AGENCY=1



## Run portfolio site: 

Change .env file to: IS_AGENCY=0



## Customizing projects

The projects are located in './static/work/'. The layout of each page is located in`./pages/work/[project]/layout.json.

The structure of [layout.json](./static/work/francescas/layout.json) is:

```json
{
  "cover": { // homepage settings
    "media": {
      "name": "1.jpg" // The name of the image or video in the media folder of each project
    },
    "title": "",
    "categories": "",
    "multiple": "false", // this project has half the width
    "position": "right", // left or center
    "width": "60%"
  },
  "backgroundColor": "#6CAF82", // Project page background color
  "textColor": "#ffffff", // Project page header text color
  "header": "", // Project page header text
  "seo_description": "This is what google will show",
  "layout": [
    {
      "title": "Paragraph header",
      "text": [
        "list of paragraphs",
        "list of paragraphs"
      ]
    },
    {
      "media": [
        {
          "name": "6.mp4",
          "position": "center" // left or right
        },
        {
          "name": "4.jpg",
          "position": "center" // left or right
        }
      ]
    },
    {
      "text": [
        "title can be skipped"
      ]
    }
  ]
}
```

Be sure to have the json don't have errors. One typo can make the whole page crash.

H1,H2,H3 is defined in components/project/String.vue

Paragraph text is defined in layouts/default.vue

Intro text for individual project pages is in components/project/Top.vue


Homepage category text styles defined in components/PortfolioItem

## Deploy

Once you are ready to update the website, be sure to have git installed, pushing a new commit will update the website.

```bash
git commit -m "things that changed"
git push
```
