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

## Customizing projects

The projects are located in './static/projects/'. The layout of each page is located in`./pages/projects/[project]/layout.json.

The structure of [layout.json](./static/projects/francescas/layout.json) is:

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
  "backgroundColor": "#6CAF82", // Project page backgaround color
  "textColor": "#ffffff", // Project page header text color
  "header": "", // Project page header text
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

Be sure to have the json verified. One typo can make the whole page crash.

If you add a new project, be sure to add it to [order.json](./static/projects/order.json).

Also, on digitalocean, you need to add the project to [Apps -> portfolio -> Settings -> porfolio -> HTTP Request Routes ->
Edit -> scroll down to + Add new route -> change Route Path to /project/[project_name] -> Save](https://cloud.digitalocean.com/apps/80a91dc4-0ff5-44ac-8f22-468aeb5b1a95/settings/portfolio?i=053ce1)

## Deploy

Once you are ready to update the website, be sure to have git installed, pushing a new commit will update the website.

```bash
git commit -m "things that changed"
git push
```
