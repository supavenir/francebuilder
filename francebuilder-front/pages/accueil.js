import Head from 'next/head'
import { appName } from '../src/utils/utils'
import { ArticleItem } from './components/ArticleItem';
import ComponentTitle from './components/ComponentTitle';

export default function Accueil ({ Component, id }) {

  const articles = () => {
    return [
      {key: 1, title: "La campagne de l'élection du Président de la République", image: "/article.png", date: "12/12/2020"},
      {key: 2, title: "Eric Zémoure espère passer au second tour 👀 ...", image: "/article.png", date: "12/12/2020"},
      {key: 3, title: "Annie Dalgo, la mauvaise élève de la classe", image: "/article.png", date: "12/12/2020"},
    ]
  }

  return (

    <div className="accueil">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      <Head>
        <title>{appName()} - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ComponentTitle title="Accueil" />

        {articles().map((item) => (
          <ArticleItem key={item.key} image={item.image} title={item.title} date={item.date} />
        ))}
      </main>
    </div>
  )
}
