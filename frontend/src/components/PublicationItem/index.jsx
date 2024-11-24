const PublicationItem = ({ title, content, publication_date}) => {
  return(
    <article>
      <header>
        <h3>{title}</h3>
      </header>
      <p>{content}</p>
      <span>{publication_date}</span>
    </article>        
  )
}

export { PublicationItem }