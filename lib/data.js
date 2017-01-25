'use babel';
const data = {
  lang: 'en',
  title: 'Hello',
  link: {
    title: 'Cool stylesheet',
    href: 'style.css'
  }
}

const singleComponents = {
  title: `<title> ${data.title} </title>`,
  links: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      title: `${data.link.title}`,
      href: `${data.link.href}`
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      title: `${data.link.title}`,
      href: `${data.link.href}`
    }
  ],

  scripts: [
    {
      src: 'main.js',
      type: 'text/javascript'
    }
  ]
}

export default {
  data,
  singleComponents
}
